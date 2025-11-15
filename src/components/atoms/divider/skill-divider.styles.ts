import { css } from 'lit';

export const dividerStyles = css`
  :host {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .skill-divider {
    display: flex;
    align-items: center;
    width: 100%;
    color: var(--skill-gray-500, #8A8A8A);
    font-size: var(--skill-font-size-body-3, 12px);
    font-weight: var(--skill-font-weight-regular, 400);
    margin: var(--skill-spacing-sm, 12px) 0;
  }

  /* 基础分割线样式 */
  .skill-divider__line {
    flex: 1;
    height: 1px;
    background: var(--skill-gray-300, #D1D5DB);
    transition: background-color var(--skill-duration-normal, 300ms) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  /* 方向控制 */
  :host([orientation='vertical']) .skill-divider {
    flex-direction: column;
    height: 100%;
    width: auto;
    margin: 0 var(--skill-spacing-sm, 12px);
  }

  :host([orientation='vertical']) .skill-divider__line {
    width: 1px;
    height: 100%;
    flex: none;
  }

  /* 文字标签样式 */
  .skill-divider__content {
    padding: 0 var(--skill-spacing-md, 16px);
    white-space: nowrap;
    color: var(--skill-gray-600, #6B7280);
  }

  :host([orientation='vertical']) .skill-divider__content {
    padding: var(--skill-spacing-md, 16px) 0;
  }

  /* 文字位置控制 */
  :host([content-position='left']) .skill-divider__content {
    order: -1;
    padding-right: var(--skill-spacing-md, 16px);
    padding-left: 0;
  }

  :host([content-position='right']) .skill-divider__content {
    order: 1;
    padding-left: var(--skill-spacing-md, 16px);
    padding-right: 0;
  }

  :host([orientation='vertical'][content-position='left']) .skill-divider__content {
    order: -1;
    padding-bottom: var(--skill-spacing-md, 16px);
    padding-top: 0;
  }

  :host([orientation='vertical'][content-position='right']) .skill-divider__content {
    order: 1;
    padding-top: var(--skill-spacing-md, 16px);
    padding-bottom: 0;
  }

  /* 样式变体 */
  :host([variant='solid']) .skill-divider__line {
    height: 2px;
    background: var(--skill-gray-400, #BDBDBD);
  }

  :host([orientation='vertical'][variant='solid']) .skill-divider__line {
    width: 2px;
  }

  :host([variant='dashed']) .skill-divider__line {
    background: none;
    border-top: 1px dashed var(--skill-gray-400, #BDBDBD);
    height: 0;
  }

  :host([orientation='vertical'][variant='dashed']) .skill-divider__line {
    border-top: none;
    border-left: 1px dashed var(--skill-gray-400, #BDBDBD);
    width: 0;
    height: auto;
  }

  :host([variant='dotted']) .skill-divider__line {
    background: none;
    border-top: 1px dotted var(--skill-gray-400, #BDBDBD);
    height: 0;
  }

  :host([orientation='vertical'][variant='dotted']) .skill-divider__line {
    border-top: none;
    border-left: 1px dotted var(--skill-gray-400, #BDBDBD);
    width: 0;
    height: auto;
  }

  /* 颜色变体 */
  :host([color='primary']) .skill-divider__line {
    background: var(--skill-primary-500, #0A59F7);
  }

  :host([color='primary'][variant='dashed']) .skill-divider__line,
  :host([color='primary'][variant='dotted']) .skill-divider__line {
    border-color: var(--skill-primary-500, #0A59F7);
  }

  :host([color='secondary']) .skill-divider__line {
    background: var(--skill-secondary-500, #00D4AA);
  }

  :host([color='secondary'][variant='dashed']) .skill-divider__line,
  :host([color='secondary'][variant='dotted']) .skill-divider__line {
    border-color: var(--skill-secondary-500, #00D4AA);
  }

  :host([color='success']) .skill-divider__line {
    background: var(--skill-success-500, #00D4AA);
  }

  :host([color='success'][variant='dashed']) .skill-divider__line,
  :host([color='success'][variant='dotted']) .skill-divider__line {
    border-color: var(--skill-success-500, #00D4AA);
  }

  :host([color='warning']) .skill-divider__line {
    background: var(--skill-warning-500, #FFB400);
  }

  :host([color='warning'][variant='dashed']) .skill-divider__line,
  :host([color='warning'][variant='dotted']) .skill-divider__line {
    border-color: var(--skill-warning-500, #FFB400);
  }

  :host([color='error']) .skill-divider__line {
    background: var(--skill-error-500, #FA2A2D);
  }

  :host([color='error'][variant='dashed']) .skill-divider__line,
  :host([color='error'][variant='dotted']) .skill-divider__line {
    border-color: var(--skill-error-500, #FA2A2D);
  }

  /* 插槽样式 */
  ::slotted(*) {
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
  }

  /* 尺寸控制 */
  :host([size='sm']) {
    margin: var(--skill-spacing-xs, 8px) 0;
  }

  :host([size='lg']) {
    margin: var(--skill-spacing-lg, 20px) 0;
  }

  :host([size='xl']) {
    margin: var(--skill-spacing-xl, 24px) 0;
  }

  :host([orientation='vertical'][size='sm']) {
    margin: 0 var(--skill-spacing-xs, 8px);
  }

  :host([orientation='vertical'][size='lg']) {
    margin: 0 var(--skill-spacing-lg, 20px);
  }

  :host([orientation='vertical'][size='xl']) {
    margin: 0 var(--skill-spacing-xl, 24px);
  }

  /* 插入模式 - 用于在文本中插入分割线 */
  :host([insert]) {
    display: inline-flex;
    width: auto;
    margin: 0 var(--skill-spacing-sm, 12px);
    vertical-align: middle;
  }

  :host([insert]) .skill-divider {
    margin: 0;
    width: auto;
  }

  :host([insert]) .skill-divider__line {
    width: var(--skill-divider-length, 1em);
  }

  :host([insert][orientation='vertical']) {
    height: auto;
    margin: var(--skill-spacing-sm, 12px) 0;
  }

  :host([insert][orientation='vertical']) .skill-divider__line {
    height: var(--skill-divider-length, 1em);
    width: 1px;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    :host([responsive]) {
      margin: var(--skill-spacing-sm, 12px) 0;
    }

    :host([responsive][orientation='vertical']) {
      margin: 0 var(--skill-spacing-sm, 12px);
    }
  }

  /* 焦点可访问性 */
  :host([focusable]) {
    cursor: pointer;
  }

  :host([focusable]) .skill-divider:hover .skill-divider__line {
    background: var(--skill-primary-600, #0047D3);
  }

  :host([focusable][color='primary']) .skill-divider:hover .skill-divider__line {
    background: var(--skill-primary-700, #0036A0);
  }

  /* 动画效果 */
  :host([animated]) .skill-divider__line {
    position: relative;
    overflow: hidden;
  }

  :host([animated]) .skill-divider__line::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: divider-shine 2s infinite;
  }

  @keyframes divider-shine {
    0% {
      left: -100%;
    }
    50% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }

  :host([orientation='vertical'][animated]) .skill-divider__line::after {
    background: linear-gradient(
      180deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: divider-shine-vertical 2s infinite;
  }

  @keyframes divider-shine-vertical {
    0% {
      top: -100%;
    }
    50% {
      top: 100%;
    }
    100% {
      top: 100%;
    }
  }
`;