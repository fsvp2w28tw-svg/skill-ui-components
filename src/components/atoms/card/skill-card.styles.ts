import { css } from 'lit';

/**
 * Skill Card 组件样式
 * 从原 React 项目的 Card 组件迁移
 */
export const cardStyles = css`
  :host {
    display: block;
  }

  .skill-card {
    background: var(--skill-gray-0, #ffffff);
    border: 1px solid var(--skill-gray-200, #e5e7eb);
    border-radius: var(--skill-radius-lg, 0.5rem);
    box-shadow: var(--skill-shadow-base, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06));
    overflow: hidden;
    transition: all var(--skill-duration-base, 200ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 0;
  }

  .skill-card__media {
    display: block;
    width: 100%;
    overflow: hidden;
    background: var(--skill-gray-50, #f9fafb);
  }

  .skill-card__media[hidden] {
    display: none;
  }

  ::slotted([slot="media"]) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .skill-card__sections {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--skill-card-section-gap, 0);
    padding: var(--skill-spacing-8, 2rem);
    background: inherit;
  }

  .skill-card--padding-none .skill-card__sections {
    padding: 0;
  }

  .skill-card--padding-sm .skill-card__sections {
    padding: 1rem;
  }

  .skill-card--padding-md .skill-card__sections {
    padding: 1.5rem;
  }

  .skill-card--padding-lg .skill-card__sections {
    padding: 2rem;
  }

  /* Hover & Focus */
  .skill-card--hoverable {
    cursor: pointer;
  }

  .skill-card--hoverable:focus-visible {
    outline: 2px solid var(--skill-primary-300, #93c5fd);
    outline-offset: 2px;
  }

  .skill-card--hoverable:not(.skill-card--disabled):not(.skill-card--loading):hover {
    box-shadow: var(--skill-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
    transform: translateY(-2px);
    border-color: var(--skill-primary-200, #bfdbfe);
  }

  .skill-card--hoverable:not(.skill-card--disabled):not(.skill-card--loading):active {
    transform: translateY(0);
    box-shadow: var(--skill-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
  }

  .skill-card--disabled {
    opacity: 0.75;
    filter: saturate(0.9);
  }

  .skill-card--disabled.skill-card--hoverable {
    cursor: not-allowed;
  }

  .skill-card--loading {
    cursor: progress;
  }

  /* Media 布局 */
  .skill-card--has-media:not(.skill-card--media-start) .skill-card__media {
    border-bottom: 1px solid var(--skill-gray-200, #e5e7eb);
  }

  .skill-card--media-start {
    flex-direction: row;
  }

  .skill-card--media-start .skill-card__media {
    flex: 0 0 var(--skill-card-media-width, 240px);
    max-width: min(320px, 40%);
    border-bottom: none;
    border-right: 1px solid var(--skill-gray-200, #e5e7eb);
  }

  /* 插槽区域样式 */
  ::slotted([slot="header"]) {
    display: block;
    padding: var(--skill-spacing-6, 1.5rem);
    border-bottom: 1px solid var(--skill-gray-200, #e5e7eb);
    background: var(--skill-gray-50, #f9fafb);
  }

  ::slotted([slot="body"]) {
    display: block;
    padding: var(--skill-spacing-6, 1.5rem);
  }

  ::slotted([slot="footer"]) {
    display: block;
    padding: var(--skill-spacing-6, 1.5rem);
    border-top: 1px solid var(--skill-gray-200, #e5e7eb);
    background: var(--skill-gray-50, #f9fafb);
  }

  .skill-card__content {
    display: block;
    width: 100%;
  }

  /* 变体样式 */
  .skill-card--outlined {
    border-width: 2px;
    box-shadow: none;
  }

  .skill-card--elevated {
    border: none;
    box-shadow: var(--skill-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05));
  }

  .skill-card--elevated.skill-card--hoverable:hover {
    box-shadow: var(--skill-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04));
  }

  .skill-card--flat {
    border: none;
    box-shadow: none;
    background: var(--skill-gray-50, #f9fafb);
  }

  /* Loading 覆盖层 */
  .skill-card__loading {
    position: absolute;
    inset: 0;
    background: var(--skill-card-loading-overlay, rgba(255, 255, 255, 0.85));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--skill-spacing-2, 0.5rem);
    z-index: 1;
    pointer-events: none;
  }

  .skill-card__spinner {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 3px solid var(--skill-gray-200, #e5e7eb);
    border-top-color: var(--skill-primary-500, #3b82f6);
    animation: skill-card-spin 1s linear infinite;
  }

  .skill-card__loading-text {
    font-size: var(--skill-font-size-sm, 0.875rem);
    color: var(--skill-gray-600, #4b5563);
    font-weight: var(--skill-font-weight-medium, 500);
  }

  @keyframes skill-card-spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .skill-card--media-start {
      flex-direction: column;
    }

    .skill-card--media-start .skill-card__media {
      max-width: 100%;
      border-right: none;
      border-bottom: 1px solid var(--skill-gray-200, #e5e7eb);
    }

    .skill-card--padding-sm .skill-card__sections {
      padding: 0.75rem;
    }

    .skill-card--padding-md .skill-card__sections {
      padding: 1rem;
    }

    .skill-card--padding-lg .skill-card__sections {
      padding: 1.5rem;
    }

    ::slotted([slot="header"]),
    ::slotted([slot="body"]),
    ::slotted([slot="footer"]) {
      padding: var(--skill-spacing-4, 1rem);
    }
  }
`;
