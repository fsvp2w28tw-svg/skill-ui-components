import { LitElement, html, type TemplateResult, css, CSSResultGroup } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import * as d3 from 'd3';
import { lineChartStyles } from './skill-chart-line.styles';
import { baseStyles } from '../../../../styles/base';
import type { LineChartProps, LineChartDataPoint, ChartEvent } from '../chart.types';
import {
  getDefaultMargin,
  calculateDimensions,
  generateChartId,
  validateChartData,
  debounce,
  getTheme
} from '../chart.utils';

/**
 * Skill Line Chart Component - 折线图组件
 *
 * 使用 D3.js 实现的高性能折线图组件，支持时间序列、趋势分析等数据可视化
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
 * @csspart line - 折线
 * @csspart area - 面积图
 * @csspart marker - 数据点标记
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
 * @fires skill-line-chart-click - 点击数据点时触发
 * @fires skill-line-chart-hover - 鼠标悬停时触发
 * @fires skill-line-chart-zoom - 缩放时触发
 * @fires skill-line-chart-ready - 图表就绪时触发
 *
 * @example
 * ```html
 * <!-- 基础折线图 -->
 * <skill-line-chart
 *   .data=${[
 *     { x: 'Jan', y: 30 },
 *     { x: 'Feb', y: 45 },
 *     { x: 'Mar', y: 35 },
 *     { x: 'Apr', y: 50 }
 *   ]}
 *   x-key="x"
 *   y-key="y"
 *   width="600"
 *   height="400"
 * ></skill-line-chart>
 *
 * <!-- 带时间轴的折线图 -->
 * <skill-line-chart
 *   .data=${timeSeriesData}
 *   x-key="date"
 *   y-key="value"
 *   curve="monotone"
 *   .markers=${true}
 *   .tooltip=${{ show: true }}
 * ></skill-line-chart>
 *
 * <!-- 面积图 -->
 * <skill-line-chart
 *   .data=${data}
 *   x-key="x"
 *   y-key="y"
 *   .area=${true}
 *   .gradient=${true}
 *   fill-opacity="0.3"
 * ></skill-line-chart>
 *
 * <!-- 多系列折线图 -->
 * <skill-line-chart
 *   .data=${multiSeriesData}
 *   x-key="x"
 *   y-key="y"
 *   .series=${['series1', 'series2']}
 *   .legend=${{ show: true, position: 'right' }}
 * ></skill-line-chart>
 * ```
 */
@customElement('skill-line-chart')
export class SkillLineChart extends LitElement {
  static styles: CSSResultGroup = [baseStyles, lineChartStyles];

  @query('.skill-line-chart__container')
  private _container!: HTMLElement;

  @query('.skill-line-chart__svg')
  private _svg!: SVGElement;

  @state()
  private _dimensions = { width: 0, height: 0 };

  private _resizeObserver?: ResizeObserver;
  private _chartId = generateChartId('line-chart');
  private _svgSelection?: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private _currentTransform = d3.zoomIdentity;

  /**
   * 图表数据
   */
  @property({ type: Array })
  data: LineChartDataPoint[] = [];

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
   * 曲线类型
   */
  @property({ type: String, reflect: true })
  curve: 'linear' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter' | 'basis' | 'cardinal' | 'catmullRom' = 'linear';

  /**
   * 线条宽度
   */
  @property({ type: Number, reflect: true, attribute: 'stroke-width' })
  strokeWidth = 2;

  /**
   * 虚线样式 (例如: "5,5")
   */
  @property({ type: String, reflect: true, attribute: 'stroke-dasharray' })
  strokeDasharray?: string;

  /**
   * 是否显示面积图
   */
  @property({ type: Boolean, reflect: true })
  area = false;

  /**
   * 填充透明度 (0-1)
   */
  @property({ type: Number, reflect: true, attribute: 'fill-opacity' })
  fillOpacity = 0.2;

  /**
   * 是否显示数据点标记
   */
  @property({ type: Boolean, reflect: true })
  markers = false;

  /**
   * 标记大小
   */
  @property({ type: Number, reflect: true, attribute: 'marker-size' })
  markerSize = 4;

  /**
   * 标记形状
   */
  @property({ type: String, reflect: true, attribute: 'marker-shape' })
  markerShape: 'circle' | 'square' | 'triangle' | 'diamond' | 'star' = 'circle';

  /**
   * 是否使用渐变
   */
  @property({ type: Boolean, reflect: true })
  gradient = false;

  /**
   * 是否平滑曲线
   */
  @property({ type: Boolean, reflect: true })
  smooth = false;

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
  margin = getDefaultMargin('line');

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
    const description = parts.length > 0 ? parts.join(', ') : 'line chart';
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

  private _getCurveFunction(): d3.CurveFactory {
    const curveMap: Record<string, d3.CurveFactory> = {
      linear: d3.curveLinear,
      monotone: d3.curveMonotoneX,
      step: d3.curveStep,
      stepBefore: d3.curveStepBefore,
      stepAfter: d3.curveStepAfter,
      basis: d3.curveBasis,
      cardinal: d3.curveCardinal,
      catmullRom: d3.curveCatmullRom,
    };
    return curveMap[this.curve] || d3.curveLinear;
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

    // Create scales
    // Check if x values are strings or numbers
    const xValues = this.data.map(d => d.x);
    const isStringX = xValues.some(val => typeof val === 'string');

    let xScale: d3.ScaleLinear<number, number> | d3.ScaleBand<string>;

    if (isStringX) {
      // Use band scale for string labels
      xScale = d3.scaleBand()
        .domain(xValues as string[])
        .range([0, innerWidth])
        .padding(0.1);
    } else {
      // Use linear scale for numeric values
      xScale = d3.scaleLinear()
        .domain(d3.extent(this.data, d => d.x as number) as [number, number])
        .range([0, innerWidth]);
    }

    const yScale = d3.scaleLinear()
      .domain(d3.extent(this.data, d => d.y) as [number, number])
      .nice()
      .range([innerHeight, 0]);

    // Create line generator
    const line = d3.line<LineChartDataPoint>()
      .x(d => {
        const xValue = d.x;
        if (typeof xScale === 'function' && 'bandwidth' in xScale) {
          // Band scale for strings
          const bandScale = xScale as d3.ScaleBand<string>;
          const center = bandScale(xValue as string);
          return center ? center + bandScale.bandwidth() / 2 : 0;
        } else {
          // Linear scale for numbers
          return (xScale as d3.ScaleLinear<number, number>)(xValue as number);
        }
      })
      .y(d => yScale(d.y))
      .curve(this._getCurveFunction());

    // Create area generator
    const area = d3.area<LineChartDataPoint>()
      .x(d => {
        const xValue = d.x;
        if (typeof xScale === 'function' && 'bandwidth' in xScale) {
          // Band scale for strings
          const bandScale = xScale as d3.ScaleBand<string>;
          const center = bandScale(xValue as string);
          return center ? center + bandScale.bandwidth() / 2 : 0;
        } else {
          // Linear scale for numbers
          return (xScale as d3.ScaleLinear<number, number>)(xValue as number);
        }
      })
      .y0(innerHeight)
      .y1(d => yScale(d.y))
      .curve(this._getCurveFunction());

    // Create gradients if needed
    if (this.gradient) {
      const defs = g.append('defs');

      const gradient = defs.append('linearGradient')
        .attr('id', `area-gradient-${this._chartId}`)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0).attr('y1', innerHeight)
        .attr('x2', 0).attr('y2', 0);

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', theme.colors.primary[0])
        .attr('stop-opacity', 0.1);

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', theme.colors.primary[0])
        .attr('stop-opacity', 0.3);
    }

    // Render grid lines
    g.append('g')
      .attr('class', 'skill-line-chart__grid skill-line-chart__grid--horizontal')
      .selectAll('line')
      .data(yScale.ticks())
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', d => yScale(d))
      .attr('y2', d => yScale(d));

    g.append('g')
      .attr('class', 'skill-line-chart__grid skill-line-chart__grid--vertical')
      .selectAll('line')
      .data(isStringX ? [] : (xScale as d3.ScaleLinear<number, number>).ticks()) // Only show vertical grid for numeric data
      .enter()
      .append('line')
      .attr('x1', d => (xScale as d3.ScaleLinear<number, number>)(d))
      .attr('x2', d => (xScale as d3.ScaleLinear<number, number>)(d))
      .attr('y1', 0)
      .attr('y2', innerHeight);

    // Render axes
    g.append('g')
      .attr('class', 'skill-line-chart__axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(isStringX ? d3.axisBottom(xScale as d3.ScaleBand<string>) : d3.axisBottom(xScale as d3.ScaleLinear<number, number>));

    g.append('g')
      .attr('class', 'skill-line-chart__axis')
      .call(d3.axisLeft(yScale));

    // Render area
    if (this.area) {
      g.append('path')
        .datum(this.data)
        .attr('class', 'skill-line-chart__line skill-line-chart__line--area')
        .attr('fill', this.gradient ? `url(#area-gradient-${this._chartId})` : theme.colors.primary[0] || '#3B82F6')
        .attr('fill-opacity', this.fillOpacity)
        .attr('d', area);
    }

    // Render line
    const path = g.append('path')
      .datum(this.data)
      .attr('class', 'skill-line-chart__line')
      .attr('fill', 'none')
      .attr('stroke', theme.colors.primary[0] || '#3B82F6')
      .attr('stroke-width', this.strokeWidth)
      .attr('stroke-dasharray', this.strokeDasharray || '')
      .attr('d', line);

    // Animate line drawing
    if (this.animationDuration > 0) {
      const length = path.node()?.getTotalLength() || 0;
      path
        .attr('stroke-dasharray', `${length}`)
        .attr('stroke-dashoffset', length)
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);
    }

    // Render markers
    if (this.markers) {
      g.selectAll('.skill-line-chart__marker')
        .data(this.data)
        .enter()
        .append('circle')
        .attr('class', 'skill-line-chart__marker')
        .attr('cx', d => {
          const xValue = d.x;
          if (typeof xScale === 'function' && 'bandwidth' in xScale) {
            // Band scale for strings
            const bandScale = xScale as d3.ScaleBand<string>;
            const center = bandScale(xValue as string);
            return center ? center + bandScale.bandwidth() / 2 : 0;
          } else {
            // Linear scale for numbers
            const linearScale = xScale as d3.ScaleLinear<number, number>;
            return linearScale(xValue as number);
          }
        })
        .attr('cy', d => yScale(d.y))
        .attr('r', 0)
        .attr('fill', theme.colors.primary[0])
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .on('click', (event, d) => this._handleDataPointClick(event, d))
        .on('mouseenter', (event, d) => this._handleDataPointHover(event, d))
        .on('mouseleave', () => this._handleDataPointLeave())
        .transition()
        .delay((_, i) => i * 20)
        .duration(this.animationDuration)
        .attr('r', this.markerSize);
    }

    // Setup zoom if needed
    this._setupZoom(g, xScale as any, yScale, line, area, isStringX);

    // Emit ready event
    this.dispatchEvent(new CustomEvent('skill-line-chart-ready', {
      bubbles: true,
      composed: true,
      detail: { chartId: this._chartId }
    }));
  }

  private _setupZoom(
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    xScale: d3.ScaleLinear<number, number> | d3.ScaleBand<string>,
    yScale: d3.ScaleLinear<number, number>,
    line: d3.Line<LineChartDataPoint>,
    area?: d3.Area<LineChartDataPoint>,
    isStringX: boolean = false
  ) {
    if (isStringX) {
      // Disable zoom for string-based charts
      console.log('Zoom is disabled for charts with string X-axis');
      return;
    }

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 10])
      .on('zoom', (event) => {
        const newXScale = event.transform.rescaleX(xScale as d3.ScaleLinear<number, number>);
        const newYScale = event.transform.rescaleY(yScale);

        // Update line generator with new scales
        const newLine = d3.line<LineChartDataPoint>()
          .x(d => newXScale(d.x as number))
          .y(d => newYScale(d.y))
          .curve(this._getCurveFunction());

        const newArea = area ? d3.area<LineChartDataPoint>()
          .x(d => newXScale(d.x as number))
          .y0(this._dimensions.height)
          .y1(d => newYScale(d.y))
          .curve(this._getCurveFunction()) : null;

        g.select('.skill-line-chart__line')
          .attr('d', newLine(this.data) as string);

        if (this.area && newArea) {
          g.select('.skill-line-chart__line--area')
            .attr('d', newArea(this.data) as string);
        }

        this._currentTransform = event.transform;

        this.dispatchEvent(new CustomEvent('skill-line-chart-zoom', {
          bubbles: true,
          composed: true,
          detail: { transform: event.transform }
        }));
      });

    d3.select(this._svg).call(zoom as any);
  }

  private _handleDataPointClick(event: MouseEvent, data: LineChartDataPoint) {
    const chartEvent: ChartEvent = {
      type: 'click',
      data: [data],
      coordinates: { x: event.clientX, y: event.clientY },
      originalEvent: event,
    };

    this.dispatchEvent(new CustomEvent('skill-line-chart-click', {
      bubbles: true,
      composed: true,
      detail: chartEvent
    }));
  }

  private _handleDataPointHover(event: MouseEvent, data: LineChartDataPoint) {
    const chartEvent: ChartEvent = {
      type: 'hover',
      data: [data],
      coordinates: { x: event.clientX, y: event.clientY },
      originalEvent: event,
    };

    this.dispatchEvent(new CustomEvent('skill-line-chart-hover', {
      bubbles: true,
      composed: true,
      detail: chartEvent
    }));
  }

  private _handleDataPointLeave() {
    // Handle hover leave if needed
  }

  private _renderTitle(): TemplateResult {
    const hasTitleSlot = this.slotHasContent('title');
    const titleContent = hasTitleSlot ? html`<slot name="title"></slot>` : this.chartTitle;

    if (!titleContent) return html``;

    return html`
      <div part="title" class="skill-line-chart__title">
        ${titleContent}
      </div>
    `;
  }

  private _renderSubtitle(): TemplateResult {
    const hasSubtitleSlot = this.slotHasContent('subtitle');
    const subtitleContent = hasSubtitleSlot ? html`<slot name="subtitle"></slot>` : this.subtitle;

    if (!subtitleContent) return html``;

    return html`
      <div part="subtitle" class="skill-line-chart__subtitle">
        ${subtitleContent}
      </div>
    `;
  }

  private _renderLoading(): TemplateResult {
    if (!this.loading) return html``;

    return html`
      <div part="loading" class="skill-line-chart__loading">
        <slot name="loading">
          <skill-spinner size="lg"></skill-spinner>
        </slot>
      </div>
    `;
  }

  private _renderEmpty(): TemplateResult {
    if (!this.empty) return html``;

    return html`
      <div part="empty" class="skill-line-chart__empty">
        <slot name="empty">
          <div class="skill-line-chart__empty-icon">
            <skill-icon name="trending-up" size="xl"></skill-icon>
          </div>
          <div class="skill-line-chart__empty-text">${this.emptyText}</div>
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

    return html`
      <div
        part="container"
        class="skill-line-chart"
        role="img"
        aria-label="${this.ariaLabel || ''}"
        tabindex="0"
      >
        ${this._renderTitle()}
        ${this._renderSubtitle()}

        <div class="skill-line-chart__container">
          <svg
            part="svg"
            class="skill-line-chart__svg"
            aria-hidden="true"
          ></svg>

          ${this._renderLoading()}
          ${this._renderEmpty()}

          <slot name="legend"></slot>
          <slot name="tooltip"></slot>
        </div>

        ${hasError ? html`
          <div class="skill-line-chart__error" role="alert">
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
  public updateData(data: LineChartDataPoint[], animate: boolean = true) {
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

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
    };

    return new Promise((resolve) => {
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
   * Reset zoom
   */
  public resetZoom() {
    if (this._svg) {
      const svg = d3.select(this._svg);
      (svg as any).transition().duration(300).call(d3.zoom<SVGSVGElement, unknown>().transform, d3.zoomIdentity);
    }
  }

  /**
   * Get data at position
   */
  public getDataAtPosition(x: number, y: number): LineChartDataPoint | null {
    // Implementation would depend on the current scales and data
    // This is a placeholder for finding the nearest data point
    return null;
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-line-chart': SkillLineChart;
  }
}