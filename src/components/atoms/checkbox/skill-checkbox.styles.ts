import { css } from 'lit';

/**
 * Skill Checkbox 组件样式
 */
export const checkboxStyles = css`
  :host {
    display: inline-block;
    --skill-checkbox-size: var(--skill-component-size-md, 20px);
    --skill-checkbox-border-width: var(--skill-border-width-md, 2px);
    --skill-checkbox-border-radius: var(--skill-border-radius-sm, 4px);
    --skill-checkbox-transition: var(--skill-transition-fast, 0.2s);
    --skill-checkbox-stroke-width: var(--skill-stroke-width-md, 2px);

    /* Color variables */
    --skill-checkbox-bg-color: var(--skill-gray-0, #ffffff);
    --skill-checkbox-border-color: var(--skill-gray-200, #E5E8EB);
    --skill-checkbox-border-color-hover: var(--skill-primary-600, #0047D3);
    --skill-checkbox-border-color-focus: var(--skill-primary-500, #0A59F7);
    --skill-checkbox-border-color-checked: var(--skill-primary-500, #0A59F7);
    --skill-checkbox-check-color: var(--skill-gray-0, #ffffff);
    --skill-checkbox-disabled-bg-color: var(--skill-gray-50, #FAFAFA);
    --skill-checkbox-disabled-border-color: var(--skill-gray-300, #D1D5DB);
    --skill-checkbox-disabled-check-color: var(--skill-gray-400, #BDBDBD);
    --skill-checkbox-error-border-color: var(--skill-error-500, #FA2A2D);

    /* Label colors */
    --skill-checkbox-label-color: var(--skill-gray-900, #1A1A1A);
    --skill-checkbox-label-color-disabled: var(--skill-gray-500, #8A8A8A);

    /* Helper text colors */
    --skill-checkbox-helper-text-color: var(--skill-gray-600, #6B7280);
    --skill-checkbox-error-text-color: var(--skill-error-500, #FA2A2D);
  }

  /* Size variants */
  :host([size='xs']) {
    --skill-checkbox-size: var(--skill-component-size-xs, 14px);
    --skill-checkbox-stroke-width: var(--skill-stroke-width-sm, 1.5px);
  }

  :host([size='sm']) {
    --skill-checkbox-size: var(--skill-component-size-sm, 16px);
    --skill-checkbox-stroke-width: var(--skill-stroke-width-sm, 1.5px);
  }

  :host([size='lg']) {
    --skill-checkbox-size: var(--skill-component-size-lg, 24px);
    --skill-checkbox-stroke-width: var(--skill-stroke-width-lg, 2.5px);
  }

  :host([size='xl']) {
    --skill-checkbox-size: var(--skill-component-size-xl, 28px);
    --skill-checkbox-stroke-width: var(--skill-stroke-width-lg, 2.5px);
  }

  /* Color variants */
  :host([color='primary']) {
    --skill-checkbox-border-color-hover: var(--skill-primary-600, #0047D3);
    --skill-checkbox-border-color-focus: var(--skill-primary-500, #0A59F7);
    --skill-checkbox-border-color-checked: var(--skill-primary-500, #0A59F7);
    --skill-checkbox-checked-bg-color: var(--skill-primary-500, #0A59F7);
  }

  :host([color='secondary']) {
    --skill-checkbox-border-color-hover: var(--skill-secondary-500, #00D4AA);
    --skill-checkbox-border-color-focus: var(--skill-secondary-500, #00D4AA);
    --skill-checkbox-border-color-checked: var(--skill-secondary-500, #00D4AA);
    --skill-checkbox-checked-bg-color: var(--skill-secondary-500, #00D4AA);
  }

  :host([color='success']) {
    --skill-checkbox-border-color-hover: var(--skill-success-500, #00D4AA);
    --skill-checkbox-border-color-focus: var(--skill-success-500, #00D4AA);
    --skill-checkbox-border-color-checked: var(--skill-success-500, #00D4AA);
    --skill-checkbox-checked-bg-color: var(--skill-success-500, #00D4AA);
  }

  :host([color='warning']) {
    --skill-checkbox-border-color-hover: var(--skill-warning-500, #FFB400);
    --skill-checkbox-border-color-focus: var(--skill-warning-500, #FFB400);
    --skill-checkbox-border-color-checked: var(--skill-warning-500, #FFB400);
    --skill-checkbox-checked-bg-color: var(--skill-warning-500, #FFB400);
  }

  :host([color='error']) {
    --skill-checkbox-border-color-hover: var(--skill-error-500, #FA2A2D);
    --skill-checkbox-border-color-focus: var(--skill-error-500, #FA2A2D);
    --skill-checkbox-border-color-checked: var(--skill-error-500, #FA2A2D);
    --skill-checkbox-checked-bg-color: var(--skill-error-500, #FA2A2D);
  }

  :host([color='info']) {
    --skill-checkbox-border-color-hover: var(--skill-info-500, #0A59F7);
    --skill-checkbox-border-color-focus: var(--skill-info-500, #0A59F7);
    --skill-checkbox-border-color-checked: var(--skill-info-500, #0A59F7);
    --skill-checkbox-checked-bg-color: var(--skill-info-500, #0A59F7);
  }

  /* Main checkbox container */
  .skill-checkbox {
    display: inline-flex;
    align-items: flex-start;
    gap: var(--skill-spacing-sm, 8px);
    cursor: pointer;
    user-select: none;
    position: relative;
    margin: 0;
    font-family: var(--skill-font-family, inherit);
    color: var(--skill-checkbox-label-color);
    transition: color var(--skill-checkbox-transition);
  }

  .skill-checkbox:disabled {
    cursor: not-allowed;
    color: var(--skill-checkbox-label-color-disabled);
  }

  .skill-checkbox:hover:not(:disabled) {
    color: var(--skill-checkbox-label-color);
  }

  /* Hidden input */
  .skill-checkbox__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    pointer-events: none;
  }

  .skill-checkbox__input:focus-visible + .skill-checkbox__control {
    box-shadow: 0 0 0 2px var(--skill-gray-0, #ffffff),
                0 0 0 4px var(--skill-checkbox-border-color-focus);
    outline: none;
  }

  :host([has-error]) .skill-checkbox__input:focus-visible + .skill-checkbox__control,
  :host([error]) .skill-checkbox__input:focus-visible + .skill-checkbox__control {
    box-shadow: 0 0 0 2px var(--skill-gray-0, #ffffff),
                0 0 0 4px var(--skill-checkbox-error-border-color);
  }

  /* Checkbox control */
  .skill-checkbox__control {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--skill-checkbox-size);
    height: var(--skill-checkbox-size);
    border: var(--skill-checkbox-border-width) solid var(--skill-checkbox-border-color);
    border-radius: var(--skill-checkbox-border-radius);
    background-color: var(--skill-checkbox-bg-color);
    transition: all var(--skill-checkbox-transition);
    flex-shrink: 0;
    margin-top: 2px; /* Align with text */
  }

  .skill-checkbox:hover:not(:disabled) .skill-checkbox__control {
    border-color: var(--skill-checkbox-border-color-hover);
  }

  :host([has-error]) .skill-checkbox__control,
  :host([error]) .skill-checkbox__control {
    border-color: var(--skill-checkbox-error-border-color);
  }

  :host(:disabled) .skill-checkbox__control {
    background-color: var(--skill-checkbox-disabled-bg-color);
    border-color: var(--skill-checkbox-disabled-border-color);
  }

  /* Checked state */
  :host([checked]) .skill-checkbox__control,
  :host([indeterminate]) .skill-checkbox__control {
    background-color: var(--skill-checkbox-checked-bg-color);
    border-color: var(--skill-checkbox-border-color-checked);
  }

  :host([checked]:disabled) .skill-checkbox__control,
  :host([indeterminate]:disabled) .skill-checkbox__control {
    background-color: var(--skill-checkbox-disabled-border-color);
    border-color: var(--skill-checkbox-disabled-border-color);
  }

  /* Variant styles */
  :host([variant='filled']:not([checked]):not([indeterminate])) .skill-checkbox__control {
    background-color: var(--skill-gray-50, #FAFAFA);
  }

  :host([variant='outlined']) .skill-checkbox__control {
    border-width: 3px;
  }

  /* Checkbox icons */
  .skill-checkbox__icon {
    position: absolute;
    width: calc(var(--skill-checkbox-size) * 0.6);
    height: calc(var(--skill-checkbox-size) * 0.6);
    opacity: 0;
    transform: scale(0.5);
    transition: all var(--skill-checkbox-transition);
    color: var(--skill-checkbox-check-color);
  }

  :host([checked]) .skill-checkbox__check,
  :host([indeterminate]) .skill-checkbox__indeterminate {
    opacity: 1;
    transform: scale(1);
  }

  :host(:disabled) .skill-checkbox__icon {
    color: var(--skill-checkbox-disabled-check-color);
  }

  /* Label */
  .skill-checkbox__label {
    font-size: var(--skill-font-body-3, 14px);
    line-height: var(--skill-line-height-md, 1.5);
    font-weight: var(--skill-font-normal, 400);
    color: inherit;
    flex: 1;
  }

  /* Helper text container */
  .skill-checkbox__helper {
    margin-top: var(--skill-spacing-xs, 4px);
    padding-left: calc(var(--skill-checkbox-size) + var(--skill-spacing-sm, 8px));
  }

  .skill-checkbox__helper-text {
    font-size: var(--skill-font-body-4, 12px);
    line-height: var(--skill-line-height-sm, 1.4);
    color: var(--skill-checkbox-helper-text-color);
    display: block;
  }

  .skill-checkbox__error {
    font-size: var(--skill-font-body-4, 12px);
    line-height: var(--skill-line-height-sm, 1.4);
    color: var(--skill-checkbox-error-text-color);
    display: block;
  }

  /* Animation for check mark */
  @keyframes checkmark {
    0% {
      opacity: 0;
      transform: scale(0.5) rotate(-45deg);
    }
    50% {
      transform: scale(1.2) rotate(10deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }

  :host([checked]) .skill-checkbox__check {
    animation: checkmark 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Indeterminate animation */
  @keyframes indeterminate {
    0% {
      opacity: 0;
      transform: scaleX(0);
    }
    100% {
      opacity: 1;
      transform: scaleX(1);
    }
  }

  :host([indeterminate]) .skill-checkbox__indeterminate {
    animation: indeterminate 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
  }

  /* Focus styles for high contrast mode */
  @media (prefers-contrast: high) {
    .skill-checkbox__control {
      border-width: 3px;
    }

    .skill-checkbox__input:focus-visible + .skill-checkbox__control {
      box-shadow: 0 0 0 2px var(--skill-white, #ffffff),
                  0 0 0 4px currentColor;
    }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .skill-checkbox,
    .skill-checkbox__control,
    .skill-checkbox__icon {
      transition: none;
    }

    :host([checked]) .skill-checkbox__check,
    :host([indeterminate]) .skill-checkbox__indeterminate {
      animation: none;
    }
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    :host {
      --skill-checkbox-bg-color: var(--skill-gray-900, #1A1A1A);
      --skill-checkbox-border-color: var(--skill-gray-600, #6B7280);
      --skill-checkbox-label-color: var(--skill-gray-200, #E5E8EB);
      --skill-checkbox-helper-text-color: var(--skill-gray-400, #BDBDBD);
      --skill-checkbox-disabled-bg-color: var(--skill-gray-950, #111827);
      --skill-checkbox-disabled-border-color: var(--skill-gray-700, #5A5A5A);
      --skill-checkbox-disabled-check-color: var(--skill-gray-500, #8A8A8A);
    }

    :host([variant='filled']:not([checked]):not([indeterminate])) .skill-checkbox__control {
      background-color: var(--skill-gray-700, #5A5A5A);
    }
  }
`;