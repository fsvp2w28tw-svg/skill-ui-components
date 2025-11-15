import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { selectStyles } from './skill-select.styles';
import { baseStyles } from '../../../styles/base';
import type { Size, Variant } from '../../../types/index';

/**
 * 选择器选项接口
 */
export interface SelectOption {
  label: string;
  value?: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
  group?: string;
  selected?: boolean;
  badge?: string;
}

/**
 * 选择器选项组接口
 */
export interface SelectOptionGroup {
  label: string;
  disabled?: boolean;
  options: SelectOption[];
}

/**
 * Skill Select Component
 *
 * @element skill-select
 *
 * @fires skill-change - 当选择值改变时触发
 * @fires skill-open - 当下拉框打开时触发
 * @fires skill-close - 当下拉框关闭时触发
 * @fires skill-search - 当触发搜索时触发
 *
 * @example
 * ```html
 * <!-- 基础选择器 -->
 * <skill-select
 *   placeholder="请选择..."
 *   options="${this.basicOptions}">
 * </skill-select>
 *
 * <!-- 带描述的选择器 -->
 * <skill-select
 *   placeholder="选择用户..."
 *   show-description
 *   show-icon
 *   options="${this.userOptions}">
 * </skill-select>
 *
 * <!-- 多选选择器 -->
 * <skill-select
 *   placeholder="选择技能..."
 *   multi-select
 *   max-selected-items="5"
 *   options="${this.skillOptions}">
 * </skill-select>
 *
 * <!-- 可搜索的选择器 -->
 * <skill-select
 *   placeholder="搜索国家..."
 *   searchable
 *   async-search
 *   min-search-length="2"
 *   @skill-search="${this.handleSearch}">
 * </skill-select>
 *
 * <!-- 分组选择器 -->
 * <skill-select
 *   placeholder="选择产品..."
 *   groups="${this.productGroups}">
 * </skill-select>
 *
 * <!-- 清除功能 -->
 * <skill-select
 *   placeholder="选择选项..."
 *   show-clear
 *   options="${this.options}">
 * </skill-select>
 * ```
 */
@customElement('skill-select')
export class SkillSelect extends LitElement {
  static styles = [baseStyles, selectStyles];

  @property({ type: String })
  value = '';

  @property({ type: Array })
  values: string[] = [];

  @property({ type: Array })
  options: SelectOption[] = [];

  @property({ type: Array })
  groups: SelectOptionGroup[] = [];

  @property({ type: String })
  placeholder = '请选择...';

  @property({ type: Boolean, reflect: true, attribute: 'multi-select' })
  multiSelect = false;

  @property({ type: Boolean, reflect: true })
  searchable = false;

  @property({ type: Boolean, reflect: true, attribute: 'show-description' })
  showDescription = false;

  @property({ type: Boolean, reflect: true, attribute: 'show-icon' })
  showIcon = false;

  @property({ type: Boolean, reflect: true, attribute: 'show-clear' })
  showClear = false;

  @property({ type: Boolean, reflect: true, attribute: 'show-badge' })
  showBadge = false;

  @property({ type: Boolean, reflect: true, attribute: 'async-search' })
  asyncSearch = false;

  @property({ type: Boolean, reflect: true, attribute: 'show-selected-count' })
  showSelectedCount = true;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String, reflect: true, attribute: 'error-message' })
  errorMessage?: string;

  @property({ type: Boolean, reflect: true, attribute: 'allow-select-all' })
  allowSelectAll = false;

  @property({ type: Number, attribute: 'max-selected-items' })
  maxSelectedItems = Infinity;

  @property({ type: Number, attribute: 'max-options-displayed' })
  maxOptionsDisplayed = 10;

  @property({ type: Number, attribute: 'dropdown-width' })
  dropdownWidth = 0; // 0表示与输入框同宽

  @property({ type: Number, attribute: 'min-search-length' })
  minSearchLength = 1;

  @property({ type: String, attribute: 'empty-text' })
  emptyText = '无选项';

  @property({ type: String, attribute: 'search-placeholder' })
  searchPlaceholder = '搜索...';

  @property({ type: String, attribute: 'loading-text' })
  loadingText = '加载中...';

  @property({ type: String, attribute: 'max-selection-text' })
  maxSelectionText = '已达到最大选择数量';

  @property({ type: String, attribute: 'select-all-text' })
  selectAllText = '全选';

  @property({ type: String, reflect: true })
  variant: Variant = 'primary';

  @property({ type: String, reflect: true })
  size: Size = 'md';

  @state()
  private _isOpen = false;

  @state()
  private _highlightedIndex = -1;

  @state()
  private _searchQuery = '';

  @state()
  private _filteredOptions: SelectOption[] = [];

  @state()
  private _filteredGroups: SelectOptionGroup[] = [];

  private searchInputElement: HTMLInputElement | null = null;
  private searchDebounceTimer: number | null = null;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleClickOutside);
    document.addEventListener('keydown', this._handleGlobalKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleClickOutside);
    document.removeEventListener('keydown', this._handleGlobalKeyDown);
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }
  }

  private _handleClickOutside = (event: MouseEvent) => {
    const path = event.composedPath();
    if (!path.includes(this)) {
      this._close();
    }
  };

  private _handleGlobalKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this._isOpen) {
      event.preventDefault();
      this._close();
    }
  };

  private get _displayValue() {
    if (this.multiSelect) {
      if (this.values.length === 0) return this.placeholder;
      if (this.values.length === 1) {
        const option = this._findOptionByValue(this.values[0]);
        return option?.label || this.placeholder;
      }
      return this.showSelectedCount
        ? `已选择 ${this.values.length} 项`
        : this.values.map(v => this._findOptionByValue(v)?.label || v).join(', ');
    } else {
      const option = this._findOptionByValue(this.value);
      return option?.label || this.placeholder;
    }
  }

  private get _selectedOptions() {
    if (this.multiSelect) {
      return this.values.map(value => this._findOptionByValue(value)).filter(Boolean) as SelectOption[];
    } else {
      const option = this._findOptionByValue(this.value);
      return option ? [option] : [];
    }
  }

  private _findOptionByValue(value: string): SelectOption | undefined {
    return this.options.find(option => (option.value || option.label) === value);
  }

  private get _showClearButton() {
    return this.showClear && !this.disabled && !this.readonly &&
           ((this.multiSelect && this.values.length > 0) || (!this.multiSelect && this.value));
  }

  private _filterOptions(query: string) {
    const lowerQuery = query.toLowerCase().trim();

    if (!query || query.length < this.minSearchLength) {
      this._filteredOptions = this.options;
      this._filteredGroups = this.groups;
      return;
    }

    // 过滤普通选项
    this._filteredOptions = this.options.filter(option => {
      if (option.disabled) return true; // 保留禁用项
      const searchText = `${option.label} ${option.description || ''}`.toLowerCase();
      return searchText.includes(lowerQuery);
    });

    // 过滤分组选项
    this._filteredGroups = this.groups.map(group => ({
      ...group,
      options: group.options.filter(option => {
        if (option.disabled) return true;
        const searchText = `${option.label} ${option.description || ''}`.toLowerCase();
        return searchText.includes(lowerQuery);
      })
    })).filter(group => group.options.length > 0);
  }

  private _triggerSearch(query: string) {
    if (this.asyncSearch) {
      this.dispatchEvent(new CustomEvent('skill-search', {
        detail: { query },
        bubbles: true,
        composed: true,
      }));
    } else {
      this._filterOptions(query);
    }
  }

  private _handleSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this._searchQuery = target.value;
    this._highlightedIndex = -1;

    // 防抖处理
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }

    this.searchDebounceTimer = setTimeout(() => {
      this._triggerSearch(this._searchQuery);
    }, 300) as unknown as number;
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (this.disabled || this.readonly) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        if (!this._isOpen) {
          event.preventDefault();
          this._open();
        }
        break;
      case 'ArrowDown':
        if (!this._isOpen) {
          event.preventDefault();
          this._open();
        } else {
          event.preventDefault();
          this._highlightNext();
        }
        break;
      case 'ArrowUp':
        if (this._isOpen) {
          event.preventDefault();
          this._highlightPrevious();
        }
        break;
      case 'Escape':
        if (this._isOpen) {
          event.preventDefault();
          this._close();
        }
        break;
      case 'Backspace':
        if (!this._isOpen && this.multiSelect && this.values.length > 0 && !this._searchQuery) {
          event.preventDefault();
          this._removeLastSelected();
        }
        break;
    }
  }

  private _handleClear() {
    if (this.multiSelect) {
      this.values = [];
    } else {
      this.value = '';
    }

    this.dispatchEvent(new CustomEvent('skill-change', {
      detail: this.multiSelect ? { values: this.values } : { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleRemoveTag(valueToRemove: string) {
    if (this.multiSelect) {
      this.values = this.values.filter(value => value !== valueToRemove);
      this.dispatchEvent(new CustomEvent('skill-change', {
        detail: { values: this.values },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private _removeLastSelected() {
    if (this.multiSelect && this.values.length > 0) {
      const newValues = [...this.values];
      newValues.pop();
      this.values = newValues;
      this.dispatchEvent(new CustomEvent('skill-change', {
        detail: { values: this.values },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private _open() {
    if (this.disabled || this.readonly) return;

    if (!this._isOpen) {
      this._isOpen = true;
      this._filteredOptions = [...this.options];
      this._filteredGroups = [...this.groups];
      this._searchQuery = '';
      this._highlightedIndex = -1;

      // 等待渲染完成后聚焦搜索框
      requestAnimationFrame(() => {
        this.searchInputElement?.focus();
      });

      this.dispatchEvent(new CustomEvent('skill-open', {
        bubbles: true,
        composed: true,
      }));
    }
  }

  private _close() {
    if (this._isOpen) {
      this._isOpen = false;
      this._highlightedIndex = -1;
      this._searchQuery = '';

      this.dispatchEvent(new CustomEvent('skill-close', {
        bubbles: true,
        composed: true,
      }));
    }
  }

  private _getTotalOptionCount() {
    let count = this._filteredOptions.length;
    for (const group of this._filteredGroups) {
      count += group.options.length;
    }
    return count;
  }

  private _highlightNext() {
    const totalOptions = this._getTotalOptionCount();
    if (totalOptions === 0) return;

    const maxIndex = totalOptions - 1;
    this._highlightedIndex = this._highlightedIndex >= maxIndex ? 0 : this._highlightedIndex + 1;

    // 滚动到高亮项
    this._scrollToHighlighted();
  }

  private _highlightPrevious() {
    const totalOptions = this._getTotalOptionCount();
    if (totalOptions === 0) return;

    const maxIndex = totalOptions - 1;
    this._highlightedIndex = this._highlightedIndex <= 0 ? maxIndex : this._highlightedIndex - 1;

    // 滚动到高亮项
    this._scrollToHighlighted();
  }

  private _scrollToHighlighted() {
    const highlightedElement = this.renderRoot.querySelector('.select-option--highlighted') as HTMLElement;
    const dropdownElement = this.renderRoot.querySelector('.select-dropdown') as HTMLElement;

    if (highlightedElement && dropdownElement) {
      const dropdownRect = dropdownElement.getBoundingClientRect();
      const highlightedRect = highlightedElement.getBoundingClientRect();

      if (highlightedRect.top < dropdownRect.top) {
        highlightedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else if (highlightedRect.bottom > dropdownRect.bottom) {
        highlightedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }

  private _selectOption(option: SelectOption) {
    if (option.disabled) return;

    const optionValue = option.value || option.label;

    if (this.multiSelect) {
      const isSelected = this.values.includes(optionValue);
      if (isSelected) {
        this.values = this.values.filter(v => v !== optionValue);
      } else {
        if (this.values.length < this.maxSelectedItems) {
          this.values = [...this.values, optionValue];
        } else {
          // 达到最大选择数量
          return;
        }
      }

      this.dispatchEvent(new CustomEvent('skill-change', {
        detail: { values: this.values, option },
        bubbles: true,
        composed: true,
      }));
    } else {
      this.value = optionValue;
      this._close();

      this.dispatchEvent(new CustomEvent('skill-change', {
        detail: { value: this.value, option },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private _highlightMatch(text: string, query: string) {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part) => {
      return regex.test(part)
        ? html`<span class="select-option__match">${part}</span>`
        : part;
    });
  }

  private _isAllSelected(): boolean {
    const availableOptions = this._filteredOptions.filter(opt => !opt.disabled);
    return availableOptions.length > 0 && availableOptions.every(opt =>
      this.values.includes(opt.value || opt.label)
    );
  }

  private _handleSelectAll() {
    const availableOptions = this._filteredOptions.filter(opt => !opt.disabled);
    const newSelection = availableOptions.map(opt => opt.value || opt.label);

    // If all available options are already selected, deselect them
    const allSelected = this._isAllSelected();
    this.values = allSelected ? [] : newSelection;

    this.dispatchEvent(new CustomEvent('skill-change', {
      detail: {
        values: this.values,
        action: allSelected ? 'deselect-all' : 'select-all'
      },
      bubbles: true,
      composed: true,
    }));
  }

  private _renderOptionIcon(option: SelectOption) {
    if (!this.showIcon || !option.icon) return nothing;

    return html`
      <span class="select-option__icon">
        <slot name="icon-${option.icon}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        </slot>
      </span>
    `;
  }

  private _renderOption(option: SelectOption, flatIndex: number) {
    const isHighlighted = flatIndex === this._highlightedIndex;
    const isSelected = this.multiSelect ? this.values.includes(option.value || option.label) : this.value === (option.value || option.label);

    const optionClasses = {
      'select-option': true,
      'select-option--highlighted': isHighlighted,
      'select-option--selected': isSelected,
      'select-option--disabled': !!option.disabled,
    };

    return html`
      <div
        class="${classMap(optionClasses)}"
        @click="${() => this._selectOption(option)}"
        @mouseenter="${() => { this._highlightedIndex = flatIndex; }}"
      >
        ${this._renderOptionIcon(option)}

        <div class="select-option__content">
          <div class="select-option__label">
            ${this._highlightMatch(option.label, this._searchQuery)}
          </div>

          ${this.showDescription && option.description ? html`
            <div class="select-option__description">
              ${this._highlightMatch(option.description, this._searchQuery)}
            </div>
          ` : ''}

          ${this.showBadge && option.badge ? html`
            <div class="select-option__badge">
              ${option.badge}
            </div>
          ` : ''}
        </div>

        ${this.multiSelect ? html`
          <div class="select-option__checkbox">
            ${isSelected ? html`
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ` : ''}
          </div>
        ` : ''}

        ${!this.multiSelect && isSelected ? html`
          <div class="select-option__check">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        ` : ''}
      </div>
    `;
  }

  private _renderOptionGroup(group: SelectOptionGroup, startFlatIndex: number) {
    return html`
      <div class="select-group">
        <div class="select-group__header">${group.label}</div>
        ${group.options.map((option, index) =>
          this._renderOption(option, startFlatIndex + index)
        )}
      </div>
    `;
  }

  private _renderDropdown() {
    if (!this._isOpen) return nothing;

    return html`
      <div class="select-dropdown" style="${this.dropdownWidth > 0 ? `width: ${this.dropdownWidth}px` : ''}">
        <!-- 搜索框 -->
        ${this.searchable ? html`
          <div class="select-search">
            <input
              type="text"
              class="select-search__input"
              placeholder="${this.searchPlaceholder}"
              .value="${this._searchQuery}"
              @input="${this._handleSearchInput}"
              @keydown="${(e: KeyboardEvent) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                  e.stopPropagation();
                  e.preventDefault();
                  this._handleKeyDown(e);
                }
              }}"
            />
            <div class="select-search__icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
          </div>
        ` : ''}

        <div class="select-dropdown__content">
          <!-- 加载状态 -->
          ${this.loading ? html`
            <div class="select-loading">
              <div class="select-loading__spinner"></div>
              <div class="select-loading__text">${this.loadingText}</div>
            </div>
          ` : ''}

          <!-- 空状态 -->
          ${!this.loading && this._getTotalOptionCount() === 0 && this._searchQuery.length >= this.minSearchLength ? html`
            <div class="select-empty">
              <div class="select-empty__icon">🔍</div>
              <div class="select-empty__text">${this.emptyText}</div>
            </div>
          ` : ''}

          <!-- 选项列表 -->
          ${!this.loading && this._getTotalOptionCount() > 0 ? html`
            <div class="select-options">
              <!-- 全选选项 -->
              ${this.multiSelect && this.allowSelectAll && !this._searchQuery ? html`
                <div
                  class="select-option select-option--select-all"
                  @click="${this._handleSelectAll}"
                  @mouseenter="${() => { this._highlightedIndex = -1; }}">
                  <div class="select-option__content">
                    <div class="select-option__label">
                      ${this.selectAllText}
                    </div>
                    <div class="select-option__checkbox">
                      ${this._isAllSelected() ? html`
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ` : ''}
                    </div>
                  </div>
                </div>
              ` : ''}

              <!-- 普通选项 -->
              ${this._filteredOptions.map((option, index) =>
                this._renderOption(option, index)
              )}

              <!-- 分组选项 -->
              ${this._filteredGroups.map((group) => {
                const startFlatIndex = this._filteredOptions.length +
                  this._filteredGroups.slice(0, this._filteredGroups.indexOf(group))
                    .reduce((sum, g) => sum + g.options.length, 0);
                return this._renderOptionGroup(group, startFlatIndex);
              })}
            </div>

            <!-- 多选时的最大选择提示 -->
            ${this.multiSelect && this.values.length >= this.maxSelectedItems ? html`
              <div class="select-max-selection">
                ${this.maxSelectionText}
              </div>
            ` : ''}
          ` : ''}
        </div>
      </div>
    `;
  }

  private _renderSelectedTags() {
    if (!this.multiSelect || this.values.length === 0) return nothing;

    return html`
      <div class="select-tags">
        ${this._selectedOptions.slice(0, this.maxOptionsDisplayed).map(option => html`
          <div class="select-tag">
            <span class="select-tag__text">${option.label}</span>
            <button
              class="select-tag__remove"
              @click="${() => this._handleRemoveTag(option.value || option.label)}"
              type="button"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        `)}

        ${this.values.length > this.maxOptionsDisplayed ? html`
          <div class="select-tag select-tag--more">
            +${this.values.length - this.maxOptionsDisplayed}
          </div>
        ` : ''}
      </div>
    `;
  }

  render() {
    const containerClasses = {
      'select': true,
      'select--open': this._isOpen,
      'select--disabled': this.disabled,
      'select--readonly': this.readonly,
      'select--multi-select': this.multiSelect,
      'select--has-value': this.multiSelect ? this.values.length > 0 : !!this.value,
      'select--show-clear': this._showClearButton,
      'select--error': this.error,
      [`select--${this.variant}`]: this.variant !== 'primary',
      [`select--${this.size}`]: this.size !== 'md',
    };

    return html`
      <div class="${classMap(containerClasses)}">
        <!-- 选中标签 -->
        ${this._renderSelectedTags()}

        <!-- 选择器触发器 -->
        <div
          class="select-trigger"
          @click="${() => this._open()}"
          @keydown="${this._handleKeyDown}"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded="${this._isOpen}"
          aria-labelledby="select-label"
          tabindex="${this.disabled || this.readonly ? '-1' : '0'}"
        >
          <div class="select-trigger__content">
            <span class="select-trigger__placeholder">
              ${this._displayValue}
            </span>
          </div>

          <div class="select-trigger__suffix">
            ${this.loading ? html`
              <div class="select-loading__spinner--small"></div>
            ` : ''}

            ${this._showClearButton ? html`
              <button
                class="select-trigger__clear"
                @click="${(e: MouseEvent) => {
                  e.stopPropagation();
                  this._handleClear();
                }}"
                type="button"
                aria-label="Clear selection"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            ` : ''}

            <div class="select-trigger__arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <!-- 错误信息 -->
        ${this.error && this.errorMessage ? html`
          <div class="select__error-message">
            ${this.errorMessage}
          </div>
        ` : ''}

        <!-- 下拉选项 -->
        ${this._renderDropdown()}
      </div>
    `;
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-select': SkillSelect;
  }
}