import { css } from 'lit';

/**
 * Rating 组件样式
 */
export const ratingStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    gap: var(--rating-gap, var(--skill-spacing-xs, 4px));
    --rating-star-size: 16px;
    --rating-star-color: var(--skill-warning-400, #fbbf24);
    --rating-star-bg-color: var(--skill-neutral-200, #e5e7eb);
    --rating-star-hover-color: var(--skill-warning-500, #f59e0b);
  }

  .skill-rating {
    display: inline-flex;
    align-items: center;
    gap: var(--rating-gap, var(--skill-spacing-xs, 4px));
    font-family: var(--skill-font-family, inherit);
  }

  /* 星星容器 */
  .skill-rating__stars {
    display: flex;
    align-items: center;
    gap: var(--rating-gap, var(--skill-spacing-xs, 4px));
  }

  /* 单个星星 */
  .skill-rating__star {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--rating-star-size);
    height: var(--rating-star-size);
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--rating-star-bg-color);
    user-select: none;
  }

  .skill-rating__star:hover {
    transform: scale(1.1);
  }

  .skill-rating__star--active {
    color: var(--rating-star-color);
  }

  .skill-rating__star--readonly {
    cursor: default;
  }

  .skill-rating__star--readonly:hover {
    transform: none;
  }

  .skill-rating__star--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .skill-rating__star--disabled:hover {
    transform: none;
  }

  /* 半星支持 */
  .skill-rating__star-half {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .skill-rating__star-half--filled {
    color: var(--rating-star-color);
  }

  /* 星星图标 */
  .skill-rating__star-icon {
    width: 100%;
    height: 100%;
    transition: all 0.2s ease;
    fill: currentColor;
  }

  .skill-rating__star-icon--filled {
    fill: var(--rating-star-color);
  }

  .skill-rating__star-icon--empty {
    fill: var(--rating-star-bg-color);
  }

  .skill-rating__star-icon--half {
    fill: var(--rating-star-color);
  }

  /* 悬停效果 */
  .skill-rating__star:hover .skill-rating__star-icon--empty {
    fill: var(--rating-star-hover-color);
  }

  /* 尺寸变体 */
  .skill-rating--xs {
    --rating-star-size: 12px;
    --rating-gap: 2px;
  }

  .skill-rating--sm {
    --rating-star-size: 14px;
    --rating-gap: 3px;
  }

  .skill-rating--md {
    --rating-star-size: 16px;
    --rating-gap: 4px;
  }

  .skill-rating--lg {
    --rating-star-size: 20px;
    --rating-gap: 6px;
  }

  .skill-rating--xl {
    --rating-star-size: 24px;
    --rating-gap: 8px;
  }

  /* 颜色主题 */
  .skill-rating--primary {
    --rating-star-color: var(--skill-primary-500, #3b82f6);
    --rating-star-hover-color: var(--skill-primary-600, #2563eb);
  }

  .skill-rating--secondary {
    --rating-star-color: var(--skill-secondary-500, #6b7280);
    --rating-star-hover-color: var(--skill-secondary-600, #4b5563);
  }

  .skill-rating--success {
    --rating-star-color: var(--skill-success-500, #10b981);
    --rating-star-hover-color: var(--skill-success-600, #059669);
  }

  .skill-rating--warning {
    --rating-star-color: var(--skill-warning-500, #f59e0b);
    --rating-star-hover-color: var(--skill-warning-600, #d97706);
  }

  .skill-rating--error {
    --rating-star-color: var(--skill-error-500, #ef4444);
    --rating-star-hover-color: var(--skill-error-600, #dc2626);
  }

  .skill-rating--default {
    --rating-star-color: var(--skill-warning-400, #fbbf24);
    --rating-star-hover-color: var(--skill-warning-500, #f59e0b);
  }

  /* 值显示容器 */
  .skill-rating__value-container {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
    margin-left: var(--skill-spacing-sm, 8px);
  }

  /* 分值显示 */
  .skill-rating__value {
    font-size: var(--skill-font-body-2, 14px);
    font-weight: 600;
    color: var(--skill-text-primary, #1f2937);
    line-height: 1;
  }

  /* 文本描述 */
  .skill-rating__text {
    font-size: var(--skill-font-body-3, 12px);
    color: var(--skill-text-secondary, #6b7280);
    line-height: 1;
  }

  /* 输入框 */
  .skill-rating__input {
    width: 60px;
    padding: var(--skill-spacing-xs, 4px);
    border: 1px solid var(--skill-neutral-300, #d1d5db);
    border-radius: var(--skill-radius-sm, 4px);
    font-size: var(--skill-font-body-3, 12px);
    text-align: center;
    transition: all 0.2s ease;
  }

  .skill-rating__input:focus {
    outline: none;
    border-color: var(--skill-primary-500, #3b82f6);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  .skill-rating__input:disabled {
    background-color: var(--skill-neutral-100, #f3f4f6);
    color: var(--skill-neutral-400, #9ca3af);
    cursor: not-allowed;
  }

  /* 额外内容 */
  ::slotted([slot="extra"]) {
    font-size: var(--skill-font-body-3, 12px);
    color: var(--skill-text-secondary, #6b7280);
  }

  /* 自定义图标插槽 */
  ::slotted([slot="icon"]) {
    width: var(--rating-star-size);
    height: var(--rating-star-size);
    fill: currentColor;
    transition: all 0.2s ease;
  }

  /* 只读状态样式 */
  .skill-rating--readonly .skill-rating__star {
    cursor: default;
  }

  .skill-rating--readonly .skill-rating__star:hover {
    transform: none;
  }

  .skill-rating--readonly .skill-rating__value-container {
    margin-left: var(--skill-spacing-sm, 8px);
  }

  /* 禁用状态样式 */
  .skill-rating--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    :host {
      --rating-star-size: 18px;
      --rating-gap: 3px;
    }

    .skill-rating--xs {
      --rating-star-size: 14px;
    }

    .skill-rating--sm {
      --rating-star-size: 16px;
    }

    .skill-rating--lg {
      --rating-star-size: 22px;
    }

    .skill-rating--xl {
      --rating-star-size: 26px;
    }
  }

  /* 深色模式支持 */
  @media (prefers-color-scheme: dark) {
    :host {
      --rating-star-bg-color: var(--skill-neutral-600, #4b5563);
      --rating-star-hover-color: var(--skill-warning-400, #fbbf24);
    }

    .skill-rating__value {
      color: var(--skill-text-primary-dark, #f9fafb);
    }

    .skill-rating__text {
      color: var(--skill-text-secondary-dark, #d1d5db);
    }

    .skill-rating__input {
      background-color: var(--skill-neutral-800, #1f2937);
      border-color: var(--skill-neutral-600, #4b5563);
      color: var(--skill-text-primary-dark, #f9fafb);
    }

    .skill-rating__input:focus {
      border-color: var(--skill-primary-400, #60a5fa);
    }

    .skill-rating__input:disabled {
      background-color: var(--skill-neutral-700, #374151);
      color: var(--skill-neutral-500, #6b7280);
    }
  }

  /* 高对比度模式 */
  @media (prefers-contrast: high) {
    .skill-rating__star {
      stroke: currentColor;
      stroke-width: 0.5;
    }

    .skill-rating__value {
      font-weight: 700;
    }

    .skill-rating__input {
      border-width: 2px;
    }
  }

  /* 减少动画模式 */
  @media (prefers-reduced-motion: reduce) {
    .skill-rating__star,
    .skill-rating__star-icon,
    .skill-rating__input {
      transition: none;
    }

    .skill-rating__star:hover {
      transform: none;
    }
  }

  /* 键盘导航支持 */
  .skill-rating:focus-within {
    outline: 2px solid var(--skill-primary-500, #3b82f6);
    outline-offset: 2px;
    border-radius: var(--skill-radius-sm, 4px);
  }

  /* 打印样式 */
  @media print {
    .skill-rating__star {
      color: var(--rating-star-color) !important;
    }

    .skill-rating__value-container {
      color: black !important;
    }
  }
`;