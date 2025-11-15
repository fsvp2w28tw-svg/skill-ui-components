# Form Builder 组件使用示例

## 基础用法

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="/dist/skill-ui-components.js"></script>
</head>
<body>
  <skill-form-builder id="myForm"></skill-form-builder>

  <script>
    // 表单配置
    const formConfig = {
      sections: [
        {
          title: "基本信息",
          description: "请填写您的基本信息",
          fields: [
            {
              name: "name",
              type: "text",
              label: "姓名",
              placeholder: "请输入您的姓名",
              validation: {
                required: true,
                minLength: 2
              }
            },
            {
              name: "email",
              type: "email",
              label: "邮箱",
              placeholder: "请输入邮箱地址",
              validation: {
                required: true,
                pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
              }
            },
            {
              name: "age",
              type: "number",
              label: "年龄",
              validation: {
                required: true,
                min: 18,
                max: 100
              }
            }
          ]
        }
      ]
    };

    // 设置表单配置
    document.getElementById('myForm').config = formConfig;

    // 监听提交事件
    document.getElementById('myForm').addEventListener('submit', (e) => {
      console.log('表单数据:', e.detail.data);
    });
  </script>
</body>
</html>
```

## 高级用法

### 多区块表单

```javascript
const advancedFormConfig = {
  sections: [
    {
      title: "个人信息",
      fields: [
        {
          name: "firstName",
          type: "text",
          label: "名字",
          validation: { required: true }
        },
        {
          name: "lastName",
          type: "text",
          label: "姓氏",
          validation: { required: true }
        },
        {
          name: "avatar",
          type: "file",
          label: "头像",
          attributes: { accept: "image/*" }
        }
      ]
    },
    {
      title: "联系方式",
      collapsible: true,
      collapsed: false,
      fields: [
        {
          name: "phone",
          type: "tel",
          label: "电话号码",
          placeholder: "请输入手机号"
        },
        {
          name: "city",
          type: "select",
          label: "城市",
          options: [
            { label: "北京", value: "beijing" },
            { label: "上海", value: "shanghai" },
            { label: "广州", value: "guangzhou" }
          ]
        }
      ]
    }
  ]
};
```

### 字段依赖

```javascript
const dependentFormConfig = {
  sections: [
    {
      title: "用户设置",
      fields: [
        {
          name: "userType",
          type: "radio",
          label: "用户类型",
          options: [
            { label: "个人用户", value: "personal" },
            { label: "企业用户", value: "business" }
          ]
        },
        {
          name: "companyName",
          type: "text",
          label: "公司名称",
          placeholder: "请输入公司名称",
          dependentOn: [
            {
              field: "userType",
              value: "business",
              action: "show"
            }
          ],
          validation: {
            custom: (value, formData) => {
              if (formData.userType === "business" && !value) {
                return "企业用户必须填写公司名称";
              }
              return null;
            }
          }
        }
      ]
    }
  ]
};
```

### 多列布局

```javascript
const multiColumnConfig = {
  layout: {
    columns: 2,
    spacing: "normal"
  },
  sections: [
    {
      title: "地址信息",
      fields: [
        {
          name: "street",
          type: "text",
          label: "街道地址",
          layout: { width: "full" }
        },
        {
          name: "city",
          type: "text",
          label: "城市",
          layout: { width: "half" }
        },
        {
          name: "state",
          type: "text",
          label: "省份",
          layout: { width: "quarter" }
        },
        {
          name: "zipCode",
          type: "text",
          label: "邮编",
          layout: { width: "quarter" }
        }
      ]
    }
  ]
};
```

### 自定义按钮

```javascript
const customButtonConfig = {
  sections: [
    // ... sections配置
  ],
  submitButton: {
    text: "保存设置",
    variant: "success"
  },
  resetButton: {
    text: "重置表单",
    variant: "danger",
    show: true
  }
};
```

## 字段类型支持

### 基础输入类型
- `text` - 文本输入
- `email` - 邮箱输入
- `password` - 密码输入
- `number` - 数字输入
- `tel` - 电话号码
- `url` - URL地址
- `textarea` - 多行文本

### 选择类型
- `select` - 下拉选择
- `radio` - 单选按钮
- `checkbox` - 复选框
- `switch` - 开关

### 特殊类型
- `date` - 日期选择
- `time` - 时间选择
- `datetime-local` - 日期时间选择
- `file` - 文件上传
- `color` - 颜色选择
- `range` - 范围滑块
- `hidden` - 隐藏字段

## 验证规则

```javascript
validation: {
  required: true,           // 必填
  minLength: 5,            // 最小长度
  maxLength: 50,           // 最大长度
  min: 18,                 // 最小值
  max: 100,                // 最大值
  pattern: "^\\d+$",       // 正则表达式
  custom: (value) => {     // 自定义验证
    if (value === 'forbidden') {
      return "该值不被允许";
    }
    return null;
  }
}
```

## 事件处理

```javascript
// 监听所有事件
const formElement = document.getElementById('myForm');

// 表单提交
formElement.addEventListener('submit', (e) => {
  console.log('提交的数据:', e.detail.data);
});

// 字段变化
formElement.addEventListener('field-change', (e) => {
  console.log('字段变化:', e.detail.field, e.detail.data);
});

// 验证错误
formElement.addEventListener('validation-error', (e) => {
  console.log('验证错误:', e.detail.errors);
});

// 表单重置
formElement.addEventListener('reset', (e) => {
  console.log('表单已重置');
});
```

## 编程式API

```javascript
// 验证表单
const isValid = formElement.validateForm();

// 设置表单数据
formElement.data = { name: "张三", email: "zhang@example.com" };

// 获取表单数据
const formData = formElement.data;

// 设置加载状态
formElement.loading = true;
```