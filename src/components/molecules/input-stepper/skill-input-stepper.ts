import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { baseStyles } from '../../../styles/base';
import { inputStepperStyles } from './skill-input-stepper.styles';
import type { Size } from '../../../types';

/**
 * Skill Input Stepper Component
 *
 * 带增减按钮的数字输入框分子组件
 *
 * @slot prefix - Prefix content (e.g., currency symbol)
 * @slot suffix - Suffix content (e.g., unit)
 *
 * @csspart container - Main container
 * @csspart decrement-button - Decrement button
 * @csspart increment-button - Increment button
 * @csspart input - Number input element
 * @csspart helper-text - Helper text element
 *
 * @cssprop --input-stepper-width - Component width
 * @cssprop --input-stepper-bg - Background color
 * @cssprop --input-stepper-border - Border color
 * @cssprop --input-stepper-radius - Border radius
 * @cssprop --input-stepper-button-bg - Button background color
 * @cssprop --input-stepper-button-hover - Button hover color
 *
 * @fires skill-change - When value changes
 * @fires skill-input - When input value changes
 * @fires skill-focus - When input gains focus
 * @fires skill-blur - When input loses focus
 *
 * @example
 * ```html
 * <skill-input-stepper
 *   label="数量"
 *   value="1"
 *   min="0"
 *   max="10"
 *   step="1"
 * >
 * </skill-input-stepper>
 *
 * <skill-input-stepper
 *   label="价格"
 *   value="100"
 *   min="0"
 *   max="1000"
 *   step="10"
 *   prefix="¥"
 *   suffix="元"
 * >
 * </skill-input-stepper>
 * ```
 */

@customElement('skill-input-stepper')
export class SkillInputStepper extends LitElement {
  static styles = [
    baseStyles,
    inputStepperStyles
  ];

  @query('.input-stepper__input')
  private _inputElement!: HTMLInputElement;

  /**
   * Label text
   */
  @property({ type: String })
  label = '';

  /**
   * Input value
   */
  @property({ type: Number })
  value: number = 0;

  /**
   * Minimum value
   */
  @property({ type: Number })
  min: number = Number.NEGATIVE_INFINITY;

  /**
   * Maximum value
   */
  @property({ type: Number })
  max: number = Number.POSITIVE_INFINITY;

  /**
   * Step value for increment/decrement
   */
  @property({ type: Number })
  step: number = 1;

  /**
   * Precision (decimal places)
   */
  @property({ type: Number })
  precision: number = 0;

  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Required field
   */
  @property({ type: Boolean })
  required = false;

  /**
   * Readonly state
   */
  @property({ type: Boolean })
  readonly = false;

  /**
   * Size variant
   */
  @property({ type: String, reflect: true })
  size: Extract<Size, 'sm' | 'md' | 'lg'> = 'md';

  /**
   * Error state
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Success state
   */
  @property({ type: Boolean, reflect: true })
  success = false;

  /**
   * Warning state
   */
  @property({ type: Boolean, reflect: true })
  warning = false;

  /**
   * Error message
   */
  @property({ type: String, attribute: 'error-message' })
  errorMessage = '';

  /**
   * Helper text
   */
  @property({ type: String, attribute: 'helper-text' })
  helperText = '';

  /**
   * Placeholder text
   */
  @property({ type: String })
  placeholder = '';

  /**
   * Name attribute for forms
   */
  @property({ type: String })
  name = '';

  /**
   * Whether to show spinner buttons
   */
  @property({ type: Boolean, attribute: 'show-buttons' })
  showButtons = true;

  /**
   * Loading state
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Prefix text (e.g., currency symbol)
   */
  @property({ type: String })
  prefix = '';

  /**
   * Suffix text (e.g., unit)
   */
  @property({ type: String })
  suffix = '';

  private _inputValue: string = '';

  protected willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('value')) {
      this._inputValue = this.formatValue(this.value);
    }
  }

  render() {
    const containerClasses = {
      'input-stepper__container': true,
      'error': this.error,
      'success': this.success,
      'warning': this.warning,
      'input-stepper--loading': this.loading
    };

    const wrapperClasses = {
      'input-stepper-wrapper': true,
      [`input-stepper--${this.size}`]: true
    };

    return html`
      <div class="${this._classMap(wrapperClasses)}">
        ${this.label ? html`
          <label class="input-stepper__label">
            ${this.label}
            ${this.required ? html`<span aria-label="required">*</span>` : ''}
          </label>
        ` : ''}

        <div part="container" class="${this._classMap(containerClasses)}">
          ${this.prefix ? html`
            <div class="input-stepper__prefix">
              <slot name="prefix">${this.prefix}</slot>
            </div>
          ` : ''}

          ${this.showButtons ? html`
            <button
              part="decrement-button"
              class="input-stepper__button input-stepper__decrement"
              type="button"
              ?disabled=${this.disabled || this.readonly || this.value <= this.min}
              @click=${this._handleDecrement}
              aria-label="Decrease value"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"/>
              </svg>
            </button>
          ` : ''}

          <input
            part="input"
            class="input-stepper__input"
            type="number"
            .value=${this._inputValue}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled || this.loading}
            ?readonly=${this.readonly}
            ?required=${this.required}
            name=${this.name}
            min=${this.isFinite(this.min) ? this.min : ''}
            max=${this.isFinite(this.max) ? this.max : ''}
            step=${this.step}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
            @keydown=${this._handleKeydown}
          />

          ${this.showButtons ? html`
            <button
              part="increment-button"
              class="input-stepper__button input-stepper__increment"
              type="button"
              ?disabled=${this.disabled || this.readonly || this.value >= this.max}
              @click=${this._handleIncrement}
              aria-label="Increase value"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          ` : ''}

          ${this.suffix ? html`
            <div class="input-stepper__suffix">
              <slot name="suffix">${this.suffix}</slot>
            </div>
          ` : ''}
        </div>

        ${this._renderHelperText()}
      </div>
    `;
  }

  private _renderHelperText() {
    if (!this.errorMessage && !this.helperText) return '';

    const helperClass = this.errorMessage
      ? 'input-stepper__helper input-stepper__error'
      : this.success
        ? 'input-stepper__helper input-stepper__success'
        : this.warning
          ? 'input-stepper__helper input-stepper__warning'
          : 'input-stepper__helper';

    const text = this.errorMessage || this.helperText;

    return html`
      <p part="helper-text" class="${helperClass}">
        ${text}
      </p>
    `;
  }

  private _handleDecrement() {
    if (this.disabled || this.readonly || this.loading) return;

    const newValue = this.value - this.step;
    if (newValue >= this.min) {
      this.value = this.clampValue(newValue);
      this._dispatchChangeEvent();
    }
  }

  private _handleIncrement() {
    if (this.disabled || this.readonly || this.loading) return;

    const newValue = this.value + this.step;
    if (newValue <= this.max) {
      this.value = this.clampValue(newValue);
      this._dispatchChangeEvent();
    }
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const rawValue = input.value;

    this._inputValue = rawValue;

    const parsedValue = parseFloat(rawValue);
    if (!isNaN(parsedValue)) {
      this.value = this.clampValue(parsedValue);
    }

    this.dispatchEvent(new CustomEvent('skill-input', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
        rawValue,
        originalEvent: e
      }
    }));
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const parsedValue = parseFloat(input.value);

    if (!isNaN(parsedValue)) {
      this.value = this.clampValue(parsedValue);
      this._inputValue = this.formatValue(this.value);
    } else {
      this._inputValue = this.formatValue(this.value);
    }

    this._dispatchChangeEvent();
  }

  private _handleFocus(e: FocusEvent) {
    this.dispatchEvent(new CustomEvent('skill-focus', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: e }
    }));
  }

  private _handleBlur(e: FocusEvent) {
    this._inputValue = this.formatValue(this.value);

    this.dispatchEvent(new CustomEvent('skill-blur', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: e }
    }));
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (this.disabled || this.readonly) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        this._handleIncrement();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this._handleDecrement();
        break;
    }
  }

  private _dispatchChangeEvent() {
    this.dispatchEvent(new CustomEvent('skill-change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    }));
  }

  private formatValue(value: number): string {
    if (!this.isFinite(value)) return '';
    return value.toFixed(this.precision);
  }

  private clampValue(value: number): number {
    return Math.max(this.min, Math.min(this.max, value));
  }

  private isFinite(value: number): boolean {
    return Number.isFinite(value);
  }

  private _classMap(classes: Record<string, boolean>): string {
    return Object.entries(classes)
      .filter(([, enabled]) => enabled)
      .map(([className]) => className)
      .join(' ');
  }

  /**
   * Focus the input element
   */
  public focus() {
    this._inputElement?.focus();
  }

  /**
   * Blur the input element
   */
  public blur() {
    this._inputElement?.blur();
  }

  /**
   * Select the input text
   */
  public select() {
    this._inputElement?.select();
  }

  /**
   * Step up the value
   */
  public stepUp() {
    this._handleIncrement();
  }

  /**
   * Step down the value
   */
  public stepDown() {
    this._handleDecrement();
  }

  /**
   * Check if the current value is valid
   */
  public checkValidity(): boolean {
    const isValidNumber = this.isFinite(this.value);
    const isInRange = this.value >= this.min && this.value <= this.max;
    const isRequired = this.required ? isValidNumber : true;

    return isValidNumber && isInRange && isRequired;
  }

  /**
   * Set a custom validity message
   */
  public setCustomValidity(message: string) {
    this.errorMessage = message;
    this.error = !!message;
  }

  /**
   * Reset to initial value
   */
  public reset() {
    this.value = 0;
    this._inputValue = this.formatValue(this.value);
    this.error = false;
    this.errorMessage = '';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skill-input-stepper': SkillInputStepper;
  }
}