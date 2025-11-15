import { css } from 'lit';
import { baseStyles } from '../../../styles/base';

export const carouselStyles = [
  baseStyles,
  css`
    :host {
      display: block;
      width: 100%;
      position: relative;
    }

    .skill-carousel {
      position: relative;
      width: 100%;
      overflow: hidden;
      border-radius: var(--radius-lg, 8px);
      background: var(--skill-gray-100, #F1F3F5);
    }

    /* Container */
    .skill-carousel__container {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    /* Track */
    .skill-carousel__track {
      display: flex;
      height: 100%;
      transition: transform var(--duration-normal, 300ms) var(--ease-out, cubic-bezier(0, 0, 0.2, 1));
      will-change: transform;
    }

    .skill-carousel__track--dragging {
      transition: none;
    }

    /* Slide */
    .skill-carousel__slide {
      flex: 0 0 100%;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    .skill-carousel__slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Multiple slides per view */
    .skill-carousel--multiple .skill-carousel__slide {
      flex: 0 0 calc(100% / var(--slides-per-view, 1));
    }

    /* Navigation buttons */
    .skill-carousel__nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: var(--z-index-overlay, 1300);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      border: none;
      border-radius: 50%;
      color: var(--skill-gray-0, #FFFFFF);
      cursor: pointer;
      transition: all var(--duration-fast, 200ms) var(--ease-out, cubic-bezier(0, 0, 0.2, 1));
      opacity: 0;
      visibility: hidden;
    }

    .skill-carousel:hover .skill-carousel__nav {
      opacity: 1;
      visibility: visible;
    }

    .skill-carousel__nav:hover {
      background: rgba(0, 0, 0, 0.7);
      transform: translateY(-50%) scale(1.1);
    }

    .skill-carousel__nav:active {
      transform: translateY(-50%) scale(0.95);
    }

    .skill-carousel__nav:disabled {
      background: rgba(0, 0, 0, 0.2);
      color: var(--skill-gray-400, #BDBDBD);
      cursor: not-allowed;
      opacity: 0.5;
    }

    .skill-carousel__nav--prev {
      left: var(--spacing-md, 16px);
    }

    .skill-carousel__nav--next {
      right: var(--spacing-md, 16px);
    }

    /* Always show navigation */
    .skill-carousel--nav-always .skill-carousel__nav {
      opacity: 1;
      visibility: visible;
    }

    /* Hide navigation */
    .skill-carousel--nav-hidden .skill-carousel__nav {
      display: none;
    }

    /* Indicators */
    .skill-carousel__indicators {
      position: absolute;
      bottom: var(--spacing-md, 16px);
      left: 50%;
      transform: translateX(-50%);
      z-index: var(--z-index-overlay, 1300);
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 8px);
      padding: var(--spacing-sm, 12px) var(--spacing-md, 16px);
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      border-radius: var(--radius-full, 9999px);
      opacity: 0;
      visibility: hidden;
      transition: all var(--duration-fast, 200ms) var(--ease-out, cubic-bezier(0, 0, 0.2, 1));
    }

    .skill-carousel:hover .skill-carousel__indicators {
      opacity: 1;
      visibility: visible;
    }

    /* Always show indicators */
    .skill-carousel--indicators-always .skill-carousel__indicators {
      opacity: 1;
      visibility: visible;
    }

    /* Hide indicators */
    .skill-carousel--indicators-hidden .skill-carousel__indicators {
      display: none;
    }

    .skill-carousel__indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      border: none;
      cursor: pointer;
      transition: all var(--duration-fast, 200ms) var(--ease-out, cubic-bezier(0, 0, 0.2, 1));
      padding: 0;
    }

    .skill-carousel__indicator:hover {
      background: rgba(255, 255, 255, 0.8);
      transform: scale(1.2);
    }

    .skill-carousel__indicator--active {
      background: var(--skill-gray-0, #FFFFFF);
      transform: scale(1.2);
    }

    /* Line indicators */
    .skill-carousel--indicators-line .skill-carousel__indicators {
      background: transparent;
      bottom: var(--spacing-sm, 12px);
      gap: var(--spacing-2xs, 4px);
    }

    .skill-carousel--indicators-line .skill-carousel__indicator {
      width: 24px;
      height: 3px;
      border-radius: var(--radius-full, 9999px);
      background: rgba(255, 255, 255, 0.3);
    }

    .skill-carousel--indicators-line .skill-carousel__indicator:hover {
      background: rgba(255, 255, 255, 0.6);
    }

    .skill-carousel--indicators-line .skill-carousel__indicator--active {
      background: var(--skill-gray-0, #FFFFFF);
      width: 32px;
    }

    /* Number indicators */
    .skill-carousel--indicators-number .skill-carousel__indicator {
      width: 24px;
      height: 24px;
      border-radius: var(--radius-base, 4px);
      background: rgba(255, 255, 255, 0.2);
      color: var(--skill-gray-0, #FFFFFF);
      font-size: var(--font-size-caption, 10px);
      font-weight: var(--font-weight-medium, 500);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .skill-carousel--indicators-number .skill-carousel__indicator:hover {
      background: rgba(255, 255, 255, 0.4);
    }

    .skill-carousel--indicators-number .skill-carousel__indicator--active {
      background: var(--skill-primary-500, #0A59F7);
    }

    /* Size variants */
    .skill-carousel--sm {
      border-radius: var(--radius-base, 4px);
    }

    .skill-carousel--sm .skill-carousel__nav {
      width: 32px;
      height: 32px;
    }

    .skill-carousel--sm .skill-carousel__indicator {
      width: 6px;
      height: 6px;
    }

    .skill-carousel--lg {
      border-radius: var(--radius-xl, 12px);
    }

    .skill-carousel--lg .skill-carousel__nav {
      width: 48px;
      height: 48px;
    }

    .skill-carousel--lg .skill-carousel__indicator {
      width: 10px;
      height: 10px;
    }

    /* Effect variants */
    .skill-carousel--fade .skill-carousel__track {
      display: block;
      transition: none;
    }

    .skill-carousel--fade .skill-carousel__slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      visibility: hidden;
      transition: all var(--duration-normal, 300ms) var(--ease-out, cubic-bezier(0, 0, 0.2, 1));
    }

    .skill-carousel--fade .skill-carousel__slide--active {
      opacity: 1;
      visibility: visible;
    }

    /* Slide animation variants */
    .skill-carousel--slide-vertical .skill-carousel__track {
      flex-direction: column;
    }

    .skill-carousel--slide-scale .skill-carousel__slide {
      transition: all var(--duration-normal, 300ms) var(--ease-out, cubic-bezier(0, 0, 0.2, 1));
    }

    .skill-carousel--slide-scale .skill-carousel__slide:not(.skill-carousel__slide--active) {
      transform: scale(0.9);
      opacity: 0.7;
    }

    /* Autoplay */
    .skill-carousel--autoplay .skill-carousel__indicators {
      opacity: 1;
      visibility: visible;
    }

    /* Loading state */
    .skill-carousel__loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      color: var(--skill-primary-500, #0A59F7);
      z-index: var(--z-index-overlay, 1300);
    }

    /* Error state */
    .skill-carousel__error {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: var(--skill-gray-500, #8A8A8A);
      z-index: var(--z-index-overlay, 1300);
    }

    .skill-carousel__error-icon {
      width: 48px;
      height: 48px;
      margin: 0 auto var(--spacing-sm, 12px);
      color: var(--skill-error-500, #FA2A2D);
    }

    /* Thumbnail navigation */
    .skill-carousel__thumbnails {
      display: flex;
      gap: var(--spacing-xs, 8px);
      margin-top: var(--spacing-md, 16px);
      overflow-x: auto;
      padding: var(--spacing-xs, 8px) 0;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .skill-carousel__thumbnails::-webkit-scrollbar {
      display: none;
    }

    .skill-carousel__thumbnail {
      flex: 0 0 60px;
      height: 40px;
      border: 2px solid transparent;
      border-radius: var(--radius-base, 4px);
      overflow: hidden;
      cursor: pointer;
      transition: all var(--duration-fast, 200ms) var(--ease-out, cubic-bezier(0, 0, 0.2, 1));
      opacity: 0.7;
    }

    .skill-carousel__thumbnail:hover {
      opacity: 1;
      border-color: var(--skill-gray-300, #D1D5DB);
    }

    .skill-carousel__thumbnail--active {
      opacity: 1;
      border-color: var(--skill-primary-500, #0A59F7);
    }

    .skill-carousel__thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Lazy loading placeholder */
    .skill-carousel__placeholder {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--skill-gray-200, #E5E8EB);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--skill-gray-400, #BDBDBD);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .skill-carousel__nav {
        width: 32px;
        height: 32px;
        opacity: 1;
        visibility: visible;
      }

      .skill-carousel__nav--prev {
        left: var(--spacing-sm, 12px);
      }

      .skill-carousel__nav--next {
        right: var(--spacing-sm, 12px);
      }

      .skill-carousel__indicators {
        bottom: var(--spacing-sm, 12px);
        opacity: 1;
        visibility: visible;
      }

      .skill-carousel__thumbnail {
        flex: 0 0 50px;
        height: 30px;
      }
    }

    /* Accessibility */
    .skill-carousel:focus-within {
      outline: 2px solid var(--skill-primary-500, #0A59F7);
      outline-offset: 2px;
    }

    .skill-carousel__nav:focus-visible {
      outline: 2px solid var(--skill-primary-500, #0A59F7);
      outline-offset: 2px;
    }

    .skill-carousel__indicator:focus-visible {
      outline: 2px solid var(--skill-primary-500, #0A59F7);
      outline-offset: 2px;
    }

    /* CSS part exports */
    ::part(container) {
      /* Allows styling of the carousel container */
    }

    ::part(track) {
      /* Allows styling of the track */
    }

    ::part(slide) {
      /* Allows styling of individual slides */
    }

    ::part(nav) {
      /* Allows styling of navigation buttons */
    }

    ::part(indicators) {
      /* Allows styling of the indicators container */
    }

    ::part(indicator) {
      /* Allows styling of individual indicators */
    }

    ::part(thumbnails) {
      /* Allows styling of the thumbnail navigation */
    }

    ::part(thumbnail) {
      /* Allows styling of individual thumbnails */
    }
  `,
];