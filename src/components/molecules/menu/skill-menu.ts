import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { menuStyles } from './skill-menu.styles';
import { baseStyles } from '../../../styles/base';

/**
 * Skill Menu Component - 菜单容器组件
 *
 * 简化的菜单容器，专注于布局和协调
 *
 * @slot - Default slot for menu items
 * @slot header - Menu header content
 * @slot footer - Menu footer content
 *
 * @csspart menu - The menu container
 * @csspart menu-list - The menu list container
 * @csspart header - Menu header
 * @csspart footer - Menu footer
 *
 * @cssprop --menu-bg - Background color
 * @cssprop --menu-border-color - Border color
 * @cssprop --menu-item-padding - Item padding
 *
 * @fires skill-menu-change - Dispatched when selection changes
 *
 * @example
 * ```html
 * <!-- 基础菜单 -->
 * <skill-menu>
 *   <skill-menu-item value="home">Home</skill-menu-item>
 *   <skill-menu-item value="profile">Profile</skill-menu-item>
 *   <skill-menu-item value="settings" selected>Settings</skill-menu-item>
 * </skill-menu>
 *
 * <!-- 带头部和底部 -->
 * <skill-menu>
 *   <div slot="header">Menu Header</div>
 *   <skill-menu-item value="item1">Item 1</skill-menu-item>
 *   <skill-menu-item value="item2">Item 2</skill-menu-item>
 *   <div slot="footer">Menu Footer</div>
 * </skill-menu>
 * ```
 */
@customElement('skill-menu')
export class SkillMenu extends LitElement {
  static styles = [baseStyles, menuStyles];

  /**
   * Menu orientation
   * @type {'vertical' | 'horizontal'}
   */
  @property({ type: String, reflect: true })
  orientation: 'vertical' | 'horizontal' = 'vertical';

  /**
   * Whether menu allows selection
   */
  @property({ type: Boolean, reflect: true })
  selectable = false;

  /**
   * Whether menu allows multiple selection
   */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /**
   * Currently selected value(s)
   */
  @property({ type: [String, Array] })
  value?: string | string[];

  /**
   * ARIA label for accessibility
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel = 'Menu';

  private _handleItemClick(e: CustomEvent) {
    if (!this.selectable) return;

    const item = e.target as any;
    const itemValue = item.value;

    if (this.multiple) {
      const currentValues = Array.isArray(this.value) ? this.value : [];
      const newValues = currentValues.includes(itemValue)
        ? currentValues.filter(v => v !== itemValue)
        : [...currentValues, itemValue];
      this.value = newValues;
    } else {
      this.value = itemValue;
    }

    this.dispatchEvent(
      new CustomEvent('skill-menu-change', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
          item: item,
          multiple: this.multiple,
        },
      })
    );
  }

  render(): TemplateResult {
    return html`
      <div
        part="menu"
        class="skill-menu"
        role="menu"
        aria-label="${this.ariaLabel}"
        @skill-menu-item-click=${this._handleItemClick}
      >
        <slot name="header" part="header" class="skill-menu__header"></slot>

        <div part="menu-list" class="skill-menu__list">
          <slot></slot>
        </div>

        <slot name="footer" part="footer" class="skill-menu__footer"></slot>
      </div>
    `;
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-menu': SkillMenu;
  }
}