// 模拟 localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });
});

// 模拟 Web Components API
if (!window.customElements) {
  (window as any).customElements = {
    define: jest.fn(),
    get: jest.fn(),
    upgrade: jest.fn(),
  };
}

// 模拟 ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// 模拟 IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// 模拟 Lit 相关的模块
jest.mock('lit', () => ({
  html: (template: any, ...values: any[]) => ({ template, values }),
  render: jest.fn(),
  LitElement: class MockLitElement {
    requestUpdate = jest.fn().mockResolvedValue(undefined);
    updateComplete = Promise.resolve();

    connectedCallback() {}
    disconnectedCallback() {}
    createRenderRoot() { return this; }

    // 添加常用的属性和方法
    shadowRoot: any = {
      querySelector: jest.fn(),
      querySelectorAll: jest.fn(() => []),
      appendChild: jest.fn(),
      removeChild: jest.fn(),
    };

    // 添加验证方法
    validateRequired(prop: string, value: any) {
      if (value === undefined || value === null) {
        throw new Error(`Property ${prop} is required`);
      }
    }

    refresh() {
      this.requestUpdate();
    }

    // 添加基本的渲染方法
    render() {
      return '';
    }
  }
}));

jest.mock('lit/decorators.js', () => ({
  customElement: (tagName: string) => (target: any) => target,
  property: (options?: any) => (target: any, key: string) => {
    // 创建属性描述符
    if (!target._properties) {
      target._properties = {};
    }
    target._properties[key] = options || {};

    // 确保属性可以在实例上设置
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: options?.default || undefined
    });
  },
  state: () => (target: any, key: string) => {
    // 确保状态属性可以在实例上设置
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: undefined
    });
  },
  query: (selector: string) => (target: any, key: string) => {
    // 创建查询装饰器
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      get() {
        return this.shadowRoot?.querySelector(selector) || document.querySelector(selector);
      }
    });
  },
  queryAll: (selector: string) => (target: any, key: string) => {
    // 创建查询所有装饰器
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      get() {
        return this.shadowRoot?.querySelectorAll(selector) || document.querySelectorAll(selector);
      }
    });
  },
}));

// 模拟错误处理器
let MockSkillError: any;

jest.mock('../src/utils/error-handler', () => {
  MockSkillError = class MockSkillErrorClass extends Error {
    public component?: string;
    public context?: string;
    public severity: 'low' | 'medium' | 'high' | 'critical';
    public recoverable: boolean;
    public userMessage?: string;
    public timestamp: Date;
    public errorId: string;

    constructor(message: string, public options: any = {}) {
      super(message);
      this.name = 'SkillError';
      this.message = message;
      this.component = options.component;
      this.context = options.context;
      this.severity = options.severity || 'medium';
      this.recoverable = options.recoverable ?? true;
      this.userMessage = options.userMessage;
      this.timestamp = new Date();
      this.errorId = `skill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
  };

  return {
    SkillErrorHandler: class MockSkillErrorHandler {
      private static instance: MockSkillErrorHandler;
      private errors: any[] = [];

      static getInstance(): MockSkillErrorHandler {
        if (!MockSkillErrorHandler.instance) {
          MockSkillErrorHandler.instance = new MockSkillErrorHandler();
        }
        return MockSkillErrorHandler.instance;
      }

      handleError(message: string, options: any = {}) {
        const error = new MockSkillError(message, options);
        this.errors.push(error);
        return error;
      }

      handle(error: any) {
        this.errors.push(error);
        return { userMessage: 'Test error' };
      }

      logError(error: any, context?: string) {
        this.errors.push({ error, context });
      }

      getErrors(filters?: any) {
        if (!filters) {
          return this.errors;
        }

        return this.errors.filter(error => {
          if (filters.component && error.component !== filters.component) {
            return false;
          }
          if (filters.severity && error.severity !== filters.severity) {
            return false;
          }
          return true;
        });
      }

      clearErrors() {
        this.errors = [];
      }

      getErrorsByComponent(componentName: string) {
        return this.errors.filter(e => e.component === componentName);
      }
    },
    SkillError: MockSkillError,
    createErrorHandler: (name: string) => ({
      handle: jest.fn((message, options) => ({
        message,
        component: name,
        ...options
      })),
      wrapAsync: jest.fn((fn) => fn),
      wrapSync: jest.fn((fn) => fn),
    }),
    SkillValidator: {
      type: jest.fn((value, expectedType, propName, component) => {
        if (typeof value !== expectedType) {
          throw new Error(`属性 ${propName} 类型错误，期望 ${expectedType}，实际 ${typeof value}`);
        }
      }),
      required: jest.fn((value, propName, component) => {
        if (value === null || value === undefined || value === '') {
          throw new Error(`属性 ${propName} 是必填的`);
        }
      }),
      arrayLength: jest.fn((arrayName, array, minLength, maxLength, component) => {
        if (minLength !== undefined && array.length < minLength) {
          throw new Error(`数组 ${arrayName} 长度不能小于 ${minLength}`);
        }
        if (maxLength !== undefined && array.length > maxLength) {
          throw new Error(`数组 ${arrayName} 长度不能大于 ${maxLength}`);
        }
      }),
      range: jest.fn((valueName, value, min, max, component) => {
        if (min !== undefined && value < min) {
          throw new Error(`数值 ${valueName} 不能小于 ${min}`);
        }
        if (max !== undefined && value > max) {
          throw new Error(`数值 ${valueName} 不能大于 ${max}`);
        }
      }),
      pattern: jest.fn((value, pattern, propName, component) => {
        if (!pattern.test(value)) {
          throw new Error(`属性 ${propName} 格式不正确`);
        }
      }),
      enum: jest.fn((value, allowedValues, propName, component) => {
        if (!allowedValues.includes(value)) {
          throw new Error(`属性 ${propName} 的值无效`);
        }
      }),
    },
    CatchErrors: () => () => {},
    Validate: () => () => {},
  };
});

// 模拟状态管理
jest.mock('../src/utils/state-mixin', () => ({
  withFullStateManager: (Base: any) => Base,
}));

// 模拟状态管理器
let MockComponentStateManager: any;

jest.mock('../src/utils/state-manager', () => {
  MockComponentStateManager = class {
    private data: Map<string, any> = new Map();
    private subscriptions: Map<string, Function[]> = new Map();

    constructor(private componentId: string, initialState?: any) {
      // 如果有初始状态，则设置默认值
      if (initialState) {
        Object.entries(initialState).forEach(([key, value]) => {
          if (!this.data.has(key)) {
            this.data.set(key, value);
          }
        });
      }
    }

    get(key: string, defaultValue?: any) {
      return this.data.get(key) ?? defaultValue;
    }

    set(key: string, value: any) {
      const oldValue = this.data.get(key);
      this.data.set(key, value);
      this.notifySubscribers(key, value, oldValue);

      // 自动持久化到 localStorage
      this.persist(key);
    }

    setMultiple(obj: any) {
      Object.entries(obj).forEach(([key, value]) => {
        this.set(key, value);
      });
    }

    delete(key: string) {
      const result = this.data.delete(key);
      this.notifySubscribers(key, undefined);
      return result;
    }

    has(key: string) {
      return this.data.has(key);
    }

    clear() {
      this.data.clear();
      this.subscriptions.clear();
    }

    getAll() {
      const result: any = {};
      this.data.forEach((value, key) => {
        result[key] = value;
      });
      return result;
    }

    subscribe(key: string, callback: (newValue: any, oldValue: any) => void) {
      if (!this.subscriptions.has(key)) {
        this.subscriptions.set(key, []);
      }
      this.subscriptions.get(key)!.push(callback);

      return () => {
        const subs = this.subscriptions.get(key);
        if (subs) {
          const index = subs.indexOf(callback);
          if (index > -1) {
            subs.splice(index, 1);
          }
        }
      };
    }

    private notifySubscribers(key: string, newValue: any, oldValue: any) {
      const subs = this.subscriptions.get(key);
      if (subs) {
        subs.forEach(callback => callback(newValue, oldValue));
      }
    }

    persist(key: string) {
      const value = this.data.get(key);
      if (value !== undefined) {
        window.localStorage.setItem(`skill-ui-${this.componentId}-${key}`, JSON.stringify(value));
      }
    }
  };

  return {
    StateManager: class MockStateManager {
    private static instance: MockStateManager;
    private data: Map<string, any> = new Map();
    private subscriptions: Map<string, Function[]> = new Map();

    static getInstance(): MockStateManager {
      if (!MockStateManager.instance) {
        MockStateManager.instance = new MockStateManager();
      }
      return MockStateManager.instance;
    }

  set(key: string, value: any) {
      const oldValue = this.data.get(key);
      this.data.set(key, value);
      this.notifySubscribers(key, value, oldValue);

      // 自动持久化到 localStorage
      this.persist(key);
    }

    get(key: string, defaultValue?: any) {
      return this.data.get(key) ?? defaultValue;
    }

    has(key: string) {
      return this.data.has(key);
    }

    delete(key: string) {
      const result = this.data.delete(key);
      this.notifySubscribers(key, undefined);
      return result;
    }

    clear() {
      this.data.clear();
      this.subscriptions.clear();
    }

    subscribe(key: string, callback: (value: any) => void, options?: { once?: boolean }) {
      if (!this.subscriptions.has(key)) {
        this.subscriptions.set(key, []);
      }

      if (options?.once) {
        let unsubscribe: (() => void) | null = null;
        const wrappedCallback = (value: any) => {
          callback(value);
          if (unsubscribe) {
            unsubscribe();
          }
        };

        unsubscribe = this.subscribe(key, wrappedCallback);
        return unsubscribe;
      } else {
        this.subscriptions.get(key)!.push(callback);
      }

      // 返回取消订阅函数
      return () => {
        const subs = this.subscriptions.get(key);
        if (subs) {
          const index = subs.indexOf(callback);
          if (index > -1) {
            subs.splice(index, 1);
          }
        }
      };
    }

    subscribeOnce(key: string, callback: (value: any) => void) {
      let unsubscribe: (() => void) | null = null;
      const wrappedCallback = (value: any) => {
        callback(value);
        if (unsubscribe) {
          unsubscribe();
        }
      };

      unsubscribe = this.subscribe(key, wrappedCallback);
      return unsubscribe;
    }

    subscribeMultiple(keys: string[], callback: (value: any) => void) {
      const unsubscribes = keys.map(key => this.subscribe(key, callback));
      return () => unsubscribes.forEach(unsub => unsub());
    }

    setMultiple(pairs: { key: string; value: any }[]) {
      pairs.forEach(({ key, value }) => {
        this.set(key, value);
      });
    }

    private notifySubscribers(key: string, value: any, oldValue: any) {
      const subs = this.subscriptions.get(key);
      if (subs) {
        subs.forEach(callback => callback({
          key,
          newValue: value,
          oldValue,
          source: 'unknown',
          timestamp: new Date()
        }));
      }
    }

    // 添加 localStorage 模拟
    persist(key: string) {
      const value = this.data.get(key);
      if (value !== undefined) {
        window.localStorage.setItem(`skill-ui-${key}`, JSON.stringify(value));
      }
    }

    createProxy(initialState: any) {
      const proxy = new Proxy({}, {
        get: (target, prop) => {
          if (typeof prop === 'string') {
            return this.data.get(prop) || (initialState && initialState[prop]);
          }
        },
        set: (target, prop, value) => {
          if (typeof prop === 'string') {
            this.set(prop, value);
          }
          return true;
        }
      });

      // 初始化状态
      if (initialState) {
        Object.keys(initialState).forEach(key => {
          if (!this.data.has(key)) {
            this.set(key, initialState[key]);
          }
        });
      }

      return proxy;
    }
  },
  ComponentStateManager: class MockComponentStateManager {
    private data: Map<string, any> = new Map();
    private subscriptions: Map<string, Function[]> = new Map();

    constructor(private componentId: string, initialState?: any) {
      // 如果有初始状态，则设置默认值
      if (initialState) {
        Object.entries(initialState).forEach(([key, value]) => {
          if (!this.data.has(key)) {
            this.data.set(key, value);
          }
        });
      }
    }

    get(key: string, defaultValue?: any) {
      return this.data.get(key) ?? defaultValue;
    }

  set(key: string, value: any) {
      const oldValue = this.data.get(key);
      this.data.set(key, value);
      this.notifySubscribers(key, value, oldValue);

      // 自动持久化到 localStorage
      this.persist(key);
    }

    setMultiple(obj: any) {
      Object.entries(obj).forEach(([key, value]) => {
        this.set(key, value);
      });
    }

    delete(key: string) {
      const result = this.data.delete(key);
      this.notifySubscribers(key, undefined);
      return result;
    }

    has(key: string) {
      return this.data.has(key);
    }

    clear() {
      this.data.clear();
      this.subscriptions.clear();
    }

    getAll() {
      const result: any = {};
      this.data.forEach((value, key) => {
        result[key] = value;
      });
      return result;
    }

    subscribe(key: string, callback: (newValue: any, oldValue: any) => void) {
      if (!this.subscriptions.has(key)) {
        this.subscriptions.set(key, []);
      }
      this.subscriptions.get(key)!.push(callback);

      return () => {
        const subs = this.subscriptions.get(key);
        if (subs) {
          const index = subs.indexOf(callback);
          if (index > -1) {
            subs.splice(index, 1);
          }
        }
      };
    }

    private notifySubscribers(key: string, newValue: any, oldValue: any) {
      const subs = this.subscriptions.get(key);
      if (subs) {
        subs.forEach(callback => callback(newValue, oldValue));
      }
    }

    persist(key: string) {
      const value = this.data.get(key);
      if (value !== undefined) {
        window.localStorage.setItem(`skill-ui-${this.componentId}-${key}`, JSON.stringify(value));
      }
    }
  },
  globalState: {
    _data: new Map(),
    set(key: string, value: any) {
      this._data.set(key, value);
    },
    get(key: string, defaultValue?: any) {
      return this._data.get(key) ?? defaultValue;
    },
    has(key: string) {
      return this._data.has(key);
    },
    delete(key: string) {
      return this._data.delete(key);
    }
  },
  createStateManager: (componentId: string, initialState?: any) => {
    // 直接返回 ComponentStateManager 实例
    return new (class extends MockComponentStateManager {
      constructor() {
        super(componentId, initialState);
      }
    })();
  },
});

// 设置测试工具函数
export const createMockData = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `测试项目 ${i + 1}`,
      description: `这是第 ${i + 1} 个测试项目的描述`,
      status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)],
      value: Math.floor(Math.random() * 100),
    });
  }
  return data;
};

export const waitForElement = (selector: string, timeout = 5000): Promise<Element> => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const check = () => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }

      if (Date.now() - startTime > timeout) {
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
        return;
      }

      requestAnimationFrame(check);
    };

    check();
  });
};

export const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));