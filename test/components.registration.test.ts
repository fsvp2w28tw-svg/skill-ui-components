// 基础测试框架验证
describe('Test Framework Setup', () => {
  it('should run basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should have jest globals available', () => {
    expect(jest).toBeDefined();
    expect(typeof jest.fn()).toBe('function');
  });

  it('should have custom elements API mocked', () => {
    expect(window.customElements).toBeDefined();
    expect(typeof window.customElements.define).toBe('function');
  });

  it('should have ResizeObserver mocked', () => {
    expect(window.ResizeObserver).toBeDefined();
    expect(typeof window.ResizeObserver).toBe('function');
  });

  it('should have test utilities available', () => {
    const { createMockData } = require('./setup');
    const mockData = createMockData(5);

    expect(mockData).toHaveLength(5);
    expect(mockData[0]).toHaveProperty('id');
    expect(mockData[0]).toHaveProperty('name');
  });
});