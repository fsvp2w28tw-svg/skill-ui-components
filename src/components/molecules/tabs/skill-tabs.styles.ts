import { css } from 'lit';

/**
 * Skill Tabs 组件样式
 * 现代化设计，支持多种变体和键盘导航
 */
export const tabsStyles = css`
  /* ===== Host 元素 ===== */
  :host {
    display: block;
    --tabs-bg: var(--skill-gray-0);
    --tab-bg: transparent;
    --tab-active-bg: var(--skill-primary-50);
    --tab-color: var(--skill-gray-600);
    --tab-active-color: var(--skill-primary-600);
    --tab-border-color: var(--skill-gray-200);
    --tab-hover-bg: var(--skill-gray-50);
    --tab-focus-outline: var(--skill-primary-500);
  }

  /* ===== Main Container ===== */
  .skill-tabs {
    background: var(--tabs-bg);
    position: relative;
  }

  /* ===== Orientation Variants ===== */
  .skill-tabs--horizontal {
    display: flex;
    flex-direction: column;
  }

  .skill-tabs--vertical {
    display: flex;
    flex-direction: row;
  }

  /* ===== Tab List ===== */
  .skill-tabs-list {
    position: relative;
  }

  .skill-tabs-list--horizontal {
    border-bottom: 1px solid var(--tab-border-color);
    background: var(--tabs-bg);
  }

  .skill-tabs-list--vertical {
    border-right: 1px solid var(--tab-border-color);
    background: var(--tabs-bg);
    min-width: 200px;
    flex-shrink: 0;
  }

  .skill-tabs-list--scrollable {
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
    scrollbar-color: var(--skill-gray-300) transparent;
  }

  .skill-tabs-list--scrollable::-webkit-scrollbar {
    height: 4px;
  }

  .skill-tabs-list--scrollable::-webkit-scrollbar-track {
    background: transparent;
  }

  .skill-tabs-list--scrollable::-webkit-scrollbar-thumb {
    background: var(--skill-gray-300);
    border-radius: 2px;
  }

  .skill-tabs-nav {
    display: flex;
    align-items: center;
    position: relative;
  }

  .skill-tabs--vertical .skill-tabs-nav {
    flex-direction: column;
    align-items: stretch;
  }

  /* ===== Tab Buttons ===== */
  .skill-tabs-tab {
    display: inline-flex;
    align-items: center;
    gap: var(--skill-spacing-xs);
    padding: var(--skill-spacing-sm) var(--skill-spacing-md);
    background: var(--tab-bg);
    border: none;
    border-bottom: 2px solid transparent;
    color: var(--tab-color);
    font-size: var(--skill-font-body-2);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--skill-transition-duration-fast) var(--skill-transition-easing);
    position: relative;
    white-space: nowrap;
    user-select: none;
    outline: none;
  }

  .skill-tabs-tab:hover:not(.skill-tabs-tab--disabled) {
    background: var(--tab-hover-bg);
    color: var(--skill-primary-700);
  }

  .skill-tabs-tab:focus-visible {
    outline: 2px solid var(--tab-focus-outline);
    outline-offset: -2px;
  }

  .skill-tabs-tab--active {
    color: var(--tab-active-color);
    border-bottom-color: var(--skill-primary-500);
  }

  .skill-tabs-tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: var(--skill-gray-400);
  }

  /* ===== Size Variants ===== */
  .skill-tabs--xs .skill-tabs-tab {
    padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
    font-size: var(--skill-font-body-3);
  }

  .skill-tabs--sm .skill-tabs-tab {
    padding: var(--skill-spacing-xs) var(--skill-spacing-md);
    font-size: var(--skill-font-body-3);
  }

  .skill-tabs--md .skill-tabs-tab,
  .skill-tabs--horizontal.skill-tabs--md .skill-tabs-tab {
    padding: var(--skill-spacing-sm) var(--skill-spacing-lg);
    font-size: var(--skill-font-body-2);
  }

  .skill-tabs--lg .skill-tabs-tab {
    padding: var(--skill-spacing-md) var(--skill-spacing-xl);
    font-size: var(--skill-font-body-1);
  }

  .skill-tabs--xl .skill-tabs-tab {
    padding: var(--skill-spacing-lg) var(--skill-spacing-2xl);
    font-size: var(--skill-font-body-1);
  }

  /* ===== Variant Styles ===== */

  /* Default Variant */
  .skill-tabs--default .skill-tabs-tab {
    border-bottom: 2px solid transparent;
  }

  .skill-tabs--default .skill-tabs-tab--active {
    border-bottom-color: var(--skill-primary-500);
    background: var(--tab-active-bg);
  }

  /* Pills Variant */
  .skill-tabs--pills .skill-tabs-tab {
    border-radius: var(--skill-radius-full);
    margin: 0 var(--skill-spacing-xs);
    border-bottom: none;
  }

  .skill-tabs--pills .skill-tabs-tab--active {
    background: var(--skill-primary-500);
    color: var(--skill-gray-0);
  }

  .skill-tabs--pills .skill-tabs-tab:hover:not(.skill-tabs-tab--disabled) {
    background: var(--skill-gray-100);
  }

  .skill-tabs--pills .skill-tabs-tab--active:hover {
    background: var(--skill-primary-600);
    color: var(--skill-gray-0);
  }

  /* Underline Variant */
  .skill-tabs--underline .skill-tabs-tab {
    border-bottom: 2px solid transparent;
    border-radius: 0;
  }

  .skill-tabs--underline .skill-tabs-tab--active {
    border-bottom-color: var(--skill-primary-500);
    font-weight: 600;
  }

  /* Bordered Variant */
  .skill-tabs--bordered .skill-tabs-tab {
    border: 1px solid var(--tab-border-color);
    border-bottom: none;
    border-radius: var(--skill-radius-md) var(--skill-radius-md) 0 0;
    margin: 0 2px;
  }

  .skill-tabs--bordered .skill-tabs-tab--active {
    background: var(--tabs-bg);
    border-bottom: 1px solid var(--tabs-bg);
    margin-bottom: -1px;
  }

  /* ===== Vertical Orientation Specific Styles ===== */
  .skill-tabs--vertical .skill-tabs-tab {
    width: 100%;
    justify-content: flex-start;
    border-bottom: none;
    border-right: 2px solid transparent;
    border-radius: 0;
    text-align: left;
  }

  .skill-tabs--vertical .skill-tabs-tab--active {
    border-right-color: var(--skill-primary-500);
    background: var(--tab-active-bg);
  }

  .skill-tabs--vertical.skill-tabs--pills .skill-tabs-tab {
    margin: var(--skill-spacing-xs) var(--skill-spacing-md);
    border-radius: var(--skill-radius-md);
  }

  .skill-tabs--vertical.skill-tabs--bordered .skill-tabs-tab {
    border: 1px solid var(--tab-border-color);
    border-right: none;
    margin: 0 0 1px 0;
    border-radius: 0;
  }

  .skill-tabs--vertical.skill-tabs--bordered .skill-tabs-tab--active {
    border-right: 1px solid var(--tabs-bg);
    margin-right: -1px;
  }

  /* ===== Tab Label ===== */
  .skill-tabs-tab-label {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs);
  }

  .skill-tabs-tab-icon {
    display: flex;
    align-items: center;
  }

  /* ===== Tab Badge ===== */
  .skill-tabs-tab-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    background: var(--skill-error-500);
    color: var(--skill-gray-0);
    font-size: 10px;
    font-weight: 600;
    border-radius: 9px;
    line-height: 1;
  }

  .skill-tabs-tab--active .skill-tabs-tab-badge {
    background: var(--skill-primary-600);
  }

  /* ===== Tab Close Button ===== */
  .skill-tabs-tab-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border: none;
    background: transparent;
    border-radius: 50%;
    color: inherit;
    opacity: 0.6;
    cursor: pointer;
    transition: all var(--skill-transition-duration-fast);
  }

  .skill-tabs-tab-close:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.1);
  }

  .skill-tabs-tab-close:focus-visible {
    outline: 1px solid var(--tab-focus-outline);
    outline-offset: 1px;
  }

  /* ===== Add Tab Button ===== */
  .skill-tabs-add {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px dashed var(--skill-gray-300);
    background: transparent;
    border-radius: var(--skill-radius-md);
    color: var(--skill-gray-500);
    cursor: pointer;
    transition: all var(--skill-transition-duration-fast);
  }

  .skill-tabs-add:hover {
    border-color: var(--skill-gray-400);
    color: var(--skill-gray-600);
    background: var(--skill-gray-50);
  }

  .skill-tabs--vertical .skill-tabs-add {
    width: auto;
    height: 32px;
    margin: var(--skill-spacing-sm) var(--skill-spacing-md);
    justify-content: flex-start;
    gap: var(--skill-spacing-xs);
    padding: 0 var(--skill-spacing-sm);
  }

  /* ===== Active Tab Indicator ===== */
  .skill-tabs-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: var(--skill-primary-500);
    transition: all var(--skill-transition-duration-fast) var(--skill-transition-easing);
    border-radius: 1px;
  }

  /* ===== Tab Panels ===== */
  .skill-tabs-panels {
    flex: 1;
    overflow: hidden;
  }

  .skill-tabs-panel {
    padding: var(--skill-spacing-lg);
    outline: none;
  }

  .skill-tabs-panel[hidden] {
    display: none;
  }

  /* ===== Position Variants ===== */
  .skill-tabs--position-bottom .skill-tabs-list--horizontal {
    order: 2;
    border-bottom: none;
    border-top: 1px solid var(--tab-border-color);
  }

  .skill-tabs--position-bottom .skill-tabs-panels {
    order: 1;
  }

  .skill-tabs--position-bottom .skill-tabs-indicator {
    bottom: auto;
    top: 0;
  }

  /* ===== Center Alignment ===== */
  .skill-tabs--center .skill-tabs-nav {
    justify-content: center;
  }

  /* ===== Editable Mode ===== */
  .skill-tabs--editable .skill-tabs-tab {
    padding-right: var(--skill-spacing-sm);
  }

  /* ===== Empty State ===== */
  .skill-tabs-empty {
    padding: var(--skill-spacing-xl);
    text-align: center;
    color: var(--skill-gray-500);
  }

  /* ===== Responsive Design ===== */
  @media (max-width: 768px) {
    .skill-tabs--vertical {
      flex-direction: column;
    }

    .skill-tabs--vertical .skill-tabs-list--vertical {
      border-right: none;
      border-bottom: 1px solid var(--tab-border-color);
      min-width: auto;
      overflow-x: auto;
      flex-direction: row;
    }

    .skill-tabs--vertical .skill-tabs-tab {
      border-bottom: 2px solid transparent;
      border-right: none;
      justify-content: center;
      min-width: 80px;
    }

    .skill-tabs--vertical .skill-tabs-tab--active {
      border-bottom-color: var(--skill-primary-500);
      border-right-color: transparent;
    }

    .skill-tabs-tab {
      padding: var(--skill-spacing-sm) var(--skill-spacing-md);
      font-size: var(--skill-font-body-3);
    }

    .skill-tabs-panel {
      padding: var(--skill-spacing-md);
    }
  }

  @media (max-width: 480px) {
    .skill-tabs-list--scrollable {
      scrollbar-width: none;
    }

    .skill-tabs-list--scrollable::-webkit-scrollbar {
      display: none;
    }

    .skill-tabs-tab {
      padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
      font-size: var(--skill-font-body-4);
    }

    .skill-tabs-panel {
      padding: var(--skill-spacing-sm);
    }
  }

  /* ===== High Contrast Mode Support ===== */
  @media (prefers-contrast: high) {
    .skill-tabs-tab {
      border-bottom-width: 3px;
    }

    .skill-tabs-tab:focus-visible {
      outline-width: 3px;
    }

    .skill-tabs-indicator {
      height: 3px;
    }

    .skill-tabs--bordered .skill-tabs-tab {
      border-width: 2px;
    }
  }

  /* ===== Reduced Motion Support ===== */
  @media (prefers-reduced-motion: reduce) {
    .skill-tabs-tab,
    .skill-tabs-tab-close,
    .skill-tabs-add,
    .skill-tabs-indicator {
      transition: none;
    }
  }

  /* ===== Dark Mode Support ===== */
  @media (prefers-color-scheme: dark) {
    :host {
      --tabs-bg: var(--skill-gray-800);
      --tab-hover-bg: var(--skill-gray-700);
      --tab-color: var(--skill-gray-300);
      --tab-active-color: var(--skill-primary-400);
      --tab-border-color: var(--skill-gray-600);
    }

    .skill-tabs-tab-badge {
      background: var(--skill-error-600);
    }

    .skill-tabs-tab--active .skill-tabs-tab-badge {
      background: var(--skill-primary-600);
    }

    .skill-tabs-tab-close:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .skill-tabs-add {
      border-color: var(--skill-gray-500);
      color: var(--skill-gray-400);
    }

    .skill-tabs-add:hover {
      border-color: var(--skill-gray-400);
      color: var(--skill-gray-300);
      background: var(--skill-gray-700);
    }
  }

  /* ===== Print Styles ===== */
  @media print {
    .skill-tabs-list {
      display: none;
    }

    .skill-tabs-panel {
      display: block !important;
      page-break-inside: avoid;
    }

    .skill-tabs-panel[hidden] {
      display: none !important;
    }
  }

  /* ===== Focus Management Enhancement ===== */
  .skill-tabs-tab[tabindex="0"] {
    position: relative;
  }

  /* ===== Loading State ===== */
  .skill-tabs-tab--loading {
    opacity: 0.6;
    pointer-events: none;
  }

  .skill-tabs-tab--loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    margin: -6px 0 0 -6px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  /* ===== Utility Classes ===== */
  .skill-tabs--no-padding .skill-tabs-panel {
    padding: 0;
  }

  .skill-tabs--compact .skill-tabs-tab {
    padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
  }

  /* ===== Animation for Tab Content ===== */
  .skill-tabs-panel {
    animation: tab-content-fade-in var(--skill-transition-duration-normal) var(--skill-transition-easing);
  }

  @keyframes tab-content-fade-in {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* ===== Custom Properties Override Support ===== */
  .skill-tabs-tab {
    /* Allow runtime customization */
    --tab-padding-x: var(--skill-spacing-md);
    --tab-padding-y: var(--skill-spacing-sm);
    --tab-border-radius: 0;
    --tab-border-width: 2px;
    --tab-font-size: var(--skill-font-body-2);
    --tab-font-weight: 500;
  }

  /* ===== Content Alignment ===== */
  .skill-tabs-panel--center {
    text-align: center;
  }

  .skill-tabs-panel--start {
    text-align: start;
  }

  .skill-tabs-panel--end {
    text-align: end;
  }
`;