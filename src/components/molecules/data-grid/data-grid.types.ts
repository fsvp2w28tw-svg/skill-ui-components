/**
 * Data Grid 类型定义
 */

export interface DataGridColumn {
  key: string;
  title: string;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  resizable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
  pinned?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  type?: 'input' | 'textarea' | 'number' | 'date' | 'boolean' | 'select' | 'custom';
  format?: (value: any, row: any) => string;
  render?: (value: any, row: any, column: DataGridColumn) => unknown;
  cellClass?: string | ((row: any, column: DataGridColumn) => string);
  headerClass?: string;
  footer?: string | ((rows: any[]) => string);
  aggregation?: 'sum' | 'avg' | 'count' | 'min' | 'max';
  filterOptions?: Array<{ label: string; value: any }>;
  options?: Array<{ label: string; value: any }>;
  validation?: {
    required?: boolean;
    pattern?: string;
    min?: number;
    max?: number;
  };
}

export interface DataGridFilter {
  key: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith' | 'in' | 'between';
  value: any;
}

export interface DataGridSort {
  key: string;
  direction: 'asc' | 'desc';
}

export interface DataGridSelection {
  type: 'single' | 'multiple' | 'checkbox' | 'none';
  selectedRows: any[];
  selectedKeys: (string | number)[];
  preserveSelection?: boolean;
}

export interface DataGridPagination {
  page: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean;
  pageSizeOptions?: number[];
}

export interface DataGridConfig {
  columns: DataGridColumn[];
  data: any[];
  height?: number | 'auto';
  rowHeight?: number;
  headerHeight?: number;
  virtualScrolling?: boolean;
  loading?: boolean;
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  resizable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  selectable?: DataGridSelection;
  pagination?: DataGridPagination | false;
  empty?: {
    image?: string;
    description?: string;
    action?: {
      text: string;
      onClick: () => void;
    };
  };
  contextMenu?: Array<{
    key: string;
    label: string;
    icon?: string;
    disabled?: boolean;
    divider?: boolean;
    onClick: (row: any, column?: DataGridColumn) => void;
  }>;
  rowActions?: Array<{
    key: string;
    label: string;
    icon?: string;
    type?: 'primary' | 'secondary' | 'danger' | 'warning';
    visible?: (row: any) => boolean;
    onClick: (row: any) => void;
  }>;
  groupBy?: string;
  expandable?: boolean;
  expandRowByClick?: boolean;
  defaultExpandedRowKeys?: (string | number)[];
  summary?: boolean;
  footer?: boolean;
}

export interface DataGridEvent {
  type: 'select' | 'select-all' | 'sort' | 'filter' | 'page-change' | 'resize' | 'edit' | 'expand' | 'context-menu' | 'row-action';
  data?: any;
  row?: any;
  rows?: any[];
  column?: DataGridColumn;
  selection?: DataGridSelection;
  sort?: DataGridSort;
  filter?: DataGridFilter;
  pagination?: DataGridPagination;
  value?: any;
  oldValue?: any;
}

export interface GridCellEditor {
  type: 'input' | 'textarea' | 'select' | 'number' | 'date' | 'checkbox' | 'custom';
  options?: Array<{ label: string; value: any }>;
  validation?: {
    required?: boolean;
    pattern?: string;
    min?: number;
    max?: number;
  };
  render?: (value: any, row: any, column: DataGridColumn) => unknown;
}

export interface GridTheme {
  colors?: {
    primary?: string;
    secondary?: string;
    border?: string;
    hover?: string;
    selected?: string;
    striped?: string;
  };
  spacing?: {
    cell?: string;
    header?: string;
    row?: string;
  };
  typography?: {
    fontSize?: string;
    fontFamily?: string;
  };
}

// 数据处理相关
export interface DataGridRow {
  data: any;
  key: string | number;
  expanded?: boolean;
  selected?: boolean;
  editing?: boolean;
  level?: number;
  children?: DataGridRow[];
  parent?: DataGridRow;
  index: number;
}

// 分组相关
export interface DataGridGroup {
  key: string;
  title: string;
  children: DataGridRow[];
  collapsed?: boolean;
  summary?: {
    [key: string]: any;
  };
}

// 拖拽相关
export interface DataGridDragDrop {
  enabled?: boolean;
  type?: 'row' | 'column';
  handle?: string;
  dropZone?: string;
  onDragStart?: (row: any) => void;
  onDragEnd?: (row: any) => void;
  onDrop?: (sourceRow: any, targetRow: any) => void;
}

// 复制粘贴相关
export interface DataGridClipboard {
  enabled?: boolean;
  copyHeaders?: boolean;
  pasteMode?: 'overwrite' | 'insert';
  onCopy?: (data: any[]) => void;
  onPaste?: (data: any[]) => void;
}