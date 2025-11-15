import { LitElement, html, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { sidebarStyles } from './sidebar.styles';
import type {
  SidebarConfig,
  SidebarState,
  SidebarMenuItem,
  SidebarGroup,
  SidebarEvent
} from './skill-sidebar.types';

/**
 * Sidebar - 侧边栏导航组件
 *
 * @element skill-sidebar
 *
 * @example
 * ```html
 * <skill-sidebar
 *   .config="${sidebarConfig}"
 *   @select="${handleSelect}"
 * ></skill-sidebar>
 * ```
 */
@customElement('skill-sidebar')
export class SkillSidebar extends LitElement {
  static styles = sidebarStyles;

  @property({ type: Object })
  config: SidebarConfig = {};

  @state()
  private state: SidebarState = {
    collapsed: false,
    activeKeys: [],
    openKeys: [],
    searchQuery: '',
    filteredItems: []
  };

  @state()
  private isMobile = false;

  @state()
  private showMobile = false;

  /**
   * 设置激活的菜单项
   */
  setActiveKey(key: string | string[]) {
    const keys = Array.isArray(key) ? key : [key];
    this.state = { ...this.state, activeKeys: keys };
  }

  /**
   * 设置展开的菜单组
   */
  setOpenKeys(keys: string[]) {
    this.state = { ...this.state, openKeys: keys };
  }

  /**
   * 折叠/展开侧边栏
   */
  setCollapsed(collapsed: boolean) {
    this.state = { ...this.state, collapsed };

    this.dispatchEvent(new CustomEvent('collapse', {
      detail: {
        type: 'collapse',
        collapsed
      } as SidebarEvent
    }));
  }

  /**
   * 切换折叠状态
   */
  toggleCollapse() {
    this.setCollapsed(!this.state.collapsed);
  }

  /**
   * 处理菜单项点击
   */
  private handleMenuItemClick(item: SidebarMenuItem, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (item.disabled) return;

    // 触发 before-click 事件
    if (item.onBeforeClick) {
      const result = item.onBeforeClick(item);
      if (result === false) return;
    }

    this.dispatchEvent(new CustomEvent('before-click', {
      detail: {
        type: 'before-click',
        item,
        key: item.key
      } as SidebarEvent
    }));

    // 设置为激活状态
    this.setActiveKey(item.key);

    // 处理子菜单展开/折叠
    if (item.children && item.children.length > 0) {
      this.toggleSubmenu(item.key);
    }

    // 触发自定义点击事件
    if (item.onClick) {
      item.onClick(item);
    }

    // 触发菜单点击事件
    this.dispatchEvent(new CustomEvent('menu-click', {
      detail: {
        type: 'menu-click',
        item,
        key: item.key
      } as SidebarEvent
    }));

    // 触发选择事件
    this.dispatchEvent(new CustomEvent('select', {
      detail: {
        type: 'select',
        item,
        key: item.key
      } as SidebarEvent
    }));

    // 导航处理
    if (item.path) {
      if (item.target === '_blank') {
        window.open(item.path, '_blank');
      } else {
        window.location.href = item.path;
      }
    }

    // 移动端关闭侧边栏
    if (this.isMobile) {
      this.showMobile = false;
    }
  }

  /**
   * 切换子菜单
   */
  private toggleSubmenu(key: string) {
    const { openKeys } = this.state;
    const isOpen = openKeys.includes(key);
    const newOpenKeys = isOpen
      ? openKeys.filter(k => k !== key)
      : [...openKeys, key];

    this.state = { ...this.state, openKeys: newOpenKeys };
  }

  /**
   * 切换菜单组
   */
  private toggleGroup(groupKey: string) {
    const { openKeys } = this.state;
    const isOpen = openKeys.includes(groupKey);
    const newOpenKeys = isOpen
      ? openKeys.filter(k => k !== groupKey)
      : [...openKeys, groupKey];

    this.state = { ...this.state, openKeys: newOpenKeys };
  }

  /**
   * 处理搜索
   */
  private handleSearch(query: string) {
    this.state = { ...this.state, searchQuery: query };

    if (!query.trim()) {
      this.state.filteredItems = [];
      this.dispatchEvent(new CustomEvent('search', {
        detail: {
          type: 'search',
          query,
          data: this.getAllMenuItems()
        } as SidebarEvent
      }));
      return;
    }

    const filteredItems = this.searchMenuItems(this.getAllMenuItems(), query);
    this.state = { ...this.state, filteredItems };

    this.dispatchEvent(new CustomEvent('search', {
      detail: {
        type: 'search',
        query,
        data: filteredItems
      } as SidebarEvent
    }));
  }

  /**
   * 获取所有菜单项
   */
  private getAllMenuItems(): SidebarMenuItem[] {
    const items: SidebarMenuItem[] = [];

    if (this.config.items) {
      items.push(...this.config.items);
    }

    if (this.config.groups) {
      this.config.groups.forEach(group => {
        items.push(...group.items);
      });
    }

    return items;
  }

  /**
   * 搜索菜单项
   */
  private searchMenuItems(items: SidebarMenuItem[], query: string): SidebarMenuItem[] {
    const results: SidebarMenuItem[] = [];
    const lowerQuery = query.toLowerCase();

    items.forEach(item => {
      // 检查当前项是否匹配
      if (item.label.toLowerCase().includes(lowerQuery)) {
        results.push(item);
      }

      // 递归搜索子项
      if (item.children && item.children.length > 0) {
        const childResults = this.searchMenuItems(item.children, query);
        if (childResults.length > 0) {
          results.push({
            ...item,
            children: childResults
          });
        }
      }
    });

    // 使用自定义筛选函数（如果提供）
    if (this.config.search?.filter) {
      return this.config.search.filter(results, query);
    }

    return results;
  }

  /**
   * 检查菜单项是否激活
   */
  private isMenuItemActive(item: SidebarMenuItem): boolean {
    return this.state.activeKeys.includes(item.key) ||
           !!item.children?.some(child => this.state.activeKeys.includes(child.key));
  }

  /**
   * 检查子菜单是否展开
   */
  private isSubmenuExpanded(key: string): boolean {
    return this.state.openKeys.includes(key);
  }

  /**
   * 渲染Logo
   */
  private renderLogo() {
    if (!this.config.logo) return nothing;

    const { logo } = this.config;
    const isCollapsed = this.state.collapsed;

    return html`
      <a
        href="${logo.link || '#'}"
        class="sidebar-logo ${isCollapsed ? 'collapsed' : ''}"
        @click="${(e: Event) => e.preventDefault()}"
      >
        ${logo.image ? html`<img src="${logo.image}" alt="Logo" class="logo-image">` : ''}
        ${logo.text ? html`<span class="logo-text ${isCollapsed ? 'hidden' : ''}">${logo.text}</span>` : ''}
      </a>
    `;
  }

  /**
   * 渲染头部
   */
  private renderHeader() {
    if (!this.config.header && !this.config.search) return nothing;

    const isCollapsed = this.state.collapsed;

    return html`
      <div class="sidebar-header ${isCollapsed ? 'collapsed' : ''}">
        ${this.config.header ? html`
          <h3 class="header-title">${this.config.header.title}</h3>
          <p class="header-subtitle">${this.config.header.subtitle}</p>
          ${this.config.header.actions ? html`
            <div class="header-actions">
              ${this.config.header.actions.map(action => html`
                <button
                  class="header-action"
                  @click="${action.onClick}"
                  title="${action.label || ''}"
                >
                  ${action.icon ? html`<skill-icon name="${action.icon}"></skill-icon>` : ''}
                </button>
              `)}
            </div>
          ` : ''}
        ` : ''}

        ${this.config.search?.enabled !== false ? html`
          <div class="sidebar-search ${isCollapsed ? 'collapsed' : ''}">
            <input
              type="text"
              class="search-input ${isCollapsed ? 'collapsed' : ''}"
              placeholder="${this.config.search?.placeholder || '搜索菜单...'}"
              value="${this.state.searchQuery || ''}"
              @input="${(e: InputEvent) => this.handleSearch((e.target as HTMLInputElement).value)}"
            >
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * 渲染菜单项
   */
  private renderMenuItem(item: SidebarMenuItem, level = 0): ReturnType<typeof html> {
    if (item.hidden) return html``;

    const isActive = this.isMenuItemActive(item);
    const isExpanded = this.isSubmenuExpanded(item.key);
    const hasChildren = item.children && item.children.length > 0;
    const isCollapsed = this.state.collapsed;

    // 添加徽章
    const badgeValue = this.config.badges?.[item.key] || item.badge;

    return html`
      <div>
        <a
          href="${item.path || '#'}"
          class="menu-item ${isActive ? 'active' : ''} ${item.disabled ? 'disabled' : ''} ${isCollapsed ? 'collapsed' : ''}"
          @click="${(e: Event) => this.handleMenuItemClick(item, e)}"
        >
          ${item.icon ? html`
            <span class="menu-item-icon">
              <skill-icon name="${item.icon}"></skill-icon>
            </span>
          ` : ''}
          <span class="menu-item-text ${isCollapsed ? 'hidden' : ''}">${item.label}</span>
          ${badgeValue ? html`<span class="menu-item-badge">${badgeValue}</span>` : ''}
          ${hasChildren ? html`
            <span class="menu-item-arrow ${isExpanded ? 'expanded' : ''}">▶</span>
          ` : ''}
        </a>

        ${hasChildren ? html`
          <div class="submenu ${isExpanded ? '' : 'collapsed'}">
            ${item.children!.map(child => this.renderMenuItem(child, level + 1))}
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * 渲染菜单组
   */
  private renderMenuGroup(group: SidebarGroup): ReturnType<typeof html> {
    if (group.hidden) return html``;

    const isCollapsed = this.state.collapsed;
    const isExpanded = this.isSubmenuExpanded(group.key);

    return html`
      <div class="menu-group">
        ${group.title ? html`
          <div
            class="menu-group-title ${isCollapsed ? 'collapsed' : ''}"
            @click="${() => this.toggleGroup(group.key)}"
          >
            ${group.icon ? html`<span class="group-title-icon"><skill-icon name="${group.icon}"></skill-icon></span>` : ''}
            <span class="${isCollapsed ? 'hidden' : ''}">${group.title}</span>
            ${group.collapsible !== false ? html`
              <span class="group-collapse-icon ${isExpanded ? '' : 'collapsed'}">▼</span>
            ` : ''}
          </div>
        ` : ''}

        <div class="menu-items ${isExpanded && group.collapsible !== false ? '' : 'collapsed'}">
          ${group.items.map(item => this.renderMenuItem(item))}
        </div>
      </div>
    `;
  }

  /**
   * 渲染导航内容
   */
  private renderContent() {
    const hasSearchQuery = this.state.searchQuery && this.state.searchQuery.trim();
    const items = hasSearchQuery ? this.state.filteredItems : this.getAllMenuItems();

    if (hasSearchQuery && (!items || items.length === 0)) {
      return html`
        <div class="sidebar-content">
          <div style="padding: 20px; text-align: center; color: var(--sidebar-text-secondary);">
            没有找到匹配的菜单项
          </div>
        </div>
      `;
    }

    return html`
      <div class="sidebar-content">
        ${hasSearchQuery ? html`
          <div class="menu-group">
            ${items?.map(item => this.renderMenuItem(item)) || []}
          </div>
        ` : html`
          ${this.config.groups ? this.config.groups.map(group => this.renderMenuGroup(group)) : ''}
          ${this.config.items ? html`
            <div class="menu-group">
              ${this.config.items.map(item => this.renderMenuItem(item))}
            </div>
          ` : ''}
        `}

        ${!this.config.groups && !this.config.items ? html`
          <div style="padding: 20px; text-align: center; color: var(--sidebar-text-secondary);">
            暂无菜单项
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * 渲染底部
   */
  private renderFooter() {
    if (!this.config.footer) return nothing;

    const isCollapsed = this.state.collapsed;

    return html`
      <div class="sidebar-footer ${isCollapsed ? 'collapsed' : ''}">
        ${this.config.footer.content ? html`
          <div class="footer-content ${isCollapsed ? 'hidden' : ''}">${this.config.footer.content}</div>
        ` : ''}
        ${this.config.footer.actions ? html`
          <div class="footer-actions">
            ${this.config.footer.actions.map(action => html`
              <button
                class="header-action"
                @click="${action.onClick}"
                title="${action.label || ''}"
              >
                ${action.icon ? html`<skill-icon name="${action.icon}"></skill-icon>` : ''}
              </button>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * 渲染折叠切换按钮
   */
  private renderCollapseToggle() {
    if (!this.config.collapsible) return nothing;

    return html`
      <button
        class="collapse-toggle"
        @click="${this.toggleCollapse}"
        title="${this.state.collapsed ? '展开' : '折叠'}"
      >
        <span class="collapse-icon ${this.state.collapsed ? 'collapsed' : ''}">◀</span>
      </button>
    `;
  }

  /**
   * 检测移动端
   */
  private checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  /**
   * 监听窗口大小变化
   */
  private handleResize = () => {
    this.checkMobile();
  };

  connectedCallback() {
    super.connectedCallback();
    this.checkMobile();
    window.addEventListener('resize', this.handleResize);

    // 设置初始状态
    if (this.config.collapsed !== undefined) {
      this.state.collapsed = this.config.collapsed;
    }

    // 设置默认展开的菜单
    if (this.config.groups) {
      const defaultOpenKeys = this.config.groups
        .filter(group => group.collapsed === false)
        .map(group => group.key);
      this.state.openKeys = defaultOpenKeys;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const sidebarClass = [
      'sidebar',
      this.state.collapsed ? 'collapsed' : '',
      this.config.position || 'left',
      this.config.mode === 'horizontal' ? 'horizontal' : '',
      this.isMobile && this.showMobile ? 'show' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class="${sidebarClass}" theme="${this.config.theme || 'light'}">
        ${this.renderLogo()}
        ${this.renderHeader()}
        ${this.renderContent()}
        ${this.renderFooter()}
        ${this.renderCollapseToggle()}
      </div>

      ${this.isMobile ? html`
        <div
          class="sidebar-overlay ${this.showMobile ? 'show' : ''}"
          style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); z-index: 999; ${this.showMobile ? '' : 'display: none;'}"
          @click="${() => this.showMobile = false}"
        ></div>
      ` : ''}
    `;
  }
}