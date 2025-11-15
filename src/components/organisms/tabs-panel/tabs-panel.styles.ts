import { css } from 'lit';

export const tabsPanelStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    --skill-tabs-bg: var(--skill-color-background, #fff);
    --skill-tabs-border-color: var(--skill-color-border, #e0e0e0);
    --skill-tabs-text-color: var(--skill-color-text-secondary, #666);
    --skill-tabs-text-active-color: var(--skill-color-primary, #1890ff);
    --skill-tabs-text-hover-color: var(--skill-color-primary-hover, #40a9ff);
    --skill-tabs-text-disabled-color: var(--skill-color-text-disabled, #ccc);
    --skill-tabs-indicator-color: var(--skill-color-primary, #1890ff);
    --skill-tabs-close-color: var(--skill-color-text-tertiary, #999);
    --skill-tabs-close-hover-color: var(--skill-color-text-secondary, #666);
    --skill-tabs-hover-bg: var(--skill-color-background-secondary, #f5f5f5);
    --skill-tabs-active-bg: var(--skill-color-background, #fff);
    --skill-tabs-gap: var(--skill-spacing-xs, 4px);
    --skill-tabs-padding: var(--skill-spacing-md, 16px);
    --skill-tabs-border-radius: var(--skill-border-radius-sm, 4px);
    --skill-tabs-transition: all var(--skill-transition-normal, 0.3s ease);
    --skill-tabs-animation-duration: 300ms;
  }

  .tabs-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--skill-tabs-bg);
  }

  .tabs-panel[position="top"] {
    flex-direction: column;
  }

  .tabs-panel[position="bottom"] {
    flex-direction: column-reverse;
  }

  .tabs-panel[position="left"] {
    flex-direction: row;
  }

  .tabs-panel[position="right"] {
    flex-direction: row-reverse;
  }

  /* 标签页头部 */
  .tabs-header {
    display: flex;
    position: relative;
    background: var(--skill-tabs-bg);
    border-bottom: 1px solid var(--skill-tabs-border-color);
    user-select: none;
    overflow: hidden;
  }

  .tabs-panel[position="left"] .tabs-header,
  .tabs-panel[position="right"] .tabs-header {
    flex-direction: column;
    border-bottom: none;
    border-right: 1px solid var(--skill-tabs-border-color);
    min-width: 120px;
    max-width: 300px;
  }

  .tabs-panel[position="right"] .tabs-header {
    border-right: none;
    border-left: 1px solid var(--skill-tabs-border-color);
  }

  .tabs-panel[position="bottom"] .tabs-header {
    border-bottom: none;
    border-top: 1px solid var(--skill-tabs-border-color);
  }

  /* 标签页导航 */
  .tabs-nav {
    display: flex;
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  .tabs-panel[position="left"] .tabs-nav,
  .tabs-panel[position="right"] .tabs-nav {
    flex-direction: column;
  }

  /* 标签页列表 */
  .tabs-list {
    display: flex;
    flex: 1;
    position: relative;
    transition: var(--skill-tabs-transition);
  }

  .tabs-panel[position="left"] .tabs-list,
  .tabs-panel[position="right"] .tabs-list {
    flex-direction: column;
  }

  /* 滚动容器 */
  .tabs-scroll-container {
    display: flex;
    flex: 1;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .tabs-scroll-container::-webkit-scrollbar {
    display: none;
  }

  .tabs-panel[position="left"] .tabs-scroll-container,
  .tabs-panel[position="right"] .tabs-scroll-container {
    flex-direction: column;
  }

  /* 标签页项 */
  .tab-item {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
    padding: var(--skill-tabs-padding);
    cursor: pointer;
    white-space: nowrap;
    position: relative;
    transition: var(--skill-tabs-transition);
    border: 1px solid transparent;
    background: transparent;
    color: var(--skill-tabs-text-color);
    font-weight: 500;
    min-width: var(--skill-tabs-min-width, 80px);
    max-width: var(--skill-tabs-max-tab-width, 200px);
    border-radius: var(--skill-tabs-border-radius);
  }

  .tab-item:hover {
    color: var(--skill-tabs-text-hover-color);
    background: var(--skill-tabs-hover-bg);
  }

  .tab-item.active {
    color: var(--skill-tabs-text-active-color);
    background: var(--skill-tabs-active-bg);
  }

  .tab-item.disabled {
    color: var(--skill-tabs-text-disabled-color);
    cursor: not-allowed;
    pointer-events: none;
  }

  .tab-item.dragging {
    opacity: 0.5;
    transform: rotate(5deg);
  }

  .tab-item.drag-over {
    border-color: var(--skill-tabs-indicator-color);
    background: var(--skill-tabs-hover-bg);
  }

  /* 标签页尺寸 */
  .tabs-panel[size="small"] .tab-item {
    padding: var(--skill-spacing-sm, 8px) var(--skill-spacing-md, 16px);
    font-size: 14px;
  }

  .tabs-panel[size="large"] .tab-item {
    padding: var(--skill-spacing-lg, 24px) var(--skill-spacing-xl, 32px);
    font-size: 16px;
  }

  /* 线条样式 */
  .tabs-panel[variant="line"] .tab-item {
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
  }

  .tabs-panel[variant="line"] .tab-item.active {
    border-bottom-color: var(--skill-tabs-indicator-color);
  }

  /* 卡片样式 */
  .tabs-panel[variant="card"] .tab-item {
    border: 1px solid var(--skill-tabs-border-color);
    border-radius: var(--skill-tabs-border-radius) var(--skill-tabs-border-radius) 0 0;
    margin-right: var(--skill-tabs-gap);
    background: var(--skill-tabs-hover-bg);
  }

  .tabs-panel[variant="card"] .tab-item.active {
    background: var(--skill-tabs-active-bg);
    border-bottom-color: var(--skill-tabs-active-bg);
  }

  /* 胶囊样式 */
  .tabs-panel[variant="pills"] .tab-item {
    border-radius: var(--skill-border-radius-full, 9999px);
    margin-right: var(--skill-tabs-gap);
    border: 1px solid var(--skill-tabs-border-color);
  }

  .tabs-panel[variant="pills"] .tab-item.active {
    background: var(--skill-tabs-indicator-color);
    color: white;
    border-color: var(--skill-tabs-indicator-color);
  }

  /* 分段样式 */
  .tabs-panel[variant="segmented"] .tab-item {
    border: 1px solid var(--skill-tabs-border-color);
    margin-right: -1px;
    background: var(--skill-tabs-hover-bg);
  }

  .tabs-panel[variant="segmented"] .tab-item:first-child {
    border-radius: var(--skill-tabs-border-radius) 0 0 var(--skill-tabs-border-radius);
  }

  .tabs-panel[variant="segmented"] .tab-item:last-child {
    border-radius: 0 var(--skill-tabs-border-radius) var(--skill-tabs-border-radius) 0;
  }

  .tabs-panel[variant="segmented"] .tab-item.active {
    background: var(--skill-tabs-active-bg);
    z-index: 1;
  }

  /* 标签页图标 */
  .tab-icon {
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  /* 标签页标题 */
  .tab-title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* 标签页徽章 */
  .tab-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 6px;
    background: var(--skill-color-error, #ff4d4f);
    color: white;
    font-size: 12px;
    border-radius: 9px;
    font-weight: bold;
  }

  /* 关闭按钮 */
  .tab-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    cursor: pointer;
    color: var(--skill-tabs-close-color);
    transition: var(--skill-tabs-transition);
    font-size: 12px;
    line-height: 1;
  }

  .tab-close:hover {
    background: rgba(0, 0, 0, 0.1);
    color: var(--skill-tabs-close-hover-color);
  }

  /* 添加按钮 */
  .tab-add {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    margin-left: var(--skill-tabs-gap);
    border: 1px dashed var(--skill-tabs-border-color);
    border-radius: var(--skill-tabs-border-radius);
    cursor: pointer;
    color: var(--skill-tabs-text-color);
    transition: var(--skill-tabs-transition);
    background: transparent;
  }

  .tab-add:hover {
    border-color: var(--skill-tabs-text-active-color);
    color: var(--skill-tabs-text-active-color);
  }

  /* 溢出下拉菜单 */
  .tabs-overflow {
    display: flex;
    align-items: center;
    padding: 0 var(--skill-spacing-md, 16px);
    cursor: pointer;
    color: var(--skill-tabs-text-color);
    border-left: 1px solid var(--skill-tabs-border-color);
  }

  .tabs-overflow:hover {
    color: var(--skill-tabs-text-hover-color);
  }

  /* 操作按钮 */
  .tabs-actions {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
    padding: 0 var(--skill-spacing-md, 16px);
  }

  /* 内容区域 */
  .tabs-content {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: var(--skill-tabs-bg);
  }

  .tab-panel {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--skill-tabs-animation-duration) ease-in-out,
                visibility var(--skill-tabs-animation-duration) ease-in-out;
    overflow: auto;
    padding: var(--skill-tabs-padding);
  }

  .tab-panel.active {
    opacity: 1;
    visibility: visible;
  }

  .tab-panel.loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 加载状态 */
  .tab-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--skill-spacing-md, 16px);
    color: var(--skill-tabs-text-color);
  }

  /* 拖拽指示器 */
  .drop-indicator {
    position: absolute;
    background: var(--skill-tabs-indicator-color);
    z-index: 1000;
    pointer-events: none;
  }

  .tabs-panel[position="top"] .drop-indicator,
  .tabs-panel[position="bottom"] .drop-indicator {
    width: 2px;
    height: 100%;
    top: 0;
  }

  .tabs-panel[position="left"] .drop-indicator,
  .tabs-panel[position="right"] .drop-indicator {
    width: 100%;
    height: 2px;
    left: 0;
  }

  /* 暗色主题 */
  :host([theme="dark"]) {
    --skill-tabs-bg: var(--skill-color-background-dark, #141414);
    --skill-tabs-border-color: var(--skill-color-border-dark, #434343);
    --skill-tabs-text-color: var(--skill-color-text-secondary-dark, #a6a6a6);
    --skill-tabs-text-active-color: var(--skill-color-primary, #1890ff);
    --skill-tabs-text-hover-color: var(--skill-color-primary-hover, #40a9ff);
    --skill-tabs-text-disabled-color: var(--skill-color-text-disabled-dark, #595959);
    --skill-tabs-hover-bg: var(--skill-color-background-secondary-dark, #1f1f1f);
    --skill-tabs-active-bg: var(--skill-color-background-dark, #141414);
    --skill-tabs-close-color: var(--skill-color-text-tertiary-dark, #8c8c8c);
    --skill-tabs-close-hover-color: var(--skill-color-text-secondary-dark, #a6a6a6);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .tabs-panel[variant="card"] .tab-item,
    .tabs-panel[variant="pills"] .tab-item {
      margin-right: 0;
      border-radius: 0;
    }

    .tab-item {
      min-width: 60px;
      padding: var(--skill-spacing-sm, 8px) var(--skill-spacing-md, 16px);
    }

    .tab-close {
      width: 20px;
      height: 20px;
    }
  }

  /* 焦点样式 */
  .tab-item:focus-visible {
    outline: 2px solid var(--skill-tabs-indicator-color);
    outline-offset: -2px;
  }

  .tab-close:focus-visible,
  .tab-add:focus-visible {
    outline: 2px solid var(--skill-tabs-indicator-color);
    outline-offset: 2px;
  }

  /* 动画 */
  @keyframes tabSlideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .tab-panel.active {
    animation: tabSlideIn var(--skill-tabs-animation-duration) ease-out;
  }

  /* 性能优化 */
  .tabs-nav,
  .tabs-list,
  .tab-item {
    will-change: transform;
  }

  .tab-panel {
    will-change: opacity, visibility;
  }
`;