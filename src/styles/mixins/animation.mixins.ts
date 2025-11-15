/**
 * Animation Style Mixins - 动画样式混入
 * 用于 Web Components 内部复用动画效果
 */
import { css } from 'lit';

/**
 * 淡入动画
 */
export const animateFadeIn = css`
  animation: fadeIn var(--skill-duration-normal) var(--skill-ease-out);

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

/**
 * 上滑淡入动画
 */
export const animateFadeInUp = css`
  animation: fadeInUp var(--skill-duration-normal) var(--skill-ease-out);

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

/**
 * 下滑淡入动画
 */
export const animateFadeInDown = css`
  animation: fadeInDown var(--skill-duration-normal) var(--skill-ease-out);

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

/**
 * 左滑淡入动画
 */
export const animateFadeInLeft = css`
  animation: fadeInLeft var(--skill-duration-normal) var(--skill-ease-out);

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

/**
 * 右滑淡入动画
 */
export const animateFadeInRight = css`
  animation: fadeInRight var(--skill-duration-normal) var(--skill-ease-out);

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

/**
 * 缩放淡入动画
 */
export const animateZoomIn = css`
  animation: zoomIn var(--skill-duration-normal) var(--skill-ease-spring);

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

/**
 * 淡出动画
 */
export const animateFadeOut = css`
  animation: fadeOut var(--skill-duration-normal) var(--skill-ease-in);

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

/**
 * 脉冲动画
 */
export const animatePulse = css`
  animation: pulse var(--skill-duration-slow) ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

/**
 * 弹跳动画
 */
export const animateBounce = css`
  animation: bounce var(--skill-duration-slower) ease-in-out;

  @keyframes bounce {
    0%,
    20%,
    53%,
    80%,
    100% {
      transform: translateY(0);
    }
    40%,
    43% {
      transform: translateY(-30px);
    }
    70% {
      transform: translateY(-15px);
    }
    90% {
      transform: translateY(-4px);
    }
  }
`;

/**
 * 摇摆动画
 */
export const animateShake = css`
  animation: shake var(--skill-duration-slow) ease-in-out;

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translateX(-10px);
    }
    20%,
    40%,
    60%,
    80% {
      transform: translateX(10px);
    }
  }
`;

/**
 * 旋转动画
 */
export const animateSpin = css`
  animation: spin var(--skill-duration-slow) linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

/**
 * 心跳动画
 */
export const animateHeartbeat = css`
  animation: heartbeat var(--skill-duration-slower) ease-in-out infinite;

  @keyframes heartbeat {
    0%,
    100% {
      transform: scale(1);
    }
    14% {
      transform: scale(1.3);
    }
    28% {
      transform: scale(1);
    }
    42% {
      transform: scale(1.3);
    }
    70% {
      transform: scale(1);
    }
  }
`;

/**
 * 摆动动画
 */
export const animateSwing = css`
  animation: swing var(--skill-duration-slower) ease-in-out;
  transform-origin: top center;

  @keyframes swing {
    20%,
    40%,
    60%,
    80%,
    100% {
      transform-origin: top center;
    }
    20% {
      transform: rotate(15deg);
    }
    40% {
      transform: rotate(-10deg);
    }
    60% {
      transform: rotate(5deg);
    }
    80% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

/**
 * 发光动画
 */
export const animateGlow = css`
  animation: glow var(--skill-duration-slow) ease-in-out infinite;

  @keyframes glow {
    0%,
    100% {
      box-shadow: 0 0 5px rgba(10, 89, 247, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(10, 89, 247, 0.8);
    }
  }
`;

/**
 * 悬停上升效果
 */
export const hoverLift = css`
  transition: transform var(--skill-duration-fast) var(--skill-ease-out);

  &:hover {
    transform: translateY(-2px);
  }
`;

/**
 * 悬停缩放效果
 */
export const hoverScale = css`
  transition: transform var(--skill-duration-fast) var(--skill-ease-out);

  &:hover {
    transform: scale(1.05);
  }
`;

/**
 * 点击反馈效果
 */
export const clickFeedback = css`
  transition: transform var(--skill-duration-instant) var(--skill-ease-in);

  &:active {
    transform: scale(0.98);
  }
`;

/**
 * 涟漪效果
 */
export const rippleEffect = css`
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%);
  }

  &:active::after {
    width: 300px;
    height: 300px;
    transition: width var(--skill-duration-slow) var(--skill-ease-out),
      height var(--skill-duration-slow) var(--skill-ease-out);
  }
`;
