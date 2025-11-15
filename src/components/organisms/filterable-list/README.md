# Skill Filterable List

可过滤列表组件，支持搜索、过滤、排序、分页等功能的高级列表容器。

## 功能特性

### 🔍 **搜索功能**
- 实时搜索和防抖处理
- 支持多字段搜索
- 模糊搜索和精确搜索

### 🎯 **过滤功能**
- 多种过滤器类型（文本、选择、多选、日期、数字、布尔值）
- 支持自定义过滤函数
- 过滤器面板可折叠

### 📊 **排序功能**
- 多字段排序支持
- 升序/降序切换
- 自定义比较函数

### 📱 **布局模式**
- 列表布局（list）
- 网格布局（grid）
- 卡片布局（cards）
- 表格布局（table）

### ✅ **选择功能**
- 单选/多选模式
- 全选/取消全选
- 选择状态管理

### 📄 **分页功能**
- 分页导航
- 页面大小配置
- 分页位置自定义

### 🎨 **主题定制**
- 明亮主题
- 暗黑主题
- 自动主题
- CSS 变量自定义

## 基础用法

```html
<skill-filterable-list
  .items="${items}"
  .config="${{
    layout: 'list',
    showSearch: true,
    showFilters: true,
    multiSelect: true
  }}"
></skill-filterable-list>
```

## 数据格式

```typescript
interface FilterableListItem {
  id: string | number;
  data: Record<string, any>;
  title?: string;
  description?: string;
  tags?: string[];
  category?: string;
  icon?: string;
  image?: string;
  disabled?: boolean;
  selectable?: boolean;
  className?: string;
  style?: Record<string, string>;
  sortWeight?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
```

## 配置选项

```typescript
interface FilterableListConfig {
  // 布局配置
  layout?: 'list' | 'grid' | 'cards' | 'table';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  // 搜索配置
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchFields?: string[];
  liveSearch?: boolean;
  searchDebounce?: number;

  // 过滤器配置
  filters?: FilterConfig[];
  showFilters?: boolean;
  filterLayout?: 'sidebar' | 'topbar' | 'dropdown';

  // 排序配置
  sortOptions?: SortConfig[];
  defaultSort?: string;
  showSort?: boolean;

  // 选择配置
  multiSelect?: boolean;
  showSelectAll?: boolean;

  // 分页配置
  pageSize?: number;
  showPagination?: boolean;
  paginationPosition?: 'top' | 'bottom' | 'both';

  // 样式配置
  bordered?: boolean;
  divided?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
  compact?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}
```

## 过滤器配置

```typescript
interface FilterConfig {
  field: string;
  type: 'text' | 'select' | 'multiselect' | 'date' | 'number' | 'boolean' | 'custom';
  label: string;
  options?: FilterOption[];
  placeholder?: string;
  defaultValue?: any;
  filterFn?: (item: FilterableListItem, value: any) => boolean;
  caseSensitive?: boolean;
  fuzzy?: boolean;
}
```

## 排序配置

```typescript
interface SortConfig {
  field: string;
  label: string;
  direction?: 'asc' | 'desc';
  compareFn?: (a: FilterableListItem, b: FilterableListItem) => number;
  multiSort?: boolean;
}
```

## 示例

### 1. 基础列表

```html
<skill-filterable-list
  .items="${[
    {
      id: 1,
      title: '项目一',
      description: '这是第一个项目的描述',
      category: '开发',
      tags: ['React', 'TypeScript']
    },
    {
      id: 2,
      title: '项目二',
      description: '这是第二个项目的描述',
      category: '设计',
      tags: ['UI', 'UX']
    }
  ]}"
  .config="${{
    layout: 'list',
    showSearch: true,
    searchPlaceholder: '搜索项目...'
  }}"
></skill-filterable-list>
```

### 2. 带过滤器的列表

```html
<skill-filterable-list
  .items="${items}"
  .config="${{
    layout: 'cards',
    showSearch: true,
    showFilters: true,
    filters: [
      {
        field: 'category',
        type: 'select',
        label: '分类',
        options: [
          { value: 'development', label: '开发' },
          { value: 'design', label: '设计' },
          { value: 'marketing', label: '市场' }
        ]
      },
      {
        field: 'status',
        type: 'multiselect',
        label: '状态',
        options: [
          { value: 'active', label: '进行中' },
          { value: 'completed', label: '已完成' },
          { value: 'archived', label: '已归档' }
        ]
      }
    ]
  }}"
></skill-filterable-list>
```

### 3. 带排序和分页的列表

```html
<skill-filterable-list
  .items="${items}"
  .config="${{
    layout: 'table',
    showSearch: true,
    showSort: true,
    showPagination: true,
    pageSize: 10,
    sortOptions: [
      {
        field: 'title',
        label: '按标题排序'
      },
      {
        field: 'createdAt',
        label: '按创建时间排序',
        direction: 'desc'
      },
      {
        field: 'category',
        label: '按分类排序'
      }
    ],
    defaultSort: 'createdAt'
  }}"
></skill-filterable-list>
```

### 4. 多选列表

```html
<skill-filterable-list
  .items="${items}"
  .config="${{
    layout: 'list',
    multiSelect: true,
    showSelectAll: true,
    showActions: true
  }}"
  .actions="${[
    {
      key: 'edit',
      label: '编辑',
      icon: '✏️',
      handler: (item) => console.log('编辑项目:', item)
    },
    {
      key: 'delete',
      label: '删除',
      icon: '🗑️',
      danger: true,
      confirm: true,
      confirmText: '确定要删除这个项目吗？',
      handler: (item) => console.log('删除项目:', item)
    }
  ]}"
  @skill-filterable-list-select="${(e) => console.log('选择变化:', e.detail.selectedItems)}"
></skill-filterable-list>
```

### 5. 自定义项目渲染

```html
<skill-filterable-list
  .items="${items}"
  .renderItem="${(props) => html`
    <div class="custom-item">
      <div class="custom-header">
        <h3>${props.item.title}</h3>
        <span class="custom-category">${props.item.category}</span>
      </div>
      <p>${props.item.description}</p>
      <div class="custom-footer">
        ${props.item.tags.map(tag => html\`<span class="tag">\${tag}</span>\`)}
      </div>
    </div>
  \`}"
></skill-filterable-list>
```

## 事件处理

### 选择事件

```javascript
listElement.addEventListener('skill-filterable-list-select', (event) => {
  const { item, selectedItems } = event.detail;
  console.log('选中的项目:', selectedItems);
});
```

### 搜索事件

```javascript
listElement.addEventListener('skill-filterable-list-search', (event) => {
  const { searchText, filteredCount } = event.detail;
  console.log('搜索文本:', searchText, '过滤结果数:', filteredCount);
});
```

### 过滤事件

```javascript
listElement.addEventListener('skill-filterable-list-filter', (event) => {
  const { filters, filteredCount } = event.detail;
  console.log('过滤器:', filters, '过滤结果数:', filteredCount);
});
```

### 排序事件

```javascript
listElement.addEventListener('skill-filterable-list-sort', (event) => {
  const { sort, sortedCount } = event.detail;
  console.log('排序:', sort, '排序结果数:', sortedCount);
});
```

### 分页事件

```javascript
listElement.addEventListener('skill-filterable-list-page-change', (event) => {
  const { pagination } = event.detail;
  console.log('页面变化:', pagination);
});
```

### 操作事件

```javascript
listElement.addEventListener('skill-filterable-list-action', (event) => {
  const { item, action } = event.detail;
  console.log('操作点击:', action.key, '项目:', item);
});
```

## API 方法

### 搜索相关

```javascript
// 设置搜索文本
listElement.setSearchText('关键词');

// 清空搜索
listElement.setSearchText('');
```

### 过滤相关

```javascript
// 设置过滤器值
listElement.setFilter('category', 'development');
listElement.setFilter('status', ['active', 'completed']);

// 清空过滤器
listElement.setFilter('category', '');
```

### 排序相关

```javascript
// 设置排序
listElement.setSort('title', 'asc');
listElement.setSort('createdAt', 'desc');
```

### 分页相关

```javascript
// 设置当前页
listElement.setCurrentPage(2);

// 获取分页信息
const state = listElement.getState();
console.log('当前页:', state.currentPage);
console.log('总页数:', state.totalPages);
```

### 选择相关

```javascript
// 选中项目
listElement.selectItems([1, 2, 3]);

// 全选
listElement.selectAll();

// 清空选择
listElement.clearSelection();

// 获取选中的项目
const selectedItems = listElement.getSelectedItems();
```

### 数据操作

```javascript
// 刷新数据
listElement.refresh();

// 重置所有过滤和排序
listElement.reset();

// 获取当前状态
const state = listElement.getState();
```

## 样式定制

### CSS 变量

```css
skill-filterable-list {
  --item-height: 60px;
  --item-bg: #ffffff;
  --item-hover-bg: #f9fafb;
  --item-selected-bg: #eff6ff;
  --item-border-color: #e5e7eb;
  --search-height: 40px;
  --filter-width: 200px;
  --pagination-height: 60px;
}
```

### CSS Parts

```css
/* 容器 */
skill-filterable-list::part(container) {
  border-radius: 12px;
}

/* 项目 */
skill-filterable-list::part(item) {
  border-left: 4px solid transparent;
  transition: all 0.3s ease;
}

skill-filterable-list::part(item):hover {
  border-left-color: var(--skill-primary-500);
}

/* 选中的项目 */
skill-filterable-list::part(item-selected) {
  border-left-color: var(--skill-primary-500);
  background: linear-gradient(to right, var(--skill-primary-50), transparent);
}
```

## 主题示例

### 暗黑主题

```html
<skill-filterable-list
  .items="${items}"
  .config="${{
    theme: 'dark',
    layout: 'cards'
  }}"
></skill-filterable-list>
```

### 自动主题

```html
<skill-filterable-list
  .items="${items}"
  .config="${{
    theme: 'auto',
    layout: 'list'
  }}"
></skill-filterable-list>
```

## 性能优化

1. **虚拟滚动**：对于大量数据，启用 `virtualScroll` 选项
2. **分页**：合理设置 `pageSize` 避免一次性渲染过多项目
3. **防抖搜索**：调整 `searchDebounce` 减少频繁的搜索操作
4. **延迟加载**：对于图片资源，使用懒加载技术

## 无障碍支持

- 支持键盘导航
- 语义化 HTML 结构
- ARIA 属性支持
- 高对比度模式兼容

## 浏览器兼容性

- Chrome ≥ 67
- Firefox ≥ 63
- Safari ≥ 13.1
- Edge ≥ 79

## 许可证

MIT License