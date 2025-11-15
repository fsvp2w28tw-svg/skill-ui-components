import { css } from 'lit';

/**
 * FormFieldGroup 组件样式
 */
export const formFieldGroupStyles = css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
    --form-field-gap: var(--skill-spacing-md, 16px);
    --form-field-bg: var(--skill-surface-0, #ffffff);
    --form-field-border: var(--skill-gray-200, #e5e7eb);
    --form-field-radius: var(--skill-radius-lg, 8px);
    --form-field-padding: var(--skill-spacing-lg, 24px);
    --form-field-header-bg: var(--skill-surface-50, #f9fafb);
    --form-field-title-color: var(--skill-gray-900, #111827);
    --form-field-description-color: var(--skill-gray-600, #4b5563);
    --form-field-error-color: var(--skill-error-600, #dc2626);
    --form-field-error-bg: var(--skill-error-50, #fef2f2);
    --form-field-error-border: var(--skill-error-200, #fecaca);
    --form-field-required-color: var(--skill-error-500, #ef4444);
    --form-field-transition: all 0.2s ease;
  }

  .form-field-group {
    background: var(--form-field-bg);
    border: 1px solid var(--form-field-border);
    border-radius: var(--form-field-radius);
    overflow: hidden;
    transition: var(--form-field-transition);
  }

  /* 视觉变体 */
  .form-field-group--outlined {
    border: 2px solid var(--form-field-border);
    background: var(--form-field-bg);
  }

  .form-field-group--filled {
    background: var(--skill-gray-50, #f9fafb);
    border: 1px solid var(--form-field-border);
  }

  .form-field-group--ghost {
    background: transparent;
    border: none;
    padding: 0;
  }

  /* 尺寸变体 */
  .form-field-group--compact {
    --form-field-gap: var(--skill-spacing-sm, 12px);
    --form-field-padding: var(--skill-spacing-md, 16px);
  }

  .form-field-group--spacious {
    --form-field-gap: var(--skill-spacing-xl, 32px);
    --form-field-padding: var(--skill-spacing-xl, 32px);
  }

  /* 头部样式 */
  .form-field-group__header {
    padding: var(--skill-spacing-lg) var(--skill-spacing-lg) var(--skill-spacing-md);
    border-bottom: 1px solid var(--skill-gray-100, #f3f4f6);
    background: var(--form-field-header-bg);
  }

  .form-field-group--ghost .form-field-group__header {
    background: transparent;
    border-bottom: none;
  }

  .form-field-group__title {
    font-size: var(--skill-text-lg, 18px);
    font-weight: var(--skill-font-semibold, 600);
    color: var(--form-field-title-color);
    margin: 0 0 var(--skill-spacing-sm) 0;
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm);
    line-height: 1.3;
  }

  .form-field-group__description {
    font-size: var(--skill-text-sm, 14px);
    color: var(--form-field-description-color);
    line-height: 1.5;
    margin: 0;
  }

  /* 内容区域 */
  .form-field-group__content {
    padding: var(--form-field-padding);
    display: flex;
    flex-direction: column;
    gap: var(--form-field-gap);
  }

  .form-field-group--ghost .form-field-group__content {
    padding: 0;
  }

  /* 底部区域 */
  .form-field-group__footer {
    padding: var(--skill-spacing-md) var(--skill-spacing-lg) var(--skill-spacing-lg);
    border-top: 1px solid var(--skill-gray-100);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--form-field-header-bg);
  }

  .form-field-group--ghost .form-field-group__footer {
    background: transparent;
    border-top: none;
    padding-top: 0;
  }

  .form-field-group__actions {
    display: flex;
    gap: var(--skill-spacing-sm);
    align-items: center;
  }

  /* 错误状态 */
  .form-field-group__error {
    color: var(--form-field-error-color);
    font-size: var(--skill-text-sm, 14px);
    padding: var(--skill-spacing-sm) var(--skill-spacing-lg);
    background: var(--form-field-error-bg);
    border-top: 1px solid var(--form-field-error-border);
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs);
  }

  .form-field-group__required {
    color: var(--form-field-required-color);
    font-weight: var(--skill-font-medium, 500);
    font-size: var(--skill-text-sm, 14px);
  }

  /* 可折叠状态 */
  .form-field-group__header--collapsible {
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease;
  }

  .form-field-group__header--collapsible:hover {
    background: var(--skill-gray-50, #f9fafb);
  }

  .form-field-group__collapse-icon {
    transition: transform 0.2s ease;
    color: var(--form-field-description-color);
  }

  .form-field-group--collapsed .form-field-group__collapse-icon {
    transform: rotate(-90deg);
  }

  /* 禁用状态 */
  .form-field-group--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  /* 只读状态 */
  .form-field-group--readonly {
    --form-field-bg: var(--skill-gray-50, #f9fafb);
    --form-field-border: var(--skill-gray-300, #d1d5db);
  }

  /* 错误状态的整体样式 */
  .form-field-group--has-error {
    --form-field-border: var(--form-field-error-border);
  }

  .form-field-group--has-error.form-field-group--outlined {
    --form-field-border: var(--form-field-error-color);
  }

  /* 表单字段样式调整 */
  ::slotted(skill-input),
  ::slotted(skill-select),
  ::slotted(skill-textarea),
  ::slotted(skill-checkbox),
  ::slotted(skill-radio),
  ::slotted(skill-switch) {
    transition: var(--form-field-transition);
  }

  /* 焦点状态增强 */
  .form-field-group:focus-within {
    --form-field-border: var(--skill-primary-300, #93c5fd);
  }

  .form-field-group--outlined:focus-within {
    --form-field-border: var(--skill-primary-500, #3b82f6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .form-field-group__header,
    .form-field-group__content,
    .form-field-group__footer {
      padding-left: var(--skill-spacing-md);
      padding-right: var(--skill-spacing-md);
    }

    .form-field-group__footer {
      flex-direction: column;
      gap: var(--skill-spacing-md);
      align-items: stretch;
    }

    .form-field-group__actions {
      justify-content: center;
    }

    .form-field-group__title {
      font-size: var(--skill-text-base, 16px);
    }

    .form-field-group--compact .form-field-group__header,
    .form-field-group--compact .form-field-group__content,
    .form-field-group--compact .form-field-group__footer {
      padding-left: var(--skill-spacing-sm);
      padding-right: var(--skill-spacing-sm);
    }

    .form-field-group--spacious .form-field-group__header,
    .form-field-group--spacious .form-field-group__content,
    .form-field-group--spacious .form-field-group__footer {
      padding-left: var(--skill-spacing-md);
      padding-right: var(--skill-spacing-md);
    }
  }

  /* 超小屏幕优化 */
  @media (max-width: 480px) {
    .form-field-group__header {
      padding: var(--skill-spacing-md);
    }

    .form-field-group__content {
      padding: var(--skill-spacing-md);
      gap: var(--skill-spacing-sm);
    }

    .form-field-group__footer {
      padding: var(--skill-spacing-sm) var(--skill-spacing-md);
    }
  }

  /* 深色模式支持 */
  @media (prefers-color-scheme: dark) {
    :host {
      --form-field-bg: var(--skill-surface-0-dark, #1f2937);
      --form-field-border: var(--skill-gray-700, #374151);
      --form-field-header-bg: var(--skill-surface-100-dark, #374151);
      --form-field-title-color: var(--skill-gray-100, #f3f4f6);
      --form-field-description-color: var(--skill-gray-400, #9ca3af);
      --form-field-error-bg: var(--skill-error-900, #7f1d1d);
      --form-field-error-border: var(--skill-error-700, #b91c1c);
    }

    .form-field-group__header {
      border-bottom-color: var(--skill-gray-700, #374151);
    }

    .form-field-group__footer {
      border-top-color: var(--skill-gray-700, #374151);
    }

    .form-field-group--filled {
      background: var(--skill-surface-100-dark, #374151);
    }

    .form-field-group__header--collapsible:hover {
      background: var(--skill-surface-200-dark, #4b5563);
    }
  }

  /* 高对比度模式 */
  @media (prefers-contrast: high) {
    .form-field-group {
      border-width: 2px;
    }

    .form-field-group--outlined {
      border-width: 3px;
    }

    .form-field-group__title {
      font-weight: var(--skill-font-bold, 700);
    }

    .form-field-group__required {
      font-weight: var(--skill-font-bold, 700);
    }

    .form-field-group__error {
      font-weight: var(--skill-font-semibold, 600);
      border-width: 2px;
    }
  }

  /* 减少动画模式 */
  @media (prefers-reduced-motion: reduce) {
    .form-field-group,
    .form-field-group__header,
    .form-field-group__collapse-icon,
    ::slotted(skill-input),
    ::slotted(skill-select),
    ::slotted(skill-textarea) {
      transition: none;
    }
  }

  /* 打印样式 */
  @media print {
    .form-field-group {
      border: 1px solid #000;
      background: transparent;
      box-shadow: none;
      break-inside: avoid;
    }

    .form-field-group__header,
    .form-field-group__footer {
      background: transparent;
    }

    .form-field-group__actions {
      display: none;
    }
  }

  /* 可访问性增强 */
  .form-field-group:focus-within {
    outline: 2px solid var(--skill-primary-500, #3b82f6);
    outline-offset: 2px;
  }

  .form-field-group--has-error:focus-within {
    outline-color: var(--form-field-error-color);
  }

  /* 键盘导航支持 */
  .form-field-group__header--collapsible:focus-visible {
    outline: 2px solid var(--skill-primary-500, #3b82f6);
    outline-offset: 2px;
    border-radius: var(--form-field-radius);
  }
`;