import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cardStyles } from './skill-card.styles';
import { baseStyles } from '../../../styles/base';

/**
 * Skill Card Component
 *
 * @slot - Default card content
 * @slot header - Card header content
 * @slot body - Card body content
 * @slot footer - Card footer content
 * @slot media - Visual/hero media area
 *
 * @csspart card - The card element
 * @csspart media - Media container
 * @csspart content - The content wrapper
 * @csspart loading - Loading overlay wrapper
 * @csspart spinner - Loading spinner element
 * @csspart loading-text - Loading label element
 *
 * @fires skill-click - Dispatched when hoverable card is activated
 *
 * @example
 * ```html
 * <!-- Simple card -->
 * <skill-card>
 *   <p>Card content</p>
 * </skill-card>
 *
 * <!-- Card with header, body, and footer -->
 * <skill-card>
 *   <div slot="header">
 *     <h3>Card Title</h3>
 *   </div>
 *   <div slot="body">
 *     <p>Card content goes here</p>
 *   </div>
 *   <div slot="footer">
 *     <button>Action</button>
 *   </div>
 * </skill-card>
 *
 * <!-- Hoverable card -->
 * <skill-card hoverable padding="md">
 *   <p>Click me!</p>
 * </skill-card>
 * ```
 */
@customElement('skill-card')
export class SkillCard extends LitElement {
  static styles = [baseStyles, cardStyles];

  /**
   * Makes card interactive with hover effects
   */
 @property({ type: Boolean, reflect: true })
  hoverable = false;

  /**
   * Disabled state. Prevents hover interactions and skill-click events.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Loading state with overlay.
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Card padding size
   */
  @property({ type: String })
  padding: 'none' | 'sm' | 'md' | 'lg' = 'lg';

  /**
   * Card variant
   */
  @property({ type: String })
  variant: 'default' | 'outlined' | 'elevated' | 'flat' = 'default';

  /**
   * Media position when using the media slot.
   */
  @property({ type: String, attribute: 'media-position' })
  mediaPosition: 'top' | 'start' = 'top';

  /**
   * Accessible text for the loading spinner
   */
  @property({ type: String, attribute: 'loading-text' })
  loadingText = 'Loading';

  /**
   * Internal state for media slot detection
   */
  @property({ type: Boolean, attribute: false })
  protected hasMediaSlot = false;

  connectedCallback() {
    super.connectedCallback();
    this._syncSlotState();
  }

  private _syncSlotState() {
    this.hasMediaSlot = this._hasLightDomSlot('media');
  }

  private _hasLightDomSlot(slotName: string) {
    return Array.from(this.children).some((child) => (child as HTMLElement).slot === slotName);
  }

  private _handleMediaSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;
    this.hasMediaSlot = this._slotHasContent(slot);
  };

  private _slotHasContent(slot: HTMLSlotElement) {
    return slot
      .assignedNodes({ flatten: true })
      .some((node) => this._nodeHasContent(node));
  }

  private _nodeHasContent(node: Node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      return true;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      return Boolean(node.textContent?.trim().length);
    }

    return false;
  }

  render() {
    const hasHorizontalMedia = this.hasMediaSlot && this.mediaPosition === 'start';
    const classes = [
      'skill-card',
      this.hoverable ? 'skill-card--hoverable' : '',
      this.disabled ? 'skill-card--disabled' : '',
      this.loading ? 'skill-card--loading' : '',
      this.hasMediaSlot ? 'skill-card--has-media' : '',
      hasHorizontalMedia ? 'skill-card--media-start' : '',
      `skill-card--padding-${this.padding}`,
      this.variant !== 'default' ? `skill-card--${this.variant}` : ''
    ].filter(Boolean).join(' ');

    const interactive = this.hoverable && !this.disabled && !this.loading;

    return html`
      <div
        part="card"
        class="${classes}"
        role=${interactive ? 'button' : 'group'}
        tabindex=${interactive ? 0 : nothing}
        aria-disabled=${this.disabled ? 'true' : nothing}
        aria-busy=${this.loading ? 'true' : nothing}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <div part="media" class="skill-card__media" ?hidden=${!this.hasMediaSlot}>
          <slot name="media" @slotchange=${this._handleMediaSlotChange}></slot>
        </div>

        <div class="skill-card__sections">
          <slot name="header"></slot>
          <slot name="body"></slot>
          <div part="content" class="skill-card__content">
            <slot></slot>
          </div>
          <slot name="footer"></slot>
        </div>

        ${this.loading ? this._renderLoadingOverlay() : nothing}
      </div>
    `;
  }

  private _renderLoadingOverlay() {
    const label = this.loadingText?.trim() || 'Loading';
    const showText = Boolean(this.loadingText?.trim().length);

    return html`
      <div part="loading" class="skill-card__loading">
        <div part="spinner" class="skill-card__spinner" role="progressbar" aria-label="${label}"></div>
        ${showText
          ? html`<span part="loading-text" class="skill-card__loading-text">${this.loadingText}</span>`
          : nothing}
      </div>
    `;
  }

  private _handleClick(e: Event) {
    if (!this.hoverable || this.disabled || this.loading) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('skill-click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e },
      })
    );
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (!this.hoverable || this.disabled || this.loading) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._handleClick(event);
    }
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-card': SkillCard;
  }
}
