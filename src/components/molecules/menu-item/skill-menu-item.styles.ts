import { css } from 'lit';

/**
 * MenuItem 组件样式
 */
export const menuItemStyles = css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
    --menu-item-height: 40px;
    --menu-item-padding: var(--skill-spacing-md, 16px);
    --menu-item-bg: transparent;
    --menu-item-bg-hover: var(--skill-primary-50, #eff6ff);
    --menu-item-bg-active: var(--skill-primary-100, #dbeafe);
    --menu-item-bg-selected: var(--skill-primary-100, #dbeafe);
    --menu-item-text: var(--skill-gray-700, #374151);
    --menu-item-text-hover: var(--skill-primary-700, #1d4ed8);
    --menu-item-text-selected: var(--skill-primary-700, #1d4ed8);
    --menu-item-text-disabled: var(--skill-gray-400, #9ca3af);
    --menu-item-icon-color: var(--skill-gray-500, #6b7280);
    --menu-item-icon-color-hover: var(--skill-primary-600, #2563eb);
    --menu-item-icon-color-selected: var(--skill-primary-600, #2563eb);
    --menu-item-border-radius: var(--skill-radius-sm, 4px);
    --menu-item-transition: all 0.2s ease;
    --menu-item-gap: var(--skill-spacing-sm, 8px);
    --menu-item-font-size: var(--skill-font-size-md, 14px);
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--menu-item-height);
    padding: 0 var(--menu-item-padding);
    background: var(--menu-item-bg);
    border: none;
    border-radius: var(--menu-item-border-radius);
    cursor: pointer;
    transition: var(--menu-item-transition);
    gap: var(--menu-item-gap);
    font-size: var(--menu-item-font-size);
    font-weight: var(--skill-font-weight-normal, 400);
    color: var(--menu-item-text);
    text-decoration: none;
    box-sizing: border-box;
  }

  /* 基础交互状态 */
  .menu-item:hover:not(:disabled) {
    background: var(--menu-item-bg-hover);
    color: var(--menu-item-text-hover);
  }

  .menu-item:active:not(:disabled) {
    background: var(--menu-item-bg-active);
    transform: scale(0.98);
  }

  /* 选中状态 */
  .menu-item[selected] {
    background: var(--menu-item-bg-selected);
    color: var(--menu-item-text-selected);
    font-weight: var(--skill-font-weight-medium, 500);
  }

  /* 禁用状态 */
  .menu-item:disabled,
  .menu-item[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    color: var(--menu-item-text-disabled);
    pointer-events: none;
  }

  /* 焦点状态 */
  .menu-item:focus {
    outline: 2px solid var(--skill-primary-500, #3b82f6);
    outline-offset: 2px;
  }

  /* 图标容器 */
  .icon-container {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: var(--menu-item-icon-color);
    transition: color var(--menu-item-transition);
  }

  .menu-item:hover .icon-container {
    color: var(--menu-item-icon-color-hover);
  }

  .menu-item[selected] .icon-container {
    color: var(--menu-item-icon-color-selected);
  }

  /* 主内容区域 */
  .content {
    flex: 1;
    display: flex;
    align-items: center;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* 右侧内容（徽章、快捷键等） */
  .suffix {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    font-size: var(--skill-font-size-sm, 12px);
    color: var(--menu-item-text-disabled);
    gap: var(--skill-spacing-xs, 4px);
  }

  /* 子菜单指示器 */
  .submenu-indicator {
    width: 16px;
    height: 16px;
    color: var(--menu-item-icon-color);
    transition: transform var(--menu-item-transition);
  }

  .menu-item:hover .submenu-indicator {
    color: var(--menu-item-icon-color-hover);
    transform: translateX(2px);
  }

  /* 徽章样式 */
  .menu-item__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 var(--skill-spacing-xs);
    font-size: var(--skill-font-size-xs, 11px);
    font-weight: var(--skill-font-weight-medium, 500);
    border-radius: var(--skill-radius-full, 9999px);
    background: var(--skill-primary-500, #3b82f6);
    color: white;
    line-height: 1;
  }

  .menu-item__badge--secondary {
    background: var(--skill-gray-500, #6b7280);
  }

  .menu-item__badge--success {
    background: var(--skill-success-500, #10b981);
  }

  .menu-item__badge--warning {
    background: var(--skill-warning-500, #f59e0b);
  }

  .menu-item__badge--error {
    background: var(--skill-error-500, #ef4444);
  }

  /* 快捷键样式 */
  .menu-item__shortcut {
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: var(--skill-font-size-xs, 11px);
    color: var(--menu-item-text-disabled);
    background: var(--skill-gray-100, #f3f4f6);
    padding: 2px var(--skill-spacing-xs);
    border-radius: var(--skill-radius-xs, 2px);
    border: 1px solid var(--skill-gray-200, #e5e7eb);
  }

  /* 分割线 */
  .menu-item__divider {
    height: 1px;
    background: var(--skill-gray-200, #e5e7eb);
    margin: var(--skill-spacing-xs) 0;
  }

  /* 分组标题 */
  .menu-item__group-title {
    padding: var(--skill-spacing-sm) var(--menu-item-padding);
    font-size: var(--skill-font-size-xs, 11px);
    font-weight: var(--skill-font-weight-semibold, 600);
    color: var(--menu-item-text-disabled);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: default;
    pointer-events: none;
  }

  /* 危险操作样式 */
  .menu-item--danger {
    color: var(--skill-error-600, #dc2626);
  }

  .menu-item--danger:hover {
    background: var(--skill-error-50, #fef2f2);
    color: var(--skill-error-700, #b91c1c);
  }

  .menu-item--danger .icon-container {
    color: var(--skill-error-600, #dc2626);
  }

  .menu-item--danger:hover .icon-container {
    color: var(--skill-error-700, #b91c1c);
  }

  /* 活跃状态（如当前页面） */
  .menu-item--active {
    background: var(--skill-primary-100, #dbeafe);
    color: var(--skill-primary-700, #1d4ed8);
    font-weight: var(--skill-font-weight-semibold, 600);
    border-left: 3px solid var(--skill-primary-500, #3b82f6);
  }

  .menu-item--active .icon-container {
    color: var(--skill-primary-600, #2563eb);
  }

  /* 尺寸变体 */
  .menu-item--sm {
    --menu-item-height: 32px;
    --menu-item-font-size: var(--skill-font-size-sm, 12px);
    --menu-item-padding: var(--skill-spacing-sm, 12px);
  }

  .menu-item--lg {
    --menu-item-height: 48px;
    --menu-item-font-size: var(--skill-font-size-lg, 16px);
    --menu-item-padding: var(--skill-spacing-lg, 24px);
  }

  /* 紧凑模式 */
  .menu-item--compact {
    --menu-item-height: 36px;
    --menu-item-gap: var(--skill-spacing-xs, 4px);
    --menu-item-padding: var(--skill-spacing-sm, 12px);
  }

  .menu-item--compact .icon-container {
    width: 16px;
    height: 16px;
  }

  /* 加载状态 */
  .menu-item--loading {
    pointer-events: none;
  }

  .menu-item--loading .content {
    opacity: 0.6;
  }

  /* 多级菜单支持 */
  .menu-item--has-submenu .menu-item__shortcut {
    display: none;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .menu-item {
      --menu-item-height: 44px;
      --menu-item-padding: var(--skill-spacing-md, 16px);
    }

    .menu-item__shortcut {
      display: none;
    }

    .menu-item__badge {
      min-width: 24px;
      height: 24px;
    }
  }

  /* 超小屏幕 */
  @media (max-width: 480px) {
    .menu-item {
      --menu-item-height: 48px;
      --menu-item-padding: var(--skill-spacing-sm, 12px);
    }

    .menu-item--compact {
      --menu-item-height: 40px;
    }
  }

  /* 深色模式支持 */
  @media (prefers-color-scheme: dark) {
    :host {
      --menu-item-bg-hover: rgba(59, 130, 246, 0.1);
      --menu-item-bg-active: rgba(59, 130, 246, 0.2);
      --menu-item-bg-selected: rgba(59, 130, 246, 0.2);
      --menu-item-text: var(--skill-gray-300, #d1d5db);
      --menu-item-text-hover: var(--skill-primary-300, #93c5fd);
      --menu-item-text-selected: var(--skill-primary-300, #93c5fd);
      --menu-item-text-disabled: var(--skill-gray-500, #6b7280);
      --menu-item-icon-color: var(--skill-gray-400, #9ca3af);
      --menu-item-icon-color-hover: var(--skill-primary-400, #60a5fa);
      --menu-item-icon-color-selected: var(--skill-primary-400, #60a5fa);
    }

    .menu-item__shortcut {
      background: var(--skill-gray-700, #374151);
      border-color: var(--skill-gray-600, #4b5563);
      color: var(--menu-item-text-disabled);
    }

    .menu-item__divider {
      background: var(--skill-gray-700, #374151);
    }

    .menu-item--danger:hover {
      background: rgba(239, 68, 68, 0.1);
    }

    .menu-item--active {
      background: rgba(59, 130, 246, 0.2);
    }
  }

  /* 高对比度模式 */
  @media (prefers-contrast: high) {
    .menu-item {
      border: 1px solid transparent;
    }

    .menu-item:hover:not(:disabled) {
      border-color: var(--skill-primary-500, #3b82f6);
    }

    .menu-item[selected] {
      border-color: var(--skill-primary-500, #3b82f6);
      font-weight: var(--skill-font-weight-bold, 700);
    }

    .menu-item__badge {
      font-weight: var(--skill-font-weight-bold, 700);
    }

    .menu-item:focus {
      outline-width: 3px;
    }
  }

  /* 减少动画模式 */
  @media (prefers-reduced-motion: reduce) {
    .menu-item,
    .icon-container,
    .submenu-indicator {
      transition: none;
    }

    .menu-item:active:not(:disabled) {
      transform: none;
    }

    .menu-item:hover .submenu-indicator {
      transform: none;
    }
  }

  /* 打印样式 */
  @media print {
    .menu-item {
      background: transparent;
      color: #000;
      border-bottom: 1px solid #000;
    }

    .menu-item:hover,
    .menu-item[selected] {
      background: transparent;
    }

    .menu-item__badge {
      background: #000;
      color: #fff;
    }

    .menu-item__shortcut {
      background: transparent;
      border: 1px solid #000;
    }

    .menu-item--danger {
      color: #000;
    }

    .icon-container,
    .submenu-indicator {
      display: none;
    }
  }

  /* 可访问性增强 */
  .menu-item:focus-visible {
    outline: 2px solid var(--skill-primary-500, #3b82f6);
    outline-offset: 2px;
  }

  /* 高对比度焦点指示器 */
  @media (prefers-contrast: high) {
    .menu-item:focus-visible {
      outline-width: 3px;
    }
  }

  /* 触摸设备优化 */
  @media (hover: none) and (pointer: coarse) {
    .menu-item {
      --menu-item-height: 44px;
    }

    .menu-item:active:not(:disabled) {
      transform: scale(0.95);
    }
  }

  /* 键盘导航支持 */
  .menu-item[aria-haspopup="true"]:focus-visible {
    outline-offset: 1px;
  }

  /* 角色为菜单项时的特殊样式 */
  .menu-item[role="menuitemradio"],
  .menu-item[role="menuitemcheckbox"] {
    padding-left: calc(var(--menu-item-padding) + 24px);
    position: relative;
  }

  .menu-item[role="menuitemradio"]::before,
  .menu-item[role="menuitemcheckbox"]::before {
    content: '';
    position: absolute;
    left: var(--menu-item-padding);
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    border: 2px solid var(--menu-item-icon-color);
    border-radius: 50%;
    transition: var(--menu-item-transition);
  }

  .menu-item[role="menuitemradio"][aria-checked="true"]::before,
  .menu-item[role="menuitemcheckbox"][aria-checked="true"]::before {
    background: var(--skill-primary-500, #3b82f6);
    border-color: var(--skill-primary-500, #3b82f6);
  }

  .menu-item[role="menuitemradio"][aria-checked="true"]::after {
    content: '';
    position: absolute;
    left: calc(var(--menu-item-padding) + 4px);
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
  }

  .menu-item[role="menuitemcheckbox"][aria-checked="true"]::after {
    content: '✓';
    position: absolute;
    left: calc(var(--menu-item-padding) + 2px);
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 10px;
    font-weight: bold;
  }

  /* 嵌套菜单缩进 */
  .menu-item--level-2 {
    padding-left: calc(var(--menu-item-padding) + 24px);
  }

  .menu-item--level-3 {
    padding-left: calc(var(--menu-item-padding) + 48px);
  }

  .menu-item--level-4 {
    padding-left: calc(var(--menu-item-padding) + 72px);
  }
`;