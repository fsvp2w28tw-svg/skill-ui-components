import { css } from 'lit';

/**
 * InputGroup 组件样式
 */
export const inputGroupStyles = css`
  :host {
    display: inline-flex;
    width: 100%;
    --input-group-gap: var(--skill-spacing-xs, 4px);
    --input-group-bg: var(--skill-surface-0, #ffffff);
    --input-group-border: var(--skill-gray-300, #d1d5db);
    --input-group-border-focus: var(--skill-primary-500, #3b82f6);
    --input-group-border-error: var(--skill-error-500, #ef4444);
    --input-group-text: var(--skill-gray-600, #4b5563);
    --input-group-text-disabled: var(--skill-gray-400, #9ca3af);
    --input-group-radius: var(--skill-radius-md, 6px);
    --input-group-transition: all 0.2s ease;
  }

  .input-group {
    display: flex;
    align-items: stretch;
    width: 100%;
    position: relative;
    transition: var(--input-group-transition);
  }

  /* 变体样式 */
  .input-group--compact {
    gap: var(--input-group-gap);
  }

  /* 前缀和后缀容器 */
  .input-group__prefix,
  .input-group__suffix {
    display: flex;
    align-items: center;
    padding: 0 var(--skill-spacing-md);
    background-color: var(--input-group-bg);
    border: 1px solid var(--input-group-border);
    color: var(--input-group-text);
    font-size: var(--skill-font-size-md, 14px);
    font-weight: var(--skill-font-weight-normal, 400);
    white-space: nowrap;
    user-select: none;
    transition: var(--input-group-transition);
  }

  /* 紧凑模式的前后缀 */
  .input-group--compact .input-group__prefix,
  .input-group--compact .input-group__suffix {
    padding: 0 var(--skill-spacing-sm);
    font-size: var(--skill-font-size-sm, 12px);
    background-color: transparent;
    border: none;
  }

  /* 前缀样式 */
  .input-group__prefix {
    border-right: none;
    border-top-left-radius: var(--input-group-radius);
    border-bottom-left-radius: var(--input-group-radius);
  }

  /* 后缀样式 */
  .input-group__suffix {
    border-left: none;
    border-top-right-radius: var(--input-group-radius);
    border-bottom-right-radius: var(--input-group-radius);
  }

  /* 不同插槽状态的样式调整 */
  .input-group--prefix-only ::slotted(skill-input),
  .input-group--prefix-only ::slotted(skill-textarea),
  .input-group--prefix-only ::slotted(skill-select) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none;
  }

  .input-group--suffix-only ::slotted(skill-input),
  .input-group--suffix-only ::slotted(skill-textarea),
  .input-group--suffix-only ::slotted(skill-select) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
  }

  .input-group--both ::slotted(skill-input),
  .input-group--both ::slotted(skill-textarea),
  .input-group--both ::slotted(skill-select) {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }

  /* 紧凑变体样式 */
  .input-group--compact ::slotted(skill-input),
  .input-group--compact ::slotted(skill-textarea),
  .input-group--compact ::slotted(skill-select) {
    border-radius: var(--input-group-radius);
  }

  /* 焦点状态 */
  .input-group:focus-within .input-group__prefix,
  .input-group:focus-within .input-group__suffix {
    border-color: var(--input-group-border-focus);
    z-index: 1;
  }

  .input-group:focus-within .input-group__prefix {
    box-shadow: 1px 0 0 1px var(--input-group-border-focus);
  }

  .input-group:focus-within .input-group__suffix {
    box-shadow: -1px 0 0 1px var(--input-group-border-focus);
  }

  /* 错误状态 */
  .input-group--error .input-group__prefix,
  .input-group--error .input-group__suffix {
    border-color: var(--input-group-border-error);
    color: var(--input-group-border-error);
  }

  .input-group--error:focus-within .input-group__prefix {
    box-shadow: 1px 0 0 1px var(--input-group-border-error);
  }

  .input-group--error:focus-within .input-group__suffix {
    box-shadow: -1px 0 0 1px var(--input-group-border-error);
  }

  /* 禁用状态 */
  .input-group--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  .input-group--disabled .input-group__prefix,
  .input-group--disabled .input-group__suffix {
    background-color: var(--skill-gray-100, #f3f4f6);
    color: var(--input-group-text-disabled);
  }

  /* 尺寸变体 */
  .input-group--sm .input-group__prefix,
  .input-group--sm .input-group__suffix {
    padding: 0 var(--skill-spacing-sm);
    font-size: var(--skill-font-size-sm, 12px);
  }

  .input-group--lg .input-group__prefix,
  .input-group--lg .input-group__suffix {
    padding: 0 var(--skill-spacing-lg);
    font-size: var(--skill-font-size-lg, 16px);
  }

  /* 表单控件样式 */
  ::slotted(skill-input),
  ::slotted(skill-textarea),
  ::slotted(skill-select) {
    flex: 1;
    min-width: 0;
    transition: var(--input-group-transition);
  }

  /* 按钮样式调整 */
  ::slotted(skill-button) {
    border-radius: 0;
    height: auto;
  }

  .input-group--prefix-only ::slotted(skill-button) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .input-group--suffix-only ::slotted(skill-button) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .input-group--both ::slotted(skill-button) {
    border-radius: 0;
  }

  /* 紧凑模式按钮样式 */
  .input-group--compact ::slotted(skill-button) {
    border-radius: var(--input-group-radius);
  }

  /* 前后缀内图标样式 */
  .input-group__prefix skill-icon,
  .input-group__suffix skill-icon {
    color: inherit;
    font-size: 1em;
  }

  /* 前后缀文本内容样式 */
  .input-group__prefix-text,
  .input-group__suffix-text {
    font-weight: inherit;
    font-size: inherit;
    color: inherit;
  }

  /* 加载状态 */
  .input-group--loading .input-group__suffix {
    padding: 0 var(--skill-spacing-sm);
  }

  .input-group--loading skill-spinner {
    margin: 0 auto;
  }

  /* 成功状态 */
  .input-group--success .input-group__prefix,
  .input-group--success .input-group__suffix {
    border-color: var(--skill-success-500, #10b981);
    color: var(--skill-success-500, #10b981);
  }

  .input-group--success:focus-within .input-group__prefix {
    box-shadow: 1px 0 0 1px var(--skill-success-500, #10b981);
  }

  .input-group--success:focus-within .input-group__suffix {
    box-shadow: -1px 0 0 1px var(--skill-success-500, #10b981);
  }

  /* 警告状态 */
  .input-group--warning .input-group__prefix,
  .input-group--warning .input-group__suffix {
    border-color: var(--skill-warning-500, #f59e0b);
    color: var(--skill-warning-500, #f59e0b);
  }

  .input-group--warning:focus-within .input-group__prefix {
    box-shadow: 1px 0 0 1px var(--skill-warning-500, #f59e0b);
  }

  .input-group--warning:focus-within .input-group__suffix {
    box-shadow: -1px 0 0 1px var(--skill-warning-500, #f59e0b);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .input-group__prefix,
    .input-group__suffix {
      padding: 0 var(--skill-spacing-sm);
      font-size: var(--skill-font-size-sm, 12px);
    }

    .input-group--sm .input-group__prefix,
    .input-group--sm .input-group__suffix {
      padding: 0 var(--skill-spacing-xs);
    }

    .input-group--lg .input-group__prefix,
    .input-group--lg .input-group__suffix {
      padding: 0 var(--skill-spacing-md);
    }
  }

  /* 超小屏幕 */
  @media (max-width: 480px) {
    .input-group {
      flex-direction: column;
      align-items: stretch;
    }

    .input-group--compact {
      gap: var(--skill-spacing-xs);
    }

    .input-group__prefix,
    .input-group__suffix {
      border-radius: var(--input-group-radius);
      border: 1px solid var(--input-group-border);
      padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
      text-align: center;
    }

    .input-group__prefix {
      border-right: 1px solid var(--input-group-border);
      border-bottom: none;
      border-top-left-radius: var(--input-group-radius);
      border-top-right-radius: var(--input-group-radius);
    }

    .input-group__suffix {
      border-left: 1px solid var(--input-group-border);
      border-top: none;
      border-bottom-left-radius: var(--input-group-radius);
      border-bottom-right-radius: var(--input-group-radius);
    }

    .input-group--prefix-only ::slotted(skill-input),
    .input-group--prefix-only ::slotted(skill-textarea),
    .input-group--prefix-only ::slotted(skill-select),
    .input-group--suffix-only ::slotted(skill-input),
    .input-group--suffix-only ::slotted(skill-textarea),
    .input-group--suffix-only ::slotted(skill-select),
    .input-group--both ::slotted(skill-input),
    .input-group--both ::slotted(skill-textarea),
    .input-group--both ::slotted(skill-select) {
      border-radius: var(--input-group-radius);
      border: 1px solid var(--input-group-border);
    }

    ::slotted(skill-button) {
      border-radius: var(--input-group-radius);
    }
  }

  /* 深色模式支持 */
  @media (prefers-color-scheme: dark) {
    :host {
      --input-group-bg: var(--skill-surface-200, #374151);
      --input-group-border: var(--skill-gray-600, #4b5563);
      --input-group-text: var(--skill-gray-300, #d1d5db);
      --input-group-text-disabled: var(--skill-gray-500, #6b7280);
    }

    .input-group--disabled .input-group__prefix,
    .input-group--disabled .input-group__suffix {
      background-color: var(--skill-gray-800, #1f2937);
    }
  }

  /* 高对比度模式 */
  @media (prefers-contrast: high) {
    .input-group__prefix,
    .input-group__suffix {
      border-width: 2px;
      font-weight: var(--skill-font-weight-medium, 500);
    }

    .input-group:focus-within .input-group__prefix {
      box-shadow: 1px 0 0 2px var(--input-group-border-focus);
    }

    .input-group:focus-within .input-group__suffix {
      box-shadow: -1px 0 0 2px var(--input-group-border-focus);
    }

    .input-group--error:focus-within .input-group__prefix {
      box-shadow: 1px 0 0 2px var(--input-group-border-error);
    }

    .input-group--error:focus-within .input-group__suffix {
      box-shadow: -1px 0 0 2px var(--input-group-border-error);
    }
  }

  /* 减少动画模式 */
  @media (prefers-reduced-motion: reduce) {
    .input-group,
    .input-group__prefix,
    .input-group__suffix,
    ::slotted(skill-input),
    ::slotted(skill-textarea),
    ::slotted(skill-select),
    ::slotted(skill-button) {
      transition: none;
    }
  }

  /* 打印样式 */
  @media print {
    .input-group__prefix,
    .input-group__suffix {
      background: transparent;
      border-color: #000;
      color: #000;
    }

    .input-group--disabled {
      opacity: 1;
    }
  }

  /* 可访问性增强 */
  .input-group:focus-within {
    outline: 2px solid var(--input-group-border-focus);
    outline-offset: 2px;
    border-radius: var(--input-group-radius);
  }

  .input-group--error:focus-within {
    outline-color: var(--input-group-border-error);
  }

  /* 高对比度焦点指示器 */
  @media (prefers-contrast: high) {
    .input-group:focus-within {
      outline-width: 3px;
    }
  }

  /* 触摸设备优化 */
  @media (hover: none) and (pointer: coarse) {
    .input-group__prefix,
    .input-group__suffix {
      min-height: 44px;
      padding: 0 var(--skill-spacing-lg);
    }
  }
`;