import { css } from 'lit';

export const barChartStyles = css`
  :host {
    display: block;
    width: 100%;
    font-family: var(--skill-font-family, var(--chart-font-family, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif));
    line-height: var(--skill-line-height, 1.5);
    color: var(--chart-text-color, #111827);
  }

  .skill-bar-chart {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: var(--chart-border-radius, var(--skill-border-radius-md, 0.375rem));
    background: var(--chart-background, var(--skill-color-background, #FFFFFF));
  }

  .skill-bar-chart__container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .skill-bar-chart__svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .skill-bar-chart__title {
    text-align: center;
    margin-bottom: var(--chart-spacing-md, 1rem);
    font-size: var(--chart-font-size-lg, 1.125rem);
    font-weight: var(--chart-font-weight-bold, 700);
    color: var(--chart-text-color, #111827);
  }

  .skill-bar-chart__subtitle {
    text-align: center;
    margin-bottom: var(--chart-spacing-lg, 1.5rem);
    font-size: var(--chart-font-size-sm, 0.875rem);
    color: var(--chart-text-secondary-color, #6B7280);
  }

  .skill-bar-chart__loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--chart-loading-background, rgba(255, 255, 255, 0.9));
    backdrop-filter: blur(2px);
    z-index: var(--chart-z-loading, 10);
  }

  .skill-bar-chart__empty {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--chart-empty-color, #6B7280);
    font-size: var(--chart-font-size-md, 1rem);
    z-index: var(--chart-z-empty, 5);
  }

  .skill-bar-chart__empty-icon {
    margin-bottom: var(--chart-spacing-md, 1rem);
    opacity: 0.5;
  }

  .skill-bar-chart__empty-text {
    font-size: var(--chart-font-size-sm, 0.875rem);
  }

  /* SVG Elements */
  .skill-bar-chart__grid {
    stroke: var(--chart-grid-color, #E5E7EB);
    stroke-width: 1;
    stroke-dasharray: 2, 2;
    opacity: 0.7;
  }

  .skill-bar-chart__grid--horizontal {
    stroke-dasharray: 2, 2;
  }

  .skill-bar-chart__axis {
    stroke: var(--chart-axis-color, #9CA3AF);
    stroke-width: 1;
    fill: none;
  }

  .skill-bar-chart__axis-label {
    fill: var(--chart-text-secondary-color, #6B7280);
    font-size: var(--chart-font-size-xs, 0.75rem);
    font-family: inherit;
  }

  .skill-bar-chart__axis-title {
    fill: var(--chart-text-color, #111827);
    font-size: var(--chart-font-size-sm, 0.875rem);
    font-weight: var(--chart-font-weight-medium, 500);
    font-family: inherit;
  }

  .skill-bar-chart__bar {
    transition: fill-opacity 0.2s ease, stroke-width 0.2s ease, cursor 0.2s ease;
    cursor: pointer;
  }

  .skill-bar-chart__bar:hover {
    fill-opacity: 0.8;
    stroke-width: 2;
  }

  .skill-bar-chart__bar--stacked {
    stroke: white;
    stroke-width: 1;
  }

  .skill-bar-chart__bar--disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .skill-bar-chart__bar--disabled:hover {
    fill-opacity: 0.4;
    stroke-width: 1;
  }

  /* Bar values */
  .skill-bar-chart__value {
    fill: var(--chart-value-color, #374151);
    font-size: var(--chart-font-size-xs, 0.75rem);
    font-weight: var(--chart-font-weight-medium, 500);
    text-anchor: middle;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .skill-bar-chart__value--visible {
    opacity: 1;
  }

  .skill-bar-chart__value--outside {
    fill: var(--chart-text-color, #111827);
  }

  /* Interactions */
  .skill-bar-chart__interaction-area {
    fill: transparent;
    cursor: pointer;
  }

  .skill-bar-chart__interaction-area:hover {
    fill: rgba(0, 0, 0, 0.05);
  }

  /* Tooltip */
  .skill-bar-chart__tooltip {
    position: absolute;
    padding: var(--chart-tooltip-padding, 0.5rem);
    background: var(--chart-tooltip-background, #1F2937);
    color: var(--chart-tooltip-color, #FFFFFF);
    border-radius: var(--chart-tooltip-border-radius, 0.375rem);
    font-size: var(--chart-font-size-xs, 0.75rem);
    pointer-events: none;
    z-index: var(--chart-z-tooltip, 100);
    opacity: 0;
    transition: opacity 0.2s ease;
    box-shadow: var(--chart-tooltip-shadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
  }

  .skill-bar-chart__tooltip--visible {
    opacity: 1;
  }

  /* Legend */
  .skill-bar-chart__legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: var(--chart-spacing-md, 1rem);
    gap: var(--chart-spacing-md, 1rem);
  }

  .skill-bar-chart__legend-item {
    display: flex;
    align-items: center;
    gap: var(--chart-spacing-sm, 0.5rem);
    cursor: pointer;
    padding: var(--chart-spacing-xs, 0.25rem);
    border-radius: var(--chart-border-radius-sm, 0.125rem);
    transition: background-color 0.2s ease;
  }

  .skill-bar-chart__legend-item:hover {
    background: var(--chart-legend-hover-background, rgba(0, 0, 0, 0.05));
  }

  .skill-bar-chart__legend-item--disabled {
    opacity: 0.4;
  }

  .skill-bar-chart__legend-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    border: 1px solid transparent;
  }

  .skill-bar-chart__legend-label {
    font-size: var(--chart-font-size-sm, 0.875rem);
    color: var(--chart-text-color, #111827);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .skill-bar-chart__title {
      font-size: var(--chart-font-size-md, 1rem);
    }

    .skill-bar-chart__subtitle {
      font-size: var(--chart-font-size-xs, 0.75rem);
      margin-bottom: var(--chart-spacing-md, 1rem);
    }

    .skill-bar-chart__legend {
      gap: var(--chart-spacing-sm, 0.5rem);
    }

    .skill-bar-chart__legend-label {
      font-size: var(--chart-font-size-xs, 0.75rem);
    }

    .skill-bar-chart__axis-label {
      font-size: 0.625rem;
    }

    .skill-bar-chart__axis-title {
      font-size: 0.75rem;
    }

    .skill-bar-chart__value {
      font-size: 0.625rem;
    }
  }

  /* Dark Theme */
  :host([theme="dark"]) .skill-bar-chart {
    background: var(--chart-background, #1F2937);
    color: var(--chart-text-color, #F9FAFB);
  }

  :host([theme="dark"]) .skill-bar-chart__grid {
    stroke: var(--chart-grid-color, #374151);
  }

  :host([theme="dark"]) .skill-bar-chart__axis {
    stroke: var(--chart-axis-color, #6B7280);
  }

  :host([theme="dark"]) .skill-bar-chart__axis-label {
    fill: var(--chart-text-secondary-color, #9CA3AF);
  }

  :host([theme="dark"]) .skill-bar-chart__axis-title {
    fill: var(--chart-text-color, #F9FAFB);
  }

  :host([theme="dark"]) .skill-bar-chart__bar--stacked {
    stroke: var(--chart-stack-stroke, #374151);
  }

  :host([theme="dark"]) .skill-bar-chart__value {
    fill: var(--chart-value-color, #D1D5DB);
  }

  :host([theme="dark"]) .skill-bar-chart__value--outside {
    fill: var(--chart-text-color, #F9FAFB);
  }

  :host([theme="dark"]) .skill-bar-chart__legend-item:hover {
    background: var(--chart-legend-hover-background, rgba(255, 255, 255, 0.05));
  }

  :host([theme="dark"]) .skill-bar-chart__legend-label {
    color: var(--chart-text-color, #F9FAFB);
  }

  /* Accessibility */
  .skill-bar-chart__visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Focus styles */
  .skill-bar-chart:focus-visible {
    outline: 2px solid var(--chart-focus-color, #3B82F6);
    outline-offset: 2px;
  }

  .skill-bar-chart__bar:focus {
    outline: 2px solid var(--chart-focus-color, #3B82F6);
    outline-offset: 1px;
  }

  /* Loading state animations */
  @keyframes skill-bar-chart__pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .skill-bar-chart__skeleton {
    animation: skill-bar-chart__pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    background: linear-gradient(
      90deg,
      var(--chart-skeleton-base, #E5E7EB) 25%,
      var(--chart-skeleton-highlight, #F3F4F6) 50%,
      var(--chart-skeleton-base, #E5E7EB) 75%
    );
    background-size: 200% 100%;
    animation: skill-bar-chart__shimmer 1.5s ease-in-out infinite;
  }

  @keyframes skill-bar-chart__shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  /* Print styles */
  @media print {
    .skill-bar-chart__tooltip,
    .skill-bar-chart__loading {
      display: none;
    }

    .skill-bar-chart__grid {
      opacity: 0.3;
    }

    .skill-bar-chart__bar:hover {
      fill-opacity: 1;
      stroke-width: 1;
    }
  }

  /* Orientation-specific styles */
  .skill-bar-chart--vertical .skill-bar-chart__value {
    text-anchor: middle;
  }

  .skill-bar-chart--horizontal .skill-bar-chart__value {
    text-anchor: start;
    dominant-baseline: middle;
  }

  /* Animation for bars */
  @keyframes skill-bar-chart__bar-grow {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }
  }

  .skill-bar-chart__bar--animated {
    animation: skill-bar-chart__bar-grow 0.6s ease-out;
    transform-origin: bottom;
  }

  .skill-bar-chart--horizontal .skill-bar-chart__bar--animated {
    transform-origin: left;
    animation: skill-bar-chart__bar-grow-horizontal 0.6s ease-out;
  }

  @keyframes skill-bar-chart__bar-grow-horizontal {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }
`;