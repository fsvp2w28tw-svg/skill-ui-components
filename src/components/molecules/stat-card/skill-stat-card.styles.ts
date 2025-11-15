import { css } from 'lit';

export const statCardStyles = css`
  :host {
    display: block;
    width: 100%;
    font-family: var(--skill-font-family, inherit);
    line-height: var(--skill-line-height, 1.5);
  }

  .skill-stat-card {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: var(--stat-card-padding, var(--skill-spacing-lg));
    border-radius: var(--stat-card-border-radius, var(--skill-border-radius-lg));
    background: var(--stat-card-background, var(--skill-color-background));
    border: 1px solid transparent;
    transition: all 0.2s ease;
    overflow: hidden;
  }

  /* Variants */
  .skill-stat-card--compact {
    padding: var(--skill-spacing-md);
  }

  .skill-stat-card--detailed {
    padding: var(--skill-spacing-xl);
  }

  .skill-stat-card--minimal {
    padding: var(--skill-spacing-sm);
  }

  /* Colors */
  .skill-stat-card--primary {
    --stat-card-background: var(--skill-color-primary-light);
    --stat-card-title-color: var(--skill-color-primary-dark);
  }

  .skill-stat-card--secondary {
    --stat-card-background: var(--skill-color-secondary-light);
    --stat-card-title-color: var(--skill-color-secondary-dark);
  }

  .skill-stat-card--success {
    --stat-card-background: var(--skill-color-success-light);
    --stat-card-title-color: var(--skill-color-success-dark);
  }

  .skill-stat-card--warning {
    --stat-card-background: var(--skill-color-warning-light);
    --stat-card-title-color: var(--skill-color-warning-dark);
  }

  .skill-stat-card--error {
    --stat-card-background: var(--skill-color-error-light);
    --stat-card-title-color: var(--skill-color-error-dark);
  }

  .skill-stat-card--info {
    --stat-card-background: var(--skill-color-info-light);
    --stat-card-title-color: var(--skill-color-info-dark);
  }

  /* Sizes */
  .skill-stat-card--xs {
    --stat-card-padding: var(--skill-spacing-sm);
    --stat-card-icon-size: 1.2rem;
  }

  .skill-stat-card--sm {
    --stat-card-padding: var(--skill-spacing-md);
    --stat-card-icon-size: 1.4rem;
  }

  .skill-stat-card--md {
    --stat-card-padding: var(--skill-spacing-lg);
    --stat-card-icon-size: 1.6rem;
  }

  .skill-stat-card--lg {
    --stat-card-padding: var(--skill-spacing-xl);
    --stat-card-icon-size: 2rem;
  }

  .skill-stat-card--xl {
    --stat-card-padding: var(--skill-spacing-2xl);
    --stat-card-icon-size: 2.4rem;
  }

  /* Shadows */
  .skill-stat-card--shadow-none {
    --stat-card-shadow: none;
  }

  .skill-stat-card--shadow-sm {
    --stat-card-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .skill-stat-card--shadow-md {
    --stat-card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .skill-stat-card--shadow-lg {
    --stat-card-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }

  /* Backgrounds */
  .skill-stat-card--bg-solid {
    --stat-card-background: var(--skill-color-surface);
  }

  .skill-stat-card--bg-gradient {
    --stat-card-background: linear-gradient(135deg, var(--skill-color-primary-light) 0%, var(--skill-color-primary) 100%);
    --stat-card-title-color: white;
    --stat-card-value-color: white;
    --stat-card-subtitle-color: rgba(255, 255, 255, 0.8);
  }

  /* Borders */
  .skill-stat-card--bordered {
    border-color: var(--skill-color-border);
  }

  .skill-stat-card--bordered:hover {
    border-color: var(--skill-color-primary);
  }

  /* Clickable */
  .skill-stat-card--clickable {
    cursor: pointer;
  }

  .skill-stat-card--clickable:hover {
    transform: translateY(-2px);
    --stat-card-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .skill-stat-card--clickable:active {
    transform: translateY(0);
  }

  .skill-stat-card--clickable:focus-visible {
    outline: 2px solid var(--skill-color-primary);
    outline-offset: 2px;
  }

  /* Loading */
  .skill-stat-card--loading {
    pointer-events: none;
    opacity: 0.7;
  }

  .skill-stat-card__loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    border-radius: inherit;
  }

  /* Animation */
  .skill-stat-card--animated {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .skill-stat-card--value-changing ::part(value) {
    animation: valueChange 0.3s ease;
  }

  @keyframes valueChange {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.05); }
    100% { opacity: 1; transform: scale(1); }
  }

  /* Empty State */
  .skill-stat-card__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--skill-spacing-2xl);
    text-align: center;
    color: var(--skill-color-text-muted);
  }

  .skill-stat-card__empty-icon {
    margin-bottom: var(--skill-spacing-md);
    opacity: 0.5;
  }

  .skill-stat-card__empty-text {
    font-size: var(--skill-font-size-md);
    color: var(--skill-color-text-muted);
  }

  /* Layout Structure */
  .skill-stat-card__main {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: var(--skill-spacing-md);
  }

  .skill-stat-card--icon-top .skill-stat-card__main {
    align-items: center;
    text-align: center;
  }

  .skill-stat-card__body {
    display: flex;
    align-items: flex-start;
    gap: var(--skill-spacing-md);
    flex: 1;
  }

  .skill-stat-card--icon-left .skill-stat-card__body {
    flex-direction: row;
  }

  .skill-stat-card--icon-right .skill-stat-card__body {
    flex-direction: row-reverse;
  }

  .skill-stat-card--compact .skill-stat-card__body {
    align-items: center;
  }

  /* Header */
  .skill-stat-card__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: var(--skill-spacing-sm);
    gap: var(--skill-spacing-sm);
  }

  .skill-stat-card--compact .skill-stat-card__header {
    margin-bottom: var(--skill-spacing-xs);
  }

  .skill-stat-card--detailed .skill-stat-card__header {
    margin-bottom: var(--skill-spacing-md);
  }

  /* Icon */
  .skill-stat-card__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--skill-color-primary);
    font-size: var(--stat-card-icon-size, 1.6rem);
    width: var(--stat-card-icon-size, 1.6rem);
    height: var(--stat-card-icon-size, 1.6rem);
  }

  .skill-stat-card__icon--left {
    margin-right: var(--skill-spacing-md);
  }

  .skill-stat-card__icon--right {
    margin-left: var(--skill-spacing-md);
  }

  .skill-stat-card__icon--top {
    margin-bottom: var(--skill-spacing-md);
  }

  /* Content */
  .skill-stat-card__content {
    display: flex;
    flex-direction: column;
    gap: var(--skill-spacing-xs);
    flex: 1;
  }

  .skill-stat-card--compact .skill-stat-card__content {
    gap: var(--skill-spacing-xs);
  }

  .skill-stat-card--detailed .skill-stat-card__content {
    gap: var(--skill-spacing-sm);
  }

  /* Title */
  .skill-stat-card__title {
    font-size: var(--skill-font-size-sm);
    font-weight: var(--skill-font-weight-medium);
    color: var(--stat-card-title-color, var(--skill-color-text-muted));
    line-height: 1.4;
    margin: 0;
  }

  .skill-stat-card--compact .skill-stat-card__title {
    font-size: var(--skill-font-size-xs);
  }

  .skill-stat-card--detailed .skill-stat-card__title {
    font-size: var(--skill-font-size-md);
  }

  /* Value */
  .skill-stat-card__value {
    font-size: var(--skill-font-size-2xl);
    font-weight: var(--skill-font-weight-bold);
    color: var(--stat-card-value-color, var(--skill-color-text));
    line-height: 1.2;
    margin: 0;
  }

  .skill-stat-card--compact .skill-stat-card__value {
    font-size: var(--skill-font-size-xl);
  }

  .skill-stat-card--detailed .skill-stat-card__value {
    font-size: var(--skill-font-size-3xl);
  }

  .skill-stat-card--minimal .skill-stat-card__value {
    font-size: var(--skill-font-size-lg);
  }

  /* Subtitle */
  .skill-stat-card__subtitle {
    font-size: var(--skill-font-size-sm);
    color: var(--stat-card-subtitle-color, var(--skill-color-text-muted));
    line-height: 1.4;
    margin: 0;
  }

  .skill-stat-card--compact .skill-stat-card__subtitle {
    font-size: var(--skill-font-size-xs);
  }

  .skill-stat-card--detailed .skill-stat-card__subtitle {
    font-size: var(--skill-font-size-md);
  }

  /* Badge */
  .skill-stat-card__badge {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  /* Trend */
  .skill-stat-card__trend {
    display: flex;
    align-items: center;
    margin-top: var(--skill-spacing-xs);
  }

  .skill-stat-card__trend-content {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs);
    font-size: var(--skill-font-size-sm);
  }

  .skill-stat-card__trend-icon {
    flex-shrink: 0;
  }

  .skill-stat-card__trend-icon--up {
    color: var(--skill-color-success);
  }

  .skill-stat-card__trend-icon--down {
    color: var(--skill-color-error);
  }

  .skill-stat-card__trend-icon--neutral {
    color: var(--skill-color-text-muted);
  }

  .skill-stat-card__trend-value {
    font-weight: var(--skill-font-weight-medium);
  }

  .skill-stat-card__trend-icon--up + .skill-stat-card__trend-value {
    color: var(--skill-color-success);
  }

  .skill-stat-card__trend-icon--down + .skill-stat-card__trend-value {
    color: var(--skill-color-error);
  }

  .skill-stat-card__trend-icon--neutral + .skill-stat-card__trend-value {
    color: var(--skill-color-text-muted);
  }

  .skill-stat-card__trend-label {
    color: var(--skill-color-text-muted);
    font-size: var(--skill-font-size-xs);
  }

  /* Progress */
  .skill-stat-card__progress {
    margin-top: var(--skill-spacing-sm);
    width: 100%;
  }

  .skill-stat-card--compact .skill-stat-card__progress {
    margin-top: var(--skill-spacing-xs);
  }

  .skill-stat-card--detailed .skill-stat-card__progress {
    margin-top: var(--skill-spacing-md);
  }

  /* Actions */
  .skill-stat-card__actions {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs);
    flex-shrink: 0;
  }

  /* Extra */
  .skill-stat-card__extra {
    margin-top: var(--skill-spacing-md);
  }

  /* Responsive Styles */
  @media (max-width: 768px) {
    .skill-stat-card {
      padding: var(--skill-spacing-md);
    }

    .skill-stat-card--lg,
    .skill-stat-card--xl {
      padding: var(--skill-spacing-lg);
    }

    .skill-stat-card__value {
      font-size: var(--skill-font-size-xl);
    }

    .skill-stat-card--detailed .skill-stat-card__value {
      font-size: var(--skill-font-size-2xl);
    }

    .skill-stat-card--icon-left .skill-stat-card__body,
    .skill-stat-card--icon-right .skill-stat-card__body {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--skill-spacing-sm);
    }

    .skill-stat-card__icon--left,
    .skill-stat-card__icon--right {
      margin: 0;
    }

    .skill-stat-card__header {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--skill-spacing-xs);
    }
  }

  @media (max-width: 480px) {
    .skill-stat-card {
      padding: var(--skill-spacing-sm);
    }

    .skill-stat-card--detailed {
      padding: var(--skill-spacing-md);
    }

    .skill-stat-card__value {
      font-size: var(--skill-font-size-lg);
    }

    .skill-stat-card--detailed .skill-stat-card__value {
      font-size: var(--skill-font-size-xl);
    }

    .skill-stat-card__title {
      font-size: var(--skill-font-size-xs);
    }

    .skill-stat-card__subtitle {
      font-size: var(--skill-font-size-xs);
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .skill-stat-card {
      border: 2px solid var(--skill-color-border);
    }

    .skill-stat-card--clickable:focus {
      border-color: var(--skill-color-primary);
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .skill-stat-card,
    .skill-stat-card--animated,
    .skill-stat-card--clickable {
      transition: none;
    }

    .skill-stat-card--value-changing ::part(value) {
      animation: none;
    }
  }

  /* Print styles */
  @media print {
    .skill-stat-card {
      break-inside: avoid;
      box-shadow: none !important;
      border: 1px solid #ccc;
    }

    .skill-stat-card__loading {
      display: none;
    }
  }

  /* Custom properties for easy theming */
  :host {
    --stat-card-padding: var(--skill-spacing-lg);
    --stat-card-border-radius: var(--skill-border-radius-lg);
    --stat-card-background: var(--skill-color-background);
    --stat-card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    --stat-card-title-color: var(--skill-color-text-muted);
    --stat-card-value-color: var(--skill-color-text);
    --stat-card-subtitle-color: var(--skill-color-text-muted);
    --stat-card-icon-size: 1.6rem;
    --stat-card-badge-size: 1rem;
    --stat-card-progress-height: 4px;
  }

  /* Dark theme support */
  :host([theme="dark"]) {
    --stat-card-background: var(--skill-color-surface-dark);
    --stat-card-title-color: var(--skill-color-text-muted-dark);
    --stat-card-value-color: var(--skill-color-text-dark);
    --stat-card-subtitle-color: var(--skill-color-text-muted-dark);
  }

  /* Card variants based on color */
  .skill-stat-card--primary.skill-stat-card--bg-gradient {
    background: linear-gradient(135deg, var(--skill-color-primary-light) 0%, var(--skill-color-primary) 100%);
    color: white;
  }

  .skill-stat-card--success.skill-stat-card--bg-gradient {
    background: linear-gradient(135deg, var(--skill-color-success-light) 0%, var(--skill-color-success) 100%);
    color: white;
  }

  .skill-stat-card--error.skill-stat-card--bg-gradient {
    background: linear-gradient(135deg, var(--skill-color-error-light) 0%, var(--skill-color-error) 100%);
    color: white;
  }

  .skill-stat-card--warning.skill-stat-card--bg-gradient {
    background: linear-gradient(135deg, var(--skill-color-warning-light) 0%, var(--skill-color-warning) 100%);
    color: white;
  }
`;