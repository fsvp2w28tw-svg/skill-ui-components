import { LitElement, html, type PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { dividerStyles } from './skill-divider.styles';
import { baseStyles } from '../../../styles/base';

/**
 * Skill Divider Component - 分割线组件
 *
 * @slot - Divider content (text or custom elements)
 *
 * @csspart divider - The divider container
 * @csspart line - The divider line
 * @csspart content - The divider content area
 *
 * @cssprop --divider-color - Divider line color
 * @cssprop --divider-thickness - Line thickness
 * @cssprop --divider-spacing - Margin around divider
 *
 * @fires skill-divider-click - Dispatched when divider is clicked (if focusable)
 *
 * @example
 * ```html
 * <!-- 基础水平分割线 -->
 * <skill-divider></skill-divider>
 *
 * <!-- 带文字的分割线 -->
 * <skill-divider>或者</skill-divider>
 *
 * <!-- 垂直分割线 -->
 * <skill-divider orientation="vertical"></skill-divider>
 *
 * <!-- 虚线分割线 -->
 * <skill-divider variant="dashed">分割线</skill-divider>
 *
 * <!-- 彩色分割线 -->
 * <skill-divider color="primary">重要内容</skill-divider>
 *
 * <!-- 垂直虚线分割线 -->
 * <skill-divider orientation="vertical" variant="dotted"></skill-divider>
 *
 * <!-- 可点击的分割线 -->
 * <skill-divider focusable>点击我</skill-divider>
 *
 * <!-- 动画效果分割线 -->
 * <skill-divider animated>动态分割线</skill-divider>
 *
 * <!-- 插入模式 -->
 * <p>文本内容<skill-divider insert></skill-divider>更多文本</p>
 * ```
 */
@customElement('skill-divider')
export class SkillDivider extends LitElement {
  static styles = [baseStyles, dividerStyles];

  /**
   * Orientation of the divider
   * @type {'horizontal' | 'vertical'}
   */
  @property({ type: String, reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Visual style variant
   * @type {'solid' | 'dashed' | 'dotted' | 'default'}
   */
  @property({ type: String, reflect: true })
  variant: 'solid' | 'dashed' | 'dotted' | 'default' = 'default';

  /**
   * Color theme of the divider
   * @type {'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'}
   */
  @property({ type: String, reflect: true })
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' = 'default';

  /**
   * Position of content when present
   * @type {'center' | 'left' | 'right'}
   */
  @property({ type: String, reflect: true })
  contentPosition: 'center' | 'left' | 'right' = 'center';

  /**
   * Size of the divider (affects spacing)
   * @type {'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Whether the divider is focusable/clickable
   */
  @property({ type: Boolean, reflect: true })
  focusable = false;

  /**
   * Whether to show shine animation
   */
  @property({ type: Boolean, reflect: true })
  animated = false;

  /**
   * Whether the divider is in insert mode (inline display)
   */
  @property({ type: Boolean, reflect: true })
  insert = false;

  /**
   * Whether to enable responsive behavior
   */
  @property({ type: Boolean, reflect: true })
  responsive = false;

  /**
   * Custom thickness for the divider line
   */
  @property({ type: String, reflect: true })
  thickness?: string;

  /**
   * ARIA label for accessibility
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  connectedCallback() {
    super.connectedCallback();

    // Set up ARIA attributes
    if (this.focusable && !this.ariaLabel) {
      this.ariaLabel = this._hasContent() ? 'Divider: ' + this.textContent.trim() : 'Divider';
    }
  }

  protected willUpdate(changedProperties: PropertyValueMap<this>) {
    if (changedProperties.has('thickness') && this.thickness) {
      this.style.setProperty('--divider-thickness', this.thickness);
    }
  }

  render() {
    const hasContent = this._hasContent();

    return html`
      <div
        part="divider"
        class="skill-divider"
        role="${this.focusable ? 'button' : 'separator'}"
        aria-label="${this.ariaLabel || ''}"
        aria-orientation="${this.orientation}"
        tabindex="${this.focusable ? '0' : '-1'}"
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        ${hasContent && this.contentPosition !== 'right' ? this._renderLine() : ''}
        ${hasContent ? this._renderContent() : this._renderLine()}
        ${hasContent && this.contentPosition === 'right' ? this._renderLine() : ''}
      </div>
    `;
  }

  private _renderLine() {
    return html`<div part="line" class="skill-divider__line"></div>`;
  }

  private _renderContent() {
    return html`
      <div part="content" class="skill-divider__content">
        <slot></slot>
      </div>
    `;
  }

  private _hasContent(): boolean {
    return this.slotHasContent('default');
  }

  private slotHasContent(slotName: string): boolean {
    const slot = this.shadowRoot?.querySelector(`slot[name="${slotName}"]`) as HTMLSlotElement;
    if (slot) {
      const nodes = slot.assignedNodes({ flatten: true });
      return nodes.some(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent?.trim() !== '';
        }
        return node.nodeType === Node.ELEMENT_NODE;
      });
    }

    // Check default slot
    const defaultSlot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (defaultSlot) {
      const nodes = defaultSlot.assignedNodes({ flatten: true });
      return nodes.some(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent?.trim() !== '';
        }
        return node.nodeType === Node.ELEMENT_NODE;
      });
    }

    return false;
  }

  private _handleClick(e: Event) {
    if (this.focusable) {
      e.preventDefault();
      e.stopPropagation();

      this.dispatchEvent(
        new CustomEvent('skill-divider-click', {
          bubbles: true,
          composed: true,
          detail: {
            originalEvent: e,
            orientation: this.orientation,
            hasContent: this.hasContent,
          },
        })
      );
    }
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.focusable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      this._handleClick(e);
    }
  }

  /**
   * Focus the divider if focusable
   */
  public focus() {
    if (this.focusable) {
      const element = this.shadowRoot?.querySelector('.skill-divider') as HTMLElement;
      element?.focus();
    }
  }

  /**
   * Blur the divider if focusable
   */
  public blur() {
    if (this.focusable) {
      const element = this.shadowRoot?.querySelector('.skill-divider') as HTMLElement;
      element?.blur();
    }
  }

  /**
   * Check if divider has content
   */
  public get hasContent(): boolean {
    return this._hasContent();
  }

  /**
   * Get current orientation
   */
  public get currentOrientation(): string {
    return this.orientation;
  }

  /**
   * Get current variant
   */
  public get currentVariant(): string {
    return this.variant;
  }

  /**
   * Toggle orientation
   */
  public toggleOrientation() {
    this.orientation = this.orientation === 'horizontal' ? 'vertical' : 'horizontal';
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-divider': SkillDivider;
  }
}