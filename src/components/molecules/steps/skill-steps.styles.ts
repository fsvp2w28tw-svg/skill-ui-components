import { css } from 'lit';

export const stepsStyles = css`
  :host {
    display: block;
  }

  .skill-steps {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .skill-steps--horizontal {
    flex-direction: column;
  }

  .skill-steps--vertical {
    flex-direction: row;
  }

  .skill-steps__list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: var(--steps-gap, var(--skill-spacing-lg, 20px));
  }

  .skill-steps--horizontal .skill-steps__list {
    flex-direction: row;
    align-items: flex-start;
  }

  .skill-steps--vertical .skill-steps__list {
    flex-direction: column;
    align-items: stretch;
  }

  .skill-steps__item {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .skill-steps--vertical .skill-steps__item {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--steps-gap, var(--skill-spacing-md, 16px));
  }

  .skill-steps__step {
    display: flex;
    align-items: center;
    position: relative;
    outline: none;
    transition: all var(--skill-duration-fast, 200ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  .skill-steps--horizontal .skill-steps__step {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--skill-spacing-xs, 8px);
  }

  .skill-steps--vertical .skill-steps__step {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: var(--skill-spacing-xs, 8px);
  }

  /* Clickable steps */
  .skill-steps__step[data-clickable="true"] {
    cursor: pointer;
  }

  .skill-steps__step[data-clickable="true"]:hover .skill-steps__icon {
    transform: scale(1.1);
  }

  .skill-steps__step:focus-visible {
    outline: 2px solid var(--skill-primary-500, #0A59F7);
    outline-offset: 4px;
    border-radius: var(--skill-radius-full, 9999px);
  }

  .skill-steps__step[data-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  /* Step icons */
  .skill-steps__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--step-icon-size, 32px);
    height: var(--step-icon-size, 32px);
    border-radius: var(--skill-radius-full, 9999px);
    font-size: var(--step-icon-font-size, var(--skill-font-size-body-2, 14px));
    font-weight: var(--step-icon-font-weight, var(--skill-font-weight-semibold, 600));
    line-height: 1;
    transition: all var(--skill-duration-fast, 200ms);
    position: relative;
    z-index: 2;
  }

  .skill-steps__icon svg {
    width: 1em;
    height: 1em;
  }

  /* Wait status */
  .skill-steps__item--wait .skill-steps__icon {
    background: var(--step-wait-bg, var(--skill-gray-100, #F3F4F6));
    color: var(--step-wait-color, var(--skill-gray-500, #6B7280));
    border: 2px solid var(--step-wait-border-color, var(--skill-gray-300, #D1D5DB));
  }

  /* Process status */
  .skill-steps__item--process .skill-steps__icon {
    background: var(--step-process-bg, var(--skill-primary-500, #0A59F7));
    color: var(--skill-white, #FFFFFF);
    border: 2px solid var(--step-process-border-color, var(--skill-primary-500, #0A59F7));
    box-shadow: var(--step-process-shadow, 0 0 0 4px rgba(10, 89, 247, 0.1));
  }

  /* Finish status */
  .skill-steps__item--finish .skill-steps__icon {
    background: var(--step-finish-bg, var(--skill-success-500, #00D4AA));
    color: var(--skill-white, #FFFFFF);
    border: 2px solid var(--step-finish-border-color, var(--skill-success-500, #00D4AA));
  }

  /* Error status */
  .skill-steps__item--error .skill-steps__icon {
    background: var(--step-error-bg, var(--skill-error-500, #FA2A2D));
    color: var(--skill-white, #FFFFFF);
    border: 2px solid var(--step-error-border-color, var(--skill-error-500, #FA2A2D));
    animation: step-error-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes step-error-pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(250, 42, 45, 0.4);
    }
    50% {
      box-shadow: 0 0 0 8px rgba(250, 42, 45, 0);
    }
  }

  /* Connector lines */
  .skill-steps__line {
    position: absolute;
    background: var(--step-line-color, var(--skill-gray-300, #D1D5DB));
    z-index: 1;
  }

  .skill-steps--horizontal .skill-steps__line {
    top: calc(var(--step-icon-size, 32px) / 2);
    left: calc(var(--step-icon-size, 32px) + var(--steps-gap, var(--skill-spacing-lg, 20px)));
    width: calc(100% - var(--step-icon-size, 32px) - var(--steps-gap, var(--skill-spacing-lg, 20px)));
    height: var(--step-line-width, 2px);
    transform: translateY(-50%);
  }

  .skill-steps--vertical .skill-steps__line {
    top: calc(var(--step-icon-size, 32px) + var(--steps-gap, var(--skill-spacing-md, 16px)));
    left: calc(var(--step-icon-size, 32px) / 2);
    width: var(--step-line-width, 2px);
    height: calc(100% - var(--step-icon-size, 32px) - var(--steps-gap, var(--skill-spacing-md, 16px)));
    transform: translateX(-50%);
  }

  /* Completed connector lines */
  .skill-steps__item--finish .skill-steps__line {
    background: var(--step-line-finish-color, var(--skill-success-500, #00D4AA));
  }

  /* Step content */
  .skill-steps__content {
    display: flex;
    flex-direction: column;
    gap: var(--skill-spacing-2xs, 4px);
  }

  .skill-steps--horizontal .skill-steps__content {
    align-items: center;
    text-align: center;
  }

  .skill-steps--vertical .skill-steps__content {
    align-items: flex-start;
    text-align: left;
    flex: 1;
  }

  .skill-steps__title {
    font-size: var(--step-font-size, var(--skill-font-size-body-2, 14px));
    font-weight: var(--step-title-font-weight, var(--skill-font-weight-medium, 500));
    color: var(--step-title-color, var(--skill-gray-700, #374151));
    line-height: 1.4;
  }

  .skill-steps__description {
    font-size: var(--step-description-font-size, var(--skill-font-size-body-3, 12px));
    font-weight: var(--step-description-font-weight, var(--skill-font-weight-normal, 400));
    color: var(--step-description-color, var(--skill-gray-500, #6B7280));
    line-height: 1.4;
  }

  /* Status-specific content colors */
  .skill-steps__item--process .skill-steps__title {
    color: var(--step-process-title-color, var(--skill-primary-700, #1D4ED8));
    font-weight: var(--step-process-title-font-weight, var(--skill-font-weight-semibold, 600));
  }

  .skill-steps__item--finish .skill-steps__title {
    color: var(--step-finish-title-color, var(--skill-success-700, #15803D));
    font-weight: var(--step-finish-title-font-weight, var(--skill-font-weight-semibold, 600));
  }

  .skill-steps__item--error .skill-steps__title {
    color: var(--step-error-title-color, var(--skill-error-700, #B91C1C));
    font-weight: var(--step-error-title-font-weight, var(--skill-font-weight-semibold, 600));
  }

  .skill-steps__item--wait .skill-steps__title {
    color: var(--step-wait-title-color, var(--skill-gray-500, #6B7280));
  }

  /* Size variants */
  :host([size='xs']) .skill-steps__icon {
    --step-icon-size: 20px;
    --step-icon-font-size: 10px;
  }

  :host([size='sm']) .skill-steps__icon {
    --step-icon-size: 24px;
    --step-icon-font-size: 12px;
  }

  :host([size='md']) .skill-steps__icon {
    --step-icon-size: 32px;
    --step-icon-font-size: var(--skill-font-size-body-2, 14px);
  }

  :host([size='lg']) .skill-steps__icon {
    --step-icon-size: 40px;
    --step-icon-font-size: var(--skill-font-size-body-1, 16px);
  }

  :host([size='xl']) .skill-steps__icon {
    --step-icon-size: 48px;
    --step-icon-font-size: var(--skill-font-size-h4, 18px);
  }

  /* Adjust content size for different step sizes */
  :host([size='xs']) .skill-steps__title {
    --step-font-size: 10px;
  }

  :host([size='sm']) .skill-steps__title {
    --step-font-size: var(--skill-font-size-body-3, 12px);
  }

  :host([size='lg']) .skill-steps__title {
    --step-font-size: var(--skill-font-size-body-1, 16px);
  }

  :host([size='xl']) .skill-steps__title {
    --step-font-size: var(--skill-font-size-h4, 18px);
  }

  :host([size='xs']) .skill-steps__description {
    --step-description-font-size: 9px;
  }

  :host([size='lg']) .skill-steps__description {
    --step-description-font-size: var(--skill-font-size-body-2, 14px);
  }

  :host([size='xl']) .skill-steps__description {
    --step-description-font-size: var(--skill-font-size-body-1, 16px);
  }

  /* Color variants */
  :host([color='secondary']) .skill-steps__item--process .skill-steps__icon {
    --step-process-bg: var(--skill-secondary-500, #00D4AA);
    --step-process-border-color: var(--skill-secondary-500, #00D4AA);
    --step-process-shadow: 0 0 0 4px rgba(0, 212, 170, 0.1);
  }

  :host([color='secondary']) .skill-steps__item--process .skill-steps__title {
    --step-process-title-color: var(--skill-secondary-700, #0F766E);
  }

  :host([color='success']) .skill-steps__item--process .skill-steps__icon {
    --step-process-bg: var(--skill-success-500, #00D4AA);
    --step-process-border-color: var(--skill-success-500, #00D4AA);
    --step-process-shadow: 0 0 0 4px rgba(0, 212, 170, 0.1);
  }

  :host([color='success']) .skill-steps__item--process .skill-steps__title {
    --step-process-title-color: var(--skill-success-700, #15803D);
  }

  :host([color='warning']) .skill-steps__item--process .skill-steps__icon {
    --step-process-bg: var(--skill-warning-500, #FFB400);
    --step-process-border-color: var(--skill-warning-500, #FFB400);
    --step-process-shadow: 0 0 0 4px rgba(255, 180, 0, 0.1);
  }

  :host([color='warning']) .skill-steps__item--process .skill-steps__title {
    --step-process-title-color: var(--skill-warning-700, #A16207);
  }

  :host([color='error']) .skill-steps__item--process .skill-steps__icon {
    --step-process-bg: var(--skill-error-500, #FA2A2D);
    --step-process-border-color: var(--skill-error-500, #FA2A2D);
    --step-process-shadow: 0 0 0 4px rgba(250, 42, 45, 0.1);
  }

  :host([color='error']) .skill-steps__item--process .skill-steps__title {
    --step-process-title-color: var(--skill-error-700, #B91C1C);
  }

  :host([color='info']) .skill-steps__item--process .skill-steps__icon {
    --step-process-bg: var(--skill-info-500, #0A59F7);
    --step-process-border-color: var(--skill-info-500, #0A59F7);
    --step-process-shadow: 0 0 0 4px rgba(10, 89, 247, 0.1);
  }

  :host([color='info']) .skill-steps__item--process .skill-steps__title {
    --step-process-title-color: var(--skill-info-700, #0369A1);
  }

  :host([color='gray']) .skill-steps__item--process .skill-steps__icon {
    --step-process-bg: var(--skill-gray-500, #6B7280);
    --step-process-border-color: var(--skill-gray-500, #6B7280);
    --step-process-shadow: 0 0 0 4px rgba(107, 114, 128, 0.1);
  }

  :host([color='gray']) .skill-steps__item--process .skill-steps__title {
    --step-process-title-color: var(--skill-gray-700, #374151);
  }

  /* Hide lines on last item */
  .skill-steps__item:last-child .skill-steps__line {
    display: none;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .skill-steps {
      --steps-gap: var(--skill-spacing-md, 16px);
    }

    .skill-steps__list {
      flex-direction: column;
    }

    .skill-steps__step {
      flex-direction: row;
      align-items: flex-start;
      text-align: left;
      gap: var(--skill-spacing-sm, 12px);
    }

    .skill-steps__line {
      top: calc(var(--step-icon-size, 32px) + var(--skill-spacing-sm, 12px));
      left: calc(var(--step-icon-size, 32px) / 2);
      width: var(--step-line-width, 2px);
      height: calc(100% - var(--step-icon-size, 32px) - var(--skill-spacing-sm, 12px));
      transform: translateX(-50%);
    }

    .skill-steps__content {
      align-items: flex-start;
      text-align: left;
    }

    .skill-steps__icon {
      flex-shrink: 0;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .skill-steps__icon {
      border-width: 3px;
      font-weight: var(--skill-font-weight-bold, 700);
    }

    .skill-steps__title {
      font-weight: var(--skill-font-weight-semibold, 600);
    }

    .skill-steps__line {
      height: 3px;
      width: 3px;
    }

    .skill-steps__step:focus-visible {
      outline-width: 3px;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .skill-steps__icon,
    .skill-steps__step,
    .skill-steps__item--error .skill-steps__icon {
      transition: none;
      animation: none;
    }

    .skill-steps__item--error .skill-steps__icon {
      animation: none;
    }
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .skill-steps__item--wait .skill-steps__icon {
      --step-wait-bg: var(--skill-gray-700, #374151);
      --step-wait-color: var(--skill-gray-300, #D1D5DB);
      --step-wait-border-color: var(--skill-gray-600, #4B5563);
    }

    .skill-steps__title {
      --step-title-color: var(--skill-gray-200, #E5E7EB);
    }

    .skill-steps__description {
      --step-description-color: var(--skill-gray-400, #9CA3AF);
    }

    .skill-steps__item--wait .skill-steps__title {
      --step-wait-title-color: var(--skill-gray-400, #9CA3AF);
    }

    .skill-steps__line {
      --step-line-color: var(--skill-gray-600, #4B5563);
    }
  }

  /* Loading animation for process state */
  .skill-steps__item--process .skill-steps__icon::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: var(--skill-radius-full, 9999px);
    border: 2px solid transparent;
    border-top-color: rgba(255, 255, 255, 0.3);
    animation: step-loading-spin 1s linear infinite;
  }

  @keyframes step-loading-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Print styles */
  @media print {
    .skill-steps__icon {
      border: 2px solid #000 !important;
      background: #FFF !important;
      color: #000 !important;
    }

    .skill-steps__item--process .skill-steps__icon::before {
      display: none;
    }

    .skill-steps__line {
      background: #000 !important;
      height: 2px;
    }

    .skill-steps__title {
      color: #000 !important;
    }

    .skill-steps__description {
      color: #666 !important;
    }
  }

  /* Accessibility enhancements */
  .skill-steps[role="stepper"]::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Progress percentage display */
  .skill-steps__percentage {
    position: absolute;
    top: 0;
    right: 0;
    font-size: var(--skill-font-size-caption, 10px);
    color: var(--skill-gray-500, #6B7280);
    font-weight: var(--skill-font-weight-medium, 500);
  }

  /* Compact mode */
  :host([compact]) .skill-steps__content {
    display: none;
  }

  :host([compact]) .skill-steps__icon {
    --step-icon-size: 24px;
  }

  :host([compact]) .skill-steps--horizontal .skill-steps__step {
    gap: var(--skill-spacing-2xs, 4px);
  }

  :host([compact]) .skill-steps--vertical .skill-steps__step {
    gap: var(--skill-spacing-2xs, 4px);
  }

  /* Mini mode */
  :host([mini]) .skill-steps__icon {
    --step-icon-size: 16px;
    --step-icon-font-size: 8px;
  }

  :host([mini]) .skill-steps__line {
    --step-line-width: 1px;
  }

  /* Interaction states */
  .skill-steps__step[data-clickable="true"]:active .skill-steps__icon {
    transform: scale(0.95);
  }

  /* Tooltips */
  .skill-steps__step[title]:hover::after {
    content: attr(title);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--skill-gray-900, #111827);
    color: var(--skill-white, #FFFFFF);
    padding: 4px 8px;
    border-radius: var(--skill-radius-sm, 4px);
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000;
    pointer-events: none;
    margin-bottom: 4px;
  }

  /* Icon-only mode */
  :host([icon-only]) .skill-steps__content {
    display: none;
  }

  :host([icon-only]) .skill-steps__step {
    gap: 0;
  }

  /* Number display enhancement */
  .skill-steps__icon[data-number]:not([data-number=""]) {
    font-family: var(--skill-font-family-mono, ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace);
    font-variant-numeric: tabular-nums;
  }
`;