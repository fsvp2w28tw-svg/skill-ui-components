# Skill UI Components Demo

这是 Skill UI Components 组件库的交互式演示页面。

## 📁 文件结构

```
demo/
├── button-demo.html    # Button 组件交互式 Demo
├── start.sh           # Demo 启动脚本
└── README.md          # 说明文档
```

## 🚀 快速开始

### 方法一：使用启动脚本

```bash
cd demo
./start.sh
```

### 方法二：手动启动

1. 确保已安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 访问 Demo 页面：
   - 主页: http://localhost:5173/
   - Button 交互式 Demo: http://localhost:5173/demo/button-demo.html

## 🎮 Button 交互式 Demo 功能

### ⚙️ 配置选项
- **内容文本**: 自定义按钮显示文本
- **变体选择**: 12种按钮样式（primary, secondary, ghost, text, success, danger, outline, soft, gradient, link, warning, info）
- **尺寸选择**: 6种尺寸（xs, sm, md, lg, xl, 2xl）
- **形状选择**: 4种形状（默认、square、rounded、pill、circle）
- **徽章文本**: 设置按钮徽章内容
- **工具提示**: 设置悬停提示文本

### 🎛️ 开关选项
- **加载中**: 显示加载动画
- **禁用**: 禁用按钮交互
- **全宽**: 按钮占满容器宽度
- **发光效果**: 添加发光特效
- **3D效果**: 添加3D立体效果

### 👀 实时预览
- 实时显示配置的按钮效果
- 支持交互事件监听（点击、聚焦、失焦）
- 事件日志记录用户操作

### 📝 代码生成
- 自动生成 HTML 代码
- 一键复制功能
- 语法高亮显示

### 🎨 快速预设
提供8种常用按钮样式预设：
- 主要按钮
- 危险按钮
- 幽灵按钮
- 加载按钮
- 发光按钮
- 带徽章
- 圆形按钮
- 全宽按钮

## 🛠️ 技术特点

- **React 18**: 使用现代 React hooks 进行状态管理
- **Web Components**: 原生支持 `<skill-button>` 标签
- **TypeScript**: 完整的类型支持
- **响应式设计**: 适配移动端和桌面端
- **实时交互**: 配置即时生效

## 📋 使用示例

### 基础用法

```html
<skill-button variant="primary" size="md">点击我</skill-button>
```

### 高级用法

```html
<skill-button
  variant="gradient"
  size="lg"
  badge="5"
  tooltip="点击查看详情"
  glow
  onSkillClick="handleClick">
  高级按钮
</skill-button>
```

## 🔧 开发说明

Demo 页面基于以下技术构建：
- **Lit**: 组件库底层框架
- **React**: Demo 界面框架
- **Vite**: 开发服务器
- **Babel Standalone**: 浏览器端 JSX 转换

## 📞 反馈与建议

如果您在使用过程中遇到问题或有改进建议，请：
1. 查看控制台错误信息
2. 确保组件库已正确构建
3. 检查浏览器兼容性

---

**Skill UI Components Team** 🎨