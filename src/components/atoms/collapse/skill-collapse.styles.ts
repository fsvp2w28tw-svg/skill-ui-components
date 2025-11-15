import { css } from 'lit';
import { baseStyles } from '../../../styles/base';

export const collapseStyles = [
  baseStyles,
  css`
    :host {
      display: block;
      width: 100%;
    }

    .skill-collapse {
      border: 1px solid var(--skill-gray-200, #E5E8EB);
      border-radius: var(--radius-lg, 8px);
      background: var(--skill-gray-0, #FFFFFF);
      overflow: hidden;
      transition: all var(--duration-fast, 200ms) var(--ease-out, cubic-bezier(0, 0, 0.2, 1));
    }

    .skill-collapse--borderless {
      border: none;
      border-radius: 0;
    }

    .skill-collapse--ghost {
      background: transparent;
      border: none;
    }

    /* Collapse items */
    .skill-collapse__item {
      border-bottom: 1px solid var(--skill-gray-200, #E5E8EB);
    }

    .skill-collapse__item:last-child {
      border-bottom: none;
    }

    .skill-collapse--borderless .skill-collapse__item {
      border-bottom: none;
    }

    /* Header */
    .skill-collapse__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: var(--spacing-md, 16px) var(--spacing-lg, 20px);
      background: var(--skill-gray-0, #FFFFFF);
      border: none;
      color: var(--skill-gray-900, #1A1A1A);
      font-family: var(--font-sans, 'Inter', 'PingFang SC', sans-serif);
      font-size: var(--font-size-body-1, 16px);
      font-weight: var(--font-weight-medium, 500);
      line-height: var(--line-height-normal, 1.5);
      cursor: pointer;
      transition: all var(--duration-fast, 200ms) var(--ease-out, cubic-bezier(0, 0, 0.2, 1));
      position: relative;
      user-select: none;
    }

    .skill-collapse__header:hover {
      background: var(--skill-gray-50, #FAFAFA);
    }

    .skill-collapse__header:focus {
      outline: none;
      background: var(--skill-gray-50, #FAFAFA);
      box-shadow: inset 0 0 0 2px var(--skill-primary-500, #0A59F7);
    }

    .skill-collapse__header:active {
      background: var(--skill-gray-100, #F1F3F5);
    }

    .skill-collapse--ghost .skill-collapse__header {
      background: transparent;
    }

    .skill-collapse--ghost .skill-collapse__header:hover {
      background: var(--skill-gray-50, #FAFAFA);
    }

    /* Disabled header */
    .skill-collapse__header:disabled {
      background: var(--skill-gray-100, #F1F3F5);
      color: var(--skill-gray-500, #8A8A8A);
      cursor: not-allowed;
      opacity: 0.6;
    }

    /* Header content */
    .skill-collapse__header-content {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 12px);
      flex: 1;
    }

    .skill-collapse__title {
      margin: 0;
      color: inherit;
      font-size: inherit;
      font-weight: inherit;
    }

    .skill-collapse__description {
      margin: var(--spacing-2xs, 4px) 0 0 0;
      color: var(--skill-gray-500, #8A8A8A);
      font-size: var(--font-size-body-3, 12px);
      font-weight: var(--font-weight-regular, 400);
      line-height: var(--line-height-normal, 1.5);
    }

    /* Header actions */
    .skill-collapse__header-actions {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 8px);
    }

    /* Expand icon */
    .skill-collapse__expand-icon {
      width: 20px;
      height: 20px;
      color: var(--skill-gray-500, #8A8A8A);
      transition: transform var(--duration-fast, 200ms) var(--ease-out, cubic-bezier(0, 0, 0.2, 1));
      flex-shrink: 0;
    }

    .skill-collapse__item--expanded .skill-collapse__expand-icon {
      transform: rotate(180deg);
    }

    /* Content */
    .skill-collapse__content {
      overflow: hidden;
      transition: all var(--duration-normal, 300ms) var(--ease-out, cubic-bezier(0, 0, 0.2, 1));
      max-height: 0;
    }

    .skill-collapse__content-inner {
      padding: var(--spacing-md, 16px) var(--spacing-lg, 20px);
      color: var(--skill-gray-700, #5A5A5A);
      font-family: var(--font-sans, 'Inter', 'PingFang SC', sans-serif);
      font-size: var(--font-size-body-2, 14px);
      line-height: var(--line-height-normal, 1.5);
    }

    .skill-collapse__item--expanded .skill-collapse__content {
      max-height: 2000px; /* Large value to accommodate content */
    }

    /* Size variants */
    .skill-collapse--sm .skill-collapse__header {
      padding: var(--spacing-sm, 12px) var(--spacing-md, 16px);
      font-size: var(--font-size-body-3, 12px);
    }

    .skill-collapse--sm .skill-collapse__content-inner {
      padding: var(--spacing-sm, 12px) var(--spacing-md, 16px);
      font-size: var(--font-size-caption, 10px);
    }

    .skill-collapse--lg .skill-collapse__header {
      padding: var(--spacing-lg, 20px) var(--spacing-xl, 24px);
      font-size: var(--font-size-subtitle, 18px);
    }

    .skill-collapse--lg .skill-collapse__content-inner {
      padding: var(--spacing-lg, 20px) var(--spacing-xl, 24px);
      font-size: var(--font-size-body-1, 16px);
    }

    /* Icon position variants */
    .skill-collapse--icon-left .skill-collapse__header-content {
      order: 1;
    }

    .skill-collapse--icon-left .skill-collapse__header-actions {
      order: 0;
    }

    .skill-collapse--icon-left .skill-collapse__expand-icon {
      margin-right: var(--spacing-sm, 12px);
    }

    /* Accordion mode (only one item open at a time) */
    .skill-collapse--accordion .skill-collapse__item:not(.skill-collapse__item--expanded) .skill-collapse__header {
      background: var(--skill-gray-50, #FAFAFA);
    }

    .skill-collapse--accordion .skill-collapse__item--expanded .skill-collapse__header {
      background: var(--skill-primary-50, #E6F0FF);
      color: var(--skill-primary-700, #0036A0);
    }

    .skill-collapse--accordion .skill-collapse__item--expanded .skill-collapse__expand-icon {
      color: var(--skill-primary-600, #0047D3);
    }

    /* Borderless variant */
    .skill-collapse--borderless .skill-collapse__header {
      border-radius: var(--radius-md, 6px);
      margin-bottom: var(--spacing-xs, 8px);
    }

    .skill-collapse--borderless .skill-collapse__content {
      border-radius: var(--radius-md, 6px);
      background: var(--skill-gray-50, #FAFAFA);
    }

    /* Ghost variant */
    .skill-collapse--ghost .skill-collapse__header {
      border-radius: var(--radius-md, 6px);
      margin-bottom: var(--spacing-xs, 8px);
    }

    .skill-collapse--ghost .skill-collapse__item--expanded .skill-collapse__header {
      background: var(--skill-primary-50, #E6F0FF);
    }

    /* Extra icon in header */
    .skill-collapse__extra-icon {
      width: 16px;
      height: 16px;
      color: var(--skill-gray-400, #BDBDBD);
      flex-shrink: 0;
    }

    /* Loading state */
    .skill-collapse__loading {
      width: 16px;
      height: 16px;
      color: var(--skill-primary-500, #0A59F7);
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* Arrow animation variants */
    .skill-collapse--arrow-none .skill-collapse__expand-icon {
      display: none;
    }

    .skill-collapse--arrow-chevron .skill-collapse__expand-icon {
      width: 16px;
      height: 16px;
    }

    .skill-collapse--arrow-plus .skill-collapse__expand-icon {
      width: 18px;
      height: 18px;
    }

    .skill-collapse--arrow-plus .skill-collapse__item--expanded .skill-collapse__expand-icon {
      transform: rotate(45deg);
    }

    /* Right-to-left support */
    :host([dir="rtl"]) .skill-collapse__expand-icon {
      transform: rotate(180deg);
    }

    :host([dir="rtl"]) .skill-collapse__item--expanded .skill-collapse__expand-icon {
      transform: rotate(0deg);
    }

    /* Accessibility */
    .skill-collapse__header:focus-visible {
      outline: 2px solid var(--skill-primary-500, #0A59F7);
      outline-offset: 2px;
    }

    /* CSS part exports */
    ::part(header) {
      /* Allows styling of the header button */
    }

    ::part(content) {
      /* Allows styling of the content container */
    }

    ::part(expand-icon) {
      /* Allows styling of the expand icon */
    }

    ::part(title) {
      /* Allows styling of the title */
    }

    ::part(extra) {
      /* Allows styling of extra content in header */
    }
  `,
];