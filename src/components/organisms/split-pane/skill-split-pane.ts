import { LitElement, html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { splitPaneStyles } from './split-pane.styles.js';
import type {
  SplitPaneConfig,
  SplitPaneState,
  SplitPaneEvent,
  ResizerPosition
} from './types.js';

/**
 * Split Pane Component - 可调整大小的分割面板
 *
 * @element skill-split-pane
 *
 * @slot first - 第一个面板内容
 * @slot second - 第二个面板内容
 *
 * @csspart container - 分割面板容器
 * @csspart pane-first - 第一个面板
 * @csspart pane-second - 第二个面板
 * @csspart resizer - 分割器
 * @csspart resizer-handle - 分割器手柄
 * @csspart collapse-first - 折叠第一个面板按钮
 * @csspart collapse-second - 折叠第二个面板按钮
 *
 * @cssprop --skill-split-pane-resizer-bg - 分割器背景色
 * @cssprop --skill-split-pane-resizer-hover-bg - 分割器悬停背景色
 * @cssprop --skill-split-pane-resizer-active-bg - 分割器激活背景色
 * @cssprop --skill-split-pane-resizer-size - 分割器大小
 * @cssprop --skill-split-pane-transition - 过渡动画
 *
 * @fires skill-split-pane-change - 分割面板尺寸变化时触发
 * @fires skill-split-pane-collapse - 面板折叠/展开时触发
 *
 * @example
 * ```html
 * <skill-split-pane
 *   direction="horizontal"
 *   .config="${{ defaultSizes: [30, 70], resizerStyle: 'handle' }}"
 * >
 *   <div slot="first">侧边栏内容</div>
 *   <div slot="second">主内容区</div>
 * </skill-split-pane>
 * ```
 */
@customElement('skill-split-pane')
export class SkillSplitPane extends LitElement {
  static styles = splitPaneStyles;

  /**
   * 分割配置
   */
  @property({ type: Object })
  config: SplitPaneConfig = {};

  /**
   * 主题
   */
  @property({ type: String, reflect: true })
  theme?: 'light' | 'dark' | 'auto' = 'light';

  /**
   * 当前状态
   */
  @state()
  private _state: SplitPaneState = {
    sizes: [50, 50],
    isDragging: false,
    collapsed: null
  };

  /**
   * 是否正在拖拽
   */
  @state()
  private _isDragging = false;

  @query('.container')
  private _container!: HTMLDivElement;

  @query('.pane-first')
  private _paneFirst!: HTMLDivElement;

  @query('.pane-second')
  private _paneSecond!: HTMLDivElement;

  @query('.resizer')
  private _resizer!: HTMLDivElement;

  private _dragStartPosition = { x: 0, y: 0 };
  private _dragStartSizes: [number, number] = [50, 50];
  private _containerSize = { width: 0, height: 0 };

  // 默认配置
  private get _defaultConfig(): Required<SplitPaneConfig> {
    return {
      direction: 'horizontal',
      defaultSizes: [50, 50],
      minSizes: [10, 10],
      maxSizes: [90, 90],
      resizerStyle: 'thin',
      collapsible: false,
      resizerSize: 8,
      resizable: true,
      persistState: false,
      storageKey: 'skill-split-pane-state'
    };
  }

  // 获取最终配置
  private get _finalConfig(): Required<SplitPaneConfig> {
    return { ...this._defaultConfig, ...this.config };
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadPersistedState();
    this._initializeSizes();
  }

  /**
   * 初始化尺寸
   */
  private _initializeSizes() {
    const config = this._finalConfig;

    if (this._state.sizes[0] === 50 && this._state.sizes[1] === 50) {
      // 如果是初始状态，使用默认配置
      this._state.sizes = [...config.defaultSizes] as [number, number];
    }
  }

  /**
   * 加载持久化状态
   */
  private _loadPersistedState() {
    const config = this._finalConfig;

    if (!config.persistState || typeof window === 'undefined') return;

    try {
      const storageKey = config.storageKey || this._defaultConfig.storageKey;
      const stored = localStorage.getItem(storageKey);

      if (stored) {
        const parsedState = JSON.parse(stored);
        this._state = { ...this._state, ...parsedState };
      }
    } catch (error) {
      console.warn('Failed to load persisted split pane state:', error);
    }
  }

  /**
   * 保存状态到本地存储
   */
  private _persistState() {
    const config = this._finalConfig;

    if (!config.persistState || typeof window === 'undefined') return;

    try {
      const storageKey = config.storageKey || this._defaultConfig.storageKey;
      localStorage.setItem(storageKey, JSON.stringify(this._state));
    } catch (error) {
      console.warn('Failed to persist split pane state:', error);
    }
  }

  /**
   * 开始拖拽
   */
  private _handleDragStart = (event: MouseEvent | TouchEvent) => {
    const config = this._finalConfig;

    if (!config.resizable) return;

    event.preventDefault();

    const clientEvent = 'touches' in event ? event.touches[0] : event;

    this._isDragging = true;
    this._state.isDragging = true;
    this._dragStartPosition = { x: clientEvent.clientX, y: clientEvent.clientY };
    this._dragStartSizes = [...this._state.sizes] as [number, number];

    this._updateContainerSize();
    this._addDragListeners();
    this.toggleAttribute('dragging', true);

    this._emitChangeEvent();
  };

  /**
   * 拖拽中
   */
  private _handleDragMove = (event: MouseEvent | TouchEvent) => {
    if (!this._isDragging) return;

    event.preventDefault();

    const clientEvent = 'touches' in event ? event.touches[0] : event;
    const config = this._finalConfig;

    const deltaX = clientEvent.clientX - this._dragStartPosition.x;
    const deltaY = clientEvent.clientY - this._dragStartPosition.y;

    let newSizes: [number, number];

    if (config.direction === 'horizontal') {
      const containerWidth = this._containerSize.width;
      const deltaPercent = (deltaX / containerWidth) * 100;
      const newFirstSize = this._dragStartSizes[0] + deltaPercent;
      newSizes = [newFirstSize, 100 - newFirstSize];
    } else {
      const containerHeight = this._containerSize.height;
      const deltaPercent = (deltaY / containerHeight) * 100;
      const newFirstSize = this._dragStartSizes[0] + deltaPercent;
      newSizes = [newFirstSize, 100 - newFirstSize];
    }

    // 应用最小和最大限制
    newSizes = this._applySizeConstraints(newSizes);

    this._state.sizes = newSizes;
    this.requestUpdate();
    this._emitChangeEvent();
  };

  /**
   * 结束拖拽
   */
  private _handleDragEnd = () => {
    if (!this._isDragging) return;

    this._isDragging = false;
    this._state.isDragging = false;
    this._removeDragListeners();
    this.toggleAttribute('dragging', false);

    this._persistState();
    this._emitChangeEvent();
  };

  /**
   * 应用尺寸约束
   */
  private _applySizeConstraints(sizes: [number, number]): [number, number] {
    const config = this._finalConfig;

    const [minFirst, minSecond] = config.minSizes;
    const [maxFirst, maxSecond] = config.maxSizes || [90, 90];

    const firstSize = Math.max(
      typeof minFirst === 'string' ? parseFloat(minFirst) : minFirst,
      Math.min(
        typeof maxFirst === 'string' ? parseFloat(maxFirst) : maxFirst,
        sizes[0]
      )
    );

    const secondSize = Math.max(
      typeof minSecond === 'string' ? parseFloat(minSecond) : minSecond,
      Math.min(
        typeof maxSecond === 'string' ? parseFloat(maxSecond) : maxSecond,
        sizes[1]
      )
    );

    // 确保总和为 100%
    const total = firstSize + secondSize;
    if (total !== 100) {
      const ratio = 100 / total;
      return [firstSize * ratio, secondSize * ratio];
    }

    return [firstSize, secondSize];
  }

  /**
   * 更新容器尺寸
   */
  private _updateContainerSize() {
    if (this._container) {
      const rect = this._container.getBoundingClientRect();
      this._containerSize = { width: rect.width, height: rect.height };
    }
  }

  /**
   * 添加拖拽事件监听器
   */
  private _addDragListeners() {
    document.addEventListener('mousemove', this._handleDragMove);
    document.addEventListener('mouseup', this._handleDragEnd);
    document.addEventListener('touchmove', this._handleDragMove);
    document.addEventListener('touchend', this._handleDragEnd);
  }

  /**
   * 移除拖拽事件监听器
   */
  private _removeDragListeners() {
    document.removeEventListener('mousemove', this._handleDragMove);
    document.removeEventListener('mouseup', this._handleDragEnd);
    document.removeEventListener('touchmove', this._handleDragMove);
    document.removeEventListener('touchend', this._handleDragEnd);
  }

  /**
   * 折叠面板
   */
  private _collapsePane(pane: 'first' | 'second') {
    const config = this._finalConfig;

    if (!config.collapsible) return;

    if (this._state.collapsed === pane) {
      // 如果已经折叠，则展开
      this._state.collapsed = null;
      this._state.sizes = [...config.defaultSizes] as [number, number];
    } else {
      // 折叠指定面板
      this._state.collapsed = pane;
      this._state.sizes = pane === 'first' ? [0, 100] : [100, 0];
    }

    this._persistState();
    this.requestUpdate();
    this._emitCollapseEvent();
    this._emitChangeEvent();
  }

  /**
   * 发送变化事件
   */
  private _emitChangeEvent() {
    this.dispatchEvent(new CustomEvent('skill-split-pane-change', {
      detail: {
        type: 'change',
        sizes: this._state.sizes,
        collapsed: this._state.collapsed
      } as SplitPaneEvent
    }));
  }

  /**
   * 发送折叠事件
   */
  private _emitCollapseEvent() {
    this.dispatchEvent(new CustomEvent('skill-split-pane-collapse', {
      detail: {
        type: 'collapse',
        sizes: this._state.sizes,
        collapsed: this._state.collapsed
      } as SplitPaneEvent
    }));
  }

  /**
   * 获取面板样式
   */
  private _getPaneStyles(pane: 'first' | 'second') {
    const config = this._finalConfig;
    const isCollapsed = this._state.collapsed === pane;

    if (isCollapsed) {
      return {
        display: 'none',
        flex: '0 0 0'
      };
    }

    if (this._state.collapsed) {
      // 如果另一个面板被折叠，这个面板占满空间
      return {
        flex: '1 1 auto'
      };
    }

    const size = this._state.sizes[pane === 'first' ? 0 : 1];

    return {
      flex: `0 0 ${size}%`
    };
  }

  /**
   * 渲染分割器
   */
  private _renderResizer() {
    const config = this._finalConfig;
    const isCollapsed = this._state.collapsed !== null;

    return html`
      <div
        class="resizer ${config.resizerStyle} ${this._isDragging ? 'dragging' : ''}"
        part="resizer"
        @mousedown="${this._handleDragStart}"
        @touchstart="${this._handleDragStart}"
        tabindex="0"
        role="separator"
        aria-label="分割器，可拖拽调整面板大小"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this._state.sizes[0]}"
        ?aria-readonly="${!config.resizable}"
      >
        ${config.resizerStyle === 'handle' ? html`
          <div class="resizer-handle" part="resizer-handle"></div>
        ` : ''}
      </div>

      ${config.collapsible ? html`
        <button
          class="collapse-button collapse-first"
          part="collapse-first"
          @click="${() => this._collapsePane('first')}"
          title="${this._state.collapsed === 'first' ? '展开第一个面板' : '折叠第一个面板'}"
          aria-label="${this._state.collapsed === 'first' ? '展开第一个面板' : '折叠第一个面板'}"
        >
          ${this._state.collapsed === 'first' ? '▶' : '◀'}
        </button>

        <button
          class="collapse-button collapse-second"
          part="collapse-second"
          @click="${() => this._collapsePane('second')}"
          title="${this._state.collapsed === 'second' ? '展开第二个面板' : '折叠第二个面板'}"
          aria-label="${this._state.collapsed === 'second' ? '展开第二个面板' : '折叠第二个面板'}"
        >
          ${this._state.collapsed === 'second' ? '▼' : '▶'}
        </button>
      ` : ''}
    `;
  }

  render() {
    const config = this._finalConfig;
    const isCollapsed = this._state.collapsed !== null;

    return html`
      <div
        class="container"
        part="container"
        direction="${config.direction}"
      >
        <div
          class="pane pane-first"
          part="pane-first"
          style="${Object.entries(this._getPaneStyles('first'))
            .map(([key, value]) => `${key}: ${value}`)
            .join('; ')}"
        >
          <slot name="first"></slot>
        </div>

        ${!isCollapsed ? this._renderResizer() : ''}

        <div
          class="pane pane-second"
          part="pane-second"
          style="${Object.entries(this._getPaneStyles('second'))
            .map(([key, value]) => `${key}: ${value}`)
            .join('; ')}"
        >
          <slot name="second"></slot>
        </div>
      </div>
    `;
  }

  /**
   * 获取当前状态
   */
  public getState(): SplitPaneState {
    return { ...this._state };
  }

  /**
   * 设置面板尺寸
   */
  public setSizes(sizes: [number, number]) {
    const constrainedSizes = this._applySizeConstraints(sizes);
    this._state.sizes = constrainedSizes;
    this._state.collapsed = null;

    this._persistState();
    this.requestUpdate();
    this._emitChangeEvent();
  }

  /**
   * 折叠指定面板
   */
  public collapsePane(pane: 'first' | 'second' | null) {
    if (pane === null) {
      // 展开所有面板
      this._state.collapsed = null;
      this._state.sizes = [...this._finalConfig.defaultSizes] as [number, number];
    } else {
      this._collapsePane(pane);
    }
  }

  /**
   * 重置到默认状态
   */
  public reset() {
    this._state = {
      sizes: [...this._finalConfig.defaultSizes] as [number, number],
      isDragging: false,
      collapsed: null
    };

    this._persistState();
    this.requestUpdate();
    this._emitChangeEvent();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeDragListeners();
  }
}