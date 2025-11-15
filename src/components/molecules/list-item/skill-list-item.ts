import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { baseStyles } from '../../../styles/base';
import { listItemStyles } from './skill-list-item.styles';

/**
 * ListItem molecule component that combines icon, content, badge, and actions.
 *
 * @element skill-list-item
 *
 * @example
 * ```html
 * <!-- Basic list item -->
 * <skill-list-item title="John Doe" description="Software Engineer">
 *   <skill-avatar slot="start" name="John Doe"></skill-avatar>
 *   <skill-button slot="end" variant="ghost" size="sm">Edit</skill-button>
 * </skill-list-item>
 *
 * <!-- With badge and actions -->
 * <skill-list-item
 *   title="New Project"
 *   description="Created 2 hours ago"
 *   badge="New"
 *   badge-variant="success">
 *   <skill-icon slot="start" name="folder"></skill-icon>
 *   <skill-button slot="end" variant="ghost" size="sm">Open</skill-button>
 * </skill-list-item>
 *
 * <!-- Clickable list item -->
 * <skill-list-item
 *   title="Settings"
 *   description="Manage your preferences"
 *   clickable
 *   @click="${this.handleItemClick}">
 *   <skill-icon slot="start" name="settings"></skill-icon>
 *   <skill-icon slot="end" name="chevron-right"></skill-icon>
 * </skill-list-item>
 *
 * <!-- Compact variant -->
 * <skill-list-item
 *   title="Item"
 *   variant="compact"
 *   clickable>
 *   <skill-icon slot="start" name="file"></skill-icon>
 *   <skill-icon slot="end" name="more-vert"></skill-icon>
 * </skill-list-item>
 *
 * <!-- Multi-line content -->
 * <skill-list-item
 *   title="Document.pdf"
 *   description="Modified yesterday at 3:45 PM"
 *   subtitle="2.4 MB • PDF">
 *   <skill-icon slot="start" name="picture-as-pdf"></skill-icon>
 *   <skill-button slot="end" variant="ghost" size="sm">Download</skill-button>
 * </skill-list-item>
 * ```
 */
@customElement('skill-list-item')
export class ListItem extends LitElement {
  static styles = [
    baseStyles,
    listItemStyles
  ];

  @property({ type: String })
  title = '';

  @property({ type: String })
  description = '';

  @property({ type: String })
  subtitle = '';

  @property({ type: String })
  badge = '';

  @property({ type: String, reflect: true })
  badgeVariant: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' = 'default';

  @property({ type: String, reflect: true })
  status: 'default' | 'online' | 'offline' | 'busy' | 'away' = 'default';

  @property({ type: String, reflect: true })
  variant: 'default' | 'compact' | 'relaxed' = 'default';

  @property({ type: Boolean, reflect: true })
  clickable = false;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  draggable = false;

  @property({ type: Boolean, reflect: true })
  showDivider = false;

  private hasStartSlot = false;
  private hasEndSlot = false;

  protected firstUpdated() {
    this.updateSlotState();
  }

  protected updated() {
    this.updateSlotState();
  }

  private updateSlotState() {
    const startSlot = this.shadowRoot?.querySelector('slot[name="start"]') as HTMLSlotElement;
    const endSlot = this.shadowRoot?.querySelector('slot[name="end"]') as HTMLSlotElement;

    this.hasStartSlot = startSlot?.assignedElements().length > 0;
    this.hasEndSlot = endSlot?.assignedElements().length > 0;
  }

  private get containerClasses() {
    return Object.fromEntries(Object.entries({
      'list-item': true,
      [`list-item--${this.variant}`]: this.variant !== 'default',
      'list-item--clickable': this.clickable,
      'list-item--selected': this.selected,
      'list-item--disabled': this.disabled,
      'list-item--draggable': this.draggable,
    }).map(([key, value]) => [key, String(value)]));
  }

  private get badgeClasses() {
    return Object.fromEntries(Object.entries({
      'list-item__badge': true,
      [`list-item__badge--${this.badgeVariant}`]: this.badgeVariant !== 'default',
    }).map(([key, value]) => [key, String(value)]));
  }

  private get statusClasses() {
    return Object.fromEntries(Object.entries({
      'list-item__status': true,
      [`list-item__status--${this.status}`]: this.status !== 'default',
    }).map(([key, value]) => [key, String(value)]));
  }

  private handleClick(_event: Event) {
    if (this.clickable) {
      this.dispatchEvent(new CustomEvent('item-click', {
        detail: {
          title: this.title,
          description: this.description,
          subtitle: this.subtitle,
        },
        bubbles: true,
        composed: true,
      }));
    }
  }

  render() {
    return html`
      <div
        class="${styleMap(this.containerClasses)}"
        tabindex="${this.clickable ? '0' : '-1'}"
        role="${this.clickable ? 'button' : 'listitem'}"
        aria-selected="${this.selected}"
        aria-disabled="${this.disabled}"
        @click="${this.handleClick}"
        @keydown="${(e: KeyboardEvent) => e.key === 'Enter' && this.handleClick(e)}"
      >
        <!-- Start slot (icon, avatar, etc.) -->
        ${this.hasStartSlot ? html`
          <div class="list-item__start">
            <slot name="start"></slot>
          </div>
        ` : ''}

        <!-- Status indicator -->
        ${this.status !== 'default' ? html`
          <div class="list-item__start">
            <div class="${styleMap(this.statusClasses)}"></div>
          </div>
        ` : ''}

        <!-- Main content -->
        <div class="list-item__content">
          ${this.title ? html`<div class="list-item__title">${this.title}</div>` : ''}
          ${this.description ? html`<div class="list-item__description">${this.description}</div>` : ''}
          ${this.subtitle ? html`<div class="list-item__subtitle">${this.subtitle}</div>` : ''}
        </div>

        <!-- Badge -->
        ${this.badge ? html`
          <div class="list-item__end">
            <div class="${styleMap(this.badgeClasses)}">${this.badge}</div>
          </div>
        ` : ''}

        <!-- End slot (actions, icons, etc.) -->
        ${this.hasEndSlot ? html`
          <div class="list-item__end">
            <slot name="end"></slot>
          </div>
        ` : ''}
      </div>

      <!-- Divider -->
      ${this.showDivider ? html`<div class="list-item__divider"></div>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skill-list-item': ListItem;
  }
}