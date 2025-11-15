import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { linkStyles } from './skill-link.styles';
import { baseStyles } from '../../../styles/base';

/**
 * Skill Link Component - 链接组件
 *
 * @slot - Link content
 * @slot icon - Icon slot (before content)
 * @slot suffix - Suffix slot (after content)
 *
 * @csspart link - The link element
 * @csspart icon - The icon container
 * @csspart content - The content wrapper
 * @csspart suffix - The suffix container
 *
 * @cssprop --link-color - Text color
 * @cssprop --link-decoration - Text decoration
 * @cssprop --link-font-weight - Font weight
 * @cssprop --link-gap - Gap between elements
 *
 * @fires skill-link-click - Dispatched when link is clicked
 *
 * @example
 * ```html
 * <!-- 基础链接 -->
 * <skill-link href="#">Default Link</skill-link>
 *
 * <!-- 外部链接 -->
 * <skill-link href="https://example.com" target="_blank">External Link</skill-link>
 *
 * <!-- 不同颜色的链接 -->
 * <skill-link color="primary" href="#">Primary Link</skill-link>
 * <skill-link color="secondary" href="#">Secondary Link</skill-link>
 * <skill-link color="success" href="#">Success Link</skill-link>
 * <skill-link color="warning" href="#">Warning Link</skill-link>
 * <skill-link color="error" href="#">Error Link</skill-link>
 * <skill-link color="info" href="#">Info Link</skill-link>
 * <skill-link color="gray" href="#">Gray Link</skill-link>
 *
 * <!-- 不同变体 -->
 * <skill-link variant="default" href="#">Default</skill-link>
 * <skill-link variant="underline" href="#">Underline</skill-link>
 * <skill-link variant="ghost" href="#">Ghost</skill-link>
 * <skill-link variant="text" href="#">Text Only</skill-link>
 *
 * <!-- 不同尺寸 -->
 * <skill-link size="sm" href="#">Small Link</skill-link>
 * <skill-link size="md" href="#">Medium Link</skill-link>
 * <skill-link size="lg" href="#">Large Link</skill-link>
 *
 * <!-- 带图标的链接 -->
 * <skill-link href="#">
 *   <skill-icon slot="icon" name="arrow-right"></skill-icon>
 *   Continue
 * </skill-link>
 *
 * <!-- 带后缀的链接 -->
 * <skill-link href="#">
 *   Learn More
 *   <skill-icon slot="suffix" name="external-link"></skill-icon>
 * </skill-link>
 *
 * <!-- 禁用状态 -->
 * <skill-link disabled href="#">Disabled Link</skill-link>
 *
 * <!-- 访问过状态 -->
 * <skill-link visited href="#">Visited Link</skill-link>
 *
 * <!-- 无装饰链接 -->
 * <skill-link no-underline href="#">No Underline</skill-link>
 *
 * <!-- 悬停效果 -->
 * <skill-link hover="underline" href="#">Hover Underline</skill-link>
 * <skill-link hover="color" href="#">Hover Color</skill-link>
 * <skill-link hover="background" href="#">Hover Background</skill-link>
 *
 * <!-- 下载链接 -->
 * <skill-link href="/files/document.pdf" download>Download PDF</skill-link>
 *
 * <!-- 邮件链接 -->
 * <skill-link href="mailto:contact@example.com">Send Email</skill-link>
 *
 * <!-- 电话链接 -->
 * <skill-link href="tel:+1234567890">Call Us</skill-link>
 *
 * <!-- 锚点链接 -->
 * <skill-link href="#section1">Go to Section 1</skill-link>
 *
 * <!-- JavaScript链接 -->
 * <skill-link href="javascript:void(0)" @click=${handleClick}>JS Action</skill-link>
 *
 * <!-- 内部路由链接 -->
 * <skill-link href="/about" router-link>About Us</skill-link>
 *
 * <!-- 安全链接 -->
 * <skill-link href="https://secure.example.com" rel="noopener noreferrer">
 *   Secure Site
 * </skill-link>
 *
 * <!-- 带提示的链接 -->
 * <skill-link href="#" tooltip="Click to learn more">Help</skill-link>
 *
 * <!-- 长文本链接（自动截断） -->
 * <skill-link href="#" max-width="200px" truncate>
 *   This is a very long link text that should be truncated
 * </skill-link>
 *
 * <!-- 组合使用 -->
 * <skill-link
 *   href="/user/profile"
 *   color="primary"
 *   size="lg"
 *   hover="underline"
 *   external
 * >
 *   <skill-icon slot="icon" name="user"></skill-icon>
 *   View Profile
 *   <skill-icon slot="suffix" name="arrow-right"></skill-icon>
 * </skill-link>
 * ```
 */
@customElement('skill-link')
export class SkillLink extends LitElement {
  static styles = [baseStyles, linkStyles];

  /**
   * Link destination URL
   */
  @property({ type: String, reflect: true })
  href?: string;

  /**
   * Link target
   * @type {'_self' | '_blank' | '_parent' | '_top'}
   */
  @property({ type: String, reflect: true })
  target?: '_self' | '_blank' | '_parent' | '_top';

  /**
   * Relationship between the current document and the linked document
   */
  @property({ type: String, reflect: true })
  rel?: string;

  /**
   * Download attribute for file downloads
   */
  @property({ type: String, reflect: true })
  download?: string;

  /**
   * Size variant
   * @type {'sm' | 'md' | 'lg'}
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Color theme
   * @type {'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray'}
   */
  @property({ type: String, reflect: true })
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray' = 'primary';

  /**
   * Visual variant
   * @type {'default' | 'underline' | 'ghost' | 'text'}
   */
  @property({ type: String, reflect: true })
  variant: 'default' | 'underline' | 'ghost' | 'text' = 'default';

  /**
   * Hover effect
   * @type {'none' | 'underline' | 'color' | 'background'}
   */
  @property({ type: String, reflect: true })
  hover: 'none' | 'underline' | 'color' | 'background' = 'underline';

  /**
   * Whether the link is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the link has been visited
   */
  @property({ type: Boolean, reflect: true })
  visited = false;

  /**
   * Whether to remove underline
   */
  @property({ type: Boolean, reflect: true })
  noUnderline = false;

  /**
   * Whether to truncate text with ellipsis
   */
  @property({ type: Boolean, reflect: true })
  truncate = false;

  /**
   * Maximum width for truncation
   */
  @property({ type: String, reflect: true, attribute: 'max-width' })
  maxWidth?: string;

  /**
   * Whether this is an external link
   */
  @property({ type: Boolean, reflect: true, attribute: 'external' })
  external = false;

  /**
   * Whether this is a router link (SPA navigation)
   */
  @property({ type: Boolean, reflect: true, attribute: 'router-link' })
  routerLink = false;

  /**
   * Tooltip text
   */
  @property({ type: String, reflect: true })
  tooltip?: string;

  /**
   * ARIA label for accessibility
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  protected willUpdate() {
    // Set default rel for external links
    if (this.external && this.target === '_blank' && !this.rel) {
      this.rel = 'noopener noreferrer';
    }

    // Set ARIA attributes
    if (!this.ariaLabel) {
      this.ariaLabel = this._generateAriaLabel();
    }
  }

  private _generateAriaLabel(): string {
    const text = this.textContent?.trim() || '';
    const type = this.external ? 'external link' : this.routerLink ? 'page link' : 'link';
    return text ? `${text}, ${type}` : type;
  }

  private get isExternal(): boolean {
    if (!this.href) return false;

    try {
      const url = new URL(this.href, window.location.href);
      return url.hostname !== window.location.hostname;
    } catch {
      return false;
    }
  }

  render() {
    const tagName = this.href && !this.disabled ? 'a' : 'span';
    const attributes = this.href && !this.disabled ? {
      href: this.href,
      target: this.target,
      rel: this.rel,
      download: this.download,
    } : {};

    return html`
      <${tagName}
        part="link"
        class="skill-link"
        role="${this.href && !this.disabled ? 'link' : 'text'}"
        aria-label="${this.ariaLabel || ''}"
        aria-disabled="${this.disabled ? 'true' : 'false'}"
        tabindex="${this.disabled ? '-1' : '0'}"
        .target="${attributes.target}"
        .href="${attributes.href}"
        .rel="${attributes.rel}"
        .download="${attributes.download}"
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <slot name="icon" part="icon" class="skill-link__icon"></slot>

        <div part="content" class="skill-link__content">
          <slot></slot>
        </div>

        <slot name="suffix" part="suffix" class="skill-link__suffix"></slot>

        ${this.isExternal ? html`
          <span class="skill-link__external-icon" aria-hidden="true">
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </span>
        ` : ''}
      </${tagName}>
    `;
  }

  private _handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Handle router link navigation
    if (this.routerLink && this.href) {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent('skill-link-navigate', {
          bubbles: true,
          composed: true,
          detail: {
            href: this.href,
            originalEvent: e,
          },
        })
      );
      return;
    }

    this.dispatchEvent(
      new CustomEvent('skill-link-click', {
        bubbles: true,
        composed: true,
        detail: {
          originalEvent: e,
          href: this.href,
          target: this.target,
          external: this.isExternal,
          value: this.textContent?.trim() || '',
        },
      })
    );
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick(e);
    }
  }

  /**
   * Get link URL
   */
  public getUrl(): string | undefined {
    return this.href;
  }

  /**
   * Set link URL
   */
  public setUrl(url: string): void {
    this.href = url;
  }

  /**
   * Check if link is external
   */
  public isExternalLink(): boolean {
    return this.isExternal;
  }

  /**
   * Get current state
   */
  public get state() {
    return {
      disabled: this.disabled,
      visited: this.visited,
      external: this.external,
      routerLink: this.routerLink,
      href: this.href,
      target: this.target,
      value: this.textContent?.trim() || '',
      color: this.color,
      size: this.size,
      variant: this.variant,
      hover: this.hover,
    };
  }

  /**
   * Enable the link
   */
  public enable(): void {
    this.disabled = false;
  }

  /**
   * Disable the link
   */
  public disable(): void {
    this.disabled = true;
  }

  /**
   * Mark as visited
   */
  public markAsVisited(): void {
    this.visited = true;
  }

  /**
   * Mark as unvisited
   */
  public markAsUnvisited(): void {
    this.visited = false;
  }

  /**
   * Focus the link
   */
  public focus(): void {
    if (!this.disabled) {
      const element = this.shadowRoot?.querySelector('.skill-link') as HTMLElement;
      element?.focus();
    }
  }

  /**
   * Blur the link
   */
  public blur(): void {
    const element = this.shadowRoot?.querySelector('.skill-link') as HTMLElement;
    element?.blur();
  }

  /**
   * Navigate to the link URL
   */
  public navigate(): void {
    if (this.disabled || !this.href) return;

    if (this.routerLink) {
      this.dispatchEvent(
        new CustomEvent('skill-link-navigate', {
          bubbles: true,
          composed: true,
          detail: { href: this.href },
        })
      );
    } else {
      window.open(this.href, this.target || '_self');
    }
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-link': SkillLink;
  }
}