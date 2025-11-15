import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { spinnerStyles } from './skill-spinner.styles';
import { baseStyles } from '../../../styles/base';
import type { Size } from '../../../types';

/**
 * Skill Spinner Component
 *
 * @csspart wrapper - The wrapper element
 * @csspart spinner - The spinner element
 * @csspart label - The label text
 *
 * @example
 * ```html
 * <skill-spinner></skill-spinner>
 * <skill-spinner variant="dots" color="primary"></skill-spinner>
 * <skill-spinner variant="pulse" size="lg"></skill-spinner>
 * <skill-spinner variant="bars" label="Loading..."></skill-spinner>
 * ```
 */
@customElement('skill-spinner')
export class SkillSpinner extends LitElement {
  static styles = [baseStyles, spinnerStyles];

  /**
   * Spinner variant
   */
  @property({ type: String })
  variant: 'spinner' | 'dots' | 'pulse' | 'bars' = 'spinner';

  /**
   * Size variant
   */
  @property({ type: String })
  size: Size = 'md';

  /**
   * Color variant
   */
  @property({ type: String })
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral' = 'primary';

  /**
   * Optional label text
   */
  @property({ type: String })
  label = '';

  render() {
    return html`
      <div
        part="wrapper"
        class="skill-spinner-wrapper"
        role="status"
        aria-label=${this.label || 'Loading...'}
      >
        ${this._renderSpinner()}
        ${this.label
          ? html`<span part="label" class="skill-spinner__label">${this.label}</span>`
          : nothing}
      </div>
    `;
  }

  private _renderSpinner() {
    switch (this.variant) {
      case 'dots':
        return this._renderDots();
      case 'pulse':
        return this._renderPulse();
      case 'bars':
        return this._renderBars();
      default:
        return this._renderSpinnerCircle();
    }
  }

  private _renderSpinnerCircle() {
    const classes = [
      'skill-spinner--spinner',
      `skill-spinner--${this.size}`,
      `skill-spinner--${this.color}`
    ].join(' ');

    return html`<div part="spinner" class="${classes}"></div>`;
  }

  private _renderDots() {
    const classes = [
      'skill-spinner--dots',
      `skill-spinner--${this.size}`,
      `skill-spinner--${this.color}`
    ].join(' ');

    return html`
      <div part="spinner" class="${classes}">
        <div class="skill-spinner__dot"></div>
        <div class="skill-spinner__dot"></div>
        <div class="skill-spinner__dot"></div>
      </div>
    `;
  }

  private _renderPulse() {
    const classes = [
      'skill-spinner--pulse',
      `skill-spinner--${this.size}`,
      `skill-spinner--${this.color}`
    ].join(' ');

    return html`<div part="spinner" class="${classes}"></div>`;
  }

  private _renderBars() {
    const classes = [
      'skill-spinner--bars',
      `skill-spinner--${this.size}`,
      `skill-spinner--${this.color}`
    ].join(' ');

    return html`
      <div part="spinner" class="${classes}">
        <div class="skill-spinner__bar"></div>
        <div class="skill-spinner__bar"></div>
        <div class="skill-spinner__bar"></div>
        <div class="skill-spinner__bar"></div>
      </div>
    `;
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-spinner': SkillSpinner;
  }
}
