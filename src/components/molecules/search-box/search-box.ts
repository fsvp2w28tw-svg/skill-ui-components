import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { baseStyles } from '../../../styles/base';

/**
 * SearchBox molecule component that combines input with search icon and clear functionality.
 *
 * @element skill-search-box
 *
 * @example
 * ```html
 * <!-- Basic search box -->
 * <skill-search-box placeholder="Search..."></skill-search-box>
 *
 * <!-- With value and clear button -->
 * <skill-search-box
 *   value="Current search"
 *   placeholder="Search products..."
 *   show-clear>
 * </skill-search-box>
 *
 * <!-- With search button -->
 * <skill-search-box
 *   placeholder="Search..."
 *   show-search-button>
 * </skill-search-box>
 *
 * <!-- Compact variant -->
 * <skill-search-box
 *   placeholder="Quick search"
 *   variant="compact"
 *   size="sm">
 * </skill-search-box>
 *
 * <!-- With suggestions -->
 * <skill-search-box
 *   placeholder="Search..."
 *   suggestions={['Apple', 'Banana', 'Orange']}"
 *   @suggestion-select="${this.handleSuggestionSelect}">
 * </skill-search-box>
 *
 * <!-- Loading state -->
 * <skill-search-box
 *   placeholder="Searching..."
 *   loading>
 * </skill-search-box>
 * ```
 */
@customElement('skill-search-box')
export class SearchBox extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: inline-block;
        width: 100%;
        max-width: 400px;
      }

      .search-box {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
      }

      /* Input container */
      .search-box__input-container {
        position: relative;
        display: flex;
        align-items: center;
        flex: 1;
      }

      /* Search icon */
      .search-box__icon {
        position: absolute;
        left: var(--skill-spacing-md);
        color: var(--skill-color-text-muted);
        width: 20px;
        height: 20px;
        pointer-events: none;
        transition: color var(--skill-transition-fast);
        z-index: 1;
      }

      .search-box--focused .search-box__icon {
        color: var(--skill-color-primary);
      }

      .search-box--has-value .search-box__icon {
        color: var(--skill-color-text);
      }

      /* Input field */
      .search-box__input {
        width: 100%;
        padding: var(--skill-spacing-md) var(--skill-spacing-lg);
        padding-left: calc(20px + var(--skill-spacing-lg));
        border: 1px solid var(--skill-color-border);
        border-radius: var(--skill-radius-md);
        font-size: var(--skill-font-size-md);
        color: var(--skill-color-text);
        background-color: var(--skill-color-surface);
        transition: all var(--skill-transition-fast);
        outline: none;
      }

      .search-box__input::placeholder {
        color: var(--skill-color-text-muted);
      }

      .search-box__input:focus {
        border-color: var(--skill-color-primary);
        box-shadow: 0 0 0 2px var(--skill-color-primary-light);
      }

      .search-box__input:hover:not(:focus) {
        border-color: var(--skill-color-border-hover);
      }

      /* Clear button */
      .search-box__clear {
        position: absolute;
        right: var(--skill-spacing-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        background: transparent;
        color: var(--skill-color-text-muted);
        border-radius: var(--skill-radius-full);
        cursor: pointer;
        transition: all var(--skill-transition-fast);
        z-index: 1;
      }

      .search-box__clear:hover {
        background-color: var(--skill-color-surface-hover);
        color: var(--skill-color-text);
      }

      .search-box__clear:active {
        transform: scale(0.95);
      }

      /* Search button */
      .search-box__search-button {
        margin-left: var(--skill-spacing-sm);
        padding: var(--skill-spacing-sm) var(--skill-spacing-md);
        border: 1px solid var(--skill-color-primary);
        background-color: var(--skill-color-primary);
        color: var(--skill-color-primary-text);
        border-radius: var(--skill-radius-md);
        cursor: pointer;
        font-size: var(--skill-font-size-sm);
        font-weight: var(--skill-font-weight-medium);
        transition: all var(--skill-transition-fast);
        display: flex;
        align-items: center;
        gap: var(--skill-spacing-xs);
        white-space: nowrap;
      }

      .search-box__search-button:hover {
        background-color: var(--skill-color-primary-dark);
        border-color: var(--skill-color-primary-dark);
      }

      .search-box__search-button:active {
        transform: scale(0.98);
      }

      .search-box__search-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      /* Suggestions dropdown */
      .search-box__suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: var(--skill-color-surface);
        border: 1px solid var(--skill-color-border);
        border-top: none;
        border-radius: 0 0 var(--skill-radius-md) var(--skill-radius-md);
        box-shadow: var(--skill-shadow-lg);
        z-index: 1000;
        max-height: 300px;
        overflow-y: auto;
      }

      .suggestions__empty {
        padding: var(--skill-spacing-lg);
        text-align: center;
        color: var(--skill-color-text-muted);
        font-size: var(--skill-font-size-sm);
      }

      .suggestions__item {
        display: flex;
        align-items: center;
        padding: var(--skill-spacing-sm) var(--skill-spacing-lg);
        cursor: pointer;
        transition: background-color var(--skill-transition-fast);
        border-bottom: 1px solid var(--skill-color-border);
      }

      .suggestions__item:last-child {
        border-bottom: none;
      }

      .suggestions__item:hover,
      .suggestions__item--highlighted {
        background-color: var(--skill-color-surface-hover);
      }

      .suggestions__item-icon {
        margin-right: var(--skill-spacing-sm);
        color: var(--skill-color-text-muted);
        width: 16px;
        height: 16px;
      }

      .suggestions__item-text {
        flex: 1;
        font-size: var(--skill-font-size-sm);
        color: var(--skill-color-text);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .suggestions__item-match {
        font-weight: var(--skill-font-weight-semibold);
        color: var(--skill-color-primary);
      }

      /* Size variants */
      .search-box--sm .search-box__icon {
        width: 16px;
        height: 16px;
        left: var(--skill-spacing-sm);
      }

      .search-box--sm .search-box__input {
        padding: var(--skill-spacing-sm) var(--skill-spacing-md);
        padding-left: calc(16px + var(--skill-spacing-md));
        font-size: var(--skill-font-size-sm);
      }

      .search-box--sm .search-box__clear {
        width: 20px;
        height: 20px;
      }

      .search-box--lg .search-box__icon {
        width: 24px;
        height: 24px;
        left: var(--skill-spacing-lg);
      }

      .search-box--lg .search-box__input {
        padding: var(--skill-spacing-lg) var(--skill-spacing-xl);
        padding-left: calc(24px + var(--skill-spacing-xl));
        font-size: var(--skill-font-size-lg);
      }

      /* Variant styles */
      .search-box--compact {
        max-width: 300px;
      }

      .search-box--compact .search-box__input {
        border-radius: var(--skill-radius-full);
      }

      .search-box--compact .search-box__search-button {
        border-radius: var(--skill-radius-full);
      }

      /* Ghost variant */
      .search-box--ghost .search-box__input {
        background-color: transparent;
        border-color: transparent;
      }

      .search-box--ghost .search-box__input:focus {
        background-color: var(--skill-color-surface);
        border-color: var(--skill-color-primary);
      }

      /* Loading state */
      .search-box--loading .search-box__icon {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      /* Disabled state */
      .search-box--disabled {
        opacity: 0.6;
        pointer-events: none;
      }

      .search-box--disabled .search-box__input {
        background-color: var(--skill-color-surface-disabled);
        color: var(--skill-color-text-disabled);
      }

      /* Focus states */
      .search-box--focused .search-box__suggestions {
        border-color: var(--skill-color-primary);
      }

      /* Responsive */
      @media (max-width: 768px) {
        :host {
          max-width: 100%;
        }

        .search-box__search-button span {
          display: none;
        }
      }
    `
  ];

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: String, reflect: true })
  variant: 'default' | 'compact' | 'ghost' = 'default';

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, reflect: true })
  showClear = false;

  @property({ type: Boolean, reflect: true })
  showSearchButton = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Array })
  suggestions: string[] = [];

  @property({ type: String })
  searchButtonText = 'Search';

  @state()
  private focused = false;

  @state()
  private highlightedIndex = -1;

  private inputElement: HTMLInputElement | null = null;

  private get containerClasses() {
    return Object.fromEntries(Object.entries({
      'search-box': true,
      [`search-box--${this.variant}`]: this.variant !== 'default',
      [`search-box--${this.size}`]: this.size !== 'md',
      'search-box--focused': this.focused,
      'search-box--has-value': !!this.value,
      'search-box--loading': this.loading,
      'search-box--disabled': this.disabled,
    }).map(([key, value]) => [key, String(value)]));
  }

  private get showClearButton() {
    return this.showClear && this.value && !this.readonly && !this.disabled;
  }

  private get showSuggestions() {
    return this.focused && this.suggestions.length > 0 && this.value.length > 0;
  }

  private get filteredSuggestions() {
    if (!this.value) return [];
    return this.suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(this.value.toLowerCase())
    );
  }

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.highlightedIndex = -1;

    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!this.showSuggestions) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.highlightedIndex = Math.min(
          this.highlightedIndex + 1,
          this.filteredSuggestions.length - 1
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.highlightedIndex >= 0) {
          this.selectSuggestion(this.filteredSuggestions[this.highlightedIndex]);
        } else {
          this.handleSearch();
        }
        break;
      case 'Escape':
        this.focused = false;
        this.highlightedIndex = -1;
        break;
    }
  }

  private handleFocus() {
    this.focused = true;

    this.dispatchEvent(new CustomEvent('focus', {
      detail: { value: this.value },
      bubbles: true,
    }));
  }

  private handleBlur() {
    setTimeout(() => {
      this.focused = false;
      this.highlightedIndex = -1;
    }, 200);

    this.dispatchEvent(new CustomEvent('blur', {
      detail: { value: this.value },
      bubbles: true,
    }));
  }

  private handleClear() {
    this.value = '';
    this.highlightedIndex = -1;
    this.inputElement?.focus();

    this.dispatchEvent(new CustomEvent('clear', {
      detail: { value: this.value },
      bubbles: true,
    }));
  }

  private handleSearch() {
    this.dispatchEvent(new CustomEvent('search', {
      detail: { value: this.value },
      bubbles: true,
    }));
  }

  private selectSuggestion(suggestion: string) {
    this.value = suggestion;
    this.focused = false;
    this.highlightedIndex = -1;

    this.dispatchEvent(new CustomEvent('suggestion-select', {
      detail: { suggestion, value: this.value },
      bubbles: true,
    }));
  }

  private highlightMatch(text: string, query: string) {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part) => {
      return regex.test(part)
        ? html`<span class="suggestions__item-match">${part}</span>`
        : part;
    });
  }

  render() {
    const filteredSuggestions = this.filteredSuggestions;

    return html`
      <div class="${styleMap(this.containerClasses)}">
        <div class="search-box__input-container">
          <!-- Search Icon -->
          ${this.loading
            ? html`
              <svg class="search-box__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            `
            : html`
              <svg class="search-box__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            `
          }

          <!-- Input Field -->
          <input
            type="text"
            class="search-box__input"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?readonly="${this.readonly}"
            @input="${this.handleInput}"
            @focus="${this.handleFocus}"
            @blur="${this.handleBlur}"
            @keydown="${this.handleKeyDown}"
          />

          <!-- Clear Button -->
          ${this.showClearButton ? html`
            <button
              type="button"
              class="search-box__clear"
              @click="${this.handleClear}"
              aria-label="Clear search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          ` : ''}
        </div>

        <!-- Search Button -->
        ${this.showSearchButton ? html`
          <button
            type="button"
            class="search-box__search-button"
            ?disabled="${this.disabled || this.loading}"
            @click="${this.handleSearch}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <span>${this.searchButtonText}</span>
          </button>
        ` : ''}

        <!-- Suggestions Dropdown -->
        ${this.showSuggestions && filteredSuggestions.length > 0 ? html`
          <div class="search-box__suggestions">
            ${filteredSuggestions.map((suggestion, index) => html`
              <div
                class="suggestions__item ${index === this.highlightedIndex ? 'suggestions__item--highlighted' : ''}"
                @click="${() => this.selectSuggestion(suggestion)}">
                <svg class="suggestions__item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <div class="suggestions__item-text">
                  ${this.highlightMatch(suggestion, this.value)}
                </div>
              </div>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skill-search-box': SearchBox;
  }
}