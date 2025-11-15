import { css } from 'lit';

/**
 * Input Stepper 数字输入步进器组件样式
 * 现代化设计，支持增减按钮、前缀后缀、状态提示等功能
 */
export const inputStepperStyles = css`
  /* ===== Host 元素 ===== */
  :host {
    display: inline-block;
    width: var(--input-stepper-width, 120px);
    font-family: var(--skill-font-family);
  }

  /* ===== 主包装器 ===== */
  .input-stepper-wrapper {
    width: 100%;
  }

  /* ===== 标签样式 ===== */
  .input-stepper__label {
    display: block;
    font-size: var(--skill-font-body-4);
    font-weight: var(--skill-font-weight-medium);
    color: var(--skill-gray-700);
    margin-bottom: var(--skill-spacing-xs);
    line-height: 1.4;
  }

  .input-stepper__label [aria-label="required"] {
    color: var(--skill-error-500);
    margin-left: 2px;
  }

  /* ===== 输入容器 ===== */
  .input-stepper__container {
    display: flex;
    align-items: stretch;
    background: var(--input-stepper-bg, var(--skill-gray-0));
    border: 1px solid var(--input-stepper-border, var(--skill-gray-300));
    border-radius: var(--input-stepper-radius, var(--skill-radius-md));
    overflow: hidden;
    transition: all var(--skill-transition-duration-fast) var(--skill-transition-easing);
    position: relative;
  }

  /* ===== 容器状态样式 ===== */
  .input-stepper__container:hover {
    border-color: var(--skill-primary-400);
  }

  .input-stepper__container:focus-within {
    border-color: var(--skill-primary-500);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .input-stepper__container.error {
    border-color: var(--skill-error-500);
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  .input-stepper__container.success {
    border-color: var(--skill-success-500);
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
  }

  .input-stepper__container.warning {
    border-color: var(--skill-warning-500);
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
  }

  /* ===== 前缀和后缀 ===== */
  .input-stepper__prefix,
  .input-stepper__suffix {
    display: flex;
    align-items: center;
    padding: 0 var(--skill-spacing-sm);
    background: var(--skill-gray-50);
    font-size: var(--skill-font-body-4);
    color: var(--skill-gray-600);
    border: none;
    user-select: none;
    flex-shrink: 0;
  }

  /* ===== 步进按钮 ===== */
  .input-stepper__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    background: var(--input-stepper-button-bg, var(--skill-gray-100));
    border: none;
    cursor: pointer;
    transition: all var(--skill-transition-duration-fast) var(--skill-transition-easing);
    color: var(--skill-gray-600);
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }

  .input-stepper__button:hover:not(:disabled) {
    background: var(--input-stepper-button-hover, var(--skill-primary-100));
    color: var(--skill-primary-600);
    transform: scale(1.05);
  }

  .input-stepper__button:active:not(:disabled) {
    transform: scale(0.95);
  }

  .input-stepper__button:disabled {
    background: var(--skill-gray-50);
    color: var(--skill-gray-300);
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* ===== 按钮边框分隔 ===== */
  .input-stepper__decrement {
    border-right: 1px solid var(--skill-gray-200);
  }

  .input-stepper__increment {
    border-left: 1px solid var(--skill-gray-200);
  }

  /* ===== 数字输入框 ===== */
  .input-stepper__input {
    flex: 1;
    border: none;
    background: transparent;
    text-align: center;
    font-size: var(--skill-font-body-3);
    font-weight: var(--skill-font-weight-medium);
    color: var(--skill-gray-900);
    outline: none;
    padding: 0 var(--skill-spacing-xs);
    min-width: 0;
    font-family: inherit;
    line-height: 1.5;
  }

  /* 隐藏原生数字输入箭头 */
  .input-stepper__input::-webkit-inner-spin-button,
  .input-stepper__input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .input-stepper__input[type="number"] {
    -moz-appearance: textfield;
  }

  .input-stepper__input:disabled {
    background: transparent;
    color: var(--skill-gray-400);
    cursor: not-allowed;
  }

  .input-stepper__input::placeholder {
    color: var(--skill-gray-400);
    text-align: center;
  }

  /* ===== 帮助文本 ===== */
  .input-stepper__helper {
    font-size: var(--skill-font-body-5);
    line-height: 1.4;
    margin-top: var(--skill-spacing-xs);
    color: var(--skill-gray-500);
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs);
  }

  .input-stepper__helper::before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .input-stepper__error {
    color: var(--skill-error-600);
  }

  .input-stepper__error::before {
    background: var(--skill-error-500);
  }

  .input-stepper__success {
    color: var(--skill-success-600);
  }

  .input-stepper__success::before {
    background: var(--skill-success-500);
  }

  .input-stepper__warning {
    color: var(--skill-warning-600);
  }

  .input-stepper__warning::before {
    background: var(--skill-warning-500);
  }

  /* ===== 尺寸变体 ===== */

  /* 小尺寸 */
  .input-stepper--sm .input-stepper__button {
    width: 28px;
  }

  .input-stepper--sm .input-stepper__button svg {
    width: 14px;
    height: 14px;
  }

  .input-stepper--sm .input-stepper__input {
    font-size: var(--skill-font-body-4);
    padding: 0 var(--skill-spacing-xs);
  }

  .input-stepper--sm .input-stepper__prefix,
  .input-stepper--sm .input-stepper__suffix {
    padding: 0 var(--skill-spacing-xs);
    font-size: var(--skill-font-body-5);
  }

  /* 大尺寸 */
  .input-stepper--lg .input-stepper__button {
    width: 36px;
  }

  .input-stepper--lg .input-stepper__button svg {
    width: 18px;
    height: 18px;
  }

  .input-stepper--lg .input-stepper__input {
    font-size: var(--skill-font-body-2);
    padding: 0 var(--skill-spacing-sm);
  }

  .input-stepper--lg .input-stepper__prefix,
  .input-stepper--lg .input-stepper__suffix {
    padding: 0 var(--skill-spacing-md);
    font-size: var(--skill-font-body-3);
  }

  /* ===== 可访问性焦点样式 ===== */
  .input-stepper__button:focus-visible {
    outline: 2px solid var(--skill-primary-500);
    outline-offset: -2px;
  }

  .input-stepper__input:focus-visible {
    outline: none;
  }

  /* ===== 加载状态 ===== */
  .input-stepper--loading .input-stepper__button {
    pointer-events: none;
    opacity: 0.6;
  }

  .input-stepper--loading .input-stepper__input {
    background: repeating-linear-gradient(
      90deg,
      var(--skill-gray-100),
      var(--skill-gray-100) 1px,
      var(--skill-gray-50) 1px,
      var(--skill-gray-50) 10px
    );
    background-size: 10px 100%;
    animation: inputStepperLoading 1s linear infinite;
  }

  /* ===== 动画定义 ===== */
  @keyframes inputStepperLoading {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 10px 0;
    }
  }

  /* ===== 按钮涟漪效果 ===== */
  .input-stepper__button::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
  }

  .input-stepper__button:active::after {
    width: 100%;
    height: 100%;
  }

  /* ===== 高对比度模式支持 ===== */
  @media (prefers-contrast: high) {
    .input-stepper__container {
      border-width: 2px;
    }

    .input-stepper__button:focus-visible {
      outline-width: 3px;
    }

    .input-stepper__container:focus-within {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    }
  }

  /* ===== 深色模式支持 ===== */
  @media (prefers-color-scheme: dark) {
    .input-stepper__container {
      background: var(--skill-gray-800);
      border-color: var(--skill-gray-600);
    }

    .input-stepper__container:hover {
      border-color: var(--skill-primary-400);
    }

    .input-stepper__input {
      color: var(--skill-gray-100);
    }

    .input-stepper__input::placeholder {
      color: var(--skill-gray-500);
    }

    .input-stepper__prefix,
    .input-stepper__suffix {
      background: var(--skill-gray-700);
      color: var(--skill-gray-300);
    }

    .input-stepper__button {
      background: var(--skill-gray-700);
      color: var(--skill-gray-300);
    }

    .input-stepper__button:hover:not(:disabled) {
      background: var(--skill-primary-600);
      color: var(--skill-gray-100);
    }

    .input-stepper__decrement,
    .input-stepper__increment {
      border-color: var(--skill-gray-600);
    }

    .input-stepper--loading .input-stepper__input {
      background: repeating-linear-gradient(
        90deg,
        var(--skill-gray-700),
        var(--skill-gray-700) 1px,
        var(--skill-gray-600) 1px,
        var(--skill-gray-600) 10px
      );
    }
  }

  /* ===== 减少动画偏好支持 ===== */
  @media (prefers-reduced-motion: reduce) {
    .input-stepper__container,
    .input-stepper__button,
    .input-stepper__input {
      transition: none;
    }

    .input-stepper__button:hover {
      transform: none;
    }

    .input-stepper--loading .input-stepper__input {
      animation: none;
    }

    .input-stepper__button::after {
      transition: none;
    }
  }

  /* ===== 响应式设计 ===== */
  @media (max-width: 768px) {
    :host {
      width: var(--input-stepper-width, 100px);
    }

    .input-stepper__button {
      width: 28px;
    }

    .input-stepper__button svg {
      width: 14px;
      height: 14px;
    }

    .input-stepper__input {
      font-size: var(--skill-font-body-4);
    }
  }

  @media (max-width: 480px) {
    .input-stepper__prefix,
    .input-stepper__suffix {
      padding: 0 var(--skill-spacing-xs);
      font-size: var(--skill-font-body-5);
    }

    .input-stepper__helper {
      font-size: var(--skill-font-body-6);
    }
  }

  /* ===== 特殊状态样式 ===== */

  /* 只读状态 */
  :host([readonly]) .input-stepper__container {
    background: var(--skill-gray-50);
    border-color: var(--skill-gray-200);
  }

  :host([readonly]) .input-stepper__button {
    display: none;
  }

  /* 隐藏按钮状态 */
  :host([show-buttons="false"]) .input-stepper__button {
    display: none;
  }

  /* 宽度自动模式 */
  :host([width="auto"]) {
    width: auto;
    min-width: var(--input-stepper-width, 120px);
  }
`;