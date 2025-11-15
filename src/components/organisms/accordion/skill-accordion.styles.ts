/**
 * Skill Accordion Styles - 手风琴组件样式
 * 提供可折叠的面板组件，支持单个或多个展开模式
 */
import { css } from 'lit';

export const accordionStyles = css`
  :host {
    display: block;
    width: 100%;
  }

  /* 手风琴容器 */
  .skill-accordion {
    background-color: var(--skill-accordion-bg, transparent);
    border-radius: var(--skill-accordion-border-radius, var(--skill-radius-lg, 8px));
    overflow: hidden;
  }

  .skill-accordion--bordered {
    border: 1px solid var(--skill-accordion-border-color, var(--skill-gray-200));
    background-color: var(--skill-accordion-bg, #fff);
  }

  .skill-accordion--ghost {
    background-color: transparent;
    border: none;
  }

  .skill-accordion--sm .skill-accordion__item {
    font-size: var(--skill-text-sm, 14px);
  }

  .skill-accordion--sm .skill-accordion__header {
    padding: var(--skill-accordion-header-padding-sm, 12px 16px);
    min-height: var(--skill-accordion-header-height-sm, 40px);
  }

  .skill-accordion--sm .skill-accordion__content {
    padding: var(--skill-accordion-content-padding-sm, 12px 16px);
    font-size: var(--skill-text-sm, 14px);
  }

  .skill-accordion--md .skill-accordion__item {
    font-size: var(--skill-text-base, 16px);
  }

  .skill-accordion--md .skill-accordion__header {
    padding: var(--skill-accordion-header-padding-md, 16px 20px);
    min-height: var(--skill-accordion-header-height-md, 48px);
  }

  .skill-accordion--md .skill-accordion__content {
    padding: var(--skill-accordion-content-padding-md, 16px 20px);
    font-size: var(--skill-text-base, 16px);
  }

  .skill-accordion--lg .skill-accordion__item {
    font-size: var(--skill-text-lg, 18px);
  }

  .skill-accordion--lg .skill-accordion__header {
    padding: var(--skill-accordion-header-padding-lg, 20px 24px);
    min-height: var(--skill-accordion-header-height-lg, 56px);
  }

  .skill-accordion--lg .skill-accordion__content {
    padding: var(--skill-accordion-content-padding-lg, 20px 24px);
    font-size: var(--skill-text-lg, 18px);
  }

  /* 手风琴项目 */
  .skill-accordion__item {
    border-bottom: 1px solid var(--skill-accordion-item-border-color, var(--skill-gray-200));
    background-color: var(--skill-accordion-item-bg, #fff);
    transition: all var(--skill-duration-normal, 0.3s) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  .skill-accordion__item:last-child {
    border-bottom: none;
  }

  .skill-accordion__item--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  .skill-accordion--ghost .skill-accordion__item {
    background-color: transparent;
    border-bottom-color: var(--skill-accordion-ghost-border-color, var(--skill-gray-200));
  }

  .skill-accordion--bordered .skill-accordion__item:first-child {
    border-radius: var(--skill-accordion-border-radius, var(--skill-radius-lg, 8px)) var(--skill-accordion-border-radius, var(--skill-radius-lg, 8px)) 0 0;
  }

  .skill-accordion--bordered .skill-accordion__item:last-child {
    border-radius: 0 0 var(--skill-accordion-border-radius, var(--skill-radius-lg, 8px)) var(--skill-accordion-border-radius, var(--skill-radius-lg, 8px));
  }

  /* 手风琴头部 */
  .skill-accordion__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    outline: none;
    transition: all var(--skill-duration-fast, 0.2s) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
    position: relative;
    color: var(--skill-accordion-header-color, var(--skill-gray-900));
    font-weight: var(--skill-accordion-header-font-weight, 500);
    line-height: var(--skill-accordion-header-line-height, 1.5);
  }

  .skill-accordion__header:hover {
    background-color: var(--skill-accordion-header-hover-bg, var(--skill-gray-50));
  }

  .skill-accordion__header:focus {
    background-color: var(--skill-accordion-header-focus-bg, var(--skill-primary-50));
    box-shadow: var(--skill-accordion-header-focus-shadow, inset 0 0 0 2px var(--skill-primary-200));
  }

  .skill-accordion--ghost .skill-accordion__header:hover {
    background-color: var(--skill-accordion-ghost-header-hover-bg, var(--skill-gray-100));
  }

  /* 头部内容 */
  .skill-accordion__header-content {
    flex: 1;
    display: flex;
    align-items: center;
    gap: var(--skill-accordion-header-content-gap, 12px);
  }

  .skill-accordion__header-title {
    flex: 1;
    margin: 0;
  }

  .skill-accordion__header-extra {
    color: var(--skill-accordion-header-extra-color, var(--skill-gray-500));
    font-size: var(--skill-accordion-header-extra-font-size, 14px);
  }

  /* 箭头图标 */
  .skill-accordion__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--skill-accordion-arrow-size, 20px);
    height: var(--skill-accordion-arrow-size, 20px);
    color: var(--skill-accordion-arrow-color, var(--skill-gray-500));
    transition: transform var(--skill-duration-normal, 0.3s) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
    flex-shrink: 0;
  }

  .skill-accordion__arrow svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  .skill-accordion__item--active .skill-accordion__arrow {
    transform: rotate(180deg);
    color: var(--skill-accordion-arrow-active-color, var(--skill-primary-500));
  }

  /* 箭头位置 */
  .skill-accordion--icon-left .skill-accordion__header-content {
    order: 1;
  }

  .skill-accordion--icon-left .skill-accordion__arrow {
    order: 0;
    margin-right: var(--skill-accordion-arrow-margin, 8px);
  }

  .skill-accordion--icon-right .skill-accordion__header-content {
    order: 0;
  }

  .skill-accordion--icon-right .skill-accordion__arrow {
    order: 1;
    margin-left: var(--skill-accordion-arrow-margin, 8px);
  }

  /* 手风琴内容 */
  .skill-accordion__content {
    background-color: var(--skill-accordion-content-bg, var(--skill-gray-50));
    color: var(--skill-accordion-content-color, var(--skill-gray-700));
    border-top: 1px solid var(--skill-accordion-content-border-color, var(--skill-gray-200));
    overflow: hidden;
    transition: all var(--skill-duration-normal, 0.3s) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
    max-height: 0;
    opacity: 0;
  }

  .skill-accordion--ghost .skill-accordion__content {
    background-color: transparent;
    border-top-color: var(--skill-accordion-ghost-content-border-color, var(--skill-gray-200));
  }

  .skill-accordion__item--active .skill-accordion__content {
    max-height: var(--skill-accordion-content-max-height, 2000px);
    opacity: 1;
  }

  .skill-accordion__content-inner {
    padding: var(--skill-accordion-content-padding, 16px 20px);
  }

  /* 无边框模式下的间距调整 */
  .skill-accordion--ghost .skill-accordion__item {
    margin-bottom: var(--skill-accordion-ghost-item-margin, 8px);
    border-radius: var(--skill-accordion-ghost-item-radius, var(--skill-radius-md, 6px));
    border: 1px solid var(--skill-accordion-ghost-item-border-color, var(--skill-gray-200));
  }

  .skill-accordion--ghost .skill-accordion__item:last-child {
    margin-bottom: 0;
  }

  /* 动画效果 */
  .skill-accordion__content-inner {
    animation: skill-accordion-fadeIn var(--skill-duration-normal, 0.3s) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  @keyframes skill-accordion-fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 焦点样式 */
  .skill-accordion__header:focus-visible {
    outline: 2px solid var(--skill-primary-500);
    outline-offset: -2px;
  }

  /* 加载状态 */
  .skill-accordion__content-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--skill-accordion-content-padding, 16px 20px);
    color: var(--skill-gray-500);
    font-size: 14px;
  }

  .skill-accordion__content-loading::after {
    content: '';
    width: 16px;
    height: 16px;
    border: 2px solid var(--skill-gray-300);
    border-top-color: var(--skill-primary-500);
    border-radius: 50%;
    animation: skill-accordion-spin 1s linear infinite;
    margin-left: 8px;
  }

  @keyframes skill-accordion-spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* 错误状态 */
  .skill-accordion__content-error {
    padding: var(--skill-accordion-content-padding, 16px 20px);
    background-color: var(--skill-error-50, #FEE6E7);
    color: var(--skill-error-600, #DC2626);
    border-top: 1px solid var(--skill-error-200, #FCB3B4);
  }

  /* 自定义箭头样式 */
  .skill-accordion__arrow--custom {
    width: auto;
    height: auto;
  }

  /* 大尺寸下的调整 */
  @media (min-width: 768px) {
    .skill-accordion--lg .skill-accordion__content-inner {
      padding: var(--skill-accordion-content-padding-lg, 24px 28px);
    }
  }

  /* 暗色主题支持 */
  .skill-accordion--dark {
    --skill-accordion-bg: var(--skill-gray-800);
    --skill-accordion-item-bg: var(--skill-gray-700);
    --skill-accordion-header-color: var(--skill-gray-100);
    --skill-accordion-content-color: var(--skill-gray-300);
    --skill-accordion-item-border-color: var(--skill-gray-600);
    --skill-accordion-content-border-color: var(--skill-gray-600);
    --skill-accordion-arrow-color: var(--skill-gray-400);
    --skill-accordion-header-hover-bg: var(--skill-gray-600);
    --skill-accordion-content-bg: var(--skill-gray-800);
  }

  /* 无障碍支持 */
  .skill-accordion__header[aria-expanded="true"] {
    font-weight: 600;
  }

  .skill-accordion__header[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;