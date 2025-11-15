import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../../styles/base';
import { menuItemStyles } from './skill-menu-item.styles';

/**
 * Skill Menu Item Component
 *
 * 简化的菜单项组件，专注于基础功能
 *
 * @slot icon - Left icon slot
 * @slot content - Main content slot
 * @slot suffix - Right side content (badge, shortcut, etc.)
 *
 * @csspart container - Main container
 * @csspart icon - Icon container
 * @csspart content - Content area
 * @csspart suffix - Right side content
 *
 * @cssprop --menu-item-height - Item height
 * @cssprop --menu-item-padding - Horizontal padding
 * @cssprop --menu-item-bg - Background color
 * @cssprop --menu-item-hover - Hover background color
 *
 * @fires skill-menu-item-click - When menu item is clicked
 *
 * @example
 * ```html
 * <!-- Basic menu item -->
 * <skill-menu-item value="home">
 *   <skill-icon slot="icon" name="home"></skill-icon>
 *   Home
 * </skill-menu-item>

 * <!-- With badge -->
 * <skill-menu-item value="notifications">
 *   <skill-icon slot="icon" name="bell"></skill-icon>
 *   Notifications
 *   <span slot="suffix">3</span>
 * </skill-menu-item>

 * <!-- Disabled -->
 * <skill-menu-item value="disabled" disabled>
 *   <skill-icon slot="icon" name="lock"></skill-icon>
 *   Disabled Item
 * </skill-menu-item>

 * <!-- Active/Selected -->
 * <skill-menu-item value="active" selected>
 *   <skill-icon slot="icon" name="check"></skill-icon>
 *   Active Item
 * </skill-menu-item>
 * ```
 */

@customElement('skill-menu-item')
export class SkillMenuItem extends LitElement {
  static styles = [
    baseStyles,
    menuItemStyles
  ];

  /**
   * Menu item value for selection
   */
  @property({ type: String, reflect: true })
  value?: string;

  /**
   * Whether the item is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the item is selected/active
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * HTML link href (makes item a link)
   */
  @property({ type: String, reflect: true })
  href?: string;

  /**
   * Link target
   */
  @property({ type: String, reflect: true })
  target?: string;

  /**
   * ARIA label for accessibility
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  private _handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }

    // Fire click event for parent menu to handle
    this.dispatchEvent(
      new CustomEvent('skill-menu-item-click', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
          href: this.href,
          originalEvent: e,
        },
      })
    );

    // Handle navigation if href provided
    if (this.href) {
      if (this.target === '_blank') {
        window.open(this.href, '_blank');
      } else {
        window.location.href = this.href;
      }
    }
  }

  render() {
    const hasIcon = this.querySelector('[slot="icon"]');
    const hasSuffix = this.querySelector('[slot="suffix"]') || this.querySelector('[slot="badge"]');

    return html`
      <div
        part="container"
        class="menu-item"
        role="menuitem"
        aria-label="${this.ariaLabel || (this.textContent?.trim() || '')}"
        aria-disabled="${this.disabled ? 'true' : 'false'}"
        aria-selected="${this.selected ? 'true' : 'false'}"
        tabindex="${this.disabled ? '-1' : '0'}"
        @click=${this._handleClick}
        @keydown=${(e: KeyboardEvent) => {
          if ((e.key === 'Enter' || e.key === ' ') && !this.disabled) {
            e.preventDefault();
            this._handleClick(e);
          }
        }}
      >
        ${hasIcon ? html`
          <div part="icon" class="icon-container">
            <slot name="icon"></slot>
          </div>
        ` : ''}

        <div part="content" class="content">
          <slot></slot>
        </div>

        ${hasSuffix ? html`
          <div part="suffix" class="suffix">
            <slot name="suffix"></slot>
            <slot name="badge"></slot>
          </div>
        ` : ''}
      </div>
    `;
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-menu-item': SkillMenuItem;
  }
}