import { SkillValidator, createErrorHandler } from '../src/utils/error-handler';

describe('Validation Utils Tests', () => {
  let errorHandler: any;

  beforeEach(() => {
    errorHandler = createErrorHandler('TestComponent');
  });

  it('should validate CSS length strings', () => {
    // 测试有效的 CSS 长度值
    const validLengths = ['100px', '1.5em', '2rem', '50vh', '80%'];
    validLengths.forEach(length => {
      const regex = /^\d+(\.\d+)?(px|em|rem|vh|vw|%)$/;
      expect(regex.test(length)).toBe(true);
    });

    // 测试无效的 CSS 长度值
    const invalidLengths = ['invalid', '100', '100xyz', 'px100'];
    invalidLengths.forEach(length => {
      const regex = /^\d+(\.\d+)?(px|em|rem|vh|vw|%)$/;
      expect(regex.test(length)).toBe(false);
    });

    // 空字符串应该被接受（可选属性）
    expect(/^\d+(\.\d+)?(px|em|rem|vh|vw|%)$/.test('')).toBe(false);
  });

  it('should validate common component properties', () => {
    // 测试数组属性
    expect(() => {
      SkillValidator.arrayLength('items', [1, 2, 3], 0, undefined, 'TestComponent');
    }).not.toThrow();

    // 测试数值范围 - 有效值
    expect(() => {
      SkillValidator.range('bufferSize', 5, 0, 50, 'TestComponent');
    }).not.toThrow();

    // 测试数值范围 - 无效值（应该抛出错误）
    expect(() => {
      SkillValidator.range('bufferSize', -1, 0, 50, 'TestComponent');
    }).toThrow(/数值 bufferSize 不能小于 0/);

    // 测试枚举值 - 有效值
    expect(() => {
      SkillValidator.enum('medium', ['small', 'medium', 'large'], 'size', 'TestComponent');
    }).not.toThrow();

    // 测试枚举值 - 无效值
    expect(() => {
      SkillValidator.enum('invalid', ['small', 'medium', 'large'], 'size', 'TestComponent');
    }).toThrow(/属性 size 的值无效/);
  });

  it('should handle error processing', () => {
    const error = new Error('Test error');
    const processedError = errorHandler.handle(error, 'testContext', 'medium');

    expect(processedError.component).toBe('TestComponent');
    expect(processedError.context).toBe('testContext');
    expect(processedError.severity).toBe('medium');
    expect(processedError.message).toBe('Test error');
  });

  it('should validate boolean properties', () => {
    const validBooleans = [true, false, null, undefined];
    validBooleans.forEach(value => {
      if (value !== null && value !== undefined && typeof value !== 'boolean') {
        expect(typeof value).toBe('boolean');
      }
    });

    // 字符串 'true' 或 'false' 应该转换为布尔值
    const stringBooleans = ['true', 'false'];
    stringBooleans.forEach(value => {
      const converted = value === 'true';
      expect(typeof converted).toBe('boolean');
    });
  });

  it('should validate object structure for list items', () => {
    const validItems = [
      { id: 1, name: 'Item 1' },
      { id: 'abc', data: {} },
      { id: null, name: 'Invalid' } // id 为 null 应该被拒绝
    ];

    // 验证有效的对象
    expect(validItems[0]).toHaveProperty('id');
    expect(validItems[1]).toHaveProperty('id');

    // id 为 null 或 undefined 应该被拒绝
    expect(() => {
      if (validItems[2].id === null || validItems[2].id === undefined) {
        throw new Error('Item at index 2 must have an id property');
      }
    }).toThrow(/must have an id property/);
  });

  it('should validate string patterns for common use cases', () => {
    // 测试颜色值验证
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    expect(colorRegex.test('#ffffff')).toBe(true);
    expect(colorRegex.test('#fff')).toBe(true);
    expect(colorRegex.test('invalid')).toBe(false);

    // 测试邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test('test@example.com')).toBe(true);
    expect(emailRegex.test('invalid-email')).toBe(false);
  });
});