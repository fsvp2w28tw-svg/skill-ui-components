import { LitElement, html, type TemplateResult, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { dropdownStyles } from './skill-dropdown.styles';
import { baseStyles } from '../../../styles/base';

/**
 * Dropdown 菜单项接口
 */
export interface DropdownItem {
  label: string;
  value?: string;
  type?: 'default' | 'divider';
  disabled?: boolean;
  danger?: boolean;
  icon?: string;
  description?: string;
  selected?: boolean;
}

/**
 * Skill Dropdown Component - 合并版本
 *
 * 支持两种使用方式：
 * 1. 数据驱动（推荐）：通过 items 属性传入数据
 * 2. Slot 方式：通过 slot 插入自定义内容
 *
 * @slot trigger - 触发下拉菜单的元素
 * @slot - Default slot for dropdown items (当不使用 items 时)
 * @slot header - Dropdown header content
 * @slot footer - Dropdown footer content
 * @slot empty - Empty state content
 *
 * @csspart dropdown - The dropdown container
 * @csspart trigger - The trigger button
 * @csspart menu - The dropdown menu
 * @csspart menu-list - The menu list container
 * @csspart header - The dropdown header
 * @csspart footer - The dropdown footer
 * @csspart empty - The empty state
 * @csspart arrow - The dropdown arrow
 * @csspart chevron - The chevron icon
 *
 * @fires skill-dropdown-open - Dispatched when dropdown opens
 * @fires skill-dropdown-close - Dispatched when dropdown closes
 * @fires skill-dropdown-change - Dispatched when selection changes
 * @fires skill-dropdown-click - Dispatched when an item is clicked
 * @fires skill-item-click - 当菜单项被点击时触发（兼容性）
 *
 * @example
 * ```html
 * <!-- 数据驱动方式（推荐） -->
 * <skill-dropdown .items=${[
 *   { label: 'Edit', value: 'edit', icon: 'edit' },
 *   { label: 'Delete', value: 'delete', danger: true },
 * ]}>
 *   <button slot="trigger">Actions</button>
 * </skill-dropdown>
 *
 * <!-- Slot 方式 -->
 * <skill-dropdown>
 *   <button slot="trigger">Dropdown</button>
 *   <div class="dropdown-item">Item 1</div>
 *   <div class="dropdown-item">Item 2</div>
 * </skill-dropdown>
 *
 * <!-- 带搜索功能 -->
 * <skill-dropdown searchable .items=${items}>
 *   <button slot="trigger">Searchable</button>
 * </skill-dropdown>
 * ```
 */
@customElement('skill-dropdown')
export class SkillDropdown extends LitElement {
  static styles = [baseStyles, dropdownStyles];

  @query('.dropdown-trigger-wrapper')
  private _trigger!: HTMLElement;

  @query('.skill-dropdown__menu')
  private _menu!: HTMLElement;

  @query('.skill-dropdown__search-input')
  private _searchInput?: HTMLInputElement;

  /**
   * 触发方式
   * @type {'click' | 'hover' | 'focus' | 'manual'}
   */
  @property({ type: String, reflect: true })
  trigger: 'click' | 'hover' | 'focus' | 'manual' = 'click';

  /**
   * 下拉菜单位置
   * @type {'auto' | 'top-start' | 'top' | 'top-end' | 'bottom-start' | 'bottom' | 'bottom-end' | 'left-start' | 'left' | 'left-end' | 'right-start' | 'right' | 'right-end'}
   */
  @property({ type: String, reflect: true })
  placement: 'auto' | 'top-start' | 'top' | 'top-end' | 'bottom-start' | 'bottom' | 'bottom-end' | 'left-start' | 'left' | 'left-end' | 'right-start' | 'right' | 'right-end' = 'bottom-start';

  /**
   * 菜单项数据（推荐使用）
   */
  @property({ type: Array })
  items: DropdownItem[] = [];

  /**
   * 组件尺寸
   * @type {'sm' | 'md' | 'lg'}
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * 是否显示箭头
   */
  @property({ type: Boolean, reflect: true })
  arrow = false;

  /**
   * 是否显示chevron图标
   */
  @property({ type: Boolean, attribute: 'show-chevron' })
  showChevron = true;

  /**
   * 是否禁用
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * 是否启用搜索功能
   */
  @property({ type: Boolean, reflect: true })
  searchable = false;

  /**
   * 搜索框占位文本
   */
  @property({ type: String, reflect: true, attribute: 'search-placeholder' })
  searchPlaceholder = 'Search...';

  /**
   * 是否支持多选
   */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /**
   * 点击项目后是否关闭
   */
  @property({ type: Boolean, reflect: true, attribute: 'close-on-click' })
  closeOnClick = true;

  /**
   * 点击外部是否关闭
   */
  @property({ type: Boolean, reflect: true, attribute: 'close-on-outside-click' })
  closeOnOutsideClick = true;

  /**
   * 悬停延迟时间（毫秒）
   */
  @property({ type: Number, reflect: true, attribute: 'hover-delay' })
  hoverDelay = 200;

  /**
   * 最大高度
   */
  @property({ type: String, reflect: true, attribute: 'max-height' })
  maxHeight?: string;

  /**
   * 最小宽度
   */
  @property({ type: String, reflect: true, attribute: 'min-width' })
  minWidth?: string;

  /**
   * 最大宽度
   */
  @property({ type: String, reflect: true, attribute: 'max-width' })
  maxWidth?: string;

  /**
   * 是否启用键盘导航
   */
  @property({ type: Boolean, reflect: true, attribute: 'keyboard-nav' })
  keyboardNav = true;

  /**
   * 自动翻转位置
   */
  @property({ type: Boolean, reflect: true, attribute: 'auto-flip' })
  autoFlip = true;

  /**
   * ARIA 标签
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  /**
   * 当前打开状态
   */
  @state()
  private _isOpen = false;

  /**
   * 当前位置（经过auto-flip后）
   */
  @state()
  private _currentPlacement = this.placement;

  /**
   * 当前搜索查询
   */
  @state()
  private _searchQuery = '';

  /**
   * 是否聚焦
   */
  @state()
  private _isFocused = false;

  private _hoverTimeout?: number;
  private _clickOutsideHandler?: (e: Event) => void;
  private _keyHandler?: (e: KeyboardEvent) => void;
  private _resizeObserver?: ResizeObserver;

  connectedCallback() {
    super.connectedCallback();
    this._setupEventListeners();
    if (this.autoFlip) {
      this._setupResizeObserver();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupEventListeners();
    this._cleanupResizeObserver();
  }

  private _setupEventListeners() {
    if (this.closeOnOutsideClick) {
      this._clickOutsideHandler = (e: Event) => {
        if (!this.contains(e.target as Node)) {
          this.close();
        }
      };
      document.addEventListener('click', this._clickOutsideHandler);
    }

    if (this.keyboardNav) {
      this._keyHandler = (e: KeyboardEvent) => {
        this._handleKeyboard(e);
      };
      document.addEventListener('keydown', this._keyHandler);
    }
  }

  private _cleanupEventListeners() {
    if (this._clickOutsideHandler) {
      document.removeEventListener('click', this._clickOutsideHandler);
    }
    if (this._keyHandler) {
      document.removeEventListener('keydown', this._keyHandler);
    }
    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);
    }
  }

  private _setupResizeObserver() {
    if (!('ResizeObserver' in window)) return;

    this._resizeObserver = new ResizeObserver(() => {
      if (this._isOpen) {
        this._updatePlacement();
      }
    });
    this._resizeObserver.observe(this);
  }

  private _cleanupResizeObserver() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }

  private _updatePlacement() {
    if (this.placement === 'auto') {
      this._currentPlacement = this._calculatePlacement();
    } else {
      this._currentPlacement = this.placement;
    }
  }

  private _calculatePlacement(): 'top' | 'right' | 'bottom' | 'left' | 'auto' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end' {
    const rect = this._trigger.getBoundingClientRect();
    const menuHeight = this._menu.offsetHeight;
    const menuWidth = this._menu.offsetWidth;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let placement = 'bottom-start';

    // 检查垂直位置
    if (rect.bottom + menuHeight > viewportHeight && rect.top - menuHeight >= 0) {
      placement = 'top-start';
    }

    // 检查水平位置
    if (rect.right + menuWidth > viewportWidth && rect.left - menuWidth >= 0) {
      placement = placement.replace('start', 'end');
    }

    return placement as 'top' | 'right' | 'bottom' | 'left' | 'auto' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
  }

  private _handleTriggerClick(e: Event) {
    if (this.disabled) return;

    if (this.trigger === 'click') {
      e.preventDefault();
      this.toggle();
    }
  }

  private _handleTriggerMouseEnter() {
    if (this.disabled || this.trigger !== 'hover') return;

    this._hoverTimeout = window.setTimeout(() => {
      this.open();
    }, this.hoverDelay);
  }

  private _handleTriggerMouseLeave() {
    if (this.trigger !== 'hover') return;

    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);
    }

    setTimeout(() => {
      if (!this.matches(':hover')) {
        this.close();
      }
    }, 100);
  }

  private _handleTriggerFocus() {
    if (this.disabled || this.trigger !== 'focus') return;

    this._isFocused = true;
    this.open();
  }

  private _handleTriggerBlur() {
    if (this.trigger !== 'focus') return;

    this._isFocused = false;
    setTimeout(() => {
      if (!this._isFocused && !this._menu.matches(':hover')) {
        this.close();
      }
    }, 100);
  }

  private _handleItemClick(item: DropdownItem, index: number, originalEvent: Event) {
    if (item.disabled || item.type === 'divider') {
      return;
    }

    // 处理多选
    if (this.multiple && item.value !== undefined) {
      item.selected = !item.selected;
      this.requestUpdate();
    }

    // 发送事件
    this._fireItemClickEvent(item, index, originalEvent);

    if (this.closeOnClick) {
      this.close();
    }
  }

  private _handleSearch(e: Event) {
    const target = e.target as HTMLInputElement;
    this._searchQuery = target.value.toLowerCase();
    this.requestUpdate(); // 重新渲染以过滤items
  }

  private _handleKeyboard(e: KeyboardEvent) {
    if (!this._isOpen) return;

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        this.close();
        this._trigger.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this._navigateItems(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._navigateItems(-1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        this._activateCurrentItem();
        break;
    }
  }

  private _navigateItems(_direction: number) {
    // 实现键盘导航逻辑
    // 这里简化处理，实际应该根据当前过滤结果导航
  }

  private _activateCurrentItem() {
    // 实现激活当前项目的逻辑
  }

  private _fireItemClickEvent(item: DropdownItem, index: number, originalEvent: Event) {
    // 发送新格式事件
    this.dispatchEvent(
      new CustomEvent('skill-dropdown-click', {
        bubbles: true,
        composed: true,
        detail: {
          originalEvent,
          item,
          index,
          value: item.value || item.label,
          selected: this.multiple ? this._getSelectedValues() : [item.value || item.label],
        },
      })
    );

    // 发送兼容性事件
    this.dispatchEvent(
      new CustomEvent('skill-item-click', {
        bubbles: true,
        composed: true,
        detail: { item, index },
      })
    );

    this._fireChangeEvent();
  }

  private _fireChangeEvent() {
    this.dispatchEvent(
      new CustomEvent('skill-dropdown-change', {
        bubbles: true,
        composed: true,
        detail: {
          open: this._isOpen,
          selected: this.multiple ? this._getSelectedValues() : [],
          searchQuery: this._searchQuery,
        },
      })
    );
  }

  private _getSelectedValues(): string[] {
    if (!this.multiple) return [];

    return this.items
      .filter(item => item.selected)
      .map(item => item.value || item.label);
  }

  private _getFilteredItems(): DropdownItem[] {
    if (!this._searchQuery) return this.items;

    return this.items.filter(item => {
      if (item.type === 'divider') return true;
      return item.label.toLowerCase().includes(this._searchQuery);
    });
  }

  private _renderChevron() {
    if (!this.showChevron || this.items.length === 0) return nothing;

    const chevronClasses = {
      'dropdown-chevron': true,
      'dropdown-chevron--open': this._isOpen,
    };

    return html`
      <svg
        part="chevron"
        class=${classMap(chevronClasses)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    `;
  }

  private _renderItemIcon(iconName?: string) {
    if (!iconName) return nothing;

    return html`
      <span class="dropdown-item-icon">
        <slot name="icon-${iconName}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </slot>
      </span>
    `;
  }

  private _renderMenuItem(item: DropdownItem, index: number) {
    if (item.type === 'divider') {
      return html`<div class="dropdown-divider"></div>`;
    }

    const itemClasses: Record<string, boolean> = {
      'dropdown-item': true,
      'dropdown-item--danger': item.danger || false,
      'dropdown-item--selected': !!item.selected,
    };

    return html`
      <button
        class=${classMap(itemClasses)}
        ?disabled=${item.disabled}
        @click=${(e: Event) => this._handleItemClick(item, index, e)}
      >
        ${this.multiple ? html`
          <input
            type="checkbox"
            ?checked=${item.selected}
            @click=${(e: Event) => e.stopPropagation()}
          />
        ` : ''}
        ${this._renderItemIcon(item.icon)}
        <span class="dropdown-item-label">${item.label}</span>
        ${item.description ? html`
          <span class="dropdown-item-description">${item.description}</span>
        ` : ''}
      </button>
    `;
  }

  private _renderTrigger(): TemplateResult {
    return html`
      <div
        part="trigger"
        class="dropdown-trigger-wrapper skill-dropdown__trigger"
        @click=${this._handleTriggerClick}
        @mouseenter=${this._handleTriggerMouseEnter}
        @mouseleave=${this._handleTriggerMouseLeave}
        @focus=${this._handleTriggerFocus}
        @blur=${this._handleTriggerBlur}
        role="button"
        tabindex="${this.disabled ? '-1' : '0'}"
        aria-haspopup="true"
        aria-expanded="${this._isOpen}"
        aria-disabled="${this.disabled}"
      >
        <slot name="trigger">
          <button>Dropdown</button>
        </slot>
        ${this._renderChevron()}
      </div>
    `;
  }

  private _renderMenu(): TemplateResult {
    if (!this._isOpen) return html``;

    const filteredItems = this._getFilteredItems();
    const hasItems = this.items.length > 0 && filteredItems.length > 0;

    return html`
      <div
        part="menu"
        class="skill-dropdown__menu"
        placement="${this._currentPlacement}"
        ?hidden=${!this._isOpen}
        role="menu"
        tabindex="-1"
        style=${this.maxHeight ? `max-height: ${this.maxHeight}` : ''}
      >
        ${this.arrow ? html`
          <div part="arrow" class="skill-dropdown__arrow"></div>
        ` : ''}

        <div part="menu-list" class="skill-dropdown__menu-list">
          <slot name="header"></slot>

          ${this.searchable && hasItems ? html`
            <div class="skill-dropdown__search">
              <input
                type="text"
                class="skill-dropdown__search-input"
                placeholder="${this.searchPlaceholder}"
                @input=${this._handleSearch}
                autocomplete="off"
                aria-label="Search menu items"
              />
            </div>
          ` : ''}

          <div class="skill-dropdown__content">
            ${hasItems ? html`
              ${filteredItems.map((item, _index) => this._renderMenuItem(item, this.items.indexOf(item)))}
            ` : html`
              <div part="empty" class="skill-dropdown__empty">
                <slot name="empty">No items found</slot>
              </div>
            `}
            ${this.items.length === 0 ? html`
              <slot></slot>
            ` : ''}
          </div>

          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div
        part="dropdown"
        class="skill-dropdown"
        aria-label="${this.ariaLabel || ''}"
      >
        ${this._renderTrigger()}
        ${this._renderMenu()}
      </div>
    `;
  }

  /**
   * 打开下拉菜单
   */
  public open(): void {
    if (this.disabled || this._isOpen) return;

    this._isOpen = true;
    this._updatePlacement();

    this.dispatchEvent(
      new CustomEvent('skill-dropdown-open', {
        bubbles: true,
        composed: true,
        detail: { placement: this._currentPlacement },
      })
    );

    if (this.searchable && this._searchInput) {
      setTimeout(() => this._searchInput?.focus(), 100);
    }

    this._fireChangeEvent();
  }

  /**
   * 关闭下拉菜单
   */
  public close(): void {
    if (!this._isOpen) return;

    this._isOpen = false;
    this._searchQuery = '';

    this.dispatchEvent(
      new CustomEvent('skill-dropdown-close', {
        bubbles: true,
        composed: true,
        detail: {},
      })
    );

    this._fireChangeEvent();
  }

  /**
   * 切换下拉菜单状态
   */
  public toggle(): void {
    if (this._isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * 获取当前状态
   */
  public get state() {
    return {
      open: this._isOpen,
      disabled: this.disabled,
      searchable: this.searchable,
      multiple: this.multiple,
      placement: this._currentPlacement,
      searchQuery: this._searchQuery,
      selected: this.multiple ? this._getSelectedValues() : [],
      items: [...this.items],
    };
  }

  /**
   * 清除选择
   */
  public clearSelection(): void {
    this.items.forEach(item => item.selected = false);
    this._fireChangeEvent();
    this.requestUpdate();
  }

  /**
   * 全选
   */
  public selectAll(): void {
    if (!this.multiple) return;

    this.items.forEach(item => {
      if (!item.disabled && item.type !== 'divider') {
        item.selected = true;
      }
    });
    this._fireChangeEvent();
    this.requestUpdate();
  }

  /**
   * 聚焦触发器
   */
  public focus(): void {
    if (!this.disabled && this._trigger) {
      this._trigger.focus();
    }
  }

  /**
   * 失焦
   */
  public blur(): void {
    if (this._trigger) {
      this._trigger.blur();
    }
  }
}

// TypeScript support
declare global {
  interface HTMLElementTagNameMap {
    'skill-dropdown': SkillDropdown;
  }
}