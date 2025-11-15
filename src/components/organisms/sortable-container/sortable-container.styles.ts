import { css } from 'lit';

export const sortableContainerStyles = css`
  :host {
    display: block;
    position: relative;
    width: 100%;
    max-width: var(--skill-sortable-max-width, none);
    max-height: var(--skill-sortable-max-height, none);

    --skill-sortable-bg: var(--skill-color-background, #fff);
    --skill-sortable-border-color: var(--skill-color-border, #e0e0e0);
    --skill-sortable-text-color: var(--skill-color-text-primary, #333);
    --skill-sortable-handle-color: var(--skill-color-text-tertiary, #999);
    --skill-sortable-handle-hover-color: var(--skill-color-text-secondary, #666);
    --skill-sortable-drag-bg: var(--skill-color-background-elevated, #fff);
    --skill-sortable-drag-border-color: var(--skill-color-primary, #1890ff);
    --skill-sortable-drop-indicator-color: var(--skill-color-primary, #1890ff);
    --skill-sortable-placeholder-bg: var(--skill-color-background-secondary, #f5f5f5);
    --skill-sortable-placeholder-border-color: var(--skill-color-border-dashed, #d9d9d9);
    --skill-sortable-transition: var(--skill-transition-normal, 0.3s ease);
    --skill-sortable-gap: var(--skill-spacing-md, 16px);
    --skill-sortable-padding: var(--skill-spacing-md, 16px);
    --skill-sortable-border-radius: var(--skill-border-radius-md, 6px);
    --skill-sortable-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    --skill-sortable-shadow-dragging: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .sortable-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: var(--skill-sortable-bg);
    border-radius: var(--skill-sortable-border-radius);
    position: relative;
  }

  /* 布局模式 */
  .sortable-container[layout="list"] {
    flex-direction: column;
  }

  .sortable-container[layout="grid"] {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--skill-sortable-gap);
  }

  .sortable-container[layout="cards"] {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--skill-sortable-gap);
  }

  /* 方向设置 */
  .sortable-container[direction="horizontal"] {
    flex-direction: row;
    overflow-x: auto;
  }

  .sortable-container[direction="both"] {
    flex-direction: column;
  }

  /* 排序项目 */
  .sortable-item {
    position: relative;
    background: var(--skill-sortable-bg);
    border: 1px solid var(--skill-sortable-border-color);
    border-radius: var(--skill-sortable-border-radius);
    padding: var(--skill-sortable-padding);
    cursor: move;
    transition: var(--skill-sortable-transition);
    user-select: none;
    overflow: hidden;
  }

  .sortable-item:hover {
    border-color: var(--skill-sortable-drag-border-color);
    box-shadow: var(--skill-sortable-shadow);
  }

  .sortable-item.disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  .sortable-item.dragging {
    opacity: var(--skill-drag-opacity, 0.8);
    transform: rotate(2deg);
    box-shadow: var(--skill-sortable-shadow-dragging);
    z-index: 1000;
    border-color: var(--skill-sortable-drag-border-color);
  }

  .sortable-item.drag-over {
    border-color: var(--skill-sortable-drop-indicator-color);
    background: var(--skill-sortable-placeholder-bg);
  }

  /* 拖拽手柄 */
  .sortable-handle {
    position: absolute;
    top: var(--skill-spacing-sm, 8px);
    right: var(--skill-spacing-sm, 8px);
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--skill-sortable-handle-color);
    cursor: grab;
    border-radius: 4px;
    transition: var(--skill-transition-fast, 0.15s ease);
    z-index: 10;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid var(--skill-sortable-border-color);
  }

  .sortable-handle:hover {
    color: var(--skill-sortable-handle-hover-color);
    background: var(--skill-color-background-secondary, #f5f5f5);
  }

  .sortable-handle:active {
    cursor: grabbing;
  }

  .sortable-handle.left {
    left: var(--skill-spacing-sm, 8px);
    right: auto;
  }

  .sortable-handle.custom {
    position: static;
    width: auto;
    height: auto;
    background: transparent;
    border: none;
    padding: 4px;
  }

  /* 没有手柄时整项可拖拽 */
  .sortable-container:not([handle]) .sortable-item {
    cursor: move;
  }

  /* 列表布局样式 */
  .sortable-container[layout="list"] .sortable-item {
    margin-bottom: var(--skill-sortable-gap);
    display: flex;
    align-items: center;
    min-height: 48px;
  }

  .sortable-container[layout="list"] .sortable-item:last-child {
    margin-bottom: 0;
  }

  /* 网格布局样式 */
  .sortable-container[layout="grid"] .sortable-item {
    min-height: 120px;
    display: flex;
    flex-direction: column;
  }

  /* 卡片布局样式 */
  .sortable-container[layout="cards"] .sortable-item {
    min-height: 160px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .sortable-container[layout="cards"] .sortable-item:hover {
    box-shadow: var(--skill-sortable-shadow);
  }

  /* 占位符 */
  .sortable-placeholder {
    background: var(--skill-sortable-placeholder-bg);
    border: 2px dashed var(--skill-sortable-placeholder-border-color);
    border-radius: var(--skill-sortable-border-radius);
    padding: var(--skill-sortable-padding);
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--skill-color-text-tertiary, #999);
    font-style: italic;
    transition: var(--skill-sortable-transition);
  }

  .sortable-placeholder::before {
    content: var(--skill-placeholder-content, "拖拽项目到这里");
    font-size: 14px;
  }

  /* 放置指示器 */
  .drop-indicator {
    position: absolute;
    background: var(--skill-sortable-drop-indicator-color);
    z-index: 999;
    pointer-events: none;
    border-radius: 2px;
  }

  .sortable-container[direction="vertical"] .drop-indicator {
    width: 100%;
    height: 2px;
    left: 0;
  }

  .sortable-container[direction="horizontal"] .drop-indicator {
    width: 2px;
    height: 100%;
    top: 0;
  }

  /* 拖拽预览 */
  .drag-preview {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    pointer-events: none;
    opacity: var(--skill-drag-opacity, 0.8);
    transform: rotate(2deg);
    box-shadow: var(--skill-sortable-shadow-dragging);
    border-radius: var(--skill-sortable-border-radius);
    background: var(--skill-sortable-drag-bg);
    border: 1px solid var(--skill-sortable-drag-border-color);
  }

  /* 动画 */
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .sortable-item {
    animation: fadeIn var(--skill-animation-duration, 300ms) ease-out;
  }

  .sortable-item.moving {
    transition: transform var(--skill-animation-duration, 300ms) ease-out;
  }

  /* 间距变体 */
  .sortable-container[spacing="none"] {
    --skill-sortable-gap: 0;
  }

  .sortable-container[spacing="tight"] {
    --skill-sortable-gap: var(--skill-spacing-xs, 4px);
  }

  .sortable-container[spacing="normal"] {
    --skill-sortable-gap: var(--skill-spacing-md, 16px);
  }

  .sortable-container[spacing="loose"] {
    --skill-sortable-gap: var(--skill-spacing-xl, 32px);
  }

  /* 空状态 */
  .sortable-empty {
    padding: var(--skill-spacing-xl, 32px);
    text-align: center;
    color: var(--skill-color-text-tertiary, #999);
    font-style: italic;
    border: 2px dashed var(--skill-sortable-placeholder-border-color);
    border-radius: var(--skill-sortable-border-radius);
    background: var(--skill-sortable-placeholder-bg);
  }

  .sortable-empty::before {
    content: var(--skill-empty-content, "没有可排序的项目");
    font-size: 16px;
    margin-bottom: var(--skill-spacing-sm, 8px);
  }

  .sortable-empty::after {
    content: var(--skill-empty-hint, "拖拽项目到这里开始");
    font-size: 14px;
    display: block;
    opacity: 0.7;
  }

  /* 暗色主题 */
  :host([theme="dark"]) {
    --skill-sortable-bg: var(--skill-color-background-dark, #141414);
    --skill-sortable-border-color: var(--skill-color-border-dark, #434343);
    --skill-sortable-text-color: var(--skill-color-text-primary-dark, #fff);
    --skill-sortable-handle-color: var(--skill-color-text-tertiary-dark, #8c8c8c);
    --skill-sortable-handle-hover-color: var(--skill-color-text-secondary-dark, #a6a6a6);
    --skill-sortable-drag-bg: var(--skill-color-background-elevated-dark, #1f1f1f);
    --skill-sortable-placeholder-bg: var(--skill-color-background-secondary-dark, #1f1f1f);
    --skill-sortable-placeholder-border-color: var(--skill-color-border-dashed-dark, #595959);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .sortable-container[layout="grid"] {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }

    .sortable-container[layout="cards"] {
      grid-template-columns: 1fr;
    }

    .sortable-handle {
      width: 24px;
      height: 24px;
    }

    .sortable-item {
      min-height: 56px;
    }
  }

  /* 高对比度模式 */
  @media (prefers-contrast: high) {
    .sortable-item {
      border-width: 2px;
    }

    .drop-indicator {
      background: currentColor;
    }
  }

  /* 减少动画 */
  @media (prefers-reduced-motion: reduce) {
    .sortable-item,
    .sortable-item.moving,
    .drag-preview {
      animation: none;
      transition: none;
    }
  }

  /* 焦点样式 */
  .sortable-item:focus-visible {
    outline: 2px solid var(--skill-sortable-drop-indicator-color);
    outline-offset: 2px;
  }

  .sortable-handle:focus-visible {
    outline: 2px solid var(--skill-sortable-drop-indicator-color);
    outline-offset: 2px;
  }

  /* 性能优化 */
  .sortable-item,
  .drag-preview {
    will-change: transform;
  }

  .sortable-item.dragging {
    will-change: transform, opacity, box-shadow;
  }
`;