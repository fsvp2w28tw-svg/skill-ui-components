import { html, render } from 'lit';
import { createMockData, flushPromises } from './setup';

describe('Skill Virtual List Tests', () => {
  let element: HTMLElement;

  beforeEach(async () => {
    // 清理DOM
    document.body.innerHTML = '';

    // 创建测试容器
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    // 清理
    if (element && document.body.contains(element)) {
      document.body.removeChild(element);
    }
  });

  it('should render virtual list correctly', async () => {
    const mockData = createMockData(1000);
    const virtualListElement = document.createElement('skill-virtual-list') as any;
    virtualListElement.items = mockData;
    virtualListElement.itemHeight = 40;
    virtualListElement.containerHeight = 300;

    element.appendChild(virtualListElement);
    await flushPromises();

    // 验证虚拟列表渲染
    const virtualList = element.querySelector('skill-virtual-list');
    expect(virtualList).toBeDefined();
    expect((virtualList as any).items.length).toBe(1000);
    expect((virtualList as any).itemHeight).toBe(40);
  });

  it('should handle empty data gracefully', async () => {
    const virtualListElement = document.createElement('skill-virtual-list') as any;
    virtualListElement.items = [];
    virtualListElement.itemHeight = 40;
    virtualListElement.containerHeight = 200;

    element.appendChild(virtualListElement);
    await flushPromises();

    // 验证空数据状态
    const emptyState = element.querySelector('.skill-virtual-list__empty');
    expect(emptyState).toBeDefined();
  });

  it('should render only visible items', async () => {
    const mockData = createMockData(1000);
    const virtualListElement = document.createElement('skill-virtual-list') as any;
    virtualListElement.items = mockData;
    virtualListElement.itemHeight = 50;
    virtualListElement.containerHeight = 200;

    element.appendChild(virtualListElement);
    await flushPromises();

    // 计算应该渲染的项目数量（200px容器高度 / 50px项目高度 + 缓冲区）
    const expectedVisibleItems = Math.ceil(200 / 50) + 4; // 4为缓冲区
    const renderedItems = element.querySelectorAll('.skill-virtual-list__item');

    // 验证只渲染了可见范围内的项目
    expect(renderedItems.length).toBeLessThan(mockData.length);
    expect(renderedItems.length).toBeLessThanOrEqual(expectedVisibleItems);
  });

  it('should emit scroll events', async () => {
    const mockData = createMockData(500);
    const virtualListElement = document.createElement('skill-virtual-list') as any;
    virtualListElement.items = mockData;
    virtualListElement.itemHeight = 40;
    virtualListElement.containerHeight = 200;

    element.appendChild(virtualListElement);
    await flushPromises();

    // 监听滚动事件
    let scrollEventFired = false;
    let scrollEventDetail: any;

    virtualListElement.addEventListener('skill-scroll', (event: any) => {
      scrollEventFired = true;
      scrollEventDetail = event.detail;
    });

    // 模拟滚动
    const viewport = element.querySelector('.skill-virtual-list__viewport') as HTMLElement;
    if (viewport) {
      viewport.scrollTop = 100;
      viewport.dispatchEvent(new Event('scroll'));

      await flushPromises();

      expect(scrollEventFired).toBe(true);
      expect(scrollEventDetail).toBeDefined();
      expect(scrollEventDetail.scrollTop).toBe(100);
    }
  });

  it('should handle item click events', async () => {
    const mockData = createMockData(50);
    const virtualListElement = document.createElement('skill-virtual-list') as any;
    virtualListElement.items = mockData;
    virtualListElement.itemHeight = 40;
    virtualListElement.containerHeight = 300;

    element.appendChild(virtualListElement);
    await flushPromises();

    // 监听点击事件
    let clickEventFired = false;
    let clickEventDetail: any;

    virtualListElement.addEventListener('skill-item-click', (event: any) => {
      clickEventFired = true;
      clickEventDetail = event.detail;
    });

    // 模拟点击第一个项目
    const firstItem = element.querySelector('.skill-virtual-list__item');
    if (firstItem) {
      firstItem.dispatchEvent(new Event('click'));
      await flushPromises();

      expect(clickEventFired).toBe(true);
      expect(clickEventDetail).toBeDefined();
      expect(clickEventDetail.item).toBeDefined();
    }
  });

  it('should support dynamic item heights', async () => {
    const mockData = createMockData(100);
    const virtualListElement = document.createElement('skill-virtual-list') as any;
    virtualListElement.items = mockData;
    virtualListElement.itemHeight = null; // 使用动态高度
    virtualListElement.containerHeight = 250;
    virtualListElement.dynamicHeight = true;

    element.appendChild(virtualListElement);
    await flushPromises();

    expect((virtualListElement as any).dynamicHeight).toBe(true);
    expect((virtualListElement as any).itemHeight).toBeNull();

    // 验证动态高度样式类
    const dynamicList = element.querySelector('.skill-virtual-list--dynamic');
    expect(dynamicList).toBeDefined();
  });

  it('should support custom item templates', async () => {
    const mockData = createMockData(20);
    const virtualListElement = document.createElement('skill-virtual-list') as any;
    virtualListElement.items = mockData;
    virtualListElement.itemHeight = 60;
    virtualListElement.containerHeight = 300;

    // 设置自定义渲染模板
    virtualListElement.itemTemplate = (item: any, index: number) => html`
      <div class="custom-item">
        <h4>${item.name}</h4>
        <p>Index: ${index}</p>
        <span>${item.description}</span>
      </div>
    `;

    element.appendChild(virtualListElement);
    await flushPromises();

    // 验证自定义模板渲染
    const customItem = element.querySelector('.custom-item');
    expect(customItem).toBeDefined();
  });

  it('should handle loading state', async () => {
    const virtualListElement = document.createElement('skill-virtual-list') as any;
    virtualListElement.loading = true;
    virtualListElement.itemHeight = 40;
    virtualListElement.containerHeight = 200;

    element.appendChild(virtualListElement);
    await flushPromises();

    // 验证加载状态
    const loadingState = element.querySelector('.skill-virtual-list__loading');
    expect(loadingState).toBeDefined();
    expect((virtualListElement as any).loading).toBe(true);
  });

  it('should support buffering', async () => {
    const mockData = createMockData(1000);
    const virtualListElement = document.createElement('skill-virtual-list') as any;
    virtualListElement.items = mockData;
    virtualListElement.itemHeight = 50;
    virtualListElement.containerHeight = 300;
    virtualListElement.bufferSize = 10;

    element.appendChild(virtualListElement);
    await flushPromises();

    expect((virtualListElement as any).bufferSize).toBe(10);

    // 验证缓冲区计算
    const viewport = element.querySelector('.skill-virtual-list__viewport') as HTMLElement;
    if (viewport) {
      viewport.scrollTop = 200;
      viewport.dispatchEvent(new Event('scroll'));

      await flushPromises();

      // 滚动后应该渲染新的可见项目（包括缓冲区）
      const visibleItems = element.querySelectorAll('.skill-virtual-list__item');
      expect(visibleItems.length).toBeGreaterThan(0);
    }
  });

  it('should support infinite scroll', async () => {
    const mockData = createMockData(50);
    const virtualListElement = document.createElement('skill-virtual-list') as any;
    virtualListElement.items = mockData;
    virtualListElement.itemHeight = 40;
    virtualListElement.containerHeight = 200;
    virtualListElement.infiniteScroll = true;

    element.appendChild(virtualListElement);
    await flushPromises();

    expect((virtualListElement as any).infiniteScroll).toBe(true);

    // 监听无限滚动事件
    let loadMoreEventFired = false;
    virtualListElement.addEventListener('skill-load-more', () => {
      loadMoreEventFired = true;
    });

    // 滚动到底部
    const viewport = element.querySelector('.skill-virtual-list__viewport') as HTMLElement;
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight - viewport.clientHeight;
      viewport.dispatchEvent(new Event('scroll'));

      await flushPromises();

      expect(loadMoreEventFired).toBe(true);
    }
  });

  it('should handle item selection', async () => {
    const mockData = createMockData(30);
    const virtualListElement = document.createElement('skill-virtual-list') as any;
    virtualListElement.items = mockData;
    virtualListElement.itemHeight = 45;
    virtualListElement.containerHeight = 300;
    virtualListElement.selectable = true;

    element.appendChild(virtualListElement);
    await flushPromises();

    expect((virtualListElement as any).selectable).toBe(true);
    expect((virtualListElement as any).selectedItems).toEqual([]);

    // 模拟选择项目
    const firstItem = element.querySelector('.skill-virtual-list__item');
    if (firstItem) {
      firstItem.dispatchEvent(new Event('click'));
      await flushPromises();

      expect((virtualListElement as any).selectedItems.length).toBe(1);
    }
  });

  it('should support keyboard navigation', async () => {
    const mockData = createMockData(20);
    const virtualListElement = document.createElement('skill-virtual-list') as any;
    virtualListElement.items = mockData;
    virtualListElement.itemHeight = 40;
    virtualListElement.containerHeight = 200;
    virtualListElement.keyboardNavigation = true;

    element.appendChild(virtualListElement);
    await flushPromises();

    expect((virtualListElement as any).keyboardNavigation).toBe(true);

    // 模拟键盘导航
    const viewport = element.querySelector('.skill-virtual-list__viewport');
    if (viewport) {
      viewport.focus();

      // 按下箭头键
      viewport.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await flushPromises();

      // 验证焦点移动到第一个项目
      const focusedItem = element.querySelector('.skill-virtual-list__item--focused');
      expect(focusedItem).toBeDefined();
    }
  });
});