import { LitElement, html, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { accordionStyles } from './skill-accordion.styles';
import { baseStyles } from '../../../styles/base';
import type {
  AccordionIconPosition,
  AccordionExpandMode,
  AccordionSize,
  AccordionEventDetail
} from '../../../types';
import {
  createErrorHandler,
  SkillValidator,
  type SkillErrorOptions
} from '../../../utils/error-handler';

/**
 * Skill Accordion Component - 手风琴折叠面板
 *
 * @slot - Accordion items (skill-accordion-item)
 *
 * @csspart accordion - The accordion container
 * @csspart item - The accordion item
 * @csspart header - The accordion header
 * @csspart content - The accordion content
 * @csspart arrow - The collapse arrow
 *
 * @cssprop --skill-accordion-bg - Accordion background color
 * @cssprop --skill-accordion-border-radius - Accordion border radius
 * @cssprop --skill-accordion-header-height - Header height
 *
 * @fires skill-collapse - Dispatched when an item is collapsed/expanded
 *
 * @example
 * ```html
 * <skill-accordion expand-mode="multiple">
 *   <skill-accordion-item key="1" title="Section 1" active>
 *     Content for section 1
 *   </skill-accordion-item>
 *   <skill-accordion-item key="2" title="Section 2">
 *     Content for section 2
 *   </skill-accordion-item>
 * </skill-accordion>
 * ```
 */
@customElement('skill-accordion')
export class SkillAccordion extends LitElement {
  static styles = [baseStyles, accordionStyles];

  /**
   * Whether to show borders between items
   */
  @property({ type: Boolean, reflect: true })
  bordered = true;

  /**
   * Whether to render accordion without background or border
   */
  @property({ type: Boolean, reflect: true })
  ghost = false;

  /**
   * Size of the accordion
   */
  @property({ type: String, reflect: true })
  size?: AccordionSize = 'md';

  /**
   * Expand mode: single (only one item open) or multiple (multiple items open)
   */
  @property({ type: String, reflect: true, attribute: 'expand-mode' })
  expandMode: AccordionExpandMode = 'single';

  /**
   * Position of the expand icon
   */
  @property({ type: String, reflect: true, attribute: 'icon-position' })
  iconPosition: AccordionIconPosition = 'left';

  /**
   * Default active keys
   */
  @property({ type: Array, reflect: false, attribute: 'default-active-keys' })
  defaultActiveKeys: string[] = [];

  /**
   * Controlled active keys
   */
  @property({ type: Array, reflect: false, attribute: 'active-keys' })
  activeKeys?: string[];

  /**
   * Whether to show arrow icon
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-arrow' })
  showArrow = true;

  /**
   * Whether to destroy inactive panel content
   */
  @property({ type: Boolean, reflect: true, attribute: 'destroy-inactive-panel' })
  destroyInactivePanel = false;

  @state()
  private _activeKeys: string[] = [];

  // @query('slot')
  // private _slot!: HTMLSlotElement; // eslint-disable-line @typescript-eslint/no-unused-vars

  private _mutationObserver?: MutationObserver;

  connectedCallback() {
    super.connectedCallback();
    this._setupMutationObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
    }
  }

  protected firstUpdated() {
    // Initialize active keys
    this._activeKeys = this.activeKeys || [...this.defaultActiveKeys];
    this._updateItemsState();
  }

  protected update(changedProperties: PropertyValueMap<this>) {
    super.update(changedProperties);

    if (changedProperties.has('activeKeys')) {
      this._activeKeys = this.activeKeys ? [...this.activeKeys] : [...this._activeKeys];
      this._updateItemsState();
    }

    if (changedProperties.has('expandMode') && this.expandMode === 'single') {
      // In single mode, only keep the first active key
      if (this._activeKeys.length > 1) {
        this._activeKeys = [this._activeKeys[0]];
        this._updateItemsState();
        this._dispatchCollapse();
      }
    }
  }

  private _setupMutationObserver() {
    this._mutationObserver = new MutationObserver(() => {
      this._updateItemsState();
    });

    this._mutationObserver.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['key', 'active', 'disabled']
    });
  }

  private _getItems(): SkillAccordionItem[] {
    const children = Array.from(this.children);
    return children.filter(child => child instanceof SkillAccordionItem) as SkillAccordionItem[];
  }

  private _updateItemsState() {
    const items = this._getItems();
    items.forEach(item => {
      const key = item.key || this._generateKey(item);
      item.key = key;
      const isActive = this._activeKeys.includes(key);
      item.active = isActive;
    });
  }

  private _generateKey(_item: SkillAccordionItem): string { // eslint-disable-line @typescript-eslint/no-unused-vars
    return `skill-accordion-item-${Math.random().toString(36).substr(2, 9)}`;
  }

  private _handleItemChange = (event: CustomEvent<AccordionEventDetail>) => {
    const { key, active } = event.detail;

    if (this.expandMode === 'single') {
      // Single mode: replace active keys
      this._activeKeys = active ? [key] : [];
    } else {
      // Multiple mode: add or remove from active keys
      if (active) {
        if (!this._activeKeys.includes(key)) {
          this._activeKeys = [...this._activeKeys, key];
        }
      } else {
        this._activeKeys = this._activeKeys.filter(k => k !== key);
      }
    }

    // Update controlled state
    if (this.activeKeys !== undefined) {
      this.activeKeys = [...this._activeKeys];
    }

    this._updateItemsState();
    this._dispatchCollapse();
  };

  private _dispatchCollapse() {
    this.dispatchEvent(new CustomEvent('skill-collapse', {
      bubbles: true,
      composed: true,
      detail: {
        activeKeys: [...this._activeKeys]
      }
    }));
  }

  private _getAccordionClasses() {
    const classes = ['skill-accordion'];

    if (this.bordered) {
      classes.push('skill-accordion--bordered');
    }

    if (this.ghost) {
      classes.push('skill-accordion--ghost');
    }

    if (this.size) {
      classes.push(`skill-accordion--${this.size}`);
    }

    if (this.iconPosition) {
      classes.push(`skill-accordion--icon-${this.iconPosition}`);
    }

    return classes.join(' ');
  }

  render() {
    return html`
      <div
        part="accordion"
        class="${this._getAccordionClasses()}"
        @skill-item-change=${this._handleItemChange}
      >
        <slot></slot>
      </div>
    `;
  }

  /**
   * Get active keys
   */
  public getActiveKeys(): string[] {
    return [...this._activeKeys];
  }

  /**
   * Set active keys programmatically
   */
  public setActiveKeys(keys: string[]) {
    this._activeKeys = [...keys];

    if (this.expandMode === 'single') {
      this._activeKeys = this._activeKeys.length > 0 ? [this._activeKeys[0]] : [];
    }

    if (this.activeKeys !== undefined) {
      this.activeKeys = [...this._activeKeys];
    }

    this._updateItemsState();
    this._dispatchCollapse();
  }

  /**
   * Expand all items (only works in multiple mode)
   */
  public expandAll() {
    if (this.expandMode === 'multiple') {
      const items = this._getItems();
      const keys = items.map(item => item.key).filter(Boolean) as string[];
      this.setActiveKeys(keys);
    }
  }

  /**
   * Collapse all items
   */
  public collapseAll() {
    this.setActiveKeys([]);
  }

  /**
   * Get accordion configuration
   */
  public getAccordionInfo() {
    return {
      bordered: this.bordered,
      ghost: this.ghost,
      size: this.size,
      expandMode: this.expandMode,
      iconPosition: this.iconPosition,
      showArrow: this.showArrow,
      activeKeys: this.getActiveKeys(),
      itemCount: this._getItems().length
    };
  }
}

/**
 * Skill Accordion Item Component - 手风琴项目
 *
 * @slot title - Custom title content (overrides title property)
 * @slot extra - Extra content to display in header
 * @slot - Panel content
 *
 * @csspart item - The accordion item
 * @csspart header - The accordion header
 * @csspart content - The accordion content
 * @csspart arrow - The collapse arrow
 *
 * @cssprop --skill-accordion-item-bg - Item background color
 *
 * @fires skill-item-change - Dispatched when item is collapsed/expanded
 *
 * @example
 * ```html
 * <skill-accordion-item key="1" title="Custom Title" active>
 *   Content goes here
 *   <div slot="extra">Extra info</div>
 * </skill-accordion-item>
 * ```
 */
@customElement('skill-accordion-item')
export class SkillAccordionItem extends LitElement {
  static styles = [baseStyles, accordionStyles];

  /**
   * Unique key for the item
   */
  @property({ type: String, reflect: true })
  key?: string;

  /**
   * Title of the accordion item
   */
  @property({ type: String, reflect: true, attribute: 'item-title' })
  itemTitle?: string;

  /**
   * Whether the item is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether to show arrow icon
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-arrow' })
  showArrow?: boolean;

  /**
   * Whether to force render content even when collapsed
   */
  @property({ type: Boolean, reflect: true, attribute: 'force-render' })
  forceRender = false;

  /**
   * Whether the item is active (expanded)
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * Additional CSS classes
   */
  @property({ type: String, reflect: true })
  className: string = '';

  @state()
  private _loading = false;

  @state()
  private _hasError = false;

  // private _contentElement?: HTMLElement; // eslint-disable-line @typescript-eslint/no-unused-vars

  connectedCallback() {
    super.connectedCallback();
    if (!this.key) {
      this.key = `skill-accordion-item-${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  private _handleHeaderClick = (event: Event) => {
    event.preventDefault();

    if (this.disabled) {
      return;
    }

    const newActiveState = !this.active;

    // Dispatch change event to parent accordion
    this.dispatchEvent(new CustomEvent('skill-item-change', {
      bubbles: true,
      composed: true,
      detail: {
        key: this.key!,
        active: newActiveState,
        activeKeys: newActiveState ? [this.key!] : []
      }
    }));
  };

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._handleHeaderClick(event);
    }
  };

  private _getItemClasses() {
    const classes = ['skill-accordion__item'];

    if (this.active) {
      classes.push('skill-accordion__item--active');
    }

    if (this.disabled) {
      classes.push('skill-accordion__item--disabled');
    }

    if (this.className) {
      classes.push(this.className);
    }

    return classes.join(' ');
  }

  private _renderHeaderContent() {
    return html`
      <div class="skill-accordion__header-content">
        ${this._renderTitle()}
      </div>
      <slot name="extra"></slot>
      ${this._renderArrow()}
    `;
  }

  private _renderTitle() {
    if (this.querySelector('[slot="title"]')) {
      return html`<slot name="title"></slot>`;
    }

    return this.itemTitle ? html`<span class="skill-accordion__header-title">${this.itemTitle}</span>` : '';
  }

  private _renderArrow() {
    if (this.showArrow === false) {
      return '';
    }

    return html`
      <div part="arrow" class="skill-accordion__arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    `;
  }

  private _renderContent() {
    if (!this.active && !this.forceRender) {
      return html``;
    }

    if (this._loading) {
      return html`
        <div part="content" class="skill-accordion__content">
          <div class="skill-accordion__content-loading">
            Loading...
          </div>
        </div>
      `;
    }

    if (this._hasError) {
      return html`
        <div part="content" class="skill-accordion__content">
          <div class="skill-accordion__content-error">
            Failed to load content
          </div>
        </div>
      `;
    }

    return html`
      <div part="content" class="skill-accordion__content">
        <div class="skill-accordion__content-inner">
          <slot></slot>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div part="item" class="${this._getItemClasses()}">
        <div
          part="header"
          class="skill-accordion__header"
          role="button"
          aria-expanded="${this.active}"
          aria-disabled="${this.disabled}"
          tabindex="${this.disabled ? '-1' : '0'}"
          @click=${this._handleHeaderClick}
          @keydown=${this._handleKeyDown}
        >
          ${this._renderHeaderContent()}
        </div>
        ${this._renderContent()}
      </div>
    `;
  }

  /**
   * Get item information
   */
  public getItemInfo() {
    return {
      key: this.key,
      title: this.itemTitle,
      active: this.active,
      disabled: this.disabled,
      showArrow: this.showArrow,
      forceRender: this.forceRender,
      loading: this._loading,
      hasError: this._hasError
    };
  }

  /**
   * Set loading state
   */
  public setLoading(loading: boolean) {
    this._loading = loading;
    if (loading) {
      this._hasError = false;
    }
  }

  /**
   * Set error state
   */
  public setError(hasError: boolean) {
    this._hasError = hasError;
    if (hasError) {
      this._loading = false;
    }
  }

  /**
   * Toggle expand state
   */
  public toggle() {
    if (!this.disabled) {
      this._handleHeaderClick(new Event('click') as any);
    }
  }

  /**
   * Expand the item
   */
  public expand() {
    if (!this.disabled && !this.active) {
      this._handleHeaderClick(new Event('click') as any);
    }
  }

  /**
   * Collapse the item
   */
  public collapse() {
    if (!this.disabled && this.active) {
      this._handleHeaderClick(new Event('click') as any);
    }
  }
}

// TypeScript support for using these elements in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-accordion': SkillAccordion;
    'skill-accordion-item': SkillAccordionItem;
  }
}