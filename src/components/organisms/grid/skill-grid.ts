import { LitElement, html, type PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { gridStyles } from './skill-grid.styles';
import { baseStyles } from '../../../styles/base';
import type {
  GridColProperties,
  GridAlign,
  GridJustify,
  GridDirection,
  GridWrap,
  Breakpoint
} from '../../../types'; // eslint-disable-line @typescript-eslint/no-unused-vars

// Define HTMLSkillColElement interface
interface HTMLSkillColElement extends HTMLElement {
  // Skill column element interface
}

/**
 * Skill Grid Component - 栅格布局容器
 *
 * @slot - Grid items or skill-col elements
 *
 * @csspart grid - The grid container element
 *
 * @cssprop --skill-grid-gutter - Grid gutter spacing
 *
 * @fires skill-layout-change - Dispatched when grid layout changes
 *
 * @example
 * ```html
 * <skill-grid gutter="16" align="center" justify="between">
 *   <skill-col span="8">Column 1</skill-col>
 *   <skill-col span="8">Column 2</skill-col>
 *   <skill-col span="8">Column 3</skill-col>
 * </skill-grid>
 *
 * <!-- Responsive example -->
 * <skill-grid gutter="24">
 *   <skill-col span="24" sm="12" md="8" lg="6">Responsive</skill-col>
 *   <skill-col span="24" sm="12" md="16" lg="18">Responsive</skill-col>
 * </skill-grid>
 * ```
 */
@customElement('skill-grid')
export class SkillGrid extends LitElement {
  static styles = [baseStyles, gridStyles];

  /**
   * Grid gutter spacing
   * Can be a number, CSS string, or responsive object
   */
  @property({ type: [String, Number], reflect: true })
  gutter?: number | string;

  /**
   * Vertical alignment of grid items
   */
  @property({ type: String, reflect: true })
  align?: GridAlign;

  /**
   * Horizontal alignment of grid items
   */
  @property({ type: String, reflect: true })
  justify?: GridJustify;

  /**
   * Direction of grid items
   */
  @property({ type: String, reflect: true })
  direction?: GridDirection;

  /**
   * Whether grid items should wrap
   */
  @property({ type: String, reflect: true })
  wrap?: GridWrap;

  /**
   * Number of columns (default: 24)
   */
  @property({ type: Number, reflect: true })
  columns = 24;

  private _resizeObserver?: ResizeObserver;

  connectedCallback() {
    super.connectedCallback();
    this._setupResizeObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }

  private _setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(() => {
        this._dispatchLayoutChange();
      });
      this._resizeObserver.observe(this);
    }
  }

  private _dispatchLayoutChange() {
    this.dispatchEvent(new CustomEvent('skill-layout-change', {
      bubbles: true,
      composed: true,
      detail: {
        width: this.offsetWidth,
        height: this.offsetHeight,
        columns: this.columns,
        gutter: this.gutter,
        align: this.align,
        justify: this.justify
      }
    }));
  }

  protected update(changedProperties: PropertyValueMap<this>) {
    super.update(changedProperties);

    if (changedProperties.has('columns')) {
      this.style.setProperty('--skill-grid-columns', this.columns.toString());
    }

    if (changedProperties.has('gutter')) {
      this._updateGutter();
    }
  }

  private _updateGutter() {
    if (this.gutter) {
      if (typeof this.gutter === 'number') {
        this.style.setProperty('--skill-grid-gutter', `${this.gutter}px`);
      } else {
        this.style.setProperty('--skill-grid-gutter', this.gutter);
      }
    }
  }

  private _getGridClasses() {
    const classes = ['skill-grid'];

    if (this.align) {
      classes.push(`skill-grid--align-${this.align}`);
    }

    if (this.justify) {
      classes.push(`skill-grid--justify-${this.justify}`);
    }

    if (this.direction) {
      classes.push(`skill-grid--${this.direction}`);
    }

    if (this.wrap) {
      classes.push(`skill-grid--${this.wrap}`);
    }

    // Gutter classes
    if (this.gutter === 0) {
      classes.push('skill-grid--no-gutter');
    } else if (typeof this.gutter === 'string') {
      const gutterMap: { [key: string]: string } = {
        'xs': 'skill-grid--gutter-xs',
        'sm': 'skill-grid--gutter-sm',
        'md': 'skill-grid--gutter-md',
        'lg': 'skill-grid--gutter-lg',
        'xl': 'skill-grid--gutter-xl',
        '2xl': 'skill-grid--gutter-2xl',
        '3xl': 'skill-grid--gutter-3xl'
      };
      const gutterClass = gutterMap[this.gutter];
      if (gutterClass) {
        classes.push(gutterClass);
      }
    }

    return classes.join(' ');
  }

  render() {
    return html`
      <div part="grid" class="${this._getGridClasses()}" style="--skill-grid-columns: ${this.columns};">
        <slot></slot>
      </div>
    `;
  }

  /**
   * Get current grid layout information
   */
  public getLayoutInfo() {
    return {
      width: this.offsetWidth,
      height: this.offsetHeight,
      columns: this.columns,
      gutter: this.gutter,
      align: this.align,
      justify: this.justify,
      direction: this.direction,
      wrap: this.wrap
    };
  }

  /**
   * Add a grid column
   */
  public addColumn(span: number | GridColProperties = 1, content?: string) {
    const col = document.createElement('skill-col');

    if (typeof span === 'number') {
      col.setAttribute('span', span.toString());
    } else {
      Object.entries(span).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === 'span') {
            if (typeof value === 'number') {
              col.setAttribute('span', value.toString());
            } else {
              Object.entries(value).forEach(([breakpoint, spanValue]) => {
                if (spanValue !== undefined && spanValue !== null) {
                  col.setAttribute(`${breakpoint}`, spanValue.toString());
                }
              });
            }
          } else {
            col.setAttribute(key, value.toString());
          }
        }
      });
    }

    if (content) {
      col.textContent = content;
    }

    this.appendChild(col);
    return col;
  }

  /**
   * Remove all grid columns
   */
  public clearColumns() {
    const cols = this.querySelectorAll('skill-col');
    cols.forEach(col => col.remove());
  }

  /**
   * Get all grid columns
   */
  public getColumns(): HTMLSkillColElement[] {
    return Array.from(this.querySelectorAll('skill-col'));
  }
}

/**
 * Skill Grid Column Component - 栅格列
 *
 * @slot - Column content
 *
 * @csspart column - The column element
 *
 * @example
 * ```html
 * <skill-col span="12">Half width column</skill-col>
 * <skill-col span="12" offset="6">Half width column with offset</skill-col>
 * <skill-col span="12" offset="6" pull="3">Half width with pull</skill-col>
 * <skill-col span="12" sm="6" md="4" lg="3">Responsive column</skill-col>
 * ```
 */
@customElement('skill-col')
export class SkillCol extends LitElement {
  static styles = [baseStyles, gridStyles];

  /**
   * Column span (1-24)
   */
  @property({ type: [Number, String], reflect: true })
  span?: number | string;

  /**
   * Column offset (0-23)
   */
  @property({ type: [Number, String], reflect: true })
  offset?: number | string;

  /**
   * Order of the column
   */
  @property({ type: Number, reflect: true })
  order?: number;

  /**
   * Pull column to the left (0-12)
   */
  @property({ type: [Number, String], reflect: true })
  pull?: number | string;

  /**
   * Push column to the right (0-12)
   */
  @property({ type: [Number, String], reflect: true })
  push?: number | string;

  /**
   * Responsive span for small screens
   */
  @property({ type: [Number, String], reflect: true })
  xs?: number | string;

  /**
   * Responsive span for small screens
   */
  @property({ type: [Number, String], reflect: true })
  sm?: number | string;

  /**
   * Responsive span for medium screens
   */
  @property({ type: [Number, String], reflect: true })
  md?: number | string;

  /**
   * Responsive span for large screens
   */
  @property({ type: [Number, String], reflect: true })
  lg?: number | string;

  /**
   * Responsive span for extra large screens
   */
  @property({ type: [Number, String], reflect: true })
  xl?: number | string;

  /**
   * Responsive span for extra extra large screens
   */
  @property({ type: [Number, String], reflect: true })
  xxl?: number | string;

  /**
   * Flex property for auto-width columns
   */
  @property({ type: String, reflect: true })
  flex?: string;

  private _getColumnClasses() {
    const classes = ['skill-grid__col'];

    // Base span
    if (this.span) {
      if (this.span === 'auto') {
        classes.push('skill-grid__col--auto');
      } else {
        const spanNum = parseInt(this.span.toString());
        if (spanNum >= 1 && spanNum <= 24) {
          classes.push(`skill-grid__col--span-${spanNum}`);
        }
      }
    }

    // Offset
    if (this.offset !== undefined) {
      const offsetNum = parseInt(this.offset.toString());
      if (offsetNum >= 0 && offsetNum <= 23) {
        classes.push(`skill-grid__col--offset-${offsetNum}`);
      }
    }

    // Push/Pull
    if (this.push !== undefined) {
      const pushNum = parseInt(this.push.toString());
      if (pushNum >= 0 && pushNum <= 12) {
        classes.push(`skill-grid__col--push-${pushNum}`);
      }
    }

    if (this.pull !== undefined) {
      const pullNum = parseInt(this.pull.toString());
      if (pullNum >= 0 && pullNum <= 12) {
        classes.push(`skill-grid__col--pull-${pullNum}`);
      }
    }

    // Responsive spans
    const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
    breakpoints.forEach(bp => {
      const value = (this as any)[bp];
      if (value !== undefined) {
        if (value === 'auto') {
          classes.push(`skill-grid__col--${bp}-auto`);
        } else {
          const spanNum = parseInt(value.toString());
          if (spanNum >= 1 && spanNum <= 24) {
            classes.push(`skill-grid__col--${bp}-span-${spanNum}`);
          }
        }
      }
    });

    return classes.join(' ');
  }

  render() {
    return html`
      <div
        part="column"
        class="${this._getColumnClasses()}"
        style="${this.order ? `order: ${this.order};` : ''} ${this.flex ? `flex: ${this.flex};` : ''}"
      >
        <slot></slot>
      </div>
    `;
  }

  /**
   * Get column span information
   */
  public getSpanInfo() {
    const spans: { base?: number | 'auto' } & Record<Breakpoint, number | 'auto' | undefined> = {} as any;

    if (this.span !== undefined) {
      spans.base = this.span === 'auto' ? 'auto' : parseInt(this.span.toString());
    }

    const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
    breakpoints.forEach(bp => {
      const value = (this as any)[bp];
      if (value !== undefined) {
        spans[bp] = value === 'auto' ? 'auto' : parseInt(value.toString());
      }
    });

    return spans;
  }

  /**
   * Set responsive spans
   */
  public setResponsiveSpans(spans: { base?: number | 'auto'; xs?: number | 'auto'; sm?: number | 'auto'; md?: number | 'auto'; lg?: number | 'auto'; xl?: number | 'auto'; xxl?: number | 'auto' }) {
    Object.entries(spans).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'base') {
          this.span = value === 'auto' ? 'auto' : value.toString();
        } else {
          (this as any)[key] = value === 'auto' ? 'auto' : value.toString();
        }
      }
    });
    this.requestUpdate();
  }
}

// TypeScript support for using these elements in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-grid': SkillGrid;
    'skill-col': HTMLSkillColElement;
  }
}