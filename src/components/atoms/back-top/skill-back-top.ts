import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { backTopStyles } from './skill-back-top.styles';
import { baseStyles } from '../../../styles/base';
import type { Size } from '../../../types';

/**
 * Skill BackTop Component - 回到顶部组件
 *
 * @slot icon - Custom icon content
 * @slot content - Custom content
 *
 * @csspart container - BackTop container
 * @csspart button - BackTop button
 * @csspart icon - Icon element
 * @csspart content - Content element
 *
 * @cssprop --back-top-bg - Background color
 * @cssprop --back-top-color - Text color
 * @cssprop --back-top-size - Button size
 *
 * @fires skill-back-top-click - Dispatched when back to top is clicked
 *
 * @example
 * ```html
 * <skill-back-top></skill-back-top>
 * ```
 */
@customElement('skill-back-top')
export class SkillBackTop extends LitElement {
  static styles = [baseStyles, backTopStyles];

  /**
   * Visibility threshold in pixels
   */
  @property({ type: Number, reflect: true, attribute: 'visibility-height' })
  visibilityHeight = 400;

  /**
   * Scroll to top duration in milliseconds
   */
  @property({ type: Number, reflect: true, attribute: 'duration' })
  duration = 450;

  /**
   * Position of the button
   * @type {'right' | 'left'}
   */
  @property({ type: String, reflect: true })
  position: 'right' | 'left' = 'right';

  /**
   * Distance from bottom
   */
  @property({ type: Number, reflect: true, attribute: 'bottom' })
  bottom = 40;

  /**
   * Distance from right or left
   */
  @property({ type: Number, reflect: true })
  right = 30;

  /**
   * Distance from left
   */
  @property({ type: Number, reflect: true })
  left = 30;

  /**
   * Size variant
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: Size = 'md';

  /**
   * Custom target element to scroll
   */
  @property({ type: String, reflect: true, attribute: 'target' })
  target?: string;

  /**
   * Show tooltip
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-tooltip' })
  showTooltip = true;

  /**
   * Tooltip text
   */
  @property({ type: String, reflect: true, attribute: 'tooltip-text' })
  tooltipText = 'Back to top';

  @state()
  private _visible = false;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', this._handleScroll);
    this._handleScroll();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this._handleScroll);
  }

  private _handleScroll = () => {
    const targetElement = this.target ? document.querySelector(this.target) as HTMLElement : document.documentElement;
    const scrollTop = targetElement instanceof HTMLElement ? targetElement.scrollTop : window.pageYOffset;
    this._visible = scrollTop >= this.visibilityHeight;
  };

  private _handleClick() {
    const targetElement = this.target ? document.querySelector(this.target) as HTMLElement : window;
    const startPosition = targetElement instanceof HTMLElement ? targetElement.scrollTop : window.pageYOffset;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);

      // Easing function (easeInOutCubic)
      const easeProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentPosition = startPosition * (1 - easeProgress);

      if (targetElement instanceof HTMLElement) {
        targetElement.scrollTop = currentPosition;
      } else {
        window.scrollTo(0, currentPosition);
      }

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);

    this.dispatchEvent(
      new CustomEvent('skill-back-top-click', {
        bubbles: true,
        composed: true
      })
    );
  };

  render() {
    if (!this._visible) return html``;

    const positionStyle = {
      [this.position]: this.position === 'right' ? `${this.right}px` : `${this.left}px`,
      bottom: `${this.bottom}px`
    };

    return html`
      <div
        class="skill-back-top__container"
        part="container"
        style="${Object.entries(positionStyle).map(([k, v]) => `${k}: ${v}`).join('; ')}"
      >
        <button
          class="skill-back-top__button"
          part="button"
          size=${this.size}
          @click=${this._handleClick}
          aria-label=${this.tooltipText}
          title=${this.showTooltip ? this.tooltipText : ''}
        >
          <slot name="icon">
            <svg class="skill-back-top__icon" part="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </slot>

          <slot name="content"></slot>

          ${this.showTooltip ? html`
            <div class="skill-back-top__tooltip">${this.tooltipText}</div>
          ` : ''}
        </button>
      </div>
    `;
  }

  /**
   * Programmatically scroll to top
   */
  public scrollToTop() {
    this._handleClick();
  }

  /**
   * Check if button is visible
   */
  public isVisible(): boolean {
    return this._visible;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skill-back-top': SkillBackTop;
  }
}