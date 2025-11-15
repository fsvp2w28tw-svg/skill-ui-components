import { css } from 'lit';

/**
 * ListItem 组件样式
 */
export const listItemStyles = css`
  :host {
    display: block;
    width: 100%;
    --list-item-padding: var(--skill-spacing-md, 16px);
    --list-item-bg: var(--skill-surface-0, #ffffff);
    --list-item-bg-hover: var(--skill-gray-50, #f9fafb);
    --list-item-bg-active: var(--skill-gray-100, #f3f4f6);
    --list-item-bg-selected: var(--skill-primary-50, #eff6ff);
    --list-item-text: var(--skill-gray-900, #111827);
    --list-item-text-secondary: var(--skill-gray-600, #4b5563);
    --list-item-text-muted: var(--skill-gray-500, #6b7280);
    --list-item-border: var(--skill-gray-200, #e5e7eb);
    --list-item-radius: var(--skill-radius-md, 6px);
    --list-item-transition: all 0.2s ease;
    --list-item-gap: var(--skill-spacing-md, 16px);
  }

  .list-item {
    display: flex;
    align-items: center;
    padding: var(--list-item-padding);
    border-radius: var(--list-item-radius);
    transition: var(--list-item-transition);
    position: relative;
    background: var(--list-item-bg);
    color: var(--list-item-text);
  }

  /* 可点击状态 */
  .list-item--clickable {
    cursor: pointer;
    user-select: none;
  }

  .list-item--clickable:hover {
    background: var(--list-item-bg-hover);
  }

  .list-item--clickable:active {
    background: var(--list-item-bg-active);
    transform: scale(0.995);
  }

  /* 选中状态 */
  .list-item--selected {
    background: var(--list-item-bg-selected);
    color: var(--skill-primary-700, #1d4ed8);
  }

  .list-item--selected .list-item__description,
  .list-item--selected .list-item__subtitle {
    color: var(--skill-primary-600, #2563eb);
  }

  /* 禁用状态 */
  .list-item--disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }

  /* 尺寸变体 */
  .list-item--compact {
    padding: var(--skill-spacing-sm) var(--skill-spacing-md);
    --list-item-gap: var(--skill-spacing-sm, 12px);
  }

  .list-item--relaxed {
    padding: var(--skill-spacing-lg);
    --list-item-gap: var(--skill-spacing-lg, 24px);
  }

  /* 布局部分 */
  .list-item__start {
    display: flex;
    align-items: center;
    margin-right: var(--list-item-gap);
    flex-shrink: 0;
  }

  .list-item__content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--skill-spacing-xs, 4px);
  }

  .list-item__end {
    display: flex;
    align-items: center;
    margin-left: var(--list-item-gap);
    gap: var(--skill-spacing-sm, 8px);
    flex-shrink: 0;
  }

  /* 文本样式 */
  .list-item__title {
    font-size: var(--skill-font-size-md, 14px);
    font-weight: var(--skill-font-weight-medium, 500);
    color: var(--list-item-text);
    margin: 0;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list-item__description {
    font-size: var(--skill-font-size-sm, 12px);
    color: var(--list-item-text-secondary);
    margin: 0;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list-item__subtitle {
    font-size: var(--skill-font-size-xs, 11px);
    color: var(--list-item-text-muted);
    margin: 0;
    line-height: 1.3;
  }

  /* 紧凑变体文本样式 */
  .list-item--compact .list-item__title {
    font-size: var(--skill-font-size-sm, 12px);
    font-weight: var(--skill-font-weight-normal, 400);
  }

  .list-item--compact .list-item__description {
    font-size: var(--skill-font-size-xs, 11px);
  }

  .list-item--compact .list-item__subtitle {
    font-size: 10px;
  }

  /* 宽松变体文本样式 */
  .list-item--relaxed .list-item__title {
    font-size: var(--skill-font-size-lg, 16px);
  }

  .list-item--relaxed .list-item__description {
    font-size: var(--skill-font-size-md, 14px);
  }

  /* 徽章样式 */
  .list-item__badge {
    display: inline-flex;
    align-items: center;
    padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
    font-size: var(--skill-font-size-xs, 11px);
    font-weight: var(--skill-font-weight-medium, 500);
    border-radius: var(--skill-radius-full, 9999px);
    background: var(--skill-gray-100, #f3f4f6);
    color: var(--list-item-text);
    border: 1px solid var(--list-item-border);
    white-space: nowrap;
  }

  .list-item__badge--primary {
    background: var(--skill-primary-100, #dbeafe);
    color: var(--skill-primary-700, #1d4ed8);
    border-color: var(--skill-primary-300, #93c5fd);
  }

  .list-item__badge--success {
    background: var(--skill-success-100, #d1fae5);
    color: var(--skill-success-700, #047857);
    border-color: var(--skill-success-300, #6ee7b7);
  }

  .list-item__badge--warning {
    background: var(--skill-warning-100, #fed7aa);
    color: var(--skill-warning-700, #b45309);
    border-color: var(--skill-warning-300, #fbbf24);
  }

  .list-item__badge--error {
    background: var(--skill-error-100, #fee2e2);
    color: var(--skill-error-700, #b91c1c);
    border-color: var(--skill-error-300, #fca5a5);
  }

  .list-item__badge--info {
    background: var(--skill-blue-100, #e0f2fe);
    color: var(--skill-blue-700, #1e40af);
    border-color: var(--skill-blue-300, #93c5fd);
  }

  /* 操作区域 */
  .list-item__actions {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
  }

  /* 状态指示器 */
  .list-item__status {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    position: relative;
  }

  .list-item__status::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .list-item:hover .list-item__status::after {
    opacity: 0.3;
  }

  .list-item__status--online {
    background: var(--skill-success-500, #10b981);
  }

  .list-item__status--online::after {
    background: var(--skill-success-500, #10b981);
  }

  .list-item__status--offline {
    background: var(--skill-gray-400, #9ca3af);
  }

  .list-item__status--offline::after {
    background: var(--skill-gray-400, #9ca3af);
  }

  .list-item__status--busy {
    background: var(--skill-warning-500, #f59e0b);
  }

  .list-item__status--busy::after {
    background: var(--skill-warning-500, #f59e0b);
  }

  .list-item__status--away {
    background: var(--skill-error-500, #ef4444);
  }

  .list-item__status--away::after {
    background: var(--skill-error-500, #ef4444);
  }

  /* 分割线 */
  .list-item__divider {
    height: 1px;
    background: var(--list-item-border);
    margin: 0 var(--list-item-padding);
  }

  .list-item--compact .list-item__divider {
    margin: 0 var(--skill-spacing-md);
  }

  .list-item--relaxed .list-item__divider {
    margin: 0 var(--skill-spacing-lg);
  }

  /* 拖拽状态 */
  .list-item--draggable {
    cursor: move;
  }

  .list-item--dragging {
    opacity: 0.5;
    transform: rotate(2deg);
    box-shadow: var(--skill-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
  }

  /* 可访问性 */
  .list-item--clickable:focus-visible {
    outline: 2px solid var(--skill-primary-500, #3b82f6);
    outline-offset: 2px;
  }

  /* 插槽样式 */
  ::slotted([slot="start"]) {
    display: flex;
    align-items: center;
    color: inherit;
  }

  ::slotted([slot="end"]) {
    display: flex;
    align-items: center;
    color: inherit;
  }

  ::slotted(skill-button) {
    opacity: 0.7;
    transition: opacity var(--list-item-transition);
  }

  .list-item:hover ::slotted(skill-button) {
    opacity: 1;
  }

  ::slotted(skill-avatar) {
    transition: transform var(--list-item-transition);
  }

  .list-item--clickable:hover ::slotted(skill-avatar) {
    transform: scale(1.05);
  }

  ::slotted(skill-icon) {
    color: inherit;
    transition: color var(--list-item-transition);
  }

  .list-item--selected ::slotted(skill-icon) {
    color: var(--skill-primary-600, #2563eb);
  }

  /* 多行内容支持 */
  .list-item--multiline .list-item__description {
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .list-item--multiline .list-item__title {
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .list-item {
      padding: var(--skill-spacing-sm);
      --list-item-gap: var(--skill-spacing-sm, 12px);
    }

    .list-item__start {
      margin-right: var(--skill-spacing-sm, 12px);
    }

    .list-item__end {
      margin-left: var(--skill-spacing-sm, 12px);
    }

    .list-item__description {
      white-space: normal;
      overflow: visible;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .list-item__title {
      font-size: var(--skill-font-size-sm, 12px);
    }

    .list-item--relaxed {
      padding: var(--skill-spacing-md);
    }
  }

  /* 超小屏幕 */
  @media (max-width: 480px) {
    .list-item {
      padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
    }

    .list-item__badge {
      font-size: 10px;
      padding: 2px var(--skill-spacing-xs);
    }

    .list-item__status {
      width: 6px;
      height: 6px;
    }

    .list-item--compact .list-item__title,
    .list-item--compact .list-item__description {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  /* 深色模式支持 */
  @media (prefers-color-scheme: dark) {
    :host {
      --list-item-bg: var(--skill-surface-100, #374151);
      --list-item-bg-hover: var(--skill-surface-200, #4b5563);
      --list-item-bg-active: var(--skill-surface-300, #6b7280);
      --list-item-bg-selected: rgba(59, 130, 246, 0.2);
      --list-item-text: var(--skill-gray-100, #f3f4f6);
      --list-item-text-secondary: var(--skill-gray-300, #d1d5db);
      --list-item-text-muted: var(--skill-gray-400, #9ca3af);
      --list-item-border: var(--skill-gray-600, #4b5563);
    }

    .list-item__badge {
      background: var(--skill-gray-700, #374151);
      border-color: var(--skill-gray-600, #4b5563);
    }

    .list-item__divider {
      background: var(--list-item-border);
    }
  }

  /* 高对比度模式 */
  @media (prefers-contrast: high) {
    .list-item {
      border: 1px solid var(--list-item-border);
    }

    .list-item__title {
      font-weight: var(--skill-font-weight-semibold, 600);
    }

    .list-item__badge {
      border-width: 2px;
      font-weight: var(--skill-font-weight-semibold, 600);
    }

    .list-item__status {
      width: 10px;
      height: 10px;
    }

    .list-item--clickable:focus-visible {
      outline-width: 3px;
    }
  }

  /* 减少动画模式 */
  @media (prefers-reduced-motion: reduce) {
    .list-item,
    .list-item__status::after,
    ::slotted(skill-avatar),
    ::slotted(skill-icon),
    ::slotted(skill-button) {
      transition: none;
    }

    .list-item--clickable:active {
      transform: none;
    }

    .list-item--clickable:hover ::slotted(skill-avatar) {
      transform: none;
    }

    .list-item--dragging {
      transform: none;
    }
  }

  /* 打印样式 */
  @media print {
    .list-item {
      background: transparent;
      border: 1px solid #000;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .list-item__badge {
      background: transparent;
      border: 1px solid #000;
      color: #000;
    }

    .list-item--disabled {
      opacity: 0.5;
    }

    ::slotted(skill-button) {
      display: none;
    }
  }

  /* 触摸设备优化 */
  @media (hover: none) and (pointer: coarse) {
    .list-item--clickable {
      min-height: 44px;
    }

    .list-item__status {
      width: 10px;
      height: 10px;
    }

    .list-item__badge {
      min-height: 24px;
      padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
    }
  }

  /* 键盘导航 */
  .list-item--clickable[aria-selected="true"] {
    --list-item-bg-selected: var(--skill-primary-100, #dbeafe);
    color: var(--skill-primary-900, #1e3a8a);
  }

  /* 悬浮工具提示支持 */
  .list-item[title] {
    cursor: help;
  }
`;