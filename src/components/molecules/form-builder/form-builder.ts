import { LitElement, html, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { formBuilderStyles } from './form-builder.styles.js';
import type {
  FormBuilderConfig,
  FormBuilderData,
  FormBuilderError,
  FormFieldConfig,
  FormSectionConfig,
  FormBuilderEvent
} from './types.js';

/**
 * Form Builder - 动态表单构建器
 *
 * @element skill-form-builder
 *
 * @example
 * ```html
 * <skill-form-builder
 *   .config="${formConfig}"
 *   .data="${formData}"
 *   @submit="${handleSubmit}"
 * ></skill-form-builder>
 * ```
 */
@customElement('skill-form-builder')
export class SkillFormBuilder extends LitElement {
  static styles = formBuilderStyles;

  @property({ type: Object })
  config: FormBuilderConfig = {
    sections: []
  };

  @property({ type: Object })
  data: FormBuilderData = {};

  @state()
  private errors: FormBuilderError = {};

  @state()
  private collapsedSections: Set<string> = new Set();

  @state()
  private loading = false;

  /**
   * 验证整个表单
   */
  validateForm(): boolean {
    const newErrors: FormBuilderError = {};
    let isValid = true;

    this.config.sections.forEach(section => {
      section.fields.forEach(field => {
        const error = this.validateField(field, this.data[field.name]);
        if (error) {
          newErrors[field.name] = error;
          isValid = false;
        }
      });
    });

    this.errors = newErrors;
    return isValid;
  }

  /**
   * 验证单个字段
   */
  private validateField(field: FormFieldConfig, value: any): string | null {
    const { validation, required } = field;

    // 必填验证
    if (required && (!value || value === '')) {
      return `${field.label}是必填项`;
    }

    if (!value) return null;

    const validationRules = validation || {};

    // 长度验证
    if (typeof value === 'string') {
      if (validationRules.minLength && value.length < validationRules.minLength) {
        return `${field.label}最少需要${validationRules.minLength}个字符`;
      }
      if (validationRules.maxLength && value.length > validationRules.maxLength) {
        return `${field.label}最多允许${validationRules.maxLength}个字符`;
      }
    }

    // 数字范围验证
    if (field.type === 'number' || field.type === 'range') {
      const numValue = Number(value);
      if (validationRules.min !== undefined && numValue < validationRules.min) {
        return `${field.label}不能小于${validationRules.min}`;
      }
      if (validationRules.max !== undefined && numValue > validationRules.max) {
        return `${field.label}不能大于${validationRules.max}`;
      }
    }

    // 正则表达式验证
    if (validationRules.pattern && typeof value === 'string') {
      const regex = new RegExp(validationRules.pattern);
      if (!regex.test(value)) {
        return `${field.label}格式不正确`;
      }
    }

    // 自定义验证
    if (validationRules.custom) {
      const customError = validationRules.custom(value);
      if (customError) {
        return customError;
      }
    }

    return null;
  }

  /**
   * 检查字段依赖
   */
  private checkFieldDependencies(field: FormFieldConfig): boolean {
    if (!field.dependentOn || field.dependentOn.length === 0) {
      return true;
    }

    return field.dependentOn.every(dependency => {
      const dependentValue = this.data[dependency.field];

      switch (dependency.action) {
        case 'show':
          return dependentValue === dependency.value;
        case 'hide':
          return dependentValue !== dependency.value;
        case 'enable':
          return dependentValue === dependency.value;
        case 'disable':
          return dependentValue !== dependency.value;
        default:
          return true;
      }
    });
  }

  /**
   * 处理字段值变化
   */
  private handleFieldChange(fieldName: string, value: any) {
    // 更新数据
    this.data = { ...this.data, [fieldName]: value };

    // 清除该字段的错误
    if (this.errors[fieldName]) {
      this.errors = { ...this.errors, [fieldName]: null };
    }

    // 触发字段变化事件
    this.dispatchEvent(new CustomEvent('field-change', {
      detail: {
        type: 'field-change',
        field: fieldName,
        data: this.data
      } as FormBuilderEvent
    }));
  }

  /**
   * 渲染表单字段
   */
  private renderField(field: FormFieldConfig) {
    const isVisible = this.checkFieldDependencies(field);
    const isDisabled = field.dependentOn?.some(dep =>
      dep.action === 'disable' && this.data[dep.field] === dep.value
    );

    if (!isVisible) {
      return nothing;
    }

    const commonProps = {
      name: field.name,
      value: this.data[field.name] || field.defaultValue || '',
      placeholder: field.placeholder,
      disabled: isDisabled,
      ...field.attributes
    };

    let fieldElement: ReturnType<typeof html>;

    switch (field.type) {
      case 'textarea':
        fieldElement = html`
          <skill-textarea
            ${Object.entries(commonProps).map(([key, value]) =>
              html` .${key}="${value}" `
            )}
          ></skill-textarea>
        `;
        break;

      case 'select':
        fieldElement = html`
          <skill-select
            ${Object.entries(commonProps).map(([key, value]) =>
              html` .${key}="${value}" `
            )}
            .options="${field.options || []}"
          ></skill-select>
        `;
        break;

      case 'radio':
        fieldElement = html`
          <div class="radio-group ${field.attributes?.horizontal ? 'radio-horizontal' : ''}">
            ${field.options?.map(option => html`
              <skill-radio
                name="${field.name}"
                value="${option.value}"
                ?checked="${commonProps.value === option.value}"
                ?disabled="${isDisabled || option.disabled}"
                @change="${(e: CustomEvent) => this.handleFieldChange(field.name, e.detail.value)}"
              >
                ${option.label}
              </skill-radio>
            `)}
          </div>
        `;
        break;

      case 'checkbox':
        fieldElement = html`
          <skill-checkbox
            ?checked="${!!commonProps.value}"
            ?disabled="${isDisabled}"
            @change="${(e: CustomEvent) => this.handleFieldChange(field.name, e.detail.checked)}"
          >
            ${field.label}
          </skill-checkbox>
        `;
        break;

      case 'switch':
        fieldElement = html`
          <skill-switch
            ?checked="${!!commonProps.value}"
            ?disabled="${isDisabled}"
            @change="${(e: CustomEvent) => this.handleFieldChange(field.name, e.detail.checked)}"
          >
            ${field.label}
          </skill-switch>
        `;
        break;

      case 'file':
        fieldElement = html`
          <skill-file-upload
            ${Object.entries(commonProps).map(([key, value]) =>
              html` .${key}="${value}" `
            )}
            @change="${(e: CustomEvent) => this.handleFieldChange(field.name, e.detail.files)}"
          ></skill-file-upload>
        `;
        break;

      case 'color':
        fieldElement = html`
          <skill-color-picker
            ${Object.entries(commonProps).map(([key, value]) =>
              html` .${key}="${value}" `
            )}
            @change="${(e: CustomEvent) => this.handleFieldChange(field.name, e.detail.value)}"
          ></skill-color-picker>
        `;
        break;

      default:
        fieldElement = html`
          <skill-input
            ${Object.entries(commonProps).map(([key, value]) =>
              html` .${key}="${value}" `
            )}
            type="${field.type}"
            @input="${(e: CustomEvent) => this.handleFieldChange(field.name, e.detail.value)}"
          ></skill-input>
        `;
    }

    const fieldClasses = [
      'form-field',
      isDisabled ? 'disabled' : '',
      field.layout?.width ? `field-width-${field.layout.width}` : 'field-width-full'
    ].filter(Boolean).join(' ');

    return html`
      <div class="${fieldClasses}">
        ${field.type !== 'checkbox' && field.type !== 'switch' ? html`
          <label class="field-label" for="${field.name}">
            ${field.label}
            ${field.validation?.required ? html`<span class="field-required">*</span>` : ''}
          </label>
        ` : ''}

        <div class="field-group ${field.type === 'checkbox' || field.type === 'switch' ? `field-${field.type}` : ''}">
          ${fieldElement}
        </div>

        ${field.description ? html`
          <div class="field-description">${field.description}</div>
        ` : ''}

        ${this.errors[field.name] ? html`
          <div class="field-error">${this.errors[field.name]}</div>
        ` : ''}
      </div>
    `;
  }

  /**
   * 渲染表单区块
   */
  private renderSection(section: FormSectionConfig, index: number) {
    const sectionId = `section-${index}`;
    const isCollapsed = this.collapsedSections.has(sectionId);

    return html`
      <div class="form-section">
        ${section.title || section.description ? html`
          <div class="section-header">
            <div>
              ${section.title ? html`<h3 class="section-title">${section.title}</h3>` : ''}
              ${section.description ? html`<p class="section-description">${section.description}</p>` : ''}
            </div>
            ${section.collapsible ? html`
              <button
                class="section-toggle ${isCollapsed ? 'collapsed' : ''}"
                @click="${() => this.toggleSection(sectionId)}"
                type="button"
              >
                <skill-icon name="chevron-down"></skill-icon>
              </button>
            ` : ''}
          </div>
        ` : ''}

        <div class="section-content ${isCollapsed ? 'collapsed' : ''}">
          <div class="form-fields columns-${this.config.layout?.columns || 1} spacing-${this.config.layout?.spacing || 'normal'}">
            ${section.fields
              .sort((a, b) => (a.layout?.order || 0) - (b.layout?.order || 0))
              .map(field => this.renderField(field))
            }
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 切换区块折叠状态
   */
  private toggleSection(sectionId: string) {
    const newCollapsed = new Set(this.collapsedSections);
    if (newCollapsed.has(sectionId)) {
      newCollapsed.delete(sectionId);
    } else {
      newCollapsed.add(sectionId);
    }
    this.collapsedSections = newCollapsed;
  }

  /**
   * 处理表单提交
   */
  private handleSubmit(e: Event) {
    e.preventDefault();

    if (this.validateForm()) {
      this.dispatchEvent(new CustomEvent('submit', {
        detail: {
          type: 'submit',
          data: this.data,
          errors: this.errors
        } as FormBuilderEvent
      }));
    } else {
      this.dispatchEvent(new CustomEvent('validation-error', {
        detail: {
          type: 'validation-error',
          data: this.data,
          errors: this.errors
        } as FormBuilderEvent
      }));
    }
  }

  /**
   * 处理表单重置
   */
  private handleReset() {
    this.data = {};
    this.errors = {};
    this.dispatchEvent(new CustomEvent('reset', {
      detail: {
        type: 'reset',
        data: {}
      } as FormBuilderEvent
    }));
  }

  /**
   * 渲染表单操作按钮
   */
  private renderActions() {
    return html`
      <div class="form-actions">
        ${this.config.resetButton?.show !== false ? html`
          <skill-button
            variant="${this.config.resetButton?.variant || 'secondary'}"
            type="button"
            @click="${this.handleReset}"
          >
            ${this.config.resetButton?.text || '重置'}
          </skill-button>
        ` : ''}

        <skill-button
          variant="${this.config.submitButton?.variant || 'primary'}"
          type="submit"
          ?disabled="${this.config.submitButton?.disabled}"
          ?loading="${this.loading || this.config.submitButton?.loading}"
        >
          ${this.config.submitButton?.text || '提交'}
        </skill-button>
      </div>
    `;
  }

  render() {
    return html`
      <form
        class="form-builder ${this.loading ? 'form-loading' : ''}"
        @submit="${this.handleSubmit}"
      >
        ${this.config.sections.map((section, index) => this.renderSection(section, index))}

        ${this.renderActions()}
      </form>
    `;
  }
}