import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../../styles/base';
import { userProfileStyles } from './skill-user-profile.styles';
import type { Size, Variant } from '../../../types';

/**
 * 用户信息接口
 */
export interface UserProfile {
  /** 用户头像 */
  avatar?: string;
  /** 用户名 */
  name: string;
  /** 用户职位/角色 */
  role?: string;
  /** 用户邮箱 */
  email?: string;
  /** 用户电话 */
  phone?: string;
  /** 用户状态 */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** 用户描述 */
  description?: string;
  /** 用户位置 */
  location?: string;
  /** 加入时间 */
  joinDate?: string;
  /** 用户标签 */
  tags?: string[];
  /** 用户权限级别 */
  level?: string;
  /** 用户分数/评分 */
  rating?: number;
}

/**
 * Skill User Profile Component
 *
 * 用户资料卡片组件，结合了头像、信息和操作按钮
 *
 * @slot avatar - 自定义头像内容
 * @slot name - 用户名显示区域
 * @slot role - 用户职位显示区域
 * @slot status - 用户状态显示区域
 * @slot description - 用户描述区域
 * @slot contact - 联系信息区域
 * @slot metadata - 元数据区域（位置、加入时间等）
 * @slot tags - 标签区域
 * @slot actions - 操作按钮区域
 * @slot extra - 额外内容区域
 *
 * @csspart container - 主容器
 * @csspart avatar - 头像容器
 * @csspart info - 信息容器
 * @csspart name - 用户名元素
 * @csspart role - 职位元素
 * @csspart status - 状态指示器
 * @csspart contact - 联系信息容器
 * @csspart actions - 操作按钮容器
 *
 * @cssprop --profile-bg - 背景颜色
 * @cssprop --profile-border - 边框颜色
 * @cssprop --profile-shadow - 阴影效果
 * @cssprop --avatar-size - 头像尺寸
 * @cssprop --status-color - 状态颜色
 *
 * @fires skill-click - 点击用户资料时触发
 * @fires skill-action - 点击操作按钮时触发
 * @fires skill-contact - 点击联系信息时触发
 *
 * @example
 * ```html
 * <skill-user-profile
 *   .user="${{
 *     name: '张三',
 *     role: '前端工程师',
 *     email: 'zhangsan@example.com',
 *     avatar: '/avatar.jpg',
 *     status: 'online'
 *   }}"
 *   variant="card"
 *   show-actions
 *   show-contact
 * >
 * </skill-user-profile>
 * ```
 */

@customElement('skill-user-profile')
export class SkillUserProfile extends LitElement {
  static styles = [
    baseStyles,
    userProfileStyles
  ];

  /** 用户信息 */
  @property({ type: Object })
  user: UserProfile = {
    name: '',
    role: '',
    email: '',
    phone: '',
    status: 'offline'
  };

  /** 显示变体 */
  @property({ type: String, reflect: true })
  variant: Variant = 'card' as Variant;

  /** 头像尺寸 */
  @property({ type: String, reflect: true })
  size: Size = 'md';

  /** 是否显示头像 */
  @property({ type: Boolean, reflect: true })
  showAvatar = true;

  /** 是否显示状态指示器 */
  @property({ type: Boolean, reflect: true })
  showStatus = true;

  /** 是否显示联系信息 */
  @property({ type: Boolean, reflect: true })
  showContact = false;

  /** 是否显示操作按钮 */
  @property({ type: Boolean, reflect: true })
  showActions = false;

  /** 是否显示元数据 */
  @property({ type: Boolean, reflect: true })
  showMetadata = false;

  /** 是否显示标签 */
  @property({ type: Boolean, reflect: true })
  showTags = false;

  /** 是否居中对齐 */
  @property({ type: Boolean, reflect: true })
  centered = false;

  /** 是否可点击 */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  /** 操作按钮对齐方式 */
  @property({ type: String })
  actionsAlign: 'left' | 'center' | 'right' = 'left';

  render() {
    const containerClasses = {
      'user-profile': true,
      [`user-profile--${this.variant}`]: true,
      [`user-profile--${this.size}`]: this.size !== 'md',
      'user-profile--clickable': this.clickable,
      'user-profile--compact': this.size === 'sm'
    };

    return html`
      <div
        part="container"
        class="${this._classMap(containerClasses)}"
        @click=${this._handleClick}
        role="button"
        tabindex="${this.clickable ? '0' : '-1'}"
        @keydown=${this._handleKeyDown}
      >
        <div class="user-profile__layout">
          <div part="header" class="user-profile__header ${this.centered ? 'user-profile__header--center' : ''}">
            ${this._renderAvatar()}

            <div part="info" class="user-profile__info">
              ${this._renderNameAndRole()}
              ${this.showStatus ? this._renderStatus() : ''}
              ${this._renderDescription()}
              ${this.user.rating ? this._renderRating() : ''}
              ${this.user.level ? this._renderLevel() : ''}
            </div>
          </div>

          ${this.showContact ? this._renderContact() : ''}

          ${this.showMetadata ? this._renderMetadata() : ''}

          ${this.showTags && this.user.tags?.length ? this._renderTags() : ''}

          <slot name="extra"></slot>

          ${this.showActions ? this._renderActions() : ''}
        </div>
      </div>
    `;
  }

  private _renderAvatar() {
    if (!this.showAvatar) return html``;

    return html`
      <div part="avatar" class="user-profile__avatar-container">
        <slot name="avatar">
          ${this.user.avatar ? html`
            <img
              part="avatar-image"
              class="user-profile__avatar user-profile__avatar--${this.size}"
              src="${this.user.avatar}"
              alt="${this.user.name}"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            />
            <skill-avatar
              class="user-profile__avatar user-profile__avatar--${this.size}"
              name="${this.user.name}"
              style="display: none;"
            ></skill-avatar>
          ` : html`
            <skill-avatar
              class="user-profile__avatar user-profile__avatar--${this.size}"
              name="${this.user.name}"
            ></skill-avatar>
          `}
        </slot>

        ${this.showStatus ? this._renderStatusIndicator() : ''}
      </div>
    `;
  }

  private _renderStatusIndicator() {
    if (!this.user.status) return html``;

    return html`
      <div
        part="status"
        class="user-profile__status user-profile__status--${this.user.status}"
        title="${this._getStatusText(this.user.status)}"
      ></div>
    `;
  }

  private _renderNameAndRole() {
    return html`
      <h3 part="name" class="user-profile__name">
        <slot name="name">${this.user.name || '未知用户'}</slot>
      </h3>

      ${this.user.role ? html`
        <p part="role" class="user-profile__role">
          <slot name="role">${this.user.role}</slot>
        </p>
      ` : ''}
    `;
  }

  private _renderStatus() {
    if (!this.user.status) return html``;

    const statusText = this._getStatusText(this.user.status);

    return html`
      <div part="status-text" class="user-profile__status-text user-profile__status-text--${this.user.status}">
        <slot name="status">
          <span class="status-dot"></span>
          ${statusText}
        </slot>
      </div>
    `;
  }

  private _renderDescription() {
    if (!this.user.description) return html``;

    return html`
      <p part="description" class="user-profile__description">
        <slot name="description">${this.user.description}</slot>
      </p>
    `;
  }

  private _renderRating() {
    if (!this.user.rating) return html``;

    return html`
      <div part="rating" class="user-profile__rating">
        <div class="user-profile__rating-stars">
          ${this._renderStars(this.user.rating)}
        </div>
        <span class="user-profile__rating-value">${this.user.rating.toFixed(1)}</span>
      </div>
    `;
  }

  private _renderStars(rating: number) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return html`
      ${Array.from({ length: fullStars }, () => html`
        <skill-icon name="star" color="var(--skill-warning-400)"></skill-icon>
      `)}
      ${hasHalfStar ? html`<skill-icon name="star-half" color="var(--skill-warning-400)"></skill-icon>` : ''}
      ${Array.from({ length: emptyStars }, () => html`
        <skill-icon name="star" color="var(--skill-gray-300)"></skill-icon>
      `)}
    `;
  }

  private _renderLevel() {
    if (!this.user.level) return html``;

    return html`
      <div part="level" class="user-profile__level">
        <skill-icon name="shield" size="xs"></skill-icon>
        ${this.user.level}
      </div>
    `;
  }

  private _renderContact() {
    const contactItems = [];

    if (this.user.email) {
      contactItems.push(html`
        <a
          part="contact-item"
          class="user-profile__contact-item"
          href="mailto:${this.user.email}"
          @click=${this._handleContactClick}
        >
          <skill-icon name="mail" size="sm"></skill-icon>
          <span>${this.user.email}</span>
        </a>
      `);
    }

    if (this.user.phone) {
      contactItems.push(html`
        <a
          part="contact-item"
          class="user-profile__contact-item"
          href="tel:${this.user.phone}"
          @click=${this._handleContactClick}
        >
          <skill-icon name="phone" size="sm"></skill-icon>
          <span>${this.user.phone}</span>
        </a>
      `);
    }

    if (contactItems.length === 0) return html``;

    return html`
      <div part="contact" class="user-profile__contact">
        <slot name="contact">
          ${contactItems}
        </slot>
      </div>
    `;
  }

  private _renderMetadata() {
    const metadataItems = [];

    if (this.user.location) {
      metadataItems.push(html`
        <div class="user-profile__metadata-item">
          <skill-icon name="map-pin" size="xs"></skill-icon>
          <span>${this.user.location}</span>
        </div>
      `);
    }

    if (this.user.joinDate) {
      metadataItems.push(html`
        <div class="user-profile__metadata-item">
          <skill-icon name="calendar" size="xs"></skill-icon>
          <span>加入于 ${this.user.joinDate}</span>
        </div>
      `);
    }

    if (metadataItems.length === 0) return html``;

    return html`
      <div part="metadata" class="user-profile__metadata">
        <slot name="metadata">
          ${metadataItems}
        </slot>
      </div>
    `;
  }

  private _renderTags() {
    if (!this.user.tags?.length) return html``;

    return html`
      <div part="tags" class="user-profile__tags">
        <slot name="tags">
          ${this.user.tags.map(tag => html`
            <span class="user-profile__tag">${tag}</span>
          `)}
        </slot>
      </div>
    `;
  }

  private _renderActions() {
    const actionsClass = {
      'user-profile__actions': true,
      'user-profile__actions--center': this.actionsAlign === 'center' || this.centered
    };

    return html`
      <div part="actions" class="${this._classMap(actionsClass)}">
        <slot name="actions">
          <skill-button size="sm" variant="primary" @click=${this._handleAction}>关注</skill-button>
          <skill-button size="sm" variant="ghost" @click=${this._handleAction}>私信</skill-button>
        </slot>
      </div>
    `;
  }

  private _classMap(classes: Record<string, boolean>) {
    return Object.entries(classes)
      .filter(([, enabled]) => enabled)
      .map(([className]) => className)
      .join(' ');
  }

  private _getStatusText(status: string) {
    const statusMap = {
      'online': '在线',
      'offline': '离线',
      'away': '离开',
      'busy': '忙碌'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  }

  private _handleClick(e: Event) {
    if (!this.clickable || (e.target as Element).closest('a, button')) {
      return;
    }

    this.dispatchEvent(new CustomEvent('skill-click', {
      bubbles: true,
      composed: true,
      detail: { user: this.user }
    }));
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.clickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      this._handleClick(e);
    }
  }

  private _handleAction(e: Event) {
    e.stopPropagation();
    const action = (e.target as HTMLElement).textContent?.trim();

    this.dispatchEvent(new CustomEvent('skill-action', {
      bubbles: true,
      composed: true,
      detail: { action, user: this.user }
    }));
  }

  private _handleContactClick(e: Event) {
    this.dispatchEvent(new CustomEvent('skill-contact', {
      bubbles: true,
      composed: true,
      detail: {
        type: 'contact',
        user: this.user,
        contactType: (e.target as HTMLElement).closest('a')?.href?.startsWith('mailto:') ? 'email' : 'phone'
      }
    }));
  }

  /**
   * 更新用户信息
   */
  public updateUser(userData: Partial<UserProfile>) {
    this.user = { ...this.user, ...userData };
  }

  /**
   * 更新用户状态
   */
  public updateStatus(status: UserProfile['status']) {
    this.user.status = status;
  }

  /**
   * 添加标签
   */
  public addTag(tag: string) {
    if (!this.user.tags) {
      this.user.tags = [];
    }
    if (!this.user.tags.includes(tag)) {
      this.user.tags.push(tag);
      this.user = { ...this.user };
    }
  }

  /**
   * 移除标签
   */
  public removeTag(tag: string) {
    if (this.user.tags) {
      this.user.tags = this.user.tags.filter(t => t !== tag);
      this.user = { ...this.user };
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skill-user-profile': SkillUserProfile;
  }
}