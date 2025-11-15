/**
 * 技能UI组件库错误处理工具
 * 提供统一的错误处理、验证和边界管理功能
 */

export interface SkillErrorOptions {
  component?: string;
  context?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  recoverable?: boolean;
  userMessage?: string;
}

export class SkillError extends Error {
  public readonly component: string;
  public readonly context: string;
  public readonly severity: 'low' | 'medium' | 'high' | 'critical';
  public readonly recoverable: boolean;
  public readonly userMessage?: string;
  public readonly timestamp: Date;
  public readonly errorId: string;

  constructor(message: string, options: SkillErrorOptions = {}) {
    super(message);
    this.name = 'SkillError';

    this.component = options.component || 'UnknownComponent';
    this.context = options.context || 'General';
    this.severity = options.severity || 'medium';
    this.recoverable = options.recoverable ?? true;
    this.userMessage = options.userMessage;
    this.timestamp = new Date();
    this.errorId = this.generateErrorId();
  }

  private generateErrorId(): string {
    return `skill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      component: this.component,
      context: this.context,
      severity: this.severity,
      recoverable: this.recoverable,
      userMessage: this.userMessage,
      timestamp: this.timestamp,
      errorId: this.errorId,
      stack: this.stack
    };
  }
}

/**
 * 错误处理器类
 */
export class SkillErrorHandler {
  private static instance: SkillErrorHandler;
  private errors: SkillError[] = [];
  private errorListeners: ((error: SkillError) => void)[] = [];
  private maxErrors = 1000;

  private constructor() {}

  public static getInstance(): SkillErrorHandler {
    if (!SkillErrorHandler.instance) {
      SkillErrorHandler.instance = new SkillErrorHandler();
    }
    return SkillErrorHandler.instance;
  }

  /**
   * 处理错误
   */
  public handleError(error: Error | string, options: SkillErrorOptions = {}): SkillError {
    let skillError: SkillError;

    if (error instanceof SkillError) {
      skillError = error;
    } else if (error instanceof Error) {
      skillError = new SkillError(error.message, options);
      skillError.stack = error.stack;
    } else {
      skillError = new SkillError(String(error), options);
    }

    // 添加到错误列表
    this.addError(skillError);

    // 通知监听器
    this.notifyListeners(skillError);

    // 记录到控制台
    this.logError(skillError);

    // 触发自定义事件
    this.dispatchErrorEvent(skillError);

    return skillError;
  }

  /**
   * 添加错误监听器
   */
  public addErrorListener(listener: (error: SkillError) => void): void {
    this.errorListeners.push(listener);
  }

  /**
   * 移除错误监听器
   */
  public removeErrorListener(listener: (error: SkillError) => void): void {
    const index = this.errorListeners.indexOf(listener);
    if (index > -1) {
      this.errorListeners.splice(index, 1);
    }
  }

  /**
   * 获取错误历史
   */
  public getErrors(filter?: {
    component?: string;
    severity?: string;
    since?: Date;
  }): SkillError[] {
    let errors = [...this.errors];

    if (filter?.component) {
      errors = errors.filter(e => e.component === filter.component);
    }

    if (filter?.severity) {
      errors = errors.filter(e => e.severity === filter.severity);
    }

    if (filter?.since) {
      errors = errors.filter(e => e.timestamp >= filter.since!);
    }

    return errors.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * 清空错误历史
   */
  public clearErrors(): void {
    this.errors = [];
  }

  /**
   * 创建错误边界
   */
  public createErrorBoundary(componentName: string, fallbackContent?: string) {
    return (error: Error, context?: string) => {
      const skillError = this.handleError(error, {
        component: componentName,
        context: context || 'ErrorBoundary',
        severity: 'high',
        userMessage: fallbackContent || '组件渲染出现错误'
      });

      return {
        error: skillError,
        fallbackContent: skillError.userMessage || '组件渲染出现错误'
      };
    };
  }

  private addError(error: SkillError): void {
    this.errors.push(error);

    // 保持错误列表在合理大小
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }
  }

  private notifyListeners(error: SkillError): void {
    this.errorListeners.forEach(listener => {
      try {
        listener(error);
      } catch (err) {
        console.error('Error in error listener:', err);
      }
    });
  }

  private logError(error: SkillError): void {
    const logMethod = this.getLogMethod(error.severity);

    logMethod.call(console, `[${error.severity.toUpperCase()}] ${error.component} - ${error.message}`, {
      context: error.context,
      errorId: error.errorId,
      recoverable: error.recoverable
    });

    if (error.stack) {
      console.debug('Stack trace:', error.stack);
    }
  }

  private getLogMethod(severity: string): (...args: any[]) => void {
    switch (severity) {
      case 'critical':
      case 'high':
        return console.error;
      case 'medium':
        return console.warn;
      case 'low':
      default:
        return console.log;
    }
  }

  private dispatchErrorEvent(error: SkillError): void {
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      const event = new CustomEvent('skill-error', {
        bubbles: true,
        composed: true,
        detail: error.toJSON()
      });
      window.dispatchEvent(event);
    }
  }
}

/**
 * 工具函数：创建错误处理器
 */
export const createErrorHandler = (componentName: string) => {
  const handler = SkillErrorHandler.getInstance();

  return {
    /**
     * 处理错误
     */
    handle: (error: Error | string, context?: string, severity?: SkillErrorOptions['severity']) => {
      return handler.handleError(error, {
        component: componentName,
        context,
        severity
      });
    },

    /**
     * 包装异步函数，自动捕获错误
     */
    wrapAsync: <T extends (...args: any[]) => Promise<any>>(fn: T): T => {
      return (async (...args: any[]) => {
        try {
          return await fn(...args);
        } catch (error) {
          handler.handleError(error as Error, {
            component: componentName,
            context: `${fn.name} execution`,
            severity: 'medium'
          });
          throw error; // 重新抛出，让调用者处理
        }
      }) as T;
    },

    /**
     * 包装同步函数，自动捕获错误
     */
    wrapSync: <T extends (...args: any[]) => any>(fn: T): T => {
      return ((...args: any[]) => {
        try {
          return fn(...args);
        } catch (error) {
          handler.handleError(error as Error, {
            component: componentName,
            context: `${fn.name} execution`,
            severity: 'medium'
          });
          throw error; // 重新抛出，让调用者处理
        }
      }) as T;
    }
  };
};

/**
 * 输入验证工具
 */
export class SkillValidator {
  /**
   * 验证必填属性
   */
  static required(value: any, name: string, component?: string): void {
    if (value === null || value === undefined || value === '') {
      throw new SkillError(`属性 ${name} 是必填的`, {
        component,
        context: 'Property Validation',
        severity: 'high',
        userMessage: `缺少必填属性 ${name}`
      });
    }
  }

  /**
   * 验证数据类型
   */
  static type(value: any, expectedType: string, name: string, component?: string): void {
    const actualType = Array.isArray(value) ? 'array' : typeof value;

    if (actualType !== expectedType) {
      throw new SkillError(`属性 ${name} 类型错误，期望 ${expectedType}，实际 ${actualType}`, {
        component,
        context: 'Type Validation',
        severity: 'medium',
        userMessage: `属性 ${name} 类型不正确`
      });
    }
  }

  /**
   * 验证数组长度
   */
  static arrayLength(name: string, array: any, min?: number, max?: number, component?: string): void {
    if (array !== null && array !== undefined && !Array.isArray(array)) {
      throw new SkillError(`属性 ${name} 必须是数组`, {
        component,
        context: 'Array Length Validation',
        severity: 'medium'
      });
    }

    const arr = array as any[];
    if (min !== undefined && arr.length < min) {
      throw new SkillError(`数组 ${name} 长度不能小于 ${min}`, {
        component,
        context: 'Array Length Validation',
        severity: 'medium'
      });
    }

    if (max !== undefined && arr.length > max) {
      throw new SkillError(`数组 ${name} 长度不能大于 ${max}`, {
        component,
        context: 'Array Length Validation',
        severity: 'medium'
      });
    }
  }

  /**
   * 验证数值范围
   */
  static range(name: string, value: any, min?: number, max?: number, component?: string): void {
    SkillValidator.type(value, 'number', name, component);

    if (min !== undefined && value < min) {
      throw new SkillError(`数值 ${name} 不能小于 ${min}`, {
        component,
        context: 'Range Validation',
        severity: 'medium'
      });
    }

    if (max !== undefined && value > max) {
      throw new SkillError(`数值 ${name} 不能大于 ${max}`, {
        component,
        context: 'Range Validation',
        severity: 'medium'
      });
    }
  }

  /**
   * 验证字符串模式
   */
  static pattern(value: string, regex: RegExp, name: string, component?: string): void {
    SkillValidator.type(value, 'string', name, component);

    if (!regex.test(value)) {
      throw new SkillError(`属性 ${name} 格式不正确`, {
        component,
        context: 'Pattern Validation',
        severity: 'medium',
        userMessage: `属性 ${name} 格式不正确`
      });
    }
  }

  /**
   * 验证枚举值
   */
  static enum<T>(value: T, allowedValues: T[], name: string, component?: string): void {
    if (!allowedValues.includes(value)) {
      throw new SkillError(`属性 ${name} 的值无效，允许的值: ${allowedValues.join(', ')}`, {
        component,
        context: 'Enum Validation',
        severity: 'medium',
        userMessage: `属性 ${name} 的值不正确`
      });
    }
  }
}

/**
 * 装饰器：自动错误处理
 */
export function CatchErrors(componentName?: string, options: SkillErrorOptions = {}) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      try {
        const result = originalMethod.apply(this, args);

        // 处理 Promise
        if (result && typeof result.catch === 'function') {
          return result.catch((error: Error) => {
            SkillErrorHandler.getInstance().handleError(error, {
              component: componentName || target.constructor.name,
              context: `${propertyKey} method`,
              ...options
            });
            throw error;
          });
        }

        return result;
      } catch (error) {
        SkillErrorHandler.getInstance().handleError(error as Error, {
          component: componentName || target.constructor.name,
          context: `${propertyKey} method`,
          ...options
        });
        throw error;
      }
    };

    return descriptor;
  };
}

/**
 * 装饰器：属性验证
 */
export function Validate(options: {
  required?: boolean;
  type?: string;
  min?: number;
  max?: number;
  pattern?: RegExp;
  enum?: any[];
}) {
  return function (target: any, propertyKey: string) {
    const privateKey = `__validation_${propertyKey}`;

    // 存储验证配置
    target[privateKey] = options;

    // 在属性设置时进行验证
    const originalSetter = Object.getOwnPropertyDescriptor(target, propertyKey)?.set;

    Object.defineProperty(target, propertyKey, {
      set: function (value: any) {
        const component = target.constructor?.name || 'UnknownComponent';
        const validationOptions = this[privateKey] || options;

        // 执行验证
        if (validationOptions.required) {
          SkillValidator.required(value, propertyKey, component);
        }

        if (validationOptions.type && value !== null && value !== undefined) {
          SkillValidator.type(value, validationOptions.type, propertyKey, component);
        }

        if (Array.isArray(value)) {
          SkillValidator.arrayLength(
            propertyKey,
            value,
            validationOptions.min,
            validationOptions.max,
            component
          );
        } else if (typeof value === 'number') {
          SkillValidator.range(
            propertyKey,
            value,
            validationOptions.min,
            validationOptions.max,
            component
          );
        }

        if (typeof value === 'string' && validationOptions.pattern) {
          SkillValidator.pattern(value, validationOptions.pattern, propertyKey, component);
        }

        if (validationOptions.enum) {
          SkillValidator.enum(value, validationOptions.enum, propertyKey, component);
        }

        // 调用原始setter
        if (originalSetter) {
          originalSetter.call(this, value);
        } else {
          this[`_${propertyKey}`] = value;
        }
      },
      get: function () {
        return this[`_${propertyKey}`];
      },
      enumerable: true,
      configurable: true
    });
  };
}