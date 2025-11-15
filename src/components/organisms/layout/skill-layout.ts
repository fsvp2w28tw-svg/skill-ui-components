import { LitElement, html, type PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { layoutStyles } from './skill-layout.styles';
import { baseStyles } from '../../../styles/base';
import type {
  LayoutTheme,
  LayoutSiderPosition,
  Breakpoint
} from '../../../types'; // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Skill Layout Component - 布局容器
 *
 * @slot - Layout content (skill-header, skill-sider, skill-content, skill-footer)
 *
 * @csspart layout - The layout container
 * @csspart content - The content area
 *
 * @cssprop --skill-layout-bg - Layout background color
 * @cssprop --skill-layout-color - Layout text color
 *
 * @fires skill-layout-change - Dispatched when layout configuration changes
 *
 * @example
 * ```html
 * <skill-layout theme="light">
 *   <skill-header>Header</skill-header>
 *   <skill-layout>
 *     <skill-sider collapsible>Sider</skill-sider>
 *     <skill-content>Content</skill-content>
 *   </skill-layout>
 *   <skill-footer>Footer</skill-footer>
 * </skill-layout>
 * ```
 */
@customElement('skill-layout')
export class SkillLayout extends LitElement {
  static styles = [baseStyles, layoutStyles];

  /**
   * Layout theme
   */
  @property({ type: String, reflect: true })
  theme?: LayoutTheme = 'light';

  /**
   * Whether layout has sider
   */
  @property({ type: Boolean, reflect: true, attribute: 'has-sider' })
  hasSider = false;

  /**
   * Additional CSS classes
   */
  @property({ type: String, reflect: true })
  className: string = '';

  private _resizeObserver?: ResizeObserver;
  private _mutationObserver?: MutationObserver;

  connectedCallback() {
    super.connectedCallback();
    this._setupObservers();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
    }
  }

  private _setupObservers() {
    // Observe layout changes
    this._mutationObserver = new MutationObserver(() => {
      this._checkSider();
    });

    this._mutationObserver.observe(this, {
      childList: true,
      subtree: true
    });

    // Observe resize
    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(() => {
        this._dispatchLayoutChange();
      });
      this._resizeObserver.observe(this);
    }

    // Initial check
    this._checkSider();
  }

  private _checkSider() {
    const siders = this.querySelectorAll('skill-sider');
    this.hasSider = siders.length > 0;
  }

  private _dispatchLayoutChange() {
    this.dispatchEvent(new CustomEvent('skill-layout-change', {
      bubbles: true,
      composed: true,
      detail: {
        width: this.offsetWidth,
        height: this.offsetHeight,
        theme: this.theme,
        hasSider: this.hasSider
      }
    }));
  }

  private _getLayoutClasses() {
    const classes = ['skill-layout'];

    if (this.theme) {
      classes.push(`skill-layout--${this.theme}`);
    }

    if (this.hasSider) {
      classes.push('skill-layout--has-sider');
    }

    if (this.className) {
      classes.push(this.className);
    }

    return classes.join(' ');
  }

  render() {
    return html`
      <div part="layout" class="${this._getLayoutClasses()}">
        <slot></slot>
      </div>
    `;
  }

  /**
   * Get layout information
   */
  public getLayoutInfo() {
    return {
      width: this.offsetWidth,
      height: this.offsetHeight,
      theme: this.theme,
      hasSider: this.hasSider,
      siders: Array.from(this.querySelectorAll('skill-sider')).map(sider => sider.getSiderInfo())
    };
  }
}

/**
 * Skill Layout Header Component - 布局头部
 *
 * @slot - Header content
 *
 * @csspart header - The header element
 *
 * @cssprop --skill-layout-header-bg - Header background color
 * @cssprop --skill-layout-header-height - Header height
 *
 * @example
 * ```html
 * <skill-header fixed height="64">
 *   <h1>Application Title</h1>
 *   <nav>Navigation</nav>
 * </skill-header>
 * ```
 */
@customElement('skill-header')
export class SkillHeader extends LitElement {
  static styles = [baseStyles, layoutStyles];

  /**
   * Whether header is fixed to top
   */
  @property({ type: Boolean, reflect: true })
  fixed = false;

  /**
   * Whether header is sticky
   */
  @property({ type: Boolean, reflect: true })
  sticky = false;

  /**
   * Additional CSS classes
   */
  @property({ type: String, reflect: true })
  className: string = '';

  /**
   * Header height
   */
  @property({ type: [Number, String], reflect: true })
  height?: number | string = 64;

  /**
   * Header z-index
   */
  @property({ type: Number, reflect: true, attribute: 'z-index' })
  zIndex = 100;

  protected update(changedProperties: PropertyValueMap<this>) {
    super.update(changedProperties);

    if (changedProperties.has('height')) {
      this.style.setProperty('--skill-layout-header-height',
        typeof this.height === 'number' ? `${this.height}px` : (this.height || ''));
    }

    if (changedProperties.has('zIndex')) {
      this.style.setProperty('--skill-layout-header-z-index', this.zIndex.toString());
    }
  }

  private _getHeaderClasses() {
    const classes = ['skill-layout__header'];

    if (this.fixed) {
      classes.push('skill-layout__header--fixed');
    }

    if (this.sticky) {
      classes.push('skill-layout__header--sticky');
    }

    if (this.className) {
      classes.push(this.className);
    }

    return classes.join(' ');
  }

  render() {
    return html`
      <header part="header" class="${this._getHeaderClasses()}">
        <slot></slot>
      </header>
    `;
  }

  /**
   * Get header information
   */
  public getHeaderInfo() {
    return {
      height: this.height,
      fixed: this.fixed,
      sticky: this.sticky,
      zIndex: this.zIndex
    };
  }
}

/**
 * Skill Layout Sider Component - 布局侧边栏
 *
 * @slot - Sider content
 *
 * @csspart sider - The sider element
 * @csspart trigger - The collapse trigger
 * @csspart content - The sider content
 *
 * @cssprop --skill-layout-sider-bg - Sider background color
 * @cssprop --skill-layout-sider-width - Sider width
 *
 * @fires skill-collapse - Dispatched when sider collapses/expands
 * @fires skill-breakpoint - Dispatched when responsive breakpoint is triggered
 *
 * @example
 * ```html
 * <skill-sider collapsible position="left" width="256" breakpoint="md">
 *   <nav>Side navigation</nav>
 * </skill-sider>
 * ```
 */
@customElement('skill-sider')
export class SkillSider extends LitElement {
  static styles = [baseStyles, layoutStyles];

  /**
   * Whether sider can be collapsed
   */
  @property({ type: Boolean, reflect: true })
  collapsible = false;

  /**
   * Whether sider is collapsed
   */
  @property({ type: Boolean, reflect: true })
  collapsed = false;

  /**
   * Width when collapsed
   */
  @property({ type: [Number, String], reflect: true, attribute: 'collapsed-width' })
  collapsedWidth = 80;

  /**
   * Responsive breakpoint
   */
  @property({ type: String, reflect: true })
  breakpoint?: Breakpoint;

  /**
   * Sider position
   */
  @property({ type: String, reflect: true })
  position: LayoutSiderPosition = 'left';

  /**
   * Sider width
   */
  @property({ type: [Number, String], reflect: true })
  width = 256;

  /**
   * Sider theme
   */
  @property({ type: String, reflect: true })
  theme?: LayoutTheme;

  /**
   * Zero width trigger style
   */
  @property({ type: Object, attribute: 'zero-width-trigger-style' })
  zeroWidthTriggerStyle = {};

  @state()
  private _isMobile = false;

  @state()
  private _mobileVisible = false;

  private _breakpointMatchMedia?: MediaQueryList;

  connectedCallback() {
    super.connectedCallback();
    this._setupResponsive();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._breakpointMatchMedia) {
      this._breakpointMatchMedia.removeEventListener('change', this._handleBreakpointChange);
    }
  }

  private _setupResponsive() {
    if (this.breakpoint) {
      const breakpointMap: { [key in Breakpoint]: string } = {
        xs: '(max-width: 575px)',
        sm: '(min-width: 576px) and (max-width: 767px)',
        md: '(min-width: 768px) and (max-width: 991px)',
        lg: '(min-width: 992px) and (max-width: 1199px)',
        xl: '(min-width: 1200px)',
        xxl: '(min-width: 1400px)'
      };

      const mediaQuery = breakpointMap[this.breakpoint];
      if (mediaQuery) {
        this._breakpointMatchMedia = window.matchMedia(mediaQuery);
        this._breakpointMatchMedia.addEventListener('change', this._handleBreakpointChange);
        // Create mock MediaQueryListEvent for initial call
        const mockEvent = { matches: this._breakpointMatchMedia.matches } as MediaQueryListEvent;
        this._handleBreakpointChange(mockEvent);
      }
    }
  }

  private _handleBreakpointChange = (e: MediaQueryListEvent) => {
    const wasMobile = this._isMobile;
    this._isMobile = !e.matches;

    if (this._isMobile && !wasMobile) {
      this._mobileVisible = false;
    }

    this.dispatchEvent(new CustomEvent('skill-breakpoint', {
      bubbles: true,
      composed: true,
      detail: { matches: e.matches, breakpoint: this.breakpoint }
    }));
  };

  protected update(changedProperties: PropertyValueMap<this>) {
    super.update(changedProperties);

    if (changedProperties.has('width')) {
      this.style.setProperty('--skill-layout-sider-width',
        typeof this.width === 'number' ? `${this.width}px` : this.width);
    }
  }

  private _getSiderClasses() {
    const classes = ['skill-layout__sider'];

    if (this.collapsed) {
      classes.push('skill-layout__sider--collapsed');
    }

    if (this.position) {
      classes.push(`skill-layout__sider--${this.position}`);
    }

    if (this._mobileVisible) {
      classes.push('skill-layout__sider--mobile-visible');
    }

    if (this._isMobile && (!this.collapsed || this.collapsedWidth === 0)) {
      classes.push('skill-layout__sider--zero-width');
    }

    return classes.join(' ');
  }

  private _handleTriggerClick = () => {
    if (this._isMobile) {
      this._mobileVisible = !this._mobileVisible;
    } else {
      this.collapsed = !this.collapsed;
    }

    this.dispatchEvent(new CustomEvent('skill-collapse', {
      bubbles: true,
      composed: true,
      detail: { collapsed: this.collapsed }
    }));
  };

  private _handleMaskClick = () => {
    this._mobileVisible = false;
  };

  render() {
    const siderWidth = this.collapsed ?
      (typeof this.collapsedWidth === 'number' ? `${this.collapsedWidth}px` : this.collapsedWidth) :
      (typeof this.width === 'number' ? `${this.width}px` : this.width);

    const showTrigger = this.collapsible && (
      this._isMobile || (this.collapsed && this.collapsedWidth > 0)
    );

    return html`
      ${this._isMobile && this._mobileVisible ? html`
        <div
          part="mask"
          class="skill-layout__sider-mask ${this._mobileVisible ? 'skill-layout__sider-mask--visible' : ''}"
          @click=${this._handleMaskClick}
        ></div>
      ` : ''}

      <aside
        part="sider"
        class="${this._getSiderClasses()}"
        style="--skill-layout-sider-width: ${siderWidth};"
      >
        <div part="content" class="skill-layout__sider-content">
          <slot></slot>
        </div>

        ${showTrigger ? html`
          <div
            part="trigger"
            class="skill-layout__sider-trigger"
            style=${this.zeroWidthTriggerStyle ?
              Object.entries(this.zeroWidthTriggerStyle)
                .map(([key, value]) => `${key}: ${value}`)
                .join('; ') : ''}
            @click=${this._handleTriggerClick}
          >
            ${this.collapsed ? html`
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            ` : html`
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            `}
          </div>
        ` : ''}
      </aside>
    `;
  }

  /**
   * Get sider information
   */
  public getSiderInfo() {
    return {
      width: this.width,
      collapsed: this.collapsed,
      collapsible: this.collapsible,
      position: this.position,
      theme: this.theme,
      breakpoint: this.breakpoint,
      isMobile: this._isMobile,
      mobileVisible: this._mobileVisible
    };
  }

  /**
   * Toggle collapse state
   */
  public toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  /**
   * Set mobile visibility
   */
  public setMobileVisible(visible: boolean) {
    this._mobileVisible = visible;
  }
}

/**
 * Skill Layout Content Component - 布局内容区
 *
 * @slot - Content
 *
 * @csspart content - The content element
 *
 * @cssprop --skill-layout-content-padding - Content padding
 *
 * @example
 * ```html
 * <skill-content padding="24">
 *   <p>Main content area</p>
 * </skill-content>
 * ```
 */
@customElement('skill-content')
export class SkillContent extends LitElement {
  static styles = [baseStyles, layoutStyles];

  /**
   * Additional CSS classes
   */
  @property({ type: String, reflect: true })
  className: string = '';

  /**
   * Custom styles
   */
  @property({ type: Object, noAccessor: true })
  customStyle?: any;

  private _getContentClasses() {
    const classes = ['skill-layout__content'];

    if (this.className) {
      classes.push(this.className);
    }

    return classes.join(' ');
  }

  render() {
    return html`
      <main part="content" class="${this._getContentClasses()}" style=${this.customStyle || ''}>
        <slot></slot>
      </main>
    `;
  }
}

/**
 * Skill Layout Footer Component - 布局底部
 *
 * @slot - Footer content
 *
 * @csspart footer - The footer element
 *
 * @cssprop --skill-layout-footer-bg - Footer background color
 * @cssprop --skill-layout-footer-height - Footer height
 *
 * @example
 * ```html
 * <skill-footer fixed height="64">
 *   <p>© 2024 Company Name</p>
 * </skill-footer>
 * ```
 */
@customElement('skill-footer')
export class SkillFooter extends LitElement {
  static styles = [baseStyles, layoutStyles];

  /**
   * Whether footer is fixed to bottom
   */
  @property({ type: Boolean, reflect: true })
  fixed = false;

  /**
   * Additional CSS classes
   */
  @property({ type: String, reflect: true })
  className: string = '';

  /**
   * Footer height
   */
  @property({ type: [Number, String], reflect: true })
  height?: number | string = 64;

  protected update(changedProperties: PropertyValueMap<this>) {
    super.update(changedProperties);

    if (changedProperties.has('height')) {
      this.style.setProperty('--skill-layout-footer-height',
        typeof this.height === 'number' ? `${this.height}px` : (this.height || ''));
    }
  }

  private _getFooterClasses() {
    const classes = ['skill-layout__footer'];

    if (this.fixed) {
      classes.push('skill-layout__footer--fixed');
    }

    if (this.className) {
      classes.push(this.className);
    }

    return classes.join(' ');
  }

  render() {
    return html`
      <footer part="footer" class="${this._getFooterClasses()}">
        <slot></slot>
      </footer>
    `;
  }

  /**
   * Get footer information
   */
  public getFooterInfo() {
    return {
      height: this.height,
      fixed: this.fixed
    };
  }
}

// TypeScript support for using these elements in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-layout': SkillLayout;
    'skill-header': SkillHeader;
    'skill-sider': SkillSider;
    'skill-content': SkillContent;
    'skill-footer': SkillFooter;
  }
}