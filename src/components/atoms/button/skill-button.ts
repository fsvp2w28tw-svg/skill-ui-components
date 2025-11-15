import { LitElement, html, type PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { buttonStyles } from './skill-button.styles';
import { baseStyles } from '../../../styles/base';
import type { Size, Variant, Shape } from '../../../types';

/**
 * Enhanced Skill Button Component
 *
 * @slot - Button content (text, icons, etc.)
 * @slot icon-left - Icon positioned before content
 * @slot icon-right - Icon positioned after content
 * @slot loading-text - Text to show during loading state
 *
 * @csspart button - The button element
 * @csspart spinner - The loading spinner
 * @csspart content - Button content wrapper
 * @csspart badge - Badge element
 *
 * @cssprop --button-bg - Background color
 * @cssprop --button-color - Text color
 * @cssprop --button-border - Border color
 * @cssprop --button-padding - Padding
 * @cssprop --button-hover-bg - Hover background
 * @cssprop --button-active-bg - Active background
 *
 * @fires skill-click - Dispatched when button is clicked
 * @fires skill-focus - Dispatched when button gains focus
 * @fires skill-blur - Dispatched when button loses focus
 *
 * @example
 * ```html
 * <skill-button variant="primary" size="md" badge="5">Click me</skill-button>
 * <skill-button variant="secondary" loading loading-text="Processing...">Loading</skill-button>
 * <skill-button variant="ghost" disabled tooltip="Disabled action">Disabled</skill-button>
 * ```
 */
@customElement('skill-button')
export class SkillButton extends LitElement {
  static styles = [baseStyles, buttonStyles];

  /**
   * Visual variant of the button
   * @type {'primary' | 'secondary' | 'ghost' | 'text' | 'success' | 'danger' | 'outline' | 'soft' | 'gradient' | 'link' | 'warning' | 'info'}
   */
  @property({ type: String, reflect: true })
  variant: Variant = 'primary';

  /**
   * Size of the button
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'}
   */
  @property({ type: String, reflect: true })
  size: Size = 'md';

  /**
   * Shape of the button
   * @type {'square' | 'rounded' | 'pill' | 'circle'}
   */
  @property({ type: String, reflect: true })
  shape?: Shape;

  /**
   * Loading state - shows spinner and disables interaction
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Full width button
   */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  /**
   * Glow effect
   */
  @property({ type: Boolean, reflect: true })
  glow = false;

  /**
   * 3D effect
   */
  @property({ type: Boolean, reflect: true, attribute: '3d' })
  threeDimensional = false;

  /**
   * Button type attribute (button, submit, reset)
   */
  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Badge text or number
   */
  @property({ type: String, reflect: true })
  badge?: string;

  /**
   * Tooltip text
   */
  @property({ type: String, reflect: true })
  tooltip?: string;

  /**
   * Auto focus on mount
   */
  @property({ type: Boolean, reflect: true, attribute: 'auto-focus' })
  autoFocus = false;

  /**
   * Custom href for link-like behavior
   */
  @property({ type: String, reflect: true })
  href?: string;

  /**
   * Target for link behavior
   */
  @property({ type: String, reflect: true })
  target?: '_blank' | '_self' | '_parent' | '_top';

  /**
   * Loading animation duration in milliseconds
   */
  @property({ type: Number, reflect: true, attribute: 'loading-duration' })
  loadingDuration = 1000;

  /**
   * Pulse animation when loading
   */
  @property({ type: Boolean, reflect: true, attribute: 'loading-pulse' })
  loadingPulse = false;

  private _loadingTimeout?: number;
  
  connectedCallback() {
    super.connectedCallback();
    if (this.autoFocus && !this.disabled && !this.loading) {
      this.updateComplete.then(() => {
        this.focus();
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._loadingTimeout) {
      clearTimeout(this._loadingTimeout);
    }
  }

  protected shouldUpdate(changedProperties: PropertyValueMap<this>) {
    if (!this.hasUpdated) {
      return true;
    }

    if (
      changedProperties.has('loading') ||
      changedProperties.has('disabled') ||
      changedProperties.has('type') ||
      changedProperties.has('badge') ||
      changedProperties.has('tooltip')
    ) {
      return true;
    }

    return false;
  }

  render() {
    const isLink = this.href && !this.disabled;

    return isLink ? this._renderLink() : this._renderButton();
  }

  private _renderLink() {
    return html`
      <a
        part="button"
        href=${this.href}
        target=${this.target || undefined}
        role="button"
        tabindex=${this.disabled ? '-1' : '0'}
        aria-busy=${this.loading ? 'true' : 'false'}
        aria-describedby=${this.tooltip ? 'tooltip' : ''}
        @click=${this._handleClick}
        @focus=${this._handleFocus}
        @blur=${this._handleBlur}
        @keydown=${this._handleKeyDown}
      >
        ${this.loading ? this._renderLoadingSpinner() : ''}

        <div part="content" class="skill-button__content">
          <slot name="icon-left"></slot>
          <slot></slot>
          <slot name="icon-right"></slot>
        </div>

        ${this.badge ? this._renderBadge() : ''}
        ${this.tooltip ? this._renderTooltip() : ''}
      </a>
    `;
  }

  private _renderButton() {
    return html`
      <button
        part="button"
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-busy=${this.loading ? 'true' : 'false'}
        aria-describedby=${this.tooltip ? 'tooltip' : ''}
        @click=${this._handleClick}
        @focus=${this._handleFocus}
        @blur=${this._handleBlur}
        @keydown=${this._handleKeyDown}
      >
        ${this.loading ? this._renderLoadingSpinner() : ''}

        <div part="content" class="skill-button__content">
          <slot name="icon-left"></slot>
          <slot></slot>
          <slot name="icon-right"></slot>
        </div>

        ${this.badge ? this._renderBadge() : ''}
        ${this.tooltip ? this._renderTooltip() : ''}
      </button>
    `;
  }

  private _renderLoadingSpinner() {
    return html`
      <span
        part="spinner"
        class="skill-button__spinner"
        role="status"
        aria-hidden="false"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2 L12 6" class="spinner-hand" />
          <path d="M12 18 L12 22" class="spinner-hand" />
          <path d="M22 12 L18 12" class="spinner-hand" />
          <path d="M6 12 L2 12" class="spinner-hand" />
        </svg>
      </span>
    `;
  }

  private _renderBadge() {
    return html`
      <span part="badge" class="skill-button__badge">
        ${this.badge}
      </span>
    `;
  }

  private _renderTooltip() {
    return html`
      <span id="tooltip" part="tooltip" class="skill-button__tooltip">
        ${this.tooltip}
      </span>
    `;
  }

  private _handleClick(e: Event) {
    if (this.loading || this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // If href is provided, let the link handle navigation
    if (this.href && this.shadowRoot?.querySelector('a')) {
      return;
    }

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent('skill-click', {
        bubbles: true,
        composed: true,
        detail: {
          originalEvent: e,
          variant: this.variant,
          size: this.size,
          badge: this.badge
        },
      })
    );
  }

  private _handleFocus(e: FocusEvent) {
    if (!this.disabled && !this.loading) {
      this.dispatchEvent(
        new CustomEvent('skill-focus', {
          bubbles: true,
          composed: true,
          detail: { originalEvent: e },
        })
      );
    }
  }

  private _handleBlur(e: FocusEvent) {
    this.dispatchEvent(
      new CustomEvent('skill-blur', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e },
      })
    );
  }

  private _handleKeyDown(e: KeyboardEvent) {
    // Handle Enter and Space for button-like behavior
    if (!this.href && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      this._handleClick(e);
    }
  }

  /**
   * Programmatically trigger loading state
   */
  public showLoading(duration?: number) {
    this.loading = true;
    const loadDuration = duration || this.loadingDuration;

    if (loadDuration > 0) {
      this._loadingTimeout = window.setTimeout(() => {
        this.loading = false;
      }, loadDuration);
    }
  }

  /**
   * Programmatically hide loading state
   */
  public hideLoading() {
    this.loading = false;
    if (this._loadingTimeout) {
      clearTimeout(this._loadingTimeout);
      this._loadingTimeout = undefined;
    }
  }

  /**
   * Focus the button
   */
  public focus() {
    const button = this.shadowRoot?.querySelector('button') as HTMLButtonElement;
    if (button) {
      button.focus();
    }
  }

  /**
   * Blur the button
   */
  public blur() {
    const button = this.shadowRoot?.querySelector('button') as HTMLButtonElement;
    if (button) {
      button.blur();
    }
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-button': SkillButton;
  }
}
