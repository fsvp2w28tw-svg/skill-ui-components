import { css } from 'lit';

/**
 * Pagination 分页组件样式
 * 现代化设计，支持完整功能：页码、跳转、条数选择、响应式等
 */
export const paginationStyles = css`
  /* ===== Host 元素 ===== */
  :host {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm);
    font-size: var(--skill-font-body-3);
    --pagination-color: var(--skill-gray-700);
    --pagination-bg-color: var(--skill-gray-0);
    --pagination-border-color: var(--skill-gray-300);
    --pagination-hover-bg: var(--skill-gray-100);
    --pagination-active-bg: var(--skill-primary-500);
    --pagination-active-color: var(--skill-gray-0);
    --pagination-disabled-color: var(--skill-gray-400);
    --pagination-disabled-bg: var(--skill-gray-50);
  }

  /* ===== 容器样式 ===== */
  .skill-pagination__container {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm);
    flex-wrap: wrap;
  }

  /* ===== 分页项通用样式 ===== */
  .skill-pagination__item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 var(--skill-spacing-sm);
    margin: 0 2px;
    color: var(--pagination-color);
    background: var(--pagination-bg-color);
    border: 1px solid var(--pagination-border-color);
    border-radius: var(--skill-radius-md);
    cursor: pointer;
    text-decoration: none;
    transition: all var(--skill-transition-duration-fast) var(--skill-transition-easing);
    user-select: none;
    box-sizing: border-box;
    font-weight: var(--skill-font-weight-medium);
    font-family: inherit;
    font-size: inherit;
    line-height: 1;
  }

  /* ===== 分页项交互状态 ===== */
  .skill-pagination__item:hover:not(.skill-pagination__item--disabled):not(.skill-pagination__item--active) {
    background: var(--pagination-hover-bg);
    border-color: var(--skill-gray-400);
    transform: translateY(-1px);
    box-shadow: var(--skill-shadow-1);
  }

  .skill-pagination__item:active:not(.skill-pagination__item--disabled):not(.skill-pagination__item--active) {
    transform: translateY(0);
    box-shadow: none;
  }

  /* ===== 活跃状态 ===== */
  .skill-pagination__item--active {
    background: var(--pagination-active-bg);
    border-color: var(--pagination-active-bg);
    color: var(--pagination-active-color);
    font-weight: var(--skill-font-weight-semibold);
    box-shadow: var(--skill-shadow-1);
  }

  /* ===== 禁用状态 ===== */
  .skill-pagination__item--disabled {
    color: var(--pagination-disabled-color);
    background: var(--pagination-disabled-bg);
    border-color: var(--pagination-gray-200);
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* ===== 省略号样式 ===== */
  .skill-pagination__item--ellipsis {
    border: none;
    background: transparent;
    cursor: default;
    min-width: auto;
    padding: 0 var(--skill-spacing-xs);
    color: var(--skill-gray-400);
    font-weight: normal;
  }

  /* ===== 总数显示 ===== */
  .skill-pagination__total {
    color: var(--pagination-color);
    margin: 0 var(--skill-spacing-sm);
    font-size: var(--skill-font-body-3);
    font-weight: var(--skill-font-weight-regular);
  }

  /* ===== 条数选择器 ===== */
  .skill-pagination__sizes {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm);
    margin-left: var(--skill-spacing-md);
  }

  .skill-pagination__sizes label {
    color: var(--pagination-color);
    font-size: var(--skill-font-body-3);
    white-space: nowrap;
    font-weight: var(--skill-font-weight-regular);
  }

  .skill-pagination__sizes select {
    padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
    border: 1px solid var(--pagination-border-color);
    border-radius: var(--skill-radius-md);
    background: var(--pagination-bg-color);
    color: var(--pagination-color);
    font-size: var(--skill-font-body-3);
    cursor: pointer;
    transition: all var(--skill-transition-duration-fast) var(--skill-transition-easing);
    font-family: inherit;
    min-width: 80px;
  }

  .skill-pagination__sizes select:hover {
    border-color: var(--skill-gray-400);
  }

  .skill-pagination__sizes select:focus {
    outline: none;
    border-color: var(--pagination-active-bg);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  /* ===== 快速跳转 ===== */
  .skill-pagination__jumper {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm);
    margin-left: var(--skill-spacing-md);
    color: var(--pagination-color);
    font-size: var(--skill-font-body-3);
  }

  .skill-pagination__jumper input {
    width: 50px;
    padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
    border: 1px solid var(--pagination-border-color);
    border-radius: var(--skill-radius-md);
    background: var(--pagination-bg-color);
    color: var(--pagination-color);
    font-size: var(--skill-font-body-3);
    text-align: center;
    transition: all var(--skill-transition-duration-fast) var(--skill-transition-easing);
    font-family: inherit;
  }

  .skill-pagination__jumper input:hover {
    border-color: var(--skill-gray-400);
  }

  .skill-pagination__jumper input:focus {
    outline: none;
    border-color: var(--pagination-active-bg);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .skill-pagination__jumper input::invalid {
    border-color: var(--skill-error-500);
  }

  .skill-pagination__jumper button {
    margin-left: var(--skill-spacing-xs);
    height: auto;
    padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
  }

  /* ===== 尺寸变体 ===== */

  /* 小尺寸 */
  :host([size="sm"]) {
    font-size: var(--skill-font-body-4);
  }

  :host([size="sm"]) .skill-pagination__item {
    min-width: 28px;
    height: 28px;
    font-size: var(--skill-font-body-4);
    padding: 0 var(--skill-spacing-xs);
  }

  :host([size="sm"]) .skill-pagination__total,
  :host([size="sm"]) .skill-pagination__sizes label,
  :host([size="sm"]) .skill-pagination__jumper {
    font-size: var(--skill-font-body-4);
  }

  /* 大尺寸 */
  :host([size="lg"]) {
    font-size: var(--skill-font-body-2);
  }

  :host([size="lg"]) .skill-pagination__item {
    min-width: 36px;
    height: 36px;
    font-size: var(--skill-font-body-2);
    padding: 0 var(--skill-spacing-md);
  }

  :host([size="lg"]) .skill-pagination__total,
  :host([size="lg"]) .skill-pagination__sizes label,
  :host([size="lg"]) .skill-pagination__jumper {
    font-size: var(--skill-font-body-2);
  }

  /* ===== 简单模式 ===== */
  :host([simple="true"]) .skill-pagination__container {
    gap: var(--skill-spacing-md);
  }

  :host([simple="true"]) .skill-pagination__item:not(.skill-pagination__item--active) {
    display: none;
  }

  /* ===== 对齐方式 ===== */

  /* 居中对齐 */
  :host([align="center"]) {
    justify-content: center;
  }

  /* 右对齐 */
  :host([align="right"]) {
    justify-content: flex-end;
  }

  /* ===== 无边框模式 ===== */
  :host([bordered="false"]) .skill-pagination__item {
    border: none;
  }

  :host([bordered="false"]) .skill-pagination__item:hover:not(.skill-pagination__item--disabled):not(.skill-pagination__item--active) {
    background: var(--pagination-hover-bg);
  }

  /* ===== 响应式设计 ===== */
  @media (max-width: 768px) {
    .skill-pagination__sizes,
    .skill-pagination__jumper {
      display: none;
    }

    .skill-pagination__container {
      gap: var(--skill-spacing-xs);
    }
  }

  @media (max-width: 480px) {
    .skill-pagination__total {
      display: none;
    }

    .skill-pagination__item {
      min-width: 28px;
      height: 28px;
      font-size: var(--skill-font-body-4);
      padding: 0 var(--skill-spacing-xs);
    }

    :host {
      font-size: var(--skill-font-body-4);
    }
  }

  /* ===== 可访问性 ===== */
  .skill-pagination__item:focus-visible {
    outline: 2px solid var(--pagination-active-bg);
    outline-offset: 2px;
  }

  /* ===== 高对比度模式支持 ===== */
  @media (prefers-contrast: high) {
    .skill-pagination__item {
      border-width: 2px;
    }

    .skill-pagination__item:focus-visible {
      outline-width: 3px;
    }
  }

  /* ===== 深色模式支持 ===== */
  @media (prefers-color-scheme: dark) {
    :host {
      --pagination-color: var(--skill-gray-300);
      --pagination-bg-color: var(--skill-gray-800);
      --pagination-border-color: var(--skill-gray-600);
      --pagination-hover-bg: var(--skill-gray-700);
      --pagination-disabled-bg: var(--skill-gray-900);
      --pagination-disabled-color: var(--skill-gray-500);
    }
  }

  /* ===== 减少动画偏好支持 ===== */
  @media (prefers-reduced-motion: reduce) {
    .skill-pagination__item,
    .skill-pagination__sizes select,
    .skill-pagination__jumper input {
      transition: none;
    }

    .skill-pagination__item:hover {
      transform: none;
    }
  }
`;