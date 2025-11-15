/**
 * Skill UI Components 状态管理系统
 * 提供统一的状态管理、持久化和组件间通信功能
 */

export interface StateChangeEvent<T = any> {
  key: string;
  newValue: T;
  oldValue: T;
  source: string;
  timestamp: Date;
}

export interface StatePersistConfig {
  /** 是否启用持久化 */
  enabled: boolean;
  /** 存储键前缀 */
  keyPrefix?: string;
  /** 存储类型 */
  storage?: 'localStorage' | 'sessionStorage' | 'memory';
  /** 序列化/反序列化函数 */
  serializer?: {
    serialize: (value: any) => string;
    deserialize: (value: string) => any;
  };
  /** 过滤器，决定哪些状态需要持久化 */
  filter?: (key: string, value: any) => boolean;
}

export interface StateSubscription {
  id: string;
  key: string;
  callback: (event: StateChangeEvent) => void;
  once?: boolean;
}

/**
 * 全局状态管理器
 */
export class StateManager {
  private static instance: StateManager;
  private state: Map<string, any> = new Map();
  private subscriptions: Map<string, Set<StateSubscription>> = new Map();
  private persistConfig: StatePersistConfig = {
    enabled: true,
    keyPrefix: 'skill-ui-',
    storage: 'localStorage',
    serializer: {
      serialize: JSON.stringify,
      deserialize: JSON.parse
    },
    filter: (key, value) => {
      // 默认不持久化函数、DOM元素等复杂对象
      return typeof value !== 'function' &&
             typeof value !== 'object' ||
             value === null ||
             (value.constructor && value.constructor.name === 'Object');
    }
  };

  private constructor() {
    this.loadPersistedState();
  }

  public static getInstance(): StateManager {
    if (!StateManager.instance) {
      StateManager.instance = new StateManager();
    }
    return StateManager.instance;
  }

  /**
   * 配置持久化选项
   */
  public configurePersist(config: Partial<StatePersistConfig>): void {
    this.persistConfig = { ...this.persistConfig, ...config };
  }

  /**
   * 获取状态值
   */
  public get<T = any>(key: string, defaultValue?: T): T {
    if (this.state.has(key)) {
      return this.state.get(key) as T;
    }
    return defaultValue as T;
  }

  /**
   * 设置状态值
   */
  public set<T = any>(key: string, value: T, source?: string): void {
    const oldValue = this.state.get(key);
    const newValue = value;

    // 只有值真正变化时才触发事件
    if (oldValue !== newValue) {
      this.state.set(key, newValue);

      // 持久化状态
      if (this.persistConfig.enabled && this.shouldPersist(key, newValue)) {
        this.persistState(key, newValue);
      }

      // 触发订阅者
      this.notifySubscribers(key, newValue, oldValue, source);
    }
  }

  /**
   * 批量设置状态
   */
  public setMultiple(updates: Array<{ key: string; value: any }>, source?: string): void {
    const events: StateChangeEvent[] = [];

    // 先收集所有变更
    updates.forEach(({ key, value }) => {
      const oldValue = this.state.get(key);
      if (oldValue !== value) {
        this.state.set(key, value);
        events.push({
          key,
          newValue: value,
          oldValue,
          source: source || 'batch',
          timestamp: new Date()
        });
      }
    });

    // 持久化变更
    if (this.persistConfig.enabled) {
      events.forEach(event => {
        if (this.shouldPersist(event.key, event.newValue)) {
          this.persistState(event.key, event.newValue);
        }
      });
    }

    // 批量通知订阅者
    events.forEach(event => {
      this.notifySubscribers(event.key, event.newValue, event.oldValue, event.source);
    });
  }

  /**
   * 删除状态
   */
  public delete(key: string, source?: string): void {
    if (this.state.has(key)) {
      const oldValue = this.state.get(key);
      this.state.delete(key);

      // 删除持久化数据
      if (this.persistConfig.enabled) {
        this.removePersistedState(key);
      }

      // 触发订阅者
      this.notifySubscribers(key, undefined, oldValue, source);
    }
  }

  /**
   * 检查状态是否存在
   */
  public has(key: string): boolean {
    return this.state.has(key);
  }

  /**
   * 清空所有状态
   */
  public clear(source?: string): void {
    const keys = Array.from(this.state.keys());

    this.state.clear();

    // 清空持久化数据
    if (this.persistConfig.enabled) {
      this.clearPersistedState();
    }

    // 通知所有订阅者
    keys.forEach(key => {
      this.notifySubscribers(key, undefined, undefined, source);
    });
  }

  /**
   * 订阅状态变化
   */
  public subscribe(key: string, callback: (event: StateChangeEvent) => void, options?: { once?: boolean }): () => void {
    const subscription: StateSubscription = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      key,
      callback,
      once: options?.once
    };

    if (!this.subscriptions.has(key)) {
      this.subscriptions.set(key, new Set());
    }

    this.subscriptions.get(key)!.add(subscription);

    // 返回取消订阅函数
    return () => {
      this.unsubscribe(subscription.id);
    };
  }

  /**
   * 订阅多个状态变化
   */
  public subscribeMultiple(keys: string[], callback: (event: StateChangeEvent) => void, options?: { once?: boolean }): () => void {
    const unsubscribes = keys.map(key => this.subscribe(key, callback, options));

    // 返回统一的取消订阅函数
    return () => {
      unsubscribes.forEach(unsubscribe => unsubscribe());
    };
  }

  /**
   * 取消订阅
   */
  public unsubscribe(subscriptionId: string): void {
    for (const [key, subscriptions] of this.subscriptions.entries()) {
      for (const subscription of subscriptions) {
        if (subscription.id === subscriptionId) {
          subscriptions.delete(subscription);
          if (subscriptions.size === 0) {
            this.subscriptions.delete(key);
          }
          return;
        }
      }
    }
  }

  /**
   * 获取所有状态键
   */
  public keys(): string[] {
    return Array.from(this.state.keys());
  }

  /**
   * 获取所有状态
   */
  public getAll(): Record<string, any> {
    return Object.fromEntries(this.state.entries());
  }

  /**
   * 创建状态代理
   */
  public createProxy<T extends Record<string, any>>(initialState: T, prefix = ''): T {
    const proxy = {} as T;

    Object.keys(initialState).forEach(key => {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      // 设置初始值
      this.set(fullKey, initialState[key], 'proxy-init');

      // 创建属性访问器
      Object.defineProperty(proxy, key, {
        get: () => this.get(fullKey),
        set: (value) => this.set(fullKey, value, 'proxy-set'),
        enumerable: true,
        configurable: true
      });
    });

    return proxy;
  }

  /**
   * 监控状态变化（开发工具）
   */
  public createLogger(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('skill-state-debug', (event: any) => {
      const { action, key, value } = event.detail;

      switch (action) {
        case 'get':
          console.log(`[State Debug] GET ${key}:`, this.get(key));
          break;
        case 'set':
          console.log(`[State Debug] SET ${key}:`, value);
          break;
        case 'all':
          console.log(`[State Debug] ALL STATE:`, this.getAll());
          break;
      }
    });
  }

  private notifySubscribers(key: string, newValue: any, oldValue: any, source?: string): void {
    const event: StateChangeEvent = {
      key,
      newValue,
      oldValue,
      source: source || 'unknown',
      timestamp: new Date()
    };

    const subscriptions = this.subscriptions.get(key);
    if (subscriptions) {
      const toRemove: StateSubscription[] = [];

      subscriptions.forEach(subscription => {
        try {
          subscription.callback(event);
          if (subscription.once) {
            toRemove.push(subscription);
          }
        } catch (error) {
          console.error(`Error in state subscription for key ${key}:`, error);
          // 移除出错的订阅
          toRemove.push(subscription);
        }
      });

      // 移除一次性订阅和出错的订阅
      toRemove.forEach(sub => subscriptions.delete(sub));

      if (subscriptions.size === 0) {
        this.subscriptions.delete(key);
      }
    }
  }

  private shouldPersist(key: string, value: any): boolean {
    return this.persistConfig.filter ? this.persistConfig.filter(key, value) : true;
  }

  private persistState(key: string, value: any): void {
    if (typeof window === 'undefined') return;

    const { keyPrefix, storage, serializer } = this.persistConfig;
    const fullKey = `${keyPrefix || 'skill-ui-'}${key}`;
    const storageInstance = storage === 'sessionStorage' ? window.sessionStorage : window.localStorage;

    try {
      if (serializer) {
        const serializedValue = serializer.serialize(value);
        storageInstance.setItem(fullKey, serializedValue);
      }
    } catch (error) {
      console.warn(`Failed to persist state for key ${key}:`, error);
    }
  }

  private loadPersistedState(): void {
    if (typeof window === 'undefined') return;

    const { keyPrefix, storage, serializer } = this.persistConfig;
    const storageInstance = storage === 'sessionStorage' ? window.sessionStorage : window.localStorage;

    try {
      const keys = Object.keys(storageInstance);
      keys.forEach(key => {
        if (key.startsWith(keyPrefix || 'skill-ui-')) {
          const stateKey = key.slice((keyPrefix || 'skill-ui-').length);
          try {
            const value = storageInstance.getItem(key);
            if (value && serializer) {
              const deserializedValue = serializer.deserialize(value);
              this.state.set(stateKey, deserializedValue);
            }
          } catch (error) {
            console.warn(`Failed to load persisted state for key ${key}:`, error);
            // 清除无效数据
            storageInstance.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.warn('Failed to load persisted state:', error);
    }
  }

  private removePersistedState(key: string): void {
    if (typeof window === 'undefined') return;

    const { keyPrefix, storage } = this.persistConfig;
    const fullKey = `${keyPrefix || 'skill-ui-'}${key}`;
    const storageInstance = storage === 'sessionStorage' ? window.sessionStorage : window.localStorage;

    try {
      storageInstance.removeItem(fullKey);
    } catch (error) {
      console.warn(`Failed to remove persisted state for key ${key}:`, error);
    }
  }

  private clearPersistedState(): void {
    if (typeof window === 'undefined') return;

    const { keyPrefix, storage } = this.persistConfig;
    const storageInstance = storage === 'sessionStorage' ? window.sessionStorage : window.localStorage;

    try {
      const keys = Object.keys(storageInstance);
      keys.forEach(key => {
        if (key.startsWith(keyPrefix || 'skill-ui-')) {
          storageInstance.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear persisted state:', error);
    }
  }
}

/**
 * 组件状态管理 Hook 风格工具
 */
export class ComponentStateManager<T = any> {
  private stateManager: StateManager;
  private keyPrefix: string;
  private subscriptions: Set<() => void> = new Set();

  constructor(componentName: string, initialState?: Partial<T>) {
    this.stateManager = StateManager.getInstance();
    this.keyPrefix = `component-${componentName}`;

    // 设置初始状态
    if (initialState) {
      Object.entries(initialState).forEach(([key, value]) => {
        this.stateManager.set(`${this.keyPrefix}.${key}`, value, 'component-init');
      });
    }
  }

  /**
   * 获取状态值
   */
  public get<K extends keyof T>(key: K): T[K] {
    return this.stateManager.get(`${this.keyPrefix}.${String(key)}`);
  }

  /**
   * 设置状态值
   */
  public set<K extends keyof T>(key: K, value: T[K]): void {
    this.stateManager.set(`${this.keyPrefix}.${String(key)}`, value, 'component-update');
  }

  /**
   * 批量更新状态
   */
  public setMultiple(updates: Partial<T>): void {
    const stateUpdates = Object.entries(updates).map(([key, value]) => ({
      key: `${this.keyPrefix}.${key}`,
      value
    }));

    this.stateManager.setMultiple(stateUpdates, 'component-batch-update');
  }

  /**
   * 获取所有状态
   */
  public getAll(): T {
    const allState = this.stateManager.getAll();
    const componentState: Partial<T> = {};

    Object.keys(allState).forEach(key => {
      if (key.startsWith(`${this.keyPrefix}.`)) {
        const stateKey = key.slice(this.keyPrefix.length + 1) as keyof T;
        componentState[stateKey] = allState[key];
      }
    });

    return componentState as T;
  }

  /**
   * 订阅状态变化
   */
  public subscribe<K extends keyof T>(
    key: K,
    callback: (newValue: T[K], oldValue: T[K]) => void
  ): () => void {
    const fullKey = `${this.keyPrefix}.${String(key)}`;

    const unsubscribe = this.stateManager.subscribe(fullKey, (event) => {
      callback(event.newValue, event.oldValue);
    });

    this.subscriptions.add(unsubscribe);
    return unsubscribe;
  }

  /**
   * 订阅所有状态变化
   */
  public subscribeAll(callback: (state: T, changedKey: keyof T) => void): () => void {
    const unsubscribe = this.stateManager.subscribeMultiple(
      this.getAllKeys().map(key => `${this.keyPrefix}.${key}`),
      (event) => {
        const currentState = this.getAll();
        const changedKey = event.key.slice(this.keyPrefix.length + 1) as keyof T;
        callback(currentState, changedKey);
      }
    );

    this.subscriptions.add(unsubscribe);
    return unsubscribe;
  }

  /**
   * 重置状态
   */
  public reset(): void {
    const allKeys = this.getAllKeys();
    allKeys.forEach(key => {
      this.stateManager.delete(`${this.keyPrefix}.${key}`, 'component-reset');
    });
  }

  /**
   * 销毁状态管理器
   */
  public destroy(): void {
    this.subscriptions.forEach(unsubscribe => unsubscribe());
    this.subscriptions.clear();
  }

  private getAllKeys(): string[] {
    const allState = this.stateManager.getAll();
    return Object.keys(allState)
      .filter(key => key.startsWith(`${this.keyPrefix}.`))
      .map(key => key.slice(this.keyPrefix.length + 1));
  }
}

/**
 * 工具函数：创建状态管理器
 */
export const createStateManager = (componentName: string) => {
  return new ComponentStateManager(componentName);
};

/**
 * 全局状态访问器
 */
export const globalState = StateManager.getInstance();