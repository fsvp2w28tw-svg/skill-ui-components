/**
 * Skill Rate - 兼容性组件
 *
 * 为了向后兼容，这个组件重新导出 SkillRating 组件
 * 推荐使用 skill-rating 标签替代 skill-rate
 */

import { customElement } from 'lit/decorators.js';
import { SkillRating } from './skill-rating';

// 重新导出SkillRating类，但使用skill-rate标签名
@customElement('skill-rate')
export class SkillRate extends SkillRating {
  // 继承所有功能，不需要额外实现
}

// 导出类型
export type { SkillRating } from './skill-rating';

// TypeScript支持
declare global {
  interface HTMLElementTagNameMap {
    'skill-rate': SkillRate;
  }
}