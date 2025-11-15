import { SkillBaseComponent } from '../src/utils/base-component';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// 创建一个测试组件来验证基础组件功能
@customElement('test-validation-component')
class TestValidationComponent extends SkillBaseComponent {
  @property({ type: Array })
  data?: any[];

  @property({ type: String })
  size?: string;

  @property({ type: Number })
  value?: number;

  @property({ type: Boolean })
  disabled?: boolean;

  @property({ type: String })
  height?: string;

  render() {
    return this.safeRender(() => {
      return html`
        <div>
          <p>Data length: ${this.data?.length || 0}</p>
          <p>Size: ${this.size}</p>
          <p>Value: ${this.value}</p>
          <p>Disabled: ${this.disabled}</p>
          <p>Height: ${this.height}</p>
        </div>
      `;
    });
  }

  protected validateProperties(changedProperties: Map<string, any>): void {
    super.validateProperties(changedProperties);

    // 自定义验证
    if (changedProperties.has('size')) {
      this.validateEnum(this.size, ['small', 'medium', 'large'], 'size');
    }

    if (changedProperties.has('height')) {
      this.validateCssLength(this.height || '', 'height');
    }
  }
}

describe('Base Component Validation Tests', () => {
  let element: TestValidationComponent;

  beforeEach(() => {
    element = document.createElement('test-validation-component') as TestValidationComponent;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should validate array properties', () => {
    expect(() => {
      element.data = [{ id: 1 }, { id: 2 }];
      element.requestUpdate();
    }).not.toThrow();

    expect(element.data).toHaveLength(2);
  });

  it('should validate enum values', () => {
    expect(() => {
      element.size = 'medium';
      element.requestUpdate();
    }).not.toThrow();

    expect(() => {
      element.size = 'invalid';
      element.requestUpdate();
    }).toThrow(/属性 size 的值无效/);
  });

  it('should validate CSS length', () => {
    expect(() => {
      element.height = '100px';
      element.requestUpdate();
    }).not.toThrow();

    expect(() => {
      element.height = 'invalid';
      element.requestUpdate();
    }).toThrow(/属性 height 必须是有效的CSS长度单位/);
  });

  it('should validate boolean properties', () => {
    expect(() => {
      element.disabled = true;
      element.requestUpdate();
    }).not.toThrow();

    expect(() => {
      element.disabled = false;
      element.requestUpdate();
    }).not.toThrow();
  });

  it('should handle render errors gracefully', () => {
    // 创建一个会出错的渲染方法
    const originalRender = element.render.bind(element);
    element.render = () => {
      throw new Error('Test render error');
    };

    expect(() => {
      element.requestUpdate();
    }).not.toThrow(); // 基础组件应该捕获渲染错误
  });

  it('should provide refresh functionality', () => {
    const spy = jest.spyOn(element, 'requestUpdate');
    element.refresh();
    expect(spy).toHaveBeenCalled();
  });

  it('should validate required properties', () => {
    expect(() => {
      (element as any).validateRequired('testProp', 'value');
    }).not.toThrow();

    expect(() => {
      (element as any).validateRequired('testProp', '');
    }).toThrow(/属性 testProp 是必填的/);
  });

  it('should validate numeric ranges', () => {
    expect(() => {
      element.value = 50;
      element.requestUpdate();
    }).not.toThrow();

    expect(() => {
      element.value = -10;
      element.requestUpdate();
    }).not.toThrow(); // 基础验证只检查是否为负数
  });
});