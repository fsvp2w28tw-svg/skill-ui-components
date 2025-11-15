import { css } from 'lit';

/**
 * Skill Virtual List 组件样式
 * 虚拟滚动列表组件，高性能处理大量数据
 */
export const virtualListStyles = css`
  /* ===== 容器样式 ===== */
  .skill-virtual-list__container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: var(--skill-gray-0, #ffffff);
    border-radius: var(--skill-radius-lg, 8px);
    overflow: hidden;
    box-shadow: var(--skill-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
  }

  /* ===== 视口样式 ===== */
  .skill-virtual-list__viewport {
    flex: 1;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
  }

  .skill-virtual-list__viewport[show-scrollbar='false'] {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .skill-virtual-list__viewport[show-scrollbar='false']::-webkit-scrollbar {
    display: none;
  }

  /* 自定义滚动条 */
  .skill-virtual-list__viewport::-webkit-scrollbar {
    width: var(--scrollbar-width, 8px);
    height: var(--scrollbar-width, 8px);
  }

  .skill-virtual-list__viewport::-webkit-scrollbar-track {
    background: var(--skill-gray-100, #f3f4f6);
    border-radius: var(--scrollbar-width, 8px);
  }

  .skill-virtual-list__viewport::-webkit-scrollbar-thumb {
    background: var(--skill-gray-300, #d1d5db);
    border-radius: var(--scrollbar-width, 8px);
    transition: background var(--skill-transition-duration-fast, 150ms) var(--skill-transition-easing, ease-in-out);
  }

  .skill-virtual-list__viewport::-webkit-scrollbar-thumb:hover {
    background: var(--skill-gray-400, #9ca3af);
  }

  /* ===== 内容包装器 ===== */
  .skill-virtual-list__content {
    position: relative;
    min-height: 100%;
    min-width: 100%;
  }

  /* ===== 列表项样式 ===== */
  .skill-virtual-list__item {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: var(--skill-spacing-md, 16px) var(--skill-spacing-lg, 24px);
    background: var(--item-bg, var(--skill-gray-0, #ffffff));
    border-bottom: 1px solid var(--skill-gray-200, #e5e7eb);
    cursor: default;
    user-select: none;
    transition: all var(--skill-transition-duration-fast, 150ms) var(--skill-transition-easing, ease-in-out);
    contain: layout style paint;
  }

  .skill-virtual-list__item:hover {
    background: var(--item-hover-bg, var(--skill-gray-50, #f9fafb));
  }

  .skill-virtual-list__item[selectable] {
    cursor: pointer;
  }

  .skill-virtual-list__item[selectable]:hover {
    background: var(--item-hover-bg, var(--skill-gray-50, #f9fafb));
  }

  .skill-virtual-list__item[selected] {
    background: var(--item-selected-bg, var(--skill-primary-50, #eff6ff));
    border-color: var(--skill-primary-200, #bfdbfe);
  }

  .skill-virtual-list__item:last-child {
    border-bottom: none;
  }

  /* ===== 列表项内容 ===== */
  .skill-virtual-list__item-content {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--skill-gray-700, #374151);
    font-size: var(--skill-font-body-2, 16px);
    line-height: 1.5;
  }

  /* ===== 尺寸变体 ===== */

  /* Extra small */
  :host([size='xs']) .skill-virtual-list__item {
    padding: var(--skill-spacing-xs, 4px) var(--skill-spacing-sm, 8px);
    font-size: var(--skill-font-body-4, 12px);
  }

  :host([size='xs']) .skill-virtual-list__item-content {
    font-size: var(--skill-font-body-4, 12px);
  }

  /* Small */
  :host([size='sm']) .skill-virtual-list__item {
    padding: var(--skill-spacing-sm, 8px) var(--skill-spacing-md, 16px);
    font-size: var(--skill-font-body-3, 14px);
  }

  :host([size='sm']) .skill-virtual-list__item-content {
    font-size: var(--skill-font-body-3, 14px);
  }

  /* Medium (default) */
  :host([size='md']) .skill-virtual-list__item,
  :host(:not([size])) .skill-virtual-list__item {
    padding: var(--skill-spacing-md, 16px) var(--skill-spacing-lg, 24px);
    font-size: var(--skill-font-body-2, 16px);
  }

  :host([size='md']) .skill-virtual-list__item-content,
  :host(:not([size])) .skill-virtual-list__item-content {
    font-size: var(--skill-font-body-2, 16px);
  }

  /* Large */
  :host([size='lg']) .skill-virtual-list__item {
    padding: var(--skill-spacing-lg, 24px) var(--skill-spacing-xl, 32px);
    font-size: var(--skill-font-body-1, 18px);
  }

  :host([size='lg']) .skill-virtual-list__item-content {
    font-size: var(--skill-font-body-1, 18px);
  }

  /* Extra large */
  :host([size='xl']) .skill-virtual-list__item {
    padding: var(--skill-spacing-xl, 32px) var(--skill-spacing-2xl, 48px);
    font-size: var(--skill-font-h3, 20px);
  }

  :host([size='xl']) .skill-virtual-list__item-content {
    font-size: var(--skill-font-h3, 20px);
  }

  /* ===== 加载状态 ===== */
  .skill-virtual-list__loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    backdrop-filter: blur(2px);
  }

  .skill-virtual-list__loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--skill-spacing-md, 16px);
    padding: var(--skill-spacing-xl, 48px);
  }

  .skill-virtual-list__loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--skill-gray-200, #e5e7eb);
    border-top: 3px solid var(--skill-primary-600, #2563eb);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .skill-virtual-list__loading-text {
    color: var(--skill-gray-600, #4b5563);
    font-size: var(--skill-font-body-2, 16px);
    font-weight: 500;
  }

  /* ===== 空状态 ===== */
  .skill-virtual-list__empty {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .skill-virtual-list__empty-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--skill-spacing-md, 16px);
    padding: var(--skill-spacing-xl, 48px);
    text-align: center;
  }

  .skill-virtual-list__empty-icon {
    font-size: 48px;
    opacity: 0.5;
  }

  .skill-virtual-list__empty-text {
    color: var(--skill-gray-500, #6b7280);
    font-size: var(--skill-font-body-2, 16px);
    font-weight: 500;
  }

  /* ===== 水平模式 ===== */
  :host([horizontal]) .skill-virtual-list__viewport {
    overflow-x: auto;
    overflow-y: hidden;
  }

  :host([horizontal]) .skill-virtual-list__item {
    border-right: 1px solid var(--skill-gray-200, #e5e7eb);
    border-bottom: none;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    min-width: 120px;
  }

  :host([horizontal]) .skill-virtual-list__item:last-child {
    border-right: none;
  }

  :host([horizontal]) .skill-virtual-list__item-content {
    white-space: normal;
    text-overflow: initial;
    max-width: 100%;
  }

  /* ===== 选择状态指示器 ===== */
  .skill-virtual-list__item[selected]::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--skill-primary-600, #2563eb);
    border-radius: 0 2px 2px 0;
  }

  :host([horizontal]) .skill-virtual-list__item[selected]::before {
    left: 0;
    right: 0;
    top: 0;
    width: auto;
    height: 4px;
    border-radius: 0 0 2px 2px;
  }

  /* ===== 焦点样式 ===== */
  .skill-virtual-list__item:focus-visible {
    outline: 2px solid var(--skill-primary-500, #3b82f6);
    outline-offset: -2px;
  }

  /* ===== 响应式设计 ===== */
  @media (max-width: 768px) {
    .skill-virtual-list__item {
      padding: var(--skill-spacing-sm, 8px) var(--skill-spacing-md, 16px);
    }

    .skill-virtual-list__item-content {
      font-size: var(--skill-font-body-3, 14px);
    }

    .skill-virtual-list__loading-content {
      padding: var(--skill-spacing-lg, 24px);
    }

    .skill-virtual-list__empty-content {
      padding: var(--skill-spacing-lg, 24px);
    }
  }

  @media (max-width: 480px) {
    .skill-virtual-list__item {
      padding: var(--skill-spacing-xs, 4px) var(--skill-spacing-sm, 8px);
    }

    .skill-virtual-list__item-content {
      font-size: var(--skill-font-body-4, 12px);
    }
  }

  /* ===== 高对比度模式支持 ===== */
  @media (prefers-contrast: high) {
    .skill-virtual-list__item {
      border-width: 2px;
    }

    .skill-virtual-list__item[selected] {
      border-color: var(--skill-primary-600, #2563eb);
    }

    .skill-virtual-list__item:focus-visible {
      outline-width: 3px;
    }
  }

  /* ===== 减少动画偏好支持 ===== */
  @media (prefers-reduced-motion: reduce) {
    .skill-virtual-list__viewport {
      scroll-behavior: auto;
    }

    .skill-virtual-list__item,
    .skill-virtual-list__loading-spinner {
      transition: none;
    }

    .skill-virtual-list__loading-spinner {
      animation: none;
    }
  }

  /* ===== 深色模式支持 ===== */
  @media (prefers-color-scheme: dark) {
    .skill-virtual-list__container {
      background: var(--skill-gray-900, #111827);
    }

    .skill-virtual-list__item {
      background: var(--item-bg, var(--skill-gray-900, #111827));
      border-color: var(--skill-gray-700, #374151);
    }

    .skill-virtual-list__item:hover,
    .skill-virtual-list__item[selectable]:hover {
      background: var(--item-hover-bg, var(--skill-gray-800, #1f2937));
    }

    .skill-virtual-list__item[selected] {
      background: var(--item-selected-bg, var(--skill-primary-900, #1e3a8a));
      border-color: var(--skill-primary-700, #1d4ed8);
    }

    .skill-virtual-list__item-content {
      color: var(--skill-gray-300, #d1d5db);
    }

    .skill-virtual-list__loading {
      background: rgba(17, 24, 39, 0.9);
    }

    .skill-virtual-list__loading-text {
      color: var(--skill-gray-400, #9ca3af);
    }

    .skill-virtual-list__empty-text {
      color: var(--skill-gray-400, #9ca3af);
    }

    .skill-virtual-list__viewport::-webkit-scrollbar-track {
      background: var(--skill-gray-800, #1f2937);
    }

    .skill-virtual-list__viewport::-webkit-scrollbar-thumb {
      background: var(--skill-gray-600, #4b5563);
    }

    .skill-virtual-list__viewport::-webkit-scrollbar-thumb:hover {
      background: var(--skill-gray-500, #6b7280);
    }
  }

  /* ===== 打印样式 ===== */
  @media print {
    .skill-virtual-list__loading,
    .skill-virtual-list__empty {
      display: none !important;
    }

    .skill-virtual-list__item {
      break-inside: avoid;
      page-break-inside: avoid;
      background: transparent !important;
      color: black !important;
      border-color: #000 !important;
    }

    .skill-virtual-list__viewport {
      overflow: visible !important;
      height: auto !important;
    }

    .skill-virtual-list__content {
      position: static !important;
      height: auto !important;
    }
  }

  /* ===== 性能优化 ===== */
  .skill-virtual-list__viewport {
    contain: layout style paint;
  }

  .skill-virtual-list__content {
    contain: layout style;
    will-change: transform;
  }

  .skill-virtual-list__item {
    contain: layout style paint;
    will-change: background-color;
  }

  /* ===== 动画定义 ===== */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* ===== 滚动条样式优化 ===== */
  .skill-virtual-list__viewport {
    scrollbar-gutter: stable;
  }

  /* Firefox 滚动条样式 */
  .skill-virtual-list__viewport {
    scrollbar-width: thin;
    scrollbar-color: var(--skill-gray-300, #d1d5db) var(--skill-gray-100, #f3f4f6);
  }

  /* ===== 触摸设备优化 ===== */
  @media (hover: none) and (pointer: coarse) {
    .skill-virtual-list__item {
      min-height: 44px; /* 触摸目标最小尺寸 */
    }

    .skill-virtual-list__item:hover {
      background: transparent;
    }

    .skill-virtual-list__item:active {
      background: var(--item-hover-bg, var(--skill-gray-100, #f3f4f6));
    }
  }
`;