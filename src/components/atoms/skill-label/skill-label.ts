import { LitElement, html } from 'lit';
import { labelStyles } from './skill-label.styles';
import { baseStyles } from '../../../styles/base';

export class SkillLabel extends LitElement {
  static styles = [baseStyles, labelStyles];

  static properties = {
    mode: { type: String, reflect: true },
    size: { type: String, reflect: true },
    color: { type: String, reflect: true },
    variant: { type: String, reflect: true },
    shape: { type: String, reflect: true },
    clickable: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    active: { type: Boolean, reflect: true },
    selected: { type: Boolean, reflect: true },
    closable: { type: Boolean, reflect: true },
    removable: { type: Boolean, reflect: true },
    counter: { type: Boolean, reflect: true },
    pulse: { type: Boolean, reflect: true },
    maxValue: { type: Number, reflect: true, attribute: 'max-value' },
    badge: { type: String, reflect: true },
  };

  declare mode: 'badge' | 'tag' | 'chip';
  declare size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  declare color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray';
  declare variant: 'default' | 'light' | 'outline' | 'text';
  declare shape: 'default' | 'square' | 'rounded' | 'pill' | 'circle' | 'dot';
  declare clickable: boolean;
  declare disabled: boolean;
  declare active: boolean;
  declare selected: boolean;
  declare closable: boolean;
  declare removable: boolean;
  declare counter: boolean;
  declare pulse: boolean;
  declare maxValue?: number;
  declare badge?: string;

  private _visible = true;

  constructor() {
    super();
    this.mode = 'badge';
    this.size = 'md';
    this.color = 'primary';
    this.variant = 'default';
    this.shape = 'default';
    this.clickable = false;
    this.disabled = false;
    this.active = false;
    this.selected = false;
    this.closable = false;
    this.removable = false;
    this.counter = false;
    this.pulse = false;
  }

  render() {
    if (!this._visible) {
      return html``;
    }

    return html`
      <div
        part="label"
        class="skill-label"
        role="${this.clickable ? 'button' : 'status'}"
        aria-label="${this.getAttribute('aria-label') || ''}"
        aria-disabled="${this.disabled ? 'true' : 'false'}"
        tabindex="${this.clickable && !this.disabled ? '0' : '-1'}"
        @click=${this._handleClick}
      >
        <slot></slot>
        ${this.closable || this.removable ? this._renderCloseButton() : ''}
      </div>
    `;
  }

  private _renderCloseButton() {
    return html`
      <button
        part="close"
        class="skill-label__close"
        type="button"
        @click=${this._handleClose}
      >
        ✕
      </button>
    `;
  }

  private _handleClick(e: Event) {
    if (this.disabled || !this.clickable) return;

    if ((e.target as HTMLElement).closest('.skill-label__close')) {
      return;
    }

    this.dispatchEvent(new CustomEvent('skill-label-click', {
      bubbles: true,
      composed: true,
      detail: { mode: this.mode, value: this.textContent?.trim() || '' }
    }));

    if (this.mode === 'chip') {
      this.selected = !this.selected;
    } else {
      this.active = !this.active;
    }
  }

  private _handleClose(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    this.dispatchEvent(new CustomEvent('skill-label-close', {
      bubbles: true,
      composed: true,
      detail: { mode: this.mode, value: this.textContent?.trim() || '' }
    }));

    if (!e.defaultPrevented) {
      this._visible = false;
      this.requestUpdate();
    }
  }
}

customElements.define('skill-label', SkillLabel);