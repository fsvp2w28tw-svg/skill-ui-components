import { LitElement, html, type PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { collapseStyles } from './skill-collapse.styles';
import { baseStyles } from '../../../styles/base';
import type {} from '../../../types';

/**
 * Collapse specific types
 */
export type CollapseSize = 'sm' | 'md' | 'lg';
export type CollapseVariant = 'default' | 'borderless' | 'ghost';
export type CollapseIconPosition = 'right' | 'left';
export type CollapseArrowType = 'chevron' | 'plus' | 'none';

export interface CollapseItem {
  key: string;
  title: string;
  description?: string;
  content: string;
  disabled?: boolean;
  expanded?: boolean;
  icon?: string;
  extra?: string;
}

export interface CollapseEventDetail {
  key: string;
  expanded: boolean;
  item: CollapseItem;
}

/**
 * Skill Collapse Component
 *
 * A versatile collapse/accordion component for organizing content with expandable sections.
 * Supports multiple display modes, accordion behavior, and extensive customization.
 *
 * @slot item-title - Custom title content for collapse items
 * @slot item-description - Custom description content for collapse items
 * @slot item-extra - Extra content to display in header (right side)
 * @slot item-content - Custom content for collapse items
 * @slot expand-icon - Custom expand icon
 *
 * @csspart header - The header button element
 * @csspart content - The content container element
 * @csspart expand-icon - The expand/collapse icon
 * @csspart title - The title element
 * @csspart description - The description element
 * @csspart extra - The extra content area
 *
 * @cssprop --collapse-bg - Background color of collapse container
 * @cssprop --collapse-border - Border color of collapse container
 * @cssprop --header-bg - Background color of header
 * @cssprop --header-hover-bg - Background color of header on hover
 *
 * @fires skill-change - Dispatched when an item is expanded or collapsed
 * @fires skill-expand - Dispatched when an item is expanded
 * @fires skill-collapse - Dispatched when an item is collapsed
 *
 * @example
 * ```html
 * <skill-collapse
 *   .items=${[
 *     { key: '1', title: 'Section 1', content: 'Content 1' },
 *     { key: '2', title: 'Section 2', content: 'Content 2' }
 *   ]}
 *   accordion
 * >
 * </skill-collapse>
 *
 * <skill-collapse
 *   variant="ghost"
 *   size="lg"
 *   accordion
 *   icon-position="left"
 * >
 * </skill-collapse>
 * ```
 */
@customElement('skill-collapse')
export class SkillCollapse extends LitElement {
  static styles = [baseStyles, collapseStyles];

  /**
   * Array of collapse items
   */
  @property({ type: Array })
  items: CollapseItem[] = [];

  /**
   * Size of the collapse component
   * @type {'sm' | 'md' | 'lg'}
   */
  @property({ type: String, reflect: true })
  size: CollapseSize = 'md';

  /**
   * Visual variant of the collapse
   * @type {'default' | 'borderless' | 'ghost'}
   */
  @property({ type: String, reflect: true })
  variant: CollapseVariant = 'default';

  /**
   * Position of the expand icon
   * @type {'right' | 'left'}
   */
  @property({ type: String, reflect: true, attribute: 'icon-position' })
  iconPosition: CollapseIconPosition = 'right';

  /**
   * Type of expand arrow
   * @type {'chevron' | 'plus' | 'none'}
   */
  @property({ type: String, reflect: true, attribute: 'arrow-type' })
  arrowType: CollapseArrowType = 'chevron';

  /**
   * Enable accordion mode (only one item open at a time)
   */
  @property({ type: Boolean, reflect: true })
  accordion = false;

  /**
   * Default expanded keys (comma-separated)
   */
  @property({ type: String, reflect: true, attribute: 'default-active-key' })
  defaultActiveKey?: string;

  /**
   * Currently active keys (comma-separated, controlled)
   */
  @property({ type: String, reflect: true, attribute: 'active-key' })
  activeKey?: string;

  /**
   * Whether to show arrow icons
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-arrow' })
  showArrow = true;

  /**
   * Whether to show ghost background on hover
   */
  @property({ type: Boolean, reflect: true, attribute: 'ghost' })
  ghost = false;

  /**
   * Whether to destroy inactive panels
   */
  @property({ type: Boolean, reflect: true, attribute: 'destroy-inactive-panel' })
  destroyInactivePanel = false;

  /**
   * Whether to expand on icon click only
   */
  @property({ type: Boolean, reflect: true, attribute: 'expand-icon-click' })
  expandIconClick = false;

  /**
   * Whether to show expand icon on hover only
   */
  @property({ type: Boolean, reflect: true, attribute: 'expand-icon-only' })
  expandIconOnly = false;

  @state()
  private _expandedKeys: Set<string> = new Set();

  connectedCallback() {
    super.connectedCallback();
    this._initializeExpandedKeys();
  }

  protected willUpdate(changedProperties: PropertyValueMap<this>) {
    if (changedProperties.has('defaultActiveKey')) {
      this._initializeExpandedKeys();
    }

    if (changedProperties.has('activeKey')) {
      if (this.activeKey !== undefined) {
        this._expandedKeys = new Set(this.activeKey.split(',').filter(Boolean));
      }
    }
  }

  private _initializeExpandedKeys() {
    const keys = this.activeKey || this.defaultActiveKey || '';
    this._expandedKeys = new Set(keys.split(',').filter(Boolean));
  }

  private _isExpanded(key: string): boolean {
    return this._expandedKeys.has(key);
  }

  private _handleHeaderClick(item: CollapseItem, event: Event) {
    if (item.disabled) return;

    // If expandIconClick is true, only respond to icon clicks
    if (this.expandIconClick && !this.expandIconOnly) {
      return;
    }

    this._toggleItem(item.key, event);
  }

  private _handleIconClick(item: CollapseItem, event: Event) {
    if (item.disabled) return;

    // Always handle icon clicks if enabled
    if (this.expandIconClick || this.expandIconOnly) {
      if (event) {
        event.stopPropagation();
      }
      this._toggleItem(item.key, event);
    }
  }

  private _toggleItem(key: string, _event: Event) {
    const isExpanded = this._isExpanded(key);
    const item = this.items.find(i => i.key === key);

    if (!item) return;

    // In accordion mode, close other items
    if (this.accordion && !isExpanded) {
      this._expandedKeys.clear();
      this._expandedKeys.add(key);
    } else {
      if (isExpanded) {
        this._expandedKeys.delete(key);
      } else {
        this._expandedKeys.add(key);
      }
    }

    // Update activeKey if controlled
    if (this.activeKey !== undefined) {
      this.activeKey = Array.from(this._expandedKeys).join(',');
    }

    this._dispatchChangeEvent(key, !isExpanded, item);

    if (!isExpanded) {
      this.dispatchEvent(new CustomEvent('skill-expand', {
        bubbles: true,
        composed: true,
        detail: { key, item }
      }));
    } else {
      this.dispatchEvent(new CustomEvent('skill-collapse', {
        bubbles: true,
        composed: true,
        detail: { key, item }
      }));
    }
  }

  private _dispatchChangeEvent(key: string, expanded: boolean, _item: CollapseItem) {
    this.dispatchEvent(new CustomEvent('skill-change', {
      bubbles: true,
      composed: true,
      detail: {
        key,
        expanded,
        item: _item
      } as CollapseEventDetail
    }));
  }

  private _renderExpandIcon(item: CollapseItem) {
    if (this.arrowType === 'none' || !this.showArrow) {
      return html``;
    }

    const iconClickHandler = this.expandIconClick || this.expandIconOnly
      ? (e: Event) => this._handleIconClick(item, e)
      : undefined;

    const iconContainer = html`
      <span
        part="expand-icon"
        class="skill-collapse__expand-icon"
        @click=${iconClickHandler}
      >
        <slot name="expand-icon">
          ${this.arrowType === 'plus' ? html`
            <!-- Plus/minus icon -->
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <line x1="12" y1="5" x2="12" y2="19"></line>
            </svg>
          ` : html`
            <!-- Chevron icon -->
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          `}
        </slot>
      </span>
    `;

    return iconContainer;
  }

  private _renderItem(item: CollapseItem) {
    const isExpanded = this._isExpanded(item.key);
    const shouldRenderContent = isExpanded || !this.destroyInactivePanel;

    return html`
      <div class="skill-collapse__item ${isExpanded ? 'skill-collapse__item--expanded' : ''}">
        <button
          part="header"
          class="skill-collapse__header"
          ?disabled=${item.disabled}
          aria-expanded=${isExpanded}
          aria-controls="panel-${item.key}"
          @click=${(e: Event) => this._handleHeaderClick(item, e)}
        >
          <div class="skill-collapse__header-content">
            ${item.icon ? html`
              <slot name="item-icon">
                <span class="skill-collapse__extra-icon">${item.icon}</span>
              </slot>
            ` : ''}

            <div>
              <slot name="item-title">
                <h4 class="skill-collapse__title" part="title">${item.title}</h4>
              </slot>

              ${item.description ? html`
                <slot name="item-description">
                  <p class="skill-collapse__description" part="description">${item.description}</p>
                </slot>
              ` : ''}
            </div>
          </div>

          <div class="skill-collapse__header-actions">
            <slot name="item-extra">
              ${item.extra ? html`
                <span class="skill-collapse__extra" part="extra">${item.extra}</span>
              ` : ''}
            </slot>

            ${this._renderExpandIcon(item)}
          </div>
        </button>

        ${shouldRenderContent ? html`
          <div
            part="content"
            class="skill-collapse__content"
            id="panel-${item.key}"
            role="region"
            aria-labelledby="header-${item.key}"
            ?hidden=${!isExpanded}
          >
            <div class="skill-collapse__content-inner">
              <slot name="item-content">
                ${typeof item.content === 'string' ? html`<div>${item.content}</div>` : item.content}
              </slot>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  render() {
    const containerClasses = [
      'skill-collapse',
      `skill-collapse--${this.size}`,
      `skill-collapse--${this.variant}`,
      `skill-collapse--arrow-${this.arrowType}`,
      this.iconPosition === 'left' ? 'skill-collapse--icon-left' : '',
      this.accordion ? 'skill-collapse--accordion' : '',
      this.ghost ? 'skill-collapse--ghost' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class="${containerClasses}">
        ${this.items.map(item => this._renderItem(item))}
      </div>
    `;
  }

  /**
   * Public API methods
   */

  /**
   * Expand a specific item
   */
  public expand(key: string) {
    const item = this.items.find(i => i.key === key);
    if (item && !item.disabled) {
      if (this.accordion) {
        this._expandedKeys.clear();
      }
      this._expandedKeys.add(key);
      this.requestUpdate();
      this._dispatchChangeEvent(key, true, item);
    }
  }

  /**
   * Collapse a specific item
   */
  public collapse(key: string) {
    const item = this.items.find(i => i.key === key);
    if (item) {
      this._expandedKeys.delete(key);
      this.requestUpdate();
      this._dispatchChangeEvent(key, false, item);
    }
  }

  /**
   * Toggle a specific item
   */
  public toggle(key: string) {
    const isExpanded = this._isExpanded(key);
    if (isExpanded) {
      this.collapse(key);
    } else {
      this.expand(key);
    }
  }

  /**
   * Expand all items
   */
  public expandAll() {
    if (this.accordion) return;

    this.items.forEach(item => {
      if (!item.disabled) {
        this._expandedKeys.add(item.key);
      }
    });
    this.requestUpdate();
  }

  /**
   * Collapse all items
   */
  public collapseAll() {
    this._expandedKeys.clear();
    this.requestUpdate();
  }

  /**
   * Get currently expanded keys
   */
  public getActiveKeys(): string[] {
    return Array.from(this._expandedKeys);
  }

  /**
   * Set active keys programmatically
   */
  public setActiveKeys(keys: string[]) {
    if (this.accordion && keys.length > 1) {
      console.warn('Accordion mode only supports one active key');
      return;
    }

    this._expandedKeys = new Set(keys.filter(key =>
      this.items.some(item => item.key === key && !item.disabled)
    ));
    this.requestUpdate();
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-collapse': SkillCollapse;
  }
}