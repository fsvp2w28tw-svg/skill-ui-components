import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { pageSectionStyles } from './skill-page-section.styles';
import { baseStyles } from '../../../styles/base';

export interface SectionAction {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  onClick?: (e: Event) => void;
}

export interface PageSectionEventDetail {
  action?: SectionAction;
  originalEvent: Event;
}

/**
 * Skill PageSection Component - 页面区块容器组件
 *
 * @slot header-actions - 头部操作按钮插槽
 * @slot badges - 标签插槽
 * @slot aside - 侧边栏内容插槽
 * @slot footer-actions - 底部操作按钮插槽
 *
 * @csspart section - 区域容器
 * @csspart header - 头部区域
 * @csspart title - 标题
 * @csspart subtitle - 副标题
 * @csspart description - 描述文本
 * @csspart content - 内容区域
 * @csspart footer - 底部区域
 * @csspart divider - 分割线
 *
 * @cssprop --section-padding - 区域内边距
 * @cssprop --section-bg - 背景色
 * @cssprop --section-border - 边框样式
 * @cssprop --section-border-radius - 圆角大小
 * @cssprop --section-shadow - 阴影效果
 *
 * @fires skill-section-action-click - 区域操作点击事件
 * @fires skill-section-expand - 区域展开事件
 * @fires skill-section-collapse - 区域折叠事件
 * @fires skill-section-mount - 区域挂载事件
 * @fires skill-section-unmount - 区域卸载事件
 *
 * @example
 * ```html
 * <!-- 基础页面区块 -->
 * <skill-page-section title="用户信息">
 *   <p>这里是页面的主要内容...</p>
 * </skill-page-section>
 *
 * <!-- 带副标题和描述的区块 -->
 * <skill-page-section
 *   title="设置"
 *   subtitle="配置您的偏好设置"
 *   description="这些设置将影响您的使用体验"
 * >
 *   <form>
 *     <input type="text" placeholder="用户名" />
 *     <input type="email" placeholder="邮箱" />
 *   </form>
 * </skill-page-section>
 *
 * <!-- 卡片样式区块 -->
 * <skill-page-section
 *   title="数据统计"
 *   variant="card"
 *   size="lg"
 * >
 *   <div>统计图表...</div>
 * </skill-page-section>
 *
 * <!-- 带头部操作的区块 -->
 * <skill-page-section
 *   title="任务列表"
 *   .actions=${[
 *     { id: 'add', label: '添加任务', icon: 'plus' },
 *     { id: 'filter', label: '筛选', icon: 'filter' }
 *   ]}
 *   @skill-section-action-click=${handleActionClick}
 * >
 *   <div>任务内容...</div>
 * </skill-page-section>
 *
 * <!-- 可折叠区块 -->
 * <skill-page-section
 *   title="高级设置"
 *   collapsible
 *   .collapsed=${false}
 * >
 *   <div>高级配置选项...</div>
 * </skill-page-section>
 *
 * <!-- 带标签的区块 -->
 * <skill-page-section title="文档" .badges=${['重要', '草稿']}>
 *   <div>文档内容...</div>
 * </skill-page-section>
 *
 * <!-- 主题变体 -->
 * <skill-page-section
 *   title="成功提示"
 *   variant="filled"
 *   color="success"
 * >
 *   <div>操作已成功完成！</div>
 * </skill-page-section>
 *
 * <!-- 带底部操作的区块 -->
 * <skill-page-section
 *   title="确认删除"
 *   variant="outlined"
 *   color="error"
 * >
 *   <p>您确定要删除这个项目吗？此操作无法撤销。</p>
 *   <button slot="footer-actions" class="btn-cancel">取消</button>
 *   <button slot="footer-actions" class="btn-danger">删除</button>
 * </skill-page-section>
 *
 * <!-- 网格布局区块 -->
 * <skill-page-section title="产品展示" layout="grid" columns="3">
 *   <div>产品卡片 1</div>
 *   <div>产品卡片 2</div>
 *   <div>产品卡片 3</div>
 * </skill-page-section>
 *
 * <!-- 侧边栏布局 -->
 * <skill-page-section title="用户资料" layout="sidebar">
 *   <div slot="aside">
 *     <!-- 侧边栏内容 -->
 *     <nav>导航菜单...</nav>
 *   </div>
 *   <div>
     <!-- 主内容 -->
 *     <p>用户详细信息...</p>
 *   </div>
 * </skill-page-section>
 *
 * <!-- 加载状态 -->
 * <skill-page-section
 *   title="数据加载"
 *   loading
 *   disabled
 * >
 *   <div>正在加载数据...</div>
 * </skill-page-section>
 *
 * <!-- 响应式区块 -->
 * <skill-page-section
 *   title="响应式设计"
 *   responsive
 *   size="md"
 * >
 *   <div>这个区块会根据屏幕大小调整样式</div>
 * </skill-page-section>
 *
 * <!-- 带锚点的区块 -->
 * <skill-page-section
 *   title="章节一"
 *   anchor="chapter1"
 * >
 *   <div>第一章内容...</div>
 * </skill-page-section>
 *
 * <!-- 自定义内容布局 -->
 * <skill-page-section title="混合布局">
 *   <div slot="header-actions">
 *     <button>编辑</button>
 *     <button>删除</button>
 *   </div>
 *
 *   <div class="custom-layout">
 *     <div>左侧内容</div>
 *     <div>右侧内容</div>
 *   </div>

 *   <div slot="footer-actions">
 *     <button>保存</button>
 *     <button>取消</button>
 *   </div>
 * </skill-page-section>
 * ```
 */
@customElement('skill-page-section')
export class SkillPageSection extends LitElement {
  static styles = [baseStyles, pageSectionStyles];

  /**
   * 区块标题
   */
  @property({ type: String, reflect: true })
  title = '';

  /**
   * 副标题
   */
  @property({ type: String, reflect: true })
  subtitle = '';

  /**
   * 描述文本
   */
  @property({ type: String, reflect: true })
  description = '';

  /**
   * 区块变体
   * @type {'default' | 'card' | 'elevated' | 'outlined' | 'filled' | 'gradient'}
   */
  @property({ type: String, reflect: true })
  variant: 'default' | 'card' | 'elevated' | 'outlined' | 'filled' | 'gradient' = 'default';

  /**
   * 颜色主题
   * @type {'primary' | 'secondary' | 'success' | 'warning' | 'error'}
   */
  @property({ type: String, reflect: true })
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' = 'primary';

  /**
   * 区块尺寸
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * 布局方式
   * @type {'default' | 'grid' | 'sidebar'}
   */
  @property({ type: String, reflect: true })
  layout: 'default' | 'grid' | 'sidebar' = 'default';

  /**
   * 网格列数（仅在grid布局下有效）
   */
  @property({ type: Number, reflect: true, attribute: 'grid-columns' })
  gridColumns = 2;

  /**
   * 头部对齐方式
   * @type {'left' | 'center' | 'right'}
   */
  @property({ type: String, reflect: true, attribute: 'header-align' })
  headerAlign: 'left' | 'center' | 'right' = 'left';

  /**
   * 内容对齐方式
   * @type {'left' | 'center' | 'right'}
   */
  @property({ type: String, reflect: true, attribute: 'content-align' })
  contentAlign: 'left' | 'center' | 'right' = 'left';

  /**
   * 底部对齐方式
   * @type {'left' | 'center' | 'right' | 'spaced'}
   */
  @property({ type: String, reflect: true, attribute: 'footer-align' })
  footerAlign: 'left' | 'center' | 'right' | 'spaced' = 'left';

  /**
   * 是否可折叠
   */
  @property({ type: Boolean, reflect: true })
  collapsible = false;

  /**
   * 是否折叠
   */
  @property({ type: Boolean, reflect: true })
  collapsed = false;

  /**
   * 是否显示分割线
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-divider' })
  showDivider = false;

  /**
   * 分割线样式
   * @type {'solid' | 'dashed' | 'dotted'}
   */
  @property({ type: String, reflect: true, attribute: 'divider-style' })
  dividerStyle: 'solid' | 'dashed' | 'dotted' = 'solid';

  /**
   * 是否显示底部操作
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-footer' })
  showFooter = false;

  /**
   * 是否显示头部操作
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-header-actions' })
  showHeaderActions = false;

  /**
   * 是否加载中
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * 是否禁用
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * 是否只读
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * 锚点ID（用于页面内导航）
   */
  @property({ type: String, reflect: true })
  anchor = '';

  /**
   * 是否响应式
   */
  @property({ type: Boolean, reflect: true })
  responsive = true;

  /**
   * 是否全宽
   */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  /**
   * 是否紧凑模式
   */
  @property({ type: Boolean, reflect: true })
  compact = false;

  /**
   * 是否无内边距
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-padding' })
  noPadding = false;

  /**
   * 操作按钮数据
   */
  @property({ type: Array })
  actions: SectionAction[] = [];

  /**
   * 标签列表
   */
  @property({ type: Array })
  badges: string[] = [];

  /**
   * ARIA 标签
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel = 'Page section';


  connectedCallback() {
    super.connectedCallback();
    this._checkAsideSlot();
    this._fireEvent('skill-section-mount');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._fireEvent('skill-section-unmount');
  }

  willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('collapsed') && this.collapsible) {
      this._fireEvent(this.collapsed ? 'skill-section-collapse' : 'skill-section-expand');
    }
  }

  private _checkAsideSlot() {
    const asideSlot = this.shadowRoot?.querySelector('slot[name="aside"]') as HTMLSlotElement;
    const hasAside = !!asideSlot?.assignedElements().length;
    return hasAside;
  }

  private _handleToggleCollapse() {
    if (this.collapsible && !this.readonly && !this.disabled) {
      this.collapsed = !this.collapsed;
    }
  }

  private _handleActionClick(action: SectionAction, e: Event) {
    if (action.disabled || this.readonly || this.disabled) return;

    e.preventDefault();
    e.stopPropagation();

    if (action.onClick) {
      action.onClick(e);
    }

    this._fireEvent('skill-section-action-click', action, e);
  }

  private _fireEvent(eventName: string, action?: SectionAction, originalEvent?: Event) {
    const detail = {
      action,
      originalEvent: originalEvent || new Event(eventName),
    } as PageSectionEventDetail;

    this.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail,
    }));
  }

  private _renderHeader(): TemplateResult {
    if (!this.title && !this.subtitle && !this.description && !this.showHeaderActions) {
      return html``;
    }

    return html`
      <header part="header" class="skill-page-section__header skill-page-section__header--${this.headerAlign}">
        ${this.anchor ? html`<div id="${this.anchor}" class="skill-page-section__anchor"></div>` : ''}

        <div class="skill-page-section__title-group">
          ${this.collapsible && this.title ? html`
            <button
              class="skill-page-section__collapse-trigger"
              @click=${this._handleToggleCollapse}
              aria-expanded="${!this.collapsed}"
              aria-controls="section-content"
            >
              <svg class="skill-page-section__collapse-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5H7z"/>
              </svg>
            </button>
          ` : ''}

          ${this.title ? html`
            <h2 part="title" class="skill-page-section__title">
              ${!this.collapsible ? this.title : ''}
            </h2>
          ` : ''}

          ${this.subtitle ? html`
            <h3 part="subtitle" class="skill-page-section__subtitle">${this.subtitle}</h3>
          ` : ''}

          ${this.description ? html`
            <p part="description" class="skill-page-section__description">${this.description}</p>
          ` : ''}

          ${this.badges.length > 0 ? html`
            <div class="skill-page-section__badges">
              ${this.badges.map(badge => html`
                <skill-badge variant="outline" size="sm">${badge}</skill-badge>
              `)}
            </div>
          ` : ''}

          <slot name="badges"></slot>
        </div>

        ${this.showHeaderActions || this.actions.length > 0 ? html`
          <div class="skill-page-section__header-actions skill-page-section__header-actions--${this.headerAlign}">
            <slot name="header-actions"></slot>
            ${this.actions.map(action => html`
              <skill-button
                variant="ghost"
                size="sm"
                .icon="${action.icon}"
                .disabled="${action.disabled || this.disabled || this.readonly}"
                @click=${(e: Event) => this._handleActionClick(action, e)}
              >
                ${action.label}
              </skill-button>
            `)}
          </div>
        ` : ''}
      </header>
    `;
  }

  private _renderContent(): TemplateResult {
    const contentClasses = [
      'skill-page-section__content',
      `skill-page-section__content--${this.contentAlign}`,
      this.collapsible ? 'skill-page-section__content--collapsible' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div
        part="content"
        class="${contentClasses}"
        id="section-content"
        aria-hidden="${this.collapsed}"
      >
        <slot></slot>
      </div>
    `;
  }

  private _renderFooter(): TemplateResult {
    if (!this.showFooter) return html``;

    return html`
      <footer part="footer" class="skill-page-section__footer skill-page-section__footer--${this.footerAlign}">
        <div class="skill-page-section__footer-actions skill-page-section__footer-actions--${this.footerAlign}">
          <slot name="footer-actions"></slot>
        </div>
      </footer>
    `;
  }

  private _renderDivider(): TemplateResult {
    if (!this.showDivider) return html``;

    const dividerClasses = [
      'skill-page-section__divider',
      `skill-page-section__divider--${this.dividerStyle}`,
    ].filter(Boolean).join(' ');

    return html`<hr part="divider" class="${dividerClasses}" />`;
  }

  private _renderGridLayout(): TemplateResult {
    const gridClasses = [
      'skill-page-section__grid',
      `skill-page-section__grid--${this.gridColumns}`,
    ].filter(Boolean).join(' ');

    return html`
      <div class="${gridClasses}">
        <slot></slot>
      </div>
    `;
  }

  private _renderSidebarLayout(): TemplateResult {
    return html`
      <div class="skill-page-section__sidebar-layout">
        <aside class="skill-page-section__sidebar">
          <slot name="aside"></slot>
        </aside>
        <main class="skill-page-section__main">
          ${this._renderContent()}
        </main>
      </div>
    `;
  }

  render(): TemplateResult {
    const sectionClasses = [
      'skill-page-section',
      `skill-page-section--${this.variant}`,
      `skill-page-section--${this.color}`,
      `skill-page-section--${this.size}`,
      {
        'skill-page-section--collapsed': this.collapsed && this.collapsible,
        'skill-page-section--loading': this.loading,
        'skill-page-section--disabled': this.disabled,
        'skill-page-section--full-width': this.fullWidth,
        'skill-page-section--compact': this.compact,
        'skill-page-section--no-padding': this.noPadding,
      }
    ].filter(Boolean).map((cls) =>
      typeof cls === 'string' ? cls : Object.entries(cls)[0][0]
    ).join(' ');

    return html`
      <section
        part="section"
        class="${sectionClasses}"
        role="region"
        aria-label="${this.ariaLabel}"
        aria-busy="${this.loading}"
      >
        ${this._renderHeader()}
        ${this._renderDivider()}

        ${this.layout === 'grid' ? this._renderGridLayout() :
          this.layout === 'sidebar' ? this._renderSidebarLayout() :
          this._renderContent()}

        ${this._renderFooter()}
      </section>
    `;
  }

  /**
   * 展开区块
   */
  public expand(): void {
    if (this.collapsible) {
      this.collapsed = false;
    }
  }

  /**
   * 折叠区块
   */
  public collapse(): void {
    if (this.collapsible) {
      this.collapsed = true;
    }
  }

  /**
   * 切换展开/折叠状态
   */
  public toggle(): void {
    if (this.collapsible) {
      this.collapsed = !this.collapsed;
    }
  }

  /**
   * 滚动到区块
   */
  public scrollToView(options?: ScrollIntoViewOptions): void {
    if (this.anchor) {
      const element = document.getElementById(this.anchor);
      if (element) {
        element.scrollIntoView(options || { behavior: 'smooth', block: 'start' });
      }
    } else {
      this.scrollIntoView(options || { behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * 添加操作按钮
   */
  public addAction(action: SectionAction): void {
    this.actions = [...this.actions, action];
  }

  /**
   * 移除操作按钮
   */
  public removeAction(id: string): void {
    this.actions = this.actions.filter(action => action.id !== id);
  }

  /**
   * 更新操作按钮
   */
  public updateAction(id: string, updates: Partial<SectionAction>): void {
    this.actions = this.actions.map(action =>
      action.id === id ? { ...action, ...updates } : action
    );
  }

  /**
   * 添加标签
   */
  public addBadge(badge: string): void {
    this.badges = [...this.badges, badge];
  }

  /**
   * 移除标签
   */
  public removeBadge(badge: string): void {
    this.badges = this.badges.filter(b => b !== badge);
  }

  /**
   * 检查是否折叠
   */
  public isCollapsed(): boolean {
    return this.collapsed;
  }

  /**
   * 检查是否加载中
   */
  public isLoading(): boolean {
    return this.loading;
  }

  /**
   * 检查是否禁用
   */
  public isDisabled(): boolean {
    return this.disabled;
  }

  /**
   * 获取当前状态
   */
  public getState() {
    return {
      collapsed: this.collapsed,
      loading: this.loading,
      disabled: this.disabled,
      readonly: this.readonly,
      variant: this.variant,
      color: this.color,
      size: this.size,
      layout: this.layout,
    };
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-page-section': SkillPageSection;
  }
}