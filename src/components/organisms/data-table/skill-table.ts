import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../../styles/base';
import {
  createErrorHandler,
  SkillValidator,
  CatchErrors,
  Validate,
  type SkillErrorOptions
} from '../../../utils/error-handler';
import {
  withFullStateManager
} from '../../../utils/state-mixin';

/**
 * 数据列配置接口
 */
export interface TableColumn {
  /** 列键名 */
  key: string;
  /** 列标题 */
  title: string;
  /** 列宽度 */
  width?: string;
  /** 是否可排序 */
  sortable?: boolean;
  /** 是否可筛选 */
  filterable?: boolean;
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right';
  /** 自定义渲染函数 */
  render?: (value: any, row: any, index: number) => any;
  /** 是否固定列 */
  fixed?: 'left' | 'right';
  /** 是否显示 */
  visible?: boolean;
}

/**
 * 排序配置接口
 */
export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

/**
 * 分页配置接口
 */
export interface PaginationConfig {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean;
}

/**
 * 虚拟滚动配置接口
 */
export interface VirtualScrollConfig {
  /** 是否启用虚拟滚动 */
  enabled: boolean;
  /** 行高度 */
  rowHeight: number;
  /** 表格容器高度 */
  containerHeight: string;
  /** 缓冲区大小 */
  bufferSize?: number;
}

/**
 * 筛选配置接口
 */
export interface FilterConfig {
  field: string;
  value: any;
  operator?: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith';
}

/**
 * Skill Data Table Component
 *
 * 增强数据表格组件，支持搜索、分页、排序、筛选、虚拟滚动等功能
 *
 * @slot - 表格内容（如果自定义数据渲染）
 * @slot header - 表格顶部操作区域
 * @slot footer - 表格底部操作区域
 * @slot empty - 空数据状态展示
 * @slot loading - 加载状态展示
 *
 * @csspart table - 表格元素
 * @csspart header - 表格头部
 * @csspart body - 表格主体
 * @csspart row - 行元素
 * @csspart cell - 单元格元素
 * @csspart pagination - 分页组件
 * @csspart virtual-viewport - 虚拟滚动视口
 * @csspart virtual-content - 虚拟滚动内容
 *
 * @cssprop --table-bg - 表格背景色
 * @cssprop --table-border - 表格边框色
 * @cssprop --table-header-bg - 表头背景色
 * @cssprop --table-hover-bg - 悬停背景色
 * @cssprop --table-selected-bg - 选中背景色
 * @cssprop --table-row-height - 行高度（虚拟滚动时使用）
 *
 * @fires skill-select - 当选择行时触发
 * @fires skill-change - 当数据变化时触发
 * @fires skill-sort-change - 当排序变化时触发
 * @fires skill-filter-change - 当筛选变化时触发
 * @fires skill-page-change - 当分页变化时触发
 * @fires skill-scroll - 虚拟滚动时触发
 *
 * @example
 * ```html
 * <skill-data-table
 *   .columns="${columns}"
 *   .data="${tableData}"
 *   .searchable="${true}"
 *   .pagination="${paginationConfig}"
 *   .virtualScroll="${{ enabled: true, rowHeight: 50, containerHeight: '400px' }}"
 * >
 * </skill-data-table>
 * ```
 */

@customElement('skill-table')
export class SkillTable extends withFullStateManager(LitElement) {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
        box-sizing: border-box;
        --table-bg: var(--skill-surface-0);
        --table-border: var(--skill-gray-200);
        --table-header-bg: var(--skill-gray-50);
        --table-hover-bg: var(--skill-primary-50);
        --table-selected-bg: var(--skill-primary-100);
      }

      .data-table {
        background: var(--table-bg);
        border: 1px solid var(--table-border);
        border-radius: var(--skill-radius-lg);
        overflow: hidden;
      }

      .data-table__toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--skill-spacing-md) var(--skill-spacing-lg);
        border-bottom: 1px solid var(--table-border);
        background: var(--skill-gray-50);
      }

      .data-table__toolbar-left {
        display: flex;
        align-items: center;
        gap: var(--skill-spacing-md);
      }

      .data-table__toolbar-right {
        display: flex;
        align-items: center;
        gap: var(--skill-spacing-md);
      }

      .data-table__search {
        display: flex;
        align-items: center;
        gap: var(--skill-spacing-sm);
        min-width: 300px;
      }

      .data-table__search input {
        flex: 1;
        padding: var(--skill-spacing-sm) var(--skill-spacing-md);
        border: 1px solid var(--skill-gray-200);
        border-radius: var(--skill-radius-md);
        font-size: var(--skill-text-sm);
      }

      .data-table__filters {
        display: flex;
        gap: var(--skill-spacing-sm);
        align-items: center;
      }

      .data-table__table-wrapper {
        overflow-x: auto;
        overflow-y: hidden;
        max-height: 600px;
        position: relative;
      }

      .data-table__table {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--skill-text-sm);
      }

      .data-table__thead {
        position: sticky;
        top: 0;
        z-index: 10;
        background: var(--table-header-bg);
      }

      .data-table__th {
        padding: var(--skill-spacing-md) var(--skill-spacing-lg);
        text-align: left;
        font-weight: var(--skill-font-semibold);
        color: var(--skill-gray-900);
        border-bottom: 2px solid var(--table-border);
        user-select: none;
        white-space: nowrap;
      }

      .data-table__th--center {
        text-align: center;
      }

      .data-table__th--right {
        text-align: right;
      }

      .data-table__th--sortable {
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .data-table__th--sortable:hover {
        background: var(--skill-gray-100);
      }

      .data-table__sort-icon {
        display: inline-flex;
        align-items: center;
        margin-left: var(--skill-spacing-xs);
        opacity: 0.6;
        transition: opacity 0.2s;
      }

      .data-table__sort-icon--active {
        opacity: 1;
      }

      .data-table__tbody {
        /* 表格主体样式 */
      }

      .data-table__tr {
        transition: background-color 0.2s;
        border-bottom: 1px solid var(--skill-gray-100);
      }

      .data-table__tr:hover {
        background: var(--table-hover-bg);
      }

      .data-table__tr--selected {
        background: var(--table-selected-bg);
      }

      .data-table__tr--disabled {
        opacity: 0.6;
        pointer-events: none;
      }

      .data-table__td {
        padding: var(--skill-spacing-md) var(--skill-spacing-lg);
        border-bottom: 1px solid var(--skill-gray-100);
        vertical-align: middle;
      }

      .data-table__td--center {
        text-align: center;
      }

      .data-table__td--right {
        text-align: right;
      }

      .data-table__selection {
        width: 40px;
        text-align: center;
      }

      .data-table__pagination {
        padding: var(--skill-spacing-md) var(--skill-spacing-lg);
        border-top: 1px solid var(--table-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .data-table__pagination-info {
        font-size: var(--skill-text-sm);
        color: var(--skill-gray-600);
      }

      .data-table__empty {
        padding: var(--skill-spacing-2xl) var(--skill-spacing-lg);
        text-align: center;
        color: var(--skill-gray-500);
      }

      .data-table__loading {
        padding: var(--skill-spacing-2xl) var(--skill-spacing-lg);
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--skill-spacing-md);
      }

      .data-table__checkbox {
        width: 16px;
        height: 16px;
        margin: 0;
      }

      .data-table__error {
        padding: var(--skill-spacing-2xl) var(--skill-spacing-lg);
        text-align: center;
        color: var(--skill-error-600, #dc3545);
        background: var(--skill-error-50, #fdf2f2);
        border: 1px solid var(--skill-error-200, #fecaca);
        border-radius: var(--skill-radius-lg);
      }

      .data-table__error .error-icon {
        font-size: 48px;
        margin-bottom: var(--skill-spacing-md);
      }

      .data-table__error h3 {
        margin: 0 0 var(--skill-spacing-sm) 0;
        color: var(--skill-error-700, #b91c1c);
      }

      .data-table__error p {
        margin: 0 0 var(--skill-spacing-lg) 0;
        color: var(--skill-error-600, #dc3545);
      }

      .data-table__error button {
        background: var(--skill-primary-500);
        color: white;
        border: none;
        padding: var(--skill-spacing-sm) var(--skill-spacing-lg);
        border-radius: var(--skill-radius-md);
        cursor: pointer;
        font-size: var(--skill-text-sm);
        transition: background-color 0.2s;
      }

      .data-table__error button:hover {
        background: var(--skill-primary-600);
      }

      .data-table__status {
        display: inline-flex;
        align-items: center;
        gap: var(--skill-spacing-xs);
        padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
        border-radius: var(--skill-radius-full);
        font-size: var(--skill-text-xs);
        font-weight: var(--skill-font-medium);
      }

      .data-table__status--active {
        background: var(--skill-success-100);
        color: var(--skill-success-700);
      }

      .data-table__status--inactive {
        background: var(--skill-gray-100);
        color: var(--skill-gray-700);
      }

      .data-table__status--pending {
        background: var(--skill-warning-100);
        color: var(--skill-warning-700);
      }

      .data-table__actions {
        display: flex;
        gap: var(--skill-spacing-xs);
        align-items: center;
      }

      /* 响应式设计 */
      @media (max-width: 768px) {
        .data-table__toolbar {
          flex-direction: column;
          gap: var(--skill-spacing-md);
          align-items: stretch;
        }

        .data-table__toolbar-left,
        .data-table__toolbar-right {
          justify-content: center;
        }

        .data-table__search {
          min-width: auto;
        }

        .data-table__table-wrapper {
          max-height: 400px;
        }

        .data-table__th,
        .data-table__td {
          padding: var(--skill-spacing-sm) var(--skill-spacing-md);
        }
      }

      /* 虚拟滚动样式 */
      .data-table__virtual-wrapper {
        position: relative;
        overflow: hidden;
      }

      .data-table__virtual-viewport {
        overflow-y: auto;
        overflow-x: auto;
        position: relative;
      }

      .data-table__virtual-header {
        position: sticky;
        top: 0;
        z-index: 10;
        background: var(--table-header-bg, var(--skill-gray-50));
      }

      .data-table__virtual-content {
        position: relative;
      }

      .data-table__virtual-row {
        position: absolute;
        left: 0;
        right: 0;
        display: flex;
        align-items: stretch;
        border-bottom: 1px solid var(--skill-gray-100);
        transition: background-color 0.2s;
      }

      .data-table__virtual-row:hover {
        background: var(--table-hover-bg);
      }

      .data-table__virtual-row--selected {
        background: var(--table-selected-bg);
      }

      .data-table__virtual-cell {
        padding: var(--skill-spacing-md) var(--skill-spacing-lg);
        border-right: 1px solid var(--skill-gray-100);
        vertical-align: middle;
        box-sizing: border-box;
        flex-shrink: 0;
      }

      .data-table__virtual-cell--center {
        text-align: center;
        justify-content: center;
      }

      .data-table__virtual-cell--right {
        text-align: right;
        justify-content: flex-end;
      }

      .data-table__virtual-selection {
        width: 40px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `
  ];

  /** 错误处理器 */
  private errorHandler = createErrorHandler('SkillTable');

  /** 表格列配置 */
  @property({ type: Array })
  columns: TableColumn[] = [];

  /** 表格数据 */
  @property({ type: Array })
  data: any[] = [];

  /** 搜索关键词 */
  @property({ type: String })
  searchValue = '';

  /** 是否显示搜索框 */
  @property({ type: Boolean, reflect: true })
  searchable = false;

  /** 是否显示选择框 */
  @property({ type: Boolean, reflect: true })
  selectable = false;

  /** 是否加载中 */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** 是否显示斑马纹 */
  @property({ type: Boolean, reflect: true })
  striped = false;

  /** 紧凑模式 */
  @property({ type: Boolean, reflect: true })
  compact = false;

  /** 排序配置 */
  @property({ type: Object })
  sort?: SortConfig;

  /** 分页配置 */
  @property({ type: Object })
  pagination?: PaginationConfig;

  /** 筛选配置 */
  @property({ type: Array })
  filters?: FilterConfig[];

  /** 虚拟滚动配置 */
  @property({ type: Object })
  virtualScroll?: VirtualScrollConfig;

  /** 行键名 */
  @property({ type: String })
  rowKey = 'id';

  /** 选中的行 */
  @state()
  selectedRows: any[] = [];

  /** 当前页码 */
  @state()
  currentPage = 1;

  /** 筛选后的数据 */
  @state()
  filteredData: any[] = [];

  /** 当前页数据 */
  @state()
  currentPageData: any[] = [];

  /** 虚拟滚动状态 */
  @state()
  private _scrollTop = 0;

  /** 虚拟滚动视口高度 */
  @state()
  private _viewportHeight = 0;

  /** 虚拟滚动行位置缓存 */
  @state()
  private _rowPositions: number[] = [];

  /** 虚拟滚动可见范围 */
  @state()
  private _visibleRange = { start: 0, end: 0 };

  protected willUpdate(changedProperties: Map<string, any>) {
    try {
      // 验证关键属性
      if (changedProperties.has('data')) {
        SkillValidator.type(this.data, 'object', 'data', 'SkillTable');
        if (this.data) {
          SkillValidator.arrayLength('data', this.data, 0, undefined, 'SkillTable');
        }
      }

      if (changedProperties.has('columns')) {
        SkillValidator.required(this.columns, 'columns', 'SkillTable');
        SkillValidator.arrayLength('columns', this.columns, 1, undefined, 'SkillTable');
      }

      if (changedProperties.has('virtualScroll') && this.virtualScroll) {
        SkillValidator.type(this.virtualScroll, 'object', 'virtualScroll', 'SkillTable');
        SkillValidator.required(this.virtualScroll.enabled, 'virtualScroll.enabled', 'SkillTable');
        SkillValidator.type(this.virtualScroll.rowHeight, 'number', 'virtualScroll.rowHeight', 'SkillTable');
        SkillValidator.range('virtualScroll.rowHeight', this.virtualScroll.rowHeight, 20, 200, 'SkillTable');
      }

      // 状态管理：同步到组件状态
      if (changedProperties.has('selectedRows')) {
        this.setState('selectedRows', this.selectedRows);
      }

      if (changedProperties.has('currentPage')) {
        this.setState('currentPage', this.currentPage);
      }

      if (changedProperties.has('searchValue')) {
        this.setState('searchValue', this.searchValue);
        this.setGlobalState(`table-${this.__componentName}-search`, this.searchValue);
      }

      if (changedProperties.has('sort')) {
        this.setState('sort', this.sort);
        this.setGlobalState(`table-${this.__componentName}-sort`, this.sort);
      }

      if (changedProperties.has('filters')) {
        this.setState('filters', this.filters);
        this.setGlobalState(`table-${this.__componentName}-filters`, this.filters);
      }

      if (changedProperties.has('data') || changedProperties.has('searchValue') || changedProperties.has('filters')) {
        this._filterData();
      }

      if (changedProperties.has('filteredData') || changedProperties.has('pagination') || changedProperties.has('sort')) {
        this._paginateData();
      }

      // 虚拟滚动相关更新
      if (changedProperties.has('currentPageData') || changedProperties.has('virtualScroll')) {
        this._updateRowPositions();
      }

      if (changedProperties.has('virtualScroll')) {
        this._updateVirtualScrollState();
      }
    } catch (error) {
      this.errorHandler.handle(error as Error, 'willUpdate', 'high');
      throw error; // 重新抛出，让 Lit 继续处理
    }
  }

  render() {
    try {
      return html`
        <div class="data-table">
          <slot name="header">
            ${this._renderToolbar()}
          </slot>

          <div class="data-table__table-wrapper">
            ${this.loading ? this._renderLoading() : this._renderTable()}
          </div>

          ${this.pagination ? this._renderPagination() : ''}

          <slot name="footer"></slot>
        </div>
      `;
    } catch (error) {
      this.errorHandler.handle(error as Error, 'render', 'critical');

      // 渲染错误回退UI
      return html`
        <div class="data-table">
          <div class="data-table__error">
            <div class="error-icon">⚠️</div>
            <h3>表格渲染错误</h3>
            <p>${this.errorHandler.handle(error as Error).userMessage || '表格组件出现错误，请检查数据格式'}</p>
            <button @click=${() => this.refresh()}>重试</button>
          </div>
        </div>
      `;
    }
  }

  private _renderToolbar() {
    if (!this.searchable && !this.filters?.length) return html``;

    return html`
      <div class="data-table__toolbar">
        <div class="data-table__toolbar-left">
          ${this.searchable ? html`
            <div class="data-table__search">
              <skill-icon name="search"></skill-icon>
              <input
                type="text"
                placeholder="搜索..."
                value="${this.searchValue}"
                @input=${this._handleSearch}
              />
            </div>
          ` : ''}

          ${this.filters && this.filters.length > 0 ? html`
            <div class="data-table__filters">
              ${this.filters.map(filter => this._renderFilter(filter))}
            </div>
          ` : ''}
        </div>

        <div class="data-table__toolbar-right">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }

  private _renderFilter(filter: FilterConfig) {
    const column = this.columns.find(col => col.key === filter.field);
    if (!column) return html``;

    return html`
      <select @change=${(e: Event) => this._handleFilter(filter.field, (e.target as HTMLSelectElement).value)}>
        <option value="">${column.title}</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    `;
  }

  private _renderLoading() {
    return html`
      <div class="data-table__loading">
        <skill-spinner></skill-spinner>
        <span>加载中...</span>
      </div>
    `;
  }

  private _renderTable() {
    if (!this.currentPageData.length) {
      return html`
        <div class="data-table__empty">
          <slot name="empty">
            <skill-icon name="inbox" size="lg"></skill-icon>
            <p>暂无数据</p>
          </slot>
        </div>
      `;
    }

    // 检查是否启用虚拟滚动
    if (this.virtualScroll?.enabled) {
      return this._renderVirtualTable();
    }

    // 传统表格渲染
    return html`
      <table part="table" class="data-table__table">
        <thead part="header" class="data-table__thead">
          <tr>
            ${this.selectable ? html`
              <th class="data-table__selection">
                <input
                  type="checkbox"
                  class="data-table__checkbox"
                  .checked=${this.selectedRows.length === this.currentPageData.length}
                  @change=${this._handleSelectAll}
                />
              </th>
            ` : ''}

            ${this.columns.filter(col => col.visible !== false).map(column => html`
              <th
                part="header-cell"
                class="data-table__th ${this._getHeaderClass(column)}"
                style="${column.width ? `width: ${column.width}` : ''}"
                @click=${() => column.sortable && this._handleSort(column.key)}
              >
                ${column.title}
                ${column.sortable ? this._renderSortIcon(column.key) : ''}
              </th>
            `)}
          </tr>
        </thead>

        <tbody part="body" class="data-table__tbody">
          ${this.currentPageData.map((row, index) => this._renderRow(row, index))}
        </tbody>
      </table>
    `;
  }

  /** 虚拟滚动表格渲染 */
  private _renderVirtualTable() {
    const { start, end } = this._getVisibleRange();
    const visibleData = this.currentPageData.slice(start, end + 1);
    const totalHeight = this.currentPageData.length * this.virtualScroll!.rowHeight;

    return html`
      <div class="data-table__virtual-wrapper" part="virtual-wrapper">
        <!-- 固定表头 -->
        <div class="data-table__virtual-header" part="virtual-header">
          <div style="display: flex; align-items: stretch;">
            ${this.selectable ? html`
              <div class="data-table__virtual-selection">
                <input
                  type="checkbox"
                  class="data-table__checkbox"
                  .checked=${this.selectedRows.length === this.currentPageData.length}
                  @change=${this._handleSelectAll}
                />
              </div>
            ` : ''}

            ${this.columns.filter(col => col.visible !== false).map(column => html`
              <div
                part="header-cell"
                class="data-table__th ${this._getHeaderClass(column)}"
                style="${column.width ? `width: ${column.width}` : ''}"
                @click=${() => column.sortable && this._handleSort(column.key)}
              >
                ${column.title}
                ${column.sortable ? this._renderSortIcon(column.key) : ''}
              </div>
            `)}
          </div>
        </div>

        <!-- 虚拟滚动视口 -->
        <div
          class="data-table__virtual-viewport"
          part="virtual-viewport"
          style="height: ${this.virtualScroll!.containerHeight}"
          @scroll=${this._handleVirtualScroll}
        >
          <!-- 内容容器 -->
          <div
            class="data-table__virtual-content"
            part="virtual-content"
            style="height: ${totalHeight}px"
          >
            ${visibleData.map((row, index) => {
              const actualIndex = start + index;
              const top = this._rowPositions[actualIndex];
              return this._renderVirtualRow(row, actualIndex, top);
            })}
          </div>
        </div>
      </div>
    `;
  }

  /** 虚拟滚动行渲染 */
  private _renderVirtualRow(row: any, index: number, top: number) {
    const isSelected = this.selectedRows.some(selected => selected[this.rowKey] === row[this.rowKey]);

    return html`
      <div
        part="virtual-row"
        class="data-table__virtual-row ${isSelected ? 'data-table__virtual-row--selected' : ''}"
        style="top: ${top}px; height: ${this.virtualScroll!.rowHeight}px"
        @click=${() => this._handleRowSelect(row)}
      >
        ${this.selectable ? html`
          <div class="data-table__virtual-selection">
            <input
              type="checkbox"
              class="data-table__checkbox"
              .checked=${isSelected}
              @change=${(e: Event) => {
                e.stopPropagation();
                this._handleRowSelect(row);
              }}
            />
          </div>
        ` : ''}

        ${this.columns.filter(col => col.visible !== false).map(column => html`
          <div
            part="virtual-cell"
            class="data-table__virtual-cell ${this._getVirtualCellClass(column)}"
            style="${column.width ? `width: ${column.width}` : ''}"
          >
            ${this._renderCellValue(row, column, index)}
          </div>
        `)}
      </div>
    `;
  }

  private _renderRow(row: any, index: number) {
    const isSelected = this.selectedRows.some(selected => selected[this.rowKey] === row[this.rowKey]);
    const rowClass = {
      'data-table__tr': true,
      'data-table__tr--selected': isSelected,
      'data-table__tr--striped': this.striped && index % 2 === 1
    };

    return html`
      <tr
        part="row"
        class="${this._classMap(rowClass)}"
        @click=${() => this._handleRowSelect(row)}
      >
        ${this.selectable ? html`
          <td class="data-table__selection">
            <input
              type="checkbox"
              class="data-table__checkbox"
              .checked=${isSelected}
              @change=${(e: Event) => {
                e.stopPropagation();
                this._handleRowSelect(row);
              }}
            />
          </td>
        ` : ''}

        ${this.columns.filter(col => col.visible !== false).map(column => html`
          <td
            part="cell"
            class="data-table__td ${this._getCellClass(column)}"
            @click=${(e: Event) => e.stopPropagation()}
          >
            ${this._renderCellValue(row, column, index)}
          </td>
        `)}
      </tr>
    `;
  }

  private _renderCellValue(row: any, column: TableColumn, index: number) {
    const value = row[column.key];

    if (column.render) {
      return column.render(value, row, index);
    }

    // 默认渲染逻辑
    switch (column.key) {
      case 'status':
        return this._renderStatus(value);
      case 'actions':
        return this._renderActions(row);
      default:
        return value || '-';
    }
  }

  private _renderStatus(status: string) {
    const statusClass = {
      'data-table__status': true,
      'data-table__status--active': status === 'active',
      'data-table__status--inactive': status === 'inactive',
      'data-table__status--pending': status === 'pending'
    };

    return html`
      <span class="${this._classMap(statusClass)}">
        ${status === 'active' ? '✓' : '○'} ${status}
      </span>
    `;
  }

  private _renderActions(row: any) {
    return html`
      <div class="data-table__actions">
        <skill-button size="xs" variant="ghost" @click=${() => this._handleAction('view', row)}>
          查看
        </skill-button>
        <skill-button size="xs" variant="ghost" @click=${() => this._handleAction('edit', row)}>
          编辑
        </skill-button>
        <skill-button size="xs" variant="ghost" @click=${() => this._handleAction('delete', row)}>
          删除
        </skill-button>
      </div>
    `;
  }

  private _renderSortIcon(field: string) {
    const isActive = this.sort?.field === field;
    const direction = this.sort?.direction || 'asc';

    return html`
      <span
        class="data-table__sort-icon ${isActive ? 'data-table__sort-icon--active' : ''}"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          ${direction === 'asc' ? html`
            <path d="M6 2 L10 8 L8 8 L8 10 L4 10 L4 8 L2 8 Z"/>
          ` : html`
            <path d="M6 10 L2 4 L4 4 L4 2 L8 2 L8 4 L10 4 Z"/>
          `}
        </svg>
      </span>
    `;
  }

  private _renderPagination() {
    if (!this.pagination) return html``;

    const { current, pageSize, total, showTotal = true } = this.pagination;
    const startIndex = (current - 1) * pageSize + 1;
    const endIndex = Math.min(current * pageSize, total);

    return html`
      <div class="data-table__pagination">
        ${showTotal ? html`
          <div class="data-table__pagination-info">
            显示 ${startIndex}-${endIndex} 条，共 ${total} 条
          </div>
        ` : ''}

        <div class="data-table__pagination-controls">
          <skill-pagination
            .current="${current}"
            .pageSize="${pageSize}"
            .total="${total}"
            @skill-change=${this._handlePageChange}
          ></skill-pagination>
        </div>
      </div>
    `;
  }

  private _getHeaderClass(column: TableColumn) {
    return [
      column.sortable ? 'data-table__th--sortable' : '',
      column.align === 'center' ? 'data-table__th--center' : '',
      column.align === 'right' ? 'data-table__th--right' : ''
    ].filter(Boolean).join(' ');
  }

  private _getCellClass(column: TableColumn) {
    return [
      column.align === 'center' ? 'data-table__td--center' : '',
      column.align === 'right' ? 'data-table__td--right' : ''
    ].filter(Boolean).join(' ');
  }

  private _classMap(classes: Record<string, boolean>) {
    return Object.entries(classes)
      .filter(([, enabled]) => enabled)
      .map(([className]) => className)
      .join(' ');
  }

  private _filterData() {
    let filtered = [...this.data];

    // 搜索过滤
    if (this.searchValue) {
      const searchLower = this.searchValue.toLowerCase();
      filtered = filtered.filter(row => {
        return this.columns.some(column => {
          const value = row[column.key];
          return value && String(value).toLowerCase().includes(searchLower);
        });
      });
    }

    // 自定义筛选
    if (this.filters?.length) {
      filtered = filtered.filter(row => {
        return this.filters!.every(filter => {
          const value = row[filter.field];
          if (!filter.value) return true;

          switch (filter.operator) {
            case 'contains':
              return String(value).toLowerCase().includes(filter.value.toLowerCase());
            case 'eq':
              return value === filter.value;
            case 'ne':
              return value !== filter.value;
            default:
              return true;
          }
        });
      });
    }

    this.filteredData = filtered;
  }

  private _paginateData() {
    if (!this.pagination) {
      this.currentPageData = [...this.filteredData];
      return;
    }

    const { current, pageSize } = this.pagination;
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    this.currentPageData = this.filteredData.slice(startIndex, endIndex);
  }

  private _handleSearch(e: Event) {
    const target = e.target as HTMLInputElement;
    this.searchValue = target.value;

    this.dispatchEvent(new CustomEvent('skill-search', {
      bubbles: true,
      composed: true,
      detail: { value: this.searchValue }
    }));
  }

  private _handleFilter(field: string, value: any) {
    const newFilters = this.filters?.filter(f => f.field !== field) || [];
    if (value) {
      newFilters.push({ field, value });
    }
    this.filters = newFilters;

    this.dispatchEvent(new CustomEvent('skill-filter-change', {
      bubbles: true,
      composed: true,
      detail: { field, value, filters: this.filters }
    }));
  }

  private _handleSort(field: string) {
    const currentDirection = this.sort?.field === field ? this.sort.direction : 'asc';
    const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';

    this.sort = { field, direction: newDirection };

    this.dispatchEvent(new CustomEvent('skill-sort-change', {
      bubbles: true,
      composed: true,
      detail: { field, direction: newDirection }
    }));
  }

  private _handleRowSelect(row: any) {
    const index = this.selectedRows.findIndex(selected => selected[this.rowKey] === row[this.rowKey]);

    if (index > -1) {
      this.selectedRows.splice(index, 1);
    } else {
      this.selectedRows.push(row);
    }

    this.selectedRows = [...this.selectedRows];

    this.dispatchEvent(new CustomEvent('skill-select', {
      bubbles: true,
      composed: true,
      detail: { selectedRows: this.selectedRows, row }
    }));
  }

  private _handleSelectAll(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      this.selectedRows = [...this.currentPageData];
    } else {
      this.selectedRows = [];
    }

    this.selectedRows = [...this.selectedRows];

    this.dispatchEvent(new CustomEvent('skill-select-all', {
      bubbles: true,
      composed: true,
      detail: { selectedRows: this.selectedRows }
    }));
  }

  private _handlePageChange(e: CustomEvent) {
    if (!this.pagination) return;

    this.pagination = {
      ...this.pagination,
      current: e.detail.current,
      pageSize: e.detail.pageSize
    };

    this.dispatchEvent(new CustomEvent('skill-page-change', {
      bubbles: true,
      composed: true,
      detail: e.detail
    }));
  }

  private _handleAction(action: string, row: any) {
    this.dispatchEvent(new CustomEvent('skill-action', {
      bubbles: true,
      composed: true,
      detail: { action, row }
    }));
  }

  /**
   * 清空选择
   */
  public clearSelection() {
    this.selectedRows = [];
  }

  /**
   * 全选
   */
  public selectAll() {
    this.selectedRows = [...this.currentPageData];
  }

  /**
   * 反选
   */
  public invertSelection() {
    const newSelection = this.currentPageData.filter(row =>
      !this.selectedRows.some(selected => selected[this.rowKey] === row[this.rowKey])
    );
    this.selectedRows = newSelection;
  }

  /** 虚拟滚动核心方法 */

  /** 更新虚拟滚动状态 */
  private _updateVirtualScrollState() {
    if (!this.virtualScroll?.enabled) return;

    // 更新视口高度
    this._viewportHeight = parseInt(this.virtualScroll.containerHeight) || 400;

    // 初始化滚动位置
    this._scrollTop = 0;
    this._visibleRange = { start: 0, end: 0 };
  }

  /** 更新行位置缓存 */
  private _updateRowPositions() {
    if (!this.virtualScroll?.enabled) return;

    const rowHeight = this.virtualScroll.rowHeight;
    const rowCount = this.currentPageData.length;

    this._rowPositions = Array.from({ length: rowCount }, (_, index) => index * rowHeight);
  }

  /** 获取可见范围 */
  private _getVisibleRange() {
    if (!this.virtualScroll?.enabled) {
      return { start: 0, end: this.currentPageData.length - 1 };
    }

    const rowHeight = this.virtualScroll.rowHeight;
    const bufferSize = this.virtualScroll.bufferSize || 5;

    const startIndex = Math.floor(this._scrollTop / rowHeight);
    const endIndex = Math.floor((this._scrollTop + this._viewportHeight) / rowHeight);

    // 添加缓冲区
    const bufferedStartIndex = Math.max(0, startIndex - bufferSize);
    const bufferedEndIndex = Math.min(this.currentPageData.length - 1, endIndex + bufferSize);

    return {
      start: bufferedStartIndex,
      end: bufferedEndIndex
    };
  }

  /** 处理虚拟滚动 */
  private _handleVirtualScroll(event: Event) {
    const target = event.target as HTMLElement;
    this._scrollTop = target.scrollTop;

    const { start, end } = this._getVisibleRange();
    this._visibleRange = { start, end };

    // 触发滚动事件
    this.dispatchEvent(new CustomEvent('skill-scroll', {
      bubbles: true,
      composed: true,
      detail: {
        scrollTop: this._scrollTop,
        startIndex: start,
        endIndex: end,
        totalItems: this.currentPageData.length
      }
    }));
  }

  /** 获取虚拟单元格样式类 */
  private _getVirtualCellClass(column: TableColumn): string {
    const classes = [];

    if (column.align === 'center') {
      classes.push('data-table__virtual-cell--center');
    } else if (column.align === 'right') {
      classes.push('data-table__virtual-cell--right');
    }

    return classes.join(' ');
  }

  /**
   * 连接状态管理器
   */
  protected connectStateManager(): void {
    // 恢复持久化的状态
    this.restorePersistedState();

    // 订阅全局状态变化
    this.subscribeGlobalState(`table-${this.__componentName}-search`, (event: any) => {
      if (event.source !== this.__componentName) {
        this.searchValue = event.newValue;
      }
    });

    this.subscribeGlobalState(`table-${this.__componentName}-sort`, (event: any) => {
      if (event.source !== this.__componentName) {
        this.sort = event.newValue;
      }
    });

    this.subscribeGlobalState(`table-${this.__componentName}-filters`, (event: any) => {
      if (event.source !== this.__componentName) {
        this.filters = event.newValue;
      }
    });
  }

  /**
   * 获取初始状态
   */
  protected getInitialState(): Record<string, any> {
    return {
      selectedRows: [],
      currentPage: 1,
      searchValue: '',
      sort: null,
      filters: []
    };
  }

  /**
   * 恢复持久化状态
   */
  private restorePersistedState(): void {
    const initialState = this.getInitialState();

    Object.entries(initialState).forEach(([key, defaultValue]) => {
      const persistedValue = this.getState(key);
      if (persistedValue !== undefined) {
        (this as any)[key] = persistedValue;
      } else {
        (this as any)[key] = defaultValue;
      }
    });
  }

  /**
   * 批量更新状态（带状态管理）
   */
  public updateState(updates: Partial<{
    selectedRows: any[];
    currentPage: number;
    searchValue: string;
    sort: any;
    filters: any[];
  }>): void {
    this.setStateMultiple(updates as Record<string, any>);

    // 更新对应的属性
    Object.entries(updates).forEach(([key, value]) => {
      (this as any)[key] = value;
    });

    this.requestUpdate();
  }

  /**
   * 同步状态到全局状态
   */
  private syncToGlobalState(): void {
    this.setGlobalState(`table-${this.__componentName}-search`, this.searchValue);
    this.setGlobalState(`table-${this.__componentName}-sort`, this.sort);
    this.setGlobalState(`table-${this.__componentName}-filters`, this.filters);
  }

  /**
   * 刷新数据
   */
  public refresh() {
    this._filterData();
    this._paginateData();

    this.dispatchEvent(new CustomEvent('skill-refresh', {
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skill-table': SkillTable;
  }
}