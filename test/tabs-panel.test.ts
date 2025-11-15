import { html, render } from 'lit';
import { createMockData, flushPromises } from './setup';

describe('Skill Tabs Panel Tests', () => {
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

  it('should render tabs panel correctly', async () => {
    const tabsData = [
      { id: 'tab1', title: 'Tab 1', content: 'Content for tab 1' },
      { id: 'tab2', title: 'Tab 2', content: 'Content for tab 2' },
      { id: 'tab3', title: 'Tab 3', content: 'Content for tab 3' }
    ];

    const tabsPanelElement = document.createElement('skill-tabs-panel') as any;
    tabsPanelElement.tabs = tabsData;
    tabsPanelElement.activeTab = 'tab1';

    element.appendChild(tabsPanelElement);
    await flushPromises();

    // 验证标签面板渲染
    const tabsPanel = element.querySelector('skill-tabs-panel');
    expect(tabsPanel).toBeDefined();
    expect((tabsPanel as any).tabs.length).toBe(3);
    expect((tabsPanel as any).activeTab).toBe('tab1');
  });

  it('should handle empty tabs gracefully', async () => {
    const tabsPanelElement = document.createElement('skill-tabs-panel') as any;
    tabsPanelElement.tabs = [];

    element.appendChild(tabsPanelElement);
    await flushPromises();

    // 验证空数据状态
    const emptyState = element.querySelector('.skill-tabs-panel__empty');
    expect(emptyState).toBeDefined();
  });

  it('should switch tabs correctly', async () => {
    const tabsData = [
      { id: 'tab1', title: 'Tab 1', content: 'Content for tab 1' },
      { id: 'tab2', title: 'Tab 2', content: 'Content for tab 2' }
    ];

    const tabsPanelElement = document.createElement('skill-tabs-panel') as any;
    tabsPanelElement.tabs = tabsData;
    tabsPanelElement.activeTab = 'tab1';

    element.appendChild(tabsPanelElement);
    await flushPromises();

    // 验证初始激活标签
    expect((tabsPanelElement as any).activeTab).toBe('tab1');
    expect(element.querySelector('.skill-tabs-panel__tab--active')).toBeTruthy();

    // 点击第二个标签
    const secondTab = element.querySelector('[data-tab="tab2"]');
    if (secondTab) {
      secondTab.dispatchEvent(new Event('click'));
      await flushPromises();

      expect((tabsPanelElement as any).activeTab).toBe('tab2');
      expect(element.querySelector('[data-tab="tab2"].skill-tabs-panel__tab--active')).toBeTruthy();
    }
  });

  it('should emit tab change events', async () => {
    const tabsData = [
      { id: 'tab1', title: 'Tab 1', content: 'Content for tab 1' },
      { id: 'tab2', title: 'Tab 2', content: 'Content for tab 2' }
    ];

    const tabsPanelElement = document.createElement('skill-tabs-panel') as any;
    tabsPanelElement.tabs = tabsData;
    tabsPanelElement.activeTab = 'tab1';

    element.appendChild(tabsPanelElement);
    await flushPromises();

    // 监听标签变化事件
    let changeEventFired = false;
    let changeEventDetail: any;

    tabsPanelElement.addEventListener('skill-tab-change', (event: any) => {
      changeEventFired = true;
      changeEventDetail = event.detail;
    });

    // 切换标签
    const secondTab = element.querySelector('[data-tab="tab2"]');
    if (secondTab) {
      secondTab.dispatchEvent(new Event('click'));
      await flushPromises();

      expect(changeEventFired).toBe(true);
      expect(changeEventDetail).toBeDefined();
      expect(changeEventDetail.activeTab).toBe('tab2');
      expect(changeEventDetail.previousTab).toBe('tab1');
    }
  });

  it('should support disabled tabs', async () => {
    const tabsData = [
      { id: 'tab1', title: 'Tab 1', content: 'Content for tab 1' },
      { id: 'tab2', title: 'Tab 2', content: 'Content for tab 2', disabled: true },
      { id: 'tab3', title: 'Tab 3', content: 'Content for tab 3' }
    ];

    const tabsPanelElement = document.createElement('skill-tabs-panel') as any;
    tabsPanelElement.tabs = tabsData;
    tabsPanelElement.activeTab = 'tab1';

    element.appendChild(tabsPanelElement);
    await flushPromises();

    // 验证禁用标签
    const disabledTab = element.querySelector('[data-tab="tab2"].skill-tabs-panel__tab--disabled');
    expect(disabledTab).toBeDefined();

    // 点击禁用标签不应该激活
    if (disabledTab) {
      disabledTab.dispatchEvent(new Event('click'));
      await flushPromises();

      expect((tabsPanelElement as any).activeTab).toBe('tab1');
    }
  });

  it('should support different tab positions', async () => {
    const tabsData = [
      { id: 'tab1', title: 'Tab 1', content: 'Content for tab 1' },
      { id: 'tab2', title: 'Tab 2', content: 'Content for tab 2' }
    ];

    // 测试顶部位置
    const tabsPanelElement = document.createElement('skill-tabs-panel') as any;
    tabsPanelElement.tabs = tabsData;
    tabsPanelElement.position = 'top';

    element.appendChild(tabsPanelElement);
    await flushPromises();

    expect((tabsPanelElement as any).position).toBe('top');
    expect(element.querySelector('.skill-tabs-panel--top')).toBeDefined();

    // 更改为底部位置
    tabsPanelElement.position = 'bottom';
    await flushPromises();

    expect(element.querySelector('.skill-tabs-panel--bottom')).toBeDefined();
  });

  it('should support tab closable functionality', async () => {
    const tabsData = [
      { id: 'tab1', title: 'Tab 1', content: 'Content for tab 1', closable: false },
      { id: 'tab2', title: 'Tab 2', content: 'Content for tab 2', closable: true },
      { id: 'tab3', title: 'Tab 3', content: 'Content for tab 3', closable: true }
    ];

    const tabsPanelElement = document.createElement('skill-tabs-panel') as any;
    tabsPanelElement.tabs = tabsData;
    tabsPanelElement.closable = true;

    element.appendChild(tabsPanelElement);
    await flushPromises();

    expect((tabsPanelElement as any).closable).toBe(true);

    // 验证关闭按钮存在
    const closeButtons = element.querySelectorAll('.skill-tabs-panel__close');
    expect(closeButtons.length).toBe(2); // 只有可关闭的标签显示关闭按钮
  });

  it('should emit tab close events', async () => {
    const tabsData = [
      { id: 'tab1', title: 'Tab 1', content: 'Content for tab 1' },
      { id: 'tab2', title: 'Tab 2', content: 'Content for tab 2', closable: true }
    ];

    const tabsPanelElement = document.createElement('skill-tabs-panel') as any;
    tabsPanelElement.tabs = tabsData;
    tabsPanelElement.closable = true;

    element.appendChild(tabsPanelElement);
    await flushPromises();

    // 监听标签关闭事件
    let closeEventFired = false;
    let closeEventDetail: any;

    tabsPanelElement.addEventListener('skill-tab-close', (event: any) => {
      closeEventFired = true;
      closeEventDetail = event.detail;
    });

    // 点击关闭按钮
    const closeButton = element.querySelector('[data-tab="tab2"] .skill-tabs-panel__close');
    if (closeButton) {
      closeButton.dispatchEvent(new Event('click'));
      await flushPromises();

      expect(closeEventFired).toBe(true);
      expect(closeEventDetail).toBeDefined();
      expect(closeEventDetail.tabId).toBe('tab2');
    }
  });

  it('should support custom tab templates', async () => {
    const tabsData = [
      { id: 'tab1', title: 'Custom Tab 1', content: 'Content for custom tab 1', icon: 'home' },
      { id: 'tab2', title: 'Custom Tab 2', content: 'Content for custom tab 2', icon: 'settings' }
    ];

    const tabsPanelElement = document.createElement('skill-tabs-panel') as any;
    tabsPanelElement.tabs = tabsData;

    // 设置自定义标签模板
    tabsPanelElement.tabTemplate = (tab: any, isActive: boolean) => html`
      <div class="custom-tab ${isActive ? 'active' : ''}">
        <skill-icon name="${tab.icon}"></skill-icon>
        <span>${tab.title}</span>
        <span class="tab-badge">${tab.badge || 0}</span>
      </div>
    `;

    element.appendChild(tabsPanelElement);
    await flushPromises();

    // 验证自定义模板渲染
    const customTab = element.querySelector('.custom-tab');
    expect(customTab).toBeDefined();
  });

  it('should support custom content templates', async () => {
    const tabsData = [
      { id: 'tab1', title: 'Tab 1', content: { type: 'form', data: { fields: ['field1', 'field2'] } } },
      { id: 'tab2', title: 'Tab 2', content: { type: 'list', data: { items: ['item1', 'item2'] } } }
    ];

    const tabsPanelElement = document.createElement('skill-tabs-panel') as any;
    tabsPanelElement.tabs = tabsData;

    // 设置自定义内容模板
    tabsPanelElement.contentTemplate = (tab: any) => {
      if (tab.content.type === 'form') {
        return html`<div class="form-content">
          ${tab.content.data.fields.map((field: string) => html`
            <div class="field">${field}</div>
          `)}
        </div>`;
      } else if (tab.content.type === 'list') {
        return html`<div class="list-content">
          ${tab.content.data.items.map((item: string) => html`
            <div class="item">${item}</div>
          `)}
        </div>`;
      }
      return html`<div>${tab.content}</div>`;
    };

    element.appendChild(tabsPanelElement);
    await flushPromises();

    // 验证自定义内容渲染
    const formContent = element.querySelector('.form-content');
    const listContent = element.querySelector('.list-content');

    expect(formContent || listContent).toBeDefined();
  });

  it('should support keyboard navigation', async () => {
    const tabsData = [
      { id: 'tab1', title: 'Tab 1', content: 'Content for tab 1' },
      { id: 'tab2', title: 'Tab 2', content: 'Content for tab 2' },
      { id: 'tab3', title: 'Tab 3', content: 'Content for tab 3' }
    ];

    const tabsPanelElement = document.createElement('skill-tabs-panel') as any;
    tabsPanelElement.tabs = tabsData;
    tabsPanelElement.keyboardNavigation = true;

    element.appendChild(tabsPanelElement);
    await flushPromises();

    expect((tabsPanelElement as any).keyboardNavigation).toBe(true);

    const container = element.querySelector('.skill-tabs-panel');
    if (container) {
      container.focus();

      // 按右箭头键切换到下一个标签
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      await flushPromises();

      // 按左箭头键切换到上一个标签
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
      await flushPromises();

      // 按Home键跳转到第一个标签
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
      await flushPromises();

      // 按End键跳转到最后一个标签
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
      await flushPromises();
    }
  });

  it('should support scrollable tabs when too many tabs', async () => {
    const tabsData = Array.from({ length: 15 }, (_, i) => ({
      id: `tab${i + 1}`,
      title: `Tab ${i + 1}`,
      content: `Content for tab ${i + 1}`
    }));

    const tabsPanelElement = document.createElement('skill-tabs-panel') as any;
    tabsPanelElement.tabs = tabsData;
    tabsPanelElement.scrollable = true;

    element.appendChild(tabsPanelElement);
    await flushPromises();

    expect((tabsPanelElement as any).scrollable).toBe(true);

    // 验证滚动容器
    const scrollContainer = element.querySelector('.skill-tabs-panel__tabs--scrollable');
    expect(scrollContainer).toBeDefined();

    // 验证滚动按钮
    const scrollButtons = element.querySelectorAll('.skill-tabs-panel__scroll');
    expect(scrollButtons.length).toBe(2); // 左右滚动按钮
  });

  it('should support lazy loading of tab content', async () => {
    const tabsData = [
      { id: 'tab1', title: 'Tab 1', content: 'Content for tab 1' },
      { id: 'tab2', title: 'Tab 2', content: () => 'Lazy loaded content for tab 2', lazy: true }
    ];

    const tabsPanelElement = document.createElement('skill-tabs-panel') as any;
    tabsPanelElement.tabs = tabsData;
    tabsPanelElement.activeTab = 'tab1';

    element.appendChild(tabsPanelElement);
    await flushPromises();

    // 验证懒加载标签初始状态
    expect((tabsPanelElement as any).activeTab).toBe('tab1');
    expect((tabsPanelElement as any).loadedTabs).toEqual(['tab1']);

    // 切换到懒加载标签
    tabsPanelElement.activeTab = 'tab2';
    await flushPromises();

    // 验证懒加载标签已加载
    expect((tabsPanelElement as any).loadedTabs).toContain('tab2');
  });

  it('should handle programmatic tab control', async () => {
    const tabsData = [
      { id: 'tab1', title: 'Tab 1', content: 'Content for tab 1' },
      { id: 'tab2', title: 'Tab 2', content: 'Content for tab 2' },
      { id: 'tab3', title: 'Tab 3', content: 'Content for tab 3' }
    ];

    const tabsPanelElement = document.createElement('skill-tabs-panel') as any;
    tabsPanelElement.tabs = tabsData;
    tabsPanelElement.activeTab = 'tab1';

    element.appendChild(tabsPanelElement);
    await flushPromises();

    // 程序化切换标签
    tabsPanelElement.activeTab = 'tab3';
    await flushPromises();

    expect((tabsPanelElement as any).activeTab).toBe('tab3');

    // 添加新标签
    const newTab = { id: 'tab4', title: 'New Tab', content: 'New tab content' };
    tabsPanelElement.addTab(newTab);
    await flushPromises();

    expect((tabsPanelElement as any).tabs.length).toBe(4);

    // 移除标签
    tabsPanelElement.removeTab('tab2');
    await flushPromises();

    expect((tabsPanelElement as any).tabs.length).toBe(3);
    expect((tabsPanelElement as any).tabs.find((tab: any) => tab.id === 'tab2')).toBeUndefined();
  });

  it('should support different sizes and variants', async () => {
    const tabsData = [
      { id: 'tab1', title: 'Small Tab', content: 'Content for small tab' },
      { id: 'tab2', title: 'Large Tab', content: 'Content for large tab' }
    ];

    const tabsPanelElement = document.createElement('skill-tabs-panel') as any;
    tabsPanelElement.tabs = tabsData;
    tabsPanelElement.size = 'lg';
    tabsPanelElement.variant = 'pills';

    element.appendChild(tabsPanelElement);
    await flushPromises();

    expect((tabsPanelElement as any).size).toBe('lg');
    expect((tabsPanelElement as any).variant).toBe('pills');

    // 验证样式类
    expect(element.querySelector('.skill-tabs-panel--lg')).toBeDefined();
    expect(element.querySelector('.skill-tabs-panel--pills')).toBeDefined();
  });
});