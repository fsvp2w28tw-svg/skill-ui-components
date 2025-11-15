import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { iconStyles } from './skill-icon.styles';
import { baseStyles } from '../../../styles/base';
import { iconLibrary, IconName } from './skill-icon-library';

/**
 * Skill Icon Component
 *
 * 基于 SVG 的图标组件，包含 50+ 常用图标
 *
 * @fires skill-icon-error - 当图标名称无效时触发
 *
 * @example
 * ```html
 * <skill-icon name="user" size="md"></skill-icon>
 * <skill-icon name="heart" size="lg" color="error"></skill-icon>
 * <skill-icon name="loader" spin></skill-icon>
 * ```
 */
@customElement('skill-icon')
export class SkillIcon extends LitElement {
  static styles = [baseStyles, iconStyles];

  /**
   * 图标名称
   */
  @property({ type: String })
  name: IconName = 'help-circle';

  /**
   * 图标尺寸
   */
  @property({ type: String })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' = 'md';

  /**
   * 图标颜色（可选）
   */
  @property({ type: String })
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';

  /**
   * 是否旋转动画
   */
  @property({ type: Boolean })
  spin = false;

  /**
   * 自定义颜色值（CSS 颜色值）
   */
  @property({ type: String, attribute: 'custom-color' })
  customColor?: string;

  /**
   * 自定义尺寸（数字，单位 px）
   */
  @property({ type: Number, attribute: 'custom-size' })
  customSize?: number;

  /**
   * 渲染图标
   */
  private _renderIcon() {
    const iconContent = iconLibrary[this.name];

    if (!iconContent) {
      console.warn(`[SkillIcon] Icon "${this.name}" not found in library`);
      this.dispatchEvent(
        new CustomEvent('skill-icon-error', {
          bubbles: true,
          composed: true,
          detail: { name: this.name },
        })
      );
      // 返回默认帮助图标
      return iconLibrary['help-circle'];
    }

    return iconContent;
  }

  /**
   * 获取 SVG 样式
   */
  private _getSvgStyle() {
    const styles: string[] = [];

    if (this.customColor) {
      styles.push(`color: ${this.customColor}`);
    }

    if (this.customSize) {
      styles.push(`width: ${this.customSize}px`);
      styles.push(`height: ${this.customSize}px`);
    }

    return styles.length > 0 ? styles.join('; ') : undefined;
  }

  render() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style=${this._getSvgStyle()}
        aria-hidden="true"
        role="img"
      >
        ${this._renderIcon()}
      </svg>
    `;
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-icon': SkillIcon;
  }
}
