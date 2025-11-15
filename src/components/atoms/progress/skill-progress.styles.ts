import { css } from 'lit';

export const progressStyles = css`
  :host {
    display: inline-block;
    width: 100%;
  }

  .skill-progress {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm, 12px);
  }

  /* 线性进度条基础样式 */
  .skill-progress__bar {
    flex: 1;
    height: var(--progress-height, 8px);
    background: var(--skill-gray-200, #E5E8EB);
    border-radius: var(--progress-radius, var(--skill-radius-full, 9999px));
    overflow: hidden;
    position: relative;
    transition: all var(--skill-duration-normal, 300ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  .skill-progress__fill {
    height: 100%;
    background: var(--progress-color, var(--skill-primary-500, #0A59F7));
    border-radius: inherit;
    transition: width var(--progress-duration, var(--skill-duration-normal, 300ms)) var(--progress-ease, var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1)));
    position: relative;
    overflow: hidden;
  }

  /* 进度条条纹效果 */
  :host([striped]) .skill-progress__fill {
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: var(--stripe-size, 1rem) var(--stripe-size, 1rem);
  }

  /* 动画条纹效果 */
  :host([animated]) .skill-progress__fill {
    animation: progress-stripes 1s linear infinite;
  }

  @keyframes progress-stripes {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: var(--stripe-size, 1rem) var(--stripe-size, 1rem);
    }
  }

  /* 圆形进度条 */
  :host([type='circular']) .skill-progress {
    display: inline-block;
    position: relative;
    width: var(--progress-size, 120px);
    height: var(--progress-size, 120px);
  }

  :host([type='circular']) .skill-progress__circular {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([type='circular']) .skill-progress__circle {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(-90deg);
  }

  :host([type='circular']) .skill-progress__circle-bg {
    fill: none;
    stroke: var(--skill-gray-200, #E5E8EB);
    stroke-width: var(--stroke-width, 8);
  }

  :host([type='circular']) .skill-progress__circle-progress {
    fill: none;
    stroke: var(--progress-color, var(--skill-primary-500, #0A59F7));
    stroke-width: var(--stroke-width, 8);
    stroke-linecap: round;
    transition: stroke-dashoffset var(--progress-duration, var(--skill-duration-normal, 300ms)) var(--progress-ease, var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  :host([type='circular']) .skill-progress__content {
    position: relative;
    z-index: 1;
    font-size: var(--content-font-size, var(--skill-font-size-title-3, 20px));
    font-weight: var(--content-font-weight, var(--skill-font-weight-semibold, 600));
    color: var(--content-color, var(--skill-gray-900, #1A1A1A));
  }

  /* 尺寸变体 */
  :host([size='xs']) {
    --progress-height: 4px;
    --content-font-size: var(--skill-font-size-caption, 10px);
  }

  :host([size='sm']) {
    --progress-height: 6px;
    --content-font-size: var(--skill-font-size-body-3, 12px);
  }

  :host([size='md']) {
    --progress-height: 8px;
    --content-font-size: var(--skill-font-size-body-2, 14px);
  }

  :host([size='lg']) {
    --progress-height: 12px;
    --content-font-size: var(--skill-font-size-body-1, 16px);
  }

  :host([size='xl']) {
    --progress-height: 16px;
    --content-font-size: var(--skill-font-size-title-3, 20px);
  }

  :host([type='circular'][size='xs']) {
    --progress-size: 60px;
    --stroke-width: 4;
    --content-font-size: var(--skill-font-size-body-3, 12px);
  }

  :host([type='circular'][size='sm']) {
    --progress-size: 80px;
    --stroke-width: 6;
    --content-font-size: var(--skill-font-size-body-2, 14px);
  }

  :host([type='circular'][size='md']) {
    --progress-size: 120px;
    --stroke-width: 8;
    --content-font-size: var(--skill-font-size-title-3, 20px);
  }

  :host([type='circular'][size='lg']) {
    --progress-size: 160px;
    --stroke-width: 12;
    --content-font-size: var(--skill-font-size-title-2, 24px);
  }

  :host([type='circular'][size='xl']) {
    --progress-size: 200px;
    --stroke-width: 16;
    --content-font-size: var(--skill-font-size-title-1, 28px);
  }

  /* 颜色变体 */
  :host([color='primary']) {
    --progress-color: var(--skill-primary-500, #0A59F7);
  }

  :host([color='secondary']) {
    --progress-color: var(--skill-secondary-500, #00D4AA);
  }

  :host([color='success']) {
    --progress-color: var(--skill-success-500, #00D4AA);
  }

  :host([color='warning']) {
    --progress-color: var(--skill-warning-500, #FFB400);
  }

  :host([color='error']) {
    --progress-color: var(--skill-error-500, #FA2A2D);
  }

  :host([color='info']) {
    --progress-color: var(--skill-info-500, #0A59F7);
  }

  /* 状态变体 */
  :host([status='loading']) .skill-progress__fill {
    position: relative;
    overflow: hidden;
  }

  :host([status='loading']) .skill-progress__fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: progress-loading 1.5s infinite;
  }

  @keyframes progress-loading {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  :host([status='success']) {
    --progress-color: var(--skill-success-500, #00D4AA);
  }

  :host([status='error']) {
    --progress-color: var(--skill-error-500, #FA2A2D);
  }

  :host([status='warning']) {
    --progress-color: var(--skill-warning-500, #FFB400);
  }

  /* 标签样式 */
  .skill-progress__label {
    font-size: var(--label-font-size, var(--skill-font-size-body-2, 14px));
    font-weight: var(--label-font-weight, var(--skill-font-weight-medium, 500));
    color: var(--label-color, var(--skill-gray-700, #5A5A5A));
    white-space: nowrap;
  }

  .skill-progress__value {
    font-size: var(--value-font-size, var(--skill-font-size-body-2, 14px));
    font-weight: var(--value-font-weight, var(--skill-font-weight-medium, 500));
    color: var(--value-color, var(--skill-gray-700, #5A5A5A));
    min-width: var(--value-min-width, 45px);
    text-align: right;
  }

  /* 标签位置 */
  :host([label-position='top']) .skill-progress {
    flex-direction: column;
    align-items: stretch;
  }

  :host([label-position='top']) .skill-progress__label {
    margin-bottom: var(--skill-spacing-xs, 8px);
    text-align: left;
  }

  :host([label-position='bottom']) .skill-progress {
    flex-direction: column;
    align-items: stretch;
  }

  :host([label-position='bottom']) .skill-progress__label {
    margin-top: var(--skill-spacing-xs, 8px);
    text-align: left;
  }

  :host([label-position='hidden']) .skill-progress__label {
    display: none;
  }

  :host([value-position='left']) .skill-progress__value {
    order: -1;
    text-align: left;
  }

  :host([value-position='hidden']) .skill-progress__value {
    display: none;
  }

  /* 圆形进度条标签 */
  :host([type='circular'][label-position='top']) .skill-progress {
    flex-direction: column;
  }

  :host([type='circular'][label-position='top']) .skill-progress__label {
    margin-bottom: var(--skill-spacing-sm, 12px);
    text-align: center;
  }

  :host([type='circular'][label-position='bottom']) .skill-progress {
    flex-direction: column;
  }

  :host([type='circular'][label-position='bottom']) .skill-progress__label {
    margin-top: var(--skill-spacing-sm, 12px);
    text-align: center;
  }

  /* 缓动函数变体 */
  :host([easing='linear']) {
    --progress-ease: linear;
  }

  :host([easing='ease-in']) {
    --progress-ease: var(--skill-ease-in, cubic-bezier(0.4, 0, 1, 1));
  }

  :host([easing='ease-out']) {
    --progress-ease: var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  :host([easing='ease-in-out']) {
    --progress-ease: var(--skill-ease-in-out, cubic-bezier(0.4, 0, 0.2, 1));
  }

  :host([easing='bounce']) {
    --progress-ease: var(--skill-ease-bounce, cubic-bezier(0.68, -0.55, 0.265, 1.55));
  }

  :host([easing='spring']) {
    --progress-ease: var(--skill-ease-spring, cubic-bezier(0.68, -0.55, 0.265, 1.55));
  }

  /* 动画时长变体 */
  :host([duration='instant']) {
    --progress-duration: var(--skill-duration-instant, 100ms);
  }

  :host([duration='fast']) {
    --progress-duration: var(--skill-duration-fast, 200ms);
  }

  :host([duration='normal']) {
    --progress-duration: var(--skill-duration-normal, 300ms);
  }

  :host([duration='slow']) {
    --progress-duration: var(--skill-duration-slow, 500ms);
  }

  :host([duration='slower']) {
    --progress-duration: var(--skill-duration-slower, 800ms);
  }

  /* 无障碍支持 */
  :host([indeterminate]) .skill-progress__fill {
    width: 30%;
    animation: progress-indeterminate 2s infinite ease-in-out;
  }

  @keyframes progress-indeterminate {
    0% {
      left: -30%;
    }
    50% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }

  :host([indeterminate]) .skill-progress__fill {
    position: absolute;
    left: -30%;
    top: 0;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    :host([responsive]) .skill-progress__label {
      font-size: var(--skill-font-size-body-3, 12px);
    }

    :host([responsive]) .skill-progress__value {
      font-size: var(--skill-font-size-body-3, 12px);
    }
  }

  /* 高对比度模式支持 */
  @media (prefers-contrast: high) {
    .skill-progress__bar {
      border: 1px solid var(--skill-gray-600, #6B7280);
    }

    .skill-progress__fill {
      border: 1px solid var(--skill-gray-900, #1A1A1A);
    }
  }

  /* 减少动画模式支持 */
  @media (prefers-reduced-motion: reduce) {
    .skill-progress__fill,
    .skill-progress__circle-progress {
      transition: none;
    }

    .skill-progress__fill::after,
    .skill-progress__circle-progress::after {
      animation: none;
    }

    :host([striped][animated]) .skill-progress__fill {
      animation: none;
    }
  }

  /* 自定义CSS变量支持 */
  .skill-progress {
    --progress-height: 8px;
    --progress-radius: var(--skill-radius-full, 9999px);
    --progress-size: 120px;
    --stroke-width: 8;
    --stripe-size: 1rem;
    --progress-duration: var(--skill-duration-normal, 300ms);
    --progress-ease: var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
    --progress-color: var(--skill-primary-500, #0A59F7);
    --label-font-size: var(--skill-font-size-body-2, 14px);
    --label-font-weight: var(--skill-font-weight-medium, 500);
    --label-color: var(--skill-gray-700, #5A5A5A);
    --value-font-size: var(--skill-font-size-body-2, 14px);
    --value-font-weight: var(--skill-font-weight-medium, 500);
    --value-color: var(--skill-gray-700, #5A5A5A);
    --value-min-width: 45px;
    --content-font-size: var(--skill-font-size-title-3, 20px);
    --content-font-weight: var(--skill-font-weight-semibold, 600);
    --content-color: var(--skill-gray-900, #1A1A1A);
  }
`;