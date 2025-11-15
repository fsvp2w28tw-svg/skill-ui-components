/**
 * Sortable Container Types
 */

export interface SortableItem {
  /**
   * 项目唯一标识
   */
  id: string;

  /**
   * 项目内容
   */
  content: string;

  /**
   * 是否禁用拖拽
   * @default false
   */
  disabled?: boolean;

  /**
   * 自定义数据
   */
  data?: any;

  /**
   * 项目类名
   */
  className?: string;

  /**
   * 项目样式
   */
  style?: Record<string, string>;

  /**
   * 拖拽手柄选择器 (如果需要特定手柄)
   */
  handle?: string;

  /**
   * 项目权重 (用于排序)
   */
  weight?: number;

  /**
   * 是否可跨容器拖拽
   * @default true
   */
  crossContainer?: boolean;

  /**
   * 分组名称 (用于跨容器拖拽)
   */
  group?: string;
}

export interface SortableConfig {
  /**
   * 拖拽方向
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal' | 'both';

  /**
   * 布局模式
   * @default 'list'
   */
  layout?: 'list' | 'grid' | 'cards';

  /**
   * 是否需要拖拽手柄
   * @default false
   */
  handle?: boolean;

  /**
   * 手柄图标或HTML
   */
  handleContent?: string;

  /**
   * 拖拽时的占位符
   */
  placeholder?: string;

  /**
   * 是否启用动画
   * @default true
   */
  animation?: boolean;

  /**
   * 动画持续时间 (毫秒)
   * @default 300
   */
  animationDuration?: number;

  /**
   * 拖拽时的透明度
   * @default 0.8
   */
  dragOpacity?: number;

  /**
   * 是否启用自动滚动
   * @default true
   */
  autoScroll?: boolean;

  /**
   * 自动滚动速度
   * @default 5
   */
  scrollSpeed?: number;

  /**
   * 拖拽阈值 (像素)
   * @default 5
   */
  dragThreshold?: number;

  /**
   * 容器间距
   * @default 'normal'
   */
  spacing?: 'none' | 'tight' | 'normal' | 'loose';

  /**
   * 分组名称 (用于跨容器拖拽)
   */
  group?: string;

  /**
   * 是否允许从其他容器拖入
   * @default true
   */
  allowDropIn?: boolean;

  /**
   * 是否允许拖出到其他容器
   * @default true
   */
  allowDropOut?: boolean;

  /**
   * 最大高度 (用于垂直布局)
   */
  maxHeight?: string;

  /**
   * 最大宽度 (用于水平布局)
   */
  maxWidth?: string;

  /**
   * 是否显示拖拽预览
   * @default true
   */
  showPreview?: boolean;

  /**
   * 是否保存排序状态
   * @default false
   */
  persistState?: boolean;

  /**
   * 存储键名
   */
  storageKey?: string;
}

export interface SortableState {
  /**
   * 当前项目列表
   */
  items: SortableItem[];

  /**
   * 是否正在拖拽
   */
  isDragging: boolean;

  /**
   * 拖拽中的项目 ID
   */
  draggingId: string | null;

  /**
   * 拖拽起始位置
   */
  dragStartIndex: number | null;

  /**
   * 当前拖拽位置
   */
  dragCurrentIndex: number | null;

  /**
   * 目标插入位置
   */
  dropIndex: number | null;

  /**
   * 拖拽起始坐标
   */
  dragStartPos: { x: number; y: number };

  /**
   * 当前坐标
   */
  dragCurrentPos: { x: number; y: number };
}

export interface SortableEvent {
  type: string;
  itemId: string;
  item?: SortableItem;
  index?: number;
  newIndex?: number;
  fromContainer?: string;
  toContainer?: string;
  items?: SortableItem[];
  data?: any;
}

export interface DragPreview {
  element: HTMLElement;
  width: number;
  height: number;
}

export interface DropZone {
  element: HTMLElement;
  index: number;
  rect: DOMRect;
}