/**
 * Input Style Mixins - 输入框样式混入
 * 用于 Web Components 内部复用输入框样式
 */
import { css } from 'lit';

/**
 * 基础输入框样式
 */
export const inputBase = css`
  width: 100%;
  height: var(--skill-component-height-md);
  padding: 0 var(--skill-spacing-md);
  font-family: var(--skill-font-sans);
  font-size: var(--skill-font-body-2);
  line-height: 1;
  color: var(--skill-gray-800);
  background: var(--skill-gray-0);
  border: 1px solid var(--skill-gray-200);
  border-radius: var(--skill-radius-sm);
  transition: all var(--skill-duration-fast) var(--skill-ease-out);
  outline: none;

  &::placeholder {
    color: var(--skill-gray-500);
  }

  &:focus {
    border-color: var(--skill-primary-500);
    box-shadow: 0 0 0 3px rgba(10, 89, 247, 0.1);
  }

  &:hover:not(:disabled):not(:focus) {
    border-color: var(--skill-gray-300);
  }

  &:disabled {
    background: var(--skill-gray-50);
    color: var(--skill-gray-400);
    cursor: not-allowed;
  }
`;

/**
 * 错误状态输入框
 */
export const inputError = css`
  border-color: var(--skill-error-500);

  &:focus {
    border-color: var(--skill-error-500);
    box-shadow: 0 0 0 3px rgba(250, 42, 45, 0.1);
  }

  &:hover:not(:disabled):not(:focus) {
    border-color: var(--skill-error-600);
  }
`;

/**
 * 成功状态输入框
 */
export const inputSuccess = css`
  border-color: var(--skill-success-500);

  &:focus {
    border-color: var(--skill-success-500);
    box-shadow: 0 0 0 3px rgba(0, 212, 170, 0.1);
  }
`;

/**
 * 警告状态输入框
 */
export const inputWarning = css`
  border-color: var(--skill-warning-500);

  &:focus {
    border-color: var(--skill-warning-500);
    box-shadow: 0 0 0 3px rgba(255, 180, 0, 0.1);
  }
`;

/**
 * 输入框尺寸 - 超小
 */
export const inputSizeXS = css`
  height: var(--skill-component-height-xs);
  padding: 0 var(--skill-spacing-xs);
  font-size: var(--skill-font-caption);
`;

/**
 * 输入框尺寸 - 小
 */
export const inputSizeSM = css`
  height: var(--skill-component-height-sm);
  padding: 0 var(--skill-spacing-sm);
  font-size: var(--skill-font-body-3);
`;

/**
 * 输入框尺寸 - 大
 */
export const inputSizeLG = css`
  height: var(--skill-component-height-lg);
  padding: 0 var(--skill-spacing-lg);
  font-size: var(--skill-font-body-1);
`;

/**
 * 输入框尺寸 - 超大
 */
export const inputSizeXL = css`
  height: var(--skill-component-height-xl);
  padding: 0 var(--skill-spacing-xl);
  font-size: var(--skill-font-subtitle);
`;

/**
 * 圆角输入框
 */
export const inputRound = css`
  border-radius: var(--skill-radius-full);
`;

/**
 * 文本域基础样式
 */
export const textareaBase = css`
  width: 100%;
  min-height: 80px;
  padding: var(--skill-spacing-sm) var(--skill-spacing-md);
  font-family: var(--skill-font-sans);
  font-size: var(--skill-font-body-2);
  line-height: var(--skill-line-height-normal);
  color: var(--skill-gray-800);
  background: var(--skill-gray-0);
  border: 1px solid var(--skill-gray-200);
  border-radius: var(--skill-radius-sm);
  transition: all var(--skill-duration-fast) var(--skill-ease-out);
  outline: none;
  resize: vertical;

  &::placeholder {
    color: var(--skill-gray-500);
  }

  &:focus {
    border-color: var(--skill-primary-500);
    box-shadow: 0 0 0 3px rgba(10, 89, 247, 0.1);
  }

  &:hover:not(:disabled):not(:focus) {
    border-color: var(--skill-gray-300);
  }

  &:disabled {
    background: var(--skill-gray-50);
    color: var(--skill-gray-400);
    cursor: not-allowed;
    resize: none;
  }
`;

/**
 * 禁止调整大小的文本域
 */
export const textareaNoResize = css`
  resize: none;
`;

/**
 * 输入框组样式
 */
export const inputGroup = css`
  display: flex;
  align-items: stretch;

  > *:not(:first-child) {
    margin-left: -1px;
  }

  > *:not(:first-child):not(:last-child) {
    border-radius: 0;
  }

  > *:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  > *:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;
