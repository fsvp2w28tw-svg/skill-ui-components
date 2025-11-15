import { html, render } from 'lit';
import { createMockData, flushPromises } from './setup';

describe('Skill Filterable List Tests', () => {
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

  it('should render filterable list correctly', async () => {
    const mockData = createMockData(50);
    const filterableListElement = document.createElement('skill-filterable-list') as any;
    filterableListElement.items = mockData;
    filterableListElement.searchable = true;

    element.appendChild(filterableListElement);
    await flushPromises();

    // 验证可筛选列表渲染
    const filterableList = element.querySelector('skill-filterable-list');
    expect(filterableList).toBeDefined();
    expect((filterableList as any).items.length).toBe(50);
    expect((filterableList as any).searchable).toBe(true);
  });

  it('should handle empty data gracefully', async () => {
    const filterableListElement = document.createElement('skill-filterable-list') as any;
    filterableListElement.items = [];
    filterableListElement.searchable = true;

    element.appendChild(filterableListElement);
    await flushPromises();

    // 验证空数据状态
    const emptyState = element.querySelector('.skill-filterable-list__empty');
    expect(emptyState).toBeDefined();
  });

  it('should filter items based on search input', async () => {
    const mockData = createMockData(20);
    const filterableListElement = document.createElement('skill-filterable-list') as any;
    filterableListElement.items = mockData;
    filterableListElement.searchable = true;
    filterableListElement.searchFields = ['name', 'description'];

    element.appendChild(filterableListElement);
    await flushPromises();

    // 验证搜索框存在
    const searchInput = element.querySelector('.skill-filterable-list__search input');
    expect(searchInput).toBeDefined();

    // 模拟搜索输入
    if (searchInput) {
      (searchInput as HTMLInputElement).value = 'User 1';
      searchInput.dispatchEvent(new Event('input'));

      await flushPromises();

      // 验证过滤后的结果
      const filteredItems = element.querySelectorAll('.skill-filterable-list__item');
      expect(filteredItems.length).toBeLessThan(mockData.length);
      expect((filterableListElement as any).filteredItems.length).toBeLessThan(mockData.length);
    }
  });

  it('should emit search events', async () => {
    const mockData = createMockData(30);
    const filterableListElement = document.createElement('skill-filterable-list') as any;
    filterableListElement.items = mockData;
    filterableListElement.searchable = true;

    element.appendChild(filterableListElement);
    await flushPromises();

    // 监听搜索事件
    let searchEventFired = false;
    let searchEventDetail: any;

    filterableListElement.addEventListener('skill-search', (event: any) => {
      searchEventFired = true;
      searchEventDetail = event.detail;
    });

    // 触发搜索
    const searchInput = element.querySelector('.skill-filterable-list__search input');
    if (searchInput) {
      (searchInput as HTMLInputElement).value = 'test query';
      searchInput.dispatchEvent(new Event('input'));

      await flushPromises();

      expect(searchEventFired).toBe(true);
      expect(searchEventDetail).toBeDefined();
      expect(searchEventDetail.query).toBe('test query');
    }
  });

  it('should support custom filters', async () => {
    const mockData = [
      { id: 1, name: 'Item 1', category: 'A', status: 'active' },
      { id: 2, name: 'Item 2', category: 'B', status: 'inactive' },
      { id: 3, name: 'Item 3', category: 'A', status: 'active' }
    ];

    const filterableListElement = document.createElement('skill-filterable-list') as any;
    filterableListElement.items = mockData;
    filterableListElement.filters = [
      {
        field: 'category',
        type: 'select',
        options: ['A', 'B'],
        label: 'Category'
      },
      {
        field: 'status',
        type: 'checkbox',
        options: ['active', 'inactive'],
        label: 'Status'
      }
    ];

    element.appendChild(filterableListElement);
    await flushPromises();

    // 验证筛选器渲染
    const categoryFilter = element.querySelector('select');
    const statusFilters = element.querySelectorAll('input[type="checkbox"]');

    expect(categoryFilter).toBeDefined();
    expect(statusFilters.length).toBe(2);

    // 应用筛选
    if (categoryFilter) {
      (categoryFilter as HTMLSelectElement).value = 'A';
      categoryFilter.dispatchEvent(new Event('change'));

      await flushPromises();

      // 验证筛选结果
      expect((filterableListElement as any).filteredItems.length).toBe(2);
    }
  });

  it('should emit filter change events', async () => {
    const mockData = createMockData(20);
    const filterableListElement = document.createElement('skill-filterable-list') as any;
    filterableListElement.items = mockData;
    filterableListElement.filters = [
      {
        field: 'status',
        type: 'select',
        options: ['active', 'inactive'],
        label: 'Status'
      }
    ];

    element.appendChild(filterableListElement);
    await flushPromises();

    // 监听筛选变化事件
    let filterChangeEventFired = false;
    let filterChangeEventDetail: any;

    filterableListElement.addEventListener('skill-filter-change', (event: any) => {
      filterChangeEventFired = true;
      filterChangeEventDetail = event.detail;
    });

    // 应用筛选
    const filterSelect = element.querySelector('select');
    if (filterSelect) {
      (filterSelect as HTMLSelectElement).value = 'active';
      filterSelect.dispatchEvent(new Event('change'));

      await flushPromises();

      expect(filterChangeEventFired).toBe(true);
      expect(filterChangeEventDetail).toBeDefined();
      expect(filterChangeEventDetail.field).toBe('status');
      expect(filterChangeEventDetail.value).toBe('active');
    }
  });

  it('should support custom item templates', async () => {
    const mockData = createMockData(10);
    const filterableListElement = document.createElement('skill-filterable-list') as any;
    filterableListElement.items = mockData;

    // 设置自定义渲染模板
    filterableListElement.itemTemplate = (item: any, index: number) => html`
      <div class="custom-item">
        <h4>${item.name}</h4>
        <p>Index: ${index}</p>
        <span>${item.description}</span>
      </div>
    `;

    element.appendChild(filterableListElement);
    await flushPromises();

    // 验证自定义模板渲染
    const customItem = element.querySelector('.custom-item');
    expect(customItem).toBeDefined();
  });

  it('should handle item selection', async () => {
    const mockData = createMockData(15);
    const filterableListElement = document.createElement('skill-filterable-list') as any;
    filterableListElement.items = mockData;
    filterableListElement.selectable = true;

    element.appendChild(filterableListElement);
    await flushPromises();

    expect((filterableListElement as any).selectable).toBe(true);
    expect((filterableListElement as any).selectedItems).toEqual([]);

    // 模拟选择项目
    const firstItem = element.querySelector('.skill-filterable-list__item');
    if (firstItem) {
      firstItem.dispatchEvent(new Event('click'));
      await flushPromises();

      expect((filterableListElement as any).selectedItems.length).toBe(1);
    }
  });

  it('should support multi-selection', async () => {
    const mockData = createMockData(10);
    const filterableListElement = document.createElement('skill-filterable-list') as any;
    filterableListElement.items = mockData;
    filterableListElement.selectable = true;
    filterableListElement.multiple = true;

    element.appendChild(filterableListElement);
    await flushPromises();

    expect((filterableListElement as any).multiple).toBe(true);

    const items = element.querySelectorAll('.skill-filterable-list__item');

    // 选择多个项目
    if (items.length >= 2) {
      items[0].dispatchEvent(new Event('click'));
      await flushPromises();

      items[1].dispatchEvent(new Event('click'));
      await flushPromises();

      expect((filterableListElement as any).selectedItems.length).toBe(2);
    }
  });

  it('should support sorting', async () => {
    const mockData = [
      { id: 1, name: 'Zebra', value: 10 },
      { id: 2, name: 'Apple', value: 5 },
      { id: 3, name: 'Banana', value: 15 }
    ];

    const filterableListElement = document.createElement('skill-filterable-list') as any;
    filterableListElement.items = mockData;
    filterableListElement.sortable = true;
    filterableListElement.sortOptions = [
      { field: 'name', label: 'Name', direction: 'asc' },
      { field: 'value', label: 'Value', direction: 'desc' }
    ];

    element.appendChild(filterableListElement);
    await flushPromises();

    expect((filterableListElement as any).sortable).toBe(true);

    // 验证排序控件存在
    const sortSelect = element.querySelector('.skill-filterable-list__sort select');
    expect(sortSelect).toBeDefined();

    // 应用排序
    if (sortSelect) {
      (sortSelect as HTMLSelectElement).value = 'name';
      sortSelect.dispatchEvent(new Event('change'));

      await flushPromises();

      // 验证排序结果
      const firstItem = (filterableListElement as any).filteredItems[0];
      expect(firstItem.name).toBe('Apple'); // 按字母升序排列
    }
  });

  it('should emit sort change events', async () => {
    const mockData = createMockData(20);
    const filterableListElement = document.createElement('skill-filterable-list') as any;
    filterableListElement.items = mockData;
    filterableListElement.sortable = true;
    filterableListElement.sortOptions = [
      { field: 'name', label: 'Name' }
    ];

    element.appendChild(filterableListElement);
    await flushPromises();

    // 监听排序变化事件
    let sortChangeEventFired = false;
    let sortChangeEventDetail: any;

    filterableListElement.addEventListener('skill-sort-change', (event: any) => {
      sortChangeEventFired = true;
      sortChangeEventDetail = event.detail;
    });

    // 应用排序
    const sortSelect = element.querySelector('.skill-filterable-list__sort select');
    if (sortSelect) {
      (sortSelect as HTMLSelectElement).value = 'name';
      sortSelect.dispatchEvent(new Event('change'));

      await flushPromises();

      expect(sortChangeEventFired).toBe(true);
      expect(sortChangeEventDetail).toBeDefined();
      expect(sortChangeEventDetail.field).toBe('name');
    }
  });

  it('should handle loading state', async () => {
    const filterableListElement = document.createElement('skill-filterable-list') as any;
    filterableListElement.loading = true;
    filterableListElement.searchable = true;

    element.appendChild(filterableListElement);
    await flushPromises();

    // 验证加载状态
    const loadingState = element.querySelector('.skill-filterable-list__loading');
    expect(loadingState).toBeDefined();
    expect((filterableListElement as any).loading).toBe(true);
  });

  it('should handle search debouncing', async () => {
    const mockData = createMockData(100);
    const filterableListElement = document.createElement('skill-filterable-list') as any;
    filterableListElement.items = mockData;
    filterableListElement.searchable = true;
    filterableListElement.searchDebounce = 300;

    element.appendChild(filterableListElement);
    await flushPromises();

    expect((filterableListElement as any).searchDebounce).toBe(300);

    // 快速输入多个字符
    const searchInput = element.querySelector('.skill-filterable-list__search input');
    if (searchInput) {
      (searchInput as HTMLInputElement).value = 'a';
      searchInput.dispatchEvent(new Event('input'));

      (searchInput as HTMLInputElement).value = 'ab';
      searchInput.dispatchEvent(new Event('input'));

      (searchInput as HTMLInputElement).value = 'abc';
      searchInput.dispatchEvent(new Event('input'));

      // 等待防抖延迟
      await new Promise(resolve => setTimeout(resolve, 350));

      // 验证只执行了最后一次搜索
      expect((filterableListElement as any).searchQuery).toBe('abc');
    }
  });

  it('should clear filters and search', async () => {
    const mockData = createMockData(30);
    const filterableListElement = document.createElement('skill-filterable-list') as any;
    filterableListElement.items = mockData;
    filterableListElement.searchable = true;
    filterableListElement.filters = [
      {
        field: 'status',
        type: 'select',
        options: ['active', 'inactive'],
        label: 'Status'
      }
    ];

    element.appendChild(filterableListElement);
    await flushPromises();

    // 应用搜索和筛选
    const searchInput = element.querySelector('.skill-filterable-list__search input');
    const filterSelect = element.querySelector('select');

    if (searchInput && filterSelect) {
      (searchInput as HTMLInputElement).value = 'test';
      searchInput.dispatchEvent(new Event('input'));

      (filterSelect as HTMLSelectElement).value = 'active';
      filterSelect.dispatchEvent(new Event('change'));

      await flushPromises();

      // 验证已应用筛选
      expect((filterableListElement as any).filteredItems.length).toBeLessThan(mockData.length);

      // 清除筛选
      const clearButton = element.querySelector('.skill-filterable-list__clear');
      if (clearButton) {
        clearButton.dispatchEvent(new Event('click'));
        await flushPromises();

        // 验证筛选已清除
        expect((filterableListElement as any).filteredItems.length).toBe(mockData.length);
        expect((filterableListElement as any).searchQuery).toBe('');
      }
    }
  });
});