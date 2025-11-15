import { css } from 'lit';

/**
 * Toolbar 组件样式
 */
export const toolbarStyles = css`
  :host {
    display: flex;
    align-items: center;
    width: 100%;
    --toolbar-height: 56px;
    --toolbar-padding: 0 var(--skill-spacing-md, 16px);
    --toolbar-bg: var(--skill-white, #ffffff);
    --toolbar-border: 1px solid var(--skill-neutral-200, #e5e7eb);
    --toolbar-border-radius: var(--skill-radius-md, 6px);
    --toolbar-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --toolbar-item-size: 40px;
    --toolbar-gap: var(--skill-spacing-xs, 4px);
    --toolbar-text-color: var(--skill-text-primary, #1f2937);
    --toolbar-icon-color: var(--skill-neutral-600, #4b5563);
    --toolbar-hover-bg: var(--skill-neutral-100, #f3f4f6);
    --toolbar-active-bg: var(--skill-primary-50, #eff6ff);
    --toolbar-disabled-color: var(--skill-neutral-400, #9ca3af);
  }

  .skill-toolbar {
    font-family: var(--skill-font-family, inherit);
    font-size: var(--skill-font-body-2, 14px);
    line-height: 1.5;
    height: var(--toolbar-height);
    padding: var(--toolbar-padding);
    background-color: var(--toolbar-bg);
    border: var(--toolbar-border);
    border-radius: var(--toolbar-border-radius);
    box-shadow: var(--toolbar-shadow);
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  /* 布局变体 */
  .skill-toolbar--horizontal {
    flex-direction: row;
  }

  .skill-toolbar--vertical {
    flex-direction: column;
    height: auto;
    width: var(--toolbar-height);
    padding: var(--skill-spacing-md, 16px) 0;
  }

  /* 对齐方式 */
  .skill-toolbar--left {
    justify-content: flex-start;
  }

  .skill-toolbar--center {
    justify-content: center;
  }

  .skill-toolbar--right {
    justify-content: flex-end;
  }

  .skill-toolbar--space-between {
    justify-content: space-between;
  }

  .skill-toolbar--space-around {
    justify-content: space-around;
  }

  /* 工具栏区域 */
  .skill-toolbar__left,
  .skill-toolbar__center,
  .skill-toolbar__right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .skill-toolbar--horizontal .skill-toolbar__left {
    margin-right: auto;
  }

  .skill-toolbar--horizontal .skill-toolbar__right {
    margin-left: auto;
  }

  .skill-toolbar--horizontal .skill-toolbar__center {
    margin: 0 var(--skill-spacing-md, 16px);
  }

  .skill-toolbar--vertical .skill-toolbar__left {
    margin-bottom: auto;
  }

  .skill-toolbar--vertical .skill-toolbar__right {
    margin-top: auto;
  }

  .skill-toolbar--vertical .skill-toolbar__center {
    margin: var(--skill-spacing-md, 16px) 0;
  }

  /* 工具栏项 */
  .skill-toolbar__item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: var(--toolbar-item-size);
    min-height: var(--toolbar-item-size);
    padding: var(--skill-spacing-xs, 4px) var(--skill-spacing-sm, 8px);
    border-radius: var(--skill-radius-sm, 4px);
    color: var(--toolbar-text-color);
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    background: none;
    font: inherit;
    position: relative;
    gap: var(--skill-spacing-xs, 4px);
  }

  .skill-toolbar__item:hover {
    background-color: var(--toolbar-hover-bg);
    color: var(--toolbar-text-color);
    text-decoration: none;
  }

  .skill-toolbar__item:focus {
    outline: 2px solid var(--skill-primary-500, #3b82f6);
    outline-offset: 2px;
  }

  .skill-toolbar__item--active {
    background-color: var(--toolbar-active-bg);
    color: var(--skill-primary-700, #1d4ed8);
    font-weight: 500;
  }

  .skill-toolbar__item--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
    color: var(--toolbar-disabled-color);
  }

  .skill-toolbar__item--icon-only {
    width: var(--toolbar-item-size);
    height: var(--toolbar-item-size);
    padding: 0;
  }

  .skill-toolbar__item--text-only {
    padding: var(--skill-spacing-xs, 6px) var(--skill-spacing-md, 16px);
    min-height: auto;
    font-size: var(--skill-font-body-2, 14px);
    font-weight: 500;
  }

  /* 图标 */
  .skill-toolbar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    color: var(--toolbar-icon-color);
    flex-shrink: 0;
  }

  .skill-toolbar__item:hover .skill-toolbar__icon {
    color: var(--toolbar-text-color);
  }

  .skill-toolbar__item--active .skill-toolbar__icon {
    color: var(--skill-primary-600, #2563eb);
  }

  .skill-toolbar__icon svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  /* 文本 */
  .skill-toolbar__text {
    font-size: var(--skill-font-body-2, 14px);
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    min-width: 0;
  }

  /* 徽章 */
  .skill-toolbar__badge {
    position: absolute;
    top: 6px;
    right: 6px;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    background-color: var(--skill-error-500, #ef4444);
    color: var(--skill-white, #ffffff);
    font-size: 10px;
    font-weight: 600;
    border-radius: var(--skill-radius-full, 9999px);
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  /* 分割线 */
  .skill-toolbar__divider {
    width: 1px;
    height: 24px;
    background-color: var(--skill-neutral-200, #e5e7eb);
    margin: 0 var(--skill-spacing-sm, 8px);
    flex-shrink: 0;
  }

  .skill-toolbar--vertical .skill-toolbar__divider {
    width: 24px;
    height: 1px;
    margin: var(--skill-spacing-sm, 8px) 0;
  }

  .skill-toolbar__divider--dashed {
    background-image: linear-gradient(to bottom, var(--skill-neutral-300, #d1d5db) 50%, transparent 50%);
    background-size: 2px 6px;
    background-repeat: repeat-y;
  }

  .skill-toolbar--vertical .skill-toolbar__divider--dashed {
    background-image: linear-gradient(to right, var(--skill-neutral-300, #d1d5db) 50%, transparent 50%);
    background-size: 6px 2px;
    background-repeat: repeat-x;
  }

  /* 搜索框 */
  .skill-toolbar__search {
    position: relative;
    display: flex;
    align-items: center;
    min-width: 200px;
    max-width: 400px;
  }

  .skill-toolbar__search-input {
    width: 100%;
    height: var(--toolbar-item-size);
    padding: 0 var(--skill-spacing-md, 16px) 0 40px;
    border: 1px solid var(--skill-neutral-300, #d1d5db);
    border-radius: var(--skill-radius-sm, 4px);
    background-color: var(--skill-white, #ffffff);
    font-size: var(--skill-font-body-2, 14px);
    transition: all 0.2s ease;
  }

  .skill-toolbar__search-input:focus {
    outline: none;
    border-color: var(--skill-primary-500, #3b82f6);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  .skill-toolbar__search-icon {
    position: absolute;
    left: var(--skill-spacing-sm, 8px);
    width: 16px;
    height: 16px;
    color: var(--toolbar-icon-color);
    pointer-events: none;
  }

  /* 下拉菜单 */
  .skill-toolbar__dropdown {
    position: relative;
  }

  .skill-toolbar__dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background-color: var(--skill-white, #ffffff);
    border: 1px solid var(--skill-neutral-200, #e5e7eb);
    border-radius: var(--skill-radius-md, 6px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: all 0.2s ease;
    max-height: 300px;
    overflow-y: auto;
  }

  .skill-toolbar__dropdown-menu--visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(4px);
  }

  .skill-toolbar__dropdown-item {
    display: flex;
    align-items: center;
    padding: var(--skill-spacing-sm, 8px) var(--skill-spacing-md, 16px);
    color: var(--toolbar-text-color);
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
    border: none;
    background: none;
    font: inherit;
    width: 100%;
    text-align: left;
    gap: var(--skill-spacing-sm, 8px);
  }

  .skill-toolbar__dropdown-item:hover {
    background-color: var(--toolbar-hover-bg);
  }

  .skill-toolbar__dropdown-item--active {
    background-color: var(--toolbar-active-bg);
    color: var(--skill-primary-700, #1d4ed8);
    font-weight: 500;
  }

  .skill-toolbar__dropdown-item--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* 标签页 */
  .skill-toolbar__tabs {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 2px);
  }

  .skill-toolbar__tab {
    display: flex;
    align-items: center;
    padding: var(--skill-spacing-sm, 8px) var(--skill-spacing-md, 16px);
    border-radius: var(--skill-radius-sm, 4px) var(--skill-radius-sm, 4px) 0 0;
    border: none;
    background: none;
    color: var(--toolbar-text-color);
    cursor: pointer;
    transition: all 0.2s ease;
    font: inherit;
    font-weight: 500;
    position: relative;
  }

  .skill-toolbar__tab:hover {
    background-color: var(--toolbar-hover-bg);
  }

  .skill-toolbar__tab--active {
    background-color: var(--toolbar-active-bg);
    color: var(--skill-primary-700, #1d4ed8);
  }

  .skill-toolbar__tab--active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: var(--skill-primary-500, #3b82f6);
  }

  /* 面包屑导航 */
  .skill-toolbar__breadcrumb {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
    font-size: var(--skill-font-body-2, 14px);
    color: var(--toolbar-text-color);
  }

  .skill-toolbar__breadcrumb-item {
    color: var(--toolbar-text-color);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .skill-toolbar__breadcrumb-item:hover {
    color: var(--skill-primary-600, #2563eb);
  }

  .skill-toolbar__breadcrumb-separator {
    color: var(--toolbar-icon-color);
    margin: 0 var(--skill-spacing-xs, 2px);
  }

  /* 颜色主题 */
  .skill-toolbar--primary {
    --toolbar-bg: var(--skill-primary-500, #3b82f6);
    --toolbar-text-color: var(--skill-white, #ffffff);
    --toolbar-icon-color: rgba(255, 255, 255, 0.8);
    --toolbar-hover-bg: rgba(255, 255, 255, 0.1);
    --toolbar-active-bg: rgba(255, 255, 255, 0.2);
    --toolbar-border: none;
  }

  .skill-toolbar--secondary {
    --toolbar-bg: var(--skill-neutral-100, #f3f4f6);
    --toolbar-border: 1px solid var(--skill-neutral-200, #e5e7eb);
    --toolbar-text-color: var(--skill-neutral-700, #374151);
    --toolbar-icon-color: var(--skill-neutral-600, #4b5563);
    --toolbar-hover-bg: var(--skill-neutral-200, #e5e7eb);
  }

  .skill-toolbar--success {
    --toolbar-bg: var(--skill-success-500, #10b981);
    --toolbar-text-color: var(--skill-white, #ffffff);
    --toolbar-icon-color: rgba(255, 255, 255, 0.8);
    --toolbar-hover-bg: rgba(255, 255, 255, 0.1);
    --toolbar-active-bg: rgba(255, 255, 255, 0.2);
    --toolbar-border: none;
  }

  .skill-toolbar--warning {
    --toolbar-bg: var(--skill-warning-500, #f59e0b);
    --toolbar-text-color: var(--skill-white, #ffffff);
    --toolbar-icon-color: rgba(255, 255, 255, 0.8);
    --toolbar-hover-bg: rgba(255, 255, 255, 0.1);
    --toolbar-active-bg: rgba(255, 255, 255, 0.2);
    --toolbar-border: none;
  }

  .skill-toolbar--error {
    --toolbar-bg: var(--skill-error-500, #ef4444);
    --toolbar-text-color: var(--skill-white, #ffffff);
    --toolbar-icon-color: rgba(255, 255, 255, 0.8);
    --toolbar-hover-bg: rgba(255, 255, 255, 0.1);
    --toolbar-active-bg: rgba(255, 255, 255, 0.2);
    --toolbar-border: none;
  }

  /* 尺寸变体 */
  .skill-toolbar--xs {
    --toolbar-height: 40px;
    --toolbar-item-size: 32px;
    --toolbar-padding: 0 var(--skill-spacing-sm, 8px);
  }

  .skill-toolbar--sm {
    --toolbar-height: 48px;
    --toolbar-item-size: 36px;
    --toolbar-padding: 0 var(--skill-spacing-md, 12px);
  }

  .skill-toolbar--md {
    --toolbar-height: 56px;
    --toolbar-item-size: 40px;
    --toolbar-padding: 0 var(--skill-spacing-md, 16px);
  }

  .skill-toolbar--lg {
    --toolbar-height: 64px;
    --toolbar-item-size: 44px;
    --toolbar-padding: 0 var(--skill-spacing-lg, 20px);
  }

  .skill-toolbar--xl {
    --toolbar-height: 72px;
    --toolbar-item-size: 48px;
    --toolbar-padding: 0 var(--skill-spacing-xl, 24px);
  }

  /* 紧凑模式 */
  .skill-toolbar--compact {
    --toolbar-gap: 2px;
    --toolbar-padding: 0 var(--skill-spacing-sm, 8px);
  }

  .skill-toolbar--compact .skill-toolbar__item {
    padding: var(--skill-spacing-xs, 2px) var(--skill-spacing-sm, 6px);
  }

  /* 边框样式 */
  .skill-toolbar--outlined {
    --toolbar-shadow: none;
    --toolbar-border: 2px solid var(--skill-neutral-300, #d1d5db);
  }

  .skill-toolbar--borderless {
    --toolbar-border: none;
    --toolbar-shadow: none;
  }

  .skill-toolbar--elevated {
    --toolbar-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --toolbar-border: none;
  }

  /* 浮动模式 */
  .skill-toolbar--floating {
    --toolbar-border-radius: var(--skill-radius-lg, 8px);
    --toolbar-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --toolbar-border: none;
  }

  /* 透明模式 */
  .skill-toolbar--transparent {
    --toolbar-bg: transparent;
    --toolbar-border: none;
    --toolbar-shadow: none;
  }

  /* 粘性模式 */
  .skill-toolbar--sticky {
    position: sticky;
    top: 0;
    z-index: 100;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    :host {
      --toolbar-height: 48px;
      --toolbar-item-size: 36px;
      --toolbar-padding: 0 var(--skill-spacing-sm, 8px);
    }

    .skill-toolbar__search {
      min-width: 150px;
    }

    .skill-toolbar__text {
      display: none;
    }

    .skill-toolbar__divider {
      margin: 0 var(--skill-spacing-xs, 4px);
    }
  }

  @media (max-width: 480px) {
    .skill-toolbar__search {
      display: none;
    }

    .skill-toolbar__item--text-only {
      padding: var(--skill-spacing-xs, 4px) var(--skill-spacing-sm, 8px);
      font-size: var(--skill-font-body-3, 12px);
    }
  }

  /* 深色模式支持 */
  @media (prefers-color-scheme: dark) {
    :host {
      --toolbar-bg: var(--skill-neutral-800, #1f2937);
      --toolbar-border: 1px solid var(--skill-neutral-600, #4b5563);
      --toolbar-text-color: var(--skill-text-primary-dark, #f9fafb);
      --toolbar-icon-color: var(--skill-neutral-400, #9ca3af);
      --toolbar-hover-bg: var(--skill-neutral-700, #374151);
      --toolbar-active-bg: var(--skill-primary-900, #1e3a8a);
    }

    .skill-toolbar--secondary {
      --toolbar-bg: var(--skill-neutral-700, #374151);
      --toolbar-border: 1px solid var(--skill-neutral-600, #4b5563);
      --toolbar-hover-bg: var(--skill-neutral-600, #4b5563);
    }

    .skill-toolbar__search-input {
      background-color: var(--skill-neutral-700, #374151);
      border-color: var(--skill-neutral-600, #4b5563);
      color: var(--skill-text-primary-dark, #f9fafb);
    }

    .skill-toolbar__search-input::placeholder {
      color: var(--skill-neutral-400, #9ca3af);
    }

    .skill-toolbar__dropdown-menu {
      background-color: var(--skill-neutral-800, #1f2937);
      border-color: var(--skill-neutral-600, #4b5563);
    }
  }

  /* 高对比度模式 */
  @media (prefers-contrast: high) {
    .skill-toolbar__item {
      border: 1px solid transparent;
    }

    .skill-toolbar__item:hover,
    .skill-toolbar__item--active {
      border-color: var(--skill-primary-500, #3b82f6);
    }

    .skill-toolbar__search-input {
      border-width: 2px;
    }

    .skill-toolbar__dropdown-menu {
      border-width: 2px;
    }
  }

  /* 减少动画模式 */
  @media (prefers-reduced-motion: reduce) {
    .skill-toolbar__item,
    .skill-toolbar__dropdown-menu,
    .skill-toolbar__search-input,
    .skill-toolbar__tab {
      transition: none;
    }
  }

  /* 打印样式 */
  @media print {
    .skill-toolbar {
      background: white !important;
      color: black !important;
      box-shadow: none !important;
      border: 1px solid black !important;
    }

    .skill-toolbar__dropdown-menu {
      display: none !important;
    }
  }

  /* 插槽样式 */
  ::slotted([slot="left"]) {
    display: flex;
    align-items: center;
    gap: var(--toolbar-gap);
  }

  ::slotted([slot="center"]) {
    display: flex;
    align-items: center;
    gap: var(--toolbar-gap);
  }

  ::slotted([slot="right"]) {
    display: flex;
    align-items: center;
    gap: var(--toolbar-gap);
  }

  /* 焦点管理 */
  .skill-toolbar:focus-within {
    outline: 2px solid var(--skill-primary-500, #3b82f6);
    outline-offset: 2px;
  }

  /* 加载状态 */
  .skill-toolbar__item--loading {
    position: relative;
    color: transparent !important;
  }

  .skill-toolbar__item--loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    margin: -8px 0 0 -8px;
    border: 2px solid var(--toolbar-icon-color);
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* 拖拽状态 */
  .skill-toolbar__item--dragging {
    opacity: 0.5;
    transform: scale(0.95);
  }

  .skill-toolbar__item--drop-target {
    background-color: var(--toolbar-active-bg);
    border: 2px dashed var(--skill-primary-500, #3b82f6);
  }
`;