import { css } from 'lit';

export const textareaStyles = css`
  :host {
    display: block;
    font-family: var(--font-sans);
  }

  .textarea-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1-5);
  }

  .textarea-label {
    display: block;
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-gray-700);
    margin-bottom: var(--spacing-1);
  }

  .textarea-container {
    position: relative;
    width: 100%;
  }

  textarea {
    display: block;
    width: 100%;
    padding: var(--spacing-3) var(--spacing-4);
    border: 1px solid var(--color-gray-200);
    border-radius: 0;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(4px);
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    font-weight: 400;
    line-height: 1.625;
    color: var(--color-gray-900);
    transition: all var(--duration-200) var(--ease-in-out);
    min-height: 80px;
  }

  textarea::placeholder {
    color: var(--color-gray-500);
  }

  textarea:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.9);
    border-color: var(--color-gray-300);
  }

  textarea:focus {
    outline: none;
    border-color: var(--color-primary-500);
    background-color: rgba(255, 255, 255, 1);
  }

  textarea:disabled {
    background-color: var(--color-gray-50);
    color: var(--color-gray-500);
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Variant: filled */
  .textarea-container.variant-filled textarea {
    background-color: var(--color-gray-100);
    border-color: transparent;
  }

  .textarea-container.variant-filled textarea:hover:not(:disabled) {
    background-color: var(--color-gray-200);
  }

  .textarea-container.variant-filled textarea:focus {
    background-color: var(--color-white);
    border-color: var(--color-primary-500);
  }

  /* Error state */
  .textarea-container.has-error textarea {
    border-color: var(--color-red-300);
    color: var(--color-red-900);
  }

  .textarea-container.has-error textarea:focus {
    border-color: var(--color-red-500);
  }

  /* Resize variants */
  textarea.resize-none {
    resize: none;
  }

  textarea.resize-both {
    resize: both;
  }

  textarea.resize-horizontal {
    resize: horizontal;
  }

  textarea.resize-vertical {
    resize: vertical;
  }

  .helper-text {
    font-size: var(--text-sm);
    color: var(--color-gray-500);
    margin-top: var(--spacing-1);
  }

  .error-text {
    font-size: var(--text-sm);
    color: var(--color-red-600);
    margin-top: var(--spacing-1);
  }
`;
