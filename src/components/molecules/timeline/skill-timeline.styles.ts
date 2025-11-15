import { css } from 'lit';

export const timelineStyles = css`
  :host {
    display: block;
  }

  .skill-timeline {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .skill-timeline--horizontal {
    flex-direction: row;
  }

  .skill-timeline__list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: var(--timeline-gap, var(--skill-spacing-lg, 20px));
  }

  .skill-timeline--horizontal .skill-timeline__list {
    flex-direction: row;
    align-items: center;
    gap: var(--timeline-horizontal-gap, var(--skill-spacing-xl, 24px));
  }

  .skill-timeline__item {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: var(--timeline-item-gap, var(--skill-spacing-md, 16px));
  }

  .skill-timeline--horizontal .skill-timeline__item {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--timeline-horizontal-item-gap, var(--skill-spacing-sm, 12px));
  }

  /* Position variants for vertical layout */
  .skill-timeline__item--left {
    align-self: flex-start;
  }

  .skill-timeline__item--right {
    align-self: flex-end;
  }

  .skill-timeline__item--center {
    align-self: center;
  }

  .skill-timeline__item--alternate:nth-child(even) {
    align-self: flex-end;
    text-align: right;
  }

  .skill-timeline__item--alternate:nth-child(odd) {
    align-self: flex-start;
    text-align: left;
  }

  /* Timeline dots */
  .skill-timeline__dot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--timeline-dot-size, 16px);
    height: var(--timeline-dot-size, 16px);
    background: var(--timeline-dot-bg, var(--timeline-dot-color, var(--skill-primary-500, #0A59F7)));
    border: 3px solid var(--timeline-dot-border, var(--skill-white, #FFFFFF));
    border-radius: var(--skill-radius-full, 9999px);
    box-shadow: var(--timeline-dot-shadow, var(--skill-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1)));
    z-index: 2;
    flex-shrink: 0;
    transition: all var(--skill-duration-fast, 200ms);
  }

  .skill-timeline__dot svg,
  .skill-timeline__dot skill-icon {
    width: 0.75em;
    height: 0.75em;
    color: var(--skill-white, #FFFFFF);
  }

  /* Type-specific dot colors */
  .skill-timeline__item--primary .skill-timeline__dot {
    --timeline-dot-bg: var(--skill-primary-500, #0A59F7);
  }

  .skill-timeline__item--success .skill-timeline__dot {
    --timeline-dot-bg: var(--skill-success-500, #00D4AA);
  }

  .skill-timeline__item--warning .skill-timeline__dot {
    --timeline-dot-bg: var(--skill-warning-500, #FFB400);
  }

  .skill-timeline__item--error .skill-timeline__dot {
    --timeline-dot-bg: var(--skill-error-500, #FA2A2D);
  }

  .skill-timeline__item--info .skill-timeline__dot {
    --timeline-dot-bg: var(--skill-info-500, #0A59F7);
  }

  .skill-timeline__item--default .skill-timeline__dot {
    --timeline-dot-bg: var(--skill-gray-500, #6B7280);
  }

  /* Timeline lines */
  .skill-timeline__line {
    position: absolute;
    background: var(--timeline-line-color, var(--skill-gray-300, #D1D5DB));
    z-index: 1;
  }

  .skill-timeline--vertical .skill-timeline__line {
    top: var(--timeline-dot-size, 16px);
    left: calc(var(--timeline-dot-size, 16px) / 2);
    width: var(--timeline-line-width, 2px);
    height: calc(100% + var(--timeline-gap, var(--skill-spacing-lg, 20px)));
    transform: translateX(-50%);
  }

  .skill-timeline--horizontal .skill-timeline__line {
    top: calc(var(--timeline-dot-size, 16px) / 2);
    left: var(--timeline-dot-size, 16px);
    width: calc(100% + var(--timeline-horizontal-gap, var(--skill-spacing-xl, 24px)));
    height: var(--timeline-line-width, 2px);
    transform: translateY(-50%);
  }

  /* Hide line on last item */
  .skill-timeline__item:last-child .skill-timeline__line {
    display: none;
  }

  /* Timeline content */
  .skill-timeline__content {
    flex: 1;
    outline: none;
    transition: all var(--skill-duration-fast, 200ms);
  }

  .skill-timeline__content[data-clickable="true"] {
    cursor: pointer;
  }

  .skill-timeline__content[data-clickable="true"]:hover {
    transform: translateY(-2px);
  }

  .skill-timeline__content:focus-visible {
    outline: 2px solid var(--skill-primary-500, #0A59F7);
    outline-offset: 4px;
    border-radius: var(--skill-radius-md, 6px);
  }

  .skill-timeline__content--left {
    text-align: left;
  }

  .skill-timeline__content--right {
    text-align: right;
  }

  .skill-timeline__content--center {
    text-align: center;
  }

  /* Content positioning for vertical layout */
  .skill-timeline--vertical .skill-timeline__content--left {
    margin-left: var(--timeline-content-margin, 0);
  }

  .skill-timeline--vertical .skill-timeline__content--right {
    margin-right: var(--timeline-content-margin, 0);
    order: -1;
  }

  .skill-timeline--vertical .skill-timeline__content--right .skill-timeline__dot {
    order: 1;
  }

  /* Timeline card */
  .skill-timeline__card {
    background: var(--timeline-card-bg, var(--skill-white, #FFFFFF));
    border: 1px solid var(--timeline-card-border, var(--skill-gray-200, #E5E7EB));
    border-radius: var(--timeline-card-radius, var(--skill-radius-lg, 8px));
    padding: var(--timeline-card-padding, var(--skill-spacing-md, 16px));
    box-shadow: var(--timeline-card-shadow, var(--skill-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05)));
    transition: all var(--skill-duration-fast, 200ms);
  }

  .skill-timeline__content[data-clickable="true"]:hover .skill-timeline__card {
    box-shadow: var(--timeline-card-hover-shadow, var(--skill-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1)));
    transform: translateY(-2px);
  }

  /* Timeline title */
  .skill-timeline__title {
    font-size: var(--timeline-title-font-size, var(--skill-font-size-body-1, 16px));
    font-weight: var(--timeline-title-font-weight, var(--skill-font-weight-semibold, 600));
    color: var(--timeline-title-color, var(--skill-gray-900, #111827));
    margin: 0 0 var(--skill-spacing-2xs, 4px) 0;
    line-height: 1.3;
  }

  /* Timeline description */
  .skill-timeline__description {
    font-size: var(--timeline-description-font-size, var(--skill-font-size-body-2, 14px));
    font-weight: var(--timeline-description-font-weight, var(--skill-font-weight-normal, 400));
    color: var(--timeline-description-color, var(--skill-gray-600, #4B5563));
    margin: 0 0 var(--skill-spacing-xs, 8px) 0;
    line-height: 1.5;
  }

  /* Timeline time */
  .skill-timeline__time {
    font-size: var(--timeline-time-font-size, var(--skill-font-size-body-3, 12px));
    font-weight: var(--timeline-time-font-weight, var(--skill-font-weight-medium, 500));
    color: var(--timeline-time-color, var(--skill-gray-500, #6B7280));
    margin: 0;
    display: inline-block;
  }

  /* Size variants */
  :host([size='xs']) .skill-timeline__dot {
    --timeline-dot-size: 8px;
  }

  :host([size='xs']) .skill-timeline__title {
    --timeline-title-font-size: 12px;
  }

  :host([size='xs']) .skill-timeline__description {
    --timeline-description-font-size: 11px;
  }

  :host([size='xs']) .skill-timeline__time {
    --timeline-time-font-size: 10px;
  }

  :host([size='sm']) .skill-timeline__dot {
    --timeline-dot-size: 12px;
  }

  :host([size='sm']) .skill-timeline__title {
    --timeline-title-font-size: var(--skill-font-size-body-3, 12px);
  }

  :host([size='sm']) .skill-timeline__description {
    --timeline-description-font-size: 11px;
  }

  :host([size='sm']) .skill-timeline__time {
    --timeline-time-font-size: 10px;
  }

  :host([size='md']) .skill-timeline__dot {
    --timeline-dot-size: 16px;
  }

  :host([size='lg']) .skill-timeline__dot {
    --timeline-dot-size: 20px;
  }

  :host([size='lg']) .skill-timeline__title {
    --timeline-title-font-size: var(--skill-font-size-h4, 18px);
  }

  :host([size='lg']) .skill-timeline__description {
    --timeline-description-font-size: var(--skill-font-size-body-1, 16px);
  }

  :host([size='lg']) .skill-timeline__time {
    --timeline-time-font-size: var(--skill-font-size-body-3, 12px);
  }

  :host([size='xl']) .skill-timeline__dot {
    --timeline-dot-size: 24px;
  }

  :host([size='xl']) .skill-timeline__title {
    --timeline-title-font-size: var(--skill-font-size-h3, 20px);
  }

  :host([size='xl']) .skill-timeline__description {
    --timeline-description-font-size: var(--skill-font-size-body-1, 16px);
  }

  :host([size='xl']) .skill-timeline__time {
    --timeline-time-font-size: var(--skill-font-size-body-2, 14px);
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .skill-timeline__list {
      gap: var(--skill-spacing-md, 16px);
    }

    .skill-timeline__item {
      align-self: flex-start;
      text-align: left;
      gap: var(--skill-spacing-sm, 12px);
    }

    .skill-timeline__item--right,
    .skill-timeline__item--center,
    .skill-timeline__item--alternate:nth-child(even) {
      align-self: flex-start;
      text-align: left;
    }

    .skill-timeline__item--right .skill-timeline__dot {
      order: 0;
    }

    .skill-timeline__content--right {
      margin-right: 0;
      order: 0;
    }

    .skill-timeline--horizontal .skill-timeline__list {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--skill-spacing-md, 16px);
    }

    .skill-timeline--horizontal .skill-timeline__item {
      flex-direction: row;
      align-items: flex-start;
      text-align: left;
    }

    .skill-timeline--horizontal .skill-timeline__line {
      top: var(--timeline-dot-size, 16px);
      left: calc(var(--timeline-dot-size, 16px) / 2);
      width: var(--timeline-line-width, 2px);
      height: calc(100% + var(--skill-spacing-md, 16px));
      transform: translateX(-50%);
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .skill-timeline__dot {
      border-width: 4px;
      box-shadow: 0 0 0 2px var(--skill-gray-900, #111827);
    }

    .skill-timeline__line {
      --timeline-line-width: 3px;
      --timeline-line-color: var(--skill-gray-900, #111827);
    }

    .skill-timeline__card {
      border-width: 2px;
      border-color: var(--skill-gray-900, #111827);
    }

    .skill-timeline__title {
      font-weight: var(--skill-font-weight-bold, 700);
    }

    .skill-timeline__content:focus-visible {
      outline-width: 3px;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .skill-timeline__content,
    .skill-timeline__dot,
    .skill-timeline__card {
      transition: none;
    }

    .skill-timeline__content[data-clickable="true"]:hover,
    .skill-timeline__content[data-clickable="true"]:hover .skill-timeline__card {
      transform: none;
    }
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .skill-timeline__dot {
      --timeline-dot-border: var(--skill-gray-800, #1F2937);
    }

    .skill-timeline__line {
      --timeline-line-color: var(--skill-gray-600, #4B5563);
    }

    .skill-timeline__card {
      --timeline-card-bg: var(--skill-gray-800, #1F2937);
      --timeline-card-border: var(--skill-gray-700, #374151);
      --timeline-card-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    }

    .skill-timeline__title {
      --timeline-title-color: var(--skill-gray-100, #F3F4F6);
    }

    .skill-timeline__description {
      --timeline-description-color: var(--skill-gray-300, #D1D5DB);
    }

    .skill-timeline__time {
      --timeline-time-color: var(--skill-gray-400, #9CA3AF);
    }
  }

  /* Print styles */
  @media print {
    .skill-timeline__dot {
      border: 3px solid #000 !important;
      background: #FFF !important;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }

    .skill-timeline__dot svg,
    .skill-timeline__dot skill-icon {
      color: #000 !important;
    }

    .skill-timeline__line {
      background: #000 !important;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }

    .skill-timeline__card {
      border: 2px solid #000 !important;
      background: #FFF !important;
      box-shadow: none !important;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }

    .skill-timeline__title {
      color: #000 !important;
    }

    .skill-timeline__description {
      color: #333 !important;
    }

    .skill-timeline__time {
      color: #666 !important;
    }
  }

  /* Animation for new items */
  .skill-timeline__item {
    animation: timeline-item-fade-in var(--skill-duration-normal, 300ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  @keyframes timeline-item-fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Loading state */
  .skill-timeline--loading .skill-timeline__dot::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid transparent;
    border-top-color: rgba(255, 255, 255, 0.3);
    border-radius: var(--skill-radius-full, 9999px);
    animation: timeline-dot-spin 1s linear infinite;
  }

  @keyframes timeline-dot-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Hover effects */
  .skill-timeline__item:hover .skill-timeline__dot {
    transform: scale(1.1);
    box-shadow: 0 0 0 4px rgba(10, 89, 247, 0.1);
  }

  .skill-timeline__item:hover .skill-timeline__dot.skill-timeline__dot--success {
    box-shadow: 0 0 0 4px rgba(0, 212, 170, 0.1);
  }

  .skill-timeline__item:hover .skill-timeline__dot.skill-timeline__dot--warning {
    box-shadow: 0 0 0 4px rgba(255, 180, 0, 0.1);
  }

  .skill-timeline__item:hover .skill-timeline__dot.skill-timeline__dot--error {
    box-shadow: 0 0 0 4px rgba(250, 42, 45, 0.1);
  }

  .skill-timeline__item:hover .skill-timeline__dot.skill-timeline__dot--info {
    box-shadow: 0 0 0 4px rgba(10, 89, 247, 0.1);
  }

  /* Compact mode */
  :host([compact]) .skill-timeline__card {
    padding: var(--skill-spacing-sm, 12px);
  }

  :host([compact]) .skill-timeline__title {
    --timeline-title-font-size: var(--skill-font-size-body-2, 14px);
    margin-bottom: 2px;
  }

  :host([compact]) .skill-timeline__description {
    --timeline-description-font-size: var(--skill-font-size-body-3, 12px);
    margin-bottom: 4px;
  }

  /* Minimized mode */
  :host([minimal]) .skill-timeline__description,
  :host([minimal]) .skill-timeline__time {
    display: none;
  }

  :host([minimal]) .skill-timeline__title {
    --timeline-title-font-size: var(--skill-font-size-body-3, 12px);
    margin-bottom: 0;
  }

  /* Icon-only mode */
  :host([icon-only]) .skill-timeline__content {
    display: none;
  }

  :host([icon-only]) .skill-timeline__item {
    justify-content: center;
  }

  /* Alternating background */
  .skill-timeline--alternate .skill-timeline__item:nth-child(even) .skill-timeline__card {
    background: var(--timeline-card-alt-bg, var(--skill-gray-50, #F9FAFB));
  }

  /* Pulse animation for active items */
  .skill-timeline__item--active .skill-timeline__dot {
    animation: timeline-dot-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes timeline-dot-pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(10, 89, 247, 0.4);
    }
    50% {
      box-shadow: 0 0 0 8px rgba(10, 89, 247, 0);
    }
  }

  /* Progress indicator */
  .skill-timeline__progress {
    position: absolute;
    top: 0;
    left: calc(var(--timeline-dot-size, 16px) / 2);
    width: var(--timeline-line-width, 2px);
    background: var(--skill-primary-500, #0A59F7);
    transform: translateX(-50%);
    z-index: 1;
    transition: height var(--skill-duration-normal, 300ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  .skill-timeline--horizontal .skill-timeline__progress {
    top: calc(var(--timeline-dot-size, 16px) / 2);
    left: 0;
    width: var(--timeline-line-width, 2px);
    height: var(--timeline-line-width, 2px);
    transform: translateY(-50%);
    transition: width var(--skill-duration-normal, 300ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  /* Grouped timeline */
  .skill-timeline--grouped .skill-timeline__item {
    margin-bottom: var(--timeline-group-gap, var(--skill-spacing-xl, 24px));
  }

  .skill-timeline--grouped .skill-timeline__item::before {
    content: attr(data-group);
    position: absolute;
    top: -20px;
    left: 0;
    font-size: var(--skill-font-size-body-3, 12px);
    font-weight: var(--skill-font-weight-semibold, 600);
    color: var(--skill-gray-500, #6B7280);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;