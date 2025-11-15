/**
 * Tabs Panel Types
 */

export interface TabsPanelTab {
  /**
   * 标签页唯一标识
   */
  id: string;

  /**
   * 标签页标题
   */
  title: string;

  /**
   * 标签页内容 (可以是 HTML 字符串或 Promise)
   */
  content?: string | Promise<string>;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否可关闭
   * @default true
   */
  closable?: boolean;

  /**
   * 标签页图标
   */
  icon?: string;

  /**
   * 徽章文本
   */
  badge?: string | number;

  /**
   * 工具提示
   */
  tooltip?: string;

  /**
   * 自定义数据
   */
  data?: any;

  /**
   * 是否懒加载内容
   * @default false
   */
  lazy?: boolean;

  /**
   * 标签页类名
   */
  className?: string;

  /**
   * 标签页样式
   */
  style?: Record<string, string>;
}

export interface TabsConfig {
  /**
   * 标签页位置
   * @default 'top'
   */
  position?: 'top' | 'bottom' | 'left' | 'right';

  /**
   * 标签页样式类型
   * @default 'line'
   */
  variant?: 'line' | 'card' | 'pills' | 'segmented';

  /**
   * 标���页大小
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * 是否可拖拽排序
   * @default false
   */
  draggable?: boolean;

  /**
   * 是否可关闭标签页
   * @default false
   */
  closable?: boolean;

  /**
   * 溢出处理方式
   * @default 'scroll'
   */
  overflow?: 'scroll' | 'dropdown' | 'responsive' | 'hidden';

  /**
   * 是否启用懒加载
   * @default false
   */
  lazyLoad?: boolean;

  /**
   * 是否显示添加按钮
   * @default false
   */
  addable?: boolean;

  /**
   * 标签页最大宽度 (仅在 position 为 left/right 时有效)
   */
  maxTabWidth?: number;

  /**
   * 标签页最小宽度
   * @default 80
   */
  minTabWidth?: number;

  /**
   * 是否保持标签页状态
   * @default false
   */
  persistState?: boolean;

  /**
   * 存储键名
   */
  storageKey?: string;

  /**
   * 是否显示快捷键提示
   * @default false
   */
  showKeyboardHints?: boolean;

  /**
   * 动画持续时间 (毫秒)
   * @default 300
   */
  animationDuration?: number;
}

export interface TabsState {
  /**
   * 当前激活的标签页 ID
   */
  activeId: string | null;

  /**
   * 所有标签页列表
   */
  tabs: TabsPanelTab[];

  /**
   * 是否正在拖拽
   */
  isDragging: boolean;

  /**
   * 拖拽中的标签页 ID
   */
  draggingId: string | null;

  /**
   * 拖拽目标位置
   */
  dropIndex: number | null;

  /**
   * 已加载的标签页 ID 集合
   */
  loadedTabs: Set<string>;
}

export interface TabsEvent {
  type: string;
  tabId: string;
  tab?: TabsPanelTab;
  index?: number;
  newIndex?: number;
  data?: any;
}

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  description: string;
  action: () => void;
}