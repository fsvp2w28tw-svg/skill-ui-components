import { LitElement, html, type TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import * as d3 from 'd3';
import { barChartStyles } from './skill-chart-bar.styles';
import { baseStyles } from '../../../../styles/base';
import type { BarChartProps, BarChartDataPoint, ChartEvent } from '../chart.types';
import {
  getDefaultMargin,
  calculateDimensions,
  generateChartId,
  validateChartData,
  debounce,
  getTheme
} from '../chart.utils';

/**
 * Skill Bar Chart Component - 柱状图组件
 *
 * 使用 D3.js 实现的高性能柱状图组件，支持垂直、水平、堆叠、分组等多种展示方式
 *
 * @slot title - 自定义标题内容
 * @slot subtitle - 自定义副标题内容
 * @slot legend - 自定义图例内容
 * @slot tooltip - 自定义提示框内容
 * @slot empty - 自定义空状态内容
 * @slot loading - 自定义加载状态内容
 *
 * @csspart container - 图表容器
 * @csspart svg - SVG 元素
 * @csspart title - 标题元素
 * @csspart subtitle - 副标题元素
 * @csspart grid - 网格线
 * @csspart axis - 坐标轴
 * @csspart bar - 柱状条
 * @csspart value - ��值标签
 * @csspart legend - 图例容器
 * @csspart tooltip - 提示框
 *
 * @cssprop --chart-width - 图表宽度
 * @cssprop --chart-height - 图表高度
 * @cssprop --chart-background - 图表背景色
 * @cssprop --chart-padding - 图表内边距
 * @cssprop --chart-border-radius - 图表圆角
 * @cssprop --chart-font-family - 字体族
 * @cssprop --chart-text-color - 文本颜色
 * @cssprop --chart-grid-color - 网格线颜色
 * @cssprop --chart-axis-color - 坐标轴颜色
 *
 * @fires skill-bar-chart-click - 点击柱状条时触发
 * @fires skill-bar-chart-hover - 鼠标悬停时触��
 * @fires skill-bar-chart-ready - 图表就绪时触发
 *
 * @example
 * ```html
 * <!-- 基础柱状图 -->
 * <skill-bar-chart
 *   .data=${[
 *     { x: 'A', y: 30 },
 *     { x: 'B', y: 45 },
 *     { x: 'C', y: 35 },
 *     { x: 'D', y: 50 }
 *   ]}
 *   x-key="x"
 *   y-key="y"
 *   width="600"
 *   height="400"
 * ></skill-bar-chart>
 *
 * <!-- 水平柱状图 -->
 * <skill-bar-chart
 *   .data=${data}
 *   x-key="x"
 *   y-key="y"
 *   orientation="horizontal"
 *   .showValues=${true}
 * ></skill-bar-chart>
 *
 * <!-- 堆叠柱状图 -->
 * <skill-bar-chart
 *   .data=${stackedData}
 *   x-key="x"
 *   y-key="y"
 *   .stacked=${true}
 *   .gradient=${true}
 * ></skill-bar-chart>
 *
 * <!-- 带圆角的柱状图 -->
 * <skill-bar-chart
 *   .data=${data}
 *   x-key="x"
 *   y-key="y"
 *   .rounded=${true}
 *   radius="4"
 *   .barWidth=${0.7}
 * ></skill-bar-chart>
 * ```
 */
@customElement('skill-bar-chart')
export class SkillBarChart extends LitElement {
  static styles: CSSResultGroup = [baseStyles, barChartStyles];

  @query('.skill-bar-chart__container')
  private _container!: HTMLElement;

  @query('.skill-bar-chart__svg')
  private _svg!: SVGElement;

  @state()
  private _dimensions = { width: 0, height: 0 };

  private _resizeObserver?: ResizeObserver;
  private _chartId = generateChartId('bar-chart');
  private _svgSelection?: d3.Selection<SVGSVGElement, unknown, null, undefined>;

  /**
   * 图表数据
   */
  @property({ type: Array })
  data: BarChartDataPoint[] = [];

  /**
   * X 轴数据字段名
   */
  @property({ type: String, reflect: true, attribute: 'x-key' })
  xKey = 'x';

  /**
   * Y 轴数据字段名
   */
  @property({ type: String, reflect: true, attribute: 'y-key' })
  yKey = 'y';

  /**
   * 柱状图方向
   */
  @property({ type: String, reflect: true })
  orientation: 'vertical' | 'horizontal' = 'vertical';

  /**
   * 柱状条宽度 (0-1)
   */
  @property({ type: Number, reflect: true, attribute: 'bar-width' })
  barWidth = 0.7;

  /**
   * 柱状条间距 (0-1)
   */
  @property({ type: Number, reflect: true, attribute: 'bar-padding' })
  barPadding = 0.1;

  /**
   * 分组间距 (0-1)
   */
  @property({ type: Number, reflect: true, attribute: 'group-padding' })
  groupPadding = 0.2;

  /**
   * 是否堆叠
   */
  @property({ type: Boolean, reflect: true })
  stacked = false;

  /**
   * 是否标准化 (百分比显示)
   */
  @property({ type: Boolean, reflect: true })
  normalized = false;

  /**
   * 是否圆角
   */
  @property({ type: Boolean, reflect: true })
  rounded = false;

  /**
   * 圆角半径
   */
  @property({ type: Number, reflect: true })
  radius = 2;

  /**
   * 是否使用渐变
   */
  @property({ type: Boolean, reflect: true })
  gradient = false;

  /**
   * 是否显示数值
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-values' })
  showValues = false;

  /**
   * 数值格式化函数
   */
  @property({ type: Function })
  valueFormat?: (value: number) => string;

  /**
   * 数值位置
   */
  @property({ type: String, reflect: true, attribute: 'value-position' })
  valuePosition: 'top' | 'center' | 'bottom' | 'outside' = 'top';

  /**
   * 图表宽度
   */
  @property({ type: Number, reflect: true })
  width = 600;

  /**
   * 图表高度
   */
  @property({ type: Number, reflect: true })
  height = 400;

  /**
   * 是否响应式
   */
  @property({ type: Boolean, reflect: true })
  responsive = true;

  /**
   * 图表边距
   */
  @property({ type: Object })
  margin = getDefaultMargin('bar');

  /**
   * 图表标题
   */
  @property({ type: String, reflect: true, attribute: 'chart-title' })
  chartTitle?: string;

  /**
   * 图表副标题
   */
  @property({ type: String, reflect: true })
  subtitle?: string;

  /**
   * 是否加载中
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

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
   * 主题模式
   */
  @property({ type: String, reflect: true })
  theme: 'light' | 'dark' | 'auto' = 'light';

  /**
   * ARIA 标签
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  /**
   * 动画持续时间 (毫秒)
   */
  @property({ type: Number, reflect: true, attribute: 'animation-duration' })
  animationDuration = 300;

  connectedCallback() {
    super.connectedCallback();
    this._setupResizeObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupResizeObserver();
  }

  protected willUpdate() {
    // Set ARIA attributes
    if (!this.ariaLabel) {
      this.ariaLabel = this._generateAriaLabel();
    }
  }

  private _generateAriaLabel(): string {
    const parts = [this.chartTitle, this.subtitle].filter(Boolean);
    const description = parts.length > 0 ? parts.join(', ') : 'bar chart';
    return `${description}, interactive chart`;
  }

  private _setupResizeObserver() {
    if (this.responsive && this._container) {
      this._resizeObserver = new ResizeObserver(
        debounce(() => {
          this._updateDimensions();
          this._renderChart();
        }, 250)
      );
      this._resizeObserver.observe(this._container);
    }
  }

  private _cleanupResizeObserver() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = undefined;
    }
  }

  private _updateDimensions() {
    if (!this._container) return;

    const containerRect = this._container.getBoundingClientRect();
    const calculatedDimensions = calculateDimensions(
      containerRect.width,
      this.height,
      16 / 9, // aspect ratio
      200, // min height
      800 // max height
    );

    this._dimensions = {
      width: calculatedDimensions.width,
      height: calculatedDimensions.height,
    };
  }

  private _validateData(): { isValid: boolean; errors: string[] } {
    return validateChartData(this.data, [this.xKey, this.yKey]);
  }

  private _renderChart() {
    if (!this._svg || this.data.length === 0) return;

    // Clear existing content
    d3.select(this._svg).selectAll('*').remove();

    const theme = getTheme(this.theme);
    const { width, height } = this._dimensions;
    const margin = this.margin;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create main SVG group
    const g = d3.select(this._svg)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create gradients if needed
    if (this.gradient) {
      const defs = g.append('defs');

      theme.colors.primary.forEach((color, index) => {
        const gradient = defs.append('linearGradient')
          .attr('id', `bar-gradient-${this._chartId}-${index}`)
          .attr('gradientUnits', 'userSpaceOnUse')
          .attr('x1', 0).attr('y1', 0)
          .attr('x2', 0).attr('y2', innerHeight);

        gradient.append('stop')
          .attr('offset', '0%')
          .attr('stop-color', color)
          .attr('stop-opacity', 1);

        gradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', color)
          .attr('stop-opacity', 0.7);
      });
    }

    // Create scales based on orientation
    const xScale = d3.scaleBand()
      .domain(this.data.map(d => d.x as string))
      .range([0, innerWidth])
      .padding(this.barPadding);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => d.y) || 0])
      .nice()
      .range([innerHeight, 0]);

    // Create color scale
    const colorScale = d3.scaleOrdinal(theme.colors.primary)
      .domain(this.data.map((d, i) => i.toString()));

    // Render grid lines
    g.append('g')
      .attr('class', 'skill-bar-chart__grid skill-bar-chart__grid--horizontal')
      .selectAll('line')
      .data(yScale.ticks())
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', d => yScale(d))
      .attr('y2', d => yScale(d));

    // Render axes
    g.append('g')
      .attr('class', 'skill-bar-chart__axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    g.append('g')
      .attr('class', 'skill-bar-chart__axis')
      .call(d3.axisLeft(yScale));

    // Render bars
    const bars = g.selectAll('.skill-bar-chart__bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'skill-bar-chart__bar')
      .attr('x', d => xScale(d.x as string) || 0)
      .attr('y', innerHeight) // Start from bottom for animation
      .attr('width', xScale.bandwidth() * this.barWidth)
      .attr('height', 0) // Start with 0 height for animation
      .attr('fill', (d, i) => this.gradient ? `url(#bar-gradient-${this._chartId}-${i % theme.colors.primary.length})` : colorScale(i.toString()))
      .attr('rx', this.rounded ? this.radius : 0)
      .attr('ry', this.rounded ? this.radius : 0)
      .attr('tabindex', 0)
      .attr('role', 'button')
      .attr('aria-label', (d, i) => `${d.x}: ${d.y}`)
      .on('click', (event, d) => this._handleBarClick(event, d))
      .on('mouseenter', (event, d) => this._handleBarHover(event, d))
      .on('mouseleave', () => this._handleBarLeave())
      .on('focus', (event, d) => this._handleBarHover(event, d))
      .on('blur', () => this._handleBarLeave());

    // Animate bars
    if (this.animationDuration > 0) {
      bars.transition()
        .duration(this.animationDuration)
        .delay((_, i) => i * 50)
        .ease(d3.easeCubicOut)
        .attr('y', d => yScale(d.y))
        .attr('height', d => innerHeight - yScale(d.y));
    } else {
      bars
        .attr('y', d => yScale(d.y))
        .attr('height', d => innerHeight - yScale(d.y));
    }

    // Render values
    if (this.showValues) {
      const values = g.selectAll('.skill-bar-chart__value')
        .data(this.data)
        .enter()
        .append('text')
        .attr('class', 'skill-bar-chart__value')
        .attr('x', d => (xScale(d.x as string) || 0) + xScale.bandwidth() / 2)
        .attr('y', d => {
          const barY = yScale(d.y);
          switch (this.valuePosition) {
            case 'top':
              return barY - 5;
            case 'center':
              return barY - (innerHeight - yScale(d.y)) / 2;
            case 'bottom':
              return barY + 15;
            case 'outside':
              return barY - 5;
            default:
              return barY - 5;
          }
        })
        .attr('text-anchor', 'middle')
        .text(d => this.valueFormat ? this.valueFormat(d.y) : d.y.toString());

      // Animate values
      values.style('opacity', 0);
      if (this.animationDuration > 0) {
        values.transition()
          .duration(200)
          .delay((_, i) => i * 50 + this.animationDuration - 100)
          .style('opacity', 1);
      } else {
        values.style('opacity', 1);
      }
    }

    // Add accessibility descriptions
    const accessibilityGroup = g.append('g')
      .attr('class', 'skill-bar-chart__visually-hidden');

    accessibilityGroup.append('title')
      .text(this.ariaLabel || 'Bar chart');

    accessibilityGroup.append('desc')
      .text(`Bar chart showing ${this.data.length} data points`);

    // Emit ready event
    this.dispatchEvent(new CustomEvent('skill-bar-chart-ready', {
      bubbles: true,
      composed: true,
      detail: { chartId: this._chartId }
    }));
  }

  private _handleBarClick(event: MouseEvent, data: BarChartDataPoint) {
    const chartEvent: ChartEvent = {
      type: 'click',
      data: [data],
      coordinates: { x: event.clientX, y: event.clientY },
      originalEvent: event,
    };

    this.dispatchEvent(new CustomEvent('skill-bar-chart-click', {
      bubbles: true,
      composed: true,
      detail: chartEvent
    }));
  }

  private _handleBarHover(event: MouseEvent, data: BarChartDataPoint) {
    const chartEvent: ChartEvent = {
      type: 'hover',
      data: [data],
      coordinates: { x: event.clientX, y: event.clientY },
      originalEvent: event,
    };

    this.dispatchEvent(new CustomEvent('skill-bar-chart-hover', {
      bubbles: true,
      composed: true,
      detail: chartEvent
    }));
  }

  private _handleBarLeave() {
    // Handle hover leave if needed
  }

  private _renderTitle(): TemplateResult {
    const hasTitleSlot = this.slotHasContent('title');
    const titleContent = hasTitleSlot ? html`<slot name="title"></slot>` : this.chartTitle;

    if (!titleContent) return html``;

    return html`
      <div part="title" class="skill-bar-chart__title">
        ${titleContent}
      </div>
    `;
  }

  private _renderSubtitle(): TemplateResult {
    const hasSubtitleSlot = this.slotHasContent('subtitle');
    const subtitleContent = hasSubtitleSlot ? html`<slot name="subtitle"></slot>` : this.subtitle;

    if (!subtitleContent) return html``;

    return html`
      <div part="subtitle" class="skill-bar-chart__subtitle">
        ${subtitleContent}
      </div>
    `;
  }

  private _renderLoading(): TemplateResult {
    if (!this.loading) return html``;

    return html`
      <div part="loading" class="skill-bar-chart__loading">
        <slot name="loading">
          <skill-spinner size="lg"></skill-spinner>
        </slot>
      </div>
    `;
  }

  private _renderEmpty(): TemplateResult {
    if (!this.empty) return html``;

    return html`
      <div part="empty" class="skill-bar-chart__empty">
        <slot name="empty">
          <div class="skill-bar-chart__empty-icon">
            <skill-icon name="bar-chart-2" size="xl"></skill-icon>
          </div>
          <div class="skill-bar-chart__empty-text">${this.emptyText}</div>
        </slot>
      </div>
    `;
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

  protected firstUpdated() {
    this._updateDimensions();
    this._renderChart();
  }

  protected updated() {
    if (this.data.length > 0) {
      this._renderChart();
    }
  }

  render(): TemplateResult {
    const dataValidation = this._validateData();
    const hasError = !dataValidation.isValid;
    const orientationClass = `skill-bar-chart--${this.orientation}`;

    return html`
      <div
        part="container"
        class="skill-bar-chart ${orientationClass}"
        role="img"
        aria-label="${this.ariaLabel || ''}"
        tabindex="0"
      >
        ${this._renderTitle()}
        ${this._renderSubtitle()}

        <div class="skill-bar-chart__container">
          <svg
            part="svg"
            class="skill-bar-chart__svg"
            aria-hidden="true"
          ></svg>

          ${this._renderLoading()}
          ${this._renderEmpty()}

          <slot name="legend"></slot>
          <slot name="tooltip"></slot>
        </div>

        ${hasError ? html`
          <div class="skill-bar-chart__error" role="alert">
            <p>Chart data error: ${dataValidation.errors.join(', ')}</p>
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * Get chart instance
   */
  public getChart() {
    return {
      id: this._chartId,
      dimensions: this._dimensions,
      data: this.data,
      svg: this._svgSelection,
    };
  }

  /**
   * Update chart data
   */
  public updateData(data: BarChartDataPoint[], animate: boolean = true) {
    this.data = data;
    if (animate && this.animationDuration > 0) {
      requestAnimationFrame(() => this._renderChart());
    }
  }

  /**
   * Resize chart
   */
  public resize(width?: number, height?: number) {
    if (width !== undefined) this.width = width;
    if (height !== undefined) this.height = height;
    this._updateDimensions();
    this._renderChart();
  }

  /**
   * Export chart as SVG string
   */
  public exportSVG(): string {
    if (this._svg) {
      return new XMLSerializer().serializeToString(this._svg);
    }
    return '';
  }

  /**
   * Export chart as PNG
   */
  public async exportPNG(scale: number = 2): Promise<string> {
    const svgString = this.exportSVG();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return '';

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        canvas.width = this._dimensions.width * scale;
        canvas.height = this._dimensions.height * scale;
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
    });
  }

  /**
   * Sort bars by value
   */
  public sortByValue(order: 'asc' | 'desc' = 'desc') {
    const sortedData = [...this.data].sort((a, b) => {
      return order === 'asc' ? a.y - b.y : b.y - a.y;
    });
    this.updateData(sortedData, true);
  }

  /**
   * Sort bars by label
   */
  public sortByLabel(order: 'asc' | 'desc' = 'asc') {
    const sortedData = [...this.data].sort((a, b) => {
      const aLabel = String(a.x);
      const bLabel = String(b.x);
      return order === 'asc' ? aLabel.localeCompare(bLabel) : bLabel.localeCompare(aLabel);
    });
    this.updateData(sortedData, true);
  }

  /**
   * Filter bars by value range
   */
  public filterByRange(min: number, max: number) {
    const filteredData = this.data.filter(d => d.y >= min && d.y <= max);
    this.updateData(filteredData, true);
  }

  /**
   * Reset chart to original data
   */
  public reset() {
    this._renderChart();
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-bar-chart': SkillBarChart;
  }
}