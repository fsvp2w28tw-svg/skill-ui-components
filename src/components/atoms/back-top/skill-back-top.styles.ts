import { css } from 'lit';

export const backTopStyles = css`
  .skill-back-top__container {
    position: fixed;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all var(--skill-transition-duration-fast, 150ms) var(--skill-transition-easing, ease-in-out);
  }

  .skill-back-top__container:empty + .skill-back-top__container {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .skill-back-top__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--back-top-size, 40px);
    height: var(--back-top-size, 40px);
    border: none;
    border-radius: 50%;
    background: var(--back-top-bg, var(--skill-primary-600, #2563eb));
    color: var(--back-top-color, var(--skill-gray-0, #ffffff));
    cursor: pointer;
    box-shadow: var(--skill-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
    transition: all var(--skill-transition-duration-fast, 150ms) var(--skill-transition-easing, ease-in-out);
    position: relative;
    overflow: visible;
  }

  .skill-back-top__button:hover {
    background: var(--skill-primary-700, #1d4ed8);
    transform: translateY(-2px);
    box-shadow: var(--skill-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
  }

  .skill-back-top__button:focus-visible {
    outline: 2px solid var(--skill-primary-400, #60a5fa);
    outline-offset: 2px;
  }

  .skill-back-top__icon {
    width: 20px;
    height: 20px;
    transition: transform var(--skill-transition-duration-fast, 150ms) var(--skill-transition-easing, ease-in-out);
  }

  .skill-back-top__button:hover .skill-back-top__icon {
    transform: translateY(-2px);
  }

  .skill-back-top__tooltip {
    position: absolute;
    bottom: 100%;
    right: 50%;
    transform: translateX(50%);
    background: var(--skill-gray-900, #111827);
    color: var(--skill-gray-0, #ffffff);
    padding: var(--skill-spacing-xs, 4px) var(--skill-spacing-sm, 8px);
    border-radius: var(--skill-radius-sm, 4px);
    font-size: var(--skill-font-body-4, 12px);
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all var(--skill-transition-duration-fast, 150ms) var(--skill-transition-easing, ease-in-out);
    margin-bottom: var(--skill-spacing-xs, 4px);
    pointer-events: none;
  }

  .skill-back-top__tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: var(--skill-gray-900, #111827);
  }

  .skill-back-top__button:hover .skill-back-top__tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateX(50%) translateY(-2px);
  }

  /* Size variants */
  :host([size='xs']) .skill-back-top__button {
    width: 32px;
    height: 32px;
  }

  :host([size='xs']) .skill-back-top__icon {
    width: 16px;
    height: 16px;
  }

  :host([size='sm']) .skill-back-top__button {
    width: 36px;
    height: 36px;
  }

  :host([size='sm']) .skill-back-top__icon {
    width: 18px;
    height: 18px;
  }

  :host([size='lg']) .skill-back-top__button {
    width: 48px;
    height: 48px;
  }

  :host([size='lg']) .skill-back-top__icon {
    width: 24px;
    height: 24px;
  }

  :host([size='xl']) .skill-back-top__button {
    width: 56px;
    height: 56px;
  }

  :host([size='xl']) .skill-back-top__icon {
    width: 28px;
    height: 28px;
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .skill-back-top__tooltip {
      background: var(--skill-gray-100, #f3f4f6);
      color: var(--skill-gray-900, #111827);
    }

    .skill-back-top__tooltip::after {
      border-top-color: var(--skill-gray-100, #f3f4f6);
    }
  }

  /* Reduce motion support */
  @media (prefers-reduced-motion: reduce) {
    .skill-back-top__container,
    .skill-back-top__button,
    .skill-back-top__icon,
    .skill-back-top__tooltip {
      transition: none;
    }
  }
`;