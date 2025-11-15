import { css } from 'lit';

export const sidebarStyles = css`
  :host {
    display: block;
    --sidebar-width: 280px;
    --sidebar-collapsed-width: 64px;
    --sidebar-height: 100vh;
    --sidebar-bg: #ffffff;
    --sidebar-border: #f0f0f0;
    --sidebar-text: #333333;
    --sidebar-text-secondary: #666666;
    --sidebar-text-disabled: #999999;
    --sidebar-hover: #f5f5f5;
    --sidebar-active: #e6f7ff;
    --sidebar-active-border: #1890ff;
    --sidebar-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    --sidebar-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    --sidebar-item-height: 48px;
    --sidebar-group-title-height: 32px;
    --sidebar-header-height: 64px;
    --sidebar-footer-height: 64px;
  }

  :host([theme="dark"]) {
    --sidebar-bg: #001529;
    --sidebar-border: #1f1f1f;
    --sidebar-text: #ffffff;
    --sidebar-text-secondary: #a6a6a6;
    --sidebar-text-disabled: #595959;
    --sidebar-hover: #1f1f1f;
    --sidebar-active: #1890ff;
    --sidebar-active-border: #1890ff;
    --sidebar-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    width: var(--sidebar-width);
    height: var(--sidebar-height);
    background: var(--sidebar-bg);
    border-right: 1px solid var(--sidebar-border);
    box-shadow: var(--sidebar-shadow);
    transition: var(--sidebar-transition);
    position: relative;
    overflow: hidden;
  }

  .sidebar.collapsed {
    width: var(--sidebar-collapsed-width);
  }

  .sidebar.right {
    border-right: none;
    border-left: 1px solid var(--sidebar-border);
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  }

  .sidebar.horizontal {
    width: 100%;
    height: var(--sidebar-header-height);
    border-right: none;
    border-bottom: 1px solid var(--sidebar-border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    flex-direction: row;
  }

  /* Logo区域 */
  .sidebar-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--sidebar-header-height);
    padding: 16px;
    border-bottom: 1px solid var(--sidebar-border);
    text-decoration: none;
    color: var(--sidebar-text);
    transition: var(--sidebar-transition);
    cursor: pointer;
  }

  .sidebar-logo:hover {
    background: var(--sidebar-hover);
  }

  .sidebar-logo.collapsed {
    justify-content: center;
  }

  .logo-image {
    width: 32px;
    height: 32px;
    margin-right: 12px;
    border-radius: 6px;
  }

  .logo-text {
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
    opacity: 1;
    transition: opacity 0.3s;
  }

  .logo-text.hidden {
    opacity: 0;
    width: 0;
    overflow: hidden;
  }

  /* 头部区域 */
  .sidebar-header {
    padding: 16px;
    border-bottom: 1px solid var(--sidebar-border);
    background: var(--sidebar-bg);
  }

  .sidebar-header.collapsed {
    padding: 8px;
  }

  .header-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--sidebar-text);
    margin: 0 0 4px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-subtitle {
    font-size: 12px;
    color: var(--sidebar-text-secondary);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  .header-action {
    background: none;
    border: none;
    color: var(--sidebar-text-secondary);
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-action:hover {
    background: var(--sidebar-hover);
    color: var(--sidebar-text);
  }

  /* 搜索区域 */
  .sidebar-search {
    padding: 16px;
    border-bottom: 1px solid var(--sidebar-border);
  }

  .sidebar-search.collapsed {
    padding: 8px;
  }

  .search-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--sidebar-border);
    border-radius: 6px;
    background: var(--sidebar-bg);
    color: var(--sidebar-text);
    font-size: 14px;
    transition: border-color 0.2s;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--sidebar-active-border);
  }

  .search-input.collapsed {
    padding: 8px;
    text-align: center;
  }

  /* 导航内容区域 */
  .sidebar-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 8px 0;
  }

  .sidebar-content::-webkit-scrollbar {
    width: 6px;
  }

  .sidebar-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .sidebar-content::-webkit-scrollbar-thumb {
    background: var(--sidebar-text-disabled);
    border-radius: 3px;
  }

  .sidebar-content::-webkit-scrollbar-thumb:hover {
    background: var(--sidebar-text-secondary);
  }

  /* 菜单组 */
  .menu-group {
    margin-bottom: 16px;
  }

  .menu-group:last-child {
    margin-bottom: 0;
  }

  .menu-group-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--sidebar-group-title-height);
    padding: 0 16px;
    margin: 8px 0;
    font-size: 12px;
    font-weight: 600;
    color: var(--sidebar-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: color 0.2s;
  }

  .menu-group-title:hover {
    color: var(--sidebar-text);
  }

  .menu-group-title.collapsed {
    justify-content: center;
    padding: 0;
  }

  .group-title-icon {
    margin-right: 8px;
  }

  .group-collapse-icon {
    transition: transform 0.3s;
    font-size: 12px;
  }

  .group-collapse-icon.collapsed {
    transform: rotate(-90deg);
  }

  /* 菜单项 */
  .menu-items {
    transition: var(--sidebar-transition);
  }

  .menu-items.collapsed {
    height: 0;
    overflow: hidden;
  }

  .menu-item {
    display: flex;
    align-items: center;
    height: var(--sidebar-item-height);
    padding: 0 16px;
    color: var(--sidebar-text);
    text-decoration: none;
    cursor: pointer;
    transition: var(--sidebar-transition);
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .menu-item:hover {
    background: var(--sidebar-hover);
    color: var(--sidebar-text);
  }

  .menu-item.active {
    background: var(--sidebar-active);
    color: var(--sidebar-active-border);
  }

  .menu-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--sidebar-active-border);
  }

  .menu-item.disabled {
    color: var(--sidebar-text-disabled);
    cursor: not-allowed;
  }

  .menu-item.disabled:hover {
    background: transparent;
  }

  .menu-item.collapsed {
    justify-content: center;
    padding: 0;
  }

  .menu-item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin-right: 12px;
    font-size: 16px;
    flex-shrink: 0;
  }

  .menu-item-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .menu-item-text.hidden {
    display: none;
  }

  .menu-item-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    margin-left: 8px;
    background: var(--sidebar-active-border);
    color: white;
    font-size: 12px;
    font-weight: 500;
    border-radius: 10px;
    line-height: 1;
    flex-shrink: 0;
  }

  .menu-item-arrow {
    margin-left: auto;
    font-size: 12px;
    transition: transform 0.3s;
  }

  .menu-item-arrow.expanded {
    transform: rotate(90deg);
  }

  /* 子菜单 */
  .submenu {
    background: rgba(0, 0, 0, 0.02);
    margin-left: 12px;
    border-left: 2px solid var(--sidebar-border);
  }

  .submenu .menu-item {
    height: 40px;
    padding-left: 28px;
    font-size: 13px;
  }

  .submenu.collapsed {
    display: none;
  }

  /* 工具提示 */
  .sidebar-tooltip {
    position: absolute;
    left: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .menu-item:hover .sidebar-tooltip {
    opacity: 1;
  }

  /* 底部区域 */
  .sidebar-footer {
    padding: 16px;
    border-top: 1px solid var(--sidebar-border);
    background: var(--sidebar-bg);
  }

  .sidebar-footer.collapsed {
    padding: 8px;
  }

  .footer-content {
    font-size: 12px;
    color: var(--sidebar-text-secondary);
    text-align: center;
    margin-bottom: 8px;
  }

  .footer-actions {
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  /* 折叠切换按钮 */
  .collapse-toggle {
    position: absolute;
    right: -16px;
    top: 50%;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
    background: var(--sidebar-bg);
    border: 1px solid var(--sidebar-border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: var(--sidebar-transition);
    z-index: 10;
  }

  .collapse-toggle:hover {
    background: var(--sidebar-hover);
  }

  .collapse-icon {
    transition: transform 0.3s;
    font-size: 12px;
  }

  .collapse-icon.collapsed {
    transform: rotate(180deg);
  }

  /* 水平模式样式 */
  .sidebar.horizontal .sidebar-logo {
    height: 100%;
    border-right: 1px solid var(--sidebar-border);
    border-bottom: none;
  }

  .sidebar.horizontal .sidebar-content {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0;
  }

  .sidebar.horizontal .menu-group {
    margin: 0;
    display: flex;
  }

  .sidebar.horizontal .menu-group-title {
    display: none;
  }

  .sidebar.horizontal .menu-items {
    display: flex;
  }

  .sidebar.horizontal .menu-item {
    height: 100%;
    border-bottom: 2px solid transparent;
  }

  .sidebar.horizontal .menu-item.active {
    border-bottom-color: var(--sidebar-active-border);
    background: transparent;
  }

  .sidebar.horizontal .menu-item.active::before {
    display: none;
  }

  .sidebar.horizontal .submenu {
    position: absolute;
    top: 100%;
    left: 0;
    background: var(--sidebar-bg);
    border: 1px solid var(--sidebar-border);
    border-radius: 0 0 6px 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin: 0;
    min-width: 200px;
    max-height: 400px;
    overflow-y: auto;
  }

  .sidebar.horizontal .collapse-toggle {
    display: none;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      transform: translateX(-100%);
    }

    .sidebar.show {
      transform: translateX(0);
    }

    .sidebar.right {
      left: auto;
      right: 0;
      transform: translateX(100%);
    }

    .sidebar.right.show {
      transform: translateX(0);
    }

    .sidebar.horizontal {
      position: static;
      transform: none;
      flex-direction: column;
      height: auto;
    }

    .sidebar.horizontal .sidebar-content {
      flex-direction: column;
      overflow-x: hidden;
      overflow-y: auto;
    }

    .sidebar.horizontal .menu-group,
    .sidebar.horizontal .menu-items {
      flex-direction: column;
    }

    .collapse-toggle {
      display: none;
    }
  }

  /* 动画 */
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .menu-item {
    animation: slideIn 0.3s ease-out;
  }

  /* 拖拽样式 */
  .menu-item.dragging {
    opacity: 0.5;
  }

  .menu-item.drag-over {
    background: var(--sidebar-hover);
    border: 2px dashed var(--sidebar-active-border);
  }
`;