import { LitElement, html, type PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { skeletonStyles } from './skill-skeleton.styles';
import { baseStyles } from '../../../styles/base';

/**
 * Skill Skeleton Component - 骨架屏组件
 *
 * @slot - Optional content to show when loading is complete
 *
 * @csspart skeleton - The skeleton element
 *
 * @cssprop --skeleton-color-start - Start color for gradient
 * @cssprop --skeleton-color-middle - Middle color for gradient
 * @cssprop --skeleton-color-end - End color for gradient
 * @cssprop --skeleton-animation-duration - Animation duration
 * @cssprop --skeleton-radius - Border radius
 * @cssprop --skeleton-width - Custom width
 * @cssprop --skeleton-height - Custom height
 *
 * @fires skill-skeleton-complete - Dispatched when loading is complete
 *
 * @example
 * ```html
 * <!-- 基础文本骨架屏 -->
 * <skill-skeleton shape="text"></skill-skeleton>
 *
 * <!-- 标题骨架屏 -->
 * <skill-skeleton shape="title"></skill-skeleton>
 *
 * <!-- 段落骨架屏 -->
 * <skill-skeleton shape="paragraph" lines="3"></skill-skeleton>
 *
 * <!-- 头像骨架屏 -->
 * <skill-skeleton shape="avatar"></skill-skeleton>
 *
 * <!-- 按钮骨架屏 -->
 * <skill-skeleton shape="button"></skill-skeleton>
 *
 * <!-- 卡片骨架屏 -->
 * <skill-skeleton shape="card" width="300px" height="200px"></skill-skeleton>
 *
 * <!-- 图片骨架屏 -->
 * <skill-skeleton shape="image" width="200px" height="150px"></skill-skeleton>
 *
 * <!-- 自定义尺寸 -->
 * <skill-skeleton width="100%" height="20px"></skill-skeleton>
 *
 * <!-- 不同动画效果 -->
 * <skill-skeleton shape="text" animation="pulse"></skill-skeleton>
 * <skill-skeleton shape="text" animation="wave"></skill-skeleton>
 * <skill-skeleton shape="text" animation="fade"></skill-skeleton>
 *
 * <!-- 深色主题 -->
 * <skill-skeleton shape="card" theme="dark"></skill-skeleton>
 *
 * <!-- 表格行骨架屏 -->
 * <skill-skeleton shape="table-row"></skill-skeleton>
 *
 * <!-- 列表项骨架屏 -->
 * <skill-skeleton shape="list-item"></skill-skeleton>
 *
 * <!-- 代码块骨架屏 -->
 * <skill-skeleton shape="code" width="100%" height="100px"></skill-skeleton>
 *
 * <!-- 图表骨架屏 -->
 * <skill-skeleton shape="chart" width="100%" height="300px"></skill-skeleton>
 * ```
 */
@customElement('skill-skeleton')
export class SkillSkeleton extends LitElement {
  static styles = [baseStyles, skeletonStyles];

  /**
   * Shape variant of the skeleton
   * @type {'text' | 'title' | 'paragraph' | 'avatar' | 'circle' | 'square' | 'rounded' | 'button' | 'input' | 'card' | 'image' | 'table-row' | 'list-item' | 'code' | 'chart'}
   */
  @property({ type: String, reflect: true })
  shape: 'text' | 'title' | 'paragraph' | 'avatar' | 'circle' | 'square' | 'rounded' | 'button' | 'input' | 'card' | 'image' | 'table-row' | 'list-item' | 'code' | 'chart' = 'text';

  /**
   * Size preset
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Animation type
   * @type {'default' | 'pulse' | 'wave' | 'fade' | 'none'}
   */
  @property({ type: String, reflect: true })
  animation: 'default' | 'pulse' | 'wave' | 'fade' | 'none' = 'default';

  /**
   * Color theme
   * @type {'light' | 'dark'}
   */
  @property({ type: String, reflect: true })
  theme: 'light' | 'dark' = 'light';

  /**
   * Border radius
   * @type {'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'}
   */
  @property({ type: String, reflect: true })
  radius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /**
   * Custom width
   */
  @property({ type: String, reflect: true })
  width?: string;

  /**
   * Custom height
   */
  @property({ type: String, reflect: true })
  height?: string;

  /**
   * Number of lines for paragraph shape
   */
  @property({ type: Number, reflect: true })
  lines = 1;

  /**
   * Loading state
   */
  @property({ type: Boolean, reflect: true })
  loading = true;

  /**
   * Enable responsive behavior
   */
  @property({ type: Boolean, reflect: true })
  responsive = false;

  /**
   * Delay before showing skeleton (in milliseconds)
   */
  @property({ type: Number, reflect: true })
  delay = 0;

  /**
   * ARIA label for accessibility
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  private _showTimeout?: number;
  private _isVisible = false;

  connectedCallback() {
    super.connectedCallback();
    this._setupIntersectionObserver();

    // Set ARIA attributes
    if (!this.ariaLabel) {
      this.ariaLabel = this._generateAriaLabel();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
    }
  }

  protected willUpdate(changedProperties: PropertyValueMap<this>) {
    if (changedProperties.has('width') && this.width) {
      this.style.setProperty('--skeleton-width', this.width);
    }
    if (changedProperties.has('height') && this.height) {
      this.style.setProperty('--skeleton-height', this.height);
    }
    if (changedProperties.has('loading')) {
      this._handleLoadingChange();
    }
  }

  private _setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this._isVisible = true;
              if (this.delay > 0) {
                this._showTimeout = window.setTimeout(() => {
                  this.requestUpdate();
                }, this.delay);
              }
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(this);
    } else {
      this._isVisible = true;
    }
  }

  private _generateAriaLabel(): string {
    const shapeLabels = {
      text: 'Loading text',
      title: 'Loading title',
      paragraph: 'Loading paragraph',
      avatar: 'Loading avatar',
      circle: 'Loading circular content',
      square: 'Loading square content',
      rounded: 'Loading rounded content',
      button: 'Loading button',
      input: 'Loading input field',
      card: 'Loading card',
      image: 'Loading image',
      'table-row': 'Loading table row',
      'list-item': 'Loading list item',
      code: 'Loading code',
      chart: 'Loading chart'
    };
    return shapeLabels[this.shape] || 'Loading content';
  }

  private _handleLoadingChange() {
    if (!this.loading) {
      this.dispatchEvent(
        new CustomEvent('skill-skeleton-complete', {
          bubbles: true,
          composed: true,
          detail: {
            shape: this.shape,
            size: this.size,
          },
        })
      );
    }
  }

  render() {
    if (!this.loading) {
      return html`<slot></slot>`;
    }

    if (this.delay > 0 && !this._isVisible) {
      return html``; // Don't render skeleton until visible and delay passed
    }

    return this.shape === 'paragraph' && this.lines > 1
      ? this._renderParagraphLines()
      : this._renderSkeleton();
  }

  private _renderSkeleton() {
    return html`
      <div
        part="skeleton"
        class="skill-skeleton"
        role="progressbar"
        aria-label="${this.ariaLabel || ''}"
        aria-busy="${this.loading ? 'true' : 'false'}"
      ></div>
    `;
  }

  private _renderParagraphLines() {
    return html`
      <div role="progressbar" aria-label="${this.ariaLabel || ''}" aria-busy="${this.loading ? 'true' : 'false'}">
        ${Array.from({ length: this.lines }, (_, i) =>
          html`
            <div
              part="skeleton"
              class="skill-skeleton"
              style="${i === this.lines - 1 ? 'max-width: 70%;' : ''}"
            ></div>
          `
        )}
      </div>
    `;
  }

  /**
   * Programmatically start loading
   */
  public startLoading() {
    this.loading = true;
  }

  /**
   * Programmatically stop loading
   */
  public stopLoading() {
    this.loading = false;
  }

  /**
   * Get current loading state
   */
  public get isLoading(): boolean {
    return this.loading;
  }

  /**
   * Get current shape
   */
  public get currentShape(): string {
    return this.shape;
  }

  /**
   * Get current animation type
   */
  public get currentAnimation(): string {
    return this.animation;
  }

  /**
   * Change shape dynamically
   */
  public setShape(shape: SkillSkeleton['shape']) {
    this.shape = shape;
  }

  /**
   * Change animation dynamically
   */
  public setAnimation(animation: SkillSkeleton['animation']) {
    this.animation = animation;
  }

  /**
   * Set custom dimensions
   */
  public setDimensions(width?: string, height?: string) {
    if (width) this.width = width;
    if (height) this.height = height;
  }

  /**
   * Simulate loading completion after delay
   */
  public simulateLoading(duration: number = 2000) {
    this.startLoading();
    setTimeout(() => {
      this.stopLoading();
    }, duration);
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-skeleton': SkillSkeleton;
  }
}