import { LitElement, html, type TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import * as d3 from 'd3';
import { pieChartStyles } from './skill-chart-pie.styles';
import { baseStyles } from '../../../../styles/base';
import type { PieChartProps, PieChartDataPoint, ChartEvent } from '../chart.types';
import {
  getDefaultMargin,
  calculateDimensions,
  generateChartId,
  validateChartData,
  debounce,
  getTheme,
  formatPercentage
} from '../chart.utils';

/**
 * Skill Pie Chart Component - 饼图组件
 *
 * 使用 D3.js 实现的高性能饼图组件，支持饼图、环形图、标签、图例等多种展示方式
 *
 * @slot title - 自定义标题内容
 * @slot subtitle - 自定义副标题内容
 * @slot legend - 自定义图例内容
 * @slot tooltip - 自定义提示框内容
 * @slot empty - 自定义空状态内容
 * @slot loading - 自定义加载状态内容
 * @slot center - 自定义中心区域内容
 *
 * @csspart container - 图表容器
 * @csspart svg - SVG 元素
 * @csspart title - 标题元素
 * @csspart subtitle - 副标题元素
 * @csspart slice - 饼图片段
 * @csspart label - 标签文本
 * @csspart center-text - 中心文本
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
 *
 * @fires skill-pie-chart-click - 点击饼图片段时触发
 * @fires skill-pie-chart-hover - 鼠标悬停时触发
 * @fires skill-pie-chart-ready - 图表就���时触发
 *
 * @example
 * ```html
 * <!-- 基础饼图 -->
 * <skill-pie-chart
 *   .data=${[
 *     { value: 30, label: 'Category A' },
 *     { value: 45, label: 'Category B' },
 *     { value: 25, label: 'Category C' }
 *   ]}
 *   value-key="value"
 *   label-key="label"
 *   width="600"
 *   height="400"
 * ></skill-pie-chart>
 *
 * <!-- 环形图 -->
 * <skill-pie-chart
 *   .data=${data}
 *   value-key="value"
 *   label-key="label"
 *   .innerRadius=${60}
 *   .showLabels=${true}
 * ></skill-pie-chart>
 *
 * <!-- 带图例的饼图 -->
 * <skill-pie-chart
 *   .data=${data}
 *   value-key="value"
 *   label-key="label"
 *   .legend=${{ show: true, position: 'right' }}
 *   .explodeOnHover=${true}
 * ></skill-pie-chart>
 *
 * <!-- 半圆饼图 -->
 * <skill-pie-chart
 *   .data=${data}
 *   value-key="value"
 *   label-key="label"
 *   startAngle="0"
 *   endAngle="180"
 * ></skill-pie-chart>
 * ```
 */
@customElement('skill-pie-chart')
export class SkillPieChart extends LitElement {
  static styles: CSSResultGroup = [baseStyles, pieChartStyles];

  @query('.skill-pie-chart__container')
  private _container!: HTMLElement;

  @query('.skill-pie-chart__svg')
  private _svg!: SVGElement;

  @state()
  private _dimensions = { width: 0, height: 0 };

  private _resizeObserver?: ResizeObserver;
  private _chartId = generateChartId('pie-chart');
  private _svgSelection?: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private _currentHoverIndex: number | null = null;

  /**
   * 图表数据
   */
  @property({ type: Array })
  data: PieChartDataPoint[] = [];

  /**
   * 数值字段名
   */
  @property({ type: String, reflect: true, attribute: 'value-key' })
  valueKey = 'value';

  /**
   * 标签字段名
   */
  @property({ type: String, reflect: true, attribute: 'label-key' })
  labelKey = 'label';

  /**
   * 内半径 (用于环形图)
   */
  @property({ type: Number, reflect: true, attribute: 'inner-radius' })
  innerRadius = 0;

  /**
   * 外半径
   */
  @property({ type: Number, reflect: true, attribute: 'outer-radius' })
  outerRadius?: number;

  /**
   * 起始角度 (度数)
   */
  @property({ type: Number, reflect: true, attribute: 'start-angle' })
  startAngle = 0;

  /**
   * 结束角度 (度数)
   */
  @property({ type: Number, reflect: true, attribute: 'end-angle' })
  endAngle = 360;

  /**
   * 扇形间距 (度数)
   */
  @property({ type: Number, reflect: true, attribute: 'pad-angle' })
  padAngle = 0;

  /**
   * 圆角半径
   */
  @property({ type: Number, reflect: true, attribute: 'corner-radius' })
  cornerRadius = 0;

  /**
   * 是否显示标签
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-labels' })
  showLabels = false;

  /**
   * 标签格式化函数
   */
  @property({ type: Function })
  labelFormat?: (value: number, label: string, percentage: number) => string;

  /**
   * 标签位置
   */
  @property({ type: String, reflect: true, attribute: 'label-position' })
  labelPosition: 'inside' | 'outside' | 'center' = 'inside';

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
   * 是否排序数值
   */
  @property({ type: Boolean, reflect: true, attribute: 'sort-values' })
  sortValues = true;

  /**
   * 排序字段
   */
  @property({ type: String, reflect: true, attribute: 'sort-by' })
  sortBy: 'value' | 'label' | 'angle' = 'value';

  /**
   * 排序顺序
   */
  @property({ type: String, reflect: true, attribute: 'sort-order' })
  sortOrder: 'asc' | 'desc' = 'desc';

  /**
   * 悬停时是否展开
   */
  @property({ type: Boolean, reflect: true, attribute: 'explode-on-hover' })
  explodeOnHover = false;

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
  margin = getDefaultMargin('pie');

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
  animationDuration = 600;

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
    const description = parts.length > 0 ? parts.join(', ') : 'pie chart';
    return `${description}, interactive chart with ${this.data.length} segments`;
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
    const size = Math.min(containerRect.width, containerRect.height);

    this._dimensions = {
      width: size,
      height: size,
    };
  }

  private _validateData(): { isValid: boolean; errors: string[] } {
    return validateChartData(this.data, [this.valueKey, this.labelKey]);
  }

  private _prepareData(): PieChartDataPoint[] {
    let processedData = [...this.data];

    // Filter out zero or negative values
    processedData = processedData.filter(d => d.value > 0);

    // Sort data if needed
    if (this.sortValues) {
      processedData.sort((a, b) => {
        let comparison = 0;

        switch (this.sortBy) {
          case 'value':
            comparison = a.value - b.value;
            break;
          case 'label':
            comparison = a.label.localeCompare(b.label);
            break;
          case 'angle':
            comparison = a.value - b.value; // Same as value for pie charts
            break;
        }

        return this.sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    return processedData;
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

    // Prepare data
    const processedData = this._prepareData();

    if (processedData.length === 0) {
      return;
    }

    // Create main SVG group
    const g = d3.select(this._svg)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left + innerWidth / 2},${margin.top + innerHeight / 2})`);

    // Calculate radius
    const radius = this.outerRadius || Math.min(innerWidth, innerHeight) / 2;

    // Create pie generator
    const pie = d3.pie<PieChartDataPoint>()
      .value(d => d.value)
      .sort(null) // Data is already sorted if needed
      .startAngle((this.startAngle * Math.PI) / 180)
      .endAngle((this.endAngle * Math.PI) / 180)
      .padAngle((this.padAngle * Math.PI) / 180);

    // Create arc generator
    const arc = d3.arc<d3.PieArcDatum<PieChartDataPoint>>()
      .innerRadius(this.innerRadius)
      .outerRadius(radius)
      .cornerRadius(this.cornerRadius);

    // Create arc generator for exploded state
    const explodedArc = d3.arc<d3.PieArcDatum<PieChartDataPoint>>()
      .innerRadius(this.innerRadius)
      .outerRadius(radius * 1.1) // 10% larger for exploded state
      .cornerRadius(this.cornerRadius);

    // Create color scale
    const colorScale = d3.scaleOrdinal(theme.colors.primary)
      .domain(processedData.map((d, i) => i.toString()));

    // Calculate total for percentages
    const total = processedData.reduce((sum, d) => sum + d.value, 0);

    // Create pie slices
    const slices = g.selectAll('.skill-pie-chart__slice')
      .data(pie(processedData))
      .enter()
      .append('g')
      .attr('class', 'skill-pie-chart__slice-group');

    // Add paths for slices
    const paths = slices.append('path')
      .attr('class', 'skill-pie-chart__slice')
      .attr('d', arc)
      .attr('fill', (d, i) => d.data.color || colorScale(i.toString()))
      .attr('stroke', theme.colors.surface)
      .attr('stroke-width', 2)
      .attr('tabindex', 0)
      .attr('role', 'button')
      .attr('aria-label', (d) => `${d.data.label}: ${d.data.value} (${formatPercentage((d.value / total) * 100)})`)
      .style('cursor', 'pointer')
      .style('transform-origin', 'center')
      .on('click', (event, d) => this._handleSliceClick(event, d))
      .on('mouseenter', (event, d) => this._handleSliceHover(event, d))
      .on('mouseleave', () => this._handleSliceLeave())
      .on('focus', (event, d) => this._handleSliceHover(event, d))
      .on('blur', () => this._handleSliceLeave());

    // Animate slices
    if (this.animationDuration > 0) {
      paths
        .attr('d', arc)
        .style('opacity', 0)
        .transition()
        .duration(this.animationDuration)
        .delay((_, i) => i * 50)
        .ease(d3.easeCubicOut)
        .style('opacity', 1)
        .attrTween('d', function(d) {
          const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
          return function(t) {
            return arc(interpolate(t) as d3.PieArcDatum<PieChartDataPoint>) || '';
          };
        });
    }

    // Add labels
    if (this.showLabels) {
      const labels = g.selectAll('.skill-pie-chart__label')
        .data(pie(processedData))
        .enter()
        .append('text')
        .attr('class', 'skill-pie-chart__label')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle');

      if (this.labelPosition === 'inside') {
        // Position labels inside slices
        labels
          .attr('transform', d => `translate(${arc.centroid(d)})`)
          .attr('fill', '#FFFFFF')
          .attr('font-size', Math.min(14, radius / 10))
          .text(d => {
            const percentage = (d.value / total) * 100;
            return this.labelFormat
              ? this.labelFormat(d.data.value, d.data.label, percentage)
              : `${d.data.label}`;
          });
      } else if (this.labelPosition === 'outside') {
        // Position labels outside with connecting lines
        const labelArc = d3.arc<d3.PieArcDatum<PieChartDataPoint>>()
          .innerRadius(radius * 0.8)
          .outerRadius(radius * 1.2);

        labels
          .attr('transform', d => `translate(${labelArc.centroid(d)})`)
          .attr('fill', theme.colors.text)
          .attr('font-size', Math.min(12, radius / 12))
          .text(d => {
            const percentage = (d.value / total) * 100;
            return this.labelFormat
              ? this.labelFormat(d.data.value, d.data.label, percentage)
              : `${d.data.label}`;
          });

        // Add connecting lines for outside labels
        slices.append('polyline')
          .attr('class', 'skill-pie-chart__label-line')
          .attr('points', d => {
            const centroid = arc.centroid(d);
            const labelCentroid = labelArc.centroid(d);
            return `${centroid[0]},${centroid[1]} ${labelCentroid[0]},${labelCentroid[1]} ${labelCentroid[0]},${labelCentroid[1]}`;
          })
          .attr('fill', 'none')
          .attr('stroke', theme.colors.textSecondary)
          .attr('stroke-width', 1);
      }

      // Animate labels
      labels.style('opacity', 0);
      if (this.animationDuration > 0) {
        labels.transition()
          .duration(300)
          .delay((_, i) => i * 50 + this.animationDuration - 200)
          .style('opacity', 1);
      } else {
        labels.style('opacity', 1);
      }
    }

    // Add center text for donut charts
    if (this.innerRadius > 0) {
      const centerGroup = g.append('g')
        .attr('class', 'skill-pie-chart__center');

      centerGroup.append('text')
        .attr('class', 'skill-pie-chart__center-text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', Math.min(24, radius / 4))
        .text(total.toLocaleString());

      centerGroup.append('text')
        .attr('class', 'skill-pie-chart__center-subtext')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('y', Math.min(20, radius / 8))
        .attr('font-size', Math.min(14, radius / 6))
        .text('Total');
    }

    // Add accessibility descriptions
    const accessibilityGroup = g.append('g')
      .attr('class', 'skill-pie-chart__visually-hidden');

    accessibilityGroup.append('title')
      .text(this.ariaLabel || 'Pie chart');

    accessibilityGroup.append('desc')
      .text(`Pie chart showing ${processedData.length} segments totaling ${total}`);

    // Emit ready event
    this.dispatchEvent(new CustomEvent('skill-pie-chart-ready', {
      bubbles: true,
      composed: true,
      detail: { chartId: this._chartId }
    }));
  }

  private _handleSliceClick(event: MouseEvent, d: d3.PieArcDatum<PieChartDataPoint>) {
    const chartEvent: ChartEvent = {
      type: 'click',
      data: [{ ...d.data, x: 0, y: d.value }], // Convert to ChartDataPoint format
      coordinates: { x: event.clientX, y: event.clientY },
      originalEvent: event,
    };

    this.dispatchEvent(new CustomEvent('skill-pie-chart-click', {
      bubbles: true,
      composed: true,
      detail: chartEvent
    }));
  }

  private _handleSliceHover(event: MouseEvent, d: d3.PieArcDatum<PieChartDataPoint>) {
    const chartEvent: ChartEvent = {
      type: 'hover',
      data: [{ ...d.data, x: 0, y: d.value }], // Convert to ChartDataPoint format
      coordinates: { x: event.clientX, y: event.clientY },
      originalEvent: event,
    };

    // Explode on hover if enabled
    if (this.explodeOnHover) {
      const slice = d3.select(event.target as SVGPathElement);
      slice.classed('skill-pie-chart__slice--exploded', true);
    }

    this.dispatchEvent(new CustomEvent('skill-pie-chart-hover', {
      bubbles: true,
      composed: true,
      detail: chartEvent
    }));
  }

  private _handleSliceLeave() {
    // Remove exploded state
    if (this.explodeOnHover) {
      d3.selectAll('.skill-pie-chart__slice--exploded')
        .classed('skill-pie-chart__slice--exploded', false);
    }
  }

  private _renderTitle(): TemplateResult {
    const hasTitleSlot = this.slotHasContent('title');
    const titleContent = hasTitleSlot ? html`<slot name="title"></slot>` : this.chartTitle;

    if (!titleContent) return html``;

    return html`
      <div part="title" class="skill-pie-chart__title">
        ${titleContent}
      </div>
    `;
  }

  private _renderSubtitle(): TemplateResult {
    const hasSubtitleSlot = this.slotHasContent('subtitle');
    const subtitleContent = hasSubtitleSlot ? html`<slot name="subtitle"></slot>` : this.subtitle;

    if (!subtitleContent) return html``;

    return html`
      <div part="subtitle" class="skill-pie-chart__subtitle">
        ${subtitleContent}
      </div>
    `;
  }

  private _renderLoading(): TemplateResult {
    if (!this.loading) return html``;

    return html`
      <div part="loading" class="skill-pie-chart__loading">
        <slot name="loading">
          <skill-spinner size="lg"></skill-spinner>
        </slot>
      </div>
    `;
  }

  private _renderEmpty(): TemplateResult {
    if (!this.empty) return html``;

    return html`
      <div part="empty" class="skill-pie-chart__empty">
        <slot name="empty">
          <div class="skill-pie-chart__empty-icon">
            <skill-icon name="pie-chart" size="xl"></skill-icon>
          </div>
          <div class="skill-pie-chart__empty-text">${this.emptyText}</div>
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
        class="skill-pie-chart"
        role="img"
        aria-label="${this.ariaLabel || ''}"
        tabindex="0"
      >
        ${this._renderTitle()}
        ${this._renderSubtitle()}

        <div class="skill-pie-chart__container">
          <svg
            part="svg"
            class="skill-pie-chart__svg"
            aria-hidden="true"
          ></svg>

          ${this._renderLoading()}
          ${this._renderEmpty()}

          <slot name="legend"></slot>
          <slot name="tooltip"></slot>
          <slot name="center"></slot>
        </div>

        ${hasError ? html`
          <div class="skill-pie-chart__error" role="alert">
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
  public updateData(data: PieChartDataPoint[], animate: boolean = true) {
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
   * Get slice by index
   */
  public getSlice(index: number): d3.PieArcDatum<PieChartDataPoint> | null {
    const processedData = this._prepareData();
    const pie = d3.pie<PieChartDataPoint>().value(d => d.value);
    const arcs = pie(processedData);
    return arcs[index] || null;
  }

  /**
   * Explode a specific slice
   */
  public explodeSlice(index: number, explode: boolean = true) {
    const slice = d3.selectAll('.skill-pie-chart__slice').filter((_, i) => i === index);
    if (explode) {
      slice.classed('skill-pie-chart__slice--exploded', true);
    } else {
      slice.classed('skill-pie-chart__slice--exploded', false);
    }
  }

  /**
   * Get total value
   */
  public getTotal(): number {
    return this.data.reduce((sum, d) => sum + d.value, 0);
  }

  /**
   * Get percentages
   */
  public getPercentages(): Array<{ label: string; value: number; percentage: number }> {
    const total = this.getTotal();
    return this.data.map(d => ({
      label: d.label,
      value: d.value,
      percentage: (d.value / total) * 100
    }));
  }

  /**
   * Reset chart
   */
  public reset() {
    this._renderChart();
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-pie-chart': SkillPieChart;
  }
}