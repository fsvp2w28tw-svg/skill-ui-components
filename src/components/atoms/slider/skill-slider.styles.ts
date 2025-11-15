import { css } from 'lit';

export const sliderStyles = css`
  :host {
    display: block;
    width: 100%;
  }

  .skill-slider {
    position: relative;
    width: 100%;
    height: var(--slider-height, var(--skill-component-height-sm, 32px));
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    outline: none;
  }

  .skill-slider:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* —WhS */
  .skill-slider__track {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    height: var(--track-height, 6px);
    background: var(--track-bg, var(--skill-gray-200, #E5E8EB));
    border-radius: var(--track-radius, var(--skill-radius-full, 9999px));
    overflow: hidden;
  }

  /* —WkEhS */
  .skill-slider__track-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--track-fill-bg, var(--skill-primary-500, #0A59F7));
    border-radius: inherit;
    transition: var(--track-fill-transition, width var(--slider-duration, var(--skill-duration-fast, 200ms)) var(--slider-ease, var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1))));
  }

  /* ÇÙπ */
  :host([orientation='vertical']) .skill-slider {
    width: var(--slider-height, var(--skill-component-height-sm, 32px));
    height: var(--slider-width, 200px);
    flex-direction: column;
  }

  :host([orientation='vertical']) .skill-slider__track {
    top: 0;
    left: 50%;
    right: auto;
    bottom: 0;
    transform: translateX(-50%);
    width: var(--track-height, 6px);
    height: auto;
  }

  :host([orientation='vertical']) .skill-slider__track-fill {
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
  }

  /* —WKƒ */
  .skill-slider__handle {
    position: absolute;
    top: 50%;
    width: var(--handle-size, 20px);
    height: var(--handle-size, 20px);
    background: var(--handle-bg, var(--skill-white, #FFFFFF));
    border: var(--handle-border-width, 2px) solid var(--handle-border-color, var(--skill-primary-500, #0A59F7));
    border-radius: var(--handle-radius, var(--skill-radius-full, 9999px));
    box-shadow: var(--handle-shadow, var(--skill-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)));
    cursor: grab;
    transition: all var(--handle-transition, var(--skill-duration-fast, 200ms)) var(--slider-ease, var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1)));
    z-index: 2;
  }

  .skill-slider__handle:hover {
    transform: scale(var(--handle-hover-scale, 1.1));
    box-shadow: var(--handle-hover-shadow, var(--skill-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)));
  }

  .skill-slider__handle:active,
  .skill-slider__handle.dragging {
    cursor: grabbing;
    transform: scale(var(--handle-active-scale, 1.2));
    box-shadow: var(--handle-active-shadow, var(--skill-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)));
  }

  .skill-slider:focus .skill-slider__handle {
    outline: 2px solid var(--skill-primary-500, #0A59F7);
    outline-offset: 2px;
  }

  /* ÇÙπKƒ */
  :host([orientation='vertical']) .skill-slider__handle {
    left: 50%;
    top: auto;
    transform: translateX(-50%);
  }

  :host([orientation='vertical']) .skill-slider__handle:hover {
    transform: translateX(-50%) scale(var(--handle-hover-scale, 1.1));
  }

  :host([orientation='vertical']) .skill-slider__handle:active,
  :host([orientation='vertical']) .skill-slider__handle.dragging {
    transform: translateX(-50%) scale(var(--handle-active-scale, 1.2));
  }

  /* ÃKƒ */
  .skill-slider__handle--lower {
    z-index: 2;
  }

  .skill-slider__handle--upper {
    z-index: 3;
  }

  /* e∞ */
  .skill-slider__marks {
    position: absolute;
    top: calc(50% + var(--marks-offset, 12px));
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
  }

  :host([orientation='vertical']) .skill-slider__marks {
    top: 0;
    bottom: 0;
    left: calc(50% + var(--marks-offset, 12px));
    right: auto;
    flex-direction: column;
  }

  .skill-slider__mark {
    width: var(--mark-size, 2px);
    height: var(--mark-size, 2px);
    background: var(--mark-bg, var(--skill-gray-400, #BDBDBD));
    border-radius: var(--skill-radius-full, 9999px);
  }

  .skill-slider__mark--active {
    background: var(--mark-active-bg, var(--skill-primary-500, #0A59F7));
  }

  /* ~ */
  .skill-slider__labels {
    position: absolute;
    top: calc(50% + var(--labels-offset, 28px));
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    font-size: var(--labels-font-size, var(--skill-font-size-caption, 10px));
    color: var(--labels-color, var(--skill-gray-500, #8A8A8A));
    pointer-events: none;
  }

  :host([orientation='vertical']) .skill-slider__labels {
    top: 0;
    bottom: 0;
    left: calc(50% + var(--labels-offset, 28px));
    right: auto;
    flex-direction: column;
    align-items: center;
  }

  .skill-slider__label {
    white-space: nowrap;
  }

  /* Âw–: */
  .skill-slider__tooltip {
    position: absolute;
    bottom: calc(100% + var(--tooltip-offset, 8px));
    left: 50%;
    transform: translateX(-50%);
    background: var(--tooltip-bg, var(--skill-gray-900, #1A1A1A));
    color: var(--tooltip-color, var(--skill-white, #FFFFFF));
    padding: var(--tooltip-padding, var(--skill-spacing-xs, 8px)) var(--skill-spacing-sm, 12px));
    border-radius: var(--tooltip-radius, var(--skill-radius-base, 4px));
    font-size: var(--tooltip-font-size, var(--skill-font-size-caption, 10px));
    font-weight: var(--tooltip-font-weight, var(--skill-font-weight-medium, 500));
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all var(--tooltip-duration, var(--skill-duration-fast, 200ms)) var(--tooltip-ease, var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1)));
    z-index: 10;
  }

  .skill-slider__tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: var(--tooltip-arrow-size, 4px) solid transparent;
    border-top-color: var(--tooltip-bg, var(--skill-gray-900, #1A1A1A));
  }

  .skill-slider__tooltip.visible {
    opacity: 1;
    visibility: visible;
  }

  /* ÇÙπÂw–: */
  :host([orientation='vertical']) .skill-slider__tooltip {
    top: 50%;
    bottom: auto;
    left: calc(100% + var(--tooltip-offset, 8px));
    transform: translateY(-50%);
  }

  :host([orientation='vertical']) .skill-slider__tooltip::after {
    top: 50%;
    left: auto;
    right: 100%;
    bottom: auto;
    transform: translateY(-50%);
    border: var(--tooltip-arrow-size, 4px) solid transparent;
    border-left-color: var(--tooltip-bg, var(--skill-gray-900, #1A1A1A));
    border-top-color: transparent;
  }

  /* úrÿS */
  :host([color='primary']) {
    --track-fill-bg: var(--skill-primary-500, #0A59F7);
    --handle-border-color: var(--skill-primary-500, #0A59F7);
    --mark-active-bg: var(--skill-primary-500, #0A59F7);
  }

  :host([color='secondary']) {
    --track-fill-bg: var(--skill-secondary-500, #00D4AA);
    --handle-border-color: var(--skill-secondary-500, #00D4AA);
    --mark-active-bg: var(--skill-secondary-500, #00D4AA);
  }

  :host([color='success']) {
    --track-fill-bg: var(--skill-success-500, #00D4AA);
    --handle-border-color: var(--skill-success-500, #00D4AA);
    --mark-active-bg: var(--skill-success-500, #00D4AA);
  }

  :host([color='warning']) {
    --track-fill-bg: var(--skill-warning-500, #FFB400);
    --handle-border-color: var(--skill-warning-500, #FFB400);
    --mark-active-bg: var(--skill-warning-500, #FFB400);
  }

  :host([color='error']) {
    --track-fill-bg: var(--skill-error-500, #FA2A2D);
    --handle-border-color: var(--skill-error-500, #FA2A2D);
    --mark-active-bg: var(--skill-error-500, #FA2A2D);
  }

  :host([color='info']) {
    --track-fill-bg: var(--skill-info-500, #0A59F7);
    --handle-border-color: var(--skill-info-500, #0A59F7);
    --mark-active-bg: var(--skill-info-500, #0A59F7);
  }

  /* :¯ÿS */
  :host([size='sm']) .skill-slider {
    --slider-height: var(--skill-component-height-xs, 24px);
    --track-height: 4px;
    --handle-size: 16px;
    --handle-hover-scale: 1.15;
    --handle-active-scale: 1.25;
  }

  :host([size='lg']) .skill-slider {
    --slider-height: var(--skill-component-height-lg, 48px);
    --track-height: 8px;
    --handle-size: 24px;
    --handle-hover-scale: 1.08;
    --handle-active-scale: 1.15;
  }

  /* Å(∂ */
  .skill-slider:disabled .skill-slider__track {
    background: var(--track-disabled-bg, var(--skill-gray-100, #F1F3F5));
  }

  .skill-slider:disabled .skill-slider__track-fill {
    background: var(--track-fill-disabled-bg, var(--skill-gray-300, #D1D5DB));
  }

  .skill-slider:disabled .skill-slider__handle {
    background: var(--handle-disabled-bg, var(--skill-gray-200, #E5E8EB));
    border-color: var(--handle-disabled-border-color, var(--skill-gray-400, #BDBDBD));
    cursor: not-allowed;
    transform: none !important;
  }

  .skill-slider:disabled .skill-slider__handle:hover {
    box-shadow: var(--handle-shadow, var(--skill-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)));
  }

  /* Ù—W */
  :host([range]) .skill-slider__track-fill {
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: inherit;
  }

  :host([range][orientation='vertical']) .skill-slider__track-fill {
    left: 0;
    right: 0;
  }

  /* ;¶7 */
  :host([ticks]) .skill-slider__marks {
    display: flex;
  }

  :host([ticks][orientation='vertical']) .skill-slider__marks {
    display: flex;
  }

  /* ìeF! */
  :host([show-input]) .skill-slider__input {
    width: var(--input-width, 80px);
    padding: var(--input-padding, var(--skill-spacing-xs, 8px));
    border: 1px solid var(--input-border-color, var(--skill-gray-300, #D1D5DB));
    border-radius: var(--input-radius, var(--skill-radius-base, 4px));
    font-size: var(--input-font-size, var(--skill-font-size-body-3, 12px));
    text-align: center;
    outline: none;
    transition: all var(--skill-duration-fast, 200ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  :host([show-input]) .skill-slider__input:focus {
    border-color: var(--skill-primary-500, #0A59F7);
    box-shadow: 0 0 0 2px rgba(10, 89, 247, 0.1);
  }

  /* Õîæ° */
  @media (max-width: 768px) {
    :host([responsive]) .skill-slider {
      --slider-height: var(--skill-component-height-sm, 40px);
      --handle-size: 24px;
      --labels-font-size: 9px;
    }

    :host([responsive]) .skill-slider__tooltip {
      font-size: 9px;
    }
  }

  /* ÿ˘‘¶!/ */
  @media (prefers-contrast: high) {
    .skill-slider__track {
      border: 1px solid var(--skill-gray-500, #8A8A8A);
    }

    .skill-slider__handle {
      border-width: 3px;
    }

    .skill-slider__mark {
      width: 3px;
      height: 3px;
    }
  }

  /* œ®;!/ */
  @media (prefers-reduced-motion: reduce) {
    .skill-slider__track-fill,
    .skill-slider__handle,
    .skill-slider__tooltip {
      transition: none;
    }
  }

  /* ÍöICSSÿœ/ */
  .skill-slider {
    --slider-height: var(--skill-component-height-sm, 32px);
    --slider-width: 200px;
    --track-height: 6px;
    --track-radius: var(--skill-radius-full, 9999px);
    --track-bg: var(--skill-gray-200, #E5E8EB);
    --track-fill-bg: var(--skill-primary-500, #0A59F7);
    --track-fill-transition: width var(--slider-duration, var(--skill-duration-fast, 200ms)) var(--slider-ease, var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1)));
    --handle-size: 20px;
    --handle-radius: var(--skill-radius-full, 9999px);
    --handle-bg: var(--skill-white, #FFFFFF);
    --handle-border-width: 2px;
    --handle-border-color: var(--skill-primary-500, #0A59F7);
    --handle-shadow: var(--skill-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)));
    --handle-hover-shadow: var(--skill-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)));
    --handle-active-shadow: var(--skill-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)));
    --handle-hover-scale: 1.1;
    --handle-active-scale: 1.2;
    --handle-transition: var(--skill-duration-fast, 200ms);
    --marks-offset: 12px;
    --mark-size: 2px;
    --mark-bg: var(--skill-gray-400, #BDBDBD);
    --mark-active-bg: var(--skill-primary-500, #0A59F7);
    --labels-offset: 28px;
    --labels-font-size: var(--skill-font-size-caption, 10px);
    --labels-color: var(--skill-gray-500, #8A8A8A);
    --tooltip-offset: 8px;
    --tooltip-bg: var(--skill-gray-900, #1A1A1A);
    --tooltip-color: var(--skill-white, #FFFFFF);
    --tooltip-padding: var(--skill-spacing-xs, 8px);
    --tooltip-radius: var(--skill-radius-base, 4px);
    --tooltip-font-size: var(--skill-font-size-caption, 10px);
    --tooltip-font-weight: var(--skill-font-weight-medium, 500);
    --tooltip-arrow-size: 4px;
    --slider-duration: var(--skill-duration-fast, 200ms);
    --slider-ease: var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }
`;