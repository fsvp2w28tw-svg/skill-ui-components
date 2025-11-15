import { SkillErrorHandler, SkillError, createErrorHandler, SkillValidator } from '../src/utils/error-handler';

describe('Error Handling Tests', () => {
  let errorHandler: SkillErrorHandler;

  beforeEach(() => {
    errorHandler = SkillErrorHandler.getInstance();
    errorHandler.clearErrors();
  });

  it('should create SkillError with proper structure', () => {
    const error = new SkillError('Test error', {
      component: 'TestComponent',
      context: 'TestContext',
      severity: 'high'
    });

    expect(error.message).toBe('Test error');
    expect(error.component).toBe('TestComponent');
    expect(error.context).toBe('TestContext');
    expect(error.severity).toBe('high');
    expect(error.timestamp).toBeInstanceOf(Date);
    expect(error.errorId).toMatch(/^skill-\d+-[a-z0-9]+$/);
  });

  it('should handle errors through error handler', () => {
    const error = errorHandler.handleError('Test error', {
      component: 'TestComponent',
      severity: 'medium'
    });

    expect(error).toBeInstanceOf(SkillError);
    expect(error.component).toBe('TestComponent');
    expect(error.severity).toBe('medium');

    const errors = errorHandler.getErrors();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBe(error);
  });

  it('should create component-specific error handler', () => {
    const componentHandler = createErrorHandler('TestComponent');

    expect(typeof componentHandler.handle).toBe('function');
    expect(typeof componentHandler.wrapAsync).toBe('function');
    expect(typeof componentHandler.wrapSync).toBe('function');
  });

  it('should validate required properties', () => {
    expect(() => {
      SkillValidator.required(null, 'testProp', 'TestComponent');
    }).toThrow('属性 testProp 是必填的');

    expect(() => {
      SkillValidator.required('', 'testProp', 'TestComponent');
    }).toThrow('属性 testProp 是必填的');

    expect(() => {
      SkillValidator.required('valid', 'testProp', 'TestComponent');
    }).not.toThrow();
  });

  it('should validate types', () => {
    expect(() => {
      SkillValidator.type('string', 'number', 'testProp', 'TestComponent');
    }).toThrow('属性 testProp 类型错误');

    expect(() => {
      SkillValidator.type(123, 'number', 'testProp', 'TestComponent');
    }).not.toThrow();
  });

  it('should validate array lengths', () => {
    expect(() => {
      SkillValidator.arrayLength('testArray', [1, 2], 3, undefined, 'TestComponent');
    }).toThrow('数组 testArray 长度不能小于 3');

    expect(() => {
      SkillValidator.arrayLength('testArray', [1, 2, 3], 2, 5, 'TestComponent');
    }).not.toThrow();
  });

  it('should validate ranges', () => {
    expect(() => {
      SkillValidator.range('testValue', 5, 10, 20, 'TestComponent');
    }).toThrow('数值 testValue 不能小于 10');

    expect(() => {
      SkillValidator.range('testValue', 15, 10, 20, 'TestComponent');
    }).not.toThrow();
  });

  it('should validate patterns', () => {
    expect(() => {
      SkillValidator.pattern('abc', /^\d+$/, 'testValue', 'TestComponent');
    }).toThrow('属性 testValue 格式不正确');

    expect(() => {
      SkillValidator.pattern('123', /^\d+$/, 'testValue', 'TestComponent');
    }).not.toThrow();
  });

  it('should validate enum values', () => {
    const allowedValues = ['red', 'green', 'blue'];

    expect(() => {
      SkillValidator.enum('yellow', allowedValues, 'testValue', 'TestComponent');
    }).toThrow('属性 testValue 的值无效');

    expect(() => {
      SkillValidator.enum('red', allowedValues, 'testValue', 'TestComponent');
    }).not.toThrow();
  });

  it('should wrap async functions with error handling', async () => {
    const componentHandler = createErrorHandler('TestComponent');
    const mockFn = jest.fn().mockResolvedValue('success');
    const wrappedFn = componentHandler.wrapAsync(mockFn);

    const result = await wrappedFn('arg1', 'arg2');
    expect(result).toBe('success');
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should wrap sync functions with error handling', () => {
    const componentHandler = createErrorHandler('TestComponent');
    const mockFn = jest.fn().mockReturnValue('success');
    const wrappedFn = componentHandler.wrapSync(mockFn);

    const result = wrappedFn('arg1', 'arg2');
    expect(result).toBe('success');
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should filter errors by component', () => {
    errorHandler.handleError('Error 1', { component: 'ComponentA' });
    errorHandler.handleError('Error 2', { component: 'ComponentB' });
    errorHandler.handleError('Error 3', { component: 'ComponentA' });

    const componentAErrors = errorHandler.getErrors({ component: 'ComponentA' });
    const componentBErrors = errorHandler.getErrors({ component: 'ComponentB' });

    expect(componentAErrors).toHaveLength(2);
    expect(componentBErrors).toHaveLength(1);
  });

  it('should filter errors by severity', () => {
    errorHandler.handleError('Low error', { severity: 'low' });
    errorHandler.handleError('High error', { severity: 'high' });
    errorHandler.handleError('Medium error', { severity: 'medium' });

    const highErrors = errorHandler.getErrors({ severity: 'high' });
    const mediumErrors = errorHandler.getErrors({ severity: 'medium' });

    expect(highErrors).toHaveLength(1);
    expect(mediumErrors).toHaveLength(1);
  });
});