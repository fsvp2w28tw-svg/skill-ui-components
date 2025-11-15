import { LitElement, html, type PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { progressStyles } from './skill-progress.styles';
import { baseStyles } from '../../../styles/base';

/**
 * Skill Progress Component - 进度条组件
 *
 * @slot label - Progress label content
 * @slot value - Custom value display content
 *
 * @csspart progress - Progress container
 * @csspart bar - Progress bar track
 * @csspart fill - Progress bar fill
 * @csspart label - Progress label
 * @csspart value - Progress value
 * @csspart circular - Circular progress container
 * @csspart circle-bg - Background circle
 * @csspart circle-progress - Progress circle
 * @csspart content - Content in circular progress
 *
 * @cssprop --progress-height - Height of linear progress
 * @cssprop --progress-radius - Border radius of progress bar
 * @cssprop --progress-size - Size of circular progress
 * @cssprop --stroke-width - Width of circular progress stroke
 * @cssprop --progress-color - Progress fill color
 * @cssprop --progress-duration - Animation duration
 * @cssprop --progress-ease - Animation easing function
 *
 * @fires skill-progress-change - Dispatched when progress value changes
 * @fires skill-progress-complete - Dispatched when progress reaches 100%
 *
 * @example
 * ```html
 * <!-- 基础线性进度条 -->
 * <skill-progress value="50"></skill-progress>
 *
 * <!-- 带标签的进度条 -->
 * <skill-progress value="75" label="下载进度">75%</skill-progress>
 *
 * <!-- 彩色进度条 -->
 * <skill-progress value="60" color="success" label="上传进度">60%</skill-progress>
 *
 * <!-- 条纹动画进度条 -->
 * <skill-progress value="80" striped animated label="处理中">80%</skill-progress>
 *
 * <!-- 圆形进度条 -->
 * <skill-progress type="circular" value="40" size="lg">40%</skill-progress>
 *
 * <!-- 加载状态 -->
 * <skill-progress value="30" status="loading" label="加载中">30%</skill-progress>
 *
 * <!-- 不确定进度 -->
 * <skill-progress indeterminate label="正在连接..."></skill-progress>
 *
 * <!-- 自定义尺寸 -->
 * <skill-progress value="70" size="xl" label="大尺寸进度条">70%</skill-progress>
 *
 * <!-- 自定义缓动 -->
 * <skill-progress value="85" easing="bounce" label="弹性动画">85%</skill-progress>
 *
 * <!-- 圆形进度条不同颜色 -->
 * <skill-progress type="circular" value="90" color="success" size="md">90%</skill-progress>
 *
 * <!-- 错误状态 -->
 * <skill-progress value="100" status="error" label="上传失败">100%</skill-progress>
 *
 * <!-- 成功状态 -->
 * <skill-progress value="100" status="success" label="上传完成">100%</skill-progress>
 * ```
 */
@customElement('skill-progress')
export class SkillProgress extends LitElement {
  static styles = [baseStyles, progressStyles];

  /**
   * Current progress value (0-100)
   */
  @property({ type: Number, reflect: true })
  value = 0;

  /**
   * Maximum value (for calculation)
   */
  @property({ type: Number, reflect: true })
  max = 100;

  /**
   * Minimum value (for calculation)
   */
  @property({ type: Number, reflect: true })
  min = 0;

  /**
   * Progress type
   * @type {'linear' | 'circular'}
   */
  @property({ type: String, reflect: true })
  type: 'linear' | 'circular' = 'linear';

  /**
   * Size variant
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Color theme
   * @type {'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'}
   */
  @property({ type: String, reflect: true })
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary';

  /**
   * Status variant
   * @type {'default' | 'loading' | 'success' | 'error' | 'warning'}
   */
  @property({ type: String, reflect: true })
  status: 'default' | 'loading' | 'success' | 'error' | 'warning' = 'default';

  /**
   * Show striped pattern
   */
  @property({ type: Boolean, reflect: true })
  striped = false;

  /**
   * Animate stripes
   */
  @property({ type: Boolean, reflect: true })
  animated = false;

  /**
   * Indeterminate progress
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * Label position
   * @type {'top' | 'left' | 'bottom' | 'hidden'}
   */
  @property({ type: String, reflect: true })
  labelPosition: 'top' | 'left' | 'bottom' | 'hidden' = 'left';

  /**
   * Value display position
   * @type {'right' | 'left' | 'hidden'}
   */
  @property({ type: String, reflect: true })
  valuePosition: 'right' | 'left' | 'hidden' = 'right';

  /**
   * Animation easing
   * @type {'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'bounce' | 'spring'}
   */
  @property({ type: String, reflect: true })
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'bounce' | 'spring' = 'ease-out';

  /**
   * Animation duration
   * @type {'instant' | 'fast' | 'normal' | 'slow' | 'slower'}
   */
  @property({ type: String, reflect: true })
  duration: 'instant' | 'fast' | 'normal' | 'slow' | 'slower' = 'normal';

  /**
   * Enable responsive behavior
   */
  @property({ type: Boolean, reflect: true })
  responsive = false;

  /**
   * Show percentage instead of raw value
   */
  @property({ type: Boolean, reflect: true })
  showPercentage = true;

  /**
   * ARIA label for accessibility
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  private _previousValue = 0;
  private _animationFrame?: number;

  protected willUpdate(changedProperties: PropertyValueMap<this>) {
    if (changedProperties.has('value')) {
      this._handleValueChange();
    }

    // Set ARIA attributes
    if (!this.ariaLabel) {
      this.ariaLabel = this._generateAriaLabel();
    }
  }

  private _handleValueChange() {
    if (this.value !== this._previousValue) {
      this.dispatchEvent(
        new CustomEvent('skill-progress-change', {
          bubbles: true,
          composed: true,
          detail: {
            value: this.value,
            previousValue: this._previousValue,
            percentage: this.percentage,
          },
        })
      );

      if (this.value >= this.max) {
        this.dispatchEvent(
          new CustomEvent('skill-progress-complete', {
            bubbles: true,
            composed: true,
            detail: {
              value: this.value,
              percentage: this.percentage,
            },
          })
        );
      }

      this._previousValue = this.value;
    }
  }

  private _generateAriaLabel(): string {
    const percentage = this.percentage;
    const typeText = this.type === 'circular' ? 'circular' : 'linear';
    return `${typeText} progress: ${percentage.toFixed(1)}%`;
  }

  private get percentage(): number {
    const range = this.max - this.min;
    const normalizedValue = Math.max(this.min, Math.min(this.max, this.value)) - this.min;
    return (normalizedValue / range) * 100;
  }

  private get displayValue(): string {
    if (this.slotHasContent('value')) {
      return ''; // Use custom slot content
    }

    if (this.showPercentage) {
      return `${Math.round(this.percentage)}%`;
    }
    return Math.round(this.value).toString();
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

  render() {
    const hasLabel = this.slotHasContent('label');
    const hasValue = this.slotHasContent('value');

    return this.type === 'circular'
      ? this._renderCircularProgress(hasLabel, hasValue)
      : this._renderLinearProgress(hasLabel, hasValue);
  }

  private _renderLinearProgress(hasLabel: boolean, hasValue: boolean) {
    return html`
      <div part="progress" class="skill-progress">
        ${hasLabel ? html`
          <div part="label" class="skill-progress__label">
            <slot name="label"></slot>
          </div>
        ` : ''}

        <div part="bar" class="skill-progress__bar">
          ${this.indeterminate
            ? this._renderIndeterminateFill()
            : this._renderDeterminateFill()
          }
        </div>

        ${!hasValue && this.valuePosition !== 'hidden' ? html`
          <div part="value" class="skill-progress__value">
            ${this.displayValue}
          </div>
        ` : ''}

        ${hasValue ? html`
          <div part="value" class="skill-progress__value">
            <slot name="value"></slot>
          </div>
        ` : ''}
      </div>
    `;
  }

  private _renderDeterminateFill() {
    return html`
      <div
        part="fill"
        class="skill-progress__fill"
        style="width: ${this.percentage}%"
      ></div>
    `;
  }

  private _renderIndeterminateFill() {
    return html`
      <div
        part="fill"
        class="skill-progress__fill"
      ></div>
    `;
  }

  private _renderCircularProgress(hasLabel: boolean, hasValue: boolean) {
    const radius = 45; // SVG radius
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (this.percentage / 100) * circumference;

    return html`
      <div part="progress" class="skill-progress">
        ${hasLabel ? html`
          <div part="label" class="skill-progress__label">
            <slot name="label"></slot>
          </div>
        ` : ''}

        <div part="circular" class="skill-progress__circular">
          <svg part="circle" class="skill-progress__circle" viewBox="0 0 100 100">
            <circle
              part="circle-bg"
              class="skill-progress__circle-bg"
              cx="50"
              cy="50"
              r="${radius}"
            ></circle>
            ${this.indeterminate
              ? this._renderIndeterminateCircle()
              : html`
                <circle
                  part="circle-progress"
                  class="skill-progress__circle-progress"
                  cx="50"
                  cy="50"
                  r="${radius}"
                  stroke-dasharray="${circumference}"
                  stroke-dashoffset="${offset}"
                ></circle>
              `
            }
          </svg>
          <div part="content" class="skill-progress__content">
            ${hasValue ? html`<slot name="value"></slot>` : this.displayValue}
          </div>
        </div>
      </div>
    `;
  }

  private _renderIndeterminateCircle() {
    return html`
      <circle
        part="circle-progress"
        class="skill-progress__circle-progress"
        cx="50"
        cy="50"
        r="45"
        stroke-dasharray="283"
        stroke-dashoffset="141.5"
        style="animation: spin 1s linear infinite"
      ></circle>
    `;
  }

  /**
   * Set progress value with animation
   */
  public setValue(value: number, animate: boolean = true) {
    const targetValue = Math.max(this.min, Math.min(this.max, value));

    if (animate && targetValue !== this.value) {
      this._animateValue(this.value, targetValue);
    } else {
      this.value = targetValue;
    }
  }

  /**
   * Animate progress from current value to target
   */
  public animateTo(targetValue: number, duration?: number) {
    const target = Math.max(this.min, Math.min(this.max, targetValue));
    const animDuration = duration || this._getAnimationDuration();
    this._animateValue(this.value, target, animDuration);
  }

  private _animateValue(from: number, to: number, duration?: number) {
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
    }

    const animDuration = duration || this._getAnimationDuration();
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animDuration, 1);

      const easedProgress = this._easingFunction(progress);
      const currentValue = from + (to - from) * easedProgress;

      this.value = currentValue;

      if (progress < 1) {
        this._animationFrame = requestAnimationFrame(animate);
      }
    };

    this._animationFrame = requestAnimationFrame(animate);
  }

  private _getAnimationDuration(): number {
    const durations = {
      instant: 100,
      fast: 200,
      normal: 300,
      slow: 500,
      slower: 800,
    };
    return durations[this.duration] || durations.normal;
  }

  private _easingFunction(t: number): number {
    const easingFunctions = {
      linear: t,
      'ease-in': t * t,
      'ease-out': 1 - (1 - t) * (1 - t),
      'ease-in-out': t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      bounce: this._bounceEasing(t),
      spring: this._springEasing(t),
    };
    return easingFunctions[this.easing] || easingFunctions['ease-out'];
  }

  private _bounceEasing(t: number): number {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  }

  private _springEasing(t: number): number {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }

  /**
   * Get current percentage
   */
  public get currentPercentage(): number {
    return this.percentage;
  }

  /**
   * Reset progress to minimum value
   */
  public reset() {
    this.setValue(this.min);
  }

  /**
   * Complete progress (set to maximum value)
   */
  public complete() {
    this.setValue(this.max);
  }

  /**
   * Check if progress is complete
   */
  public get isComplete(): boolean {
    return this.value >= this.max;
  }

  /**
   * Check if progress is indeterminate
   */
  public get isIndeterminate(): boolean {
    return this.indeterminate;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
    }
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-progress': SkillProgress;
  }
}