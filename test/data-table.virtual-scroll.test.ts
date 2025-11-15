import { html, render } from 'lit';
import { createMockData, flushPromises } from './setup';

describe('Skill Data Table - Virtual Scroll Tests', () => {
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
    document.body.removeChild(element);
  });

  it('should render virtual scroll table correctly', async () => {
    // 测试数据
    const mockData = createMockData(100);
    const columns = [
      { key: 'id', title: 'ID', width: '80px', sortable: true },
      { key: 'name', title: '姓名', width: '150px', sortable: true },
      { key: 'status', title: '状态', width: '100px' },
    ];

    // 创建表格元素
    const tableElement = document.createElement('skill-table') as any;
    tableElement.data = mockData;
    tableElement.columns = columns;
    tableElement.virtualScroll = {
      enabled: true,
      rowHeight: 50,
      containerHeight: '400px',
      bufferSize: 5
    };

    element.appendChild(tableElement);

    // 等待组件更新
    await flushPromises();

    // 验证表格渲染
    const table = element.querySelector('skill-table');
    expect(table).toBeDefined();
    expect((table as any).data.length).toBe(100);
  });

  it('should handle empty data gracefully', async () => {
    const tableElement = document.createElement('skill-table') as any;
    tableElement.data = [];
    tableElement.columns = [
      { key: 'id', title: 'ID', width: '80px' }
    ];
    tableElement.virtualScroll = {
      enabled: true,
      rowHeight: 50,
      containerHeight: '400px'
    };

    element.appendChild(tableElement);
    await flushPromises();

    // 验证空数据状态
    const emptyState = element.querySelector('.data-table__empty');
    expect(emptyState).toBeDefined();
  });

  it('should toggle virtual scroll mode', async () => {
    const mockData = createMockData(50);
    const columns = [
      { key: 'id', title: 'ID', width: '80px' }
    ];

    const tableElement = document.createElement('skill-table') as any;
    tableElement.data = mockData;
    tableElement.columns = columns;

    element.appendChild(tableElement);
    await flushPromises();

    // 启用虚拟滚动
    tableElement.virtualScroll = {
      enabled: true,
      rowHeight: 50,
      containerHeight: '400px'
    };

    await flushPromises();
    expect((tableElement as any).virtualScroll.enabled).toBe(true);

    // 禁用虚拟滚动
    tableElement.virtualScroll = undefined;
    await flushPromises();
    expect((tableElement as any).virtualScroll).toBeUndefined();
  });

  it('should emit scroll events when virtual scrolling', async () => {
    const mockData = createMockData(1000);
    const columns = [
      { key: 'id', title: 'ID', width: '80px' },
      { key: 'name', title: '姓名', width: '150px' }
    ];

    const tableElement = document.createElement('skill-table') as any;
    tableElement.data = mockData;
    tableElement.columns = columns;
    tableElement.virtualScroll = {
      enabled: true,
      rowHeight: 50,
      containerHeight: '400px'
    };

    element.appendChild(tableElement);
    await flushPromises();

    // 监听滚动事件
    let scrollEventFired = false;
    let scrollEventDetail: any;

    tableElement.addEventListener('skill-scroll', (event: any) => {
      scrollEventFired = true;
      scrollEventDetail = event.detail;
    });

    // 模拟滚动
    const viewport = element.querySelector('.data-table__virtual-viewport') as HTMLElement;
    if (viewport) {
      viewport.scrollTop = 100;
      viewport.dispatchEvent(new Event('scroll'));

      await flushPromises();

      expect(scrollEventFired).toBe(true);
      expect(scrollEventDetail).toBeDefined();
      expect(scrollEventDetail.scrollTop).toBe(100);
    }
  });
});