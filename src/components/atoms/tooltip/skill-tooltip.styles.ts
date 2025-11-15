import { css } from 'lit';

/**
 * Skill Tooltip 组件样式
 */
export const tooltipStyles = css`
  :host {
    display: inline-block;
    position: relative;
    --skill-tooltip-bg: var(--skill-gray-900, #212529);
    --skill-tooltip-color: var(--skill-white, #ffffff);
    --skill-tooltip-border: var(--skill-gray-700, #495057);
    --skill-tooltip-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    --skill-tooltip-border-radius: var(--skill-border-radius-md, 6px);
    --skill-tooltip-font-size: var(--skill-font-body-4, 12px);
    --skill-tooltip-line-height: var(--skill-line-height-sm, 1.4);
    --skill-tooltip-padding: var(--skill-spacing-sm, 8px) var(--skill-spacing-md, 12px);
    --skill-tooltip-max-width: var(--skill-tooltip-max-width, 300px);
    --skill-tooltip-transition: var(--skill-transition-fast, 0.2s);
    --skill-tooltip-z-index: 1000;
    --skill-tooltip-arrow-size: 8px;
  }

  /* Variant styles */
  :host([variant='dark']) {
    --skill-tooltip-bg: var(--skill-gray-900, #212529);
    --skill-tooltip-color: var(--skill-white, #ffffff);
    --skill-tooltip-border: var(--skill-gray-700, #495057);
  }

  :host([variant='light']) {
    --skill-tooltip-bg: var(--skill-white, #ffffff);
    --skill-tooltip-color: var(--skill-gray-900, #212529);
    --skill-tooltip-border: var(--skill-gray-300, #dee2e6);
    --skill-tooltip-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  :host([variant='success']) {
    --skill-tooltip-bg: var(--skill-success-500, #28a745);
    --skill-tooltip-color: var(--skill-white, #ffffff);
    --skill-tooltip-border: var(--skill-success-600, #218838);
  }

  :host([variant='warning']) {
    --skill-tooltip-bg: var(--skill-warning-500, #ffc107);
    --skill-tooltip-color: var(--skill-gray-900, #212529);
    --skill-tooltip-border: var(--skill-warning-600, #e0a800);
  }

  :host([variant='error']) {
    --skill-tooltip-bg: var(--skill-error-500, #dc3545);
    --skill-tooltip-color: var(--skill-white, #ffffff);
    --skill-tooltip-border: var(--skill-error-600, #c82333);
  }

  :host([variant='info']) {
    --skill-tooltip-bg: var(--skill-info-500, #17a2b8);
    --skill-tooltip-color: var(--skill-white, #ffffff);
    --skill-tooltip-border: var(--skill-info-600, #138496);
  }

  /* Container */
  .skill-tooltip__container {
    position: relative;
    display: inline-block;
  }

  /* Trigger element wrapper */
  .skill-tooltip__trigger {
    display: inline-block;
    cursor: help;
  }

  /* Tooltip container */
  .skill-tooltip__tooltip {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: var(--skill-tooltip-z-index);
    max-width: var(--skill-tooltip-max-width);
    padding: var(--skill-tooltip-padding);
    background-color: var(--skill-tooltip-bg);
    color: var(--skill-tooltip-color);
    border: 1px solid var(--skill-tooltip-border);
    border-radius: var(--skill-tooltip-border-radius);
    box-shadow: var(--skill-tooltip-shadow);
    font-size: var(--skill-tooltip-font-size);
    line-height: var(--skill-tooltip-line-height);
    font-weight: var(--skill-font-normal, 400);
    text-align: left;
    word-wrap: break-word;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: all var(--skill-tooltip-transition);
    transform-origin: center;
  }

  /* Visible state */
  .skill-tooltip__tooltip:not([hidden]) {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  /* Show/Hide animations */
  @keyframes tooltipFadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes tooltipFadeOut {
    from {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
  }

  .skill-tooltip__tooltip:not([hidden]) {
    animation: tooltipFadeIn 0.2s ease-out forwards;
  }

  .skill-tooltip__tooltip[hidden] {
    animation: tooltipFadeOut 0.15s ease-out forwards;
  }

  /* Content wrapper */
  .skill-tooltip__content {
    display: block;
    max-width: 100%;
    overflow-wrap: break-word;
  }

  /* Arrow */
  .skill-tooltip__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border: var(--skill-tooltip-arrow-size) solid transparent;
    transition: all var(--skill-tooltip-transition);
  }

  /* Arrow colors */
  .skill-tooltip__arrow {
    border-top-color: var(--skill-tooltip-bg);
    border-right-color: var(--skill-tooltip-bg);
    border-bottom-color: var(--skill-tooltip-bg);
    border-left-color: var(--skill-tooltip-bg);
  }

  /* Position-based arrow positioning */
  .skill-tooltip__tooltip[data-position="top"] .skill-tooltip__arrow {
    bottom: calc(var(--skill-tooltip-arrow-size) * -2);
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
  }

  .skill-tooltip__tooltip[data-position="bottom"] .skill-tooltip__arrow {
    top: calc(var(--skill-tooltip-arrow-size) * -2);
    left: 50%;
    transform: translateX(-50%) rotate(0deg);
  }

  .skill-tooltip__tooltip[data-position="left"] .skill-tooltip__arrow {
    right: calc(var(--skill-tooltip-arrow-size) * -2);
    top: 50%;
    transform: translateY(-50%) rotate(270deg);
  }

  .skill-tooltip__tooltip[data-position="right"] .skill-tooltip__arrow {
    left: calc(var(--skill-tooltip-arrow-size) * -2);
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
  }

  /* Size variants */
  :host([size='sm']) {
    --skill-tooltip-font-size: var(--skill-font-body-5, 10px);
    --skill-tooltip-padding: var(--skill-spacing-2xs, 4px) var(--skill-spacing-sm, 8px);
    --skill-tooltip-arrow-size: 6px;
  }

  :host([size='lg']) {
    --skill-tooltip-font-size: var(--skill-font-body-3, 14px);
    --skill-tooltip-padding: var(--skill-spacing-md, 12px) var(--skill-spacing-lg, 16px);
    --skill-tooltip-arrow-size: 10px;
  }

  :host([size='xl']) {
    --skill-tooltip-font-size: var(--skill-font-body-2, 16px);
    --skill-tooltip-padding: var(--skill-spacing-lg, 16px) var(--skill-spacing-xl, 20px);
    --skill-tooltip-arrow-size: 12px;
  }

  /* Position-specific adjustments */
  :host([position='top']) .skill-tooltip__tooltip {
    transform: translate(-50%, -100%) translateY(-8px);
  }

  :host([position='bottom']) .skill-tooltip__tooltip {
    transform: translate(-50%, 0%) translateY(8px);
  }

  :host([position='left']) .skill-tooltip__tooltip {
    transform: translate(-100%, -50%) translateX(-8px);
  }

  :host([position='right']) .skill-tooltip__tooltip {
    transform: translate(0%, -50%) translateX(8px);
  }

  /* Trigger styles */
  :host([trigger='click']) .skill-tooltip__trigger {
    cursor: pointer;
  }

  :host([trigger='focus']) .skill-tooltip__trigger {
    cursor: default;
  }

  /* Disabled state */
  :host([disabled]) {
    pointer-events: none;
  }

  :host([disabled]) .skill-tooltip__trigger {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Focus styles for accessibility */
  .skill-tooltip__trigger:focus-within {
    outline: 2px solid var(--skill-primary-500, #0066cc);
    outline-offset: 2px;
    border-radius: var(--skill-border-radius-sm, 4px);
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .skill-tooltip__tooltip {
      border-width: 2px;
    }

    :host([variant='light']) .skill-tooltip__tooltip {
      background: Window;
      color: WindowText;
      border: 2px solid WindowText;
    }

    :host([variant='dark']) .skill-tooltip__tooltip {
      background: WindowText;
      color: Window;
      border: 2px solid WindowText;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .skill-tooltip__tooltip {
      transition: opacity 0.1s;
    }

    .skill-tooltip__tooltip:not([hidden]) {
      animation: none;
    }

    .skill-tooltip__tooltip[hidden] {
      animation: none;
    }
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    :host {
      --skill-tooltip-bg: var(--skill-gray-800, #343a40);
      --skill-tooltip-color: var(--skill-gray-100, #f8f9fa);
      --skill-tooltip-border: var(--skill-gray-600, #6c757d);
    }

    :host([variant='light']) {
      --skill-tooltip-bg: var(--skill-gray-100, #f8f9fa);
      --skill-tooltip-color: var(--skill-gray-900, #212529);
      --skill-tooltip-border: var(--skill-gray-300, #dee2e6);
    }
  }

  /* Print styles */
  @media print {
    .skill-tooltip__tooltip {
      display: none !important;
    }
  }

  /* Mobile-specific adjustments */
  @media (max-width: 768px) {
    .skill-tooltip__tooltip {
      --skill-tooltip-max-width: 250px;
      --skill-tooltip-font-size: var(--skill-font-body-4, 12px);
    }

    :host([position='left']) .skill-tooltip__tooltip,
    :host([position='right']) .skill-tooltip__tooltip {
      /* On mobile, prefer top/bottom positioning */
      transform: translate(-50%, -100%) translateY(-8px);
    }
  }

  /* Performance optimizations */
  .skill-tooltip__tooltip {
    will-change: opacity, transform;
    backface-visibility: hidden;
    perspective: 1000px;
  }

  .skill-tooltip__arrow {
    will-change: transform;
    backface-visibility: hidden;
  }
`;