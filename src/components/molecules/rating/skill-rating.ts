import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ratingStyles } from './skill-rating.styles';
import { baseStyles } from '../../../styles/base';
import type { Size } from '../../../types';

/**
 * Rating - 评分组件
 *
 * 支持两种标签名：skill-rating (推荐) 和 skill-rate (兼容性)
 *
 * @slot icon - 自定义图标
 * @slot extra - 额外内容
 *
 * @csspart container - 主容器
 * @csspart star - 星星元素
 * @csspart star-filled - 填充的星星
 * @csspart star-empty - 空的星星
 * @csspart star-half - 半颗星星
 * @csspart value - 分值显示
 * @csspart input - 数字输入框
 *
 * @cssprop --rating-star-size - 星星大小
 * @cssprop --rating-star-color - 星星颜色
 * @cssprop --rating-star-bg-color - 星星背景色
 * @cssprop --rating-gap - 星星间距
 *
 * @fires skill-change - 评分变化时触发
 * @fires skill-hover - 悬停时触发
 * @fires skill-rate-change - 兼容性事件 (仅skill-rate标签触发)
 *
 * @example
 * ```html
 * <!-- 基础评分 (推荐使用skill-rating) -->
 * <skill-rating
 *   value="4"
 *   max="5"
 * ></skill-rating>
 *
 * <!-- 兼容性标签 (向后兼容) -->
 * <skill-rate
 *   value="4"
 *   max="5"
 * ></skill-rate>
 *
 * <!-- 只读评分 -->
 * <skill-rating
 *   value="3.5"
 *   max="5"
 *   readonly
 * ></skill-rating>
 *
 * <!-- 带文本的评分 -->
 * <skill-rating
 *   value="4"
 *   max="5"
 *   show-value
 *   show-text
 * ></skill-rating>
 *
 * <!-- 不同尺寸 -->
 * <skill-rating value="4" size="sm"></skill-rating>
 * <skill-rating value="4" size="md"></skill-rating>
 * <skill-rating value="4" size="lg"></skill-rating>
 *
 * <!-- 不同颜色主题 -->
 * <skill-rating value="4" color="primary"></skill-rating>
 * <skill-rating value="4" color="warning"></skill-rating>
 * <skill-rating value="4" color="success"></skill-rating>
 *
 * <!-- 允许半星评分 -->
 * <skill-rating
 *   value="3.5"
 *   max="5"
 *   allow-half
 * ></skill-rating>
 *
 * <!-- 可输入模式 -->
 * <skill-rating
 *   value="4"
 *   max="10"
 *   show-input
 * ></skill-rating>
 *
 * <!-- 自定义图标 -->
 * <skill-rating value="4">
 *   <skill-icon name="heart" slot="icon"></skill-icon>
 * </skill-rating>
 * ```
 */
@customElement('skill-rating')
export class SkillRating extends LitElement {
  static styles = [baseStyles, ratingStyles];

  /**
   * 当前评分值
   */
  @property({ type: Number })
  value = 0;

  /**
   * 最大评分值
   */
  @property({ type: Number })
  max = 5;

  /**
   * 是否只读
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * 是否禁用
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * 组件尺寸
   */
  @property({ type: String, reflect: true })
  size: Extract<Size, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> = 'md';

  /**
   * 颜色主题
   */
  @property({ type: String, reflect: true })
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default' = 'warning';

  /**
   * 是否显示数值
   */
  @property({ type: Boolean, attribute: 'show-value' })
  showValue = false;

  /**
   * 是否显示文本描述
   */
  @property({ type: Boolean, attribute: 'show-text' })
  showText = false;

  /**
   * 是否允许半星评分
   */
  @property({ type: Boolean, attribute: 'allow-half' })
  allowHalf = false;

  /**
   * 是否显示输入框
   */
  @property({ type: Boolean, attribute: 'show-input' })
  showInput = false;

  /**
   * 悬停时的值
   */
  @state()
  private _hoverValue = 0;

  /**
   * 悬停时的半星位置
   */
  @state()
  private _hoverHalf = false;

  /**
   * 自定义文本标签
   */
  @property({ type: Array })
  labels: string[] = [];

  /**
   * 图标类型
   */
  @property({ type: String })
  icon: 'star' | 'heart' | 'thumbs-up' | 'diamond' = 'star';

  /**
   * 获取评分文本
   */
  private _getRatingText(): string {
    if (this.labels.length > 0 && Math.floor(this.value) <= this.labels.length) {
      return this.labels[Math.floor(this.value) - 1] || '';
    }

    const percentage = (this.value / this.max) * 100;
    if (percentage >= 80) return '优秀';
    if (percentage >= 60) return '良好';
    if (percentage >= 40) return '一般';
    if (percentage >= 20) return '较差';
    return '很差';
  }

  /**
   * 处理星星点击
   */
  private _handleStarClick(index: number, isHalf: boolean = false) {
    if (this.readonly || this.disabled) return;

    const newValue = isHalf && this.allowHalf ? index + 0.5 : index + 1;

    if (newValue === this.value) {
      // 点击相同的星星，清除评分
      this.value = 0;
    } else {
      this.value = Math.min(newValue, this.max);
    }

    const eventData = {
      value: this.value,
      max: this.max,
    };

    // 发送标准事件
    this.dispatchEvent(new CustomEvent('skill-change', {
      bubbles: true,
      composed: true,
      detail: eventData,
    }));

    // 如果是skill-rate标签，发送兼容性事件
    if (this.tagName.toLowerCase() === 'skill-rate') {
      this.dispatchEvent(new CustomEvent('skill-rate-change', {
        bubbles: true,
        composed: true,
        detail: eventData,
      }));
    }
  }

  /**
   * 处理星星悬停
   */
  private _handleStarHover(index: number, isHalf: boolean = false) {
    if (this.readonly || this.disabled) return;

    this._hoverValue = index + 1;
    this._hoverHalf = isHalf;

    this.dispatchEvent(new CustomEvent('skill-hover', {
      bubbles: true,
      composed: true,
      detail: {
        value: isHalf && this.allowHalf ? index + 0.5 : index + 1,
        max: this.max,
      }
    }));
  }

  /**
   * 处理鼠标离开
   */
  private _handleMouseLeave() {
    this._hoverValue = 0;
    this._hoverHalf = false;
  }

  /**
   * 处理输入框变化
   */
  private _handleInputChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const newValue = parseFloat(input.value) || 0;

    this.value = Math.min(Math.max(0, newValue), this.max);

    this.dispatchEvent(new CustomEvent('skill-change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
        max: this.max,
      }
    }));
  }

  /**
   * 渲染星星图标
   */
  private _renderStarIcon(filled: boolean, half: boolean = false) {
    if (this.hasSlot('icon')) {
      return html`<slot name="icon"></slot>`;
    }

    const starClasses = classMap({
      'skill-rating__star-icon': true,
      'skill-rating__star-icon--filled': filled,
      'skill-rating__star-icon--half': half,
      'skill-rating__star-icon--empty': !filled && !half,
    });

    switch (this.icon) {
      case 'heart':
        return html`
          <svg class="${starClasses}" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        `;

      case 'thumbs-up':
        return html`
          <svg class="${starClasses}" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 21h9c.83 0 1.54-.5 1.85-1.26l2.75-5.79c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.17-4.17L12 9h9v2l-2.75 5.79H9V9zM1 9h4v12H1z"/>
          </svg>
        `;

      case 'diamond':
        return html`
          <svg class="${starClasses}" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 3l-4 9 5 9 5-9 5-9-5-9zM19 3l-3 3 3 3 3-3z"/>
          </svg>
        `;

      default: // star
        return html`
          <svg class="${starClasses}" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            ${half ? html`
              <defs>
                <linearGradient id="star-half-${this._fieldId}">
                  <stop offset="50%" stop-color="currentColor"/>
                  <stop offset="50%" stop-color="currentColor" stop-opacity="0.3"/>
                </linearGradient>
              </defs>
              <path fill="url(#star-half-${this._fieldId})" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            ` : html`
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            `}
          </svg>
        `;
    }
  }

  /**
   * 渲染单个星星
   */
  private _renderStar(index: number) {
    const isActive = this._hoverValue > 0 ? index < this._hoverValue : index < this.value;
    const isHalf = this._hoverHalf || (this.allowHalf && this.value - index === 0.5);

    const starClasses = classMap({
      'skill-rating__star': true,
      'skill-rating__star--active': isActive || isHalf,
      'skill-rating__star--readonly': this.readonly,
      'skill-rating__star--disabled': this.disabled,
    });

    const showHalfFill = isHalf && this.icon === 'star' && this.allowHalf;

    if (showHalfFill && !this._hoverValue) {
      return html`
        <div
          part="star"
          class="${starClasses}"
          @click=${() => this._handleStarClick(index, false)}
          @mouseenter=${() => this._handleStarHover(index, false)}
        >
          <div class="skill-rating__star-half">
            ${this._renderStarIcon(false, false)}
          </div>
          <div class="skill-rating__star-half skill-rating__star-half--filled">
            ${this._renderStarIcon(true, false)}
          </div>
        </div>
      `;
    }

    return html`
      <div
        part="star"
        class="${starClasses}"
        @click=${() => this._handleStarClick(index, isHalf && this.allowHalf)}
        @mouseenter=${() => this._handleStarHover(index, false)}
      >
        ${this._renderStarIcon(isActive, showHalfFill)}
      </div>
    `;
  }

  /**
   * 渲染评分值
   */
  private _renderValue() {
    if (!this.showValue && !this.showText && !this.showInput) return nothing;

    return html`
      <div part="value-container" class="skill-rating__value-container">
        ${this.showValue ? html`
          <span part="value" class="skill-rating__value">
            ${this._hoverValue > 0 ? this._hoverValue : this.value}/${this.max}
          </span>
        ` : nothing}

        ${this.showText && this.value > 0 ? html`
          <span class="skill-rating__text">${this._getRatingText()}</span>
        ` : nothing}

        ${this.showInput ? html`
          <input
            part="input"
            type="number"
            class="skill-rating__input"
            .value=${this.value.toString()}
            min="0"
            max=${this.max}
            step=${this.allowHalf ? 0.5 : 1}
            ?disabled=${this.disabled}
            @change=${this._handleInputChange}
          />
        ` : nothing}

        <slot name="extra"></slot>
      </div>
    `;
  }

  /**
   * 生成唯一的字段ID
   */
  @state()
  private _fieldId = `rating-${Math.random().toString(36).substr(2, 9)}`;

  /**
   * 检查是否有插槽内容
   */
  private hasSlot(name: string): boolean {
    return this.querySelector(`[slot="${name}"]`) !== null;
  }

  /**
   * 设置评分
   */
  public setRating(value: number): void {
    this.value = Math.min(Math.max(0, value), this.max);
  }

  /**
   * 获取当前评分
   */
  public getRating(): number {
    return this.value;
  }

  /**
   * 清除评分
   */
  public clear(): void {
    this.value = 0;
  }

  render() {
    const containerClasses = classMap({
      'skill-rating': true,
      'skill-rating--readonly': this.readonly,
      'skill-rating--disabled': this.disabled,
      [`skill-rating--${this.size}`]: true,
      [`skill-rating--${this.color}`]: true,
    });

    return html`
      <div
        part="container"
        class="${containerClasses}"
        @mouseleave=${this._handleMouseLeave}
        role="slider"
        aria-label="评分"
        aria-valuemin="0"
        aria-valuemax="${this.max}"
        aria-valuenow="${this.value}"
        aria-readonly="${this.readonly}"
        aria-disabled="${this.disabled}"
        tabindex="${this.readonly || this.disabled ? -1 : 0}"
      >
        <div class="skill-rating__stars">
          ${Array.from({ length: this.max }, (_, index) => this._renderStar(index))}
        </div>

        ${this._renderValue()}
      </div>
    `;
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-rating': SkillRating;
  }
}