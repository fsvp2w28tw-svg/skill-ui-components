import { css } from 'lit';

/**
 * Skill Dropdown 组件样式 - 合并版本
 * 支持数据驱动和Slot两种方式
 */
export const dropdownStyles = css`
  /* ===== 基础容器样式 ===== */

  :host {
    display: inline-block;
    position: relative;
  }

  .skill-dropdown {
    position: relative;
    display: inline-block;
  }

  /* ===== 触发器样式 ===== */

  .dropdown-trigger-wrapper {
    display: flex;
    align-items: center;
    gap: var(--dropdown-trigger-gap, var(--skill-spacing-2xs, 4px));
    outline: none;
    cursor: pointer;
    background: var(--dropdown-trigger-bg, var(--skill-white, #FFFFFF));
    color: var(--dropdown-trigger-color, var(--skill-gray-700, #374151));
    border: 1px solid var(--dropdown-trigger-border-color, var(--skill-gray-300, #D1D5DB));
    border-radius: var(--dropdown-trigger-radius, var(--skill-radius-md, 6px));
    padding: var(--dropdown-trigger-padding-y, var(--skill-spacing-xs, 8px)) var(--dropdown-trigger-padding-x, var(--skill-spacing-sm, 12px));
    font-size: var(--dropdown-trigger-font-size, var(--skill-font-size-body-2, 14px));
    font-weight: var(--dropdown-trigger-font-weight, var(--skill-font-weight-medium, 500));
    transition: all var(--skill-duration-fast, 200ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
    user-select: none;
  }

  .dropdown-trigger-wrapper:hover {
    background: var(--dropdown-trigger-hover-bg, var(--skill-gray-50, #F9FAFB));
    border-color: var(--dropdown-trigger-hover-border-color, var(--skill-gray-400, #9CA3AF));
  }

  .dropdown-trigger-wrapper:focus-visible {
    outline: 2px solid var(--skill-primary-500, #0A59F7);
    outline-offset: 2px;
  }

  .dropdown-trigger-wrapper[aria-expanded="true"] {
    background: var(--dropdown-trigger-active-bg, var(--skill-primary-50, #EFF6FF));
    border-color: var(--dropdown-trigger-active-border-color, var(--skill-primary-500, #0A59F7));
    color: var(--dropdown-trigger-active-color, var(--skill-primary-700, #1D4ED8));
  }

  .dropdown-trigger-wrapper[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* ===== 箭头图标样式 ===== */

  .dropdown-chevron {
    transition: transform 200ms ease-in-out;
    width: 12px;
    height: 12px;
    color: var(--dropdown-chevron-color, var(--skill-gray-500, #6B7280));
  }

  .dropdown-chevron--open {
    transform: rotate(180deg);
  }

  /* ===== 下拉菜单容器样式 ===== */

  .skill-dropdown__menu {
    position: absolute;
    z-index: var(--dropdown-z-index, 50);
    min-width: var(--dropdown-min-width, 200px);
    max-width: var(--dropdown-max-width, 400px);
    max-height: var(--dropdown-max-height, 300px);
    background: var(--dropdown-bg, var(--skill-white, #FFFFFF));
    border: 1px solid var(--dropdown-border-color, var(--skill-gray-200, #E5E7EB));
    border-radius: var(--dropdown-radius, var(--skill-radius-lg, 8px));
    box-shadow: var(--dropdown-shadow, var(--skill-shadow-lg, 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)));
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all var(--skill-duration-fast, 200ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  .skill-dropdown__menu[placement^="top-"] {
    top: auto;
    bottom: 100%;
    transform: translateY(10px);
  }

  .skill-dropdown__menu[placement^="right-"] {
    top: 0;
    left: 100%;
    transform: translateX(-10px);
  }

  .skill-dropdown__menu[placement^="left-"] {
    top: 0;
    left: auto;
    right: 100%;
    transform: translateX(10px);
  }

  .skill-dropdown__menu[placement="top"],
  .skill-dropdown__menu[placement="bottom"] {
    left: 50%;
    transform: translateX(-50%) translateY(-10px);
  }

  .skill-dropdown__menu[placement="top"] {
    transform: translateX(-50%) translateY(10px);
  }

  .skill-dropdown__menu[placement="right"],
  .skill-dropdown__menu[placement="left"] {
    top: 50%;
    transform: translateY(-50%) translateX(-10px);
  }

  .skill-dropdown__menu[placement="left"] {
    transform: translateY(-50%) translateX(10px);
  }

  /* 显示状态 */
  .skill-dropdown__menu:not([hidden]) {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) translateX(0);
  }

  .skill-dropdown__menu[placement^="top-"]:not([hidden]) {
    transform: translateY(0) translateX(0);
  }

  /* ===== 箭头指示器 ===== */

  .skill-dropdown__arrow {
    position: absolute;
    width: var(--dropdown-arrow-size, 8px);
    height: var(--dropdown-arrow-size, 8px);
    background: var(--dropdown-bg, var(--skill-white, #FFFFFF));
    border: 1px solid var(--dropdown-border-color, var(--skill-gray-200, #E5E7EB));
    transform: rotate(45deg);
  }

  .skill-dropdown__menu[placement^="bottom-"] .skill-dropdown__arrow {
    top: -5px;
    left: var(--dropdown-arrow-left, 16px);
    border-bottom: none;
    border-right: none;
  }

  .skill-dropdown__menu[placement^="top-"] .skill-dropdown__arrow {
    bottom: -5px;
    left: var(--dropdown-arrow-left, 16px);
    border-top: none;
    border-left: none;
  }

  .skill-dropdown__menu[placement="bottom"] .skill-dropdown__arrow {
    top: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
  }

  .skill-dropdown__menu[placement="top"] .skill-dropdown__arrow {
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
  }

  /* ===== 菜单列表 ===== */

  .skill-dropdown__menu-list {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  .skill-dropdown__content {
    flex: 1;
    overflow-y: auto;
    padding: var(--dropdown-content-padding, var(--skill-spacing-2xs, 4px) 0);
  }

  /* ===== 搜索框样式 ===== */

  .skill-dropdown__search {
    padding: var(--dropdown-search-padding, var(--skill-spacing-xs, 8px) var(--skill-spacing-sm, 12px));
    border-bottom: 1px solid var(--dropdown-search-border-color, var(--skill-gray-200, #E5E7EB));
  }

  .skill-dropdown__search-input {
    width: 100%;
    padding: var(--dropdown-search-input-padding-y, var(--skill-spacing-2xs, 4px)) var(--dropdown-search-input-padding-x, var(--skill-spacing-xs, 8px));
    border: 1px solid var(--dropdown-search-input-border-color, var(--skill-gray-300, #D1D5DB));
    border-radius: var(--dropdown-search-input-radius, var(--skill-radius-md, 6px));
    font-size: var(--dropdown-search-input-font-size, var(--skill-font-size-body-3, 12px));
    background: var(--dropdown-search-input-bg, var(--skill-white, #FFFFFF));
    color: var(--dropdown-search-input-color, var(--skill-gray-700, #374151));
    outline: none;
    transition: all var(--skill-duration-fast, 200ms);
  }

  .skill-dropdown__search-input:focus {
    border-color: var(--skill-primary-500, #0A59F7);
    box-shadow: 0 0 0 3px rgba(10, 89, 247, 0.1);
  }

  /* ===== 空状态样式 ===== */

  .skill-dropdown__empty {
    padding: var(--dropdown-empty-padding, var(--skill-spacing-md, 16px) var(--skill-spacing-sm, 12px));
    text-align: center;
    color: var(--dropdown-empty-color, var(--skill-gray-500, #6B7280));
    font-size: var(--dropdown-empty-font-size, var(--skill-font-size-body-3, 12px));
  }

  /* ===== 下拉菜单项样式 ===== */

  .dropdown-item {
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: var(--dropdown-item-padding-y, var(--skill-spacing-xs, 8px)) var(--dropdown-item-padding-x, var(--skill-spacing-sm, 12px));
    font-size: var(--dropdown-item-font-size, var(--skill-font-size-body-2, 14px));
    color: var(--dropdown-item-color, var(--skill-gray-700, #374151));
    background: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
    outline: none;
    transition: all var(--skill-duration-fast, 200ms);
    font-family: var(--skill-font-sans, 'Inter', system-ui, sans-serif);
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dropdown-item:hover:not(:disabled) {
    background: var(--dropdown-item-hover-bg, var(--skill-gray-50, #F9FAFB));
    color: var(--dropdown-item-hover-color, var(--skill-gray-900, #111827));
  }

  .dropdown-item:focus-visible {
    background: var(--dropdown-item-hover-bg, var(--skill-gray-50, #F9FAFB));
    outline: 2px solid var(--skill-primary-500, #0A59F7);
    outline-offset: -2px;
  }

  .dropdown-item:disabled {
    color: var(--dropdown-item-disabled-color, var(--skill-gray-400, #9CA3AF));
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }

  .dropdown-item--selected {
    background: var(--dropdown-item-selected-bg, var(--skill-primary-50, #EFF6FF));
    color: var(--dropdown-item-selected-color, var(--skill-primary-700, #1D4ED8));
  }

  /* 危险样式变体 */
  .dropdown-item--danger {
    color: var(--skill-error-600, #dc2626);
  }

  .dropdown-item--danger:hover:not(:disabled) {
    background: var(--skill-error-50, #fef2f2);
    color: var(--skill-error-700, #b91c1c);
  }

  /* ===== 多选模式样式 ===== */

  :host([multiple]) .dropdown-item {
    padding-left: var(--dropdown-multiple-padding-left, var(--skill-spacing-md, 16px));
  }

  :host([multiple]) .dropdown-item input[type="checkbox"] {
    margin-right: var(--skill-spacing-2xs, 4px);
    margin-top: 2px;
    flex-shrink: 0;
  }

  /* ===== 菜单项图标 ===== */

  .dropdown-item-icon {
    flex-shrink: 0;
    color: var(--dropdown-item-icon-color, var(--skill-gray-500, #6B7280));
    width: 1rem;
    height: 1rem;
    margin-top: 2px;
  }

  .dropdown-item--danger .dropdown-item-icon {
    color: var(--skill-error-600, #dc2626);
  }

  /* ===== 菜单项文本 ===== */

  .dropdown-item-label {
    flex: 1;
    min-width: 0;
  }

  .dropdown-item-description {
    display: block;
    font-size: var(--dropdown-item-description-font-size, var(--skill-font-size-body-3, 12px));
    color: var(--dropdown-item-description-color, var(--skill-gray-500, #6B7280));
    margin-top: 2px;
  }

  /* ===== 分割线 ===== */

  .dropdown-divider {
    height: 1px;
    background: var(--dropdown-divider-color, var(--skill-gray-200, #E5E7EB));
    margin: var(--dropdown-divider-margin, var(--skill-spacing-2xs, 4px) 0);
    border: none;
  }

  /* ===== Slot 样式（兼容性） ===== */

  ::slotted(.dropdown-item) {
    display: block;
    width: 100%;
    padding: var(--dropdown-item-padding-y, var(--skill-spacing-xs, 8px)) var(--dropdown-item-padding-x, var(--skill-spacing-sm, 12px));
    background: transparent;
    color: var(--dropdown-item-color, var(--skill-gray-700, #374151));
    border: none;
    text-align: left;
    font-size: var(--dropdown-item-font-size, var(--skill-font-size-body-2, 14px));
    line-height: 1.4;
    cursor: pointer;
    transition: all var(--skill-duration-fast, 200ms);
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ::slotted(.dropdown-item:hover),
  ::slotted(.dropdown-item:focus) {
    background: var(--dropdown-item-hover-bg, var(--skill-gray-50, #F9FAFB));
    color: var(--dropdown-item-hover-color, var(--skill-gray-900, #111827));
  }

  ::slotted(.dropdown-item:active) {
    background: var(--dropdown-item-active-bg, var(--skill-gray-100, #F3F4F6));
  }

  ::slotted(.dropdown-item.disabled) {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  ::slotted(.dropdown-divider) {
    height: 1px;
    background: var(--dropdown-divider-color, var(--skill-gray-200, #E5E7EB));
    margin: var(--dropdown-divider-margin, var(--skill-spacing-2xs, 4px) 0);
    border: none;
  }

  /* ===== 分组样式 ===== */

  ::slotted(.dropdown-group) {
    margin: var(--dropdown-group-margin, var(--skill-spacing-2xs, 4px) 0);
  }

  ::slotted(.dropdown-group-title) {
    padding: var(--dropdown-group-title-padding-y, var(--skill-spacing-2xs, 4px)) var(--dropdown-group-title-padding-x, var(--skill-spacing-sm, 12px));
    font-size: var(--dropdown-group-title-font-size, var(--skill-font-size-body-3, 12px));
    font-weight: var(--dropdown-group-title-font-weight, var(--skill-font-weight-semibold, 600));
    color: var(--dropdown-group-title-color, var(--skill-gray-500, #6B7280));
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* ===== 头部和底部 ===== */

  ::slotted([slot="header"]) {
    padding: var(--dropdown-header-padding, var(--skill-spacing-sm, 12px) var(--skill-spacing-md, 16px));
    border-bottom: 1px solid var(--dropdown-header-border-color, var(--skill-gray-200, #E5E7EB));
    background: var(--dropdown-header-bg, var(--skill-gray-50, #F9FAFB));
  }

  ::slotted([slot="footer"]) {
    padding: var(--dropdown-footer-padding, var(--skill-spacing-sm, 12px) var(--skill-spacing-md, 16px));
    border-top: 1px solid var(--dropdown-footer-border-color, var(--skill-gray-200, #E5E7EB));
    background: var(--dropdown-footer-bg, var(--skill-gray-50, #F9FAFB));
  }

  /* ===== 尺寸变体 ===== */

  :host([size='sm']) .dropdown-trigger-wrapper {
    --dropdown-trigger-padding-y: var(--skill-spacing-2xs, 4px);
    --dropdown-trigger-padding-x: var(--skill-spacing-xs, 8px);
    --dropdown-trigger-font-size: var(--skill-font-size-body-3, 12px);
    --dropdown-trigger-radius: var(--skill-radius-sm, 4px);
  }

  :host([size='sm']) .skill-dropdown__menu {
    --dropdown-radius: var(--skill-radius-md, 6px);
    --dropdown-arrow-size: 6px;
  }

  :host([size='lg']) .dropdown-trigger-wrapper {
    --dropdown-trigger-padding-y: var(--skill-spacing-sm, 12px);
    --dropdown-trigger-padding-x: var(--skill-spacing-md, 16px);
    --dropdown-trigger-font-size: var(--skill-font-size-body-1, 16px);
    --dropdown-trigger-radius: var(--skill-radius-lg, 8px);
  }

  :host([size='lg']) .skill-dropdown__menu {
    --dropdown-radius: var(--skill-radius-xl, 12px);
    --dropdown-arrow-size: 10px;
  }

  /* ===== 滚动条样式 ===== */

  .skill-dropdown__content::-webkit-scrollbar {
    width: 6px;
  }

  .skill-dropdown__content::-webkit-scrollbar-track {
    background: var(--dropdown-scrollbar-track, var(--skill-gray-100, #F3F4F6));
  }

  .skill-dropdown__content::-webkit-scrollbar-thumb {
    background: var(--dropdown-scrollbar-thumb, var(--skill-gray-300, #D1D5DB));
    border-radius: var(--skill-radius-full, 9999px);
  }

  .skill-dropdown__content::-webkit-scrollbar-thumb:hover {
    background: var(--dropdown-scrollbar-thumb-hover, var(--skill-gray-400, #9CA3AF));
  }

  /* ===== 无障碍支持 ===== */

  :host([disabled]) {
    pointer-events: none;
  }

  @media (prefers-contrast: high) {
    .dropdown-trigger-wrapper {
      border-width: 2px;
      font-weight: var(--skill-font-weight-semibold, 600);
    }

    .skill-dropdown__menu {
      border-width: 2px;
    }

    .dropdown-trigger-wrapper:focus-visible {
      outline-width: 3px;
    }

    .skill-dropdown__search-input {
      border-width: 2px;
    }

    .skill-dropdown__search-input:focus {
      box-shadow: 0 0 0 3px rgba(10, 89, 247, 0.2);
    }
  }

  /* ===== 减少动画偏好支持 ===== */

  @media (prefers-reduced-motion: reduce) {
    .dropdown-trigger-wrapper,
    .skill-dropdown__menu,
    .skill-dropdown__search-input {
      transition: none;
    }

    .skill-dropdown__menu {
      transform: none;
    }

    .dropdown-chevron {
      transition: none;
    }
  }

  /* ===== 深色模式支持 ===== */

  @media (prefers-color-scheme: dark) {
    .dropdown-trigger-wrapper {
      --dropdown-trigger-bg: var(--skill-gray-800, #1F2937);
      --dropdown-trigger-color: var(--skill-gray-200, #E5E7EB);
      --dropdown-trigger-border-color: var(--skill-gray-600, #4B5563);
    }

    .dropdown-trigger-wrapper:hover {
      --dropdown-trigger-hover-bg: var(--skill-gray-700, #374151);
      --dropdown-trigger-hover-border-color: var(--skill-gray-500, #6B7280);
    }

    .skill-dropdown__menu {
      --dropdown-bg: var(--skill-gray-800, #1F2937);
      --dropdown-border-color: var(--skill-gray-600, #4B5563);
      --dropdown-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
    }

    .dropdown-item {
      --dropdown-item-color: var(--skill-gray-200, #E5E7EB);
    }

    .dropdown-item:hover:not(:disabled) {
      --dropdown-item-hover-bg: var(--skill-gray-700, #374151);
      --dropdown-item-hover-color: var(--skill-gray-100, #F3F4F6);
    }

    .skill-dropdown__search {
      --dropdown-search-border-color: var(--skill-gray-700, #374151);
    }

    .skill-dropdown__search-input {
      --dropdown-search-input-bg: var(--skill-gray-700, #374151);
      --dropdown-search-input-color: var(--skill-gray-200, #E5E7EB);
      --dropdown-search-input-border-color: var(--skill-gray-600, #4B5563);
    }

    .skill-dropdown__empty {
      --dropdown-empty-color: var(--skill-gray-400, #9CA3AF);
    }

    ::slotted([slot="header"]),
    ::slotted([slot="footer"]) {
      --dropdown-header-bg: var(--skill-gray-700, #374151);
      --dropdown-footer-bg: var(--skill-gray-700, #374151);
      --dropdown-header-border-color: var(--skill-gray-600, #4B5563);
      --dropdown-footer-border-color: var(--skill-gray-600, #4B5563);
    }

    .skill-dropdown__content::-webkit-scrollbar-track {
      --dropdown-scrollbar-track: var(--skill-gray-700, #374151);
    }

    .skill-dropdown__content::-webkit-scrollbar-thumb {
      --dropdown-scrollbar-thumb: var(--skill-gray-600, #4B5563);
    }

    .skill-dropdown__content::-webkit-scrollbar-thumb:hover {
      --dropdown-scrollbar-thumb-hover: var(--skill-gray-500, #6B7280);
    }
  }

  /* ===== 响应式设计 ===== */

  @media (max-width: 768px) {
    .skill-dropdown__menu {
      min-width: 140px;
    }

    .dropdown-item {
      padding: var(--skill-spacing-2xs, 4px) var(--skill-spacing-xs, 8px);
      font-size: var(--skill-font-size-body-3, 12px);
    }
  }

  /* ===== 打印样式 ===== */

  @media print {
    .skill-dropdown__menu {
      display: none;
    }
  }
`;