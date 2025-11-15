import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { anchorStyles } from './skill-anchor.styles';
import { baseStyles } from '../../../styles/base';
import type { Size } from '../../../types';

/**
 * Skill Anchor Component - 锚点导航组件
 *
 * @slot - Anchor link content
 * @slot icon - Icon before anchor text
 *
 * @csspart anchor - The anchor link element
 * @csspart indicator - Active indicator
 * @csspart content - Content wrapper
 *
 * @cssprop --anchor-color - Text color
 * @cssprop --anchor-hover-color - Hover text color
 * @cssprop --anchor-active-color - Active text color
 * @cssprop --anchor-indicator-size - Active indicator size
 * @cssprop --anchor-indicator-color - Active indicator color
 *
 * @fires skill-anchor-click - Dispatched when anchor is clicked
 * @fires skill-anchor-change - Dispatched when active anchor changes
 *
 * @example
 * ```html
 * <skill-anchor href="#section1" target="_top">Section 1</skill-anchor>
 * <skill-anchor href="#section2" active>Section 2</skill-anchor>
 * <skill-anchor href="/external" external>External Link</skill-anchor>
 * ```
 */
@customElement('skill-anchor')
export class SkillAnchor extends LitElement {
  static styles = [baseStyles, anchorStyles];

  /**
   * Anchor href/destination
   */
  @property({ type: String, reflect: true })
  href?: string;

  /**
   * Target for anchor
   * @type {'_blank' | '_self' | '_parent' | '_top' | 'frame-name'}
   */
  @property({ type: String, reflect: true })
  target?: '_blank' | '_self' | '_parent' | '_top' | string = '_self';

  /**
   * Active state - indicates current section
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * Size variant
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: Size = 'md';

  /**
   * External link indicator
   */
  @property({ type: Boolean, reflect: true })
  external = false;

  /**
   * Show active indicator
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-indicator' })
  showIndicator = true;

  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Anchor placement/position
   * @type {'top' | 'left' | 'right' | 'bottom'}
   */
  @property({ type: String, reflect: true })
  placement?: 'top' | 'left' | 'right' | 'bottom';

  /**
   * Custom offset for smooth scrolling
   */
  @property({ type: Number, reflect: true })
  offset = 0;

  /**
   * Smooth scroll behavior
   */
  @property({ type: Boolean, reflect: true, attribute: 'smooth-scroll' })
  smoothScroll = true;

  /**
   * Prevent default click behavior
   */
  @property({ type: Boolean, reflect: true, attribute: 'prevent-default' })
  preventDefault = false;

  /**
   * Custom title for tooltip
   */
  @property({ type: String, reflect: true, attribute: 'tooltip-title' })
  tooltipTitle?: string;

  private _intersectionObserver?: IntersectionObserver;
  private _targetElement?: Element;

  connectedCallback() {
    super.connectedCallback();

    // Set up intersection observer for auto-active detection
    if (this.href && this.href.startsWith('#')) {
      this._setupIntersectionObserver();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
    }
  }

  private _setupIntersectionObserver() {
    if (!this.href || !this.href.startsWith('#')) return;

    const targetId = this.href.substring(1);
    this._targetElement = document.getElementById(targetId) || undefined;

    if (this._targetElement) {
      this._intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.active = true;
              this._notifyAnchorChange();
            } else {
              this.active = false;
            }
          });
        },
        {
          rootMargin: `${-this.offset}px 0px -50% 0px`,
          threshold: 0
        }
      );

      this._intersectionObserver.observe(this._targetElement);
    }
  }

  private _notifyAnchorChange() {
    this.dispatchEvent(
      new CustomEvent('skill-anchor-change', {
        bubbles: true,
        composed: true,
        detail: {
          anchor: this,
          href: this.href,
          active: this.active
        }
      })
    );
  }

  render() {
    const isExternal = this.external || (this.target === '_blank');
    const rel = isExternal ? 'noopener noreferrer' : undefined;

    return html`
      <a
        part="anchor"
        class="skill-anchor"
        href=${this.href || '#'}
        target=${this.target || '_self'}
        rel=${rel || ''}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-current=${this.active ? 'location' : 'false'}
        title=${this.tooltipTitle || this._getAriaLabel()}
        role="link"
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <slot name="icon"></slot>

        <span part="content" class="skill-anchor__content">
          <slot></slot>
        </span>

        ${isExternal ? this._renderExternalIcon() : ''}

        ${this.showIndicator && this.active ? this._renderActiveIndicator() : ''}
      </a>
    `;
  }

  private _renderExternalIcon() {
    return html`
      <svg
        part="external-icon"
        class="skill-anchor__external-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15,3 21,3 21,9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    `;
  }

  private _renderActiveIndicator() {
    return html`<span part="indicator" class="skill-anchor__indicator"></span>`;
  }

  private _getAriaLabel() {
    if (this.tooltipTitle) return this.tooltipTitle;
    if (this.external) return 'Opens in new window';
    return undefined;
  }

  private _handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (this.preventDefault) {
      e.preventDefault();
    }

    // Handle smooth scrolling for internal anchors
    if (this.href?.startsWith('#') && this.smoothScroll && !this.preventDefault) {
      e.preventDefault();
      this._smoothScrollToTarget();
    }

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent('skill-anchor-click', {
        bubbles: true,
        composed: true,
        detail: {
          originalEvent: e,
          href: this.href,
          target: this.target,
          external: this.external,
          active: this.active
        }
      })
    );
  }

  private _handleKeyDown(e: KeyboardEvent) {
    // Handle Enter key
    if (e.key === 'Enter') {
      this._handleClick(e as any);
    }
  }

  private _smoothScrollToTarget() {
    if (!this.href?.startsWith('#')) return;

    const targetId = this.href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = targetPosition - this.offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL without triggering scroll
      history.pushState(null, '', this.href);
    }
  }

  /**
   * Programmatically activate this anchor
   */
  public activate() {
    this.active = true;
    this._notifyAnchorChange();
  }

  /**
   * Programmatically deactivate this anchor
   */
  public deactivate() {
    this.active = false;
    this._notifyAnchorChange();
  }

  /**
   * Scroll to target
   */
  public scrollToTarget() {
    if (this.smoothScroll) {
      this._smoothScrollToTarget();
    } else {
      if (this.href?.startsWith('#')) {
        const targetId = this.href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView();
        }
      }
    }
  }

  /**
   * Get target element
   */
  public getTargetElement(): Element | null {
    if (this._targetElement) return this._targetElement;

    if (this.href?.startsWith('#')) {
      const targetId = this.href.substring(1);
      return document.getElementById(targetId);
    }

    return null;
  }

  /**
   * Check if anchor is in viewport
   */
  public isInViewport(): boolean {
    const target = this.getTargetElement();
    if (!target) return false;

    const rect = target.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Focus the anchor
   */
  public focus() {
    const anchor = this.shadowRoot?.querySelector('.skill-anchor') as HTMLAnchorElement;
    if (anchor) {
      anchor.focus();
    }
  }

  /**
   * Blur the anchor
   */
  public blur() {
    const anchor = this.shadowRoot?.querySelector('.skill-anchor') as HTMLAnchorElement;
    if (anchor) {
      anchor.blur();
    }
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-anchor': SkillAnchor;
  }
}