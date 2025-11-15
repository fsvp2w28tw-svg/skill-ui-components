import { LitElement, html, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tabsStyles } from './skill-tabs.styles';
import { baseStyles } from '../../../styles/base';
import type { Size } from '../../../types';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
  badge?: string | number;
  icon?: string;
  closable?: boolean;
}

/**
 * Skill Tabs Component
 *
 * @slot tab - Individual tab content
 * @slot tab-label - Custom tab label content
 * @slot tab-content - Tab panel content
 * @slot tab-badge - Custom badge content
 * @slot extra - Extra content in tab header
 *
 * @csspart tabs - Main tabs container
 * @csspart tab-list - Tab list container
 * @csspart tab - Individual tab element
 * @csspart tab-active - Active tab state
 * @csspart tab-disabled - Disabled tab state
 * @csspart tab-label - Tab label text
 * @csspart tab-badge - Tab badge element
 * @csspart tab-close - Tab close button
 * @csspart tab-panel - Tab panel container
 * @csspart indicator - Active tab indicator
 *
 * @cssprop --tabs-bg - Tabs background color
 * @cssprop --tab-bg - Tab background color
 * @cssprop --tab-active-bg - Active tab background
 * @cssprop --tab-color - Tab text color
 * @cssprop --tab-active-color - Active tab color
 * @cssprop --tab-border-color - Tab border color
 *
 * @fires skill-change - Dispatched when active tab changes
 * @fires skill-tab-click - Dispatched when tab is clicked
 * @fires skill-tab-add - Dispatched when tab is added
 * @fires skill-tab-remove - Dispatched when tab is removed
 *
 * @example
 * ```html
 * <skill-tabs
 *   .value=${this.activeTab}
 *   @skill-change=${this.handleTabChange}
 * >
 *   <skill-tab id="tab1" label="Profile">Profile content</skill-tab>
 *   <skill-tab id="tab2" label="Settings">Settings content</skill-tab>
 *   <skill-tab id="tab3" label="Notifications">Notifications content</skill-tab>
 * </skill-tabs>
 * ```
 */
@customElement('skill-tabs')
export class SkillTabs extends LitElement {
  static styles = [baseStyles, tabsStyles];

  // @query('.skill-tabs-list')
  // private _tabList!: HTMLElement;

  // @query('.skill-tabs-panels')
  // private _panels!: HTMLElement;

  /**
   * Currently active tab value
   */
  @property({ type: String, reflect: true })
  value = '';

  /**
   * Tab items configuration
   */
  @property({ type: Array, hasChanged: () => true })
  items: TabItem[] = [];

  /**
   * Tabs size variant
   */
  @property({ type: String, reflect: true })
  size: Extract<Size, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> = 'md';

  /**
   * Tabs visual variant
   */
  @property({ type: String, reflect: true })
  variant: 'default' | 'pills' | 'underline' | 'bordered' = 'default';

  /**
   * Tabs orientation
   */
  @property({ type: String, reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Tabs position (for horizontal orientation)
   */
  @property({ type: String, reflect: true })
  position: 'top' | 'bottom' = 'top';

  /**
   * Allow adding/removing tabs
   */
  @property({ type: Boolean, reflect: true, attribute: 'editable' })
  editable = false;

  /**
   * Show tab close buttons
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-close-buttons' })
  showCloseButtons = false;

  /**
   * Enable lazy loading of tab content
   */
  @property({ type: Boolean, reflect: true, attribute: 'lazy' })
  lazy = false;

  /**
   * Keep removed tabs in DOM (for state preservation)
   */
  @property({ type: Boolean, reflect: true, attribute: 'keep-removed' })
  keepRemoved = false;

  /**
   * Scrollable tabs when overflow
   */
  @property({ type: Boolean, reflect: true, attribute: 'scrollable' })
  scrollable = false;

  /**
   * Show active tab indicator
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-indicator' })
  showIndicator = true;

  /**
   * Center align tabs
   */
  @property({ type: Boolean, reflect: true, attribute: 'center' })
  center = false;

  /**
   * Current active tab index
   */
  @state()
  private _activeIndex = 0;

  /**
   * Loaded tabs (for lazy loading)
   */
  @state()
  private _loadedTabs = new Set<string>();

  /**
   * Removed tabs (for state preservation)
   */
  @state()
  private _removedTabs = new Set<string>();

  connectedCallback() {
    super.connectedCallback();

    // Add keyboard navigation
    this.addEventListener('keydown', this._handleKeydown.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('keydown', this._handleKeydown.bind(this));
  }

  protected update(changedProperties: PropertyValues<this>) {
    super.update(changedProperties);

    // Update active index when items or value changes
    if (changedProperties.has('items') || changedProperties.has('value')) {
      this._updateActiveIndex();
    }
  }

  private _updateActiveIndex() {
    if (!this.value && this.items.length > 0) {
      this.value = this.items[0].id;
    }

    const index = this.items.findIndex(item => item.id === this.value);
    this._activeIndex = Math.max(0, index);
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (this.items.length === 0) return;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        this._navigateTab(-1);
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        this._navigateTab(1);
        break;

      case 'Home':
        e.preventDefault();
        this._selectTabByIndex(0);
        break;

      case 'End':
        e.preventDefault();
        this._selectTabByIndex(this.items.length - 1);
        break;
    }
  }

  private _navigateTab(direction: number) {
    let newIndex = this._activeIndex + direction;
    const enabledTabs = this.items
      .map((item, index) => ({ ...item, index }))
      .filter(item => !item.disabled && !this._removedTabs.has(item.id));

    if (enabledTabs.length === 0) return;

    // Wrap around
    if (newIndex < 0) newIndex = this.items.length - 1;
    if (newIndex >= this.items.length) newIndex = 0;

    // Find next enabled tab
    while (newIndex !== this._activeIndex) {
      const item = this.items[newIndex];
      if (!item.disabled && !this._removedTabs.has(item.id)) {
        this._selectTabByIndex(newIndex);
        break;
      }

      newIndex = (newIndex + direction + this.items.length) % this.items.length;
    }
  }

  private _selectTabByIndex(index: number) {
    const item = this.items[index];
    if (item && !item.disabled && !this._removedTabs.has(item.id)) {
      this.value = item.id;
      this._activeIndex = index;

      // Load tab content if lazy loading
      if (this.lazy && !this._loadedTabs.has(item.id)) {
        this._loadedTabs.add(item.id);
      }

      this._dispatchChangeEvent(item);
    }
  }

  private _handleTabClick(item: TabItem, e: Event) {
    e.preventDefault();

    if (item.disabled || this._removedTabs.has(item.id)) return;

    const index = this.items.indexOf(item);
    this._selectTabByIndex(index);

    this.dispatchEvent(new CustomEvent('skill-tab-click', {
      bubbles: true,
      composed: true,
      detail: { item, index }
    }));
  }

  private _handleTabClose(item: TabItem, e: Event) {
    e.preventDefault();
    e.stopPropagation();

    this.dispatchEvent(new CustomEvent('skill-tab-remove', {
      bubbles: true,
      composed: true,
      detail: { item }
    }));

    if (this.keepRemoved) {
      this._removedTabs.add(item.id);
    } else {
      const index = this.items.indexOf(item);
      this.items.splice(index, 1);

      // Update active tab if necessary
      if (this.value === item.id) {
        if (this.items.length > 0) {
          this.value = this.items[Math.min(index, this.items.length - 1)].id;
        } else {
          this.value = '';
        }
      }
    }
  }

  private _handleAddTab() {
    const newTab: TabItem = {
      id: `tab-${Date.now()}`,
      label: `Tab ${this.items.length + 1}`,
      closable: true
    };

    this.items = [...this.items, newTab];

    this.dispatchEvent(new CustomEvent('skill-tab-add', {
      bubbles: true,
      composed: true,
      detail: { tab: newTab }
    }));

    // Select the new tab
    this.value = newTab.id;
  }

  private _dispatchChangeEvent(item: TabItem) {
    this.dispatchEvent(new CustomEvent('skill-change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
        item,
        index: this._activeIndex
      }
    }));
  }

  private _renderTabList() {
    if (this.orientation === 'vertical') {
      return this._renderVerticalTabList();
    } else {
      return this._renderHorizontalTabList();
    }
  }

  private _renderHorizontalTabList() {
    // const isBottom = this.position === 'bottom';

    return html`
      <div class="skill-tabs-list skill-tabs-list--horizontal ${this.scrollable ? 'skill-tabs-list--scrollable' : ''}">
        <div class="skill-tabs-nav" role="tablist">
          ${this.items.map((item) => this._renderTab(item, this.items.indexOf(item)))}

          ${this.editable
            ? html`
                <button
                  class="skill-tabs-add"
                  @click=${this._handleAddTab}
                  aria-label="Add new tab"
                  type="button"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                </button>
              `
            : nothing
          }

          ${this.showIndicator && this._activeIndex >= 0
            ? html`
                <div
                  class="skill-tabs-indicator"
                  style=${this._getIndicatorStyle()}
                ></div>
              `
            : nothing
          }
        </div>
      </div>
    `;
  }

  private _renderVerticalTabList() {
    return html`
      <div class="skill-tabs-list skill-tabs-list--vertical">
        <div class="skill-tabs-nav" role="tablist" aria-orientation="vertical">
          ${this.items.map((item) => this._renderTab(item, this.items.indexOf(item)))}

          ${this.editable
            ? html`
                <button
                  class="skill-tabs-add"
                  @click=${this._handleAddTab}
                  aria-label="Add new tab"
                  type="button"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                </button>
              `
            : nothing
          }
        </div>
      </div>
    `;
  }

  private _renderTab(item: TabItem, _index: number) {
    const isActive = item.id === this.value;
    const isDisabled = item.disabled || this._removedTabs.has(item.id);
    const showClose = (item.closable || this.showCloseButtons) && this.editable;

    return html`
      <button
        part="tab"
        class="
          skill-tabs-tab
          ${isActive ? 'skill-tabs-tab--active' : ''}
          ${isDisabled ? 'skill-tabs-tab--disabled' : ''}
          ${this.variant ? `skill-tabs-tab--${this.variant}` : ''}
        "
        role="tab"
        aria-selected=${isActive ? 'true' : 'false'}
        aria-controls=${`panel-${item.id}`}
        aria-disabled=${isDisabled ? 'true' : 'false'}
        tabindex=${isActive ? '0' : '-1'}
        @click=${(e: Event) => this._handleTabClick(item, e)}
      >
        <slot name="tab-label">
          <span part="tab-label" class="skill-tabs-tab-label">
            ${item.icon ? html`<span class="skill-tabs-tab-icon">${item.icon}</span>` : nothing}
            ${item.label}
          </span>
        </slot>

        ${item.badge
          ? html`
              <slot name="tab-badge">
                <span part="tab-badge" class="skill-tabs-tab-badge">${item.badge}</span>
              </slot>
            `
          : nothing
        }

        ${showClose
          ? html`
              <button
                part="tab-close"
                class="skill-tabs-tab-close"
                @click=${(e: Event) => this._handleTabClose(item, e)}
                aria-label="Close tab"
                type="button"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L6 5.293l3.146-3.147a.5.5 0 0 1 .708.708L6.707 6l3.147 3.146a.5.5 0 0 1-.708.708L6 6.707l-3.146 3.147a.5.5 0 0 1-.708-.708L5.293 6 2.146 2.854z"/>
                </svg>
              </button>
            `
          : nothing
        }
      </button>
    `;
  }

  private _getIndicatorStyle() {
    if (this.orientation === 'vertical') return '';

    const activeTab = this.shadowRoot?.querySelector('.skill-tabs-tab--active') as HTMLElement;
    if (!activeTab) return '';

    return `width: ${activeTab.offsetWidth}px; transform: translateX(${activeTab.offsetLeft}px)`;
  }

  private _renderTabPanels() {
    if (this.position === 'bottom') {
      return html`
        ${this._renderTabList()}
        <div class="skill-tabs-panels">
          ${this.items.map(item => this._renderTabPanel(item))}
        </div>
      `;
    } else {
      return html`
        <div class="skill-tabs-panels">
          ${this.items.map(item => this._renderTabPanel(item))}
        </div>
        ${this._renderTabList()}
      `;
    }
  }

  private _renderTabPanel(item: TabItem) {
    const isActive = item.id === this.value;
    const isLoaded = !this.lazy || this._loadedTabs.has(item.id);
    const isRemoved = this._removedTabs.has(item.id);

    if (!isLoaded || isRemoved) return nothing;

    return html`
      <div
        part="tab-panel"
        class="skill-tabs-panel ${isActive ? 'skill-tabs-panel--active' : ''}"
        role="tabpanel"
        id=${`panel-${item.id}`}
        aria-labelledby=${item.id}
        ?hidden=${!isActive}
      >
        <slot name="tab-content">
          <!-- Default content or slot content will go here -->
        </slot>
      </div>
    `;
  }

  render() {
    if (this.items.length === 0) {
      return html`
        <div class="skill-tabs-empty">
          <slot name="empty">
            <p>No tabs available</p>
          </slot>
        </div>
      `;
    }

    const containerClasses = [
      'skill-tabs',
      `skill-tabs--${this.orientation}`,
      `skill-tabs--${this.variant}`,
      `skill-tabs--${this.size}`,
      `skill-tabs--position-${this.position}`,
      this.center ? 'skill-tabs--center' : '',
      this.editable ? 'skill-tabs--editable' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class="${containerClasses}">
        <slot name="extra"></slot>
        ${this._renderTabPanels()}
      </div>
    `;
  }

  /**
   * Select a tab by its ID
   */
  public selectTab(id: string) {
    const index = this.items.findIndex(item => item.id === id);
    if (index >= 0) {
      this._selectTabByIndex(index);
    }
  }

  /**
   * Get current active tab
   */
  public getActiveTab(): TabItem | undefined {
    return this.items.find(item => item.id === this.value);
  }

  /**
   * Add a new tab
   */
  public addTab(item: TabItem) {
    this.items = [...this.items, item];
    return item;
  }

  /**
   * Remove a tab
   */
  public removeTab(id: string) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      this._handleTabClose(item, new Event('remove'));
    }
  }

  /**
   * Get all tabs
   */
  public getTabs(): TabItem[] {
    return this.items;
  }

  /**
   * Check if a tab is active
   */
  public isTabActive(id: string): boolean {
    return this.value === id;
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-tabs': SkillTabs;
  }
}