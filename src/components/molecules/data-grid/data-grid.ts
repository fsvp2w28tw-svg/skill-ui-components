import { LitElement, html, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { dataGridStyles } from './data-grid.styles.js';
import type {
  DataGridColumn,
  DataGridConfig,
  DataGridSort,
  DataGridFilter,
  DataGridPagination,
  DataGridEvent,
  GridCellEditor
} from './data-grid.types.js';

/**
 * Data Grid - 高级数据表格组件
 *
 * @element skill-data-grid
 *
 * @example
 * ```html
 * <skill-data-grid
 *   .config="${gridConfig}"
 *   @select="${handleSelect}"
 *   @sort="${handleSort}"
 * ></skill-data-grid>
 * ```
 */
@customElement('skill-data-grid')
export class SkillDataGrid extends LitElement {
  static styles = dataGridStyles;

  @property({ type: Object })
  config: DataGridConfig = {
    columns: [],
    data: []
  };

  @state()
  private selectedRows: any[] = [];

  @state()
  private sortConfig?: DataGridSort;

  @state()
  private filterConfig: DataGridFilter[] = [];

  @state()
  private paginationConfig: DataGridPagination = {
    page: 1,
    pageSize: 20,
    total: 0
  };

  @state()
  private editingCell?: { rowIndex: number; columnKey: string; value: any };

  @state()
  private expandedRows = new Set<string | number>();

  @state()
  private loading = false;

  @state()
  private visibleData: any[] = [];

  /**
   * 获取行键值
   */
  private getRowKey(row: any, index: number): string | number {
    return row.id || row.key || index;
  }

  /**
   * 处理排序
   */
  private handleSort(columnKey: string) {
    const column = this.config.columns.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    let direction: 'asc' | 'desc' = 'asc';
    if (this.sortConfig?.key === columnKey) {
      direction = this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }

    this.sortConfig = { key: columnKey, direction };
    this.sortData();

    this.dispatchEvent(new CustomEvent('sort', {
      detail: {
        type: 'sort',
        sort: this.sortConfig,
        data: this.visibleData
      } as DataGridEvent
    }));
  }

  /**
   * 排序数据
   */
  private sortData() {
    if (!this.sortConfig) return;

    const { key, direction } = this.sortConfig;
    this.visibleData.sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      if (aVal === bVal) return 0;

      let comparison = 0;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return direction === 'desc' ? -comparison : comparison;
    });
  }

  /**
   * 处理行选择
   */
  private handleRowSelect(row: any, rowIndex: number, multiSelect = false) {
    const rowKey = this.getRowKey(row, rowIndex);
    const isSelected = this.selectedRows.some(r => this.getRowKey(r, 0) === rowKey);

    if (!this.config.selectable) return;

    if (this.config.selectable.type === 'single') {
      this.selectedRows = isSelected ? [] : [row];
    } else if (this.config.selectable.type === 'multiple' || this.config.selectable.type === 'checkbox') {
      if (multiSelect) {
        if (isSelected) {
          this.selectedRows = this.selectedRows.filter(r => this.getRowKey(r, 0) !== rowKey);
        } else {
          this.selectedRows = [...this.selectedRows, row];
        }
      } else {
        this.selectedRows = [row];
      }
    }

    this.dispatchEvent(new CustomEvent('select', {
      detail: {
        type: 'select',
        row,
        selection: {
          ...this.config.selectable,
          selectedRows: this.selectedRows,
          selectedKeys: this.selectedRows.map(r => this.getRowKey(r, 0))
        }
      } as DataGridEvent
    }));
  }

  /**
   * 处理全选
   */
  private handleSelectAll(checked: boolean) {
    if (!this.config.selectable || (this.config.selectable.type !== 'checkbox' && this.config.selectable.type !== 'multiple')) {
      return;
    }

    this.selectedRows = checked ? [...this.visibleData] : [];

    this.dispatchEvent(new CustomEvent('select-all', {
      detail: {
        type: 'select-all',
        rows: this.visibleData,
        selection: {
          ...this.config.selectable,
          selectedRows: this.selectedRows,
          selectedKeys: this.selectedRows.map(r => this.getRowKey(r, 0))
        }
      } as DataGridEvent
    }));
  }

  /**
   * 处理行展开/折叠
   */
  private handleRowExpand(row: any, rowIndex: number) {
    const rowKey = this.getRowKey(row, rowIndex);
    const newExpanded = new Set(this.expandedRows);

    if (newExpanded.has(rowKey)) {
      newExpanded.delete(rowKey);
    } else {
      newExpanded.add(rowKey);
    }

    this.expandedRows = newExpanded;

    this.dispatchEvent(new CustomEvent('expand', {
      detail: {
        type: 'expand',
        row,
        expanded: newExpanded.has(rowKey)
      } as DataGridEvent
    }));
  }

  /**
   * 开始编辑单元格
   */
  private startCellEdit(rowIndex: number, columnKey: string, value: any) {
    this.editingCell = { rowIndex, columnKey, value };

    this.dispatchEvent(new CustomEvent('edit', {
      detail: {
        type: 'edit',
        data: this.visibleData[rowIndex],
        column: this.config.columns.find(col => col.key === columnKey),
        value
      } as DataGridEvent
    }));
  }

  /**
   * 保存编辑的单元格
   */
  private saveCellEdit() {
    if (!this.editingCell) return;

    const { rowIndex, columnKey, value } = this.editingCell;
    const row = this.visibleData[rowIndex];
    const oldValue = row[columnKey];

    row[columnKey] = value;

    this.editingCell = undefined;

    this.dispatchEvent(new CustomEvent('edit', {
      detail: {
        type: 'edit',
        data: row,
        column: this.config.columns.find(col => col.key === columnKey),
        value,
        oldValue
      } as DataGridEvent
    }));
  }

  /**
   * 渲染单元格内容
   */
  private renderCellValue(value: any, row: any, column: DataGridColumn, _rowIndex: number) {
    const { type, render, format } = column;

    // 自定义渲染器
    if (render) {
      return render(value, row, column);
    }

    // 格式化器
    if (format) {
      value = format(value, row);
    }

    // 类型特定的渲染
    switch (type) {
      case 'boolean':
        return value ? '是' : '否';
      case 'date':
        return value ? new Date(value).toLocaleDateString() : '';
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value;
      case 'select':
        const option = column.filterOptions?.find(opt => opt.value === value);
        return option ? option.label : value;
      default:
        return value ?? '';
    }
  }

  /**
   * 渲染单元格编辑器
   */
  private renderCellEditor(column: DataGridColumn, value: any) {
    // 处理 boolean 类型到 checkbox 的映射
    let editorType: GridCellEditor['type'];
    if (column.type === 'boolean') {
      editorType = 'checkbox';
    } else if (column.type === 'input' || column.type === 'textarea' ||
               column.type === 'select' || column.type === 'number' ||
               column.type === 'date' || column.type === 'custom') {
      editorType = column.type;
    } else {
      editorType = 'input';
    }

    const editor: GridCellEditor = {
      type: editorType,
      // 只展开 GridCellEditor 接口中存在的属性
      ...(column.options && { options: column.options }),
      ...(column.validation && { validation: column.validation }),
      ...(column.render && { render: column.render })
    };

    switch (editor.type) {
      case 'textarea':
        return html`
          <textarea
            class="cell-editor"
            .value="${value || ''}"
            @input="${(e: InputEvent) => {
              if (this.editingCell) {
                this.editingCell.value = (e.target as HTMLTextAreaElement).value;
              }
            }}"
            @blur="${this.saveCellEdit}"
            @keydown="${(e: KeyboardEvent) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.saveCellEdit();
              }
            }}"
          ></textarea>
        `;
      case 'select':
        return html`
          <select
            class="cell-editor"
            .value="${value || ''}"
            @input="${(e: InputEvent) => {
              if (this.editingCell) {
                this.editingCell.value = (e.target as HTMLSelectElement).value;
              }
            }}"
            @blur="${this.saveCellEdit}"
          >
            <option value="">请选择</option>
            ${editor.options?.map(option => html`
              <option value="${option.value}">${option.label}</option>
            `)}
          </select>
        `;
      case 'number':
        return html`
          <input
            type="number"
            class="cell-editor"
            .value="${value || ''}"
            @input="${(e: InputEvent) => {
              if (this.editingCell) {
                this.editingCell.value = Number((e.target as HTMLInputElement).value);
              }
            }}"
            @blur="${this.saveCellEdit}"
            @keydown="${(e: KeyboardEvent) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                this.saveCellEdit();
              }
            }}"
          >
        `;
      case 'checkbox':
        return html`
          <input
            type="checkbox"
            class="cell-editor selection-checkbox"
            .checked="${!!value}"
            @change="${(e: InputEvent) => {
              if (this.editingCell) {
                this.editingCell.value = (e.target as HTMLInputElement).checked;
              }
            }}"
            @blur="${this.saveCellEdit}"
          >
        `;
      default:
        return html`
          <input
            type="text"
            class="cell-editor"
            .value="${value || ''}"
            @input="${(e: InputEvent) => {
              if (this.editingCell) {
                this.editingCell.value = (e.target as HTMLInputElement).value;
              }
            }}"
            @blur="${this.saveCellEdit}"
            @keydown="${(e: KeyboardEvent) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                this.saveCellEdit();
              }
            }}"
          >
        `;
    }
  }

  /**
   * 渲染表头
   */
  private renderHeader() {
    const { columns, selectable, expandable } = this.config;

    return html`
      <thead class="grid-header">
        <tr class="grid-header-row">
          ${selectable?.type === 'checkbox' ? html`
            <th class="grid-header-cell selection-column">
              <input
                type="checkbox"
                class="selection-checkbox"
                .checked="${this.selectedRows.length === this.visibleData.length && this.visibleData.length > 0}"
                @change="${(e: InputEvent) => this.handleSelectAll((e.target as HTMLInputElement).checked)}"
              >
            </th>
          ` : ''}

          ${expandable ? html`
            <th class="grid-header-cell expand-column"></th>
          ` : ''}

          ${columns.map(column => {
            const sortIndicator = this.sortConfig?.key === column.key
              ? this.sortConfig.direction === 'asc' ? '↑' : '↓'
              : '';

            return html`
              <th
                class="grid-header-cell align-${column.align || 'left'} ${column.sortable ? 'sortable' : ''} ${column.headerClass || ''}"
                style="${column.width ? `width: ${typeof column.width === 'number' ? column.width + 'px' : column.width};` : ''}"
                @click="${() => this.handleSort(column.key)}"
              >
                ${column.title}
                ${column.sortable ? html`<span class="sort-indicator ${this.sortConfig?.key === column.key ? 'active' : ''}">${sortIndicator}</span>` : ''}
                ${column.resizable ? html`
                  <div class="grid-header-resize"></div>
                ` : ''}
              </th>
            `;
          })}

          ${this.config.rowActions && this.config.rowActions.length > 0 ? html`
            <th class="grid-header-cell" style="width: 120px;">操作</th>
          ` : ''}
        </tr>
      </thead>
    `;
  }

  /**
   * 渲染行
   */
  private renderRows() {
    if (this.visibleData.length === 0) {
      return this.renderEmptyState();
    }

    return html`
      <tbody class="grid-body">
        ${this.visibleData.map((row, rowIndex) => {
          const rowKey = this.getRowKey(row, rowIndex);
          const isSelected = this.selectedRows.some(r => this.getRowKey(r, 0) === rowKey);
          const isExpanded = this.expandedRows.has(rowKey);
          const rowClass = [
            'grid-row',
            isSelected ? 'selected' : '',
            this.config.striped && rowIndex % 2 === 1 ? 'striped' : '',
            this.config.hoverable ? 'hoverable' : ''
          ].filter(Boolean).join(' ');

          return html`
            <tr
              class="${rowClass}"
              @click="${(e: MouseEvent) => this.handleRowSelect(row, rowIndex, e.ctrlKey || e.metaKey)}"
            >
              ${this.config.selectable?.type === 'checkbox' ? html`
                <td class="grid-cell selection-column">
                  <input
                    type="checkbox"
                    class="selection-checkbox"
                    .checked="${isSelected}"
                    @click="${(e: MouseEvent) => e.stopPropagation()}"
                    @change="${(_e: InputEvent) => this.handleRowSelect(row, rowIndex, true)}"
                  >
                </td>
              ` : ''}

              ${this.config.expandable ? html`
                <td class="grid-cell expand-column">
                  <span
                    class="expand-icon ${isExpanded ? 'expanded' : ''}"
                    @click="${(e: MouseEvent) => {
                      e.stopPropagation();
                      this.handleRowExpand(row, rowIndex);
                    }}"
                  >
                    ▶
                  </span>
                </td>
              ` : ''}

              ${this.config.columns.map(column => {
                const value = row[column.key];
                const isEditing = this.editingCell?.rowIndex === rowIndex &&
                               this.editingCell?.columnKey === column.key;
                const cellClass = [
                  'grid-cell',
                  `align-${column.align || 'left'}`,
                  column.editable ? 'editable' : '',
                  isEditing ? 'editing' : '',
                  typeof column.cellClass === 'function' ? column.cellClass(row, column) : column.cellClass || ''
                ].filter(Boolean).join(' ');

                return html`
                  <td
                    class="${cellClass}"
                    style="${column.width ? `width: ${typeof column.width === 'number' ? column.width + 'px' : column.width};` : ''}"
                    @dblclick="${() => {
                      if (column.editable) {
                        this.startCellEdit(rowIndex, column.key, value);
                      }
                    }}"
                  >
                    ${isEditing ? this.renderCellEditor(column, value) : this.renderCellValue(value, row, column, rowIndex)}
                  </td>
                `;
              })}

              ${this.config.rowActions && this.config.rowActions.length > 0 ? html`
                <td class="grid-cell">
                  <div class="row-actions">
                    ${this.config.rowActions.map(action => {
                      const visible = action.visible ? action.visible(row) : true;
                      if (!visible) return nothing;

                      return html`
                        <button
                          class="row-action-btn ${action.type || 'secondary'}"
                          @click="${(e: MouseEvent) => {
                            e.stopPropagation();
                            action.onClick(row);
                          }}"
                        >
                          ${action.label}
                        </button>
                      `;
                    })}
                  </div>
                </td>
              ` : ''}
            </tr>

            ${this.config.expandable && isExpanded ? html`
              <tr>
                <td colspan="${this.config.columns.length + (this.config.selectable ? 1 : 0) + (this.config.expandable ? 1 : 0) + (this.config.rowActions ? 1 : 0)}" class="expand-content">
                  <slot name="expand-${rowKey}" data="${row}">
                    <div>展开内容：${JSON.stringify(row, null, 2)}</div>
                  </slot>
                </td>
              </tr>
            ` : ''}
          `;
        })}
      </tbody>
    `;
  }

  /**
   * 渲染空状态
   */
  private renderEmptyState() {
    return html`
      <tbody>
        <tr>
          <td colspan="${this.config.columns.length + (this.config.selectable ? 1 : 0) + (this.config.expandable ? 1 : 0) + (this.config.rowActions ? 1 : 0)}" class="empty-state">
            <div class="empty-icon">📋</div>
            <div class="empty-text">暂无数据</div>
            <div class="empty-description">没有符合条件的数据</div>
            ${this.config.empty?.action ? html`
              <button @click="${this.config.empty.action.onClick}">
                ${this.config.empty.action.text}
              </button>
            ` : ''}
          </td>
        </tr>
      </tbody>
    `;
  }

  /**
   * 渲染分页
   */
  private renderPagination() {
    if (!this.config.pagination) return nothing;

    const { page, pageSize, total, showSizeChanger, showQuickJumper, showTotal, pageSizeOptions } = this.config.pagination;

    return html`
      <div class="grid-footer">
        ${showTotal !== false ? html`
          <div class="pagination-info">
            第 ${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, total)} 条，共 ${total} 条
          </div>
        ` : ''}

        <skill-pagination
          .page="${page}"
          .pageSize="${pageSize}"
          .total="${total}"
          ?showSizeChanger="${showSizeChanger}"
          ?showQuickJumper="${showQuickJumper}"
          .pageSizeOptions="${pageSizeOptions || [10, 20, 50, 100]}"
          @page-change="${(e: CustomEvent) => {
            this.paginationConfig.page = e.detail.page;
            this.paginationConfig.pageSize = e.detail.pageSize;
            this.updateVisibleData();

            this.dispatchEvent(new CustomEvent('page-change', {
              detail: {
                type: 'page-change',
                pagination: this.paginationConfig
              } as DataGridEvent
            }));
          }}"
        ></skill-pagination>
      </div>
    `;
  }

  /**
   * 更新可见数据
   */
  private updateVisibleData() {
    let data = [...this.config.data];

    // 应用筛选
    if (this.filterConfig.length > 0) {
      data = data.filter(row => {
        return this.filterConfig.every(filter => {
          const value = row[filter.key];
          switch (filter.operator) {
            case 'contains':
              return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
            case 'eq':
              return value === filter.value;
            case 'gt':
              return Number(value) > Number(filter.value);
            case 'gte':
              return Number(value) >= Number(filter.value);
            case 'lt':
              return Number(value) < Number(filter.value);
            case 'lte':
              return Number(value) <= Number(filter.value);
            default:
              return true;
          }
        });
      });
    }

    // 应用排序
    this.sortData();

    // 应用分页
    if (this.config.pagination && this.config.pagination.page && this.config.pagination.pageSize) {
      const { page, pageSize } = this.config.pagination;
      const start = (page - 1) * pageSize;
      data = data.slice(start, start + pageSize);
    }

    this.visibleData = data;
  }

  /**
   * 组件属性变化时更新数据
   */
  protected willUpdate() {
    this.updateVisibleData();
  }

  render() {
    const gridClass = [
      'data-grid',
      this.config.bordered ? 'bordered' : '',
      this.config.striped ? 'striped' : '',
      this.config.hoverable ? 'hoverable' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class="${gridClass}" style="${this.config.height ? `height: ${typeof this.config.height === 'number' ? this.config.height + 'px' : this.config.height};` : ''}">
        <table class="grid-table">
          ${this.renderHeader()}
          ${this.renderRows()}
        </table>

        ${this.renderPagination()}

        ${this.loading ? html`
          <div class="loading-overlay">
            <skill-spinner></skill-spinner>
          </div>
        ` : ''}
      </div>
    `;
  }
}