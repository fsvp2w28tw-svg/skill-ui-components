# skill-sortable-container

通用的可排序列表容器，支持多种布局模式、拖拽手柄、动画效果和跨容器拖拽等功能。

## 特性

- 🔄 **多向拖拽** - 支持垂直/水平/双向拖拽
- 🎯 **多种布局** - 列表/网格/卡片布局模式
- 🖱️ **拖拽手柄** - 可选的拖拽手柄或整项拖拽
- 🎨 **流畅动画** - 拖拽和重排的平滑过渡效果
- 👥 **跨容器拖拽** - 支持在多个容器间拖拽项目
- 📱 **触摸友好** - 完整的移动设备触摸支持
- ♿ **无障碍支持** - 完整的 ARIA 和键盘操作
- 🎯 **状态持久化** - 本地存储排序状态
- 🔧 **高度可配置** - 丰富的配置选项

## 基本用法

```html
<!-- 基本列表拖拽 -->
<skill-sortable-container>
  <div slot="item" data-id="1">项目 1</div>
  <div slot="item" data-id="2">项目 2</div>
  <div slot="item" data-id="3">项目 3</div>
</skill-sortable-container>

<!-- 网格布局，带拖拽手柄 -->
<skill-sortable-container
  .config="${{ layout: 'grid', handle: true, animation: true }}"
  @skill-sortable-change="${handleChange}"
>
  <div slot="item" data-id="1">
    <div class="card">卡片 1</div>
  </div>
  <div slot="item" data-id="2">
    <div class="card">卡片 2</div>
  </div>
  <div slot="item" data-id="3">
    <div class="card">卡片 3</div>
  </div>
</skill-sortable-container>
```

## 高级配置

```html
<skill-sortable-container
  .config="${{
    layout: 'cards',
    direction: 'vertical',
    handle: true,
    animation: true,
    autoScroll: true,
    dragOpacity: 0.8,
    spacing: 'normal',
    persistState: true,
    showPreview: true,
    group: 'tasks'
  }}"
  @skill-sortable-start="${handleStart}"
  @skill-sortable-move="${handleMove}"
  @skill-sortable-end="${handleEnd}"
  @skill-sortable-change="${handleChange}"
>
  <div slot="item" data-id="1" data-weight="1">
    <h4>任务 1</h4>
    <p>任务描述内容</p>
    <div class="sortable-handle custom">⋮⋮</div>
  </div>
  <div slot="item" data-id="2" data-weight="2" data-disabled="true">
    <h4>任务 2 (禁用)</h4>
    <p>这个项目不能拖拽</p>
  </div>
  <div slot="item" data-id="3" data-handle="left" data-group="tasks">
    <h4>任务 3</h4>
    <p>左侧手柄</p>
  </div>
</skill-sortable-container>
```

## API

### 配置选项 (SortableConfig)

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `direction` | `'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | 拖拽方向 |
| `layout` | `'list' \| 'grid' \| 'cards'` | `'list'` | 布局模式 |
| `handle` | `boolean` | `false` | 是否需要拖拽手柄 |
| `handleContent` | `string` | `'⋮⋮'` | 手柄图标或HTML |
| `animation` | `boolean` | `true` | 是否启用动画 |
| `animationDuration` | `number` | `300` | 动画持续时间（毫秒） |
| `dragOpacity` | `number` | `0.8` | 拖拽时的透明度 |
| `autoScroll` | `boolean` | `true` | 是否启用自动滚动 |
| `scrollSpeed` | `number` | `5` | 自动滚动速度 |
| `dragThreshold` | `number` | `5` | 拖拽阈值（像素） |
| `spacing` | `'none' \| 'tight' \| 'normal' \| 'loose'` | `'normal'` | 容器间距 |
| `group` | `string` | `''` | 分组名称（用于跨容器拖拽） |
| `allowDropIn` | `boolean` | `true` | 是否允许从其他容器拖入 |
| `allowDropOut` | `boolean` | `true` | 是否允许拖出到其他容器 |
| `showPreview` | `boolean` | `true` | 是否显示拖拽预览 |
| `persistState` | `boolean` | `false` | 是否保存排序状态 |

### 主题属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `theme` | `'light' \| 'dark' \| 'auto'` | `'light'` | 主题模式 |

### 项目数据属性

使用 `slot="item"` 的元素可以设置以下数据属性：

| 属性 | 类型 | 描述 |
|------|------|------|
| `data-id` | `string` | 项目唯一标识（必需） |
| `data-disabled` | `boolean` | 是否禁用拖拽 |
| `data-handle` | `string` | 手柄位置 (`left`, `custom`) |
| `data-weight` | `number` | 项目权重 |
| `data-group` | `string` | 分组名称 |
| `data-cross-container` | `boolean` | 是否可跨容器拖拽 |

### CSS Parts

| 名称 | 描述 |
|------|------|
| `container` | 排序容器 |
| `item` | 排序项目 |
| `item-dragging` | 拖拽中的项目 |
| `item-disabled` | 禁用的项目 |
| `handle` | 拖拽手柄 |
| `placeholder` | 占位符 |
| `drop-indicator` | 放置指示器 |
| `empty` | 空状态 |

### 事件 (Events)

| 事件名称 | 描述 | 事件详情 |
|----------|------|----------|
| `skill-sortable-start` | 开始拖拽时触发 | `{ type, itemId, item, index, data }` |
| `skill-sortable-move` | 拖拽移动时触发 | `{ type, itemId, index, data }` |
| `skill-sortable-end` | 结束拖拽时触发 | `{ type, itemId, data }` |
| `skill-sortable-change` | 项目顺序变化时触发 | `{ type, itemId, item, index, newIndex, items, data }` |

### 公共方法

| 方法 | 参数 | 描述 |
|------|------|------|
| `getState()` | - | 获取当前状态 |
| `getItems()` | - | 获取所有项目 |
| `addItem(item, index?)` | `SortableItem, number?` | 添加项目 |
| `removeItem(itemId)` | `string` | 移除项目 |
| `reorderItems(from, to)` | `number, number` | 重新排序项目 |
| `reset()` | - | 重置到初始状态 |

## 布局变体

### 列表布局 (List)
```html
<skill-sortable-container .config="${{ layout: 'list' }}">
  <!-- 垂直排列的列表项 -->
</skill-sortable-container>
```

### 网格布局 (Grid)
```html
<skill-sortable-container .config="${{ layout: 'grid' }}">
  <!-- 自动适应的网格布局 -->
</skill-sortable-container>
```

### 卡片布局 (Cards)
```html
<skill-sortable-container .config="${{ layout: 'cards' }}">
  <!-- 卡片式布局，带阴影效果 -->
</skill-sortable-container>
```

## 拖拽模式

### 整项拖拽
```html
<skill-sortable-container>
  <!-- 整个项目都可以拖拽 -->
</skill-sortable-container>
```

### 手柄拖拽
```html
<skill-sortable-container .config="${{ handle: true }}">
  <!-- 只有手柄区域可以拖拽 -->
</skill-sortable-container>
```

### 自定义手柄
```html
<div slot="item" data-id="1">
  <div class="content">项目内容</div>
  <div class="sortable-handle custom">
    <skill-icon name="grip-vertical"></skill-icon>
  </div>
</div>
```

## 跨容器拖拽

```html
<!-- 容器1 -->
<skill-sortable-container
  .config="${{ group: 'tasks', allowDropOut: true }}"
  @skill-sortable-change="${handleContainer1Change}"
>
  <div slot="item" data-id="1" data-group="tasks">任务 1</div>
  <div slot="item" data-id="2" data-group="tasks">任务 2</div>
</skill-sortable-container>

<!-- 容器2 -->
<skill-sortable-container
  .config="${{ group: 'tasks', allowDropIn: true }}"
  @skill-sortable-change="${handleContainer2Change}"
>
  <div slot="item" data-id="3" data-group="tasks">任务 3</div>
</skill-sortable-container>
```

## 样式定制

### CSS 变量

```css
skill-sortable-container {
  --skill-sortable-bg: #ffffff;
  --skill-sortable-border-color: #e0e0e0;
  --skill-sortable-drag-border-color: #1890ff;
  --skill-sortable-drop-indicator-color: #1890ff;
  --skill-sortable-gap: 16px;
  --skill-sortable-transition: all 0.3s ease;
  --skill-drag-opacity: 0.8;
}
```

### 示例：自定义拖拽手柄

```html
<skill-sortable-container style="--skill-sortable-handle-color: #666;">
  <!-- 自定义手柄颜色 -->
</skill-sortable-container>
```

## 高级用法

### 动态添加/移除项目

```javascript
const container = document.querySelector('skill-sortable-container');

// 添加新项目
container.addItem({
  id: 'new-item',
  content: '<div>新项目内容</div>',
  disabled: false
});

// 移除项目
const removedItem = container.removeItem('item-id');
if (removedItem) {
  console.log('已移除:', removedItem);
}

// 重新排序
container.reorderItems(0, 2); // 将第一个项目移动到第三位
```

### 监听拖拽事件

```javascript
const container = document.querySelector('skill-sortable-container');

container.addEventListener('skill-sortable-start', (event) => {
  console.log('开始拖拽:', event.detail.item);
});

container.addEventListener('skill-sortable-move', (event) => {
  console.log('拖拽到位置:', event.detail.index);
});

container.addEventListener('skill-sortable-change', (event) => {
  console.log('顺序变化:', {
    from: event.detail.index,
    to: event.detail.newIndex,
    item: event.detail.item
  });
});
```

### 状态持久化

```html
<skill-sortable-container
  .config="${{
    persistState: true,
    storageKey: 'my-app-sort-order'
  }}"
>
  <!-- 排序状态将自动保存和恢复 -->
</skill-sortable-container>
```

## 使用场景

### 1. 任务看板
```html
<skill-sortable-container
  .config="${{ layout: 'cards', handle: true, animation: true }}"
>
  <div slot="item" data-id="1" data-weight="1">
    <div class="task-card">
      <h4>完成项目文档</h4>
      <p>需要完成API文档编写</p>
      <div class="task-meta">
        <span class="priority high">高优先级</span>
      </div>
    </div>
  </div>
</skill-sortable-container>
```

### 2. 图片库排序
```html
<skill-sortable-container
  .config="${{ layout: 'grid', spacing: 'tight' }}"
>
  <div slot="item" data-id="1">
    <div class="image-item">
      <img src="image1.jpg" alt="图片1">
    </div>
  </div>
  <div slot="item" data-id="2">
    <div class="image-item">
      <img src="image2.jpg" alt="图片2">
    </div>
  </div>
</skill-sortable-container>
```

### 3. 导航菜单排序
```html
<skill-sortable-container
  .config="${{
    layout: 'list',
    handle: true,
    persistState: true
  }}"
>
  <div slot="item" data-id="home">
    <span class="menu-icon">🏠</span>
    <span class="menu-text">首页</span>
  </div>
  <div slot="item" data-id="products">
    <span class="menu-icon">📦</span>
    <span class="menu-text">产品</span>
  </div>
</skill-sortable-container>
```

### 4. 多阶段工作流
```html
<!-- 待办列 -->
<h3>待办</h3>
<skill-sortable-container
  .config="${{ group: 'workflow', layout: 'cards' }}"
>
  <div slot="item" data-id="task1" data-group="workflow">任务 1</div>
</skill-sortable-container>

<!-- 进行中列 -->
<h3>进行中</h3>
<skill-sortable-container
  .config="${{ group: 'workflow', layout: 'cards' }}"
>
  <div slot="item" data-id="task2" data-group="workflow">任务 2</div>
</skill-sortable-container>
```

## 注意事项

1. **性能优化**: 对于大量项目，建议启用虚拟滚动
2. **移动端**: 确保拖拽区域足够大以便触摸操作
3. **状态持久化**: 存储的内容会占用浏览器本地存储空间
4. **无障碍**: 组件已包含完整的 ARIA 属性，无需额外配置
5. **跨容器拖拽**: 确保容器间使用相同的 `group` 值

## 浏览器支持

- Chrome ≥ 67
- Firefox ≥ 63
- Safari ≥ 13.1
- Edge ≥ 79

## 更新日志

### v1.0.0
- 🎉 初始版本发布
- ✨ 支持三种布局模式（list/grid/cards）
- ✨ 支持垂直/水平/双向拖拽
- ✨ 支持拖拽手柄和整项拖拽
- ✨ 支持跨容器拖拽
- ✨ 支持状态持久化
- ✨ 支持自动滚动
- ♿ 完整的无障碍支持