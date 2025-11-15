import { css } from 'lit';
import {
  inputBase,
  inputError,
  inputSuccess,
  inputWarning,
  inputSizeXS,
  inputSizeSM,
  inputSizeLG,
  inputSizeXL,
} from '../../../styles/mixins';

/**
 * Skill Input 组件样式 - 使用新的 mixin 系统
 */
export const inputStyles = css`
  :host {
    display: block;
  }

  .skill-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--skill-spacing-xs);
  }

  /* Label 样式 */
  .skill-input__label {
    display: block;
    font-size: var(--skill-font-body-3);
    font-weight: var(--skill-font-medium);
    color: var(--skill-gray-700);
    margin-bottom: var(--skill-spacing-2xs);
  }

  /* 输入框容器 */
  .skill-input__container {
    position: relative;
    display: flex;
    align-items: center;
  }

  /* 基础输入框样式 - 使用 mixin */
  input {
    ${inputBase}
  }

  /* 错误状态 */
  :host([error]) input {
    ${inputError}
  }

  /* 成功状态 */
  :host([success]) input {
    ${inputSuccess}
  }

  /* 警告状态 */
  :host([warning]) input {
    ${inputWarning}
  }

  /* 尺寸变体 */
  :host([size='xs']) input {
    ${inputSizeXS}
  }

  :host([size='sm']) input {
    ${inputSizeSM}
  }

  :host([size='lg']) input {
    ${inputSizeLG}
  }

  :host([size='xl']) input {
    ${inputSizeXL}
  }

  /* 前缀和后缀图标 */
  .skill-input__prefix,
  .skill-input__suffix {
    position: absolute;
    display: flex;
    align-items: center;
    color: var(--skill-gray-500);
    pointer-events: none;
  }

  .skill-input__prefix {
    left: var(--skill-spacing-md);
  }

  .skill-input__suffix {
    right: var(--skill-spacing-md);
  }

  .skill-input__prefix:empty,
  .skill-input__suffix:empty {
    display: none;
  }

  :host([has-prefix]) input {
    padding-left: calc(var(--skill-spacing-md) * 2.5);
  }

  :host([has-suffix]) input {
    padding-right: calc(var(--skill-spacing-md) * 2.5);
  }

  /* 辅助文本 */
  .skill-input__helper {
    font-size: var(--skill-font-body-3);
    color: var(--skill-gray-600);
    margin-top: var(--skill-spacing-2xs);
  }

  /* 错误消息 */
  .skill-input__error-message {
    font-size: var(--skill-font-body-3);
    color: var(--skill-error-500);
    margin-top: var(--skill-spacing-2xs);
  }

  /* Disabled 状态 */
  input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
