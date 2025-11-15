import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cardStyles } from './skill-card.styles';
import { baseStyles } from '../../../styles/base';

/**
 * Skill Card Component
 *
 * @slot - Default card content
 * @slot header - Card header content
 * @slot body - Card body content
 * @slot footer - Card footer content
 *
 * @csspart card - The card element
 * @csspart content - The content wrapper
 *
 * @fires skill-click - Dispatched when hoverable card is clicked
 *
 * @example
 * ```html
 * <!-- Simple card -->
 * <skill-card>
 *   <p>Card content</p>
 * </skill-card>
 *
 * <!-- Card with header, body, and footer -->
 * <skill-card>
 *   <div slot="header">
 *     <h3>Card Title</h3>
 *   </div>
 *   <div slot="body">
 *     <p>Card content goes here</p>
 *   </div>
 *   <div slot="footer">
 *     <button>Action</button>
 *   </div>
 * </skill-card>
 *
 * <!-- Hoverable card -->
 * <skill-card hoverable padding="md">
 *   <p>Click me!</p>
 * </skill-card>
 * ```
 */
@customElement('skill-card')
export class SkillCard extends LitElement {
  static styles = [baseStyles, cardStyles];

  /**
   * Makes card interactive with hover effects
   */
  @property({ type: Boolean, reflect: true })
  hoverable = false;

  /**
   * Card padding size
   */
  @property({ type: String })
  padding: 'none' | 'sm' | 'md' | 'lg' = 'lg';

  /**
   * Card variant
   */
  @property({ type: String })
  variant: 'default' | 'outlined' | 'elevated' | 'flat' = 'default';

  render() {
    const classes = [
      'skill-card',
      this.hoverable ? 'skill-card--hoverable' : '',
      `skill-card--padding-${this.padding}`,
      this.variant !== 'default' ? `skill-card--${this.variant}` : ''
    ].filter(Boolean).join(' ');

    return html`
      <div
        part="card"
        class="${classes}"
        @click=${this._handleClick}
      >
        <slot name="header"></slot>
        <slot name="body"></slot>
        <div part="content" class="skill-card__content">
          <slot></slot>
        </div>
        <slot name="footer"></slot>
      </div>
    `;
  }

  private _handleClick(e: Event) {
    if (this.hoverable) {
      this.dispatchEvent(
        new CustomEvent('skill-click', {
          bubbles: true,
          composed: true,
          detail: { originalEvent: e },
        })
      );
    }
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-card': SkillCard;
  }
}
