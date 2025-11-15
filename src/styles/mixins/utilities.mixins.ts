/**
 * Utility Style Mixins - 通用工具样式混入
 * 用于 Web Components 内部复用通用样式模式
 */
import { css } from 'lit';

/**
 * 隐藏滚动条
 */
export const scrollbarHide = css`
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/**
 * 自定义滚动条
 */
export const scrollbarCustom = css`
  scrollbar-width: thin;
  scrollbar-color: var(--skill-gray-400) var(--skill-gray-100);

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--skill-gray-100);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--skill-gray-400);
    border-radius: var(--skill-radius-full);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--skill-gray-500);
  }
`;

/**
 * 文本截断（单行）
 */
export const textTruncate = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/**
 * 多行文本截断（2行）
 */
export const textTruncate2 = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/**
 * 多行文本截断（3行）
 */
export const textTruncate3 = css`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/**
 * Flex 居中
 */
export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * Flex 水平居中
 */
export const flexCenterX = css`
  display: flex;
  justify-content: center;
`;

/**
 * Flex 垂直居中
 */
export const flexCenterY = css`
  display: flex;
  align-items: center;
`;

/**
 * Flex 两端对齐
 */
export const flexBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/**
 * Flex 列布局
 */
export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

/**
 * 绝对居中
 */
export const absoluteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

/**
 * 玻璃效果
 */
export const glassEffect = css`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

/**
 * 暗色玻璃效果
 */
export const glassEffectDark = css`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

/**
 * 渐变文本
 */
export const gradientText = css`
  background: linear-gradient(135deg, var(--skill-primary-600), var(--skill-primary-400));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

/**
 * 屏幕阅读器专用（视觉隐藏）
 */
export const srOnly = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

/**
 * 禁用用户选择
 */
export const userSelectNone = css`
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
`;

/**
 * 点击穿透
 */
export const pointerEventsNone = css`
  pointer-events: none;
`;

/**
 * 全宽
 */
export const fullWidth = css`
  width: 100%;
`;

/**
 * 全高
 */
export const fullHeight = css`
  height: 100%;
`;

/**
 * 圆形
 */
export const circle = css`
  border-radius: 50%;
`;

/**
 * 按压效果（缩小）
 */
export const pressEffect = css`
  transition: all var(--skill-duration-instant) var(--skill-ease-in);
  cursor: pointer;

  &:active {
    transform: scale(0.98);
    box-shadow: var(--skill-shadow-1);
  }
`;

/**
 * 悬停浮起效果
 */
export const floatOnHover = css`
  transition: all var(--skill-duration-fast) var(--skill-ease-out);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--skill-shadow-4);
  }
`;

/**
 * 加载骨架屏动画
 */
export const skeletonLoader = css`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton 1.5s ease-in-out infinite;

  @keyframes skeleton {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

/**
 * 禁用状态
 */
export const disabled = css`
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
`;

/**
 * 焦点可见环
 */
export const focusRing = css`
  &:focus-visible {
    outline: 2px solid var(--skill-primary-500);
    outline-offset: 2px;
  }
`;

/**
 * 重置按钮样式
 */
export const resetButton = css`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

/**
 * 重置列表样式
 */
export const resetList = css`
  margin: 0;
  padding: 0;
  list-style: none;
`;

/**
 * 高宽比容器 - 16:9
 */
export const aspectRatio16_9 = css`
  aspect-ratio: 16 / 9;
`;

/**
 * 高宽比容器 - 1:1
 */
export const aspectRatio1_1 = css`
  aspect-ratio: 1 / 1;
`;

/**
 * 高宽比容器 - 4:3
 */
export const aspectRatio4_3 = css`
  aspect-ratio: 4 / 3;
`;

/**
 * 响应式图片
 */
export const responsiveImage = css`
  max-width: 100%;
  height: auto;
  display: block;
`;

/**
 * 对象适应 - 覆盖
 */
export const objectFitCover = css`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

/**
 * 对象适应 - 包含
 */
export const objectFitContain = css`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;
