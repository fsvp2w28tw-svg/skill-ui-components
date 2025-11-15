# Data Grid 组件使用示例

## 基础用法

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="/dist/skill-ui-components.js"></script>
</head>
<body>
  <skill-data-grid id="myGrid"></skill-data-grid>

  <script>
    // 表格配置
    const gridConfig = {
      columns: [
        {
          key: 'id',
          title: 'ID',
          width: 80,
          sortable: true
        },
        {
          key: 'name',
          title: '姓名',
          width: 120,
          sortable: true,
          filterable: true
        },
        {
          key: 'age',
          title: '年龄',
          width: 80,
          type: 'number',
          sortable: true,
          align: 'center'
        },
        {
          key: 'email',
          title: '邮箱',
          width: 200
        },
        {
          key: 'status',
          title: '状态',
          width: 100,
          type: 'select',
          render: (value) => {
            const colors = {
              active: '#52c41a',
              inactive: '#f5222d',
              pending: '#faad14'
            };
            return `<span style="color: ${colors[value] || '#666'}">${value}</span>`;
          }
        }
      ],
      data: [
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', status: 'active' },
        { id: 2, name: '李四', age: 30, email: 'lisi@example.com', status: 'inactive' },
        { id: 3, name: '王五', age: 28, email: 'wangwu@example.com', status: 'pending' }
      ]
    };

    // 设置表格配置
    document.getElementById('myGrid').config = gridConfig;
  </script>
</body>
</html>
```

## 高级功能

### 选择功能

```javascript
const selectableGridConfig = {
  columns: [
    // ... 列配置
  ],
  data: userData,
  selectable: {
    type: 'checkbox', // 'single' | 'multiple' | 'checkbox' | 'none'
    selectedRows: [],
    selectedKeys: [],
    preserveSelection: true
  }
};

// 监听选择事件
document.getElementById('myGrid').addEventListener('select', (e) => {
  console.log('选中的行:', e.detail.selection.selectedRows);
  console.log('选中的键:', e.detail.selection.selectedKeys);
});

// 监听全选事件
document.getElementById('myGrid').addEventListener('select-all', (e) => {
  console.log('全选的行:', e.detail.selection.selectedRows);
});
```

### 排序和筛选

```javascript
const sortableGridConfig = {
  columns: [
    {
      key: 'name',
      title: '姓名',
      sortable: true,
      filterable: true,
      filterOptions: [
        { label: '张三', value: '张三' },
        { label: '李四', value: '李四' },
        { label: '王五', value: '王五' }
      ]
    },
    {
      key: 'salary',
      title: '薪资',
      type: 'number',
      sortable: true,
      format: (value) => `¥${value.toLocaleString()}`
    },
    {
      key: 'joinDate',
      title: '入职日期',
      type: 'date',
      sortable: true,
      format: (value) => new Date(value).toLocaleDateString()
    }
  ],
  data: employeeData
};

// 监听排序事件
document.getElementById('myGrid').addEventListener('sort', (e) => {
  console.log('排序配置:', e.detail.sort);
  console.log('排序后数据:', e.detail.data);
});
```

### 可编辑表格

```javascript
const editableGridConfig = {
  columns: [
    {
      key: 'name',
      title: '姓名',
      editable: true,
      validation: {
        required: true,
        minLength: 2
      }
    },
    {
      key: 'age',
      title: '年龄',
      type: 'number',
      editable: true,
      validation: {
        required: true,
        min: 18,
        max: 65
      }
    },
    {
      key: 'department',
      title: '部门',
      type: 'select',
      editable: true,
      options: [
        { label: '技术部', value: 'tech' },
        { label: '市场部', value: 'marketing' },
        { label: '人事部', value: 'hr' }
      ]
    },
    {
      key: 'active',
      title: '状态',
      type: 'checkbox',
      editable: true
    }
  ],
  data: employeeData
};

// 监听编辑事件
document.getElementById('myGrid').addEventListener('edit', (e) => {
  console.log('编辑的行:', e.detail.data);
  console.log('编辑的列:', e.detail.column);
  console.log('新值:', e.detail.value);
  console.log('旧值:', e.detail.oldValue);

  // 这里可以调用API保存数据
  // await updateEmployee(e.detail.data.id, e.detail.data);
});
```

### 行操作

```javascript
const actionsGridConfig = {
  columns: [
    // ... 列配置
  ],
  data: userData,
  rowActions: [
    {
      key: 'view',
      label: '查看',
      type: 'primary',
      onClick: (row) => {
        console.log('查看:', row);
        // 跳转到详情页
        window.location.href = `/users/${row.id}`;
      }
    },
    {
      key: 'edit',
      label: '编辑',
      type: 'secondary',
      onClick: (row) => {
        console.log('编辑:', row);
        // 打开编辑对话框
        openEditDialog(row);
      }
    },
    {
      key: 'delete',
      label: '删除',
      type: 'danger',
      visible: (row) => row.status !== 'deleted', // 条件显示
      onClick: (row) => {
        console.log('删除:', row);
        // 确认删除
        if (confirm('确定要删除这条数据吗？')) {
          deleteUser(row.id);
        }
      }
    }
  ]
};
```

### 展开行

```javascript
const expandableGridConfig = {
  columns: [
    // ... 列配置
  ],
  data: orderData,
  expandable: true,
  defaultExpandedRowKeys: [1, 2] // 默认展开的行
};

// 监听展开事件
document.getElementById('myGrid').addEventListener('expand', (e) => {
  console.log('展开的行:', e.detail.row);
  console.log('展开状态:', e.detail.expanded);
});
```

```html
<!-- 自定义展开内容模板 -->
<skill-data-grid id="myGrid">
  <!-- 为ID为1的行定义展开内容 -->
  <div slot="expand-1" data="${orderData.find(item => item.id === 1)}">
    <h3>订单详情</h3>
    <p>客户：{{data.customer}}</p>
    <p>地址：{{data.address}}</p>
    <p>备注：{{data.notes}}</p>
  </div>

  <!-- 为ID为2的行定义展开内容 -->
  <div slot="expand-2" data="${orderData.find(item => item.id === 2)}">
    <h3>用户信息</h3>
    <skill-user-profile .user="${data.user}"></skill-user-profile>
  </div>
</skill-data-grid>
```

### 分页

```javascript
const paginatedGridConfig = {
  columns: [
    // ... 列配置
  ],
  data: largeDataSet,
  pagination: {
    page: 1,
    pageSize: 20,
    total: largeDataSet.length,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: true,
    pageSizeOptions: [10, 20, 50, 100]
  }
};

// 监听分页事件
document.getElementById('myGrid').addEventListener('page-change', (e) => {
  console.log('当前页:', e.detail.pagination.page);
  console.log('每页大小:', e.detail.pagination.pageSize);

  // 重新加载数据
  loadData(e.detail.pagination.page, e.detail.pagination.pageSize);
});
```

### 虚拟滚动（大数据量）

```javascript
const virtualScrollGridConfig = {
  columns: [
    // ... 列配置
  ],
  data: veryLargeDataSet, // 10万条数据
  height: 600, // 固定高度
  rowHeight: 40,
  virtualScrolling: true,
  pagination: false // 禁用分页，使用虚拟滚动
};
```

## 列配置详解

### 基础配置

```javascript
{
  key: 'name',           // 数据字段名
  title: '姓名',         // 列标题
  width: 120,           // 列宽度（像素或百分比）
  minWidth: 80,         // 最小宽度
  maxWidth: 200,        // 最大宽度
  align: 'left',        // 对齐方式: 'left' | 'center' | 'right'
  resizable: true,      // 是否可调整大小
  sortable: true,       // 是否可排序
  filterable: true,     // 是否可筛选
  editable: true        // 是否可编辑
}
```

### 高级配置

```javascript
{
  key: 'salary',
  title: '薪资',
  type: 'number',
  format: (value, row) => `¥${value.toLocaleString()}`,
  render: (value, row, column) => {
    // 自定义渲染
    const color = value > 10000 ? '#52c41a' : '#faad14';
    return `<span style="color: ${color}">¥${value.toLocaleString()}</span>`;
  },
  cellClass: (row, column) => {
    // 动态单元格样式
    return row.salary > 10000 ? 'high-salary' : 'normal-salary';
  },
  headerClass: 'custom-header',
  aggregation: 'sum', // 汇总: 'sum' | 'avg' | 'count' | 'min' | 'max'
  footer: (rows) => {
    // 自定义footer
    const total = rows.reduce((sum, row) => sum + row.salary, 0);
    return `总计: ¥${total.toLocaleString()}`;
  }
}
```

### 固定列

```javascript
{
  key: 'action',
  title: '操作',
  width: 150,
  pinned: 'right',  // 'left' | 'right'
  render: (value, row) => {
    return '<button>编辑</button>';
  }
}
```

## 事件处理

```javascript
const grid = document.getElementById('myGrid');

// 选择事件
grid.addEventListener('select', (e) => {
  const { row, selection } = e.detail;
  console.log('选中行:', row);
  console.log('选择状态:', selection);
});

// 排序事件
grid.addEventListener('sort', (e) => {
  const { sort, data } = e.detail;
  console.log('排序:', sort);
  console.log('排序后数据:', data);
});

// 筛选事件
grid.addEventListener('filter', (e) => {
  const { filter } = e.detail;
  console.log('筛选条件:', filter);
});

// 分页事件
grid.addEventListener('page-change', (e) => {
  const { pagination } = e.detail;
  console.log('分页信息:', pagination);
});

// 编辑事件
grid.addEventListener('edit', (e) => {
  const { data, column, value, oldValue } = e.detail;
  console.log('编辑事件:', { data, column, value, oldValue });
});

// 展开事件
grid.addEventListener('expand', (e) => {
  const { row, expanded } = e.detail;
  console.log('展开事件:', { row, expanded });
});
```

## 编程式API

```javascript
const grid = document.getElementById('myGrid');

// 设置数据
grid.config = {
  columns: [...],
  data: [...]
};

// 获取选中行
const selectedRows = grid.selectedRows;

// 设置加载状态
grid.loading = true;

// 清空选择
grid.selectedRows = [];

// 刷新数据
grid.requestUpdate();

// 手动排序
grid.sortConfig = { key: 'name', direction: 'asc' };
grid.sortData();
```

## 样式定制

```css
/* 自定义样式 */
skill-data-grid {
  --grid-border-color: #d9d9d9;
  --grid-header-bg: #fafafa;
  --grid-hover-bg: #f5f5f5;
  --grid-selected-bg: #e6f7ff;
  --grid-striped-bg: #fafafa;
}

/* 自定义列样式 */
.high-salary {
  background-color: #f6ffed;
  color: #52c41a;
}

/* 自定义行样式 */
.grid-row.highlight {
  background-color: #fff7e6;
}
```