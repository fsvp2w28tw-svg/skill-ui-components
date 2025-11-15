import { css } from 'lit';

/**
 * FormField 组件样式
 */
export const formFieldStyles = css`
  :host {
    display: block;
    width: 100%;
    --form-field-gap: var(--skill-spacing-sm, 8px);
    --form-field-label-color: var(--skill-text-primary, #1f2937);
    --form-field-error-color: var(--skill-error-600, #dc2626);
    --form-field-success-color: var(--skill-success-600, #16a34a);
    --form-field-warning-color: var(--skill-warning-600, #d97706);
    --form-field-help-color: var(--skill-text-secondary, #6b7280);
    --form-field-bg-focused: var(--skill-primary-50, #eff6ff);
    --form-field-border-focused: var(--skill-primary-500, #3b82f6);
  }

  .skill-form-field {
    display: flex;
    flex-direction: column;
    gap: var(--form-field-gap);
    width: 100%;
    transition: all 0.2s ease;
  }

  /* 标签位置布局 */
  .skill-form-field--label-left {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--skill-spacing-md, 16px);
  }

  .skill-form-field--label-right {
    flex-direction: row-reverse;
    align-items: flex-start;
    gap: var(--skill-spacing-md, 16px);
  }

  .skill-form-field--label-left .skill-form-field__label-container,
  .skill-form-field--label-right .skill-form-field__label-container {
    flex-shrink: 0;
    min-width: 120px;
    padding-top: var(--skill-spacing-xs, 4px);
  }

  /* 尺寸变体 */
  .skill-form-field--xs {
    --form-field-gap: var(--skill-spacing-xs, 4px);
  }

  .skill-form-field--sm {
    --form-field-gap: var(--skill-spacing-xs, 4px);
  }

  .skill-form-field--md {
    --form-field-gap: var(--skill-spacing-sm, 8px);
  }

  .skill-form-field--lg {
    --form-field-gap: var(--skill-spacing-md, 16px);
  }

  .skill-form-field--xl {
    --form-field-gap: var(--skill-spacing-lg, 24px);
  }

  /* 焦点状态 */
  .skill-form-field--focused {
    --form-field-bg: var(--form-field-bg-focused);
  }

  /* 错误状态 */
  .skill-form-field--error {
    --form-field-label-color: var(--form-field-error-color);
  }

  /* 成功状态 */
  .skill-form-field--success {
    --form-field-label-color: var(--form-field-success-color);
  }

  /* 警告状态 */
  .skill-form-field--warning {
    --form-field-label-color: var(--form-field-warning-color);
  }

  /* 禁用状态 */
  .skill-form-field--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  /* 只读状态 */
  .skill-form-field--readonly {
    --form-field-bg: var(--skill-neutral-100, #f3f4f6);
  }

  /* 标签容器 */
  .skill-form-field__label-container {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
    transition: color 0.2s ease;
  }

  .skill-form-field__label-container--required::after {
    content: '*';
    color: var(--form-field-error-color);
    font-weight: 600;
    margin-left: var(--skill-spacing-xs, 4px);
  }

  .skill-form-field__label-container--error {
    color: var(--form-field-error-color);
  }

  /* 输入容器样式调整 */
  ::slotted(skill-input),
  skill-input {
    width: 100%;
    border-radius: var(--skill-radius-md, 6px);
    transition: all 0.2s ease;
  }

  .skill-form-field--focused ::slotted(skill-input),
  .skill-form-field--focused skill-input {
    border-color: var(--form-field-border-focused);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .skill-form-field--error ::slotted(skill-input),
  .skill-form-field--error skill-input {
    border-color: var(--form-field-error-color);
  }

  .skill-form-field--success ::slotted(skill-input),
  .skill-form-field--success skill-input {
    border-color: var(--form-field-success-color);
  }

  .skill-form-field--warning ::slotted(skill-input),
  .skill-form-field--warning skill-input {
    border-color: var(--form-field-warning-color);
  }

  /* 帮助信息容器 */
  .skill-form-field__helper-container {
    display: flex;
    align-items: flex-start;
    gap: var(--skill-spacing-xs, 4px);
    min-height: 20px;
  }

  /* 状态图标 */
  .skill-form-field__status-icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-top: 2px;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.2s ease;
  }

  .skill-form-field--error .skill-form-field__status-icon--error,
  .skill-form-field--success .skill-form-field__status-icon--success {
    opacity: 1;
    transform: scale(1);
  }

  .skill-form-field__status-icon--error {
    color: var(--form-field-error-color);
  }

  .skill-form-field__status-icon--success {
    color: var(--form-field-success-color);
  }

  /* 错误信息 */
  .skill-form-field__error {
    color: var(--form-field-error-color);
    font-size: var(--skill-font-body-3, 12px);
    line-height: 1.4;
    font-weight: 500;
    display: flex;
    align-items: flex-start;
    gap: var(--skill-spacing-xs, 4px);
  }

  /* 帮助文本 */
  .skill-form-field__help {
    color: var(--form-field-help-color);
    font-size: var(--skill-font-body-3, 12px);
    line-height: 1.4;
    font-weight: 400;
  }

  /* 额外内容 */
  ::slotted([slot="extra"]) {
    margin-left: auto;
    color: var(--form-field-help-color);
    font-size: var(--skill-font-body-3, 12px);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .skill-form-field--label-left,
    .skill-form-field--label-right {
      flex-direction: column;
      gap: var(--skill-spacing-sm, 8px);
    }

    .skill-form-field--label-left .skill-form-field__label-container,
    .skill-form-field--label-right .skill-form-field__label-container {
      min-width: auto;
      padding-top: 0;
    }
  }

  /* 深色模式支持 */
  @media (prefers-color-scheme: dark) {
    :host {
      --form-field-label-color: var(--skill-text-primary-dark, #f9fafb);
      --form-field-help-color: var(--skill-text-secondary-dark, #d1d5db);
      --form-field-bg-focused: rgba(59, 130, 246, 0.1);
    }
  }

  /* 高对比度模式 */
  @media (prefers-contrast: high) {
    .skill-form-field__status-icon {
      opacity: 1;
    }

    .skill-form-field__error {
      font-weight: 600;
    }

    .skill-form-field__help {
      font-weight: 500;
    }
  }

  /* 减少动画模式 */
  @media (prefers-reduced-motion: reduce) {
    .skill-form-field,
    .skill-form-field__label-container,
    ::slotted(skill-input),
    skill-input,
    .skill-form-field__status-icon {
      transition: none;
    }
  }

  /* 焦点可见性增强 */
  .skill-form-field:focus-within {
    outline: 2px solid var(--skill-primary-500, #3b82f6);
    outline-offset: 2px;
    border-radius: var(--skill-radius-md, 6px);
  }

  /* 错误状态的焦点指示器 */
  .skill-form-field--error:focus-within {
    outline-color: var(--form-field-error-color);
  }

  /* 成功状态的焦点指示器 */
  .skill-form-field--success:focus-within {
    outline-color: var(--form-field-success-color);
  }
`;