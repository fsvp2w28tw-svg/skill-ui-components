import { css } from 'lit';

/**
 * ImageGallery 组件样式
 */
export const imageGalleryStyles = css`
  :host {
    display: block;
    width: 100%;
    --gallery-gap: var(--skill-spacing-sm, 8px);
    --gallery-border-radius: var(--skill-radius-md, 6px);
    --gallery-overlay-bg: rgba(0, 0, 0, 0.5);
    --gallery-image-bg: var(--skill-neutral-100, #f3f4f6);
    --gallery-thumbnail-size: 60px;
    --gallery-thumbnail-border: 2px solid var(--skill-primary-500, #3b82f6);
  }

  .skill-image-gallery {
    font-family: var(--skill-font-family, inherit);
    position: relative;
    overflow: hidden;
    border-radius: var(--gallery-border-radius);
  }

  /* 主视图容器 */
  .skill-image-gallery__main {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    background-color: var(--gallery-image-bg);
    border-radius: var(--gallery-border-radius);
    overflow: hidden;
  }

  .skill-image-gallery__main--contain {
    aspect-ratio: auto;
    min-height: 200px;
  }

  .skill-image-gallery__main--cover {
    aspect-ratio: auto;
    height: 400px;
  }

  .skill-image-gallery__main--square {
    aspect-ratio: 1/1;
  }

  /* 主图片 */
  .skill-image-gallery__main-image {
    width: 100%;
    height: 100%;
    object-fit: var(--image-fit, contain);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .skill-image-gallery__main-image--loading {
    opacity: 0;
  }

  .skill-image-gallery__main-image--error {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  /* 图片叠加层 */
  .skill-image-gallery__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--gallery-overlay-bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .skill-image-gallery__main:hover .skill-image-gallery__overlay {
    opacity: 1;
  }

  .skill-image-gallery__overlay-title {
    font-size: var(--skill-font-body-1, 16px);
    font-weight: 600;
    margin: 0 0 var(--skill-spacing-xs, 4px) 0;
    text-align: center;
  }

  .skill-image-gallery__overlay-description {
    font-size: var(--skill-font-body-2, 14px);
    text-align: center;
    opacity: 0.9;
    margin: 0;
  }

  /* 导航按钮 */
  .skill-image-gallery__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: 0;
    z-index: 10;
  }

  .skill-image-gallery__main:hover .skill-image-gallery__nav {
    opacity: 1;
  }

  .skill-image-gallery__nav:hover {
    background-color: rgba(0, 0, 0, 0.7);
    transform: translateY(-50%) scale(1.1);
  }

  .skill-image-gallery__nav--disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .skill-image-gallery__nav--disabled:hover {
    transform: translateY(-50%);
  }

  .skill-image-gallery__nav-prev {
    left: var(--skill-spacing-sm, 8px);
  }

  .skill-image-gallery__nav-next {
    right: var(--skill-spacing-sm, 8px);
  }

  .skill-image-gallery__nav svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }

  /* 缩略图容器 */
  .skill-image-gallery__thumbnails {
    display: flex;
    gap: var(--gallery-gap);
    margin-top: var(--skill-spacing-md, 16px);
    overflow-x: auto;
    padding: var(--skill-spacing-xs, 4px) 0;
  }

  .skill-image-gallery__thumbnails--hidden {
    display: none;
  }

  .skill-image-gallery__thumbnails--vertical {
    flex-direction: column;
    margin-top: 0;
    margin-left: var(--skill-spacing-md, 16px);
    max-height: 400px;
    overflow-y: auto;
    padding: 0 var(--skill-spacing-xs, 4px);
  }

  /* 缩略图 */
  .skill-image-gallery__thumbnail {
    flex-shrink: 0;
    width: var(--gallery-thumbnail-size);
    height: var(--gallery-thumbnail-size);
    border-radius: var(--skill-radius-sm, 4px);
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.2s ease;
    position: relative;
    background-color: var(--gallery-image-bg);
  }

  .skill-image-gallery__thumbnail:hover {
    transform: scale(1.05);
    border-color: var(--skill-primary-300, #93c5fd);
  }

  .skill-image-gallery__thumbnail--active {
    border-color: var(--gallery-thumbnail-border);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  .skill-image-gallery__thumbnail--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .skill-image-gallery__thumbnail--disabled:hover {
    transform: none;
    border-color: transparent;
  }

  .skill-image-gallery__thumbnail-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;
  }

  .skill-image-gallery__thumbnail-image--loading {
    opacity: 0;
  }

  .skill-image-gallery__thumbnail-image--error {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  .skill-image-gallery__thumbnail-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    color: white;
    padding: 2px 4px;
    font-size: 10px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .skill-image-gallery__thumbnail:hover .skill-image-gallery__thumbnail-overlay {
    opacity: 1;
  }

  /* 网格布局 */
  .skill-image-gallery--grid {
    display: grid;
    gap: var(--gallery-gap);
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .skill-image-gallery--grid .skill-image-gallery__grid-item {
    position: relative;
    aspect-ratio: 1;
    border-radius: var(--gallery-border-radius);
    overflow: hidden;
    cursor: pointer;
    background-color: var(--gallery-image-bg);
    transition: transform 0.2s ease;
  }

  .skill-image-gallery--grid .skill-image-gallery__grid-item:hover {
    transform: scale(1.02);
  }

  .skill-image-gallery--grid .skill-image-gallery__grid-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .skill-image-gallery--grid .skill-image-gallery__grid-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--gallery-overlay-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .skill-image-gallery--grid .skill-image-gallery__grid-item:hover .skill-image-gallery__grid-overlay {
    opacity: 1;
  }

  /* Masonry 布局 */
  .skill-image-gallery--masonry {
    column-count: 3;
    column-gap: var(--gallery-gap);
  }

  .skill-image-gallery--masonry .skill-image-gallery__masonry-item {
    break-inside: avoid;
    margin-bottom: var(--gallery-gap);
    position: relative;
    border-radius: var(--gallery-border-radius);
    overflow: hidden;
    cursor: pointer;
    background-color: var(--gallery-image-bg);
  }

  .skill-image-gallery--masonry .skill-image-gallery__masonry-image {
    width: 100%;
    display: block;
    transition: transform 0.3s ease;
  }

  .skill-image-gallery--masonry .skill-image-gallery__masonry-item:hover .skill-image-gallery__masonry-image {
    transform: scale(1.02);
  }

  /* 工具栏 */
  .skill-image-gallery__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--skill-spacing-sm, 8px);
    background-color: var(--skill-neutral-50, #f9fafb);
    border-bottom: 1px solid var(--skill-neutral-200, #e5e7eb);
  }

  .skill-image-gallery__toolbar-left,
  .skill-image-gallery__toolbar-right {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
  }

  .skill-image-gallery__toolbar-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--skill-spacing-xs, 6px) var(--skill-spacing-sm, 8px);
    border: 1px solid var(--skill-neutral-300, #d1d5db);
    border-radius: var(--skill-radius-sm, 4px);
    background-color: var(--skill-white, #ffffff);
    color: var(--skill-text-primary, #1f2937);
    font-size: var(--skill-font-body-3, 12px);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .skill-image-gallery__toolbar-btn:hover {
    background-color: var(--skill-neutral-50, #f9fafb);
    border-color: var(--skill-neutral-400, #9ca3af);
  }

  .skill-image-gallery__toolbar-btn--active {
    background-color: var(--skill-primary-500, #3b82f6);
    border-color: var(--skill-primary-500, #3b82f6);
    color: var(--skill-white, #ffffff);
  }

  .skill-image-gallery__toolbar-btn svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }

  /* 计数器 */
  .skill-image-gallery__counter {
    font-size: var(--skill-font-body-3, 12px);
    color: var(--skill-text-secondary, #6b7280);
  }

  /* 加载状态 */
  .skill-image-gallery__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--skill-spacing-xl, 24px);
    color: var(--skill-text-secondary, #6b7280);
  }

  .skill-image-gallery__loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--skill-neutral-200, #e5e7eb);
    border-top-color: var(--skill-primary-500, #3b82f6);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: var(--skill-spacing-sm, 8px);
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* 错误状态 */
  .skill-image-gallery__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--skill-spacing-xl, 24px);
    color: var(--skill-text-secondary, #6b7280);
    text-align: center;
  }

  .skill-image-gallery__error-icon {
    width: 48px;
    height: 48px;
    color: var(--skill-error-500, #ef4444);
    margin-bottom: var(--skill-spacing-sm, 8px);
  }

  .skill-image-gallery__error-text {
    font-size: var(--skill-font-body-2, 14px);
    margin-bottom: var(--skill-spacing-xs, 4px);
  }

  .skill-image-gallery__error-description {
    font-size: var(--skill-font-body-3, 12px);
    color: var(--skill-text-placeholder, #9ca3af);
  }

  /* 空状态 */
  .skill-image-gallery__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--skill-spacing-xl, 24px);
    color: var(--skill-text-secondary, #6b7280);
    text-align: center;
  }

  .skill-image-gallery__empty-icon {
    width: 48px;
    height: 48px;
    color: var(--skill-neutral-400, #9ca3af);
    margin-bottom: var(--skill-spacing-sm, 8px);
  }

  .skill-image-gallery__empty-text {
    font-size: var(--skill-font-body-2, 14px);
    margin-bottom: var(--skill-spacing-xs, 4px);
  }

  .skill-image-gallery__empty-description {
    font-size: var(--skill-font-body-3, 12px);
    color: var(--skill-text-placeholder, #9ca3af);
  }

  /* 放大镜模式 */
  .skill-image-gallery__zoom {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: zoom-in;
    overflow: hidden;
  }

  .skill-image-gallery__zoom-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform-origin: top left;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .skill-image-gallery__zoom-container--visible {
    opacity: 1;
  }

  .skill-image-gallery__zoom-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* 轻量灯箱 */
  .skill-image-gallery__lightbox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .skill-image-gallery__lightbox--visible {
    opacity: 1;
    pointer-events: auto;
  }

  .skill-image-gallery__lightbox-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
  }

  .skill-image-gallery__lightbox-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .skill-image-gallery__lightbox-close {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .skill-image-gallery__lightbox-close:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .skill-image-gallery__lightbox-close svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }

  .skill-image-gallery__lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .skill-image-gallery__lightbox-nav:hover {
    background-color: rgba(0, 0, 0, 0.7);
    transform: translateY(-50%) scale(1.1);
  }

  .skill-image-gallery__lightbox-nav--disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .skill-image-gallery__lightbox-nav--disabled:hover {
    transform: translateY(-50%);
  }

  .skill-image-gallery__lightbox-nav--prev {
    left: 20px;
  }

  .skill-image-gallery__lightbox-nav--next {
    right: 20px;
  }

  /* 尺寸变体 */
  .skill-image-gallery--xs {
    --gallery-gap: var(--skill-spacing-xs, 4px);
    --gallery-thumbnail-size: 40px;
  }

  .skill-image-gallery--sm {
    --gallery-gap: var(--skill-spacing-xs, 4px);
    --gallery-thumbnail-size: 50px;
  }

  .skill-image-gallery--md {
    --gallery-gap: var(--skill-spacing-sm, 8px);
    --gallery-thumbnail-size: 60px;
  }

  .skill-image-gallery--lg {
    --gallery-gap: var(--skill-spacing-md, 16px);
    --gallery-thumbnail-size: 80px;
  }

  .skill-image-gallery--xl {
    --gallery-gap: var(--skill-spacing-lg, 20px);
    --gallery-thumbnail-size: 100px;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .skill-image-gallery__main {
      aspect-ratio: 4/3;
    }

    .skill-image-gallery__nav {
      width: 32px;
      height: 32px;
    }

    .skill-image-gallery__nav svg {
      width: 16px;
      height: 16px;
    }

    .skill-image-gallery__thumbnails {
      margin-top: var(--skill-spacing-sm, 8px);
    }

    .skill-image-gallery--grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }

    .skill-image-gallery--masonry {
      column-count: 2;
    }

    .skill-image-gallery__toolbar {
      flex-wrap: wrap;
      gap: var(--skill-spacing-xs, 4px);
    }

    .skill-image-gallery__toolbar-left,
    .skill-image-gallery__toolbar-right {
      flex: 1;
    }
  }

  @media (max-width: 480px) {
    .skill-image-gallery--grid {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }

    .skill-image-gallery--masonry {
      column-count: 1;
    }

    .skill-image-gallery__lightbox-nav {
      width: 40px;
      height: 40px;
    }
  }

  /* 深色模式支持 */
  @media (prefers-color-scheme: dark) {
    :host {
      --gallery-image-bg: var(--skill-neutral-800, #1f2937);
      --gallery-overlay-bg: rgba(0, 0, 0, 0.7);
    }

    .skill-image-gallery__toolbar {
      background-color: var(--skill-neutral-800, #1f2937);
      border-bottom-color: var(--skill-neutral-600, #4b5563);
    }

    .skill-image-gallery__toolbar-btn {
      background-color: var(--skill-neutral-700, #374151);
      border-color: var(--skill-neutral-600, #4b5563);
      color: var(--skill-text-primary-dark, #f9fafb);
    }

    .skill-image-gallery__toolbar-btn:hover {
      background-color: var(--skill-neutral-600, #4b5563);
      border-color: var(--skill-neutral-500, #6b7280);
    }

    .skill-image-gallery__counter {
      color: var(--skill-text-secondary-dark, #d1d5db);
    }
  }

  /* 高对比度模式 */
  @media (prefers-contrast: high) {
    .skill-image-gallery__thumbnail {
      border-width: 2px;
    }

    .skill-image-gallery__thumbnail--active {
      border-width: 3px;
    }

    .skill-image-gallery__nav,
    .skill-image-gallery__lightbox-nav,
    .skill-image-gallery__lightbox-close {
      border: 2px solid white;
    }

    .skill-image-gallery__toolbar-btn {
      border-width: 2px;
    }
  }

  /* 减少动画模式 */
  @media (prefers-reduced-motion: reduce) {
    .skill-image-gallery__main-image,
    .skill-image-gallery__overlay,
    .skill-image-gallery__nav,
    .skill-image-gallery__thumbnail,
    .skill-image-gallery__thumbnail-image,
    .skill-image-gallery__zoom-container,
    .skill-image-gallery__lightbox,
    .skill-image-gallery__toolbar-btn {
      transition: none;
    }

    .skill-image-gallery__loading-spinner {
      animation: none;
    }

    .skill-image-gallery__nav:hover,
    .skill-image-gallery__thumbnail:hover,
    .skill-image-gallery--grid .skill-image-gallery__grid-item:hover,
    .skill-image-gallery--masonry .skill-image-gallery__masonry-item:hover .skill-image-gallery__masonry-image,
    .skill-image-gallery__lightbox-nav:hover {
      transform: none;
    }
  }

  /* 打印样式 */
  @media print {
    .skill-image-gallery__nav,
    .skill-image-gallery__overlay,
    .skill-image-gallery__toolbar,
    .skill-image-gallery__lightbox {
      display: none !important;
    }

    .skill-image-gallery__thumbnails,
    .skill-image-gallery--grid,
    .skill-image-gallery--masonry {
      display: block !important;
    }

    .skill-image-gallery--grid {
      display: grid !important;
    }

    .skill-image-gallery--masonry {
      column-count: 1 !important;
    }
  }

  /* 插槽样式 */
  ::slotted([slot="toolbar-left"]) {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
  }

  ::slotted([slot="toolbar-right"]) {
    display: flex;
    align-items: center;
    gap: var(--skill-spacing-xs, 4px);
  }

  ::slotted([slot="empty"]) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--skill-spacing-xl, 24px);
    text-align: center;
  }

  ::slotted([slot="error"]) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--skill-spacing-xl, 24px);
    text-align: center;
  }
`;