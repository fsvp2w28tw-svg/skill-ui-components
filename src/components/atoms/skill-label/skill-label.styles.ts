import { css } from 'lit';

export const labelStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    position: relative;
    vertical-align: middle;
  }

  .skill-label {
    display: inline-flex;
    align-items: center;
    gap: var(--label-spacing, var(--skill-spacing-xs, 8px));
    padding: var(--label-padding-y, var(--skill-spacing-xs, 8px)) var(--label-padding-x, var(--skill-spacing-sm, 12px));
    background: var(--label-bg, var(--skill-gray-100, #F1F3F5));
    color: var(--label-color, var(--skill-gray-700, #5A5A5A));
    border: var(--label-border-width, 1px) solid var(--label-border-color, var(--skill-gray-300, #D1D5DB));
    border-radius: var(--label-radius, var(--skill-radius-full, 9999px));
    font-size: var(--label-font-size, var(--skill-font-size-body-3, 12px));
    font-weight: var(--label-font-weight, var(--skill-font-weight-medium, 500));
    line-height: var(--label-line-height, 1.2);
    white-space: nowrap;
    text-align: center;
    transition: all var(--label-duration, var(--skill-duration-fast, 200ms)) var(--label-ease, var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1)));
    box-sizing: border-box;
    cursor: default;
    outline: none;
    position: relative;
    overflow: hidden;
    max-width: var(--label-max-width, none);
    min-width: var(--label-min-width, auto);
    min-height: var(--label-min-height, auto);
  }

  .skill-label:focus-visible {
    outline: 2px solid var(--skill-primary-500, #0A59F7);
    outline-offset: 2px;
  }

  .skill-label__content {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    flex: 1;
  }

  /* Mode-specific styles */
  :host([mode='badge']) .skill-label {
    justify-content: center;
    min-width: var(--label-min-width, 20px);
    min-height: var(--label-min-height, 20px);
  }

  :host([mode='tag']) .skill-label {
    cursor: default;
    user-select: none;
  }

  :host([mode='chip']) .skill-label {
    user-select: none;
    padding: var(--label-padding-y, var(--skill-spacing-xs, 8px)) var(--label-padding-x, var(--skill-spacing-sm, 12px));
  }

  /* Size variants */
  :host([size='xs']) .skill-label {
    --label-padding-y: var(--skill-spacing-2xs, 4px);
    --label-padding-x: var(--skill-spacing-xs, 8px);
    --label-font-size: 8px;
    --label-spacing: var(--skill-spacing-2xs, 4px);
    --label-min-width: 16px;
    --label-min-height: 16px;
  }

  :host([size='sm']) .skill-label {
    --label-padding-y: var(--skill-spacing-2xs, 4px);
    --label-padding-x: var(--skill-spacing-xs, 8px);
    --label-font-size: var(--skill-font-size-caption, 10px);
    --label-spacing: var(--skill-spacing-2xs, 4px);
    --label-min-width: 18px;
    --label-min-height: 18px;
  }

  :host([size='md']) .skill-label {
    --label-padding-y: var(--skill-spacing-xs, 8px);
    --label-padding-x: var(--skill-spacing-sm, 12px);
    --label-font-size: var(--skill-font-size-body-3, 12px);
    --label-spacing: var(--skill-spacing-2xs, 4px);
    --label-min-width: 24px;
    --label-min-height: 24px;
  }

  :host([size='lg']) .skill-label {
    --label-padding-y: var(--skill-spacing-sm, 12px);
    --label-padding-x: var(--skill-spacing-md, 16px);
    --label-font-size: var(--skill-font-size-body-2, 14px);
    --label-spacing: var(--skill-spacing-xs, 8px);
    --label-min-width: 32px;
    --label-min-height: 32px;
  }

  :host([size='xl']) .skill-label {
    --label-padding-y: var(--skill-spacing-md, 16px);
    --label-padding-x: var(--skill-spacing-lg, 20px);
    --label-font-size: var(--skill-font-size-body-1, 16px);
    --label-spacing: var(--skill-spacing-sm, 12px);
    --label-min-width: 40px;
    --label-min-height: 40px;
  }

  /* Shape variants */
  :host([shape='square']) .skill-label {
    --label-radius: var(--skill-radius-xs, 2px);
  }

  :host([shape='rounded']) .skill-label {
    --label-radius: var(--skill-radius-sm, 4px);
  }

  :host([shape='pill']) .skill-label {
    --label-radius: var(--skill-radius-full, 9999px);
  }

  :host([shape='circle']) .skill-label {
    --label-radius: var(--skill-radius-full, 9999px);
    width: var(--label-size, var(--label-min-width, 20px));
    height: var(--label-size, var(--label-min-height, 20px));
    padding: 0;
  }

  :host([shape='circle'][size='xs']) .skill-label {
    --label-size: 16px;
  }

  :host([shape='circle'][size='sm']) .skill-label {
    --label-size: 18px;
  }

  :host([shape='circle'][size='md']) .skill-label {
    --label-size: 24px;
  }

  :host([shape='circle'][size='lg']) .skill-label {
    --label-size: 32px;
  }

  :host([shape='circle'][size='xl']) .skill-label {
    --label-size: 40px;
  }

  :host([shape='dot']) .skill-label {
    width: var(--dot-size, 8px);
    height: var(--dot-size, 8px);
    min-width: var(--dot-size, 8px);
    min-height: var(--dot-size, 8px);
    padding: 0;
    border-radius: var(--skill-radius-full, 9999px);
  }

  :host([shape='dot'][size='xs']) .skill-label {
    --dot-size: 6px;
  }

  :host([shape='dot'][size='sm']) .skill-label {
    --dot-size: 8px;
  }

  :host([shape='dot'][size='md']) .skill-label {
    --dot-size: 10px;
  }

  :host([shape='dot'][size='lg']) .skill-label {
    --dot-size: 12px;
  }

  :host([shape='dot'][size='xl']) .skill-label {
    --dot-size: 14px;
  }

  /* Color variants - Default (Badge mode uses solid colors, Tag/Chip use light backgrounds) */
  :host([color='primary']) .skill-label {
    --label-bg: var(--skill-primary-500, #0A59F7);
    --label-color: var(--skill-white, #FFFFFF);
    --label-border-color: var(--skill-primary-500, #0A59F7);
  }

  :host([color='primary'][mode='tag']) .skill-label,
  :host([color='primary'][mode='chip']) .skill-label {
    --label-bg: var(--skill-primary-50, #EFF6FF);
    --label-color: var(--skill-primary-700, #1D4ED8);
    --label-border-color: var(--skill-primary-200, #BFDBFE);
  }

  :host([color='secondary']) .skill-label {
    --label-bg: var(--skill-secondary-500, #00D4AA);
    --label-color: var(--skill-white, #FFFFFF);
    --label-border-color: var(--skill-secondary-500, #00D4AA);
  }

  :host([color='secondary'][mode='tag']) .skill-label,
  :host([color='secondary'][mode='chip']) .skill-label {
    --label-bg: var(--skill-secondary-50, #F0FDFA);
    --label-color: var(--skill-secondary-700, #0F766E);
    --label-border-color: var(--skill-secondary-200, #A7F3D0);
  }

  :host([color='success']) .skill-label {
    --label-bg: var(--skill-success-500, #00D4AA);
    --label-color: var(--skill-white, #FFFFFF);
    --label-border-color: var(--skill-success-500, #00D4AA);
  }

  :host([color='success'][mode='tag']) .skill-label,
  :host([color='success'][mode='chip']) .skill-label {
    --label-bg: var(--skill-success-50, #F0FDF4);
    --label-color: var(--skill-success-700, #15803D);
    --label-border-color: var(--skill-success-200, #BBF7D0);
  }

  :host([color='warning']) .skill-label {
    --label-bg: var(--skill-warning-500, #FFB400);
    --label-color: var(--skill-white, #FFFFFF);
    --label-border-color: var(--skill-warning-500, #FFB400);
  }

  :host([color='warning'][mode='tag']) .skill-label,
  :host([color='warning'][mode='chip']) .skill-label {
    --label-bg: var(--skill-warning-50, #FFFBEB);
    --label-color: var(--skill-warning-700, #A16207);
    --label-border-color: var(--skill-warning-200, #FED7AA);
  }

  :host([color='error']) .skill-label {
    --label-bg: var(--skill-error-500, #FA2A2D);
    --label-color: var(--skill-white, #FFFFFF);
    --label-border-color: var(--skill-error-500, #FA2A2D);
  }

  :host([color='error'][mode='tag']) .skill-label,
  :host([color='error'][mode='chip']) .skill-label {
    --label-bg: var(--skill-error-50, #FEF2F2);
    --label-color: var(--skill-error-700, #B91C1C);
    --label-border-color: var(--skill-error-200, #FECACA);
  }

  :host([color='info']) .skill-label {
    --label-bg: var(--skill-info-500, #0A59F7);
    --label-color: var(--skill-white, #FFFFFF);
    --label-border-color: var(--skill-info-500, #0A59F7);
  }

  :host([color='info'][mode='tag']) .skill-label,
  :host([color='info'][mode='chip']) .skill-label {
    --label-bg: var(--skill-info-50, #EFF6FF);
    --label-color: var(--skill-info-700, #0369A1);
    --label-border-color: var(--skill-info-200, #BAE6FD);
  }

  :host([color='gray']) .skill-label {
    --label-bg: var(--skill-gray-500, #8A8A8A);
    --label-color: var(--skill-white, #FFFFFF);
    --label-border-color: var(--skill-gray-500, #8A8A8A);
  }

  :host([color='gray'][mode='tag']) .skill-label,
  :host([color='gray'][mode='chip']) .skill-label {
    --label-bg: var(--skill-gray-50, #F9FAFB);
    --label-color: var(--skill-gray-700, #374151);
    --label-border-color: var(--skill-gray-200, #E5E7EB);
  }

  /* Variant styles */
  :host([variant='light']) .skill-label {
    --label-bg: var(--skill-gray-100, #F1F3F5);
    --label-color: var(--skill-gray-700, #5A5A5A);
    --label-border-color: var(--skill-gray-200, #E5E7EB);
  }

  :host([variant='light'][color='primary']) .skill-label {
    --label-bg: var(--skill-primary-100, #E6F0FF);
    --label-color: var(--skill-primary-700, #0036A0);
  }

  :host([variant='light'][color='secondary']) .skill-label {
    --label-bg: var(--skill-secondary-100, #E6FBF5);
    --label-color: var(--skill-secondary-700, #006B5D);
  }

  :host([variant='light'][color='success']) .skill-label {
    --label-bg: var(--skill-success-100, #E6FBF5);
    --label-color: var(--skill-success-700, #006B5D);
  }

  :host([variant='light'][color='warning']) .skill-label {
    --label-bg: var(--skill-warning-100, #FFF8E6);
    --label-color: var(--skill-warning-700, #8B5A00);
  }

  :host([variant='light'][color='error']) .skill-label {
    --label-bg: var(--skill-error-100, #FEE6E7);
    --label-color: var(--skill-error-700, #8B1E1F);
  }

  :host([variant='light'][color='info']) .skill-label {
    --label-bg: var(--skill-info-100, #E6F0FF);
    --label-color: var(--skill-info-700, #0036A0);
  }

  :host([variant='outline']) .skill-label {
    --label-bg: transparent;
    --label-border-width: 1.5px;
  }

  :host([variant='outline'][color='primary']) .skill-label {
    --label-color: var(--skill-primary-600, #2563EB);
    --label-border-color: var(--skill-primary-600, #2563EB);
  }

  :host([variant='outline'][color='secondary']) .skill-label {
    --label-color: var(--skill-secondary-600, #0D9488);
    --label-border-color: var(--skill-secondary-600, #0D9488);
  }

  :host([variant='outline'][color='success']) .skill-label {
    --label-color: var(--skill-success-600, #16A34A);
    --label-border-color: var(--skill-success-600, #16A34A);
  }

  :host([variant='outline'][color='warning']) .skill-label {
    --label-color: var(--skill-warning-600, #CA8A04);
    --label-border-color: var(--skill-warning-600, #CA8A04);
  }

  :host([variant='outline'][color='error']) .skill-label {
    --label-color: var(--skill-error-600, #DC2626);
    --label-border-color: var(--skill-error-600, #DC2626);
  }

  :host([variant='outline'][color='info']) .skill-label {
    --label-color: var(--skill-info-600, #0284C7);
    --label-border-color: var(--skill-info-600, #0284C7);
  }

  :host([variant='text']) .skill-label {
    --label-bg: transparent;
    --label-border-width: 0;
    --label-padding-y: 0;
    --label-padding-x: 0;
    --label-radius: 0;
  }

  :host([variant='text'][color='primary']) .skill-label {
    --label-color: var(--skill-primary-600, #2563EB);
  }

  :host([variant='text'][color='secondary']) .skill-label {
    --label-color: var(--skill-secondary-600, #0D9488);
  }

  :host([variant='text'][color='success']) .skill-label {
    --label-color: var(--skill-success-600, #16A34A);
  }

  :host([variant='text'][color='warning']) .skill-label {
    --label-color: var(--skill-warning-600, #CA8A04);
  }

  :host([variant='text'][color='error']) .skill-label {
    --label-color: var(--skill-error-600, #DC2626);
  }

  :host([variant='text'][color='info']) .skill-label {
    --label-color: var(--skill-info-600, #0284C7);
  }

  :host([variant='filled']) .skill-label {
    --label-border-width: 0;
  }

  :host([variant='filled'][color='primary']) .skill-label {
    --label-bg: var(--skill-primary-500, #0A59F7);
    --label-color: var(--skill-white, #FFFFFF);
  }

  :host([variant='filled'][color='secondary']) .skill-label {
    --label-bg: var(--skill-secondary-500, #00D4AA);
    --label-color: var(--skill-white, #FFFFFF);
  }

  :host([variant='filled'][color='success']) .skill-label {
    --label-bg: var(--skill-success-500, #00D4AA);
    --label-color: var(--skill-white, #FFFFFF);
  }

  :host([variant='filled'][color='warning']) .skill-label {
    --label-bg: var(--skill-warning-500, #FFB400);
    --label-color: var(--skill-white, #FFFFFF);
  }

  :host([variant='filled'][color='error']) .skill-label {
    --label-bg: var(--skill-error-500, #FA2A2D);
    --label-color: var(--skill-white, #FFFFFF);
  }

  :host([variant='filled'][color='info']) .skill-label {
    --label-bg: var(--skill-info-500, #0A59F7);
    --label-color: var(--skill-white, #FFFFFF);
  }

  :host([variant='soft']) .skill-label {
    --label-border-width: 0;
    opacity: 0.8;
  }

  /* Interactive states */
  :host([clickable]) .skill-label {
    cursor: pointer;
  }

  :host([clickable]) .skill-label:hover {
    transform: translateY(-1px);
    box-shadow: var(--skill-shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05));
  }

  :host([clickable]) .skill-label:active {
    transform: translateY(0);
    box-shadow: none;
  }

  :host([clickable][mode='tag']) .skill-label:hover {
    transform: none;
  }

  :host([clickable][mode='tag']) .skill-label:hover {
    background: var(--label-hover-bg, var(--skill-gray-50, #F9FAFB));
    border-color: var(--label-hover-border-color, var(--skill-gray-300, #D1D5DB));
  }

  :host([clickable][mode='tag'][color='primary']) .skill-label:hover {
    background: var(--skill-primary-100, #DBEAFE);
    border-color: var(--skill-primary-300, #93C5FD);
  }

  :host([clickable][mode='tag'][color='secondary']) .skill-label:hover {
    background: var(--skill-secondary-100, #CCFBF1);
    border-color: var(--skill-secondary-300, #6EE7B7);
  }

  :host([clickable][mode='tag'][color='success']) .skill-label:hover {
    background: var(--skill-success-100, #DCFCE7);
    border-color: var(--skill-success-300, #86EFAC);
  }

  :host([clickable][mode='tag'][color='warning']) .skill-label:hover {
    background: var(--skill-warning-100, #FEF3C7);
    border-color: var(--skill-warning-300, #FCD34D);
  }

  :host([clickable][mode='tag'][color='error']) .skill-label:hover {
    background: var(--skill-error-100, #FEE2E2);
    border-color: var(--skill-error-300, #FCA5A5);
  }

  :host([clickable][mode='tag'][color='info']) .skill-label:hover {
    background: var(--skill-info-100, #DBEAFE);
    border-color: var(--skill-info-300, #7DD3FC);
  }

  /* Active/Selected states */
  :host([active]) .skill-label,
  :host([selected]) .skill-label {
    --label-bg: var(--skill-primary-500, #0A59F7);
    --label-color: var(--skill-white, #FFFFFF);
    --label-border-color: var(--skill-primary-500, #0A59F7);
    box-shadow: var(--skill-shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05));
  }

  :host([active][color='secondary']) .skill-label,
  :host([selected][color='secondary']) .skill-label {
    --label-bg: var(--skill-secondary-500, #00D4AA);
    --label-border-color: var(--skill-secondary-500, #00D4AA);
  }

  :host([active][color='success']) .skill-label,
  :host([selected][color='success']) .skill-label {
    --label-bg: var(--skill-success-500, #00D4AA);
    --label-border-color: var(--skill-success-500, #00D4AA);
  }

  :host([active][color='warning']) .skill-label,
  :host([selected][color='warning']) .skill-label {
    --label-bg: var(--skill-warning-500, #FFB400);
    --label-border-color: var(--skill-warning-500, #FFB400);
  }

  :host([active][color='error']) .skill-label,
  :host([selected][color='error']) .skill-label {
    --label-bg: var(--skill-error-500, #FA2A2D);
    --label-border-color: var(--skill-error-500, #FA2A2D);
  }

  :host([active][color='info']) .skill-label,
  :host([selected][color='info']) .skill-label {
    --label-bg: var(--skill-info-500, #0A59F7);
    --label-border-color: var(--skill-info-500, #0A59F7);
  }

  /* Disabled state */
  :host([disabled]) .skill-label {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Counter font (Badge mode) */
  :host([counter]) .skill-label {
    font-family: var(--skill-font-family-mono, 'JetBrains Mono', 'SF Mono', Consolas, monospace);
    font-variant-numeric: tabular-nums;
  }

  /* Pulse animation (Badge mode) */
  :host([pulse]) .skill-label {
    position: relative;
  }

  :host([pulse]) .skill-label::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background: inherit;
    animation: label-pulse 2s infinite;
    z-index: -1;
  }

  @keyframes label-pulse {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.3;
      transform: scale(1.3);
    }
    100% {
      opacity: 0;
      transform: scale(1.5);
    }
  }

  /* Close button (Tag mode) */
  .skill-label__close {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    padding: 0;
    margin: 0 calc(var(--skill-spacing-2xs, 4px) * -1);
    color: var(--label-close-color, currentColor);
    opacity: 0.6;
    cursor: pointer;
    border-radius: var(--skill-radius-full, 9999px);
    transition: all var(--skill-duration-fast, 200ms);
    font-size: 1em;
    width: 1.2em;
    height: 1.2em;
    flex-shrink: 0;
  }

  .skill-label__close:hover {
    opacity: 1;
    background: var(--label-close-hover-bg, rgba(0, 0, 0, 0.1));
  }

  .skill-label__close:focus-visible {
    outline: 2px solid var(--skill-primary-500, #0A59F7);
    outline-offset: 1px;
    opacity: 1;
  }

  /* Remove button (Chip mode) */
  .skill-label__remove {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--remove-size, 16px);
    height: var(--remove-size, 16px);
    border-radius: var(--remove-radius, var(--skill-radius-full, 9999px));
    background: var(--remove-bg, rgba(0, 0, 0, 0.1));
    color: var(--remove-color, currentColor);
    border: none;
    cursor: pointer;
    transition: all var(--skill-duration-fast, 200ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
    font-size: 10px;
    line-height: 1;
    flex-shrink: 0;
  }

  .skill-label__remove:hover {
    --remove-bg: rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
  }

  .skill-label__remove:active {
    transform: scale(0.95);
  }

  :host([color='primary']) .skill-label__remove {
    --remove-bg: rgba(255, 255, 255, 0.2);
    --remove-color: var(--skill-white, #FFFFFF);
  }

  :host([color='primary'][variant='outline']) .skill-label__remove {
    --remove-bg: var(--skill-primary-100, #E6F0FF);
    --remove-color: var(--skill-primary-600, #0047D3);
  }

  :host([selected]) .skill-label__remove {
    --remove-bg: rgba(255, 255, 255, 0.2);
    --remove-color: var(--skill-white, #FFFFFF);
  }

  /* Size-specific remove button */
  :host([size='xs']) .skill-label__remove,
  :host([size='xs']) .skill-label__close {
    --remove-size: 12px;
    font-size: 8px;
  }

  :host([size='sm']) .skill-label__remove,
  :host([size='sm']) .skill-label__close {
    --remove-size: 14px;
    font-size: 9px;
  }

  :host([size='lg']) .skill-label__remove,
  :host([size='lg']) .skill-label__close {
    --remove-size: 18px;
    font-size: 11px;
  }

  :host([size='xl']) .skill-label__remove,
  :host([size='xl']) .skill-label__close {
    --remove-size: 20px;
    font-size: 12px;
  }

  /* Avatar (Chip mode) */
  .skill-label__avatar {
    width: var(--avatar-size, 20px);
    height: var(--avatar-size, 20px);
    border-radius: var(--avatar-radius, var(--skill-radius-full, 9999px));
    object-fit: cover;
    flex-shrink: 0;
  }

  :host([size='xs']) .skill-label__avatar {
    --avatar-size: 16px;
  }

  :host([size='sm']) .skill-label__avatar {
    --avatar-size: 18px;
  }

  :host([size='lg']) .skill-label__avatar {
    --avatar-size: 24px;
  }

  :host([size='xl']) .skill-label__avatar {
    --avatar-size: 28px;
  }

  /* Prefix and suffix */
  .skill-label__prefix,
  .skill-label__suffix {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }

  /* Badge (Chip mode) */
  .skill-label__badge {
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    background: var(--skill-error-500, #FA2A2D);
    color: var(--skill-white, #FFFFFF);
    border-radius: var(--skill-radius-full, 9999px);
    font-size: 10px;
    font-weight: var(--skill-font-weight-medium, 500);
    line-height: 16px;
    text-align: center;
    z-index: 1;
  }

  /* Ripple effect (Chip mode) */
  :host([clickable][ripple]) .skill-label {
    position: relative;
    overflow: hidden;
  }

  :host([clickable][ripple]) .skill-label::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  :host([clickable][ripple]) .skill-label.ripple::after {
    width: 200px;
    height: 200px;
  }

  /* Positioned badges (Badge mode) */
  :host([positioned]) {
    position: absolute;
    z-index: var(--label-z-index, 10);
  }

  :host([positioned][position='top-right']) {
    top: var(--label-offset-y, -8px);
    right: var(--label-offset-x, -8px);
  }

  :host([positioned][position='top-left']) {
    top: var(--label-offset-y, -8px);
    left: var(--label-offset-x, -8px);
  }

  :host([positioned][position='bottom-right']) {
    bottom: var(--label-offset-y, -8px);
    right: var(--label-offset-x, -8px);
  }

  :host([positioned][position='bottom-left']) {
    bottom: var(--label-offset-y, -8px);
    left: var(--label-offset-x, -8px);
  }

  :host([positioned][position='top-center']) {
    top: var(--label-offset-y, -8px);
    left: 50%;
    transform: translateX(-50%);
  }

  :host([positioned][position='bottom-center']) {
    bottom: var(--label-offset-y, -8px);
    left: 50%;
    transform: translateX(-50%);
  }

  /* Responsive design */
  @media (max-width: 768px) {
    :host([responsive]) .skill-label {
      --label-font-size: var(--skill-font-size-caption, 10px);
      --label-padding-y: var(--skill-spacing-2xs, 4px);
      --label-padding-x: var(--skill-spacing-xs, 8px);
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .skill-label {
      --label-border-width: 1px;
      font-weight: var(--skill-font-weight-semibold, 600);
    }

    .skill-label__close:focus-visible {
      outline-width: 3px;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .skill-label,
    .skill-label__close,
    .skill-label__remove,
    :host([clickable]) .skill-label {
      transition: none;
    }

    :host([clickable]) .skill-label:hover,
    .skill-label__close:hover,
    .skill-label__remove:hover {
      transform: none;
    }

    :host([pulse]) .skill-label::after,
    :host([clickable][ripple]) .skill-label::after {
      animation: none;
    }
  }

  /* Custom CSS variables defaults */
  .skill-label {
    --label-bg: var(--skill-gray-100, #F1F3F5);
    --label-color: var(--skill-gray-700, #5A5A5A);
    --label-border-color: var(--skill-gray-300, #D1D5DB);
    --label-border-width: 1px;
    --label-radius: var(--skill-radius-full, 9999px);
    --label-font-size: var(--skill-font-size-body-3, 12px);
    --label-font-weight: var(--skill-font-weight-medium, 500);
    --label-line-height: 1.2;
    --label-duration: var(--skill-duration-fast, 200ms);
    --label-ease: var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
    --label-spacing: var(--skill-spacing-xs, 8px);
    --label-padding-y: var(--skill-spacing-xs, 8px);
    --label-padding-x: var(--skill-spacing-sm, 12px);
    --label-min-width: auto;
    --label-min-height: auto;
    --label-max-width: none;
    --remove-size: 16px;
    --remove-radius: var(--skill-radius-full, 9999px);
    --remove-bg: rgba(0, 0, 0, 0.1);
    --remove-color: currentColor;
    --avatar-size: 20px;
    --avatar-radius: var(--skill-radius-full, 9999px);
    --dot-size: 8px;
    --label-offset-x: -8px;
    --label-offset-y: -8px;
    --label-z-index: 10;
  }
`;