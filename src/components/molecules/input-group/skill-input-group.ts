import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../../styles/base';
import { inputGroupStyles } from './skill-input-group.styles';

/**
 * InputGroup molecule component that combines input with prefix/suffix elements.
 *
 * @element skill-input-group
 *
 * @example
 * ```html
 * <!-- Basic input with prefix -->
 * <skill-input-group>
 *   <span slot="prefix">$</span>
 *   <skill-input placeholder="Amount"></skill-input>
 * </skill-input-group>
 *
 * <!-- Input with suffix button -->
 * <skill-input-group>
 *   <skill-input placeholder="Search..."></skill-input>
 *   <skill-button slot="suffix" variant="ghost">Search</skill-button>
 * </skill-input-group>
 *
 * <!-- Input with both prefix and suffix -->
 * <skill-input-group>
 *   <span slot="prefix">🔍</span>
 *   <skill-input placeholder="Search"></skill-input>
 *   <skill-button slot="suffix" variant="ghost" size="sm">Clear</skill-button>
 * </skill-input-group>
 *
 * <!-- Compact variant -->
 * <skill-input-group variant="compact">
 *   <span slot="prefix">From:</span>
 *   <skill-input placeholder="Start date"></skill-input>
 * </skill-input-group>
 * ```
 */
@customElement('skill-input-group')
export class InputGroup extends LitElement {
  static styles = [
    baseStyles,
    inputGroupStyles
  ];

  @property({ type: String, reflect: true })
  variant: 'default' | 'compact' = 'default';

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  private get containerClasses() {
    return {
      'input-group': true,
      [`input-group--${this.variant}`]: this.variant !== 'default',
      [`input-group--${this.size}`]: this.size !== 'md',
      'input-group--disabled': this.disabled,
      'input-group--error': this.error,
    };
  }

  private hasPrefix = false;
  private hasSuffix = false;

  protected firstUpdated() {
    this.updateSlotState();
  }

  protected updated() {
    this.updateSlotState();
  }

  private updateSlotState() {
    const prefixSlot = this.shadowRoot?.querySelector('slot[name="prefix"]') as HTMLSlotElement;
    const suffixSlot = this.shadowRoot?.querySelector('slot[name="suffix"]') as HTMLSlotElement;

    this.hasPrefix = prefixSlot?.assignedElements().length > 0;
    this.hasSuffix = suffixSlot?.assignedElements().length > 0;
  }

  private getModifierClasses() {
    if (this.hasPrefix && this.hasSuffix) {
      return 'input-group--both';
    } else if (this.hasPrefix) {
      return 'input-group--prefix-only';
    } else if (this.hasSuffix) {
      return 'input-group--suffix-only';
    }
    return '';
  }

  render() {
    const finalClasses = {
      ...this.containerClasses,
      [this.getModifierClasses()]: true
    };

    return html`
      <div class="${classMap(finalClasses)}">
        <!-- Prefix Slot -->
        <slot name="prefix" class="input-group__prefix"></slot>

        <!-- Input/Control Slot -->
        <slot></slot>

        <!-- Suffix Slot -->
        <slot name="suffix" class="input-group__suffix"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skill-input-group': InputGroup;
  }
}