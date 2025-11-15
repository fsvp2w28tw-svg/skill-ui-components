import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { breadcrumbStyles } from './skill-breadcrumb.styles';
import { baseStyles } from '../../../styles/base';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  disabled?: boolean;
  active?: boolean;
  icon?: string;
  onClick?: (e: Event) => void;
}

/**
 * Skill Breadcrumb Component - 面包屑导航容器组件
 *
 * 简化的面包屑容器，专注于布局和协调
 *
 * @slot - Default slot for breadcrumb items or skill-breadcrumb-item components
 * @slot separator - Custom separator content
 *
 * @csspart breadcrumb - The breadcrumb container
 * @csspart list - The breadcrumb list
 * @csspart item - Breadcrumb item
 * @csspart separator - Separator element
 *
 * @cssprop --breadcrumb-gap - Gap between items
 * @cssprop --breadcrumb-separator-color - Separator color
 * @cssprop --breadcrumb-font-size - Font size
 * @cssprop --breadcrumb-font-weight - Font weight
 *
 * @fires skill-breadcrumb-change - Dispatched when navigation occurs
 *
 * @example
 * ```html
 * <!-- 使用插槽 -->
 * <skill-breadcrumb>
 *   <skill-breadcrumb-item href="/home">Home</skill-breadcrumb-item>
 *   <skill-breadcrumb-item href="/products">Products</skill-breadcrumb-item>
 *   <skill-breadcrumb-item active>Current Page</skill-breadcrumb-item>
 * </skill-breadcrumb>
 *
 * <!-- 使用items属性 -->
 * <skill-breadcrumb
 *   .items=${[
 *     { label: 'Home', href: '/home' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Current', active: true }
 *   ]}
 *   .separator="/"
 * ></skill-breadcrumb>
 * ```
 */
@customElement('skill-breadcrumb')
export class SkillBreadcrumb extends LitElement {
  static styles = [baseStyles, breadcrumbStyles];

  /**
   * Breadcrumb items array (alternative to slot content)
   */
  @property({ type: Array })
  items: BreadcrumbItem[] = [];

  /**
   * Separator character
   */
  @property({ type: String })
  separator = '/';

  /**
   * Maximum number of items to show before collapsing (basic ellipsis)
   */
  @property({ type: Number, reflect: true, attribute: 'max-items' })
  maxItems?: number;

  /**
   * ARIA label for accessibility
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel = 'Breadcrumb navigation';

  private _getItemsFromSlot(): BreadcrumbItem[] {
    const slot = this.shadowRoot?.querySelector('slot:not([name])');
    if (!slot) return [];

    const assignedNodes = (slot as HTMLSlotElement).assignedNodes({ flatten: true });
    return assignedNodes
      .filter((node: Node) => node.nodeType === Node.ELEMENT_NODE)
      .map((node: Node) => {
        const element = node as HTMLElement;
        return {
          label: element.textContent?.trim() || '',
          href: element.getAttribute('href') || undefined,
          disabled: element.hasAttribute('disabled'),
          active: element.hasAttribute('active') || element.tagName === 'SPAN',
          icon: element.getAttribute('data-icon') || undefined,
          onClick: (_e: Event) => element.click?.(),
        };
      });
  }

  private _getAllItems(): BreadcrumbItem[] {
    if (this.items.length > 0) {
      return this.items;
    }
    return this._getItemsFromSlot();
  }

  private _getVisibleItems(): BreadcrumbItem[] {
    let allItems = this._getAllItems();

    // Apply max items limit
    if (this.maxItems && allItems.length > this.maxItems) {
      const keepEnd = Math.max(1, this.maxItems - 1);
      return [
        { label: '...', disabled: true },
        ...allItems.slice(allItems.length - keepEnd)
      ];
    }

    return allItems;
  }

  private _handleItemClick(item: BreadcrumbItem, index: number, e: Event) {
    if (item.disabled || item.active) return;

    e.preventDefault();

    // Execute custom click handler
    if (item.onClick) {
      item.onClick(e);
    }

    // Navigate if href provided
    if (item.href) {
      window.location.href = item.href;
    }

    // Fire change event
    this.dispatchEvent(
      new CustomEvent('skill-breadcrumb-change', {
        bubbles: true,
        composed: true,
        detail: {
          item,
          index,
          items: this._getAllItems(),
        },
      })
    );
  }

  private _renderSeparator(): TemplateResult {
    return html`
      <span part="separator" class="skill-breadcrumb__separator">
        <slot name="separator">${this.separator}</slot>
      </span>
    `;
  }

  private _renderItem(item: BreadcrumbItem, index: number): TemplateResult {
    const isLast = index === this._getVisibleItems().length - 1;
    const isActive = item.active || isLast;

    return html`
      <li part="item" class="skill-breadcrumb__item">
        ${!isActive && item.href ? html`
          <a
            part="link"
            class="skill-breadcrumb__link"
            href="${item.href}"
            aria-current="${isActive ? 'page' : 'false'}"
            aria-disabled="${item.disabled ? 'true' : 'false'}"
            tabindex="${item.disabled ? '-1' : '0'}"
            @click=${(e: Event) => this._handleItemClick(item, index, e)}
          >
            ${item.icon ? html`<skill-icon name="${item.icon}" size="sm"></skill-icon>` : ''}
            ${item.label}
          </a>
        ` : html`
          <span
            part="link"
            class="skill-breadcrumb__link skill-breadcrumb__link--current"
            aria-current="page"
          >
            ${item.icon ? html`<skill-icon name="${item.icon}" size="sm"></skill-icon>` : ''}
            ${item.label}
          </span>
        `}

        ${!isLast ? this._renderSeparator() : ''}
      </li>
    `;
  }

  render(): TemplateResult {
    const visibleItems = this._getVisibleItems();

    return html`
      <nav
        part="breadcrumb"
        class="skill-breadcrumb"
        aria-label="${this.ariaLabel}"
      >
        <ol part="list" class="skill-breadcrumb__list">
          ${visibleItems.map((item, index) => this._renderItem(item, index))}
        </ol>
      </nav>
    `;
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-breadcrumb': SkillBreadcrumb;
  }
}