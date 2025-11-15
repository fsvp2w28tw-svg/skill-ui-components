/**
 * Design Tokens - 设计令牌
 * 基于 Skill 设计规范的设计系统
 *
 * 注意：CSS 变量会穿透 Shadow DOM，组件会自动使用全局定义的变量
 * 这里的 TypeScript 对象主要用于：
 * 1. 提供类型提示和自动补全
 * 2. 在 JavaScript/TypeScript 代码中访问设计令牌值
 * 3. 文档和参考
 */

import { css } from 'lit';

/**
 * CSS 变量定义
 * 这个 css 模板主要用于确保组件能正确继承全局 CSS 变量
 */
export const designTokens = css`
  :host {
    /* CSS 变量会自动从全局 :root 继承 */
    /* 组件直接使用 var(--skill-primary-500) 等全局变量 */
  }
`;

/**
 * TypeScript 类型定义 - 设计令牌
 * 用于在 TypeScript 中提供类型提示和访问设计令牌值
 */
export const DesignTokens = {
  colors: {
    primary: {
      300: '#6B9FFF',
      400: '#3C7EFF',
      500: '#0A59F7',
      600: '#0047D3',
      700: '#0036A0',
    },
    secondary: {
      500: '#00D4AA',
    },
    tertiary: {
      500: '#FF6B35',
    },
    quaternary: {
      500: '#FFB400',
    },
    success: {
      50: '#E6FBF5',
      100: '#B3F5E0',
      500: '#00D4AA',
    },
    warning: {
      50: '#FFF8E6',
      100: '#FFEDB3',
      500: '#FFB400',
    },
    error: {
      50: '#FEE6E7',
      100: '#FCB3B4',
      500: '#FA2A2D',
      600: '#DC2626',
      700: '#B91C1C',
    },
    info: {
      50: '#E6F0FF',
      100: '#B3D4FF',
      500: '#0A59F7',
    },
    gray: {
      0: '#FFFFFF',
      50: '#FAFAFA',
      100: '#F1F3F5',
      200: '#E5E8EB',
      300: '#D1D5DB',
      400: '#BDBDBD',
      500: '#8A8A8A',
      600: '#6B7280',
      700: '#5A5A5A',
      800: '#2C2C2C',
      900: '#1A1A1A',
      950: '#111827',
      1000: '#000000',
    },
  },
  font: {
    family: {
      sans: "'Inter', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif",
      serif: "'Songti SC', Georgia, serif",
      mono: "'JetBrains Mono', 'SF Mono', Consolas, monospace",
    },
    size: {
      caption: '10px',
      'body-3': '12px',
      'body-2': '14px',
      'body-1': '16px',
      subtitle: '18px',
      'title-3': '20px',
      'title-2': '24px',
      'title-1': '28px',
      headline: '32px',
      'display-1': '36px',
      'display-2': '48px',
      'display-3': '64px',
    },
    weight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      loose: 1.75,
    },
    letterSpacing: {
      tight: '-0.5px',
      normal: '0',
      loose: '0.5px',
    },
  },
  spacing: {
    '2xs': '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px',
    '5xl': '96px',
  },
  layout: {
    gutter: '16px',
    margin: '24px',
    padding: '16px',
    section: '64px',
  },
  radius: {
    none: '0',
    xs: '2px',
    sm: '4px',
    base: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',
  },
  shadow: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    1: '0 2px 4px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
    2: '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    3: '0 8px 16px rgba(0, 0, 0, 0.16), 0 4px 8px rgba(0, 0, 0, 0.12)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    4: '0 16px 32px rgba(0, 0, 0, 0.20), 0 8px 16px rgba(0, 0, 0, 0.16)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    5: '0 32px 64px rgba(0, 0, 0, 0.24), 0 16px 32px rgba(0, 0, 0, 0.20)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inset: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
    glow: {
      primary: '0 0 20px rgba(10, 89, 247, 0.3)',
      success: '0 0 20px rgba(0, 212, 170, 0.3)',
      warning: '0 0 20px rgba(255, 180, 0, 0.3)',
      error: '0 0 20px rgba(250, 42, 45, 0.3)',
    },
  },
  duration: {
    instant: '100ms',
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
    slower: '800ms',
  },
  ease: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  zIndex: {
    hide: -1,
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    toast: 1700,
    tooltip: 1800,
  },
  component: {
    height: {
      xs: '24px',
      sm: '32px',
      md: '40px',
      lg: '48px',
      xl: '56px',
      '2xl': '64px',
    },
    width: {
      xs: '80px',
      sm: '120px',
      md: '160px',
      lg: '200px',
      xl: '240px',
      full: '100%',
    },
  },
  breakpoint: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px',
  },
  container: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px',
    '3xl': '1600px',
  },
} as const;

/**
 * 类型导出
 */
export type DesignTokensType = typeof DesignTokens;

/**
 * CSS 变量名称映射
 * 用于在 TypeScript 中方便地访问 CSS 变量名
 */
export const cssVars = {
  // 颜色
  primary: {
    300: '--skill-primary-300',
    400: '--skill-primary-400',
    500: '--skill-primary-500',
    600: '--skill-primary-600',
    700: '--skill-primary-700',
  },
  // 间距
  spacing: {
    '2xs': '--skill-spacing-2xs',
    xs: '--skill-spacing-xs',
    sm: '--skill-spacing-sm',
    md: '--skill-spacing-md',
    lg: '--skill-spacing-lg',
    xl: '--skill-spacing-xl',
    '2xl': '--skill-spacing-2xl',
    '3xl': '--skill-spacing-3xl',
    '4xl': '--skill-spacing-4xl',
    '5xl': '--skill-spacing-5xl',
  },
  // 更多变量名可以按需添加...
} as const;
