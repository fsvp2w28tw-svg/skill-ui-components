/**
 * @skill/ui-components
 * Switch Component - Toggle switch control
 *
 * @element skill-switch
 *
 * @prop {boolean} checked - Whether the switch is checked
 * @prop {boolean} disabled - Whether the switch is disabled
 * @prop {string} size - Size variant: 'sm' | 'md' | 'lg'
 *
 * @fires skill-change - Fired when the checked state changes
 *
 * @method focus - Focus the switch
 * @method blur - Blur the switch
 */

import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { switchStyles } from './skill-switch.styles';

@customElement('skill-switch')
export class SkillSwitch extends LitElement {
  static override styles = switchStyles;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  @query('.switch')
  private _switch!: HTMLDivElement;

  /**
   * Focus the switch
   */
  focus() {
    this._switch?.focus();
  }

  /**
   * Blur the switch
   */
  blur() {
    this._switch?.blur();
  }

  private _handleClick() {
    if (this.disabled) return;

    this.checked = !this.checked;

    this.dispatchEvent(
      new CustomEvent('skill-change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick();
    }
  }

  override render() {
    const switchClasses = [
      'switch',
      this.checked ? 'checked' : '',
      this.disabled ? 'disabled' : '',
      `size-${this.size}`
    ].filter(Boolean).join(' ');

    return html`
      <div
        class="${switchClasses}"
        role="switch"
        tabindex=${this.disabled ? '-1' : '0'}
        aria-checked=${this.checked}
        aria-disabled=${this.disabled}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
        part="switch"
      >
        <span class="thumb" part="thumb"></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skill-switch': SkillSwitch;
  }
}
