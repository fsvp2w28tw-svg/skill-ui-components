/**
 * Chart Type Definitions and Interfaces
 */

/**
 * Base chart data point interface
 */
export interface ChartDataPoint {
  x: string | number | Date;
  y: number;
  label?: string;
  color?: string;
}

/**
 * Line chart data point with additional properties
 */
export interface LineChartDataPoint extends ChartDataPoint {
  x2?: number | Date; // For range lines
  y2?: number; // For range lines
  strokeWidth?: number;
  strokeDasharray?: string;
}

/**
 * Bar chart data point with additional properties
 */
export interface BarChartDataPoint extends ChartDataPoint {
  x1?: number; // For horizontal bars or range bars
  y1?: number; // For stacked bars or floating bars
  width?: number;
}

/**
 * Pie chart data point with additional properties
 */
export interface PieChartDataPoint {
  value: number;
  label: string;
  color?: string;
  innerRadius?: number; // For donut charts
  outerRadius?: number;
}

/**
 * Chart axis configuration
 */
export interface ChartAxis {
  type: 'linear' | 'log' | 'time' | 'band';
  position: 'left' | 'right' | 'top' | 'bottom';
  show?: boolean;
  title?: string;
  format?: (value: any) => string;
  ticks?: number;
  tickFormat?: (value: any) => string;
  grid?: boolean;
  gridStyle?: 'solid' | 'dashed' | 'dotted';
  min?: number | Date;
  max?: number | Date;
  padding?: number;
}

/**
 * Chart color scheme
 */
export interface ChartColorScheme {
  type: 'category' | 'sequential' | 'diverging';
  colors: string[];
  domain?: string[];
}

/**
 * Chart legend configuration
 */
export interface ChartLegend {
  show?: boolean;
  position: 'top' | 'right' | 'bottom' | 'left';
  format?: (value: any, label: string) => string;
  title?: string;
  maxWidth?: number;
}

/**
 * Chart tooltip configuration
 */
export interface ChartTooltip {
  show?: boolean;
  format?: (point: ChartDataPoint, series?: string) => string;
  background?: string;
  color?: string;
  padding?: number;
  borderRadius?: number;
  followCursor?: boolean;
}

/**
 * Chart animation configuration
 */
export interface ChartAnimation {
  duration?: number;
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'bounce' | 'elastic';
  delay?: number;
  stagger?: number;
}

/**
 * Chart interaction configuration
 */
export interface ChartInteraction {
  hover?: boolean;
  click?: boolean;
  zoom?: boolean;
  pan?: boolean;
  crosshair?: boolean;
  brush?: boolean;
}

/**
 * Base chart props interface
 */
export interface BaseChartProps {
  width?: number;
  height?: number;
  responsive?: boolean;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  title?: string;
  subtitle?: string;
  loading?: boolean;
  empty?: boolean;
  emptyText?: string;
  theme?: 'light' | 'dark' | 'auto';
  ariaLabel?: string;
  role?: string;
}

/**
 * Line chart specific props
 */
export interface LineChartProps extends BaseChartProps {
  data: LineChartDataPoint[];
  xKey: string;
  yKey: string;
  curve?: 'linear' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter' | 'basis' | 'cardinal' | 'catmullRom';
  strokeWidth?: number;
  strokeDasharray?: string;
  fill?: boolean;
  fillOpacity?: number;
  markers?: boolean;
  markerSize?: number;
  markerShape?: 'circle' | 'square' | 'triangle' | 'diamond' | 'star';
  area?: boolean;
  gradient?: boolean;
  smooth?: boolean;
  xAxis?: ChartAxis;
  yAxis?: ChartAxis;
  colorScheme?: ChartColorScheme;
  legend?: ChartLegend;
  tooltip?: ChartTooltip;
  animation?: ChartAnimation;
  interaction?: ChartInteraction;
}

/**
 * Bar chart specific props
 */
export interface BarChartProps extends BaseChartProps {
  data: BarChartDataPoint[];
  xKey: string;
  yKey: string;
  orientation?: 'vertical' | 'horizontal';
  barWidth?: number;
  barPadding?: number;
  groupPadding?: number;
  stacked?: boolean;
  normalized?: boolean;
  rounded?: boolean;
  radius?: number;
  gradient?: boolean;
  showValues?: boolean;
  valueFormat?: (value: number) => string;
  valuePosition?: 'top' | 'center' | 'bottom' | 'outside';
  xAxis?: ChartAxis;
  yAxis?: ChartAxis;
  colorScheme?: ChartColorScheme;
  legend?: ChartLegend;
  tooltip?: ChartTooltip;
  animation?: ChartAnimation;
  interaction?: ChartInteraction;
}

/**
 * Pie chart specific props
 */
export interface PieChartProps extends BaseChartProps {
  data: PieChartDataPoint[];
  valueKey: string;
  labelKey: string;
  innerRadius?: number; // For donut charts
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  padAngle?: number;
  cornerRadius?: number;
  showLabels?: boolean;
  labelFormat?: (value: number, label: string, percentage: number) => string;
  labelPosition?: 'inside' | 'outside' | 'center';
  showValues?: boolean;
  valueFormat?: (value: number) => string;
  sortValues?: boolean;
  sortBy?: 'value' | 'label' | 'angle';
  sortOrder?: 'asc' | 'desc';
  explodeOnHover?: boolean;
  colorScheme?: ChartColorScheme;
  legend?: ChartLegend;
  tooltip?: ChartTooltip;
  animation?: ChartAnimation;
  interaction?: ChartInteraction;
}

/**
 * Chart event types
 */
export interface ChartEvent {
  type: string;
  data: ChartDataPoint | ChartDataPoint[];
  coordinates: { x: number; y: number };
  series?: string;
  originalEvent: Event;
}

/**
 * Chart configuration for responsive behavior
 */
export interface ChartResponsiveConfig {
  breakpoints?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
  rules?: Array<{
    maxWidth?: number;
    minWidth?: number;
    config: Partial<BaseChartProps>;
  }>;
}

/**
 * Chart theme configuration
 */
export interface ChartTheme {
  colors: {
    primary: string[];
    secondary: string[];
    success: string[];
    warning: string[];
    error: string[];
    info: string[];
    gray: string[];
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    grid: string;
    axis: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontWeight: {
      normal: string;
      medium: string;
      bold: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}