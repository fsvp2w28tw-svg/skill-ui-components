import { css } from 'lit';

export const splitPaneStyles = css`
    :host {
      display: flex;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;

      --skill-split-pane-resizer-bg: var(--skill-color-border, #e0e0e0);
      --skill-split-pane-resizer-hover-bg: var(--skill-color-primary-hover, #1890ff);
      --skill-split-pane-resizer-active-bg: var(--skill-color-primary-active, #096dd9);
      --skill-split-pane-handle-bg: var(--skill-color-text-secondary, #666);
      --skill-split-pane-handle-hover-bg: var(--skill-color-text-primary, #333);
      --skill-split-pane-transition: var(--skill-transition-normal, all 0.3s ease);
    }

    :host([direction='horizontal']) {
      flex-direction: row;
    }

    :host([direction='vertical']) {
      flex-direction: column;
    }

    .split-pane-container {
      display: flex;
      width: 100%;
      height: 100%;
      position: relative;
    }

    .split-pane-container[direction='horizontal'] {
      flex-direction: row;
    }

    .split-pane-container[direction='vertical'] {
      flex-direction: column;
    }

    /* 分割面板样式 */
    .pane {
      overflow: hidden;
      position: relative;
      transition: var(--skill-split-pane-transition);
    }

    .pane-first {
      flex: 0 0 auto;
    }

    .pane-second {
      flex: 1 1 auto;
      min-width: 0;
      min-height: 0;
    }

    /* 分割器样式 */
    .resizer {
      position: relative;
      background: var(--skill-split-pane-resizer-bg);
      cursor: col-resize;
      user-select: none;
      z-index: 10;
      transition: background-color var(--skill-transition-fast, 0.15s ease);
    }

    .resizer:hover {
      background: var(--skill-split-pane-resizer-hover-bg);
    }

    .resizer.dragging {
      background: var(--skill-split-pane-resizer-active-bg);
    }

    /* 水平分割器 */
    :host([direction='horizontal']) .resizer {
      width: var(--skill-split-pane-resizer-size, 8px);
      height: 100%;
      cursor: col-resize;
      flex-shrink: 0;
    }

    /* 垂直分割器 */
    :host([direction='vertical']) .resizer {
      width: 100%;
      height: var(--skill-split-pane-resizer-size, 8px);
      cursor: row-resize;
      flex-shrink: 0;
    }

    /* 分割器样式变体 */
    .resizer.thin {
      --skill-split-pane-resizer-size: 4px;
    }

    .resizer.thick {
      --skill-split-pane-resizer-size: 12px;
    }

    .resizer.handle {
      --skill-split-pane-resizer-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* 分割器手柄 */
    .resizer-handle {
      position: absolute;
      background: var(--skill-split-pane-handle-bg);
      border-radius: 2px;
      transition: background-color var(--skill-transition-fast, 0.15s ease);
    }

    .resizer-handle:hover {
      background: var(--skill-split-pane-handle-hover-bg);
    }

    :host([direction='horizontal']) .resizer-handle {
      width: 2px;
      height: 24px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    :host([direction='vertical']) .resizer-handle {
      width: 24px;
      height: 2px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    /* 折叠按钮 */
    .collapse-button {
      position: absolute;
      background: var(--skill-color-background, #fff);
      border: 1px solid var(--skill-color-border, #e0e0e0);
      border-radius: var(--skill-border-radius-sm, 4px);
      padding: 4px;
      cursor: pointer;
      z-index: 11;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: var(--skill-color-text-secondary, #666);
      transition: all var(--skill-transition-fast, 0.15s ease);
    }

    .collapse-button:hover {
      background: var(--skill-color-background-secondary, #f5f5f5);
      border-color: var(--skill-color-primary, #1890ff);
      color: var(--skill-color-primary, #1890ff);
    }

    /* 折叠按钮位置 - 水平分割 */
    :host([direction='horizontal']) .collapse-button {
      width: 16px;
      height: 32px;
    }

    :host([direction='horizontal']) .collapse-button.collapse-first {
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
    }

    :host([direction='horizontal']) .collapse-button.collapse-second {
      left: 4px;
      top: 50%;
      transform: translateY(-50%);
    }

    /* 折叠按钮位置 - 垂直分割 */
    :host([direction='vertical']) .collapse-button {
      width: 32px;
      height: 16px;
    }

    :host([direction='vertical']) .collapse-button.collapse-first {
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
    }

    :host([direction='vertical']) .collapse-button.collapse-second {
      top: 4px;
      left: 50%;
      transform: translateX(-50%);
    }

    /* 折叠状态 */
    .pane.collapsed {
      flex: 0 0 0 !important;
      overflow: hidden;
      visibility: hidden;
    }

    /* 拖拽时的样式 */
    :host([dragging]) {
      user-select: none;
    }

    :host([dragging]) .resizer {
      opacity: 1;
    }

    /* 防止文本选择 */
    :host([dragging]) * {
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }

    /* 暗色主题支持 */
    :host([theme='dark']) {
      --skill-split-pane-resizer-bg: rgba(255, 255, 255, 0.1);
      --skill-split-pane-resizer-hover-bg: var(--skill-color-primary-hover, #40a9ff);
      --skill-split-pane-resizer-active-bg: var(--skill-color-primary-active, #1890ff);
      --skill-split-pane-handle-bg: rgba(255, 255, 255, 0.6);
      --skill-split-pane-handle-hover-bg: rgba(255, 255, 255, 0.9);
    }

    :host([theme='dark']) .collapse-button {
      background: var(--skill-color-background-dark, #141414);
      border-color: var(--skill-color-border-dark, #434343);
      color: var(--skill-color-text-secondary-dark, #a6a6a6);
    }

    :host([theme='dark']) .collapse-button:hover {
      background: var(--skill-color-background-secondary-dark, #1f1f1f);
      border-color: var(--skill-color-primary, #1890ff);
      color: var(--skill-color-primary, #1890ff);
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
      :host([direction='horizontal']) .resizer {
        --skill-split-pane-resizer-size: 6px;
      }

      :host([direction='vertical']) .resizer {
        --skill-split-pane-resizer-size: 6px;
      }
    }

    /* 焦点样式 */
    .resizer:focus,
    .collapse-button:focus {
      outline: 2px solid var(--skill-color-primary, #1890ff);
      outline-offset: 2px;
    }

    /* 动画性能优化 */
    .pane {
      will-change: flex;
    }

    .resizer {
      will-change: background-color;
    }
  `;