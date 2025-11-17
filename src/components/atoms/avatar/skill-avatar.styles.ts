import { css } from 'lit';

/**
 * Skill Avatar 组件样式
 * 从原 React 项目的 Avatar 组件迁移
 */
export const avatarStyles = css`
  /* ===== 容器样式 ===== */
  :host {
    display: inline-flex;
  }

  .skill-avatar {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--skill-gray-200, #e5e7eb);
    color: var(--skill-gray-800, #1f2937);
    font-family: var(--skill-font-sans, 'Inter', system-ui, sans-serif);
    font-weight: var(--skill-font-medium, 500);
    user-select: none;
    overflow: visible;
    flex-shrink: 0;
  }

  /* ===== 尺寸样式 ===== */
  .skill-avatar--xs {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.625rem;
  }

  .skill-avatar--sm {
    width: 2rem;
    height: 2rem;
    font-size: 0.75rem;
  }

  .skill-avatar--md {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 0.875rem;
  }

  .skill-avatar--lg {
    width: 3rem;
    height: 3rem;
    font-size: 1rem;
  }

  .skill-avatar--xl {
    width: 4rem;
    height: 4rem;
    font-size: 1.25rem;
  }

  .skill-avatar--2xl {
    width: 5rem;
    height: 5rem;
    font-size: 1.5rem;
  }

  /* ===== 形状样式 ===== */
  .skill-avatar--circle {
    border-radius: var(--skill-radius-full, 9999px);
  }

  .skill-avatar--square {
    border-radius: var(--skill-radius-base, 0.25rem);
  }

  /* ===== 图片样式 ===== */
  .skill-avatar__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* ===== 文字样式 ===== */
  .skill-avatar__text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  /* ===== 图标样式 ===== */
  .skill-avatar__icon {
    width: 50%;
    height: 50%;
    color: var(--skill-gray-500, #6b7280);
  }

  /* ===== 状态指示器 ===== */
  .skill-avatar__status {
    position: absolute;
    display: block;
    border: 2px solid var(--skill-gray-0, #ffffff);
    border-radius: var(--skill-radius-full, 9999px);
    z-index: 10;
  }

  .skill-avatar--xs .skill-avatar__status {
    bottom: -1px;
    right: -1px;
    width: 0.5rem;
    height: 0.5rem;
    border-width: 1.5px;
  }

  .skill-avatar--sm .skill-avatar__status {
    bottom: -1px;
    right: -1px;
    width: 0.625rem;
    height: 0.625rem;
    border-width: 1.5px;
  }

  .skill-avatar--md .skill-avatar__status {
    bottom: -1px;
    right: -1px;
    width: 0.75rem;
    height: 0.75rem;
  }

  .skill-avatar--lg .skill-avatar__status {
    bottom: 0.125rem;
    right: 0.125rem;
    width: 0.875rem;
    height: 0.875rem;
  }

  .skill-avatar--xl .skill-avatar__status {
    bottom: 0.125rem;
    right: 0.125rem;
    width: 1rem;
    height: 1rem;
  }

  .skill-avatar--2xl .skill-avatar__status {
    bottom: 0.25rem;
    right: 0.25rem;
    width: 1.25rem;
    height: 1.25rem;
  }

  /* ===== 状态颜色 ===== */
  .skill-avatar__status--online {
    background: var(--skill-success-500, #22c55e);
  }

  .skill-avatar__status--offline {
    background: var(--skill-gray-500, #6b7280);
  }

  .skill-avatar__status--away {
    background: var(--skill-warning-500, #f59e0b);
  }

  .skill-avatar__status--busy {
    background: var(--skill-error-500, #ef4444);
  }

  /* ===== 响应式设计 ===== */
  @media (max-width: 768px) {
    .skill-avatar--xs {
      width: 1.375rem;
      height: 1.375rem;
      font-size: 0.5625rem;
    }

    .skill-avatar--sm {
      width: 1.875rem;
      height: 1.875rem;
      font-size: 0.6875rem;
    }

    .skill-avatar--md {
      width: 2.25rem;
      height: 2.25rem;
      font-size: 0.8125rem;
    }

    .skill-avatar--lg {
      width: 2.75rem;
      height: 2.75rem;
      font-size: 0.9375rem;
    }

    .skill-avatar--xl {
      width: 3.75rem;
      height: 3.75rem;
      font-size: 1.125rem;
    }

    .skill-avatar--2xl {
      width: 4.5rem;
      height: 4.5rem;
      font-size: 1.375rem;
    }

    /* 移动端状态指示器调整 */
    .skill-avatar--xs .skill-avatar__status {
      width: 0.5625rem;
      height: 0.5625rem;
      bottom: -1px;
      right: -1px;
      border-width: 1.5px;
    }

    .skill-avatar--sm .skill-avatar__status {
      width: 0.6875rem;
      height: 0.6875rem;
    }

    .skill-avatar--md .skill-avatar__status {
      width: 0.8125rem;
      height: 0.8125rem;
    }

    .skill-avatar--lg .skill-avatar__status {
      width: 0.9375rem;
      height: 0.9375rem;
    }

    .skill-avatar--xl .skill-avatar__status {
      width: 1.0625rem;
      height: 1.0625rem;
    }

    .skill-avatar--2xl .skill-avatar__status {
      width: 1.3125rem;
      height: 1.3125rem;
    }
  }
`;
