import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { TemplateResult } from 'lit';
import { baseStyles } from '../../../styles/base';
import { validationSummaryStyles } from './skill-validation-summary.styles';
import type { Size } from '../../../types';

/**
 * Validation message interface
 */
interface ValidationMessage {
  id: string;
  field: string;
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
  target?: string; // CSS selector or element ID to focus
  dismissible?: boolean;
}

/**
 * Skill Validation Summary Component
 *
 * 汇总和显示表单验证错误的分子组件
 *
 * @slot title - Custom title content
 * @slot actions - Action buttons slot
 * @slot empty-state - Content when no validation messages
 *
 * @csspart container - Main container
 * @csspart header - Header section
 * @csspart title - Title element
 * @csspart content - Content area with messages
 * @csspart message - Individual message item
 * @csspart message-icon - Message icon
 * @csspart message-text - Message text
 * @csspart message-field - Field name
 * @csspart message-dismiss - Dismiss button
 * @csspart footer - Footer section
 * @csspart actions - Action buttons container
 *
 * @cssprop --validation-summary-bg - Background color
 * @cssprop --validation-summary-border - Border color
 * @cssprop --validation-summary-radius - Border radius
 * @cssprop --validation-summary-padding - Padding
 * @cssprop --validation-summary-gap - Gap between messages
 *
 * @fires skill-message-click - When a message is clicked
 * @fires skill-message-dismiss - When a message is dismissed
 * @fires skill-clear-all - When clear all is triggered
 * @fires skill-fix-errors - When fix errors action is triggered
 *
 * @example
 * ```html
 * <skill-validation-summary
 *   title="表单验证错误"
 *   messages='[
 *     {"id": "1", "field": "邮箱", "message": "请输入有效的邮箱地址", "type": "error", "target": "#email"},
 *     {"id": "2", "field": "密码", "message": "密码长度至少8位", "type": "error", "target": "#password"}
 *   ]'
 *   show-field-names="true"
 *   dismissible="true"
 * >
 *   <div slot="actions">
 *     <skill-button size="sm" @click="fixErrors">修复错误</skill-button>
 *   </div>
 * </skill-validation-summary>
 * ```
 */

@customElement('skill-validation-summary')
export class SkillValidationSummary extends LitElement {
  static styles = [
    baseStyles,
    validationSummaryStyles
  ];

  /**
   * Validation messages array
   */
  @property({ type: Array, attribute: false })
  messages: ValidationMessage[] = [];

  /**
   * Title text
   */
  @property({ type: String })
  title = '验证消息';

  /**
   * Whether to show field names
   */
  @property({ type: Boolean, attribute: 'show-field-names' })
  showFieldNames = true;

  /**
   * Whether messages are dismissible
   */
  @property({ type: Boolean })
  dismissible = false;

  /**
   * Maximum number of messages to show
   */
  @property({ type: Number, attribute: 'max-messages' })
  maxMessages = 10;

  /**
   * Whether to group messages by type
   */
  @property({ type: Boolean, attribute: 'group-by-type' })
  groupByType = false;

  /**
   * Size variant
   */
  @property({ type: String, reflect: true })
  size: Extract<Size, 'sm' | 'md' | 'lg'> = 'md';

  /**
   * Whether to show empty state
   */
  @property({ type: Boolean, attribute: 'show-empty-state' })
  showEmptyState = true;

  /**
   * Whether to auto-focus first error
   */
  @property({ type: Boolean, attribute: 'auto-focus-first' })
  autoFocusFirst = false;

  /**
   * Whether component is in loading state
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Empty state message
   */
  @property({ type: String, attribute: 'empty-message' })
  emptyMessage = '没有验证消息';

  /**
   * Custom empty state icon
   */
  @property({ type: String, attribute: 'empty-icon' })
  emptyIcon = 'check-circle';

  @state()
  private _animatingMessages = new Set<string>();

  protected willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('messages') && this.autoFocusFirst) {
      this._autoFocusFirstError();
    }
  }

  render() {
    const displayMessages = this.getDisplayMessages();
    const messageType = this.getPrimaryMessageType();
    const containerClasses: Record<string, boolean> = {
      'validation-summary': true,
      [`validation-summary--${messageType}`]: !!messageType,
      [`validation-summary--${this.size}`]: true,
      'validation-summary--loading': this.loading
    };

    return html`
      <div part="container" class="${this._classMap(containerClasses)}">
        ${this._renderHeader(messageType, displayMessages.length)}

        <div part="content" class="validation-summary__content">
          ${displayMessages.length === 0 && this.showEmptyState
            ? this._renderEmptyState()
            : this._renderMessages(displayMessages)
          }
        </div>

        ${this._renderFooter(displayMessages.length)}
      </div>
    `;
  }

  private _renderHeader(messageType: string, messageCount: number) {
    if (messageCount === 0 && !this.showEmptyState) return '';

    return html`
      <div part="header" class="validation-summary__header">
        <h3 part="title" class="validation-summary__title">
          <slot name="title">${this.title}</slot>
          ${messageCount > 0 ? html`
            <span part="count" class="validation-summary__count validation-summary__count--${messageType}">
              ${messageCount}
            </span>
          ` : ''}
        </h3>

        <div part="actions" class="validation-summary__actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }

  private _renderMessages(messages: ValidationMessage[]) {
    if (this.groupByType) {
      return this._renderGroupedMessages(messages);
    }

    return html`
      ${messages.map(message => this._renderMessage(message))}
    `;
  }

  private _renderMessage(message: ValidationMessage) {
    const messageClasses = {
      'validation-summary__message': true,
      [`validation-summary__message--${message.type}`]: true,
      'validation-summary__message--dismissing': this._animatingMessages.has(message.id)
    };

    const icon = this.getMessageIcon(message.type);

    return html`
      <div
        part="message"
        class="${this._classMap(messageClasses)}"
        role="alert"
        tabindex="0"
        @click=${() => this._handleMessageClick(message)}
        @keydown=${(e: KeyboardEvent) => this._handleMessageKeydown(e, message)}
      >
        <div part="message-icon" class="validation-summary__message-icon">
          ${icon}
        </div>

        <div part="message-content" class="validation-summary__message-content">
          ${this.showFieldNames && message.field ? html`
            <div part="message-field" class="validation-summary__message-field">
              ${message.field}
              ${this._renderPriorityBadge(message)}
            </div>
          ` : ''}
          <div part="message-text" class="validation-summary__message-text">
            ${message.message}
          </div>
        </div>

        ${this.dismissible && message.dismissible !== false ? html`
          <button
            part="message-dismiss"
            class="validation-summary__message-dismiss"
            @click=${(e: Event) => this._handleDismiss(e, message)}
            aria-label="Dismiss message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        ` : ''}
      </div>
    `;
  }

  private _renderGroupedMessages(messages: ValidationMessage[]) {
    const grouped = this.groupMessagesByType(messages);

    return html`
      ${Object.entries(grouped).map(([type, typeMessages]) => html`
        <div style="margin-bottom: var(--skill-spacing-md);">
          <div style="font-weight: var(--skill-font-semibold); margin-bottom: var(--skill-spacing-xs); color: var(--skill-gray-700);">
            ${this.getTypeLabel(type)} (${typeMessages.length})
          </div>
          ${typeMessages.map(message => this._renderMessage(message))}
        </div>
      `)}
    `;
  }

  private _renderEmptyState() {
    return html`
      <div part="empty-state" class="validation-summary__empty-state">
        <slot name="empty-state">
          <div class="validation-summary__empty-state-icon">
            ${this.getEmptyStateIcon()}
          </div>
          <div>${this.emptyMessage}</div>
        </slot>
      </div>
    `;
  }

  private _renderFooter(messageCount: number) {
    const slotElement = this.shadowRoot?.querySelector('slot[name="actions"]');
    const hasActions = slotElement ? (slotElement as HTMLSlotElement).assignedElements()?.length || 0 : 0;

    if (messageCount === 0 && !hasActions) return '';

    return html`
      <div part="footer" class="validation-summary__footer">
        <div part="summary" class="validation-summary__summary">
          ${this._getSummaryText(messageCount)}
        </div>

        ${messageCount > 0 ? html`
          <div part="actions" class="validation-summary__actions">
            <slot name="footer-actions">
              ${this.dismissible ? html`
                <button
                  type="button"
                  @click=${this._handleClearAll}
                  style="background: none; border: none; color: var(--skill-primary-600); cursor: pointer; font-size: var(--skill-text-sm);"
                >
                  清除全部
                </button>
              ` : ''}
            </slot>
          </div>
        ` : ''}
      </div>
    `;
  }

  private _renderPriorityBadge(message: ValidationMessage) {
    // Simple priority calculation based on message type
    const priority = message.type === 'error' ? 'high' : message.type === 'warning' ? 'medium' : 'low';

    return html`
      <span class="validation-summary__priority validation-summary__priority--${priority}">
        ${priority === 'high' ? '高' : priority === 'medium' ? '中' : '低'}
      </span>
    `;
  }

  private getMessageIcon(type: string) {
    const icons: Record<string, TemplateResult> = {
      error: html`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`,
      warning: html`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`,
      info: html`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`,
      success: html`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
    };

    return icons[type] || icons.info;
  }

  private getEmptyStateIcon() {
    const icons: Record<string, TemplateResult> = {
      'check-circle': html`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
      'info': html`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`
    };

    return icons[this.emptyIcon] || icons['check-circle'];
  }

  private getDisplayMessages(): ValidationMessage[] {
    if (this.maxMessages > 0 && this.messages.length > this.maxMessages) {
      return this.messages.slice(0, this.maxMessages);
    }
    return this.messages;
  }

  private getPrimaryMessageType(): string {
    if (this.messages.length === 0) return '';

    // Priority: error > warning > info > success
    const types = ['error', 'warning', 'info', 'success'];
    for (const type of types) {
      if (this.messages.some(msg => msg.type === type)) {
        return type;
      }
    }

    return 'info';
  }

  private groupMessagesByType(messages: ValidationMessage[]) {
    return messages.reduce((groups, message) => {
      if (!groups[message.type]) {
        groups[message.type] = [];
      }
      groups[message.type].push(message);
      return groups;
    }, {} as Record<string, ValidationMessage[]>);
  }

  private getTypeLabel(type: string) {
    const labels: Record<string, string> = {
      error: '错误',
      warning: '警告',
      info: '信息',
      success: '成功'
    };

    return labels[type] || type;
  }

  private _getSummaryText(messageCount: number) {
    if (messageCount === 0) return '没有验证消息';

    const errorCount = this.messages.filter(msg => msg.type === 'error').length;
    const warningCount = this.messages.filter(msg => msg.type === 'warning').length;

    const parts = [];
    if (errorCount > 0) parts.push(`${errorCount} 个错误`);
    if (warningCount > 0) parts.push(`${warningCount} 个警告`);

    return parts.length > 0 ? parts.join(', ') : `${messageCount} 个消息`;
  }

  private _handleMessageClick(message: ValidationMessage) {
    if (message.target) {
      const element = document.querySelector(message.target) as HTMLElement;
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    this.dispatchEvent(new CustomEvent('skill-message-click', {
      bubbles: true,
      composed: true,
      detail: { message }
    }));
  }

  private _handleMessageKeydown(e: KeyboardEvent, message: ValidationMessage) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleMessageClick(message);
    }
  }

  private _handleDismiss(e: Event, message: ValidationMessage) {
    e.stopPropagation();

    this._animatingMessages.add(message.id);

    setTimeout(() => {
      this.messages = this.messages.filter(msg => msg.id !== message.id);
      this._animatingMessages.delete(message.id);

      this.dispatchEvent(new CustomEvent('skill-message-dismiss', {
        bubbles: true,
        composed: true,
        detail: { message }
      }));
    }, 300);
  }

  private _handleClearAll() {
    this.dispatchEvent(new CustomEvent('skill-clear-all', {
      bubbles: true,
      composed: true
    }));

    this.messages = [];
  }

  private _autoFocusFirstError() {
    const firstError = this.messages.find(msg => msg.type === 'error');
    if (firstError && firstError.target) {
      setTimeout(() => {
        const element = document.querySelector(firstError.target!) as HTMLElement;
        if (element) {
          element.focus();
        }
      }, 100);
    }
  }

  private _classMap(classes: Record<string, boolean>): string {
    return Object.entries(classes)
      .filter(([, enabled]) => enabled)
      .map(([className]) => className)
      .join(' ');
  }

  /**
   * Add a new validation message
   */
  public addMessage(message: Omit<ValidationMessage, 'id'>) {
    const newMessage: ValidationMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    this.messages = [...this.messages, newMessage];
    return newMessage.id;
  }

  /**
   * Remove a message by ID
   */
  public removeMessage(id: string) {
    this.messages = this.messages.filter(msg => msg.id !== id);
  }

  /**
   * Clear all messages
   */
  public clearMessages() {
    this.messages = [];
  }

  /**
   * Clear messages by type
   */
  public clearMessagesByType(type: ValidationMessage['type']) {
    this.messages = this.messages.filter(msg => msg.type !== type);
  }

  /**
   * Get message count by type
   */
  public getMessageCount(type?: ValidationMessage['type']) {
    if (!type) return this.messages.length;
    return this.messages.filter(msg => msg.type === type).length;
  }

  /**
   * Check if has errors
   */
  public hasErrors() {
    return this.messages.some(msg => msg.type === 'error');
  }

  /**
   * Check if has warnings
   */
  public hasWarnings() {
    return this.messages.some(msg => msg.type === 'warning');
  }

  /**
   * Focus first message
   */
  public focusFirstMessage() {
    const firstMessage = this.messages[0];
    if (firstMessage) {
      this._handleMessageClick(firstMessage);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skill-validation-summary': SkillValidationSummary;
  }
}