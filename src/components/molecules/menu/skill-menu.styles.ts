import { css } from 'lit';

export const menuStyles = css`
  :host {
    display: inline-block;
  }

  .skill-menu {
    position: relative;
    display: flex;
    background: var(--menu-bg, var(--skill-white, #FFFFFF));
    border: 1px solid var(--menu-border-color, var(--skill-gray-200, #E5E7EB));
    border-radius: var(--menu-radius, var(--skill-radius-lg, 8px));
    box-shadow: var(--menu-shadow, var(--skill-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05)));
    overflow: hidden;
    outline: none;
    transition: all var(--skill-duration-fast, 200ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  .skill-menu:focus-visible {
    outline: 2px solid var(--skill-primary-500, #0A59F7);
    outline-offset: 2px;
  }

  .skill-menu[aria-disabled="true"] {
    opacity: 0.5;
    pointer-events: none;
  }

  /* 垂直菜单 */
  :host([orientation="vertical"]) .skill-menu {
    flex-direction: column;
    min-width: var(--menu-min-width, 200px);
  }

  /* 水平菜单 */
  :host([orientation="horizontal"]) .skill-menu {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .skill-menu__list {
    display: flex;
    flex-direction: column;
    flex: 1;
    max-height: var(--menu-max-height, none);
    overflow-y: auto;
  }

  :host([orientation="horizontal"]) .skill-menu__list {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  }

  /* 菜单项基础样式 */
  ::slotted(.menu-item) {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--menu-item-gap, var(--skill-spacing-sm, 12px));
    padding: var(--menu-item-padding, var(--skill-spacing-sm, 12px) var(--skill-spacing-md, 16px));
    background: transparent;
    color: var(--menu-item-color, var(--skill-gray-700, #374151));
    border: none;
    text-align: left;
    font-size: var(--menu-item-font-size, var(--skill-font-size-body-2, 14px));
    font-weight: var(--menu-item-font-weight, var(--skill-font-weight-medium, 500));
    line-height: 1.4;
    cursor: pointer;
    transition: all var(--skill-duration-fast, 200ms);
    white-space: nowrap;
    user-select: none;
    outline: none;
    text-decoration: none;
  }

  ::slotted(.menu-item:hover),
  ::slotted(.menu-item:focus) {
    background: var(--menu-item-hover-bg, var(--skill-primary-50, #EFF6FF));
    color: var(--menu-item-hover-color, var(--skill-primary-700, #1D4ED8));
  }

  ::slotted(.menu-item:active) {
    background: var(--menu-item-active-bg, var(--skill-primary-100, #DBEAFE));
  }

  ::slotted(.menu-item[selected]) {
    background: var(--menu-item-selected-bg, var(--skill-primary-100, #DBEAFE));
    color: var(--menu-item-selected-color, var(--skill-primary-800, #1E40AF));
    font-weight: var(--menu-item-selected-font-weight, var(--skill-font-weight-semibold, 600));
  }

  ::slotted(.menu-item.disabled) {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* 菜单项元素 */
  ::slotted(.menu-item-icon) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--menu-item-icon-size, 20px);
    height: var(--menu-item-icon-size, 20px);
    color: var(--menu-item-icon-color, var(--skill-gray-500, #6B7280));
  }

  ::slotted(.menu-item-text) {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ::slotted(.menu-item-subtitle) {
    font-size: var(--menu-item-subtitle-font-size, var(--skill-font-size-body-3, 12px));
    color: var(--menu-item-subtitle-color, var(--skill-gray-500, #6B7280));
    margin-top: 2px;
  }

  ::slotted(.menu-item-badge) {
    display: inline-flex;
    align-items: center;
    padding: 2px 6px;
    background: var(--menu-item-badge-bg, var(--skill-primary-500, #0A59F7));
    color: var(--skill-white, #FFFFFF);
    font-size: 10px;
    font-weight: var(--skill-font-weight-medium, 500);
    border-radius: var(--skill-radius-full, 9999px);
    flex-shrink: 0;
  }

  ::slotted(.menu-item-shortcut) {
    font-size: var(--menu-item-shortcut-font-size, var(--skill-font-size-body-3, 12px));
    color: var(--menu-item-shortcut-color, var(--skill-gray-400, #9CA3AF));
    font-family: var(--menu-item-shortcut-font, ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace);
    flex-shrink: 0;
  }

  /* 子菜单 */
  ::slotted(.has-submenu) {
    position: relative;
  }

  ::slotted(.submenu-icon),
  ::slotted(.expand-icon) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    width: 16px;
    height: 16px;
    color: var(--menu-submenu-icon-color, var(--skill-gray-400, #9CA3AF));
    transition: transform var(--skill-duration-fast, 200ms);
  }

  :host([orientation="vertical"]) ::slotted(.has-submenu[expanded] .expand-icon) {
    transform: rotate(90deg);
  }

  ::slotted(.submenu) {
    position: absolute;
    top: 0;
    left: 100%;
    min-width: 180px;
    background: var(--submenu-bg, var(--skill-white, #FFFFFF));
    border: 1px solid var(--submenu-border-color, var(--skill-gray-200, #E5E7EB));
    border-radius: var(--submenu-radius, var(--skill-radius-lg, 8px));
    box-shadow: var(--submenu-shadow, var(--skill-shadow-lg, 0 10px 25px -5px rgba(0, 0, 0, 0.1)));
    z-index: var(--submenu-z-index, 100);
    opacity: 0;
    visibility: hidden;
    transform: translateX(-10px);
    transition: all var(--skill-duration-fast, 200ms);
  }

  ::slotted(.has-submenu:hover) ::slotted(.submenu),
  ::slotted(.has-submenu:focus-within) ::slotted(.submenu),
  ::slotted(.has-submenu[expanded]) ::slotted(.submenu) {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }

  /* 分割线 */
  ::slotted(.menu-separator) {
    height: 1px;
    background: var(--menu-separator-color, var(--menu-border-color, var(--skill-gray-200, #E5E7EB)));
    margin: var(--menu-separator-margin, var(--skill-spacing-2xs, 4px) 0);
    border: none;
    pointer-events: none;
  }

  /* 头部和底部 */
  ::slotted([slot="header"]) {
    padding: var(--menu-header-padding, var(--skill-spacing-md, 16px));
    border-bottom: 1px solid var(--menu-header-border-color, var(--menu-border-color, var(--skill-gray-200, #E5E7EB)));
    background: var(--menu-header-bg, var(--skill-gray-50, #F9FAFB));
    font-size: var(--menu-header-font-size, var(--skill-font-size-body-1, 16px));
    font-weight: var(--menu-header-font-weight, var(--skill-font-weight-semibold, 600));
    color: var(--menu-header-color, var(--skill-gray-900, #111827));
  }

  ::slotted([slot="footer"]) {
    padding: var(--menu-footer-padding, var(--skill-spacing-md, 16px));
    border-top: 1px solid var(--menu-footer-border-color, var(--menu-border-color, var(--skill-gray-200, #E5E7EB)));
    background: var(--menu-footer-bg, var(--skill-gray-50, #F9FAFB));
  }

  /* 尺寸变体 */
  :host([size='xs']) ::slotted(.menu-item) {
    --menu-item-padding: var(--skill-spacing-2xs, 4px) var(--skill-spacing-xs, 8px);
    --menu-item-font-size: var(--skill-font-size-caption, 10px);
    --menu-item-gap: var(--skill-spacing-2xs, 4px);
  }

  :host([size='sm']) ::slotted(.menu-item) {
    --menu-item-padding: var(--skill-spacing-xs, 8px) var(--skill-spacing-sm, 12px);
    --menu-item-font-size: var(--skill-font-size-body-3, 12px);
    --menu-item-gap: var(--skill-spacing-xs, 8px);
  }

  :host([size='md']) ::slotted(.menu-item) {
    --menu-item-padding: var(--skill-spacing-sm, 12px) var(--skill-spacing-md, 16px);
    --menu-item-font-size: var(--skill-font-size-body-2, 14px);
    --menu-item-gap: var(--skill-spacing-sm, 12px);
  }

  :host([size='lg']) ::slotted(.menu-item) {
    --menu-item-padding: var(--skill-spacing-md, 16px) var(--skill-spacing-lg, 20px);
    --menu-item-font-size: var(--skill-font-size-body-1, 16px);
    --menu-item-gap: var(--skill-spacing-md, 16px);
  }

  :host([size='xl']) ::slotted(.menu-item) {
    --menu-item-padding: var(--skill-spacing-lg, 20px) var(--skill-spacing-xl, 24px);
    --menu-item-font-size: var(--skill-font-size-h4, 18px);
    --menu-item-gap: var(--skill-spacing-lg, 20px);
  }

  /* 紧凑模式 */
  :host([compact]) ::slotted(.menu-item) {
    --menu-item-padding: var(--skill-spacing-2xs, 4px) var(--skill-spacing-sm, 12px);
    --menu-item-gap: var(--skill-spacing-2xs, 4px);
  }

  :host([compact]) ::slotted(.menu-item-icon) {
    --menu-item-icon-size: 16px;
  }

  /* 仅图标模式 */
  :host([icon-only]) ::slotted(.menu-item) {
    --menu-item-padding: var(--skill-spacing-sm, 12px);
    justify-content: center;
    min-width: auto;
    width: auto;
  }

  :host([icon-only]) ::slotted(.menu-item-text),
  :host([icon-only]) ::slotted(.menu-item-subtitle),
  :host([icon-only]) ::slotted(.menu-item-badge),
  :host([icon-only]) ::slotted(.menu-item-shortcut) {
    display: none;
  }

  /* 水平菜单特定样式 */
  :host([orientation="horizontal"]) ::slotted(.menu-item) {
    border-bottom: 2px solid transparent;
  }

  :host([orientation="horizontal"]) ::slotted(.menu-item:hover),
  :host([orientation="horizontal"]) ::slotted(.menu-item:focus) {
    border-bottom-color: var(--menu-horizontal-border-color, var(--skill-primary-500, #0A59F7));
  }

  :host([orientation="horizontal"]) ::slotted(.menu-item[selected]) {
    border-bottom-color: var(--menu-horizontal-selected-border-color, var(--skill-primary-600, #2563EB));
  }

  :host([orientation="horizontal"]) ::slotted(.submenu) {
    top: 100%;
    left: 0;
    transform: translateY(-10px);
  }

  :host([orientation="horizontal"]) ::slotted(.has-submenu:hover) ::slotted(.submenu),
  :host([orientation="horizontal"]) ::slotted(.has-submenu:focus-within) ::slotted(.submenu) {
    transform: translateY(0);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    :host([responsive][orientation="horizontal"]) .skill-menu {
      flex-direction: column;
    }

    :host([responsive][orientation="horizontal"]) .skill-menu__list {
      flex-direction: column;
    }

    :host([responsive][orientation="horizontal"]) ::slotted(.menu-item) {
      border-bottom: none;
      border-left: 3px solid transparent;
    }

    :host([responsive][orientation="horizontal"]) ::slotted(.menu-item:hover),
    :host([responsive][orientation="horizontal"]) ::slotted(.menu-item:focus) {
      border-left-color: var(--skill-primary-500, #0A59F7);
    }

    :host([responsive][icon-only]) ::slotted(.menu-item) {
      min-width: 48px;
      min-height: 48px;
    }
  }

  /* 高对比度模式支持 */
  @media (prefers-contrast: high) {
    .skill-menu {
      border-width: 2px;
      border-color: var(--skill-gray-600, #4B5563);
    }

    ::slotted(.menu-item) {
      font-weight: var(--skill-font-weight-semibold, 600);
    }

    ::slotted(.menu-item:hover),
    ::slotted(.menu-item:focus) {
      background: var(--skill-gray-100, #F3F4F6);
    }

    ::slotted(.menu-item[selected]) {
      background: var(--skill-gray-200, #E5E7EB);
    }

    .skill-menu:focus-visible {
      outline-width: 3px;
    }
  }

  /* 减少动画偏好支持 */
  @media (prefers-reduced-motion: reduce) {
    .skill-menu,
    ::slotted(.menu-item),
    ::slotted(.submenu-icon),
    ::slotted(.expand-icon),
    ::slotted(.submenu) {
      transition: none;
    }
  }

  /* 滚动条样式 */
  .skill-menu__list::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .skill-menu__list::-webkit-scrollbar-track {
    background: var(--menu-scrollbar-track, var(--skill-gray-100, #F3F4F6));
  }

  .skill-menu__list::-webkit-scrollbar-thumb {
    background: var(--menu-scrollbar-thumb, var(--skill-gray-300, #D1D5DB));
    border-radius: var(--skill-radius-full, 9999px);
  }

  .skill-menu__list::-webkit-scrollbar-thumb:hover {
    background: var(--menu-scrollbar-thumb-hover, var(--skill-gray-400, #9CA3AF));
  }

  /* 深色模式支持 */
  @media (prefers-color-scheme: dark) {
    .skill-menu {
      --menu-bg: var(--skill-gray-800, #1F2937);
      --menu-border-color: var(--skill-gray-600, #4B5563);
      --menu-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
    }

    ::slotted(.menu-item) {
      --menu-item-color: var(--skill-gray-200, #E5E7EB);
    }

    ::slotted(.menu-item:hover),
    ::slotted(.menu-item:focus) {
      --menu-item-hover-bg: rgba(59, 130, 246, 0.1);
      --menu-item-hover-color: var(--skill-blue-400, #60A5FA);
    }

    ::slotted(.menu-item[selected]) {
      --menu-item-selected-bg: rgba(59, 130, 246, 0.2);
      --menu-item-selected-color: var(--skill-blue-300, #93C5FD);
    }

    ::slotted([slot="header"]) {
      --menu-header-bg: var(--skill-gray-700, #374151);
      --menu-header-color: var(--skill-gray-100, #F3F4F6);
    }

    ::slotted([slot="footer"]) {
      --menu-footer-bg: var(--skill-gray-700, #374151);
    }

    ::slotted(.submenu) {
      --submenu-bg: var(--skill-gray-800, #1F2937);
      --submenu-border-color: var(--skill-gray-600, #4B5563);
      --submenu-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.7);
    }

    .skill-menu__list::-webkit-scrollbar-track {
      --menu-scrollbar-track: var(--skill-gray-700, #374151);
    }

    .skill-menu__list::-webkit-scrollbar-thumb {
      --menu-scrollbar-thumb: var(--skill-gray-600, #4B5563);
    }

    .skill-menu__list::-webkit-scrollbar-thumb:hover {
      --menu-scrollbar-thumb-hover: var(--skill-gray-500, #6B7280);
    }
  }

  /* 多选模式样式 */
  :host([multiple]) ::slotted(.menu-item::before) {
    content: '';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border: 2px solid var(--menu-checkbox-border-color, var(--skill-gray-300, #D1D5DB));
    border-radius: var(--skill-radius-sm, 4px);
    background: var(--menu-checkbox-bg, var(--skill-white, #FFFFFF));
    flex-shrink: 0;
    margin-right: var(--skill-spacing-sm, 12px);
  }

  :host([multiple]) ::slotted(.menu-item[selected]::before) {
    background: var(--skill-primary-500, #0A59F7);
    border-color: var(--skill-primary-500, #0A59F7);
    position: relative;
  }

  :host([multiple]) ::slotted(.menu-item[selected]::after) {
    content: '✓';
    position: absolute;
    color: white;
    font-size: 10px;
    font-weight: bold;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  /* 激活状态指示器 */
  ::slotted(.menu-item[active]) {
    position: relative;
  }

  ::slotted(.menu-item[active])::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--skill-primary-500, #0A59F7);
  }

  :host([orientation="horizontal"]) ::slotted(.menu-item[active])::after {
    top: auto;
    left: 0;
    right: 0;
    height: 3px;
    width: auto;
  }

  /* 加载状态 */
  ::slotted(.menu-item.loading) {
    position: relative;
    color: transparent;
    pointer-events: none;
  }

  ::slotted(.menu-item.loading::before) {
    content: '';
    position: absolute;
    left: var(--menu-loading-left, var(--skill-spacing-md, 16px));
    top: 50%;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    border: 2px solid var(--menu-loading-border-color, var(--skill-gray-300, #D1D5DB));
    border-top-color: var(--skill-primary-500, #0A59F7);
    border-radius: 50%;
    animation: menu-loading-spin 0.6s linear infinite;
  }

  @keyframes menu-loading-spin {
    to { transform: translateY(-50%) rotate(360deg); }
  }

  /* 工具提示样式 */
  ::slotted(.menu-item[title]:hover)::after {
    content: attr(title);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--skill-gray-900, #111827);
    color: var(--skill-white, #FFFFFF);
    padding: 4px 8px;
    border-radius: var(--skill-radius-sm, 4px);
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000;
    pointer-events: none;
  }

  /* 打印样式 */
  @media print {
    .skill-menu {
      border: 1px solid #000;
      box-shadow: none;
    }

    ::slotted(.menu-item) {
      color: #000;
      background: transparent;
    }

    ::slotted(.menu-item[selected]) {
      background: #F0F0F0;
    }

    ::slotted(.submenu) {
      display: none;
    }
  }
`;