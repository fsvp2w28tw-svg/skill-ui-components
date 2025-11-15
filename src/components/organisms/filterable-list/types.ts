/**
 * Filterable List Types
 * 可过滤列表组件类型定义
 */

import type { Size } from '../../../types';

export interface FilterableListItem {
  /**
   * 项目唯一标识
   */
  id: string | number;

  /**
   * 项目数据
   */
  data: Record<string, any>;

  /**
   * 项目标题
   */
  title?: string;

  /**
   * 项目描述
   */
  description?: string;

  /**
   * 项目标签
   */
  tags?: string[];

  /**
   * 项目分类
   */
  category?: string;

  /**
   * 项目图标
   */
  icon?: string;

  /**
   * 项目图片
   */
  image?: string;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否可选
   * @default true
   */
  selectable?: boolean;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 自定义样式
   */
  style?: Record<string, string>;

  /**
   * 排序权重
   */
  sortWeight?: number;

  /**
   * 创建时间
   */
  createdAt?: Date | string;

  /**
   * 更新时间
   */
  updatedAt?: Date | string;
}

export interface FilterableListFilterConfig {
  /**
   * 过滤字段名
   */
  field: string;

  /**
   * 过滤器类型
   */
  type: 'text' | 'select' | 'multiselect' | 'date' | 'number' | 'boolean' | 'custom';

  /**
   * 过滤器标签
   */
  label: string;

  /**
   * 选项列表 (用于 select/multiselect)
   */
  options?: FilterOption[];

  /**
   * 占位符文本
   */
  placeholder?: string;

  /**
   * 默认值
   */
  defaultValue?: any;

  /**
   * 自定义过滤函数
   */
  filterFn?: (item: FilterableListItem, value: any) => boolean;

  /**
   * 是否区分大小写 (用于文本过滤)
   * @default false
   */
  caseSensitive?: boolean;

  /**
   * 是否支持模糊搜索 (用于文本过滤)
   * @default true
   */
  fuzzy?: boolean;
}

export interface FilterOption {
  /**
   * 选项值
   */
  value: any;

  /**
   * 选项标签
   */
  label: string;

  /**
   * 选项图标
   */
  icon?: string;

  /**
   * 选项颜色
   */
  color?: string;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
}

export interface FilterableListSortConfig {
  /**
   * 排序字段
   */
  field: string;

  /**
   * 排序标签
   */
  label: string;

  /**
   * 排序方向
   * @default 'asc'
   */
  direction?: 'asc' | 'desc';

  /**
   * 自定义比较函数
   */
  compareFn?: (a: FilterableListItem, b: FilterableListItem) => number;

  /**
   * 是否支持多级排序
   * @default false
   */
  multiSort?: boolean;
}

export interface FilterableListConfig {
  /**
   * 布局模式
   * @default 'list'
   */
  layout?: 'list' | 'grid' | 'cards' | 'table';

  /**
   * 项目尺寸
   * @default 'md'
   */
  size?: Size;

  /**
   * 是否显示搜索框
   * @default true
   */
  showSearch?: boolean;

  /**
   * 搜索框占位符
   */
  searchPlaceholder?: string;

  /**
   * 搜索字段 (默认搜索所有字段)
   */
  searchFields?: string[];

  /**
   * 是否支持实时搜索
   * @default true
   */
  liveSearch?: boolean;

  /**
   * 搜索防抖延迟 (毫秒)
   * @default 300
   */
  searchDebounce?: number;

  /**
   * 是否支持模糊搜索 (用于文本过滤)
   * @default true
   */
  fuzzy?: boolean;

  /**
   * 过滤器配置
   */
  filters?: FilterableListFilterConfig[];

  /**
   * 是否显示过滤器面板
   * @default true
   */
  showFilters?: boolean;

  /**
   * 过滤器布局
   * @default 'sidebar'
   */
  filterLayout?: 'sidebar' | 'topbar' | 'dropdown';

  /**
   * 排序配置
   */
  sortOptions?: FilterableListSortConfig[];

  /**
   * 默认排序字段
   */
  defaultSort?: string;

  /**
   * 是否显示排序控件
   * @default true
   */
  showSort?: boolean;

  /**
   * 是否支持多选
   * @default false
   */
  multiSelect?: boolean;

  /**
   * 是否支持全选
   * @default true
   */
  showSelectAll?: boolean;

  /**
   * 是否显示项目操作
   * @default true
   */
  showActions?: boolean;

  /**
   * 是否启用虚拟滚动
   * @default false
   */
  virtualScroll?: boolean;

  /**
   * 虚拟滚动项目高度
   * @default 60
   */
  itemHeight?: number;

  /**
   * 容器高度
   * @default '400px'
   */
  containerHeight?: string;

  /**
   * 每页显示数量
   * @default 20
   */
  pageSize?: number;

  /**
   * 是否显示分页
   * @default true
   */
  showPagination?: boolean;

  /**
   * 分页位置
   * @default 'bottom'
   */
  paginationPosition?: 'top' | 'bottom' | 'both';

  /**
   * 空状态文本
   */
  emptyText?: string;

  /**
   * 加载状态文本
   */
  loadingText?: string;

  /**
   * 错误状态文本
   */
  errorText?: string;

  /**
   * 是否显示边框
   * @default true
   */
  bordered?: boolean;

  /**
   * 是否显示分隔线
   * @default false
   */
  divided?: boolean;

  /**
   * 是否可悬停
   * @default true
   */
  hoverable?: boolean;

  /**
   * 是否可点击
   * @default true
   */
  clickable?: boolean;

  /**
   * 紧凑模式
   * @default false
   */
  compact?: boolean;

  /**
   * 主题
   * @default 'light'
   */
  theme?: 'light' | 'dark' | 'auto';
}

export interface FilterableListState {
  /**
   * 原始数据
   */
  rawData: FilterableListItem[];

  /**
   * 过滤后的数据
   */
  filteredData: FilterableListItem[];

  /**
   * 排序后的数据
   */
  sortedData: FilterableListItem[];

  /**
   * 当前页数据
   */
  pageData: FilterableListItem[];

  /**
   * 搜索文本
   */
  searchText: string;

  /**
   * 当前过滤器值
   */
  filters: Record<string, any>;

  /**
   * 当前排序
   */
  sortBy: string;

  /**
   * 排序方向
   */
  sortDirection: 'asc' | 'desc';

  /**
   * 当前页码
   */
  currentPage: number;

  /**
   * 总页数
   */
  totalPages: number;

  /**
   * 总项目数
   */
  totalItems: number;

  /**
   * 选中的项目
   */
  selectedItems: (string | number)[];

  /**
   * 是否正在加载
   */
  loading: boolean;

  /**
   * 错误信息
   */
  error?: string;

  /**
   * 是否显示过滤器面板
   */
  filterPanelVisible: boolean;
}

export interface FilterableListAction {
  /**
   * 操作标识
   */
  key: string;

  /**
   * 操作标签
   */
  label: string;

  /**
   * 操作图标
   */
  icon?: string;

  /**
   * 操作类型
   * @default 'button'
   */
  type?: 'button' | 'dropdown' | 'divider';

  /**
   * 是否危险操作
   * @default false
   */
  danger?: boolean;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 操作处理函数
   */
  handler?: (item: FilterableListItem, action: FilterableListAction) => void;

  /**
   * 是否需要确认
   * @default false
   */
  confirm?: boolean;

  /**
   * 确认文本
   */
  confirmText?: string;
}

export interface FilterableListRenderProps {
  /**
   * 项目数据
   */
  item: FilterableListItem;

  /**
   * 项目索引
   */
  index: number;

  /**
   * 是否选中
   */
  selected: boolean;

  /**
   * 项目操作列表
   */
  actions: FilterableListAction[];

  /**
   * 事件处理函数
   */
  onSelect: (item: FilterableListItem) => void;
  onAction: (action: FilterableListAction, item: FilterableListItem) => void;
}

export interface FilterableListEvent {
  /**
   * 事件类型
   */
  type: string;

  /**
   * 项目数据
   */
  item?: FilterableListItem;

  /**
   * 项目索引
   */
  index?: number;

  /**
   * 选中的项目
   */
  selectedItems?: FilterableListItem[];

  /**
   * 搜索文本
   */
  searchText?: string;

  /**
   * 过滤器值
   */
  filters?: Record<string, any>;

  /**
   * 排序信息
   */
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };

  /**
   * 分页信息
   */
  pagination?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
  };

  /**
   * 原始事件
   */
  originalEvent?: Event;
}