import { css } from 'lit';

export const breadcrumbStyles = css`
  :host {
    display: block;
  }

  .skill-breadcrumb {
    display: flex;
    align-items: center;
    font-size: var(--breadcrumb-font-size, var(--skill-font-size-body-2, 14px));
    font-weight: var(--breadcrumb-font-weight, var(--skill-font-weight-normal, 400));
    color: var(--breadcrumb-color, var(--skill-gray-600, #4B5563));
    line-height: 1.4;
  }

  .skill-breadcrumb__list {
    display: flex;
    align-items: center;
    gap: var(--breadcrumb-gap, var(--skill-spacing-xs, 8px));
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .skill-breadcrumb__item {
    display: flex;
    align-items: center;
    gap: var(--breadcrumb-gap, var(--skill-spacing-xs, 8px));
  }

  .skill-breadcrumb__link {
    display: inline-flex;
    align-items: center;
    gap: var(--breadcrumb-link-gap, var(--skill-spacing-2xs, 4px));
    color: var(--breadcrumb-item-color, var(--skill-gray-600, #4B5563));
    text-decoration: none;
    border-radius: var(--breadcrumb-item-radius, var(--skill-radius-sm, 4px));
    padding: var(--breadcrumb-item-padding, 0);
    transition: all var(--skill-duration-fast, 200ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
    outline: none;
    cursor: pointer;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }

  .skill-breadcrumb__link:hover:not(.skill-breadcrumb__link--current) {
    color: var(--breadcrumb-item-hover-color, var(--skill-primary-600, #2563EB));
    background: var(--breadcrumb-item-hover-bg, var(--skill-primary-50, #EFF6FF));
  }

  .skill-breadcrumb__link:focus-visible {
    outline: 2px solid var(--skill-primary-500, #0A59F7);
    outline-offset: 2px;
    border-radius: var(--breadcrumb-item-radius, var(--skill-radius-sm, 4px));
  }

  .skill-breadcrumb__link[aria-disabled="true"] {
    color: var(--breadcrumb-item-disabled-color, var(--skill-gray-400, #9CA3AF));
    cursor: not-allowed;
    pointer-events: none;
  }

  .skill-breadcrumb__link--current {
    color: var(--breadcrumb-current-color, var(--skill-gray-900, #111827));
    font-weight: var(--breadcrumb-current-font-weight, var(--skill-font-weight-medium, 500));
    cursor: default;
  }

  .skill-breadcrumb__separator {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--breadcrumb-separator-color, var(--skill-gray-400, #9CA3AF));
    font-size: var(--breadcrumb-separator-font-size, 0.9em);
    user-select: none;
    flex-shrink: 0;
  }

  .skill-breadcrumb__home-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
  }

  /* 尺寸变体 */
  :host([size='xs']) .skill-breadcrumb {
    --breadcrumb-font-size: var(--skill-font-size-caption, 10px);
    --breadcrumb-gap: var(--skill-spacing-2xs, 4px);
    --breadcrumb-item-padding: 2px 4px;
    --breadcrumb-link-gap: 2px;
  }

  :host([size='sm']) .skill-breadcrumb {
    --breadcrumb-font-size: var(--skill-font-size-body-3, 12px);
    --breadcrumb-gap: var(--skill-spacing-xs, 8px);
    --breadcrumb-item-padding: 4px 6px;
    --breadcrumb-link-gap: 3px;
  }

  :host([size='md']) .skill-breadcrumb {
    --breadcrumb-font-size: var(--skill-font-size-body-2, 14px);
    --breadcrumb-gap: var(--skill-spacing-xs, 8px);
    --breadcrumb-item-padding: 6px 8px;
    --breadcrumb-link-gap: 4px;
  }

  :host([size='lg']) .skill-breadcrumb {
    --breadcrumb-font-size: var(--skill-font-size-body-1, 16px);
    --breadcrumb-gap: var(--skill-spacing-sm, 12px);
    --breadcrumb-item-padding: 8px 12px;
    --breadcrumb-link-gap: 6px;
  }

  :host([size='xl']) .skill-breadcrumb {
    --breadcrumb-font-size: var(--skill-font-size-h4, 18px);
    --breadcrumb-gap: var(--skill-spacing-sm, 12px);
    --breadcrumb-item-padding: 10px 16px;
    --breadcrumb-link-gap: 8px;
  }

  /* 变体样式 */
  :host([variant='pills']) .skill-breadcrumb__link {
    background: var(--breadcrumb-pill-bg, var(--skill-gray-100, #F3F4F6));
    border: 1px solid var(--breadcrumb-pill-border-color, var(--skill-gray-200, #E5E7EB));
    padding: var(--breadcrumb-pill-padding, 4px 8px);
  }

  :host([variant='pills']) .skill-breadcrumb__link:hover:not(.skill-breadcrumb__link--current) {
    background: var(--breadcrumb-pill-hover-bg, var(--skill-primary-100, #DBEAFE));
    border-color: var(--breadcrumb-pill-hover-border-color, var(--skill-primary-300, #93C5FD));
  }

  :host([variant='pills']) .skill-breadcrumb__link--current {
    background: var(--breadcrumb-pill-current-bg, var(--skill-primary-500, #0A59F7));
    border-color: var(--breadcrumb-pill-current-border-color, var(--skill-primary-500, #0A59F7));
    color: var(--skill-white, #FFFFFF);
  }

  :host([variant='underline']) .skill-breadcrumb__link {
    border-bottom: 2px solid transparent;
    padding-bottom: 2px;
  }

  :host([variant='underline']) .skill-breadcrumb__link:hover:not(.skill-breadcrumb__link--current) {
    border-bottom-color: var(--breadcrumb-underline-hover-color, var(--skill-primary-500, #0A59F7));
    background: none;
  }

  :host([variant='underline']) .skill-breadcrumb__link--current {
    border-bottom-color: var(--breadcrumb-underline-current-color, var(--skill-primary-600, #2563EB));
    color: var(--breadcrumb-current-color, var(--skill-primary-700, #1D4ED8));
  }

  /* 颜色变体 */
  :host([color='primary']) .skill-breadcrumb__link {
    --breadcrumb-item-color: var(--skill-primary-600, #2563EB);
    --breadcrumb-item-hover-color: var(--skill-primary-700, #1D4ED8);
    --breadcrumb-current-color: var(--skill-primary-800, #1E40AF);
  }

  :host([color='primary']) .skill-breadcrumb__link:hover:not(.skill-breadcrumb__link--current) {
    --breadcrumb-item-hover-bg: var(--skill-primary-50, #EFF6FF);
  }

  :host([color='secondary']) .skill-breadcrumb__link {
    --breadcrumb-item-color: var(--skill-secondary-600, #0D9488);
    --breadcrumb-item-hover-color: var(--skill-secondary-700, #0F766E);
    --breadcrumb-current-color: var(--skill-secondary-800, #115E59);
  }

  :host([color='secondary']) .skill-breadcrumb__link:hover:not(.skill-breadcrumb__link--current) {
    --breadcrumb-item-hover-bg: var(--skill-secondary-50, #F0FDFA);
  }

  :host([color='success']) .skill-breadcrumb__link {
    --breadcrumb-item-color: var(--skill-success-600, #16A34A);
    --breadcrumb-item-hover-color: var(--skill-success-700, #15803D);
    --breadcrumb-current-color: var(--skill-success-800, #166534);
  }

  :host([color='success']) .skill-breadcrumb__link:hover:not(.skill-breadcrumb__link--current) {
    --breadcrumb-item-hover-bg: var(--skill-success-50, #F0FDF4);
  }

  :host([color='warning']) .skill-breadcrumb__link {
    --breadcrumb-item-color: var(--skill-warning-600, #CA8A04);
    --breadcrumb-item-hover-color: var(--skill-warning-700, #A16207);
    --breadcrumb-current-color: var(--skill-warning-800, #92400E);
  }

  :host([color='warning']) .skill-breadcrumb__link:hover:not(.skill-breadcrumb__link--current) {
    --breadcrumb-item-hover-bg: var(--skill-warning-50, #FFFBEB);
  }

  :host([color='error']) .skill-breadcrumb__link {
    --breadcrumb-item-color: var(--skill-error-600, #DC2626);
    --breadcrumb-item-hover-color: var(--skill-error-700, #B91C1C);
    --breadcrumb-current-color: var(--skill-error-800, #991B1B);
  }

  :host([color='error']) .skill-breadcrumb__link:hover:not(.skill-breadcrumb__link--current) {
    --breadcrumb-item-hover-bg: var(--skill-error-50, #FEF2F2);
  }

  :host([color='info']) .skill-breadcrumb__link {
    --breadcrumb-item-color: var(--skill-info-600, #0284C7);
    --breadcrumb-item-hover-color: var(--skill-info-700, #0369A1);
    --breadcrumb-current-color: var(--skill-info-800, #075985);
  }

  :host([color='info']) .skill-breadcrumb__link:hover:not(.skill-breadcrumb__link--current) {
    --breadcrumb-item-hover-bg: var(--skill-info-50, #EFF6FF);
  }

  :host([color='gray']) .skill-breadcrumb__link {
    --breadcrumb-item-color: var(--skill-gray-600, #4B5563);
    --breadcrumb-item-hover-color: var(--skill-gray-700, #374151);
    --breadcrumb-current-color: var(--skill-gray-900, #111827);
  }

  :host([color='gray']) .skill-breadcrumb__link:hover:not(.skill-breadcrumb__link--current) {
    --breadcrumb-item-hover-bg: var(--skill-gray-50, #F9FAFB);
  }

  /* 省略号样式 */
  .skill-breadcrumb__link[aria-disabled="true"]:not(.skill-breadcrumb__link--current) {
    color: var(--breadcrumb-ellipsis-color, var(--skill-gray-400, #9CA3AF));
    cursor: pointer;
    pointer-events: auto;
    text-decoration: underline;
    text-decoration-style: dotted;
    text-underline-offset: 2px;
  }

  .skill-breadcrumb__link[aria-disabled="true"]:hover {
    color: var(--breadcrumb-ellipsis-hover-color, var(--skill-gray-600, #4B5563));
  }

  /* 省略号下拉菜单 */
  .skill-breadcrumb__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background: var(--dropdown-bg, var(--skill-white, #FFFFFF));
    border: 1px solid var(--dropdown-border-color, var(--skill-gray-200, #E5E7EB));
    border-radius: var(--dropdown-radius, var(--skill-radius-lg, 8px));
    box-shadow: var(--dropdown-shadow, var(--skill-shadow-lg, 0 10px 25px -5px rgba(0, 0, 0, 0.1)));
    z-index: var(--dropdown-z-index, 100);
    margin-top: 4px;
  }

  .skill-breadcrumb__dropdown-menu {
    max-height: var(--dropdown-max-height, 300px);
    overflow-y: auto;
    padding: var(--dropdown-padding, var(--skill-spacing-2xs, 4px) 0);
  }

  .skill-breadcrumb__dropdown-item {
    display: flex;
    align-items: center;
    gap: var(--dropdown-item-gap, var(--skill-spacing-xs, 8px));
    padding: var(--dropdown-item-padding, var(--skill-spacing-xs, 8px) var(--skill-spacing-sm, 12px));
    color: var(--dropdown-item-color, var(--skill-gray-700, #374151));
    text-decoration: none;
    font-size: var(--dropdown-item-font-size, var(--skill-font-size-body-2, 14px));
    transition: all var(--skill-duration-fast, 200ms);
    cursor: pointer;
  }

  .skill-breadcrumb__dropdown-item:hover,
  .skill-breadcrumb__dropdown-item:focus {
    background: var(--dropdown-item-hover-bg, var(--skill-primary-50, #EFF6FF));
    color: var(--dropdown-item-hover-color, var(--skill-primary-700, #1D4ED8));
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    :host([responsive]) .skill-breadcrumb {
      --breadcrumb-gap: var(--skill-spacing-2xs, 4px);
      --breadcrumb-font-size: var(--skill-font-size-body-3, 12px);
    }

    :host([responsive]) .skill-breadcrumb__list {
      gap: var(--skill-spacing-2xs, 4px);
    }

    :host([responsive]) .skill-breadcrumb__link {
      --breadcrumb-item-padding: 4px 6px;
    }

    /* 自动折叠长路径 */
    :host([responsive]) .skill-breadcrumb__item:nth-child(n+4):not(:last-child) {
      display: none;
    }

    :host([responsive]) .skill-breadcrumb__item:nth-child(3):not(:last-child)::after {
      content: '...';
      color: var(--skill-gray-400, #9CA3AF);
      font-style: italic;
    }
  }

  /* 高对比度模式支持 */
  @media (prefers-contrast: high) {
    .skill-breadcrumb__link {
      font-weight: var(--skill-font-weight-medium, 500);
      border-radius: var(--skill-radius-sm, 4px);
    }

    .skill-breadcrumb__link--current {
      font-weight: var(--skill-font-weight-semibold, 600);
    }

    .skill-breadcrumb__link:focus-visible {
      outline-width: 3px;
    }

    :host([variant='pills']) .skill-breadcrumb__link {
      border-width: 2px;
    }

    .skill-breadcrumb__dropdown {
      border-width: 2px;
    }
  }

  /* 减少动画偏好支持 */
  @media (prefers-reduced-motion: reduce) {
    .skill-breadcrumb__link,
    .skill-breadcrumb__dropdown-item {
      transition: none;
    }
  }

  /* 深色模式支持 */
  @media (prefers-color-scheme: dark) {
    .skill-breadcrumb {
      --breadcrumb-color: var(--skill-gray-400, #9CA3AF);
    }

    .skill-breadcrumb__link {
      --breadcrumb-item-color: var(--skill-gray-400, #9CA3AF);
    }

    .skill-breadcrumb__link--current {
      --breadcrumb-current-color: var(--skill-gray-100, #F3F4F6);
    }

    .skill-breadcrumb__separator {
      --breadcrumb-separator-color: var(--skill-gray-500, #6B7280);
    }

    .skill-breadcrumb__dropdown {
      --dropdown-bg: var(--skill-gray-800, #1F2937);
      --dropdown-border-color: var(--skill-gray-600, #4B5563);
      --dropdown-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
    }

    .skill-breadcrumb__dropdown-item {
      --dropdown-item-color: var(--skill-gray-200, #E5E7EB);
    }

    :host([variant='pills']) .skill-breadcrumb__link {
      --breadcrumb-pill-bg: var(--skill-gray-700, #374151);
      --breadcrumb-pill-border-color: var(--skill-gray-600, #4B5563);
    }

    :host([variant='pills']) .skill-breadcrumb__link:hover:not(.skill-breadcrumb__link--current) {
      --breadcrumb-pill-hover-bg: rgba(59, 130, 246, 0.1);
      --breadcrumb-pill-hover-border-color: var(--skill-primary-400, #60A5FA);
    }
  }

  /* 打印样式 */
  @media print {
    .skill-breadcrumb {
      color: #000;
    }

    .skill-breadcrumb__link {
      color: #000;
    }

    .skill-breadcrumb__link--current {
      font-weight: bold;
      color: #000;
    }

    .skill-breadcrumb__dropdown {
      display: none;
    }

    :host([responsive]) .skill-breadcrumb__item {
      display: flex !important;
    }

    :host([responsive]) .skill-breadcrumb__item::after {
      display: none !important;
    }
  }

  /* 图标模式 */
  :host([show-icons]) .skill-breadcrumb__link {
    --breadcrumb-link-gap: var(--skill-spacing-xs, 8px);
  }

  :host([icon-only]) .skill-breadcrumb__link span:not(.skill-breadcrumb__home-icon) {
    display: none;
  }

  :host([icon-only]) .skill-breadcrumb__link {
    --breadcrumb-link-gap: 0;
    padding: var(--breadcrumb-icon-padding, 6px);
  }

  /* 加载状态 */
  .skill-breadcrumb--loading .skill-breadcrumb__link {
    opacity: 0.7;
    pointer-events: none;
  }

  .skill-breadcrumb--loading .skill-breadcrumb__link::after {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left: var(--skill-spacing-xs, 8px);
    border: 2px solid var(--skill-gray-300, #D1D5DB);
    border-top-color: var(--skill-primary-500, #0A59F7);
    border-radius: 50%;
    animation: breadcrumb-loading-spin 0.6s linear infinite;
  }

  @keyframes breadcrumb-loading-spin {
    to { transform: rotate(360deg); }
  }

  /* 垂直布局 */
  :host([orientation='vertical']) .skill-breadcrumb {
    flex-direction: column;
    align-items: flex-start;
  }

  :host([orientation='vertical']) .skill-breadcrumb__list {
    flex-direction: column;
    gap: var(--skill-spacing-2xs, 4px);
  }

  :host([orientation='vertical']) .skill-breadcrumb__item {
    flex-direction: row;
  }

  :host([orientation='vertical']) .skill-breadcrumb__separator {
    transform: rotate(90deg);
    margin: var(--skill-spacing-2xs, 4px) 0;
  }

  /* 辅助功能增强 */
  .skill-breadcrumb[aria-label]::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* 滚动条样式（下拉菜单） */
  .skill-breadcrumb__dropdown-menu::-webkit-scrollbar {
    width: 6px;
  }

  .skill-breadcrumb__dropdown-menu::-webkit-scrollbar-track {
    background: var(--dropdown-scrollbar-track, var(--skill-gray-100, #F3F4F6));
  }

  .skill-breadcrumb__dropdown-menu::-webkit-scrollbar-thumb {
    background: var(--dropdown-scrollbar-thumb, var(--skill-gray-300, #D1D5DB));
    border-radius: var(--skill-radius-full, 9999px);
  }

  .skill-breadcrumb__dropdown-menu::-webkit-scrollbar-thumb:hover {
    background: var(--dropdown-scrollbar-thumb-hover, var(--skill-gray-400, #9CA3AF));
  }
`;