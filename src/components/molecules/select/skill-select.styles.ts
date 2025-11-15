import { css } from 'lit';

export const selectStyles = css`
  :host {
    display: inline-block;
    width: 100%;
    max-width: 300px;
    position: relative;
  }

  /* 主容器 */
  .select {
    position: relative;
    width: 100%;
  }

  /* 选中标签（多选模式） */
  .select-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--skill-spacing-xs);
    margin-bottom: var(--skill-spacing-sm);
    min-height: 24px;
  }

  .select-tag {
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
    max-width: 150px;
  }

  .select-tag--more {
    background-color: var(--skill-color-surface-light);
    color: var(--skill-color-text-muted);
  }

  .select-tag__text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }

  .select-tag__remove {
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
    flex-shrink: 0;
  }

  .select-tag__remove:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.2);
  }

  /* 选择器触发器 */
  .select-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--skill-spacing-md) var(--skill-spacing-lg);
    border: 1px solid var(--skill-color-border);
    border-radius: var(--skill-radius-md);
    background-color: var(--skill-color-surface);
    cursor: pointer;
    transition: all var(--skill-transition-fast);
    min-height: 40px;
    position: relative;
  }

  .select-trigger:hover {
    border-color: var(--skill-color-border-hover);
  }

  .select-trigger:focus {
    outline: none;
    border-color: var(--skill-color-primary);
    box-shadow: 0 0 0 2px var(--skill-color-primary-light);
  }

  .select--open .select-trigger {
    border-color: var(--skill-color-primary);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: 0 0 0 2px var(--skill-color-primary-light);
  }

  .select--disabled .select-trigger {
    background-color: var(--skill-color-surface-disabled);
    color: var(--skill-color-text-disabled);
    cursor: not-allowed;
  }

  .select--readonly .select-trigger {
    background-color: var(--skill-color-surface);
    cursor: default;
  }

  .select-trigger__content {
    flex: 1;
    min-width: 0;
  }

  .select-trigger__placeholder {
    font-size: var(--skill-font-size-md);
    color: var(--skill-color-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .select--has-value .select-trigger__placeholder {
    font-weight: var(--skill-font-weight-medium);
  }

  .select--disabled .select-trigger__placeholder {
    color: var(--skill-color-text-disabled);
  }

  .select-trigger__suffix {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs);
    flex-shrink: 0;
  }

  .select-trigger__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: none;
    background: transparent;
    color: var(--skill-color-text-muted);
    border-radius: var(--skill-radius-full);
    cursor: pointer;
    transition: all var(--skill-transition-fast);
    padding: 0;
  }

  .select-trigger__clear:hover {
    background-color: var(--skill-color-surface-hover);
    color: var(--skill-color-text);
  }

  .select-trigger__arrow {
    color: var(--skill-color-text-muted);
    transition: transform var(--skill-transition-fast);
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .select--open .select-trigger__arrow {
    transform: rotate(180deg);
  }

  /* 下拉框 */
  .select-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--skill-color-surface);
    border: 1px solid var(--skill-color-primary);
    border-top: none;
    border-radius: 0 0 var(--skill-radius-md) var(--skill-radius-md);
    box-shadow: var(--skill-shadow-lg);
    z-index: 1000;
    max-height: 320px;
    overflow: hidden;
    margin-top: -1px;
  }

  .select-dropdown__content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* 搜索框 */
  .select-search {
    position: relative;
    padding: var(--skill-spacing-md);
    border-bottom: 1px solid var(--skill-color-border);
  }

  .select-search__input {
    width: 100%;
    padding: var(--skill-spacing-sm) var(--skill-spacing-lg) var(--skill-spacing-sm) var(--skill-spacing-xl);
    border: 1px solid var(--skill-color-border);
    border-radius: var(--skill-radius-md);
    font-size: var(--skill-font-size-sm);
    background-color: var(--skill-color-surface);
    outline: none;
    transition: all var(--skill-transition-fast);
  }

  .select-search__input:focus {
    border-color: var(--skill-color-primary);
    box-shadow: 0 0 0 2px var(--skill-color-primary-light);
  }

  .select-search__input::placeholder {
    color: var(--skill-color-text-muted);
  }

  .select-search__icon {
    position: absolute;
    left: calc(var(--skill-spacing-md) + var(--skill-spacing-sm));
    top: 50%;
    transform: translateY(-50%);
    color: var(--skill-color-text-muted);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 选项容器 */
  .select-options {
    overflow-y: auto;
    max-height: 280px;
  }

  /* 选项分组 */
  .select-group {
    border-bottom: 1px solid var(--skill-color-border-light);
  }

  .select-group:last-child {
    border-bottom: none;
  }

  .select-group__header {
    padding: var(--skill-spacing-sm) var(--skill-spacing-lg);
    font-size: var(--skill-font-size-xs);
    font-weight: var(--skill-font-weight-semibold);
    color: var(--skill-color-text-muted);
    background-color: var(--skill-color-surface-light);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* 选项 */
  .select-option {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm);
    padding: var(--skill-spacing-md) var(--skill-spacing-lg);
    cursor: pointer;
    transition: all var(--skill-transition-fast);
    border-bottom: 1px solid var(--skill-color-border-light);
    min-height: 44px;
    position: relative;
  }

  .select-option:last-child {
    border-bottom: none;
  }

  .select-option:hover {
    background-color: var(--skill-color-surface-hover);
  }

  .select-option--highlighted {
    background-color: var(--skill-color-primary-light);
    color: var(--skill-color-primary-text);
  }

  .select-option--selected {
    background-color: var(--skill-color-primary-light);
    color: var(--skill-color-primary-text);
    font-weight: var(--skill-font-weight-medium);
  }

  .select-option--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* 选项图标 */
  .select-option__icon {
    flex-shrink: 0;
    color: var(--skill-color-text-muted);
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .select-option--highlighted .select-option__icon,
  .select-option--selected .select-option__icon {
    color: inherit;
  }

  /* 选项内容 */
  .select-option__content {
    flex: 1;
    min-width: 0;
  }

  .select-option__label {
    font-size: var(--skill-font-size-sm);
    color: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .select-option__description {
    font-size: var(--skill-font-size-xs);
    color: var(--skill-color-text-muted);
    margin-top: var(--skill-spacing-xs);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .select-option--highlighted .select-option__description,
  .select-option--selected .select-option__description {
    color: inherit;
    opacity: 0.8;
  }

  /* 匹配高亮 */
  .select-option__match {
    font-weight: var(--skill-font-weight-semibold);
    color: var(--skill-color-primary);
  }

  .select-option--highlighted .select-option__match,
  .select-option--selected .select-option__match {
    color: inherit;
    text-decoration: underline;
  }

  /* 复选框（多选模式） */
  .select-option__checkbox {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border: 1px solid var(--skill-color-border);
    border-radius: var(--skill-radius-sm);
    background-color: var(--skill-color-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--skill-transition-fast);
  }

  .select-option--selected .select-option__checkbox {
    background-color: var(--skill-color-primary);
    border-color: var(--skill-color-primary);
    color: var(--skill-color-primary-text);
  }

  /* 单选勾选标记 */
  .select-option__check {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--skill-color-primary);
  }

  /* 加载状态 */
  .select-loading {
    padding: var(--skill-spacing-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--skill-spacing-sm);
  }

  .select-loading__spinner {
    width: 24px;
    height: 24px;
    border: 2px solid var(--skill-color-border);
    border-top-color: var(--skill-color-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .select-loading__spinner--small {
    width: 16px;
    height: 16px;
    border: 2px solid var(--skill-color-border);
    border-top-color: var(--skill-color-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .select-loading__text {
    font-size: var(--skill-font-size-sm);
    color: var(--skill-color-text-muted);
  }

  /* 空状态 */
  .select-empty {
    padding: var(--skill-spacing-xl);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--skill-spacing-sm);
  }

  .select-empty__icon {
    font-size: 32px;
    opacity: 0.5;
  }

  .select-empty__text {
    font-size: var(--skill-font-size-sm);
    color: var(--skill-color-text-muted);
    text-align: center;
  }

  /* 最大选择提示 */
  .select-max-selection {
    padding: var(--skill-spacing-sm) var(--skill-spacing-lg);
    font-size: var(--skill-font-size-sm);
    color: var(--skill-color-warning);
    background-color: var(--skill-color-warning-light);
    border-top: 1px solid var(--skill-color-border);
  }

  /* 滚动条样式 */
  .select-options::-webkit-scrollbar,
  .select-dropdown::-webkit-scrollbar {
    width: 6px;
  }

  .select-options::-webkit-scrollbar-track,
  .select-dropdown::-webkit-scrollbar-track {
    background: var(--skill-color-surface-light);
  }

  .select-options::-webkit-scrollbar-thumb,
  .select-dropdown::-webkit-scrollbar-thumb {
    background: var(--skill-color-border);
    border-radius: 3px;
  }

  .select-options::-webkit-scrollbar-thumb:hover,
  .select-dropdown::-webkit-scrollbar-thumb:hover {
    background: var(--skill-color-border-hover);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    :host {
      max-width: 100%;
    }

    .select-dropdown {
      max-height: 240px;
    }

    .select-option {
      padding: var(--skill-spacing-sm) var(--skill-spacing-md);
    }

    .select-option__description {
      display: none;
    }

    .select-tag {
      max-width: 120px;
    }
  }

  /* 可访问性 */
  .select-option:focus {
    outline: 2px solid var(--skill-color-primary);
    outline-offset: -2px;
  }

  .select-trigger:focus {
    outline: none;
  }

  /* 动画 */
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .select-dropdown {
    animation: fadeIn 0.15s ease-out;
  }

  /* 深色主题支持 */
  @media (prefers-color-scheme: dark) {
    .select-tag {
      background-color: var(--skill-color-primary-dark);
    }

    .select-tag--more {
      background-color: var(--skill-color-surface-dark);
    }

    .select-option__match {
      color: var(--skill-color-primary-light);
    }
  }
`;