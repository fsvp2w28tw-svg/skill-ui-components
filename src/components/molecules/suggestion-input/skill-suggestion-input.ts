import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { suggestionInputStyles } from './skill-suggestion-input.styles';
import { baseStyles } from '../../../styles/base';

/**
 * 建议项接口
 */
export interface SuggestionItem {
  label: string;
  value?: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
  category?: string;
  highlightedText?: string;
}

/**
 * Skill Suggestion Input Component
 *
 * @element skill-suggestion-input
 *
 * @fires skill-input - 当输入值改变时触发
 * @fires skill-suggestion-select - 当选择建议项时触发
 * @fires skill-suggestion-highlight - 当高亮建议项时触发
 * @fires skill-search - 当触发搜索时触发
 *
 * @example
 * ```html
 * <!-- 基础用法 -->
 * <skill-suggestion-input
 *   placeholder="请输入搜索内容"
 *   suggestions='["Apple", "Banana", "Orange"]'>
 * </skill-suggestion-input>
 *
 * <!-- 带描述和图标的建议 -->
 * <skill-suggestion-input
 *   placeholder="搜索用户..."
 *   .suggestions="${this.userSuggestions}"
 *   show-description
 *   show-icon>
 * </skill-suggestion-input>
 *
 * <!-- 异步搜索 -->
 * <skill-suggestion-input
 *   placeholder="搜索商品..."
 *   async-search
 *   min-query-length="2"
 *   @skill-search="${this.handleAsyncSearch}">
 * </skill-suggestion-input>
 *
 * <!-- 多选模式 -->
 * <skill-suggestion-input
 *   placeholder="选择标签..."
 *   suggestions="${this.tagSuggestions}"
 *   multi-select
 *   selected-values="${this.selectedTags}">
 * </skill-suggestion-input>
 * ```
 */
@customElement('skill-suggestion-input')
export class SkillSuggestionInput extends LitElement {
  static styles = [baseStyles, suggestionInputStyles];

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: Array })
  suggestions: SuggestionItem[] = [];

  @property({ type: Boolean, reflect: true, attribute: 'show-description' })
  showDescription = false;

  @property({ type: Boolean, reflect: true, attribute: 'show-icon' })
  showIcon = false;

  @property({ type: Boolean, reflect: true, attribute: 'show-clear' })
  showClear = true;

  @property({ type: Boolean, reflect: true, attribute: 'async-search' })
  asyncSearch = false;

  @property({ type: Boolean, reflect: true, attribute: 'multi-select' })
  multiSelect = false;

  @property({ type: Boolean, reflect: true, attribute: 'loading' })
  loading = false;

  @property({ type: Boolean, reflect: true, attribute: 'disabled' })
  disabled = false;

  @property({ type: Boolean, reflect: true, attribute: 'readonly' })
  readonly = false;

  @property({ type: Number, attribute: 'min-query-length' })
  minQueryLength = 1;

  @property({ type: Number, attribute: 'max-suggestions' })
  maxSuggestions = 10;

  @property({ type: Number, attribute: 'debounce-delay' })
  debounceDelay = 300;

  @property({ type: String, attribute: 'empty-text' })
  emptyText = '无搜索结果';

  @property({ type: String, attribute: 'loading-text' })
  loadingText = '搜索中...';

  @property({ type: Array })
  selectedValues: string[] = [];

  @state()
  private _isOpen = false;

  @state()
  private _highlightedIndex = -1;

  @state()
  private _filteredSuggestions: SuggestionItem[] = [];

  @state()
  private _categories: string[] = [];

  // @state()
  // private _activeCategory = '';

  private inputElement: HTMLInputElement | null = null;
  private debounceTimer: number | null = null;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleClickOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleClickOutside);
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }

  private _handleClickOutside = (event: MouseEvent) => {
    const path = event.composedPath();
    if (!path.includes(this)) {
      this._close();
    }
  };

  private get _showClearButton() {
    return this.showClear && this.value && !this.readonly && !this.disabled;
  }

  private get _showSuggestions() {
    return this._isOpen && this._filteredSuggestions.length > 0;
  }

  private get _showEmptyState() {
    return this._isOpen && this.value.length >= this.minQueryLength &&
           this._filteredSuggestions.length === 0 && !this.loading;
  }

  private get _showLoadingState() {
    return this._isOpen && this.loading;
  }

  private _filterSuggestions(query: string) {
    if (!query || query.length < this.minQueryLength) {
      this._filteredSuggestions = [];
      return;
    }

    const filtered = this.suggestions
      .filter(item => {
        if (item.disabled) return false;
        const searchText = `${item.label} ${item.description || ''}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      })
      .slice(0, this.maxSuggestions);

    this._filteredSuggestions = filtered;

    // 提取分类
    if (this.showDescription) {
      this._categories = [...new Set(filtered
        .map(item => item.category)
        .filter(Boolean) as string[])];
    }
  }

  private _triggerSearch(query: string) {
    if (this.asyncSearch) {
      this.dispatchEvent(new CustomEvent('skill-search', {
        detail: { query },
        bubbles: true,
        composed: true,
      }));
    } else {
      this._filterSuggestions(query);
    }
  }

  private _handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this._highlightedIndex = -1;

    // 防抖处理
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this._triggerSearch(this.value);
    }, this.debounceDelay) as unknown as number;

    this.dispatchEvent(new CustomEvent('skill-input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this._highlightNext();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this._highlightPrevious();
        break;
      case 'Enter':
        event.preventDefault();
        if (this._highlightedIndex >= 0) {
          this._selectSuggestion(this._filteredSuggestions[this._highlightedIndex]);
        } else {
          this._handleSearch();
        }
        break;
      case 'Escape':
        this._close();
        break;
      case 'Tab':
        this._close();
        break;
    }
  }

  private _handleFocus() {
    if (this.value.length >= this.minQueryLength) {
      this._open();
    }
  }

  private _handleBlur() {
    // 延迟关闭，允许点击建议项
    setTimeout(() => {
      this._close();
    }, 200);
  }

  private _handleClear() {
    this.value = '';
    this._filteredSuggestions = [];
    this._highlightedIndex = -1;
    this._close();
    this.inputElement?.focus();

    this.dispatchEvent(new CustomEvent('skill-input', {
      detail: { value: '' },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleSearch() {
    this.dispatchEvent(new CustomEvent('skill-search', {
      detail: { query: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _open() {
    if (!this._isOpen) {
      this._isOpen = true;
      this._triggerSearch(this.value);
    }
  }

  private _close() {
    if (this._isOpen) {
      this._isOpen = false;
      this._highlightedIndex = -1;
    }
  }

  private _highlightNext() {
    const maxIndex = this._filteredSuggestions.length - 1;
    this._highlightedIndex = this._highlightedIndex >= maxIndex ? 0 : this._highlightedIndex + 1;
    this._emitHighlightChange();
  }

  private _highlightPrevious() {
    const maxIndex = this._filteredSuggestions.length - 1;
    this._highlightedIndex = this._highlightedIndex <= 0 ? maxIndex : this._highlightedIndex - 1;
    this._emitHighlightChange();
  }

  private _emitHighlightChange() {
    const item = this._filteredSuggestions[this._highlightedIndex];
    if (item) {
      this.dispatchEvent(new CustomEvent('skill-suggestion-highlight', {
        detail: { item, index: this._highlightedIndex },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private _selectSuggestion(item: SuggestionItem) {
    if (item.disabled) return;

    if (this.multiSelect) {
      const itemValue = item.value || item.label;
      const isSelected = this.selectedValues.includes(itemValue);

      if (isSelected) {
        this.selectedValues = this.selectedValues.filter(v => v !== itemValue);
      } else {
        this.selectedValues = [...this.selectedValues, itemValue];
      }
    } else {
      this.value = item.value || item.label;
    }

    this.dispatchEvent(new CustomEvent('skill-suggestion-select', {
      detail: { item, selectedValues: this.selectedValues },
      bubbles: true,
      composed: true,
    }));

    if (!this.multiSelect) {
      this._close();
    }
  }

  private _highlightMatch(text: string, query: string) {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part) => {
      return regex.test(part)
        ? html`<span class="suggestion-item__match">${part}</span>`
        : part;
    });
  }

  private _renderSuggestionIcon(item: SuggestionItem) {
    if (!this.showIcon || !item.icon) return nothing;

    return html`
      <span class="suggestion-item__icon">
        <slot name="icon-${item.icon}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        </slot>
      </span>
    `;
  }

  private _renderSuggestionItem(item: SuggestionItem, index: number) {
    const isHighlighted = index === this._highlightedIndex;
    const isSelected = this.multiSelect && this.selectedValues.includes(item.value || item.label);

    const itemClasses: Record<string, boolean> = {
      'suggestion-item': true,
      'suggestion-item--highlighted': isHighlighted,
      'suggestion-item--selected': isSelected,
      'suggestion-item--disabled': !!item.disabled,
    };

    return html`
      <div
        class="${classMap(itemClasses)}"
        @click="${() => this._selectSuggestion(item)}"
        @mouseenter="${() => { this._highlightedIndex = index; this._emitHighlightChange(); }}"
      >
        ${this._renderSuggestionIcon(item)}

        <div class="suggestion-item__content">
          <div class="suggestion-item__label">
            ${this._highlightMatch(item.label, this.value)}
          </div>

          ${this.showDescription && item.description ? html`
            <div class="suggestion-item__description">
              ${this._highlightMatch(item.description, this.value)}
            </div>
          ` : ''}
        </div>

        ${this.multiSelect ? html`
          <div class="suggestion-item__checkbox">
            ${isSelected ? html`
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  private _renderSuggestionsByCategory(category: string) {
    const categorySuggestions = this._filteredSuggestions.filter(
      item => item.category === category
    );

    if (categorySuggestions.length === 0) return nothing;

    return html`
      <div class="suggestion-group">
        <div class="suggestion-group__header">${category}</div>
        ${categorySuggestions.map((item) =>
          this._renderSuggestionItem(item, this._filteredSuggestions.indexOf(item))
        )}
      </div>
    `;
  }

  private _renderSuggestions() {
    if (this._showLoadingState) {
      return html`
        <div class="suggestion-loading">
          <div class="suggestion-loading__spinner"></div>
          <div class="suggestion-loading__text">${this.loadingText}</div>
        </div>
      `;
    }

    if (this._showEmptyState) {
      return html`
        <div class="suggestion-empty">
          <div class="suggestion-empty__icon">🔍</div>
          <div class="suggestion-empty__text">${this.emptyText}</div>
        </div>
      `;
    }

    if (!this._showSuggestions) return nothing;

    return html`
      <div class="suggestion-dropdown">
        ${this._categories.length > 0
          ? this._categories.map(category => this._renderSuggestionsByCategory(category))
          : this._filteredSuggestions.map((item, index) => this._renderSuggestionItem(item, index))
        }
      </div>
    `;
  }

  private _renderSelectedTags() {
    if (!this.multiSelect || this.selectedValues.length === 0) return nothing;

    return html`
      <div class="suggestion-tags">
        ${this.selectedValues.map(value => {
          const item = this.suggestions.find(s => (s.value || s.label) === value);
          return html`
            <div class="suggestion-tag">
              <span class="suggestion-tag__text">${item?.label || value}</span>
              <button
                class="suggestion-tag__remove"
                @click="${() => {
                  this.selectedValues = this.selectedValues.filter(v => v !== value);
                }}"
                type="button"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          `;
        })}
      </div>
    `;
  }

  render() {
    const containerClasses = {
      'suggestion-input': true,
      'suggestion-input--open': this._isOpen,
      'suggestion-input--disabled': this.disabled,
      'suggestion-input--readonly': this.readonly,
      'suggestion-input--multi-select': this.multiSelect,
    };

    return html`
      <div class="${classMap(containerClasses)}">
        ${this._renderSelectedTags()}

        <div class="suggestion-input__wrapper">
          <input
            type="text"
            class="suggestion-input__field"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?readonly="${this.readonly}"
            @input="${this._handleInput}"
            @focus="${this._handleFocus}"
            @blur="${this._handleBlur}"
            @keydown="${this._handleKeyDown}"
            autocomplete="off"
            spellcheck="false"
          />

          ${this._showClearButton ? html`
            <button
              type="button"
              class="suggestion-input__clear"
              @click="${this._handleClear}"
              aria-label="Clear input"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          ` : ''}

          ${this.loading ? html`
            <div class="suggestion-input__loading">
              <div class="loading-spinner"></div>
            </div>
          ` : ''}
        </div>

        ${this._renderSuggestions()}
      </div>
    `;
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-suggestion-input': SkillSuggestionInput;
  }
}