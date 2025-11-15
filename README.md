# Skill UI Components

基于 Web Components 的跨框架 UI 组件库，使用 Lit 框架构建。

## 特性

- 🌐 **跨框架兼容**: 支持 React、Vue、Angular、Svelte 和原生 JavaScript
- 🎨 **设计系统**: 完整的设计令牌和主题系统
- 📱 **响应式**: 移动优先的响应式设计
- ♿ **无障碍**: 完整的 ARIA 支持和键盘导航
- 🔧 **TypeScript**: 完整的 TypeScript 类型支持
- 🌙 **主题**: 内置深色/浅色主题切换
- 📦 **模块化**: 支持 tree-shaking 的按需加载

## 安装

### 作为 npm 依赖使用

1. 将组件库复制到你的项目中或发布到 npm registry

```bash
# 如果发布到 npm
npm install @skill/ui-components

# 或者本地使用
cp /path/to/skill-ui-components ./node_modules/@skill/ui-components
```

2. 在你的项目中导入：

```javascript
// ES modules
import '@skill/ui-components';

// 或者 UMD
import './node_modules/@skill/ui-components/dist/skill-ui.umd.js';
```

## 使用方法

### 基础使用

```html
<!DOCTYPE html>
<html>
<head>
  <title>Skill UI Components Demo</title>
</head>
<body>
  <skill-button variant="primary">主要按钮</skill-button>
  <skill-input placeholder="请输入内容" label="输入框"></skill-input>
  <skill-card>
    <div slot="header">卡片标题</div>
    <div slot="content">卡片内容</div>
  </skill-card>

  <script type="module">
    import '@skill/ui-components';
  </script>
</body>
</html>
```

### React 中使用

```jsx
import React from 'react';
import '@skill/ui-components';

function App() {
  return (
    <div>
      <skill-button variant="primary" onClick={handleClick}>
        React Button
      </skill-button>

      <skill-input
        placeholder="输入内容"
        onSkill-change={(e) => console.log(e.detail.value)}
      />
    </div>
  );
}
```

### Vue 中使用

```vue
<template>
  <div>
    <skill-button variant="primary" @skill-click="handleClick">
      Vue Button
    </skill-button>

    <skill-input
      placeholder="输入内容"
      @skill-change="handleChange"
    />
  </div>
</template>

<script>
import '@skill/ui-components';

export default {
  methods: {
    handleClick(event) {
      console.log('Button clicked', event.detail);
    },
    handleChange(event) {
      console.log('Input changed', event.detail.value);
    }
  }
};
</script>
```

### Angular 中使用

```typescript
// app.module.ts
import '@skill/ui-components';

// component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <skill-button variant="primary" (skill-click)="handleClick($event)">
      Angular Button
    </skill-button>

    <skill-input
      #skillInput
      placeholder="输入内容"
      (skill-change)="handleChange($event)"
    />
  `
})
export class AppComponent {
  @ViewChild('skillInput') skillInput: ElementRef;

  handleClick(event: CustomEvent) {
    console.log('Button clicked', event.detail);
  }

  handleChange(event: CustomEvent) {
    console.log('Input changed', event.detail.value);
  }
}
```

## 可用组件

### Atoms（原子组件）

- **skill-button**: 按钮组件
- **skill-input**: 输入框组件
- **skill-card**: 卡片组件
- **skill-avatar**: 头像组件
- **skill-icon**: 图标组件
- **skill-spinner**: 加载动画
- **skill-checkbox**: 复选框
- **skill-radio**: 单选框
- **skill-switch**: 开关
- **skill-textarea**: 文本域
- **skill-divider**: 分割线
- **skill-image**: 图片组件
- **skill-link**: 链接组件
- **skill-progress**: 进度条
- **skill-slider**: 滑块
- **skill-tooltip**: 工具提示
- **skill-skeleton**: 骨架屏
- **skill-empty**: 空状态
- **skill-back-top**: 回到顶部

### Molecules（分子组件）

- **skill-form-field**: 表单字段
- **skill-button-group**: 按钮组
- **skill-tabs**: 选项卡
- **skill-dropdown**: 下拉菜单
- **skill-modal**: 模态框
- **skill-rating**: 评分组件
- **skill-pagination**: 分页
- **skill-breadcrumb**: 面包屑
- **skill-steps**: 步骤条
- **skill-timeline**: 时间线
- **skill-carousel**: 轮播图
- **skill-tree-view**: 树形视图
- **skill-data-table**: 数据表格
- **skill-form-builder**: 表单构建器
- **skill-search-box**: 搜索框
- **skill-sidebar**: 侧边栏
- **skill-toolbar**: 工具栏
- **skill-menu**: 菜单
- **skill-select**: 选择器
- **skill-datepicker**: 日期选择器
- **skill-color-picker**: 颜色选择器
- **skill-file-upload**: 文件上传
- **skill-image-gallery**: 图片画廊
- **skill-user-profile**: 用户资料
- **skill-stat-card**: 统计卡片
- **skill-page-section**: 页面区块
- **skill-card-section**: 卡片区块
- **skill-input-group**: 输入框组
- **skill-input-stepper**: 步进器
- **skill-list-item**: 列表项
- **skill-menu-item**: 菜单项
- **skill-suggestion-input**: 建议输入框
- **skill-validation-summary**: 验证摘要

### Organisms（有机体组件）

- **skill-layout**: 布局组件
- **skill-grid**: 网格组件
- **skill-accordion**: 手风琴
- **skill-virtual-list**: 虚拟列表

## 主题定制

### CSS 变量

组件库使用 CSS 变量进行主题定制：

```css
:root {
  /* 主色调 */
  --skill-color-primary: #1890ff;
  --skill-color-success: #52c41a;
  --skill-color-warning: #faad14;
  --skill-color-danger: #f5222d;

  /* 字体 */
  --skill-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  --skill-font-size-sm: 12px;
  --skill-font-size-md: 14px;
  --skill-font-size-lg: 16px;

  /* 间距 */
  --skill-spacing-xs: 4px;
  --skill-spacing-sm: 8px;
  --skill-spacing-md: 16px;
  --skill-spacing-lg: 24px;

  /* 圆角 */
  --skill-border-radius-sm: 2px;
  --skill-border-radius-md: 6px;
  --skill-border-radius-lg: 8px;
}
```

### 深色主题

```css
[data-theme="dark"] {
  --skill-color-bg: #141414;
  --skill-color-text: #fff;
  --skill-color-border: #434343;
}
```

## 事件系统

组件使用 CustomEvent API 进行事件通信：

```javascript
// 监听事件
document.querySelector('skill-button').addEventListener('skill-click', (event) => {
  console.log('按钮被点击', event.detail);
});

// 在 React 中
<skill-button onSkillClick={handleClick}>Click me</skill-button>

// 在 Vue 中
<skill-button @skill-click="handleClick">Click me</skill-button>
```

## 开发

### 本地开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 类型检查
npm run type-check

# 测试
npm run test
```

### 项目结构

```
skill-ui-components/
├── src/
│   ├── components/          # 组件源码
│   │   ├── atoms/          # 原子组件
│   │   ├── molecules/      # 分子组件
│   │   └── organisms/      # 有机体组件
│   ├── styles/             # 样式系统
│   │   ├── mixins/         # 样式混入
│   │   ├── tokens.ts       # 设计令牌
│   │   └── base.ts         # 基础样式
│   ├── utils/              # 工具函数
│   ├── types/              # 类型定义
│   └── index.ts            # 主入口
├── dist/                   # 构建输出
├── test/                   # 测试文件
└── package.json
```

## License

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意**: 这是一个基于 Web Components 的组件库，可以在任何现代浏览器中运行，无需额外的框架依赖。