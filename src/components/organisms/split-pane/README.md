# skill-split-pane

可调整大小的分割面板组件，支持水平/垂直分割、拖拽调整大小、面板折叠等功能。

## 特性

- 🔄 **双向支持** - 支持水平和垂直分割
- 🖱️ **拖拽调整** - 流畅的拖拽调整大小体验
- 📱 **响应式** - 适配移动端和桌面端
- 💾 **状态持久化** - 可选的本地存储支持
- 🎨 **主题支持** - 支持亮色/暗色主题
- ♿ **无障碍** - 完整的键盘和屏幕阅读器支持
- 🔧 **高度可配置** - 丰富的配置选项

## 基本用法

```html
<!-- 基本水平分割 -->
<skill-split-pane direction="horizontal">
  <div slot="first">左侧面板</div>
  <div slot="second">右侧面板</div>
</skill-split-pane>

<!-- 基本垂直分割 -->
<skill-split-pane direction="vertical">
  <div slot="first">上方面板</div>
  <div slot="second">下方面板</div>
</skill-split-pane>
```

## 高级配置

```html
<skill-split-pane
  direction="horizontal"
  .config="${{
    defaultSizes: [30, 70],
    minSizes: [20, 30],
    maxSizes: [60, 80],
    resizerStyle: 'handle',
    collapsible: true,
    resizerSize: 8,
    persistState: true,
    storageKey: 'my-layout'
  }}"
  @skill-split-pane-change="${handleChange}"
>
  <div slot="first">
    <h3>侧边栏</h3>
    <p>这里可以放置导航菜单或侧边栏内容</p>
  </div>
  <div slot="second">
    <h3>主内容区</h3>
    <p>这里是主要内容区域</p>
  </div>
</skill-split-pane>
```

## API

### 配置选项 (SplitPaneConfig)

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | 分割方向 |
| `defaultSizes` | `[number, number]` | `[50, 50]` | 默认尺寸比例 |
| `minSizes` | `[number \| string, number \| string]` | `[10, 10]` | 最小尺寸（百分比或像素） |
| `maxSizes` | `[number \| string, number \| string]` | `[90, 90]` | 最大尺寸（百分比或像素） |
| `resizerStyle` | `'thin' \| 'thick' \| 'handle'` | `'thin'` | 分割器样式 |
| `collapsible` | `boolean` | `false` | 是否可折叠面板 |
| `resizerSize` | `number` | `8` | 分割器大小（像素） |
| `resizable` | `boolean` | `true` | 是否可拖拽调整大小 |
| `persistState` | `boolean` | `false` | 是否保存状态到本地存储 |
| `storageKey` | `string` | `'skill-split-pane-state'` | 本地存储键名 |

### 主题属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `theme` | `'light' \| 'dark' \| 'auto'` | `'light'` | 主题模式 |

### 插槽 (Slots)

| 名称 | 描述 |
|------|------|
| `first` | 第一个面板内容 |
| `second` | 第二个面板内容 |

### CSS Parts

| 名称 | 描述 |
|------|------|
| `container` | 分割面板容器 |
| `pane-first` | 第一个面板 |
| `pane-second` | 第二个面板 |
| `resizer` | 分割器 |
| `resizer-handle` | 分割器手柄（仅 handle 样式） |
| `collapse-first` | 折叠第一个面板按钮 |
| `collapse-second` | 折叠第二个面板按钮 |

### 事件 (Events)

| 事件名称 | 描述 | 事件详情 |
|----------|------|----------|
| `skill-split-pane-change` | 尺寸变化时触发 | `{ type, sizes, collapsed }` |
| `skill-split-pane-collapse` | 面板折叠/展开时触发 | `{ type, sizes, collapsed }` |

### 公共方法

| 方法 | 参数 | 描述 |
|------|------|------|
| `getState()` | - | 获取当前状态 |
| `setSizes(sizes)` | `[number, number]` | 设置面板尺寸 |
| `collapsePane(pane)` | `'first' \| 'second' \| null` | 折叠/展开指定面板 |
| `reset()` | - | 重置到默认状态 |

## 样式定制

### CSS 变量

```css
skill-split-pane {
  --skill-split-pane-resizer-bg: #e0e0e0;
  --skill-split-pane-resizer-hover-bg: #1890ff;
  --skill-split-pane-resizer-active-bg: #096dd9;
  --skill-split-pane-resizer-size: 8px;
  --skill-split-pane-transition: all 0.3s ease;
}
```

### 示例：自定义分割器样式

```html
<skill-split-pane style="--skill-split-pane-resizer-bg: #1890ff;">
  <!-- 内容 -->
</skill-split-pane>
```

## 使用场景

### 1. 文件管理器

```html
<skill-split-pane
  direction="horizontal"
  .config="${{
    defaultSizes: [25, 75],
    resizerStyle: 'thick',
    collapsible: true
  }}"
>
  <div slot="first">
    <!-- 文件树 -->
  </div>
  <div slot="second">
    <!-- 文件内容 -->
  </div>
</skill-split-pane>
```

### 2. IDE 布局

```html
<skill-split-pane direction="vertical" .config="${{ defaultSizes: [60, 40] }}">
  <div slot="first">
    <!-- 编辑器区域 -->
  </div>
  <div slot="second">
    <!-- 控制台/终端 -->
  </div>
</skill-split-pane>
```

### 3. 管理后台

```html
<skill-split-pane
  direction="horizontal"
  .config="${{
    defaultSizes: [20, 80],
    collapsible: true,
    persistState: true
  }}"
>
  <div slot="first">
    <!-- 导航菜单 -->
  </div>
  <div slot="second">
    <!-- 主内容区 -->
  </div>
</skill-split-pane>
```

## 注意事项

1. **性能优化**: 对于大量内容的面板，建议使用虚拟滚动
2. **移动端**: 在移动设备上建议增加分割器大小以便操作
3. **状态持久化**: 存储的内容会占用浏览器本地存储空间
4. **嵌套使用**: 可以嵌套多个 split-pane 创建复杂布局

## 浏览器支持

- Chrome ≥ 67
- Firefox ≥ 63
- Safari ≥ 13.1
- Edge ≥ 79

## 更新日志

### v1.0.0
- 🎉 初始版本发布
- ✨ 支持水平和垂直分割
- ✨ 支持拖拽调整大小
- ✨ 支持面板折叠
- ✨ 支持状态持久化
- ✨ 支持主题切换
- ♿ 完整的无障碍支持