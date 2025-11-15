import { css } from 'lit';

/**
 * FilterPanel 组件样式
 */
export const filterPanelStyles = css`
  :host {
    display: block;
    width: 100%;
    --filter-panel-header-bg: var(--skill-neutral-50, #f9fafb);
    --filter-panel-content-bg: var(--skill-white, #ffffff);
    --filter-panel-border-color: var(--skill-neutral-200, #e5e7eb);
    --filter-panel-header-text: var(--skill-text-primary, #1f2937);
    --filter-panel-label-text: var(--skill-text-secondary, #6b7280);
    --filter-panel-border-radius: var(--skill-radius-md, 6px);
    --filter-panel-spacing: var(--skill-spacing-md, 16px);
    --filter-panel-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }

  .skill-filter-panel {
    font-family: var(--skill-font-family, inherit);
    font-size: var(--skill-font-body-2, 14px);
    line-height: 1.5;
    color: var(--filter-panel-header-text);
    background-color: var(--filter-panel-content-bg);
    border: 1px solid var(--filter-panel-border-color);
    border-radius: var(--filter-panel-border-radius);
    box-shadow: var(--filter-panel-shadow);
    overflow: hidden;
  }

  /* 面板头部 */
  .skill-filter-panel__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--skill-spacing-md, 16px) var(--filter-panel-spacing);
    background-color: var(--filter-panel-header-bg);
    border-bottom: 1px solid var(--filter-panel-border-color);
    font-weight: 600;
    color: var(--filter-panel-header-text);
  }

  .skill-filter-panel__title {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm, 8px);
    font-size: var(--skill-font-body-1, 16px);
    margin: 0;
  }

  .skill-filter-panel__title-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--skill-primary-500, #3b82f6);
  }

  .skill-filter-panel__actions {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
  }

  .skill-filter-panel__action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--skill-spacing-xs, 4px);
    border: none;
    background: none;
    color: var(--skill-text-secondary, #6b7280);
    cursor: pointer;
    border-radius: var(--skill-radius-xs, 2px);
    transition: all 0.2s ease;
  }

  .skill-filter-panel__action-btn:hover {
    color: var(--skill-primary-500, #3b82f6);
    background-color: var(--skill-primary-50, #eff6ff);
  }

  .skill-filter-panel__action-btn svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }

  /* 折叠状态 */
  .skill-filter-panel--collapsed .skill-filter-panel__content {
    display: none;
  }

  .skill-filter-panel--collapsed .skill-filter-panel__header {
    border-bottom: none;
  }

  .skill-filter-panel__collapse-icon {
    transition: transform 0.2s ease;
  }

  .skill-filter-panel--collapsed .skill-filter-panel__collapse-icon {
    transform: rotate(-90deg);
  }

  /* 面板内容 */
  .skill-filter-panel__content {
    padding: var(--filter-panel-spacing);
    max-height: 400px;
    overflow-y: auto;
  }

  /* 筛选组 */
  .skill-filter-panel__group {
    margin-bottom: var(--filter-panel-spacing);
  }

  .skill-filter-panel__group:last-child {
    margin-bottom: 0;
  }

  .skill-filter-panel__group-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 var(--skill-spacing-sm, 8px) 0;
    font-weight: 600;
    font-size: var(--skill-font-body-2, 14px);
    color: var(--filter-panel-header-text);
  }

  .skill-filter-panel__group-title-text {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
  }

  .skill-filter-panel__group-count {
    font-size: var(--skill-font-body-3, 12px);
    color: var(--filter-panel-label-text);
    font-weight: normal;
  }

  .skill-filter-panel__group-clear {
    font-size: var(--skill-font-body-3, 12px);
    color: var(--skill-primary-500, #3b82f6);
    cursor: pointer;
    border: none;
    background: none;
    padding: 2px 6px;
    border-radius: var(--skill-radius-xs, 2px);
    transition: all 0.2s ease;
  }

  .skill-filter-panel__group-clear:hover {
    background-color: var(--skill-primary-50, #eff6ff);
  }

  /* 筛选项 */
  .skill-filter-panel__filter-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--skill-spacing-sm, 8px);
    border-radius: var(--skill-radius-sm, 4px);
    transition: all 0.2s ease;
    cursor: pointer;
    margin-bottom: 2px;
  }

  .skill-filter-panel__filter-item:hover {
    background-color: var(--skill-neutral-50, #f9fafb);
  }

  .skill-filter-panel__filter-item--active {
    background-color: var(--skill-primary-50, #eff6ff);
    color: var(--skill-primary-700, #1d4ed8);
  }

  .skill-filter-panel__filter-item-left {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm, 8px);
    flex: 1;
  }

  .skill-filter-panel__filter-item-right {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
  }

  .skill-filter-panel__filter-checkbox {
    width: 16px;
    height: 16px;
    accent-color: var(--skill-primary-500, #3b82f6);
  }

  .skill-filter-panel__filter-radio {
    width: 16px;
    height: 16px;
    accent-color: var(--skill-primary-500, #3b82f6);
  }

  .skill-filter-panel__filter-text {
    flex: 1;
    font-size: var(--skill-font-body-2, 14px);
    color: var(--filter-panel-header-text);
  }

  .skill-filter-panel__filter-count {
    font-size: var(--skill-font-body-3, 12px);
    color: var(--filter-panel-label-text);
    background-color: var(--skill-neutral-100, #f3f4f6);
    padding: 1px 6px;
    border-radius: var(--skill-radius-full, 9999px);
    min-width: 20px;
    text-align: center;
  }

  .skill-filter-panel__filter-item--active .skill-filter-panel__filter-count {
    background-color: var(--skill-primary-100, #dbeafe);
    color: var(--skill-primary-700, #1d4ed8);
  }

  /* 搜索框 */
  .skill-filter-panel__search {
    margin-bottom: var(--filter-panel-spacing);
  }

  .skill-filter-panel__search-input {
    width: 100%;
    padding: var(--skill-spacing-sm, 8px) var(--skill-spacing-md, 16px);
    border: 1px solid var(--skill-neutral-300, #d1d5db);
    border-radius: var(--skill-radius-sm, 4px);
    font-size: var(--skill-font-body-2, 14px);
    transition: all 0.2s ease;
  }

  .skill-filter-panel__search-input:focus {
    outline: none;
    border-color: var(--skill-primary-500, #3b82f6);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  .skill-filter-panel__search-input::placeholder {
    color: var(--skill-text-placeholder, #9ca3af);
  }

  /* 范围滑块 */
  .skill-filter-panel__range {
    margin-bottom: var(--skill-spacing-sm, 8px);
  }

  .skill-filter-panel__range-container {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm, 8px);
  }

  .skill-filter-panel__range-input {
    flex: 1;
  }

  .skill-filter-panel__range-value {
    min-width: 40px;
    text-align: center;
    font-size: var(--skill-font-body-3, 12px);
    color: var(--filter-panel-label-text);
  }

  /* 日期选择器 */
  .skill-filter-panel__date {
    margin-bottom: var(--skill-spacing-sm, 8px);
  }

  .skill-filter-panel__date-container {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm, 8px);
  }

  .skill-filter-panel__date-input {
    flex: 1;
    padding: var(--skill-spacing-xs, 4px) var(--skill-spacing-sm, 8px);
    border: 1px solid var(--skill-neutral-300, #d1d5db);
    border-radius: var(--skill-radius-sm, 4px);
    font-size: var(--skill-font-body-2, 14px);
  }

  .skill-filter-panel__date-input:focus {
    outline: none;
    border-color: var(--skill-primary-500, #3b82f6);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  .skill-filter-panel__date-separator {
    color: var(--filter-panel-label-text);
  }

  /* 操作按钮 */
  .skill-filter-panel__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--skill-spacing-sm, 8px) var(--filter-panel-spacing);
    background-color: var(--filter-panel-header-bg);
    border-top: 1px solid var(--filter-panel-border-color);
  }

  .skill-filter-panel__footer-left,
  .skill-filter-panel__footer-right {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm, 8px);
  }

  .skill-filter-panel__btn {
    padding: var(--skill-spacing-xs, 6px) var(--skill-spacing-md, 16px);
    border: 1px solid var(--skill-neutral-300, #d1d5db);
    border-radius: var(--skill-radius-sm, 4px);
    background-color: var(--skill-white, #ffffff);
    color: var(--filter-panel-header-text);
    font-size: var(--skill-font-body-2, 14px);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .skill-filter-panel__btn:hover {
    background-color: var(--skill-neutral-50, #f9fafb);
    border-color: var(--skill-neutral-400, #9ca3af);
  }

  .skill-filter-panel__btn--primary {
    background-color: var(--skill-primary-500, #3b82f6);
    border-color: var(--skill-primary-500, #3b82f6);
    color: var(--skill-white, #ffffff);
  }

  .skill-filter-panel__btn--primary:hover {
    background-color: var(--skill-primary-600, #2563eb);
    border-color: var(--skill-primary-600, #2563eb);
  }

  .skill-filter-panel__btn--text {
    background: none;
    border: none;
    color: var(--skill-primary-500, #3b82f6);
    padding: var(--skill-spacing-xs, 6px) var(--skill-spacing-sm, 8px);
  }

  .skill-filter-panel__btn--text:hover {
    background-color: var(--skill-primary-50, #eff6ff);
  }

  /* 加载状态 */
  .skill-filter-panel__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--skill-spacing-lg, 24px);
    color: var(--filter-panel-label-text);
  }

  .skill-filter-panel__loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid var(--skill-neutral-200, #e5e7eb);
    border-top-color: var(--skill-primary-500, #3b82f6);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: var(--skill-spacing-sm, 8px);
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* 空状态 */
  .skill-filter-panel__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--skill-spacing-lg, 24px);
    color: var(--filter-panel-label-text);
    font-style: italic;
  }

  /* 标签云 */
  .skill-filter-panel__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--skill-spacing-xs, 4px);
    margin-bottom: var(--skill-spacing-sm, 8px);
  }

  .skill-filter-panel__tag {
    display: inline-flex;
    align-items: center;
    padding: var(--skill-spacing-xs, 4px) var(--skill-spacing-sm, 8px);
    background-color: var(--skill-neutral-100, #f3f4f6);
    color: var(--filter-panel-header-text);
    border-radius: var(--skill-radius-full, 9999px);
    font-size: var(--skill-font-body-3, 12px);
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }

  .skill-filter-panel__tag:hover {
    background-color: var(--skill-neutral-200, #e5e7eb);
  }

  .skill-filter-panel__tag--active {
    background-color: var(--skill-primary-100, #dbeafe);
    color: var(--skill-primary-700, #1d4ed8);
    border-color: var(--skill-primary-300, #93c5fd);
  }

  /* 颜色选择器 */
  .skill-filter-panel__color-picker {
    display: flex;
    flex-wrap: wrap;
    gap: var(--skill-spacing-xs, 4px);
    margin-bottom: var(--skill-spacing-sm, 8px);
  }

  .skill-filter-panel__color-option {
    width: 24px;
    height: 24px;
    border-radius: var(--skill-radius-sm, 4px);
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.2s ease;
  }

  .skill-filter-panel__color-option:hover {
    transform: scale(1.1);
  }

  .skill-filter-panel__color-option--active {
    border-color: var(--skill-primary-500, #3b82f6);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  /* 尺寸变体 */
  .skill-filter-panel--xs {
    --filter-panel-spacing: var(--skill-spacing-xs, 8px);
    --filter-panel-border-radius: var(--skill-radius-sm, 4px);
  }

  .skill-filter-panel--sm {
    --filter-panel-spacing: var(--skill-spacing-sm, 12px);
    --filter-panel-border-radius: var(--skill-radius-sm, 4px);
  }

  .skill-filter-panel--md {
    --filter-panel-spacing: var(--skill-spacing-md, 16px);
    --filter-panel-border-radius: var(--skill-radius-md, 6px);
  }

  .skill-filter-panel--lg {
    --filter-panel-spacing: var(--skill-spacing-lg, 20px);
    --filter-panel-border-radius: var(--skill-radius-lg, 8px);
  }

  .skill-filter-panel--xl {
    --filter-panel-spacing: var(--skill-spacing-xl, 24px);
    --filter-panel-border-radius: var(--skill-radius-lg, 8px);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    :host {
      --filter-panel-spacing: var(--skill-spacing-sm, 12px);
    }

    .skill-filter-panel__header {
      padding: var(--skill-spacing-sm, 12px) var(--filter-panel-spacing);
    }

    .skill-filter-panel__content {
      padding: var(--filter-panel-spacing);
      max-height: 300px;
    }

    .skill-filter-panel__footer {
      flex-direction: column;
      gap: var(--skill-spacing-sm, 8px);
      align-items: stretch;
    }

    .skill-filter-panel__footer-left,
    .skill-filter-panel__footer-right {
      justify-content: center;
    }
  }

  /* 深色模式支持 */
  @media (prefers-color-scheme: dark) {
    :host {
      --filter-panel-header-bg: var(--skill-neutral-800, #1f2937);
      --filter-panel-content-bg: var(--skill-neutral-900, #111827);
      --filter-panel-border-color: var(--skill-neutral-600, #4b5563);
      --filter-panel-header-text: var(--skill-text-primary-dark, #f9fafb);
      --filter-panel-label-text: var(--skill-text-secondary-dark, #d1d5db);
      --filter-panel-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
    }

    .skill-filter-panel__search-input,
    .skill-filter-panel__date-input {
      background-color: var(--skill-neutral-800, #1f2937);
      border-color: var(--skill-neutral-600, #4b5563);
      color: var(--skill-text-primary-dark, #f9fafb);
    }

    .skill-filter-panel__search-input::placeholder {
      color: var(--skill-neutral-400, #9ca3af);
    }

    .skill-filter-panel__btn {
      background-color: var(--skill-neutral-800, #1f2937);
      border-color: var(--skill-neutral-600, #4b5563);
      color: var(--skill-text-primary-dark, #f9fafb);
    }

    .skill-filter-panel__btn:hover {
      background-color: var(--skill-neutral-700, #374151);
      border-color: var(--skill-neutral-500, #6b7280);
    }

    .skill-filter-panel__tag {
      background-color: var(--skill-neutral-700, #374151);
      color: var(--skill-text-primary-dark, #f9fafb);
    }

    .skill-filter-panel__tag:hover {
      background-color: var(--skill-neutral-600, #4b5563);
    }
  }

  /* 高对比度模式 */
  @media (prefers-contrast: high) {
    .skill-filter-panel {
      border-width: 2px;
    }

    .skill-filter-panel__filter-item {
      border: 1px solid transparent;
    }

    .skill-filter-panel__filter-item:hover,
    .skill-filter-panel__filter-item--active {
      border-color: var(--skill-primary-500, #3b82f6);
    }

    .skill-filter-panel__btn {
      border-width: 2px;
    }
  }

  /* 减少动画模式 */
  @media (prefers-reduced-motion: reduce) {
    .skill-filter-panel__collapse-icon,
    .skill-filter-panel__filter-item,
    .skill-filter-panel__btn,
    .skill-filter-panel__tag,
    .skill-filter-panel__color-option,
    .skill-filter-panel__action-btn,
    .skill-filter-panel__search-input,
    .skill-filter-panel__date-input {
      transition: none;
    }

    .skill-filter-panel__loading-spinner {
      animation: none;
    }
  }

  /* 打印样式 */
  @media print {
    .skill-filter-panel {
      border: 1px solid black !important;
      box-shadow: none !important;
      background: white !important;
      color: black !important;
    }

    .skill-filter-panel__footer,
    .skill-filter-panel__actions {
      display: none;
    }
  }

  /* 插槽样式 */
  ::slotted([slot="header-actions"]) {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
  }

  ::slotted([slot="footer-left"]) {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm, 8px);
  }

  ::slotted([slot="footer-right"]) {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm, 8px);
  }

  ::slotted([slot="group-actions"]) {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
  }

  ::slotted([slot="filter-actions"]) {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
  }
`;