import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { filterPanelStyles } from './skill-filter-panel.styles';
import { baseStyles } from '../../../styles/base';

export interface FilterOption {
  id: string;
  label: string;
  value?: any;
  count?: number;
  disabled?: boolean;
  icon?: string;
  color?: string;
}

export interface FilterGroup {
  id: string;
  title: string;
  type: 'checkbox' | 'radio' | 'range' | 'date' | 'search' | 'color' | 'tags';
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
  value?: any;
  disabled?: boolean;
  collapsible?: boolean;
  collapsed?: boolean;
  showCount?: boolean;
  showClear?: boolean;
  placeholder?: string;
}

export interface FilterValue {
  group: string;
  value: any;
}

export interface FilterPanelEventDetail {
  group?: FilterGroup;
  option?: FilterOption;
  values: FilterValue[];
  filters: Record<string, any>;
  originalEvent: Event;
}

/**
 * Skill FilterPanel Component - 通用筛选面板组件
 *
 * @slot header-actions - 头部操作按钮插槽
 * @slot footer-left - 底部左侧按钮插槽
 * @slot footer-right - 底部右侧按钮插槽
 * @slot group-actions - 组操作按钮插槽
 * @slot filter-actions - 筛选项操作按钮插槽
 * @slot empty - 空状态插槽
 *
 * @csspart panel - 面板容器
 * @csspart header - 面板头部
 * @csspart title - 面板标题
 * @csspart content - 面板内容
 * @csspart footer - 面板底部
 * @csspart group - 筛选组
 * @csspart filter - 筛选项
 *
 * @cssprop --filter-panel-header-bg - 头部背景色
 * @cssprop --filter-panel-content-bg - 内容背景色
 * @cssprop --filter-panel-border-color - 边框颜色
 * @cssprop --filter-panel-spacing - 内边距
 *
 * @fires skill-filter-change - 筛选条件变更事件
 * @fires skill-filter-clear - 清除筛选事件
 * @fires skill-filter-reset - 重置筛选事件
 * @fires skill-filter-search - 搜索事件
 * @fires skill-filter-expand - 展开面板事件
 * @fires skill-filter-collapse - 折叠面板事件
 *
 * @example
 * ```html
 * <!-- 基础筛选面板 -->
 * <skill-filter-panel
 *   .groups=${[
 *     {
 *       id: 'category',
 *       title: 'Category',
 *       type: 'checkbox',
 *       options: [
 *         { id: 'tech', label: 'Technology', count: 120 },
 *         { id: 'design', label: 'Design', count: 85 },
 *         { id: 'business', label: 'Business', count: 65 }
 *       ]
 *     },
 *     {
 *       id: 'status',
 *       title: 'Status',
 *       type: 'radio',
 *       options: [
 *         { id: 'active', label: 'Active', count: 200 },
 *         { id: 'inactive', label: 'Inactive', count: 50 }
 *       ]
 *     }
 *   ]}
 * ></skill-filter-panel>
 *
 * <!-- 带搜索和范围筛选 -->
 * <skill-filter-panel
 *   title="Advanced Filters"
 *   collapsible
 *   .groups=${[
 *     {
 *       id: 'search',
 *       title: 'Search',
 *       type: 'search',
 *       placeholder: 'Search keywords...'
 *     },
 *     {
 *       id: 'price',
 *       title: 'Price Range',
 *       type: 'range',
 *       min: 0,
 *       max: 1000,
 *       step: 10,
 *       value: [100, 500]
 *     },
 *     {
 *       id: 'date',
 *       title: 'Date Range',
 *       type: 'date',
 *       value: ['2024-01-01', '2024-12-31']
 *     }
 *   ]}
 * ></skill-filter-panel>
 *
 * <!-- 标签云筛选 -->
 * <skill-filter-panel
 *   .groups=${[
 *     {
 *       id: 'tags',
 *       title: 'Tags',
 *       type: 'tags',
 *       options: [
 *         { id: 'javascript', label: 'JavaScript', color: '#f7df1e' },
 *         { id: 'typescript', label: 'TypeScript', color: '#3178c6' },
 *         { id: 'react', label: 'React', color: '#61dafb' }
 *       ]
 *     }
 *   ]}
 * ></skill-filter-panel>
 *
 * <!-- 颜色筛选 -->
 * <skill-filter-panel
 *   .groups=${[
 *     {
 *       id: 'colors',
 *       title: 'Colors',
 *       type: 'color',
 *       options: [
 *         { id: 'red', label: 'Red', color: '#ef4444' },
 *         { id: 'green', label: 'Green', color: '#10b981' },
 *         { id: 'blue', label: 'Blue', color: '#3b82f6' }
 *       ]
 *     }
 *   ]}
 * ></skill-filter-panel>
 *
 * <!-- 响应筛选事件 -->
 * <skill-filter-panel
 *   .groups=${filterGroups}
 *   @skill-filter-change=${handleFilterChange}
 *   @skill-filter-clear=${handleFilterClear}
 * ></skill-filter-panel>
 *
 * <!-- 自定义操作按钮 -->
 * <skill-filter-panel .groups=${filterGroups}>
 *   <button slot="header-actions" @click=${handleExport}>Export</button>
 *   <button slot="footer-left" @click=${handleSave}>Save Filters</button>
 *   <button slot="footer-right" @click=${handleApply}>Apply</button>
 * </skill-filter-panel>
 * ```
 */
@customElement('skill-filter-panel')
export class SkillFilterPanel extends LitElement {
  static styles = [baseStyles, filterPanelStyles];

  /**
   * 面板标题
   */
  @property({ type: String, reflect: true })
  title = 'Filters';

  /**
   * 筛选组数据
   */
  @property({ type: Array })
  groups: FilterGroup[] = [];

  /**
   * 当前筛选值
   */
  @property({ type: Array })
  values: FilterValue[] = [];

  /**
   * 是否可折叠
   */
  @property({ type: Boolean, reflect: true })
  collapsible = false;

  /**
   * 是否折叠
   */
  @property({ type: Boolean, reflect: true })
  collapsed = false;

  /**
   * 是否显示搜索框
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-search' })
  showSearch = false;

  /**
   * 搜索占位符
   */
  @property({ type: String, reflect: true, attribute: 'search-placeholder' })
  searchPlaceholder = 'Search filters...';

  /**
   * 是否显示清空按钮
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-clear' })
  showClear = true;

  /**
   * 是否显示重置按钮
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-reset' })
  showReset = true;

  /**
   * 是否显示应用按钮
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-apply' })
  showApply = false;

  /**
   * 是否显示计数
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-count' })
  showCount = true;

  /**
   * 是否显示图标
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-icons' })
  showIcons = true;

  /**
   * 面板尺寸
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

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
   * 是否加载中
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * ARIA 标签
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel = 'Filter panel';

  @state()
  private _searchText = '';

  @state()
  private _collapsedGroups: Set<string> = new Set();

  willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('groups')) {
      this._initializeCollapsedGroups();
    }
  }

  private _initializeCollapsedGroups() {
    this._collapsedGroups.clear();
    this.groups.forEach(group => {
      if (group.collapsed) {
        this._collapsedGroups.add(group.id);
      }
    });
  }

  private _handleFilterChange(group: FilterGroup, option?: FilterOption, value?: any) {
    if (this.readonly || this.disabled) return;

    const existingIndex = this.values.findIndex(v => v.group === group.id);
    const newValue = { group: group.id, value: option?.value ?? value };

    if (existingIndex >= 0) {
      this.values[existingIndex] = newValue;
    } else {
      this.values = [...this.values, newValue];
    }

    this._fireEvent('skill-filter-change', group, option, newValue);
  }

  private _handleGroupCollapse(groupId: string) {
    if (this._collapsedGroups.has(groupId)) {
      this._collapsedGroups.delete(groupId);
    } else {
      this._collapsedGroups.add(groupId);
    }
    this.requestUpdate();
  }

  private _handleGroupClear(group: FilterGroup) {
    this.values = this.values.filter(v => v.group !== group.id);
    this._fireEvent('skill-filter-change', group);
  }

  private _handleClearAll() {
    this.values = [];
    this._fireEvent('skill-filter-clear');
  }

  private _handleReset() {
    this.values = [];
    this._searchText = '';
    this._collapsedGroups.clear();
    this._fireEvent('skill-filter-reset');
  }

  private _handleApply() {
    this._fireEvent('skill-filter-change');
  }

  private _handlePanelToggle() {
    this.collapsed = !this.collapsed;
    this._fireEvent(this.collapsed ? 'skill-filter-collapse' : 'skill-filter-expand');
  }

  private _handleSearch(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this._searchText = target.value;
    this._fireEvent('skill-filter-search');
  }

  private _fireEvent(eventName: string, group?: FilterGroup, option?: FilterOption, value?: FilterValue) {
    const detail = {
      group,
      option,
      values: this.values,
      filters: this._getFiltersObject(),
      originalEvent: new Event(eventName),
      ...(value && { value }),
    } as FilterPanelEventDetail;

    this.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail,
    }));
  }

  private _getFiltersObject(): Record<string, any> {
    const filters: Record<string, any> = {};
    this.values.forEach(v => {
      filters[v.group] = v.value;
    });
    return filters;
  }

  private _getGroupValue(group: FilterGroup): any {
    const value = this.values.find(v => v.group === group.id);
    return value?.value;
  }

  private _isOptionSelected(group: FilterGroup, option: FilterOption): boolean {
    const value = this._getGroupValue(group);
    if (group.type === 'checkbox') {
      return Array.isArray(value) && value.includes(option.value);
    } else if (group.type === 'radio') {
      return value === option.value;
    }
    return false;
  }

  private _getGroupCount(group: FilterGroup): number {
    const value = this._getGroupValue(group);
    if (group.type === 'checkbox' && Array.isArray(value)) {
      return value.length;
    } else if (value) {
      return 1;
    }
    return 0;
  }

  
  private _getFilteredGroups(): FilterGroup[] {
    if (!this._searchText) return this.groups;

    const searchLower = this._searchText.toLowerCase();
    return this.groups.filter(group => {
      if (group.title.toLowerCase().includes(searchLower)) return true;
      if (group.options) {
        return group.options.some(option =>
          option.label.toLowerCase().includes(searchLower)
        );
      }
      return false;
    });
  }

  private _renderHeader(): TemplateResult {
    return html`
      <div part="header" class="skill-filter-panel__header">
        <div class="skill-filter-panel__title">
          ${this.collapsible ? html`
            <button
              class="skill-filter-panel__action-btn"
              @click=${this._handlePanelToggle}
              aria-label="${this.collapsed ? 'Expand panel' : 'Collapse panel'}"
            >
              <svg class="skill-filter-panel__collapse-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5H7z"/>
              </svg>
            </button>
          ` : ''}
          ${this.showIcons ? html`
            <div class="skill-filter-panel__title-icon">
              <skill-icon name="filter" size="sm"></skill-icon>
            </div>
          ` : ''}
          <span>${this.title}</span>
        </div>

        <div class="skill-filter-panel__actions">
          <slot name="header-actions"></slot>
          ${!this.collapsible ? html`
            ${this.showClear ? html`
              <button
                class="skill-filter-panel__action-btn"
                @click=${this._handleClearAll}
                disabled=${this.readonly || this.disabled || this.values.length === 0}
                aria-label="Clear all filters"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
            ` : ''}
          ` : ''}
        </div>
      </div>
    `;
  }

  private _renderCheckboxGroup(group: FilterGroup): TemplateResult {
    const value = this._getGroupValue(group) as any[] || [];

    return html`
      <div class="skill-filter-panel__filter-items">
        ${group.options?.map(option => html`
          <div
            class="skill-filter-panel__filter-item
                   ${this._isOptionSelected(group, option) ? 'skill-filter-panel__filter-item--active' : ''}"
            @click=${() => {
              const isSelected = this._isOptionSelected(group, option);
              const newValue = isSelected
                ? value.filter(v => v !== option.value)
                : [...value, option.value];
              this._handleFilterChange(group, option, newValue);
            }}
          >
            <div class="skill-filter-panel__filter-item-left">
              <input
                type="checkbox"
                class="skill-filter-panel__filter-checkbox"
                .checked=${this._isOptionSelected(group, option)}
                .disabled=${option.disabled || group.disabled || this.readonly || this.disabled}
                @click=${(e: Event) => e.stopPropagation()}
              />
              <span class="skill-filter-panel__filter-text">${option.label}</span>
            </div>
            <div class="skill-filter-panel__filter-item-right">
              ${this.showCount && option.count !== undefined ? html`
                <span class="skill-filter-panel__filter-count">${option.count}</span>
              ` : ''}
              <slot name="filter-actions" data-option-id="${option.id}"></slot>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  private _renderRadioGroup(group: FilterGroup): TemplateResult {
    return html`
      <div class="skill-filter-panel__filter-items">
        ${group.options?.map(option => html`
          <div
            class="skill-filter-panel__filter-item
                   ${this._isOptionSelected(group, option) ? 'skill-filter-panel__filter-item--active' : ''}"
            @click=${() => this._handleFilterChange(group, option, option.value)}
          >
            <div class="skill-filter-panel__filter-item-left">
              <input
                type="radio"
                class="skill-filter-panel__filter-radio"
                name="${group.id}"
                .checked=${this._isOptionSelected(group, option)}
                .disabled=${option.disabled || group.disabled || this.readonly || this.disabled}
                @click=${(e: Event) => e.stopPropagation()}
              />
              <span class="skill-filter-panel__filter-text">${option.label}</span>
            </div>
            <div class="skill-filter-panel__filter-item-right">
              ${this.showCount && option.count !== undefined ? html`
                <span class="skill-filter-panel__filter-count">${option.count}</span>
              ` : ''}
              <slot name="filter-actions" data-option-id="${option.id}"></slot>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  private _renderRangeGroup(group: FilterGroup): TemplateResult {
    const value = this._getGroupValue(group) as [number, number] || [group.min || 0, group.max || 100];

    return html`
      <div class="skill-filter-panel__range">
        <div class="skill-filter-panel__range-container">
          <input
            type="range"
            class="skill-filter-panel__range-input"
            min="${group.min || 0}"
            max="${group.max || 100}"
            step="${group.step || 1}"
            .value=${value[0]}
            @input=${(e: InputEvent) => {
              const target = e.target as HTMLInputElement;
              this._handleFilterChange(group, undefined, [Number(target.value), value[1]]);
            }}
            .disabled=${group.disabled || this.readonly || this.disabled}
          />
          <span class="skill-filter-panel__range-value">${value[0]}</span>
        </div>
        <div class="skill-filter-panel__range-container">
          <input
            type="range"
            class="skill-filter-panel__range-input"
            min="${group.min || 0}"
            max="${group.max || 100}"
            step="${group.step || 1}"
            .value=${value[1]}
            @input=${(e: InputEvent) => {
              const target = e.target as HTMLInputElement;
              this._handleFilterChange(group, undefined, [value[0], Number(target.value)]);
            }}
            .disabled=${group.disabled || this.readonly || this.disabled}
          />
          <span class="skill-filter-panel__range-value">${value[1]}</span>
        </div>
      </div>
    `;
  }

  private _renderDateGroup(group: FilterGroup): TemplateResult {
    const value = this._getGroupValue(group) as [string, string] || [];

    return html`
      <div class="skill-filter-panel__date">
        <div class="skill-filter-panel__date-container">
          <input
            type="date"
            class="skill-filter-panel__date-input"
            .value=${value[0] || ''}
            @change=${(e: InputEvent) => {
              const target = e.target as HTMLInputElement;
              this._handleFilterChange(group, undefined, [target.value, value[1]]);
            }}
            .disabled=${group.disabled || this.readonly || this.disabled}
          />
          <span class="skill-filter-panel__date-separator">-</span>
          <input
            type="date"
            class="skill-filter-panel__date-input"
            .value=${value[1] || ''}
            @change=${(e: InputEvent) => {
              const target = e.target as HTMLInputElement;
              this._handleFilterChange(group, undefined, [value[0], target.value]);
            }}
            .disabled=${group.disabled || this.readonly || this.disabled}
          />
        </div>
      </div>
    `;
  }

  private _renderSearchGroup(group: FilterGroup): TemplateResult {
    const value = this._getGroupValue(group) || '';

    return html`
      <div class="skill-filter-panel__search">
        <input
          type="text"
          class="skill-filter-panel__search-input"
          placeholder="${group.placeholder || 'Search...'}"
          .value=${value}
          @input=${(e: InputEvent) => {
            const target = e.target as HTMLInputElement;
            this._handleFilterChange(group, undefined, target.value);
          }}
          .disabled=${group.disabled || this.readonly || this.disabled}
        />
      </div>
    `;
  }

  private _renderTagsGroup(group: FilterGroup): TemplateResult {
    const value = this._getGroupValue(group) as any[] || [];

    return html`
      <div class="skill-filter-panel__tags">
        ${group.options?.map(option => html`
          <div
            class="skill-filter-panel__tag
                   ${value.includes(option.value) ? 'skill-filter-panel__tag--active' : ''}"
            style="${option.color ? `background-color: ${option.color}20; color: ${option.color}; border-color: ${option.color};` : ''}"
            @click=${() => {
              const isSelected = value.includes(option.value);
              const newValue = isSelected
                ? value.filter(v => v !== option.value)
                : [...value, option.value];
              this._handleFilterChange(group, option, newValue);
            }}
          >
            ${option.label}
          </div>
        `)}
      </div>
    `;
  }

  private _renderColorGroup(group: FilterGroup): TemplateResult {
    const value = this._getGroupValue(group);

    return html`
      <div class="skill-filter-panel__color-picker">
        ${group.options?.map(option => html`
          <div
            class="skill-filter-panel__color-option
                   ${value === option.value ? 'skill-filter-panel__color-option--active' : ''}"
            style="background-color: ${option.color}"
            title="${option.label}"
            @click=${() => this._handleFilterChange(group, option, option.value)}
          ></div>
        `)}
      </div>
    `;
  }

  private _renderGroup(group: FilterGroup): TemplateResult {
    const isCollapsed = this._collapsedGroups.has(group.id);
    const hasContent = this._getGroupCount(group) > 0;

    return html`
      <div part="group" class="skill-filter-panel__group" data-group-id="${group.id}">
        <div class="skill-filter-panel__group-title">
          <div class="skill-filter-panel__group-title-text">
            <span>${group.title}</span>
            ${this.showCount && hasContent ? html`
              <span class="skill-filter-panel__group-count">(${this._getGroupCount(group)})</span>
            ` : ''}
          </div>
          <div class="skill-filter-panel__group-actions">
            <slot name="group-actions" data-group-id="${group.id}"></slot>
            ${group.showClear && hasContent && !this.readonly && !this.disabled ? html`
              <button
                class="skill-filter-panel__group-clear"
                @click=${() => this._handleGroupClear(group)}
              >
                Clear
              </button>
            ` : ''}
            ${group.collapsible ? html`
              <button
                class="skill-filter-panel__action-btn"
                @click=${() => this._handleGroupCollapse(group.id)}
                aria-label="${isCollapsed ? 'Expand group' : 'Collapse group'}"
              >
                <svg class="skill-filter-panel__collapse-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5H7z"/>
                </svg>
              </button>
            ` : ''}
          </div>
        </div>

        ${!isCollapsed ? html`
          ${group.type === 'checkbox' ? this._renderCheckboxGroup(group) : ''}
          ${group.type === 'radio' ? this._renderRadioGroup(group) : ''}
          ${group.type === 'range' ? this._renderRangeGroup(group) : ''}
          ${group.type === 'date' ? this._renderDateGroup(group) : ''}
          ${group.type === 'search' ? this._renderSearchGroup(group) : ''}
          ${group.type === 'tags' ? this._renderTagsGroup(group) : ''}
          ${group.type === 'color' ? this._renderColorGroup(group) : ''}
        ` : ''}
      </div>
    `;
  }

  private _renderFooter(): TemplateResult {
    if (!this.showApply && !this.showReset) return html``;

    return html`
      <div part="footer" class="skill-filter-panel__footer">
        <div class="skill-filter-panel__footer-left">
          <slot name="footer-left"></slot>
          ${this.showReset ? html`
            <button
              class="skill-filter-panel__btn"
              @click=${this._handleReset}
              disabled=${this.readonly || this.disabled}
            >
              Reset
            </button>
          ` : ''}
        </div>
        <div class="skill-filter-panel__footer-right">
          <slot name="footer-right"></slot>
          ${this.showApply ? html`
            <button
              class="skill-filter-panel__btn skill-filter-panel__btn--primary"
              @click=${this._handleApply}
              disabled=${this.readonly || this.disabled}
            >
              Apply Filters
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }

  render(): TemplateResult {
    const filteredGroups = this._getFilteredGroups();

    return html`
      <div
        part="panel"
        class="skill-filter-panel
               skill-filter-panel--${this.size}
               ${this.collapsed ? 'skill-filter-panel--collapsed' : ''}"
        role="region"
        aria-label="${this.ariaLabel}"
      >
        ${this._renderHeader()}

        <div part="content" class="skill-filter-panel__content">
          ${this.loading ? html`
            <div class="skill-filter-panel__loading">
              <div class="skill-filter-panel__loading-spinner"></div>
              Loading filters...
            </div>
          ` : filteredGroups.length === 0 ? html`
            <slot name="empty">
              <div class="skill-filter-panel__empty">
                No filters available
              </div>
            </slot>
          ` : this.showSearch ? html`
            <div class="skill-filter-panel__search">
              <input
                type="text"
                class="skill-filter-panel__search-input"
                placeholder="${this.searchPlaceholder}"
                .value=${this._searchText}
                @input=${this._handleSearch}
                .disabled=${this.readonly || this.disabled}
              />
            </div>
          ` : ''}

          ${!this.loading && filteredGroups.length > 0 ? html`
            ${filteredGroups.map(group => this._renderGroup(group))}
          ` : ''}
        </div>

        ${!this.collapsed ? this._renderFooter() : ''}
      </div>
    `;
  }

  /**
   * 设置筛选值
   */
  public setFilter(groupId: string, value: any): void {
    this.values = [...this.values.filter(v => v.group !== groupId), { group: groupId, value }];
    this._fireEvent('skill-filter-change');
  }

  /**
   * 获取筛选值
   */
  public getFilter(groupId: string): any {
    const filter = this.values.find(v => v.group === groupId);
    return filter?.value;
  }

  /**
   * 清除筛选
   */
  public clearFilter(groupId: string): void {
    this.values = this.values.filter(v => v.group !== groupId);
    this._fireEvent('skill-filter-change');
  }

  /**
   * 清除所有筛选
   */
  public clearAllFilters(): void {
    this.values = [];
    this._fireEvent('skill-filter-clear');
  }

  /**
   * 获取所有筛选值
   */
  public getFilters(): Record<string, any> {
    return this._getFiltersObject();
  }

  /**
   * 展开所有组
   */
  public expandAllGroups(): void {
    this._collapsedGroups.clear();
    this.requestUpdate();
  }

  /**
   * 折叠所有组
   */
  public collapseAllGroups(): void {
    this.groups.forEach(group => {
      this._collapsedGroups.add(group.id);
    });
    this.requestUpdate();
  }

  /**
   * 获取活动筛选数量
   */
  public getActiveFilterCount(): number {
    return this.values.length;
  }

  /**
   * 检查是否有活动筛选
   */
  public hasActiveFilters(): boolean {
    return this.values.length > 0;
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-filter-panel': SkillFilterPanel;
  }
}