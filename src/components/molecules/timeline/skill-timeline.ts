import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { timelineStyles } from './skill-timeline.styles';
import { baseStyles } from '../../../styles/base';

export interface TimelineItem {
  title?: string;
  content?: string;
  time?: string | Date;
  color?: string;
  icon?: string;
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  position?: 'left' | 'right' | 'alternate';
  dot?: boolean;
  line?: boolean;
  onClick?: (e: Event) => void;
}

/**
 * Skill Timeline Component - 时间轴组件
 *
 * @slot - Default slot for timeline items
 * @slot dot - Custom dot slot for each item
 * @slot icon - Custom icon slot for each item
 * @slot content - Custom content slot for each item
 * @slot time - Custom time slot for each item
 *
 * @csspart timeline - The timeline container
 * @csspart item - Timeline item container
 * @csspart dot - Timeline dot/marker
 * @csspart line - Timeline connector line
 * @csspart content - Item content container
 * @csspart title - Item title element
 * @csspart time - Item time element
 * @csspart card - Item card wrapper
 *
 * @cssprop --timeline-line-width - Connector line width
 * @cssprop --timeline-line-color - Connector line color
 * @cssprop --timeline-dot-size - Dot size
 * @cssprop --timeline-gap - Gap between items
 * @cssprop --timeline-card-bg - Card background color
 *
 * @fires skill-timeline-click - Dispatched when an item is clicked
 * @fires skill-timeline-change - Dispatched when timeline changes
 *
 * @example
 * ```html
 * <!-- 基础时间轴 -->
 * <skill-timeline>
 *   <div class="timeline-item">
 *     <div class="timeline-dot"></div>
 *     <div class="timeline-content">
 *       <h4>Project Started</h4>
 *       <p>Initial planning and team formation</p>
 *       <time>2024-01-15</time>
 *     </div>
 *   </div>
 *   <div class="timeline-item">
 *     <div class="timeline-dot"></div>
 *     <div class="timeline-content">
 *       <h4>Development Phase</h4>
 *       <p>Core features implementation</p>
 *       <time>2024-02-01</time>
 *     </div>
 *   </div>
 * </skill-timeline>
 *
 * <!-- 使用items属性 -->
 * <skill-timeline
 *   .items=${[
 *     {
 *       title: 'Meeting',
 *       content: 'Initial client meeting',
 *       time: '2024-01-10 10:00',
 *       type: 'primary',
 *       icon: 'users'
 *     },
 *     {
 *       title: 'Proposal',
 *       content: 'Submitted project proposal',
 *       time: '2024-01-15 14:30',
 *       type: 'success',
 *       icon: 'file-text'
 *     }
 *   ]}
 * ></skill-timeline>
 *
 * <!-- 不同方向 -->
 * <skill-timeline direction="horizontal">
 *   <div class="timeline-item">
 *     <div class="timeline-content">
 *       <h4>Phase 1</h4>
 *       <p>Planning</p>
 *     </div>
 *   </div>
 *   <div class="timeline-item">
 *     <div class="timeline-content">
 *       <h4>Phase 2</h4>
 *       <p>Development</p>
 *     </div>
 *   </div>
 * </skill-timeline>
 *
 * <!-- 交替布局 -->
 * <skill-timeline layout="alternate">
 *   <div class="timeline-item">
 *     <div class="timeline-content">
 *       <h4>Left Item</h4>
 *       <p>Content on the left</p>
 *     </div>
 *   </div>
 *   <div class="timeline-item">
 *     <div class="timeline-content">
 *       <h4>Right Item</h4>
 *       <p>Content on the right</p>
 *     </div>
 *   </div>
 * </skill-timeline>
 *
 * <!-- 带图标的时间轴 -->
 * <skill-timeline show-icons>
 *   <div class="timeline-item" data-icon="flag" data-type="primary">
 *     <div class="timeline-content">
 *       <h4>Milestone 1</h4>
 *       <p>Project kickoff</p>
 *     </div>
 *   </div>
 *   <div class="timeline-item" data-icon="check-circle" data-type="success">
 *     <div class="timeline-content">
 *       <h4>Milestone 2</h4>
 *       <p>First release</p>
 *     </div>
 *   </div>
 * </skill-timeline>
 *
 * <!-- 卡片样式 -->
 * <skill-timeline card>
 *   <div class="timeline-item">
 *     <div class="timeline-content">
 *       <h4>Event Title</h4>
 *       <p>Event description goes here</p>
 *       <time>2024-01-20</time>
 *     </div>
 *   </div>
 * </skill-timeline>
 *
 * <!-- 自定义颜色 -->
 * <skill-timeline>
 *   <div class="timeline-item" data-color="#ff6b6b">
 *     <div class="timeline-content">
 *       <h4>Custom Color</h4>
 *       <p>Red timeline item</p>
 *     </div>
 *   </div>
 * </skill-timeline>
 *
 * <!-- 不同尺寸 -->
 * <skill-timeline size="sm">
 *   <div class="timeline-item">
 *     <div class="timeline-content">
 *       <h4>Small Timeline</h4>
 *       <p>Compact size</p>
 *     </div>
 *   </div>
 * </skill-timeline>
 *
 * <!-- 带时间标签 -->
 * <skill-timeline show-time-labels>
 *   <div class="timeline-item">
 *     <div class="timeline-content">
 *       <h4>Event</h4>
 *       <p>With time label</p>
 *       <time>2024-01-15</time>
 *     </div>
 *   </div>
 * </skill-timeline>
 *
 * <!-- 连续线条 -->
 * <skill-timeline continuous>
 *   <div class="timeline-item">
 *     <div class="timeline-content">
 *       <h4>Continuous</h4>
 *       <p>Connected timeline</p>
 *     </div>
 *   </div>
 * </skill-timeline>
 *
 * <!-- 可点击项目 -->
 * <skill-timeline clickable>
 *   <div class="timeline-item" onclick="alert('Item clicked')">
 *     <div class="timeline-content">
 *       <h4>Clickable Item</h4>
 *       <p>Click to interact</p>
 *     </div>
 *   </div>
 * </skill-timeline>
 *
 * <!-- 倒序时间轴 -->
 * <skill-timeline reverse>
 *   <div class="timeline-item">
 *     <div class="timeline-content">
 *       <h4>Latest Event</h4>
 *       <p>Most recent item</p>
 *     </div>
 *   </div>
 *   <div class="timeline-item">
 *     <div class="timeline-content">
 *       <h4>Earlier Event</h4>
 *       <p>Older item</p>
 *     </div>
 *   </div>
 * </skill-timeline>
 *
 * <!-- 自动排序 -->
 * <skill-timeline auto-sort>
 *   <div class="timeline-item" data-time="2024-01-10">
 *     <div class="timeline-content">
 *       <h4>Jan 10</h4>
 *     </div>
 *   </div>
 *   <div class="timeline-item" data-time="2024-01-05">
 *     <div class="timeline-content">
 *       <h4>Jan 5</h4>
 *     </div>
 *   </div>
 * </skill-timeline>
 * ```
 */
@customElement('skill-timeline')
export class SkillTimeline extends LitElement {
  static styles = [baseStyles, timelineStyles];

  /**
   * Timeline items array (alternative to slot content)
   */
  @property({ type: Array })
  items: TimelineItem[] = [];

  /**
   * Timeline direction
   * @type {'vertical' | 'horizontal'}
   */
  @property({ type: String, reflect: true })
  direction: 'vertical' | 'horizontal' = 'vertical';

  /**
   * Layout mode
   * @type {'left' | 'right' | 'center' | 'alternate'}
   */
  @property({ type: String, reflect: true })
  layout: 'left' | 'right' | 'center' | 'alternate' = 'left';

  /**
   * Timeline size
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Whether to show icons
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-icons' })
  showIcons = false;

  /**
   * Whether to show time labels
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-time-labels' })
  showTimeLabels = false;

  /**
   * Whether to use card style
   */
  @property({ type: Boolean, reflect: true })
  card = false;

  /**
   * Whether to show continuous line
   */
  @property({ type: Boolean, reflect: true })
  continuous = false;

  /**
   * Whether timeline is clickable
   */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  /**
   * Whether to reverse the order
   */
  @property({ type: Boolean, reflect: true })
  reverse = false;

  /**
   * Whether to auto-sort by time
   */
  @property({ type: Boolean, reflect: true, attribute: 'auto-sort' })
  autoSort = false;

  /**
   * ARIA label for accessibility
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel = 'Timeline';

  /**
   * Current window width for responsive behavior
   */
  @state()
  private _windowWidth = window.innerWidth;

  private _mediaQuery?: MediaQueryList;

  connectedCallback() {
    super.connectedCallback();

    // Setup responsive behavior
    this._setupResponsive();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupResponsive();
  }

  private _setupResponsive() {
    if (!('matchMedia' in window)) return;

    this._mediaQuery = window.matchMedia('(max-width: 768px)');
    this._mediaQuery.addListener(() => {
      this._windowWidth = window.innerWidth;
      this.requestUpdate();
    });
  }

  private _cleanupResponsive() {
    if (this._mediaQuery) {
      this._mediaQuery.removeListener(() => {});
    }
  }

  private _getTimelineItemsFromSlot(): TimelineItem[] {
    const slot = this.shadowRoot?.querySelector('slot:not([name])');
    if (!slot) return [];

    const assignedNodes = (slot as HTMLSlotElement).assignedNodes({ flatten: true });
    return assignedNodes
      .filter((node): node is HTMLElement => node.nodeType === Node.ELEMENT_NODE)
      .map((node: HTMLElement) => {
        const element = node as HTMLElement;
        const timeAttr = element.getAttribute('data-time');

        return {
          title: element.querySelector('h4, h3, .title')?.textContent?.trim() || undefined,
          content: element.querySelector('p, .content')?.textContent?.trim() || undefined,
          time: timeAttr || element.querySelector('time')?.getAttribute('datetime') || undefined,
          color: element.getAttribute('data-color') || undefined,
          icon: element.getAttribute('data-icon') || undefined,
          type: element.getAttribute('data-type') as TimelineItem['type'] || 'default',
          position: element.getAttribute('data-position') as TimelineItem['position'] || 'left',
          dot: !element.hasAttribute('no-dot'),
          line: !element.hasAttribute('no-line'),
          onClick: (_e: Event) => element.click?.(),
        };
      });
  }

  private _getAllItems(): TimelineItem[] {
    let items = this.items.length > 0 ? [...this.items] : this._getTimelineItemsFromSlot();

    // Auto-sort by time if enabled
    if (this.autoSort) {
      items.sort((a, b) => {
        const timeA = a.time ? new Date(a.time).getTime() : 0;
        const timeB = b.time ? new Date(b.time).getTime() : 0;
        return timeA - timeB;
      });
    }

    // Reverse order if specified
    if (this.reverse) {
      items.reverse();
    }

    return items;
  }

  private _formatTime(time?: string | Date): string {
    if (!time) return '';

    const date = typeof time === 'string' ? new Date(time) : time;
    if (isNaN(date.getTime())) return String(time);

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: date.getHours() || date.getMinutes() ? '2-digit' : undefined,
      minute: date.getMinutes() ? '2-digit' : undefined,
    });
  }

  private _getItemType(item: TimelineItem): string {
    return item.type || 'default';
  }

  private _getItemColor(item: TimelineItem): string {
    if (item.color) return item.color;

    const typeColors = {
      primary: 'var(--skill-primary-500, #0A59F7)',
      success: 'var(--skill-success-500, #00D4AA)',
      warning: 'var(--skill-warning-500, #FFB400)',
      error: 'var(--skill-error-500, #FA2A2D)',
      info: 'var(--skill-info-500, #0A59F7)',
      default: 'var(--skill-gray-500, #6B7280)',
    };

    return typeColors[item.type || 'default'];
  }

  private _getItemPosition(index: number, item: TimelineItem): string {
    if (this.layout === 'alternate') {
      return index % 2 === 0 ? 'left' : 'right';
    }
    return item.position || this.layout;
  }

  private _handleItemClick(item: TimelineItem, index: number, e: Event) {
    if (!this.clickable) return;

    e.preventDefault();

    // Execute custom click handler
    if (item.onClick) {
      item.onClick(e);
    }

    this._fireClickEvent(item, index, e);
  }

  private _fireClickEvent(item: TimelineItem, index: number, originalEvent: Event) {
    this.dispatchEvent(
      new CustomEvent('skill-timeline-click', {
        bubbles: true,
        composed: true,
        detail: {
          item,
          index,
          originalEvent,
          items: this._getAllItems(),
        },
      })
    );
  }

  private _renderDot(item: TimelineItem): TemplateResult {
    if (!item.dot) return html``;

    const color = this._getItemColor(item);

    return html`
      <div
        part="dot"
        class="skill-timeline__dot"
        style="--timeline-dot-color: ${color}"
      >
        ${item.icon && this.showIcons ? html`
          <slot name="icon">
            <skill-icon name="${item.icon}" size="sm"></skill-icon>
          </slot>
        ` : ''}
      </div>
    `;
  }

  private _renderContent(item: TimelineItem, index: number): TemplateResult {
    const position = this._getItemPosition(index, item);
    const isClickable = this.clickable;

    return html`
      <div
        part="content"
        class="skill-timeline__content skill-timeline__content--${position}"
        data-position="${position}"
        ?data-clickable=${isClickable}
        role="${isClickable ? 'button' : 'none'}"
        tabindex="${isClickable ? '0' : '-1'}"
        @click=${(e: Event) => this._handleItemClick(item, index, e)}
        @keydown=${(e: KeyboardEvent) => {
          if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            this._handleItemClick(item, index, e);
          }
        }}
      >
        ${this.card ? html`
          <div part="card" class="skill-timeline__card">
            ${this._renderContentInner(item)}
          </div>
        ` : this._renderContentInner(item)}
      </div>
    `;
  }

  private _renderContentInner(item: TimelineItem): TemplateResult {
    return html`
      ${item.title ? html`
        <slot name="title">
          <h4 part="title" class="skill-timeline__title">${item.title}</h4>
        </slot>
      ` : ''}

      ${item.content ? html`
        <slot name="content">
          <p part="description" class="skill-timeline__description">${item.content}</p>
        </slot>
      ` : ''}

      ${item.time && this.showTimeLabels ? html`
        <slot name="time">
          <time part="time" class="skill-timeline__time" datetime="${item.time}">
            ${this._formatTime(item.time)}
          </time>
        </slot>
      ` : ''}
    `;
  }

  private _renderLine(): TemplateResult {
    if (!this.continuous) return html``;

    return html`
      <div part="line" class="skill-timeline__line"></div>
    `;
  }

  private _renderItem(item: TimelineItem, index: number): TemplateResult {
    const position = this._getItemPosition(index, item);
    const type = this._getItemType(item);

    return html`
      <li
        part="item"
        class="skill-timeline__item skill-timeline__item--${type} skill-timeline__item--${position}"
        data-index="${index}"
        data-type="${type}"
        data-position="${position}"
      >
        ${this._renderDot(item)}
        ${this._renderLine()}
        ${this._renderContent(item, index)}
      </li>
    `;
  }

  render(): TemplateResult {
    const items = this._getAllItems();
    const direction = this._windowWidth < 768 ? 'vertical' : this.direction;

    return html`
      <div
        part="timeline"
        class="skill-timeline skill-timeline--${direction}"
        role="list"
        aria-label="${this.ariaLabel}"
      >
        <ol class="skill-timeline__list">
          ${items.map((item, index) => this._renderItem(item, index))}
        </ol>
      </div>
    `;
  }

  /**
   * Add a timeline item
   */
  public addItem(item: TimelineItem): void {
    this.items = [...this.items, item];
    this.requestUpdate();
  }

  /**
   * Remove a timeline item by index
   */
  public removeItem(index: number): void {
    this.items = this.items.filter((_, i) => i !== index);
    this.requestUpdate();
  }

  /**
   * Update a timeline item by index
   */
  public updateItem(index: number, item: Partial<TimelineItem>): void {
    this.items = this.items.map((existingItem, i) =>
      i === index ? { ...existingItem, ...item } : existingItem
    );
    this.requestUpdate();
  }

  /**
   * Clear all items
   */
  public clearItems(): void {
    this.items = [];
    this.requestUpdate();
  }

  /**
   * Get current state
   */
  public get state() {
    return {
      items: this._getAllItems(),
      direction: this.direction,
      layout: this.layout,
      size: this.size,
      clickable: this.clickable,
      reverse: this.reverse,
      autoSort: this.autoSort,
    };
  }

  /**
   * Get items count
   */
  public get itemCount(): number {
    return this._getAllItems().length;
  }

  /**
   * Focus the first item
   */
  public focus(): void {
    const firstItem = this.shadowRoot?.querySelector('.skill-timeline__item') as HTMLElement;
    if (firstItem) {
      firstItem.focus();
    }
  }

  /**
   * Sort items by time
   */
  public sortByTime(): void {
    if (this.items.length > 0) {
      this.autoSort = true;
      this.requestUpdate();
    }
  }

  /**
   * Toggle reverse order
   */
  public toggleReverse(): void {
    this.reverse = !this.reverse;
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-timeline': SkillTimeline;
  }
}