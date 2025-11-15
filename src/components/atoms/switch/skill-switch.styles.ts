import { css } from 'lit';

export const switchStyles = css`
  :host {
    display: inline-block;
    font-family: var(--font-sans);
  }

  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;
    border-radius: 9999px;
    border: 2px solid transparent;
    transition: all var(--duration-200) var(--ease-in-out);
    outline: none;
  }

  .switch:focus {
    box-shadow: 0 0 0 2px var(--color-white), 0 0 0 4px var(--color-gray-500);
  }

  /* Size variants */
  .switch.size-sm {
    width: 32px;
    height: 20px;
  }

  .switch.size-md {
    width: 44px;
    height: 24px;
  }

  .switch.size-lg {
    width: 56px;
    height: 32px;
  }

  /* State colors */
  .switch.checked {
    background-color: var(--color-green-600);
  }

  .switch.checked:focus {
    box-shadow: 0 0 0 2px var(--color-white), 0 0 0 4px var(--color-green-500);
  }

  .switch:not(.checked) {
    background-color: var(--color-gray-200);
  }

  .switch:not(.checked):focus {
    box-shadow: 0 0 0 2px var(--color-white), 0 0 0 4px var(--color-gray-500);
  }

  /* Disabled state */
  .switch.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Thumb (the sliding button) */
  .thumb {
    pointer-events: none;
    display: inline-block;
    border-radius: 9999px;
    background-color: var(--color-white);
    box-shadow: var(--shadow-lg);
    transition: transform var(--duration-200) var(--ease-in-out);
    transform: translateX(0);
  }

  /* Thumb sizes */
  .switch.size-sm .thumb {
    width: 12px;
    height: 12px;
    margin: 2px;
  }

  .switch.size-md .thumb {
    width: 16px;
    height: 16px;
    margin: 2px;
  }

  .switch.size-lg .thumb {
    width: 20px;
    height: 20px;
    margin: 4px;
  }

  /* Checked state - slide thumb to the right */
  .switch.size-sm.checked .thumb {
    transform: translateX(12px);
  }

  .switch.size-md.checked .thumb {
    transform: translateX(20px);
  }

  .switch.size-lg.checked .thumb {
    transform: translateX(24px);
  }
`;
