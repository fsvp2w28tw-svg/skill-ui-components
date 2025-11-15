import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { baseStyles } from '../../../styles/base';
import { paginationStyles } from './skill-pagination.styles';
import type { Size } from '../../../types';

/**
 * Pagination分页组件
 *
 * @slot prev-text - 上一页按钮文本
 * @slot next-text - 下一页按钮文本
 * @slot jumper - 自定义跳转内容
 *
 * @csspart container - 分页容器
 * @csspart prev - 上一页按钮
 * @csspart next - 下一页按钮
 * @csspart item - 页码项
 * @csspart item-active - 活跃页码项
 * @csspart jumper - 跳转输入框
 * @csspart total - 总数显示
 *
 * @cssprop --pagination-color - 文本颜色
 * @cssprop --pagination-bg-color - 背景颜色
 * @cssprop --pagination-border-color - 边框颜色
 * @cssprop --pagination-hover-bg - 悬停背景色
 * @cssprop --pagination-active-bg - 活跃背景色
 * @cssprop --pagination-active-color - 活跃文本颜色
 *
 * @fires skill-pagination-change - 页码改变时触发
 * @fires skill-pagination-size-change - 每页条数改变时触发
 *
 * @example
 * ```html
 * <skill-pagination
 *   current="1"
 *   total="100"
 *   page-size="10"
 * ></skill-pagination>
 *
 * <skill-pagination
 *   current="2"
 *   total="200"
 *   page-size="20"
 *   show-size-changer
 *   show-quick-jumper
 *   show-total
 * ></skill-pagination>
 * ```
 */
@customElement('skill-pagination')
export class SkillPagination extends LitElement {
  static styles = [
    baseStyles,
    paginationStyles
  ];

  /**
   * 当前页码
   */
  @property({ type: Number, reflect: true })
  current = 1;

  /**
   * 总条数
   */
  @property({ type: Number, reflect: true })
  total = 0;

  /**
   * 每页条数
   */
  @property({ type: Number, reflect: true })
  pageSize = 10;

  /**
   * 可选的每页条数
   */
  @property({ type: Array, reflect: false })
  pageSizes: number[] = [10, 20, 50, 100];

  /**
   * 是否显示总数
   */
  @property({ type: Boolean, reflect: true })
  showTotal = false;

  /**
   * 是否显示每页条数选择器
   */
  @property({ type: Boolean, reflect: true })
  showSizeChanger = false;

  /**
   * 是否显示快速跳转
   */
  @property({ type: Boolean, reflect: true })
  showQuickJumper = false;

  /**
   * 是否禁用
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * 是否简单模式
   */
  @property({ type: Boolean, reflect: true })
  simple = false;

  /**
   * 是否显示边框
   */
  @property({ type: Boolean, reflect: true })
  bordered = true;

  /**
   * 对齐方式
   */
  @property({ type: String, reflect: true })
  align: 'left' | 'center' | 'right' = 'left';

  /**
   * 组件大小
   */
  @property({ type: String, reflect: true })
  size: Size = 'md';

  /**
   * 最多显示页码数
   */
  @property({ type: Number, reflect: true, attribute: 'max-pages' })
  maxPages = 7;

  /**
   * 上一页文本
   */
  @property({ type: String, reflect: true })
  prevText = '上一页';

  /**
   * 下一页文本
   */
  @property({ type: String, reflect: true })
  nextText = '下一页';

  /**
   * 跳转确认文本
   */
  @property({ type: String, reflect: true })
  jumperConfirmText = '确定';

  @query('.skill-pagination__jumper input')
  private _jumperInput!: HTMLInputElement;

  private _totalPages = 0;
  private _pages: number[] = [];

  willUpdate() {
    this._calculatePages();
  }

  private _calculatePages() {
    this._totalPages = Math.max(1, Math.ceil(this.total / this.pageSize));
    this._pages = this._generatePageNumbers();
  }

  private _generatePageNumbers(): number[] {
    const pages: number[] = [];
    const totalPages = this._totalPages;
    const maxPages = this.maxPages;
    const current = this.current;

    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxPages / 2);
      let start = Math.max(1, current - half);
      let end = Math.min(totalPages, start + maxPages - 1);

      if (end - start + 1 < maxPages) {
        start = Math.max(1, end - maxPages + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  private _shouldShowEllipsis(position: 'before' | 'after'): boolean {
    const totalPages = this._totalPages;
    const maxPages = this.maxPages;

    if (totalPages <= maxPages) {
      return false;
    }

    if (position === 'before') {
      return this._pages[0] > 2;
    } else {
      return this._pages[this._pages.length - 1] < totalPages - 1;
    }
  }

  private _shouldShowFirstPage(): boolean {
    return this._totalPages > 1 && this._pages[0] > 1;
  }

  private _shouldShowLastPage(): boolean {
    return this._totalPages > 1 && this._pages[this._pages.length - 1] < this._totalPages;
  }

  render() {
    if (this.total <= 0 || this.pageSize <= 0) {
      return html``;
    }

    return html`
      <div part="container" class="skill-pagination__container">
        ${this.showTotal ? this._renderTotal() : ''}

        ${this._renderPaginationItems()}

        ${this.showSizeChanger ? this._renderSizeChanger() : ''}

        ${this.showQuickJumper ? this._renderQuickJumper() : ''}
      </div>
    `;
  }

  private _renderTotal() {
    const start = (this.current - 1) * this.pageSize + 1;
    const end = Math.min(this.current * this.pageSize, this.total);

    return html`
      <div part="total" class="skill-pagination__total">
        第 ${start}-${end} 条，共 ${this.total} 条
      </div>
    `;
  }

  private _renderPaginationItems() {
    return html`
      <div class="skill-pagination__items">
        ${this._renderPrevButton()}

        ${this._shouldShowFirstPage() ? this._renderPageItem(1) : ''}
        ${this._shouldShowEllipsis('before') ? this._renderEllipsis() : ''}

        ${this._pages.map(page => this._renderPageItem(page))}

        ${this._shouldShowEllipsis('after') ? this._renderEllipsis() : ''}
        ${this._shouldShowLastPage() ? this._renderPageItem(this._totalPages) : ''}

        ${this._renderNextButton()}
      </div>
    `;
  }

  private _renderPrevButton() {
    const isDisabled = this.current <= 1 || this.disabled;

    return html`
      <button
        part="prev"
        class="skill-pagination__item ${isDisabled ? 'skill-pagination__item--disabled' : ''}"
        ?disabled=${isDisabled}
        @click=${() => this._handlePrev()}
      >
        <slot name="prev-text">${this.prevText}</slot>
      </button>
    `;
  }

  private _renderNextButton() {
    const isDisabled = this.current >= this._totalPages || this.disabled;

    return html`
      <button
        part="next"
        class="skill-pagination__item ${isDisabled ? 'skill-pagination__item--disabled' : ''}"
        ?disabled=${isDisabled}
        @click=${() => this._handleNext()}
      >
        <slot name="next-text">${this.nextText}</slot>
      </button>
    `;
  }

  private _renderPageItem(page: number) {
    const isActive = page === this.current;

    return html`
      <button
        part="item"
        class="skill-pagination__item ${isActive ? 'skill-pagination__item--active' : ''}"
        ?disabled=${this.disabled}
        @click=${() => this._handlePageChange(page)}
      >
        ${page}
      </button>
    `;
  }

  private _renderEllipsis() {
    return html`
      <span class="skill-pagination__item skill-pagination__item--ellipsis">...</span>
    `;
  }

  private _renderSizeChanger() {
    return html`
      <div class="skill-pagination__sizes">
        <label>
          <slot name="size-text">每页显示</slot>
          <select
            .value=${String(this.pageSize)}
            ?disabled=${this.disabled}
            @change=${this._handlePageSizeChange}
          >
            ${this.pageSizes.map(size => html`
              <option value="${size}" ?selected=${size === this.pageSize}>
                ${size} 条
              </option>
            `)}
          </select>
        </label>
      </div>
    `;
  }

  private _renderQuickJumper() {
    return html`
      <div class="skill-pagination__jumper">
        <slot name="jumper">
          跳至
          <input
            type="number"
            min="1"
            max=${this._totalPages}
            .value=${String(this.current)}
            ?disabled=${this.disabled}
            @keydown=${this._handleJumperKeyDown}
            @change=${this._handleJumperChange}
          >
          页
        </slot>
        <button
          class="skill-pagination__item"
          ?disabled=${this.disabled}
          @click=${this._handleJumperConfirm}
        >
          ${this.jumperConfirmText}
        </button>
      </div>
    `;
  }

  private _handlePrev() {
    if (this.current > 1) {
      this._changePage(this.current - 1);
    }
  }

  private _handleNext() {
    if (this.current < this._totalPages) {
      this._changePage(this.current + 1);
    }
  }

  private _handlePageChange(page: number) {
    if (page >= 1 && page <= this._totalPages && page !== this.current) {
      this._changePage(page);
    }
  }

  private _handlePageSizeChange(e: Event) {
    const newSize = parseInt((e.target as HTMLSelectElement).value, 10);
    if (newSize > 0 && newSize !== this.pageSize) {
      const totalPages = Math.ceil(this.total / newSize);
      const newCurrent = Math.min(this.current, totalPages);

      this.pageSize = newSize;
      this._changePage(newCurrent);

      this.dispatchEvent(new CustomEvent('skill-pagination-size-change', {
        detail: { pageSize: newSize, current: newCurrent },
        bubbles: true,
        composed: true
      }));
    }
  }

  private _handleJumperKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this._handleJumperConfirm();
    }
  }

  private _handleJumperChange() {
    // 可选：实时验证输入
  }

  private _handleJumperConfirm() {
    if (!this._jumperInput) return;

    const targetPage = parseInt(this._jumperInput.value, 10);

    if (targetPage >= 1 && targetPage <= this._totalPages && targetPage !== this.current) {
      this._changePage(targetPage);
    } else {
      // 重置为当前页
      this._jumperInput.value = String(this.current);
    }
  }

  private _changePage(page: number) {
    this.current = page;
    this.dispatchEvent(new CustomEvent('skill-pagination-change', {
      detail: {
        current: page,
        pageSize: this.pageSize,
        total: this.total,
        totalPages: this._totalPages
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * 跳转到指定页
   */
  public goToPage(page: number) {
    if (page >= 1 && page <= this._totalPages) {
      this._changePage(page);
    }
  }

  /**
   * 下一页
   */
  public next() {
    if (this.current < this._totalPages) {
      this._changePage(this.current + 1);
    }
  }

  /**
   * 上一页
   */
  public prev() {
    if (this.current > 1) {
      this._changePage(this.current - 1);
    }
  }

  /**
   * 获取总页数
   */
  public getTotalPages(): number {
    return this._totalPages;
  }

  /**
   * 重置到第一页
   */
  public reset() {
    this._changePage(1);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skill-pagination': SkillPagination;
  }
}