/**
 * Form Builder 类型定义
 */

export interface FormFieldOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  description?: string;
}

export interface FormFieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  custom?: (value: any) => string | null;
}

export interface FormFieldConfig {
  name: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' |
        'textarea' | 'select' | 'radio' | 'checkbox' | 'switch' |
        'date' | 'time' | 'datetime-local' | 'file' | 'color' |
        'range' | 'hidden';
  label: string;
  placeholder?: string;
  description?: string;
  defaultValue?: any;
  options?: FormFieldOption[];
  validation?: FormFieldValidation;
  required?: boolean;
  dependentOn?: {
    field: string;
    value: any;
    action: 'show' | 'hide' | 'enable' | 'disable';
  }[];
  layout?: {
    width?: 'full' | 'half' | 'third' | 'quarter';
    order?: number;
  };
  attributes?: Record<string, any>;
}

export interface FormSectionConfig {
  title?: string;
  description?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  fields: FormFieldConfig[];
}

export interface FormBuilderConfig {
  sections: FormSectionConfig[];
  layout?: {
    columns?: 1 | 2 | 3 | 4;
    spacing?: 'compact' | 'normal' | 'loose';
  };
  submitButton?: {
    text?: string;
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
    disabled?: boolean;
    loading?: boolean;
  };
  resetButton?: {
    text?: string;
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
    show?: boolean;
  };
}

export interface FormBuilderData {
  [key: string]: any;
}

export interface FormBuilderError {
  [key: string]: string | null;
}

export interface FormBuilderEvent {
  type: 'submit' | 'change' | 'reset' | 'field-change' | 'validation-error';
  field?: string;
  data: FormBuilderData;
  errors?: FormBuilderError;
}

export interface FormFieldTheme {
  colors?: {
    primary?: string;
    error?: string;
    success?: string;
    warning?: string;
  };
  spacing?: {
    small?: string;
    medium?: string;
    large?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string;
  };
}