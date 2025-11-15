import { css } from 'lit';

/**
 * Validation Summary 验证摘要组件样式
 * 现代化设计，支持多种消息类型、分组显示、响应式布局等功能
 */
export const validationSummaryStyles = css`
  /* ===== Host 元素 ===== */
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-family: var(--skill-font-family);
  }

  /* ===== 主容器 ===== */
  .validation-summary {
    background: var(--validation-summary-bg, var(--skill-gray-0));
    border: 1px solid var(--validation-summary-border, var(--skill-gray-200));
    border-radius: var(--validation-summary-radius, var(--skill-radius-lg));
    overflow: hidden;
    transition: all var(--skill-transition-duration-fast) var(--skill-transition-easing);
    position: relative;
  }

  /* ===== 容器状态样式 ===== */
  .validation-summary--error {
    border-color: var(--skill-error-300);
    background: var(--skill-error-50);
  }

  .validation-summary--warning {
    border-color: var(--skill-warning-300);
    background: var(--skill-warning-50);
  }

  .validation-summary--info {
    border-color: var(--skill-info-300);
    background: var(--skill-info-50);
  }

  .validation-summary--success {
    border-color: var(--skill-success-300);
    background: var(--skill-success-50);
  }

  /* ===== 头部样式 ===== */
  .validation-summary__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--skill-spacing-md) var(--skill-spacing-lg);
    border-bottom: 1px solid var(--skill-gray-100);
    background: var(--skill-gray-50);
    gap: var(--skill-spacing-md);
  }

  .validation-summary__title {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm);
    font-size: var(--skill-font-body-3);
    font-weight: var(--skill-font-weight-semibold);
    color: var(--skill-gray-900);
    margin: 0;
    flex: 1;
    min-width: 0;
  }

  /* ===== 计数徽章 ===== */
  .validation-summary__count {
    background: var(--skill-primary-600);
    color: var(--skill-gray-0);
    font-size: var(--skill-font-body-6);
    font-weight: var(--skill-font-weight-medium);
    padding: 2px 6px;
    border-radius: var(--skill-radius-full);
    min-width: 20px;
    height: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-shrink: 0;
  }

  .validation-summary__count--error {
    background: var(--skill-error-600);
  }

  .validation-summary__count--warning {
    background: var(--skill-warning-600);
  }

  .validation-summary__count--info {
    background: var(--skill-info-600);
  }

  .validation-summary__count--success {
    background: var(--skill-success-600);
  }

  /* ===== 内容区域 ===== */
  .validation-summary__content {
    padding: var(--validation-summary-padding, var(--skill-spacing-md));
    max-height: 300px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--skill-gray-300) var(--skill-gray-100);
  }

  .validation-summary__content::-webkit-scrollbar {
    width: 6px;
  }

  .validation-summary__content::-webkit-scrollbar-track {
    background: var(--skill-gray-100);
  }

  .validation-summary__content::-webkit-scrollbar-thumb {
    background: var(--skill-gray-300);
    border-radius: 3px;
  }

  .validation-summary__content::-webkit-scrollbar-thumb:hover {
    background: var(--skill-gray-400);
  }

  /* ===== 消息项样式 ===== */
  .validation-summary__message {
    display: flex;
    align-items: flex-start;
    gap: var(--skill-spacing-sm);
    padding: var(--skill-spacing-sm);
    margin-bottom: var(--validation-summary-gap, var(--skill-spacing-xs));
    border-radius: var(--skill-radius-md);
    cursor: pointer;
    transition: all var(--skill-transition-duration-fast) var(--skill-transition-easing);
    border: 1px solid transparent;
    position: relative;
  }

  .validation-summary__message:hover {
    background: rgba(255, 255, 255, 0.5);
    border-color: var(--skill-gray-200);
    transform: translateX(2px);
  }

  .validation-summary__message:last-child {
    margin-bottom: 0;
  }

  /* ===== 消息状态样式 ===== */
  .validation-summary__message--error {
    background: rgba(239, 68, 68, 0.1);
    color: var(--skill-error-700);
  }

  .validation-summary__message--error:hover {
    background: rgba(239, 68, 68, 0.15);
  }

  .validation-summary__message--warning {
    background: rgba(245, 158, 11, 0.1);
    color: var(--skill-warning-700);
  }

  .validation-summary__message--warning:hover {
    background: rgba(245, 158, 11, 0.15);
  }

  .validation-summary__message--info {
    background: rgba(59, 130, 246, 0.1);
    color: var(--skill-info-700);
  }

  .validation-summary__message--info:hover {
    background: rgba(59, 130, 246, 0.15);
  }

  .validation-summary__message--success {
    background: rgba(34, 197, 94, 0.1);
    color: var(--skill-success-700);
  }

  .validation-summary__message--success:hover {
    background: rgba(34, 197, 94, 0.15);
  }

  /* ===== 消息图标 ===== */
  .validation-summary__message-icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-top: 2px;
    opacity: 0.8;
  }

  /* ===== 消息内容 ===== */
  .validation-summary__message-content {
    flex: 1;
    min-width: 0;
  }

  .validation-summary__message-field {
    font-weight: var(--skill-font-weight-medium);
    font-size: var(--skill-font-body-4);
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs);
    flex-wrap: wrap;
  }

  .validation-summary__message-text {
    font-size: var(--skill-font-body-4);
    line-height: 1.4;
    word-break: break-word;
  }

  /* ===== 消息关闭按钮 ===== */
  .validation-summary__message-dismiss {
    flex-shrink: 0;
    background: none;
    border: none;
    padding: 2px;
    cursor: pointer;
    color: inherit;
    opacity: 0.6;
    border-radius: var(--skill-radius-sm);
    transition: all var(--skill-transition-duration-fast) var(--skill-transition-easing);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .validation-summary__message-dismiss:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.1);
  }

  .validation-summary__message-dismiss:active {
    transform: scale(0.95);
  }

  /* ===== 空状态样式 ===== */
  .validation-summary__empty-state {
    padding: var(--skill-spacing-xl) var(--skill-spacing-lg);
    text-align: center;
    color: var(--skill-gray-500);
    font-size: var(--skill-font-body-4);
  }

  .validation-summary__empty-state-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto var(--skill-spacing-md);
    opacity: 0.4;
    color: var(--skill-gray-400);
  }

  /* ===== 底部样式 ===== */
  .validation-summary__footer {
    padding: var(--skill-spacing-sm) var(--skill-spacing-lg);
    border-top: 1px solid var(--skill-gray-100);
    background: var(--skill-gray-50);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--skill-spacing-md);
  }

  .validation-summary__actions {
    display: flex;
    gap: var(--skill-spacing-sm);
    align-items: center;
  }

  .validation-summary__summary {
    font-size: var(--skill-font-body-6);
    color: var(--skill-gray-600);
    flex: 1;
  }

  /* ===== 尺寸变体 ===== */

  /* 小尺寸 */
  .validation-summary--sm .validation-summary__message {
    padding: var(--skill-spacing-xs);
  }

  .validation-summary--sm .validation-summary__header {
    padding: var(--skill-spacing-sm) var(--skill-spacing-md);
  }

  .validation-summary--sm .validation-summary__footer {
    padding: var(--skill-spacing-xs) var(--skill-spacing-md);
  }

  /* 大尺寸 */
  .validation-summary--lg .validation-summary__message {
    padding: var(--skill-spacing-md);
  }

  .validation-summary--lg .validation-summary__header {
    padding: var(--skill-spacing-lg) var(--skill-spacing-xl);
  }

  .validation-summary--lg .validation-summary__footer {
    padding: var(--skill-spacing-md) var(--skill-spacing-xl);
  }

  /* ===== 优先级徽章 ===== */
  .validation-summary__priority {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: var(--skill-font-body-6);
    font-weight: var(--skill-font-weight-medium);
    padding: 1px 4px;
    border-radius: var(--skill-radius-sm);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .validation-summary__priority--high {
    background: var(--skill-error-100);
    color: var(--skill-error-700);
  }

  .validation-summary__priority--medium {
    background: var(--skill-warning-100);
    color: var(--skill-warning-700);
  }

  .validation-summary__priority--low {
    background: var(--skill-info-100);
    color: var(--skill-info-700);
  }

  /* ===== 消息动画 ===== */
  .validation-summary__message--dismissing {
    animation: validationMessageSlideOut 0.3s var(--skill-transition-easing) forwards;
  }

  @keyframes validationMessageSlideOut {
    from {
      opacity: 1;
      transform: translateX(0);
      max-height: 100px;
    }
    to {
      opacity: 0;
      transform: translateX(100%);
      max-height: 0;
      padding: 0;
      margin: 0;
    }
  }

  /* ===== 加载状态 ===== */
  .validation-summary--loading {
    pointer-events: none;
    opacity: 0.7;
    position: relative;
  }

  .validation-summary--loading::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--skill-primary-500), transparent);
    animation: validationSummaryLoading 1.5s linear infinite;
    z-index: 1;
  }

  @keyframes validationSummaryLoading {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  /* ===== 可访问性焦点样式 ===== */
  .validation-summary__message:focus {
    outline: 2px solid var(--skill-primary-500);
    outline-offset: 2px;
  }

  .validation-summary__message-dismiss:focus-visible {
    outline: 2px solid var(--skill-primary-500);
    outline-offset: 1px;
  }

  /* ===== 响应式设计 ===== */
  @media (max-width: 768px) {
    .validation-summary__header,
    .validation-summary__content,
    .validation-summary__footer {
      padding-left: var(--skill-spacing-md);
      padding-right: var(--skill-spacing-md);
    }

    .validation-summary__footer {
      flex-direction: column;
      gap: var(--skill-spacing-sm);
      align-items: stretch;
    }

    .validation-summary__actions {
      justify-content: center;
    }

    .validation-summary__message-field {
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
    }

    .validation-summary__title {
      font-size: var(--skill-font-body-4);
    }

    .validation-summary__content {
      max-height: 250px;
    }
  }

  @media (max-width: 480px) {
    .validation-summary__header,
    .validation-summary__content,
    .validation-summary__footer {
      padding-left: var(--skill-spacing-sm);
      padding-right: var(--skill-spacing-sm);
    }

    .validation-summary__message {
      padding: var(--skill-spacing-xs);
    }

    .validation-summary__empty-state {
      padding: var(--skill-spacing-lg) var(--skill-spacing-md);
    }

    .validation-summary__empty-state-icon {
      width: 36px;
      height: 36px;
    }

    .validation-summary__content {
      max-height: 200px;
    }
  }

  /* ===== 高对比度模式支持 ===== */
  @media (prefers-contrast: high) {
    .validation-summary {
      border-width: 2px;
    }

    .validation-summary__message {
      border-width: 1px;
    }

    .validation-summary__message:focus {
      outline-width: 3px;
    }

    .validation-summary__count {
      border: 1px solid currentColor;
    }
  }

  /* ===== 深色模式支持 ===== */
  @media (prefers-color-scheme: dark) {
    .validation-summary {
      background: var(--skill-gray-800);
      border-color: var(--skill-gray-600);
    }

    .validation-summary__header {
      background: var(--skill-gray-900);
      border-color: var(--skill-gray-700);
    }

    .validation-summary__footer {
      background: var(--skill-gray-900);
      border-color: var(--skill-gray-700);
    }

    .validation-summary__title {
      color: var(--skill-gray-100);
    }

    .validation-summary__message:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--skill-gray-500);
    }

    .validation-summary__message--error {
      background: rgba(239, 68, 68, 0.2);
    }

    .validation-summary__message--warning {
      background: rgba(245, 158, 11, 0.2);
    }

    .validation-summary__message--info {
      background: rgba(59, 130, 246, 0.2);
    }

    .validation-summary__message--success {
      background: rgba(34, 197, 94, 0.2);
    }

    .validation-summary__empty-state {
      color: var(--skill-gray-400);
    }

    .validation-summary__summary {
      color: var(--skill-gray-400);
    }

    .validation-summary--error {
      border-color: var(--skill-error-600);
      background: rgba(239, 68, 68, 0.1);
    }

    .validation-summary--warning {
      border-color: var(--skill-warning-600);
      background: rgba(245, 158, 11, 0.1);
    }

    .validation-summary--info {
      border-color: var(--skill-info-600);
      background: rgba(59, 130, 246, 0.1);
    }

    .validation-summary--success {
      border-color: var(--skill-success-600);
      background: rgba(34, 197, 94, 0.1);
    }
  }

  /* ===== 减少动画偏好支持 ===== */
  @media (prefers-reduced-motion: reduce) {
    .validation-summary,
    .validation-summary__message,
    .validation-summary__message-dismiss {
      transition: none;
    }

    .validation-summary__message:hover {
      transform: none;
    }

    .validation-summary__message--dismissing {
      animation: none;
      opacity: 0;
      max-height: 0;
    }

    .validation-summary--loading::after {
      animation: none;
    }
  }

  /* ===== 打印样式 ===== */
  @media print {
    .validation-summary {
      border: 1px solid #000;
      background: #fff !important;
      color: #000 !important;
      break-inside: avoid;
    }

    .validation-summary__message-dismiss {
      display: none;
    }

    .validation-summary--loading::after {
      display: none;
    }

    .validation-summary__content {
      max-height: none;
      overflow: visible;
    }
  }
`;