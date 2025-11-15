import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { colorPickerStyles } from './skill-color-picker.styles';
import { baseStyles } from '../../../styles/base';
import type { Size, Variant } from '../../../types';

/**
 * Color format interface
 */
export interface ColorFormat {
  hex: string;
  rgb: { r: number; g: number; b: number };
  rgba: { r: number; g: number; b: number; a: number };
  hsl: { h: number; s: number; l: number };
  hsla: { h: number; s: number; l: number; a: number };
}

/**
 * Preset color interface
 */
export interface PresetColor {
  name: string;
  value: string;
  category?: string;
}

/**
 * Skill Color Picker Component
 *
 * @slot trigger - Custom trigger element for opening the picker
 * @slot format-label - Custom format label
 * @slot alpha-label - Custom alpha label
 * @slot no-color - Custom no color message
 *
 * @csspart container - Main container
 * @csspart trigger - Trigger button/element
 * @csspart color-display - Color display area
 * @csspart color-value - Color value text
 * @csspart dropdown - Dropdown panel
 * @csspart picker-area - Color picker gradient area
 * @csspart picker-pointer - Picker pointer/cursor
 * @csspart hue-slider - Hue slider track
 * @csspart hue-thumb - Hue slider thumb
 * @csspart alpha-slider - Alpha slider track
 * @csspart alpha-thumb - Alpha slider thumb
 * @csspart format-tabs - Format tab container
 * @csspart format-tab - Individual format tab
 * @csspart format-input - Format input field
 * @csspart presets-grid - Preset colors grid
 * @csspart preset-color - Individual preset color
 * @csspart preset-name - Preset color name
 *
 * @cssprop --border-color - Border color
 * @cssprop --background-color - Background color
 * @cssprop --text-color - Text color
 * @cssprop --slider-track-color - Slider track color
 * @cssprop --thumb-color - Slider thumb color
 * @cssprop --preset-hover-bg - Preset hover background
 *
 * @fires change - Fired when color changes
 * @fires open - Fired when picker opens
 * @fires close - Fired when picker closes
 * @fires format-change - Fired when format changes
 *
 * @example
 * ```html
 * <skill-color-picker
 *   value="#3b82f6"
 *   format="hex"
 *   show-alpha
 *   show-presets
 *   presets="${this.colorPresets}"
 * >
 * </skill-color-picker>
 *
 * <skill-color-picker
 *   value="rgba(59, 130, 246, 0.5)"
 *   format="rgba"
 *   size="lg"
 *   variant="primary"
 * >
 * </skill-color-picker>
 * ```
 */
@customElement('skill-color-picker')
export class SkillColorPicker extends LitElement {
  static styles = [baseStyles, colorPickerStyles];

  /**
   * Current color value
   */
  @property({ type: String, reflect: true })
  value = '#000000';

  /**
   * Color format
   * @type {'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla'}
   */
  @property({ type: String, reflect: true })
  format: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' = 'hex';

  /**
   * Component variant
   * @type {'primary' | 'secondary' | 'ghost' | 'outline'}
   */
  @property({ type: String, reflect: true })
  variant: Variant = 'primary';

  /**
   * Component size
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: Size = 'md';

  /**
   * Show alpha/transparency controls
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-alpha' })
  showAlpha = false;

  /**
   * Show preset colors
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-presets' })
  showPresets = false;

  /**
   * Show format switcher
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-format' })
  showFormat = true;

  /**
   * Preset color palette
   */
  @property({ type: Array, reflect: false })
  presets?: PresetColor[];

  /**
   * Dropdown placement
   * @type {'bottom' | 'top' | 'auto'}
   */
  @property({ type: String, reflect: true })
  placement: 'bottom' | 'top' | 'auto' = 'bottom';

  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Read-only state
   */
  @property({ type: Boolean, reflect: true, attribute: 'read-only' })
  readOnly = false;

  /**
   * Allow clearing the color
   */
  @property({ type: Boolean, reflect: true, attribute: 'allow-clear' })
  allowClear = false;

  /**
   * Show color value text
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-value' })
  showValue = true;

  /**
   * Custom trigger text
   */
  @property({ type: String, reflect: true, attribute: 'trigger-text' })
  triggerText?: string;

  /**
   * Picker state
   */
  @state()
  private isOpen = false;

  /**
   * Current color in different formats
   */
  @state()
  private colorFormats: ColorFormat = {
    hex: '#000000',
    rgb: { r: 0, g: 0, b: 0 },
    rgba: { r: 0, g: 0, b: 0, a: 1 },
    hsl: { h: 0, s: 0, l: 0 },
    hsla: { h: 0, s: 0, l: 0, a: 1 }
  };

  /**
   * Picker position (0-1 range)
   */
  @state()
  private pickerPosition = { x: 0, y: 0 };

  /**
   * Current hue (0-360)
   */
  @state()
  private currentHue = 0;

  /**
   * Current alpha (0-1)
   */
  @state()
  private currentAlpha = 1;

  /**
   * Picker dragging state
   */
  @state()
  private isDragging = false;

  private pickerArea?: HTMLElement;
  private hueSlider?: HTMLElement;
  private alphaSlider?: HTMLElement;

  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);

    if (changedProperties.has('value')) {
      this._parseColor(this.value);
    }
  }

  protected firstUpdated() {
    this._parseColor(this.value);
  }

  render() {
    return html`
      <div
        part="container"
        class="skill-color-picker ${this._getContainerClasses()}"
      >
        <!-- Trigger -->
        <div
          part="trigger"
          class="skill-color-picker__trigger"
          @click=${this._handleTriggerClick}
          tabindex="${this.disabled ? '-1' : '0'}"
          role="button"
          aria-expanded="${this.isOpen}"
          aria-haspopup="dialog"
        >
          <slot name="trigger">
            <div part="color-display" class="skill-color-picker__color-display">
              <div
                class="skill-color-picker__color-preview"
                style="background-color: ${this.value}"
              ></div>
              ${this.showValue ? html`
                <div part="color-value" class="skill-color-picker__color-value">
                  ${this.triggerText || this._getCurrentColorValue()}
                </div>
              ` : ''}
            </div>
          </slot>

          ${this.allowClear && this.value ? html`
            <button
              class="skill-color-picker__clear-btn"
              @click=${this._handleClear}
              type="button"
              tabindex="-1"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          ` : ''}

          <div class="skill-color-picker__dropdown-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6,9 12,15 18,9"/>
            </svg>
          </div>
        </div>

        <!-- Dropdown -->
        ${this.isOpen ? html`
          <div
            part="dropdown"
            class="skill-color-picker__dropdown ${this.placement}"
            @click=${(e: Event) => e.stopPropagation()}
          >
            <!-- Color Picker Area -->
            <div class="skill-color-picker__picker-section">
              <div
                part="picker-area"
                class="skill-color-picker__picker-area"
                style="background-color: hsl(${this.currentHue}, 100%, 50%)"
                @mousedown=${this._handlePickerMouseDown}
                @mousemove=${this._handlePickerMouseMove}
                @mouseup=${this._handlePickerMouseUp}
                @mouseleave=${this._handlePickerMouseUp}
                ref=${(el: HTMLElement) => this.pickerArea = el}
              >
                <div
                  part="picker-pointer"
                  class="skill-color-picker__picker-pointer"
                  style="left: ${this.pickerPosition.x * 100}%; top: ${this.pickerPosition.y * 100}%"
                ></div>
              </div>

              <!-- Hue Slider -->
              <div class="skill-color-picker__slider-container">
                <div
                  part="hue-slider"
                  class="skill-color-picker__hue-slider"
                  @mousedown=${this._handleHueMouseDown}
                  @mousemove=${this._handleHueMouseMove}
                  @mouseup=${this._handleHueMouseUp}
                  @mouseleave=${this._handleHueMouseUp}
                  ref=${(el: HTMLElement) => this.hueSlider = el}
                >
                  <div
                    part="hue-thumb"
                    class="skill-color-picker__hue-thumb"
                    style="left: ${(this.currentHue / 360) * 100}%"
                  ></div>
                </div>
              </div>

              <!-- Alpha Slider -->
              ${this.showAlpha ? html`
                <div class="skill-color-picker__slider-container">
                  <div
                    part="alpha-slider"
                    class="skill-color-picker__alpha-slider"
                    style="background: linear-gradient(to right, transparent, ${this.colorFormats.hex})"
                    @mousedown=${this._handleAlphaMouseDown}
                    @mousemove=${this._handleAlphaMouseMove}
                    @mouseup=${this._handleAlphaMouseUp}
                    @mouseleave=${this._handleAlphaMouseUp}
                    ref=${(el: HTMLElement) => this.alphaSlider = el}
                  >
                    <div
                      part="alpha-thumb"
                      class="skill-color-picker__alpha-thumb"
                      style="left: ${this.currentAlpha * 100}%"
                    ></div>
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Format Section -->
            ${this.showFormat ? html`
              <div class="skill-color-picker__format-section">
                <div part="format-tabs" class="skill-color-picker__format-tabs">
                  ${['hex', 'rgb', 'hsl'].map(format => html`
                    <button
                      part="format-tab"
                      class="skill-color-picker__format-tab ${this.format.startsWith(format as any) ? 'active' : ''}"
                      @click=${() => this._changeFormat(this.showAlpha ? `${format}a` as any : format as any)}
                    >
                      ${format.toUpperCase()}
                    </button>
                  `)}
                </div>

                <div class="skill-color-picker__format-input-container">
                  <slot name="format-label">
                    <span class="skill-color-picker__format-label">
                      ${this.format.toUpperCase()}
                    </span>
                  </slot>
                  <input
                    part="format-input"
                    class="skill-color-picker__format-input"
                    type="text"
                    .value=${this._getCurrentColorValue()}
                    @input=${this._handleFormatInput}
                    @keydown=${this._handleFormatKeydown}
                  />
                </div>
              </div>
            ` : ''}

            <!-- Preset Colors -->
            ${this.showPresets && this.presets?.length ? html`
              <div class="skill-color-picker__presets-section">
                <div class="skill-color-picker__presets-header">
                  Preset Colors
                </div>
                <div part="presets-grid" class="skill-color-picker__presets-grid">
                  ${this.presets.map(preset => html`
                    <button
                      part="preset-color"
                      class="skill-color-picker__preset-color ${this.value === preset.value ? 'active' : ''}"
                      style="background-color: ${preset.value}"
                      @click=${() => this._selectPreset(preset)}
                      title="${preset.name}"
                    >
                      <div part="preset-name" class="skill-color-picker__preset-name">
                        ${preset.name}
                      </div>
                    </button>
                  `)}
                </div>
              </div>
            ` : ''}

            <!-- No color option -->
            ${this.allowClear ? html`
              <div class="skill-color-picker__no-color-section">
                <button
                  class="skill-color-picker__no-color-btn"
                  @click=${this._handleNoColor}
                >
                  <slot name="no-color">
                    No Color
                  </slot>
                </button>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  private _getContainerClasses() {
    return [
      this.variant,
      this.size,
      this.isOpen ? 'open' : '',
      this.disabled ? 'disabled' : '',
      this.readOnly ? 'read-only' : '',
      !this.value ? 'empty' : ''
    ].filter(Boolean).join(' ');
  }

  private _parseColor(color: string) {
    // Convert any color format to standard formats
    const temp = document.createElement('div');
    temp.style.color = color;
    document.body.appendChild(temp);
    const computedColor = window.getComputedStyle(temp).color;
    document.body.removeChild(temp);

    // Parse RGB values
    const rgbMatch = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]);
      const g = parseInt(rgbMatch[2]);
      const b = parseInt(rgbMatch[3]);
      const a = rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1;

      this.colorFormats = {
        hex: this._rgbToHex(r, g, b),
        rgb: { r, g, b },
        rgba: { r, g, b, a },
        hsl: this._rgbToHsl(r, g, b),
        hsla: { ...this._rgbToHsl(r, g, b), a }
      };

      this.currentAlpha = a;
      this._updatePickerPosition();
    }
  }

  private _rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  private _rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  private _hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }

  private _getCurrentColorValue(): string {
    switch (this.format) {
      case 'hex':
        return this.colorFormats.hex;
      case 'rgb':
        return `rgb(${this.colorFormats.rgb.r}, ${this.colorFormats.rgb.g}, ${this.colorFormats.rgb.b})`;
      case 'rgba':
        return `rgba(${this.colorFormats.rgba.r}, ${this.colorFormats.rgba.g}, ${this.colorFormats.rgba.b}, ${this.currentAlpha.toFixed(2)})`;
      case 'hsl':
        return `hsl(${Math.round(this.colorFormats.hsl.h)}, ${Math.round(this.colorFormats.hsl.s)}%, ${Math.round(this.colorFormats.hsl.l)}%)`;
      case 'hsla':
        return `hsla(${Math.round(this.colorFormats.hsla.h)}, ${Math.round(this.colorFormats.hsla.s)}%, ${Math.round(this.colorFormats.hsla.l)}%, ${this.currentAlpha.toFixed(2)})`;
      default:
        return this.colorFormats.hex;
    }
  }

  private _updatePickerPosition() {
    const { h, s, l } = this.colorFormats.hsl;
    this.currentHue = h;
    this.pickerPosition = {
      x: s / 100,
      y: 1 - (l / 100)
    };
  }

  private _updateColorFromPicker() {
    const { x, y } = this.pickerPosition;
    const s = x * 100;
    const l = (1 - y) * 100;

    const rgb = this._hslToRgb(this.currentHue, s, l);

    this.colorFormats = {
      hex: this._rgbToHex(rgb.r, rgb.g, rgb.b),
      rgb,
      rgba: { ...rgb, a: this.currentAlpha },
      hsl: { h: this.currentHue, s, l },
      hsla: { h: this.currentHue, s, l, a: this.currentAlpha }
    };

    this._updateValue();
  }

  private _updateValue() {
    const newValue = this._getCurrentColorValue();
    this.value = newValue;

    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        value: newValue,
        format: this.format,
        colorFormats: this.colorFormats
      }
    }));
  }

  private _handleTriggerClick() {
    if (this.disabled || this.readOnly) return;
    this._toggleDropdown();
  }

  private _handleClear(e: Event) {
    e.stopPropagation();
    this.value = '';
    this._closeDropdown();
  }

  private _handleNoColor() {
    this.value = '';
    this._closeDropdown();
  }

  private _selectPreset(preset: PresetColor) {
    this.value = preset.value;
    this._parseColor(preset.value);
    this._closeDropdown();
  }

  private _changeFormat(format: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla') {
    this.format = format;

    this.dispatchEvent(new CustomEvent('format-change', {
      bubbles: true,
      composed: true,
      detail: { format }
    }));
  }

  private _handleFormatInput(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this._parseColor(target.value);
  }

  private _handleFormatKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this._closeDropdown();
    }
  }

  // Picker area handlers
  private _handlePickerMouseDown(e: MouseEvent) {
    this.isDragging = true;
    this._updatePickerFromMouse(e);
  }

  private _handlePickerMouseMove(e: MouseEvent) {
    if (this.isDragging) {
      this._updatePickerFromMouse(e);
    }
  }

  private _handlePickerMouseUp() {
    this.isDragging = false;
  }

  private _updatePickerFromMouse(e: MouseEvent) {
    if (!this.pickerArea) return;

    const rect = this.pickerArea.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    this.pickerPosition = { x, y };
    this._updateColorFromPicker();
  }

  // Hue slider handlers
  private _handleHueMouseDown(e: MouseEvent) {
    this.isDragging = true;
    this._updateHueFromMouse(e);
  }

  private _handleHueMouseMove(e: MouseEvent) {
    if (this.isDragging) {
      this._updateHueFromMouse(e);
    }
  }

  private _handleHueMouseUp() {
    this.isDragging = false;
  }

  private _updateHueFromMouse(e: MouseEvent) {
    if (!this.hueSlider) return;

    const rect = this.hueSlider.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

    this.currentHue = x * 360;
    this._updateColorFromPicker();
  }

  // Alpha slider handlers
  private _handleAlphaMouseDown(e: MouseEvent) {
    this.isDragging = true;
    this._updateAlphaFromMouse(e);
  }

  private _handleAlphaMouseMove(e: MouseEvent) {
    if (this.isDragging) {
      this._updateAlphaFromMouse(e);
    }
  }

  private _handleAlphaMouseUp() {
    this.isDragging = false;
  }

  private _updateAlphaFromMouse(e: MouseEvent) {
    if (!this.alphaSlider) return;

    const rect = this.alphaSlider.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

    this.currentAlpha = x;
    this._updateColorFromPicker();
  }

  private _toggleDropdown() {
    if (this.isOpen) {
      this._closeDropdown();
    } else {
      this._openDropdown();
    }
  }

  private _openDropdown() {
    this.isOpen = true;
    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }

  private _closeDropdown() {
    this.isOpen = false;
    this.isDragging = false;
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  // Close dropdown when clicking outside
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick.bind(this));
    document.addEventListener('keydown', this._handleEscapeKey.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick.bind(this));
    document.removeEventListener('keydown', this._handleEscapeKey.bind(this));
  }

  private _handleOutsideClick(e: Event) {
    if (!this.contains(e.target as Node)) {
      this._closeDropdown();
    }
  }

  private _handleEscapeKey(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.isOpen) {
      this._closeDropdown();
    }
  }

  /**
   * Get current color value
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * Set color value
   */
  public setValue(value: string) {
    this.value = value;
  }

  /**
   * Get color formats
   */
  public getColorFormats(): ColorFormat {
    return { ...this.colorFormats };
  }

  /**
   * Open the color picker
   */
  public open() {
    this._openDropdown();
  }

  /**
   * Close the color picker
   */
  public close() {
    this._closeDropdown();
  }

  /**
   * Check if picker is open
   */
  public isOpenPicker(): boolean {
    return this.isOpen;
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-color-picker': SkillColorPicker;
  }
}