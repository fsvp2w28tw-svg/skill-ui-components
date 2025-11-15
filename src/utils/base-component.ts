import { LitElement } from 'lit';
import { html } from 'lit';
import {
  createErrorHandler,
  SkillValidator
} from './error-handler';

/**
 * Skill Base Component - 提供统一的验证和错误处理
 */
export abstract class SkillBaseComponent extends LitElement {
  /** 错误处理器 */
  protected errorHandler = createErrorHandler(this.constructor.name);

  /**
   * 验证属性变化
   */
  protected validatePropertyChanges(changedProperties: Map<string, any>): void {
    try {
      // 子类可以重写此方法添加自定义验证
      this.validateProperties(changedProperties);
    } catch (error) {
      this.errorHandler.handle(error as Error, 'validatePropertyChanges', 'medium');
      throw error; // 重新抛出，让 Lit 继续处理
    }
  }

  /**
   * 属性验证 - 子类可重写
   */
  protected validateProperties(changedProperties: Map<string, any>): void {
    // 基础验证逻辑
    this.validateCommonProperties(changedProperties);
  }

  /**
   * 通用属性验证
   */
  private validateCommonProperties(changedProperties: Map<string, any>): void {
    // 验证常见的数组属性
    if (changedProperties.has('data') || changedProperties.has('items') || changedProperties.has('list')) {
      const prop = changedProperties.has('data') ? 'data' :
                  changedProperties.has('items') ? 'items' : 'list';
      const value = this[prop as keyof this];

      if (value !== null && value !== undefined) {
        SkillValidator.arrayLength(prop, value, 0, undefined, this.constructor.name);
      }
    }

    // 验证数字范围属性
    const numericProps = ['itemHeight', 'bufferSize', 'min', 'max', 'step'];
    numericProps.forEach(prop => {
      if (changedProperties.has(prop)) {
        const value = this[prop as keyof this];
        if (typeof value === 'number') {
          SkillValidator.range(prop, value, 0, undefined, this.constructor.name);
        }
      }
    });

    // 验证布尔属性
    const booleanProps = ['loading', 'disabled', 'multiple', 'selectable', 'searchable'];
    booleanProps.forEach(prop => {
      if (changedProperties.has(prop)) {
        const value = this[prop as keyof this];
        if (value !== null && value !== undefined && typeof value !== 'boolean') {
          throw new Error(`属性 ${prop} 必须是布尔值`);
        }
      }
    });
  }

  /**
   * 安全的渲染方法包装器
   */
  protected safeRender(renderCallback: () => any): any {
    try {
      return renderCallback();
    } catch (error) {
      this.errorHandler.handle(error as Error, 'render', 'critical');
      return this.renderErrorFallback(error as Error);
    }
  }

  /**
   * 错误回退UI
   */
  protected renderErrorFallback(error: Error): any {
    const errorMessage = this.errorHandler.handle(error).userMessage || `${this.constructor.name} 组件出现错误`;

    return this.renderErrorMessage(errorMessage);
  }

  /**
   * 渲染错误消息 - 子类可重写以自定义错误UI
   */
  protected renderErrorMessage(message: string) {
    return html`
      <div class="skill-error__container" style="
        padding: 2rem;
        text-align: center;
        color: #dc3545;
        background: #fdf2f2;
        border: 1px solid #fecaca;
        border-radius: 8px;
        margin: 1rem 0;
      ">
        <div style="font-size: 2rem; margin-bottom: 1rem;">⚠️</div>
        <h3 style="margin: 0 0 0.5rem 0; color: #b91c1c;">组件渲染错误</h3>
        <p style="margin: 0 0 1rem 0;">${message}</p>
        <button @click=${() => this.refresh()} style="
          background: #007bff;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.875rem;
        ">重试</button>
      </div>
    `;
  }

  /**
   * 刷新组件 - 子类可重写
   */
  protected refresh(): void {
    this.requestUpdate();
  }

  /**
   * 验证必填属性
   */
  protected validateRequired(propName: string, value: any): void {
    SkillValidator.required(value, propName, this.constructor.name);
  }

  /**
   * 验证枚举值
   */
  protected validateEnum<T>(value: T, allowedValues: T[], propName: string): void {
    SkillValidator.enum(value, allowedValues, propName, this.constructor.name);
  }

  /**
   * 验证字符串模式
   */
  protected validatePattern(value: string, regex: RegExp, propName: string): void {
    if (typeof value === 'string') {
      SkillValidator.pattern(value, regex, propName, this.constructor.name);
    }
  }

  /**
   * 验证CSS长度值
   */
  protected validateCssLength(value: string, propName: string): void {
    if (typeof value === 'string' && value) {
      if (!/^\d+(\.\d+)?(px|em|rem|vh|vw|%)$/.test(value)) {
        throw new Error(`属性 ${propName} 必须是有效的CSS长度单位 (px, em, rem, vh, vw, %)`);
      }
    }
  }
}