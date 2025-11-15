# Sidebar 组件使用示例

## 基础用法

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="/dist/skill-ui-components.js"></script>
</head>
<body>
  <skill-sidebar id="mySidebar"></skill-sidebar>

  <script>
    // 侧边栏配置
    const sidebarConfig = {
      logo: {
        image: '/logo.png',
        text: 'Admin Panel',
        link: '/'
      },
      items: [
        {
          key: 'dashboard',
          label: '仪表板',
          icon: 'dashboard',
          path: '/dashboard',
          active: true
        },
        {
          key: 'users',
          label: '用户管理',
          icon: 'users',
          path: '/users',
          badge: 12
        },
        {
          key: 'settings',
          label: '系统设置',
          icon: 'settings',
          path: '/settings'
        }
      ]
    };

    // 设置侧边栏配置
    document.getElementById('mySidebar').config = sidebarConfig;
  </script>
</body>
</html>
```

## 分组菜单

```javascript
const groupedSidebarConfig = {
  logo: {
    text: '管理系统',
    image: '/logo.png'
  },
  groups: [
    {
      key: 'main',
      title: '主要功能',
      icon: 'menu',
      collapsible: true,
      collapsed: false,
      items: [
        {
          key: 'dashboard',
          label: '仪表板',
          icon: 'dashboard',
          path: '/dashboard'
        },
        {
          key: 'analytics',
          label: '数据分析',
          icon: 'chart',
          path: '/analytics'
        }
      ]
    },
    {
      key: 'management',
      title: '管理功能',
      icon: 'management',
      collapsible: true,
      collapsed: false,
      items: [
        {
          key: 'users',
          label: '用户管理',
          icon: 'users',
          path: '/users'
        },
        {
          key: 'roles',
          label: '角色管理',
          icon: 'role',
          path: '/roles'
        },
        {
          key: 'permissions',
          label: '权限管理',
          icon: 'permission',
          path: '/permissions'
        }
      ]
    },
    {
      key: 'system',
      title: '系统设置',
      icon: 'system',
      items: [
        {
          key: 'settings',
          label: '系统设置',
          icon: 'settings',
          path: '/settings'
        },
        {
          key: 'logs',
          label: '系统日志',
          icon: 'log',
          path: '/logs'
        }
      ]
    }
  ]
};
```

## 多级菜单

```javascript
const nestedSidebarConfig = {
  logo: {
    text: '应用系统',
    image: '/logo.png'
  },
  items: [
    {
      key: 'products',
      label: '产品管理',
      icon: 'product',
      children: [
        {
          key: 'product-list',
          label: '产品列表',
          icon: 'list',
          path: '/products'
        },
        {
          key: 'product-categories',
          label: '产品分类',
          icon: 'category',
          path: '/products/categories'
        },
        {
          key: 'product-attributes',
          label: '产品属性',
          icon: 'attribute',
          path: '/products/attributes'
        }
      ]
    },
    {
      key: 'orders',
      label: '订单管理',
      icon: 'order',
      children: [
        {
          key: 'order-list',
          label: '订单列表',
          icon: 'list',
          path: '/orders'
        },
        {
          key: 'order-analytics',
          label: '订单分析',
          icon: 'chart',
          path: '/orders/analytics'
        }
      ]
    },
    {
      key: 'customers',
      label: '客户管理',
      icon: 'customer',
      path: '/customers'
    }
  ]
};
```

## 可折叠侧边栏

```javascript
const collapsibleSidebarConfig = {
  logo: {
    image: '/logo.png',
    text: 'Admin Panel',
    collapsed: false // 折叠时隐藏文字
  },
  collapsible: true, // 显示折叠按钮
  collapsed: false, // 初始折叠状态
  items: [
    {
      key: 'dashboard',
      label: '仪表板',
      icon: 'dashboard',
      path: '/dashboard'
    },
    {
      key: 'users',
      label: '用户管理',
      icon: 'users',
      path: '/users'
    }
  ]
};

// 监听折叠事件
document.getElementById('mySidebar').addEventListener('collapse', (e) => {
  console.log('侧边栏状态:', e.detail.collapsed ? '折叠' : '展开');
});
```

## 搜索功能

```javascript
const searchableSidebarConfig = {
  logo: {
    text: '应用系统'
  },
  search: {
    enabled: true,
    placeholder: '搜索菜单...',
    filter: (items, query) => {
      // 自定义筛选逻辑
      return items.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.key.toLowerCase().includes(query.toLowerCase())
      );
    }
  },
  items: [
    {
      key: 'dashboard',
      label: '仪表板',
      icon: 'dashboard',
      path: '/dashboard'
    },
    {
      key: 'user-management',
      label: '用户管理',
      icon: 'users',
      path: '/users'
    },
    {
      key: 'system-settings',
      label: '系统设置',
      icon: 'settings',
      path: '/settings'
    }
  ]
};

// 监听搜索事件
document.getElementById('mySidebar').addEventListener('search', (e) => {
  console.log('搜索查询:', e.detail.query);
  console.log('搜索结果:', e.detail.data);
});
```

## 暗色主题

```javascript
const darkSidebarConfig = {
  theme: 'dark',
  logo: {
    text: 'Dark Mode',
    image: '/logo-dark.png'
  },
  items: [
    {
      key: 'dashboard',
      label: '仪表板',
      icon: 'dashboard',
      path: '/dashboard'
    },
    {
      key: 'analytics',
      label: '数据分析',
      icon: 'chart',
      path: '/analytics'
    }
  ]
};
```

## 自定义头部和底部

```javascript
const customSidebarConfig = {
  header: {
    title: '管理后台',
    subtitle: 'Version 2.0.1',
    actions: [
      {
        key: 'notification',
        icon: 'notification',
        onClick: () => showNotifications()
      },
      {
        key: 'help',
        icon: 'help',
        onClick: () => showHelp()
      }
    ]
  },
  items: [
    // ... 菜单项
  ],
  footer: {
    content: '© 2024 Your Company',
    actions: [
      {
        key: 'theme',
        icon: 'theme',
        onClick: () => toggleTheme()
      },
      {
        key: 'logout',
        icon: 'logout',
        onClick: () => logout()
      }
    ]
  }
};
```

## 徽章和动态徽章

```javascript
const badgeSidebarConfig = {
  logo: {
    text: '消息中心'
  },
  items: [
    {
      key: 'messages',
      label: '消息',
      icon: 'message',
      path: '/messages',
      badge: 5 // 静态徽章
    },
    {
      key: 'notifications',
      label: '通知',
      icon: 'notification',
      path: '/notifications' // 动态徽章在badges配置中
    },
    {
      key: 'tasks',
      label: '任务',
      icon: 'task',
      path: '/tasks',
      badge: 'New' // 文本徽章
    }
  ],
  badges: {
    // 动态徽章配置
    notifications: getCount('notifications'), // 从服务器获取
    tasks: getTaskCount()
  }
};

// 更新徽章数量
function updateBadges() {
  const sidebar = document.getElementById('mySidebar');
  sidebar.config = {
    ...sidebar.config,
    badges: {
      notifications: 12,
      tasks: 3
    }
  };
}
```

## 右侧侧边栏

```javascript
const rightSidebarConfig = {
  position: 'right',
  collapsible: true,
  items: [
    {
      key: 'chat',
      label: '在线聊天',
      icon: 'chat',
      path: '/chat'
    },
    {
      key: 'help',
      label: '帮助中心',
      icon: 'help',
      path: '/help'
    }
  ]
};
```

## 水平导航栏

```javascript
const horizontalSidebarConfig = {
  mode: 'horizontal',
  position: 'top',
  logo: {
    text: 'Navigation',
    image: '/logo.png'
  },
  items: [
    {
      key: 'home',
      label: '首页',
      icon: 'home',
      path: '/'
    },
    {
      key: 'products',
      label: '产品',
      icon: 'product',
      children: [
        {
          key: 'electronics',
          label: '电子产品',
          path: '/products/electronics'
        },
        {
          key: 'clothing',
          label: '服装',
          path: '/products/clothing'
        }
      ]
    },
    {
      key: 'about',
      label: '关于我们',
      icon: 'info',
      path: '/about'
    }
  ]
};
```

## 事件处理

```javascript
const sidebar = document.getElementById('mySidebar');

// 菜单选择事件
sidebar.addEventListener('select', (e) => {
  console.log('选中菜单:', e.detail.item);
  console.log('菜单键值:', e.detail.key);

  // 自定义导航逻辑
  const item = e.detail.item;
  if (item.component) {
    // 动态加载组件
    loadComponent(item.component, item.props);
  }
});

// 点击前事件
sidebar.addEventListener('before-click', (e) => {
  const item = e.detail.item;

  // 权限检查
  if (!hasPermission(item.key)) {
    e.preventDefault();
    showMessage('您没有权限访问此功能');
    return false;
  }

  // 确认对话框
  if (item.key === 'dangerous-action') {
    return confirm('确定要执行此危险操作吗？');
  }
});

// 菜单点击事件
sidebar.addEventListener('menu-click', (e) => {
  console.log('菜单被点击:', e.detail.item);

  // 统计埋点
  trackEvent('menu_click', {
    menu_key: e.detail.key,
    menu_label: e.detail.item.label
  });
});
```

## 编程式API

```javascript
const sidebar = document.getElementById('mySidebar');

// 设置激活菜单
sidebar.setActiveKey('dashboard');

// 设置多个激活菜单
sidebar.setActiveKey(['dashboard', 'analytics']);

// 设置展开的菜单组
sidebar.setOpenKeys(['main', 'management']);

// 折叠/展开侧边栏
sidebar.setCollapsed(true);
sidebar.setCollapsed(false);

// 切换折叠状态
sidebar.toggleCollapse();

// 更新配置
sidebar.config = {
  ...sidebar.config,
  items: newItems,
  badges: {
    notifications: newNotificationCount
  }
};

// 获取当前状态
console.log(sidebar.state.collapsed);
console.log(sidebar.state.activeKeys);
console.log(sidebar.state.openKeys);
```

## 响应式设计

```css
/* 自定义响应式断点 */
@media (max-width: 768px) {
  skill-sidebar {
    --sidebar-width: 100%;
  }
}

/* 移动端遮罩层样式 */
.sidebar-overlay {
  background: rgba(0, 0, 0, 0.3);
}

/* 自定义移动端按钮 */
.mobile-menu-toggle {
  display: none;
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: block;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1001;
  }
}
```

## 样式定制

```css
/* 自定义主题变量 */
skill-sidebar {
  --sidebar-width: 300px;
  --sidebar-collapsed-width: 80px;
  --sidebar-bg: #2c3e50;
  --sidebar-text: #ecf0f1;
  --sidebar-active: #3498db;
  --sidebar-hover: #34495e;
}

/* 自定义菜单项样式 */
skill-sidebar::part(menu-item) {
  border-radius: 8px;
  margin: 4px 8px;
}

skill-sidebar::part(menu-item-active) {
  background: linear-gradient(45deg, #3498db, #2980b9);
}

/* 自定义徽章样式 */
skill-sidebar::part(menu-item-badge) {
  background: #e74c3c;
  border-radius: 12px;
  font-weight: bold;
}

/* 动画效果 */
skill-sidebar::part(menu-item) {
  transition: all 0.3s ease;
}

skill-sidebar::part(menu-item):hover {
  transform: translateX(4px);
}
```

## 高级用法：动态菜单

```javascript
// 异步加载菜单数据
async function loadMenuData() {
  try {
    const response = await fetch('/api/menu');
    const menuData = await response.json();

    const sidebar = document.getElementById('mySidebar');
    sidebar.config = {
      logo: {
        text: menuData.appName,
        image: menuData.logo
      },
      items: processMenuItems(menuData.items)
    };
  } catch (error) {
    console.error('加载菜单失败:', error);
  }
}

// 处理菜单数据
function processMenuItems(items) {
  return items.map(item => ({
    key: item.id,
    label: item.name,
    icon: item.icon,
    path: item.url,
    badge: item.badge,
    children: item.children ? processMenuItems(item.children) : undefined,
    onClick: () => {
      // 路由导航
      router.push(item.url);
    },
    onBeforeClick: () => {
      // 权限验证
      return hasPermission(item.permission);
    }
  }));
}

// 监听路由变化更新激活状态
router.afterEach((to) => {
  const sidebar = document.getElementById('mySidebar');
  const activeKey = findMenuKeyByPath(to.path);
  sidebar.setActiveKey(activeKey);
});
```