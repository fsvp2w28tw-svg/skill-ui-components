import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { toolbarStyles } from './skill-toolbar.styles';
import { baseStyles } from '../../../styles/base';

export interface ToolbarItem {
  id: string;
  type: 'button' | 'dropdown' | 'search' | 'text' | 'divider' | 'breadcrumb' | 'tabs';
  label?: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
  active?: boolean;
  loading?: boolean;
  position?: 'left' | 'center' | 'right';
  dropdownItems?: ToolbarDropdownItem[];
  placeholder?: string;
  value?: string;
  options?: ToolbarTabItem[];
  items?: ToolbarBreadcrumbItem[];
  onClick?: (e: Event) => void;
  onSearch?: (value: string) => void;
}

export interface ToolbarDropdownItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  active?: boolean;
  onClick?: (e: Event) => void;
}

export interface ToolbarTabItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  active?: boolean;
  onClick?: (e: Event) => void;
}

export interface ToolbarBreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  active?: boolean;
  onClick?: (e: Event) => void;
}

export interface ToolbarEventDetail {
  item?: ToolbarItem;
  dropdownItem?: ToolbarDropdownItem;
  action?: string;
  value?: any;
  originalEvent: Event;
}

/**
 * Skill Toolbar Component - 操作工具栏组件
 *
 * @slot left - 左侧内容插槽
 * @slot center - 中间内容插槽
 * @slot right - 右侧内容插槽
 *
 * @csspart toolbar - 工具栏容器
 * @csspart item - 工具栏项
 * @csspart icon - 图标
 * @csspart text - 文本
 * @csspart badge - 徽章
 * @csspart search - 搜索框
 * @csspart dropdown - 下拉菜单
 * @csspart tabs - 标签页
 *
 * @cssprop --toolbar-height - 工具栏高度
 * @cssprop --toolbar-bg - 背景色
 * @cssprop --toolbar-border - 边框样式
 * @cssprop --toolbar-gap - 项目间距
 *
 * @fires skill-toolbar-action-click - 工具栏操作点击事件
 * @fires skill-toolbar-dropdown-toggle - 下拉菜单切换事件
 * @fires skill-toolbar-search - 搜索事件
 * @fires skill-toolbar-tab-change - 标签页切换事件
 * @fires skill-toolbar-breadcrumb-click - 面包屑导航点击事件
 *
 * @example
 * ```html
 * <!-- 基础工具栏 -->
 * <skill-toolbar>
 *   <div slot="left">
 *     <skill-button variant="ghost" icon="menu"></skill-button>
 *     <skill-toolbar-item icon="home" label="首页"></skill-toolbar-item>
 *   </div>
 *   <div slot="right">
 *     <skill-toolbar-item icon="user" label="用户"></skill-toolbar-item>
 *     <skill-toolbar-item icon="settings" label="设置"></skill-toolbar-item>
 *   </div>
 * </skill-toolbar>
 *
 * <!-- 带搜索框的工具栏 -->
 * <skill-toolbar>
 *   <div slot="left">
 *     <skill-toolbar-item icon="arrow-left" label="返回"></skill-toolbar-item>
 *   </div>
 *   <div slot="center">
 *     <skill-toolbar-search
 *       placeholder="搜索..."
 *       @skill-toolbar-search=${handleSearch}
 *     ></skill-toolbar-search>
 *   </div>
 *   <div slot="right">
 *     <skill-toolbar-item icon="filter" label="筛选"></skill-toolbar-item>
 *   </div>
 * </skill-toolbar>
 *
 * <!-- 配置驱动的工具栏 -->
 * <skill-toolbar
 *   .items=${[
 *     {
 *       id: 'home',
 *       type: 'button',
 *       label: '首页',
 *       icon: 'home',
 *       position: 'left'
 *     },
 *     {
 *       id: 'divider1',
 *       type: 'divider',
 *       position: 'left'
 *     },
 *     {
 *       id: 'user',
 *       type: 'dropdown',
 *       label: '用户',
 *       icon: 'user',
 *       position: 'right',
 *       dropdownItems: [
 *         { id: 'profile', label: '个人资料' },
 *         { id: 'settings', label: '设置' },
 *         { id: 'logout', label: '退出登录' }
 *       ]
 *     }
 *   ]}
 *   @skill-toolbar-action-click=${handleActionClick}
 * ></skill-toolbar>
 *
 * <!-- 主题工具栏 -->
 * <skill-toolbar theme="primary" alignment="space-between">
 *   <div slot="left">
 *     <span style="color: white; font-weight: bold;">应用程序</span>
 *   </div>
 *   <div slot="right">
 *     <skill-toolbar-item icon="bell" badge="5"></skill-toolbar-item>
 *     <skill-toolbar-item icon="user"></skill-toolbar-item>
 *   </div>
 * </skill-toolbar>
 *
 * <!-- 标签页工具栏 -->
 * <skill-toolbar>
 *   <skill-toolbar-tabs
 *     .tabs=${[
 *       { id: 'tab1', label: '概览', active: true },
 *       { id: 'tab2', label: '详情' },
 *       { id: 'tab3', label: '设置' }
 *     ]}
 *     @skill-toolbar-tab-change=${handleTabChange}
 *   ></skill-toolbar-tabs>
 * </skill-toolbar>
 *
 * <!-- 面包屑工具栏 -->
 * <skill-toolbar>
 *   <skill-toolbar-breadcrumb
 *     .items=${[
 *       { id: 'home', label: '首页', href: '/' },
 *       { id: 'products', label: '产品', href: '/products' },
 *       { id: 'detail', label: '详情', active: true }
 *     ]}
 *     @skill-toolbar-breadcrumb-click=${handleBreadcrumbClick}
 *   ></skill-toolbar-breadcrumb>
 * </skill-toolbar>
 *
 * <!-- 紧凑工具栏 -->
 * <skill-toolbar compact="true" size="sm">
 *   <div slot="left">
 *     <skill-toolbar-item icon="menu"></skill-toolbar-item>
 *     <skill-toolbar-item icon="home"></skill-toolbar-item>
 *     <skill-toolbar-item icon="folder"></skill-toolbar-item>
 *   </div>
 *   <div slot="right">
 *     <skill-toolbar-item icon="search"></skill-toolbar-item>
 *     <skill-toolbar-item icon="bell" badge="3"></skill-toolbar-item>
 *   </div>
 * </skill-toolbar>
 *
 * <!-- 浮动工具栏 -->
 * <skill-toolbar
 *   floating="true"
 *   theme="primary"
 *   alignment="center"
 * >
 *   <div slot="center">
 *     <skill-toolbar-item icon="bold"></skill-toolbar-item>
 *     <skill-toolbar-item icon="italic"></skill-toolbar-item>
 *     <skill-toolbar-item icon="underline"></skill-toolbar-item>
 *   </div>
 * </skill-toolbar>
 *
 * <!-- 响应式工具栏 -->
 * <skill-toolbar responsive="true">
 *   <div slot="left">
 *     <skill-toolbar-item icon="menu"></skill-toolbar-item>
 *     <skill-toolbar-item label="应用名称"></skill-toolbar-item>
 *   </div>
 *   <div slot="center">
 *     <skill-toolbar-search placeholder="搜索..."></skill-toolbar-search>
 *   </div>
 *   <div slot="right">
 *     <skill-toolbar-item icon="notifications" badge="2"></skill-toolbar-item>
 *     <skill-toolbar-item icon="user"></skill-toolbar-item>
 *   </div>
 * </skill-toolbar>
 *
 * <!-- 粘性工具栏 -->
 * <skill-toolbar sticky="true" theme="secondary">
 *   <div slot="left">
 *     <skill-toolbar-item icon="arrow-left" label="返回"></skill-toolbar-item>
 *   </div>
 *   <div slot="center">
 *     <span>页面标题</span>
 *   </div>
 * </skill-toolbar>
 *
 * <!-- 自定义样式工具栏 -->
 * <skill-toolbar
 *   style="--toolbar-bg: linear-gradient(90deg, #667eea 0%, #764ba2 100%); --toolbar-text-color: white;"
 * >
 *   <div slot="left">
 *     <skill-toolbar-item icon="logo" label="品牌"></skill-toolbar-item>
 *   </div>
 * </skill-toolbar>
 * ```
 */
@customElement('skill-toolbar')
export class SkillToolbar extends LitElement {
  static styles = [baseStyles, toolbarStyles];

  /**
   * 工具栏项数据
   */
  @property({ type: Array })
  items: ToolbarItem[] = [];

  /**
   * 工具栏主题
   * @type {'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'}
   */
  @property({ type: String, reflect: true })
  theme: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' = 'default';

  /**
   * 工具栏尺寸
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * 布局方向
   * @type {'horizontal' | 'vertical'}
   */
  @property({ type: String, reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * 对齐方式
   * @type {'left' | 'center' | 'right' | 'space-between' | 'space-around'}
   */
  @property({ type: String, reflect: true })
  alignment: 'left' | 'center' | 'right' | 'space-between' | 'space-around' = 'left';

  /**
   * 边框样式
   * @type {'default' | 'outlined' | 'borderless' | 'elevated'}
   */
  @property({ type: String, reflect: true })
  borderStyle: 'default' | 'outlined' | 'borderless' | 'elevated' = 'default';

  /**
   * 是否紧凑模式
   */
  @property({ type: Boolean, reflect: true })
  compact = false;

  /**
   * 是否浮动
   */
  @property({ type: Boolean, reflect: true })
  floating = false;

  /**
   * 是否透明
   */
  @property({ type: Boolean, reflect: true })
  transparent = false;

  /**
   * 是否粘性定位
   */
  @property({ type: Boolean, reflect: true })
  sticky = false;

  /**
   * 是否响应式
   */
  @property({ type: Boolean, reflect: true })
  responsive = true;

  /**
   * 是否只读
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * 是否禁用
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * ARIA 标签
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel = 'Toolbar';

  @state()
  private _openDropdowns: Set<string> = new Set();

  // @query('.skill-toolbar__search-input')
  // private _searchInput!: HTMLInputElement;

  connectedCallback() {
    super.connectedCallback();
    this._addDocumentClickListener();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeDocumentClickListener();
  }

  private _addDocumentClickListener() {
    document.addEventListener('click', this._handleDocumentClick.bind(this));
  }

  private _removeDocumentClickListener() {
    document.removeEventListener('click', this._handleDocumentClick.bind(this));
  }

  private _handleDocumentClick(e: Event) {
    const target = e.target as Element;
    if (!target.closest('.skill-toolbar__dropdown')) {
      this._closeAllDropdowns();
    }
  }

  private _getItemsByPosition(position: 'left' | 'center' | 'right'): ToolbarItem[] {
    return this.items.filter(item => item.position === position);
  }

  private _handleItemClick(item: ToolbarItem, e: Event) {
    if (item.disabled || this.readonly || this.disabled) return;

    e.preventDefault();
    e.stopPropagation();

    if (item.type === 'dropdown') {
      this._toggleDropdown(item.id);
    } else if (item.type === 'button' && item.onClick) {
      item.onClick(e);
    }

    this._fireEvent('skill-toolbar-action-click', { item, action: 'click' }, e);
  }

  private _handleDropdownItemClick(item: ToolbarItem, dropdownItem: ToolbarDropdownItem, e: Event) {
    if (dropdownItem.disabled || this.readonly || this.disabled) return;

    e.preventDefault();
    e.stopPropagation();

    if (dropdownItem.onClick) {
      dropdownItem.onClick(e);
    }

    this._closeAllDropdowns();
    this._fireEvent('skill-toolbar-action-click', {
      item,
      dropdownItem,
      action: 'dropdown-click'
    }, e);
  }

  private _handleSearch(item: ToolbarItem, e: InputEvent) {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if (item.onSearch) {
      item.onSearch(value);
    }

    this._fireEvent('skill-toolbar-search', { item, value }, e);
  }

  private _handleTabClick(item: ToolbarItem, tab: ToolbarTabItem, e: Event) {
    if (tab.disabled || this.readonly || this.disabled) return;

    // 更新所有标签的active状态
    item.options = item.options?.map(t => ({
      ...t,
      active: t.id === tab.id
    }));

    if (tab.onClick) {
      tab.onClick(e);
    }

    this._fireEvent('skill-toolbar-tab-change', { item, value: tab.id }, e);
  }

  private _handleBreadcrumbClick(item: ToolbarItem, breadcrumbItem: ToolbarBreadcrumbItem, e: Event) {
    if (breadcrumbItem.onClick) {
      breadcrumbItem.onClick(e);
    }

    this._fireEvent('skill-toolbar-breadcrumb-click', {
      item,
      value: breadcrumbItem.id
    }, e);
  }

  private _toggleDropdown(itemId: string) {
    if (this._openDropdowns.has(itemId)) {
      this._openDropdowns.delete(itemId);
    } else {
      this._closeAllDropdowns();
      this._openDropdowns.add(itemId);
    }
    this.requestUpdate();
  }

  private _closeAllDropdowns() {
    this._openDropdowns.clear();
    this.requestUpdate();
  }

  private _fireEvent(eventName: string, detail: any, originalEvent?: Event) {
    const eventDetail = {
      ...detail,
      originalEvent: originalEvent || new Event(eventName),
    } as ToolbarEventDetail;

    this.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail: eventDetail,
    }));
  }

  private _renderButtonItem(item: ToolbarItem): TemplateResult {
    const hasIcon = !!item.icon;
    const hasText = !!item.label;
    const hasBadge = !!item.badge;

    const itemClasses = [
      'skill-toolbar__item',
      hasIcon && !hasText ? 'skill-toolbar__item--icon-only' : '',
      !hasIcon && hasText ? 'skill-toolbar__item--text-only' : '',
      item.active ? 'skill-toolbar__item--active' : '',
      item.disabled ? 'skill-toolbar__item--disabled' : '',
      item.loading ? 'skill-toolbar__item--loading' : '',
    ].filter(Boolean).join(' ');

    return html`
      <button
        class="${itemClasses}"
        @click=${(e: Event) => this._handleItemClick(item, e)}
        disabled="${item.disabled || this.disabled || this.readonly}"
        aria-label="${item.label || ''}"
        title="${item.label || ''}"
      >
        ${hasIcon ? html`
          <div class="skill-toolbar__icon">
            <skill-icon name="${item.icon}" size="sm"></skill-icon>
          </div>
        ` : ''}
        ${hasText ? html`
          <span class="skill-toolbar__text">${item.label}</span>
        ` : ''}
        ${hasBadge ? html`
          <span class="skill-toolbar__badge">${item.badge}</span>
        ` : ''}
      </button>
    `;
  }

  private _renderDropdownItem(item: ToolbarItem): TemplateResult {
    const isOpen = this._openDropdowns.has(item.id);
    const hasIcon = !!item.icon;
    const hasText = !!item.label;

    return html`
      <div class="skill-toolbar__dropdown">
        <button
          class="skill-toolbar__item ${item.active ? 'skill-toolbar__item--active' : ''}"
          @click=${(e: Event) => this._handleItemClick(item, e)}
          disabled="${item.disabled || this.disabled || this.readonly}"
          aria-haspopup="true"
          aria-expanded="${isOpen}"
        >
          ${hasIcon ? html`
            <div class="skill-toolbar__icon">
              <skill-icon name="${item.icon}" size="sm"></skill-icon>
            </div>
          ` : ''}
          ${hasText ? html`
            <span class="skill-toolbar__text">${item.label}</span>
          ` : ''}
          <div class="skill-toolbar__icon">
            <skill-icon name="chevron-down" size="xs"></skill-icon>
          </div>
        </button>

        <div class="skill-toolbar__dropdown-menu ${isOpen ? 'skill-toolbar__dropdown-menu--visible' : ''}">
          ${item.dropdownItems?.map(dropdownItem => html`
            <button
              class="skill-toolbar__dropdown-item
                     ${dropdownItem.active ? 'skill-toolbar__dropdown-item--active' : ''}
                     ${dropdownItem.disabled ? 'skill-toolbar__dropdown-item--disabled' : ''}"
              @click=${(e: Event) => this._handleDropdownItemClick(item, dropdownItem, e)}
              disabled="${dropdownItem.disabled || this.disabled || this.readonly}"
            >
              ${dropdownItem.icon ? html`
                <div class="skill-toolbar__icon">
                  <skill-icon name="${dropdownItem.icon}" size="xs"></skill-icon>
                </div>
              ` : ''}
              <span>${dropdownItem.label}</span>
            </button>
          `)}
        </div>
      </div>
    `;
  }

  private _renderSearchItem(item: ToolbarItem): TemplateResult {
    return html`
      <div class="skill-toolbar__search">
        <div class="skill-toolbar__search-icon">
          <skill-icon name="search" size="xs"></skill-icon>
        </div>
        <input
          type="text"
          class="skill-toolbar__search-input"
          placeholder="${item.placeholder || '搜索...'}"
          .value="${item.value || ''}"
          @input=${(e: InputEvent) => this._handleSearch(item, e)}
          disabled="${this.disabled || this.readonly}"
        />
      </div>
    `;
  }

  private _renderTextItem(item: ToolbarItem): TemplateResult {
    return html`
      <div class="skill-toolbar__text">
        ${item.label}
      </div>
    `;
  }

  private _renderDividerItem(): TemplateResult {
    return html`
      <div class="skill-toolbar__divider"></div>
    `;
  }

  private _renderTabsItem(item: ToolbarItem): TemplateResult {
    if (!item.options) return html``;

    return html`
      <div class="skill-toolbar__tabs">
        ${item.options.map(tab => html`
          <button
            class="skill-toolbar__tab ${tab.active ? 'skill-toolbar__tab--active' : ''}"
            @click=${(e: Event) => this._handleTabClick(item, tab, e)}
            disabled="${tab.disabled || this.disabled || this.readonly}"
          >
            ${tab.icon ? html`
              <div class="skill-toolbar__icon">
                <skill-icon name="${tab.icon}" size="xs"></skill-icon>
              </div>
            ` : ''}
            <span>${tab.label}</span>
          </button>
        `)}
      </div>
    `;
  }

  private _renderBreadcrumbItem(item: ToolbarItem): TemplateResult {
    if (!item.items) return html``;

    return html`
      <nav class="skill-toolbar__breadcrumb" aria-label="Breadcrumb">
        ${item.items.map((breadcrumbItem, index) => {
          // const isLast = index === item.items!.length - 1;
          return html`
            ${index > 0 ? html`
              <span class="skill-toolbar__breadcrumb-separator">/</span>
            ` : ''}
            ${breadcrumbItem.href ? html`
              <a
                href="${breadcrumbItem.href}"
                class="skill-toolbar__breadcrumb-item
                       ${breadcrumbItem.active ? 'skill-toolbar__breadcrumb-item--active' : ''}"
                @click=${(e: Event) => {
                  e.preventDefault();
                  this._handleBreadcrumbClick(item, breadcrumbItem, e);
                }}
              >
                ${breadcrumbItem.label}
              </a>
            ` : html`
              <span class="skill-toolbar__breadcrumb-item
                     ${breadcrumbItem.active ? 'skill-toolbar__breadcrumb-item--active' : ''}">
                ${breadcrumbItem.label}
              </span>
            `}
          `;
        })}
      </nav>
    `;
  }

  private _renderItem(item: ToolbarItem): TemplateResult {
    switch (item.type) {
      case 'button':
        return this._renderButtonItem(item);
      case 'dropdown':
        return this._renderDropdownItem(item);
      case 'search':
        return this._renderSearchItem(item);
      case 'text':
        return this._renderTextItem(item);
      case 'divider':
        return this._renderDividerItem();
      case 'tabs':
        return this._renderTabsItem(item);
      case 'breadcrumb':
        return this._renderBreadcrumbItem(item);
      default:
        return html``;
    }
  }

  private _renderItems(position: 'left' | 'center' | 'right'): TemplateResult {
    const items = this._getItemsByPosition(position);
    if (items.length === 0) return html``;

    return html`
      <div class="skill-toolbar__${position}">
        ${items.map(item => this._renderItem(item))}
      </div>
    `;
  }

  render(): TemplateResult {
    const toolbarClasses = [
      'skill-toolbar',
      `skill-toolbar--${this.theme}`,
      `skill-toolbar--${this.size}`,
      `skill-toolbar--${this.orientation}`,
      `skill-toolbar--${this.alignment}`,
      `skill-toolbar--${this.borderStyle}`,
      {
        'skill-toolbar--compact': this.compact,
        'skill-toolbar--floating': this.floating,
        'skill-toolbar--transparent': this.transparent,
        'skill-toolbar--sticky': this.sticky,
        'skill-toolbar--disabled': this.disabled,
      }
    ].filter(Boolean).map((_cls, _index) =>
      typeof _cls === 'string' ? _cls : Object.entries(_cls)[0][0]
    ).join(' ');

    return html`
      <div
        part="toolbar"
        class="${toolbarClasses}"
        role="toolbar"
        aria-label="${this.ariaLabel}"
      >
        <slot name="left">
          ${this._renderItems('left')}
        </slot>

        <slot name="center">
          ${this._renderItems('center')}
        </slot>

        <slot name="right">
          ${this._renderItems('right')}
        </slot>
      </div>
    `;
  }

  /**
   * 添加工具栏项
   */
  public addItem(item: ToolbarItem): void {
    this.items = [...this.items, item];
  }

  /**
   * 移除工具栏项
   */
  public removeItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  /**
   * 更新工具栏项
   */
  public updateItem(id: string, updates: Partial<ToolbarItem>): void {
    this.items = this.items.map(item =>
      item.id === id ? { ...item, ...updates } : item
    );
  }

  /**
   * 获取工具栏项
   */
  public getItem(id: string): ToolbarItem | undefined {
    return this.items.find(item => item.id === id);
  }

  /**
   * 设置工具栏项激活状态
   */
  public setItemActive(id: string, active: boolean): void {
    this.updateItem(id, { active });
  }

  /**
   * 关闭所有下拉菜单
   */
  public closeAllDropdowns(): void {
    this._closeAllDropdowns();
  }

  /**
   * 打开指定下拉菜单
   */
  public openDropdown(id: string): void {
    this._closeAllDropdowns();
    this._openDropdowns.add(id);
    this.requestUpdate();
  }

  /**
   * 关闭指定下拉菜单
   */
  public closeDropdown(id: string): void {
    this._openDropdowns.delete(id);
    this.requestUpdate();
  }

  /**
   * 获取当前状态
   */
  public getState() {
    return {
      items: this.items,
      theme: this.theme,
      size: this.size,
      orientation: this.orientation,
      alignment: this.alignment,
      openDropdowns: Array.from(this._openDropdowns),
      disabled: this.disabled,
      readonly: this.readonly,
    };
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-toolbar': SkillToolbar;
  }
}