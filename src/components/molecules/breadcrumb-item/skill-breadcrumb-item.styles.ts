import { css } from 'lit';

export const breadcrumbItemStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    width: auto;
    font-family: var(--skill-font-family, inherit);
    line-height: var(--skill-line-height, 1.5);
  }

  .skill-breadcrumb-item {
    display: inline-flex;
    align-items: center;
    gap: var(--breadcrumb-item-gap, var(--skill-spacing-xs));
    font-size: var(--breadcrumb-item-font-size, var(--skill-font-size-sm));
    font-weight: var(--breadcrumb-item-font-weight, var(--skill-font-weight-normal));
    color: var(--breadcrumb-item-color, var(--skill-color-text-muted));
    padding: var(--breadcrumb-item-padding, 0);
    transition: all 0.2s ease;
    position: relative;
  }

  /* Size variants */
  .skill-breadcrumb-item--xs {
    font-size: var(--skill-font-size-xs);
    line-height: 1.4;
  }

  .skill-breadcrumb-item--sm {
    font-size: var(--skill-font-size-sm);
    line-height: 1.4;
  }

  .skill-breadcrumb-item--md {
    font-size: var(--skill-font-size-md);
    line-height: 1.5;
  }

  .skill-breadcrumb-item--lg {
    font-size: var(--skill-font-size-lg);
    line-height: 1.5;
  }

  .skill-breadcrumb-item--xl {
    font-size: var(--skill-font-size-xl);
    line-height: 1.6;
  }

  /* Color variants */
  .skill-breadcrumb-item--primary {
    --breadcrumb-item-color: var(--skill-color-primary);
  }

  .skill-breadcrumb-item--secondary {
    --breadcrumb-item-color: var(--skill-color-secondary);
  }

  .skill-breadcrumb-item--success {
    --breadcrumb-item-color: var(--skill-color-success);
  }

  .skill-breadcrumb-item--warning {
    --breadcrumb-item-color: var(--skill-color-warning);
  }

  .skill-breadcrumb-item--error {
    --breadcrumb-item-color: var(--skill-color-error);
  }

  .skill-breadcrumb-item--info {
    --breadcrumb-item-color: var(--skill-color-info);
  }

  .skill-breadcrumb-item--gray {
    --breadcrumb-item-color: var(--skill-color-text-muted);
  }

  /* Link styles */
  .skill-breadcrumb-item__link {
    display: inline-flex;
    align-items: center;
    gap: var(--skill-spacing-xs);
    color: inherit;
    text-decoration: none;
    border-radius: var(--skill-border-radius-sm);
    padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
    transition: all 0.2s ease;
    cursor: pointer;
    position: relative;
    outline: none;
  }

  .skill-breadcrumb-item__link:hover {
    color: var(--skill-color-primary);
    background-color: var(--skill-color-primary-light);
    text-decoration: underline;
  }

  .skill-breadcrumb-item__link:focus-visible {
    outline: 2px solid var(--skill-color-primary);
    outline-offset: 1px;
  }

  .skill-breadcrumb-item--active .skill-breadcrumb-item__link {
    color: var(--skill-color-text);
    font-weight: var(--skill-font-weight-medium);
    cursor: default;
    pointer-events: none;
  }

  .skill-breadcrumb-item--active .skill-breadcrumb-item__link:hover {
    color: var(--skill-color-text);
    background-color: transparent;
    text-decoration: none;
  }

  .skill-breadcrumb-item--disabled .skill-breadcrumb-item__link {
    color: var(--skill-color-text-disabled);
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  .skill-breadcrumb-item--disabled .skill-breadcrumb-item__link:hover {
    color: var(--skill-color-text-disabled);
    background-color: transparent;
    text-decoration: none;
  }

  /* External link styles */
  .skill-breadcrumb-item--external .skill-breadcrumb-item__link::after {
    content: '';
    display: inline-flex;
    align-items: center;
    margin-left: var(--skill-spacing-xs);
  }

  /* No underline variant */
  .skill-breadcrumb-item--no-underline .skill-breadcrumb-item__link {
    text-decoration: none;
  }

  .skill-breadcrumb-item--no-underline .skill-breadcrumb-item__link:hover {
    text-decoration: none;
  }

  /* Truncate styles */
  .skill-breadcrumb-item--truncate {
    max-width: 100%;
    min-width: 0;
  }

  .skill-breadcrumb-item--truncate .skill-breadcrumb-item__content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }

  /* Icon styles */
  .skill-breadcrumb-item__icon {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--breadcrumb-item-color, var(--skill-color-text-muted));
  }

  .skill-breadcrumb-item__icon skill-icon {
    width: 1em;
    height: 1em;
  }

  /* Content styles */
  .skill-breadcrumb-item__content {
    display: inline-flex;
    align-items: center;
    gap: var(--skill-spacing-xs);
    min-width: 0;
  }

  .skill-breadcrumb-item__prefix,
  .skill-breadcrumb-item__suffix {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--skill-color-text-muted);
    font-size: 0.9em;
  }

  /* External icon */
  .skill-breadcrumb-item__external-icon {
    display: inline-flex;
    align-items: center;
    width: 0.8em;
    height: 0.8em;
    margin-left: var(--skill-spacing-xs);
    color: var(--skill-color-text-muted);
    flex-shrink: 0;
  }

  /* Separator styles */
  .skill-breadcrumb-item__separator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--breadcrumb-item-separator-color, var(--skill-color-text-muted));
    font-weight: var(--skill-font-weight-normal);
    margin: 0 var(--skill-spacing-xs);
    user-select: none;
    font-size: 0.9em;
    opacity: 0.7;
  }

  .skill-breadcrumb-item__separator ::slotted(*) {
    color: inherit;
    font-size: inherit;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    .skill-breadcrumb-item {
      font-size: var(--skill-font-size-sm);
    }

    .skill-breadcrumb-item__link {
      padding: var(--skill-spacing-xs);
    }

    .skill-breadcrumb-item__separator {
      margin: 0 var(--skill-spacing-xs);
    }

    /* Truncate on mobile by default */
    .skill-breadcrumb-item:not(.skill-breadcrumb-item--xs) .skill-breadcrumb-item__content {
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  @media (max-width: 480px) {
    .skill-breadcrumb-item {
      font-size: var(--skill-font-size-xs);
    }

    .skill-breadcrumb-item__link {
      padding: var(--skill-spacing-xs) var(--skill-spacing-xs);
    }

    .skill-breadcrumb-item__separator {
      margin: 0 var(--skill-spacing-xs);
    }

    /* Even smaller max-width on very small screens */
    .skill-breadcrumb-item:not(.skill-breadcrumb-item--xs) .skill-breadcrumb-item__content {
      max-width: 100px;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .skill-breadcrumb-item {
      --breadcrumb-item-color: var(--skill-color-text);
    }

    .skill-breadcrumb-item__link {
      border: 1px solid transparent;
    }

    .skill-breadcrumb-item__link:hover,
    .skill-breadcrumb-item__link:focus-visible {
      border-color: var(--skill-color-primary);
    }

    .skill-breadcrumb-item--active .skill-breadcrumb-item__link {
      border-color: var(--skill-color-text);
    }

    .skill-breadcrumb-item__separator {
      opacity: 1;
      font-weight: var(--skill-font-weight-medium);
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .skill-breadcrumb-item,
    .skill-breadcrumb-item__link,
    .skill-breadcrumb-item__icon,
    .skill-breadcrumb-item__content,
    .skill-breadcrumb-item__separator {
      transition: none;
    }
  }

  /* Focus styles for keyboard navigation */
  .skill-breadcrumb-item__link:focus-visible {
    outline: 2px solid var(--skill-color-primary);
    outline-offset: 2px;
    border-radius: var(--skill-border-radius-sm);
  }

  /* Custom properties for easy theming */
  :host {
    --breadcrumb-item-gap: var(--skill-spacing-xs);
    --breadcrumb-item-color: var(--skill-color-text-muted);
    --breadcrumb-item-separator-color: var(--skill-color-text-muted);
    --breadcrumb-item-font-size: var(--skill-font-size-sm);
    --breadcrumb-item-font-weight: var(--skill-font-weight-normal);
    --breadcrumb-item-padding: 0;
    --breadcrumb-item-hover-color: var(--skill-color-primary);
    --breadcrumb-item-hover-background: var(--skill-color-primary-light);
    --breadcrumb-item-active-color: var(--skill-color-text);
    --breadcrumb-item-disabled-color: var(--skill-color-text-disabled);
    --breadcrumb-item-icon-size: 1em;
    --breadcrumb-item-separator-size: 0.9em;
    --breadcrumb-item-external-icon-size: 0.8em;
  }

  /* Theme inheritance */
  :host([theme="dark"]) {
    --breadcrumb-item-color: var(--skill-color-text-muted-dark);
    --breadcrumb-item-separator-color: var(--skill-color-text-muted-dark);
    --breadcrumb-item-hover-background: var(--skill-color-primary-dark);
  }

  :host([theme="light"]) {
    --breadcrumb-item-color: var(--skill-color-gray-600);
    --breadcrumb-item-separator-color: var(--skill-color-gray-400);
    --breadcrumb-item-hover-background: var(--skill-color-gray-100);
  }
`;