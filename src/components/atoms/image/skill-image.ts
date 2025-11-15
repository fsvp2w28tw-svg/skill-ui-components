import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { imageStyles } from './skill-image.styles';
import { baseStyles } from '../../../styles/base';

/**
 * Skill Image Component - 图片组件
 *
 * @slot placeholder - Custom placeholder content
 * @slot error - Custom error content
 * @slot loading - Custom loading content
 *
 * @csspart image - The image element
 * @csspart container - The image container
 * @csspart placeholder - The placeholder element
 * @csspart error - The error element
 * @csspart loading - The loading element
 *
 * @cssprop --image-object-fit - Object fit for the image
 * @cssprop --image-object-position - Object position for the image
 * @cssprop --image-border-radius - Border radius for the image
 * @cssprop --image-aspect-ratio - Aspect ratio for the image
 *
 * @fires skill-image-load - Dispatched when image loads successfully
 * @fires skill-image-error - Dispatched when image fails to load
 * @fires skill-image-click - Dispatched when image is clicked
 *
 * @example
 * ```html
 * <!-- 基础图片 -->
 * <skill-image src="/path/to/image.jpg" alt="Description"></skill-image>
 *
 * <!-- 不同尺寸 -->
 * <skill-image src="/image.jpg" size="xs" alt="Extra small"></skill-image>
 * <skill-image src="/image.jpg" size="sm" alt="Small"></skill-image>
 * <skill-image src="/image.jpg" size="md" alt="Medium"></skill-image>
 * <skill-image src="/image.jpg" size="lg" alt="Large"></skill-image>
 * <skill-image src="/image.jpg" size="xl" alt="Extra large"></skill-image>
 *
 * <!-- 自定义尺寸 -->
 * <skill-image src="/image.jpg" width="300" height="200" alt="Custom size"></skill-image>
 *
 * <!-- 响应式图片 -->
 * <skill-image
 *   src="/image.jpg"
 *   srcset="/image-small.jpg 400w, /image-medium.jpg 800w, /image-large.jpg 1200w"
 *   sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px"
 *   alt="Responsive image"
 * ></skill-image>
 *
 * <!-- 懒加载 -->
 * <skill-image src="/image.jpg" lazy alt="Lazy loaded image"></skill-image>
 *
 * <!-- 圆形图片 -->
 * <skill-image src="/avatar.jpg" shape="circle" alt="Avatar"></skill-image>
 *
 * <!-- 圆角图片 -->
 * <skill-image src="/image.jpg" shape="rounded" alt="Rounded image"></skill-image>
 *
 * <!-- 带边框 -->
 * <skill-image src="/image.jpg" bordered alt="Bordered image"></skill-image>
 *
 * <!-- 阴影效果 -->
 * <skill-image src="/image.jpg" shadow="sm" alt="Small shadow"></skill-image>
 * <skill-image src="/image.jpg" shadow="md" alt="Medium shadow"></skill-image>
 * <skill-image src="/image.jpg" shadow="lg" alt="Large shadow"></skill-image>
 *
 * <!-- 不同对象适配方式 -->
 * <skill-image src="/image.jpg" object-fit="cover" alt="Cover fit"></skill-image>
 * <skill-image src="/image.jpg" object-fit="contain" alt="Contain fit"></skill-image>
 * <skill-image src="/image.jpg" object-fit="fill" alt="Fill fit"></skill-image>
 * <skill-image src="/image.jpg" object-fit="scale-down" alt="Scale down fit"></skill-image>
 *
 * <!-- 固定宽高比 -->
 * <skill-image src="/image.jpg" aspect-ratio="16/9" alt="16:9 aspect ratio"></skill-image>
 * <skill-image src="/image.jpg" aspect-ratio="4/3" alt="4:3 aspect ratio"></skill-image>
 * <skill-image src="/image.jpg" aspect-ratio="1/1" alt="Square"></skill-image>
 *
 * <!-- 可点击图片 -->
 * <skill-image src="/image.jpg" clickable alt="Clickable"></skill-image>
 *
 * <!-- 自定义占位符 -->
 * <skill-image src="/image.jpg" alt="Custom placeholder">
 *   <div slot="placeholder" style="padding: 20px; background: #f0f0f0; text-align: center;">
 *     Loading image...
 *   </div>
 * </skill-image>
 *
 * <!-- 自定义错误内容 -->
 * <skill-image src="/invalid.jpg" alt="Custom error">
 *   <div slot="error" style="padding: 20px; background: #fee; text-align: center;">
 *     Failed to load image
 *   </div>
 * </skill-image>
 *
 * <!-- 渐进式加载 -->
 * <skill-image
 *   src="/image.jpg"
 *   placeholder="/thumbnail.jpg"
 *   progressive
 *   alt="Progressive loading"
 * ></skill-image>
 *
 * <!-- 模糊加载效果 -->
 * <skill-image src="/image.jpg" blur-on-load alt="Blur effect"></skill-image>
 *
 * <!-- 缩放效果 -->
 * <skill-image src="/image.jpg" zoom-effect alt="Zoom effect"></skill-image>
 *
 * <!-- 图片画廊 -->
 * <skill-image
 *   src="/gallery/1.jpg"
 *   gallery="vacation"
 *   caption="Beach sunset"
 *   alt="Vacation photo 1"
 * ></skill-image>
 *
 * <!-- 优化的图片 -->
 * <skill-image
 *   src="/image.jpg"
 *   alt="Optimized image"
 *   loading="lazy"
 *   decoding="async"
 *   importance="low"
 * ></skill-image>
 * ```
 */
@customElement('skill-image')
export class SkillImage extends LitElement {
  static styles = [baseStyles, imageStyles];

  /**
   * Image source URL
   */
  @property({ type: String, reflect: true })
  src?: string;

  /**
   * Placeholder image source
   */
  @property({ type: String, reflect: true })
  placeholder?: string;

  /**
   * Image alt text for accessibility
   */
  @property({ type: String, reflect: true })
  alt?: string;

  /**
   * Image title text
   */
  @property({ type: String, reflect: true })
  title: string = '';

  /**
   * Image width in pixels
   */
  @property({ type: Number, reflect: true })
  width?: number;

  /**
   * Image height in pixels
   */
  @property({ type: Number, reflect: true })
  height?: number;

  /**
   * Size variant
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Image shape
   * @type {'default' | 'circle' | 'rounded' | 'square'}
   */
  @property({ type: String, reflect: true })
  shape: 'default' | 'circle' | 'rounded' | 'square' = 'default';

  /**
   * Object fit for the image
   * @type {'fill' | 'contain' | 'cover' | 'none' | 'scale-down'}
   */
  @property({ type: String, reflect: true, attribute: 'object-fit' })
  objectFit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' = 'cover';

  /**
   * Object position for the image
   */
  @property({ type: String, reflect: true, attribute: 'object-position' })
  objectPosition?: string;

  /**
   * Aspect ratio (e.g., "16/9", "4/3", "1/1")
   */
  @property({ type: String, reflect: true, attribute: 'aspect-ratio' })
  aspectRatio?: string;

  /**
   * Shadow size
   * @type {'none' | 'sm' | 'md' | 'lg'}
   */
  @property({ type: String, reflect: true })
  shadow: 'none' | 'sm' | 'md' | 'lg' = 'none';

  /**
   * Whether to show border
   */
  @property({ type: Boolean, reflect: true })
  bordered = false;

  /**
   * Whether to enable lazy loading
   */
  @property({ type: Boolean, reflect: true })
  lazy = false;

  /**
   * Whether the image is clickable
   */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  /**
   * Whether to enable progressive loading
   */
  @property({ type: Boolean, reflect: true })
  progressive = false;

  /**
   * Whether to add blur effect during loading
   */
  @property({ type: Boolean, reflect: true, attribute: 'blur-on-load' })
  blurOnLoad = false;

  /**
   * Whether to add zoom effect on hover
   */
  @property({ type: Boolean, reflect: true, attribute: 'zoom-effect' })
  zoomEffect = false;

  /**
   * Whether to show placeholder
   */
  @property({ type: Boolean, reflect: true })
  showPlaceholder = true;

  /**
   * Gallery identifier for grouping
   */
  @property({ type: String, reflect: true })
  gallery?: string;

  /**
   * Image caption
   */
  @property({ type: String, reflect: true })
  caption?: string;

  /**
   * Image srcset for responsive images
   */
  @property({ type: String, reflect: true })
  srcset?: string;

  /**
   * Image sizes attribute
   */
  @property({ type: String, reflect: true })
  sizes?: string;

  /**
   * Loading strategy
   * @type {'eager' | 'lazy'}
   */
  @property({ type: String, reflect: true })
  loading: 'eager' | 'lazy' = 'eager';

  /**
   * Decoding strategy
   * @type {'sync' | 'async' | 'auto'}
   */
  @property({ type: String, reflect: true })
  decoding: 'sync' | 'async' | 'auto' = 'auto';

  /**
   * Fetch priority
   * @type {'high' | 'low' | 'auto'}
   */
  @property({ type: String, reflect: true, attribute: 'fetch-priority' })
  fetchPriority: 'high' | 'low' | 'auto' = 'auto';

  /**
   * Image importance
   * @type {'high' | 'low' | 'auto'}
   */
  @property({ type: String, reflect: true })
  importance: 'high' | 'low' | 'auto' = 'auto';

  /**
   * ARIA label for accessibility
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  /**
   * Current loading state
   */
  @state()
  private _loading = true;

  /**
   * Whether image failed to load
   */
  @state()
  private _hasError = false;

  /**
   * Whether placeholder is visible
   */
  @state()
  private _showPlaceholderContent = true;

  private _observer?: IntersectionObserver;

  protected willUpdate() {
    // Set ARIA attributes
    if (!this.ariaLabel) {
      this.ariaLabel = this.alt || 'Image';
    }
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.lazy) {
      this._setupIntersectionObserver();
    } else {
      this._loadImage();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupObserver();
  }

  private _setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      this._loadImage();
      return;
    }

    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this._loadImage();
            this._observer?.unobserve(this as Element);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    this._observer.observe(this);
  }

  private _cleanupObserver() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = undefined;
    }
  }

  private _loadImage() {
    if (!this.src) {
      this._hasError = true;
      this._loading = false;
      return;
    }

    this._loading = true;
    this._hasError = false;

    // Load placeholder first if progressive loading
    if (this.progressive && this.placeholder) {
      this._loadPlaceholder();
    }

    // Create image element to preload
    const img = new Image();

    img.onload = () => {
      this._loading = false;
      this._hasError = false;
      this._showPlaceholderContent = false;

      this.dispatchEvent(
        new CustomEvent('skill-image-load', {
          bubbles: true,
          composed: true,
          detail: {
            src: this.src,
            width: img.naturalWidth,
            height: img.naturalHeight,
          },
        })
      );
    };

    img.onerror = () => {
      this._loading = false;
      this._hasError = true;

      this.dispatchEvent(
        new CustomEvent('skill-image-error', {
          bubbles: true,
          composed: true,
          detail: {
            src: this.src,
            error: 'Failed to load image',
          },
        })
      );
    };

    // Set loading attributes
    img.loading = this.loading;
    img.decoding = this.decoding;
    if (this.importance === 'high') {
      img.fetchPriority = 'high';
    }

    img.src = this.src;
  }

  private _loadPlaceholder() {
    if (!this.placeholder) return;

    const img = new Image();
    img.src = this.placeholder;
  }

  private _handleClick(e: Event) {
    if (!this.clickable) return;

    e.preventDefault();
    e.stopPropagation();

    this.dispatchEvent(
      new CustomEvent('skill-image-click', {
        bubbles: true,
        composed: true,
        detail: {
          originalEvent: e,
          src: this.src,
          alt: this.alt,
          gallery: this.gallery,
        },
      })
    );
  }

  private _renderPlaceholder(): TemplateResult {
    if (!this.showPlaceholder || !this._showPlaceholderContent || !this._loading) {
      return html``;
    }

    return html`
      <div part="placeholder" class="skill-image__placeholder">
        <slot name="placeholder">
          <div class="skill-image__default-placeholder">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
        </slot>
      </div>
    `;
  }

  private _renderError(): TemplateResult {
    if (!this._hasError) {
      return html``;
    }

    return html`
      <div part="error" class="skill-image__error">
        <slot name="error">
          <div class="skill-image__default-error">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>Failed to load image</span>
          </div>
        </slot>
      </div>
    `;
  }

  render() {
    const shouldShowImage = !this._hasError && this.src;
    const imageClasses = {
      'skill-image': true,
      'skill-image--loading': this._loading,
      'skill-image--blur': this.blurOnLoad && this._loading,
    };

    return html`
      <div
        part="container"
        class="skill-image__container"
        @click=${this._handleClick}
        role="${this.clickable ? 'button' : 'img'}"
        aria-label="${this.ariaLabel || ''}"
        tabindex="${this.clickable ? '0' : '-1'}"
      >
        ${shouldShowImage ? html`
          <img
            part="image"
            class="${Array.from(Object.entries(imageClasses))
              .filter(([_, v]) => v)
              .map(([k]) => k)
              .join(' ')}"
            src="${this.src}"
            srcset="${this.srcset || ''}"
            sizes="${this.sizes || ''}"
            alt="${this.alt || ''}"
            title="${this.title || ''}"
            loading="${this.lazy ? 'lazy' : this.loading}"
            decoding="${this.decoding}"
            fetchpriority="${this.fetchPriority}"
            importance="${this.importance}"
          />
        ` : ''}

        ${this._renderPlaceholder()}
        ${this._renderError()}

        ${this.caption ? html`
          <div part="caption" class="skill-image__caption">
            ${this.caption}
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * Get current loading state
   */
  public get isLoading(): boolean {
    return this._loading;
  }

  /**
   * Get error state
   */
  public get hasError(): boolean {
    return this._hasError;
  }

  /**
   * Reload the image
   */
  public reload(): void {
    this._loadImage();
  }

  /**
   * Set new image source
   */
  public setSrc(src: string): void {
    this.src = src;
    this._loadImage();
  }

  /**
   * Get image dimensions
   */
  public async getDimensions(): Promise<{ width: number; height: number } | null> {
    if (!this.src) return null;

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = () => resolve(null);
      img.src = this.src!;
    });
  }

  /**
   * Get current state
   */
  public get state() {
    return {
      src: this.src,
      alt: this.alt,
      loading: this._loading,
      hasError: this._hasError,
      clickable: this.clickable,
      lazy: this.lazy,
      gallery: this.gallery,
      width: this.width,
      height: this.height,
    };
  }

  /**
   * Focus the image
   */
  public focus(): void {
    const element = this.shadowRoot?.querySelector('.skill-image__container') as HTMLElement;
    element?.focus();
  }

  /**
   * Blur the image
   */
  public blur(): void {
    const element = this.shadowRoot?.querySelector('.skill-image__container') as HTMLElement;
    element?.blur();
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-image': SkillImage;
  }
}