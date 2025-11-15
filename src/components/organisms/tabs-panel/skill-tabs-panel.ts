import { LitElement, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { tabsPanelStyles } from './tabs-panel.styles.js';
import type {
  TabsPanelTab,
  TabsConfig,
  TabsState,
  TabsEvent,
  KeyboardShortcut
} from './types.js';

/**
 * Tabs Panel Component - 通用标签页容器系统
 *
 * @element skill-tabs-panel
 *
 * @slot tab - 标签页内容，使用 data-title 属性指定标题
 *
 * @csspart container - 标签页容器
 * @csspart header - 标签页头部
 * @csspart nav - 标签页导航
 * @csspart list - 标签页列表
 * @csspart tab - 标签页项
 * @csspart tab-active - 激活的标签页
 * @csspart tab-close - 关闭按钮
 * @csspart tab-add - 添加按钮
 * @csspart content - 内容区域
 * @csspart panel - 内容面板
 *
 * @cssprop --skill-tabs-bg - 标签页背景色
 * @cssprop --skill-tabs-border-color - 边框颜色
 * @cssprop --skill-tabs-text-color - 文本颜色
 * @cssprop --skill-tabs-text-active-color - 激活文本颜色
 * @cssprop --skill-tabs-indicator-color - 指示器颜色
 * @cssprop --skill-tabs-gap - 标签页间距
 * @cssprop --skill-tabs-padding - 内边距
 * @cssprop --skill-tabs-transition - 过渡动画
 *
 * @fires skill-tabs-change - 标签页切换时触发
 * @fires skill-tabs-add - 添加标签页时触发
 * @fires skill-tabs-close - 关闭标签页时触发
 * @fires skill-tabs-reorder - 标签页重排时触发
 *
 * @example
 * ```html
 * <skill-tabs-panel
 *   .config="${{ variant: 'card', closable: true, draggable: true }}"
 *   @skill-tabs-change="${handleChange}"
 * >
 *   <div slot="tab" data-title="标签1">内容1</div>
 *   <div slot="tab" data-title="标签2">内容2</div>
 *   <div slot="tab" data-title="标签3" data-closable="false">内容3</div>
 * </skill-tabs-panel>
 * ```
 */
@customElement('skill-tabs-panel')
export class SkillTabsPanel extends LitElement {
  static styles = tabsPanelStyles;

  /**
   * 标签页配置
   */
  @property({ type: Object })
  config: TabsConfig = {};

  /**
   * 主题
   */
  @property({ type: String, reflect: true })
  theme?: 'light' | 'dark' | 'auto' = 'light';

  /**
   * 当前状态
   */
  @state()
  private _state: TabsState = {
    activeId: null,
    tabs: [],
    isDragging: false,
    draggingId: null,
    dropIndex: null,
    loadedTabs: new Set()
  };

  @query('.tabs-nav')
  private _tabsNav!: HTMLDivElement;

  @query('.tabs-list')
  private _tabsList!: HTMLDivElement;

  // 默认配置
  private get _defaultConfig(): Required<TabsConfig> {
    return {
      position: 'top',
      variant: 'line',
      size: 'medium',
      draggable: false,
      closable: false,
      overflow: 'scroll',
      lazyLoad: false,
      addable: false,
      maxTabWidth: 200,
      minTabWidth: 80,
      persistState: false,
      storageKey: 'skill-tabs-state',
      showKeyboardHints: false,
      animationDuration: 300
    };
  }

  // 获取最终配置
  private get _finalConfig(): Required<TabsConfig> {
    return { ...this._defaultConfig, ...this.config };
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadPersistedState();
    this._initializeFromSlots();
    this._setupKeyboardShortcuts();
  }

  /**
   * 从插槽初始化标签页
   */
  private async _initializeFromSlots() {
    const slots = this.querySelectorAll('[slot="tab"]');
    const tabs: TabsPanelTab[] = [];

    for (const slot of slots) {
      const element = slot as HTMLElement;
      const tab: TabsPanelTab = {
        id: element.dataset.id || `tab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: element.dataset.title || '未命名标签页',
        content: element.outerHTML,
        closable: element.dataset.closable !== 'false',
        disabled: element.dataset.disabled === 'true',
        icon: element.dataset.icon,
        badge: element.dataset.badge,
        tooltip: element.dataset.tooltip,
        lazy: element.dataset.lazy === 'true',
        className: element.className,
        data: element.dataset
      };

      tabs.push(tab);
    }

    this._state.tabs = tabs;

    // 设置默认激活标签页
    if (!this._state.activeId && tabs.length > 0) {
      this._state.activeId = tabs[0].id;
    }

    this.requestUpdate();
  }

  /**
   * 加载持久化状态
   */
  private _loadPersistedState() {
    const config = this._finalConfig;

    if (!config.persistState || typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(config.storageKey);
      if (stored) {
        const parsedState = JSON.parse(stored);
        this._state = {
          ...this._state,
          ...parsedState,
          loadedTabs: new Set(parsedState.loadedTabs || [])
        };
      }
    } catch (error) {
      console.warn('Failed to load persisted tabs state:', error);
    }
  }

  /**
   * 保存状态到本地存储
   */
  private _persistState() {
    const config = this._finalConfig;

    if (!config.persistState || typeof window === 'undefined') return;

    try {
      const stateToSave = {
        ...this._state,
        loadedTabs: Array.from(this._state.loadedTabs)
      };
      localStorage.setItem(config.storageKey, JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('Failed to persist tabs state:', error);
    }
  }

  /**
   * 设置键盘快捷键
   */
  private _setupKeyboardShortcuts() {
    const config = this._finalConfig;

    if (!config.showKeyboardHints) return;

    const shortcuts: KeyboardShortcut[] = [
      {
        key: 'ArrowLeft',
        ctrlKey: true,
        description: '切换到上一个标签页',
        action: () => this._navigateTab(-1)
      },
      {
        key: 'ArrowRight',
        ctrlKey: true,
        description: '切换到下一个标签页',
        action: () => this._navigateTab(1)
      },
      {
        key: 'w',
        ctrlKey: true,
        description: '关闭当前标签页',
        action: () => this._closeTab(this._state.activeId)
      },
      {
        key: 't',
        ctrlKey: true,
        description: '添加新标签页',
        action: () => this._addTab()
      }
    ];

    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = shortcuts.find(s =>
        s.key === event.key &&
        !!s.ctrlKey === event.ctrlKey &&
        !!s.altKey === event.altKey &&
        !!s.shiftKey === event.shiftKey
      );

      if (shortcut) {
        event.preventDefault();
        shortcut.action();
      }
    };

    this.addEventListener('keydown', handleKeyDown);
  }

  /**
   * 导航标签页
   */
  private _navigateTab(direction: number) {
    const currentIndex = this._state.tabs.findIndex(tab => tab.id === this._state.activeId);
    if (currentIndex === -1) return;

    const newIndex = (currentIndex + direction + this._state.tabs.length) % this._state.tabs.length;
    const newTab = this._state.tabs[newIndex];

    if (newTab && !newTab.disabled) {
      this._activateTab(newTab.id);
    }
  }

  /**
   * 激活标签页
   */
  private _activateTab(tabId: string) {
    if (this._state.activeId === tabId) return;

    this._state.activeId = tabId;
    this._loadTabContent(tabId);
    this._persistState();
    this.requestUpdate();
    this._emitChangeEvent(tabId);
  }

  /**
   * 加载标签页内容
   */
  private async _loadTabContent(tabId: string) {
    const config = this._finalConfig;
    const tab = this._state.tabs.find(t => t.id === tabId);

    if (!tab || !config.lazyLoad || this._state.loadedTabs.has(tabId)) return;

    try {
      if (typeof tab.content === 'string' && tab.content.startsWith('http')) {
        // 如果是 URL，则获取内容
        const response = await fetch(tab.content);
        tab.content = await response.text();
      }

      this._state.loadedTabs.add(tabId);
      this._persistState();
    } catch (error) {
      console.error(`Failed to load content for tab ${tabId}:`, error);
    }
  }

  /**
   * 关闭标签页
   */
  private _closeTab(tabId: string | null) {
    if (!tabId) return;

    const tabIndex = this._state.tabs.findIndex(tab => tab.id === tabId);
    if (tabIndex === -1) return;

    const tab = this._state.tabs[tabIndex];
    if (!tab.closable || tab.disabled) return;

    // 移除标签页
    this._state.tabs = this._state.tabs.filter(t => t.id !== tabId);
    this._state.loadedTabs.delete(tabId);

    // 如果关闭的是当前激活的标签页，切换到其他标签页
    if (this._state.activeId === tabId) {
      const newActiveIndex = Math.min(tabIndex, this._state.tabs.length - 1);
      const newActiveTab = this._state.tabs[newActiveIndex];
      this._state.activeId = newActiveTab?.id || null;
    }

    this._persistState();
    this.requestUpdate();
    this._emitCloseEvent(tabId, tab);
  }

  /**
   * 添加标签页
   */
  private _addTab() {
    const config = this._finalConfig;

    if (!config.addable) return;

    const newTab: TabsPanelTab = {
      id: `tab-${Date.now()}`,
      title: '新标签页',
      content: '<div>新标签页内容</div>',
      closable: true,
      disabled: false
    };

    this._state.tabs.push(newTab);
    this._state.activeId = newTab.id;

    this._persistState();
    this.requestUpdate();
    this._emitAddEvent(newTab);
  }

  /**
   * 开始拖拽
   */
  private _handleDragStart = (event: DragEvent, tabId: string) => {
    const config = this._finalConfig;

    if (!config.draggable) return;

    event.dataTransfer?.setData('text/plain', tabId);
    this._state.isDragging = true;
    this._state.draggingId = tabId;

    this.toggleAttribute('dragging', true);
    this.requestUpdate();
  };

  /**
   * 拖拽经过
   */
  private _handleDragOver = (event: DragEvent, targetId: string) => {
    event.preventDefault();

    if (!this._state.isDragging || !this._state.draggingId) return;

    const targetIndex = this._state.tabs.findIndex(tab => tab.id === targetId);
    if (targetIndex !== -1) {
      this._state.dropIndex = targetIndex;
      this.requestUpdate();
    }
  };

  /**
   * 拖拽结束
   */
  private _handleDrop = (event: DragEvent, targetId: string) => {
    event.preventDefault();

    if (!this._state.isDragging || !this._state.draggingId) return;

    const sourceIndex = this._state.tabs.findIndex(tab => tab.id === this._state.draggingId);
    const targetIndex = this._state.tabs.findIndex(tab => tab.id === targetId);

    if (sourceIndex !== -1 && targetIndex !== -1 && sourceIndex !== targetIndex) {
      const [draggedTab] = this._state.tabs.splice(sourceIndex, 1);
      this._state.tabs.splice(targetIndex, 0, draggedTab);

      this._persistState();
      this._emitReorderEvent(this._state.draggingId, sourceIndex, targetIndex);
    }

    this._resetDragState();
  };

  /**
   * 重置拖拽状态
   */
  private _resetDragState() {
    this._state.isDragging = false;
    this._state.draggingId = null;
    this._state.dropIndex = null;

    this.toggleAttribute('dragging', false);
    this.requestUpdate();
  }

  /**
   * 发送变化事件
   */
  private _emitChangeEvent(tabId: string) {
    const tab = this._state.tabs.find(t => t.id === tabId);
    this.dispatchEvent(new CustomEvent('skill-tabs-change', {
      detail: {
        type: 'change',
        tabId,
        tab,
        data: this._state
      } as TabsEvent
    }));
  }

  /**
   * 发送关闭事件
   */
  private _emitCloseEvent(tabId: string, tab: TabsPanelTab) {
    this.dispatchEvent(new CustomEvent('skill-tabs-close', {
      detail: {
        type: 'close',
        tabId,
        tab,
        data: this._state
      } as TabsEvent
    }));
  }

  /**
   * 发送添加事件
   */
  private _emitAddEvent(tab: TabsPanelTab) {
    this.dispatchEvent(new CustomEvent('skill-tabs-add', {
      detail: {
        type: 'add',
        tabId: tab.id,
        tab,
        data: this._state
      } as TabsEvent
    }));
  }

  /**
   * 发送重排事件
   */
  private _emitReorderEvent(tabId: string, fromIndex: number, toIndex: number) {
    const tab = this._state.tabs.find(t => t.id === tabId);
    this.dispatchEvent(new CustomEvent('skill-tabs-reorder', {
      detail: {
        type: 'reorder',
        tabId,
        tab,
        index: fromIndex,
        newIndex: toIndex,
        data: this._state
      } as TabsEvent
    }));
  }

  /**
   * 渲染标签页项
   */
  private _renderTabItem(tab: TabsPanelTab, index: number) {
    const config = this._finalConfig;
    const isActive = this._state.activeId === tab.id;
    const isDragging = this._state.draggingId === tab.id;
    const isDragOver = this._state.dropIndex === index;

    const classes = [
      'tab-item',
      isActive ? 'active' : '',
      tab.disabled ? 'disabled' : '',
      isDragging ? 'dragging' : '',
      isDragOver ? 'drag-over' : '',
      tab.className || ''
    ].filter(Boolean).join(' ');

    return html`
      <div
        class="${classes}"
        part="tab ${isActive ? 'tab-active' : ''}"
        role="tab"
        aria-selected="${isActive}"
        aria-disabled="${tab.disabled}"
        tabindex="${tab.disabled ? -1 : 0}"
        data-tab-id="${tab.id}"
        @click="${() => !tab.disabled && this._activateTab(tab.id)}"
        draggable="${config.draggable && !tab.disabled}"
        @dragstart="${(e: DragEvent) => this._handleDragStart(e, tab.id)}"
        @dragover="${(e: DragEvent) => this._handleDragOver(e, tab.id)}"
        @drop="${(e: DragEvent) => this._handleDrop(e, tab.id)}"
        title="${tab.tooltip || tab.title}"
      >
        ${tab.icon ? html`<span class="tab-icon">${tab.icon}</span>` : ''}
        <span class="tab-title">${tab.title}</span>
        ${tab.badge ? html`<span class="tab-badge">${tab.badge}</span>` : ''}
        ${config.closable && tab.closable ? html`
          <button
            class="tab-close"
            part="tab-close"
            @click="${(e: Event) => {
              e.stopPropagation();
              this._closeTab(tab.id);
            }}"
            title="关闭标签页"
            aria-label="关闭标签页"
          >
            ×
          </button>
        ` : ''}
      </div>
    `;
  }

  /**
   * 渲染内容面板
   */
  private _renderTabPanel(tab: TabsPanelTab) {
    const isActive = this._state.activeId === tab.id;
    const isLoaded = !tab.lazy || this._state.loadedTabs.has(tab.id);
    const config = this._finalConfig;

    if (!isActive) return nothing;

    return html`
      <div
        class="tab-panel ${isActive ? 'active' : ''} ${!isLoaded ? 'loading' : ''}"
        part="panel"
        role="tabpanel"
        aria-labelledby="${tab.id}"
      >
        ${!isLoaded ? html`
          <div class="tab-loading">
            <div>加载中...</div>
          </div>
        ` : html`
          ${typeof tab.content === 'string' ? unsafeCSS(tab.content) : tab.content}
        `}
      </div>
    `;
  }

  render() {
    const config = this._finalConfig;

    return html`
      <div
        class="tabs-panel"
        part="container"
        position="${config.position}"
        variant="${config.variant}"
        size="${config.size}"
      >
        <div class="tabs-header" part="header">
          <div class="tabs-nav" part="nav">
            <div class="tabs-scroll-container">
              <div class="tabs-list" part="list">
                ${this._state.tabs.map((tab, index) => this._renderTabItem(tab, index))}
              </div>
            </div>
          </div>

          ${config.addable ? html`
            <button
              class="tab-add"
              part="tab-add"
              @click="${this._addTab}"
              title="添加新标签页"
              aria-label="添加新标签页"
            >
              +
            </button>
          ` : ''}
        </div>

        <div class="tabs-content" part="content">
          ${this._state.tabs.map(tab => this._renderTabPanel(tab))}
        </div>
      </div>
    `;
  }

  /**
   * 获取当前状态
   */
  public getState(): TabsState {
    return {
      ...this._state,
      loadedTabs: new Set(this._state.loadedTabs)
    };
  }

  /**
   * 添加标签页
   */
  public addTab(tab: TabsPanelTab) {
    this._state.tabs.push(tab);

    if (!this._state.activeId) {
      this._state.activeId = tab.id;
    }

    this._persistState();
    this.requestUpdate();
    this._emitAddEvent(tab);
  }

  /**
   * 移除标签页
   */
  public removeTab(tabId: string) {
    this._closeTab(tabId);
  }

  /**
   * 激活指定标签页
   */
  public activateTab(tabId: string) {
    this._activateTab(tabId);
  }

  /**
   * 获取所有标签页
   */
  public getTabs(): TabsPanelTab[] {
    return [...this._state.tabs];
  }

  /**
   * 获取当前激活的标签页
   */
  public getActiveTab(): TabsPanelTab | null {
    return this._state.tabs.find(tab => tab.id === this._state.activeId) || null;
  }

  /**
   * 重置到初始状态
   */
  public reset() {
    this._state = {
      activeId: null,
      tabs: [],
      isDragging: false,
      draggingId: null,
      dropIndex: null,
      loadedTabs: new Set()
    };

    this._initializeFromSlots();
    this._persistState();
    this.requestUpdate();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resetDragState();
  }
}