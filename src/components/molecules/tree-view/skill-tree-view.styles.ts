import { css } from 'lit';

/**
 * TreeView 组件样式
 */
export const treeViewStyles = css`
  :host {
    display: block;
    width: 100%;
    --tree-node-indent: 20px;
    --tree-node-height: 32px;
    --tree-node-padding: 4px 8px;
    --tree-node-bg-hover: var(--skill-neutral-100, #f3f4f6);
    --tree-node-bg-selected: var(--skill-primary-50, #eff6ff);
    --tree-node-text: var(--skill-text-primary, #1f2937);
    --tree-node-text-hover: var(--skill-text-primary, #1f2937);
    --tree-node-text-selected: var(--skill-primary-700, #1d4ed8);
    --tree-border-color: var(--skill-neutral-200, #e5e7eb);
    --tree-line-color: var(--skill-neutral-300, #d1d5db);
    --tree-icon-color: var(--skill-neutral-500, #6b7280);
    --tree-expand-icon-size: 16px;
    --tree-icon-size: 16px;
  }

  .skill-tree-view {
    font-family: var(--skill-font-family, inherit);
    font-size: var(--skill-font-body-2, 14px);
    line-height: 1.5;
    color: var(--tree-node-text);
    user-select: none;
  }

  /* 树根容器 */
  .skill-tree-view__root {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* 树节点 */
  .skill-tree-view__node {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* 节点内容 */
  .skill-tree-view__node-content {
    display: flex;
    align-items: center;
    height: var(--tree-node-height);
    padding: var(--tree-node-padding);
    cursor: pointer;
    border-radius: var(--skill-radius-sm, 4px);
    transition: all 0.2s ease;
    gap: var(--skill-spacing-xs, 4px);
  }

  .skill-tree-view__node-content:hover {
    background-color: var(--tree-node-bg-hover);
  }

  .skill-tree-view__node-content:focus {
    outline: 2px solid var(--skill-primary-500, #3b82f6);
    outline-offset: 1px;
  }

  /* 节点状态 */
  .skill-tree-view__node-content--selected {
    background-color: var(--tree-node-bg-selected);
    color: var(--tree-node-text-selected);
    font-weight: 500;
  }

  .skill-tree-view__node-content--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* 节点缩进 */
  .skill-tree-view__node--level-0 > .skill-tree-view__node-content {
    padding-left: calc(0 * var(--tree-node-indent) + 8px);
  }

  .skill-tree-view__node--level-1 > .skill-tree-view__node-content {
    padding-left: calc(1 * var(--tree-node-indent) + 8px);
  }

  .skill-tree-view__node--level-2 > .skill-tree-view__node-content {
    padding-left: calc(2 * var(--tree-node-indent) + 8px);
  }

  .skill-tree-view__node--level-3 > .skill-tree-view__node-content {
    padding-left: calc(3 * var(--tree-node-indent) + 8px);
  }

  .skill-tree-view__node--level-4 > .skill-tree-view__node-content {
    padding-left: calc(4 * var(--tree-node-indent) + 8px);
  }

  .skill-tree-view__node--level-5 > .skill-tree-view__node-content {
    padding-left: calc(5 * var(--tree-node-indent) + 8px);
  }

  /* 展开/折叠图标 */
  .skill-tree-view__expand-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--tree-expand-icon-size);
    height: var(--tree-expand-icon-size);
    color: var(--tree-icon-color);
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }

  .skill-tree-view__expand-icon--expanded {
    transform: rotate(90deg);
  }

  .skill-tree-view__expand-icon--leaf {
    visibility: hidden;
    width: var(--tree-expand-icon-size);
  }

  .skill-tree-view__expand-icon svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  /* 节点图标 */
  .skill-tree-view__node-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--tree-icon-size);
    height: var(--tree-icon-size);
    color: var(--tree-icon-color);
    flex-shrink: 0;
  }

  .skill-tree-view__node-icon svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  /* 节点文本 */
  .skill-tree-view__node-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* 节点标签 */
  .skill-tree-view__node-label {
    margin-left: var(--skill-spacing-xs, 4px);
    font-size: var(--skill-font-body-3, 12px);
    color: var(--skill-text-secondary, #6b7280);
    background-color: var(--skill-neutral-100, #f3f4f6);
    padding: 1px 6px;
    border-radius: var(--skill-radius-full, 9999px);
    white-space: nowrap;
  }

  /* 子节点容器 */
  .skill-tree-view__children {
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    transition: max-height 0.2s ease;
  }

  .skill-tree-view__children--collapsed {
    max-height: 0;
  }

  .skill-tree-view__children--expanded {
    max-height: none;
  }

  /* 连接线样式 */
  .skill-tree-view--show-lines .skill-tree-view__node {
    position: relative;
  }

  .skill-tree-view--show-lines .skill-tree-view__node::before {
    content: '';
    position: absolute;
    left: calc(var(--tree-node-indent) * var(--node-level, 0) + calc(var(--tree-expand-icon-size) / 2));
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: var(--tree-line-color);
  }

  .skill-tree-view--show-lines .skill-tree-view__node:last-child::before {
    bottom: 50%;
  }

  .skill-tree-view--show-lines .skill-tree-view__node-content::before {
    content: '';
    position: absolute;
    left: calc(var(--tree-node-indent) * var(--node-level, 0) + calc(var(--tree-expand-icon-size) / 2));
    top: 50%;
    width: calc(var(--tree-expand-icon-size) / 2 + var(--skill-spacing-xs, 4px));
    height: 1px;
    background-color: var(--tree-line-color);
  }

  /* 虚线样式 */
  .skill-tree-view--dashed-lines .skill-tree-view__node::before {
    background-image: linear-gradient(to bottom, var(--tree-line-color) 50%, transparent 50%);
    background-size: 2px 6px;
    background-repeat: repeat-y;
  }

  .skill-tree-view--dashed-lines .skill-tree-view__node-content::before {
    background-image: linear-gradient(to right, var(--tree-line-color) 50%, transparent 50%);
    background-size: 6px 2px;
    background-repeat: repeat-x;
  }

  /* 尺寸变体 */
  .skill-tree-view--xs {
    --tree-node-height: 24px;
    --tree-node-indent: 16px;
    --tree-expand-icon-size: 12px;
    --tree-icon-size: 12px;
  }

  .skill-tree-view--sm {
    --tree-node-height: 28px;
    --tree-node-indent: 18px;
    --tree-expand-icon-size: 14px;
    --tree-icon-size: 14px;
  }

  .skill-tree-view--md {
    --tree-node-height: 32px;
    --tree-node-indent: 20px;
    --tree-expand-icon-size: 16px;
    --tree-icon-size: 16px;
  }

  .skill-tree-view--lg {
    --tree-node-height: 36px;
    --tree-node-indent: 24px;
    --tree-expand-icon-size: 18px;
    --tree-icon-size: 18px;
  }

  .skill-tree-view--xl {
    --tree-node-height: 40px;
    --tree-node-indent: 28px;
    --tree-expand-icon-size: 20px;
    --tree-icon-size: 20px;
  }

  /* 加载状态 */
  .skill-tree-view__node-loading {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
    padding: var(--tree-node-padding);
    color: var(--skill-text-secondary, #6b7280);
    font-style: italic;
  }

  .skill-tree-view__loading-spinner {
    width: var(--tree-icon-size);
    height: var(--tree-icon-size);
    border: 1px solid var(--skill-neutral-300, #d1d5db);
    border-top-color: var(--skill-primary-500, #3b82f6);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* 拖拽样式 */
  .skill-tree-view__node-content--dragging {
    opacity: 0.5;
  }

  .skill-tree-view__node-content--drop-target {
    border: 2px dashed var(--skill-primary-500, #3b82f6);
  }

  .skill-tree-view__node-content--drop-above {
    border-top: 2px solid var(--skill-primary-500, #3b82f6);
  }

  .skill-tree-view__node-content--drop-below {
    border-bottom: 2px solid var(--skill-primary-500, #3b82f6);
  }

  /* 搜索高亮 */
  .skill-tree-view__node-text--highlight {
    background-color: var(--skill-warning-200, #fef3c7);
    color: var(--skill-warning-800, #92400e);
    padding: 0 2px;
    border-radius: 2px;
  }

  /* 复选框样式 */
  .skill-tree-view__node-checkbox {
    margin-right: var(--skill-spacing-xs, 4px);
  }

  .skill-tree-view__node-checkbox--indeterminate {
    background-color: var(--skill-primary-500, #3b82f6);
    border-color: var(--skill-primary-500, #3b82f6);
  }

  /* 节点操作按钮 */
  .skill-tree-view__node-actions {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 2px);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .skill-tree-view__node-content:hover .skill-tree-view__node-actions,
  .skill-tree-view__node-content:focus .skill-tree-view__node-actions {
    opacity: 1;
  }

  .skill-tree-view__node-action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: none;
    background: none;
    color: var(--tree-icon-color);
    cursor: pointer;
    border-radius: var(--skill-radius-xs, 2px);
    transition: all 0.2s ease;
  }

  .skill-tree-view__node-action:hover {
    background-color: var(--skill-neutral-100, #f3f4f6);
    color: var(--tree-node-text);
  }

  /* 滚动条样式 */
  .skill-tree-view__container {
    overflow: auto;
    max-height: 100%;
  }

  .skill-tree-view__container::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .skill-tree-view__container::-webkit-scrollbar-track {
    background: var(--skill-neutral-100, #f3f4f6);
  }

  .skill-tree-view__container::-webkit-scrollbar-thumb {
    background: var(--skill-neutral-300, #d1d5db);
    border-radius: 3px;
  }

  .skill-tree-view__container::-webkit-scrollbar-thumb:hover {
    background: var(--skill-neutral-400, #9ca3af);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    :host {
      --tree-node-indent: 16px;
      --tree-node-height: 36px;
    }

    .skill-tree-view__node-actions {
      opacity: 1;
    }
  }

  /* 深色模式支持 */
  @media (prefers-color-scheme: dark) {
    :host {
      --tree-node-bg-hover: var(--skill-neutral-700, #374151);
      --tree-node-bg-selected: var(--skill-primary-900, #1e3a8a);
      --tree-node-text: var(--skill-text-primary-dark, #f9fafb);
      --tree-node-text-hover: var(--skill-text-primary-dark, #f9fafb);
      --tree-node-text-selected: var(--skill-primary-300, #93c5fd);
      --tree-border-color: var(--skill-neutral-600, #4b5563);
      --tree-line-color: var(--skill-neutral-500, #6b7280);
      --tree-icon-color: var(--skill-neutral-400, #9ca3af);
    }

    .skill-tree-view__node-label {
      background-color: var(--skill-neutral-700, #374151);
      color: var(--skill-text-secondary-dark, #d1d5db);
    }

    .skill-tree-view__node-loading {
      color: var(--skill-text-secondary-dark, #d1d5db);
    }

    .skill-tree-view__loading-spinner {
      border-color: var(--skill-neutral-600, #4b5563);
      border-top-color: var(--skill-primary-400, #60a5fa);
    }

    .skill-tree-view__node-action:hover {
      background-color: var(--skill-neutral-700, #374151);
    }
  }

  /* 高对比度模式 */
  @media (prefers-contrast: high) {
    .skill-tree-view__node-content {
      border: 1px solid transparent;
    }

    .skill-tree-view__node-content:focus {
      border-color: var(--skill-primary-500, #3b82f6);
      outline: none;
    }

    .skill-tree-view__node-content--selected {
      border-color: var(--skill-primary-500, #3b82f6);
    }

    .skill-tree-view__node-text--highlight {
      background-color: var(--skill-warning-400, #fbbf24);
      color: var(--skill-warning-900, #78350f);
    }
  }

  /* 减少动画模式 */
  @media (prefers-reduced-motion: reduce) {
    .skill-tree-view__expand-icon,
    .skill-tree-view__node-content,
    .skill-tree-view__children,
    .skill-tree-view__node-actions,
    .skill-tree-view__loading-spinner {
      transition: none;
    }
  }

  /* 打印样式 */
  @media print {
    .skill-tree-view {
      color: black !important;
    }

    .skill-tree-view__node-actions {
      display: none;
    }

    .skill-tree-view__node-content {
      background: white !important;
    }
  }

  /* 插槽样式 */
  ::slotted([slot="node-actions"]) {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
  }

  ::slotted([slot="node-icon"]) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--tree-icon-size);
    height: var(--tree-icon-size);
    color: var(--tree-icon-color);
  }

  ::slotted([slot="node-label"]) {
    margin-left: var(--skill-spacing-xs, 4px);
    font-size: var(--skill-font-body-3, 12px);
    color: var(--skill-text-secondary, #6b7280);
    background-color: var(--skill-neutral-100, #f3f4f6);
    padding: 1px 6px;
    border-radius: var(--skill-radius-full, 9999px);
  }
`;