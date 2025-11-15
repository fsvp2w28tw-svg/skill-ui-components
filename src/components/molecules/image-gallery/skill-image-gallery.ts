import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { imageGalleryStyles } from './skill-image-gallery.styles';
import { baseStyles } from '../../../styles/base';

export interface GalleryImage {
  id: string;
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  disabled?: boolean;
}

export interface GalleryEventDetail {
  image: GalleryImage;
  index: number;
  images: GalleryImage[];
  originalEvent: Event;
}

/**
 * Skill ImageGallery Component - 图片展示组件
 *
 * @slot toolbar-left - 工具栏左侧插槽
 * @slot toolbar-right - 工具栏右侧插槽
 * @slot empty - 空状态插槽
 * @slot error - 错误状态插槽
 *
 * @csspart gallery - 图库容器
 * @csspart main - 主视图
 * @csspart image - 主图片
 * @csspart thumbnails - 缩略图容器
 * @csspart thumbnail - 缩略图
 * @csspart nav - 导航按钮
 * @csspart toolbar - 工具栏
 * @csspart lightbox - 灯箱
 *
 * @cssprop --gallery-gap - 图片间距
 * @cssprop --gallery-thumbnail-size - 缩略图大小
 * @cssprop --gallery-overlay-bg - 叠加层背景色
 *
 * @fires skill-image-click - 图片点击事件
 * @fires skill-image-change - 图片切换事件
 * @fires skill-image-load - 图片加载事件
 * @fires skill-image-error - 图片加载错误事件
 * @fires skill-zoom-start - 开始缩放事件
 * @fires skill-zoom-end - 结束缩放事件
 * @fires skill-lightbox-open - 打开灯箱事件
 * @fires skill-lightbox-close - 关闭灯箱事件
 *
 * @example
 * ```html
 * <!-- 基础图片画廊 -->
 * <skill-image-gallery
 *   .images=${[
 *     {
 *       id: '1',
 *       src: 'https://example.com/image1.jpg',
 *       alt: 'Image 1',
 *       title: 'Beautiful Landscape'
 *     },
 *     {
 *       id: '2',
 *       src: 'https://example.com/image2.jpg',
 *       alt: 'Image 2',
 *       title: 'City Skyline'
 *     }
 *   ]}
 * ></skill-image-gallery>
 *
 * <!-- 带缩略图的画廊 -->
 * <skill-image-gallery
 *   show-thumbnails
 *   .images=${galleryImages}
 * ></skill-image-gallery>
 *
 * <!-- 网格布局 -->
 * <skill-image-gallery
 *   layout="grid"
 *   grid-columns="3"
 *   .images=${galleryImages}
 * ></skill-image-gallery>
 *
 * <!-- Masonry 布局 -->
 * <skill-image-gallery
 *   layout="masonry"
 *   .images=${galleryImages}
 * ></skill-image-gallery>
 *
 * <!-- 可缩放的画廊 -->
 * <skill-image-gallery
 *   zoomable
 *   zoom-level="2"
 *   .images=${galleryImages}
 * ></skill-image-gallery>
 *
 * <!-- 带灯箱的画廊 -->
 * <skill-image-gallery
 *   lightbox
 *   .images=${galleryImages}
 *   @skill-lightbox-open=${handleLightboxOpen}
 * ></skill-image-gallery>
 *
 * <!-- 自动播放画廊 -->
 * <skill-image-gallery
 *   autoplay
 *   interval="3000"
 *   .images=${galleryImages}
 * ></skill-image-gallery>
 *
 * <!-- 响应式画廊 -->
 * <skill-image-gallery
 *   responsive
 *   .images=${galleryImages}
 * ></skill-image-gallery>
 *
 * <!-- 带工具栏的画廊 -->
 * <skill-image-gallery .images=${galleryImages}>
 *   <button slot="toolbar-left" @click=${handleDownload}>Download</button>
 *   <button slot="toolbar-right" @click=${handleFullscreen}>Fullscreen</button>
 * </skill-image-gallery>
 *
 * <!-- 自定义主题 -->
 * <skill-image-gallery
 *   .images=${galleryImages}
 *   theme="dark"
 *   border-radius="12px"
 * ></skill-image-gallery>
 *
 * <!-- 懒加载画廊 -->
 * <skill-image-gallery
 *   lazy-load
 *   .images=${largeImageSet}
 * ></skill-image-gallery>
 *
 * <!-- 虚拟滚动（大量图片） -->
 * <skill-image-gallery
 *   virtual-scroll
 *   item-height="200"
 *   .images=${hugeImageSet}
 * ></skill-image-gallery>
 * ```
 */
@customElement('skill-image-gallery')
export class SkillImageGallery extends LitElement {
  static styles = [baseStyles, imageGalleryStyles];

  /**
   * 图片数据
   */
  @property({ type: Array })
  images: GalleryImage[] = [];

  /**
   * 当前显示的图片索引
   */
  @property({ type: Number })
  currentIndex = 0;

  /**
   * 布局模式
   * @type {'slider' | 'grid' | 'masonry'}
   */
  @property({ type: String, reflect: true })
  layout: 'slider' | 'grid' | 'masonry' = 'slider';

  /**
   * 图片适应方式
   * @type {'cover' | 'contain' | 'fill'}
   */
  @property({ type: String, reflect: true, attribute: 'image-fit' })
  imageFit: 'cover' | 'contain' | 'fill' = 'contain';

  /**
   * 是否显示缩略图
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-thumbnails' })
  showThumbnails = false;

  /**
   * 缩略图位置
   * @type {'bottom' | 'left' | 'right' | 'top'}
   */
  @property({ type: String, reflect: true, attribute: 'thumbnail-position' })
  thumbnailPosition: 'bottom' | 'left' | 'right' | 'top' = 'bottom';

  /**
   * 网格列数
   */
  @property({ type: Number, reflect: true, attribute: 'grid-columns' })
  gridColumns = 3;

  /**
   * 是否可缩放
   */
  @property({ type: Boolean, reflect: true })
  zoomable = false;

  /**
   * 缩放级别
   */
  @property({ type: Number, reflect: true, attribute: 'zoom-level' })
  zoomLevel = 2;

  /**
   * 是否启用灯箱
   */
  @property({ type: Boolean, reflect: true })
  lightbox = false;

  /**
   * 是否自动播放
   */
  @property({ type: Boolean, reflect: true })
  autoplay = false;

  /**
   * 自动播放间隔（毫秒）
   */
  @property({ type: Number, reflect: true, attribute: 'autoplay-interval' })
  autoplayInterval = 3000;

  /**
   * 是否显示导航按钮
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-navigation' })
  showNavigation = true;

  /**
   * 是否显示工具栏
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-toolbar' })
  showToolbar = false;

  /**
   * 是否显示计数器
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-counter' })
  showCounter = true;

  /**
   * 是否启用懒加载
   */
  @property({ type: Boolean, reflect: true, attribute: 'lazy-load' })
  lazyLoad = false;

  /**
   * 是否响应式
   */
  @property({ type: Boolean, reflect: true })
  responsive = true;

  /**
   * 是否循环播放
   */
  @property({ type: Boolean, reflect: true })
  loop = true;

  /**
   * 图库尺寸
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

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
   * 是否加载中
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * ARIA 标签
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel = 'Image gallery';

  @query('.skill-image-gallery__main')
  private _mainElement!: HTMLElement;

  @query('.skill-image-gallery__zoom-container')
  private _zoomContainer!: HTMLElement;

  @state()
  private _lightboxOpen = false;

  @state()
  private _lightboxIndex = 0;

  @state()
  private _zooming = false;

  @state()
  private _loadedImages: Set<string> = new Set();

  @state()
  private _errorImages: Set<string> = new Set();

  private _autoplayTimer?: number;

  connectedCallback() {
    super.connectedCallback();
    if (this.autoplay && !this.disabled) {
      this._startAutoplay();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopAutoplay();
    this._removeKeyboardListeners();
  }

  willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('currentIndex') || changedProperties.has('images')) {
      this._preloadImages();
    }
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('autoplay')) {
      if (this.autoplay && !this.disabled) {
        this._startAutoplay();
      } else {
        this._stopAutoplay();
      }
    }

    if (changedProperties.has('lightbox') && this.lightbox) {
      this._addKeyboardListeners();
    } else if (changedProperties.has('lightbox') && !this.lightbox) {
      this._removeKeyboardListeners();
    }
  }

  private _getThumbnails(): GalleryImage[] {
    return this.images.filter(img => !img.disabled);
  }

  private _getCurrentImage(): GalleryImage | undefined {
    return this.images[this.currentIndex];
  }

  private _preloadImages() {
    if (this.lazyLoad) return;

    // 预加载当前图片和下一张
    const indices = [this.currentIndex, this.currentIndex + 1, this.currentIndex - 1];

    indices.forEach(index => {
      const actualIndex = this.loop
        ? (index + this.images.length) % this.images.length
        : Math.max(0, Math.min(index, this.images.length - 1));

      const image = this.images[actualIndex];
      if (image && !this._loadedImages.has(image.src)) {
        const img = new Image();
        img.onload = () => this._loadedImages.add(image.src);
        img.onerror = () => this._errorImages.add(image.src);
        img.src = image.src;
      }
    });
  }

  private _handlePrevious() {
    if (this.disabled || this.images.length <= 1) return;

    const newIndex = this.currentIndex - 1;
    this.currentIndex = this.loop
      ? (newIndex + this.images.length) % this.images.length
      : Math.max(0, newIndex);

    this._fireImageChange();
  }

  private _handleNext() {
    if (this.disabled || this.images.length <= 1) return;

    const newIndex = this.currentIndex + 1;
    this.currentIndex = this.loop
      ? newIndex % this.images.length
      : Math.min(this.images.length - 1, newIndex);

    this._fireImageChange();
  }

  private _handleThumbnailClick(index: number) {
    if (this.disabled) return;

    this.currentIndex = index;
    this._fireImageChange();
  }

  private _handleMainImageClick(image: GalleryImage) {
    if (this.disabled || this.readonly) return;

    if (this.lightbox) {
      this._openLightbox(this.currentIndex);
    } else {
      this._fireEvent('skill-image-click', image);
    }
  }

  private _openLightbox(index: number) {
    this._lightboxOpen = true;
    this._lightboxIndex = index;
    this._fireEvent('skill-lightbox-open', this.images[index]);
  }

  private _closeLightbox() {
    this._lightboxOpen = false;
    this._fireEvent('skill-lightbox-close', this.images[this._lightboxIndex]);
  }

  private _handleLightboxPrev() {
    this._lightboxIndex = this._lightboxIndex > 0
      ? this._lightboxIndex - 1
      : this.images.length - 1;
  }

  private _handleLightboxNext() {
    this._lightboxIndex = (this._lightboxIndex + 1) % this.images.length;
  }

  private _handleZoomStart(e: MouseEvent) {
    if (!this.zoomable || this.disabled || this.readonly) return;

    this._zooming = true;
    this._updateZoomPosition(e);
    this._fireEvent('skill-zoom-start', this._getCurrentImage()!);
  }

  private _handleZoomMove(e: MouseEvent) {
    if (!this._zooming) return;
    this._updateZoomPosition(e);
  }

  private _handleZoomEnd() {
    if (!this._zooming) return;

    this._zooming = false;
    this._fireEvent('skill-zoom-end', this._getCurrentImage()!);
  }

  private _updateZoomPosition(e: MouseEvent) {
    if (!this._zoomContainer) return;

    const rect = this._mainElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    this._zoomContainer.style.transform = `translate(-${xPercent / (this.zoomLevel - 1)}%, -${yPercent / (this.zoomLevel - 1)}%)`;
  }

  private _handleImageLoad(image: GalleryImage) {
    this._loadedImages.add(image.src);
    this._fireEvent('skill-image-load', image);
  }

  private _handleImageError(image: GalleryImage) {
    this._errorImages.add(image.src);
    this._fireEvent('skill-image-error', image);
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (this.disabled) return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        if (this._lightboxOpen) {
          this._handleLightboxPrev();
        } else {
          this._handlePrevious();
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (this._lightboxOpen) {
          this._handleLightboxNext();
        } else {
          this._handleNext();
        }
        break;
      case 'Escape':
        e.preventDefault();
        if (this._lightboxOpen) {
          this._closeLightbox();
        }
        break;
    }
  }

  private _addKeyboardListeners() {
    document.addEventListener('keydown', this._handleKeydown.bind(this));
  }

  private _removeKeyboardListeners() {
    document.removeEventListener('keydown', this._handleKeydown.bind(this));
  }

  private _startAutoplay() {
    this._stopAutoplay();
    this._autoplayTimer = window.setInterval(() => {
      this._handleNext();
    }, this.autoplayInterval);
  }

  private _stopAutoplay() {
    if (this._autoplayTimer) {
      clearInterval(this._autoplayTimer);
      this._autoplayTimer = undefined;
    }
  }

  private _fireEvent(eventName: string, image: GalleryImage) {
    const detail = {
      image,
      index: this.images.indexOf(image),
      images: this.images,
      originalEvent: new Event(eventName),
    } as GalleryEventDetail;

    this.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail,
    }));
  }

  private _fireImageChange() {
    const image = this._getCurrentImage();
    if (image) {
      this._fireEvent('skill-image-change', image);
    }
  }

  private _isImageLoaded(image: GalleryImage): boolean {
    return this._loadedImages.has(image.src);
  }

  private _isImageError(image: GalleryImage): boolean {
    return this._errorImages.has(image.src);
  }

  private _renderMainImage(): TemplateResult {
    const image = this._getCurrentImage();
    if (!image) {
      return html`
        <div class="skill-image-gallery__empty">
          <div class="skill-image-gallery__empty-icon">
            <skill-icon name="image" size="lg"></skill-icon>
          </div>
          <div class="skill-image-gallery__empty-text">No images available</div>
        </div>
      `;
    }

    const isLoaded = this._isImageLoaded(image);
    const isError = this._isImageError(image);

    return html`
      <div class="skill-image-gallery__main skill-image-gallery__main--${this.imageFit}">
        ${this.zoomable ? html`
          <div
            class="skill-image-gallery__zoom"
            @mousedown=${this._handleZoomStart}
            @mousemove=${this._handleZoomMove}
            @mouseup=${this._handleZoomEnd}
            @mouseleave=${this._handleZoomEnd}
          >
            <div
              class="skill-image-gallery__zoom-container ${this._zooming ? 'skill-image-gallery__zoom-container--visible' : ''}"
              style="transform: scale(${this.zoomLevel})"
            >
              <img
                class="skill-image-gallery__zoom-image"
                src="${image.src}"
                alt="${image.alt || ''}"
                loading="${image.loading || 'lazy'}"
              />
            </div>
          </div>
        ` : ''}

        <img
          class="skill-image-gallery__main-image
                 ${!isLoaded ? 'skill-image-gallery__main-image--loading' : ''}
                 ${isError ? 'skill-image-gallery__main-image--error' : ''}"
          src="${image.src}"
          alt="${image.alt || ''}"
          title="${image.title || ''}"
          loading="${image.loading || 'lazy'}"
          @click=${() => this._handleMainImageClick(image)}
          @load=${() => this._handleImageLoad(image)}
          @error=${() => this._handleImageError(image)}
        />

        ${image.title || image.description ? html`
          <div class="skill-image-gallery__overlay">
            ${image.title ? html`<h3 class="skill-image-gallery__overlay-title">${image.title}</h3>` : ''}
            ${image.description ? html`<p class="skill-image-gallery__overlay-description">${image.description}</p>` : ''}
          </div>
        ` : ''}

        ${this.showNavigation && this.layout === 'slider' ? html`
          <button
            class="skill-image-gallery__nav skill-image-gallery__nav-prev
                   ${!this.loop && this.currentIndex === 0 ? 'skill-image-gallery__nav--disabled' : ''}"
            @click=${this._handlePrevious}
            disabled="${!this.loop && this.currentIndex === 0}"
            aria-label="Previous image"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/>
            </svg>
          </button>
          <button
            class="skill-image-gallery__nav skill-image-gallery__nav-next
                   ${!this.loop && this.currentIndex === this.images.length - 1 ? 'skill-image-gallery__nav--disabled' : ''}"
            @click=${this._handleNext}
            disabled="${!this.loop && this.currentIndex === this.images.length - 1}"
            aria-label="Next image"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/>
            </svg>
          </button>
        ` : ''}
      </div>
    `;
  }

  private _renderThumbnails(): TemplateResult {
    if (!this.showThumbnails || this.layout !== 'slider') return html``;

    const thumbnails = this._getThumbnails();

    return html`
      <div class="skill-image-gallery__thumbnails
                   skill-image-gallery__thumbnails--${this.thumbnailPosition}">
        ${thumbnails.map((image, index) => html`
          <div
            class="skill-image-gallery__thumbnail
                   ${this.currentIndex === index ? 'skill-image-gallery__thumbnail--active' : ''}
                   ${image.disabled ? 'skill-image-gallery__thumbnail--disabled' : ''}"
            @click=${() => !image.disabled && this._handleThumbnailClick(index)}
            title="${image.title || image.alt || ''}"
          >
            <img
              class="skill-image-gallery__thumbnail-image
                     ${!this._isImageLoaded(image) ? 'skill-image-gallery__thumbnail-image--loading' : ''}
                     ${this._isImageError(image) ? 'skill-image-gallery__thumbnail-image--error' : ''}"
              src="${image.thumbnail || image.src}"
              alt="${image.alt || ''}"
              loading="lazy"
              @load=${() => this._handleImageLoad(image)}
              @error=${() => this._handleImageError(image)}
            />
            ${image.title ? html`
              <div class="skill-image-gallery__thumbnail-overlay">
                ${image.title}
              </div>
            ` : ''}
          </div>
        `)}
      </div>
    `;
  }

  private _renderGrid(): TemplateResult {
    return html`
      <div class="skill-image-gallery--grid" style="grid-template-columns: repeat(${this.gridColumns}, 1fr)">
        ${this.images.filter(img => !img.disabled).map((image) => html`
          <div
            class="skill-image-gallery__grid-item"
            @click=${() => this._handleMainImageClick(image)}
          >
            <img
              class="skill-image-gallery__grid-image"
              src="${image.thumbnail || image.src}"
              alt="${image.alt || ''}"
              loading="${image.loading || 'lazy'}"
              @load=${() => this._handleImageLoad(image)}
              @error=${() => this._handleImageError(image)}
            />
            <div class="skill-image-gallery__grid-overlay">
              ${image.title ? html`<div>${image.title}</div>` : ''}
            </div>
          </div>
        `)}
      </div>
    `;
  }

  private _renderMasonry(): TemplateResult {
    return html`
      <div class="skill-image-gallery--masonry">
        ${this.images.filter(img => !img.disabled).map((image) => html`
          <div
            class="skill-image-gallery__masonry-item"
            @click=${() => this._handleMainImageClick(image)}
          >
            <img
              class="skill-image-gallery__masonry-image"
              src="${image.thumbnail || image.src}"
              alt="${image.alt || ''}"
              loading="${image.loading || 'lazy'}"
              @load=${() => this._handleImageLoad(image)}
              @error=${() => this._handleImageError(image)}
            />
          </div>
        `)}
      </div>
    `;
  }

  private _renderToolbar(): TemplateResult {
    if (!this.showToolbar) return html``;

    return html`
      <div class="skill-image-gallery__toolbar">
        <div class="skill-image-gallery__toolbar-left">
          <slot name="toolbar-left"></slot>
          ${this.showCounter ? html`
            <span class="skill-image-gallery__counter">
              ${this.currentIndex + 1} / ${this.images.length}
            </span>
          ` : ''}
        </div>
        <div class="skill-image-gallery__toolbar-right">
          <slot name="toolbar-right"></slot>
          ${this.autoplay ? html`
            <button
              class="skill-image-gallery__toolbar-btn"
              @click=${() => this.autoplay ? this._stopAutoplay() : this._startAutoplay()}
            >
              <skill-icon name="${this.autoplay ? 'pause' : 'play'}" size="sm"></skill-icon>
            </button>
          ` : ''}
          ${this.lightbox ? html`
            <button
              class="skill-image-gallery__toolbar-btn"
              @click=${() => this._openLightbox(this.currentIndex)}
            >
              <skill-icon name="maximize" size="sm"></skill-icon>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }

  private _renderLightbox(): TemplateResult {
    if (!this.lightbox) return html``;

    const image = this.images[this._lightboxIndex];

    return html`
      <div
        class="skill-image-gallery__lightbox ${this._lightboxOpen ? 'skill-image-gallery__lightbox--visible' : ''}"
        @click=${this._closeLightbox}
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
      >
        <div class="skill-image-gallery__lightbox-content" @click=${(e: Event) => e.stopPropagation()}>
          ${image ? html`
            <img
              class="skill-image-gallery__lightbox-image"
              src="${image.src}"
              alt="${image.alt || ''}"
            />
          ` : ''}

          <button
            class="skill-image-gallery__lightbox-close"
            @click=${this._closeLightbox}
            aria-label="Close lightbox"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>

          ${this.images.length > 1 ? html`
            <button
              class="skill-image-gallery__lightbox-nav skill-image-gallery__lightbox-nav--prev
                     ${this._lightboxIndex === 0 ? 'skill-image-gallery__lightbox-nav--disabled' : ''}"
              @click=${this._handleLightboxPrev}
              disabled="${this._lightboxIndex === 0}"
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/>
              </svg>
            </button>
            <button
              class="skill-image-gallery__lightbox-nav skill-image-gallery__lightbox-nav--next"
              @click=${this._handleLightboxNext}
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/>
              </svg>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }

  render(): TemplateResult {
    const images = this.images.filter(img => !img.disabled);

    if (this.loading) {
      return html`
        <div class="skill-image-gallery">
          <div class="skill-image-gallery__loading">
            <div class="skill-image-gallery__loading-spinner"></div>
            Loading images...
          </div>
        </div>
      `;
    }

    if (images.length === 0) {
      return html`
        <div class="skill-image-gallery">
          <slot name="empty">
            <div class="skill-image-gallery__empty">
              <div class="skill-image-gallery__empty-icon">
                <skill-icon name="image" size="lg"></skill-icon>
              </div>
              <div class="skill-image-gallery__empty-text">No images available</div>
              <div class="skill-image-gallery__empty-description">Add some images to get started</div>
            </div>
          </slot>
        </div>
      `;
    }

    return html`
      <div
        part="gallery"
        class="skill-image-gallery skill-image-gallery--${this.size}
               ${this.disabled ? 'skill-image-gallery--disabled' : ''}"
        role="region"
        aria-label="${this.ariaLabel}"
      >
        ${this._renderToolbar()}

        ${this.layout === 'slider' ? this._renderMainImage() : ''}
        ${this.layout === 'grid' ? this._renderGrid() : ''}
        ${this.layout === 'masonry' ? this._renderMasonry() : ''}

        ${this._renderThumbnails()}

        ${this._renderLightbox()}
      </div>
    `;
  }

  /**
   * 导航到指定图片
   */
  public goToImage(index: number): void {
    if (index >= 0 && index < this.images.length) {
      this.currentIndex = index;
      this._fireImageChange();
    }
  }

  /**
   * 下一张图片
   */
  public next(): void {
    this._handleNext();
  }

  /**
   * 上一张图片
   */
  public previous(): void {
    this._handlePrevious();
  }

  /**
   * 开始自动播放
   */
  public play(): void {
    this.autoplay = true;
  }

  /**
   * 停止自动播放
   */
  public pause(): void {
    this.autoplay = false;
  }

  /**
   * 打开灯箱
   */
  public openLightbox(index?: number): void {
    this._openLightbox(index ?? this.currentIndex);
  }

  /**
   * 关闭灯箱
   */
  public closeLightbox(): void {
    this._closeLightbox();
  }

  /**
   * 添加图片
   */
  public addImage(image: GalleryImage): void {
    this.images = [...this.images, image];
  }

  /**
   * 移除图片
   */
  public removeImage(id: string): void {
    this.images = this.images.filter(img => img.id !== id);
    if (this.currentIndex >= this.images.length) {
      this.currentIndex = Math.max(0, this.images.length - 1);
    }
  }

  /**
   * 更新图片
   */
  public updateImage(id: string, updates: Partial<GalleryImage>): void {
    this.images = this.images.map(img =>
      img.id === id ? { ...img, ...updates } : img
    );
  }

  /**
   * 获取当前图片
   */
  public getCurrentImage(): GalleryImage | undefined {
    return this._getCurrentImage();
  }

  /**
   * 清除加载状态
   */
  public clearLoadedImages(): void {
    this._loadedImages.clear();
    this._errorImages.clear();
  }

  /**
   * 获取加载状态
   */
  public getLoadedImages(): string[] {
    return Array.from(this._loadedImages);
  }

  /**
   * 获取错误图片
   */
  public getErrorImages(): string[] {
    return Array.from(this._errorImages);
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-image-gallery': SkillImageGallery;
  }
}