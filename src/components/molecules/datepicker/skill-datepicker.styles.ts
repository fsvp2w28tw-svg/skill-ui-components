import { css } from 'lit';
import { baseStyles } from '../../../styles/base';

export const datepickerStyles = [
  baseStyles,
  css`
    :host {
      display: inline-block;
      position: relative;
      width: 100%;
    }

    .skill-datepicker {
      position: relative;
      width: 100%;
    }

    .skill-datepicker__input {
      width: 100%;
      height: var(--component-height-md, 40px);
      padding: var(--spacing-sm, 12px) var(--spacing-md, 16px);
      border: 1px solid var(--skill-gray-200, #E5E8EB);
      border-radius: var(--radius-base, 4px);
      background: var(--skill-gray-0, #FFFFFF);
      color: var(--skill-gray-900, #1A1A1A);
      font-family: var(--font-sans, 'Inter', 'PingFang SC', sans-serif);
      font-size: var(--font-size-body-2, 14px);
      line-height: var(--line-height-normal, 1.5);
      transition: all var(--duration-fast, 200ms) var(--ease-out, cubic-bezier(0, 0, 0.2, 1));
      cursor: pointer;
      box-sizing: border-box;
    }

    .skill-datepicker__input:hover {
      border-color: var(--skill-gray-300, #D1D5DB);
      box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05));
    }

    .skill-datepicker__input:focus {
      outline: none;
      border-color: var(--skill-primary-500, #0A59F7);
      box-shadow: 0 0 0 3px rgba(10, 89, 247, 0.1);
    }

    .skill-datepicker__input:disabled {
      background: var(--skill-gray-100, #F1F3F5);
      border-color: var(--skill-gray-200, #E5E8EB);
      color: var(--skill-gray-500, #8A8A8A);
      cursor: not-allowed;
    }

    .skill-datepicker__input.has-error {
      border-color: var(--skill-error-500, #FA2A2D);
      box-shadow: 0 0 0 3px rgba(250, 42, 45, 0.1);
    }

    /* Size variants */
    .skill-datepicker--xs .skill-datepicker__input {
      height: var(--component-height-xs, 24px);
      padding: var(--spacing-2xs, 4px) var(--spacing-xs, 8px);
      font-size: var(--font-size-caption, 10px);
    }

    .skill-datepicker--sm .skill-datepicker__input {
      height: var(--component-height-sm, 32px);
      padding: var(--spacing-xs, 8px) var(--spacing-sm, 12px);
      font-size: var(--font-size-body-3, 12px);
    }

    .skill-datepicker--lg .skill-datepicker__input {
      height: var(--component-height-lg, 48px);
      padding: var(--spacing-md, 16px) var(--spacing-lg, 20px);
      font-size: var(--font-size-body-1, 16px);
    }

    .skill-datepicker--xl .skill-datepicker__input {
      height: var(--component-height-xl, 56px);
      padding: var(--spacing-lg, 20px) var(--spacing-xl, 24px);
      font-size: var(--font-size-subtitle, 18px);
    }

    /* Calendar dropdown */
    .skill-datepicker__calendar {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: var(--z-index-dropdown, 1000);
      min-width: 280px;
      background: var(--skill-gray-0, #FFFFFF);
      border: 1px solid var(--skill-gray-200, #E5E8EB);
      border-radius: var(--radius-lg, 8px);
      box-shadow: var(--shadow-2xl, 0 25px 50px -12px rgba(0, 0, 0, 0.25));
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: all var(--duration-fast, 200ms) var(--ease-out, cubic-bezier(0, 0, 0.2, 1));
    }

    .skill-datepicker__calendar.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(4px);
    }

    /* Calendar header */
    .skill-datepicker__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-md, 16px);
      border-bottom: 1px solid var(--skill-gray-200, #E5E8EB);
      background: var(--skill-gray-50, #FAFAFA);
    }

    .skill-datepicker__nav {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 8px);
    }

    .skill-datepicker__nav-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: var(--radius-base, 4px);
      background: transparent;
      color: var(--skill-gray-600, #6B7280);
      cursor: pointer;
      transition: all var(--duration-fast, 200ms);
    }

    .skill-datepicker__nav-button:hover:not(:disabled) {
      background: var(--skill-gray-200, #E5E8EB);
      color: var(--skill-gray-900, #1A1A1A);
    }

    .skill-datepicker__nav-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .skill-datepicker__month-year {
      font-weight: var(--font-weight-medium, 500);
      font-size: var(--font-size-body-1, 16px);
      color: var(--skill-gray-900, #1A1A1A);
    }

    /* Calendar body */
    .skill-datepicker__body {
      padding: var(--spacing-md, 16px);
    }

    .skill-datepicker__weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
      margin-bottom: var(--spacing-sm, 12px);
    }

    .skill-datepicker__weekday {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      font-size: var(--font-size-caption, 10px);
      font-weight: var(--font-weight-medium, 500);
      color: var(--skill-gray-500, #8A8A8A);
      text-transform: uppercase;
    }

    .skill-datepicker__days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
    }

    .skill-datepicker__day {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      border: none;
      border-radius: var(--radius-base, 4px);
      background: transparent;
      color: var(--skill-gray-700, #5A5A5A);
      font-size: var(--font-size-body-3, 12px);
      cursor: pointer;
      transition: all var(--duration-fast, 200ms);
      position: relative;
    }

    .skill-datepicker__day:hover:not(:disabled) {
      background: var(--skill-gray-100, #F1F3F5);
      color: var(--skill-gray-900, #1A1A1A);
    }

    .skill-datepicker__day.selected {
      background: var(--skill-primary-500, #0A59F7);
      color: var(--skill-gray-0, #FFFFFF);
      font-weight: var(--font-weight-medium, 500);
    }

    .skill-datepicker__day.today {
      border: 1px solid var(--skill-primary-300, #6B9FFF);
      color: var(--skill-primary-600, #0047D3);
    }

    .skill-datepicker__day.today.selected {
      background: var(--skill-primary-500, #0A59F7);
      color: var(--skill-gray-0, #FFFFFF);
      border-color: var(--skill-primary-500, #0A59F7);
    }

    .skill-datepicker__day.other-month {
      color: var(--skill-gray-400, #BDBDBD);
    }

    .skill-datepicker__day.disabled {
      color: var(--skill-gray-300, #D1D5DB);
      cursor: not-allowed;
    }

    .skill-datepicker__day.weekend {
      color: var(--skill-error-500, #FA2A2D);
    }

    .skill-datepicker__day.weekend.selected {
      color: var(--skill-gray-0, #FFFFFF);
    }

    /* Icon styles */
    .skill-datepicker__icon {
      position: absolute;
      right: var(--spacing-md, 16px);
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      color: var(--skill-gray-500, #8A8A8A);
      pointer-events: none;
    }

    /* Input group */
    .skill-datepicker__input-group {
      position: relative;
    }

    /* Error and helper text */
    .skill-datepicker__error {
      margin-top: var(--spacing-2xs, 4px);
      font-size: var(--font-size-caption, 10px);
      color: var(--skill-error-500, #FA2A2D);
    }

    .skill-datepicker__helper {
      margin-top: var(--spacing-2xs, 4px);
      font-size: var(--font-size-caption, 10px);
      color: var(--skill-gray-500, #8A8A8A);
    }

    /* Loading state */
    .skill-datepicker__loading {
      position: absolute;
      right: var(--spacing-md, 16px);
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      color: var(--skill-primary-500, #0A59F7);
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from {
        transform: translateY(-50%) rotate(0deg);
      }
      to {
        transform: translateY(-50%) rotate(360deg);
      }
    }

    /* Variant styles */
    .skill-datepicker--filled .skill-datepicker__input {
      background: var(--skill-gray-50, #FAFAFA);
    }

    .skill-datepicker--underlined .skill-datepicker__input {
      border: none;
      border-bottom: 2px solid var(--skill-gray-300, #D1D5DB);
      border-radius: 0;
      padding-left: 0;
      padding-right: 0;
    }

    .skill-datepicker--underlined .skill-datepicker__input:focus {
      border-bottom-color: var(--skill-primary-500, #0A59F7);
      box-shadow: none;
    }

    /* Accessibility */
    .skill-datepicker__input:focus-visible {
      outline: 2px solid var(--skill-primary-500, #0A59F7);
      outline-offset: 2px;
    }

    /* CSS part exports */
    ::part(input) {
      /* Allows styling of the input element directly */
    }

    ::part(calendar) {
      /* Allows styling of the calendar dropdown */
    }

    ::part(day) {
      /* Allows styling of individual day elements */
    }

    ::part(nav-button) {
      /* Allows styling of navigation buttons */
    }
  `,
];