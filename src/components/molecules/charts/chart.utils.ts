import { ChartTheme, ChartColorScheme } from './chart.types';

/**
 * Default color schemes for charts
 */
export const defaultColorSchemes: Record<string, ChartColorScheme> = {
  primary: {
    type: 'category',
    colors: [
      '#3B82F6', // blue-500
      '#8B5CF6', // violet-500
      '#06B6D4', // cyan-500
      '#10B981', // emerald-500
      '#F59E0B', // amber-500
      '#EF4444', // red-500
      '#EC4899', // pink-500
      '#6366F1', // indigo-500
      '#14B8A6', // teal-500
      '#F97316', // orange-500
    ],
  },
  secondary: {
    type: 'category',
    colors: [
      '#6B7280', // gray-500
      '#9CA3AF', // gray-400
      '#D1D5DB', // gray-300
      '#E5E7EB', // gray-200
      '#F3F4F6', // gray-100
      '#F9FAFB', // gray-50
    ],
  },
  success: {
    type: 'category',
    colors: [
      '#10B981', // emerald-500
      '#34D399', // emerald-400
      '#6EE7B7', // emerald-300
      '#A7F3D0', // emerald-200
      '#D1FAE5', // emerald-100
    ],
  },
  warning: {
    type: 'category',
    colors: [
      '#F59E0B', // amber-500
      '#FBBF24', // amber-400
      '#FCD34D', // amber-300
      '#FDE68A', // amber-200
      '#FEF3C7', // amber-100
    ],
  },
  error: {
    type: 'category',
    colors: [
      '#EF4444', // red-500
      '#F87171', // red-400
      '#FCA5A5', // red-300
      '#FECACA', // red-200
      '#FEE2E2', // red-100
    ],
  },
  info: {
    type: 'category',
    colors: [
      '#3B82F6', // blue-500
      '#60A5FA', // blue-400
      '#93C5FD', // blue-300
      '#BFDBFE', // blue-200
      '#DBEAFE', // blue-100
    ],
  },
  sequential: {
    type: 'sequential',
    colors: [
      '#F3F4F6', // gray-100
      '#E5E7EB', // gray-200
      '#D1D5DB', // gray-300
      '#9CA3AF', // gray-400
      '#6B7280', // gray-500
      '#4B5563', // gray-600
      '#374151', // gray-700
      '#1F2937', // gray-800
    ],
  },
  diverging: {
    type: 'diverging',
    colors: [
      '#3B82F6', // blue-500
      '#93C5FD', // blue-300
      '#DBEAFE', // blue-100
      '#F3F4F6', // gray-100
      '#FEE2E2', // red-100
      '#FCA5A5', // red-300
      '#EF4444', // red-500
    ],
  },
};

/**
 * Default chart theme
 */
export const defaultChartTheme: ChartTheme = {
  colors: {
    primary: defaultColorSchemes.primary.colors,
    secondary: defaultColorSchemes.secondary.colors,
    success: defaultColorSchemes.success.colors,
    warning: defaultColorSchemes.warning.colors,
    error: defaultColorSchemes.error.colors,
    info: defaultColorSchemes.info.colors,
    gray: defaultColorSchemes.secondary.colors,
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text: '#111827',
    textSecondary: '#6B7280',
    grid: '#E5E7EB',
    axis: '#9CA3AF',
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: '700',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
};

/**
 * Dark chart theme
 */
export const darkChartTheme: ChartTheme = {
  ...defaultChartTheme,
  colors: {
    ...defaultChartTheme.colors,
    background: '#111827',
    surface: '#1F2937',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    grid: '#374151',
    axis: '#6B7280',
  },
};

/**
 * Get color scheme by name
 */
export function getColorScheme(name: string): ChartColorScheme {
  return defaultColorSchemes[name] || defaultColorSchemes.primary;
}

/**
 * Get theme by mode
 */
export function getTheme(mode: 'light' | 'dark' | 'auto'): ChartTheme {
  if (mode === 'auto') {
    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? darkChartTheme
        : defaultChartTheme;
    }
    return defaultChartTheme;
  }
  return mode === 'dark' ? darkChartTheme : defaultChartTheme;
}

/**
 * Format number for display
 */
export function formatNumber(value: number, decimals: number = 0): string {
  if (value === 0) return '0';
  if (Math.abs(value) < 0.01 && value !== 0) {
    return value.toFixed(decimals + 2);
  }
  if (Math.abs(value) >= 1000000000) {
    return (value / 1000000000).toFixed(1) + 'B';
  }
  if (Math.abs(value) >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  }
  if (Math.abs(value) >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }
  return value.toFixed(decimals);
}

/**
 * Format currency for display
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format percentage for display
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format date for display
 */
export function formatDate(
  date: Date | string | number,
  format: 'short' | 'medium' | 'long' | 'full' = 'short',
  locale: string = 'en-US'
): string {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return String(date);
  }

  const options: Intl.DateTimeFormatOptions = {
    short: { month: 'short' as const, day: 'numeric' as const },
    medium: { year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const },
    long: { year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const },
    full: { weekday: 'long' as const, year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const },
  }[format];

  return dateObj.toLocaleDateString(locale, options);
}

/**
 * Generate chart ID for accessibility
 */
export function generateChartId(prefix: string = 'chart'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get default margin based on chart type
 */
export function getDefaultMargin(chartType: 'line' | 'bar' | 'pie') {
  const baseMargin = { top: 20, right: 20, bottom: 40, left: 50 };

  switch (chartType) {
    case 'line':
    case 'bar':
      return {
        ...baseMargin,
        top: 30, // Extra space for title
        right: 60, // Extra space for legend
      };
    case 'pie':
      return {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30,
      };
    default:
      return baseMargin;
  }
}

/**
 * Calculate chart dimensions
 */
export function calculateDimensions(
  containerWidth: number,
  containerHeight: number,
  aspectRatio: number = 16 / 9,
  minHeight: number = 200,
  maxHeight: number = 800
) {
  const calculatedHeight = containerWidth / aspectRatio;
  const height = Math.max(minHeight, Math.min(maxHeight, calculatedHeight));

  return {
    width: containerWidth,
    height: Math.min(height, containerHeight || calculatedHeight),
  };
}

/**
 * Debounce function for responsive charts
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if a value is valid for chart data
 */
export function isValidChartDataPoint(value: any): boolean {
  return (
    value !== null &&
    value !== undefined &&
    !Number.isNaN(value) &&
    typeof value === 'number' &&
    Number.isFinite(value)
  );
}

/**
 * Validate chart data array
 */
export function validateChartData<T extends Record<string, any>>(
  data: T[],
  requiredKeys: string[]
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!Array.isArray(data)) {
    errors.push('Data must be an array');
    return { isValid: false, errors };
  }

  if (data.length === 0) {
    errors.push('Data array cannot be empty');
    return { isValid: false, errors };
  }

  data.forEach((point, index) => {
    if (typeof point !== 'object' || point === null) {
      errors.push(`Data point at index ${index} must be an object`);
      return;
    }

    requiredKeys.forEach(key => {
      if (!(key in point)) {
        errors.push(`Data point at index ${index} is missing required key: ${key}`);
      }
    });

    // Validate y value for numeric charts
    if ('y' in point && !isValidChartDataPoint(point.y)) {
      errors.push(`Data point at index ${index} has invalid y value: ${point.y}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Get contrast color for text
 */
export function getContrastColor(backgroundColor: string): string {
  // Simple contrast calculation
  const rgb = backgroundColor.replace('#', '');
  const r = parseInt(rgb.substr(0, 2), 16);
  const g = parseInt(rgb.substr(2, 2), 16);
  const b = parseInt(rgb.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
}