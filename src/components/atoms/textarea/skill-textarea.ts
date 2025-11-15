/**
 * @skill/ui-components
 * Textarea Component - Multi-line text input
 *
 * @element skill-textarea
 *
 * @prop {string} label - Label text for the textarea
 * @prop {string} error - Error message to display
 * @prop {string} helperText - Helper text to display below textarea
 * @prop {string} variant - Visual variant: 'default' | 'filled'
 * @prop {string} resize - Resize behavior: 'none' | 'both' | 'horizontal' | 'vertical'
 * @prop {string} value - Textarea value
 * @prop {string} placeholder - Placeholder text
 * @prop {boolean} disabled - Disable the textarea
 * @prop {boolean} readonly - Make textarea readonly
 * @prop {boolean} required - Mark textarea as required
 * @prop {number} rows - Number of visible text lines
 * @prop {number} maxlength - Maximum length of value
 * @prop {number} minlength - Minimum length of value
 *
 * @fires skill-input - Fired when the textarea value changes
 * @fires skill-change - Fired when the textarea loses focus after value change
 * @fires skill-focus - Fired when the textarea gains focus
 * @fires skill-blur - Fired when the textarea loses focus
 *
 * @method focus - Focus the textarea
 * @method blur - Blur the textarea
 * @method select - Select the textarea text
 */

import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { textareaStyles } from './skill-textarea.styles';

@customElement('skill-textarea')
export class SkillTextarea extends LitElement {
  static override styles = textareaStyles;

  @property({ type: String })
  label = '';

  @property({ type: String })
  error = '';

  @property({ type: String, attribute: 'helper-text' })
  helperText = '';

  @property({ type: String })
  variant: 'default' | 'filled' = 'default';

  @property({ type: String })
  resize: 'none' | 'both' | 'horizontal' | 'vertical' = 'vertical';

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: Boolean })
  required = false;

  @property({ type: Number })
  rows = 3;

  @property({ type: Number })
  maxlength?: number;

  @property({ type: Number })
  minlength?: number;

  @query('textarea')
  private _textarea!: HTMLTextAreaElement;

  /**
   * Focus the textarea
   */
  focus() {
    this._textarea?.focus();
  }

  /**
   * Blur the textarea
   */
  blur() {
    this._textarea?.blur();
  }

  /**
   * Select the textarea text
   */
  select() {
    this._textarea?.select();
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;

    this.dispatchEvent(
      new CustomEvent('skill-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleChange(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;

    this.dispatchEvent(
      new CustomEvent('skill-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleFocus() {
    this.dispatchEvent(
      new CustomEvent('skill-focus', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleBlur() {
    this.dispatchEvent(
      new CustomEvent('skill-blur', {
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    const containerClasses = [
      'textarea-container',
      `variant-${this.variant}`,
      this.error ? 'has-error' : ''
    ].filter(Boolean).join(' ');

    const textareaClasses = [
      `resize-${this.resize}`
    ].join(' ');

    return html`
      <div class="textarea-wrapper">
        ${this.label
          ? html`<label class="textarea-label">${this.label}</label>`
          : ''}

        <div class="${containerClasses}">
          <textarea
            class="${textareaClasses}"
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            rows=${this.rows}
            maxlength=${this.maxlength ?? ''}
            minlength=${this.minlength ?? ''}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
            part="textarea"
          ></textarea>
        </div>

        ${this.error
          ? html`<div class="error-text" part="error">${this.error}</div>`
          : this.helperText
          ? html`<div class="helper-text" part="helper-text">
              ${this.helperText}
            </div>`
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skill-textarea': SkillTextarea;
  }
}
