import { LitElement, html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { sortableContainerStyles } from './sortable-container.styles.js';
import type {
  SortableItem,
  SortableConfig,
  SortableState,
  SortableEvent,
  DragPreview,
  DropZone
} from './types.js';

/**
 * Sortable Container Component - 可排序列表容器
 *
 * @element skill-sortable-container
 *
 * @slot item - 排序项目，使用 data-id 属性指定标识
 *
 * @csspart container - 排序容器
 * @csspart item - 排序项目
 * @csspart item-dragging - 拖拽中的项目
 * @csspart item-disabled - 禁用的项目
 * @csspart handle - 拖拽手柄
 * @csspart placeholder - 占位符
 * @csspart drop-indicator - 放置指示器
 *
 * @cssprop --skill-sortable-bg - 背景色
 * @cssprop --skill-sortable-border-color - 边框颜色
 * @cssprop --skill-sortable-drag-border-color - 拖拽边框颜色
 * @cssprop --skill-sortable-drop-indicator-color - 放置指示器颜色
 * @cssprop --skill-sortable-gap - 项目间距
 * @cssprop --skill-sortable-transition - 过渡动画
 * @cssprop --skill-drag-opacity - 拖拽透明度
 *
 * @fires skill-sortable-start - 开始拖拽时触发
 * @fires skill-sortable-move - 拖拽移动时触发
 * @fires skill-sortable-end - 结束拖拽时触发
 * @fires skill-sortable-change - 项目顺序变化时触发
 *
 * @example
 * ```html
 * <skill-sortable-container
 *   .config="${{ layout: 'list', handle: true, animation: true }}"
 *   @skill-sortable-change="${handleChange}"
 * >
 *   <div slot="item" data-id="1">项目 1</div>
 *   <div slot="item" data-id="2">项目 2</div>
 *   <div slot="item" data-id="3">项目 3</div>
 * </skill-sortable-container>
 * ```
 */
@customElement('skill-sortable-container')
export class SkillSortableContainer extends LitElement {
  static styles = sortableContainerStyles;

  /**
   * 排序配置
   */
  @property({ type: Object })
  config: SortableConfig = {};

  /**
   * 主题
   */
  @property({ type: String, reflect: true })
  theme?: 'light' | 'dark' | 'auto' = 'light';

  /**
   * 当前状态
   */
  @state()
  private _state: SortableState = {
    items: [],
    isDragging: false,
    draggingId: null,
    dragStartIndex: null,
    dragCurrentIndex: null,
    dropIndex: null,
    dragStartPos: { x: 0, y: 0 },
    dragCurrentPos: { x: 0, y: 0 }
  };

  @query('.sortable-container')
  private _container!: HTMLDivElement;

  private _dragPreview: DragPreview | null = null;
  private _dropIndicator: HTMLElement | null = null;
  private _autoScrollInterval: number | null = null;
  private _containerId = `sortable-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // 默认配置
  private get _defaultConfig(): Required<SortableConfig> {
    return {
      direction: 'vertical',
      layout: 'list',
      handle: false,
      handleContent: '⋮⋮',
      placeholder: '',
      animation: true,
      animationDuration: 300,
      dragOpacity: 0.8,
      autoScroll: true,
      scrollSpeed: 5,
      dragThreshold: 5,
      spacing: 'normal',
      group: '',
      allowDropIn: true,
      allowDropOut: true,
      maxHeight: '',
      maxWidth: '',
      showPreview: true,
      persistState: false,
      storageKey: 'skill-sortable-state'
    };
  }

  // 获取最终配置
  private get _finalConfig(): Required<SortableConfig> {
    const config = { ...this._defaultConfig, ...this.config };

    // 设置CSS变量
    this.style.setProperty('--skill-drag-opacity', config.dragOpacity.toString());
    this.style.setProperty('--skill-animation-duration', `${config.animationDuration}ms`);

    return config;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadPersistedState();
    this._initializeFromSlots();
    this._setupGlobalListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanup();
    this._removeGlobalListeners();
  }

  /**
   * 从插槽初始化项目
   */
  private async _initializeFromSlots() {
    const slots = this.querySelectorAll('[slot="item"]');
    const items: SortableItem[] = [];

    for (const slot of slots) {
      const element = slot as HTMLElement;
      const item: SortableItem = {
        id: element.dataset.id || `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        content: element.outerHTML,
        disabled: element.dataset.disabled === 'true',
        className: element.className,
        handle: element.dataset.handle,
        weight: parseInt(element.dataset.weight || '0'),
        crossContainer: element.dataset.crossContainer !== 'false',
        group: element.dataset.group || this._finalConfig.group,
        data: element.dataset
      };

      items.push(item);
    }

    this._state.items = items;
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
        if (parsedState.items && Array.isArray(parsedState.items)) {
          this._state.items = parsedState.items;
        }
      }
    } catch (error) {
      console.warn('Failed to load persisted sortable state:', error);
    }
  }

  /**
   * 保存状态到本地存储
   */
  private _persistState() {
    const config = this._finalConfig;

    if (!config.persistState || typeof window === 'undefined') return;

    try {
      localStorage.setItem(config.storageKey, JSON.stringify({
        items: this._state.items
      }));
    } catch (error) {
      console.warn('Failed to persist sortable state:', error);
    }
  }

  /**
   * 设置全局事件监听器
   */
  private _setupGlobalListeners() {
    document.addEventListener('mousemove', this._handleGlobalMouseMove);
    document.addEventListener('mouseup', this._handleGlobalMouseUp);
    document.addEventListener('touchmove', this._handleGlobalTouchMove, { passive: false });
    document.addEventListener('touchend', this._handleGlobalTouchEnd);
  }

  /**
   * 移除全局事件监听器
   */
  private _removeGlobalListeners() {
    document.removeEventListener('mousemove', this._handleGlobalMouseMove);
    document.removeEventListener('mouseup', this._handleGlobalMouseUp);
    document.removeEventListener('touchmove', this._handleGlobalTouchMove);
    document.removeEventListener('touchend', this._handleGlobalTouchEnd);
  }

  /**
   * 开始拖拽
   */
  private _handleDragStart = (event: MouseEvent | TouchEvent, itemId: string) => {
    const config = this._finalConfig;
    const item = this._state.items.find(i => i.id === itemId);

    if (!item || item.disabled) return;

    event.preventDefault();

    const clientEvent = 'touches' in event ? event.touches[0] : event;
    const startIndex = this._state.items.findIndex(i => i.id === itemId);

    this._state.isDragging = true;
    this._state.draggingId = itemId;
    this._state.dragStartIndex = startIndex;
    this._state.dragCurrentIndex = startIndex;
    this._state.dragStartPos = { x: clientEvent.clientX, y: clientEvent.clientY };
    this._state.dragCurrentPos = { x: clientEvent.clientX, y: clientEvent.clientY };

    this.toggleAttribute('dragging', true);

    // 创建拖拽预览
    if (config.showPreview) {
      this._createDragPreview(itemId, clientEvent);
    }

    // 创建放置指示器
    this._createDropIndicator();

    // 开始自动滚动
    if (config.autoScroll) {
      this._startAutoScroll();
    }

    this.requestUpdate();
    this._emitStartEvent(itemId, item);
  };

  /**
   * 处理全局鼠标移动
   */
  private _handleGlobalMouseMove = (event: MouseEvent) => {
    if (!this._state.isDragging) return;

    event.preventDefault();
    this._updateDragPosition(event.clientX, event.clientY);
  };

  /**
   * 处理全局鼠标释放
   */
  private _handleGlobalMouseUp = (event: MouseEvent) => {
    if (!this._state.isDragging) return;

    event.preventDefault();
    this._handleDragEnd();
  };

  /**
   * 处理全局触摸移动
   */
  private _handleGlobalTouchMove = (event: TouchEvent) => {
    if (!this._state.isDragging) return;

    event.preventDefault();
    const touch = event.touches[0];
    this._updateDragPosition(touch.clientX, touch.clientY);
  };

  /**
   * 处理全局触摸结束
   */
  private _handleGlobalTouchEnd = (event: TouchEvent) => {
    if (!this._state.isDragging) return;

    event.preventDefault();
    this._handleDragEnd();
  };

  /**
   * 更新拖拽位置
   */
  private _updateDragPosition(clientX: number, clientY: number) {
    const config = this._finalConfig;

    this._state.dragCurrentPos = { x: clientX, y: clientY };

    // 更新拖拽预览位置
    if (this._dragPreview) {
      this._dragPreview.element.style.left = `${clientX + 10}px`;
      this._dragPreview.element.style.top = `${clientY + 10}px`;
    }

    // 计算放置位置
    const dropIndex = this._calculateDropPosition(clientX, clientY);
    if (dropIndex !== this._state.dragCurrentIndex) {
      this._state.dragCurrentIndex = dropIndex;
      this._updateDropIndicator(dropIndex);
      this._emitMoveEvent(this._state.draggingId!, dropIndex);
    }

    this.requestUpdate();
  }

  /**
   * 计算放置位置
   */
  private _calculateDropPosition(clientX: number, clientY: number): number {
    if (!this._container) return this._state.dragCurrentIndex || 0;

    const containerRect = this._container.getBoundingClientRect();
    const items = Array.from(this._container.querySelectorAll('.sortable-item'));

    if (items.length === 0) return 0;

    let closestIndex = 0;
    let closestDistance = Infinity;

    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2)
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }

  /**
   * 结束拖拽
   */
  private _handleDragEnd() {
    if (!this._state.isDragging) return;

    const { draggingId, dragStartIndex, dragCurrentIndex } = this._state;

    if (draggingId && dragStartIndex !== null && dragCurrentIndex !== null && dragStartIndex !== dragCurrentIndex) {
      this._reorderItems(dragStartIndex, dragCurrentIndex);
    }

    this._state.isDragging = false;
    this._state.draggingId = null;
    this._state.dragStartIndex = null;
    this._state.dragCurrentIndex = null;
    this._state.dropIndex = null;

    this.toggleAttribute('dragging', false);

    // 清理拖拽相关元素
    this._cleanup();

    this._persistState();
    this.requestUpdate();
    this._emitEndEvent(draggingId);
  }

  /**
   * 重新排序项目
   */
  private _reorderItems(fromIndex: number, toIndex: number) {
    const items = [...this._state.items];
    const [movedItem] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, movedItem);

    this._state.items = items;
    this._emitChangeEvent(movedItem, fromIndex, toIndex);
  }

  /**
   * 创建拖拽预览
   */
  private _createDragPreview(itemId: string, clientEvent: MouseEvent | Touch) {
    const itemElement = this._container?.querySelector(`[data-item-id="${itemId}"]`) as HTMLElement;
    if (!itemElement) return;

    const preview = itemElement.cloneNode(true) as HTMLElement;
    preview.style.width = `${itemElement.offsetWidth}px`;
    preview.style.height = `${itemElement.offsetHeight}px`;
    preview.style.position = 'fixed';
    preview.style.left = `${clientEvent.clientX + 10}px`;
    preview.style.top = `${clientEvent.clientY + 10}px`;
    preview.style.zIndex = '9999';
    preview.style.pointerEvents = 'none';
    preview.style.opacity = this._finalConfig.dragOpacity.toString();
    preview.style.transform = 'rotate(2deg)';

    document.body.appendChild(preview);

    this._dragPreview = {
      element: preview,
      width: itemElement.offsetWidth,
      height: itemElement.offsetHeight
    };
  }

  /**
   * 创建放置指示器
   */
  private _createDropIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'drop-indicator';
    indicator.style.display = 'none';
    document.body.appendChild(indicator);

    this._dropIndicator = indicator;
  }

  /**
   * 更新放置指示器
   */
  private _updateDropIndicator(dropIndex: number) {
    if (!this._dropIndicator || !this._container) return;

    const items = Array.from(this._container.querySelectorAll('.sortable-item'));
    if (dropIndex >= 0 && dropIndex < items.length) {
      const targetItem = items[dropIndex] as HTMLElement;
      const rect = targetItem.getBoundingClientRect();
      const containerRect = this._container.getBoundingClientRect();

      if (this._finalConfig.direction === 'horizontal') {
        this._dropIndicator.style.left = `${rect.left - containerRect.left - 1}px`;
        this._dropIndicator.style.top = '0px';
        this._dropIndicator.style.height = `${rect.height}px`;
      } else {
        this._dropIndicator.style.left = '0px';
        this._dropIndicator.style.top = `${rect.top - containerRect.top - 1}px`;
        this._dropIndicator.style.width = `${rect.width}px`;
      }

      this._dropIndicator.style.display = 'block';
    } else {
      this._dropIndicator.style.display = 'none';
    }
  }

  /**
   * 开始自动滚动
   */
  private _startAutoScroll() {
    if (this._autoScrollInterval) return;

    this._autoScrollInterval = window.setInterval(() => {
      if (!this._state.isDragging || !this._container) return;

      const { x, y } = this._state.dragCurrentPos;
      const containerRect = this._container.getBoundingClientRect();
      const config = this._finalConfig;

      // 检查是否需要滚动
      let scrollLeft = this._container.scrollLeft;
      let scrollTop = this._container.scrollTop;

      if (config.direction === 'horizontal' || config.direction === 'both') {
        if (x < containerRect.left + 50) {
          scrollLeft -= config.scrollSpeed;
        } else if (x > containerRect.right - 50) {
          scrollLeft += config.scrollSpeed;
        }
      }

      if (config.direction === 'vertical' || config.direction === 'both') {
        if (y < containerRect.top + 50) {
          scrollTop -= config.scrollSpeed;
        } else if (y > containerRect.bottom - 50) {
          scrollTop += config.scrollSpeed;
        }
      }

      this._container.scrollLeft = scrollLeft;
      this._container.scrollTop = scrollTop;
    }, 16);
  }

  /**
   * 停止自动滚动
   */
  private _stopAutoScroll() {
    if (this._autoScrollInterval) {
      clearInterval(this._autoScrollInterval);
      this._autoScrollInterval = null;
    }
  }

  /**
   * 清理拖拽相关元素
   */
  private _cleanup() {
    // 移除拖拽预览
    if (this._dragPreview) {
      this._dragPreview.element.remove();
      this._dragPreview = null;
    }

    // 移除放置指示器
    if (this._dropIndicator) {
      this._dropIndicator.remove();
      this._dropIndicator = null;
    }

    // 停止自动滚动
    this._stopAutoScroll();
  }

  /**
   * 渲染拖拽手柄
   */
  private _renderHandle(item: SortableItem) {
    const config = this._finalConfig;

    if (!config.handle) return nothing;

    const handleClass = [
      'sortable-handle',
      item.handle?.includes('left') ? 'left' : '',
      item.handle?.includes('custom') ? 'custom' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class="${handleClass}" part="handle">
        ${item.handle ? '' : config.handleContent}
      </div>
    `;
  }

  /**
   * 渲染排序项目
   */
  private _renderItem(item: SortableItem, index: number) {
    const config = this._finalConfig;
    const isDragging = this._state.draggingId === item.id;

    const classes = [
      'sortable-item',
      item.disabled ? 'disabled' : '',
      isDragging ? 'dragging' : '',
      item.className || ''
    ].filter(Boolean).join(' ');

    return html`
      <div
        class="${classes}"
        part="item ${isDragging ? 'item-dragging' : ''} ${item.disabled ? 'item-disabled' : ''}"
        data-item-id="${item.id}"
        draggable="${!item.disabled}"
        tabindex="${item.disabled ? -1 : 0}"
        role="option"
        aria-grabbed="${isDragging}"
        aria-disabled="${item.disabled}"
        @mousedown="${(e: MouseEvent) => {
          const handle = e.target as HTMLElement;
          if (config.handle && !handle.closest('.sortable-handle')) return;
          if (item.disabled) return;
          this._handleDragStart(e, item.id);
        }}"
        @touchstart="${(e: TouchEvent) => {
          const handle = e.target as HTMLElement;
          if (config.handle && !handle.closest('.sortable-handle')) return;
          if (item.disabled) return;
          this._handleDragStart(e, item.id);
        }}"
      >
        ${config.handle && !item.handle ? this._renderHandle(item) : ''}
        ${item.content}
      </div>
    `;
  }

  render() {
    const config = this._finalConfig;

    return html`
      <div
        class="sortable-container"
        part="container"
        layout="${config.layout}"
        direction="${config.direction}"
        spacing="${config.spacing}"
        ?handle="${config.handle}"
        style="${config.maxHeight ? `max-height: ${config.maxHeight};` : ''}${config.maxWidth ? `max-width: ${config.maxWidth};` : ''}"
      >
        ${this._state.items.length === 0 ? html`
          <div class="sortable-empty" part="empty">
          </div>
        ` : ''}

        ${this._state.items.map((item, index) => this._renderItem(item, index))}
      </div>
    `;
  }

  /**
   * 发送开始拖拽事件
   */
  private _emitStartEvent(itemId: string, item: SortableItem) {
    this.dispatchEvent(new CustomEvent('skill-sortable-start', {
      detail: {
        type: 'start',
        itemId,
        item,
        index: this._state.dragStartIndex,
        data: this._state
      } as SortableEvent
    }));
  }

  /**
   * 发送拖拽移动事件
   */
  private _emitMoveEvent(itemId: string, currentIndex: number) {
    this.dispatchEvent(new CustomEvent('skill-sortable-move', {
      detail: {
        type: 'move',
        itemId,
        index: currentIndex,
        data: this._state
      } as SortableEvent
    }));
  }

  /**
   * 发送结束拖拽事件
   */
  private _emitEndEvent(itemId: string | null) {
    this.dispatchEvent(new CustomEvent('skill-sortable-end', {
      detail: {
        type: 'end',
        itemId: itemId!,
        data: this._state
      } as SortableEvent
    }));
  }

  /**
   * 发送变化事件
   */
  private _emitChangeEvent(item: SortableItem, fromIndex: number, toIndex: number) {
    this.dispatchEvent(new CustomEvent('skill-sortable-change', {
      detail: {
        type: 'change',
        itemId: item.id,
        item,
        index: fromIndex,
        newIndex: toIndex,
        items: this._state.items,
        data: this._state
      } as SortableEvent
    }));
  }

  /**
   * 获取当前状态
   */
  public getState(): SortableState {
    return { ...this._state };
  }

  /**
   * 获取所有项目
   */
  public getItems(): SortableItem[] {
    return [...this._state.items];
  }

  /**
   * 添加项目
   */
  public addItem(item: SortableItem, index?: number) {
    const items = [...this._state.items];

    if (typeof index === 'number') {
      items.splice(index, 0, item);
    } else {
      items.push(item);
    }

    this._state.items = items;
    this._persistState();
    this.requestUpdate();
  }

  /**
   * 移除项目
   */
  public removeItem(itemId: string): SortableItem | null {
    const index = this._state.items.findIndex(item => item.id === itemId);
    if (index === -1) return null;

    const [removedItem] = this._state.items.splice(index, 1);

    this._persistState();
    this.requestUpdate();
    return removedItem;
  }

  /**
   * 重新排序项目
   */
  public reorderItems(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex) return;

    this._reorderItems(fromIndex, toIndex);
    this._persistState();
    this.requestUpdate();
  }

  /**
   * 重置到初始状态
   */
  public reset() {
    this._state = {
      items: [],
      isDragging: false,
      draggingId: null,
      dragStartIndex: null,
      dragCurrentIndex: null,
      dropIndex: null,
      dragStartPos: { x: 0, y: 0 },
      dragCurrentPos: { x: 0, y: 0 }
    };

    this._initializeFromSlots();
    this._persistState();
    this.requestUpdate();
  }
}