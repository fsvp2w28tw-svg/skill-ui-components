import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { baseStyles } from '../../../styles/base';

/**
 * ButtonGroup molecule component that groups related buttons together.
 *
 * @element skill-button-group
 *
 * @example
 * ```html
 * <!-- Basic horizontal button group -->
 * <skill-button-group>
 *   <skill-button>Cancel</skill-button>
 *   <skill-button variant="primary">Save</skill-button>
 * </skill-button-group>
 *
 * <!-- Vertical button group -->
 * <skill-button-group orientation="vertical">
 *   <skill-button>Option 1</skill-button>
 *   <skill-button>Option 2</skill-button>
 *   <skill-button>Option 3</skill-button>
 * </skill-button-group>
 *
 * <!-- Segmented control style -->
 * <skill-button-group variant="segmented">
 *   <skill-button variant="ghost">Day</skill-button>
 *   <skill-button variant="ghost">Week</skill-button>
 *   <skill-button variant="ghost">Month</skill-button>
 * </skill-button-group>
 *
 * <!-- Compact button group -->
 * <skill-button-group size="sm" spacing="compact">
 *   <skill-button size="sm">Edit</skill-button>
 *   <skill-button size="sm" variant="ghost">Delete</skill-button>
 * </skill-button-group>
 * ```
 */
@customElement('skill-button-group')
export class ButtonGroup extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
      }

      .button-group {
        display: flex;
        align-items: center;
      }

      .button-group--horizontal {
        flex-direction: row;
      }

      .button-group--vertical {
        flex-direction: column;
      }

      /* Spacing variants */
      .button-group--default .button-group__item + .button-group__item {
        margin-left: var(--skill-spacing-sm);
      }

      .button-group--vertical.button-group--default .button-group__item + .button-group__item {
        margin-left: 0;
        margin-top: var(--skill-spacing-sm);
      }

      .button-group--compact .button-group__item + .button-group__item {
        margin-left: var(--skill-spacing-xs);
      }

      .button-group--vertical.button-group--compact .button-group__item + .button-group__item {
        margin-left: 0;
        margin-top: var(--skill-spacing-xs);
      }

      .button-group--none .button-group__item + .button-group__item {
        margin-left: 0;
      }

      .button-group--vertical.button-group--none .button-group__item + .button-group__item {
        margin-top: 0;
      }

      /* Segmented variant */
      .button-group--segmented {
        display: inline-flex;
        background-color: var(--skill-color-surface);
        border: 1px solid var(--skill-color-border);
        border-radius: var(--skill-radius-md);
        padding: 2px;
      }

      .button-group--segmented .button-group__item {
        margin: 0 !important;
        border-radius: var(--skill-radius-sm);
      }

      .button-group--segmented .button-group__item:not(:last-child) {
        margin-right: 1px !important;
      }

      .button-group--segmented ::slotted(skill-button) {
        border-radius: var(--skill-radius-sm);
        border: none;
        position: relative;
        z-index: 1;
      }

      .button-group--segmented ::slotted(skill-button[variant="primary"]) {
        background-color: var(--skill-color-primary);
        color: var(--skill-color-primary-text);
        z-index: 2;
      }

      .button-group--segmented ::slotted(skill-button:hover),
      .button-group--segmented ::slotted(skill-button:focus) {
        z-index: 3;
      }

      /* Segmented vertical */
      .button-group--segmented.button-group--vertical {
        padding: 2px;
      }

      .button-group--segmented.button-group--vertical .button-group__item:not(:last-child) {
        margin-right: 0 !important;
        margin-bottom: 1px !important;
      }

      /* Attached variant */
      .button-group--attached .button-group__item {
        margin: 0 !important;
        border-radius: 0;
      }

      .button-group--attached .button-group__item:first-child ::slotted(skill-button) {
        border-top-left-radius: var(--skill-radius-md);
        border-bottom-left-radius: var(--skill-radius-md);
      }

      .button-group--attached .button-group__item:last-child ::slotted(skill-button) {
        border-top-right-radius: var(--skill-radius-md);
        border-bottom-right-radius: var(--skill-radius-md);
      }

      .button-group--attached.button-group--vertical .button-group__item:first-child ::slotted(skill-button) {
        border-top-left-radius: var(--skill-radius-md);
        border-top-right-radius: var(--skill-radius-md);
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }

      .button-group--attached.button-group--vertical .button-group__item:last-child ::slotted(skill-button) {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: var(--skill-radius-md);
        border-bottom-right-radius: var(--skill-radius-md);
      }

      .button-group--attached ::slotted(skill-button) {
        border-radius: 0;
      }

      .button-group--attached ::slotted(skill-button:not(:last-child)) {
        border-right: none;
      }

      .button-group--attached.button-group--vertical ::slotted(skill-button:not(:last-child)) {
        border-right: inherit;
        border-bottom: none;
      }

      /* Size variants */
      .button-group--sm {
        font-size: var(--skill-font-size-sm);
      }

      .button-group--lg {
        font-size: var(--skill-font-size-lg);
      }

      /* Equal width for horizontal groups */
      .button-group--equal-width {
        width: 100%;
      }

      .button-group--equal-width.button-group--horizontal .button-group__item {
        flex: 1;
      }

      .button-group--equal-width.button-group--horizontal ::slotted(skill-button) {
        width: 100%;
      }

      /* Full width for vertical groups */
      .button-group--full-width {
        width: 100%;
      }

      .button-group--full-width ::slotted(skill-button) {
        width: 100%;
        justify-content: center;
      }

      /* Alignment */
      .button-group--horizontal.button-group--left {
        justify-content: flex-start;
      }

      .button-group--horizontal.button-group--center {
        justify-content: center;
      }

      .button-group--horizontal.button-group--right {
        justify-content: flex-end;
      }

      .button-group--vertical.button-group--top {
        align-items: flex-start;
      }

      .button-group--vertical.button-group--middle {
        align-items: center;
      }

      .button-group--vertical.button-group--bottom {
        align-items: flex-end;
      }
    `
  ];

  @property({ type: String, reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ type: String, reflect: true })
  variant: 'default' | 'segmented' | 'attached' = 'default';

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: String, reflect: true })
  spacing: 'default' | 'compact' | 'none' = 'default';

  @property({ type: String, reflect: true })
  align: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom' = 'left';

  @property({ type: Boolean, reflect: true })
  equalWidth = false;

  @property({ type: Boolean, reflect: true })
  fullWidth = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private get containerClasses() {
    return Object.fromEntries(Object.entries({
      'button-group': true,
      [`button-group--${this.orientation}`]: true,
      [`button-group--${this.variant}`]: this.variant !== 'default',
      [`button-group--${this.size}`]: this.size !== 'md',
      [`button-group--${this.spacing}`]: this.spacing !== 'default',
      [`button-group--${this.align}`]: true,
      'button-group--equal-width': this.equalWidth,
      'button-group--full-width': this.fullWidth,
    }).map(([key, value]) => [key, String(value)]));
  }

  render() {
    return html`
      <div class="${styleMap(this.containerClasses)}">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeAttribute('role');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skill-button-group': ButtonGroup;
  }
}