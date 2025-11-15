import { LitElement, html, nothing, type PropertyValueMap } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { filterableListStyles } from './skill-filterable-list.styles.js';
import { baseStyles } from '../../../styles/base.js';
import type {
  FilterableListItem,
  FilterableListFilterConfig,
  FilterableListSortConfig,
  FilterableListConfig,
  FilterableListState,
  FilterableListAction,
  FilterableListRenderProps,
  FilterableListEvent
} from './types.js';

/**
 * Skill Filterable List Component - 可过滤列表组件
 *
 * @element skill-filterable-list
 *
 * @slot item - 自定义项目模板
 * @slot header - 列表头部内容
 * @slot footer - 列表底部内容
 * @slot empty - 空状态内容
 * @slot loading - 加载状态内容
 * @slot error - 错误状态内容
 * @slot search - 自定义搜索框
 * @slot filters - 自定义过滤器面板
 * @slot pagination - 自定义分页控件
 *
 * @csspart container - 列表容器
 * @csspart header - 头部容器
 * @csspart search - 搜索框容器
 * @csspart filters - 过滤器容器
 * @css sort - 排序控件容器
 * @csspart content - 内容容器
 * @csspart item - 列表项目
 * @csspart item-selected - 选中的项目
 * @csspart actions - 操作按钮容器
 * @csspart pagination - 分页容器
 * @csspart empty - 空状态容器
 * @csspart loading - 加载状态容器
 * @csspart error - 错误状态容器
 *
 * @cssprop --item-height - 项目高度
 * @cssprop --item-bg - 项目背景色
 * @cssprop --item-hover-bg - 项目悬停背景色
 * @cssprop --item-selected-bg - 选中项目背景色
 * @cssprop --item-border-color - 项目边框颜色
 * @cssprop --search-height - 搜索框高度
 * @cssprop --filter-width - 过滤器面板宽度
 * @cssprop --pagination-height - 分页控件高度
 *
 * @fires skill-filterable-list-select - 项目选择时触发
 * @fires skill-filterable-list-search - 搜索时触发
 * @fires skill-filterable-list-filter - 过滤时触发
 * @fires skill-filterable-list-sort - 排序时触发
 * @fires skill-filterable-list-page-change - 页面变化时触发
 * @fires skill-filterable-list-action - 操作按钮点击时触发
 *
 * @example
 * ```html
 * <skill-filterable-list
 *   .items="${items}"
 *   .config="${{
 *     layout: 'list',
 *     showSearch: true,
 *     showFilters: true,
 *     multiSelect: true
 *   }}"
 * >
 *   <!-- 自定义项目模板 -->
 * </skill-filterable-list>
 * ```
 */
@customElement('skill-filterable-list')
export class SkillFilterableList extends LitElement {
  static styles = [baseStyles, filterableListStyles];

  /**
   * 列表项目数据
   */
  @property({ type: Array })
  items: FilterableListItem[] = [];

  /**
   * 组件配置
   */
  @property({ type: Object })
  config: FilterableListConfig = {};

  /**
   * 自定义渲染函数
   */
  @property({ type: Function })
  renderItem?: (props: FilterableListRenderProps) => any;

  /**
   * 项目操作列表
   */
  @property({ type: Array })
  actions?: FilterableListAction[];

  /**
   * 是否禁用
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * 是否只读
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * 组件状态
   */
  @state()
  private _state: FilterableListState = {
    rawData: [],
    filteredData: [],
    sortedData: [],
    pageData: [],
    searchText: '',
    filters: {},
    sortBy: '',
    sortDirection: 'asc',
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    selectedItems: [],
    loading: false,
    error: undefined,
    filterPanelVisible: false
  };

  @query('.search-input')
  private _searchInput!: HTMLInputElement;

  @query('.content-container')
  private _contentContainer!: HTMLDivElement;

  private _searchDebounceTimer?: number;

  // 默认配置
  private get _defaultConfig(): Required<FilterableListConfig> {
    return {
      layout: 'list',
      size: 'md',
      showSearch: true,
      searchPlaceholder: '搜索项目...',
      searchFields: [],
      liveSearch: true,
      searchDebounce: 300,
      fuzzy: true,
      filters: [],
      showFilters: true,
      filterLayout: 'sidebar',
      sortOptions: [],
      defaultSort: '',
      showSort: true,
      multiSelect: false,
      showSelectAll: true,
      showActions: true,
      virtualScroll: false,
      itemHeight: 60,
      containerHeight: '400px',
      pageSize: 20,
      showPagination: true,
      paginationPosition: 'bottom',
      emptyText: '暂无数据',
      loadingText: '加载中...',
      errorText: '加载失败',
      bordered: true,
      divided: false,
      hoverable: true,
      clickable: true,
      compact: false,
      theme: 'light'
    };
  }

  // 获取最终配置
  private get _finalConfig(): Required<FilterableListConfig> {
    return { ...this._defaultConfig, ...this.config };
  }

  connectedCallback() {
    super.connectedCallback();
    this._initializeState();
  }

  willUpdate(changedProperties: PropertyValueMap<this>) {
    if (changedProperties.has('items')) {
      this._handleItemsChange();
    }
    if (changedProperties.has('config')) {
      this._handleConfigChange();
    }
  }

  /**
   * 初始化状态
   */
  private _initializeState() {
    const config = this._finalConfig;

    this._state = {
      ...this._state,
      rawData: [...this.items],
      sortBy: config.defaultSort,
      sortDirection: 'asc'
    };

    this._processData();
  }

  /**
   * 处理数据变化
   */
  private _handleItemsChange() {
    this._state.rawData = [...this.items];
    this._processData();
  }

  /**
   * 处理配置变化
   */
  private _handleConfigChange() {
    const config = this._finalConfig;

    // 如果默认排序字段变化，重新排序
    if (config.defaultSort !== this._state.sortBy) {
      this._state.sortBy = config.defaultSort;
      this._state.sortDirection = 'asc';
    }

    this._processData();
  }

  /**
   * 处理数据流程：过滤 -> 排序 -> 分页
   */
  private _processData() {
    this._filterData();
    this._sortData();
    this._paginateData();
  }

  /**
   * 过滤数据
   */
  private _filterData() {
    const config = this._finalConfig;
    let filteredData = [...this._state.rawData];

    // 文本搜索
    if (this._state.searchText.trim()) {
      const searchFields = config.searchFields.length > 0
        ? config.searchFields
        : ['title', 'description', 'tags', 'category'];

      filteredData = filteredData.filter(item => {
        return searchFields.some(field => {
          const value = this._getNestedValue(item, field);
          if (value == null) return false;

          const searchText = this._state.searchText.toLowerCase();
          const itemValue = value.toString().toLowerCase();

          return config.fuzzy
            ? itemValue.includes(searchText)
            : itemValue === searchText;
        });
      });
    }

    // 应用过滤器
    config.filters.forEach((filter: FilterableListFilterConfig) => {
      const filterValue = this._state.filters[filter.field];
      if (filterValue !== undefined && filterValue !== null && filterValue !== '') {
        filteredData = filteredData.filter(item => {
          if (filter.filterFn) {
            return filter.filterFn(item, filterValue);
          }

          const itemValue = this._getNestedValue(item, filter.field);
          return this._applyFilterByType(itemValue, filterValue, filter.type);
        });
      }
    });

    this._state.filteredData = filteredData;
  }

  /**
   * 排序数据
   */
  private _sortData() {
    const config = this._finalConfig;
    let sortedData = [...this._state.filteredData];

    if (this._state.sortBy) {
      const sortConfig = config.sortOptions.find((s: FilterableListSortConfig) => s.field === this._state.sortBy);

      sortedData.sort((a, b) => {
        const aValue = this._getNestedValue(a, this._state.sortBy);
        const bValue = this._getNestedValue(b, this._state.sortBy);

        if (sortConfig?.compareFn) {
          return sortConfig.compareFn(a, b);
        }

        return this._defaultCompare(aValue, bValue);
      });

      // 如果是降序，反转数组
      if (this._state.sortDirection === 'desc') {
        sortedData.reverse();
      }
    }

    this._state.sortedData = sortedData;
  }

  /**
   * 分页数据
   */
  private _paginateData() {
    const config = this._finalConfig;
    const totalItems = this._state.sortedData.length;
    const totalPages = Math.ceil(totalItems / config.pageSize);
    const currentPage = Math.min(this._state.currentPage, totalPages || 1);

    const startIndex = (currentPage - 1) * config.pageSize;
    const endIndex = startIndex + config.pageSize;
    const pageData = this._state.sortedData.slice(startIndex, endIndex);

    this._state.totalItems = totalItems;
    this._state.totalPages = totalPages;
    this._state.currentPage = currentPage;
    this._state.pageData = pageData;
  }

  /**
   * 获取嵌套对象的值
   */
  private _getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
  }

  /**
   * 根据类型应用过滤器
   */
  private _applyFilterByType(itemValue: any, filterValue: any, type: string): boolean {
    switch (type) {
      case 'text':
      case 'string':
        const itemStr = itemValue?.toString().toLowerCase() || '';
        const filterStr = filterValue?.toString().toLowerCase() || '';
        return itemStr.includes(filterStr);

      case 'number':
        return Number(itemValue) === Number(filterValue);

      case 'boolean':
        return Boolean(itemValue) === Boolean(filterValue);

      case 'select':
        return itemValue === filterValue;

      case 'multiselect':
        return Array.isArray(filterValue) && filterValue.includes(itemValue);

      case 'date':
        const itemDate = new Date(itemValue);
        const filterDate = new Date(filterValue);
        return itemDate.toDateString() === filterDate.toDateString();

      default:
        return itemValue === filterValue;
    }
  }

  /**
   * 默认比较函数
   */
  private _defaultCompare(a: any, b: any): number {
    if (a == null && b == null) return 0;
    if (a == null) return -1;
    if (b == null) return 1;

    // 数字比较
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }

    // 日期比较
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() - b.getTime();
    }

    // 字符串比较
    const aStr = a.toString().toLowerCase();
    const bStr = b.toString().toLowerCase();
    return aStr.localeCompare(bStr);
  }

  /**
   * 处理搜索输入
   */
  private _handleSearchInput = (event: Event) => {
    const config = this._finalConfig;
    const searchText = (event.target as HTMLInputElement).value;

    if (config.liveSearch) {
      // 清除之前的定时器
      if (this._searchDebounceTimer) {
        clearTimeout(this._searchDebounceTimer);
      }

      // 设置新的定时器
      this._searchDebounceTimer = window.setTimeout(() => {
        this._state.searchText = searchText;
        this._state.currentPage = 1;
        this._processData();
        this._emitSearchEvent(searchText);
        this.requestUpdate();
      }, config.searchDebounce);
    } else {
      this._state.searchText = searchText;
    }
  };

  /**
   * 处理搜索按键
   */
  private _handleSearchKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const config = this._finalConfig;
      if (!config.liveSearch) {
        this._state.currentPage = 1;
        this._processData();
        this._emitSearchEvent(this._state.searchText);
        this.requestUpdate();
      }
    }
  };

  /**
   * 处理过滤器变化
   */
  private _handleFilterChange = (field: string, value: any) => {
    this._state.filters[field] = value;
    this._state.currentPage = 1;
    this._processData();
    this._emitFilterEvent(field, value);
    this.requestUpdate();
  };

  /**
   * 处理排序变化
   */
  private _handleSortChange = (field: string) => {
    const config = this._finalConfig;
    const sortConfig = config.sortOptions.find((s: FilterableListSortConfig) => s.field === field);

    if (this._state.sortBy === field) {
      // 切换排序方向
      this._state.sortDirection = this._state.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // 切换排序字段
      this._state.sortBy = field;
      this._state.sortDirection = sortConfig?.direction || 'asc';
    }

    this._processData();
    this._emitSortEvent(this._state.sortBy, this._state.sortDirection);
    this.requestUpdate();
  };

  /**
   * 处理项目��择
   */
  private _handleItemSelect = (item: FilterableListItem) => {
    const config = this._finalConfig;
    const itemId = item.id;

    if (config.multiSelect) {
      const index = this._state.selectedItems.indexOf(itemId);
      if (index > -1) {
        this._state.selectedItems.splice(index, 1);
      } else {
        this._state.selectedItems.push(itemId);
      }
    } else {
      this._state.selectedItems = [itemId];
    }

    this._emitSelectEvent(item);
    this.requestUpdate();
  };

  /**
   * 处理全选
   */
  private _handleSelectAll = () => {
    const config = this._finalConfig;
    if (config.multiSelect) {
      const allIds = this._state.pageData.map(item => item.id);

      // 检查是否所有项目都已选中
      const allSelected = allIds.every(id => this._state.selectedItems.includes(id));

      if (allSelected) {
        // 取消全选
        this._state.selectedItems = this._state.selectedItems.filter(
          id => !allIds.includes(id)
        );
      } else {
        // 全选
        allIds.forEach(id => {
          if (!this._state.selectedItems.includes(id)) {
            this._state.selectedItems.push(id);
          }
        });
      }
    }

    this.requestUpdate();
  };

  /**
   * 处理页面变化
   */
  private _handlePageChange = (page: number) => {
    this._state.currentPage = page;
    this._paginateData();
    this._emitPageChangeEvent(page);
    this.requestUpdate();
  };

  /**
   * 处理操作点击
   */
  private _handleActionClick = (action: FilterableListAction, item: FilterableListItem) => {
    if (action.handler) {
      action.handler(item, action);
    }
    this._emitActionEvent(action, item);
  };

  /**
   * 渲染头部
   */
  private _renderHeader() {
    const config = this._finalConfig;

    return html`
      <div class="filterable-list__header" part="header">
        <slot name="header">
          <div class="header-content">
            <h3 class="header-title">项目列表</h3>
            <div class="header-info">
              <span class="item-count">共 ${this._state.totalItems} 项</span>
              ${this._state.selectedItems.length > 0 ? html`
                <span class="selected-count">已选择 ${this._state.selectedItems.length} 项</span>
              ` : ''}
            </div>
          </div>
        </slot>
      </div>
    `;
  }

  /**
   * 渲染搜索框
   */
  private _renderSearch() {
    const config = this._finalConfig;

    if (!config.showSearch) return '';

    return html`
      <div class="filterable-list__search" part="search">
        <slot name="search">
          <div class="search-container">
            <input
              type="text"
              class="search-input"
              placeholder="${config.searchPlaceholder}"
              value="${this._state.searchText}"
              @input=${this._handleSearchInput}
              @keydown=${this._handleSearchKeydown}
              ?disabled=${this.disabled}
            />
            <div class="search-icon">🔍</div>
          </div>
        </slot>
      </div>
    `;
  }

  /**
   * 渲染过滤器
   */
  private _renderFilters() {
    const config = this._finalConfig;

    if (!config.showFilters || !config.filters || config.filters.length === 0) {
      return '';
    }

    return html`
      <div class="filterable-list__filters" part="filters">
        <slot name="filters">
          <div class="filters-container">
            ${config.filters.map(filter => this._renderFilter(filter))}
          </div>
        </slot>
      </div>
    `;
  }

  /**
   * 渲染单个过滤器
   */
  private _renderFilter(filter: FilterableListFilterConfig) {
    const value = this._state.filters[filter.field] ?? filter.defaultValue;

    switch (filter.type) {
      case 'text':
        return html`
          <div class="filter-item">
            <label class="filter-label">${filter.label}</label>
            <input
              type="text"
              class="filter-input"
              placeholder="${filter.placeholder}"
              value="${value || ''}"
              @input=${(e: Event) => this._handleFilterChange(filter.field, (e.target as HTMLInputElement).value)}
              ?disabled=${this.disabled}
            />
          </div>
        `;

      case 'select':
        return html`
          <div class="filter-item">
            <label class="filter-label">${filter.label}</label>
            <select
              class="filter-select"
              value="${value || ''}"
              @change=${(e: Event) => this._handleFilterChange(filter.field, (e.target as HTMLSelectElement).value)}
              ?disabled=${this.disabled}
            >
              <option value="">全部</option>
              ${filter.options?.map(option => html`
                <option value="${option.value}" ?disabled=${option.disabled}>
                  ${option.label}
                </option>
              `)}
            </select>
          </div>
        `;

      default:
        return '';
    }
  }

  /**
   * 渲染排序控件
   */
  private _renderSort() {
    const config = this._finalConfig;

    if (!config.showSort || !config.sortOptions || config.sortOptions.length === 0) {
      return '';
    }

    return html`
      <div class="filterable-list__sort" part="sort">
        <select
          class="sort-select"
          value="${this._state.sortBy}"
          @change=${(e: Event) => this._handleSortChange((e.target as HTMLSelectElement).value)}
          ?disabled=${this.disabled}
        >
          <option value="">默认排序</option>
          ${config.sortOptions.map(option => html`
            <option value="${option.field}">
              ${option.label} ${this._state.sortBy === option.field ? (this._state.sortDirection === 'asc' ? '↑' : '↓') : ''}
            </option>
          `)}
        </select>
      </div>
    `;
  }

  /**
   * 渲染内容区域
   */
  private _renderContent() {
    const config = this._finalConfig;

    if (this._state.loading) {
      return this._renderLoading();
    }

    if (this._state.error) {
      return this._renderError();
    }

    if (this._state.pageData.length === 0) {
      return this._renderEmpty();
    }

    return html`
      <div class="filterable-list__content" part="content">
        ${config.showSelectAll && config.multiSelect ? this._renderSelectAll() : ''}

        <div class="items-container layout-${config.layout}">
          ${this._state.pageData.map((item, index) => this._renderItem(item, index))}
        </div>
      </div>
    `;
  }

  /**
   * 渲染全选控件
   */
  private _renderSelectAll() {
    const config = this._finalConfig;
    const allIds = this._state.pageData.map(item => item.id);
    const allSelected = allIds.every(id => this._state.selectedItems.includes(id));
    const someSelected = allIds.some(id => this._state.selectedItems.includes(id));

    return html`
      <div class="select-all-container">
        <label class="checkbox-label">
          <input
            type="checkbox"
            class="checkbox-input"
            ?checked=${allSelected}
            ?indeterminate=${someSelected && !allSelected}
            @change=${this._handleSelectAll}
            ?disabled=${this.disabled}
          />
          <span class="checkbox-text">全选</span>
        </label>
      </div>
    `;
  }

  /**
   * 渲染单个项目
   */
  private _renderItem(item: FilterableListItem, index: number) {
    const config = this._finalConfig;
    const selected = this._state.selectedItems.includes(item.id);
    const actions = this.actions || [];

    const props: FilterableListRenderProps = {
      item,
      index,
      selected,
      actions,
      onSelect: () => this._handleItemSelect(item),
      onAction: (action) => this._handleActionClick(action, item)
    };

    return this.renderItem
      ? this.renderItem(props)
      : this._renderDefaultItem(props);
  }

  /**
   * 渲染默认项目
   */
  private _renderDefaultItem(props: FilterableListRenderProps) {
    const config = this._finalConfig;
    const { item, selected } = props;

    return html`
      <div
        class="filterable-list__item ${selected ? 'selected' : ''} ${item.disabled ? 'disabled' : ''}"
        part="item ${selected ? 'item-selected' : ''}"
        ?selected=${selected}
        ?disabled=${item.disabled}
        ?clickable=${config.clickable && !item.disabled}
        @click=${() => config.clickable && !item.disabled && props.onSelect(item)}
      >
        <div class="item-content">
          ${config.multiSelect ? html`
            <input
              type="checkbox"
              class="item-checkbox"
              ?checked=${selected}
              @change=${(e: Event) => {
                e.stopPropagation();
                props.onSelect(item);
              }}
              ?disabled=${this.disabled || item.disabled}
            />
          ` : ''}

          <div class="item-main">
            ${item.icon ? html`<div class="item-icon">${item.icon}</div>` : ''}
            ${item.image ? html`<img class="item-image" src="${item.image}" alt="${item.title}" />` : ''}

            <div class="item-details">
              <div class="item-title">${item.title || item.id}</div>
              ${item.description ? html`<div class="item-description">${item.description}</div>` : ''}
              ${item.tags && item.tags.length > 0 ? html`
                <div class="item-tags">
                  ${item.tags.map(tag => html`<span class="tag">${tag}</span>`)}
                </div>
              ` : ''}
            </div>
          </div>

          ${config.showActions && props.actions.length > 0 ? this._renderItemActions(props) : ''}
        </div>
      </div>
    `;
  }

  /**
   * 渲染项目操作
   */
  private _renderItemActions(props: FilterableListRenderProps) {
    return html`
      <div class="item-actions" part="actions">
        ${props.actions.map(action => {
          if (action.type === 'divider') {
            return html`<div class="action-divider"></div>`;
          }

          return html`
            <button
              class="action-button ${action.danger ? 'danger' : ''}"
              @click=${(e: Event) => {
                e.stopPropagation();
                props.onAction(action, props.item);
              }}
              ?disabled=${this.disabled || action.disabled}
              title="${action.label}"
            >
              ${action.icon ? html`<span class="action-icon">${action.icon}</span>` : ''}
              <span class="action-label">${action.label}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  /**
   * 渲染空状态
   */
  private _renderEmpty() {
    const config = this._finalConfig;

    return html`
      <div class="filterable-list__empty" part="empty">
        <slot name="empty">
          <div class="empty-content">
            <div class="empty-icon">📋</div>
            <div class="empty-text">${config.emptyText}</div>
          </div>
        </slot>
      </div>
    `;
  }

  /**
   * 渲染加载状态
   */
  private _renderLoading() {
    const config = this._finalConfig;

    return html`
      <div class="filterable-list__loading" part="loading">
        <slot name="loading">
          <div class="loading-content">
            <div class="loading-spinner"></div>
            <div class="loading-text">${config.loadingText}</div>
          </div>
        </slot>
      </div>
    `;
  }

  /**
   * 渲染错误状态
   */
  private _renderError() {
    const config = this._finalConfig;

    return html`
      <div class="filterable-list__error" part="error">
        <slot name="error">
          <div class="error-content">
            <div class="error-icon">⚠️</div>
            <div class="error-text">${this._state.error || config.errorText}</div>
          </div>
        </slot>
      </div>
    `;
  }

  /**
   * 渲染分页
   */
  private _renderPagination() {
    const config = this._finalConfig;

    if (!config.showPagination || this._state.totalPages <= 1) {
      return '';
    }

    return html`
      <div class="filterable-list__pagination" part="pagination">
        <slot name="pagination">
          <div class="pagination-container">
            <button
              class="pagination-button"
              @click=${() => this._handlePageChange(this._state.currentPage - 1)}
              ?disabled=${this.disabled || this._state.currentPage <= 1}
            >
              上一页
            </button>

            <div class="pagination-info">
              <span>${this._state.currentPage} / ${this._state.totalPages}</span>
            </div>

            <button
              class="pagination-button"
              @click=${() => this._handlePageChange(this._state.currentPage + 1)}
              ?disabled=${this.disabled || this._state.currentPage >= this._state.totalPages}
            >
              下一页
            </button>
          </div>
        </slot>
      </div>
    `;
  }

  /**
   * 渲染底部
   */
  private _renderFooter() {
    return html`
      <div class="filterable-list__footer">
        <slot name="footer"></slot>
      </div>
    `;
  }

  render() {
    const config = this._finalConfig;

    return html`
      <div
        class="filterable-list__container theme-${config.theme}"
        part="container"
        ?bordered=${config.bordered}
        ?divided=${config.divided}
        ?hoverable=${config.hoverable}
        ?compact=${config.compact}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
      >
        ${(config.paginationPosition === 'top' || config.paginationPosition === 'both') ? this._renderPagination() : ''}

        ${this._renderHeader()}
        ${this._renderSearch()}
        ${this._renderFilters()}
        ${this._renderSort()}
        ${this._renderContent()}

        ${(config.paginationPosition === 'bottom' || config.paginationPosition === 'both') ? this._renderPagination() : ''}
        ${this._renderFooter()}
      </div>
    `;
  }

  // 事件发射器
  private _emitSelectEvent(item: FilterableListItem) {
    this.dispatchEvent(new CustomEvent('skill-filterable-list-select', {
      bubbles: true,
      composed: true,
      detail: {
        type: 'select',
        item,
        selectedItems: this._state.selectedItems.map(id =>
          this._state.rawData.find(item => item.id === id)
        ).filter(Boolean)
      } as FilterableListEvent
    }));
  }

  private _emitSearchEvent(searchText: string) {
    this.dispatchEvent(new CustomEvent('skill-filterable-list-search', {
      bubbles: true,
      composed: true,
      detail: {
        type: 'search',
        searchText,
        filteredCount: this._state.filteredData.length
      } as FilterableListEvent
    }));
  }

  private _emitFilterEvent(field: string, value: any) {
    this.dispatchEvent(new CustomEvent('skill-filterable-list-filter', {
      bubbles: true,
      composed: true,
      detail: {
        type: 'filter',
        filters: { ...this._state.filters },
        filteredCount: this._state.filteredData.length
      } as FilterableListEvent
    }));
  }

  private _emitSortEvent(sortBy: string, direction: 'asc' | 'desc') {
    this.dispatchEvent(new CustomEvent('skill-filterable-list-sort', {
      bubbles: true,
      composed: true,
      detail: {
        type: 'sort',
        sort: { field: sortBy, direction },
        sortedCount: this._state.sortedData.length
      } as FilterableListEvent
    }));
  }

  private _emitPageChangeEvent(page: number) {
    this.dispatchEvent(new CustomEvent('skill-filterable-list-page-change', {
      bubbles: true,
      composed: true,
      detail: {
        type: 'page-change',
        pagination: {
          currentPage: page,
          totalPages: this._state.totalPages,
          pageSize: this._finalConfig.pageSize,
          totalItems: this._state.totalItems
        }
      } as FilterableListEvent
    }));
  }

  private _emitActionEvent(action: FilterableListAction, item: FilterableListItem) {
    this.dispatchEvent(new CustomEvent('skill-filterable-list-action', {
      bubbles: true,
      composed: true,
      detail: {
        type: 'action',
        item,
        action,
        originalEvent: event
      } as FilterableListEvent
    }));
  }

  // 公共 API
  /**
   * 设置搜索文本
   */
  public setSearchText(text: string) {
    this._state.searchText = text;
    this._state.currentPage = 1;
    this._processData();
    this._emitSearchEvent(text);
    this.requestUpdate();
  }

  /**
   * 设置过滤器值
   */
  public setFilter(field: string, value: any) {
    this._state.filters[field] = value;
    this._state.currentPage = 1;
    this._processData();
    this._emitFilterEvent(field, value);
    this.requestUpdate();
  }

  /**
   * 设置排序
   */
  public setSort(field: string, direction: 'asc' | 'desc' = 'asc') {
    this._state.sortBy = field;
    this._state.sortDirection = direction;
    this._processData();
    this._emitSortEvent(field, direction);
    this.requestUpdate();
  }

  /**
   * 设置当前页
   */
  public setCurrentPage(page: number) {
    if (page >= 1 && page <= this._state.totalPages) {
      this._handlePageChange(page);
    }
  }

  /**
   * 选中项目
   */
  public selectItems(ids: (string | number)[]) {
    const config = this._finalConfig;
    if (config.multiSelect) {
      this._state.selectedItems = [...ids];
    } else {
      this._state.selectedItems = ids.slice(0, 1);
    }
    this.requestUpdate();
  }

  /**
   * 全选
   */
  public selectAll() {
    const config = this._finalConfig;
    if (config.multiSelect) {
      this._state.selectedItems = this._state.pageData.map(item => item.id);
      this.requestUpdate();
    }
  }

  /**
   * 清空选择
   */
  public clearSelection() {
    this._state.selectedItems = [];
    this.requestUpdate();
  }

  /**
   * 获取选中的项目
   */
  public getSelectedItems(): FilterableListItem[] {
    return this._state.selectedItems.map(id =>
      this._state.rawData.find(item => item.id === id)
    ).filter(Boolean) as FilterableListItem[];
  }

  /**
   * 获取当前状态
   */
  public getState(): FilterableListState {
    return { ...this._state };
  }

  /**
   * 刷新数据
   */
  public refresh() {
    this._processData();
    this.requestUpdate();
  }

  /**
   * 重置所有过滤和排序
   */
  public reset() {
    const config = this._finalConfig;
    this._state = {
      ...this._state,
      searchText: '',
      filters: {},
      sortBy: config.defaultSort,
      sortDirection: 'asc',
      currentPage: 1,
      selectedItems: []
    };
    this._processData();
    this.requestUpdate();
  }
}

// TypeScript support
declare global {
  interface HTMLElementTagNameMap {
    'skill-filterable-list': SkillFilterableList;
  }
}