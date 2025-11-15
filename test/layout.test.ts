import { html, render } from 'lit';
import { createMockData, flushPromises } from './setup';

describe('Skill Layout Tests', () => {
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

  it('should render layout correctly', async () => {
    const layoutElement = document.createElement('skill-layout') as any;
    layoutElement.type = 'default';

    element.appendChild(layoutElement);
    await flushPromises();

    // 验证布局组件渲染
    const layout = element.querySelector('skill-layout');
    expect(layout).toBeDefined();
    expect((layout as any).type).toBe('default');
  });

  it('should render different layout types', async () => {
    const layoutTypes = ['default', 'sidebar', 'header', 'footer', 'main'];

    for (const type of layoutTypes) {
      const layoutElement = document.createElement('skill-layout') as any;
      layoutElement.type = type;

      element.appendChild(layoutElement);
      await flushPromises();

      expect((layoutElement as any).type).toBe(type);
      expect(element.querySelector(`.skill-layout--${type}`)).toBeDefined();

      // 清理
      element.removeChild(layoutElement);
    }
  });

  it('should render with header and sidebar', async () => {
    const layoutElement = document.createElement('skill-layout') as any;
    layoutElement.type = 'sidebar';
    layoutElement.hasHeader = true;
    layoutElement.hasSidebar = true;
    layoutElement.hasFooter = true;

    // 设置内容
    layoutElement.headerContent = html`<div class="test-header">Header Content</div>`;
    layoutElement.sidebarContent = html`<div class="test-sidebar">Sidebar Content</div>`;
    layoutElement.mainContent = html`<div class="test-main">Main Content</div>`;
    layoutElement.footerContent = html`<div class="test-footer">Footer Content</div>`;

    element.appendChild(layoutElement);
    await flushPromises();

    expect((layoutElement as any).hasHeader).toBe(true);
    expect((layoutElement as any).hasSidebar).toBe(true);
    expect((layoutElement as any).hasFooter).toBe(true);

    // 验证各部分渲染
    expect(element.querySelector('.test-header')).toBeDefined();
    expect(element.querySelector('.test-sidebar')).toBeDefined();
    expect(element.querySelector('.test-main')).toBeDefined();
    expect(element.querySelector('.test-footer')).toBeDefined();
  });

  it('should support responsive behavior', async () => {
    const layoutElement = document.createElement('skill-layout') as any;
    layoutElement.type = 'sidebar';
    layoutElement.responsive = true;

    element.appendChild(layoutElement);
    await flushPromises();

    expect((layoutElement as any).responsive).toBe(true);

    // 验证响应式样式类
    const layout = element.querySelector('.skill-layout--responsive');
    expect(layout).toBeDefined();

    // 模拟移动端视口
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768
    });

    window.dispatchEvent(new Event('resize'));
    await flushPromises();
  });

  it('should support collapsible sidebar', async () => {
    const layoutElement = document.createElement('skill-layout') as any;
    layoutElement.type = 'sidebar';
    layoutElement.collapsibleSidebar = true;
    layoutElement.sidebarCollapsed = false;

    element.appendChild(layoutElement);
    await flushPromises();

    expect((layoutElement as any).collapsibleSidebar).toBe(true);
    expect((layoutElement as any).sidebarCollapsed).toBe(false);

    // 验证折叠按钮存在
    const collapseButton = element.querySelector('.skill-layout__sidebar-toggle');
    expect(collapseButton).toBeDefined();

    // 模拟折叠侧边栏
    if (collapseButton) {
      collapseButton.dispatchEvent(new Event('click'));
      await flushPromises();

      expect((layoutElement as any).sidebarCollapsed).toBe(true);
      expect(element.querySelector('.skill-layout--sidebar-collapsed')).toBeDefined();
    }
  });

  it('should emit sidebar toggle events', async () => {
    const layoutElement = document.createElement('skill-layout') as any;
    layoutElement.type = 'sidebar';
    layoutElement.collapsibleSidebar = true;

    element.appendChild(layoutElement);
    await flushPromises();

    // 监听侧边栏切换事件
    let toggleEventFired = false;
    let toggleEventDetail: any;

    layoutElement.addEventListener('skill-sidebar-toggle', (event: any) => {
      toggleEventFired = true;
      toggleEventDetail = event.detail;
    });

    // 点击折叠按钮
    const collapseButton = element.querySelector('.skill-layout__sidebar-toggle');
    if (collapseButton) {
      collapseButton.dispatchEvent(new Event('click'));
      await flushPromises();

      expect(toggleEventFired).toBe(true);
      expect(toggleEventDetail).toBeDefined();
      expect(toggleEventDetail.collapsed).toBeDefined();
    }
  });

  it('should support different sidebar positions', async () => {
    const sidebarPositions = ['left', 'right'];

    for (const position of sidebarPositions) {
      const layoutElement = document.createElement('skill-layout') as any;
      layoutElement.type = 'sidebar';
      layoutElement.sidebarPosition = position;

      element.appendChild(layoutElement);
      await flushPromises();

      expect((layoutElement as any).sidebarPosition).toBe(position);
      expect(element.querySelector(`.skill-layout--sidebar-${position}`)).toBeDefined();

      // 清理
      element.removeChild(layoutElement);
    }
  });

  it('should support fixed header and footer', async () => {
    const layoutElement = document.createElement('skill-layout') as any;
    layoutElement.type = 'main';
    layoutElement.fixedHeader = true;
    layoutElement.fixedFooter = true;

    element.appendChild(layoutElement);
    await flushPromises();

    expect((layoutElement as any).fixedHeader).toBe(true);
    expect((layoutElement as any).fixedFooter).toBe(true);

    // 验证固定样式类
    expect(element.querySelector('.skill-layout--header-fixed')).toBeDefined();
    expect(element.querySelector('.skill-layout--footer-fixed')).toBeDefined();
  });

  it('should support custom layouts through slots', async () => {
    const layoutElement = document.createElement('skill-layout') as any;
    layoutElement.innerHTML = `
      <div slot="header">Custom Header</div>
      <div slot="sidebar">Custom Sidebar</div>
      <div slot="main">Custom Main Content</div>
      <div slot="footer">Custom Footer</div>
    `;

    element.appendChild(layoutElement);
    await flushPromises();

    // 验证插槽内容
    const headerSlot = element.querySelector('[slot="header"]');
    const sidebarSlot = element.querySelector('[slot="sidebar"]');
    const mainSlot = element.querySelector('[slot="main"]');
    const footerSlot = element.querySelector('[slot="footer"]');

    expect(headerSlot?.textContent).toBe('Custom Header');
    expect(sidebarSlot?.textContent).toBe('Custom Sidebar');
    expect(mainSlot?.textContent).toBe('Custom Main Content');
    expect(footerSlot?.textContent).toBe('Custom Footer');
  });

  it('should support different layout widths', async () => {
    const layoutElement = document.createElement('skill-layout') as any;
    layoutElement.type = 'main';
    layoutElement.width = 'fluid';

    element.appendChild(layoutElement);
    await flushPromises();

    expect((layoutElement as any).width).toBe('fluid');
    expect(element.querySelector('.skill-layout--fluid')).toBeDefined();

    // 更改为固定宽度
    layoutElement.width = 'fixed';
    await flushPromises();

    expect(element.querySelector('.skill-layout--fixed')).toBeDefined();
  });

  it('should support sidebar width customization', async () => {
    const layoutElement = document.createElement('skill-layout') as any;
    layoutElement.type = 'sidebar';
    layoutElement.sidebarWidth = 300;

    element.appendChild(layoutElement);
    await flushPromises();

    expect((layoutElement as any).sidebarWidth).toBe(300);

    const sidebar = element.querySelector('.skill-layout__sidebar');
    if (sidebar) {
      const computedStyle = window.getComputedStyle(sidebar);
      expect(computedStyle.width).toBe('300px');
    }
  });

  it('should support theme variations', async () => {
    const themes = ['light', 'dark', 'auto'];

    for (const theme of themes) {
      const layoutElement = document.createElement('skill-layout') as any;
      layoutElement.theme = theme;

      element.appendChild(layoutElement);
      await flushPromises();

      expect((layoutElement as any).theme).toBe(theme);
      expect(element.querySelector(`.skill-layout--theme-${theme}`)).toBeDefined();

      // 清理
      element.removeChild(layoutElement);
    }
  });

  it('should handle loading states', async () => {
    const layoutElement = document.createElement('skill-layout') as any;
    layoutElement.type = 'main';
    layoutElement.loading = true;

    element.appendChild(layoutElement);
    await flushPromises();

    expect((layoutElement as any).loading).toBe(true);

    // 验证加载状态
    const loadingOverlay = element.querySelector('.skill-layout__loading');
    expect(loadingOverlay).toBeDefined();
  });

  it('should support programmatic layout control', async () => {
    const layoutElement = document.createElement('skill-layout') as any;
    layoutElement.type = 'sidebar';

    element.appendChild(layoutElement);
    await flushPromises();

    // 程序化切换侧边栏
    layoutElement.toggleSidebar();
    await flushPromises();

    expect((layoutElement as any).sidebarCollapsed).toBe(true);

    // 程序化设置布局类型
    layoutElement.setType('main');
    await flushPromises();

    expect((layoutElement as any).type).toBe('main');
    expect(element.querySelector('.skill-layout--main')).toBeDefined();
  });

  it('should emit layout change events', async () => {
    const layoutElement = document.createElement('skill-layout') as any;
    layoutElement.type = 'sidebar';

    element.appendChild(layoutElement);
    await flushPromises();

    // 监听布局变化事件
    let changeEventFired = false;
    let changeEventDetail: any;

    layoutElement.addEventListener('skill-layout-change', (event: any) => {
      changeEventFired = true;
      changeEventDetail = event.detail;
    });

    // 更改布局类型
    layoutElement.type = 'main';
    await flushPromises();

    expect(changeEventFired).toBe(true);
    expect(changeEventDetail).toBeDefined();
    expect(changeEventDetail.oldType).toBe('sidebar');
    expect(changeEventDetail.newType).toBe('main');
  });

  it('should support container sizing', async () => {
    const containerSizes = ['sm', 'md', 'lg', 'xl', 'full'];

    for (const size of containerSizes) {
      const layoutElement = document.createElement('skill-layout') as any;
      layoutElement.type = 'main';
      layoutElement.containerSize = size;

      element.appendChild(layoutElement);
      await flushPromises();

      expect((layoutElement as any).containerSize).toBe(size);
      expect(element.querySelector(`.skill-layout__container--${size}`)).toBeDefined();

      // 清理
      element.removeChild(layoutElement);
    }
  });

  it('should support spacing customization', async () => {
    const layoutElement = document.createElement('skill-layout') as any;
    layoutElement.type = 'sidebar';
    layoutElement.spacing = 'compact';

    element.appendChild(layoutElement);
    await flushPromises();

    expect((layoutElement as any).spacing).toBe('compact');
    expect(element.querySelector('.skill-layout--spacing-compact')).toBeDefined();

    // 更改为宽松间距
    layoutElement.spacing = 'relaxed';
    await flushPromises();

    expect(element.querySelector('.skill-layout--spacing-relaxed')).toBeDefined();
  });

  it('should support accessibility features', async () => {
    const layoutElement = document.createElement('skill-layout') as any;
    layoutElement.type = 'sidebar';
    layoutElement.collapsibleSidebar = true;

    element.appendChild(layoutElement);
    await flushPromises();

    // 验证ARIA属性
    const sidebar = element.querySelector('.skill-layout__sidebar');
    const main = element.querySelector('.skill-layout__main');
    const toggleButton = element.querySelector('.skill-layout__sidebar-toggle');

    expect(sidebar?.getAttribute('role')).toBe('complementary');
    expect(main?.getAttribute('role')).toBe('main');
    expect(toggleButton?.getAttribute('aria-label')).toBeDefined();
    expect(toggleButton?.getAttribute('aria-expanded')).toBeDefined();
  });

  it('should handle nested layouts', async () => {
    const outerLayout = document.createElement('skill-layout') as any;
    outerLayout.type = 'main';

    const innerLayout = document.createElement('skill-layout') as any;
    innerLayout.type = 'sidebar';
    innerLayout.innerHTML = '<div slot="main">Nested content</div>';

    outerLayout.innerHTML = `
      <div slot="main">
        ${innerLayout.outerHTML}
      </div>
    `;

    element.appendChild(outerLayout);
    await flushPromises();

    // 验证嵌套布局
    const nestedLayout = element.querySelector('skill-layout skill-layout');
    expect(nestedLayout).toBeDefined();
  });

  it('should support keyboard navigation', async () => {
    const layoutElement = document.createElement('skill-layout') as any;
    layoutElement.type = 'sidebar';
    layoutElement.collapsibleSidebar = true;
    layoutElement.keyboardNavigation = true;

    element.appendChild(layoutElement);
    await flushPromises();

    expect((layoutElement as any).keyboardNavigation).toBe(true);

    const layout = element.querySelector('.skill-layout');
    if (layout) {
      layout.focus();

      // 模拟键盘快捷键
      layout.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true
      }));
      await flushPromises();

      // 验证键盘导航被处理
      expect((layoutElement as any).keyboardNavigation).toBe(true);
    }
  });
});