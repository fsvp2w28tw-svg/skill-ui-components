import { css } from 'lit';

/**
 * Skill Radio 组件样式
 */
export const radioStyles = css`
  :host {
    display: inline-block;
    --skill-radio-size: var(--skill-component-size-md, 20px);
    --skill-radio-border-width: var(--skill-border-width-md, 2px);
    --skill-radio-transition: var(--skill-transition-fast, 0.2s);
    --skill-radio-check-size: var(--skill-component-size-sm, 12px);

    /* Color variables */
    --skill-radio-bg-color: var(--skill-white, #ffffff);
    --skill-radio-border-color: var(--skill-gray-300, #e1e5e9);
    --skill-radio-border-color-hover: var(--skill-primary-600, #0056b3);
    --skill-radio-border-color-focus: var(--skill-primary-500, #0066cc);
    --skill-radio-border-color-checked: var(--skill-primary-500, #0066cc);
    --skill-radio-check-color: var(--skill-primary-500, #0066cc);
    --skill-radio-disabled-bg-color: var(--skill-gray-100, #f8f9fa);
    --skill-radio-disabled-border-color: var(--skill-gray-200, #dee2e6);
    --skill-radio-disabled-check-color: var(--skill-gray-400, #6c757d);
    --skill-radio-error-border-color: var(--skill-error-500, #dc3545);

    /* Label colors */
    --skill-radio-label-color: var(--skill-gray-900, #212529);
    --skill-radio-label-color-disabled: var(--skill-gray-500, #6c757d);

    /* Helper text colors */
    --skill-radio-helper-text-color: var(--skill-gray-600, #6c757d);
    --skill-radio-error-text-color: var(--skill-error-500, #dc3545);
  }

  /* Size variants */
  :host([size='xs']) {
    --skill-radio-size: var(--skill-component-size-xs, 14px);
    --skill-radio-check-size: var(--skill-component-size-xs, 8px);
  }

  :host([size='sm']) {
    --skill-radio-size: var(--skill-component-size-sm, 16px);
    --skill-radio-check-size: var(--skill-component-size-xs, 10px);
  }

  :host([size='lg']) {
    --skill-radio-size: var(--skill-component-size-lg, 24px);
    --skill-radio-check-size: var(--skill-component-size-md, 16px);
  }

  :host([size='xl']) {
    --skill-radio-size: var(--skill-component-size-xl, 28px);
    --skill-radio-check-size: var(--skill-component-size-lg, 18px);
  }

  /* Color variants */
  :host([color='primary']) {
    --skill-radio-border-color-hover: var(--skill-primary-600, #0056b3);
    --skill-radio-border-color-focus: var(--skill-primary-500, #0066cc);
    --skill-radio-border-color-checked: var(--skill-primary-500, #0066cc);
    --skill-radio-check-color: var(--skill-primary-500, #0066cc);
  }

  :host([color='secondary']) {
    --skill-radio-border-color-hover: var(--skill-gray-600, #5c636a);
    --skill-radio-border-color-focus: var(--skill-gray-500, #6c757d);
    --skill-radio-border-color-checked: var(--skill-gray-500, #6c757d);
    --skill-radio-check-color: var(--skill-gray-500, #6c757d);
  }

  :host([color='success']) {
    --skill-radio-border-color-hover: var(--skill-success-600, #218838);
    --skill-radio-border-color-focus: var(--skill-success-500, #28a745);
    --skill-radio-border-color-checked: var(--skill-success-500, #28a745);
    --skill-radio-check-color: var(--skill-success-500, #28a745);
  }

  :host([color='warning']) {
    --skill-radio-border-color-hover: var(--skill-warning-600, #e0a800);
    --skill-radio-border-color-focus: var(--skill-warning-500, #ffc107);
    --skill-radio-border-color-checked: var(--skill-warning-500, #ffc107);
    --skill-radio-check-color: var(--skill-warning-500, #ffc107);
  }

  :host([color='error']) {
    --skill-radio-border-color-hover: var(--skill-error-600, #c82333);
    --skill-radio-border-color-focus: var(--skill-error-500, #dc3545);
    --skill-radio-border-color-checked: var(--skill-error-500, #dc3545);
    --skill-radio-check-color: var(--skill-error-500, #dc3545);
  }

  :host([color='info']) {
    --skill-radio-border-color-hover: var(--skill-info-600, #138496);
    --skill-radio-border-color-focus: var(--skill-info-500, #17a2b8);
    --skill-radio-border-color-checked: var(--skill-info-500, #17a2b8);
    --skill-radio-check-color: var(--skill-info-500, #17a2b8);
  }

  /* Main radio container */
  .skill-radio {
    display: inline-flex;
    align-items: flex-start;
    gap: var(--skill-spacing-sm, 8px);
    cursor: pointer;
    user-select: none;
    position: relative;
    margin: 0;
    font-family: var(--skill-font-family, inherit);
    color: var(--skill-radio-label-color);
    transition: color var(--skill-radio-transition);
  }

  .skill-radio:disabled {
    cursor: not-allowed;
    color: var(--skill-radio-label-color-disabled);
  }

  .skill-radio:hover:not(:disabled) {
    color: var(--skill-radio-label-color);
  }

  /* Hidden input */
  .skill-radio__input {
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

  .skill-radio__input:focus-visible + .skill-radio__control {
    box-shadow: 0 0 0 2px var(--skill-white, #ffffff),
                0 0 0 4px var(--skill-radio-border-color-focus);
    outline: none;
  }

  :host([has-error]) .skill-radio__input:focus-visible + .skill-radio__control,
  :host([error]) .skill-radio__input:focus-visible + .skill-radio__control {
    box-shadow: 0 0 0 2px var(--skill-white, #ffffff),
                0 0 0 4px var(--skill-radio-error-border-color);
  }

  /* Radio control */
  .skill-radio__control {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--skill-radio-size);
    height: var(--skill-radio-size);
    border: var(--skill-radio-border-width) solid var(--skill-radio-border-color);
    border-radius: 50%; /* Circle for radio */
    background-color: var(--skill-radio-bg-color);
    transition: all var(--skill-radio-transition);
    flex-shrink: 0;
    margin-top: 2px; /* Align with text */
  }

  .skill-radio:hover:not(:disabled) .skill-radio__control {
    border-color: var(--skill-radio-border-color-hover);
  }

  :host([has-error]) .skill-radio__control,
  :host([error]) .skill-radio__control {
    border-color: var(--skill-radio-error-border-color);
  }

  :host(:disabled) .skill-radio__control {
    background-color: var(--skill-radio-disabled-bg-color);
    border-color: var(--skill-radio-disabled-border-color);
  }

  /* Checked state */
  :host([checked]) .skill-radio__control {
    border-color: var(--skill-radio-border-color-checked);
  }

  :host([checked]:disabled) .skill-radio__control {
    background-color: var(--skill-radio-disabled-bg-color);
    border-color: var(--skill-radio-disabled-border-color);
  }

  /* Variant styles */
  :host([variant='filled']) .skill-radio__control {
    background-color: var(--skill-gray-50, #f8f9fa);
  }

  :host([variant='outlined']) .skill-radio__control {
    border-width: var(--skill-border-width-lg, 3px);
  }

  /* Radio check indicator */
  .skill-radio__check {
    width: var(--skill-radio-check-size);
    height: var(--skill-radio-check-size);
    border-radius: 50%;
    background-color: var(--skill-radio-check-color);
    opacity: 0;
    transform: scale(0);
    transition: all var(--skill-radio-transition);
  }

  :host([checked]) .skill-radio__check {
    opacity: 1;
    transform: scale(1);
  }

  :host(:disabled) .skill-radio__check {
    background-color: var(--skill-radio-disabled-check-color);
  }

  /* Label */
  .skill-radio__label {
    font-size: var(--skill-font-body-3, 14px);
    line-height: var(--skill-line-height-md, 1.5);
    font-weight: var(--skill-font-normal, 400);
    color: inherit;
    flex: 1;
  }

  /* Helper text container */
  .skill-radio__helper {
    margin-top: var(--skill-spacing-xs, 4px);
    padding-left: calc(var(--skill-radio-size) + var(--skill-spacing-sm, 8px));
  }

  .skill-radio__helper-text {
    font-size: var(--skill-font-body-4, 12px);
    line-height: var(--skill-line-height-sm, 1.4);
    color: var(--skill-radio-helper-text-color);
    display: block;
  }

  .skill-radio__error {
    font-size: var(--skill-font-body-4, 12px);
    line-height: var(--skill-line-height-sm, 1.4);
    color: var(--skill-radio-error-text-color);
    display: block;
  }

  /* Animation for radio check */
  @keyframes radioCheck {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  :host([checked]) .skill-radio__check {
    animation: radioCheck 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Focus styles for high contrast mode */
  @media (prefers-contrast: high) {
    .skill-radio__control {
      border-width: 3px;
    }

    .skill-radio__input:focus-visible + .skill-radio__control {
      box-shadow: 0 0 0 2px var(--skill-white, #ffffff),
                  0 0 0 4px currentColor;
    }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .skill-radio,
    .skill-radio__control,
    .skill-radio__check {
      transition: none;
    }

    :host([checked]) .skill-radio__check {
      animation: none;
    }
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    :host {
      --skill-radio-bg-color: var(--skill-gray-800, #1a1a1a);
      --skill-radio-border-color: var(--skill-gray-600, #6c757d);
      --skill-radio-label-color: var(--skill-gray-200, #e9ecef);
      --skill-radio-helper-text-color: var(--skill-gray-400, #adb5bd);
      --skill-radio-disabled-bg-color: var(--skill-gray-900, #212529);
      --skill-radio-disabled-border-color: var(--skill-gray-700, #495057);
      --skill-radio-disabled-check-color: var(--skill-gray-500, #6c757d);
    }

    :host([variant='filled']) .skill-radio__control {
      background-color: var(--skill-gray-700, #495057);
    }
  }
`;