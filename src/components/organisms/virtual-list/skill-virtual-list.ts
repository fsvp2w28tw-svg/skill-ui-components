import { LitElement, html, type PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { virtualListStyles } from './skill-virtual-list.styles';
import { baseStyles } from '../../../styles/base';
import type { Size } from '../../../types';
import {
  createErrorHandler,
  SkillValidator,
  type SkillErrorOptions
} from '../../../utils/error-handler';

export interface VirtualListItem {
  id: string | number;
  data: any;
  height?: number;
  key?: string | number;
}

export interface VirtualListRenderProps {
  item: VirtualListItem;
  index: number;
  style: Record<string, string>;
}

/**
 * Skill Virtual List Component - 虚拟滚动列表组件
 *
 * @slot item - Custom item template (receives item data via CSS custom properties)
 * @slot loading - Loading state content
 * @slot empty - Empty state content
 * @slot header - List header content
 * @slot footer - List footer content
 *
 * @csspart container - Virtual list container
 * @csspart viewport - Scrollable viewport
 * @csspart content - Content wrapper
 * @csspart item - List item
 * @csspart loading - Loading overlay
 * @csspart empty - Empty state
 *
 * @cssprop --item-height - Default item height
 * @cssprop --item-bg - Item background color
 * @cssprop --item-hover-bg - Item hover background
 * @cssprop --item-selected-bg - Selected item background
 * @cssprop --scrollbar-width - Scrollbar width
 *
 * @fires skill-virtual-list-scroll - Dispatched when scrolling
 * @fires skill-virtual-list-item-click - Dispatched when item is clicked
 * @fires skill-virtual-list-item-select - Dispatched when item is selected
 * @fires skill-virtual-list-reach-end - Dispatched when scroll reaches end
 *
 * @example
 * ```html
 * <skill-virtual-list>
 *   <!-- Items will be set via JavaScript -->
 * </skill-virtual-list>
 * ```
 */
@customElement('skill-virtual-list')
export class SkillVirtualList extends LitElement {
  static styles = [baseStyles, virtualListStyles];

  /** 错误处理器 */
  private errorHandler = createErrorHandler('SkillVirtualList');

  /**
   * List items data
   */
  @property({ type: Array })
  items: VirtualListItem[] = [];

  /**
   * Default item height
   */
  @property({ type: Number, reflect: true, attribute: 'item-height' })
  itemHeight = 50;

  /**
   * Container height
   */
  @property({ type: String, reflect: true, attribute: 'container-height' })
  containerHeight = '400px';

  /**
   * Extra buffer items to render outside viewport
   */
  @property({ type: Number, reflect: true, attribute: 'buffer-size' })
  bufferSize = 5;

  /**
   * Enable horizontal scroll
   */
  @property({ type: Boolean, reflect: true, attribute: 'horizontal' })
  horizontal = false;

  /**
   * Enable item selection
   */
  @property({ type: Boolean, reflect: true, attribute: 'selectable' })
  selectable = false;

  /**
   * Multiple selection mode
   */
  @property({ type: Boolean, reflect: true, attribute: 'multiple' })
  multiple = false;

  /**
   * Enable infinite scroll
   */
  @property({ type: Boolean, reflect: true, attribute: 'infinite-scroll' })
  infiniteScroll = false;

  /**
   * Threshold for infinite scroll trigger (0-1)
   */
  @property({ type: Number, reflect: true, attribute: 'scroll-threshold' })
  scrollThreshold = 0.8;

  /**
   * Loading state
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Show scrollbar
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-scrollbar' })
  showScrollbar = true;

  /**
   * Smooth scrolling
   */
  @property({ type: Boolean, reflect: true, attribute: 'smooth-scroll' })
  smoothScroll = true;

  /**
   * Item size (affects padding and spacing)
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: Size = 'md';

  /**
   * Custom render function for items
   */
  @property({ type: Function })
  renderItem?: (props: VirtualListRenderProps) => any;

  /**
   * Empty state text
   */
  @property({ type: String, reflect: true, attribute: 'empty-text' })
  emptyText = 'No items to display';

  /**
   * Loading text
   */
  @property({ type: String, reflect: true, attribute: 'loading-text' })
  loadingText = 'Loading...';

  /**
   * Key extractor for items
   */
  @property({ type: Function, attribute: 'key-extractor' })
  keyExtractor?: (item: VirtualListItem, index: number) => string | number;

  /**
   * Selected item keys
   */
  @state()
  selectedKeys: (string | number)[] = [];

  /**
   * Scroll position
   */
  @state()
  private _scrollTop = 0;

  /**
   * Scroll left position (for horizontal mode)
   */
  @state()
  private _scrollLeft = 0;

  /**
   * Viewport size
   */
  @state()
  private _viewportSize = 0;

  /**
   * Computed item positions
   */
  @state()
  private _itemPositions: number[] = [];

  private _viewport?: HTMLElement;
  private _resizeObserver?: ResizeObserver;

  connectedCallback() {
    super.connectedCallback();
    this._updateItemPositions();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }

  firstUpdated() {
    this._viewport = this.shadowRoot?.querySelector('.skill-virtual-list__viewport') as HTMLElement;

    this._setupResizeObserver();
    this._updateViewportSize();
  }

  protected willUpdate(changedProperties: PropertyValueMap<this>) {
    try {
      // 验证关键属性
      if (changedProperties.has('items')) {
        SkillValidator.arrayLength('items', this.items, 0, undefined, 'SkillVirtualList');

        // 验证每个 item 的结构
        if (this.items) {
          this.items.forEach((item, index) => {
            if (!item || typeof item !== 'object') {
              throw new Error(`Item at index ${index} must be an object`);
            }
            if (item.id === undefined || item.id === null) {
              throw new Error(`Item at index ${index} must have an id property`);
            }
          });
        }
      }

      if (changedProperties.has('itemHeight')) {
        SkillValidator.range('itemHeight', this.itemHeight, 20, 500, 'SkillVirtualList');
      }

      if (changedProperties.has('containerHeight')) {
        if (this.containerHeight && typeof this.containerHeight === 'string') {
          if (!/^\d+(\.\d+)?(px|em|rem|vh|vw|%)$/.test(this.containerHeight)) {
            throw new Error(`containerHeight must be a valid CSS length unit`);
          }
        }
      }

      if (changedProperties.has('bufferSize')) {
        SkillValidator.range('bufferSize', this.bufferSize, 0, 50, 'SkillVirtualList');
      }

      this._updateItemPositions();
    } catch (error) {
      this.errorHandler.handle(error as Error, 'willUpdate', 'medium');
      throw error; // 重新抛出，让 Lit 继续处理
    }
  }

  private _setupResizeObserver() {
    if (!this._viewport) return;

    this._resizeObserver = new ResizeObserver(() => {
      this._updateViewportSize();
    });

    this._resizeObserver.observe(this._viewport);
  }

  private _updateViewportSize() {
    if (!this._viewport) return;

    const rect = this._viewport.getBoundingClientRect();
    this._viewportSize = this.horizontal ? rect.width : rect.height;
    this.requestUpdate();
  }

  private _updateItemPositions() {
    const positions: number[] = [];
    let currentPosition = 0;

    this.items.forEach((item) => {
      positions.push(currentPosition);
      currentPosition += item.height || this.itemHeight;
    });

    this._itemPositions = positions;
  }

  private _handleScroll() {
    if (!this._viewport) return;

    this._scrollTop = this._viewport.scrollTop;
    this._scrollLeft = this._viewport.scrollLeft;

    // Check for infinite scroll
    if (this.infiniteScroll && !this.loading) {
      const scrollPercentage = this._getScrollPercentage();
      if (scrollPercentage >= this.scrollThreshold) {
        this._handleReachEnd();
      }
    }

    // Dispatch scroll event
    this.dispatchEvent(
      new CustomEvent('skill-virtual-list-scroll', {
        bubbles: true,
        composed: true,
        detail: {
          scrollTop: this._scrollTop,
          scrollLeft: this._scrollLeft,
          scrollPercentage: this._getScrollPercentage()
        }
      })
    );
  }

  private _getScrollPercentage(): number {
    if (!this._viewport || this.items.length === 0) return 0;

    const totalSize = this._itemPositions[this._itemPositions.length - 1] + (this.items[this.items.length - 1]?.height || this.itemHeight);
    const viewportSize = this._viewportSize;

    if (totalSize <= viewportSize) return 1;

    const scrollPosition = this.horizontal ? this._scrollLeft : this._scrollTop;
    return (scrollPosition + viewportSize) / totalSize;
  }

  private _handleReachEnd() {
    this.dispatchEvent(
      new CustomEvent('skill-virtual-list-reach-end', {
        bubbles: true,
        composed: true,
        detail: {
          scrollTop: this._scrollTop,
          scrollLeft: this._scrollLeft
        }
      })
    );
  }

  private _getVisibleRange() {
    const viewportSize = this._viewportSize;
    const scrollPosition = this.horizontal ? this._scrollLeft : this._scrollTop;

    const startIndex = this._findItemIndex(scrollPosition);
    const endIndex = this._findItemIndex(scrollPosition + viewportSize);

    // Add buffer
    const bufferedStartIndex = Math.max(0, startIndex - this.bufferSize);
    const bufferedEndIndex = Math.min(this.items.length - 1, endIndex + this.bufferSize);

    return {
      start: bufferedStartIndex,
      end: bufferedEndIndex
    };
  }

  private _findItemIndex(scrollPosition: number): number {
    let left = 0;
    let right = this._itemPositions.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const position = this._itemPositions[mid];

      if (position <= scrollPosition) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return Math.max(0, right);
  }

  private _getItemKey(item: VirtualListItem, index: number): string | number {
    if (this.keyExtractor) {
      return this.keyExtractor(item, index);
    }
    return item.key || item.id || index;
  }

  private _handleItemClick(item: VirtualListItem, index: number, e: MouseEvent) {
    this.dispatchEvent(
      new CustomEvent('skill-virtual-list-item-click', {
        bubbles: true,
        composed: true,
        detail: {
          item,
          index,
          originalEvent: e
        }
      })
    );

    if (this.selectable) {
      this._handleItemSelect(item, index);
    }
  }

  private _handleItemSelect(item: VirtualListItem, index: number) {
    const key = this._getItemKey(item, index);

    if (this.multiple) {
      const isSelected = this.selectedKeys.includes(key);
      if (isSelected) {
        this.selectedKeys = this.selectedKeys.filter(k => k !== key);
      } else {
        this.selectedKeys = [...this.selectedKeys, key];
      }
    } else {
      this.selectedKeys = [key];
    }

    this.dispatchEvent(
      new CustomEvent('skill-virtual-list-item-select', {
        bubbles: true,
        composed: true,
        detail: {
          item,
          index,
          selected: this.selectedKeys,
          key
        }
      })
    );
  }

  render() {
    try {
      const { start, end } = this._getVisibleRange();
      const visibleItems = this.items.slice(start, end + 1);
      const totalSize = this._itemPositions.length > 0
        ? this._itemPositions[this._itemPositions.length - 1] + (this.items[this.items.length - 1]?.height || this.itemHeight)
        : 0;

      return html`
        <div class="skill-virtual-list__container" part="container">
          <!-- Header Slot -->
          <slot name="header"></slot>

          <!-- Viewport -->
          <div
            class="skill-virtual-list__viewport"
            part="viewport"
            style="${this.horizontal ? `width: ${this.containerHeight}; height: 100%;` : `height: ${this.containerHeight};`}"
            ?show-scrollbar=${this.showScrollbar}
            @scroll=${this._handleScroll}
          >
            <!-- Content Wrapper -->
            <div
              class="skill-virtual-list__content"
              part="content"
              style="${this.horizontal
                ? `width: ${totalSize}px; height: 100%;`
                : `height: ${totalSize}px;`}"
            >
              ${visibleItems.map((item, index) => {
                const actualIndex = start + index;
                const key = this._getItemKey(item, actualIndex);
                const position = this._itemPositions[actualIndex];
                const height = item.height || this.itemHeight;
                const isSelected = this.selectedKeys.includes(key);

                const style = this.horizontal
                  ? {
                      position: 'absolute',
                      left: `${position}px`,
                      top: '0',
                      width: `${height}px`,
                      height: '100%'
                    }
                  : {
                      position: 'absolute',
                      top: `${position}px`,
                      left: '0',
                      width: '100%',
                      height: `${height}px`
                    };

                return this.renderItem
                  ? this.renderItem({ item, index: actualIndex, style })
                  : this._renderDefaultItem(item, actualIndex, style, isSelected);
              })}
            </div>

            <!-- Loading State -->
            ${this.loading ? this._renderLoading() : ''}

            <!-- Empty State -->
            ${!this.loading && this.items.length === 0 ? this._renderEmpty() : ''}
          </div>

          <!-- Footer Slot -->
          <slot name="footer"></slot>
        </div>
      `;
    } catch (error) {
      this.errorHandler.handle(error as Error, 'render', 'critical');

      // 渲染错误回退UI
      return html`
        <div class="skill-virtual-list__container">
          <div class="skill-virtual-list__error">
            <div class="error-icon">⚠️</div>
            <h3>虚拟列表渲染错误</h3>
            <p>${this.errorHandler.handle(error as Error).userMessage || '虚拟列表组件出现错误，请检查数据格式'}</p>
            <button @click=${() => this.refresh()}>重试</button>
          </div>
        </div>
      `;
    }
  }

  private _renderDefaultItem(item: VirtualListItem, index: number, style: Record<string, string>, isSelected: boolean) {
    return html`
      <div
        class="skill-virtual-list__item ${isSelected ? 'selected' : ''}"
        part="item"
        style="${Object.entries(style).map(([k, v]) => `${k}: ${v}`).join('; ')}"
        ?selected=${isSelected}
        ?selectable=${this.selectable}
        data-index="${index}"
        data-key="${this._getItemKey(item, index)}"
        @click=${(e: MouseEvent) => this._handleItemClick(item, index, e)}
      >
        <slot name="item">
          <!-- Set item data as CSS custom properties for slot content -->
          <style>
            :scope {
              --item-index: ${index};
              --item-id: ${item.id || ''};
              --item-data: ${JSON.stringify(item.data).replace(/"/g, '&quot;')};
            }
          </style>
          <div class="skill-virtual-list__item-content">
            ${item.data?.toString() || JSON.stringify(item.data)}
          </div>
        </slot>
      </div>
    `;
  }

  private _renderLoading() {
    return html`
      <div part="loading" class="skill-virtual-list__loading">
        <slot name="loading">
          <div class="skill-virtual-list__loading-content">
            <div class="skill-virtual-list__loading-spinner"></div>
            <div class="skill-virtual-list__loading-text">${this.loadingText}</div>
          </div>
        </slot>
      </div>
    `;
  }

  private _renderEmpty() {
    return html`
      <div part="empty" class="skill-virtual-list__empty">
        <slot name="empty">
          <div class="skill-virtual-list__empty-content">
            <div class="skill-virtual-list__empty-icon">📋</div>
            <div class="skill-virtual-list__empty-text">${this.emptyText}</div>
          </div>
        </slot>
      </div>
    `;
  }

  /**
   * Scroll to item by index
   */
  public scrollToIndex(index: number, alignment: 'start' | 'center' | 'end' = 'start') {
    if (!this._viewport || index < 0 || index >= this.items.length) return;

    const itemPosition = this._itemPositions[index];
    const itemHeight = this.items[index]?.height || this.itemHeight;
    const viewportSize = this._viewportSize;

    let scrollPosition: number;

    switch (alignment) {
      case 'center':
        scrollPosition = itemPosition - (viewportSize - itemHeight) / 2;
        break;
      case 'end':
        scrollPosition = itemPosition - viewportSize + itemHeight;
        break;
      case 'start':
      default:
        scrollPosition = itemPosition;
        break;
    }

    if (this.smoothScroll) {
      this._viewport.scrollTo({
        [this.horizontal ? 'left' : 'top']: scrollPosition,
        behavior: 'smooth'
      });
    } else {
      if (this.horizontal) {
        this._viewport.scrollLeft = scrollPosition;
      } else {
        this._viewport.scrollTop = scrollPosition;
      }
    }
  }

  /**
   * Scroll to item by key
   */
  public scrollToKey(key: string | number, alignment: 'start' | 'center' | 'end' = 'start') {
    const index = this.items.findIndex(item => {
      const itemKey = this.keyExtractor ? this.keyExtractor(item, this.items.indexOf(item)) : (item.key || item.id);
      return itemKey === key;
    });

    if (index !== -1) {
      this.scrollToIndex(index, alignment);
    }
  }

  /**
   * Get selected items
   */
  public getSelectedItems(): VirtualListItem[] {
    return this.items.filter((item, index) => {
      const key = this._getItemKey(item, index);
      return this.selectedKeys.includes(key);
    });
  }

  /**
   * Select items by keys
   */
  public selectItems(keys: (string | number)[]) {
    this.selectedKeys = this.multiple ? keys : keys.slice(0, 1);
  }

  /**
   * Select all items
   */
  public selectAll() {
    if (this.multiple) {
      this.selectedKeys = this.items.map((item, index) => this._getItemKey(item, index));
    }
  }

  /**
   * Clear selection
   */
  public clearSelection() {
    this.selectedKeys = [];
  }

  /**
   * Refresh the list
   */
  public refresh() {
    this._updateItemPositions();
    this.requestUpdate();
  }

  /**
   * Get viewport scroll info
   */
  public getScrollInfo() {
    return {
      scrollTop: this._scrollTop,
      scrollLeft: this._scrollLeft,
      viewportSize: this._viewportSize,
      scrollPercentage: this._getScrollPercentage()
    };
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-virtual-list': SkillVirtualList;
  }
}