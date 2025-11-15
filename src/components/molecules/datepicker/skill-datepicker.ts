import { LitElement, html, type PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { datepickerStyles } from './skill-datepicker.styles';
import { baseStyles } from '../../../styles/base';
import type {} from '../../../types';

/**
 * DatePicker specific types
 */
export type DatePickerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type DatePickerVariant = 'default' | 'filled' | 'underlined';
export type DatePickerFormat = 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD';

export interface DatePickerEventDetail {
  value: string;
  date: Date | null;
  formatted: string;
}

/**
 * Skill DatePicker Component
 *
 * A comprehensive date picker component with calendar dropdown, keyboard navigation,
 * and extensive customization options.
 *
 * @slot - Text content for the input placeholder (optional)
 * @slot helper-text - Helper text displayed below the input
 * @slot error-text - Error text displayed below the input
 *
 * @csspart input - The input element
 * @csspart calendar - The calendar dropdown
 * @csspart day - Individual day elements in the calendar
 * @csspart nav-button - Navigation buttons in calendar header
 *
 * @cssprop --datepicker-bg - Background color of input
 * @cssprop --datepicker-border - Border color of input
 * @cssprop --datepicker-text - Text color of input
 * @cssprop --datepicker-calendar-bg - Background color of calendar
 *
 * @fires skill-change - Dispatched when date selection changes
 * @fires skill-open - Dispatched when calendar is opened
 * @fires skill-close - Dispatched when calendar is closed
 * @fires skill-focus - Dispatched when input gains focus
 * @fires skill-blur - Dispatched when input loses focus
 *
 * @example
 * ```html
 * <skill-date-picker
 *   value="2024-01-15"
 *   format="YYYY-MM-DD"
 *   placeholder="Select a date">
 * </skill-date-picker>
 *
 * <skill-date-picker
 *   size="lg"
 *   variant="filled"
 *   disabled
 *   helper-text="Disabled date picker">
 * </skill-date-picker>
 * ```
 */
@customElement('skill-date-picker')
export class SkillDatePicker extends LitElement {
  static styles = [baseStyles, datepickerStyles];

  /**
   * Current selected date value in ISO format (YYYY-MM-DD)
   */
  @property({ type: String, reflect: true })
  value = '';

  /**
   * Placeholder text for the input
   */
  @property({ type: String, reflect: true })
  placeholder = 'Select a date';

  /**
   * Size of the date picker
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: DatePickerSize = 'md';

  /**
   * Visual variant of the date picker
   * @type {'default' | 'filled' | 'underlined'}
   */
  @property({ type: String, reflect: true })
  variant: DatePickerVariant = 'default';

  /**
   * Date format for display
   * @type {'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD'}
   */
  @property({ type: String, reflect: true })
  format: DatePickerFormat = 'YYYY-MM-DD';

  /**
   * Minimum selectable date (YYYY-MM-DD)
   */
  @property({ type: String, reflect: true, attribute: 'min-date' })
  minDate?: string;

  /**
   * Maximum selectable date (YYYY-MM-DD)
   */
  @property({ type: String, reflect: true, attribute: 'max-date' })
  maxDate?: string;

  /**
   * Disabled dates (array of YYYY-MM-DD strings)
   */
  @property({ type: Array, reflect: true, attribute: 'disabled-dates' })
  disabledDates: string[] = [];

  /**
   * Whether weekends are disabled
   */
  @property({ type: Boolean, reflect: true, attribute: 'disable-weekends' })
  disableWeekends = false;

  /**
   * Whether to highlight today's date
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-today' })
  showToday = true;

  /**
   * First day of the week (0 = Sunday, 1 = Monday, ...)
   */
  @property({ type: Number, reflect: true, attribute: 'first-day' })
  firstDayOfWeek = 0;

  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Required state
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Error state
   */
  @property({ type: Boolean, reflect: true })
  hasError = false;

  /**
   * Error message
   */
  @property({ type: String, reflect: true, attribute: 'error-message' })
  errorMessage?: string;

  /**
   * Helper text
   */
  @property({ type: String, reflect: true, attribute: 'helper-text' })
  helperText?: string;

  /**
   * Loading state
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Read-only state
   */
  @property({ type: Boolean, reflect: true, attribute: 'read-only' })
  readOnly = false;

  /**
   * Whether to clear value on escape key
   */
  @property({ type: Boolean, reflect: true, attribute: 'clear-on-escape' })
  clearOnEscape = false;

  @state()
  private _isOpen = false;

  @state()
  private _currentMonth = new Date().getMonth();

  @state()
  private _currentYear = new Date().getFullYear();

  @state()
  private _displayValue = '';

  private _selectedDate: Date | null = null;

  // Click outside handler
  private _clickOutsideHandler = (e: Event) => {
    if (!this.contains(e.target as Node)) {
      this._closeCalendar();
    }
  };

  // Keyboard navigation handler
  private _keydownHandler = (e: KeyboardEvent) => {
    if (!this._isOpen) return;

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        if (this.clearOnEscape) {
          this.value = '';
          this._selectedDate = null;
          this._displayValue = '';
          this._dispatchChangeEvent();
        }
        this._closeCalendar();
        break;
      case 'Enter':
        e.preventDefault();
        this._selectDate(this._selectedDate);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this._navigateDate(-1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        this._navigateDate(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._navigateDate(-7);
        break;
      case 'ArrowDown':
        e.preventDefault();
        this._navigateDate(7);
        break;
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this._initializeDate();
    document.addEventListener('click', this._clickOutsideHandler);
    document.addEventListener('keydown', this._keydownHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._clickOutsideHandler);
    document.removeEventListener('keydown', this._keydownHandler);
  }

  protected willUpdate(changedProperties: PropertyValueMap<this>) {
    if (changedProperties.has('value')) {
      this._initializeDate();
    }
  }

  private _initializeDate() {
    if (this.value) {
      const date = this._parseDate(this.value);
      if (date) {
        this._selectedDate = date;
        this._displayValue = this._formatDateForDisplay(date);
        this._currentMonth = date.getMonth();
        this._currentYear = date.getFullYear();
      }
    } else {
      this._selectedDate = null;
      this._displayValue = '';
      const today = new Date();
      this._currentMonth = today.getMonth();
      this._currentYear = today.getFullYear();
    }
  }

  private _parseDate(dateString: string): Date | null {
    if (!dateString) return null;

    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }

  private _formatDateForDisplay(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    switch (this.format) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'YYYY/MM/DD':
        return `${year}/${month}/${day}`;
      case 'YYYY-MM-DD':
      default:
        return `${year}-${month}-${day}`;
    }
  }

  private _formatDateForValue(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private _toggleCalendar() {
    if (this.disabled || this.readOnly) return;

    if (this._isOpen) {
      this._closeCalendar();
    } else {
      this._openCalendar();
    }
  }

  private _openCalendar() {
    if (this.disabled || this.readOnly) return;

    this._isOpen = true;
    this.dispatchEvent(new CustomEvent('skill-open', { bubbles: true, composed: true }));
  }

  private _closeCalendar() {
    this._isOpen = false;
    this.dispatchEvent(new CustomEvent('skill-close', { bubbles: true, composed: true }));
  }

  private _navigateMonth(direction: number) {
    this._currentMonth += direction;

    if (this._currentMonth < 0) {
      this._currentMonth = 11;
      this._currentYear--;
    } else if (this._currentMonth > 11) {
      this._currentMonth = 0;
      this._currentYear++;
    }
  }

  private _navigateDate(days: number) {
    const currentDate = this._selectedDate || new Date();
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);

    if (this._isDateSelectable(newDate)) {
      this._selectedDate = newDate;
    }
  }

  private _selectDate(date: Date | null) {
    if (!date || !this._isDateSelectable(date)) return;

    this._selectedDate = date;
    this.value = this._formatDateForValue(date);
    this._displayValue = this._formatDateForDisplay(date);
    this._closeCalendar();
    this._dispatchChangeEvent();
  }

  private _isDateSelectable(date: Date): boolean {
    const dateStr = this._formatDateForValue(date);

    // Check min date
    if (this.minDate && dateStr < this.minDate) return false;

    // Check max date
    if (this.maxDate && dateStr > this.maxDate) return false;

    // Check disabled dates
    if (this.disabledDates.includes(dateStr)) return false;

    // Check weekends
    if (this.disableWeekends) {
      const day = date.getDay();
      if (day === 0 || day === 6) return false;
    }

    return true;
  }

  private _getDaysInMonth(year: number, month: number): Date[] {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add previous month's trailing days
    const firstDayOfWeek = firstDay.getDay();
    const startDay = (firstDayOfWeek - this.firstDayOfWeek + 7) % 7;
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push(date);
    }

    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add next month's leading days to complete the grid
    const remainingDays = 42 - days.length; // 6 weeks × 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  }

  private _isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  private _isSelected(date: Date): boolean {
    if (!this._selectedDate) return false;
    return date.getDate() === this._selectedDate.getDate() &&
           date.getMonth() === this._selectedDate.getMonth() &&
           date.getFullYear() === this._selectedDate.getFullYear();
  }

  private _isOtherMonth(date: Date): boolean {
    return date.getMonth() !== this._currentMonth;
  }

  private _isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  private _getMonthName(month: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
  }

  private _getWeekdayName(day: number): string {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays[(day + this.firstDayOfWeek) % 7];
  }

  private _dispatchChangeEvent() {
    this.dispatchEvent(new CustomEvent('skill-change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
        date: this._selectedDate,
        formatted: this._displayValue
      } as DatePickerEventDetail
    }));
  }

  render() {
    const monthName = this._getMonthName(this._currentMonth);
    const weekdays = Array.from({ length: 7 }, (_, i) => this._getWeekdayName(i));
    const days = this._getDaysInMonth(this._currentYear, this._currentMonth);

    return html`
      <div class="skill-datepicker skill-datepicker--${this.size} skill-datepicker--${this.variant}">
        <div class="skill-datepicker__input-group">
          <input
            part="input"
            class="skill-datepicker__input ${this.hasError ? 'has-error' : ''}"
            type="text"
            .value=${this._displayValue}
            .placeholder=${this.placeholder}
            ?disabled=${this.disabled || this.loading}
            ?readonly=${this.readOnly}
            ?required=${this.required}
            @click=${this._toggleCalendar}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
          />

          ${this.loading ? html`
            <svg class="skill-datepicker__loading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2 L12 6" />
              <path d="M12 18 L12 22" />
              <path d="M22 12 L18 12" />
              <path d="M6 12 L2 12" />
            </svg>
          ` : html`
            <svg class="skill-datepicker__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          `}
        </div>

        ${this.errorMessage && this.hasError ? html`
          <div class="skill-datepicker__error">
            <slot name="error-text">${this.errorMessage}</slot>
          </div>
        ` : ''}

        ${this.helperText && !this.hasError ? html`
          <div class="skill-datepicker__helper">
            <slot name="helper-text">${this.helperText}</slot>
          </div>
        ` : ''}

        ${this._isOpen ? html`
          <div part="calendar" class="skill-datepicker__calendar visible">
            <div class="skill-datepicker__header">
              <div class="skill-datepicker__nav">
                <button
                  part="nav-button"
                  class="skill-datepicker__nav-button"
                  type="button"
                  @click=${() => this._navigateMonth(-1)}
                  ?disabled=${this._currentMonth === 0 && this._currentYear === 1900}
                  aria-label="Previous month"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  part="nav-button"
                  class="skill-datepicker__nav-button"
                  type="button"
                  @click=${() => this._navigateMonth(1)}
                  ?disabled=${this._currentMonth === 11 && this._currentYear === 2100}
                  aria-label="Next month"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
              <div class="skill-datepicker__month-year">
                ${monthName} ${this._currentYear}
              </div>
            </div>

            <div class="skill-datepicker__body">
              <div class="skill-datepicker__weekdays">
                ${weekdays.map(day => html`
                  <div class="skill-datepicker__weekday">${day}</div>
                `)}
              </div>

              <div class="skill-datepicker__days">
                ${days.map(date => {
                  const isToday = this._isToday(date);
                  const isSelected = this._isSelected(date);
                  const isOtherMonth = this._isOtherMonth(date);
                  const isWeekend = this._isWeekend(date);
                  const isDisabled = !this._isDateSelectable(date);

                  return html`
                    <button
                      part="day"
                      class="skill-datepicker__day
                        ${isSelected ? 'selected' : ''}
                        ${isToday && this.showToday ? 'today' : ''}
                        ${isOtherMonth ? 'other-month' : ''}
                        ${isWeekend ? 'weekend' : ''}
                        ${isDisabled ? 'disabled' : ''}"
                      type="button"
                      .disabled=${isDisabled}
                      @click=${() => this._selectDate(date)}
                      aria-label=${date.toLocaleDateString()}
                      aria-selected=${isSelected}
                      aria-disabled=${isDisabled}
                    >
                      ${date.getDate()}
                    </button>
                  `;
                })}
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  private _handleFocus(e: FocusEvent) {
    this.dispatchEvent(new CustomEvent('skill-focus', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: e }
    }));
  }

  private _handleBlur(e: FocusEvent) {
    this.dispatchEvent(new CustomEvent('skill-blur', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: e }
    }));
  }

  /**
   * Public API methods
   */

  /**
   * Open the calendar dropdown
   */
  public open() {
    this._openCalendar();
  }

  /**
   * Close the calendar dropdown
   */
  public close() {
    this._closeCalendar();
  }

  /**
   * Get the current selected date
   */
  public getDate(): Date | null {
    return this._selectedDate;
  }

  /**
   * Set the date programmatically
   */
  public setDate(date: Date) {
    this._selectedDate = date;
    this.value = this._formatDateForValue(date);
    this._displayValue = this._formatDateForDisplay(date);
    this._currentMonth = date.getMonth();
    this._currentYear = date.getFullYear();
    this._dispatchChangeEvent();
  }

  /**
   * Clear the current selection
   */
  public clear() {
    this._selectedDate = null;
    this.value = '';
    this._displayValue = '';
    this._dispatchChangeEvent();
  }

  /**
   * Focus the input element
   */
  public focus() {
    const input = this.shadowRoot?.querySelector('.skill-datepicker__input') as HTMLInputElement;
    if (input) {
      input.focus();
    }
  }

  /**
   * Blur the input element
   */
  public blur() {
    const input = this.shadowRoot?.querySelector('.skill-datepicker__input') as HTMLInputElement;
    if (input) {
      input.blur();
    }
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-date-picker': SkillDatePicker;
  }
}