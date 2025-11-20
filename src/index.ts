/**
 * @skill/ui-components
 *
 * 基于 Web Components 的跨框架 UI 组件库
 * 从 React 项目的 presentation/ui 迁移而来
 *
 * 支持框架：React, Vue, Angular, Svelte, 原生 JavaScript
 *
 * @packageDocumentation
 */

// Export all components
export * from './components';

// Export types
export type * from './types';

// Export utilities
export { classMap, cn } from './utils/class-map';

// Export styles
export { baseStyles } from './styles/base';
export { designTokens } from './styles/tokens';

// Auto-register all components when imported
// 这样可以直接使用: import '@skill/ui-components';

// 只导入已存在的核心组件
import './components/atoms/button';
import './components/atoms/card';

// 未来添加更多组件时在这里导入
// import './components/atoms/toast';
// etc.

// Version
export const VERSION = '1.0.0';
