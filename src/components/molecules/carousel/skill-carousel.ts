import { LitElement, html, type PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { carouselStyles } from './skill-carousel.styles';
import { baseStyles } from '../../../styles/base';
import type {} from '../../../types';

/**
 * Carousel specific types
 */
export type CarouselSize = 'sm' | 'md' | 'lg';
export type CarouselEffect = 'slide' | 'fade' | 'slide-vertical' | 'slide-scale';
export type CarouselNavigation = 'always' | 'hover' | 'hidden';
export type CarouselIndicators = 'dots' | 'line' | 'number' | 'hidden';

export interface CarouselSlide {
  key: string;
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  href?: string;
  target?: string;
  loading?: 'eager' | 'lazy';
}

export interface CarouselEventDetail {
  currentIndex: number;
  slide: CarouselSlide;
  totalSlides: number;
}

/**
 * Skill Carousel Component
 *
 * A versatile carousel component with multiple navigation options,
 * autoplay functionality, and extensive customization features.
 *
 * @slot slide - Custom slide content
 * @slot nav-prev - Custom previous button
 * @slot nav-next - Custom next button
 * @slot indicator - Custom indicator button
 * @slot loading - Custom loading state
 * @slot error - Custom error state
 *
 * @csspart container - The main carousel container
 * @csspart track - The slides track/container
 * @csspart slide - Individual slide elements
 * @csspart nav - Navigation buttons
 * @csspart indicators - Indicators container
 * @csspart indicator - Individual indicator buttons
 * @csspart thumbnails - Thumbnail navigation container
 * @csspart thumbnail - Individual thumbnail elements
 *
 * @cssprop --carousel-bg - Background color of carousel
 * @cssprop --carousel-height - Fixed height for carousel
 * @cssprop --nav-bg - Background color of navigation buttons
 * @cssprop --indicator-bg - Background color of indicators
 *
 * @fires skill-change - Dispatched when slide changes
 * @fires skill-slide-start - Dispatched when slide transition starts
 * @fires skill-slide-end - Dispatched when slide transition ends
 *
 * @example
 * ```html
 * <skill-carousel
 *   .slides=${[
 *     { key: '1', src: 'image1.jpg', alt: 'Slide 1' },
 *     { key: '2', src: 'image2.jpg', alt: 'Slide 2' }
 *   ]}
 *   autoplay
 *   interval="3000"
 * >
 * </skill-carousel>
 *
 * <skill-carousel
 *   effect="fade"
 *   navigation="always"
 *   indicators="line"
 *   thumbnails
 * >
 * </skill-carousel>
 * ```
 */
@customElement('skill-carousel')
export class SkillCarousel extends LitElement {
  static styles = [baseStyles, carouselStyles];

  /**
   * Array of slides to display
   */
  @property({ type: Array })
  slides: CarouselSlide[] = [];

  /**
   * Size of the carousel
   * @type {'sm' | 'md' | 'lg'}
   */
  @property({ type: String, reflect: true })
  size: CarouselSize = 'md';

  /**
   * Effect/animation type
   * @type {'slide' | 'fade' | 'slide-vertical' | 'slide-scale'}
   */
  @property({ type: String, reflect: true })
  effect: CarouselEffect = 'slide';

  /**
   * When to show navigation buttons
   * @type {'always' | 'hover' | 'hidden'}
   */
  @property({ type: String, reflect: true })
  navigation: CarouselNavigation = 'hover';

  /**
   * Type of indicators
   * @type {'dots' | 'line' | 'number' | 'hidden'}
   */
  @property({ type: String, reflect: true })
  indicators: CarouselIndicators = 'dots';

  /**
   * Number of slides to show per view
   */
  @property({ type: Number, reflect: true, attribute: 'slides-per-view' })
  slidesPerView = 1;

  /**
   * Space between slides (in pixels)
   */
  @property({ type: Number, reflect: true, attribute: 'space-between' })
  spaceBetween = 0;

  /**
   * Enable autoplay
   */
  @property({ type: Boolean, reflect: true })
  autoplay = false;

  /**
   * Autoplay interval in milliseconds
   */
  @property({ type: Number, reflect: true, attribute: 'autoplay-interval' })
  autoplayInterval = 3000;

  /**
   * Pause autoplay on hover
   */
  @property({ type: Boolean, reflect: true, attribute: 'pause-on-hover' })
  pauseOnHover = true;

  /**
   * Show thumbnail navigation
   */
  @property({ type: Boolean, reflect: true })
  thumbnails = false;

  /**
   * Enable infinite loop
   */
  @property({ type: Boolean, reflect: true })
  loop = true;

  /**
   * Enable draggable/swipe navigation
   */
  @property({ type: Boolean, reflect: true })
  draggable = true;

  /**
   * Enable keyboard navigation
   */
  @property({ type: Boolean, reflect: true })
  keyboard = true;

  /**
   * Current slide index (controlled)
   */
  @property({ type: Number, reflect: true, attribute: 'current-index' })
  currentIndex = 0;

  /**
   * Default slide index
   */
  @property({ type: Number, reflect: true, attribute: 'default-index' })
  defaultIndex = 0;

  /**
   * Show loading state
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Error state
   */
  @property({ type: Boolean, reflect: true })
  hasError = false;

  /**
   * Error message
   */
  @property({ type: String, reflect: true, attribute: 'error-message' })
  errorMessage?: string;

  /**
   * Enable lazy loading for images
   */
  @property({ type: Boolean, reflect: true, attribute: 'lazy-load' })
  lazyLoad = true;

  @state()
  private _isAutoplayPaused = false;

  @state()
  private _isDragging = false;

  @state()
  private _dragStartX = 0;

  @state()
  private _dragStartY = 0;

  @state()
  private _translateX = 0;

  @state()
  private _autoplayTimer?: number;

  @state()
  private _loadedImages = new Set<string>();

  // Touch/mouse handlers
  private _startHandler = (e: TouchEvent | MouseEvent) => this._handleStart(e);
  private _moveHandler = (e: TouchEvent | MouseEvent) => this._handleMove(e);
  private _endHandler = (e: TouchEvent | MouseEvent) => this._handleEnd(e);
  private _keydownHandler = (e: KeyboardEvent) => this._handleKeydown(e);

  connectedCallback() {
    super.connectedCallback();
    if (this.defaultIndex > 0) {
      this.currentIndex = this.defaultIndex;
    }

    if (this.autoplay) {
      this._startAutoplay();
    }

    if (this.keyboard) {
      document.addEventListener('keydown', this._keydownHandler);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopAutoplay();

    if (this.keyboard) {
      document.removeEventListener('keydown', this._keydownHandler);
    }

    // Remove event listeners
    this.removeEventListener('touchstart', this._startHandler);
    this.removeEventListener('touchmove', this._moveHandler);
    this.removeEventListener('touchend', this._endHandler);
    this.removeEventListener('mousedown', this._startHandler);
    this.removeEventListener('mousemove', this._moveHandler);
    this.removeEventListener('mouseup', this._endHandler);
  }

  protected willUpdate(changedProperties: PropertyValueMap<this>) {
    if (changedProperties.has('autoplay')) {
      if (this.autoplay) {
        this._startAutoplay();
      } else {
        this._stopAutoplay();
      }
    }

    if (changedProperties.has('currentIndex')) {
      this._updateTranslateX();
    }
  }

  private _startAutoplay() {
    if (this._autoplayTimer) return;

    this._autoplayTimer = window.setInterval(() => {
      if (!this._isAutoplayPaused && !this._isDragging) {
        this._next();
      }
    }, this.autoplayInterval);
  }

  private _stopAutoplay() {
    if (this._autoplayTimer) {
      clearInterval(this._autoplayTimer);
      this._autoplayTimer = undefined;
    }
  }

  private _updateTranslateX() {
    if (this.effect === 'fade') return;

    const slideWidth = 100 / this.slidesPerView;
    this._translateX = -this.currentIndex * slideWidth;
  }

  private _next() {
    if (this.slides.length === 0) return;

    const nextIndex = this.currentIndex + 1;
    if (nextIndex >= this.slides.length) {
      if (this.loop) {
        this.currentIndex = 0;
      } else {
        this.currentIndex = this.slides.length - 1;
      }
    } else {
      this.currentIndex = nextIndex;
    }

    this._dispatchChangeEvent();
  }

  private _prev() {
    if (this.slides.length === 0) return;

    const prevIndex = this.currentIndex - 1;
    if (prevIndex < 0) {
      if (this.loop) {
        this.currentIndex = this.slides.length - 1;
      } else {
        this.currentIndex = 0;
      }
    } else {
      this.currentIndex = prevIndex;
    }

    this._dispatchChangeEvent();
  }

  private _goTo(index: number) {
    if (index < 0 || index >= this.slides.length) return;

    this.currentIndex = index;
    this._dispatchChangeEvent();
  }

  private _handleMouseEnter() {
    if (this.pauseOnHover && this.autoplay) {
      this._isAutoplayPaused = true;
    }
  }

  private _handleMouseLeave() {
    if (this.pauseOnHover && this.autoplay) {
      this._isAutoplayPaused = false;
    }
  }

  private _handleStart(e: TouchEvent | MouseEvent) {
    if (!this.draggable) return;

    this._isDragging = true;
    this._dragStartX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    this._dragStartY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    this.addEventListener('touchmove', this._moveHandler, { passive: true });
    this.addEventListener('touchend', this._endHandler);
    this.addEventListener('mousemove', this._moveHandler);
    this.addEventListener('mouseup', this._endHandler);
  }

  private _handleMove(e: TouchEvent | MouseEvent) {
    if (!this._isDragging) return;

    e.preventDefault();
    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const deltaX = currentX - this._dragStartX;
    const deltaY = Math.abs(currentY - this._dragStartY);

    // Only handle horizontal drags
    if (Math.abs(deltaX) > deltaY) {
      // Update track position for visual feedback
      const track = this.shadowRoot?.querySelector('.skill-carousel__track') as HTMLElement;
      if (track && this.effect !== 'fade') {
        const baseTranslate = -this.currentIndex * (100 / this.slidesPerView);
        const dragOffset = (deltaX / this.offsetWidth) * 100;
        track.style.transform = `translateX(${baseTranslate + dragOffset}%)`;
      }
    }
  }

  private _handleEnd(e: TouchEvent | MouseEvent) {
    if (!this._isDragging) return;

    this._isDragging = false;

    const currentX = 'touches' in e ? e.changedTouches[0].clientX : e.clientX;
    const deltaX = currentX - this._dragStartX;

    // Reset track position
    const track = this.shadowRoot?.querySelector('.skill-carousel__track') as HTMLElement;
    if (track) {
      track.style.transform = '';
    }

    // Determine if we should change slides
    const threshold = this.offsetWidth / 4;
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        this._prev();
      } else {
        this._next();
      }
    }

    // Remove event listeners
    this.removeEventListener('touchmove', this._moveHandler);
    this.removeEventListener('touchend', this._endHandler);
    this.removeEventListener('mousemove', this._moveHandler);
    this.removeEventListener('mouseup', this._endHandler);
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (!this.keyboard) return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this._prev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this._next();
        break;
      case 'Home':
        e.preventDefault();
        this._goTo(0);
        break;
      case 'End':
        e.preventDefault();
        this._goTo(this.slides.length - 1);
        break;
    }
  }

  private _dispatchChangeEvent() {
    const currentSlide = this.slides[this.currentIndex];

    this.dispatchEvent(new CustomEvent('skill-change', {
      bubbles: true,
      composed: true,
      detail: {
        currentIndex: this.currentIndex,
        slide: currentSlide,
        totalSlides: this.slides.length
      } as CarouselEventDetail
    }));
  }

  private _handleImageLoad(slideKey: string) {
    this._loadedImages.add(slideKey);
  }

  private _handleImageError(slideKey: string) {
    console.warn(`Failed to load image for slide: ${slideKey}`);
  }

  private _renderSlide(_slide: CarouselSlide, index: number) {
    const isActive = index === this.currentIndex;
    const isVisible = Math.abs(index - this.currentIndex) < this.slidesPerView;
    const shouldLoad = !this.lazyLoad || isVisible || this._loadedImages.has(_slide.key);

    const slideContent = html`
      ${shouldLoad && _slide.src ? html`
        <img
          src="${_slide.src}"
          alt="${_slide.alt || ''}"
          loading="${this.lazyLoad ? 'lazy' : 'eager'}"
          @load=${() => this._handleImageLoad(_slide.key)}
          @error=${() => this._handleImageError(_slide.key)}
        />
      ` : ''}

      ${!_slide.src ? html`
        <div class="skill-carousel__placeholder">
          <slot name="slide-placeholder">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </slot>
        </div>
      ` : ''}

      ${_slide.title || _slide.description ? html`
        <div class="skill-carousel__slide-content">
          ${_slide.title ? html`<h3>${_slide.title}</h3>` : ''}
          ${_slide.description ? html`<p>${_slide.description}</p>` : ''}
        </div>
      ` : ''}
    `;

    const slideElement = html`
      <div
        part="slide"
        class="skill-carousel__slide ${isActive ? 'skill-carousel__slide--active' : ''}"
        role="group"
        aria-roledescription="slide"
        aria-label="${_slide.alt || `Slide ${index + 1}`}"
      >
        ${_slide.href ? html`
          <a href="${_slide.href}" target="${_slide.target || '_self'}">
            ${slideContent}
          </a>
        ` : slideContent}
      </div>
    `;

    return slideElement;
  }

  private _renderNavigation() {
    if (this.navigation === 'hidden') return html``;

    const isPrevDisabled = !this.loop && this.currentIndex === 0;
    const isNextDisabled = !this.loop && this.currentIndex === this.slides.length - 1;

    return html`
      <button
        part="nav"
        class="skill-carousel__nav skill-carousel__nav--prev"
        type="button"
        ?disabled=${isPrevDisabled}
        aria-label="Previous slide"
        @click=${this._prev}
      >
        <slot name="nav-prev">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </slot>
      </button>

      <button
        part="nav"
        class="skill-carousel__nav skill-carousel__nav--next"
        type="button"
        ?disabled=${isNextDisabled}
        aria-label="Next slide"
        @click=${this._next}
      >
        <slot name="nav-next">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </slot>
      </button>
    `;
  }

  private _renderIndicators() {
    if (this.indicators === 'hidden' || this.slides.length <= 1) return html``;

    return html`
      <div part="indicators" class="skill-carousel__indicators">
        ${this.slides.map((_slide, index) => {
          const isActive = index === this.currentIndex;
          const indicatorClass = `skill-carousel__indicator ${isActive ? 'skill-carousel__indicator--active' : ''}`;

          return html`
            <button
              part="indicator"
              class="${indicatorClass}"
              type="button"
              aria-label="Go to slide ${index + 1}"
              aria-current=${isActive}
              @click=${() => this._goTo(index)}
            >
              ${this.indicators === 'number' ? html`${index + 1}` : ''}
            </button>
          `;
        })}
      </div>
    `;
  }

  private _renderThumbnails() {
    if (!this.thumbnails || this.slides.length <= 1) return html``;

    return html`
      <div part="thumbnails" class="skill-carousel__thumbnails">
        ${this.slides.map((_slide, index) => {
          const isActive = index === this.currentIndex;
          const thumbnailClass = `skill-carousel__thumbnail ${isActive ? 'skill-carousel__thumbnail--active' : ''}`;

          return html`
            <button
              part="thumbnail"
              class="${thumbnailClass}"
              type="button"
              aria-label="Go to slide ${index + 1}"
              @click=${() => this._goTo(index)}
            >
              ${_slide.src ? html`
                <img src="${_slide.src}" alt="${_slide.alt || `Thumbnail ${index + 1}`}" loading="lazy" />
              ` : html`
                <div class="skill-carousel__placeholder">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  </svg>
                </div>
              `}
            </button>
          `;
        })}
      </div>
    `;
  }

  render() {
    if (this.hasError) {
      return html`
        <div class="skill-carousel skill-carousel--${this.size}">
          <div class="skill-carousel__error">
            <slot name="error">
              <div class="skill-carousel__error-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div>${this.errorMessage || 'Failed to load carousel'}</div>
            </slot>
          </div>
        </div>
      `;
    }

    const containerClasses = [
      'skill-carousel',
      `skill-carousel--${this.size}`,
      `skill-carousel--${this.effect}`,
      `skill-carousel--nav-${this.navigation}`,
      `skill-carousel--indicators-${this.indicators}`,
      this.autoplay ? 'skill-carousel--autoplay' : '',
      this._isDragging ? 'skill-carousel--dragging' : '',
      this.slidesPerView > 1 ? 'skill-carousel--multiple' : ''
    ].filter(Boolean).join(' ');

    const trackStyles = this.effect !== 'fade' ? {
      '--slides-per-view': this.slidesPerView.toString(),
      transform: `translateX(${this._translateX}%)`
    } : {};

    return html`
      <div
        class="${containerClasses}"
        style="--slides-per-view: ${this.slidesPerView};"
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
        @touchstart=${this._startHandler}
        @mousedown=${this._startHandler}
        tabindex="${this.keyboard ? '0' : '-1'}"
        role="region"
        aria-roledescription="carousel"
        aria-label="Image carousel"
      >
        ${this.loading ? html`
          <div class="skill-carousel__loading">
            <slot name="loading">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2 L12 6" />
                <path d="M12 18 L12 22" />
                <path d="M22 12 L18 12" />
                <path d="M6 12 L2 12" />
              </svg>
            </slot>
          </div>
        ` : ''}

        <div part="container" class="skill-carousel__container">
          <div
            part="track"
            class="skill-carousel__track ${this._isDragging ? 'skill-carousel__track--dragging' : ''}"
            style=${trackStyles.transform ? `transform: ${trackStyles.transform}` : ''}
          >
            ${this.slides.map((slide, index) => this._renderSlide(slide, index))}
          </div>
        </div>

        ${this._renderNavigation()}
        ${this._renderIndicators()}
      </div>

      ${this._renderThumbnails()}
    `;
  }

  /**
   * Public API methods
   */

  /**
   * Go to next slide
   */
  public next() {
    this._next();
  }

  /**
   * Go to previous slide
   */
  public prev() {
    this._prev();
  }

  /**
   * Go to specific slide
   */
  public goTo(index: number) {
    this._goTo(index);
  }

  /**
   * Start autoplay
   */
  public startAutoplay() {
    this.autoplay = true;
    this._startAutoplay();
  }

  /**
   * Stop autoplay
   */
  public stopAutoplay() {
    this._stopAutoplay();
  }

  /**
   * Pause autoplay
   */
  public pauseAutoplay() {
    this._isAutoplayPaused = true;
  }

  /**
   * Resume autoplay
   */
  public resumeAutoplay() {
    this._isAutoplayPaused = false;
  }

  /**
   * Get current slide index
   */
  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  /**
   * Get total number of slides
   */
  public getTotalSlides(): number {
    return this.slides.length;
  }

  /**
   * Get current slide
   */
  public getCurrentSlide(): CarouselSlide | undefined {
    return this.slides[this.currentIndex];
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-carousel': SkillCarousel;
  }
}