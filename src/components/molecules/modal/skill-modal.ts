import { LitElement, html, nothing, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { modalStyles } from './skill-modal.styles';
import { baseStyles } from '../../../styles/base';
import type { Size, Variant } from '../../../types';

/**
 * Skill Modal Component
 *
 * @slot header - Modal header content
 * @slot title - Modal title (fallback if title prop not provided)
 * @slot body - Modal body content
 * @slot footer - Modal footer content (action buttons)
 * @slot close-button - Custom close button content
 *
 * @csspart overlay - Modal overlay/backdrop
 * @csspart dialog - Modal dialog container
 * @csspart header - Modal header section
 * @csspart title - Modal title element
 * @csspart close-button - Close button element
 * @csspart body - Modal body section
 * @csspart footer - Modal footer section
 * @csspart confirm-button - Default confirm button
 * @csspart cancel-button - Default cancel button
 *
 * @cssprop --modal-bg - Modal background color
 * @cssprop --modal-overlay-bg - Overlay background color
 * @cssprop --modal-max-width - Modal max width
 * @cssprop --modal-max-height - Modal max height
 *
 * @fires skill-open - Dispatched when modal opens
 * @fires skill-close - Dispatched when modal closes
 * @fires skill-confirm - Dispatched when confirm action is triggered
 * @fires skill-cancel - Dispatched when cancel action is triggered
 * @fires skill-overlay-click - Dispatched when overlay is clicked
 *
 * @example
 * ```html
 * <skill-modal
 *   id="myModal"
 *   title="Confirm Action"
 *   size="md"
 *   .show=${this.modalVisible}
 * >
 *   <div slot="body">
 *     <p>Are you sure you want to proceed?</p>
 *   </div>
 *   <div slot="footer">
 *     <skill-button variant="ghost" @click=${this.cancel}>Cancel</skill-button>
 *     <skill-button variant="primary" @click=${this.confirm}>Confirm</skill-button>
 *   </div>
 * </skill-modal>
 * ```
 */
@customElement('skill-modal')
export class SkillModal extends LitElement {
  static styles = [baseStyles, modalStyles];

  @query('.skill-modal-dialog')
  private _dialog!: HTMLElement;

  @query('.skill-modal-overlay')
  private _overlay!: HTMLElement;

  /**
   * Controls modal visibility
   */
  @property({ type: Boolean, reflect: true })
  show = false;

  /**
   * Modal title text
   */
  @property({ type: String })
  title = '';

  /**
   * Modal size variant
   */
  @property({ type: String, reflect: true })
  size: Extract<Size, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> | 'full' = 'md';

  /**
   * Modal position
   */
  @property({ type: String })
  position: 'center' | 'top' | 'bottom' = 'center';

  /**
   * Prevent closing on overlay click
   */
  @property({ type: Boolean, reflect: true, attribute: 'prevent-close' })
  preventClose = false;

  /**
   * Show close button
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-close-button' })
  showCloseButton = true;

  /**
   * Show default header
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-header' })
  showHeader = true;

  /**
   * Show default footer with confirm/cancel buttons
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-default-footer' })
  showDefaultFooter = false;

  /**
   * Confirm button text
   */
  @property({ type: String, attribute: 'confirm-text' })
  confirmText = 'Confirm';

  /**
   * Cancel button text
   */
  @property({ type: String, attribute: 'cancel-text' })
  cancelText = 'Cancel';

  /**
   * Enable backdrop blur effect
   */
  @property({ type: Boolean, reflect: true, attribute: 'backdrop-blur' })
  backdropBlur = false;

  /**
   * Custom max width for modal
   */
  @property({ type: String, attribute: 'max-width' })
  maxWidth?: string;

  /**
   * Custom max height for modal
   */
  @property({ type: String, attribute: 'max-height' })
  maxHeight?: string;

  /**
   * Variant for default action buttons
   */
  @property({ type: String })
  variant: Variant = 'primary';

  /**
   * Auto focus management
   */
  @property({ type: Boolean, reflect: true, attribute: 'auto-focus' })
  autoFocus = true;

  /**
   * Disable body scroll when modal is open
   */
  @property({ type: Boolean, reflect: true, attribute: 'disable-body-scroll' })
  disableBodyScroll = true;

  /**
   * Animation state
   */
  @state()
  private _isAnimating = false;

  /**
   * Previous focused element for restoration
   */
  private _previousActiveElement: Element | null = null;

  /**
   * Trap focus within modal
   */
  private _focusableElements: HTMLElement[] = [];

  connectedCallback() {
    super.connectedCallback();

    // Add keyboard listener
    document.addEventListener('keydown', this._handleKeydown.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Remove keyboard listener and restore body scroll
    document.removeEventListener('keydown', this._handleKeydown.bind(this));
    this._restoreBodyScroll();
  }

  protected updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('show')) {
      if (this.show) {
        this._openModal();
      } else {
        this._closeModal();
      }
    }
  }

  private _openModal() {
    this._isAnimating = true;
    this._previousActiveElement = document.activeElement;

    if (this.disableBodyScroll) {
      document.body.style.overflow = 'hidden';
    }

    if (this.autoFocus) {
      this.updateComplete.then(() => {
        this._focusModal();
      });
    }

    this._trapFocus();

    this.dispatchEvent(new CustomEvent('skill-open', {
      bubbles: true,
      composed: true,
      detail: { modal: this }
    }));
  }

  private _closeModal() {
    this._isAnimating = true;

    this._restoreFocus();
    this._restoreBodyScroll();

    this.dispatchEvent(new CustomEvent('skill-close', {
      bubbles: true,
      composed: true,
      detail: { modal: this }
    }));

    // Reset animation state after animation completes
    setTimeout(() => {
      this._isAnimating = false;
    }, 200);
  }

  private _focusModal() {
    if (this._dialog) {
      this._dialog.focus();
    }
  }

  private _restoreFocus() {
    if (this._previousActiveElement && this._previousActiveElement instanceof HTMLElement) {
      this._previousActiveElement.focus();
    }
  }

  private _restoreBodyScroll() {
    document.body.style.overflow = '';
  }

  private _trapFocus() {
    // Get all focusable elements within the modal
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])'
    ];

    this._focusableElements = Array.from(
      this.querySelectorAll(focusableSelectors.join(', '))
    ) as HTMLElement[];
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (!this.show) return;

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        if (!this.preventClose) {
          this.hideModal();
        }
        break;

      case 'Tab':
        e.preventDefault();
        this._handleTabNavigation(e.shiftKey);
        break;
    }
  }

  private _handleTabNavigation(shiftKey: boolean) {
    if (this._focusableElements.length === 0) return;

    const currentIndex = this._focusableElements.indexOf(document.activeElement as HTMLElement);
    let nextIndex;

    if (shiftKey) {
      // Shift + Tab (going backwards)
      nextIndex = currentIndex <= 0
        ? this._focusableElements.length - 1
        : currentIndex - 1;
    } else {
      // Tab (going forwards)
      nextIndex = currentIndex >= this._focusableElements.length - 1
        ? 0
        : currentIndex + 1;
    }

    this._focusableElements[nextIndex]?.focus();
  }

  private _handleOverlayClick(e: Event) {
    if (e.target === this._overlay && !this.preventClose) {
      this.dispatchEvent(new CustomEvent('skill-overlay-click', {
        bubbles: true,
        composed: true,
        detail: { modal: this }
      }));
      this.hideModal();
    }
  }

  private _handleCloseClick() {
    this.hideModal();
  }

  private _handleConfirmClick() {
    this.dispatchEvent(new CustomEvent('skill-confirm', {
      bubbles: true,
      composed: true,
      detail: { modal: this }
    }));
  }

  private _handleCancelClick() {
    this.dispatchEvent(new CustomEvent('skill-cancel', {
      bubbles: true,
      composed: true,
      detail: { modal: this }
    }));
    this.hideModal();
  }

  private _handleAnimationEnd() {
    this._isAnimating = false;
  }

  private _renderHeader() {
    if (!this.showHeader && !this.title) return nothing;

    return html`
      <div part="header" class="skill-modal-header">
        ${this.title
          ? html`<h2 part="title" class="skill-modal-title">${this.title}</h2>`
          : html`<slot name="header"></slot>`
        }

        ${this.showCloseButton
          ? html`
              <button
                part="close-button"
                class="skill-modal-close"
                @click=${this._handleCloseClick}
                aria-label="Close modal"
                type="button"
              >
                <slot name="close-button">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </slot>
              </button>
            `
          : nothing
        }
      </div>
    `;
  }

  private _renderBody() {
    return html`
      <div part="body" class="skill-modal-body">
        <slot name="body"></slot>
      </div>
    `;
  }

  private _renderFooter() {
    return html`
      <div part="footer" class="skill-modal-footer">
        <slot name="footer">
          ${this.showDefaultFooter ? this._renderDefaultFooter() : nothing}
        </slot>
      </div>
    `;
  }

  private _renderDefaultFooter() {
    return html`
      <div class="skill-modal-default-actions">
        <skill-button
          part="cancel-button"
          variant="ghost"
          @click=${this._handleCancelClick}
        >
          ${this.cancelText}
        </skill-button>

        <skill-button
          part="confirm-button"
          variant=${this.variant}
          @click=${this._handleConfirmClick}
        >
          ${this.confirmText}
        </skill-button>
      </div>
    `;
  }

  render() {
    if (!this.show) return nothing;

    return html`
      <div
        part="overlay"
        class="skill-modal-overlay ${this.backdropBlur ? 'skill-modal-overlay--blur' : ''}"
        @click=${this._handleOverlayClick}
        @animationend=${this._handleAnimationEnd}
      >
        <div
          part="dialog"
          class="
            skill-modal-dialog
            skill-modal-dialog--${this.size}
            skill-modal-dialog--${this.position}
            ${this._isAnimating ? 'skill-modal-dialog--animating' : ''}
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="${this.title ? 'modal-title' : ''}"
          tabindex="-1"
        >
          ${this._renderHeader()}
          ${this._renderBody()}
          ${this._renderFooter()}
        </div>
      </div>
    `;
  }

  /**
   * Show the modal
   */
  public showModal() {
    this.show = true;
  }

  /**
   * Hide the modal
   */
  public hideModal() {
    this.show = false;
  }

  /**
   * Toggle modal visibility
   */
  public toggle() {
    this.show = !this.show;
  }

  /**
   * Get current visibility state
   */
  public isVisible(): boolean {
    return this.show;
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-modal': SkillModal;
  }
}