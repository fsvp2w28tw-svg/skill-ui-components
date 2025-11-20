import { LitElement, html, nothing, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { checkboxStyles } from './skill-checkbox.styles';
import { baseStyles } from '../../../styles/base';
import type { Size } from '../../../types';

/**
 * Skill Checkbox Component
 *
 * @slot label - Custom label content
 * @slot helper-text - Custom helper text content
 *
 * @csspart wrapper - The wrapper element
 * @csspart label - The label element
 * @csspart control - The checkbox control element
 * @csspart input - The native input element
 * @csspart check-icon - The check mark icon
 * @csspart indeterminate-icon - The indeterminate icon
 * @csspart helper-text - The helper/error text element
 *
 * @fires skill-checkbox-change - Dispatched when checkbox state changes
 * @fires skill-checkbox-input - Dispatched when checkbox value changes
 * @fires skill-checkbox-focus - Dispatched when checkbox gains focus
 * @fires skill-checkbox-blur - Dispatched when checkbox loses focus
 *
 * @example
 * ```html
 * <skill-checkbox label="Accept terms"></skill-checkbox>
 * <skill-checkbox label="Subscribe" helper-text="Get updates about our products"></skill-checkbox>
 * <skill-checkbox label="Required" required error="This field is required"></skill-checkbox>
 * <skill-checkbox checked disabled label="Disabled option"></skill-checkbox>
 * ```
 */
@customElement('skill-checkbox')
export class SkillCheckbox extends LitElement {
  static styles = [baseStyles, checkboxStyles];

  @query('.skill-checkbox__input')
  private _input!: HTMLInputElement;

  /**
   * Whether the checkbox is checked
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Whether the checkbox is in indeterminate state
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * Whether the checkbox is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the checkbox is required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * The checkbox value
   */
  @property({ type: String })
  value = 'on';

  /**
   * The checkbox name
   */
  @property({ type: String })
  name = '';

  /**
   * The checkbox size
   */
  @property({ type: String, reflect: true })
  size: Size = 'md';

  /**
   * The checkbox color variant
   */
  @property({ type: String, reflect: true })
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary';

  /**
   * The checkbox label
   */
  @property({ type: String })
  label = '';

  /**
   * Helper text displayed below the checkbox
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
   * The checkbox variant style
   */
  @property({ type: String, reflect: true })
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

    // Update indeterminate state on the native input
    if (this._input) {
      this._input.indeterminate = this.indeterminate;
    }
  }

  private _getAriaDescribedBy(): string | undefined {
    const ids: string[] = [];
    const elementId = this.id || 'checkbox';

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
    this.checked = target.checked;
    this.indeterminate = false;

    this.dispatchEvent(new CustomEvent('skill-checkbox-change', {
      detail: {
        checked: this.checked,
        value: this.value,
        indeterminate: this.indeterminate,
      },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleInput(_event: Event) {
    this.dispatchEvent(new CustomEvent('skill-checkbox-input', {
      detail: {
        checked: this.checked,
        value: this.value,
        indeterminate: this.indeterminate,
      },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleFocus(event: FocusEvent) {
    this.dispatchEvent(new CustomEvent('skill-checkbox-focus', {
      detail: { event },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleBlur(event: FocusEvent) {
    this.dispatchEvent(new CustomEvent('skill-checkbox-blur', {
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
        this.checked = !this.checked;
        this.indeterminate = false;
        this._input.checked = this.checked;
        this._input.indeterminate = false;

        this.dispatchEvent(new CustomEvent('skill-checkbox-change', {
          detail: {
            checked: this.checked,
            value: this.value,
            indeterminate: this.indeterminate,
          },
          bubbles: true,
          composed: true,
        }));
        break;
    }
  }

  protected render(): TemplateResult {
    const showError = this.hasError || !!this.error;
    const elementId = this.id || 'checkbox';

    return html`
      <label part="wrapper" class="skill-checkbox">
        <input
          part="input"
          class="skill-checkbox__input"
          type="checkbox"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          .value=${this.value}
          name=${this.name || nothing}
          aria-describedby=${this._getAriaDescribedBy() || nothing}
          aria-invalid=${showError}
          aria-checked=${this.indeterminate ? 'mixed' : this.checked}
          @change=${this._handleChange}
          @input=${this._handleInput}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
        />

        <span part="control" class="skill-checkbox__control">
          <!-- Check mark icon -->
          <svg
            part="check-icon"
            class="skill-checkbox__icon skill-checkbox__check"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
              fill="currentColor"
            />
          </svg>

          <!-- Indeterminate icon -->
          <svg
            part="indeterminate-icon"
            class="skill-checkbox__icon skill-checkbox__indeterminate"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <rect
              x="6"
              y="11"
              width="12"
              height="2"
              rx="1"
              fill="currentColor"
            />
          </svg>
        </span>

        <span part="label" class="skill-checkbox__label">
          ${this.label ? html`${this.label}` : html`<slot name="label"></slot>`}
        </span>
      </label>

      ${(this.helperText || this.error) ? html`
        <div part="helper-text" class="skill-checkbox__helper">
          ${this.error ? html`
            <span id="${elementId}-error" class="skill-checkbox__error">
              ${this.error}
            </span>
          ` : ''}
          ${this.helperText && !this.error ? html`
            <span id="${elementId}-helper" class="skill-checkbox__helper-text">
              ${this.helperText}
            </span>
          ` : ''}
        </div>
      ` : ''}
    `;
  }

  /**
   * Toggle the checkbox state
   */
  public toggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.indeterminate = false;
  }

  /**
   * Set the checkbox to checked state
   */
  public check(): void {
    if (this.disabled) return;
    this.checked = true;
    this.indeterminate = false;
  }

  /**
   * Set the checkbox to unchecked state
   */
  public uncheck(): void {
    if (this.disabled) return;
    this.checked = false;
    this.indeterminate = false;
  }

  /**
   * Set the checkbox to indeterminate state
   */
  public setIndeterminate(): void {
    if (this.disabled) return;
    this.indeterminate = true;
    this.checked = false;
  }

  /**
   * Focus the checkbox
   */
  public focus(): void {
    this._input?.focus();
  }

  /**
   * Blur the checkbox
   */
  public blur(): void {
    this._input?.blur();
  }

  /**
   * Validate the checkbox
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
    'skill-checkbox': SkillCheckbox;
  }
}
