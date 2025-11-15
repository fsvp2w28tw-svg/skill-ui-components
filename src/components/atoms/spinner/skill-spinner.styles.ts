import { css } from 'lit';

/**
 * Skill Spinner 组件样式
 * 从原 React 项目的 Spinner 组件迁移
 */
export const spinnerStyles = css`
  /* ===== 容器样式 ===== */
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .skill-spinner-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  /* ===== Spinner 变体 ===== */

  /* 圆形旋转加载器 */
  .skill-spinner--spinner {
    border-radius: 9999px;
    border-style: solid;
    border-color: currentColor;
    border-top-color: transparent;
    animation: skill-spin 0.8s linear infinite;
  }

  /* xs 尺寸 */
  .skill-spinner--spinner.skill-spinner--xs {
    width: 0.75rem;
    height: 0.75rem;
    border-width: 1px;
  }

  .skill-spinner--spinner.skill-spinner--sm {
    width: 1rem;
    height: 1rem;
    border-width: 1.5px;
  }

  .skill-spinner--spinner.skill-spinner--md {
    width: 1.25rem;
    height: 1.25rem;
    border-width: 2px;
  }

  .skill-spinner--spinner.skill-spinner--lg {
    width: 1.5rem;
    height: 1.5rem;
    border-width: 2px;
  }

  .skill-spinner--spinner.skill-spinner--xl {
    width: 2rem;
    height: 2rem;
    border-width: 3px;
  }

  /* ===== Dots 变体 ===== */
  .skill-spinner--dots {
    display: flex;
    gap: 0.25rem;
  }

  .skill-spinner--dots.skill-spinner--sm {
    gap: 0.25rem;
  }

  .skill-spinner--dots.skill-spinner--md {
    gap: 0.375rem;
  }

  .skill-spinner--dots.skill-spinner--lg {
    gap: 0.5rem;
  }

  .skill-spinner--dots.skill-spinner--xl {
    gap: 0.625rem;
  }

  .skill-spinner__dot {
    border-radius: 9999px;
    background: currentColor;
    animation: skill-pulse 1.4s ease-in-out infinite both;
  }

  .skill-spinner--xs .skill-spinner__dot {
    width: 0.25rem;
    height: 0.25rem;
  }

  .skill-spinner--sm .skill-spinner__dot {
    width: 0.375rem;
    height: 0.375rem;
  }

  .skill-spinner--md .skill-spinner__dot {
    width: 0.5rem;
    height: 0.5rem;
  }

  .skill-spinner--lg .skill-spinner__dot {
    width: 0.625rem;
    height: 0.625rem;
  }

  .skill-spinner--xl .skill-spinner__dot {
    width: 0.75rem;
    height: 0.75rem;
  }

  .skill-spinner__dot:nth-child(1) {
    animation-delay: 0s;
  }

  .skill-spinner__dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .skill-spinner__dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  /* ===== Pulse 变体 ===== */
  .skill-spinner--pulse {
    border-radius: 9999px;
    background: currentColor;
    animation: skill-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  .skill-spinner--pulse.skill-spinner--xs {
    width: 0.75rem;
    height: 0.75rem;
  }

  .skill-spinner--pulse.skill-spinner--sm {
    width: 1rem;
    height: 1rem;
  }

  .skill-spinner--pulse.skill-spinner--md {
    width: 1.25rem;
    height: 1.25rem;
  }

  .skill-spinner--pulse.skill-spinner--lg {
    width: 1.5rem;
    height: 1.5rem;
  }

  .skill-spinner--pulse.skill-spinner--xl {
    width: 2rem;
    height: 2rem;
  }

  /* ===== Bars 变体 ===== */
  .skill-spinner--bars {
    display: flex;
    align-items: flex-end;
    gap: 0.25rem;
  }

  .skill-spinner--bars.skill-spinner--sm {
    gap: 0.25rem;
  }

  .skill-spinner--bars.skill-spinner--md {
    gap: 0.375rem;
  }

  .skill-spinner--bars.skill-spinner--lg {
    gap: 0.5rem;
  }

  .skill-spinner--bars.skill-spinner--xl {
    gap: 0.625rem;
  }

  .skill-spinner__bar {
    border-radius: 9999px;
    background: currentColor;
    animation: skill-pulse 1.2s ease-in-out infinite both;
  }

  .skill-spinner--xs .skill-spinner__bar {
    width: 0.125rem;
  }

  .skill-spinner--sm .skill-spinner__bar {
    width: 0.25rem;
  }

  .skill-spinner--md .skill-spinner__bar {
    width: 0.25rem;
  }

  .skill-spinner--lg .skill-spinner__bar {
    width: 0.375rem;
  }

  .skill-spinner--xl .skill-spinner__bar {
    width: 0.5rem;
  }

  .skill-spinner__bar:nth-child(1) {
    animation-delay: 0s;
    height: 0.5rem;
  }

  .skill-spinner__bar:nth-child(2) {
    animation-delay: 0.15s;
    height: 0.75rem;
  }

  .skill-spinner__bar:nth-child(3) {
    animation-delay: 0.3s;
    height: 1rem;
  }

  .skill-spinner__bar:nth-child(4) {
    animation-delay: 0.45s;
    height: 0.625rem;
  }

  /* 尺寸调整 */
  .skill-spinner--xs .skill-spinner__bar:nth-child(1) { height: 0.375rem; }
  .skill-spinner--xs .skill-spinner__bar:nth-child(2) { height: 0.5rem; }
  .skill-spinner--xs .skill-spinner__bar:nth-child(3) { height: 0.625rem; }
  .skill-spinner--xs .skill-spinner__bar:nth-child(4) { height: 0.5rem; }

  .skill-spinner--sm .skill-spinner__bar:nth-child(1) { height: 0.5rem; }
  .skill-spinner--sm .skill-spinner__bar:nth-child(2) { height: 0.625rem; }
  .skill-spinner--sm .skill-spinner__bar:nth-child(3) { height: 0.75rem; }
  .skill-spinner--sm .skill-spinner__bar:nth-child(4) { height: 0.625rem; }

  .skill-spinner--lg .skill-spinner__bar:nth-child(1) { height: 0.75rem; }
  .skill-spinner--lg .skill-spinner__bar:nth-child(2) { height: 1rem; }
  .skill-spinner--lg .skill-spinner__bar:nth-child(3) { height: 1.25rem; }
  .skill-spinner--lg .skill-spinner__bar:nth-child(4) { height: 1rem; }

  .skill-spinner--xl .skill-spinner__bar:nth-child(1) { height: 1rem; }
  .skill-spinner--xl .skill-spinner__bar:nth-child(2) { height: 1.25rem; }
  .skill-spinner--xl .skill-spinner__bar:nth-child(3) { height: 1.5rem; }
  .skill-spinner--xl .skill-spinner__bar:nth-child(4) { height: 1.25rem; }

  /* ===== 颜色变体 ===== */
  .skill-spinner--primary {
    color: var(--skill-primary-500, #3b82f6);
  }

  .skill-spinner--secondary {
    color: var(--skill-secondary-500, #64748b);
  }

  .skill-spinner--success {
    color: var(--skill-success-500, #22c55e);
  }

  .skill-spinner--warning {
    color: var(--skill-warning-500, #f59e0b);
  }

  .skill-spinner--error {
    color: var(--skill-error-500, #ef4444);
  }

  .skill-spinner--neutral {
    color: var(--skill-gray-500, #6b7280);
  }

  /* ===== Label 样式 ===== */
  .skill-spinner__label {
    font-size: var(--skill-text-sm, 0.875rem);
    color: var(--skill-gray-600, #4b5563);
  }

  /* ===== 动画 ===== */
  @keyframes skill-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes skill-pulse {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes skill-ping {
    75%, 100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
