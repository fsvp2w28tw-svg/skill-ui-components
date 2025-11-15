/**
 * Card Style Mixins - 卡片样式混入
 * 用于 Web Components 内部复用卡片样式
 */
import { css } from 'lit';

/**
 * 基础卡片样式
 */
export const cardBase = css`
  background: var(--skill-gray-0);
  border: 1px solid var(--skill-gray-200);
  border-radius: var(--skill-radius-lg);
  box-shadow: var(--skill-shadow-1);
  overflow: hidden;
  transition: all var(--skill-duration-fast) var(--skill-ease-out);
`;

/**
 * 可交互卡片（悬停效果）
 */
export const cardInteractive = css`
  cursor: pointer;

  &:hover {
    box-shadow: var(--skill-shadow-3);
    transform: translateY(-2px);
    border-color: var(--skill-primary-500);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: var(--skill-shadow-2);
  }
`;

/**
 * 简单悬停效果（仅阴影变化）
 */
export const cardHoverable = css`
  &:hover {
    box-shadow: var(--skill-shadow-2);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

/**
 * 卡片头部
 */
export const cardHeader = css`
  padding: var(--skill-spacing-lg);
  border-bottom: 1px solid var(--skill-gray-200);
  background: var(--skill-gray-50);
`;

/**
 * 卡片主体
 */
export const cardBody = css`
  padding: var(--skill-spacing-lg);
`;

/**
 * 卡片底部
 */
export const cardFooter = css`
  padding: var(--skill-spacing-lg);
  border-top: 1px solid var(--skill-gray-200);
  background: var(--skill-gray-50);
`;

/**
 * 浮动卡片（更强的阴影）
 */
export const cardFloating = css`
  box-shadow: var(--skill-shadow-3);

  &:hover {
    box-shadow: var(--skill-shadow-4);
    transform: translateY(-4px);
  }
`;

/**
 * 玻璃效果卡片
 */
export const cardGlass = css`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: var(--skill-shadow-2);
`;

/**
 * 暗色玻璃效果卡片
 */
export const cardGlassDark = css`
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--skill-shadow-3);
  color: var(--skill-gray-0);
`;

/**
 * 渐变边框卡片
 */
export const cardGradientBorder = css`
  position: relative;
  background: var(--skill-gray-0);
  border-radius: var(--skill-radius-lg);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    background: var(--skill-gradient-primary);
    border-radius: inherit;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
  }
`;

/**
 * 无边框卡片
 */
export const cardBorderless = css`
  border: none;
`;

/**
 * 无阴影卡片
 */
export const cardFlat = css`
  box-shadow: none;
`;

/**
 * 紧凑卡片（较小内边距）
 */
export const cardCompact = css`
  padding: var(--skill-spacing-sm);
`;

/**
 * 登录页面风格的卡片（毛玻璃 + 大圆角 + 复杂阴影）
 */
export const cardLoginStyle = css`
  background: var(--skill-glass-white-strong);
  backdrop-filter: blur(var(--skill-backdrop-blur-xl));
  -webkit-backdrop-filter: blur(var(--skill-backdrop-blur-xl));
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--skill-radius-2xl);
  box-shadow: var(--skill-shadow-card-login);
  padding: var(--skill-spacing-xl);
  transition: all var(--skill-duration-normal) var(--skill-ease-out);

  &:hover {
    box-shadow: var(--skill-shadow-card-login-hover);
  }
`;

/**
 * 大圆角卡片变体
 */
export const cardRounded2XL = css`
  border-radius: var(--skill-radius-2xl);
`;

export const cardRounded3XL = css`
  border-radius: var(--skill-radius-3xl);
`;

/**
 * 毛玻璃卡片变体（基于新的设计令牌）
 */
export const cardGlassLight = css`
  background: var(--skill-glass-white-light);
  backdrop-filter: blur(var(--skill-backdrop-blur-md));
  -webkit-backdrop-filter: blur(var(--skill-backdrop-blur-md));
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const cardGlassMedium = css`
  background: var(--skill-glass-white-medium);
  backdrop-filter: blur(var(--skill-backdrop-blur-lg));
  -webkit-backdrop-filter: blur(var(--skill-backdrop-blur-lg));
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

export const cardGlassStrong = css`
  background: var(--skill-glass-white-strong);
  backdrop-filter: blur(var(--skill-backdrop-blur-xl));
  -webkit-backdrop-filter: blur(var(--skill-backdrop-blur-xl));
  border: 1px solid rgba(255, 255, 255, 0.4);
`;
