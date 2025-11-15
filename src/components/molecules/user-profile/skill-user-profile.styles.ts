import { css } from 'lit';

/**
 * UserProfile 组件样式
 */
export const userProfileStyles = css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
    --profile-bg: var(--skill-surface-0, #ffffff);
    --profile-border: var(--skill-gray-200, #e5e7eb);
    --profile-shadow: var(--skill-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
    --profile-radius: var(--skill-radius-lg, 8px);
    --profile-padding: var(--skill-spacing-lg, 24px);
    --profile-gap: var(--skill-spacing-md, 16px);
    --avatar-size: 64px;
    --status-size: 16px;
    --status-online: var(--skill-success-500, #10b981);
    --status-offline: var(--skill-gray-400, #9ca3af);
    --status-away: var(--skill-warning-500, #f59e0b);
    --status-busy: var(--skill-error-500, #ef4444);
    --name-color: var(--skill-gray-900, #111827);
    --role-color: var(--skill-gray-600, #4b5563);
    --description-color: var(--skill-gray-700, #374151);
    --contact-color: var(--skill-gray-600, #4b5563);
    --metadata-color: var(--skill-gray-500, #6b7280);
    --tag-bg: var(--skill-gray-100, #f3f4f6);
    --tag-color: var(--skill-gray-700, #374151);
    --transition: all 0.2s ease;
  }

  .user-profile {
    background: var(--profile-bg);
    border: 1px solid var(--profile-border);
    border-radius: var(--profile-radius);
    padding: var(--profile-padding);
    transition: var(--transition);
    position: relative;
  }

  /* 变体样式 */
  .user-profile--card {
    box-shadow: var(--profile-shadow);
  }

  .user-profile--card:hover {
    box-shadow: var(--skill-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
    transform: translateY(-1px);
  }

  .user-profile--inline {
    display: flex;
    align-items: center;
    gap: var(--profile-gap);
    padding: var(--skill-spacing-md);
    border: none;
    background: transparent;
  }

  .user-profile--compact {
    padding: var(--skill-spacing-md);
    --profile-gap: var(--skill-spacing-sm, 12px);
  }

  .user-profile--spacious {
    padding: var(--skill-spacing-xl, 32px);
    --profile-gap: var(--skill-spacing-lg, 24px);
  }

  /* 可点击状态 */
  .user-profile--clickable {
    cursor: pointer;
  }

  .user-profile--clickable:hover {
    transform: translateY(-2px);
    box-shadow: var(--skill-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
  }

  /* 布局结构 */
  .user-profile__layout {
    display: flex;
    flex-direction: column;
    gap: var(--profile-gap);
  }

  .user-profile__header {
    display: flex;
    align-items: flex-start;
    gap: var(--profile-gap);
  }

  .user-profile--inline .user-profile__header {
    align-items: center;
  }

  .user-profile__header--center {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  /* 头像容器 */
  .user-profile__avatar-container {
    position: relative;
    flex-shrink: 0;
  }

  .user-profile__avatar {
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--profile-border);
    transition: var(--transition);
  }

  .user-profile--clickable:hover .user-profile__avatar {
    border-color: var(--skill-primary-300, #93c5fd);
  }

  /* 头像尺寸 */
  .user-profile__avatar--sm {
    width: 48px;
    height: 48px;
  }

  .user-profile__avatar--md {
    width: var(--avatar-size);
    height: var(--avatar-size);
  }

  .user-profile__avatar--lg {
    width: 96px;
    height: 96px;
  }

  .user-profile__avatar--xl {
    width: 128px;
    height: 128px;
  }

  /* 状态指示器 */
  .user-profile__status {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: var(--status-size);
    height: var(--status-size);
    border-radius: 50%;
    border: 3px solid var(--profile-bg);
    transition: var(--transition);
    box-shadow: 0 0 0 1px var(--profile-border);
  }

  .user-profile__status--online {
    background: var(--status-online);
    box-shadow: 0 0 0 2px var(--skill-success-100, #d1fae5);
  }

  .user-profile__status--offline {
    background: var(--status-offline);
  }

  .user-profile__status--away {
    background: var(--status-away);
    box-shadow: 0 0 0 2px var(--skill-warning-100, #fed7aa);
  }

  .user-profile__status--busy {
    background: var(--status-busy);
    box-shadow: 0 0 0 2px var(--skill-error-100, #fee2e2);
  }

  /* 信息区域 */
  .user-profile__info {
    flex: 1;
    min-width: 0;
  }

  .user-profile__name {
    font-size: var(--skill-text-lg, 18px);
    font-weight: var(--skill-font-semibold, 600);
    color: var(--name-color);
    margin: 0 0 var(--skill-spacing-xs, 4px) 0;
    line-height: 1.3;
    word-break: break-word;
  }

  .user-profile__role {
    font-size: var(--skill-text-sm, 14px);
    color: var(--role-color);
    margin: 0 0 var(--skill-spacing-xs, 4px) 0;
    line-height: 1.4;
  }

  /* 状态文本 */
  .user-profile__status-text {
    display: inline-flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
    font-size: var(--skill-text-xs, 11px);
    font-weight: var(--skill-font-medium, 500);
    padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
    border-radius: var(--skill-radius-full, 9999px);
    margin-top: var(--skill-spacing-xs, 4px);
  }

  .user-profile__status-text--online {
    background: var(--skill-success-100, #d1fae5);
    color: var(--skill-success-700, #047857);
  }

  .user-profile__status-text--offline {
    background: var(--skill-gray-100, #f3f4f6);
    color: var(--skill-gray-700, #374151);
  }

  .user-profile__status-text--away {
    background: var(--skill-warning-100, #fed7aa);
    color: var(--skill-warning-700, #b45309);
  }

  .user-profile__status-text--busy {
    background: var(--skill-error-100, #fee2e2);
    color: var(--skill-error-700, #b91c1c);
  }

  .user-profile__status-text .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }

  /* 描述 */
  .user-profile__description {
    font-size: var(--skill-text-sm, 14px);
    color: var(--description-color);
    line-height: 1.5;
    margin: 0;
  }

  /* 联系信息 */
  .user-profile__contact {
    display: flex;
    flex-direction: column;
    gap: var(--skill-spacing-sm);
    margin-top: var(--skill-spacing-sm);
  }

  .user-profile__contact-item {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-sm);
    font-size: var(--skill-text-sm, 14px);
    color: var(--contact-color);
    text-decoration: none;
    transition: var(--transition);
    padding: var(--skill-spacing-xs);
    border-radius: var(--skill-radius-sm, 4px);
  }

  .user-profile__contact-item:hover {
    color: var(--skill-primary-600, #2563eb);
    background: var(--skill-primary-50, #eff6ff);
  }

  /* 元数据 */
  .user-profile__metadata {
    display: flex;
    flex-wrap: wrap;
    gap: var(--profile-gap);
    margin-top: var(--skill-spacing-sm);
    font-size: var(--skill-text-xs, 11px);
    color: var(--metadata-color);
  }

  .user-profile__metadata-item {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs);
  }

  /* 标签 */
  .user-profile__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--skill-spacing-xs);
    margin-top: var(--skill-spacing-sm);
  }

  .user-profile__tag {
    font-size: var(--skill-text-xs, 11px);
    padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
    background: var(--tag-bg);
    color: var(--tag-color);
    border-radius: var(--skill-radius-md, 6px);
    border: 1px solid var(--profile-border);
    transition: var(--transition);
  }

  .user-profile__tag:hover {
    background: var(--skill-gray-200, #e5e7eb);
  }

  /* 操作区域 */
  .user-profile__actions {
    display: flex;
    gap: var(--skill-spacing-sm);
    margin-top: var(--profile-gap);
    padding-top: var(--profile-gap);
    border-top: 1px solid var(--profile-border);
  }

  .user-profile--inline .user-profile__actions {
    border-top: none;
    padding-top: 0;
    margin-top: 0;
    margin-left: auto;
  }

  .user-profile__actions--center {
    justify-content: center;
  }

  .user-profile__actions--right {
    justify-content: flex-end;
  }

  /* 评分 */
  .user-profile__rating {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs);
    margin-top: var(--skill-spacing-xs);
  }

  .user-profile__rating-stars {
    display: flex;
    gap: 2px;
  }

  .user-profile__rating-value {
    font-size: var(--skill-text-sm, 14px);
    color: var(--metadata-color);
    font-weight: var(--skill-font-medium, 500);
  }

  /* 等级 */
  .user-profile__level {
    display: inline-flex;
    align-items: center;
    gap: var(--skill-spacing-xs);
    padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
    background: var(--skill-primary-100, #dbeafe);
    color: var(--skill-primary-700, #1d4ed8);
    border-radius: var(--skill-radius-md, 6px);
    font-size: var(--skill-text-xs, 11px);
    font-weight: var(--skill-font-semibold, 600);
    margin-top: var(--skill-spacing-xs);
  }

  /* 尺寸调整 */
  .user-profile--sm {
    --profile-padding: var(--skill-spacing-md, 16px);
    --profile-gap: var(--skill-spacing-sm, 12px);
    --avatar-size: 48px;
    --status-size: 12px;
  }

  .user-profile--sm .user-profile__name {
    font-size: var(--skill-text-base, 16px);
  }

  .user-profile--sm .user-profile__role,
  .user-profile--sm .user-profile__description {
    font-size: var(--skill-text-xs, 11px);
  }

  .user-profile--lg {
    --profile-padding: var(--skill-spacing-xl, 32px);
    --profile-gap: var(--skill-spacing-lg, 24px);
    --avatar-size: 96px;
    --status-size: 20px;
  }

  .user-profile--lg .user-profile__name {
    font-size: var(--skill-text-xl, 20px);
  }

  .user-profile--lg .user-profile__role {
    font-size: var(--skill-text-base, 16px);
  }

  .user-profile--lg .user-profile__description {
    font-size: var(--skill-text-base, 16px);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .user-profile {
      padding: var(--skill-spacing-md);
    }

    .user-profile__header {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .user-profile__actions {
      flex-direction: column;
    }

    .user-profile__contact {
      align-items: center;
    }

    .user-profile__metadata {
      justify-content: center;
    }

    .user-profile__tags {
      justify-content: center;
    }
  }

  /* 超小屏幕 */
  @media (max-width: 480px) {
    .user-profile--inline {
      flex-direction: column;
      text-align: center;
    }

    .user-profile--inline .user-profile__actions {
      margin-left: 0;
      margin-top: var(--skill-spacing-sm);
      padding-top: var(--skill-spacing-sm);
      border-top: 1px solid var(--profile-border);
    }

    .user-profile__avatar--xl {
      width: 80px;
      height: 80px;
    }

    .user-profile__avatar--lg {
      width: 64px;
      height: 64px;
    }
  }

  /* 深色模式支持 */
  @media (prefers-color-scheme: dark) {
    :host {
      --profile-bg: var(--skill-surface-100, #374151);
      --profile-border: var(--skill-gray-700, #4b5563);
      --name-color: var(--skill-gray-100, #f3f4f6);
      --role-color: var(--skill-gray-400, #9ca3af);
      --description-color: var(--skill-gray-300, #d1d5db);
      --contact-color: var(--skill-gray-400, #9ca3af);
      --metadata-color: var(--skill-gray-500, #6b7280);
      --tag-bg: var(--skill-gray-800, #1f2937);
      --tag-color: var(--skill-gray-200, #e5e7eb);
    }

    .user-profile__status {
      border-color: var(--profile-bg);
    }

    .user-profile__tag:hover {
      background: var(--skill-gray-700, #374151);
    }

    .user-profile__contact-item:hover {
      background: rgba(59, 130, 246, 0.1);
    }

    .user-profile__actions {
      border-top-color: var(--profile-border);
    }

    .user-profile--inline .user-profile__actions {
      border-top-color: var(--profile-border);
    }
  }

  /* 高对比度模式 */
  @media (prefers-contrast: high) {
    .user-profile {
      border-width: 2px;
      box-shadow: none;
    }

    .user-profile__avatar {
      border-width: 2px;
    }

    .user-profile__name {
      font-weight: var(--skill-font-bold, 700);
    }

    .user-profile__tag {
      border-width: 2px;
      font-weight: var(--skill-font-medium, 500);
    }

    .user-profile__status {
      border-width: 2px;
    }

    .user-profile__actions {
      border-top-width: 2px;
    }
  }

  /* 减少动画模式 */
  @media (prefers-reduced-motion: reduce) {
    .user-profile,
    .user-profile__avatar,
    .user-profile__status,
    .user-profile__contact-item,
    .user-profile__tag {
      transition: none;
    }

    .user-profile--clickable:hover,
    .user-profile--card:hover {
      transform: none;
    }
  }

  /* 打印样式 */
  @media print {
    .user-profile {
      background: transparent;
      border: 1px solid #000;
      box-shadow: none;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .user-profile__actions {
      display: none;
    }

    .user-profile__status {
      background: #000;
    }

    .user-profile__tag {
      background: transparent;
      border: 1px solid #000;
      color: #000;
    }

    .user-profile__contact-item {
      color: #000;
    }

    .user-profile__level {
      background: transparent;
      border: 1px solid #000;
      color: #000;
    }
  }

  /* 可访问性增强 */
  .user-profile--clickable:focus-visible {
    outline: 2px solid var(--skill-primary-500, #3b82f6);
    outline-offset: 2px;
  }

  /* 高对比度焦点指示器 */
  @media (prefers-contrast: high) {
    .user-profile--clickable:focus-visible {
      outline-width: 3px;
    }
  }

  /* 触摸设备优化 */
  @media (hover: none) and (pointer: coarse) {
    .user-profile--clickable {
      min-height: 48px;
    }

    .user-profile__contact-item {
      min-height: 44px;
    }

    .user-profile__tag {
      min-height: 32px;
      display: flex;
      align-items: center;
    }
  }

  /* 加载状态 */
  .user-profile--loading {
    pointer-events: none;
  }

  .user-profile--loading .user-profile__avatar {
    opacity: 0.5;
  }

  .user-profile--loading .user-profile__name,
  .user-profile--loading .user-profile__role,
  .user-profile--loading .user-profile__description {
    color: var(--metadata-color);
  }

  /* 键盘导航 */
  .user-profile--clickable[role="button"] {
    -webkit-tap-highlight-color: transparent;
  }

  /* 自定义滚动条（在紧凑模式下） */
  .user-profile--compact .user-profile__tags {
    max-height: 60px;
    overflow-y: auto;
  }

  .user-profile--compact .user-profile__tags::-webkit-scrollbar {
    width: 4px;
  }

  .user-profile--compact .user-profile__tags::-webkit-scrollbar-track {
    background: var(--tag-bg);
    border-radius: 2px;
  }

  .user-profile--compact .user-profile__tags::-webkit-scrollbar-thumb {
    background: var(--profile-border);
    border-radius: 2px;
  }

  .user-profile--compact .user-profile__tags::-webkit-scrollbar-thumb:hover {
    background: var(--metadata-color);
  }
`;