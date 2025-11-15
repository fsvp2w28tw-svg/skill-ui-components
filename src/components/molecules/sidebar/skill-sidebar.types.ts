/**
 * Sidebar 类型定义
 */

export interface SidebarMenuItem {
  key: string;
  label: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
  hidden?: boolean;
  active?: boolean;
  path?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  children?: SidebarMenuItem[];
  component?: string;
  props?: Record<string, any>;
  onClick?: (item: SidebarMenuItem) => void;
  onBeforeClick?: (item: SidebarMenuItem) => boolean | Promise<boolean>;
}

export interface SidebarGroup {
  key: string;
  title: string;
  icon?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  hidden?: boolean;
  items: SidebarMenuItem[];
}

export interface SidebarConfig {
  mode?: 'vertical' | 'horizontal' | 'inline';
  position?: 'left' | 'right' | 'top' | 'bottom';
  width?: number | string;
  height?: number | string;
  collapsed?: boolean;
  collapsible?: boolean;
  theme?: 'light' | 'dark' | 'custom';
  logo?: {
    image?: string;
    text?: string;
    link?: string;
    collapsed?: boolean;
  };
  header?: {
    title?: string;
    subtitle?: string;
    avatar?: string;
    actions?: Array<{
      key: string;
      icon?: string;
      label?: string;
      onClick: () => void;
    }>;
  };
  footer?: {
    content?: string;
    actions?: Array<{
      key: string;
      icon?: string;
      label?: string;
      onClick: () => void;
    }>;
  };
  groups?: SidebarGroup[];
  items?: SidebarMenuItem[];
  search?: {
    enabled?: boolean;
    placeholder?: string;
    filter?: (items: SidebarMenuItem[], query: string) => SidebarMenuItem[];
  };
  badges?: {
    [key: string]: string | number;
  };
  shortcuts?: Array<{
    key: string;
    keys: string[];
    action: () => void;
  }>;
}

export interface SidebarState {
  collapsed: boolean;
  activeKeys: string[];
  openKeys: string[];
  selectedItem?: SidebarMenuItem;
  searchQuery?: string;
  filteredItems?: SidebarMenuItem[];
}

export interface SidebarEvent {
  type: 'select' | 'collapse' | 'expand' | 'search' | 'menu-click' | 'before-click' | 'shortcut';
  item?: SidebarMenuItem;
  key?: string;
  keys?: string[];
  collapsed?: boolean;
  query?: string;
  data?: any;
}

export interface SidebarTheme {
  colors?: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
    textSecondary?: string;
    border?: string;
    hover?: string;
    active?: string;
    disabled?: string;
    shadow?: string;
  };
  spacing?: {
    small?: string;
    medium?: string;
    large?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
  };
  borderRadius?: string;
  shadow?: string;
}

// 用户相关类型
export interface SidebarUser {
  name: string;
  avatar?: string;
  email?: string;
  role?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
  actions?: Array<{
    key: string;
    label: string;
    icon?: string;
    onClick: () => void;
  }>;
}

// 通知相关类型
export interface SidebarNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message?: string;
  time?: Date;
  read?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// 标签页相关类型（水平模式）
export interface SidebarTab {
  key: string;
  label: string;
  icon?: string;
  badge?: string | number;
  closable?: boolean;
  content?: string;
}

// 拖拽相关类型
export interface SidebarDragDrop {
  enabled?: boolean;
  allowReorder?: boolean;
  allowBetweenGroups?: boolean;
  onDragStart?: (item: SidebarMenuItem) => void;
  onDragEnd?: (item: SidebarMenuItem) => void;
  onDrop?: (source: SidebarMenuItem, target: SidebarMenuItem, position: 'before' | 'after' | 'inside') => void;
}