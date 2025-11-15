import { css } from 'lit';

/**
 * Skill Modal 组件样式
 * 现代化设计，支持动画、焦点管理和可访问性
 */
export const modalStyles = css`
  /* ===== Host 元素 ===== */
  :host {
    display: contents;
  }

  /* ===== Modal Overlay (Backdrop) ===== */
  .skill-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--modal-overlay-bg, rgba(0, 0, 0, 0.5));
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--skill-spacing-lg);
    animation: modal-fade-in var(--skill-transition-duration-normal) var(--skill-transition-easing);
  }

  .skill-modal-overlay--blur {
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  /* ===== Modal Dialog ===== */
  .skill-modal-dialog {
    background: var(--modal-bg, var(--skill-gray-0));
    border-radius: var(--skill-radius-lg);
    box-shadow: var(--skill-shadow-xl);
    max-width: var(--modal-max-width, 90vw);
    max-height: var(--modal-max-height, 85vh);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    animation: modal-scale-in var(--skill-transition-duration-normal) var(--skill-transition-easing);
    outline: none;
  }

  /* ===== 尺寸变体 ===== */
  .skill-modal-dialog--xs {
    width: 320px;
  }

  .skill-modal-dialog--sm {
    width: 400px;
  }

  .skill-modal-dialog--md {
    width: 500px;
  }

  .skill-modal-dialog--lg {
    width: 700px;
  }

  .skill-modal-dialog--xl {
    width: 900px;
  }

  .skill-modal-dialog--full {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 0;
  }

  /* ===== 位置变体 ===== */
  .skill-modal-dialog--top {
    align-self: flex-start;
    margin-top: 10vh;
  }

  .skill-modal-dialog--bottom {
    align-self: flex-end;
    margin-bottom: 10vh;
  }

  .skill-modal-dialog--center {
    align-self: center;
  }

  /* ===== Modal Header ===== */
  .skill-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--skill-spacing-lg) var(--skill-spacing-xl) var(--skill-spacing-md);
    border-bottom: 1px solid var(--skill-gray-200);
    flex-shrink: 0;
  }

  .skill-modal-title {
    margin: 0;
    font-size: var(--skill-font-heading-3);
    font-weight: 600;
    color: var(--skill-gray-900);
    line-height: 1.25;
  }

  /* ===== Close Button ===== */
  .skill-modal-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    border-radius: var(--skill-radius-md);
    color: var(--skill-gray-500);
    cursor: pointer;
    transition: all var(--skill-transition-duration-fast) var(--skill-transition-easing);
    flex-shrink: 0;
  }

  .skill-modal-close:hover {
    background: var(--skill-gray-100);
    color: var(--skill-gray-700);
  }

  .skill-modal-close:focus-visible {
    outline: 2px solid var(--skill-primary-500);
    outline-offset: 2px;
  }

  .skill-modal-close svg {
    width: 20px;
    height: 20px;
  }

  /* ===== Modal Body ===== */
  .skill-modal-body {
    padding: var(--skill-spacing-lg) var(--skill-spacing-xl);
    overflow-y: auto;
    flex: 1;
    min-height: 0;
  }

  /* ===== Modal Footer ===== */
  .skill-modal-footer {
    padding: var(--skill-spacing-md) var(--skill-spacing-xl) var(--skill-spacing-lg);
    border-top: 1px solid var(--skill-gray-200);
    flex-shrink: 0;
  }

  /* ===== Default Actions ===== */
  .skill-modal-default-actions {
    display: flex;
    gap: var(--skill-spacing-md);
    justify-content: flex-end;
    align-items: center;
  }

  /* ===== 动画状态 ===== */
  .skill-modal-dialog--animating {
    animation: modal-scale-in var(--skill-transition-duration-normal) var(--skill-transition-easing);
  }

  /* ===== 动画定义 ===== */
  @keyframes modal-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes modal-scale-in {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes modal-fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes modal-scale-out {
    from {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    to {
      opacity: 0;
      transform: scale(0.95) translateY(-10px);
    }
  }

  /* ===== 焦点管理 ===== */
  .skill-modal-dialog:focus-visible {
    outline: 2px solid var(--skill-primary-500);
    outline-offset: 2px;
  }

  /* ===== 滚动条样式 ===== */
  .skill-modal-body::-webkit-scrollbar {
    width: 6px;
  }

  .skill-modal-body::-webkit-scrollbar-track {
    background: var(--skill-gray-100);
  }

  .skill-modal-body::-webkit-scrollbar-thumb {
    background: var(--skill-gray-300);
    border-radius: 3px;
  }

  .skill-modal-body::-webkit-scrollbar-thumb:hover {
    background: var(--skill-gray-400);
  }

  /* ===== 响应式设计 ===== */
  @media (max-width: 768px) {
    .skill-modal-overlay {
      padding: var(--skill-spacing-md);
    }

    .skill-modal-dialog {
      width: 100%;
      max-width: 100%;
      margin: 0;
      border-radius: var(--skill-radius-lg) var(--skill-radius-lg) 0 0;
    }

    .skill-modal-dialog--top,
    .skill-modal-dialog--bottom,
    .skill-modal-dialog--center {
      align-self: stretch;
      margin: 0;
      max-height: 90vh;
    }

    .skill-modal-dialog--full {
      border-radius: 0;
    }

    .skill-modal-header,
    .skill-modal-body,
    .skill-modal-footer {
      padding-left: var(--skill-spacing-lg);
      padding-right: var(--skill-spacing-lg);
    }

    .skill-modal-default-actions {
      flex-direction: column;
      gap: var(--skill-spacing-sm);
    }

    .skill-modal-default-actions skill-button {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .skill-modal-overlay {
      padding: var(--skill-spacing-sm);
    }

    .skill-modal-header,
    .skill-modal-body,
    .skill-modal-footer {
      padding-left: var(--skill-spacing-md);
      padding-right: var(--skill-spacing-md);
    }

    .skill-modal-title {
      font-size: var(--skill-font-heading-4);
    }
  }

  /* ===== 高对比度模式支持 ===== */
  @media (prefers-contrast: high) {
    .skill-modal-dialog {
      border: 2px solid var(--skill-gray-900);
    }

    .skill-modal-header {
      border-bottom-width: 2px;
    }

    .skill-modal-footer {
      border-top-width: 2px;
    }

    .skill-modal-close {
      border: 2px solid var(--skill-gray-600);
    }

    .skill-modal-dialog:focus-visible {
      outline-width: 3px;
    }
  }

  /* ===== 减少动画偏好支持 ===== */
  @media (prefers-reduced-motion: reduce) {
    .skill-modal-overlay,
    .skill-modal-dialog,
    .skill-modal-dialog--animating {
      animation: none;
      transition: none;
    }

    .skill-modal-close {
      transition: none;
    }
  }

  /* ===== 深色模式支持 ===== */
  @media (prefers-color-scheme: dark) {
    .skill-modal-overlay {
      background: var(--modal-overlay-bg, rgba(0, 0, 0, 0.7));
    }

    .skill-modal-dialog {
      background: var(--modal-bg, var(--skill-gray-800));
      box-shadow: var(--skill-shadow-xl-dark);
    }

    .skill-modal-header {
      border-bottom-color: var(--skill-gray-600);
    }

    .skill-modal-title {
      color: var(--skill-gray-100);
    }

    .skill-modal-close {
      color: var(--skill-gray-400);
    }

    .skill-modal-close:hover {
      background: var(--skill-gray-700);
      color: var(--skill-gray-200);
    }

    .skill-modal-footer {
      border-top-color: var(--skill-gray-600);
    }

    .skill-modal-body::-webkit-scrollbar-track {
      background: var(--skill-gray-700);
    }

    .skill-modal-body::-webkit-scrollbar-thumb {
      background: var(--skill-gray-500);
    }

    .skill-modal-body::-webkit-scrollbar-thumb:hover {
      background: var(--skill-gray-400);
    }
  }

  /* ===== 打印样式 ===== */
  @media print {
    .skill-modal-overlay {
      display: none !important;
    }
  }

  /* ===== 可访问性增强 ===== */
  @media (prefers-reduced-motion: no-preference) {
    .skill-modal-dialog {
      will-change: transform, opacity;
    }
  }

  /* ===== 自定义属性支持 ===== */
  .skill-modal-dialog {
    /* 允许通过 CSS 自定义属性覆盖样式 */
    --modal-border-radius: var(--skill-radius-lg);
    --modal-header-padding: var(--skill-spacing-lg) var(--skill-spacing-xl) var(--skill-spacing-md);
    --modal-body-padding: var(--skill-spacing-lg) var(--skill-spacing-xl);
    --modal-footer-padding: var(--skill-spacing-md) var(--skill-spacing-xl) var(--skill-spacing-lg);
  }

  /* ===== 特殊状态样式 ===== */
  :host([show]) .skill-modal-overlay {
    display: flex;
  }

  /* 防止内容溢出 */
  .skill-modal-dialog {
    contain: layout style paint;
  }

  /* 确保文本在选择时不会破坏布局 */
  .skill-modal-dialog {
    user-select: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
  }

  /* 防止长单词破坏布局 */
  .skill-modal-body {
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }
`;