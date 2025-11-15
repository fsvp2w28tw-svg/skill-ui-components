import { css } from 'lit';

export const skeletonStyles = css`
  :host {
    display: inline-block;
    width: 100%;
  }

  .skill-skeleton {
    display: block;
    background: linear-gradient(
      90deg,
      var(--skill-gray-200, #E5E8EB) 25%,
      var(--skill-gray-100, #F1F3F5) 50%,
      var(--skill-gray-200, #E5E8EB) 75%
    );
    background-size: 200% 100%;
    border-radius: var(--skill-radius-base, 4px);
    animation: skeleton-loading 1.5s infinite ease-in-out;
    transition: all var(--skill-duration-normal, 300ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  /* 骨架屏动画 */
  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  /* 脉冲动画变体 */
  :host([animation='pulse']) .skill-skeleton {
    animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes skeleton-pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  /* 波浪动画变体 */
  :host([animation='wave']) .skill-skeleton {
    position: relative;
    overflow: hidden;
    background: var(--skill-gray-200, #E5E8EB);
  }

  :host([animation='wave']) .skill-skeleton::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transform: translateX(-100%);
    animation: skeleton-wave 1.5s infinite ease-out;
  }

  @keyframes skeleton-wave {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  /* 淡入淡出动画变体 */
  :host([animation='fade']) .skill-skeleton {
    animation: skeleton-fade 1.5s infinite ease-in-out;
  }

  @keyframes skeleton-fade {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }

  /* 无动画变体 */
  :host([animation='none']) .skill-skeleton {
    animation: none;
    background: var(--skill-gray-200, #E5E8EB);
  }

  /* 基础形状 */
  :host([shape='text']) .skill-skeleton {
    height: 1em;
    border-radius: var(--skill-radius-xs, 2px);
    max-width: 100%;
  }

  :host([shape='title']) .skill-skeleton {
    height: 1.5em;
    border-radius: var(--skill-radius-sm, 4px);
    width: 60%;
  }

  :host([shape='paragraph']) .skill-skeleton {
    height: 1em;
    border-radius: var(--skill-radius-xs, 2px);
    margin-bottom: 0.5em;
  }

  :host([shape='paragraph']) .skill-skeleton:last-child {
    margin-bottom: 0;
  }

  :host([shape='avatar']) .skill-skeleton {
    width: 40px;
    height: 40px;
    border-radius: var(--skill-radius-full, 9999px);
  }

  :host([shape='circle']) .skill-skeleton {
    border-radius: var(--skill-radius-full, 9999px);
  }

  :host([shape='square']) .skill-skeleton {
    border-radius: var(--skill-radius-xs, 2px);
  }

  :host([shape='rounded']) .skill-skeleton {
    border-radius: var(--skill-radius-lg, 8px);
  }

  /* 尺寸变体 */
  :host([size='xs']) .skill-skeleton {
    width: 60px;
    height: 12px;
  }

  :host([size='sm']) .skill-skeleton {
    width: 80px;
    height: 16px;
  }

  :host([size='md']) .skill-skeleton {
    width: 120px;
    height: 20px;
  }

  :host([size='lg']) .skill-skeleton {
    width: 180px;
    height: 24px;
  }

  :host([size='xl']) .skill-skeleton {
    width: 240px;
    height: 32px;
  }

  /* 自定义尺寸 */
  :host([width]) .skill-skeleton {
    width: var(--skeleton-width, auto);
  }

  :host([height]) .skill-skeleton {
    height: var(--skeleton-height, auto);
  }

  /* 按钮骨架屏 */
  :host([shape='button']) .skill-skeleton {
    height: 40px;
    border-radius: var(--skill-radius-md, 6px);
    padding: 0 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 80px;
  }

  /* 输入框骨架屏 */
  :host([shape='input']) .skill-skeleton {
    height: 40px;
    border-radius: var(--skill-radius-md, 6px);
    border: 1px solid var(--skill-gray-300, #D1D5DB);
  }

  /* 卡片骨架屏 */
  :host([shape='card']) .skill-skeleton {
    border-radius: var(--skill-radius-lg, 8px);
    padding: 16px;
    min-height: 120px;
  }

  /* 图片骨架屏 */
  :host([shape='image']) .skill-skeleton {
    border-radius: var(--skill-radius-base, 4px);
    background: var(--skill-gray-100, #F1F3F5);
    position: relative;
  }

  :host([shape='image']) .skill-skeleton::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    border: 2px solid var(--skill-gray-300, #D1D5DB);
    border-radius: 50%;
    border-top-color: var(--skill-gray-400, #BDBDBD);
    animation: skeleton-image-spin 1s linear infinite;
  }

  @keyframes skeleton-image-spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  /* 表格行骨架屏 */
  :host([shape='table-row']) .skill-skeleton {
    display: flex;
    gap: 16px;
    padding: 12px 0;
    border-bottom: 1px solid var(--skill-gray-200, #E5E8EB);
  }

  :host([shape='table-row']) .skill-skeleton::before,
  :host([shape='table-row']) .skill-skeleton::after {
    content: '';
    flex: 1;
    height: 16px;
    background: inherit;
    border-radius: inherit;
    animation: inherit;
  }

  :host([shape='table-row']) .skill-skeleton::after {
    flex: 2;
  }

  /* 列表项骨架屏 */
  :host([shape='list-item']) .skill-skeleton {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
  }

  :host([shape='list-item']) .skill-skeleton::before {
    content: '';
    width: 32px;
    height: 32px;
    border-radius: var(--skill-radius-full, 9999px);
    background: inherit;
    animation: inherit;
    flex-shrink: 0;
  }

  :host([shape='list-item']) .skill-skeleton::after {
    content: '';
    flex: 1;
    height: 16px;
    background: inherit;
    border-radius: inherit;
    animation: inherit;
  }

  /* 代码块骨架屏 */
  :host([shape='code']) .skill-skeleton {
    font-family: var(--skill-font-family-mono, 'JetBrains Mono', monospace);
    background: var(--skill-gray-900, #1A1A1A) !important;
    border-radius: var(--skill-radius-md, 6px);
    padding: 16px;
    color: var(--skill-gray-600, #6B7280);
  }

  :host([shape='code']) .skill-skeleton::after {
    content: '// Loading code...';
    font-size: 14px;
    opacity: 0.5;
  }

  /* 图表骨架屏 */
  :host([shape='chart']) .skill-skeleton {
    min-height: 200px;
    background: var(--skill-gray-50, #FAFAFA) !important;
    border: 1px dashed var(--skill-gray-300, #D1D5DB);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([shape='chart']) .skill-skeleton::after {
    content: '📊 Loading chart...';
    font-size: 16px;
    color: var(--skill-gray-400, #BDBDBD);
  }

  /* 深色主题 */
  :host([theme='dark']) .skill-skeleton {
    background: linear-gradient(
      90deg,
      var(--skill-gray-700, #5A5A5A) 25%,
      var(--skill-gray-600, #6B7280) 50%,
      var(--skill-gray-700, #5A5A5A) 75%
    );
    background-size: 200% 100%;
  }

  :host([theme='dark'][animation='pulse']) .skill-skeleton {
    background: var(--skill-gray-700, #5A5A5A);
  }

  :host([theme='dark'][animation='wave']) .skill-skeleton {
    background: var(--skill-gray-700, #5A5A5A);
  }

  :host([theme='dark'][animation='fade']) .skill-skeleton {
    background: var(--skill-gray-700, #5A5A5A);
  }

  :host([theme='dark'][animation='none']) .skill-skeleton {
    background: var(--skill-gray-700, #5A5A5A);
  }

  /* 圆角变体 */
  :host([radius='none']) .skill-skeleton {
    border-radius: 0;
  }

  :host([radius='xs']) .skill-skeleton {
    border-radius: var(--skill-radius-xs, 2px);
  }

  :host([radius='sm']) .skill-skeleton {
    border-radius: var(--skill-radius-sm, 4px);
  }

  :host([radius='md']) .skill-skeleton {
    border-radius: var(--skill-radius-md, 6px);
  }

  :host([radius='lg']) .skill-skeleton {
    border-radius: var(--skill-radius-lg, 8px);
  }

  :host([radius='xl']) .skill-skeleton {
    border-radius: var(--skill-radius-xl, 12px);
  }

  :host([radius='full']) .skill-skeleton {
    border-radius: var(--skill-radius-full, 9999px);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    :host([responsive]) .skill-skeleton {
      max-width: 100%;
    }
  }

  /* 加载状态过渡 */
  :host([loading]) .skill-skeleton {
    opacity: 1;
  }

  :host(:not([loading])) .skill-skeleton {
    opacity: 0;
    transition: opacity var(--skill-duration-fast, 200ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  /* 高对比度模式支持 */
  @media (prefers-contrast: high) {
    .skill-skeleton {
      background: var(--skill-gray-400, #BDBDBD);
      animation: none;
    }
  }

  /* 减少动画模式支持 */
  @media (prefers-reduced-motion: reduce) {
    .skill-skeleton {
      animation: none;
    }
  }

  /* 自定义CSS变量支持 */
  .skill-skeleton {
    --skeleton-color-start: var(--skill-gray-200, #E5E8EB);
    --skeleton-color-middle: var(--skill-gray-100, #F1F3F5);
    --skeleton-color-end: var(--skill-gray-200, #E5E8EB);
    --skeleton-animation-duration: 1.5s;
    --skeleton-radius: var(--skill-radius-base, 4px);
  }

  :host(:not([animation='pulse']):not([animation='wave']):not([animation='fade']):not([animation='none'])) .skill-skeleton {
    background: linear-gradient(
      90deg,
      var(--skeleton-color-start) 25%,
      var(--skeleton-color-middle) 50%,
      var(--skeleton-color-end) 75%
    );
    background-size: 200% 100%;
    border-radius: var(--skeleton-radius);
    animation-duration: var(--skeleton-animation-duration);
  }
`;