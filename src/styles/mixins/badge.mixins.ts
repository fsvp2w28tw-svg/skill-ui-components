/**
 * Badge & Tag Style Mixins - 徽章和标签样式混入
 * 用于 Web Components 内部复用徽章样式
 */
import { css } from 'lit';

/**
 * 基础徽章样式
 */
export const badgeBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  font-family: var(--skill-font-sans);
  font-size: 10px;
  font-weight: var(--skill-font-bold);
  line-height: 1;
  color: var(--skill-gray-0);
  background: var(--skill-error-500);
  border-radius: var(--skill-radius-full);
  white-space: nowrap;
`;

/**
 * 主色徽章
 */
export const badgePrimary = css`
  background: var(--skill-primary-500);
`;

/**
 * 成功徽章
 */
export const badgeSuccess = css`
  background: var(--skill-success-500);
`;

/**
 * 警告徽章
 */
export const badgeWarning = css`
  background: var(--skill-warning-500);
`;

/**
 * 中性徽章
 */
export const badgeNeutral = css`
  background: var(--skill-gray-600);
`;

/**
 * 小圆点徽章
 */
export const badgeDot = css`
  min-width: 8px;
  width: 8px;
  height: 8px;
  padding: 0;
  font-size: 0;
`;

/**
 * 基础标签样式
 */
export const tagBase = css`
  display: inline-flex;
  align-items: center;
  gap: var(--skill-spacing-xs);
  height: var(--skill-component-height-sm);
  padding: 0 var(--skill-spacing-sm);
  font-family: var(--skill-font-sans);
  font-size: var(--skill-font-body-3);
  font-weight: var(--skill-font-medium);
  line-height: 1;
  border-radius: var(--skill-radius-md);
  white-space: nowrap;
`;

/**
 * 主色标签
 */
export const tagPrimary = css`
  background: rgba(10, 89, 247, 0.1);
  color: var(--skill-primary-500);
  border: 1px solid rgba(10, 89, 247, 0.2);
`;

/**
 * 成功标签
 */
export const tagSuccess = css`
  background: rgba(0, 212, 170, 0.1);
  color: var(--skill-success-500);
  border: 1px solid rgba(0, 212, 170, 0.2);
`;

/**
 * 警告标签
 */
export const tagWarning = css`
  background: rgba(255, 180, 0, 0.1);
  color: var(--skill-warning-500);
  border: 1px solid rgba(255, 180, 0, 0.2);
`;

/**
 * 错误标签
 */
export const tagError = css`
  background: rgba(250, 42, 45, 0.1);
  color: var(--skill-error-500);
  border: 1px solid rgba(250, 42, 45, 0.2);
`;

/**
 * 中性标签
 */
export const tagNeutral = css`
  background: var(--skill-gray-100);
  color: var(--skill-gray-700);
  border: 1px solid var(--skill-gray-200);
`;

/**
 * 可关闭标签（带关闭按钮）
 */
export const tagClosable = css`
  padding-right: var(--skill-spacing-xs);

  .close-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    margin-left: 4px;
    border-radius: var(--skill-radius-full);
    cursor: pointer;
    transition: background var(--skill-duration-fast) var(--skill-ease-out);

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

/**
 * 头像徽章样式
 */
export const avatarBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--skill-radius-full);
  font-family: var(--skill-font-sans);
  font-weight: var(--skill-font-medium);
  color: var(--skill-gray-0);
  background: var(--skill-gray-400);
  overflow: hidden;
  flex-shrink: 0;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/**
 * 头像尺寸 - 超小
 */
export const avatarSizeXS = css`
  width: 24px;
  height: 24px;
  font-size: 10px;
`;

/**
 * 头像尺寸 - 小
 */
export const avatarSizeSM = css`
  width: 32px;
  height: 32px;
  font-size: 12px;
`;

/**
 * 头像尺寸 - 中
 */
export const avatarSizeMD = css`
  width: 40px;
  height: 40px;
  font-size: 14px;
`;

/**
 * 头像尺寸 - 大
 */
export const avatarSizeLG = css`
  width: 48px;
  height: 48px;
  font-size: 16px;
`;

/**
 * 头像尺寸 - 超大
 */
export const avatarSizeXL = css`
  width: 64px;
  height: 64px;
  font-size: 20px;
`;

/**
 * 头像尺寸 - 特大
 */
export const avatarSize2XL = css`
  width: 80px;
  height: 80px;
  font-size: 24px;
`;

/**
 * 方形头像
 */
export const avatarSquare = css`
  border-radius: var(--skill-radius-md);
`;

/**
 * 头像组（多个头像堆叠）
 */
export const avatarGroup = css`
  display: inline-flex;
  align-items: center;

  > * {
    margin-left: -8px;
    border: 2px solid var(--skill-gray-0);
    transition: all var(--skill-duration-fast) var(--skill-ease-out);
  }

  > *:first-child {
    margin-left: 0;
  }

  > *:hover {
    transform: translateY(-2px);
    z-index: 1;
    box-shadow: var(--skill-shadow-2);
  }
`;

/**
 * 带状态的头像（在线/离线等）
 */
export const avatarWithStatus = css`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 25%;
    height: 25%;
    border-radius: 50%;
    border: 2px solid var(--skill-gray-0);
  }

  &[data-status='online']::after {
    background: var(--skill-success-500);
  }

  &[data-status='offline']::after {
    background: var(--skill-gray-400);
  }

  &[data-status='busy']::after {
    background: var(--skill-error-500);
  }

  &[data-status='away']::after {
    background: var(--skill-warning-500);
  }
`;
