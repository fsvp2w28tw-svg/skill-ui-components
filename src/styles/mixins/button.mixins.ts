/**
 * Button Style Mixins - 按钮样式混入
 * 用于 Web Components 内部复用按钮样式
 */
import { css } from 'lit';

/**
 * 基础按钮样式 - 性能优化版
 */
export const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--skill-spacing-sm);
  height: var(--skill-component-height-md);
  padding: 0 var(--skill-spacing-md);
  font-family: var(--skill-font-sans);
  font-size: var(--skill-font-body-2);
  font-weight: var(--skill-font-medium);
  line-height: 1;
  border-radius: var(--skill-radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  /* 只过渡必要的属性，避免 transition: all */
  transition: background-color var(--skill-duration-fast) var(--skill-ease-out),
              border-color var(--skill-duration-fast) var(--skill-ease-out),
              color var(--skill-duration-fast) var(--skill-ease-out),
              opacity var(--skill-duration-fast) var(--skill-ease-out);
  user-select: none;
  outline: none;
  position: relative;
  overflow: hidden;

  /* 性能优化 */
  contain: layout style paint;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:focus-visible {
    outline: 2px solid var(--skill-primary-500);
    outline-offset: 2px;
  }
`;

/**
 * 按钮涟漪效果 - 禁用以提升性能
 * 在100+按钮的页面中，涟漪效果会严重影响性能
 */
export const buttonRipple = css`
  /* 涟漪效果已禁用以优化性能 */
`;

/**
 * 主要按钮样式 - 性能优化版
 */
export const buttonPrimary = css`
  background: var(--skill-primary-500);
  color: var(--skill-gray-0);
  box-shadow: var(--skill-shadow-1);

  &:hover:not(:disabled) {
    background: var(--skill-primary-400);
    box-shadow: var(--skill-shadow-2);
    /* 移除 transform 以提升性能 */
  }

  &:active:not(:disabled) {
    background: var(--skill-primary-600);
    box-shadow: var(--skill-shadow-1);
  }
`;

/**
 * 次要按钮样式
 */
export const buttonSecondary = css`
  background: var(--skill-gray-50);
  color: var(--skill-gray-800);
  border: 1px solid var(--skill-gray-200);

  &:hover:not(:disabled) {
    background: var(--skill-gray-100);
    border-color: var(--skill-gray-400);
  }

  &:active:not(:disabled) {
    background: var(--skill-gray-200);
  }
`;

/**
 * 幽灵按钮样式
 */
export const buttonGhost = css`
  background: transparent;
  color: var(--skill-primary-500);
  border: 1px solid var(--skill-primary-500);

  &:hover:not(:disabled) {
    background: rgba(10, 89, 247, 0.08);
    border-color: var(--skill-primary-600);
  }

  &:active:not(:disabled) {
    background: rgba(10, 89, 247, 0.15);
    border-color: var(--skill-primary-600);
  }
`;

/**
 * 文本按钮样式
 */
export const buttonText = css`
  background: transparent;
  color: var(--skill-primary-500);
  padding: 0 var(--skill-spacing-xs);
  height: auto;
  min-height: var(--skill-component-height-md);
  border: none;

  &:hover:not(:disabled) {
    background: rgba(10, 89, 247, 0.05);
    text-decoration: underline;
  }

  &:active:not(:disabled) {
    background: rgba(10, 89, 247, 0.1);
    text-decoration: underline;
  }
`;

/**
 * 危险/错误按钮样式 - 性能优化版
 */
export const buttonDanger = css`
  background: var(--skill-error-500);
  color: var(--skill-gray-0);
  box-shadow: var(--skill-shadow-1);

  &:hover:not(:disabled) {
    background: var(--skill-error-600);
    box-shadow: var(--skill-shadow-2);
    /* 移除 transform 以提升性能 */
  }

  &:active:not(:disabled) {
    background: var(--skill-error-700);
    box-shadow: var(--skill-shadow-1);
  }
`;

/**
 * 按钮尺寸 - 超小
 */
export const buttonSizeXS = css`
  height: var(--skill-component-height-xs);
  padding: 0 var(--skill-spacing-xs);
  font-size: var(--skill-font-caption);
  gap: 4px;
`;

/**
 * 按钮尺寸 - 小
 */
export const buttonSizeSM = css`
  height: var(--skill-component-height-sm);
  padding: 0 var(--skill-spacing-sm);
  font-size: var(--skill-font-body-3);
`;

/**
 * 按钮尺寸 - 大
 */
export const buttonSizeLG = css`
  height: var(--skill-component-height-lg);
  padding: 0 var(--skill-spacing-lg);
  font-size: var(--skill-font-body-1);
`;

/**
 * 按钮尺寸 - 超大
 */
export const buttonSizeXL = css`
  height: var(--skill-component-height-xl);
  padding: 0 var(--skill-spacing-xl);
  font-size: var(--skill-font-subtitle);
`;

/**
 * 圆形按钮
 */
export const buttonRound = css`
  border-radius: var(--skill-radius-full);
`;

/**
 * 块级按钮（占满容器宽度）
 */
export const buttonBlock = css`
  width: 100%;
  display: flex;
`;

/**
 * 加载中状态
 */
export const buttonLoading = css`
  position: relative;
  pointer-events: none;
`;

/**
 * 轮廓按钮样式 - Outline
 */
export const buttonOutline = css`
  background: transparent;
  color: var(--skill-primary-500);
  border: 2px solid var(--skill-primary-500);
  box-shadow: none;

  &:hover:not(:disabled) {
    background: var(--skill-primary-500);
    color: var(--skill-gray-0);
    border-color: var(--skill-primary-500);
    box-shadow: var(--skill-shadow-1);
  }

  &:active:not(:disabled) {
    background: var(--skill-primary-600);
    border-color: var(--skill-primary-600);
    box-shadow: none;
  }
`;

/**
 * 轮廓按钮 - Success
 */
export const buttonOutlineSuccess = css`
  background: transparent;
  color: var(--skill-success-500);
  border: 2px solid var(--skill-success-500);
  box-shadow: none;

  &:hover:not(:disabled) {
    background: var(--skill-success-500);
    color: var(--skill-gray-0);
    border-color: var(--skill-success-500);
  }

  &:active:not(:disabled) {
    background: var(--skill-success-600, #16a34a);
  }
`;

/**
 * 轮廓按钮 - Danger
 */
export const buttonOutlineDanger = css`
  background: transparent;
  color: var(--skill-error-500);
  border: 2px solid var(--skill-error-500);
  box-shadow: none;

  &:hover:not(:disabled) {
    background: var(--skill-error-500);
    color: var(--skill-gray-0);
    border-color: var(--skill-error-500);
  }

  &:active:not(:disabled) {
    background: var(--skill-error-600);
  }
`;

/**
 * 柔和按钮样式 - Soft
 */
export const buttonSoft = css`
  background: rgba(10, 89, 247, 0.1);
  color: var(--skill-primary-600);
  border: 1px solid transparent;
  box-shadow: none;

  &:hover:not(:disabled) {
    background: rgba(10, 89, 247, 0.15);
    color: var(--skill-primary-700);
    box-shadow: var(--skill-shadow-1);
  }

  &:active:not(:disabled) {
    background: rgba(10, 89, 247, 0.2);
    box-shadow: none;
  }
`;

/**
 * 柔和按钮 - Success
 */
export const buttonSoftSuccess = css`
  background: rgba(34, 197, 94, 0.1);
  color: var(--skill-success-700, #15803d);
  border: 1px solid transparent;

  &:hover:not(:disabled) {
    background: rgba(34, 197, 94, 0.15);
  }

  &:active:not(:disabled) {
    background: rgba(34, 197, 94, 0.2);
  }
`;

/**
 * 柔和按钮 - Danger
 */
export const buttonSoftDanger = css`
  background: rgba(239, 68, 68, 0.1);
  color: var(--skill-error-700);
  border: 1px solid transparent;

  &:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.15);
  }

  &:active:not(:disabled) {
    background: rgba(239, 68, 68, 0.2);
  }
`;

/**
 * 渐变按钮样式 - Gradient (性能优化版)
 */
export const buttonGradient = css`
  background: linear-gradient(135deg, var(--skill-primary-500) 0%, var(--skill-primary-700, #0652dd) 100%);
  color: var(--skill-gray-0);
  border: none;
  box-shadow: var(--skill-shadow-2);
  position: relative;
  overflow: hidden;

  /* 移除伪元素以提升性能 */

  &:hover:not(:disabled) {
    box-shadow: var(--skill-shadow-3);
    /* 移除 transform 以提升性能 */
    /* 使用背景色变化代替伪元素 */
    background: linear-gradient(135deg, var(--skill-primary-400) 0%, var(--skill-primary-600) 100%);
  }

  &:active:not(:disabled) {
    box-shadow: var(--skill-shadow-1);
  }
`;

/**
 * 链接按钮样式 - Link
 */
export const buttonLink = css`
  background: transparent;
  color: var(--skill-primary-500);
  border: none;
  padding: 0;
  height: auto;
  min-height: auto;
  text-decoration: underline;
  text-underline-offset: 2px;
  box-shadow: none;

  &:hover:not(:disabled) {
    color: var(--skill-primary-600);
    text-decoration-thickness: 2px;
  }

  &:active:not(:disabled) {
    color: var(--skill-primary-700);
  }
`;

/**
 * 发光效果
 */
export const buttonGlow = css`
  box-shadow: 0 0 20px rgba(10, 89, 247, 0.4), var(--skill-shadow-2);

  &:hover:not(:disabled) {
    box-shadow: 0 0 30px rgba(10, 89, 247, 0.6), var(--skill-shadow-3);
  }
`;

/**
 * 3D效果 - 保留transform因为这是核心视觉特性
 * 但添加性能优化
 */
export const button3D = css`
  box-shadow:
    0 4px 0 var(--skill-primary-700, #0652dd),
    0 6px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(0);
  /* 只过渡transform属性 */
  transition: transform var(--skill-duration-fast) var(--skill-ease-out),
              box-shadow var(--skill-duration-fast) var(--skill-ease-out);
  will-change: auto;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow:
      0 6px 0 var(--skill-primary-700, #0652dd),
      0 8px 12px rgba(0, 0, 0, 0.2);
    will-change: transform;
  }

  &:active:not(:disabled) {
    transform: translateY(2px);
    box-shadow:
      0 2px 0 var(--skill-primary-700, #0652dd),
      0 3px 5px rgba(0, 0, 0, 0.1);
  }
`;

/**
 * 形状 - Square (无圆角)
 */
export const buttonShapeSquare = css`
  border-radius: 0;
`;

/**
 * 形状 - Pill (药丸形状)
 */
export const buttonShapePill = css`
  border-radius: var(--skill-radius-full);
`;

/**
 * 形状 - Circle (圆形)
 */
export const buttonShapeCircle = css`
  border-radius: var(--skill-radius-full);
  aspect-ratio: 1;
  padding: 0;
  width: var(--skill-component-height-md);
`;

/**
 * 登录页面风格的主要按钮（渐变 + 扫光效果）
 */
export const buttonPrimaryGradientLogin = css`
  background: var(--skill-gradient-primary-to-r);
  color: var(--skill-gray-0);
  border: none;
  border-radius: var(--skill-radius-xl);
  font-weight: var(--skill-font-medium);
  box-shadow: var(--skill-shadow-1);
  position: relative;
  overflow: hidden;
  transition: all var(--skill-duration-normal) var(--skill-ease-out);

  /* 扫光效果层 */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--skill-gradient-shimmer);
    transform: translateX(-100%);
    transition: none;
  }

  /* 正常状态 */
  &:hover:not(:disabled) {
    background: var(--skill-gradient-primary-hover);
    box-shadow: var(--skill-shadow-button-primary);
    transform: scale(1.02);

    /* 触发扫光效果 */
    &::before {
      transform: translateX(100%);
      transition: transform 0.7s var(--skill-ease-out);
    }
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
    box-shadow: var(--skill-shadow-button-primary-active);
  }

  &:disabled {
    background: linear-gradient(to right, var(--skill-gray-300), var(--skill-gray-400));
    cursor: not-allowed;
    transform: none;
    box-shadow: none;

    &::before {
      display: none;
    }
  }
`;

/**
 * 社交登录按钮样式（小卡片风格）
 */
export const buttonSocialLogin = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--skill-spacing-xs);
  padding: var(--skill-spacing-sm) var(--skill-spacing-md);
  height: auto;
  min-height: 56px;
  background: var(--skill-glass-white-medium);
  backdrop-filter: blur(var(--skill-backdrop-blur-sm));
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: var(--skill-radius-xl);
  transition: all var(--skill-duration-fast) var(--skill-ease-out);
  box-shadow: none;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--skill-shadow-md);
    border-color: rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
    box-shadow: var(--skill-shadow-sm);
  }

  /* Tablet and mobile responsive */
  @media (max-width: 640px) {
    flex-direction: row;
    min-height: 48px;
  }
`;
