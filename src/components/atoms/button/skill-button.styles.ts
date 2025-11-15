import { css } from 'lit';
import {
  buttonBase,
  buttonRipple,
  buttonPrimary,
  buttonSecondary,
  buttonGhost,
  buttonText,
  buttonDanger,
  buttonSizeXS,
  buttonSizeSM,
  buttonSizeLG,
  buttonSizeXL,
  buttonBlock,
  buttonLoading,
  buttonOutline,
  buttonOutlineSuccess,
  buttonOutlineDanger,
  buttonSoft,
  buttonSoftSuccess,
  buttonSoftDanger,
  buttonGradient,
  buttonLink,
  buttonGlow,
  button3D,
  buttonShapeSquare,
  buttonShapePill,
  buttonShapeCircle,
} from '../../../styles/mixins';

/**
 * Enhanced Skill Button 组件样式
 * 现代化设计，支持新功能：徽章、工具提示、链接行为等
 */
export const buttonStyles = css`
  /* ===== Host 元素优化 ===== */
  :host {
    display: inline-block;
    position: relative;
    contain: layout style;
  }

  /* ===== 基础按钮样式 ===== */
  button,
  a {
    ${buttonBase}
    ${buttonRipple}
    position: relative;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--skill-spacing-xs);
    transition: all var(--skill-transition-duration-fast) var(--skill-transition-easing);
    overflow: hidden;

    /* 自定义属性支持（向后兼容） */
    background: var(--button-bg, var(--skill-primary-500));
    color: var(--button-color, var(--skill-gray-0));
    border-color: var(--button-border, transparent);
  }

  /* ===== 内容包装器 ===== */
  .skill-button__content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--skill-spacing-xs);
    transition: opacity var(--skill-transition-duration-fast) var(--skill-transition-easing);
  }

  :host([loading]) .skill-button__content {
    opacity: 0;
  }

  /* ===== 尺寸变体 ===== */

  :host([size='xs']) button,
  :host([size='xs']) a {
    ${buttonSizeXS}
  }

  :host([size='sm']) button,
  :host([size='sm']) a {
    ${buttonSizeSM}
  }

  :host([size='md']) button,
  :host([size='md']) a,
  :host(:not([size])) button,
  :host(:not([size])) a {
    height: var(--skill-component-height-md);
    padding: 0 var(--skill-spacing-md);
    font-size: var(--skill-font-body-2);
  }

  :host([size='lg']) button,
  :host([size='lg']) a {
    ${buttonSizeLG}
  }

  :host([size='xl']) button,
  :host([size='xl']) a {
    ${buttonSizeXL}
  }

  /* ===== 变体样式 ===== */

  /* Primary 变体 (默认) */
  :host([variant='primary']),
  :host(:not([variant])) {
    --skill-spinner-color: var(--skill-gray-0);
  }

  :host([variant='primary']) button,
  :host([variant='primary']) a,
  :host(:not([variant])) button,
  :host(:not([variant])) a {
    ${buttonPrimary}
  }

  /* Secondary 变体 */
  :host([variant='secondary']) {
    --skill-spinner-color: var(--skill-gray-800);
  }

  :host([variant='secondary']) button,
  :host([variant='secondary']) a {
    ${buttonSecondary}
  }

  /* Ghost 变体 */
  :host([variant='ghost']) {
    --skill-spinner-color: var(--skill-primary-500);
  }

  :host([variant='ghost']) button,
  :host([variant='ghost']) a {
    ${buttonGhost}
  }

  /* Text 变体 */
  :host([variant='text']) {
    --skill-spinner-color: var(--skill-primary-500);
  }

  :host([variant='text']) button,
  :host([variant='text']) a {
    ${buttonText}
  }

  /* Success 变体 */
  :host([variant='success']) {
    --skill-spinner-color: var(--skill-gray-0);
  }

  :host([variant='success']) button,
  :host([variant='success']) a {
    background: var(--skill-success-500);
    color: var(--skill-gray-0);
    box-shadow: var(--skill-shadow-1);
  }

  :host([variant='success']) button:hover:not(:disabled),
  :host([variant='success']) a:hover:not(:disabled) {
    background: var(--skill-success-600, #16a34a);
    box-shadow: var(--skill-shadow-2);
    transform: translateY(-1px);
  }

  :host([variant='success']) button:active:not(:disabled),
  :host([variant='success']) a:active:not(:disabled) {
    background: var(--skill-success-700, #15803d);
    box-shadow: var(--skill-shadow-1);
    transform: translateY(0);
  }

  /* Danger 变体 */
  :host([variant='danger']) {
    --skill-spinner-color: var(--skill-gray-0);
  }

  :host([variant='danger']) button,
  :host([variant='danger']) a {
    ${buttonDanger}
  }

  /* Warning 变体 */
  :host([variant='warning']) {
    --skill-spinner-color: var(--skill-gray-0);
  }

  :host([variant='warning']) button,
  :host([variant='warning']) a {
    background: var(--skill-warning-500, #f59e0b);
    color: var(--skill-gray-0);
    box-shadow: var(--skill-shadow-1);
  }

  :host([variant='warning']) button:hover:not(:disabled),
  :host([variant='warning']) a:hover:not(:disabled) {
    background: var(--skill-warning-600, #d97706);
    box-shadow: var(--skill-shadow-2);
    transform: translateY(-1px);
  }

  /* Info 变体 */
  :host([variant='info']) {
    --skill-spinner-color: var(--skill-gray-0);
  }

  :host([variant='info']) button,
  :host([variant='info']) a {
    background: var(--skill-info-500, #3b82f6);
    color: var(--skill-gray-0);
    box-shadow: var(--skill-shadow-1);
  }

  :host([variant='info']) button:hover:not(:disabled),
  :host([variant='info']) a:hover:not(:disabled) {
    background: var(--skill-info-600, #2563eb);
    box-shadow: var(--skill-shadow-2);
    transform: translateY(-1px);
  }

  /* Outline 变体 */
  :host([variant='outline']) {
    --skill-spinner-color: var(--skill-primary-500);
  }

  :host([variant='outline']) button,
  :host([variant='outline']) a {
    ${buttonOutline}
  }

  :host([variant='outline'][color='success']) {
    --skill-spinner-color: var(--skill-success-500);
  }

  :host([variant='outline'][color='success']) button,
  :host([variant='outline'][color='success']) a {
    ${buttonOutlineSuccess}
  }

  :host([variant='outline'][color='danger']) {
    --skill-spinner-color: var(--skill-error-500);
  }

  :host([variant='outline'][color='danger']) button,
  :host([variant='outline'][color='danger']) a {
    ${buttonOutlineDanger}
  }

  /* Soft 变体 */
  :host([variant='soft']) {
    --skill-spinner-color: var(--skill-primary-600);
  }

  :host([variant='soft']) button,
  :host([variant='soft']) a {
    ${buttonSoft}
  }

  :host([variant='soft'][color='success']) {
    --skill-spinner-color: var(--skill-success-700, #15803d);
  }

  :host([variant='soft'][color='success']) button,
  :host([variant='soft'][color='success']) a {
    ${buttonSoftSuccess}
  }

  :host([variant='soft'][color='danger']) {
    --skill-spinner-color: var(--skill-error-700);
  }

  :host([variant='soft'][color='danger']) button,
  :host([variant='soft'][color='danger']) a {
    ${buttonSoftDanger}
  }

  /* Gradient 变体 */
  :host([variant='gradient']) {
    --skill-spinner-color: var(--skill-gray-0);
  }

  :host([variant='gradient']) button,
  :host([variant='gradient']) a {
    ${buttonGradient}
  }

  /* Link 变体 */
  :host([variant='link']) {
    --skill-spinner-color: var(--skill-primary-500);
  }

  :host([variant='link']) button,
  :host([variant='link']) a {
    ${buttonLink}
  }

  /* ===== 形状变体 ===== */

  :host([shape='square']) button,
  :host([shape='square']) a {
    ${buttonShapeSquare}
  }

  :host([shape='pill']) button,
  :host([shape='pill']) a {
    ${buttonShapePill}
  }

  :host([shape='circle']) button,
  :host([shape='circle']) a {
    ${buttonShapeCircle}
  }

  /* Circle shape 在不同尺寸下的宽度 */
  :host([shape='circle'][size='xs']) button,
  :host([shape='circle'][size='xs']) a {
    width: var(--skill-component-height-xs);
  }

  :host([shape='circle'][size='sm']) button,
  :host([shape='circle'][size='sm']) a {
    width: var(--skill-component-height-sm);
  }

  :host([shape='circle'][size='lg']) button,
  :host([shape='circle'][size='lg']) a {
    width: var(--skill-component-height-lg);
  }

  :host([shape='circle'][size='xl']) button,
  :host([shape='circle'][size='xl']) a {
    width: var(--skill-component-height-xl);
  }

  /* ===== 特殊效果 ===== */

  :host([glow]) button,
  :host([glow]) a {
    ${buttonGlow}
  }

  :host([3d]) button,
  :host([3d]) a {
    ${button3D}
  }

  /* ===== 状态样式 ===== */

  /* Full width */
  :host([full-width]) button,
  :host([full-width]) a {
    ${buttonBlock}
  }

  /* Disabled state */
  button:disabled,
  a:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Loading state */
  :host([loading]) button,
  :host([loading]) a {
    ${buttonLoading}
    color: transparent;
    pointer-events: none;
  }

  /* Loading spinner - SVG增强版 */
  .skill-button__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    --skill-spinner-size: 16px;
    --skill-spinner-thickness: 2px;
    width: var(--skill-spinner-size);
    height: var(--skill-spinner-size);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 120ms ease;
    contain: layout style paint;
  }

  :host([loading]) .skill-button__spinner {
    opacity: 1;
    visibility: visible;
    animation: spin-skill 1s linear infinite;
  }

  .skill-button__spinner svg {
    width: 100%;
    height: 100%;
    stroke: var(--skill-spinner-color, currentColor);
  }

  .skill-button__spinner .spinner-hand {
    stroke-dasharray: 3 12;
    stroke-linecap: round;
    animation: spinner-hand-rotate 1s linear infinite;
  }

  /* Badge 样式 */
  .skill-button__badge {
    position: absolute;
    top: -6px;
    right: -6px;
    min-width: 18px;
    height: 18px;
    padding: 0 6px;
    background: var(--skill-error-500, #ef4444);
    color: var(--skill-gray-0);
    font-size: 10px;
    font-weight: 600;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--skill-shadow-1);
    z-index: 1;
    pointer-events: none;
    transform: scale(0);
    transition: transform var(--skill-transition-duration-fast) var(--skill-transition-easing);
  }

  :host([badge]) .skill-button__badge {
    transform: scale(1);
  }

  /* Tooltip 样式 */
  .skill-button__tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--skill-gray-900, #111827);
    color: var(--skill-gray-0);
    padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
    border-radius: var(--skill-radius-sm);
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: all var(--skill-transition-duration-fast) var(--skill-transition-easing);
    z-index: 1000;
    margin-bottom: 4px;
    max-width: 200px;
    word-wrap: break-word;
    white-space: normal;
  }

  .skill-button__tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: var(--skill-gray-900, #111827);
  }

  button:hover + .skill-button__tooltip,
  a:hover + .skill-button__tooltip,
  button:focus + .skill-button__tooltip,
  a:focus + .skill-button__tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-2px);
  }

  /* 尺寸变体的加载器样式 */
  :host([size='xs']) .skill-button__spinner {
    --skill-spinner-size: 12px;
    --skill-spinner-thickness: 1.5px;
  }

  :host([size='sm']) .skill-button__spinner {
    --skill-spinner-size: 14px;
    --skill-spinner-thickness: 1.5px;
  }

  :host([size='lg']) .skill-button__spinner {
    --skill-spinner-size: 20px;
    --skill-spinner-thickness: 2.5px;
  }

  :host([size='xl']) .skill-button__spinner {
    --skill-spinner-size: 24px;
    --skill-spinner-thickness: 3px;
  }

  /* ===== 动画定义 ===== */

  /* Spin animation */
  @keyframes spin-skill {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  /* Spinner hand animation */
  @keyframes spinner-hand-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Pulse animation for loading state */
  @keyframes pulse-skill {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  :host([loading-pulse]) button,
  :host([loading-pulse]) a {
    animation: pulse-skill 1.5s ease-in-out infinite;
  }

  /* ===== 可访问性和焦点样式 ===== */
  button:focus-visible,
  a:focus-visible {
    outline: 2px solid var(--skill-primary-500);
    outline-offset: 2px;
  }

  /* ===== 性能优化 ===== */

  /* 减少动画偏好支持 */
  @media (prefers-reduced-motion: reduce) {
    .skill-button__spinner {
      animation-duration: 2s;
    }

    .skill-button__tooltip {
      transition: none;
    }

    button, a {
      transition: none;
    }
  }

  /* Content visibility optimization */
  :host([loading]) {
    content-visibility: auto;
    contain-intrinsic-size: auto 40px;
  }

  /* ===== 响应式设计 ===== */
  @media (max-width: 768px) {
    :host([full-width]) {
      display: block;
      width: 100%;
    }

    .skill-button__tooltip {
      max-width: 150px;
      font-size: 11px;
    }
  }

  /* ===== 高对比度模式支持 ===== */
  @media (prefers-contrast: high) {
    button, a {
      border-width: 2px;
    }

    button:focus-visible,
    a:focus-visible {
      outline-width: 3px;
    }
  }

  /* ===== 深色模式支持 ===== */
  @media (prefers-color-scheme: dark) {
    .skill-button__tooltip {
      background: var(--skill-gray-100, #f3f4f6);
      color: var(--skill-gray-900, #111827);
    }

    .skill-button__tooltip::after {
      border-top-color: var(--skill-gray-100, #f3f4f6);
    }
  }
`;
