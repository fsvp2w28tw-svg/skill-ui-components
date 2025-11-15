import { css } from 'lit';

export const suggestionInputStyles = css`
  :host {
    display: inline-block;
    width: 100%;
    max-width: 400px;
    position: relative;
  }

  /* 主容器 */
  .suggestion-input {
    position: relative;
    width: 100%;
  }

  /* 选中标签（多选模式） */
  .suggestion-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--skill-spacing-xs);
    margin-bottom: var(--skill-spacing-sm);
  }

  .suggestion-tag {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs);
    padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
    background-color: var(--skill-color-primary-light);
    color: var(--skill-color-primary-text);
    border-radius: var(--skill-radius-md);
    font-size: var(--skill-font-size-sm);
    font-weight: var(--skill-font-weight-medium);
    transition: all var(--skill-transition-fast);
  }

  .suggestion-tag__text {
    white-space: nowrap;
  }

  .suggestion-tag__remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border: none;
    background: transparent;
    color: var(--skill-color-primary-text);
    border-radius: var(--skill-radius-full);
    cursor: pointer;
    transition: all var(--skill-transition-fast);
    opacity: 0.8;
  }

  .suggestion-tag__remove:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.2);
  }

  /* 输入框包装器 */
  .suggestion-input__wrapper {
    position: relative;
    width: 100%;
  }

  /* 输入框 */
  .suggestion-input__field {
    width: 100%;
    padding: var(--skill-spacing-md) var(--skill-spacing-lg);
    border: 1px solid var(--skill-color-border);
    border-radius: var(--skill-radius-md);
    font-size: var(--skill-font-size-md);
    color: var(--skill-color-text);
    background-color: var(--skill-color-surface);
    transition: all var(--skill-transition-fast);
    outline: none;
  }

  .suggestion-input__field::placeholder {
    color: var(--skill-color-text-muted);
  }

  .suggestion-input__field:focus {
    border-color: var(--skill-color-primary);
    box-shadow: 0 0 0 2px var(--skill-color-primary-light);
  }

  .suggestion-input__field:hover:not(:focus) {
    border-color: var(--skill-color-border-hover);
  }

  /* 禁用和只读状态 */
  .suggestion-input--disabled .suggestion-input__field {
    background-color: var(--skill-color-surface-disabled);
    color: var(--skill-color-text-disabled);
    cursor: not-allowed;
  }

  .suggestion-input--readonly .suggestion-input__field {
    background-color: var(--skill-color-surface);
    cursor: default;
  }

  /* 清除按钮 */
  .suggestion-input__clear {
    position: absolute;
    right: var(--skill-spacing-sm);
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    color: var(--skill-color-text-muted);
    border-radius: var(--skill-radius-full);
    cursor: pointer;
    transition: all var(--skill-transition-fast);
  }

  .suggestion-input__clear:hover {
    background-color: var(--skill-color-surface-hover);
    color: var(--skill-color-text);
  }

  /* 加载状态 */
  .suggestion-input__loading {
    position: absolute;
    right: var(--skill-spacing-sm);
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
  }

  .loading-spinner {
    width: 100%;
    height: 100%;
    border: 2px solid var(--skill-color-border);
    border-top-color: var(--skill-color-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* 建议下拉框 */
  .suggestion-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--skill-color-surface);
    border: 1px solid var(--skill-color-border);
    border-top: none;
    border-radius: 0 0 var(--skill-radius-md) var(--skill-radius-md);
    box-shadow: var(--skill-shadow-lg);
    z-index: 1000;
    max-height: 400px;
    overflow-y: auto;
    margin-top: -1px;
  }

  .suggestion-input--open .suggestion-input__field {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-color: var(--skill-color-primary);
  }

  /* 建议项分组 */
  .suggestion-group {
    border-bottom: 1px solid var(--skill-color-border);
  }

  .suggestion-group:last-child {
    border-bottom: none;
  }

  .suggestion-group__header {
    padding: var(--skill-spacing-sm) var(--skill-spacing-lg);
    font-size: var(--skill-font-size-xs);
    font-weight: var(--skill-font-weight-semibold);
    color: var(--skill-color-text-muted);
    background-color: var(--skill-color-surface-light);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* 建议项 */
  .suggestion-item {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm);
    padding: var(--skill-spacing-md) var(--skill-spacing-lg);
    cursor: pointer;
    transition: all var(--skill-transition-fast);
    border-bottom: 1px solid var(--skill-color-border-light);
    min-height: 48px;
  }

  .suggestion-item:last-child {
    border-bottom: none;
  }

  .suggestion-item:hover {
    background-color: var(--skill-color-surface-hover);
  }

  .suggestion-item--highlighted {
    background-color: var(--skill-color-primary-light);
    color: var(--skill-color-primary-text);
  }

  .suggestion-item--selected {
    background-color: var(--skill-color-primary-light);
    color: var(--skill-color-primary-text);
  }

  .suggestion-item--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* 建议项图标 */
  .suggestion-item__icon {
    flex-shrink: 0;
    color: var(--skill-color-text-muted);
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .suggestion-item--highlighted .suggestion-item__icon,
  .suggestion-item--selected .suggestion-item__icon {
    color: inherit;
  }

  /* 建议项内容 */
  .suggestion-item__content {
    flex: 1;
    min-width: 0;
  }

  .suggestion-item__label {
    font-size: var(--skill-font-size-sm);
    color: inherit;
    font-weight: var(--skill-font-weight-medium);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .suggestion-item__description {
    font-size: var(--skill-font-size-xs);
    color: var(--skill-color-text-muted);
    margin-top: var(--skill-spacing-xs);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .suggestion-item--highlighted .suggestion-item__description,
  .suggestion-item--selected .suggestion-item__description {
    color: inherit;
    opacity: 0.9;
  }

  /* 匹配高亮 */
  .suggestion-item__match {
    font-weight: var(--skill-font-weight-semibold);
    color: var(--skill-color-primary);
  }

  .suggestion-item--highlighted .suggestion-item__match,
  .suggestion-item--selected .suggestion-item__match {
    color: inherit;
    text-decoration: underline;
  }

  /* 复选框（多选模式） */
  .suggestion-item__checkbox {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 加载状态 */
  .suggestion-loading {
    padding: var(--skill-spacing-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--skill-spacing-sm);
  }

  .suggestion-loading__spinner {
    width: 24px;
    height: 24px;
    border: 2px solid var(--skill-color-border);
    border-top-color: var(--skill-color-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .suggestion-loading__text {
    font-size: var(--skill-font-size-sm);
    color: var(--skill-color-text-muted);
  }

  /* 空状态 */
  .suggestion-empty {
    padding: var(--skill-spacing-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--skill-spacing-sm);
  }

  .suggestion-empty__icon {
    font-size: 32px;
    opacity: 0.5;
  }

  .suggestion-empty__text {
    font-size: var(--skill-font-size-sm);
    color: var(--skill-color-text-muted);
    text-align: center;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    :host {
      max-width: 100%;
    }

    .suggestion-dropdown {
      max-height: 300px;
    }

    .suggestion-item {
      padding: var(--skill-spacing-sm) var(--skill-spacing-md);
    }

    .suggestion-item__description {
      display: none;
    }
  }

  /* 可访问性 */
  .suggestion-item:focus {
    outline: 2px solid var(--skill-color-primary);
    outline-offset: -2px;
  }

  /* 滚动条样式 */
  .suggestion-dropdown::-webkit-scrollbar {
    width: 6px;
  }

  .suggestion-dropdown::-webkit-scrollbar-track {
    background: var(--skill-color-surface-light);
  }

  .suggestion-dropdown::-webkit-scrollbar-thumb {
    background: var(--skill-color-border);
    border-radius: 3px;
  }

  .suggestion-dropdown::-webkit-scrollbar-thumb:hover {
    background: var(--skill-color-border-hover);
  }

  /* 深色主题支持 */
  @media (prefers-color-scheme: dark) {
    .suggestion-tag {
      background-color: var(--skill-color-primary-dark);
    }

    .suggestion-item__match {
      color: var(--skill-color-primary-light);
    }
  }
`;