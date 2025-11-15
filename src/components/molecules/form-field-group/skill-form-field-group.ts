import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../../styles/base';
import { formFieldGroupStyles } from './skill-form-field-group.styles';
import type { Size, Variant } from '../../../types';

/**
 * Skill Form Field Group Component
 *
 * 用于组合多个相关表单字段的分子组件
 *
 * @slot - Default slot for form fields
 * @slot title - Group title slot
 * @slot description - Group description slot
 * @slot actions - Action buttons slot
 * @slot footer - Footer content slot
 *
 * @csspart container - Main container
 * @csspart header - Header section
 * @csspart title - Title element
 * @csspart description - Description element
 * @csspart content - Content area
 * @csspart footer - Footer section
 * @csspart actions - Action buttons container
 *
 * @cssprop --form-field-gap - Gap between form fields
 * @cssprop --form-field-bg - Background color
 * @cssprop --form-field-border - Border color
 * @cssprop --form-field-radius - Border radius
 * @cssprop --form-field-padding - Padding
 *
 * @fires skill-change - When any form field value changes
 * @fires skill-submit - When form is submitted
 * @fires skill-reset - When form is reset
 *
 * @example
 * ```html
 * <skill-form-field-group
 *   title="用户信息"
 *   description="请填写您的基本信息"
 *   variant="outlined"
 *   size="md"
 * >
 *   <skill-input label="姓名" placeholder="请输入姓名"></skill-input>
 *   <skill-input label="邮箱" type="email" placeholder="请输入邮箱"></skill-input>
 *   <skill-input label="电话" placeholder="请输入电话号码"></skill-input>
 * </skill-form-field-group>
 * ```
 */

@customElement('skill-form-field-group')
export class SkillFormFieldGroup extends LitElement {
  static styles = [
    baseStyles,
    formFieldGroupStyles
  ];

  /**
   * 表单组标题
   */
  @property({ type: String, reflect: true })
  title = '';

  /**
   * 表单组描述
   */
  @property({ type: String, reflect: true })
  description?: string;

  /**
   * 视觉变体
   * @type {'default' | 'outlined' | 'filled' | 'ghost'}
   */
  @property({ type: String, reflect: true })
  variant: Variant = 'default';

  /**
   * 尺寸
   * @type {'compact' | 'md' | 'spacious'}
   */
  @property({ type: String, reflect: true })
  size: Size = 'md';

  /**
   * 是否必填
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * 是否禁用
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * 只读状态
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * 错误信息
   */
  @property({ type: String, reflect: true })
  error?: string;

  /**
   * 是否显示边框
   */
  @property({ type: Boolean, reflect: true })
  bordered = true;

  /**
   * 是否可折叠
   */
  @property({ type: Boolean, reflect: true })
  collapsible = false;

  /**
   * 是否默认折叠
   */
  @property({ type: Boolean, reflect: true })
  collapsed = false;

  /**
   * 表单字段间距
   */
  @property({ type: String })
  gap?: string;

  /**
   * 表单名称（用于表单提交）
   */
  @property({ type: String, reflect: true })
  name?: string;

  
  protected willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('size')) {
      this._updateSize();
    }
    if (changedProperties.has('gap')) {
      this.style.setProperty('--form-field-gap', this.gap || '');
    }
  }

  private _updateSize() {
    // Update size classes based on current size
    const container = this.shadowRoot?.querySelector('.form-field-group');
    if (container) {
      // Remove all size classes first
      container.classList.remove('form-field-group--compact', 'form-field-group--spacious');

      // Add appropriate size class
      if (this.size === 'compact' || this.size === 'xs' || this.size === 'sm') {
        container.classList.add('form-field-group--compact');
      } else if (this.size === 'spacious' || this.size === 'lg' || this.size === 'xl') {
        container.classList.add('form-field-group--spacious');
      }
    }
  }

  render() {
    const isCompact = this.size === 'compact' || this.size === 'xs' || this.size === 'sm';
    const isSpacious = this.size === 'spacious' || this.size === 'lg' || this.size === 'xl';

    const containerClasses = {
      'form-field-group': true,
      'form-field-group--outlined': this.variant === 'outlined',
      'form-field-group--filled': this.variant === 'filled',
      'form-field-group--ghost': this.variant === 'ghost',
      'form-field-group--compact': isCompact,
      'form-field-group--spacious': isSpacious
    };

    return html`
      <div part="container" class="${this._classMap(containerClasses)}">
        ${this.collapsible ? this._renderCollapsibleHeader() : this._renderStaticHeader()}

        <div part="content" class="form-field-group__content" ?hidden=${this.collapsible && this.collapsed}>
          <slot></slot>
        </div>

        ${this._renderFooter()}
      </div>
    `;
  }

  private _renderStaticHeader() {
    if (!this.title && !this.description) return html``;

    return html`
      <div part="header" class="form-field-group__header">
        ${this.title ? html`
          <h3 part="title" class="form-field-group__title">
            <slot name="title">${this.title}</slot>
            ${this.required ? html`<span class="form-field-group__required">*</span>` : ''}
          </h3>
        ` : ''}

        ${this.description ? html`
          <p part="description" class="form-field-group__description">
            <slot name="description">${this.description}</slot>
          </p>
        ` : ''}
      </div>
    `;
  }

  private _renderCollapsibleHeader() {
    return html`
      <div part="header" class="form-field-group__header" style="cursor: pointer;" @click=${this._toggleCollapse}>
        ${this.title ? html`
          <h3 part="title" class="form-field-group__title">
            <slot name="title">${this.title}</slot>
            ${this.required ? html`<span class="form-field-group__required">*</span>` : ''}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              style="transition: transform 0.2s; transform: ${this.collapsed ? 'rotate(-90deg)' : 'rotate(0deg)'};"
            >
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </h3>
        ` : ''}

        ${this.description ? html`
          <p part="description" class="form-field-group__description">
            <slot name="description">${this.description}</slot>
          </p>
        ` : ''}
      </div>
    `;
  }

  private _renderFooter() {
    const actionsSlot = this.shadowRoot?.querySelector('slot[name="actions"]') as HTMLSlotElement;
    const footerSlot = this.shadowRoot?.querySelector('slot[name="footer"]') as HTMLSlotElement;
    const hasActions = actionsSlot?.assignedElements()?.length || 0;
    const hasFooter = footerSlot?.assignedElements()?.length || 0;
    const hasError = this.error;

    if (!hasActions && !hasFooter && !hasError) return html``;

    return html`
      ${hasError ? html`
        <div part="error" class="form-field-group__error">
          ${this.error}
        </div>
      ` : ''}

      <div part="footer" class="form-field-group__footer" ?hidden=${this.collapsible && this.collapsed}>
        <slot name="footer"></slot>
        <div part="actions" class="form-field-group__actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }

  private _toggleCollapse() {
    if (this.collapsible) {
      this.collapsed = !this.collapsed;
    }
  }

  private _classMap(classes: Record<string, boolean>) {
    return Object.entries(classes)
      .filter(([, enabled]) => enabled)
      .map(([className]) => className)
      .join(' ');
  }

  /**
   * 获取表单数据
   */
  public getFormData(): Record<string, any> {
    const formData: Record<string, any> = {};

    // 获取所有表单字段
    const formFields = this.querySelectorAll('skill-input, skill-select, skill-textarea, skill-checkbox, skill-radio, skill-switch');

    formFields.forEach(field => {
      const name = field.getAttribute('name') || '';
      const value = (field as any).value;

      if (name) {
        formData[name] = value;
      }
    });

    return formData;
  }

  /**
   * 验证表单
   */
  public validateForm(): boolean {
    let isValid = true;

    const formFields = this.querySelectorAll('skill-input, skill-select, skill-textarea');

    formFields.forEach(field => {
      // 如果字段有 validate 方法，调用它
      if ((field as any).validate && typeof (field as any).validate === 'function') {
        const fieldValid = (field as any).validate();
        if (!fieldValid) {
          isValid = false;
        }
      }
    });

    return isValid;
  }

  /**
   * 重置表单
   */
  public resetForm() {
    const formFields = this.querySelectorAll('skill-input, skill-select, skill-textarea');

    formFields.forEach(field => {
      // 如果字段有 reset 方法，调用它
      if ((field as any).reset && typeof (field as any).reset === 'function') {
        (field as any).reset();
      }
    });

    this.dispatchEvent(new CustomEvent('skill-reset', {
      bubbles: true,
      composed: true
    }));
  }

  /**
   * 提交表单
   */
  public submitForm() {
    if (this.validateForm()) {
      const formData = this.getFormData();

      this.dispatchEvent(new CustomEvent('skill-submit', {
        bubbles: true,
        composed: true,
        detail: { formData }
      }));
    } else {
      this.dispatchEvent(new CustomEvent('skill-error', {
        bubbles: true,
        composed: true,
        detail: { message: '表单验证失败' }
      }));
    }
  }

  /**
   * 展开折叠组
   */
  public expand() {
    if (this.collapsible) {
      this.collapsed = false;
    }
  }

  /**
   * 折叠表单组
   */
  public collapse() {
    if (this.collapsible) {
      this.collapsed = true;
    }
  }

  /**
   * 聚焦到第一个表单字段
   */
  public focusFirstField() {
    const firstField = this.querySelector('skill-input, skill-select, skill-textarea') as any;
    if (firstField && firstField.focus) {
      firstField.focus();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skill-form-field-group': SkillFormFieldGroup;
  }
}