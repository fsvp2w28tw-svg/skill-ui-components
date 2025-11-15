import { css } from 'lit';

/**
 * Skill Filterable List 组件样式
 * 可过滤列表组件，支持搜索、过滤、排序、分页等功能
 */
export const filterableListStyles = css`
  /* ===== 容器样式 ===== */
  .filterable-list__container {
    width: 100%;
    background: var(--skill-gray-0, #ffffff);
    border-radius: var(--skill-radius-lg, 8px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: var(--skill-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
  }

  .filterable-list__container[bordered] {
    border: 1px solid var(--skill-gray-200, #e5e7eb);
  }

  .filterable-list__container[disabled] {
    opacity: 0.6;
    pointer-events: none;
  }

  .filterable-list__container[readonly] {
    pointer-events: none;
  }

  /* ===== 主题样式 ===== */
  .filterable-list__container.theme-light {
    --item-bg: var(--skill-gray-0, #ffffff);
    --item-hover-bg: var(--skill-gray-50, #f9fafb);
    --item-selected-bg: var(--skill-primary-50, #eff6ff);
    --item-border-color: var(--skill-gray-200, #e5e7eb);
    --search-bg: var(--skill-gray-0, #ffffff);
    --filter-bg: var(--skill-gray-50, #f9fafb);
  }

  .filterable-list__container.theme-dark {
    --item-bg: var(--skill-gray-900, #111827);
    --item-hover-bg: var(--skill-gray-800, #1f2937);
    --item-selected-bg: var(--skill-primary-900, #1e3a8a);
    --item-border-color: var(--skill-gray-700, #374151);
    --search-bg: var(--skill-gray-800, #1f2937);
    --filter-bg: var(--skill-gray-800, #1f2937);
    color: var(--skill-gray-100, #f3f4f6);
  }

  .filterable-list__container.theme-auto {
    color: light-dark(var(--skill-gray-900, #111827), var(--skill-gray-100, #f3f4f6));
    --item-bg: light-dark(var(--skill-gray-0, #ffffff), var(--skill-gray-900, #111827));
    --item-hover-bg: light-dark(var(--skill-gray-50, #f9fafb), var(--skill-gray-800, #1f2937));
    --item-selected-bg: light-dark(var(--skill-primary-50, #eff6ff), var(--skill-primary-900, #1e3a8a));
    --item-border-color: light-dark(var(--skill-gray-200, #e5e7eb), var(--skill-gray-700, #374151));
    --search-bg: light-dark(var(--skill-gray-0, #ffffff), var(--skill-gray-800, #1f2937));
    --filter-bg: light-dark(var(--skill-gray-50, #f9fafb), var(--skill-gray-800, #1f2937));
  }

  /* ===== 头部样式 ===== */
  .filterable-list__header {
    padding: var(--skill-spacing-lg, 16px) var(--skill-spacing-xl, 20px);
    border-bottom: 1px solid var(--skill-gray-200, #e5e7eb);
    background: var(--skill-gray-50, #f9fafb);
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--skill-spacing-md, 12px);
  }

  .header-title {
    margin: 0;
    font-size: var(--skill-text-lg, 18px);
    font-weight: 600;
    color: var(--skill-gray-900, #111827);
  }

  .header-info {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-md, 12px);
    font-size: var(--skill-text-sm, 14px);
    color: var(--skill-gray-600, #4b5563);
  }

  .item-count,
  .selected-count {
    padding: 2px 8px;
    background: var(--skill-gray-100, #f3f4f6);
    border-radius: var(--skill-radius-full, 999px);
    font-weight: 500;
  }

  .selected-count {
    background: var(--skill-primary-100, #dbeafe);
    color: var(--skill-primary-700, #1d4ed8);
  }

  /* ===== 搜索框样式 ===== */
  .filterable-list__search {
    padding: var(--skill-spacing-md, 12px) var(--skill-spacing-xl, 20px);
    border-bottom: 1px solid var(--skill-gray-100, #f3f4f6);
  }

  .search-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-input {
    width: 100%;
    height: var(--search-height, 40px);
    padding: 8px 40px 8px 12px;
    border: 1px solid var(--skill-gray-300, #d1d5db);
    border-radius: var(--skill-radius-md, 6px);
    background: var(--search-bg, var(--skill-gray-0, #ffffff));
    font-size: var(--skill-text-sm, 14px);
    transition: all 0.2s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--skill-primary-500, #3b82f6);
    box-shadow: 0 0 0 3px var(--skill-primary-100, #dbeafe);
  }

  .search-input:disabled {
    background: var(--skill-gray-100, #f3f4f6);
    cursor: not-allowed;
  }

  .search-icon {
    position: absolute;
    right: 12px;
    color: var(--skill-gray-400, #9ca3af);
    pointer-events: none;
  }

  /* ===== 过滤器样式 ===== */
  .filterable-list__filters {
    padding: var(--skill-spacing-md, 12px) var(--skill-spacing-xl, 20px);
    border-bottom: 1px solid var(--skill-gray-100, #f3f4f6);
    background: var(--filter-bg, var(--skill-gray-50, #f9fafb));
  }

  .filters-container {
    display: flex;
    flex-wrap: wrap;
    gap: var(--skill-spacing-md, 12px);
    align-items: end;
  }

  .filter-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 150px;
  }

  .filter-label {
    font-size: var(--skill-text-xs, 12px);
    font-weight: 500;
    color: var(--skill-gray-700, #374151);
    margin-bottom: 2px;
  }

  .filter-input,
  .filter-select {
    height: 32px;
    padding: 6px 8px;
    border: 1px solid var(--skill-gray-300, #d1d5db);
    border-radius: var(--skill-radius-md, 6px);
    background: var(--skill-gray-0, #ffffff);
    font-size: var(--skill-text-sm, 14px);
    transition: all 0.2s ease;
  }

  .filter-input:focus,
  .filter-select:focus {
    outline: none;
    border-color: var(--skill-primary-500, #3b82f6);
    box-shadow: 0 0 0 3px var(--skill-primary-100, #dbeafe);
  }

  /* ===== 排序样式 ===== */
  .filterable-list__sort {
    padding: 0 var(--skill-spacing-xl, 20px) var(--skill-spacing-md, 12px);
    display: flex;
    justify-content: flex-end;
  }

  .sort-select {
    height: 32px;
    padding: 6px 8px;
    border: 1px solid var(--skill-gray-300, #d1d5db);
    border-radius: var(--skill-radius-md, 6px);
    background: var(--skill-gray-0, #ffffff);
    font-size: var(--skill-text-sm, 14px);
    min-width: 150px;
  }

  /* ===== 内容区域样式 ===== */
  .filterable-list__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 200px;
  }

  /* ===== 全选控件样式 ===== */
  .select-all-container {
    padding: var(--skill-spacing-sm, 8px) var(--skill-spacing-xl, 20px);
    border-bottom: 1px solid var(--skill-gray-100, #f3f4f6);
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: var(--skill-text-sm, 14px);
    color: var(--skill-gray-700, #374151);
  }

  .checkbox-input {
    width: 16px;
    height: 16px;
    border: 1px solid var(--skill-gray-300, #d1d5db);
    border-radius: var(--skill-radius-sm, 4px);
    cursor: pointer;
  }

  .checkbox-text {
    user-select: none;
  }

  /* ===== 项目容器布局样式 ===== */
  .items-container {
    flex: 1;
    padding: var(--skill-spacing-sm, 8px);
  }

  .items-container.layout-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .items-container.layout-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--skill-spacing-md, 12px);
    padding: var(--skill-spacing-md, 12px);
  }

  .items-container.layout-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--skill-spacing-lg, 16px);
    padding: var(--skill-spacing-lg, 16px);
  }

  .items-container.layout-table {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* ===== 项目样式 ===== */
  .filterable-list__item {
    background: var(--item-bg, var(--skill-gray-0, #ffffff));
    border: 1px solid var(--item-border-color, var(--skill-gray-200, #e5e7eb));
    border-radius: var(--skill-radius-md, 6px);
    transition: all 0.2s ease;
    position: relative;
  }

  .filterable-list__container[hoverable] .filterable-list__item[clickable]:not([disabled]):hover {
    background: var(--item-hover-bg, var(--skill-gray-50, #f9fafb));
    border-color: var(--skill-gray-300, #d1d5db);
    box-shadow: var(--skill-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
  }

  .filterable-list__item[selected] {
    background: var(--item-selected-bg, var(--skill-primary-50, #eff6ff));
    border-color: var(--skill-primary-300, #93c5fd);
  }

  .filterable-list__item[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .filterable-list__container[divided] .items-container.layout-list > .filterable-list__item:not(:last-child),
  .filterable-list__container[divided] .items-container.layout-table > .filterable-list__item:not(:last-child) {
    border-bottom: 1px solid var(--skill-gray-100, #f3f4f6);
    border-radius: 0;
  }

  .filterable-list__container[compact] .filterable-list__item {
    padding: var(--skill-spacing-sm, 8px) var(--skill-spacing-md, 12px);
  }

  .item-content {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-md, 12px);
    padding: var(--skill-spacing-md, 12px) var(--skill-spacing-lg, 16px);
  }

  .item-main {
    flex: 1;
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-md, 12px);
    min-width: 0;
  }

  .item-checkbox {
    width: 16px;
    height: 16px;
    border: 1px solid var(--skill-gray-300, #d1d5db);
    border-radius: var(--skill-radius-sm, 4px);
    cursor: pointer;
    flex-shrink: 0;
  }

  .item-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--skill-gray-500, #6b7280);
    flex-shrink: 0;
  }

  .item-image {
    width: 40px;
    height: 40px;
    border-radius: var(--skill-radius-md, 6px);
    object-fit: cover;
    flex-shrink: 0;
  }

  .item-details {
    flex: 1;
    min-width: 0;
  }

  .item-title {
    font-weight: 500;
    color: var(--skill-gray-900, #111827);
    font-size: var(--skill-text-sm, 14px);
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-description {
    color: var(--skill-gray-600, #4b5563);
    font-size: var(--skill-text-xs, 12px);
    line-height: 1.4;
    margin-bottom: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .item-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 4px;
  }

  .tag {
    display: inline-block;
    padding: 2px 6px;
    background: var(--skill-gray-100, #f3f4f6);
    color: var(--skill-gray-700, #374151);
    border-radius: var(--skill-radius-sm, 4px);
    font-size: 10px;
    font-weight: 500;
    line-height: 1;
  }

  /* ===== 操作按钮样式 ===== */
  .item-actions {
    display: flex;
    align-items: center;
    gap: 4px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .filterable-list__item[clickable]:hover .item-actions {
    opacity: 1;
  }

  .action-button {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--skill-radius-sm, 4px);
    color: var(--skill-gray-600, #4b5563);
    font-size: var(--skill-text-xs, 12px);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .action-button:hover:not(:disabled) {
    background: var(--skill-gray-100, #f3f4f6);
    color: var(--skill-gray-900, #111827);
  }

  .action-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .action-button.danger {
    color: var(--skill-red-600, #dc2626);
  }

  .action-button.danger:hover:not(:disabled) {
    background: var(--skill-red-50, #fef2f2);
    color: var(--skill-red-700, #b91c1c);
  }

  .action-icon {
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .action-label {
    white-space: nowrap;
  }

  .action-divider {
    width: 1px;
    height: 16px;
    background: var(--skill-gray-300, #d1d5db);
    margin: 0 4px;
  }

  /* ===== 状态样式 ===== */
  .filterable-list__empty,
  .filterable-list__loading,
  .filterable-list__error {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    padding: var(--skill-spacing-xl, 20px);
  }

  .empty-content,
  .loading-content,
  .error-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--skill-spacing-md, 12px);
    text-align: center;
  }

  .empty-icon,
  .error-icon {
    font-size: 48px;
    opacity: 0.5;
  }

  .empty-text,
  .error-text {
    color: var(--skill-gray-600, #4b5563);
    font-size: var(--skill-text-sm, 14px);
  }

  .loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--skill-gray-200, #e5e7eb);
    border-top: 3px solid var(--skill-primary-500, #3b82f6);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .loading-text {
    color: var(--skill-gray-600, #4b5563);
    font-size: var(--skill-text-sm, 14px);
  }

  .error-text {
    color: var(--skill-red-600, #dc2626);
  }

  /* ===== 分页样式 ===== */
  .filterable-list__pagination {
    padding: var(--skill-spacing-md, 12px) var(--skill-spacing-xl, 20px);
    border-top: 1px solid var(--skill-gray-100, #f3f4f6);
    background: var(--skill-gray-50, #f9fafb);
  }

  .pagination-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--skill-spacing-md, 12px);
  }

  .pagination-button {
    padding: 8px 16px;
    background: var(--skill-gray-0, #ffffff);
    border: 1px solid var(--skill-gray-300, #d1d5db);
    border-radius: var(--skill-radius-md, 6px);
    color: var(--skill-gray-700, #374151);
    font-size: var(--skill-text-sm, 14px);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .pagination-button:hover:not(:disabled) {
    background: var(--skill-gray-50, #f9fafb);
    border-color: var(--skill-gray-400, #9ca3af);
  }

  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination-info {
    font-size: var(--skill-text-sm, 14px);
    color: var(--skill-gray-600, #4b5563);
    font-weight: 500;
  }

  /* ===== 底部样式 ===== */
  .filterable-list__footer {
    padding: var(--skill-spacing-md, 12px) var(--skill-spacing-xl, 20px);
    border-top: 1px solid var(--skill-gray-100, #f3f4f6);
    background: var(--skill-gray-50, #f9fafb);
  }

  /* ===== 响应式设计 ===== */
  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--skill-spacing-sm, 8px);
    }

    .filters-container {
      flex-direction: column;
      align-items: stretch;
    }

    .filter-item {
      min-width: auto;
    }

    .items-container.layout-grid,
    .items-container.layout-cards {
      grid-template-columns: 1fr;
    }

    .item-content {
      padding: var(--skill-spacing-sm, 8px) var(--skill-spacing-md, 12px);
    }

    .pagination-container {
      flex-direction: column;
      gap: var(--skill-spacing-sm, 8px);
    }

    .item-actions {
      opacity: 1;
    }
  }

  /* ===== 动画 ===== */
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .filterable-list__item {
    animation: fadeIn 0.3s ease-out;
  }

  /* ===== 滚动条样式 ===== */
  .items-container {
    overflow-y: auto;
    max-height: var(--container-height, 400px);
  }

  .items-container::-webkit-scrollbar {
    width: 6px;
  }

  .items-container::-webkit-scrollbar-track {
    background: var(--skill-gray-100, #f3f4f6);
    border-radius: 3px;
  }

  .items-container::-webkit-scrollbar-thumb {
    background: var(--skill-gray-300, #d1d5db);
    border-radius: 3px;
  }

  .items-container::-webkit-scrollbar-thumb:hover {
    background: var(--skill-gray-400, #9ca3af);
  }

  /* ===== 无样式前缀支持 ===== */
  :host {
    --item-height: 60px;
    --search-height: 40px;
    --filter-width: 200px;
    --pagination-height: 60px;
  }
`;