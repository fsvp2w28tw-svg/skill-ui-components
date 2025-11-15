/**
 * Split Pane Types
 */

export interface SplitPaneConfig {
  /**
   * 分割方向
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * 默认尺寸比例 [first, second]
   * @default [50, 50]
   */
  defaultSizes?: [number, number];

  /**
   * 最小尺寸 [first, second] (像素或百分比)
   * @default [10, 10]
   */
  minSizes?: [number | string, number | string];

  /**
   * 最大尺寸 [first, second] (像素或百分比)
   */
  maxSizes?: [number | string, number | string];

  /**
   * 分割器样式
   * @default 'thin'
   */
  resizerStyle?: 'thin' | 'thick' | 'handle';

  /**
   * 是否可折叠
   * @default false
   */
  collapsible?: boolean;

  /**
   * 分割器大小 (像素)
   * @default 8
   */
  resizerSize?: number;

  /**
   * 是否启用拖拽调整大小
   * @default true
   */
  resizable?: boolean;

  /**
   * 是否保存状态到本地存储
   * @default false
   */
  persistState?: boolean;

  /**
   * 存储键名
   */
  storageKey?: string;
}

export interface SplitPaneState {
  /**
   * 当前尺寸比例 [first, second]
   */
  sizes: [number, number];

  /**
   * 是否正在拖拽
   */
  isDragging: boolean;

  /**
   * 是否折叠 (如果支持折叠)
   */
  collapsed: 'first' | 'second' | null;
}

export interface SplitPaneEvent {
  type: string;
  sizes: [number, number];
  collapsed: 'first' | 'second' | null;
}

export interface ResizerPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}