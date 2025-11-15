import { css } from 'lit';

/**
 * Skill Card 组件样式
 * 从原 React 项目的 Card 组件迁移
 */
export const cardStyles = css`
  /* ===== 容器样式 ===== */
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
  }

  /* ===== Hoverable 状态 ===== */
  .skill-card--hoverable {
    cursor: pointer;
  }

  .skill-card--hoverable:hover {
    box-shadow: var(--skill-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
    transform: translateY(-2px);
    border-color: var(--skill-primary-200, #bfdbfe);
  }

  .skill-card--hoverable:active {
    transform: translateY(0);
    box-shadow: var(--skill-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
  }

  /* ===== Padding 变体 ===== */
  .skill-card--padding-none {
    padding: 0;
  }

  .skill-card--padding-sm {
    padding: 1rem;
  }

  .skill-card--padding-md {
    padding: 1.5rem;
  }

  .skill-card--padding-lg {
    padding: 2rem;
  }

  /* ===== 插槽区域样式 ===== */

  /* Header 插槽 */
  ::slotted([slot="header"]) {
    display: block;
    padding: var(--skill-spacing-6, 1.5rem);
    border-bottom: 1px solid var(--skill-gray-200, #e5e7eb);
    background: var(--skill-gray-50, #f9fafb);
  }

  /* Body 插槽 */
  ::slotted([slot="body"]) {
    display: block;
    padding: var(--skill-spacing-6, 1.5rem);
  }

  /* Footer 插槽 */
  ::slotted([slot="footer"]) {
    display: block;
    padding: var(--skill-spacing-6, 1.5rem);
    border-top: 1px solid var(--skill-gray-200, #e5e7eb);
    background: var(--skill-gray-50, #f9fafb);
  }

  /* 默认插槽（当没有使用命名插槽时） */
  .skill-card__content {
    display: block;
  }

  /* ===== 变体样式 ===== */

  /* Outlined 变体 */
  .skill-card--outlined {
    border-width: 2px;
    box-shadow: none;
  }

  /* Elevated 变体 */
  .skill-card--elevated {
    border: none;
    box-shadow: var(--skill-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05));
  }

  .skill-card--elevated.skill-card--hoverable:hover {
    box-shadow: var(--skill-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04));
  }

  /* Flat 变体 */
  .skill-card--flat {
    border: none;
    box-shadow: none;
    background: var(--skill-gray-50, #f9fafb);
  }

  /* ===== 响应式设计 ===== */
  @media (max-width: 768px) {
    .skill-card--padding-sm {
      padding: 0.75rem;
    }

    .skill-card--padding-md {
      padding: 1rem;
    }

    .skill-card--padding-lg {
      padding: 1.5rem;
    }

    ::slotted([slot="header"]),
    ::slotted([slot="body"]),
    ::slotted([slot="footer"]) {
      padding: var(--skill-spacing-4, 1rem);
    }
  }
`;
