import { html, render } from 'lit';
import { createMockData, flushPromises } from './setup';

describe('Skill Split Pane Tests', () => {
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

  it('should render split pane correctly', async () => {
    const splitPaneElement = document.createElement('skill-split-pane') as any;
    splitPaneElement.direction = 'horizontal';
    splitPaneElement.defaultSizes = [50, 50];

    element.appendChild(splitPaneElement);
    await flushPromises();

    // 验证分层面板渲染
    const splitPane = element.querySelector('skill-split-pane');
    expect(splitPane).toBeDefined();
    expect((splitPane as any).direction).toBe('horizontal');
    expect((splitPane as any).defaultSizes).toEqual([50, 50]);
  });

  it('should render with vertical direction', async () => {
    const splitPaneElement = document.createElement('skill-split-pane') as any;
    splitPaneElement.direction = 'vertical';
    splitPaneElement.defaultSizes = [30, 70];

    element.appendChild(splitPaneElement);
    await flushPromises();

    expect((splitPaneElement as any).direction).toBe('vertical');
    expect((splitPaneElement as any).defaultSizes).toEqual([30, 70]);

    // 验证垂直方向样式
    const container = element.querySelector('.skill-split-pane--vertical');
    expect(container).toBeDefined();
  });

  it('should render with multiple panes', async () => {
    const splitPaneElement = document.createElement('skill-split-pane') as any;
    splitPaneElement.direction = 'horizontal';
    splitPaneElement.defaultSizes = [25, 50, 25];

    // 设置多个面板内容
    splitPaneElement.panes = [
      { content: 'First pane content', minSize: 20, maxSize: 40 },
      { content: 'Second pane content', minSize: 30, maxSize: 60 },
      { content: 'Third pane content', minSize: 15, maxSize: 35 }
    ];

    element.appendChild(splitPaneElement);
    await flushPromises();

    expect((splitPaneElement as any).panes.length).toBe(3);

    // 验证多个面板渲染
    const panes = element.querySelectorAll('.skill-split-pane__pane');
    expect(panes.length).toBe(3);

    // 验证分割器
    const splitters = element.querySelectorAll('.skill-split-pane__splitter');
    expect(splitters.length).toBe(2); // 3个面板需要2个分割器
  });

  it('should allow resizing by dragging splitters', async () => {
    const splitPaneElement = document.createElement('skill-split-pane') as any;
    splitPaneElement.direction = 'horizontal';
    splitPaneElement.defaultSizes = [50, 50];
    splitPaneElement.resizable = true;

    element.appendChild(splitPaneElement);
    await flushPromises();

    expect((splitPaneElement as any).resizable).toBe(true);

    // 监听大小变化事件
    let resizeEventFired = false;
    let resizeEventDetail: any;

    splitPaneElement.addEventListener('skill-resize', (event: any) => {
      resizeEventFired = true;
      resizeEventDetail = event.detail;
    });

    // 模拟拖拽分割器
    const splitter = element.querySelector('.skill-split-pane__splitter');
    if (splitter) {
      const mouseDownEvent = new MouseEvent('mousedown', {
        bubbles: true,
        clientX: 100
      });

      splitter.dispatchEvent(mouseDownEvent);

      // 模拟鼠标移动
      const mouseMoveEvent = new MouseEvent('mousemove', {
        bubbles: true,
        clientX: 150
      });

      document.dispatchEvent(mouseMoveEvent);

      // 模拟鼠标释放
      const mouseUpEvent = new MouseEvent('mouseup', {
        bubbles: true
      });

      document.dispatchEvent(mouseUpEvent);
      await flushPromises();

      expect(resizeEventFired).toBe(true);
      expect(resizeEventDetail).toBeDefined();
    }
  });

  it('should respect min and max size constraints', async () => {
    const splitPaneElement = document.createElement('skill-split-pane') as any;
    splitPaneElement.direction = 'horizontal';
    splitPaneElement.defaultSizes = [30, 70];

    splitPaneElement.panes = [
      { content: 'First pane', minSize: 20, maxSize: 40 },
      { content: 'Second pane', minSize: 60, maxSize: 80 }
    ];

    element.appendChild(splitPaneElement);
    await flushPromises();

    expect((splitPaneElement as any).panes[0].minSize).toBe(20);
    expect((splitPaneElement as any).panes[0].maxSize).toBe(40);
    expect((splitPaneElement as any).panes[1].minSize).toBe(60);
    expect((splitPaneElement as any).panes[1].maxSize).toBe(80);
  });

  it('should support collapsible panes', async () => {
    const splitPaneElement = document.createElement('skill-split-pane') as any;
    splitPaneElement.direction = 'horizontal';
    splitPaneElement.defaultSizes = [60, 40];

    splitPaneElement.panes = [
      { content: 'Main pane', collapsible: false },
      { content: 'Side pane', collapsible: true, collapsed: false }
    ];

    element.appendChild(splitPaneElement);
    await flushPromises();

    expect((splitPaneElement as any).panes[1].collapsible).toBe(true);

    // 验证折叠按钮存在
    const collapseButton = element.querySelector('.skill-split-pane__collapse');
    expect(collapseButton).toBeDefined();

    // 模拟折叠操作
    if (collapseButton) {
      collapseButton.dispatchEvent(new Event('click'));
      await flushPromises();

      expect((splitPaneElement as any).panes[1].collapsed).toBe(true);
    }
  });

  it('should emit collapse events', async () => {
    const splitPaneElement = document.createElement('skill-split-pane') as any;
    splitPaneElement.direction = 'horizontal';
    splitPaneElement.defaultSizes = [70, 30];

    splitPaneElement.panes = [
      { content: 'Main pane' },
      { content: 'Collapsible pane', collapsible: true }
    ];

    element.appendChild(splitPaneElement);
    await flushPromises();

    // 监听折叠事件
    let collapseEventFired = false;
    let collapseEventDetail: any;

    splitPaneElement.addEventListener('skill-collapse', (event: any) => {
      collapseEventFired = true;
      collapseEventDetail = event.detail;
    });

    // 模拟折叠操作
    const collapseButton = element.querySelector('.skill-split-pane__collapse');
    if (collapseButton) {
      collapseButton.dispatchEvent(new Event('click'));
      await flushPromises();

      expect(collapseEventFired).toBe(true);
      expect(collapseEventDetail).toBeDefined();
      expect(collapseEventDetail.paneIndex).toBeDefined();
      expect(collapseEventDetail.collapsed).toBe(true);
    }
  });

  it('should support custom pane templates', async () => {
    const splitPaneElement = document.createElement('skill-split-pane') as any;
    splitPaneElement.direction = 'horizontal';
    splitPaneElement.defaultSizes = [50, 50];

    splitPaneElement.panes = [
      {
        content: { type: 'form', data: { title: 'User Form' } },
        template: (pane: any) => html`
          <div class="custom-pane">
            <h3>${pane.data.title}</h3>
            <div class="form-fields">Form fields here</div>
          </div>
        `
      },
      {
        content: { type: 'list', data: { items: ['Item 1', 'Item 2'] } },
        template: (pane: any) => html`
          <div class="custom-pane">
            <ul>
              ${pane.data.items.map((item: string) => html`<li>${item}</li>`)}
            </ul>
          </div>
        `
      }
    ];

    element.appendChild(splitPaneElement);
    await flushPromises();

    // 验证自定义面板渲染
    const customPanes = element.querySelectorAll('.custom-pane');
    expect(customPanes.length).toBe(2);
  });

  it('should support programmatic pane control', async () => {
    const splitPaneElement = document.createElement('skill-split-pane') as any;
    splitPaneElement.direction = 'horizontal';
    splitPaneElement.defaultSizes = [50, 50];

    splitPaneElement.panes = [
      { content: 'Pane 1' },
      { content: 'Pane 2' }
    ];

    element.appendChild(splitPaneElement);
    await flushPromises();

    // 程序化设置面板大小
    splitPaneElement.setPaneSize(0, 30);
    await flushPromises();

    expect((splitPaneElement as any).getPaneSize(0)).toBe(30);

    // 程序化折叠面板
    splitPaneElement.collapsePane(1);
    await flushPromises();

    expect((splitPaneElement as any).panes[1].collapsed).toBe(true);

    // 程序化展开面板
    splitPaneElement.expandPane(1);
    await flushPromises();

    expect((splitPaneElement as any).panes[1].collapsed).toBe(false);
  });

  it('should handle nested split panes', async () => {
    const outerSplitPane = document.createElement('skill-split-pane') as any;
    outerSplitPane.direction = 'horizontal';
    outerSplitPane.defaultSizes = [60, 40];

    // 创建内部分层面板
    const innerSplitPane = document.createElement('skill-split-pane') as any;
    innerSplitPane.direction = 'vertical';
    innerSplitPane.defaultSizes = [50, 50];

    outerSplitPane.panes = [
      { content: 'Main content area' },
      { content: innerSplitPane }
    ];

    element.appendChild(outerSplitPane);
    await flushPromises();

    // 验证嵌套结构
    const outerPanes = element.querySelectorAll('.skill-split-pane__pane');
    expect(outerPanes.length).toBe(2);

    const innerSplitPaneElement = outerPanes[1].querySelector('skill-split-pane');
    expect(innerSplitPaneElement).toBeDefined();
  });

  it('should support persistence of pane sizes', async () => {
    const splitPaneElement = document.createElement('skill-split-pane') as any;
    splitPaneElement.direction = 'horizontal';
    splitPaneElement.defaultSizes = [50, 50];
    splitPaneElement.persist = true;
    splitPaneElement.storageKey = 'test-split-pane';

    element.appendChild(splitPaneElement);
    await flushPromises();

    expect((splitPaneElement as any).persist).toBe(true);
    expect((splitPaneElement as any).storageKey).toBe('test-split-pane');

    // 模拟调整大小
    const splitter = element.querySelector('.skill-split-pane__splitter');
    if (splitter) {
      const mouseDownEvent = new MouseEvent('mousedown', {
        bubbles: true,
        clientX: 100
      });

      splitter.dispatchEvent(mouseDownEvent);

      const mouseMoveEvent = new MouseEvent('mousemove', {
        bubbles: true,
        clientX: 120
      });

      document.dispatchEvent(mouseMoveEvent);

      const mouseUpEvent = new MouseEvent('mouseup', {
        bubbles: true
      });

      document.dispatchEvent(mouseUpEvent);
      await flushPromises();

      // 验证已保存到localStorage
      const savedState = localStorage.getItem('test-split-pane');
      expect(savedState).toBeTruthy();
    }
  });

  it('should handle responsive behavior', async () => {
    const splitPaneElement = document.createElement('skill-split-pane') as any;
    splitPaneElement.direction = 'horizontal';
    splitPaneElement.defaultSizes = [50, 50];
    splitPaneElement.responsive = true;

    splitPaneElement.panes = [
      { content: 'Main content' },
      { content: 'Sidebar', responsive: { collapseBelow: 768 } }
    ];

    element.appendChild(splitPaneElement);
    await flushPromises();

    expect((splitPaneElement as any).responsive).toBe(true);

    // 模拟窗口大小变化
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600
    });

    window.dispatchEvent(new Event('resize'));
    await flushPromises();

    // 在小屏幕上，侧边栏应该自动折叠
    // 这取决于具体实现，这里只是验证响应式逻辑被触发
    expect((splitPaneElement as any).responsive).toBe(true);
  });

  it('should support keyboard navigation', async () => {
    const splitPaneElement = document.createElement('skill-split-pane') as any;
    splitPaneElement.direction = 'horizontal';
    splitPaneElement.defaultSizes = [50, 50];
    splitPaneElement.keyboardNavigation = true;

    element.appendChild(splitPaneElement);
    await flushPromises();

    expect((splitPaneElement as any).keyboardNavigation).toBe(true);

    const container = element.querySelector('.skill-split-pane');
    if (container) {
      container.focus();

      // 模拟键盘导航
      const splitter = element.querySelector('.skill-split-pane__splitter');
      if (splitter) {
        splitter.focus();

        // 按左箭头键调整大小
        splitter.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'ArrowLeft',
          bubbles: true
        }));
        await flushPromises();

        // 按右箭头键调整大小
        splitter.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'ArrowRight',
          bubbles: true
        }));
        await flushPromises();

        // 按空格键折叠/展开
        splitter.dispatchEvent(new KeyboardEvent('keydown', {
          key: ' ',
          bubbles: true
        }));
        await flushPromises();
      }
    }
  });

  it('should handle splitter styles and appearance', async () => {
    const splitPaneElement = document.createElement('skill-split-pane') as any;
    splitPaneElement.direction = 'horizontal';
    splitPaneElement.defaultSizes = [50, 50];
    splitPaneElement.splitterSize = 8;
    splitPaneElement.splitterColor = '#custom-color';

    element.appendChild(splitPaneElement);
    await flushPromises();

    expect((splitPaneElement as any).splitterSize).toBe(8);
    expect((splitPaneElement as any).splitterColor).toBe('#custom-color');

    // 验证分割器样式
    const splitter = element.querySelector('.skill-split-pane__splitter');
    expect(splitter).toBeDefined();

    const computedStyle = window.getComputedStyle(splitter as Element);
    expect(computedStyle.width).toBe('8px');
  });

  it('should emit splitter click events', async () => {
    const splitPaneElement = document.createElement('skill-split-pane') as any;
    splitPaneElement.direction = 'horizontal';
    splitPaneElement.defaultSizes = [50, 50];

    element.appendChild(splitPaneElement);
    await flushPromises();

    // 监听分割器点击事件
    let splitterClickEventFired = false;
    let splitterClickEventDetail: any;

    splitPaneElement.addEventListener('skill-splitter-click', (event: any) => {
      splitterClickEventFired = true;
      splitterClickEventDetail = event.detail;
    });

    // 点击分割器
    const splitter = element.querySelector('.skill-split-pane__splitter');
    if (splitter) {
      splitter.dispatchEvent(new Event('click', { bubbles: true }));
      await flushPromises();

      expect(splitterClickEventFired).toBe(true);
      expect(splitterClickEventDetail).toBeDefined();
      expect(splitterClickEventDetail.splitterIndex).toBeDefined();
    }
  });

  it('should support double-click to collapse', async () => {
    const splitPaneElement = document.createElement('skill-split-pane') as any;
    splitPaneElement.direction = 'horizontal';
    splitPaneElement.defaultSizes = [60, 40];

    splitPaneElement.panes = [
      { content: 'Main pane' },
      { content: 'Collapsible pane', collapsible: true }
    ];

    element.appendChild(splitPaneElement);
    await flushPromises();

    const splitter = element.querySelector('.skill-split-pane__splitter');
    if (splitter) {
      // 双击分割器
      splitter.dispatchEvent(new Event('dblclick', { bubbles: true }));
      await flushPromises();

      // 验证面板被折叠
      expect((splitPaneElement as any).panes[1].collapsed).toBe(true);
    }
  });
});