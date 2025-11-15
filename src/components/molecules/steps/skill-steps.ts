import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { stepsStyles } from './skill-steps.styles';
import { baseStyles } from '../../../styles/base';

export interface StepItem {
  title: string;
  description?: string;
  icon?: string;
  status?: 'wait' | 'process' | 'finish' | 'error';
  disabled?: boolean;
  onClick?: (e: Event) => void;
}

/**
 * Skill Steps Component - 步骤条组件
 *
 * @slot - Default slot for step items
 * @slot icon - Custom icon slot for each step
 * @slot title - Custom title slot for each step
 * @slot description - Custom description slot for each step
 * @slot error-icon - Custom error icon slot
 * @slot finish-icon - Custom finish icon slot
 *
 * @csspart steps - The steps container
 * @csspart step - Individual step container
 * @csspart step-icon - Step icon container
 * @csspart step-content - Step content container
 * @csspart step-title - Step title element
 * @csspart step-description - Step description element
 * @csspart step-line - Connector line between steps
 * @csspart step-error - Error indicator
 *
 * @cssprop --steps-gap - Gap between steps
 * @cssprop --step-icon-size - Icon size
 * @cssprop --step-line-width - Connector line width
 * @cssprop --step-line-color - Connector line color
 * @cssprop --step-font-size - Title font size
 * @cssprop --step-description-font-size - Description font size
 *
 * @fires skill-steps-change - Dispatched when current step changes
 * @fires skill-step-click - Dispatched when a step is clicked
 * @fires skill-step-error - Dispatched when error occurs
 *
 * @example
 * ```html
 * <!-- 基础步骤条 -->
 * <skill-steps current="1">
 *   <div class="step" title="Step 1">Create Account</div>
 *   <div class="step" title="Step 2">Verify Email</div>
 *   <div class="step" title="Step 3">Complete Profile</div>
 *   <div class="step" title="Step 4">Start Using</div>
 * </skill-steps>
 *
 * <!-- 使用items属性 -->
 * <skill-steps
 *   current="2"
 *   .items=${[
 *     { title: 'Login', description: 'Enter your credentials' },
 *     { title: 'Verify', description: 'Two-factor authentication' },
 *     { title: 'Complete', description: 'Setup is complete' }
 *   ]}
 * ></skill-steps>
 *
 * <!-- 带图标的步骤 -->
 * <skill-steps current="1" show-icons>
 *   <div class="step" title="Upload" data-icon="upload">Upload files</div>
 *   <div class="step" title="Process" data-icon="settings">Process files</div>
 *   <div class="step" title="Download" data-icon="download">Download results</div>
 * </skill-steps>
 *
 * <!-- 不同方向 -->
 * <skill-steps current="1" direction="vertical">
 *   <div class="step" title="Step 1">First step</div>
 *   <div class="step" title="Step 2">Second step</div>
 *   <div class="step" title="Step 3">Third step</div>
 * </skill-steps>
 *
 * <!-- 不同尺寸 -->
 * <skill-steps current="1" size="sm">
 *   <div class="step" title="Step 1">Small step</div>
 *   <div class="step" title="Step 2">Another step</div>
 * </skill-steps>
 *
 * <skill-steps current="1" size="lg">
 *   <div class="step" title="Step 1">Large step</div>
 *   <div class="step" title="Step 2">Another step</div>
 * </skill-steps>
 *
 * <!-- 带描述的步骤 -->
 * <skill-steps current="1" show-descriptions>
 *   <div class="step" title="Personal Info" description="Enter your basic information">Step 1</div>
 *   <div class="step" title="Address" description="Provide your shipping address">Step 2</div>
 *   <div class="step" title="Payment" description="Choose payment method">Step 3</div>
 * </skill-steps>
 *
 * <!-- 不同状态 -->
 * <skill-steps current="2">
 *   <div class="step" title="Completed" status="finish">✓</div>
 *   <div class="step" title="Current" status="process">⚡</div>
 *   <div class="step" title="Waiting" status="wait">⏳</div>
 *   <div class="step" title="Error" status="error">✗</div>
 * </skill-steps>
 *
 * <!-- 可点击步骤 -->
 * <skill-steps current="1" clickable>
 *   <div class="step" title="Step 1" onclick="alert('Step 1')">Click me</div>
 *   <div class="step" title="Step 2" onclick="alert('Step 2')">Or me</div>
 *   <div class="step" title="Step 3">Not clickable</div>
 * </skill-steps>
 *
 * <!-- 数字编号 -->
 * <skill-steps current="2" show-number>
 *   <div class="step" title="First">Step 1</div>
 *   <div class="step" title="Second">Step 2</div>
 *   <div class="step" title="Third">Step 3</div>
 * </skill-steps>
 *
 * <!-- 垂直带描述 -->
 * <skill-steps current="1" direction="vertical" show-descriptions>
 *   <div class="step" title="Account Setup" description="Create your account">Step 1</div>
 *   <div class="step" title="Profile Info" description="Fill in your details">Step 2</div>
 *   <div class="step" title="Preferences" description="Set your preferences">Step 3</div>
 * </skill-steps>
 *
 * <!-- 错误状态 -->
 * <skill-steps current="2" error-index="1">
 *   <div class="step" title="Upload">Upload document</div>
 *   <div class="step" title="Process">Process document (Error)</div>
 *   <div class="step" title="Complete">Complete setup</div>
 * </skill-steps>
 *
 * <!-- 自定义颜色 -->
 * <skill-steps current="1" color="success">
 *   <div class="step" title="Step 1">Success themed</div>
 *   <div class="step" title="Step 2">Green accent</div>
 * </skill-steps>
 *
 * <!-- 程序化控制 -->
 * <skill-steps id="my-steps"></skill-steps>
 * <script>
 *   const steps = document.getElementById('my-steps');
 *   steps.items = [
 *     { title: 'Start', status: 'finish' },
 *     { title: 'Process', status: 'process' },
 *     { title: 'Complete', status: 'wait' }
 *   ];
 *   steps.current = 1;
 * </script>
 * ```
 */
@customElement('skill-steps')
export class SkillSteps extends LitElement {
  static styles = [baseStyles, stepsStyles];

  /**
   * Current active step index (0-based)
   */
  @property({ type: Number, reflect: true })
  current = 0;

  /**
   * Step items array (alternative to slot content)
   */
  @property({ type: Array })
  items: StepItem[] = [];

  /**
   * Direction of steps
   * @type {'horizontal' | 'vertical'}
   */
  @property({ type: String, reflect: true })
  direction: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Steps size
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Color theme
   * @type {'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray'}
   */
  @property({ type: String, reflect: true })
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray' = 'primary';

  /**
   * Whether steps are clickable
   */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  /**
   * Whether to show icons
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-icons' })
  showIcons = false;

  /**
   * Whether to show numbers
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-number' })
  showNumber = false;

  /**
   * Whether to show descriptions
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-descriptions' })
  showDescriptions = false;

  /**
   * Whether to show connector lines
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-lines' })
  showLines = true;

  /**
   * Error step index
   */
  @property({ type: Number, reflect: true, attribute: 'error-index' })
  errorIndex?: number;

  /**
   * Initial step (0-based)
   */
  @property({ type: Number, reflect: true, attribute: 'initial-step' })
  initialStep = 0;

  /**
   * ARIA label for accessibility
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel = 'Progress steps';

  /**
   * Current window width for responsive behavior
   */
  @state()
  private _windowWidth = window.innerWidth;

  private _mediaQuery?: MediaQueryList;

  connectedCallback() {
    super.connectedCallback();

    // Setup responsive behavior
    this._setupResponsive();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupResponsive();
  }

  private _setupResponsive() {
    if (!('matchMedia' in window)) return;

    this._mediaQuery = window.matchMedia('(max-width: 768px)');
    this._mediaQuery.addListener(() => {
      this._windowWidth = window.innerWidth;
      this.requestUpdate();
    });
  }

  private _cleanupResponsive() {
    if (this._mediaQuery) {
      this._mediaQuery.removeListener(() => {});
    }
  }

  private _getStepsFromSlot(): StepItem[] {
    const slot = this.shadowRoot?.querySelector('slot:not([name])');
    if (!slot) return [];

    const assignedNodes = (slot as HTMLSlotElement).assignedNodes({ flatten: true });
    return assignedNodes
      .filter((node): node is HTMLElement => node.nodeType === Node.ELEMENT_NODE)
      .map((node: HTMLElement) => {
        const element = node as HTMLElement;
        return {
          title: element.getAttribute('title') || element.textContent?.trim() || '',
          description: element.getAttribute('description') || undefined,
          icon: element.getAttribute('data-icon') || undefined,
          status: element.getAttribute('status') as StepItem['status'] || 'wait',
          disabled: element.hasAttribute('disabled'),
          onClick: (_e: Event) => element.click?.(),
        };
      });
  }

  private _getAllSteps(): StepItem[] {
    if (this.items.length > 0) {
      return this.items;
    }
    return this._getStepsFromSlot();
  }

  private _getStepStatus(index: number): StepItem['status'] {
    const steps = this._getAllSteps();
    const step = steps[index];

    // Use explicit status if provided
    if (step?.status) {
      return step.status;
    }

    // Auto-determine status based on current step
    if (index < this.current) {
      return 'finish';
    } else if (index === this.current) {
      // Check if this is the error step
      if (this.errorIndex === index) {
        return 'error';
      }
      return 'process';
    } else {
      return 'wait';
    }
  }

  private _getStepNumber(index: number): string | number {
    return this.showNumber ? index + 1 : '';
  }

  private _handleStepClick(step: StepItem, index: number, e: Event) {
    if (!this.clickable || step.disabled) return;

    e.preventDefault();

    // Execute custom click handler
    if (step.onClick) {
      step.onClick(e);
    }

    // Update current step
    if (index !== this.current) {
      const oldCurrent = this.current;
      this.current = index;

      this._fireChangeEvent(oldCurrent, index);
    }

    this._fireStepClickEvent(step, index, e);
  }

  private _fireChangeEvent(oldCurrent: number, newCurrent: number) {
    this.dispatchEvent(
      new CustomEvent('skill-steps-change', {
        bubbles: true,
        composed: true,
        detail: {
          oldCurrent,
          newCurrent,
          steps: this._getAllSteps(),
        },
      })
    );
  }

  private _fireStepClickEvent(step: StepItem, index: number, originalEvent: Event) {
    this.dispatchEvent(
      new CustomEvent('skill-step-click', {
        bubbles: true,
        composed: true,
        detail: {
          step,
          index,
          originalEvent,
          current: this.current,
        },
      })
    );
  }

  private _renderStepIcon(status: StepItem['status'], step: StepItem, index: number): TemplateResult {
    const number = this._getStepNumber(index);

    switch (status) {
      case 'finish':
        return html`
          <span part="step-icon step-icon--finish" class="skill-steps__icon skill-steps__icon--finish">
            <slot name="finish-icon">
              <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            </slot>
          </span>
        `;

      case 'process':
        return html`
          <span part="step-icon step-icon--process" class="skill-steps__icon skill-steps__icon--process">
            <slot name="process-icon">
              ${step.icon && this.showIcons ? html`
                <skill-icon name="${step.icon}" size="sm"></skill-icon>
              ` : html`
                ${number}
              `}
            </slot>
          </span>
        `;

      case 'error':
        return html`
          <span part="step-icon step-icon--error" class="skill-steps__icon skill-steps__icon--error">
            <slot name="error-icon">
              <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </slot>
          </span>
        `;

      case 'wait':
      default:
        return html`
          <span part="step-icon step-icon--wait" class="skill-steps__icon skill-steps__icon--wait">
            <slot name="wait-icon">
              ${step.icon && this.showIcons ? html`
                <skill-icon name="${step.icon}" size="sm"></skill-icon>
              ` : html`
                ${number}
              `}
            </slot>
          </span>
        `;
    }
  }

  private _renderStep(step: StepItem, index: number): TemplateResult {
    const status = this._getStepStatus(index);
    const isActive = index === this.current;
    const isClickable = this.clickable && !step.disabled;

    return html`
      <li
        part="step"
        class="skill-steps__item skill-steps__item--${status}"
        data-status="${status}"
        data-index="${index}"
        ?data-active=${isActive}
        ?data-clickable=${isClickable}
        ?data-disabled=${step.disabled}
      >
        <div
          class="skill-steps__step"
          role="${isClickable ? 'button' : 'none'}"
          tabindex="${isClickable ? '0' : '-1'}"
          aria-label="${step.title}${this.showDescriptions && step.description ? ': ' + step.description : ''}"
          aria-current="${isActive ? 'step' : 'false'}"
          aria-disabled="${step.disabled ? 'true' : 'false'}"
          @click=${(e: Event) => this._handleStepClick(step, index, e)}
          @keydown=${(e: KeyboardEvent) => {
            if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              this._handleStepClick(step, index, e);
            }
          }}
        >
          ${this._renderStepIcon(status, step, index)}

          ${this.showLines && index < this._getAllSteps().length - 1 ? html`
            <div part="step-line" class="skill-steps__line"></div>
          ` : ''}

          ${(step.title || this.showDescriptions) ? html`
            <div part="step-content" class="skill-steps__content">
              <slot name="title">
                <div part="step-title" class="skill-steps__title">${step.title}</div>
              </slot>

              ${this.showDescriptions && step.description ? html`
                <slot name="description">
                  <div part="step-description" class="skill-steps__description">${step.description}</div>
                </slot>
              ` : ''}
            </div>
          ` : ''}
        </div>
      </li>
    `;
  }

  render(): TemplateResult {
    const steps = this._getAllSteps();
    const direction = this._windowWidth < 768 ? 'vertical' : this.direction;

    return html`
      <div
        part="steps"
        class="skill-steps skill-steps--${direction}"
        role="stepper"
        aria-label="${this.ariaLabel}"
        aria-orientation="${direction}"
      >
        <ol class="skill-steps__list">
          ${steps.map((step, index) => this._renderStep(step, index))}
        </ol>
      </div>
    `;
  }

  /**
   * Go to next step
   */
  public nextStep(): boolean {
    const steps = this._getAllSteps();
    if (this.current < steps.length - 1) {
      this.current++;
      return true;
    }
    return false;
  }

  /**
   * Go to previous step
   */
  public prevStep(): boolean {
    if (this.current > 0) {
      this.current--;
      return true;
    }
    return false;
  }

  /**
   * Go to specific step
   */
  public goToStep(index: number): boolean {
    const steps = this._getAllSteps();
    if (index >= 0 && index < steps.length) {
      const oldCurrent = this.current;
      this.current = index;
      this._fireChangeEvent(oldCurrent, index);
      return true;
    }
    return false;
  }

  /**
   * Reset to initial step
   */
  public reset(): void {
    const oldCurrent = this.current;
    this.current = this.initialStep;
    this._fireChangeEvent(oldCurrent, this.current);
  }

  /**
   * Add a step
   */
  public addStep(step: StepItem): void {
    this.items = [...this.items, step];
    this.requestUpdate();
  }

  /**
   * Remove a step by index
   */
  public removeStep(index: number): void {
    this.items = this.items.filter((_, i) => i !== index);
    if (this.current >= this.items.length) {
      this.current = Math.max(0, this.items.length - 1);
    }
    this.requestUpdate();
  }

  /**
   * Update a step by index
   */
  public updateStep(index: number, step: Partial<StepItem>): void {
    this.items = this.items.map((existingStep, i) =>
      i === index ? { ...existingStep, ...step } : existingStep
    );
    this.requestUpdate();
  }

  /**
   * Get current state
   */
  public get state() {
    const steps = this._getAllSteps();
    return {
      current: this.current,
      steps,
      direction: this.direction,
      clickable: this.clickable,
      errorIndex: this.errorIndex,
      percentage: steps.length > 0 ? ((this.current + 1) / steps.length) * 100 : 0,
    };
  }

  /**
   * Get completion percentage
   */
  public get percentage(): number {
    const steps = this._getAllSteps();
    return steps.length > 0 ? ((this.current + 1) / steps.length) * 100 : 0;
  }

  /**
   * Check if all steps are complete
   */
  public get isComplete(): boolean {
    const steps = this._getAllSteps();
    return this.current >= steps.length - 1;
  }

  /**
   * Focus the current step
   */
  public focus(): void {
    const currentStepElement = this.shadowRoot?.querySelector(`[data-index="${this.current}"] .skill-steps__step`) as HTMLElement;
    if (currentStepElement) {
      currentStepElement.focus();
    }
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-steps': SkillSteps;
  }
}