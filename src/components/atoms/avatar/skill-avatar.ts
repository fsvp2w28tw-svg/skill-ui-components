import { LitElement, html, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { avatarStyles } from './skill-avatar.styles';
import { baseStyles } from '../../../styles/base';
import type { Size } from '../../../types';

/**
 * Skill Avatar Component
 *
 * @slot - Custom avatar content (overrides image and text)
 *
 * @csspart avatar - The avatar element
 * @csspart image - The image element
 * @csspart text - The text element
 * @csspart icon - The fallback icon
 * @csspart status - The status indicator
 *
 * @example
 * ```html
 * <!-- Image avatar -->
 * <skill-avatar src="user.jpg" alt="User"></skill-avatar>
 *
 * <!-- Text avatar with initials -->
 * <skill-avatar fallback="John Doe"></skill-avatar>
 *
 * <!-- Avatar with status -->
 * <skill-avatar src="user.jpg" status="online" show-status></skill-avatar>
 *
 * <!-- Custom content -->
 * <skill-avatar>
 *   <span>JD</span>
 * </skill-avatar>
 * ```
 */
@customElement('skill-avatar')
export class SkillAvatar extends LitElement {
  static styles = [baseStyles, avatarStyles];

  /**
   * Image source URL
   */
  @property({ type: String })
  src = '';

  /**
   * Alt text for image
   */
  @property({ type: String })
  alt = '';

  /**
   * Avatar size
   */
  @property({ type: String })
  size: Size | '2xl' = 'md';

  /**
   * Fallback text (shows initials)
   */
  @property({ type: String })
  fallback = '';

  /**
   * User status
   */
  @property({ type: String })
  status: 'online' | 'offline' | 'away' | 'busy' | '' = '';

  /**
   * Show status indicator
   */
  @property({ type: Boolean, attribute: 'show-status' })
  showStatus = false;

  /**
   * Avatar shape
   */
  @property({ type: String })
  shape: 'circle' | 'square' = 'circle';

  /**
   * Track if image failed to load
   */
  @state()
  private _imageError = false;

  render() {
    const classes = [
      'skill-avatar',
      `skill-avatar--${this.size}`,
      `skill-avatar--${this.shape}`
    ].join(' ');

    return html`
      <div part="avatar" class="${classes}">
        ${this._renderContent()}
        ${this.showStatus && this.status ? this._renderStatus() : nothing}
      </div>
    `;
  }

  private _renderContent() {
    // Check if there's slotted content
    const hasSlot = this.childNodes.length > 0;
    if (hasSlot) {
      return html`<slot></slot>`;
    }

    // Try to show image
    if (this.src && !this._imageError) {
      return html`
        <img
          part="image"
          class="skill-avatar__image"
          src=${this.src}
          alt=${this.alt}
          @error=${this._handleImageError}
        />
      `;
    }

    // Show fallback text (initials)
    if (this.fallback) {
      return html`
        <span part="text" class="skill-avatar__text">
          ${this._getInitials(this.fallback)}
        </span>
      `;
    }

    // Show default user icon
    return this._renderDefaultIcon();
  }

  private _renderDefaultIcon() {
    return svg`
      <svg
        part="icon"
        class="skill-avatar__icon"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    `;
  }

  private _renderStatus() {
    const statusClasses = [
      'skill-avatar__status',
      `skill-avatar__status--${this.status}`
    ].join(' ');

    return html`<span part="status" class="${statusClasses}"></span>`;
  }

  private _getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  private _handleImageError() {
    this._imageError = true;
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-avatar': SkillAvatar;
  }
}
