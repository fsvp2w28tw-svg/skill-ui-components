import { css } from 'lit';

/**
 * Skill Anchor 组件样式
 * 锚点导航组件，支持平滑滚动、自动激活、外部链接等功能
 */
export const anchorStyles = css`
  /* ===== Host 元素 ===== */
  :host {
    display: inline-block;
    position: relative;
  }

  /* ===== 基础锚点样式 ===== */
  .skill-anchor {
    display: inline-flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
    padding: var(--skill-spacing-sm, 8px) var(--skill-spacing-md, 16px);
    color: var(--anchor-color, var(--skill-gray-600, #4b5563));
    text-decoration: none;
    font-weight: 500;
    border-radius: var(--skill-radius-md, 6px);
    transition: all var(--skill-transition-duration-fast, 150ms) var(--skill-transition-easing, ease-in-out);
    position: relative;
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  .skill-anchor:hover:not([disabled]) {
    color: var(--anchor-hover-color, var(--skill-primary-600, #2563eb));
    background: var(--skill-gray-100, #f9fafb);
    text-decoration: none;
  }

  .skill-anchor:focus-visible {
    outline: 2px solid var(--skill-primary-500, #3b82f6);
    outline-offset: 2px;
  }

  .skill-anchor[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* ===== 激活状态样式 ===== */
  .skill-anchor[aria-current='location'] {
    color: var(--anchor-active-color, var(--skill-primary-600, #2563eb));
    background: var(--skill-primary-50, #eff6ff);
    font-weight: 600;
  }

  /* ===== 尺寸变体 ===== */

  :host([size='xs']) .skill-anchor {
    padding: var(--skill-spacing-xs, 4px) var(--skill-spacing-sm, 8px);
    font-size: var(--skill-font-body-4, 12px);
  }

  :host([size='sm']) .skill-anchor {
    padding: var(--skill-spacing-xs, 4px) var(--skill-spacing-md, 16px);
    font-size: var(--skill-font-body-3, 14px);
  }

  :host([size='md']) .skill-anchor,
  :host(:not([size])) .skill-anchor {
    padding: var(--skill-spacing-sm, 8px) var(--skill-spacing-md, 16px);
    font-size: var(--skill-font-body-2, 16px);
  }

  :host([size='lg']) .skill-anchor {
    padding: var(--skill-spacing-md, 16px) var(--skill-spacing-lg, 24px);
    font-size: var(--skill-font-body-1, 18px);
  }

  :host([size='xl']) .skill-anchor {
    padding: var(--skill-spacing-md, 16px) var(--skill-spacing-xl, 32px);
    font-size: var(--skill-font-h3, 20px);
  }

  /* ===== 激活指示器 ===== */
  .skill-anchor__indicator {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: var(--anchor-indicator-size, 20px);
    height: 3px;
    background: var(--anchor-indicator-color, var(--skill-primary-500, #3b82f6));
    border-radius: 2px 2px 0 0;
    opacity: 0;
    transition: opacity var(--skill-transition-duration-fast, 150ms) var(--skill-transition-easing, ease-in-out);
  }

  [aria-current='location'] .skill-anchor__indicator {
    opacity: 1;
  }

  /* ===== 外部链接图标 ===== */
  .skill-anchor__external-icon {
    width: 14px;
    height: 14px;
    opacity: 0.6;
    transition: opacity var(--skill-transition-duration-fast, 150ms) var(--skill-transition-easing, ease-in-out);
  }

  .skill-anchor:hover .skill-anchor__external-icon {
    opacity: 1;
  }

  /* 不同尺寸的外部图标 */
  :host([size='xs']) .skill-anchor__external-icon {
    width: 12px;
    height: 12px;
  }

  :host([size='sm']) .skill-anchor__external-icon {
    width: 13px;
    height: 13px;
  }

  :host([size='lg']) .skill-anchor__external-icon {
    width: 16px;
    height: 16px;
  }

  :host([size='xl']) .skill-anchor__external-icon {
    width: 18px;
    height: 18px;
  }

  /* ===== 内容包装器 ===== */
  .skill-anchor__content {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
  }

  /* ===== 放置位置变体 ===== */

  /* Top placement - indicator on top */
  :host([placement='top']) .skill-anchor__indicator {
    top: 0;
    bottom: auto;
  }

  /* Left placement - indicator on left */
  :host([placement='left']) .skill-anchor__indicator {
    left: 0;
    top: 50%;
    bottom: auto;
    transform: translateY(-50%);
    width: 3px;
    height: 100%;
    border-radius: 0 2px 2px 0;
  }

  /* Right placement - indicator on right */
  :host([placement='right']) .skill-anchor__indicator {
    left: auto;
    right: 0;
    top: 50%;
    bottom: auto;
    transform: translateY(-50%);
    width: 3px;
    height: 100%;
    border-radius: 2px 0 0 2px;
  }

  /* Bottom placement - indicator on bottom (default) */
  :host([placement='bottom']) .skill-anchor__indicator {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: var(--anchor-indicator-size, 20px);
    height: 3px;
    border-radius: 2px 2px 0 0;
  }

  /* ===== 图标插槽样式 ===== */
  ::slotted([slot='icon']) {
    display: flex;
    align-items: center;
    font-size: 1em;
    width: 1em;
    height: 1em;
  }

  /* ===== 响应式设计 ===== */
  @media (max-width: 768px) {
    .skill-anchor {
      padding: var(--skill-spacing-xs, 4px) var(--skill-spacing-sm, 8px);
      font-size: var(--skill-font-body-3, 14px);
    }

    .skill-anchor__external-icon {
      width: 12px;
      height: 12px;
    }
  }

  @media (max-width: 480px) {
    .skill-anchor {
      padding: var(--skill-spacing-xs, 4px) var(--skill-spacing-sm, 8px);
      font-size: var(--skill-font-body-4, 12px);
    }

    .skill-anchor__indicator {
      width: 16px;
      height: 2px;
    }
  }

  /* ===== 高对比度模式支持 ===== */
  @media (prefers-contrast: high) {
    .skill-anchor {
      border: 1px solid transparent;
    }

    .skill-anchor:hover:not([disabled]) {
      border-color: var(--skill-gray-300, #d1d5db);
    }

    .skill-anchor:focus-visible {
      outline-width: 3px;
    }

    .skill-anchor[aria-current='location'] {
      border-color: var(--skill-primary-500, #3b82f6);
    }
  }

  /* ===== 减少动画偏好支持 ===== */
  @media (prefers-reduced-motion: reduce) {
    .skill-anchor,
    .skill-anchor__external-icon,
    .skill-anchor__indicator {
      transition: none;
    }
  }

  /* ===== 深色模式支持 ===== */
  @media (prefers-color-scheme: dark) {
    .skill-anchor {
      color: var(--anchor-color, var(--skill-gray-400, #9ca3af));
    }

    .skill-anchor:hover:not([disabled]) {
      color: var(--anchor-hover-color, var(--skill-primary-400, #60a5fa));
      background: var(--skill-gray-800, #1f2937);
    }

    .skill-anchor[aria-current='location'] {
      color: var(--anchor-active-color, var(--skill-primary-400, #60a5fa));
      background: var(--skill-primary-900, #1e3a8a);
    }
  }

  /* ===== 打印样式 ===== */
  @media print {
    .skill-anchor {
      color: black !important;
      background: transparent !important;
    }

    .skill-anchor::after {
      content: " (" attr(href) ")";
      font-size: 0.9em;
      color: #666;
    }

    .skill-anchor[href^="#"]::after {
      content: "";
    }

    .skill-anchor__external-icon,
    .skill-anchor__indicator {
      display: none !important;
    }
  }

  /* ===== 无障碍增强 ===== */
  .skill-anchor:hover:not([disabled]),
  .skill-anchor:focus-visible {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 4px;
  }

  /* 高对比度模式下禁用下划线覆盖 */
  @media (prefers-contrast: high) {
    .skill-anchor:hover:not([disabled]),
    .skill-anchor:focus-visible {
      text-decoration: none;
    }
  }

  /* ===== 性能优化 ===== */
  .skill-anchor {
    contain: layout style;
    will-change: color, background-color;
  }

  .skill-anchor__external-icon {
    contain: layout style;
  }

  .skill-anchor__indicator {
    contain: layout style;
    will-change: opacity;
  }
`;