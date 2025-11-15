import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { treeViewStyles } from './skill-tree-view.styles';
import { baseStyles } from '../../../styles/base';

export interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  children?: TreeNode[];
  disabled?: boolean;
  selectable?: boolean;
  expanded?: boolean;
  selected?: boolean;
  loading?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  // label?: string; // 重复声明，已移除
  data?: any;
  hasChildren?: boolean;
  lazy?: boolean;
  level?: number; // 添加缺失的 level 属性
}

export interface TreeViewEventDetail {
  node: TreeNode;
  nodes: TreeNode[];
  originalEvent: Event;
}

/**
 * Skill TreeView Component - 树形数据展示组件
 *
 * @slot node-actions - 节点操作按钮插槽
 * @slot node-icon - 节点图标插槽
 * @slot node-label - 节点标签插槽
 * @slot empty - 空状态插槽
 *
 * @csspart tree - 树容器
 * @csspart node - 树节点
 * @csspart node-content - 节点内容
 * @csspart node-text - 节点文本
 * @csspart expand-icon - 展开/折叠图标
 * @csspart node-icon - 节点图标
 * @csspart node-label - 节点标签
 * @csspart node-actions - 节点操作按钮
 * @csspart children - 子节点容器
 *
 * @cssprop --tree-node-indent - 节点缩进距离
 * @cssprop --tree-node-height - 节点高度
 * @cssprop --tree-node-bg-hover - 节点悬停背景色
 * @cssprop --tree-node-bg-selected - 节点选中背景色
 * @cssprop --tree-expand-icon-size - 展开/折叠图标大小
 *
 * @fires skill-tree-node-click - 节点点击事件
 * @fires skill-tree-node-expand - 节点展开事件
 * @fires skill-tree-node-collapse - 节点折叠事件
 * @fires skill-tree-node-select - 节点选中事件
 * @fires skill-tree-node-check - 节点勾选事件
 * @fires skill-tree-node-dblclick - 节点双击事件
 * @fires skill-tree-node-contextmenu - 节点右键菜单事件
 *
 * @example
 * ```html
 * <!-- 基础树形组件 -->
 * <skill-tree-view
 *   .nodes=${[
 *     {
 *       id: '1',
 *       label: 'Root Node',
 *       children: [
 *         {
 *           id: '1-1',
 *           label: 'Child Node 1',
 *           children: [
 *             { id: '1-1-1', label: 'Leaf Node 1' },
 *             { id: '1-1-2', label: 'Leaf Node 2' }
 *           ]
 *         },
 *         {
 *           id: '1-2',
 *           label: 'Child Node 2'
 *         }
 *       ]
 *     }
 *   ]}
 * ></skill-tree-view>
 *
 * <!-- 带图标和标签的树 -->
 * <skill-tree-view
 *   show-icons
 *   show-labels
 *   .nodes=${[
 *     {
 *       id: 'folder1',
 *       label: 'Documents',
 *       icon: 'folder',
 *       label: '12 items',
 *       children: [
 *         { id: 'file1', label: 'Report.pdf', icon: 'file' },
 *         { id: 'file2', label: 'Presentation.pptx', icon: 'file' }
 *       ]
 *     }
 *   ]}
 * ></skill-tree-view>
 *
 * <!-- 可选中的树 -->
 * <skill-tree-view
 *   selectable
 *   .nodes=${treeNodes}
 *   @skill-tree-node-select=${handleNodeSelect}
 * ></skill-tree-view>
 *
 * <!-- 带复选框的树 -->
 * <skill-tree-view
 *   checkable
 *   .nodes=${treeNodes}
 *   @skill-tree-node-check=${handleNodeCheck}
 * ></skill-tree-view>
 *
 * <!-- 虚拟滚动树（大量数据） -->
 * <skill-tree-view
 *   virtual-scroll
 *   item-height="32"
 *   .nodes=${largeDataSet}
 * ></skill-tree-view>
 *
 * <!-- 可拖拽的树 -->
 * <skill-tree-view
 *   draggable
 *   .nodes=${treeNodes}
 *   @skill-tree-node-drop=${handleNodeDrop}
 * ></skill-tree-view>
 *
 * <!-- 带连接线的树 -->
 * <skill-tree-view
 *   show-lines
 *   line-style="dashed"
 *   .nodes=${treeNodes}
 * ></skill-tree-view>
 *
 * <!-- 搜索过滤树 -->
 * <skill-tree-view
 *   .nodes=${treeNodes}
 *   .searchText=${searchText}
 * ></skill-tree-view>
 *
 * <!-- 异步加载子节点 -->
 * <skill-tree-view
 *   lazy
 *   .nodes=${treeNodes}
 *   @skill-tree-node-expand=${handleLazyLoad}
 * ></skill-tree-view>
 *
 * <!-- 自定义节点渲染 -->
 * <skill-tree-view .nodes=${treeNodes}>
 *   <div slot="node-actions" data-node-id="${node.id}">
 *     <button class="edit-btn">Edit</button>
 *     <button class="delete-btn">Delete</button>
 *   </div>
 * </skill-tree-view>
 * ```
 */
@customElement('skill-tree-view')
export class SkillTreeView extends LitElement {
  static styles = [baseStyles, treeViewStyles];

  /**
   * 树节点数据
   */
  @property({ type: Array })
  nodes: TreeNode[] = [];

  /**
   * 是否显示图标
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-icons' })
  showIcons = false;

  /**
   * 是否显示标签
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-labels' })
  showLabels = false;

  /**
   * 是否可选择
   */
  @property({ type: Boolean, reflect: true })
  selectable = false;

  /**
   * 是否可勾选
   */
  @property({ type: Boolean, reflect: true })
  checkable = false;

  /**
   * 是否显示连接线
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-lines' })
  showLines = false;

  /**
   * 连接线样式
   * @type {'solid' | 'dashed'}
   */
  @property({ type: String, reflect: true, attribute: 'line-style' })
  lineStyle: 'solid' | 'dashed' = 'solid';

  /**
   * 是否可拖拽
   */
  @property({ type: Boolean, reflect: true })
  draggable = false;

  /**
   * 是否支持异步加载
   */
  @property({ type: Boolean, reflect: true })
  lazy = false;

  /**
   * 是否使用虚拟滚动
   */
  @property({ type: Boolean, reflect: true, attribute: 'virtual-scroll' })
  virtualScroll = false;

  /**
   * 虚拟滚动项高度
   */
  @property({ type: Number, reflect: true, attribute: 'item-height' })
  itemHeight = 32;

  /**
   * 搜索文本
   */
  @property({ type: String, reflect: true, attribute: 'search-text' })
  searchText = '';

  /**
   * 树尺寸
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * 是否只读
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * 是否禁用
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * ARIA 标签
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel = 'Tree view';

  /**
   * 多选模式
   */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /**
   * 选中的节点ID列表
   */
  @property({ type: Array, reflect: true, attribute: 'selected-nodes' })
  selectedNodes: string[] = [];

  /**
   * 展开的节点ID列表
   */
  @property({ type: Array, reflect: true, attribute: 'expanded-nodes' })
  expandedNodes: string[] = [];

  /**
   * 勾选的节点ID列表
   */
  @property({ type: Array, reflect: true, attribute: 'checked-nodes' })
  checkedNodes: string[] = [];

  // @query('.skill-tree-view__container')
  // private _container!: HTMLElement;

  @state()
  private _flattenedNodes: (TreeNode & { level: number; visible: boolean; parent?: TreeNode })[] = [];

  private _draggedNode?: TreeNode;
  private _dropTarget?: TreeNode; // eslint-disable-line @typescript-eslint/no-unused-vars

  connectedCallback() {
    super.connectedCallback();
    this._flattenNodes();
  }

  willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('nodes') ||
        changedProperties.has('expandedNodes') ||
        changedProperties.has('searchText')) {
      this._flattenNodes();
    }
  }

  private _flattenNodes() {
    this._flattenedNodes = this._flattenTree(this.nodes, 0);
  }

  private _flattenTree(nodes: TreeNode[], level: number, parent?: TreeNode): (TreeNode & { level: number; visible: boolean; parent?: TreeNode })[] {
    const result: (TreeNode & { level: number; visible: boolean; parent?: TreeNode })[] = [];

    for (const node of nodes) {
      const isExpanded = this.expandedNodes.includes(node.id);
      const isVisible = this._isNodeVisible(node, level, parent);

      const flatNode = {
        ...node,
        level,
        visible: isVisible,
        parent,
      };

      result.push(flatNode);

      if (node.children && node.children.length > 0 && isExpanded) {
        result.push(...this._flattenTree(node.children, level + 1, node));
      }
    }

    return result;
  }

  private _isNodeVisible(node: TreeNode, level: number, parent?: TreeNode): boolean {
    // 如果有搜索文本，检查是否匹配
    if (this.searchText) {
      const matchesSearch = this._nodeMatchesSearch(node);
      if (!matchesSearch) {
        // 检查子节点是否有匹配的
        return this._hasMatchingChild(node);
      }
    }

    // 检查父节点是否展开
    if (parent && level > 0) {
      return this.expandedNodes.includes(parent.id);
    }

    return true;
  }

  private _nodeMatchesSearch(node: TreeNode): boolean {
    const searchLower = this.searchText.toLowerCase();
    return node.label.toLowerCase().includes(searchLower);
  }

  private _hasMatchingChild(node: TreeNode): boolean {
    if (!node.children) return false;

    for (const child of node.children) {
      if (this._nodeMatchesSearch(child) || this._hasMatchingChild(child)) {
        return true;
      }
    }

    return false;
  }

  private _handleNodeClick(node: TreeNode, e: Event) {
    e.preventDefault();
    e.stopPropagation();

    if (node.disabled || this.readonly || this.disabled) return;

    // 处理展开/折叠
    if (node.children || (node.hasChildren && node.lazy)) {
      this._toggleNodeExpansion(node);
    }

    // 处理选择
    if (this.selectable && node.selectable !== false) {
      this._selectNode(node);
    }

    this._fireEvent('skill-tree-node-click', node, e);
  }

  private _handleNodeDblClick(node: TreeNode, e: Event) {
    if (node.disabled || this.readonly || this.disabled) return;
    this._fireEvent('skill-tree-node-dblclick', node, e);
  }

  private _handleNodeContextMenu(node: TreeNode, e: Event) {
    if (node.disabled || this.readonly || this.disabled) return;
    e.preventDefault();
    this._fireEvent('skill-tree-node-contextmenu', node, e);
  }

  private _handleNodeCheck(node: TreeNode, e: Event) {
    e.preventDefault();
    e.stopPropagation();

    if (node.disabled || this.readonly || this.disabled) return;

    const isChecked = !this.checkedNodes.includes(node.id);
    this._updateNodeChecked(node, isChecked);

    this._fireEvent('skill-tree-node-check', node, e);
  }

  private _toggleNodeExpansion(node: TreeNode) {
    const isExpanded = this.expandedNodes.includes(node.id);

    if (isExpanded) {
      this.expandedNodes = this.expandedNodes.filter(id => id !== node.id);
      this._fireEvent('skill-tree-node-collapse', node, new Event('collapse'));
    } else {
      if (node.lazy && !node.children) {
        // 触发异步加载
        this._fireEvent('skill-tree-node-expand', node, new Event('expand'));
      } else {
        this.expandedNodes = [...this.expandedNodes, node.id];
        this._fireEvent('skill-tree-node-expand', node, new Event('expand'));
      }
    }

    this._flattenNodes();
  }

  private _selectNode(node: TreeNode) {
    if (this.multiple) {
      if (this.selectedNodes.includes(node.id)) {
        this.selectedNodes = this.selectedNodes.filter(id => id !== node.id);
      } else {
        this.selectedNodes = [...this.selectedNodes, node.id];
      }
    } else {
      this.selectedNodes = [node.id];
    }

    this._fireEvent('skill-tree-node-select', node, new Event('select'));
  }

  private _updateNodeChecked(node: TreeNode, checked: boolean) {
    if (checked) {
      this.checkedNodes = [...this.checkedNodes, node.id];
      // 选中所有子节点
      this._checkAllChildren(node, true);
    } else {
      this.checkedNodes = this.checkedNodes.filter(id => id !== node.id);
      // 取消选中所有子节点
      this._checkAllChildren(node, false);
    }

    // 更新父节点状态
    this._updateParentCheckState(node);
  }

  private _checkAllChildren(node: TreeNode, checked: boolean) {
    if (!node.children) return;

    for (const child of node.children) {
      if (checked) {
        if (!this.checkedNodes.includes(child.id)) {
          this.checkedNodes = [...this.checkedNodes, child.id];
        }
      } else {
        this.checkedNodes = this.checkedNodes.filter(id => id !== child.id);
      }
      this._checkAllChildren(child, checked);
    }
  }

  private _updateParentCheckState(node: TreeNode) {
    const parent = this._findParentNode(node);
    if (!parent) return;

    const checkedChildren = parent.children?.filter(child =>
      this.checkedNodes.includes(child.id)
    ) || [];

    const allChildrenChecked = parent.children?.every(child =>
      this.checkedNodes.includes(child.id)
    );

    const someChildrenChecked = checkedChildren.length > 0;

    if (allChildrenChecked) {
      if (!this.checkedNodes.includes(parent.id)) {
        this.checkedNodes = [...this.checkedNodes, parent.id];
      }
    } else if (someChildrenChecked) {
      // 设置为不确定状态（这里简化处理，实际可能需要额外的indeterminate状态）
      if (!this.checkedNodes.includes(parent.id)) {
        this.checkedNodes = [...this.checkedNodes, parent.id];
      }
    } else {
      this.checkedNodes = this.checkedNodes.filter(id => id !== parent.id);
    }

    this._updateParentCheckState(parent);
  }

  private _findParentNode(node: TreeNode): TreeNode | undefined {
    return this._findParentRecursive(this.nodes, node);
  }

  private _findParentRecursive(nodes: TreeNode[], target: TreeNode): TreeNode | undefined {
    for (const node of nodes) {
      if (node.children?.includes(target)) {
        return node;
      }
      if (node.children) {
        const found = this._findParentRecursive(node.children, target);
        if (found) return found;
      }
    }
    return undefined;
  }

  private _handleDragStart(node: TreeNode, e: DragEvent) {
    if (!this.draggable || node.disabled) return;

    this._draggedNode = node;
    e.dataTransfer?.setData('text/plain', node.id);

    const target = e.target as HTMLElement;
    target.classList.add('skill-tree-view__node-content--dragging');
  }

  private _handleDragEnd(e: DragEvent) {
    const target = e.target as HTMLElement;
    target.classList.remove('skill-tree-view__node-content--dragging');
    this._dropTarget = undefined;
  }

  private _handleDragOver(e: DragEvent) {
    e.preventDefault();
    if (!this.draggable || !this._draggedNode) return;

    // 这里可以添加拖拽预览逻辑
  }

  private _handleDrop(node: TreeNode, e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.draggable || !this._draggedNode || this._draggedNode === node) return;

    this._dropTarget = node;
    this._fireEvent('skill-tree-node-drop', node, e);
  }

  private _fireEvent(eventName: string, node: TreeNode, originalEvent: Event) {
    this.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail: {
        node,
        nodes: this.nodes,
        originalEvent,
      } as TreeViewEventDetail,
    }));
  }

  private _highlightSearchText(text: string): TemplateResult {
    if (!this.searchText) return html`${text}`;

    const regex = new RegExp(`(${this.searchText})`, 'gi');
    const parts = text.split(regex);

    return html`
      ${parts.map(part =>
        part.toLowerCase() === this.searchText.toLowerCase()
          ? html`<span class="skill-tree-view__node-text--highlight">${part}</span>`
          : html`${part}`
      )}
    `;
  }

  private _renderExpandIcon(node: TreeNode): TemplateResult {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = this.expandedNodes.includes(node.id);
    const isLeaf = !hasChildren && !node.hasChildren;

    return html`
      <div
        class="skill-tree-view__expand-icon
               ${isExpanded ? 'skill-tree-view__expand-icon--expanded' : ''}
               ${isLeaf ? 'skill-tree-view__expand-icon--leaf' : ''}"
        @click=${(e: Event) => {
          e.stopPropagation();
          if (!isLeaf) {
            this._toggleNodeExpansion(node);
          }
        }}
      >
        ${!isLeaf ? html`
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 5l7 7-7 7V5z"/>
          </svg>
        ` : ''}
      </div>
    `;
  }

  private _renderNodeIcon(node: TreeNode): TemplateResult {
    if (!this.showIcons && !node.icon) return html``;

    return html`
      <div class="skill-tree-view__node-icon">
        ${node.icon ? html`
          <skill-icon name="${node.icon}" size="sm"></skill-icon>
        ` : html`
          <slot name="node-icon" data-node-id="${node.id}">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
            </svg>
          </slot>
        `}
      </div>
    `;
  }

  private _renderNodeCheckbox(node: TreeNode): TemplateResult {
    if (!this.checkable) return html``;

    const isChecked = this.checkedNodes.includes(node.id);
    const isIndeterminate = node.indeterminate;

    return html`
      <input
        type="checkbox"
        class="skill-tree-view__node-checkbox
               ${isIndeterminate ? 'skill-tree-view__node-checkbox--indeterminate' : ''}"
        ?checked=${isChecked}
        ?indeterminate=${isIndeterminate}
        .disabled=${node.disabled}
        @click=${(e: Event) => this._handleNodeCheck(node, e)}
      />
    `;
  }

  private _renderNode(node: TreeNode): TemplateResult {
    const isSelected = this.selectedNodes.includes(node.id);
    const isExpanded = this.expandedNodes.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return html`
      <li
        class="skill-tree-view__node skill-tree-view__node--level-${node.level}"
        data-node-id="${node.id}"
        data-level="${node.level}"
        style="--node-level: ${node.level}"
      >
        <div
          class="skill-tree-view__node-content
                 ${isSelected ? 'skill-tree-view__node-content--selected' : ''}
                 ${node.disabled ? 'skill-tree-view__node-content--disabled' : ''}"
          draggable=${this.draggable && !node.disabled}
          role="treeitem"
          aria-expanded="${hasChildren ? isExpanded : 'false'}"
          aria-selected="${isSelected}"
          aria-level="${(node.level || 0) + 1}"
          tabindex="0"
          @click=${(e: Event) => this._handleNodeClick(node, e)}
          @dblclick=${(e: Event) => this._handleNodeDblClick(node, e)}
          @contextmenu=${(e: Event) => this._handleNodeContextMenu(node, e)}
          @dragstart=${(e: DragEvent) => this._handleDragStart(node, e)}
          @dragend=${(e: DragEvent) => this._handleDragEnd(e)}
          @dragover=${(e: DragEvent) => this._handleDragOver(e)}
          @drop=${(e: DragEvent) => this._handleDrop(node, e)}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              this._handleNodeClick(node, e);
            }
          }}
        >
          ${this._renderExpandIcon(node)}
          ${this._renderNodeCheckbox(node)}
          ${this._renderNodeIcon(node)}

          <div class="skill-tree-view__node-text">
            ${this._highlightSearchText(node.label)}
          </div>

          ${node.label && this.showLabels ? html`
            <slot name="node-label" data-node-id="${node.id}">
              <span class="skill-tree-view__node-label">${node.label}</span>
            </slot>
          ` : ''}

          <div class="skill-tree-view__node-actions">
            <slot name="node-actions" data-node-id="${node.id}"></slot>
          </div>
        </div>

        ${hasChildren ? html`
          <ul
            class="skill-tree-view__children
                   ${isExpanded ? 'skill-tree-view__children--expanded' : 'skill-tree-view__children--collapsed'}"
            role="group"
          >
            ${node.children?.map(child => this._renderNode(child))}
          </ul>
        ` : ''}
      </li>
    `;
  }

  render(): TemplateResult {
    const filteredNodes = this._flattenedNodes.filter(node => node.visible && node.level === 0);

    return html`
      <div
        part="tree"
        class="skill-tree-view
               skill-tree-view--${this.size}
               ${this.showLines ? 'skill-tree-view--show-lines' : ''}
               ${this.showLines && this.lineStyle === 'dashed' ? 'skill-tree-view--dashed-lines' : ''}"
        role="tree"
        aria-label="${this.ariaLabel}"
      >
        <div class="skill-tree-view__container">
          <ul class="skill-tree-view__root" role="tree">
            ${filteredNodes.map(node => this._renderNode(node))}
          </ul>

          ${filteredNodes.length === 0 ? html`
            <slot name="empty">
              <div class="skill-tree-view__empty">
                No data available
              </div>
            </slot>
          ` : ''}
        </div>
      </div>
    `;
  }

  /**
   * 展开所有节点
   */
  public expandAll(): void {
    this.expandedNodes = this._getAllNodeIds(this.nodes);
    this._flattenNodes();
  }

  /**
   * 折叠所有节点
   */
  public collapseAll(): void {
    this.expandedNodes = [];
    this._flattenNodes();
  }

  /**
   * 选择所有节点
   */
  public selectAll(): void {
    this.selectedNodes = this._getAllNodeIds(this.nodes);
  }

  /**
   * 取消选择所有节点
   */
  public deselectAll(): void {
    this.selectedNodes = [];
  }

  /**
   * 勾选所有节点
   */
  public checkAll(): void {
    this.checkedNodes = this._getAllNodeIds(this.nodes);
  }

  /**
   * 取消勾选所有节点
   */
  public uncheckAll(): void {
    this.checkedNodes = [];
  }

  /**
   * 获取选中的节点
   */
  public getSelectedNodes(): TreeNode[] {
    return this._findNodesByIds(this.nodes, this.selectedNodes);
  }

  /**
   * 获取勾选的节点
   */
  public getCheckedNodes(): TreeNode[] {
    return this._findNodesByIds(this.nodes, this.checkedNodes);
  }

  /**
   * 获取展开的节点
   */
  public getExpandedNodes(): TreeNode[] {
    return this._findNodesByIds(this.nodes, this.expandedNodes);
  }

  /**
   * 根据路径展开到指定节点
   */
  public expandToNode(nodeId: string): void {
    const path = this._getNodePath(this.nodes, nodeId);
    if (path.length > 0) {
      this.expandedNodes = [...new Set([...this.expandedNodes, ...path])];
      this._flattenNodes();
    }
  }

  /**
   * 搜索节点
   */
  public searchNodes(keyword: string): TreeNode[] {
    this.searchText = keyword;
    return this._searchNodesRecursive(this.nodes, keyword.toLowerCase());
  }

  /**
   * 清除搜索
   */
  public clearSearch(): void {
    this.searchText = '';
  }

  /**
   * 添加节点
   */
  public addNode(parentId: string, node: TreeNode): void {
    const parent = this._findNodeById(this.nodes, parentId);
    if (parent) {
      if (!parent.children) parent.children = [];
      parent.children.push(node);
      this.nodes = [...this.nodes];
      this._flattenNodes();
    }
  }

  /**
   * 删除节点
   */
  public removeNode(nodeId: string): void {
    this._removeNodeRecursive(this.nodes, nodeId);
    this.nodes = [...this.nodes];
    this._flattenNodes();
  }

  /**
   * 更新节点
   */
  public updateNode(nodeId: string, updates: Partial<TreeNode>): void {
    const node = this._findNodeById(this.nodes, nodeId);
    if (node) {
      Object.assign(node, updates);
      this.nodes = [...this.nodes];
      this._flattenNodes();
    }
  }

  /**
   * 获取节点
   */
  public getNode(nodeId: string): TreeNode | undefined {
    return this._findNodeById(this.nodes, nodeId);
  }

  /**
   * 获取所有节点ID
   */
  private _getAllNodeIds(nodes: TreeNode[]): string[] {
    const ids: string[] = [];
    for (const node of nodes) {
      ids.push(node.id);
      if (node.children) {
        ids.push(...this._getAllNodeIds(node.children));
      }
    }
    return ids;
  }

  /**
   * 根据ID查找节点
   */
  private _findNodeById(nodes: TreeNode[], nodeId: string): TreeNode | undefined {
    for (const node of nodes) {
      if (node.id === nodeId) return node;
      if (node.children) {
        const found = this._findNodeById(node.children, nodeId);
        if (found) return found;
      }
    }
    return undefined;
  }

  /**
   * 根据ID列表查找节点
   */
  private _findNodesByIds(nodes: TreeNode[], nodeIds: string[]): TreeNode[] {
    const result: TreeNode[] = [];
    for (const nodeId of nodeIds) {
      const node = this._findNodeById(nodes, nodeId);
      if (node) result.push(node);
    }
    return result;
  }

  /**
   * 递归删除节点
   */
  private _removeNodeRecursive(nodes: TreeNode[], nodeId: string): boolean {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === nodeId) {
        nodes.splice(i, 1);
        return true;
      }
      if (nodes[i].children && this._removeNodeRecursive(nodes[i].children!, nodeId)) {
        return true;
      }
    }
    return false;
  }

  /**
   * 获取节点路径
   */
  private _getNodePath(nodes: TreeNode[], nodeId: string, path: string[] = []): string[] {
    for (const node of nodes) {
      if (node.id === nodeId) {
        return [...path, nodeId];
      }
      if (node.children) {
        const foundPath = this._getNodePath(node.children, nodeId, [...path, nodeId]);
        if (foundPath.length > 0) return foundPath;
      }
    }
    return [];
  }

  /**
   * 递归搜索节点
   */
  private _searchNodesRecursive(nodes: TreeNode[], keyword: string): TreeNode[] {
    const result: TreeNode[] = [];
    const keywordLower = keyword.toLowerCase();

    for (const node of nodes) {
      if (node.label.toLowerCase().includes(keywordLower)) {
        result.push(node);
      }
      if (node.children) {
        result.push(...this._searchNodesRecursive(node.children, keywordLower));
      }
    }

    return result;
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-tree-view': SkillTreeView;
  }
}