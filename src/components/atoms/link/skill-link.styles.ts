import { css } from 'lit';

export const linkStyles = css`
  :host {
    display: inline;
  }

  .skill-link {
    display: inline-flex;
    align-items: center;
    gap: var(--link-gap, var(--skill-spacing-2xs, 4px));
    color: var(--link-color, var(--skill-primary-600, #2563EB));
    text-decoration: var(--link-decoration, none);
    font-weight: var(--link-font-weight, var(--skill-font-weight-medium, 500));
    font-size: var(--link-font-size, var(--skill-font-size-body-2, 14px));
    line-height: var(--link-line-height, 1.4);
    cursor: pointer;
    transition: all var(--skill-duration-fast, 200ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    outline: none;
    max-width: var(--link-max-width, none);
    border-radius: var(--skill-radius-sm, 4px);
    word-break: break-word;
  }

  .skill-link:focus-visible {
    outline: 2px solid var(--skill-primary-500, #0A59F7);
    outline-offset: 2px;
    border-radius: var(--skill-radius-sm, 4px);
  }

  .skill-link:hover {
    color: var(--link-hover-color, var(--skill-primary-700, #1D4ED8));
  }

  .skill-link:active {
    color: var(--link-active-color, var(--skill-primary-800, #1E40AF));
  }

  .skill-link:visited {
    color: var(--link-visited-color, var(--skill-purple-600, #9333EA));
  }

  .skill-link__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .skill-link__content {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    flex: 1;
  }

  .skill-link__suffix {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .skill-link__external-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85em;
    margin-left: 2px;
    opacity: 0.7;
    color: var(--link-external-color, currentColor);
  }

  /* 禁用状态 */
  :host([disabled]) .skill-link {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
    text-decoration: none;
  }

  /* 文本截断 */
  :host([truncate]) .skill-link__content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* 无下划线 */
  :host([no-underline]) .skill-link {
    text-decoration: none;
  }

  /* 尺寸变体 */
  :host([size='sm']) .skill-link {
    --link-font-size: var(--skill-font-size-body-3, 12px);
    --link-gap: 2px;
  }

  :host([size='sm']) .skill-link__external-icon {
    font-size: 0.8em;
  }

  :host([size='md']) .skill-link {
    --link-font-size: var(--skill-font-size-body-2, 14px);
    --link-gap: var(--skill-spacing-2xs, 4px);
  }

  :host([size='lg']) .skill-link {
    --link-font-size: var(--skill-font-size-body-1, 16px);
    --link-gap: var(--skill-spacing-xs, 8px);
  }

  :host([size='lg']) .skill-link__external-icon {
    font-size: 0.9em;
  }

  /* 颜色变体 */
  :host([color='primary']) .skill-link {
    --link-color: var(--skill-primary-600, #2563EB);
    --link-hover-color: var(--skill-primary-700, #1D4ED8);
    --link-active-color: var(--skill-primary-800, #1E40AF);
  }

  :host([color='secondary']) .skill-link {
    --link-color: var(--skill-secondary-600, #0D9488);
    --link-hover-color: var(--skill-secondary-700, #0F766E);
    --link-active-color: var(--skill-secondary-800, #115E59);
  }

  :host([color='success']) .skill-link {
    --link-color: var(--skill-success-600, #16A34A);
    --link-hover-color: var(--skill-success-700, #15803D);
    --link-active-color: var(--skill-success-800, #166534);
  }

  :host([color='warning']) .skill-link {
    --link-color: var(--skill-warning-600, #CA8A04);
    --link-hover-color: var(--skill-warning-700, #A16207);
    --link-active-color: var(--skill-warning-800, #92400E);
  }

  :host([color='error']) .skill-link {
    --link-color: var(--skill-error-600, #DC2626);
    --link-hover-color: var(--skill-error-700, #B91C1C);
    --link-active-color: var(--skill-error-800, #991B1B);
  }

  :host([color='info']) .skill-link {
    --link-color: var(--skill-info-600, #0284C7);
    --link-hover-color: var(--skill-info-700, #0369A1);
    --link-active-color: var(--skill-info-800, #075985);
  }

  :host([color='gray']) .skill-link {
    --link-color: var(--skill-gray-600, #4B5563);
    --link-hover-color: var(--skill-gray-700, #374151);
    --link-active-color: var(--skill-gray-800, #1F2937);
  }

  /* 变体样式 - Default */
  :host([variant='default']) .skill-link {
    --link-decoration: none;
  }

  /* 变体样式 - Underline */
  :host([variant='underline']) .skill-link {
    --link-decoration: underline;
    text-underline-offset: 2px;
  }

  :host([variant='underline']) .skill-link:hover {
    text-decoration-color: var(--link-hover-color, currentColor);
  }

  /* 变体样式 - Ghost */
  :host([variant='ghost']) .skill-link {
    --link-decoration: none;
    background: transparent;
    border-radius: var(--skill-radius-md, 6px);
    padding: var(--skill-spacing-2xs, 4px) var(--skill-spacing-xs, 8px);
  }

  :host([variant='ghost']) .skill-link:hover {
    background: var(--link-ghost-hover-bg, var(--skill-gray-100, #F3F4F6));
  }

  /* 变体样式 - Text */
  :host([variant='text']) .skill-link {
    --link-decoration: none;
    --link-font-weight: var(--skill-font-weight-normal, 400);
  }

  /* 悬停效果 */
  :host([hover='none']) .skill-link:hover {
    color: var(--link-color, currentColor);
    text-decoration: var(--link-decoration, none);
    background: none;
  }

  :host([hover='underline']) .skill-link:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  :host([hover='color']) .skill-link:hover {
    color: var(--link-hover-color);
    text-decoration: none;
  }

  :host([hover='background']) .skill-link:hover {
    background: var(--link-hover-bg, var(--skill-gray-100, #F3F4F6));
    border-radius: var(--skill-radius-md, 6px);
    text-decoration: none;
  }

  /* 访问过状态 */
  :host([visited]) .skill-link {
    color: var(--link-visited-color, var(--skill-purple-600, #9333EA));
  }

  :host([visited]) .skill-link:hover {
    color: var(--link-visited-hover-color, var(--skill-purple-700, #7C3AED));
  }

  /* 外部链接指示器 */
  .skill-link__external-icon {
    transition: all var(--skill-duration-fast, 200ms);
  }

  .skill-link:hover .skill-link__external-icon {
    opacity: 1;
  }

  /* 路由链接样式 */
  :host([router-link]) .skill-link {
    text-decoration: none;
  }

  /* 下载链接指示器 */
  :host([download]) .skill-link::before {
    content: "↓";
    display: inline-flex;
    align-items: center;
    margin-right: 4px;
    font-size: 0.9em;
    opacity: 0.7;
  }

  /* 邮件链接样式 */
  :host([href^="mailto:"]) .skill-link::before {
    content: "✉";
    display: inline-flex;
    align-items: center;
    margin-right: 4px;
    font-size: 0.9em;
    opacity: 0.7;
  }

  /* 电话链接样式 */
  :host([href^="tel:"]) .skill-link::before {
    content: "📞";
    display: inline-flex;
    align-items: center;
    margin-right: 4px;
    font-size: 0.9em;
    opacity: 0.7;
  }

  /* 锚点链接样式 */
  :host([href^="#"]) .skill-link::before {
    content: "⚓";
    display: inline-flex;
    align-items: center;
    margin-right: 4px;
    font-size: 0.9em;
    opacity: 0.7;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    :host([responsive]) .skill-link {
      --link-font-size: 13px;
      --link-gap: 2px;
    }
  }

  /* 高对比度模式支持 */
  @media (prefers-contrast: high) {
    .skill-link {
      --link-font-weight: var(--skill-font-weight-semibold, 600);
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    .skill-link:focus-visible {
      outline-width: 3px;
    }
  }

  /* 减少动画偏好支持 */
  @media (prefers-reduced-motion: reduce) {
    .skill-link,
    .skill-link__external-icon {
      transition: none;
    }
  }

  /* 打印样式 */
  @media print {
    .skill-link {
      color: #000;
      text-decoration: underline;
    }

    .skill-link::after {
      content: " (" attr(href) ")";
      font-size: 0.8em;
      color: #666;
    }

    .skill-link[href^="#"]::after,
    .skill-link[href^="javascript:"]::after {
      content: "";
    }
  }

  /* 焦点指示器增强 */
  @media (prefers-reduced-motion: no-preference) {
    .skill-link:focus-visible {
      animation: link-focus 0.2s ease-out;
    }
  }

  @keyframes link-focus {
    0% {
      box-shadow: 0 0 0 0 rgba(10, 89, 247, 0.4);
    }
    100% {
      box-shadow: 0 0 0 4px rgba(10, 89, 247, 0.1);
    }
  }

  /* 深色模式支持 */
  @media (prefers-color-scheme: dark) {
    :host([color='gray']) .skill-link {
      --link-color: var(--skill-gray-400, #9CA3AF);
      --link-hover-color: var(--skill-gray-300, #D1D5DB);
      --link-active-color: var(--skill-gray-200, #E5E7EB);
    }

    :host([variant='ghost']) .skill-link:hover {
      --link-ghost-hover-bg: rgba(255, 255, 255, 0.1);
    }

    :host([hover='background']) .skill-link:hover {
      --link-hover-bg: rgba(255, 255, 255, 0.1);
    }
  }

  /* 链接组合样式 */
  .link-group {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-md, 16px);
    flex-wrap: wrap;
  }

  .link-group .skill-link {
    white-space: nowrap;
  }

  /* 导航链接样式 */
  .nav-link {
    padding: var(--skill-spacing-sm, 12px) var(--skill-spacing-md, 16px);
    border-radius: var(--skill-radius-md, 6px);
    transition: all var(--skill-duration-fast, 200ms);
  }

  .nav-link:hover,
  .nav-link:focus {
    background: var(--link-nav-hover-bg, var(--skill-gray-100, #F3F4F6));
  }

  .nav-link--active {
    background: var(--link-nav-active-bg, var(--skill-primary-50, #EFF6FF));
    color: var(--link-nav-active-color, var(--skill-primary-700, #1D4ED8));
    font-weight: var(--skill-font-weight-semibold, 600);
  }
`;