import { css } from 'lit';

export const dataGridStyles = css`
  :host {
    display: block;
    width: 100%;
    --grid-border-color: #e8e8e8;
    --grid-header-bg: #fafafa;
    --grid-hover-bg: #f5f5f5;
    --grid-selected-bg: #e6f7ff;
    --grid-striped-bg: #fafafa;
    --grid-text-color: #333;
    --grid-header-text: #666;
    --grid-border-radius: 6px;
    --grid-cell-padding: 12px 8px;
    --grid-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  }

  .data-grid {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--grid-border-color);
    border-radius: var(--grid-border-radius);
    background: white;
    box-shadow: var(--grid-shadow);
  }

  .data-grid.bordered {
    border: 1px solid var(--grid-border-color);
  }

  .data-grid.bordered .grid-row,
  .data-grid.bordered .grid-header-cell {
    border-right: 1px solid var(--grid-border-color);
  }

  .grid-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  .grid-header {
    background: var(--grid-header-bg);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .grid-header-row {
    height: var(--header-height, 40px);
  }

  .grid-header-cell {
    padding: var(--grid-cell-padding);
    font-weight: 600;
    color: var(--grid-header-text);
    position: relative;
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .grid-header-cell.align-left {
    text-align: left;
  }

  .grid-header-cell.align-center {
    text-align: center;
  }

  .grid-header-cell.align-right {
    text-align: right;
  }

  .grid-header-cell.sortable {
    cursor: pointer;
    padding-right: 24px;
  }

  .grid-header-cell.sortable:hover {
    background: #f0f0f0;
  }

  .grid-header-resize {
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    cursor: col-resize;
    background: transparent;
    transition: background 0.2s;
  }

  .grid-header-resize:hover {
    background: var(--grid-border-color);
  }

  .grid-header-resize.active {
    background: var(--primary-color, #1890ff);
  }

  .sort-indicator {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--grid-header-text);
    font-size: 12px;
  }

  .sort-indicator.active {
    color: var(--primary-color, #1890ff);
  }

  .grid-body {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .grid-row {
    height: var(--row-height, 40px);
    transition: background-color 0.2s;
    cursor: pointer;
  }

  .grid-row:hover {
    background: var(--grid-hover-bg);
  }

  .grid-row.selected {
    background: var(--grid-selected-bg);
  }

  .grid-row.striped:nth-child(even) {
    background: var(--grid-striped-bg);
  }

  .grid-cell {
    padding: var(--grid-cell-padding);
    color: var(--grid-text-color);
    border-bottom: 1px solid var(--grid-border-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .grid-cell.align-left {
    text-align: left;
  }

  .grid-cell.align-center {
    text-align: center;
  }

  .grid-cell.align-right {
    text-align: right;
  }

  .grid-cell.editable {
    cursor: text;
    padding: 4px;
  }

  .grid-cell.editable:hover {
    background: #f0f9ff;
  }

  .grid-cell.editing {
    padding: 0;
  }

  .cell-editor {
    width: 100%;
    height: 100%;
    border: 1px solid var(--primary-color, #1890ff);
    border-radius: 4px;
    padding: 4px 8px;
    font: inherit;
    background: white;
  }

  .cell-editor:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  /* 选择框样式 */
  .selection-column {
    width: 40px;
    text-align: center;
  }

  .selection-checkbox {
    margin: 0;
  }

  /* 行操作按钮 */
  .row-actions {
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: center;
  }

  .row-action-btn {
    padding: 2px 6px;
    font-size: 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    background: transparent;
    border: 1px solid transparent;
  }

  .row-action-btn:hover {
    background: var(--grid-hover-bg);
  }

  .row-action-btn.primary {
    color: var(--primary-color, #1890ff);
  }

  .row-action-btn.danger {
    color: var(--danger-color, #ff4d4f);
  }

  .row-action-btn.warning {
    color: var(--warning-color, #faad14);
  }

  /* 展开行样式 */
  .expand-column {
    width: 30px;
    text-align: center;
  }

  .expand-icon {
    cursor: pointer;
    transition: transform 0.2s;
    font-size: 12px;
  }

  .expand-icon.expanded {
    transform: rotate(90deg);
  }

  .expand-content {
    grid-column: 1 / -1;
    padding: 16px;
    background: #fafafa;
    border-top: 1px solid var(--grid-border-color);
  }

  /* 空状态样式 */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    color: var(--grid-header-text);
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.3;
  }

  .empty-text {
    font-size: 14px;
    margin-bottom: 8px;
  }

  .empty-description {
    font-size: 12px;
    color: #999;
    margin-bottom: 16px;
  }

  /* 加载状态 */
  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }

  /* 分页样式 */
  .grid-footer {
    border-top: 1px solid var(--grid-border-color);
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
  }

  .pagination-info {
    color: var(--grid-header-text);
    font-size: 14px;
  }

  /* 筛选样式 */
  .filter-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border: 1px solid var(--grid-border-color);
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 8px;
    z-index: 100;
    min-width: 200px;
  }

  .filter-input,
  .filter-select {
    width: 100%;
    padding: 4px 8px;
    border: 1px solid var(--grid-border-color);
    border-radius: 4px;
    font-size: 12px;
  }

  .filter-actions {
    display: flex;
    gap: 4px;
    margin-top: 8px;
    justify-content: flex-end;
  }

  /* 右键菜单 */
  .context-menu {
    position: fixed;
    background: white;
    border: 1px solid var(--grid-border-color);
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    padding: 4px 0;
    z-index: 1000;
    min-width: 120px;
  }

  .context-menu-item {
    padding: 8px 16px;
    cursor: pointer;
    font-size: 12px;
    color: var(--grid-text-color);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .context-menu-item:hover {
    background: var(--grid-hover-bg);
  }

  .context-menu-item.disabled {
    color: #ccc;
    cursor: not-allowed;
  }

  .context-menu-divider {
    height: 1px;
    background: var(--grid-border-color);
    margin: 4px 0;
  }

  /* 虚拟滚动 */
  .virtual-viewport {
    position: relative;
    overflow: auto;
  }

  .virtual-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .grid-header-cell,
    .grid-cell {
      padding: 8px 4px;
      font-size: 12px;
    }

    .row-actions {
      flex-direction: column;
      gap: 2px;
    }

    .grid-footer {
      flex-direction: column;
      gap: 8px;
    }
  }

  /* 拖拽样式 */
  .dragging {
    opacity: 0.5;
  }

  .drag-over {
    background: var(--grid-selected-bg);
    border: 2px dashed var(--primary-color, #1890ff);
  }

  /* 固定列样式 */
  .pinned-left {
    position: sticky;
    left: 0;
    z-index: 5;
    background: white;
  }

  .pinned-right {
    position: sticky;
    right: 0;
    z-index: 5;
    background: white;
  }

  /* 汇总行样式 */
  .summary-row {
    background: var(--grid-header-bg);
    font-weight: 600;
  }

  /* 工具提示 */
  .cell-tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 1000;
    pointer-events: none;
    max-width: 300px;
    word-wrap: break-word;
  }
`;