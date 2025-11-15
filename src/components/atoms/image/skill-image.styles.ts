import { css } from 'lit';

export const imageStyles = css`
  :host {
    display: inline-block;
  }

  .skill-image__container {
    position: relative;
    display: inline-block;
    overflow: hidden;
    border-radius: var(--image-border-radius, var(--skill-radius-md, 6px));
    width: var(--image-width, auto);
    height: var(--image-height, auto);
    max-width: 100%;
    background: var(--image-bg, var(--skill-gray-100, #F3F4F6));
    outline: none;
    transition: all var(--skill-duration-fast, 200ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  .skill-image__container:focus-visible {
    outline: 2px solid var(--skill-primary-500, #0A59F7);
    outline-offset: 2px;
  }

  :host([clickable]) .skill-image__container {
    cursor: pointer;
  }

  .skill-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: var(--image-object-fit, cover);
    object-position: var(--image-object-position, center);
    border-radius: var(--image-border-radius, var(--skill-radius-md, 6px));
    transition: all var(--skill-duration-fast, 200ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  .skill-image--loading {
    opacity: 0.8;
  }

  .skill-image--blur {
    filter: blur(5px);
    transform: scale(1.05);
  }

  /* 占位符样式 */
  .skill-image__placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--image-placeholder-bg, var(--skill-gray-100, #F3F4F6));
    color: var(--image-placeholder-color, var(--skill-gray-400, #9CA3AF));
    border-radius: var(--image-border-radius, var(--skill-radius-md, 6px));
    z-index: 1;
  }

  .skill-image__default-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--skill-spacing-2xs, 4px);
    padding: var(--skill-spacing-lg, 20px);
  }

  .skill-image__default-placeholder svg {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* 错误状态样式 */
  .skill-image__error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--image-error-bg, var(--skill-error-50, #FEF2F2));
    color: var(--image-error-color, var(--skill-error-400, #F87171));
    border-radius: var(--image-border-radius, var(--skill-radius-md, 6px));
    z-index: 1;
  }

  .skill-image__default-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--skill-spacing-xs, 8px);
    padding: var(--skill-spacing-lg, 20px);
    text-align: center;
    font-size: var(--skill-font-size-body-3, 12px);
    font-weight: var(--skill-font-weight-medium, 500);
  }

  /* 图片说明 */
  .skill-image__caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    color: var(--skill-white, #FFFFFF);
    padding: var(--skill-spacing-sm, 12px) var(--skill-spacing-md, 16px);
    font-size: var(--skill-font-size-body-3, 12px);
    font-weight: var(--skill-font-weight-medium, 500);
    border-bottom-left-radius: var(--image-border-radius, var(--skill-radius-md, 6px));
    border-bottom-right-radius: var(--image-border-radius, var(--skill-radius-md, 6px));
    opacity: 0;
    transform: translateY(10px);
    transition: all var(--skill-duration-fast, 200ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  .skill-image__container:hover .skill-image__caption {
    opacity: 1;
    transform: translateY(0);
  }

  /* 尺寸变体 */
  :host([size='xs']) .skill-image__container {
    --image-width: 32px;
    --image-height: 32px;
  }

  :host([size='sm']) .skill-image__container {
    --image-width: 48px;
    --image-height: 48px;
  }

  :host([size='md']) .skill-image__container {
    --image-width: 64px;
    --image-height: 64px;
  }

  :host([size='lg']) .skill-image__container {
    --image-width: 96px;
    --image-height: 96px;
  }

  :host([size='xl']) .skill-image__container {
    --image-width: 128px;
    --image-height: 128px;
  }

  /* 形状变体 */
  :host([shape='circle']) .skill-image__container {
    --image-border-radius: var(--skill-radius-full, 9999px);
    aspect-ratio: 1 / 1;
  }

  :host([shape='rounded']) .skill-image__container {
    --image-border-radius: var(--skill-radius-lg, 8px);
  }

  :host([shape='square']) .skill-image__container {
    aspect-ratio: 1 / 1;
  }

  /* 对象适配方式 */
  :host([object-fit='fill']) .skill-image {
    --image-object-fit: fill;
  }

  :host([object-fit='contain']) .skill-image {
    --image-object-fit: contain;
  }

  :host([object-fit='cover']) .skill-image {
    --image-object-fit: cover;
  }

  :host([object-fit='none']) .skill-image {
    --image-object-fit: none;
  }

  :host([object-fit='scale-down']) .skill-image {
    --image-object-fit: scale-down;
  }

  /* 宽高比 */
  :host([aspect-ratio='16/9']) .skill-image__container {
    aspect-ratio: 16 / 9;
  }

  :host([aspect-ratio='4/3']) .skill-image__container {
    aspect-ratio: 4 / 3;
  }

  :host([aspect-ratio='3/2']) .skill-image__container {
    aspect-ratio: 3 / 2;
  }

  :host([aspect-ratio='1/1']) .skill-image__container {
    aspect-ratio: 1 / 1;
  }

  :host([aspect-ratio='9/16']) .skill-image__container {
    aspect-ratio: 9 / 16;
  }

  /* 阴影效果 */
  :host([shadow='none']) .skill-image__container {
    box-shadow: none;
  }

  :host([shadow='sm']) .skill-image__container {
    box-shadow: var(--skill-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
  }

  :host([shadow='md']) .skill-image__container {
    box-shadow: var(--skill-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
  }

  :host([shadow='lg']) .skill-image__container {
    box-shadow: var(--skill-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05));
  }

  /* 边框 */
  :host([bordered]) .skill-image__container {
    border: 1px solid var(--image-border-color, var(--skill-gray-200, #E5E7EB));
  }

  /* 可点击效果 */
  :host([clickable]) .skill-image:hover {
    transform: var(--image-hover-transform, scale(1.02));
  }

  /* 缩放效果 */
  :host([zoom-effect]) .skill-image {
    transition: transform var(--skill-duration-normal, 300ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  :host([zoom-effect]) .skill-image:hover {
    transform: scale(1.05);
  }

  /* 自定义宽高 */
  :host([width]) .skill-image__container {
    --image-width: var(--image-custom-width, auto);
  }

  :host([height]) .skill-image__container {
    --image-height: var(--image-custom-height, auto);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    :host([responsive]) .skill-image__container {
      --image-width: 100%;
      --image-height: auto;
    }
  }

  /* 高对比度模式支持 */
  @media (prefers-contrast: high) {
    :host([bordered]) .skill-image__container {
      border-width: 2px;
      border-color: var(--skill-gray-600, #4B5563);
    }

    .skill-image__container:focus-visible {
      outline-width: 3px;
    }

    .skill-image__default-error {
      font-weight: var(--skill-font-weight-semibold, 600);
    }
  }

  /* 减少动画偏好支持 */
  @media (prefers-reduced-motion: reduce) {
    .skill-image,
    .skill-image__container,
    .skill-image__caption,
    .skill-image__placeholder svg {
      transition: none;
      animation: none;
    }

    :host([zoom-effect]) .skill-image:hover {
      transform: none;
    }

    :host([clickable]) .skill-image:hover {
      transform: none;
    }
  }

  /* 打印样式 */
  @media print {
    .skill-image__placeholder,
    .skill-image__error {
      display: none;
    }

    .skill-image__caption {
      opacity: 1;
      transform: none;
      background: none;
      color: #000;
    }

    :host([bordered]) .skill-image__container {
      border: 1px solid #000;
    }
  }

  /* 深色模式支持 */
  @media (prefers-color-scheme: dark) {
    .skill-image__placeholder {
      --image-placeholder-bg: var(--skill-gray-800, #1F2937);
      --image-placeholder-color: var(--skill-gray-600, #4B5563);
    }

    .skill-image__error {
      --image-error-bg: var(--skill-error-900, #7F1D1D);
      --image-error-color: var(--skill-error-300, #FCA5A5);
    }

    :host([bordered]) .skill-image__container {
      --image-border-color: var(--skill-gray-700, #374151);
    }
  }

  /* 加载动画 */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  /* 渐进式加载效果 */
  :host([progressive]) .skill-image {
    animation: fadeIn var(--skill-duration-normal, 300ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* 图片画廊样式 */
  .skill-image__container--gallery {
    cursor: pointer;
    position: relative;
  }

  .skill-image__container--gallery::after {
    content: '🔍';
    position: absolute;
    top: var(--skill-spacing-xs, 8px);
    right: var(--skill-spacing-xs, 8px);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 4px 8px;
    border-radius: var(--skill-radius-full, 9999px);
    font-size: 12px;
    opacity: 0;
    transition: opacity var(--skill-duration-fast, 200ms);
  }

  .skill-image__container--gallery:hover::after {
    opacity: 1;
  }

  /* 占位符图片效果 */
  :host([placeholder]) .skill-image {
    background: var(--image-placeholder-bg, var(--skill-gray-100, #F3F4F6));
  }

  /* 加载骨架屏 */
  .skill-image__skeleton {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, var(--skill-gray-200, #E5E7EB) 25%, var(--skill-gray-100, #F3F4F6) 50%, var(--skill-gray-200, #E5E7EB) 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: var(--image-border-radius, var(--skill-radius-md, 6px));
    z-index: 1;
  }

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  /* 错误重试按钮 */
  .skill-image__retry-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--skill-primary-500, #0A59F7);
    color: white;
    border: none;
    padding: var(--skill-spacing-xs, 8px) var(--skill-spacing-sm, 12px);
    border-radius: var(--skill-radius-md, 6px);
    font-size: var(--skill-font-size-body-3, 12px);
    cursor: pointer;
    z-index: 2;
    transition: all var(--skill-duration-fast, 200ms);
  }

  .skill-image__retry-button:hover {
    background: var(--skill-primary-600, #2563EB);
  }
`;