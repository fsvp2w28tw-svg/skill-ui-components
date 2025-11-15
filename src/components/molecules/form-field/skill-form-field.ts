import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../../styles/base';

/**
 * FormField molecule component that combines a label, input area, and error message.
 *
 * @element skill-form-field
 *
 * @example
 * ```html
 * <!-- Basic form field -->
 * <skill-form-field label="Name" required>
 *   <skill-input placeholder="Enter your name"></skill-input>
 * </skill-form-field>
 *
 * <!-- With error message -->
 * <skill-form-field label="Email" error="Please enter a valid email">
 *   <skill-input type="email" placeholder="email@example.com"></skill-input>
 * </skill-form-field>
 *
 * <!-- With help text -->
 * <skill-form-field label="Password" help="Must be at least 8 characters">
 *   <skill-input type="password"></skill-input>
 * </skill-form-field>
 *
 * <!-- With optional label -->
 * <skill-form-field label="Phone" optional>
 *   <skill-input type="tel"></skill-input>
 * </skill-form-field>
 * ```
 */
@customElement('skill-form-field')
export class FormField extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: var(--skill-spacing-md);
      }

      .form-field {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .form-field--horizontal {
        flex-direction: row;
        align-items: center;
        gap: var(--skill-spacing-md);
      }

      .label-container {
        display: flex;
        align-items: center;
        margin-bottom: var(--skill-spacing-xs);
        font-weight: var(--skill-font-weight-medium);
        color: var(--skill-color-text);
      }

      .form-field--horizontal .label-container {
        margin-bottom: 0;
        flex-shrink: 0;
        min-width: 120px;
      }

      .label {
        font-size: var(--skill-font-size-md);
        font-weight: var(--skill-font-weight-medium);
        color: var(--skill-color-text);
      }

      .label--required::after {
        content: '*';
        color: var(--skill-color-error);
        margin-left: var(--skill-spacing-xs);
      }

      .label--optional {
        font-weight: var(--skill-font-weight-normal);
        color: var(--skill-color-text-muted);
        font-size: var(--skill-font-size-sm);
        margin-left: var(--skill-spacing-xs);
      }

      .input-container {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--skill-spacing-xs);
      }

      .form-field--horizontal .input-container {
        flex: 1;
      }

      .help-text {
        font-size: var(--skill-font-size-sm);
        color: var(--skill-color-text-muted);
        margin-top: var(--skill-spacing-xs);
      }

      .error-text {
        font-size: var(--skill-font-size-sm);
        color: var(--skill-color-error);
        margin-top: var(--skill-spacing-xs);
        display: flex;
        align-items: center;
        gap: var(--skill-spacing-xs);
      }

      .error-icon {
        width: 14px;
        height: 14px;
        flex-shrink: 0;
      }

      /* Error state */
      .form-field--error .label {
        color: var(--skill-color-error);
      }

      .form-field--error ::slotted(skill-input),
      .form-field--error ::slotted(skill-textarea),
      .form-field--error ::slotted(skill-select) {
        border-color: var(--skill-color-error);
      }

      .form-field--error ::slotted(skill-input:focus),
      .form-field--error ::slotted(skill-textarea:focus),
      .form-field--error ::slotted(skill-select:focus) {
        border-color: var(--skill-color-error);
        box-shadow: 0 0 0 2px var(--skill-color-error-light);
      }

      /* Disabled state */
      .form-field--disabled {
        opacity: 0.6;
        pointer-events: none;
      }

      .form-field--disabled .label {
        color: var(--skill-color-text-muted);
      }

      /* Size variants */
      .form-field--sm .label {
        font-size: var(--skill-font-size-sm);
      }

      .form-field--lg .label {
        font-size: var(--skill-font-size-lg);
      }

      /* Slot for form controls */
      ::slotted(skill-input),
      ::slotted(skill-textarea),
      ::slotted(skill-select),
      ::slotted(skill-checkbox),
      ::slotted(skill-radio),
      ::slotted(skill-switch) {
        width: 100%;
      }
    `
  ];

  @property({ type: String })
  label = '';

  @property({ type: String })
  help = '';

  @property({ type: String })
  error = '';

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  optional = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  layout: 'vertical' | 'horizontal' = 'vertical';

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  private get containerClasses() {
    return {
      'form-field': true,
      [`form-field--${this.layout}`]: this.layout !== 'vertical',
      [`form-field--${this.size}`]: this.size !== 'md',
      'form-field--error': !!this.error,
      'form-field--disabled': this.disabled,
    };
  }

  private get labelClasses() {
    return {
      'label': true,
      'label--required': this.required && !this.optional,
      'label--optional': this.optional,
    };
  }

  render() {
    return html`
      <div
        class=${classMap(this.containerClasses)}
      >
        <!-- Label -->
        ${this.label ? html`
          <div class="label-container">
            <span class=${classMap(this.labelClasses)}>${this.label}</span>
            ${this.optional ? html`
              <span class="label--optional">(Optional)</span>
            ` : ''}
          </div>
        ` : ''}

        <!-- Input Area -->
        <div class="input-container">
          <!-- Slot for form controls -->
          <slot></slot>

          <!-- Help Text -->
          ${this.help && !this.error ? html`
            <div class="help-text">${this.help}</div>
          ` : ''}

          <!-- Error Text -->
          ${this.error ? html`
            <div class="error-text">
              <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              ${this.error}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skill-form-field': FormField;
  }
}