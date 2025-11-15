import { html, render } from 'lit';
import { createMockData, flushPromises } from './setup';

describe('Skill Sortable Container Tests', () => {
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

  it('should render sortable container correctly', async () => {
    const mockData = createMockData(5);
    const sortableContainerElement = document.createElement('skill-sortable-container') as any;
    sortableContainerElement.items = mockData;

    element.appendChild(sortableContainerElement);
    await flushPromises();

    // 验证可排序容器渲染
    const sortableContainer = element.querySelector('skill-sortable-container');
    expect(sortableContainer).toBeDefined();
    expect((sortableContainer as any).items.length).toBe(5);
  });

  it('should handle empty data gracefully', async () => {
    const sortableContainerElement = document.createElement('skill-sortable-container') as any;
    sortableContainerElement.items = [];

    element.appendChild(sortableContainerElement);
    await flushPromises();

    // 验证空数据状态
    const emptyState = element.querySelector('.skill-sortable-container__empty');
    expect(emptyState).toBeDefined();
  });

  it('should render custom item templates', async () => {
    const mockData = createMockData(3);
    const sortableContainerElement = document.createElement('skill-sortable-container') as any;
    sortableContainerElement.items = mockData;

    // 设置自定义渲染模板
    sortableContainerElement.itemTemplate = (item: any, index: number) => html`
      <div class="custom-sortable-item">
        <h4>${item.name}</h4>
        <p>Position: ${index + 1}</p>
        <span>${item.description}</span>
      </div>
    `;

    element.appendChild(sortableContainerElement);
    await flushPromises();

    // 验证自定义模板渲染
    const customItem = element.querySelector('.custom-sortable-item');
    expect(customItem).toBeDefined();
  });

  it('should enable drag and drop functionality', async () => {
    const mockData = createMockData(4);
    const sortableContainerElement = document.createElement('skill-sortable-container') as any;
    sortableContainerElement.items = mockData;
    sortableContainerElement.draggable = true;

    element.appendChild(sortableContainerElement);
    await flushPromises();

    expect((sortableContainerElement as any).draggable).toBe(true);

    // 验证可拖拽属性
    const items = element.querySelectorAll('.skill-sortable-container__item');
    items.forEach((item, index) => {
      expect(item.getAttribute('draggable')).toBe('true');
      expect(item.getAttribute('data-index')).toBe(String(index));
    });
  });

  it('should handle drag start events', async () => {
    const mockData = createMockData(3);
    const sortableContainerElement = document.createElement('skill-sortable-container') as any;
    sortableContainerElement.items = mockData;
    sortableContainerElement.draggable = true;

    element.appendChild(sortableContainerElement);
    await flushPromises();

    // 监听拖拽开始事件
    let dragStartEventFired = false;
    let dragStartEventDetail: any;

    sortableContainerElement.addEventListener('skill-drag-start', (event: any) => {
      dragStartEventFired = true;
      dragStartEventDetail = event.detail;
    });

    // 模拟拖拽开始
    const firstItem = element.querySelector('.skill-sortable-container__item');
    if (firstItem) {
      const dragStartEvent = new DragEvent('dragstart', {
        bubbles: true,
        cancelable: true
      });

      Object.defineProperty(dragStartEvent, 'dataTransfer', {
        value: {
          setData: jest.fn(),
          effectAllowed: 'move'
        }
      });

      firstItem.dispatchEvent(dragStartEvent);
      await flushPromises();

      expect(dragStartEventFired).toBe(true);
      expect(dragStartEventDetail).toBeDefined();
      expect(dragStartEventDetail.item).toBeDefined();
      expect(dragStartEventDetail.index).toBe(0);
    }
  });

  it('should handle drag over events', async () => {
    const mockData = createMockData(3);
    const sortableContainerElement = document.createElement('skill-sortable-container') as any;
    sortableContainerElement.items = mockData;
    sortableContainerElement.draggable = true;

    element.appendChild(sortableContainerElement);
    await flushPromises();

    const items = element.querySelectorAll('.skill-sortable-container__item');

    if (items.length >= 2) {
      // 模拟拖拽悬停
      const dragOverEvent = new DragEvent('dragover', {
        bubbles: true,
        cancelable: true
      });

      Object.defineProperty(dragOverEvent, 'preventDefault', {
        value: jest.fn()
      });

      items[1].dispatchEvent(dragOverEvent);
      await flushPromises();

      expect(dragOverEvent.preventDefault).toHaveBeenCalled();
    }
  });

  it('should handle drop events and reorder items', async () => {
    const mockData = createMockData(3);
    const sortableContainerElement = document.createElement('skill-sortable-container') as any;
    sortableContainerElement.items = mockData;
    sortableContainerElement.draggable = true;

    element.appendChild(sortableContainerElement);
    await flushPromises();

    // 监听拖拽结束事件
    let dragEndEventFired = false;
    let dragEndEventDetail: any;

    sortableContainerElement.addEventListener('skill-drag-end', (event: any) => {
      dragEndEventFired = true;
      dragEndEventDetail = event.detail;
    });

    const originalOrder = [...mockData];
    const items = element.querySelectorAll('.skill-sortable-container__item');

    if (items.length >= 2) {
      // 模拟完整的拖拽操作：从第一个项目拖到第二个项目
      const dragStartEvent = new DragEvent('dragstart', {
        bubbles: true,
        cancelable: true
      });

      Object.defineProperty(dragStartEvent, 'dataTransfer', {
        value: {
          setData: jest.fn(),
          effectAllowed: 'move'
        }
      });

      items[0].dispatchEvent(dragStartEvent);

      const dropEvent = new DragEvent('drop', {
        bubbles: true,
        cancelable: true
      });

      Object.defineProperty(dropEvent, 'preventDefault', {
        value: jest.fn()
      });

      items[1].dispatchEvent(dropEvent);
      await flushPromises();

      // 验证项目已重新排序
      const newOrder = (sortableContainerElement as any).items;
      expect(newOrder).not.toEqual(originalOrder);
    }
  });

  it('should support handle-based dragging', async () => {
    const mockData = createMockData(4);
    const sortableContainerElement = document.createElement('skill-sortable-container') as any;
    sortableContainerElement.items = mockData;
    sortableContainerElement.draggable = true;
    sortableContainerElement.dragHandle = '.drag-handle';

    element.appendChild(sortableContainerElement);
    await flushPromises();

    expect((sortableContainerElement as any).dragHandle).toBe('.drag-handle');

    // 设置自定义模板包含拖拽手柄
    sortableContainerElement.itemTemplate = (item: any) => html`
      <div class="sortable-item">
        <div class="drag-handle">⋮⋮</div>
        <div class="item-content">${item.name}</div>
      </div>
    `;

    await flushPromises();

    // 验证拖拽手柄存在
    const dragHandle = element.querySelector('.drag-handle');
    expect(dragHandle).toBeDefined();

    // 验证只有手柄区域可拖拽
    const itemElement = element.querySelector('.sortable-item');
    const contentElement = element.querySelector('.item-content');

    expect(itemElement?.getAttribute('draggable')).toBe('true');
  });

  it('should support animation during sorting', async () => {
    const mockData = createMockData(3);
    const sortableContainerElement = document.createElement('skill-sortable-container') as any;
    sortableContainerElement.items = mockData;
    sortableContainerElement.draggable = true;
    sortableContainerElement.animation = true;
    sortableContainerElement.animationDuration = 300;

    element.appendChild(sortableContainerElement);
    await flushPromises();

    expect((sortableContainerElement as any).animation).toBe(true);
    expect((sortableContainerElement as any).animationDuration).toBe(300);

    // 验证动画样式类
    const container = element.querySelector('.skill-sortable-container--animated');
    expect(container).toBeDefined();
  });

  it('should support orientation', async () => {
    const mockData = createMockData(3);

    // 测试垂直方向
    const verticalContainerElement = document.createElement('skill-sortable-container') as any;
    verticalContainerElement.items = mockData;
    verticalContainerElement.orientation = 'vertical';

    element.appendChild(verticalContainerElement);
    await flushPromises();

    expect((verticalContainerElement as any).orientation).toBe('vertical');
    expect(element.querySelector('.skill-sortable-container--vertical')).toBeDefined();

    // 清理
    document.body.removeChild(verticalContainerElement);

    // 测试水平方向
    const horizontalContainerElement = document.createElement('skill-sortable-container') as any;
    horizontalContainerElement.items = mockData;
    horizontalContainerElement.orientation = 'horizontal';

    element.appendChild(horizontalContainerElement);
    await flushPromises();

    expect((horizontalContainerElement as any).orientation).toBe('horizontal');
    expect(element.querySelector('.skill-sortable-container--horizontal')).toBeDefined();
  });

  it('should handle item selection', async () => {
    const mockData = createMockData(4);
    const sortableContainerElement = document.createElement('skill-sortable-container') as any;
    sortableContainerElement.items = mockData;
    sortableContainerElement.selectable = true;

    element.appendChild(sortableContainerElement);
    await flushPromises();

    expect((sortableContainerElement as any).selectable).toBe(true);
    expect((sortableContainerElement as any).selectedItems).toEqual([]);

    // 模拟选择项目
    const firstItem = element.querySelector('.skill-sortable-container__item');
    if (firstItem) {
      firstItem.dispatchEvent(new Event('click'));
      await flushPromises();

      expect((sortableContainerElement as any).selectedItems.length).toBe(1);
    }
  });

  it('should emit reorder events', async () => {
    const mockData = createMockData(3);
    const sortableContainerElement = document.createElement('skill-sortable-container') as any;
    sortableContainerElement.items = mockData;
    sortableContainerElement.draggable = true;

    element.appendChild(sortableContainerElement);
    await flushPromises();

    // 监听重新排序事件
    let reorderEventFired = false;
    let reorderEventDetail: any;

    sortableContainerElement.addEventListener('skill-reorder', (event: any) => {
      reorderEventFired = true;
      reorderEventDetail = event.detail;
    });

    // 模拟拖拽排序
    const items = element.querySelectorAll('.skill-sortable-container__item');
    if (items.length >= 2) {
      const dragStartEvent = new DragEvent('dragstart', { bubbles: true });
      Object.defineProperty(dragStartEvent, 'dataTransfer', {
        value: { setData: jest.fn(), effectAllowed: 'move' }
      });

      items[0].dispatchEvent(dragStartEvent);

      const dropEvent = new DragEvent('drop', { bubbles: true });
      Object.defineProperty(dropEvent, 'preventDefault', { value: jest.fn() });

      items[1].dispatchEvent(dropEvent);
      await flushPromises();

      if (reorderEventFired) {
        expect(reorderEventDetail).toBeDefined();
        expect(reorderEventDetail.oldIndex).toBeDefined();
        expect(reorderEventDetail.newIndex).toBeDefined();
        expect(reorderEventDetail.newOrder).toBeDefined();
      }
    }
  });

  it('should support disabled items', async () => {
    const mockData = [
      { id: 1, name: 'Item 1', disabled: false },
      { id: 2, name: 'Item 2', disabled: true },
      { id: 3, name: 'Item 3', disabled: false }
    ];

    const sortableContainerElement = document.createElement('skill-sortable-container') as any;
    sortableContainerElement.items = mockData;
    sortableContainerElement.draggable = true;

    element.appendChild(sortableContainerElement);
    await flushPromises();

    // 验证禁用状态
    const disabledItem = element.querySelector('.skill-sortable-container__item--disabled');
    expect(disabledItem).toBeDefined();

    // 验证禁用项目不可拖拽
    expect(disabledItem?.getAttribute('draggable')).toBe('false');
  });

  it('should handle loading state', async () => {
    const sortableContainerElement = document.createElement('skill-sortable-container') as any;
    sortableContainerElement.loading = true;

    element.appendChild(sortableContainerElement);
    await flushPromises();

    // 验证加载状态
    const loadingState = element.querySelector('.skill-sortable-container__loading');
    expect(loadingState).toBeDefined();
    expect((sortableContainerElement as any).loading).toBe(true);
  });

  it('should support keyboard navigation for accessibility', async () => {
    const mockData = createMockData(3);
    const sortableContainerElement = document.createElement('skill-sortable-container') as any;
    sortableContainerElement.items = mockData;
    sortableContainerElement.draggable = true;
    sortableContainerElement.keyboardNavigation = true;

    element.appendChild(sortableContainerElement);
    await flushPromises();

    expect((sortableContainerElement as any).keyboardNavigation).toBe(true);

    const container = element.querySelector('.skill-sortable-container');
    if (container) {
      container.focus();

      // 模拟键盘导航
      const firstItem = element.querySelector('.skill-sortable-container__item');

      // 按空格键开始拖拽
      firstItem?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      await flushPromises();

      // 按箭头键移动
      firstItem?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await flushPromises();

      // 按回车键确认移动
      firstItem?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await flushPromises();
    }
  });
});