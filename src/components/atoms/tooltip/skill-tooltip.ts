import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { tooltipStyles } from './skill-tooltip.styles';
import { baseStyles } from '../../../styles/base';
import type { Position } from '../../../types';

/**
 * Skill Tooltip Component
 *
 * @slot - Content that the tooltip is attached to (trigger element)
 * @slot content - Tooltip content
 *
 * @csspart tooltip - The tooltip container
 * @csspart content - The tooltip content wrapper
 * @csspart arrow - The tooltip arrow
 *
 * @cssprop --tooltip-bg - Background color
 * @cssprop --tooltip-color - Text color
 * @cssprop --tooltip-border - Border color
 * @cssprop --tooltip-shadow - Box shadow
 *
 * @fires skill-tooltip-show - Dispatched when tooltip is shown
 * @fires skill-tooltip-hide - Dispatched when tooltip is hidden
 *
 * @example
 * ```html
 * <skill-tooltip content="This is a tooltip">
 *   <button>Hover me</button>
 * </skill-tooltip>
 *
 * <skill-tooltip content="Tooltip info" position="top" trigger="click">
 *   <span>Click me</span>
 * </skill-tooltip>
 * ```
 */
@customElement('skill-tooltip')
export class SkillTooltip extends LitElement {
  static styles = [baseStyles, tooltipStyles];

  @query('.skill-tooltip__trigger')
  private _trigger!: HTMLElement;

  @query('.skill-tooltip__tooltip')
  private _tooltip!: HTMLElement;

  @query('.skill-tooltip__arrow')
  private _arrow!: HTMLElement;

  /**
   * Tooltip content text
   */
  @property({ type: String })
  content = '';

  /**
   * Tooltip position relative to trigger
   */
  @property({ type: String })
  position: Position = 'top';

  /**
   * Trigger type: hover, click, focus, manual
   */
  @property({ type: String })
  trigger: 'hover' | 'click' | 'focus' | 'manual' = 'hover';

  /**
   * Whether tooltip is visible (for manual trigger)
   */
  @property({ type: Boolean, reflect: true })
  visible = false;

  /**
   * Delay before showing tooltip (in ms)
   */
  @property({ type: Number })
  showDelay = 300;

  /**
   * Delay before hiding tooltip (in ms)
   */
  @property({ type: Number })
  hideDelay = 100;

  /**
   * Maximum width of tooltip
   */
  @property({ type: String })
  maxWidth = '300px';

  /**
   * Whether to show arrow
   */
  @property({ type: Boolean })
  arrow = true;

  /**
   * Whether to disable tooltip
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Tooltip variant
   */
  @property({ type: String })
  variant: 'default' | 'dark' | 'light' | 'success' | 'warning' | 'error' | 'info' = 'default';

  private _showTimeout: number | null = null;
  private _hideTimeout: number | null = null;
  private _isShowing = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mouseenter', this._handleMouseEnter);
    this.addEventListener('mouseleave', this._handleMouseLeave);
    this.addEventListener('focusin', this._handleFocusIn);
    this.addEventListener('focusout', this._handleFocusOut);
    this.addEventListener('click', this._handleClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mouseenter', this._handleMouseEnter);
    this.removeEventListener('mouseleave', this._handleMouseLeave);
    this.removeEventListener('focusin', this._handleFocusIn);
    this.removeEventListener('focusout', this._handleFocusOut);
    this.removeEventListener('click', this._handleClick);
    this._clearTimeouts();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    if (changedProperties.has('visible') && this.visible) {
      this._updatePosition();
    }

    if (changedProperties.has('position')) {
      this._updatePosition();
    }
  }

  private _clearTimeouts() {
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }
  }

  private _handleMouseEnter = () => {
    if (this.disabled || this.trigger !== 'hover') return;

    this._clearTimeouts();
    this._showTimeout = window.setTimeout(() => {
      this.show();
    }, this.showDelay);
  };

  private _handleMouseLeave = () => {
    if (this.disabled || this.trigger !== 'hover') return;

    this._clearTimeouts();
    this._hideTimeout = window.setTimeout(() => {
      this.hide();
    }, this.hideDelay);
  };

  private _handleFocusIn = () => {
    if (this.disabled || this.trigger !== 'focus') return;
    this.show();
  };

  private _handleFocusOut = () => {
    if (this.disabled || this.trigger !== 'focus') return;
    this.hide();
  };

  private _handleClick = (event: Event) => {
    if (this.disabled || this.trigger !== 'click') return;

    event.preventDefault();
    event.stopPropagation();

    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  };

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Escape' && this.visible) {
      this.hide();
      this._trigger?.focus();
    }
  };

  private _handleDocumentClick = (event: Event) => {
    if (this.trigger === 'click' && this.visible && !this.contains(event.target as Node)) {
      this.hide();
    }
  };

  private _updatePosition() {
    if (!this._tooltip || !this._trigger) return;

    const triggerRect = this._trigger.getBoundingClientRect();
    const tooltipRect = this._tooltip.getBoundingClientRect();
    const arrowSize = 8; // Arrow size in pixels
    const gap = 8; // Gap between trigger and tooltip

    let top = 0;
    let left = 0;
    let arrowTop = 0;
    let arrowLeft = 0;
    let arrowRotation = 0;

    switch (this.position) {
      case 'top':
        top = -tooltipRect.height - gap;
        left = (triggerRect.width - tooltipRect.width) / 2;
        arrowTop = tooltipRect.height;
        arrowLeft = (tooltipRect.width / 2) - arrowSize;
        arrowRotation = 180;
        break;

      case 'bottom':
        top = triggerRect.height + gap;
        left = (triggerRect.width - tooltipRect.width) / 2;
        arrowTop = -arrowSize * 2;
        arrowLeft = (tooltipRect.width / 2) - arrowSize;
        arrowRotation = 0;
        break;

      case 'left':
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = -tooltipRect.width - gap;
        arrowTop = (tooltipRect.height / 2) - arrowSize;
        arrowLeft = tooltipRect.width;
        arrowRotation = 270;
        break;

      case 'right':
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.width + gap;
        arrowTop = (tooltipRect.height / 2) - arrowSize;
        arrowLeft = -arrowSize * 2;
        arrowRotation = 90;
        break;
    }

    // Apply position
    this._tooltip.style.transform = `translate(${left}px, ${top}px)`;

    // Apply arrow position
    if (this._arrow) {
      this._arrow.style.top = `${arrowTop}px`;
      this._arrow.style.left = `${arrowLeft}px`;
      this._arrow.style.transform = `rotate(${arrowRotation}deg)`;
    }

    // Adjust if tooltip goes outside viewport
    this._adjustViewportPosition(triggerRect, tooltipRect, top, left);
  }

  private _adjustViewportPosition(triggerRect: DOMRect, tooltipRect: DOMRect, top: number, left: number) {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY
    };

    const tooltipAbsoluteTop = triggerRect.top + top;
    const tooltipAbsoluteLeft = triggerRect.left + left;

    let adjustedLeft = left;
    let adjustedTop = top;

    // Horizontal adjustments
    if (tooltipAbsoluteLeft < 10) {
      adjustedLeft = 10 - triggerRect.left;
    } else if (tooltipAbsoluteLeft + tooltipRect.width > viewport.width - 10) {
      adjustedLeft = viewport.width - 10 - tooltipRect.width - triggerRect.left;
    }

    // Vertical adjustments
    if (tooltipAbsoluteTop < 10) {
      adjustedTop = 10 - triggerRect.top;
    } else if (tooltipAbsoluteTop + tooltipRect.height > viewport.height - 10) {
      adjustedTop = viewport.height - 10 - tooltipRect.height - triggerRect.top;
    }

    // Apply adjusted position if needed
    if (adjustedLeft !== left || adjustedTop !== top) {
      this._tooltip.style.transform = `translate(${adjustedLeft}px, ${adjustedTop}px)`;
    }
  }

  protected render(): TemplateResult {
    return html`
      <div class="skill-tooltip__container">
        <div class="skill-tooltip__trigger">
          <slot></slot>
        </div>

        <div
          class="skill-tooltip__tooltip"
          part="tooltip"
          ?hidden=${!this.visible || this.disabled}
          role="tooltip"
          aria-live="polite"
        >
          <div class="skill-tooltip__content" part="content">
            ${this.content ? html`${this.content}` : html`<slot name="content"></slot>`}
          </div>

          ${this.arrow ? html`
            <div class="skill-tooltip__arrow" part="arrow"></div>
          ` : ''}
        </div>
      </div>
    `;
  }

  /**
   * Show the tooltip
   */
  public show(): void {
    if (this.disabled || this._isShowing) return;

    this._isShowing = true;
    this.visible = true;

    // Add global event listeners
    document.addEventListener('click', this._handleDocumentClick);
    document.addEventListener('keydown', this._handleKeyDown);

    // Update position after render
    requestAnimationFrame(() => {
      this._updatePosition();
    });

    this.dispatchEvent(new CustomEvent('skill-tooltip-show', {
      detail: { trigger: 'manual' },
      bubbles: true,
      composed: true,
    }));
  }

  /**
   * Hide the tooltip
   */
  public hide(): void {
    if (!this._isShowing) return;

    this._isShowing = false;
    this.visible = false;

    // Remove global event listeners
    document.removeEventListener('click', this._handleDocumentClick);
    document.removeEventListener('keydown', this._handleKeyDown);

    this.dispatchEvent(new CustomEvent('skill-tooltip-hide', {
      detail: { trigger: 'manual' },
      bubbles: true,
      composed: true,
    }));
  }

  /**
   * Toggle the tooltip visibility
   */
  public toggle(): void {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Update tooltip position (call if trigger element changes size)
   */
  public updatePosition(): void {
    if (this.visible) {
      this._updatePosition();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skill-tooltip': SkillTooltip;
  }
}