import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { statCardStyles } from './skill-stat-card.styles';
import { baseStyles } from '../../../styles/base';

/**
 * Stat Card Trend Interface
 */
export interface StatCardTrend {
  value: number;
  direction: 'up' | 'down' | 'neutral';
  label?: string;
}

/**
 * Skill Stat Card Component - 统计卡片组件
 *
 * 组合了 card、badge、progress 和 icon 的分子组件，用于展示数据统计信息
 *
 * @slot title - 自定义标题内容
 * @slot value - 自定义值显示内容
 * @slot subtitle - 自定义副标题内容
 * @slot icon - 自定义图标内容
 * @slot badge - 自定义徽章内容
 * @slot trend - 自定义趋势显示内容
 * @slot actions - 操作按钮区域
 * @slot extra - 额外信息区域
 *
 * @csspart card - 卡片容器
 * @csspart header - 卡片头部
 * @csspart icon - 图标容器
 * @csspart content - 内容容器
 * @csspart title - 标题元素
 * @csspart value - 值元素
 * @csspart subtitle - 副标题元素
 * @csspart badge - 徽章元素
 * @csspart trend - 趋势元素
 * @csspart progress - 进度条容器
 * @csspart footer - 卡片底部
 * @csspart actions - 操作区域
 *
 * @cssprop --stat-card-padding - 卡片内边距
 * @cssprop --stat-card-border-radius - 卡片圆角
 * @cssprop --stat-card-background - 卡片背景色
 * @cssprop --stat-card-shadow - 卡片阴影
 * @cssprop --stat-card-title-color - 标题颜色
 * @cssprop --stat-card-value-color - 值颜色
 * @cssprop --stat-card-subtitle-color - 副标题颜色
 * @cssprop --stat-card-icon-size - 图标尺寸
 *
 * @fires skill-stat-card-click - Dispatched when card is clicked
 * @fires skill-stat-card-action - Dispatched when action is triggered
 * @fires skill-stat-card-change - Dispatched when value changes
 *
 * @example
 * ```html
 * <!-- 基础统计卡片 -->
 * <skill-stat-card title="用户总数" value="1,234" icon="users"></skill-stat-card>
 *
 * <!-- 带趋势的统计卡片 -->
 * <skill-stat-card
 *   title="销售额"
 *   value="¥89,432"
 *   subtitle="本月"
 *   icon="trending-up"
 *   .trend=${{ value: 12.5, direction: 'up', label: 'vs 上月' }}
 * ></skill-stat-card>
 *
 * <!-- 带进度条的统计卡片 -->
 * <skill-stat-card
 *   title="存储使用"
 *   value="68GB"
 *   subtitle="总共 100GB"
 *   icon="database"
 *   .progress=${68}
 * ></skill-stat-card>
 *
 * <!-- 带徽章的统计卡片 -->
 * <skill-stat-card
 *   title="待处理"
 *   value="23"
 *   icon="alert-circle"
 *   badge="urgent"
 *   badge-color="error"
 * ></skill-stat-card>
 *
 * <!-- 紧凑模式 -->
 * <skill-stat-card
 *   title="转化率"
 *   value="3.2%"
 *   variant="compact"
 *   .trend=${{ value: 0.8, direction: 'up' }}
 * ></skill-stat-card>
 *
 * <!-- 详细模式 -->
 * <skill-stat-card
 *   title="项目进度"
 *   value="85%"
 *   subtitle="17 / 20 任务完成"
 *   icon="check-circle"
 *   variant="detailed"
 *   .progress=${85}
 *   .trend=${{ value: 5, direction: 'up', label: '本周' }}
 * ></skill-stat-card>
 *
 * <!-- 可点击的统计卡片 -->
 * <skill-stat-card
 *   title="查看详情"
 *   value="更多"
 *   icon="arrow-right"
 *   clickable
 *   @skill-stat-card-click=${handleClick}
 * ></skill-stat-card>
 *
 * <!-- 带操作的统计卡片 -->
 * <skill-stat-card title="数据统计" value="1,024">
 *   <div slot="actions">
 *     <button size="sm">刷新</button>
 *     <button size="sm" variant="outline">导出</button>
 *   </div>
 * </skill-stat-card>
 *
 * <!-- 自定义内容 -->
 * <skill-stat-card title="自定义统计">
 *   <div slot="value">
 *     <strong>456</strong>
 *     <small style="color: var(--skill-color-success);">+12%</small>
 *   </div>
 *   <div slot="subtitle">自定义描述信息</div>
 * </skill-stat-card>
 *
 * <!-- 不同颜色主题 -->
 * <skill-stat-card title="收入" value="¥12,345" color="success" icon="dollar-sign"></skill-stat-card>
 * <skill-stat-card title="支出" value="¥8,901" color="error" icon="credit-card"></skill-stat-card>
 *
 * <!-- 不同尺寸 -->
 * <skill-stat-card title="小卡片" value="123" size="sm" icon="box"></skill-stat-card>
 * <skill-stat-card title="大卡片" value="1,234" size="lg" icon="package"></skill-stat-card>
 *
 * <!-- 实时更新 -->
 * <skill-stat-card id="live-stats" title="在线用户" value="0" icon="users"></skill-stat-card>
 * <script>
 *   // 模拟实时更新
 *   setInterval(() => {
 *     const card = document.getElementById('live-stats');
 *     const newValue = Math.floor(Math.random() * 1000);
 *     card.value = newValue.toString();
 *   }, 5000);
 * </script>
 * ```
 */
@customElement('skill-stat-card')
export class SkillStatCard extends LitElement {
  static styles = [baseStyles, statCardStyles];

  /**
   * 卡片标题
   */
  @property({ type: String, reflect: true })
  title = '';

  /**
   * 主要显示值
   */
  @property({ type: String, reflect: true })
  value = '';

  /**
   * 副标题或描述
   */
  @property({ type: String, reflect: true })
  subtitle = '';

  /**
   * 图标名称
   */
  @property({ type: String, reflect: true })
  icon?: string;

  /**
   * 徽章文本
   */
  @property({ type: String, reflect: true })
  badge?: string;

  /**
   * 徽章颜色
   * @type {'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray'}
   */
  @property({ type: String, reflect: true })
  badgeColor: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray' = 'primary';

  /**
   * 进度值 (0-100)
   */
  @property({ type: Number, reflect: true })
  progress?: number;

  /**
   * 进度条颜色
   * @type {'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'}
   */
  @property({ type: String, reflect: true })
  progressColor: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary';

  /**
   * 趋势信息
   */
  @property({ type: Object })
  trend?: StatCardTrend;

  /**
   * 卡片变体
   * @type {'default' | 'compact' | 'detailed' | 'minimal'}
   */
  @property({ type: String, reflect: true })
  variant: 'default' | 'compact' | 'detailed' | 'minimal' = 'default';

  /**
   * 卡片颜色主题
   * @type {'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray'}
   */
  @property({ type: String, reflect: true })
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray' = 'gray';

  /**
   * 卡片尺寸
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * 是否可点击
   */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  /**
   * 是否显示加载状态
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * 是否显示边框
   */
  @property({ type: Boolean, reflect: true })
  bordered = true;

  /**
   * 卡片阴影级别
   * @type {'none' | 'sm' | 'md' | 'lg'}
   */
  @property({ type: String, reflect: true })
  shadow: 'none' | 'sm' | 'md' | 'lg' = 'sm';

  /**
   * 卡片背景
   * @type {'default' | 'solid' | 'gradient'}
   */
  @property({ type: String, reflect: true })
  background: 'default' | 'solid' | 'gradient' = 'default';

  /**
   * 是否启用动画
   */
  @property({ type: Boolean, reflect: true })
  animated = false;

  /**
   * 图标位置
   * @type {'left' | 'right' | 'top'}
   */
  @property({ type: String, reflect: true })
  iconPosition: 'left' | 'right' | 'top' = 'left';

  /**
   * 数值格式化
   * @type {'none' | 'currency' | 'percentage' | 'number'}
   */
  @property({ type: String, reflect: true })
  format: 'none' | 'currency' | 'percentage' | 'number' = 'none';

  /**
   * 货币符号 (当 format="currency" 时使用)
   */
  @property({ type: String, reflect: true })
  currency = '¥';

  /**
   * 是否为空状态
   */
  @property({ type: Boolean, reflect: true })
  empty = false;

  /**
   * 空状态文本
   */
  @property({ type: String, reflect: true, attribute: 'empty-text' })
  emptyText = '暂无数据';

  /**
   * ARIA 标签
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  private _previousValue = '';

  protected willUpdate() {
    // Set ARIA attributes
    if (!this.ariaLabel) {
      this.ariaLabel = this._generateAriaLabel();
    }
  }

  private _generateAriaLabel(): string {
    const parts = [this.title, this.value, this.subtitle].filter(Boolean);
    const type = this.clickable ? 'clickable stat card' : 'stat card';
    return parts.length > 0 ? `${parts.join(', ')}, ${type}` : type;
  }

  private _formatValue(value: string): string {
    if (this.format === 'none') return value;

    const numValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
    if (isNaN(numValue)) return value;

    switch (this.format) {
      case 'currency':
        return `${this.currency}${numValue.toLocaleString()}`;
      case 'percentage':
        return `${numValue}%`;
      case 'number':
        return numValue.toLocaleString();
      default:
        return value;
    }
  }

  private _renderIcon(): TemplateResult {
    if (!this.icon && !this.slotHasContent('icon')) return html``;

    return html`
      <div part="icon" class="skill-stat-card__icon skill-stat-card__icon--${this.iconPosition}">
        <slot name="icon">
          <skill-icon name="${this.icon}" size="${this._getIconSize()}"></skill-icon>
        </slot>
      </div>
    `;
  }

  private _renderTitle(): TemplateResult {
    const hasTitleSlot = this.slotHasContent('title');
    const titleContent = hasTitleSlot ? html`<slot name="title"></slot>` : this.title;

    if (!titleContent) return html``;

    return html`
      <div part="title" class="skill-stat-card__title">
        ${titleContent}
      </div>
    `;
  }

  private _renderValue(): TemplateResult {
    const hasValueSlot = this.slotHasContent('value');
    const valueContent = hasValueSlot ? html`<slot name="value"></slot>` : this._formatValue(this.value);

    if (!valueContent) return html``;

    return html`
      <div part="value" class="skill-stat-card__value">
        ${valueContent}
      </div>
    `;
  }

  private _renderSubtitle(): TemplateResult {
    const hasSubtitleSlot = this.slotHasContent('subtitle');
    const subtitleContent = hasSubtitleSlot ? html`<slot name="subtitle"></slot>` : this.subtitle;

    if (!subtitleContent) return html``;

    return html`
      <div part="subtitle" class="skill-stat-card__subtitle">
        ${subtitleContent}
      </div>
    `;
  }

  private _renderBadge(): TemplateResult {
    const hasBadgeSlot = this.slotHasContent('badge');
    if (!this.badge && !hasBadgeSlot) return html``;

    return html`
      <div part="badge" class="skill-stat-card__badge">
        <slot name="badge">
          <skill-badge
            color="${this.badgeColor}"
            size="sm"
            variant="light"
          >
            ${this.badge}
          </skill-badge>
        </slot>
      </div>
    `;
  }

  private _renderTrend(): TemplateResult {
    const hasTrendSlot = this.slotHasContent('trend');
    if (!this.trend && !hasTrendSlot) return html``;

    return html`
      <div part="trend" class="skill-stat-card__trend">
        <slot name="trend">
          ${this.trend ? html`
            <div class="skill-stat-card__trend-content">
              <skill-icon
                name="trending-${this.trend.direction}"
                size="xs"
                class="skill-stat-card__trend-icon skill-stat-card__trend-icon--${this.trend.direction}"
              ></skill-icon>
              <span class="skill-stat-card__trend-value">${this.trend.value}%</span>
              ${this.trend.label ? html`
                <span class="skill-stat-card__trend-label">${this.trend.label}</span>
              ` : ''}
            </div>
          ` : ''}
        </slot>
      </div>
    `;
  }

  private _renderProgress(): TemplateResult {
    if (this.progress === undefined) return html``;

    return html`
      <div part="progress" class="skill-stat-card__progress">
        <skill-progress
          value="${this.progress}"
          color="${this.progressColor}"
          size="sm"
          value-position="hidden"
          label-position="hidden"
        ></skill-progress>
      </div>
    `;
  }

  private _renderActions(): TemplateResult {
    if (!this.slotHasContent('actions')) return html``;

    return html`
      <div part="actions" class="skill-stat-card__actions">
        <slot name="actions"></slot>
      </div>
    `;
  }

  private _renderExtra(): TemplateResult {
    if (!this.slotHasContent('extra')) return html``;

    return html`
      <div part="extra" class="skill-stat-card__extra">
        <slot name="extra"></slot>
      </div>
    `;
  }

  private _renderEmpty(): TemplateResult {
    if (!this.empty) return html``;

    return html`
      <div part="empty" class="skill-stat-card__empty">
        <skill-icon name="inbox" size="lg" class="skill-stat-card__empty-icon"></skill-icon>
        <div class="skill-stat-card__empty-text">${this.emptyText}</div>
      </div>
    `;
  }

  private _renderLoading(): TemplateResult {
    if (!this.loading) return html``;

    return html`
      <div part="loading" class="skill-stat-card__loading">
        <skill-spinner size="md"></skill-spinner>
      </div>
    `;
  }

  private _renderHeader(): TemplateResult {
    const hasHeader = this.slotHasContent('header');
    if (hasHeader) {
      return html`<slot name="header"></slot>`;
    }

    return html`
      <div part="header" class="skill-stat-card__header">
        ${this._renderTitle()}
        ${this._renderBadge()}
        ${this._renderActions()}
      </div>
    `;
  }

  private _renderContent(): TemplateResult {
    return html`
      <div part="content" class="skill-stat-card__content">
        ${this._renderValue()}
        ${this._renderSubtitle()}
        ${this._renderTrend()}
        ${this._renderProgress()}
        ${this._renderExtra()}
      </div>
    `;
  }

  private _renderFooter(): TemplateResult {
    const hasFooter = this.slotHasContent('footer');
    if (hasFooter) {
      return html`<slot name="footer"></slot>`;
    }

    return html``;
  }

  private _getIconSize(): string {
    const sizeMap = {
      xs: 'sm',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl'
    };
    return sizeMap[this.size] || 'md';
  }

  private slotHasContent(slotName: string): boolean {
    const slot = this.shadowRoot?.querySelector(`slot[name="${slotName}"]`) as HTMLSlotElement;
    if (slot) {
      const nodes = slot.assignedNodes({ flatten: true });
      return nodes.some(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent?.trim() !== '';
        }
        return node.nodeType === Node.ELEMENT_NODE;
      });
    }
    return false;
  }

  private _handleClick(e: Event) {
    if (!this.clickable) return;

    this.dispatchEvent(
      new CustomEvent('skill-stat-card-click', {
        bubbles: true,
        composed: true,
        detail: {
          originalEvent: e,
          title: this.title,
          value: this.value,
          trend: this.trend,
        },
      })
    );
  }

  render(): TemplateResult {
    if (this.empty) {
      return this._renderEmpty();
    }

    const containerClasses = {
      'skill-stat-card': true,
      'skill-stat-card--clickable': this.clickable,
      'skill-stat-card--loading': this.loading,
      'skill-stat-card--bordered': this.bordered,
      'skill-stat-card--animated': this.animated,
      [`skill-stat-card--${this.variant}`]: this.variant !== 'default',
      [`skill-stat-card--${this.color}`]: this.color !== 'gray',
      [`skill-stat-card--${this.size}`]: this.size !== 'md',
      [`skill-stat-card--shadow-${this.shadow}`]: this.shadow !== 'sm',
      [`skill-stat-card--bg-${this.background}`]: this.background !== 'default',
      [`skill-stat-card--icon-${this.iconPosition}`]: true,
    };

    return html`
      <div
        part="card"
        class=${Object.keys(containerClasses).join(' ')}
        role="${this.clickable ? 'button' : 'region'}"
        aria-label="${this.ariaLabel || ''}"
        tabindex="${this.clickable ? '0' : '-1'}"
        @click=${this._handleClick}
        @keydown=${(e: KeyboardEvent) => {
          if (this.clickable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            this._handleClick(e);
          }
        }}
      >
        ${this._renderLoading()}
        ${this._renderHeader()}

        <div class="skill-stat-card__main">
          ${this.iconPosition === 'top' ? this._renderIcon() : ''}
          <div class="skill-stat-card__body">
            ${this.iconPosition !== 'top' ? this._renderIcon() : ''}
            ${this._renderContent()}
          </div>
        </div>

        ${this._renderFooter()}
      </div>
    `;
  }

  /**
   * Update value with optional animation
   */
  public setValue(newValue: string, animate: boolean = false) {
    if (animate && this.animated && newValue !== this.value) {
      this._animateValueChange(this.value, newValue);
    } else {
      this._previousValue = this.value;
      this.value = newValue;
      this._fireChangeEvent();
    }
  }

  private _animateValueChange(_from: string, to: string) {
    // Simple animation implementation
    this._previousValue = this.value;

    // Add animation class
    this.classList.add('skill-stat-card--value-changing');

    setTimeout(() => {
      this.value = to;
      this._fireChangeEvent();
      this.classList.remove('skill-stat-card--value-changing');
    }, 150);
  }

  private _fireChangeEvent() {
    this.dispatchEvent(
      new CustomEvent('skill-stat-card-change', {
        bubbles: true,
        composed: true,
        detail: {
          previousValue: this._previousValue,
          currentValue: this.value,
          title: this.title,
        },
      })
    );
  }

  /**
   * Get current state
   */
  public get state() {
    return {
      title: this.title,
      value: this.value,
      subtitle: this.subtitle,
      icon: this.icon,
      badge: this.badge,
      badgeColor: this.badgeColor,
      progress: this.progress,
      progressColor: this.progressColor,
      trend: this.trend,
      variant: this.variant,
      color: this.color,
      size: this.size,
      clickable: this.clickable,
      loading: this.loading,
      empty: this.empty,
    };
  }

  /**
   * Set loading state
   */
  public setLoading(loading: boolean) {
    this.loading = loading;
  }

  /**
   * Set empty state
   */
  public setEmpty(empty: boolean) {
    this.empty = empty;
  }

  /**
   * Update trend
   */
  public setTrend(trend: StatCardTrend | undefined) {
    this.trend = trend;
  }

  /**
   * Update progress
   */
  public setProgress(value: number) {
    this.progress = Math.max(0, Math.min(100, value));
  }

  /**
   * Focus the card
   */
  public focus() {
    if (this.clickable) {
      const element = this.shadowRoot?.querySelector('.skill-stat-card') as HTMLElement;
      element?.focus();
    }
  }

  /**
   * Blur the card
   */
  public blur() {
    const element = this.shadowRoot?.querySelector('.skill-stat-card') as HTMLElement;
    element?.blur();
  }

  /**
   * Reset to default state
   */
  public reset() {
    this.loading = false;
    this.empty = false;
    this.progress = undefined;
    this.trend = undefined;
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-stat-card': SkillStatCard;
  }
}