import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
    --ui-checkbox-size: var(--ui-component-size-md, 20px);
    --ui-checkbox-border-width: var(--ui-border-width-md, 2px);
    --ui-checkbox-border-radius: var(--ui-border-radius-sm, 4px);
    --ui-checkbox-transition: var(--ui-transition-fast, 0.2s);
    --ui-checkbox-stroke-width: var(--ui-stroke-width-md, 2px);

    /* Color variables */
    --ui-checkbox-bg-color: var(--ui-color-surface-0, #ffffff);
    --ui-checkbox-border-color: var(--ui-color-border-primary, #e1e5e9);
    --ui-checkbox-border-color-hover: var(--ui-color-primary-hover, #0056b3);
    --ui-checkbox-border-color-focus: var(--ui-color-primary, #0066cc);
    --ui-checkbox-border-color-checked: var(--ui-color-primary, #0066cc);
    --ui-checkbox-check-color: var(--ui-color-surface-0, #ffffff);
    --ui-checkbox-disabled-bg-color: var(--ui-color-surface-100, #f8f9fa);
    --ui-checkbox-disabled-border-color: var(--ui-color-border-disabled, #dee2e6);
    --ui-checkbox-disabled-check-color: var(--ui-color-text-disabled, #6c757d);
    --ui-checkbox-error-border-color: var(--ui-color-error, #dc3545);

    /* Label colors */
    --ui-checkbox-label-color: var(--ui-color-text-primary, #212529);
    --ui-checkbox-label-color-disabled: var(--ui-color-text-disabled, #6c757d);

    /* Helper text colors */
    --ui-checkbox-helper-text-color: var(--ui-color-text-secondary, #6c757d);
    --ui-checkbox-error-text-color: var(--ui-color-error, #dc3545);
  }

  /* Size variants */
  :host([size='sm']) {
    --ui-checkbox-size: var(--ui-component-size-sm, 16px);
    --ui-checkbox-stroke-width: var(--ui-stroke-width-sm, 1.5px);
  }

  :host([size='lg']) {
    --ui-checkbox-size: var(--ui-component-size-lg, 24px);
    --ui-checkbox-stroke-width: var(--ui-stroke-width-lg, 2.5px);
  }

  /* Color variants */
  :host([color='primary']) {
    --ui-checkbox-border-color-hover: var(--ui-color-primary-hover, #0056b3);
    --ui-checkbox-border-color-focus: var(--ui-color-primary, #0066cc);
    --ui-checkbox-border-color-checked: var(--ui-color-primary, #0066cc);
    --ui-checkbox-checked-bg-color: var(--ui-color-primary, #0066cc);
  }

  :host([color='secondary']) {
    --ui-checkbox-border-color-hover: var(--ui-color-secondary-hover, #5c636a);
    --ui-checkbox-border-color-focus: var(--ui-color-secondary, #6c757d);
    --ui-checkbox-border-color-checked: var(--ui-color-secondary, #6c757d);
    --ui-checkbox-checked-bg-color: var(--ui-color-secondary, #6c757d);
  }

  :host([color='success']) {
    --ui-checkbox-border-color-hover: var(--ui-color-success-hover, #218838);
    --ui-checkbox-border-color-focus: var(--ui-color-success, #28a745);
    --ui-checkbox-border-color-checked: var(--ui-color-success, #28a745);
    --ui-checkbox-checked-bg-color: var(--ui-color-success, #28a745);
  }

  :host([color='warning']) {
    --ui-checkbox-border-color-hover: var(--ui-color-warning-hover, #e0a800);
    --ui-checkbox-border-color-focus: var(--ui-color-warning, #ffc107);
    --ui-checkbox-border-color-checked: var(--ui-color-warning, #ffc107);
    --ui-checkbox-checked-bg-color: var(--ui-color-warning, #ffc107);
  }

  :host([color='error']) {
    --ui-checkbox-border-color-hover: var(--ui-color-error-hover, #c82333);
    --ui-checkbox-border-color-focus: var(--ui-color-error, #dc3545);
    --ui-checkbox-border-color-checked: var(--ui-color-error, #dc3545);
    --ui-checkbox-checked-bg-color: var(--ui-color-error, #dc3545);
  }

  :host([color='info']) {
    --ui-checkbox-border-color-hover: var(--ui-color-info-hover, #138496);
    --ui-checkbox-border-color-focus: var(--ui-color-info, #17a2b8);
    --ui-checkbox-border-color-checked: var(--ui-color-info, #17a2b8);
    --ui-checkbox-checked-bg-color: var(--ui-color-info, #17a2b8);
  }

  /* Main checkbox container */
  .ui-checkbox {
    display: inline-flex;
    align-items: flex-start;
    gap: var(--ui-spacing-sm, 8px);
    cursor: pointer;
    user-select: none;
    position: relative;
    margin: 0;
    font-family: var(--ui-font-family-primary, inherit);
    color: var(--ui-checkbox-label-color);
    transition: color var(--ui-checkbox-transition);
  }

  .ui-checkbox--disabled {
    cursor: not-allowed;
    color: var(--ui-checkbox-label-color-disabled);
  }

  /* Hidden input */
  .ui-checkbox__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
  }

  .ui-checkbox__input:focus-visible + .ui-checkbox__control {
    box-shadow: 0 0 0 2px var(--ui-color-surface-0, #ffffff),
                0 0 0 4px var(--ui-checkbox-border-color-focus);
    outline: none;
  }

  .ui-checkbox__input--error:focus-visible + .ui-checkbox__control {
    box-shadow: 0 0 0 2px var(--ui-color-surface-0, #ffffff),
                0 0 0 4px var(--ui-checkbox-error-border-color);
  }

  /* Checkbox control */
  .ui-checkbox__control {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--ui-checkbox-size);
    height: var(--ui-checkbox-size);
    border: var(--ui-checkbox-border-width) solid var(--ui-checkbox-border-color);
    border-radius: var(--ui-checkbox-border-radius);
    background-color: var(--ui-checkbox-bg-color);
    transition: all var(--ui-checkbox-transition);
    flex-shrink: 0;
    margin-top: 2px; /* Align with text */
  }

  .ui-checkbox:hover:not(.ui-checkbox--disabled) .ui-checkbox__control {
    border-color: var(--ui-checkbox-border-color-hover);
  }

  .ui-checkbox--error .ui-checkbox__control {
    border-color: var(--ui-checkbox-error-border-color);
  }

  .ui-checkbox--disabled .ui-checkbox__control {
    background-color: var(--ui-checkbox-disabled-bg-color);
    border-color: var(--ui-checkbox-disabled-border-color);
  }

  /* Checked state */
  .ui-checkbox--checked .ui-checkbox__control,
  .ui-checkbox--indeterminate .ui-checkbox__control {
    background-color: var(--ui-checkbox-checked-bg-color);
    border-color: var(--ui-checkbox-border-color-checked);
  }

  .ui-checkbox--disabled.ui-checkbox--checked .ui-checkbox__control,
  .ui-checkbox--disabled.ui-checkbox--indeterminate .ui-checkbox__control {
    background-color: var(--ui-checkbox-disabled-border-color);
  }

  /* Checkbox icons */
  .ui-checkbox__icon {
    position: absolute;
    width: calc(var(--ui-checkbox-size) * 0.6);
    height: calc(var(--ui-checkbox-size) * 0.6);
    fill: var(--ui-checkbox-check-color);
    stroke: var(--ui-checkbox-check-color);
    stroke-width: var(--ui-checkbox-stroke-width);
    opacity: 0;
    transform: scale(0.5);
    transition: all var(--ui-checkbox-transition);
  }

  .ui-checkbox--checked .ui-checkbox__check,
  .ui-checkbox--indeterminate .ui-checkbox__indeterminate {
    opacity: 1;
    transform: scale(1);
  }

  .ui-checkbox--disabled .ui-checkbox__icon {
    fill: var(--ui-checkbox-disabled-check-color);
    stroke: var(--ui-checkbox-disabled-check-color);
  }

  /* Indeterminate state */
  .ui-checkbox__indeterminate rect {
    fill: currentColor;
  }

  /* Label */
  .ui-checkbox__label {
    font-size: var(--ui-font-size-md, 14px);
    line-height: var(--ui-line-height-md, 1.5);
    font-weight: var(--ui-font-weight-normal, 400);
    color: inherit;
  }

  /* Helper text container */
  .ui-checkbox__helper {
    margin-top: var(--ui-spacing-xs, 4px);
    padding-left: calc(var(--ui-checkbox-size) + var(--ui-spacing-sm, 8px));
  }

  .ui-checkbox__helper-text {
    font-size: var(--ui-font-size-sm, 12px);
    line-height: var(--ui-line-height-sm, 1.4);
    color: var(--ui-checkbox-helper-text-color);
    display: block;
  }

  .ui-checkbox__error {
    font-size: var(--ui-font-size-sm, 12px);
    line-height: var(--ui-line-height-sm, 1.4);
    color: var(--ui-checkbox-error-text-color);
    display: block;
  }

  /* Variant styles */
  .ui-checkbox--filled .ui-checkbox__control {
    background-color: var(--ui-color-surface-50, #f8f9fa);
  }

  .ui-checkbox--outlined .ui-checkbox__control {
    border-width: var(--ui-border-width-lg, 2px);
  }

  /* Animation for check mark */
  @keyframes checkmark {
    0% {
      stroke-dasharray: 0 100;
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dasharray: 100 100;
      stroke-dashoffset: 100;
    }
  }

  .ui-checkbox--checked .ui-checkbox__check path {
    stroke-dasharray: 100 100;
    stroke-dashoffset: 0;
    animation: checkmark 0.3s ease-in-out;
  }

  /* Focus styles for high contrast mode */
  @media (prefers-contrast: high) {
    .ui-checkbox__control {
      border-width: 3px;
    }

    .ui-checkbox__input:focus-visible + .ui-checkbox__control {
      box-shadow: 0 0 0 2px var(--ui-color-surface-0, #ffffff),
                  0 0 0 4px currentColor;
    }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .ui-checkbox,
    .ui-checkbox__control,
    .ui-checkbox__icon {
      transition: none;
    }

    .ui-checkbox--checked .ui-checkbox__check path {
      animation: none;
    }
  }
`;