import { css } from 'lit';

export const pieChartStyles = css`
  :host {
    display: block;
    width: 100%;
    font-family: var(--skill-font-family, var(--chart-font-family, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif));
    line-height: var(--skill-line-height, 1.5);
    color: var(--chart-text-color, #111827);
  }

  .skill-pie-chart {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: var(--chart-border-radius, var(--skill-border-radius-md, 0.375rem));
    background: var(--chart-background, var(--skill-color-background, #FFFFFF));
  }

  .skill-pie-chart__container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .skill-pie-chart__svg {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }

  .skill-pie-chart__title {
    text-align: center;
    margin-bottom: var(--chart-spacing-md, 1rem);
    font-size: var(--chart-font-size-lg, 1.125rem);
    font-weight: var(--chart-font-weight-bold, 700);
    color: var(--chart-text-color, #111827);
  }

  .skill-pie-chart__subtitle {
    text-align: center;
    margin-bottom: var(--chart-spacing-lg, 1.5rem);
    font-size: var(--chart-font-size-sm, 0.875rem);
    color: var(--chart-text-secondary-color, #6B7280);
  }

  .skill-pie-chart__loading {
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

  .skill-pie-chart__empty {
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

  .skill-pie-chart__empty-icon {
    margin-bottom: var(--chart-spacing-md, 1rem);
    opacity: 0.5;
  }

  .skill-pie-chart__empty-text {
    font-size: var(--chart-font-size-sm, 0.875rem);
  }

  /* Pie chart elements */
  .skill-pie-chart__slice {
    transition: transform 0.2s ease, filter 0.2s ease, cursor 0.2s ease;
    cursor: pointer;
    stroke: white;
    stroke-width: 2;
  }

  .skill-pie-chart__slice:hover {
    filter: brightness(0.9);
    transform: scale(1.05);
    transform-origin: center;
  }

  .skill-pie-chart__slice--exploded {
    transform: var(--explosion-transform, translate(0, 0));
    transition: transform 0.3s ease;
  }

  .skill-pie-chart__slice--disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .skill-pie-chart__slice--disabled:hover {
    filter: none;
    transform: scale(1);
  }

  /* Labels */
  .skill-pie-chart__label {
    fill: var(--chart-label-color, #FFFFFF);
    font-size: var(--chart-font-size-sm, 0.875rem);
    font-weight: var(--chart-font-weight-medium, 500);
    text-anchor: middle;
    dominant-baseline: middle;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .skill-pie-chart__label--visible {
    opacity: 1;
  }

  .skill-pie-chart__label--outside {
    fill: var(--chart-text-color, #111827);
    font-size: var(--chart-font-size-xs, 0.75rem);
  }

  /* Lines connecting to outside labels */
  .skill-pie-chart__label-line {
    fill: none;
    stroke: var(--chart-label-line-color, #6B7280);
    stroke-width: 1;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .skill-pie-chart__label-line--visible {
    opacity: 1;
  }

  /* Center text (for donut charts) */
  .skill-pie-chart__center-text {
    fill: var(--chart-center-text-color, #111827);
    font-size: var(--chart-font-size-lg, 1.125rem);
    font-weight: var(--chart-font-weight-bold, 700);
    text-anchor: middle;
    dominant-baseline: middle;
    pointer-events: none;
  }

  .skill-pie-chart__center-subtext {
    fill: var(--chart-center-subtext-color, #6B7280);
    font-size: var(--chart-font-size-sm, 0.875rem);
    font-weight: var(--chart-font-weight-medium, 500);
    text-anchor: middle;
    dominant-baseline: middle;
    pointer-events: none;
  }

  /* Tooltip */
  .skill-pie-chart__tooltip {
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

  .skill-pie-chart__tooltip--visible {
    opacity: 1;
  }

  /* Legend */
  .skill-pie-chart__legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: var(--chart-spacing-md, 1rem);
    gap: var(--chart-spacing-md, 1rem);
  }

  .skill-pie-chart__legend--right {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
    margin-top: 0;
    gap: var(--chart-spacing-sm, 0.5rem);
    justify-content: flex-start;
  }

  .skill-pie-chart__legend--left {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
    margin-top: 0;
    gap: var(--chart-spacing-sm, 0.5rem);
    justify-content: flex-start;
  }

  .skill-pie-chart__legend-item {
    display: flex;
    align-items: center;
    gap: var(--chart-spacing-sm, 0.5rem);
    cursor: pointer;
    padding: var(--chart-spacing-xs, 0.25rem);
    border-radius: var(--chart-border-radius-sm, 0.125rem);
    transition: background-color 0.2s ease;
  }

  .skill-pie-chart__legend-item:hover {
    background: var(--chart-legend-hover-background, rgba(0, 0, 0, 0.05));
  }

  .skill-pie-chart__legend-item--disabled {
    opacity: 0.4;
  }

  .skill-pie-chart__legend-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    border: 1px solid transparent;
  }

  .skill-pie-chart__legend-label {
    font-size: var(--chart-font-size-sm, 0.875rem);
    color: var(--chart-text-color, #111827);
  }

  .skill-pie-chart__legend-value {
    font-size: var(--chart-font-size-sm, 0.875rem);
    color: var(--chart-text-secondary-color, #6B7280);
    font-weight: var(--chart-font-weight-medium, 500);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .skill-pie-chart__title {
      font-size: var(--chart-font-size-md, 1rem);
    }

    .skill-pie-chart__subtitle {
      font-size: var(--chart-font-size-xs, 0.75rem);
      margin-bottom: var(--chart-spacing-md, 1rem);
    }

    .skill-pie-chart__legend {
      gap: var(--chart-spacing-sm, 0.5rem);
    }

    .skill-pie-chart__legend--right,
    .skill-pie-chart__legend--left {
      position: static;
      transform: none;
      flex-direction: row;
      margin-top: var(--chart-spacing-md, 1rem);
    }

    .skill-pie-chart__legend-label {
      font-size: var(--chart-font-size-xs, 0.75rem);
    }

    .skill-pie-chart__legend-value {
      font-size: var(--chart-font-size-xs, 0.75rem);
    }

    .skill-pie-chart__label {
      font-size: 0.75rem;
    }

    .skill-pie-chart__label--outside {
      font-size: 0.625rem;
    }

    .skill-pie-chart__center-text {
      font-size: var(--chart-font-size-md, 1rem);
    }

    .skill-pie-chart__center-subtext {
      font-size: var(--chart-font-size-xs, 0.75rem);
    }
  }

  /* Dark Theme */
  :host([theme="dark"]) .skill-pie-chart {
    background: var(--chart-background, #1F2937);
    color: var(--chart-text-color, #F9FAFB);
  }

  :host([theme="dark"]) .skill-pie-chart__slice {
    stroke: var(--chart-slice-stroke, #374151);
  }

  :host([theme="dark"]) .skill-pie-chart__label {
    fill: var(--chart-label-color, #F9FAFB);
  }

  :host([theme="dark"]) .skill-pie-chart__label--outside {
    fill: var(--chart-text-color, #F9FAFB);
  }

  :host([theme="dark"]) .skill-pie-chart__label-line {
    stroke: var(--chart-label-line-color, #6B7280);
  }

  :host([theme="dark"]) .skill-pie-chart__center-text {
    fill: var(--chart-center-text-color, #F9FAFB);
  }

  :host([theme="dark"]) .skill-pie-chart__center-subtext {
    fill: var(--chart-center-subtext-color, #9CA3AF);
  }

  :host([theme="dark"]) .skill-pie-chart__legend-item:hover {
    background: var(--chart-legend-hover-background, rgba(255, 255, 255, 0.05));
  }

  :host([theme="dark"]) .skill-pie-chart__legend-label {
    color: var(--chart-text-color, #F9FAFB);
  }

  :host([theme="dark"]) .skill-pie-chart__legend-value {
    color: var(--chart-text-secondary-color, #9CA3AF);
  }

  /* Accessibility */
  .skill-pie-chart__visually-hidden {
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
  .skill-pie-chart:focus-visible {
    outline: 2px solid var(--chart-focus-color, #3B82F6);
    outline-offset: 2px;
  }

  .skill-pie-chart__slice:focus {
    outline: 2px solid var(--chart-focus-color, #3B82F6);
    outline-offset: 1px;
  }

  /* Loading state animations */
  @keyframes skill-pie-chart__pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .skill-pie-chart__skeleton {
    animation: skill-pie-chart__pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    background: linear-gradient(
      90deg,
      var(--chart-skeleton-base, #E5E7EB) 25%,
      var(--chart-skeleton-highlight, #F3F4F6) 50%,
      var(--chart-skeleton-base, #E5E7EB) 75%
    );
    background-size: 200% 100%;
    animation: skill-pie-chart__shimmer 1.5s ease-in-out infinite;
  }

  @keyframes skill-pie-chart__shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  /* Print styles */
  @media print {
    .skill-pie-chart__tooltip,
    .skill-pie-chart__loading {
      display: none;
    }

    .skill-pie-chart__slice:hover {
      filter: none;
      transform: scale(1);
    }
  }

  /* Animation for pie slices */
  @keyframes skill-pie-chart__slice-appear {
    from {
      transform: scale(0) rotate(-90deg);
      opacity: 0;
    }
    to {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
  }

  .skill-pie-chart__slice--animated {
    animation: skill-pie-chart__slice-appear 0.6s ease-out;
    transform-origin: center;
  }

  /* Special layout for legend positioning */
  .skill-pie-chart__layout {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .skill-pie-chart__layout--legend-right {
    justify-content: space-between;
    gap: var(--chart-spacing-lg, 1.5rem);
  }

  .skill-pie-chart__layout--legend-left {
    justify-content: space-between;
    gap: var(--chart-spacing-lg, 1.5rem);
    flex-direction: row-reverse;
  }

  .skill-pie-chart__chart-area {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .skill-pie-chart__legend-area {
    flex: 0 0 auto;
  }

  /* Small chart adjustments */
  .skill-pie-chart--compact .skill-pie-chart__label {
    font-size: 0.625rem;
  }

  .skill-pie-chart--compact .skill-pie-chart__center-text {
    font-size: 0.875rem;
  }

  .skill-pie-chart--compact .skill-pie-chart__center-subtext {
    font-size: 0.625rem;
  }
`;