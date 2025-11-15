/**
 * Common types used across components
 */

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'compact' | 'spacious';
export type Variant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'text'
  | 'success'
  | 'danger'
  | 'outline'
  | 'outlined'
  | 'filled'
  | 'soft'
  | 'gradient'
  | 'link';
export type Shape = 'square' | 'rounded' | 'pill' | 'circle';
export type Status = 'success' | 'error' | 'warning' | 'info';
export type Position = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'center' | 'end';

/**
 * Checkbox specific types
 */
export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CheckboxColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type CheckboxVariant = 'default' | 'filled' | 'outlined';

export interface CheckboxEventDetail {
  checked: boolean;
  value: string;
  indeterminate: boolean;
}

export interface CheckboxProperties {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  name?: string;
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  color?: CheckboxColor;
  label?: string;
  helperText?: string;
  error?: string;
  hasError?: boolean;
}

/**
 * Radio specific types
 */
export type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type RadioColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type RadioVariant = 'default' | 'filled' | 'outlined';

export interface RadioEventDetail {
  checked: boolean;
  value: string;
  name: string;
}

export interface RadioProperties {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  name?: string;
  size?: RadioSize;
  variant?: RadioVariant;
  color?: RadioColor;
  label?: string;
  helperText?: string;
  error?: string;
  hasError?: boolean;
}

/**
 * Tooltip specific types
 */
export type TooltipSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TooltipVariant = 'default' | 'dark' | 'light' | 'success' | 'warning' | 'error' | 'info';
export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';
export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipEventDetail {
  trigger: 'manual' | 'hover' | 'click' | 'focus';
}

export interface TooltipProperties {
  content?: string;
  position?: TooltipPosition;
  trigger?: TooltipTrigger;
  visible?: boolean;
  showDelay?: number;
  hideDelay?: number;
  maxWidth?: string;
  arrow?: boolean;
  disabled?: boolean;
  size?: TooltipSize;
  variant?: TooltipVariant;
}

/**
 * Grid specific types
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';
export type GridJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export interface GridGutter {
  x?: number | string;
  y?: number | string;
  xs?: number | string;
  sm?: number | string;
  md?: number | string;
  lg?: number | string;
  xl?: number | string;
  xxl?: number | string;
}

export interface GridColSpan {
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
  xxl?: number | 'auto';
}

export interface GridOffset {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

export interface GridProperties {
  gutter?: number | string | GridGutter;
  align?: GridAlign;
  justify?: GridJustify;
  direction?: GridDirection;
  wrap?: GridWrap;
}

export interface GridColProperties {
  span?: number | GridColSpan;
  offset?: number | GridOffset;
  order?: number;
  pull?: number | GridOffset;
  push?: number | GridOffset;
}

/**
 * Layout specific types
 */
export type LayoutTheme = 'light' | 'dark' | 'auto';
export type LayoutSiderPosition = 'left' | 'right';
export type LayoutHeaderPosition = 'top' | 'fixed' | 'sticky';
export type LayoutFooterPosition = 'bottom' | 'fixed';

export interface LayoutProperties {
  theme?: LayoutTheme;
  hasSider?: boolean;
  className?: string;
}

export interface LayoutHeaderProperties {
  fixed?: boolean;
  sticky?: boolean;
  className?: string;
  height?: number | string;
  zIndex?: number;
}

export interface LayoutSiderProperties {
  collapsible?: boolean;
  collapsed?: boolean;
  collapsedWidth?: number | string;
  breakpoint?: Breakpoint;
  position?: LayoutSiderPosition;
  width?: number | string;
  theme?: LayoutTheme;
  onCollapse?: (collapsed: boolean) => void;
  onBreakpoint?: (broken: boolean) => void;
  zeroWidthTriggerStyle?: any;
}

export interface LayoutContentProperties {
  className?: string;
  style?: any;
}

export interface LayoutFooterProperties {
  fixed?: boolean;
  className?: string;
  height?: number | string;
}

/**
 * Accordion specific types
 */
export type AccordionIconPosition = 'left' | 'right';
export type AccordionExpandMode = 'single' | 'multiple';
export type AccordionSize = 'sm' | 'md' | 'lg';

export interface AccordionItemProperties {
  key?: string;
  title?: string;
  disabled?: boolean;
  showArrow?: boolean;
  forceRender?: boolean;
  isOpen?: boolean;
  className?: string;
}

export interface AccordionProperties {
  bordered?: boolean;
  ghost?: boolean;
  size?: AccordionSize;
  expandMode?: AccordionExpandMode;
  iconPosition?: AccordionIconPosition;
  defaultActiveKeys?: string[];
  activeKeys?: string[];
  showArrow?: boolean;
  destroyInactivePanel?: boolean;
  onCollapse?: (activeKeys: string[]) => void;
}

export interface AccordionEventDetail {
  key: string;
  active: boolean;
  activeKeys: string[];
}
