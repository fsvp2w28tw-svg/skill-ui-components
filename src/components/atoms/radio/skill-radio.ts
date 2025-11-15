import { LitElement, html, nothing, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { radioStyles } from './skill-radio.styles';
import { baseStyles } from '../../../styles/base';
import type { Size } from '../../../types';

/**
 * Skill Radio Component
 *
 * @slot label - Custom label content
 * @slot helper-text - Custom helper text content
 *
 * @csspart wrapper - The wrapper element
 * @csspart label - The label element
 * @csspart control - The radio control element
 * @csspart input - The native input element
 * @csspart check - The radio check indicator
 * @csspart helper-text - The helper/error text element
 *
 * @fires skill-radio-change - Dispatched when radio state changes
 * @fires skill-radio-input - Dispatched when radio value changes
 * @fires skill-radio-focus - Dispatched when radio gains focus
 * @fires skill-radio-blur - Dispatched when radio loses focus
 *
 * @example
 * ```html
 * <skill-radio name="option" value="1" label="Option 1"></skill-radio>
 * <skill-radio name="option" value="2" label="Option 2" checked></skill-radio>
 * <skill-radio name="option" value="3" label="Option 3" helper-text="Additional info"></skill-radio>
 * <skill-radio name="option" value="4" label="Disabled" disabled></skill-radio>
 * ```
 */
@customElement('skill-radio')
export class SkillRadio extends LitElement {
  static styles = [baseStyles, radioStyles];

  @query('.skill-radio__input')
  private _input!: HTMLInputElement;

  /**
   * Whether the radio is checked
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Whether the radio is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the radio is required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * The radio value
   */
  @property({ type: String })
  value = '';

  /**
   * The radio name (for grouping)
   */
  @property({ type: String })
  name = '';

  /**
   * The radio size
   */
  @property({ type: String })
  size: Size = 'md';

  /**
   * The radio color variant
   */
  @property({ type: String })
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary';

  /**
   * The radio label
   */
  @property({ type: String })
  label = '';

  /**
   * Helper text displayed below the radio
   */
  @property({ type: String })
  helperText = '';

  /**
   * Error message to display
   */
  @property({ type: String })
  error = '';

  /**
   * Whether to show the error state
   */
  @property({ type: Boolean, reflect: true })
  hasError = false;

  /**
   * The radio variant style
   */
  @property({ type: String })
  variant: 'default' | 'filled' | 'outlined' = 'default';

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeydown);
  }

  protected updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    // Handle radio group behavior when checked changes
    if (changedProperties.has('checked') && this.checked && this.name) {
      this._handleRadioGroupChange();
    }
  }

  private _handleRadioGroupChange() {
    // Uncheck all other radios with the same name
    const radioGroup = document.querySelectorAll(`skill-radio[name="${this.name}"]`);
    radioGroup.forEach((radio) => {
      if (radio !== this && (radio as SkillRadio).checked) {
        (radio as SkillRadio).checked = false;
      }
    });
  }

  private _getAriaDescribedBy(): string | undefined {
    const ids: string[] = [];
    const elementId = this.id || 'radio';

    if (this.error || this.hasError) {
      ids.push(`${elementId}-error`);
    }

    if (this.helperText && !this.error) {
      ids.push(`${elementId}-helper`);
    }

    return ids.length > 0 ? ids.join(' ') : undefined;
  }

  private _handleChange(event: Event) {
    const target = event.target as HTMLInputElement;

    // Radio inputs are already managed by the browser, but we ensure consistency
    this.checked = target.checked;

    this._handleRadioGroupChange();

    this.dispatchEvent(new CustomEvent('skill-radio-change', {
      detail: {
        checked: this.checked,
        value: this.value,
        name: this.name,
      },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleInput(_event: Event) {
    this.dispatchEvent(new CustomEvent('skill-radio-input', {
      detail: {
        checked: this.checked,
        value: this.value,
        name: this.name,
      },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleFocus(event: FocusEvent) {
    this.dispatchEvent(new CustomEvent('skill-radio-focus', {
      detail: { event },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleBlur(event: FocusEvent) {
    this.dispatchEvent(new CustomEvent('skill-radio-blur', {
      detail: { event },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleKeydown(event: KeyboardEvent) {
    if (this.disabled) return;

    switch (event.code) {
      case 'Space':
      case 'Enter':
        event.preventDefault();
        this.checked = true;
        this._input.checked = true;
        this._handleRadioGroupChange();

        this.dispatchEvent(new CustomEvent('skill-radio-change', {
          detail: {
            checked: this.checked,
            value: this.value,
            name: this.name,
          },
          bubbles: true,
          composed: true,
        }));
        break;
    }
  }

  protected render(): TemplateResult {
    const showError = this.hasError || !!this.error;
    const elementId = this.id || 'radio';

    return html`
      <label part="wrapper" class="skill-radio">
        <input
          part="input"
          class="skill-radio__input"
          type="radio"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          .value=${this.value}
          name=${this.name || nothing}
          aria-describedby=${this._getAriaDescribedBy() || nothing}
          aria-invalid=${showError}
          aria-checked=${this.checked}
          @change=${this._handleChange}
          @input=${this._handleInput}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
        />

        <span part="control" class="skill-radio__control">
          <span part="check" class="skill-radio__check"></span>
        </span>

        <span part="label" class="skill-radio__label">
          ${this.label ? html`${this.label}` : html`<slot name="label"></slot>`}
        </span>
      </label>

      ${(this.helperText || this.error) ? html`
        <div part="helper-text" class="skill-radio__helper">
          ${this.error ? html`
            <span id="${elementId}-error" class="skill-radio__error">
              ${this.error}
            </span>
          ` : ''}
          ${this.helperText && !this.error ? html`
            <span id="${elementId}-helper" class="skill-radio__helper-text">
              ${this.helperText}
            </span>
          ` : ''}
        </div>
      ` : ''}
    `;
  }

  /**
   * Check the radio
   */
  public check(): void {
    if (this.disabled) return;
    this.checked = true;
    this._handleRadioGroupChange();
  }

  /**
   * Uncheck the radio (for programmatic use)
   */
  public uncheck(): void {
    if (this.disabled) return;
    this.checked = false;
  }

  /**
   * Focus the radio
   */
  public focus(): void {
    this._input?.focus();
  }

  /**
   * Blur the radio
   */
  public blur(): void {
    this._input?.blur();
  }

  /**
   * Validate the radio
   */
  public validate(): boolean {
    if (this.required && !this.checked) {
      return false;
    }
    return true;
  }

  /**
   * Get validation message
   */
  public getValidationMessage(): string {
    if (this.required && !this.checked) {
      return 'This field is required';
    }
    if (this.error) {
      return this.error;
    }
    if (this.hasError) {
      return 'Invalid input';
    }
    return '';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skill-radio': SkillRadio;
  }
}