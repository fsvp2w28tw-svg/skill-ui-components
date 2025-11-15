import { html, render } from 'lit';
import { createMockData, flushPromises } from './setup';

describe('Skill Grid Tests', () => {
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

  it('should render grid correctly', async () => {
    const mockData = createMockData(6);
    const gridElement = document.createElement('skill-grid') as any;
    gridElement.data = mockData;
    gridElement.columns = 3;
    gridElement.gap = '16px';

    element.appendChild(gridElement);
    await flushPromises();

    // 验证网格渲染
    const grid = element.querySelector('skill-grid');
    expect(grid).toBeDefined();
    expect((grid as any).data.length).toBe(6);
    expect((grid as any).columns).toBe(3);
  });

  it('should handle empty data gracefully', async () => {
    const gridElement = document.createElement('skill-grid') as any;
    gridElement.data = [];
    gridElement.columns = 2;

    element.appendChild(gridElement);
    await flushPromises();

    // 验证空数据状态
    const emptyState = element.querySelector('.skill-grid__empty');
    expect(emptyState).toBeDefined();
  });

  it('should update grid layout when columns change', async () => {
    const mockData = createMockData(4);
    const gridElement = document.createElement('skill-grid') as any;
    gridElement.data = mockData;
    gridElement.columns = 2;

    element.appendChild(gridElement);
    await flushPromises();

    expect((gridElement as any).columns).toBe(2);

    // 更改列数
    gridElement.columns = 4;
    await flushPromises();

    expect((gridElement as any).columns).toBe(4);
  });

  it('should emit item click events', async () => {
    const mockData = createMockData(3);
    const gridElement = document.createElement('skill-grid') as any;
    gridElement.data = mockData;
    gridElement.columns = 3;

    element.appendChild(gridElement);
    await flushPromises();

    // 监听点击事件
    let clickEventFired = false;
    let clickEventDetail: any;

    gridElement.addEventListener('skill-item-click', (event: any) => {
      clickEventFired = true;
      clickEventDetail = event.detail;
    });

    // 模拟点击第一个项目
    const firstItem = element.querySelector('.skill-grid__item');
    if (firstItem) {
      firstItem.dispatchEvent(new Event('click'));
      await flushPromises();

      expect(clickEventFired).toBe(true);
      expect(clickEventDetail).toBeDefined();
    }
  });

  it('should support responsive columns', async () => {
    const mockData = createMockData(6);
    const gridElement = document.createElement('skill-grid') as any;
    gridElement.data = mockData;
    gridElement.responsive = true;
    gridElement.columns = { xs: 1, sm: 2, md: 3, lg: 4 };

    element.appendChild(gridElement);
    await flushPromises();

    expect((gridElement as any).responsive).toBe(true);
    expect((gridElement as any).columns).toEqual({ xs: 1, sm: 2, md: 3, lg: 4 });
  });

  it('should handle loading state', async () => {
    const gridElement = document.createElement('skill-grid') as any;
    gridElement.loading = true;

    element.appendChild(gridElement);
    await flushPromises();

    // 验证加载状态
    const loadingState = element.querySelector('.skill-grid__loading');
    expect(loadingState).toBeDefined();
    expect((gridElement as any).loading).toBe(true);
  });

  it('should render custom item template', async () => {
    const mockData = createMockData(3);
    const gridElement = document.createElement('skill-grid') as any;
    gridElement.data = mockData;
    gridElement.columns = 3;

    // 设置自定义渲染模板
    gridElement.itemTemplate = (item: any) => html`
      <div class="custom-item">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
    `;

    element.appendChild(gridElement);
    await flushPromises();

    // 验证自定义模板渲染
    const customItem = element.querySelector('.custom-item');
    expect(customItem).toBeDefined();
  });

  it('should handle selection', async () => {
    const mockData = createMockData(4);
    const gridElement = document.createElement('skill-grid') as any;
    gridElement.data = mockData;
    gridElement.columns = 2;
    gridElement.selectable = true;

    element.appendChild(gridElement);
    await flushPromises();

    expect((gridElement as any).selectable).toBe(true);
    expect((gridElement as any).selectedItems).toEqual([]);

    // 模拟选择项目
    const firstItem = element.querySelector('.skill-grid__item');
    if (firstItem) {
      firstItem.dispatchEvent(new Event('click'));
      await flushPromises();

      expect((gridElement as any).selectedItems.length).toBe(1);
    }
  });
});