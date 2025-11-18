#!/bin/bash

echo "🚀 启动 Skill UI Components Demo"
echo "================================"

# 检查是否安装了依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

# 启动开发服务器
echo "🔄 启动开发服务器..."
npm run dev

echo ""
echo "✅ Demo 准备完成！"
echo "📖 主要页面: http://localhost:5173/"
echo "🎮 Button 交互式 Demo: http://localhost:5173/demo/button-demo.html"
echo ""
echo "💡 提示: 确保 Skill UI 组件库已正确构建"