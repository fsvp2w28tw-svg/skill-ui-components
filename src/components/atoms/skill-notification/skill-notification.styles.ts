import { css } from 'lit';

export const notificationStyles = css`
  :host {
    display: block;
  }

  .skill-notification {
    display: flex;
    align-items: flex-start;
    gap: var(--notification-gap, var(--skill-spacing-sm, 12px));
    padding: var(--notification-padding, var(--skill-spacing-md, 16px));
    border-radius: var(--notification-radius, var(--skill-radius-md, 6px));
    transition: all var(--notification-duration, var(--skill-duration-fast, 200ms)) var(--notification-ease, var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1)));
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }

  /* Size variants */
  .skill-notification--sm {
    --notification-padding: var(--skill-spacing-sm, 12px);
    --notification-gap: var(--skill-spacing-xs, 8px);
    font-size: var(--skill-font-size-caption, 10px);
  }

  .skill-notification--md {
    --notification-padding: var(--skill-spacing-md, 16px);
    --notification-gap: var(--skill-spacing-sm, 12px);
    font-size: var(--skill-font-size-body-3, 12px);
  }

  .skill-notification--lg {
    --notification-padding: var(--skill-spacing-lg, 20px);
    --notification-gap: var(--skill-spacing-md, 16px);
    font-size: var(--skill-font-size-body-2, 14px);
  }

  /* Type colors */
  .skill-notification--success {
    --notification-bg: var(--skill-success-50, #f0fdf4);
    --notification-color: var(--skill-success-800, #166534);
    --notification-border: var(--skill-success-200, #bbf7d0);
    --notification-icon-color: var(--skill-success-600, #16a34a);
  }

  .skill-notification--error {
    --notification-bg: var(--skill-error-50, #fef2f2);
    --notification-color: var(--skill-error-800, #991b1b);
    --notification-border: var(--skill-error-200, #fecaca);
    --notification-icon-color: var(--skill-error-600, #dc2626);
  }

  .skill-notification--warning {
    --notification-bg: var(--skill-warning-50, #fffbeb);
    --notification-color: var(--skill-warning-800, #92400e);
    --notification-border: var(--skill-warning-200, #fed7aa);
    --notification-icon-color: var(--skill-warning-600, #d97706);
  }

  .skill-notification--info {
    --notification-bg: var(--skill-info-50, #eff6ff);
    --notification-color: var(--skill-info-800, #1e40af);
    --notification-border: var(--skill-info-200, #bfdbfe);
    --notification-icon-color: var(--skill-info-600, #2563eb);
  }

  .skill-notification--default,
  .skill-notification--neutral {
    --notification-bg: var(--skill-gray-50, #f9fafb);
    --notification-color: var(--skill-gray-800, #1f2937);
    --notification-border: var(--skill-gray-200, #e5e7eb);
    --notification-icon-color: var(--skill-gray-600, #4b5563);
  }

  /* Variant styles */
  .skill-notification--alert {
    background: var(--notification-bg);
    color: var(--notification-color);
    border: 1px solid var(--notification-border);
  }

  .skill-notification--toast {
    background: var(--notification-bg);
    color: var(--notification-color);
    border: 1px solid var(--notification-border);
    box-shadow: var(--skill-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05));
    position: fixed;
    z-index: var(--notification-z-index, 1000);
    min-width: 300px;
    max-width: 500px;
  }

  .skill-notification--bar {
    background: var(--notification-bg);
    color: var(--notification-color);
    border: 1px solid var(--notification-border);
    width: 100%;
    border-radius: 0;
  }

  .skill-notification--bar::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--notification-icon-color);
  }

  /* Icon styles */
  .skill-notification__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: var(--notification-icon-color);
  }

  .skill-notification--sm .skill-notification__icon {
    width: 16px;
    height: 16px;
  }

  .skill-notification--lg .skill-notification__icon {
    width: 24px;
    height: 24px;
  }

  /* Content styles */
  .skill-notification__content {
    flex: 1;
    min-width: 0;
  }

  .skill-notification__title {
    font-weight: var(--notification-title-weight, var(--skill-font-weight-semibold, 600));
    margin-bottom: var(--skill-spacing-xs, 4px);
    line-height: 1.4;
  }

  .skill-notification__message {
    line-height: 1.5;
    color: var(--notification-message-color, var(--notification-color));
  }

  .skill-notification__message--expandable {
    position: relative;
  }

  .skill-notification__expand-toggle {
    background: none;
    border: none;
    color: var(--notification-icon-color);
    cursor: pointer;
    font-size: inherit;
    padding: 0;
    margin-top: var(--skill-spacing-xs, 4px);
    text-decoration: underline;
  }

  .skill-notification__expand-toggle:hover {
    opacity: 0.8;
  }

  /* Actions styles */
  .skill-notification__actions {
    display: flex;
    gap: var(--skill-spacing-xs, 8px);
    align-items: center;
    flex-shrink: 0;
  }

  /* Close button styles */
  .skill-notification__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: none;
    background: none;
    color: var(--notification-close-color, var(--notification-color));
    cursor: pointer;
    border-radius: var(--skill-radius-full, 9999px);
    opacity: 0.6;
    transition: all var(--skill-duration-fast, 200ms);
    flex-shrink: 0;
  }

  .skill-notification__close:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.05);
  }

  .skill-notification__close:focus {
    outline: 2px solid var(--notification-icon-color);
    outline-offset: 2px;
  }

  .skill-notification--sm .skill-notification__close {
    width: 16px;
    height: 16px;
  }

  .skill-notification--lg .skill-notification__close {
    width: 24px;
    height: 24px;
  }

  /* Progress bar styles */
  .skill-notification__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--skill-gray-200, #e5e7eb);
    overflow: hidden;
  }

  .skill-notification__progress-bar {
    height: 100%;
    background: var(--notification-icon-color);
    transition: width linear;
  }

  /* Positioning for toast variant */
  .skill-notification--toast[position="top-left"] {
    top: 20px;
    left: 20px;
    right: auto;
    bottom: auto;
  }

  .skill-notification--toast[position="top-right"] {
    top: 20px;
    right: 20px;
    left: auto;
    bottom: auto;
  }

  .skill-notification--toast[position="top-center"] {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    right: auto;
    bottom: auto;
  }

  .skill-notification--toast[position="bottom-left"] {
    bottom: 20px;
    left: 20px;
    right: auto;
    top: auto;
  }

  .skill-notification--toast[position="bottom-right"] {
    bottom: 20px;
    right: 20px;
    left: auto;
    top: auto;
  }

  .skill-notification--toast[position="bottom-center"] {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    right: auto;
    top: auto;
  }

  .skill-notification--toast[position="center"] {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    right: auto;
    bottom: auto;
  }

  /* Interactive states */
  .skill-notification[clickable] {
    cursor: pointer;
  }

  .skill-notification[clickable]:hover {
    transform: translateY(-1px);
    box-shadow: var(--skill-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04));
  }

  /* Animations */
  @keyframes notificationSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes notificationSlideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  .skill-notification {
    animation: notificationSlideIn 0.3s ease-out;
  }

  .skill-notification[visible="false"] {
    animation: notificationSlideOut 0.3s ease-out forwards;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .skill-notification--toast {
      min-width: auto;
      left: 16px !important;
      right: 16px !important;
      transform: none !important;
      width: calc(100% - 32px);
    }

    .skill-notification--toast[position="top-center"],
    .skill-notification--toast[position="bottom-center"],
    .skill-notification--toast[position="center"] {
      transform: none !important;
      left: 16px;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .skill-notification {
      border-width: 2px;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .skill-notification,
    .skill-notification__progress-bar {
      transition: none;
      animation: none;
    }
  }
`;