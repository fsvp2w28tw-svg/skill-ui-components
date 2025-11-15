import { LitElement, html } from 'lit';
import { notificationStyles } from './skill-notification.styles';
import { baseStyles } from '../../../styles/base';

export class SkillNotification extends LitElement {
  static styles = [baseStyles, notificationStyles];

  static properties = {
    variant: { type: String, reflect: true },
    type: { type: String, reflect: true },
    closable: { type: Boolean, reflect: true },
    size: { type: String, reflect: true },
    position: { type: String, reflect: true },
    duration: { type: Number },
    showProgress: { type: Boolean, reflect: true, attribute: 'show-progress' },
    expandable: { type: Boolean, reflect: true },
    clickable: { type: Boolean, reflect: true },
    visible: { type: Boolean, reflect: true },
  };

  title = '';
  message = '';

  declare variant: 'alert' | 'toast' | 'bar';
  declare type: 'success' | 'error' | 'warning' | 'info' | 'default' | 'neutral';
  declare closable: boolean;
  declare size: 'sm' | 'md' | 'lg';
  declare position?: string;
  declare duration?: number;
  declare showProgress: boolean;
  declare expandable: boolean;
  declare clickable: boolean;
  declare visible: boolean;

  private _expanded = false;
  private _progress = 0;
  private _timeout?: number;
  private _progressInterval?: number;

  constructor() {
    super();
    this.variant = 'alert';
    this.type = 'default';
    this.closable = true;
    this.size = 'md';
    this.showProgress = false;
    this.expandable = false;
    this.clickable = false;
    this.visible = true;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.duration && (this.variant === 'toast' || this.variant === 'bar')) {
      this._startAutoClose();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimeouts();
  }

  private _startAutoClose() {
    if (this.duration && this.duration > 0) {
      const interval = 50; // Update every 50ms for smooth progress
      const totalSteps = this.duration / interval;
      let currentStep = 0;

      this._progressInterval = window.setInterval(() => {
        currentStep++;
        this._progress = (currentStep / totalSteps) * 100;
        this.requestUpdate();

        if (currentStep >= totalSteps) {
          this._clearTimeouts();
          this.close();
        }
      }, interval);

      this._timeout = window.setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }

  private _clearTimeouts() {
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = undefined;
    }
    if (this._progressInterval) {
      clearInterval(this._progressInterval);
      this._progressInterval = undefined;
    }
  }

  private _handleClose(_e: Event) {
    _e.preventDefault();
    _e.stopPropagation();
    this.close();
  }

  private _handleClick(_e: Event) {
    if (!this.clickable) return;

    this.dispatchEvent(new CustomEvent('skill-notification-click', {
      bubbles: true,
      composed: true,
      detail: {
        variant: this.variant,
        type: this.type,
        title: this.title,
        message: this.message,
      }
    }));
  }

  private _handleToggleExpand() {
    this._expanded = !this._expanded;
    this.requestUpdate();
  }

  private _handleMouseEnter() {
    if (this.variant === 'toast' && this._timeout) {
      this._clearTimeouts();
    }
  }

  private _handleMouseLeave() {
    if (this.variant === 'toast' && this.duration) {
      this._startAutoClose();
    }
  }

  private _renderIcon() {
    const icons = {
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
      error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
      warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>',
      info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
      default: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
      neutral: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    };

    return html`
      <div part="icon" class="skill-notification__icon">
        <slot name="icon">${icons[this.type] || icons.default}</slot>
      </div>
    `;
  }

  private _renderContent() {
    return html`
      <div part="content" class="skill-notification__content">
        ${this.title ? html`
          <div part="title" class="skill-notification__title">${this.title}</div>
        ` : ''}
        ${this.message ? html`
          <div part="message" class="skill-notification__message ${this.expandable ? 'skill-notification__message--expandable' : ''}">
            ${this.expandable && !this._expanded && this.message && this.message.length > 100
              ? `${this.message.substring(0, 100)}...`
              : this.message}
            ${this.expandable && this.message && this.message.length > 100
              ? html`<button part="expand-toggle" class="skill-notification__expand-toggle" @click=${this._handleToggleExpand}>
                  ${this._expanded ? '收起' : '展开'}
                </button>`
              : ''}
          </div>
        ` : ''}
        <slot></slot>
      </div>
    `;
  }

  private _renderActions() {
    return html`
      <div part="actions" class="skill-notification__actions">
        <slot name="actions"></slot>
      </div>
    `;
  }

  private _renderCloseButton() {
    return html`
      <button
        part="close"
        class="skill-notification__close"
        type="button"
        @click=${this._handleClose}
      >
        <slot name="close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </slot>
      </button>
    `;
  }

  private _renderProgressBar() {
    if (!this.showProgress) return '';

    return html`
      <div part="progress" class="skill-notification__progress">
        <div
          part="progress-bar"
          class="skill-notification__progress-bar"
          style="width: ${this._progress}%"
        ></div>
      </div>
    `;
  }

  render() {
    if (!this.visible) {
      return html``;
    }

    return html`
      <div
        part="notification"
        class="skill-notification skill-notification--${this.variant} skill-notification--${this.type} skill-notification--${this.size}"
        @click=${this._handleClick}
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
      >
        ${this._renderIcon()}
        ${this._renderContent()}
        ${this._renderActions()}
        ${this.closable ? this._renderCloseButton() : ''}
        ${this._renderProgressBar()}
      </div>
    `;
  }

  // Public API methods
  close() {
    this.visible = false;
    this._clearTimeouts();
    this.dispatchEvent(new CustomEvent('skill-notification-close', {
      bubbles: true,
      composed: true,
      detail: {
        variant: this.variant,
        type: this.type,
        title: this.title,
        message: this.message,
      }
    }));
  }

  show() {
    this.visible = true;
    if (this.duration && (this.variant === 'toast' || this.variant === 'bar')) {
      this._startAutoClose();
    }
    this.dispatchEvent(new CustomEvent('skill-notification-show', {
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('skill-notification', SkillNotification);