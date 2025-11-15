import { LitElement, html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { inputStyles } from './skill-input.styles';
import { baseStyles } from '../../../styles/base';
import type { Size } from '../../../types';

/**
 * Skill Input Component
 *
 * @slot icon-left - Icon positioned before input
 * @slot icon-right - Icon positioned after input
 *
 * @csspart wrapper - The wrapper element
 * @csspart label - The label element
 * @csspart container - The input container
 * @csspart input - The input element
 * @csspart helper-text - The helper/error text element
 *
 * @fires skill-input - Dispatched when input value changes
 * @fires skill-change - Dispatched when input loses focus
 * @fires skill-focus - Dispatched when input gains focus
 * @fires skill-blur - Dispatched when input loses focus
 *
 * @example
 * ```html
 * <skill-input label="Email" placeholder="Enter your email"></skill-input>
 * <skill-input label="Password" type="password" error="Password is required"></skill-input>
 * <skill-input helper-text="We'll never share your email"></skill-input>
 * ```
 */
@customElement('skill-input')
export class SkillInput extends LitElement {
  static styles = [baseStyles, inputStyles];

  @query('.skill-input')
  private _inputElement!: HTMLInputElement;

  /**
   * Label text
   */
  @property({ type: String })
  label = '';

  /**
   * Error state
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Error message text
   */
  @property({ type: String, attribute: 'error-message' })
  errorMessage = '';

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
   * Helper text
   */
  @property({ type: String, attribute: 'helper-text' })
  helperText = '';

  /**
   * Size variant
   */
  @property({ type: String, reflect: true })
  size: Extract<Size, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> = 'md';

  /**
   * Internal state for prefix slot
   */
  @property({ type: Boolean, reflect: true, attribute: 'has-prefix' })
  hasPrefix = false;

  /**
   * Internal state for suffix slot
   */
  @property({ type: Boolean, reflect: true, attribute: 'has-suffix' })
  hasSuffix = false;

  /**
   * Input type
   */
  @property({ type: String })
  type: string = 'text';

  /**
   * Input value
   */
  @property({ type: String })
  value = '';

  /**
   * Placeholder text
   */
  @property({ type: String })
  placeholder = '';

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
   * Name attribute
   */
  @property({ type: String })
  name = '';

  /**
   * Autocomplete attribute
   */
  @property({ type: String })
  autocomplete = '';

  /**
   * Max length
   */
  @property({ type: Number })
  maxlength?: number;

  /**
   * Min length
   */
  @property({ type: Number })
  minlength?: number;

  /**
   * Pattern for validation
   */
  @property({ type: String })
  pattern = '';

  /**
   * Readonly state
   */
  @property({ type: Boolean })
  readonly = false;

  /**
   * Handle slot changes to update prefix/suffix states
   */
  private _handlePrefixSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this.hasPrefix = slot.assignedNodes().length > 0;
  }

  /**
   * Handle slot changes to update prefix/suffix states
   */
  private _handleSuffixSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this.hasSuffix = slot.assignedNodes().length > 0;
  }

  render() {
    return html`
      <div part="wrapper" class="skill-input-wrapper">
        ${this.label
          ? html`
              <label part="label" class="skill-input__label">
                ${this.label}
                ${this.required ? html`<span aria-label="required">*</span>` : nothing}
              </label>
            `
          : nothing}

        <div part="container" class="skill-input__container">
          <div class="skill-input__prefix">
            <slot name="icon-left" @slotchange=${this._handlePrefixSlotChange}></slot>
          </div>

          <input
            part="input"
            type=${this.type}
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?required=${this.required}
            ?readonly=${this.readonly}
            name=${this.name || nothing}
            autocomplete=${this.autocomplete || nothing}
            maxlength=${this.maxlength ?? nothing}
            minlength=${this.minlength ?? nothing}
            pattern=${this.pattern || nothing}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
          />

          <div class="skill-input__suffix">
            <slot name="icon-right" @slotchange=${this._handleSuffixSlotChange}></slot>
          </div>
        </div>

        ${this.errorMessage || this.helperText
          ? html`
              <p
                part="helper-text"
                class=${this.error ? 'skill-input__error-message' : 'skill-input__helper'}
              >
                ${this.errorMessage || this.helperText}
              </p>
            `
          : nothing}
      </div>
    `;
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;

    this.dispatchEvent(
      new CustomEvent('skill-input', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
          originalEvent: e,
        },
      })
    );
  }

  private _handleChange(e: Event) {
    this.dispatchEvent(
      new CustomEvent('skill-change', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
          originalEvent: e,
        },
      })
    );
  }

  private _handleFocus(e: FocusEvent) {
    this.dispatchEvent(
      new CustomEvent('skill-focus', {
        bubbles: true,
        composed: true,
        detail: {
          originalEvent: e,
        },
      })
    );
  }

  private _handleBlur(e: FocusEvent) {
    this.dispatchEvent(
      new CustomEvent('skill-blur', {
        bubbles: true,
        composed: true,
        detail: {
          originalEvent: e,
        },
      })
    );
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
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-input': SkillInput;
  }
}
