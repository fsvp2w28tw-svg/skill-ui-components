import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { baseStyles } from '../../../styles/base';

/**
 * CardSection molecule component that combines card header, content, and actions.
 *
 * @element skill-card-section
 *
 * @example
 * ```html
 * <!-- Basic card section -->
 * <skill-card-section title="User Information">
 *   <p>Name: John Doe</p>
 *   <p>Email: john@example.com</p>
 * </skill-card-section>
 *
 * <!-- With actions -->
 * <skill-card-section title="Settings" action-text="Edit" @action-click="${this.handleEdit}">
 *   <div>Settings content goes here</div>
 * </skill-card-section>
 *
 * <!-- With custom header content -->
 * <skill-card-section>
 *   <div slot="header">
 *     <skill-avatar src="/avatar.jpg"></skill-avatar>
 *     <div>
 *       <h3>John Doe</h3>
 *       <p>Software Engineer</p>
 *     </div>
 *   </div>
 *   <div>User profile content</div>
 * </skill-card-section>
 *
 * <!-- With footer actions -->
 * <skill-card-section title="Confirm Action">
 *   <p>Are you sure you want to proceed?</p>
 *   <div slot="footer">
 *     <skill-button variant="ghost">Cancel</skill-button>
 *     <skill-button variant="primary">Confirm</skill-button>
 *   </div>
 * </skill-card-section>
 *
 * <!-- Compact variant -->
 * <skill-card-section variant="compact" title="Quick Stats">
 *   <div>Content here</div>
 * </skill-card-section>
 * ```
 */
@customElement('skill-card-section')
export class CardSection extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .card-section {
        background-color: var(--skill-color-surface);
        border: 1px solid var(--skill-color-border);
        border-radius: var(--skill-radius-lg);
        overflow: hidden;
        box-shadow: var(--skill-shadow-sm);
        transition: box-shadow var(--skill-transition-fast);
      }

      .card-section:hover {
        box-shadow: var(--skill-shadow-md);
      }

      .card-section--elevated {
        box-shadow: var(--skill-shadow-md);
      }

      .card-section--elevated:hover {
        box-shadow: var(--skill-shadow-lg);
      }

      .card-section--borderless {
        border: none;
        box-shadow: var(--skill-shadow-sm);
      }

      /* Header */
      .card-section__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--skill-spacing-lg);
        border-bottom: 1px solid var(--skill-color-border);
        background-color: var(--skill-color-surface-elevated);
        min-height: 60px;
      }

      .card-section--compact .card-section__header {
        padding: var(--skill-spacing-md) var(--skill-spacing-lg);
        min-height: 48px;
      }

      .card-section--borderless .card-section__header {
        border-bottom: none;
      }

      .card-section__header--has-action {
        cursor: pointer;
        transition: background-color var(--skill-transition-fast);
      }

      .card-section__header--has-action:hover {
        background-color: var(--skill-color-surface-hover);
      }

      .card-section__header-content {
        display: flex;
        align-items: center;
        gap: var(--skill-spacing-md);
        flex: 1;
      }

      .card-section__title {
        font-size: var(--skill-font-size-lg);
        font-weight: var(--skill-font-weight-semibold);
        color: var(--skill-color-text);
        margin: 0;
        line-height: 1.3;
      }

      .card-section--compact .card-section__title {
        font-size: var(--skill-font-size-md);
        font-weight: var(--skill-font-weight-medium);
      }

      .card-section__description {
        font-size: var(--skill-font-size-sm);
        color: var(--skill-color-text-muted);
        margin: 0;
        line-height: 1.4;
      }

      .card-section__action {
        display: flex;
        align-items: center;
        gap: var(--skill-spacing-xs);
        color: var(--skill-color-primary);
        font-size: var(--skill-font-size-sm);
        font-weight: var(--skill-font-weight-medium);
        cursor: pointer;
        padding: var(--skill-spacing-xs) var(--skill-spacing-sm);
        border-radius: var(--skill-radius-sm);
        transition: all var(--skill-transition-fast);
        user-select: none;
      }

      .card-section__action:hover {
        background-color: var(--skill-color-primary-light);
        color: var(--skill-color-primary-dark);
      }

      .card-section__action-icon {
        width: 16px;
        height: 16px;
        transition: transform var(--skill-transition-fast);
      }

      .card-section--expanded .card-section__action-icon {
        transform: rotate(180deg);
      }

      /* Content */
      .card-section__content {
        padding: var(--skill-spacing-lg);
      }

      .card-section--compact .card-section__content {
        padding: var(--skill-spacing-md) var(--skill-spacing-lg);
      }

      .card-section--no-content {
        display: none;
      }

      /* Footer */
      .card-section__footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--skill-spacing-sm);
        padding: var(--skill-spacing-md) var(--skill-spacing-lg);
        border-top: 1px solid var(--skill-color-border);
        background-color: var(--skill-color-surface-elevated);
      }

      .card-section--borderless .card-section__footer {
        border-top: none;
      }

      /* Size variants */
      .card-section--sm .card-section__header,
      .card-section--sm .card-section__content,
      .card-section--sm .card-section__footer {
        padding: var(--skill-spacing-sm) var(--skill-spacing-md);
      }

      .card-section--lg .card-section__header,
      .card-section--lg .card-section__content,
      .card-section--lg .card-section__footer {
        padding: var(--skill-spacing-xl);
      }

      /* Status colors */
      .card-section--success .card-section__header {
        border-left: 4px solid var(--skill-color-success);
      }

      .card-section--warning .card-section__header {
        border-left: 4px solid var(--skill-color-warning);
      }

      .card-section--error .card-section__header {
        border-left: 4px solid var(--skill-color-error);
      }

      .card-section--info .card-section__header {
        border-left: 4px solid var(--skill-color-info);
      }

      /* Loading state */
      .card-section--loading {
        opacity: 0.7;
        pointer-events: none;
      }

      /* Disabled state */
      .card-section--disabled {
        opacity: 0.5;
        pointer-events: none;
      }

      /* Custom header slot styles */
      ::slotted([slot="header"]) {
        display: flex;
        align-items: center;
        gap: var(--skill-spacing-md);
        width: 100%;
      }

      /* Footer slot styles */
      ::slotted([slot="footer"]) {
        display: flex;
        align-items: center;
        gap: var(--skill-spacing-sm);
        width: 100%;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .card-section__header {
          padding: var(--skill-spacing-md);
          flex-direction: column;
          align-items: flex-start;
          gap: var(--skill-spacing-sm);
        }

        .card-section__content {
          padding: var(--skill-spacing-md);
        }

        .card-section__footer {
          padding: var(--skill-spacing-md);
          flex-direction: column-reverse;
          gap: var(--skill-spacing-md);
        }

        .card-section__footer ::slotted(skill-button) {
          width: 100%;
        }
      }
    `
  ];

  @property({ type: String })
  title = '';

  @property({ type: String })
  description = '';

  @property({ type: String })
  actionText = '';

  @property({ type: String, reflect: true })
  variant: 'default' | 'compact' | 'elevated' | 'borderless' = 'default';

  @property({ type: String, reflect: true })
  status: 'default' | 'success' | 'warning' | 'error' | 'info' = 'default';

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, reflect: true })
  expanded = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  collapsible = false;

  private hasHeaderSlot = false;
  private hasFooterSlot = false;
  private hasContent = false;

  protected firstUpdated() {
    this.updateSlotState();
  }

  protected updated() {
    this.updateSlotState();
  }

  private updateSlotState() {
    const headerSlot = this.shadowRoot?.querySelector('slot[name="header"]') as HTMLSlotElement;
    const footerSlot = this.shadowRoot?.querySelector('slot[name="footer"]') as HTMLSlotElement;
    const defaultSlot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;

    this.hasHeaderSlot = headerSlot?.assignedElements().length > 0;
    this.hasFooterSlot = footerSlot?.assignedElements().length > 0;
    this.hasContent = defaultSlot?.assignedElements().length > 0;
  }

  private get containerClasses() {
    return Object.fromEntries(Object.entries({
      'card-section': true,
      [`card-section--${this.variant}`]: this.variant !== 'default',
      [`card-section--${this.status}`]: this.status !== 'default',
      [`card-section--${this.size}`]: this.size !== 'md',
      'card-section--expanded': this.expanded,
      'card-section--loading': this.loading,
      'card-section--disabled': this.disabled,
      'card-section--no-content': !this.hasContent && !this.hasHeaderSlot,
    }).map(([key, value]) => [key, String(value)]));
  }

  private get headerClasses() {
    return Object.fromEntries(Object.entries({
      'card-section__header': true,
      'card-section__header--has-action': this.actionText || this.collapsible,
    }).map(([key, value]) => [key, String(value)]));
  }

  private handleActionClick() {
    if (this.collapsible) {
      this.expanded = !this.expanded;
    }

    this.dispatchEvent(new CustomEvent('action-click', {
      detail: { expanded: this.expanded },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const hasHeader = this.hasHeaderSlot || this.title || this.description;
    const shouldShowContent = this.expanded || !this.collapsible;

    return html`
      <div class="${styleMap(this.containerClasses)}">
        <!-- Header -->
        ${hasHeader ? html`
          <div class="${styleMap(this.headerClasses)}"
               @click=${this.handleActionClick}>
            <div class="card-section__header-content">
              <!-- Custom header slot or title/description -->
              ${this.hasHeaderSlot ? html`
                <slot name="header"></slot>
              ` : html`
                <div>
                  ${this.title ? html`<h3 class="card-section__title">${this.title}</h3>` : ''}
                  ${this.description ? html`<p class="card-section__description">${this.description}</p>` : ''}
                </div>
              `}
            </div>

            <!-- Action button or expand icon -->
            ${this.actionText || this.collapsible ? html`
              <div class="card-section__action">
                ${this.actionText ? html`${this.actionText}` : ''}
                ${this.collapsible ? html`
                  <svg class="card-section__action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                ` : ''}
              </div>
            ` : ''}
          </div>
        ` : ''}

        <!-- Content -->
        ${shouldShowContent && this.hasContent ? html`
          <div class="card-section__content">
            <slot></slot>
          </div>
        ` : ''}

        <!-- Footer -->
        ${this.hasFooterSlot ? html`
          <div class="card-section__footer">
            <slot name="footer"></slot>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skill-card-section': CardSection;
  }
}