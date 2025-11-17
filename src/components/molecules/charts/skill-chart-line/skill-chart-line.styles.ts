import { css } from 'lit';

export const lineChartStyles = css`
  :host {
    display: block;
    width: 100%;
    font-family: var(--skill-font-family, var(--chart-font-family, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif));
    line-height: var(--skill-line-height, 1.5);
    color: var(--chart-text-color, #111827);
  }

  .skill-line-chart {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: var(--chart-border-radius, var(--skill-border-radius-md, 0.375rem));
    background: var(--chart-background, var(--skill-color-background, #FFFFFF));
  }

  .skill-line-chart__container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .skill-line-chart__svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .skill-line-chart__title {
    text-align: center;
    margin-bottom: var(--chart-spacing-md, 1rem);
    font-size: var(--chart-font-size-lg, 1.125rem);
    font-weight: var(--chart-font-weight-bold, 700);
    color: var(--chart-text-color, #111827);
  }

  .skill-line-chart__subtitle {
    text-align: center;
    margin-bottom: var(--chart-spacing-lg, 1.5rem);
    font-size: var(--chart-font-size-sm, 0.875rem);
    color: var(--chart-text-secondary-color, #6B7280);
  }

  .skill-line-chart__loading {
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

  .skill-line-chart__empty {
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

  .skill-line-chart__empty-icon {
    margin-bottom: var(--chart-spacing-md, 1rem);
    opacity: 0.5;
  }

  .skill-line-chart__empty-text {
    font-size: var(--chart-font-size-sm, 0.875rem);
  }

  /* SVG Elements */
  .skill-line-chart__grid {
    stroke: var(--chart-grid-color, #E5E7EB);
    stroke-width: 1;
    stroke-dasharray: 2, 2;
    opacity: 0.7;
  }

  .skill-line-chart__grid--horizontal {
    stroke-dasharray: 2, 2;
  }

  .skill-line-chart__grid--vertical {
    stroke-dasharray: 2, 2;
  }

  .skill-line-chart__axis {
    stroke: var(--chart-axis-color, #9CA3AF);
    stroke-width: 1;
    fill: none;
  }

  .skill-line-chart__axis-label {
    fill: var(--chart-text-secondary-color, #6B7280);
    font-size: var(--chart-font-size-xs, 0.75rem);
    font-family: inherit;
  }

  .skill-line-chart__axis-title {
    fill: var(--chart-text-color, #111827);
    font-size: var(--chart-font-size-sm, 0.875rem);
    font-weight: var(--chart-font-weight-medium, 500);
    font-family: inherit;
  }

  .skill-line-chart__line {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: stroke-width 0.2s ease;
  }

  .skill-line-chart__line--area {
    fill-opacity: 0.2;
    transition: fill-opacity 0.2s ease;
  }

  .skill-line-chart__marker {
    transition: r 0.2s ease, stroke-width 0.2s ease;
  }

  .skill-line-chart__marker:hover {
    r: 6;
    stroke-width: 2;
  }

  /* Interactions */
  .skill-line-chart__interaction-area {
    fill: transparent;
    cursor: crosshair;
  }

  .skill-line-chart__interaction-area:hover {
    fill: rgba(0, 0, 0, 0.05);
  }

  .skill-line-chart__crosshair {
    stroke: var(--chart-crosshair-color, #6B7280);
    stroke-width: 1;
    stroke-dasharray: 4, 4;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .skill-line-chart__crosshair--visible {
    opacity: 1;
  }

  .skill-line-chart__crosshair-line--horizontal {
    stroke: var(--chart-crosshair-horizontal-color, #6B7280);
  }

  .skill-line-chart__crosshair-line--vertical {
    stroke: var(--chart-crosshair-vertical-color, #6B7280);
  }

  /* Tooltip */
  .skill-line-chart__tooltip {
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

  .skill-line-chart__tooltip--visible {
    opacity: 1;
  }

  /* Legend */
  .skill-line-chart__legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: var(--chart-spacing-md, 1rem);
    gap: var(--chart-spacing-md, 1rem);
  }

  .skill-line-chart__legend-item {
    display: flex;
    align-items: center;
    gap: var(--chart-spacing-sm, 0.5rem);
    cursor: pointer;
    padding: var(--chart-spacing-xs, 0.25rem);
    border-radius: var(--chart-border-radius-sm, 0.125rem);
    transition: background-color 0.2s ease;
  }

  .skill-line-chart__legend-item:hover {
    background: var(--chart-legend-hover-background, rgba(0, 0, 0, 0.05));
  }

  .skill-line-chart__legend-item--disabled {
    opacity: 0.4;
  }

  .skill-line-chart__legend-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    border: 1px solid transparent;
  }

  .skill-line-chart__legend-label {
    font-size: var(--chart-font-size-sm, 0.875rem);
    color: var(--chart-text-color, #111827);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .skill-line-chart__title {
      font-size: var(--chart-font-size-md, 1rem);
    }

    .skill-line-chart__subtitle {
      font-size: var(--chart-font-size-xs, 0.75rem);
      margin-bottom: var(--chart-spacing-md, 1rem);
    }

    .skill-line-chart__legend {
      gap: var(--chart-spacing-sm, 0.5rem);
    }

    .skill-line-chart__legend-label {
      font-size: var(--chart-font-size-xs, 0.75rem);
    }

    .skill-line-chart__axis-label {
      font-size: 0.625rem;
    }

    .skill-line-chart__axis-title {
      font-size: 0.75rem;
    }
  }

  /* Dark Theme */
  :host([theme="dark"]) .skill-line-chart {
    background: var(--chart-background, #1F2937);
    color: var(--chart-text-color, #F9FAFB);
  }

  :host([theme="dark"]) .skill-line-chart__grid {
    stroke: var(--chart-grid-color, #374151);
  }

  :host([theme="dark"]) .skill-line-chart__axis {
    stroke: var(--chart-axis-color, #6B7280);
  }

  :host([theme="dark"]) .skill-line-chart__axis-label {
    fill: var(--chart-text-secondary-color, #9CA3AF);
  }

  :host([theme="dark"]) .skill-line-chart__axis-title {
    fill: var(--chart-text-color, #F9FAFB);
  }

  :host([theme="dark"]) .skill-line-chart__legend-item:hover {
    background: var(--chart-legend-hover-background, rgba(255, 255, 255, 0.05));
  }

  :host([theme="dark"]) .skill-line-chart__legend-label {
    color: var(--chart-text-color, #F9FAFB);
  }

  /* Accessibility */
  .skill-line-chart__visually-hidden {
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
  .skill-line-chart:focus-visible {
    outline: 2px solid var(--chart-focus-color, #3B82F6);
    outline-offset: 2px;
  }

  /* Loading state animations */
  @keyframes skill-line-chart__pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .skill-line-chart__skeleton {
    animation: skill-line-chart__pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    background: linear-gradient(
      90deg,
      var(--chart-skeleton-base, #E5E7EB) 25%,
      var(--chart-skeleton-highlight, #F3F4F6) 50%,
      var(--chart-skeleton-base, #E5E7EB) 75%
    );
    background-size: 200% 100%;
    animation: skill-line-chart__shimmer 1.5s ease-in-out infinite;
  }

  @keyframes skill-line-chart__shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  /* Print styles */
  @media print {
    .skill-line-chart__tooltip,
    .skill-line-chart__loading {
      display: none;
    }

    .skill-line-chart__grid {
      opacity: 0.3;
    }
  }
`;