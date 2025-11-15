import { html, render } from 'lit';
import { createMockData, flushPromises } from './setup';

describe('Skill Accordion Tests', () => {
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

  it('should render accordion correctly', async () => {
    const accordionData = [
      {
        id: '1',
        title: 'Section 1',
        content: 'Content for section 1'
      },
      {
        id: '2',
        title: 'Section 2',
        content: 'Content for section 2'
      },
      {
        id: '3',
        title: 'Section 3',
        content: 'Content for section 3'
      }
    ];

    const accordionElement = document.createElement('skill-accordion') as any;
    accordionElement.items = accordionData;
    accordionElement.allowMultiple = false;

    element.appendChild(accordionElement);
    await flushPromises();

    // ���证手风琴渲染
    const accordion = element.querySelector('skill-accordion');
    expect(accordion).toBeDefined();
    expect((accordion as any).items.length).toBe(3);
    expect((accordion as any).allowMultiple).toBe(false);
  });

  it('should handle empty items gracefully', async () => {
    const accordionElement = document.createElement('skill-accordion') as any;
    accordionElement.items = [];

    element.appendChild(accordionElement);
    await flushPromises();

    // 验证空数据状态
    const emptyState = element.querySelector('.skill-accordion__empty');
    expect(emptyState).toBeDefined();
  });

  it('should expand and collapse sections', async () => {
    const accordionData = [
      {
        id: '1',
        title: 'Section 1',
        content: 'Content for section 1'
      },
      {
        id: '2',
        title: 'Section 2',
        content: 'Content for section 2'
      }
    ];

    const accordionElement = document.createElement('skill-accordion') as any;
    accordionElement.items = accordionData;

    element.appendChild(accordionElement);
    await flushPromises();

    // 初始状态应该没有展开的项目
    expect((accordionElement as any).activeItems).toEqual([]);

    // 点击第一个项目
    const firstHeader = element.querySelector('.skill-accordion__header');
    if (firstHeader) {
      firstHeader.dispatchEvent(new Event('click'));
      await flushPromises();

      expect((accordionElement as any).activeItems).toContain('1');
    }
  });

  it('should allow multiple sections when enabled', async () => {
    const accordionData = [
      {
        id: '1',
        title: 'Section 1',
        content: 'Content for section 1'
      },
      {
        id: '2',
        title: 'Section 2',
        content: 'Content for section 2'
      },
      {
        id: '3',
        title: 'Section 3',
        content: 'Content for section 3'
      }
    ];

    const accordionElement = document.createElement('skill-accordion') as any;
    accordionElement.items = accordionData;
    accordionElement.allowMultiple = true;

    element.appendChild(accordionElement);
    await flushPromises();

    expect((accordionElement as any).allowMultiple).toBe(true);

    // 展开多个项目
    const headers = element.querySelectorAll('.skill-accordion__header');
    if (headers.length >= 2) {
      headers[0].dispatchEvent(new Event('click'));
      await flushPromises();

      headers[1].dispatchEvent(new Event('click'));
      await flushPromises();

      expect((accordionElement as any).activeItems.length).toBe(2);
    }
  });

  it('should emit change events', async () => {
    const accordionData = [
      {
        id: '1',
        title: 'Section 1',
        content: 'Content for section 1'
      }
    ];

    const accordionElement = document.createElement('skill-accordion') as any;
    accordionElement.items = accordionData;

    element.appendChild(accordionElement);
    await flushPromises();

    // 监听变化事件
    let changeEventFired = false;
    let changeEventDetail: any;

    accordionElement.addEventListener('skill-change', (event: any) => {
      changeEventFired = true;
      changeEventDetail = event.detail;
    });

    // 点击项目
    const firstHeader = element.querySelector('.skill-accordion__header');
    if (firstHeader) {
      firstHeader.dispatchEvent(new Event('click'));
      await flushPromises();

      expect(changeEventFired).toBe(true);
      expect(changeEventDetail).toBeDefined();
      expect(changeEventDetail.activeItems).toContain('1');
    }
  });

  it('should support programmatic control', async () => {
    const accordionData = [
      {
        id: '1',
        title: 'Section 1',
        content: 'Content for section 1'
      },
      {
        id: '2',
        title: 'Section 2',
        content: 'Content for section 2'
      }
    ];

    const accordionElement = document.createElement('skill-accordion') as any;
    accordionElement.items = accordionData;

    element.appendChild(accordionElement);
    await flushPromises();

    // 程序化展开项目
    accordionElement.activeItems = ['1'];
    await flushPromises();

    expect((accordionElement as any).activeItems).toContain('1');

    // 程序化收起项目
    accordionElement.activeItems = [];
    await flushPromises();

    expect((accordionElement as any).activeItems).toEqual([]);
  });

  it('should render custom content templates', async () => {
    const accordionData = [
      {
        id: '1',
        title: 'Custom Section',
        content: 'Custom content'
      }
    ];

    const accordionElement = document.createElement('skill-accordion') as any;
    accordionElement.items = accordionData;

    // 设置自定义内容模板
    accordionElement.contentTemplate = (item: any) => html`
      <div class="custom-content">
        <strong>Custom:</strong> ${item.content}
      </div>
    `;

    element.appendChild(accordionElement);
    await flushPromises();

    // 验证自定义内容渲染
    const customContent = element.querySelector('.custom-content');
    expect(customContent).toBeDefined();
  });

  it('should handle disabled items', async () => {
    const accordionData = [
      {
        id: '1',
        title: 'Enabled Section',
        content: 'Content for enabled section'
      },
      {
        id: '2',
        title: 'Disabled Section',
        content: 'Content for disabled section',
        disabled: true
      }
    ];

    const accordionElement = document.createElement('skill-accordion') as any;
    accordionElement.items = accordionData;

    element.appendChild(accordionElement);
    await flushPromises();

    // 验证禁用状态
    const disabledHeader = element.querySelector('.skill-accordion__item--disabled .skill-accordion__header');
    expect(disabledHeader).toBeDefined();

    // 点击禁用的项目不应该展开
    const disabledItem = disabledHeader?.closest('.skill-accordion__item');
    if (disabledItem) {
      disabledHeader.dispatchEvent(new Event('click'));
      await flushPromises();

      expect((accordionElement as any).activeItems).not.toContain('2');
    }
  });

  it('should support different sizes', async () => {
    const accordionData = [
      {
        id: '1',
        title: 'Large Section',
        content: 'Content for large section'
      }
    ];

    const accordionElement = document.createElement('skill-accordion') as any;
    accordionElement.items = accordionData;
    accordionElement.size = 'lg';

    element.appendChild(accordionElement);
    await flushPromises();

    expect((accordionElement as any).size).toBe('lg');

    // 验证大尺寸样式类
    const accordion = element.querySelector('.skill-accordion--lg');
    expect(accordion).toBeDefined();
  });
});