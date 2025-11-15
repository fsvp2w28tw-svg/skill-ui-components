import { css } from 'lit';

/**
 * PageSection 组件样式
 */
export const pageSectionStyles = css`
  :host {
    display: block;
    width: 100%;
    --section-padding: var(--skill-spacing-xl, 24px) var(--skill-spacing-lg, 20px);
    --section-bg: var(--skill-white, #ffffff);
    --section-border: none;
    --section-border-radius: var(--skill-radius-md, 6px);
    --section-shadow: none;
    --section-title-color: var(--skill-text-primary, #1f2937);
    --section-subtitle-color: var(--skill-text-secondary, #6b7280);
    --section-description-color: var(--skill-text-tertiary, #9ca3af);
    --section-header-padding: 0 0 var(--skill-spacing-md, 16px) 0;
    --section-content-padding: 0;
    --section-footer-padding: var(--skill-spacing-md, 16px) 0 0 0;
    --section-divider: 1px solid var(--skill-neutral-200, #e5e7eb);
  }

  .skill-page-section {
    font-family: var(--skill-font-family, inherit);
    background-color: var(--section-bg);
    border: var(--section-border);
    border-radius: var(--section-border-radius);
    box-shadow: var(--section-shadow);
    padding: var(--section-padding);
    position: relative;
    overflow: hidden;
  }

  /* 区域变体 */
  .skill-page-section--default {
    --section-bg: var(--skill-white, #ffffff);
    --section-border: none;
    --section-shadow: none;
  }

  .skill-page-section--card {
    --section-bg: var(--skill-white, #ffffff);
    --section-border: 1px solid var(--skill-neutral-200, #e5e7eb);
    --section-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --section-border-radius: var(--skill-radius-md, 6px);
  }

  .skill-page-section--elevated {
    --section-bg: var(--skill-white, #ffffff);
    --section-border: none;
    --section-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --section-border-radius: var(--skill-radius-lg, 8px);
  }

  .skill-page-section--outlined {
    --section-bg: transparent;
    --section-border: 2px solid var(--skill-neutral-300, #d1d5db);
    --section-shadow: none;
    --section-border-radius: var(--skill-radius-md, 6px);
  }

  .skill-page-section--filled {
    --section-bg: var(--skill-neutral-50, #f9fafb);
    --section-border: none;
    --section-shadow: none;
    --section-border-radius: var(--skill-radius-md, 6px);
  }

  .skill-page-section--gradient {
    --section-bg: linear-gradient(135deg, var(--skill-primary-50, #eff6ff) 0%, var(--skill-secondary-50, #f9fafb) 100%);
    --section-border: none;
    --section-shadow: none;
    --section-border-radius: var(--skill-radius-lg, 8px);
  }

  /* 颜色主题变体 */
  .skill-page-section--primary {
    --section-bg: var(--skill-primary-50, #eff6ff);
    --section-title-color: var(--skill-primary-900, #1e3a8a);
  }

  .skill-page-section--secondary {
    --section-bg: var(--skill-neutral-50, #f9fafb);
    --section-title-color: var(--skill-neutral-900, #111827);
  }

  .skill-page-section--success {
    --section-bg: var(--skill-success-50, #ecfdf5);
    --section-title-color: var(--skill-success-900, #064e3b);
  }

  .skill-page-section--warning {
    --section-bg: var(--skill-warning-50, #fffbeb);
    --section-title-color: var(--skill-warning-900, #78350f);
  }

  .skill-page-section--error {
    --section-bg: var(--skill-error-50, #fef2f2);
    --section-title-color: var(--skill-error-900, #7f1d1d);
  }

  /* 头部 */
  .skill-page-section__header {
    margin-bottom: var(--skill-spacing-md, 16px);
  }

  .skill-page-section__header--center {
    text-align: center;
  }

  .skill-page-section__header--left {
    text-align: left;
  }

  .skill-page-section__header--right {
    text-align: right;
  }

  /* 标题组 */
  .skill-page-section__title-group {
    margin-bottom: var(--skill-spacing-sm, 8px);
  }

  .skill-page-section__title {
    font-size: var(--skill-font-h3, 24px);
    font-weight: 700;
    line-height: 1.2;
    color: var(--section-title-color);
    margin: 0;
    letter-spacing: -0.025em;
  }

  .skill-page-section__subtitle {
    font-size: var(--skill-font-body-1, 16px);
    font-weight: 500;
    color: var(--section-subtitle-color);
    margin: var(--skill-spacing-xs, 4px) 0 0 0;
    line-height: 1.4;
  }

  .skill-page-section__description {
    font-size: var(--skill-font-body-2, 14px);
    color: var(--section-description-color);
    margin: var(--skill-spacing-xs, 4px) 0 0 0;
    line-height: 1.5;
  }

  /* 头部操作区 */
  .skill-page-section__header-actions {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm, 8px);
    margin-top: var(--skill-spacing-md, 16px);
  }

  .skill-page-section__header-actions--left {
    justify-content: flex-start;
  }

  .skill-page-section__header-actions--center {
    justify-content: center;
  }

  .skill-page-section__header-actions--right {
    justify-content: flex-end;
  }

  /* 标签 */
  .skill-page-section__badges {
    display: flex;
    flex-wrap: wrap;
    gap: var(--skill-spacing-xs, 4px);
    margin-top: var(--skill-spacing-xs, 4px);
  }

  /* 分割线 */
  .skill-page-section__divider {
    border: none;
    border-top: var(--section-divider);
    margin: var(--skill-spacing-md, 16px) 0;
  }

  .skill-page-section__divider--dashed {
    border-top-style: dashed;
  }

  .skill-page-section__divider--dotted {
    border-top-style: dotted;
  }

  .skill-page-section__divider--thick {
    border-top-width: 2px;
  }

  /* 内容区域 */
  .skill-page-section__content {
    padding: var(--section-content-padding);
  }

  .skill-page-section__content--center {
    text-align: center;
  }

  .skill-page-section__content--padded {
    padding: var(--skill-spacing-lg, 20px);
  }

  /* 底部 */
  .skill-page-section__footer {
    margin-top: var(--skill-spacing-md, 16px);
  }

  .skill-page-section__footer--center {
    text-align: center;
  }

  .skill-page-section__footer--left {
    text-align: left;
  }

  .skill-page-section__footer--right {
    text-align: right;
  }

  /* 底部操作区 */
  .skill-page-section__footer-actions {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm, 8px);
  }

  .skill-page-section__footer-actions--left {
    justify-content: flex-start;
  }

  .skill-page-section__footer-actions--center {
    justify-content: center;
  }

  .skill-page-section__footer-actions--right {
    justify-content: flex-end;
  }

  .skill-page-section__footer-actions--spaced {
    justify-content: space-between;
  }

  /* 状态变体 */
  .skill-page-section--loading {
    position: relative;
    overflow: hidden;
  }

  .skill-page-section--loading::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: loading-shimmer 2s infinite;
    z-index: 1;
  }

  @keyframes loading-shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }

  .skill-page-section--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  .skill-page-section--error {
    border-color: var(--skill-error-300, #fca5a5);
    background-color: var(--skill-error-50, #fef2f2);
  }

  .skill-page-section--warning {
    border-color: var(--skill-warning-300, #fcd34d);
    background-color: var(--skill-warning-50, #fffbeb);
  }

  /* 可折叠状态 */
  .skill-page-section__collapse-trigger {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
    cursor: pointer;
    user-select: none;
    border: none;
    background: none;
    padding: 0;
    color: inherit;
    font: inherit;
    transition: all 0.2s ease;
  }

  .skill-page-section__collapse-trigger:hover {
    color: var(--skill-primary-600, #2563eb);
  }

  .skill-page-section__collapse-icon {
    transition: transform 0.2s ease;
  }

  .skill-page-section--collapsed .skill-page-section__collapse-icon {
    transform: rotate(-90deg);
  }

  .skill-page-section__content--collapsible {
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .skill-page-section--collapsed .skill-page-section__content--collapsible {
    max-height: 0;
    opacity: 0;
  }

  /* 尺寸变体 */
  .skill-page-section--xs {
    --section-padding: var(--skill-spacing-sm, 8px) var(--skill-spacing-md, 12px);
  }

  .skill-page-section--sm {
    --section-padding: var(--skill-spacing-md, 12px) var(--skill-spacing-lg, 16px);
  }

  .skill-page-section--md {
    --section-padding: var(--skill-spacing-lg, 16px) var(--skill-spacing-xl, 20px);
  }

  .skill-page-section--lg {
    --section-padding: var(--skill-spacing-xl, 20px) var(--skill-spacing-2xl, 24px);
  }

  .skill-page-section--xl {
    --section-padding: var(--skill-spacing-2xl, 24px) var(--skill-spacing-3xl, 32px);
  }

  /* 全宽模式 */
  .skill-page-section--full-width {
    --section-border-radius: 0;
    --section-padding-left: 0;
    --section-padding-right: 0;
  }

  /* 紧凑模式 */
  .skill-page-section--compact .skill-page-section__title {
    font-size: var(--skill-font-h4, 20px);
  }

  .skill-page-section--compact .skill-page-section__subtitle {
    font-size: var(--skill-font-body-2, 14px);
  }

  .skill-page-section--compact .skill-page-section__description {
    font-size: var(--skill-font-body-3, 12px);
  }

  /* 无内边距模式 */
  .skill-page-section--no-padding {
    --section-padding: 0;
  }

  .skill-page-section--no-padding .skill-page-section__header,
  .skill-page-section--no-padding .skill-page-section__content,
  .skill-page-section--no-padding .skill-page-section__footer {
    padding: 0;
  }

  /* 网格布局 */
  .skill-page-section__grid {
    display: grid;
    gap: var(--skill-spacing-md, 16px);
    align-items: start;
  }

  .skill-page-section__grid--2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .skill-page-section__grid--3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .skill-page-section__grid--4 {
    grid-template-columns: repeat(4, 1fr);
  }

  .skill-page-section__grid--auto {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  /* 侧边布局 */
  .skill-page-section__sidebar-layout {
    display: flex;
    gap: var(--skill-spacing-lg, 20px);
    align-items: start;
  }

  .skill-page-section__sidebar {
    flex-shrink: 0;
    width: 200px;
  }

  .skill-page-section__main {
    flex: 1;
    min-width: 0;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    :host {
      --section-padding: var(--skill-spacing-md, 16px) var(--skill-spacing-sm, 12px);
    }

    .skill-page-section__title {
      font-size: var(--skill-font-h4, 20px);
    }

    .skill-page-section__subtitle {
      font-size: var(--skill-font-body-2, 14px);
    }

    .skill-page-section__header-actions,
    .skill-page-section__footer-actions {
      flex-direction: column;
      align-items: stretch;
      gap: var(--skill-spacing-xs, 4px);
    }

    .skill-page-section__grid--2,
    .skill-page-section__grid--3,
    .skill-page-section__grid--4 {
      grid-template-columns: 1fr;
    }

    .skill-page-section__sidebar-layout {
      flex-direction: column;
    }

    .skill-page-section__sidebar {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    :host {
      --section-padding: var(--skill-spacing-sm, 12px) var(--skill-spacing-xs, 8px);
    }

    .skill-page-section__title {
      font-size: var(--skill-font-h5, 18px);
    }
  }

  /* 深色模式支持 */
  @media (prefers-color-scheme: dark) {
    :host {
      --section-bg: var(--skill-neutral-800, #1f2937);
      --section-border: 1px solid var(--skill-neutral-600, #4b5563);
      --section-title-color: var(--skill-text-primary-dark, #f9fafb);
      --section-subtitle-color: var(--skill-text-secondary-dark, #d1d5db);
      --section-description-color: var(--skill-text-tertiary-dark, #9ca3af);
      --section-divider: 1px solid var(--skill-neutral-600, #4b5563);
    }

    .skill-page-section--card {
      --section-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
    }

    .skill-page-section--elevated {
      --section-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    }

    .skill-page-section--filled {
      --section-bg: var(--skill-neutral-900, #111827);
    }

    .skill-page-section--gradient {
      --section-bg: linear-gradient(135deg, var(--skill-primary-900, #1e3a8a) 0%, var(--skill-neutral-900, #111827) 100%);
    }
  }

  /* 高对比度模式 */
  @media (prefers-contrast: high) {
    .skill-page-section {
      border-width: 2px;
    }

    .skill-page-section__title {
      font-weight: 800;
    }

    .skill-page-section__divider {
      border-top-width: 2px;
    }
  }

  /* 减少动画模式 */
  @media (prefers-reduced-motion: reduce) {
    .skill-page-section__collapse-trigger,
    .skill-page-section__collapse-icon,
    .skill-page-section__content--collapsible {
      transition: none;
    }

    .skill-page-section--loading::before {
      animation: none;
    }
  }

  /* 打印样式 */
  @media print {
    .skill-page-section {
      background: white !important;
      box-shadow: none !important;
      border: 1px solid black !important;
      color: black !important;
      page-break-inside: avoid;
    }

    .skill-page-section__header-actions,
    .skill-page-section__footer-actions {
      display: none;
    }
  }

  /* 插槽样式 */
  ::slotted([slot="header-actions"]) {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm, 8px);
  }

  ::slotted([slot="footer-actions"]) {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm, 8px);
  }

  ::slotted([slot="aside"]) {
    margin-left: var(--skill-spacing-lg, 20px);
  }

  ::slotted([slot="badges"]) {
    display: flex;
    flex-wrap: wrap;
    gap: var(--skill-spacing-xs, 4px);
    margin-top: var(--skill-spacing-xs, 4px);
  }

  /* 锚点链接样式 */
  .skill-page-section__anchor {
    position: absolute;
    top: -64px; /* 为固定的导航栏留出空间 */
    left: 0;
    width: 0;
    height: 0;
    visibility: hidden;
  }
`;