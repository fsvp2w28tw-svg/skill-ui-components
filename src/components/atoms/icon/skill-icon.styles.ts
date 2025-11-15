import { css } from 'lit';

/**
 * Skill Icon 组件样式
 */
export const iconStyles = css`
  /* ===== 基础容器样式 ===== */

  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
  }

  /* ===== SVG 样式 ===== */

  svg {
    display: block;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    color: inherit;
  }

  /* ===== 尺寸变体 ===== */

  :host([size='xs']) svg {
    width: 12px;
    height: 12px;
  }

  :host([size='sm']) svg {
    width: 16px;
    height: 16px;
  }

  :host([size='md']) svg {
    width: 20px;
    height: 20px;
  }

  :host([size='lg']) svg {
    width: 24px;
    height: 24px;
  }

  :host([size='xl']) svg {
    width: 28px;
    height: 28px;
  }

  :host([size='2xl']) svg {
    width: 32px;
    height: 32px;
  }

  :host([size='3xl']) svg {
    width: 36px;
    height: 36px;
  }

  :host([size='4xl']) svg {
    width: 40px;
    height: 40px;
  }

  /* ===== 加载动画 ===== */

  :host([spin]) svg {
    animation: icon-spin 1s linear infinite;
  }

  @keyframes icon-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* ===== 颜色变体 ===== */

  :host([color='primary']) svg {
    color: var(--skill-primary-500, #3b82f6);
  }

  :host([color='secondary']) svg {
    color: var(--skill-gray-600, #4b5563);
  }

  :host([color='success']) svg {
    color: var(--skill-success-500, #10b981);
  }

  :host([color='warning']) svg {
    color: var(--skill-warning-500, #f59e0b);
  }

  :host([color='error']) svg {
    color: var(--skill-error-500, #ef4444);
  }

  :host([color='neutral']) svg {
    color: var(--skill-gray-500, #6b7280);
  }
`;
