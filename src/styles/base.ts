/**
 * Base styles - 基础样式
 * 提供基础的样式重置和全局样式
 */
import { css } from 'lit';
import { designTokens } from './tokens';

export const baseStyles = css`
  ${designTokens}

  * {
    box-sizing: border-box;
  }

  :host {
    /* 默认字体设置 */
    font-family: var(--skill-font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* 默认文字大小和颜色 */
    font-size: var(--skill-text-base);
    color: var(--skill-gray-900);
    line-height: var(--skill-leading-normal);
  }
`;
