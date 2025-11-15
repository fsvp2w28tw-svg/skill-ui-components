import { css } from 'lit';

export const formBuilderStyles = css`
  :host {
    display: block;
    width: 100%;
  }

  .form-builder {
    width: 100%;
  }

  .form-section {
    margin-bottom: var(--spacing-lg);
  }

  .form-section:last-child {
    margin-bottom: 0;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid var(--color-border);
  }

  .section-title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin: 0;
  }

  .section-description {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    margin: var(--spacing-xs) 0 0 0;
  }

  .section-toggle {
    background: none;
    border: none;
    padding: var(--spacing-xs);
    cursor: pointer;
    color: var(--color-text-secondary);
    transition: var(--transition-colors);
  }

  .section-toggle:hover {
    color: var(--color-text-primary);
  }

  .section-toggle.collapsed {
    transform: rotate(-90deg);
  }

  .section-content {
    transition: var(--transition-opacity);
  }

  .section-content.collapsed {
    display: none;
  }

  .form-fields {
    display: grid;
    gap: var(--spacing-md);
  }

  /* 布局网格 */
  .form-fields.columns-1 {
    grid-template-columns: 1fr;
  }

  .form-fields.columns-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .form-fields.columns-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .form-fields.columns-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  /* 字段宽度 */
  .field-width-full {
    grid-column: 1 / -1;
  }

  .field-width-half {
    grid-column: span 2;
  }

  .field-width-third {
    grid-column: span 1;
  }

  .field-width-quarter {
    grid-column: span 1;
  }

  .form-field {
    position: relative;
  }

  .field-label {
    display: block;
    margin-bottom: var(--spacing-xs);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
  }

  .field-required {
    color: var(--color-danger);
    margin-left: var(--spacing-xs);
  }

  .field-description {
    margin-top: var(--spacing-xs);
    font-size: var(--font-size-xs);
    color: var(--color-text-tertiary);
  }

  .field-error {
    margin-top: var(--spacing-xs);
    font-size: var(--font-size-xs);
    color: var(--color-danger);
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .field-horizontal {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .field-horizontal .field-label {
    margin-bottom: 0;
    flex-shrink: 0;
    width: 120px;
  }

  /* 复选框和开关的特殊布局 */
  .field-checkbox,
  .field-switch {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .field-checkbox .field-label,
  .field-switch .field-label {
    margin-bottom: 0;
  }

  /* 单选按钮组 */
  .radio-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .radio-horizontal {
    flex-direction: row;
    flex-wrap: wrap;
  }

  /* 表单操作区 */
  .form-actions {
    display: flex;
    gap: var(--spacing-md);
    justify-content: flex-end;
    margin-top: var(--spacing-lg);
    padding-top: var(--spacing-lg);
    border-top: 1px solid var(--color-border);
  }

  .form-actions.center {
    justify-content: center;
  }

  .form-actions.start {
    justify-content: flex-start;
  }

  /* 间距模式 */
  .spacing-compact .form-fields {
    gap: var(--spacing-sm);
  }

  .spacing-normal .form-fields {
    gap: var(--spacing-md);
  }

  .spacing-loose .form-fields {
    gap: var(--spacing-lg);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .form-fields.columns-2,
    .form-fields.columns-3,
    .form-fields.columns-4 {
      grid-template-columns: 1fr;
    }

    .field-width-half,
    .field-width-third,
    .field-width-quarter {
      grid-column: 1;
    }

    .field-horizontal {
      flex-direction: column;
      align-items: flex-start;
    }

    .field-horizontal .field-label {
      width: 100%;
      margin-bottom: var(--spacing-xs);
    }

    .form-actions {
      flex-direction: column;
    }

    .radio-horizontal {
      flex-direction: column;
    }
  }

  /* 加载状态 */
  .form-loading {
    position: relative;
    pointer-events: none;
    opacity: 0.6;
  }

  .form-loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border: 2px solid var(--color-border);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  /* 禁用状态 */
  .form-field.disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  /* 隐藏字段 */
  .form-field.hidden {
    display: none;
  }

  /* 依赖字段动画 */
  .form-field {
    transition: var(--transition-opacity);
  }

  .form-field.dependency-transition {
    transition: all 0.3s ease-in-out;
  }
`;