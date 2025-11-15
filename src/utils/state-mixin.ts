import { ComponentStateManager, StateManager } from './state-manager';

/**
 * 状态管理 Mixin 工厂函数
 */
export function withStateManager<T extends { new (...args: any[]): any }>(
  Base: T,
  componentName?: string
) {
  return class extends Base {
    public __stateManager?: ComponentStateManager;
    public __componentName = componentName || this.constructor.name;

    connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }

      // 初始化状态管理器
      this.__stateManager = new ComponentStateManager(
        this.__componentName,
        (this as any).getInitialState?.()
      );

      // 连接状态管理器
      if ((this as any).connectStateManager) {
        (this as any).connectStateManager();
      }
    }

    disconnectedCallback() {
      // 清理状态管理器
      this.__stateManager?.destroy();

      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }
    }

    /**
     * 获取状态值
     */
    public getState<K extends string>(key: K): any {
      return this.__stateManager?.get(key as any);
    }

    /**
     * 设置状态值
     */
    public setState<K extends string>(key: K, value: any): void {
      this.__stateManager?.set(key as any, value);
      if ((this as any).requestUpdate) {
        (this as any).requestUpdate();
      }
    }

    /**
     * 批量更新状态
     */
    public setStateMultiple(updates: Record<string, any>): void {
      this.__stateManager?.setMultiple(updates);
      if ((this as any).requestUpdate) {
        (this as any).requestUpdate();
      }
    }

    /**
     * 获取所有状态
     */
    public getAllState(): Record<string, any> {
      return this.__stateManager?.getAll() || {};
    }

    /**
     * 订阅状态变化
     */
    public subscribeState<K extends string>(
      key: K,
      callback: (newValue: any, oldValue: any) => void
    ): () => void {
      return this.__stateManager?.subscribe(key as any, callback) || (() => {});
    }

    /**
     * 重置组件状态
     */
    public resetState(): void {
      this.__stateManager?.reset();
      if ((this as any).requestUpdate) {
        (this as any).requestUpdate();
      }
    }
  };
}

/**
 * 全局状态管理 Mixin
 */
export function withGlobalStateManager<T extends { new (...args: any[]): any }>(Base: T) {
  return class extends Base {
    public globalSubscriptions: Set<() => void> = new Set();
    public __isConnected = false;

    connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }
      this.__isConnected = true;
      if ((this as any).connectGlobalStateManager) {
        (this as any).connectGlobalStateManager();
      }
    }

    disconnectedCallback() {
      this.cleanupGlobalSubscriptions();
      this.__isConnected = false;
      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }
    }

    /**
     * 获取全局状态
     */
    public getGlobalState<T = any>(key: string, defaultValue?: T): T {
      return StateManager.getInstance().get(key, defaultValue);
    }

    /**
     * 设置全局状态
     */
    public setGlobalState<T = any>(key: string, value: T): void {
      StateManager.getInstance().set(key, value, this.constructor.name);
    }

    /**
     * 订阅全局状态
     */
    public subscribeGlobalState<T = any>(
      key: string,
      callback: (event: { newValue: T; oldValue: T; source: string }) => void,
      options?: { once?: boolean }
    ): () => void {
      if (!this.__isConnected) {
        return () => {};
      }

      const unsubscribe = StateManager.getInstance().subscribe(key, callback, options);
      this.globalSubscriptions.add(unsubscribe);
      return unsubscribe;
    }

    /**
     * 清理全局状态订阅
     */
    public cleanupGlobalSubscriptions(): void {
      this.globalSubscriptions.forEach(unsubscribe => unsubscribe());
      this.globalSubscriptions.clear();
    }
  };
}

/**
 * 完整的状态管理 Mixin（包含组件和全局状态）
 */
export function withFullStateManager<T extends { new (...args: any[]): any }>(
  Base: T,
  componentName?: string
) {
  return class extends Base {
    public __stateManager?: ComponentStateManager;
    public __componentName = componentName || this.constructor.name;
    public globalSubscriptions: Set<() => void> = new Set();
    public __isConnected = false;

    connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }

      this.__isConnected = true;

      // 初始化组件状态管理器
      this.__stateManager = new ComponentStateManager(
        this.__componentName,
        (this as any).getInitialState?.()
      );

      // 连接状态管理器
      if ((this as any).connectStateManager) {
        (this as any).connectStateManager();
      }

      if ((this as any).connectGlobalStateManager) {
        (this as any).connectGlobalStateManager();
      }
    }

    disconnectedCallback() {
      // 清理组件状态管理器
      this.__stateManager?.destroy();

      this.cleanupGlobalSubscriptions();
      this.__isConnected = false;

      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }
    }

    /**
     * 获取全局状态
     */
    public getGlobalState<T = any>(key: string, defaultValue?: T): T {
      return StateManager.getInstance().get(key, defaultValue);
    }

    /**
     * 设置全局状态
     */
    public setGlobalState<T = any>(key: string, value: T): void {
      StateManager.getInstance().set(key, value, this.constructor.name);
    }

    /**
     * 订阅全局状态
     */
    public subscribeGlobalState<T = any>(
      key: string,
      callback: (event: { newValue: T; oldValue: T; source: string }) => void,
      options?: { once?: boolean }
    ): () => void {
      if (!this.__isConnected) {
        return () => {};
      }

      const unsubscribe = StateManager.getInstance().subscribe(key, callback, options);
      this.globalSubscriptions.add(unsubscribe);
      return unsubscribe;
    }

    /**
     * 清理全局状态订阅
     */
    public cleanupGlobalSubscriptions(): void {
      this.globalSubscriptions.forEach(unsubscribe => unsubscribe());
      this.globalSubscriptions.clear();
    }

    /**
     * 获取组件状态值
     */
    public getState<K extends string>(key: K): any {
      return this.__stateManager?.get(key as any);
    }

    /**
     * 设置组件状态值
     */
    public setState<K extends string>(key: K, value: any): void {
      this.__stateManager?.set(key as any, value);
      if ((this as any).requestUpdate) {
        (this as any).requestUpdate();
      }
    }

    /**
     * 批量更新组件状态
     */
    public setStateMultiple(updates: Record<string, any>): void {
      this.__stateManager?.setMultiple(updates);
      if ((this as any).requestUpdate) {
        (this as any).requestUpdate();
      }
    }

    /**
     * 获取所有组件状态
     */
    public getAllState(): Record<string, any> {
      return this.__stateManager?.getAll() || {};
    }

    /**
     * 订阅组件状态变化
     */
    public subscribeState<K extends string>(
      key: K,
      callback: (newValue: any, oldValue: any) => void
    ): () => void {
      return this.__stateManager?.subscribe(key as any, callback) || (() => {});
    }

    /**
     * 重置组件状态
     */
    public resetState(): void {
      this.__stateManager?.reset();
      if ((this as any).requestUpdate) {
        (this as any).requestUpdate();
      }
    }
  };
}