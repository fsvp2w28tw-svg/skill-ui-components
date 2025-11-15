# skill-tabs-panel

通用的标签页容器系统，支持多种样式、拖拽排序、懒加载、状态持久化等功能。

## 特性

- 🏷️ **多位置标签** - 支持上/下/左/右四个方向
- 🎨 **多样式** - 线条/卡片/胶囊/分割等风格
- 🔄 **可拖拽排序** - 标签页可拖拽重排
- ❌ **可关闭标签** - 支持单个或全部关闭
- 💾 **懒加载内容** - 内容按需渲染
- 📱 **响应式溢出** - 滚动/下拉菜单处理
- ⌨️ **键盘快捷键** - 完整的键盘操作支持
- 🎯 **状态持久化** - 本地存储支持
- ♿ **无障碍** - 完整的 ARIA 支持

## 基本用法

```html
<!-- 基本标签页 -->
<skill-tabs-panel>
  <div slot="tab" data-title="标签1">内容1</div>
  <div slot="tab" data-title="标签2">内容2</div>
  <div slot="tab" data-title="标签3">内容3</div>
</skill-tabs-panel>

<!-- 卡片样式，可关闭 -->
<skill-tabs-panel
  .config="${{ variant: 'card', closable: true }}"
  @skill-tabs-close="${handleClose}"
>
  <div slot="tab" data-title="文档">文档内容</div>
  <div slot="tab" data-title="项目">项目内容</div>
  <div slot="tab" data-title="设置" data-closable="false">设置内容</div>
</skill-tabs-panel>
```

## 高级配置

```html
<skill-tabs-panel
  .config="${{
    position: 'top',
    variant: 'line',
    size: 'medium',
    draggable: true,
    closable: true,
    addable: true,
    lazyLoad: true,
    persistState: true,
    showKeyboardHints: true,
    overflow: 'dropdown'
  }}"
  @skill-tabs-change="${handleChange}"
  @skill-tabs-reorder="${handleReorder}"
  @skill-tabs-add="${handleAdd}"
>
  <div slot="tab" data-title="首页" data-icon="🏠" data-badge="5">
    首页内容
  </div>
  <div slot="tab" data-title="消息" data-icon="💬" data-badge="12">
    消息内容
  </div>
  <div slot="tab" data-title="设置" data-icon="⚙️" data-closable="false">
    设置内容
  </div>
  <div slot="tab" data-title="关于" data-lazy="true" data-content="https://example.com/about">
    关于内容（懒加载）
  </div>
</skill-tabs-panel>
```

## API

### 配置选项 (TabsConfig)

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | 标��页位置 |
| `variant` | `'line' \| 'card' \| 'pills' \| 'segmented'` | `'line'` | 标签页样式类型 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 标签页大小 |
| `draggable` | `boolean` | `false` | 是否可拖拽排序 |
| `closable` | `boolean` | `false` | 是否可关闭标签页 |
| `addable` | `boolean` | `false` | 是否显示添加按钮 |
| `lazyLoad` | `boolean` | `false` | 是否启用懒加载 |
| `overflow` | `'scroll' \| 'dropdown' \| 'responsive' \| 'hidden'` | `'scroll'` | 溢出处理方式 |
| `minTabWidth` | `number` | `80` | 标签页最小宽度（像素） |
| `maxTabWidth` | `number` | `200` | 标签页最大宽度（像素） |
| `persistState` | `boolean` | `false` | 是否保持标签页状态 |
| `storageKey` | `string` | `'skill-tabs-state'` | 本地存储键名 |
| `showKeyboardHints` | `boolean` | `false` | 是否显示快捷键提示 |
| `animationDuration` | `number` | `300` | 动画持续时间（毫秒） |

### 主题属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `theme` | `'light' \| 'dark' \| 'auto'` | `'light'` | 主题模式 |

### 标签页数据属性

使用 `slot="tab"` 的元素可以设置以下数据属性：

| 属性 | 类型 | 描述 |
|------|------|------|
| `data-title` | `string` | 标签页标题（必需） |
| `data-id` | `string` | 标签页唯一标识 |
| `data-closable` | `boolean` | 是否可关闭（默认 true） |
| `data-disabled` | `boolean` | 是否禁用 |
| `data-icon` | `string` | 标签页图标 |
| `data-badge` | `string \| number` | 徽章文本 |
| `data-tooltip` | `string` | 工具提示 |
| `data-lazy` | `boolean` | 是否懒加载 |
| `data-content` | `string` | 懒加载内容 URL |

### CSS Parts

| 名称 | 描述 |
|------|------|
| `container` | 标签页容器 |
| `header` | 标签页头部 |
| `nav` | 标签页导航 |
| `list` | 标签页列表 |
| `tab` | 标签页项 |
| `tab-active` | 激活的标签页 |
| `tab-close` | 关闭按钮 |
| `tab-add` | 添加按钮 |
| `content` | 内容区域 |
| `panel` | 内容面板 |

### 事件 (Events)

| 事件名称 | 描述 | 事件详情 |
|----------|------|----------|
| `skill-tabs-change` | 标签页切换时触发 | `{ type, tabId, tab, data }` |
| `skill-tabs-close` | 关闭标签页时触发 | `{ type, tabId, tab, data }` |
| `skill-tabs-add` | 添加标签页时触发 | `{ type, tabId, tab, data }` |
| `skill-tabs-reorder` | 标签页重排时触发 | `{ type, tabId, tab, index, newIndex, data }` |

### 公共方法

| 方法 | 参数 | 描述 |
|------|------|------|
| `getState()` | - | 获取当前状态 |
| `addTab(tab)` | `TabItem` | 添加标签页 |
| `removeTab(tabId)` | `string` | 移除标签页 |
| `activateTab(tabId)` | `string` | 激活指定标签页 |
| `getTabs()` | - | 获取所有标签页 |
| `getActiveTab()` | - | 获取当前激活的标签页 |
| `reset()` | - | 重置到初始状态 |

### 键盘快捷键

当 `showKeyboardHints: true` 时，支持以下快捷键：

| 快捷键 | 描述 |
|--------|------|
| `Ctrl + ←` | 切换到上一个标签页 |
| `Ctrl + →` | 切换到下一个标签页 |
| `Ctrl + W` | 关闭当前标签页 |
| `Ctrl + T` | 添加新标签页 |

## 样式变体

### 线条样式 (Line)
```html
<skill-tabs-panel .config="${{ variant: 'line' }}">
  <!-- 标签页 -->
</skill-tabs-panel>
```

### 卡片样式 (Card)
```html
<skill-tabs-panel .config="${{ variant: 'card', closable: true }}">
  <!-- 标签页 -->
</skill-tabs-panel>
```

### 胶囊样式 (Pills)
```html
<skill-tabs-panel .config="${{ variant: 'pills' }}">
  <!-- 标签页 -->
</skill-tabs-panel>
```

### 分段样式 (Segmented)
```html
<skill-tabs-panel .config="${{ variant: 'segmented' }}">
  <!-- 标签页 -->
</skill-tabs-panel>
```

## 位置变体

### 顶部标签页 (默认)
```html
<skill-tabs-panel .config="${{ position: 'top' }}">
  <!-- 标签页 -->
</skill-tabs-panel>
```

### 底部标签页
```html
<skill-tabs-panel .config="${{ position: 'bottom' }}">
  <!-- 标签页 -->
</skill-tabs-panel>
```

### 左侧标签页
```html
<skill-tabs-panel .config="${{ position: 'left' }}">
  <!-- 标签页 -->
</skill-tabs-panel>
```

### 右侧标签页
```html
<skill-tabs-panel .config="${{ position: 'right' }}">
  <!-- 标签页 -->
</skill-tabs-panel>
```

## 样式定制

### CSS 变量

```css
skill-tabs-panel {
  --skill-tabs-bg: #ffffff;
  --skill-tabs-border-color: #e0e0e0;
  --skill-tabs-text-color: #666666;
  --skill-tabs-text-active-color: #1890ff;
  --skill-tabs-indicator-color: #1890ff;
  --skill-tabs-gap: 4px;
  --skill-tabs-padding: 16px;
  --skill-tabs-transition: all 0.3s ease;
}
```

### 示例：自定义标签页颜色

```html
<skill-tabs-panel style="--skill-tabs-indicator-color: #52c41a;">
  <!-- 标签页 -->
</skill-tabs-panel>
```

## 高级用法

### 动态添加标签页

```javascript
const tabsPanel = document.querySelector('skill-tabs-panel');

// 添加新标签页
tabsPanel.addTab({
  id: 'new-tab',
  title: '新标签页',
  content: '<div>新标签页内容</div>',
  closable: true,
  icon: '📝'
});

// 监听标签页变化
tabsPanel.addEventListener('skill-tabs-change', (event) => {
  console.log('当前标签页:', event.detail.tab);
});
```

### 懒加载内容

```html
<skill-tabs-panel .config="${{ lazyLoad: true }}">
  <div slot="tab"
       data-title="远程内容"
       data-lazy="true"
       data-content="https://api.example.com/content">
    内容将在激活时加载
  </div>
</skill-tabs-panel>
```

### 状态持久化

```html
<skill-tabs-panel
  .config="${{
    persistState: true,
    storageKey: 'my-app-tabs'
  }}"
>
  <!-- 标签页状态将自动保存和恢复 -->
</skill-tabs-panel>
```

## 使用场景

### 1. 代码编辑器
```html
<skill-tabs-panel
  .config="${{
    position: 'top',
    variant: 'card',
    closable: true,
    draggable: true,
    persistState: true
  }}"
>
  <div slot="tab" data-title="index.js">index.js 内容</div>
  <div slot="tab" data-title="style.css">style.css 内容</div>
  <div slot="tab" data-title="app.ts">app.ts 内容</div>
</skill-tabs-panel>
```

### 2. 设置面板
```html
<skill-tabs-panel
  .config="${{
    position: 'left',
    variant: 'pills',
    size: 'large'
  }}"
>
  <div slot="tab" data-title="常规" data-icon="⚙️">常规设置</div>
  <div slot="tab" data-title="账户" data-icon="👤">账户设置</div>
  <div slot="tab" data-title="安全" data-icon="🔒">安全设置</div>
</skill-tabs-panel>
```

### 3. 数据仪表板
```html
<skill-tabs-panel
  .config="${{
    position: 'top',
    variant: 'segmented',
    addable: true,
    showKeyboardHints: true
  }}"
>
  <div slot="tab" data-title="概览" data-badge="📊">
    仪表板概览
  </div>
  <div slot="tab" data-title="分析" data-badge="📈">
    数据分析
  </div>
  <div slot="tab" data-title="报告" data-badge="📄">
    报告页面
  </div>
</skill-tabs-panel>
```

## 注意事项

1. **性能优化**: 对于大量标签页，建议启用懒加载
2. **移动端**: 在移动设备上建议使用较大的标签页尺寸
3. **状态持久化**: 存储的内容会占用浏览器本地存储空间
4. **无障碍**: 组件已包含完整的 ARIA 属性，无需额外配置
5. **内容安全**: 懒加载内容时注意跨域和安全策略

## 浏览器支持

- Chrome ≥ 67
- Firefox ≥ 63
- Safari ≥ 13.1
- Edge ≥ 79

## 更新日志

### v1.0.0
- 🎉 初始版本发布
- ✨ 支持四个位置方向
- ✨ 支持四种样式变体
- ✨ 支持拖拽排序
- ✨ 支持懒加载内容
- ✨ 支持状态持久化
- ✨ 支持键盘快捷键
- ♿ 完整的无障碍支持