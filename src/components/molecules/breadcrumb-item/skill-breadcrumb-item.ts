import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { breadcrumbItemStyles } from './skill-breadcrumb-item.styles';
import { baseStyles } from '../../../styles/base';

/**
 * Skill Breadcrumb Item Component - 面包屑项组件
 *
 * 组合了 breadcrumb、link 和 icon 的分子组件，用于显示单个面包屑项
 *
 * @slot - Default slot for content
 * @slot icon - Icon slot (before content)
 * @slot prefix - Prefix slot (before content, after icon)
 * @slot suffix - Suffix slot (after content)
 *
 * @csspart item - The breadcrumb item container
 * @csspart link - The link element
 * @csspart icon - The icon container
 * @csspart content - The content wrapper
 * @csspart prefix - The prefix container
 * @csspart suffix - The suffix container
 * @csspart separator - The separator element
 *
 * @cssprop --breadcrumb-item-gap - Gap between elements
 * @cssprop --breadcrumb-item-color - Text color
 * @cssprop --breadcrumb-item-separator-color - Separator color
 * @cssprop --breadcrumb-item-font-size - Font size
 * @cssprop --breadcrumb-item-font-weight - Font weight
 * @cssprop --breadcrumb-item-padding - Padding
 *
 * @fires skill-breadcrumb-item-click - Dispatched when item is clicked
 * @fires skill-breadcrumb-item-navigate - Dispatched when navigation occurs
 *
 * @example
 * ```html
 * <!-- 基础面包屑项 -->
 * <skill-breadcrumb-item href="/home">Home</skill-breadcrumb-item>
 *
 * <!-- 当前页面（非链接） -->
 * <skill-breadcrumb-item active>Current Page</skill-breadcrumb-item>
 *
 * <!-- 带图标 -->
 * <skill-breadcrumb-item href="/products" icon="box">Products</skill-breadcrumb-item>
 *
 * <!-- 带分隔符 -->
 * <skill-breadcrumb-item href="/docs" separator="/">Documentation</skill-breadcrumb-item>
 *
 * <!-- 禁用状态 -->
 * <skill-breadcrumb-item disabled href="/disabled">Disabled</skill-breadcrumb-item>
 *
 * <!-- 不同颜色 -->
 * <skill-breadcrumb-item href="/primary" color="primary">Primary</skill-breadcrumb-item>
 *
 * <!-- 不同尺寸 -->
 * <skill-breadcrumb-item href="/small" size="sm">Small</skill-breadcrumb-item>
 * <skill-breadcrumb-item href="/large" size="lg">Large</skill-breadcrumb-item>
 *
 * <!-- 自定义分隔符 -->
 * <skill-breadcrumb-item>
 *   <span slot="separator">›</span>
 *   Custom Separator
 * </skill-breadcrumb-item>
 *
 * <!-- 带前缀和后缀 -->
 * <skill-breadcrumb-item href="/page">
 *   <span slot="prefix">→</span>
 *   Page Content
 *   <span slot="suffix">←</span>
 * </skill-breadcrumb-item>
 *
 * <!-- 外部链接 -->
 * <skill-breadcrumb-item href="https://example.com" external>External</skill-breadcrumb-item>
 *
 * <!-- 自定义内容 -->
 * <skill-breadcrumb-item href="/custom">
 *   <skill-icon slot="icon" name="user"></skill-icon>
 *   <span slot="prefix">User:</span>
 *   Profile
 *   <skill-icon slot="suffix" name="arrow-right"></skill-icon>
 * </skill-breadcrumb-item>
 *
 * <!-- 工具提示 -->
 * <skill-breadcrumb-item href="/help" tooltip="Click for help">Help</skill-breadcrumb-item>
 *
 * <!-- 无下划线 -->
 * <skill-breadcrumb-item href="/clean" no-underline>Clean</skill-breadcrumb-item>
 *
 * <!-- 最大宽度截断 -->
 * <skill-breadcrumb-item href="/truncate" max-width="150px" truncate>
 *   Very long breadcrumb item text that should be truncated
 * </skill-breadcrumb-item>
 *
 * <!-- 路由模式 -->
 * <skill-breadcrumb-item href="/spa-page" router-link>SPA Page</skill-breadcrumb-item>
 * ```
 */
@customElement('skill-breadcrumb-item')
export class SkillBreadcrumbItem extends LitElement {
  static styles = [baseStyles, breadcrumbItemStyles];

  /**
   * Navigation URL
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
   * Icon name to display
   */
  @property({ type: String, reflect: true })
  icon?: string;

  /**
   * Separator character or element
   */
  @property({ type: String, reflect: true })
  separator?: string;

  /**
   * Whether this is the current active page
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * Whether the item is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

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
   * Size variant
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Color theme
   * @type {'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray'}
   */
  @property({ type: String, reflect: true })
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray' = 'gray';

  /**
   * Whether to remove underline from links
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-underline' })
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
   * Tooltip text
   */
  @property({ type: String, reflect: true })
  tooltip?: string;

  /**
   * ARIA label for accessibility
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  /**
   * Whether to show the separator
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-separator' })
  showSeparator = false;

  /**
   * Whether dropdown is open (for nested items)
   */
  private _clickOutsideHandler?: (e: Event) => void;

  connectedCallback() {
    super.connectedCallback();
    this._setupClickOutside();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupClickOutside();
  }

  private _setupClickOutside() {
    // Click outside functionality temporarily removed
    // this._clickOutsideHandler = (e: Event) => {
    //   if (!this.contains(e.target as Node)) {
    //     // this._dropdownOpen = false;
    //   }
    // };
    // document.addEventListener('click', this._clickOutsideHandler);
  }

  private _cleanupClickOutside() {
    if (this._clickOutsideHandler) {
      document.removeEventListener('click', this._clickOutsideHandler);
    }
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

  private _generateAriaLabel(): string {
    const text = this.textContent?.trim() || '';
    const type = this.active ? 'current page' :
                 this.external ? 'external link' :
                 this.routerLink ? 'page link' : 'link';
    return text ? `${text}, ${type}` : type;
  }

  private _handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (this.active) {
      e.preventDefault();
      return;
    }

    // Handle router link navigation
    if (this.routerLink && this.href) {
      e.preventDefault();
      this._fireNavigateEvent(e);
      return;
    }

    this._fireClickEvent(e);
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.disabled || this.active) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick(e);
    }
  }

  private _fireClickEvent(originalEvent: Event) {
    this.dispatchEvent(
      new CustomEvent('skill-breadcrumb-item-click', {
        bubbles: true,
        composed: true,
        detail: {
          originalEvent,
          href: this.href,
          target: this.target,
          external: this.isExternal,
          active: this.active,
          disabled: this.disabled,
          value: this.textContent?.trim() || '',
        },
      })
    );
  }

  private _fireNavigateEvent(originalEvent: Event) {
    this.dispatchEvent(
      new CustomEvent('skill-breadcrumb-item-navigate', {
        bubbles: true,
        composed: true,
        detail: {
          href: this.href,
          originalEvent,
          value: this.textContent?.trim() || '',
        },
      })
    );
  }

  private _renderIcon(): TemplateResult {
    if (!this.icon) return html``;

    return html`
      <span part="icon" class="skill-breadcrumb-item__icon">
        <slot name="icon">
          <skill-icon name="${this.icon}" size="${this.size}"></skill-icon>
        </slot>
      </span>
    `;
  }

  private _renderSeparator(): TemplateResult {
    if (!this.showSeparator && !this.separator) return html``;

    return html`
      <span part="separator" class="skill-breadcrumb-item__separator">
        <slot name="separator">${this.separator || '/'}</slot>
      </span>
    `;
  }

  private _renderExternalIcon(): TemplateResult {
    if (!this.isExternal && !this.external) return html``;

    return html`
      <span class="skill-breadcrumb-item__external-icon" aria-hidden="true">
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
        </svg>
      </span>
    `;
  }

  private _renderContent(): TemplateResult {
    const text = this.textContent?.trim() || '';
    const finalTooltip = this.tooltip || (this.truncate && text ? text : '');

    return html`
      <span part="content" class="skill-breadcrumb-item__content" title="${finalTooltip}">
        <slot name="prefix" part="prefix" class="skill-breadcrumb-item__prefix"></slot>
        <slot></slot>
        <slot name="suffix" part="suffix" class="skill-breadcrumb-item__suffix"></slot>
      </span>
    `;
  }

  private _renderLink(): TemplateResult {
    const tagName = this.href && !this.disabled && !this.active ? 'a' : 'span';
    const attributes = this.href && !this.disabled && !this.active ? {
      href: this.href,
      target: this.target,
      rel: this.rel,
      download: this.download,
    } : {};

    return html`
      <${tagName}
        part="link"
        class="skill-breadcrumb-item__link"
        role="${this.href && !this.disabled && !this.active ? 'link' : 'text'}"
        aria-label="${this.ariaLabel || this._generateAriaLabel()}"
        aria-current="${this.active ? 'page' : 'false'}"
        aria-disabled="${this.disabled ? 'true' : 'false'}"
        tabindex="${this.disabled ? '-1' : '0'}"
        .target="${attributes.target}"
        .href="${attributes.href}"
        .rel="${attributes.rel}"
        .download="${attributes.download}"
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        ${this._renderIcon()}
        ${this._renderContent()}
        ${this._renderExternalIcon()}
      </${tagName}>
    `;
  }

  render(): TemplateResult {
    const containerClasses = {
      'skill-breadcrumb-item': true,
      'skill-breadcrumb-item--active': this.active,
      'skill-breadcrumb-item--disabled': this.disabled,
      'skill-breadcrumb-item--external': this.isExternal || this.external,
      'skill-breadcrumb-item--router': this.routerLink,
      [`skill-breadcrumb-item--${this.size}`]: this.size !== 'md',
      [`skill-breadcrumb-item--${this.color}`]: this.color !== 'gray',
      'skill-breadcrumb-item--no-underline': this.noUnderline,
      'skill-breadcrumb-item--truncate': this.truncate,
    };

    const containerStyles = {
      maxWidth: this.maxWidth || undefined,
    };

    return html`
      <div
        part="item"
        class=${Object.keys(containerClasses).join(' ')}
        style=${styleMap(containerStyles)}
      >
        ${this._renderLink()}
        ${this._renderSeparator()}
      </div>
    `;
  }

  /**
   * Get current state
   */
  public get state() {
    return {
      href: this.href,
      target: this.target,
      icon: this.icon,
      separator: this.separator,
      active: this.active,
      disabled: this.disabled,
      external: this.isExternal || this.external,
      routerLink: this.routerLink,
      size: this.size,
      color: this.color,
      noUnderline: this.noUnderline,
      truncate: this.truncate,
      maxWidth: this.maxWidth,
      tooltip: this.tooltip,
      showSeparator: this.showSeparator,
      value: this.textContent?.trim() || '',
    };
  }

  /**
   * Activate this item
   */
  public activate(): void {
    this.active = true;
    this.disabled = false;
  }

  /**
   * Deactivate this item
   */
  public deactivate(): void {
    this.active = false;
  }

  /**
   * Enable the item
   */
  public enable(): void {
    this.disabled = false;
  }

  /**
   * Disable the item
   */
  public disable(): void {
    this.disabled = true;
  }

  /**
   * Get URL
   */
  public getUrl(): string | undefined {
    return this.href;
  }

  /**
   * Set URL
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
   * Focus the item
   */
  public focus(): void {
    if (!this.disabled) {
      (this.shadowRoot?.querySelector('.skill-breadcrumb-item__link') as HTMLElement)?.focus();
    }
  }

  /**
   * Blur the item
   */
  public blur(): void {
    (this.shadowRoot?.querySelector('.skill-breadcrumb-item__link') as HTMLElement)?.blur();
  }

  /**
   * Navigate to the link URL
   */
  public navigate(): void {
    if (this.disabled || this.active || !this.href) return;

    if (this.routerLink) {
      this._fireNavigateEvent(new Event('navigate'));
    } else {
      window.open(this.href, this.target || '_self');
    }
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-breadcrumb-item': SkillBreadcrumbItem;
  }
}