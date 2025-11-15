import { LitElement, html, type PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sliderStyles } from './skill-slider.styles';
import { baseStyles } from '../../../styles/base';

/**
 * Skill Slider Component - �W��
 *
 * @slot start - Content before the slider
 * @slot end - Content after the slider
 * @slot label - Label content
 * @slot tooltip - Custom tooltip content
 *
 * @csspart slider - The slider container
 * @csspart track - The track element
 * @csspart track-fill - The filled track element
 * @csspart handle - The handle element
 * @csspart tooltip - The tooltip element
 * @csspart marks - The marks container
 * @csspart mark - Individual mark element
 * @csspart labels - The labels container
 * @csspart label - Individual label element
 *
 * @cssprop --track-height - Track height
 * @cssprop --handle-size - Handle size
 * @cssprop --track-fill-bg - Fill track background color
 * @cssprop --handle-bg - Handle background color
 *
 * @fires skill-slider-change - Dispatched when value changes
 * @fires skill-slider-input - Dispatched during value change
 * @fires skill-slider-change-start - Dispatched when drag starts
 * @fires skill-slider-change-end - Dispatched when drag ends
 *
 * @example
 * ```html
 * <!-- �@�W -->
 * <skill-slider value="50" min="0" max="100"></skill-slider>
 *
 * <!-- &~��W -->
 * <skill-slider value="75" min="0" max="100" label="��">
 *   <span slot="label">�ϧ6</span>
 * </skill-slider>
 *
 * <!-- ��W -->
 * <skill-slider range min="0" max="100" lower="30" upper="70"></skill-slider>
 *
 * <!-- ���W -->
 * <skill-slider orientation="vertical" value="60" min="0" max="100"></skill-slider>
 *
 * <!-- &;���W -->
 * <skill-slider value="40" min="0" max="100" step="10" ticks show-tooltip></skill-slider>
 *
 * <!-- &�eF��W -->
 * <skill-slider value="50" min="0" max="100" show-input></skill-slider>
 *
 * <!-- �r��W -->
 * <skill-slider value="60" color="success" min="0" max="100"></skill-slider>
 * <skill-slider value="30" color="error" min="0" max="100"></skill-slider>
 *
 * <!-- �(�W -->
 * <skill-slider value="50" min="0" max="100" disabled></skill-slider>
 *
 * <!-- �Ie -->
 * <skill-slider value="25" min="0" max="100" step="5"></skill-slider>
 *
 * <!-- &���W -->
 * <skill-slider value="30" min="0" max="100" marks="[0, 25, 50, 75, 100]"></skill-slider>
 *
 * <!-- ͔�W -->
 * <skill-slider value="70" min="0" max="100" responsive></skill-slider>
 * ```
 */
@customElement('skill-slider')
export class SkillSlider extends LitElement {
  static styles = [baseStyles, sliderStyles];

  /**
   * Current value (or lower value for range sliders)
   */
  @property({ type: Number, reflect: true })
  value = 0;

  /**
   * Upper value for range sliders
   */
  @property({ type: Number, reflect: true })
  upper?: number;

  /**
   * Lower value for range sliders
   */
  @property({ type: Number, reflect: true })
  lower?: number;

  /**
   * Minimum value
   */
  @property({ type: Number, reflect: true })
  min = 0;

  /**
   * Maximum value
   */
  @property({ type: Number, reflect: true })
  max = 100;

  /**
   * Step increment
   */
  @property({ type: Number, reflect: true })
  step = 1;

  /**
   * Orientation
   * @type {'horizontal' | 'vertical'}
   */
  @property({ type: String, reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Size variant
   * @type {'sm' | 'md' | 'lg'}
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Color theme
   * @type {'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'}
   */
  @property({ type: String, reflect: true })
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary';

  /**
   * Whether the slider is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether to show tooltip
   */
  @property({ type: Boolean, reflect: true })
  showTooltip = false;

  /**
   * Whether to show ticks/marks
   */
  @property({ type: Boolean, reflect: true })
  ticks = false;

  /**
   * Whether to show input field
   */
  @property({ type: Boolean, reflect: true })
  showInput = false;

  /**
   * Whether this is a range slider
   */
  @property({ type: Boolean, reflect: true })
  range = false;

  /**
   * Whether to enable responsive behavior
   */
  @property({ type: Boolean, reflect: true })
  responsive = false;

  /**
   * Marks array for custom mark positions
   */
  @property({ type: Array, reflect: true })
  marks?: number[];

  /**
   * ARIA label for accessibility
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  /**
   * ARIA value text for accessibility
   */
  @property({ type: String, reflect: true, attribute: 'aria-valuetext' })
  ariaValueText: string | null = null;

  @state() private isDragging = false;
  @state() private activeHandle: 'lower' | 'upper' | 'single' = 'single';
  @state() private showTooltipValue = false;
  @state() private inputValue = '';

  private trackRef?: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    this._updateInputValue();
  }

  protected willUpdate(changedProperties: PropertyValueMap<this>) {
    if (changedProperties.has('value') || changedProperties.has('upper') || changedProperties.has('lower')) {
      this._updateInputValue();
    }

    // Set ARIA attributes
    if (!this.ariaLabel) {
      this.ariaLabel = this._generateAriaLabel();
    }
  }

  private _generateAriaLabel(): string {
    const type = this.range ? 'range slider' : 'slider';
    const current = this.range ? `${this.lower || this.value} to ${this.upper || this.value}` : this.value;
    return `${type}, ${this.min} to ${this.max}, current ${current}`;
  }

  private _updateInputValue() {
    if (this.showInput) {
      this.inputValue = this.range ? `${this.lower || this.value} - ${this.upper || this.value}` : this.value.toString();
    }
  }

  private _getPercentage(value: number): number {
    const range = this.max - this.min;
    const normalizedValue = Math.max(this.min, Math.min(this.max, value)) - this.min;
    return (normalizedValue / range) * 100;
  }

  private _getValueFromPercentage(percentage: number): number {
    const range = this.max - this.min;
    const rawValue = (percentage / 100) * range + this.min;
    return this._snapToStep(rawValue);
  }

  private _snapToStep(value: number): number {
    if (this.step <= 0) return value;
    const steps = Math.round((value - this.min) / this.step);
    return this.min + steps * this.step;
  }

  private _getTrackFillStyle(): Record<string, string> {
    if (this.range) {
      const lowerPercent = this._getPercentage(this.lower || this.value);
      const upperPercent = this._getPercentage(this.upper || this.value);

      if (this.orientation === 'vertical') {
        return {
          bottom: `${lowerPercent}%`,
          top: `${100 - upperPercent}%`,
          height: `${upperPercent - lowerPercent}%`,
          width: '100%',
          left: '0',
          right: '0'
        };
      } else {
        return {
          left: `${lowerPercent}%`,
          width: `${upperPercent - lowerPercent}%`,
          height: '100%',
          top: '0',
          bottom: '0'
        };
      }
    } else {
      const percent = this._getPercentage(this.value);

      if (this.orientation === 'vertical') {
        return {
          bottom: '0',
          height: `${percent}%`,
          width: '100%',
          left: '0',
          right: '0'
        };
      } else {
        return {
          left: '0',
          width: `${percent}%`,
          height: '100%',
          top: '0',
          bottom: '0'
        };
      }
    }
  }

  private _getHandlePosition(value: number): Record<string, string> {
    const percent = this._getPercentage(value);

    if (this.orientation === 'vertical') {
      return {
        bottom: `${percent}%`,
        transform: 'translateY(50%)'
      };
    } else {
      return {
        left: `${percent}%`,
        transform: 'translateX(-50%)'
      };
    }
  }

  private _handleTrackClick(e: MouseEvent) {
    if (this.disabled || this.isDragging) return;

    const track = this.trackRef;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    let percentage: number;

    if (this.orientation === 'vertical') {
      percentage = ((rect.bottom - e.clientY) / rect.height) * 100;
    } else {
      percentage = ((e.clientX - rect.left) / rect.width) * 100;
    }

    const newValue = this._getValueFromPercentage(percentage);

    if (this.range) {
      const lower = this.lower || this.value;
      const upper = this.upper || this.value;

      if (Math.abs(newValue - lower) < Math.abs(newValue - upper)) {
        this.lower = newValue;
        this.activeHandle = 'lower';
      } else {
        this.upper = newValue;
        this.activeHandle = 'upper';
      }
    } else {
      this.value = newValue;
      this.activeHandle = 'single';
    }

    this._dispatchChangeEvent();
  }

  private _handleMouseDown(e: MouseEvent, handleType: 'lower' | 'upper' | 'single') {
    if (this.disabled) return;

    e.preventDefault();
    e.stopPropagation();

    this.isDragging = true;
    this.activeHandle = handleType;
    this.showTooltipValue = true;

    this._dispatchChangeStartEvent();

    document.addEventListener('mousemove', this._handleMouseMove);
    document.addEventListener('mouseup', this._handleMouseUp);
  }

  private _handleMouseMove = (e: MouseEvent) => {
    if (!this.isDragging || this.disabled) return;

    const track = this.trackRef;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    let percentage: number;

    if (this.orientation === 'vertical') {
      percentage = ((rect.bottom - e.clientY) / rect.height) * 100;
    } else {
      percentage = ((e.clientX - rect.left) / rect.width) * 100;
    }

    const newValue = this._getValueFromPercentage(Math.max(0, Math.min(100, percentage)));

    if (this.range) {
      if (this.activeHandle === 'lower') {
        const upper = this.upper || this.max;
        this.lower = Math.min(newValue, upper);
      } else {
        const lower = this.lower || this.min;
        this.upper = Math.max(newValue, lower);
      }
    } else {
      this.value = newValue;
    }

    this._dispatchInputEvent();
  };

  private _handleMouseUp = () => {
    if (this.isDragging) {
      this.isDragging = false;
      this.showTooltipValue = false;
      this._dispatchChangeEndEvent();

      document.removeEventListener('mousemove', this._handleMouseMove);
      document.removeEventListener('mouseup', this._handleMouseUp);
    }
  };

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;

    let newValue: number;
    const step = e.shiftKey ? this.step * 10 : this.step;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = this.range ?
          (this.activeHandle === 'lower' ? (this.lower || this.value) - step : (this.upper || this.value) - step) :
          this.value - step;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = this.range ?
          (this.activeHandle === 'lower' ? (this.lower || this.value) + step : (this.upper || this.value) + step) :
          this.value + step;
        break;
      case 'Home':
        newValue = this.min;
        break;
      case 'End':
        newValue = this.max;
        break;
      case 'PageDown':
        newValue = this.range ?
          (this.activeHandle === 'lower' ? this.lower || this.value : this.upper || this.value) - step * 10 :
          this.value - step * 10;
        break;
      case 'PageUp':
        newValue = this.range ?
          (this.activeHandle === 'lower' ? this.lower || this.value : this.upper || this.value) + step * 10 :
          this.value + step * 10;
        break;
      default:
        return;
    }

    e.preventDefault();

    if (this.range) {
      if (this.activeHandle === 'lower') {
        const upper = this.upper || this.max;
        this.lower = Math.max(this.min, Math.min(newValue, upper));
      } else {
        const lower = this.lower || this.min;
        this.upper = Math.min(this.max, Math.max(newValue, lower));
      }
    } else {
      this.value = Math.max(this.min, Math.min(newValue, this.max));
    }

    this._dispatchChangeEvent();
  }

  private _handleInputChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const value = input.value;

    if (this.range) {
      const match = value.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);
      if (match) {
        const lower = parseInt(match[1]);
        const upper = parseInt(match[2]);
        if (!isNaN(lower) && !isNaN(upper)) {
          this.lower = Math.max(this.min, Math.min(lower, upper));
          this.upper = Math.min(this.max, Math.max(upper, lower));
          this._dispatchChangeEvent();
        }
      }
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        this.value = Math.max(this.min, Math.min(numValue, this.max));
        this._dispatchChangeEvent();
      }
    }
  }

  private _dispatchChangeEvent() {
    this.dispatchEvent(
      new CustomEvent('skill-slider-change', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
          lower: this.lower,
          upper: this.upper,
          min: this.min,
          max: this.max,
          range: this.range,
        },
      })
    );
  }

  private _dispatchInputEvent() {
    this.dispatchEvent(
      new CustomEvent('skill-slider-input', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
          lower: this.lower,
          upper: this.upper,
          min: this.min,
          max: this.max,
          range: this.range,
        },
      })
    );
  }

  private _dispatchChangeStartEvent() {
    this.dispatchEvent(
      new CustomEvent('skill-slider-change-start', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
          lower: this.lower,
          upper: this.upper,
          activeHandle: this.activeHandle,
        },
      })
    );
  }

  private _dispatchChangeEndEvent() {
    this.dispatchEvent(
      new CustomEvent('skill-slider-change-end', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
          lower: this.lower,
          upper: this.upper,
          activeHandle: this.activeHandle,
        },
      })
    );
  }

  private _renderMarks() {
    if (!this.ticks && !this.marks) return '';

    const marks = this.marks || this._generateDefaultMarks();

    return html`
      <div part="marks" class="skill-slider__marks">
        ${marks.map((mark, _index) => {
          const isActive = this.range ?
            (mark >= (this.lower || this.value) && mark <= (this.upper || this.value)) :
            (mark <= this.value);

          return html`
            <div
              part="mark"
              class="skill-slider__mark ${isActive ? 'skill-slider__mark--active' : ''}"
              style="${this.orientation === 'vertical' ?
                `bottom: ${this._getPercentage(mark)}%;` :
                `left: ${this._getPercentage(mark)}%;`}"
            ></div>
          `;
        })}
      </div>
    `;
  }

  private _renderLabels() {
    if (!this.marks) return '';

    return html`
      <div part="labels" class="skill-slider__labels">
        ${this.marks.map((mark) => html`
          <div
            part="label"
            class="skill-slider__label"
            style="${this.orientation === 'vertical' ?
              `bottom: ${this._getPercentage(mark)}%;` :
              `left: ${this._getPercentage(mark)}%;`}"
          >${mark}</div>
        `)}
      </div>
    `;
  }

  private _renderTooltip() {
    if (!this.showTooltip) return '';

    const displayValue = this.range ?
      (this.activeHandle === 'lower' ? this.lower || this.value : this.upper || this.value) :
      this.value;

    return html`
      <div
        part="tooltip"
        class="skill-slider__tooltip ${this.showTooltipValue ? 'visible' : ''}"
      >
        <slot name="tooltip">${displayValue}</slot>
      </div>
    `;
  }

  private _renderInput() {
    if (!this.showInput) return '';

    return html`
      <input
        part="input"
        class="skill-slider__input"
        type="text"
        .value=${this.inputValue}
        @change=${this._handleInputChange}
        @input=${this._handleInputChange}
        ?disabled=${this.disabled}
      />
    `;
  }

  private _generateDefaultMarks(): number[] {
    const marks: number[] = [];
    const range = this.max - this.min;
    const stepCount = Math.floor(range / this.step);

    for (let i = 0; i <= stepCount; i++) {
      marks.push(this.min + (i * this.step));
    }

    return marks;
  }

  render() {
    return html`
      <div class="skill-slider">
        <slot name="start"></slot>

        <div
          part="slider"
          class="skill-slider ${this.isDragging ? 'dragging' : ''}"
          tabindex="${this.disabled ? '-1' : '0'}"
          role="slider"
          aria-label="${this.ariaLabel || ''}"
          aria-valuemin="${this.min}"
          aria-valuemax="${this.max}"
          aria-valuenow="${this.range ? (this.lower || this.value) : this.value}"
          aria-valuetext="${this.ariaValueText || ''}"
          aria-orientation="${this.orientation}"
          aria-disabled="${this.disabled ? 'true' : 'false'}"
          @click=${this._handleTrackClick}
          @keydown=${this._handleKeyDown}
        >
          <div
            part="track"
            class="skill-slider__track"
            style="position: relative;"
          >
            <div
              part="track-fill"
              class="skill-slider__track-fill"
              style=${JSON.stringify(this._getTrackFillStyle()).replace(/"/g, "'")}
            ></div>
          </div>

          ${this.range ? html`
            <div
              part="handle"
              class="skill-slider__handle skill-slider__handle--lower ${this.isDragging && this.activeHandle === 'lower' ? 'dragging' : ''}"
              style=${JSON.stringify({ ...this._getHandlePosition(this.lower || this.value), zIndex: 2 }).replace(/"/g, "'")}
              @mousedown=${(e: MouseEvent) => this._handleMouseDown(e, 'lower')}
            ></div>
            <div
              part="handle"
              class="skill-slider__handle skill-slider__handle--upper ${this.isDragging && this.activeHandle === 'upper' ? 'dragging' : ''}"
              style=${JSON.stringify({ ...this._getHandlePosition(this.upper || this.value), zIndex: 3 }).replace(/"/g, "'")}
              @mousedown=${(e: MouseEvent) => this._handleMouseDown(e, 'upper')}
            ></div>
          ` : html`
            <div
              part="handle"
              class="skill-slider__handle ${this.isDragging ? 'dragging' : ''}"
              style=${JSON.stringify(this._getHandlePosition(this.value)).replace(/"/g, "'")}
              @mousedown=${(e: MouseEvent) => this._handleMouseDown(e, 'single')}
            ></div>
          `}

          ${this._renderTooltip()}
          ${this._renderMarks()}
          ${this._renderLabels()}
        </div>

        ${this._renderInput()}

        <slot name="end"></slot>
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('mousemove', this._handleMouseMove);
    document.removeEventListener('mouseup', this._handleMouseUp);
  }

  /**
   * Get current values
   */
  public getValues(): { value: number; lower?: number; upper?: number } {
    return {
      value: this.value,
      lower: this.lower,
      upper: this.upper,
    };
  }

  /**
   * Set value(s)
   */
  public setValues(options: { value?: number; lower?: number; upper?: number }) {
    if (options.value !== undefined) {
      this.value = Math.max(this.min, Math.min(options.value, this.max));
    }
    if (options.lower !== undefined) {
      this.lower = Math.max(this.min, Math.min(options.lower, this.upper || this.max));
    }
    if (options.upper !== undefined) {
      this.upper = Math.min(this.max, Math.max(options.upper, this.lower || this.min));
    }
    this._dispatchChangeEvent();
  }

  /**
   * Reset to default values
   */
  public reset() {
    if (this.range) {
      this.lower = this.min;
      this.upper = this.max;
    } else {
      this.value = this.min;
    }
    this._dispatchChangeEvent();
  }

  /**
   * Focus the slider
   */
  public focus() {
    const element = this.shadowRoot?.querySelector('.skill-slider') as HTMLElement;
    element?.focus();
  }

  /**
   * Blur the slider
   */
  public blur() {
    const element = this.shadowRoot?.querySelector('.skill-slider') as HTMLElement;
    element?.blur();
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-slider': SkillSlider;
  }
}