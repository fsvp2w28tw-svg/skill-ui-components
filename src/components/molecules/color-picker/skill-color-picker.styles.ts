import { css } from 'lit';

export const colorPickerStyles = css`
  :host {
    display: inline-block;
    position: relative;
  }

  .skill-color-picker {
    position: relative;
    display: inline-block;
  }

  /* Trigger Styles */
  .skill-color-picker__trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 40px;
    padding: 8px 12px;
    border: 1px solid var(--border-color, #e2e8f0);
    border-radius: 6px;
    background-color: var(--background-color, #ffffff);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }

  .skill-color-picker__trigger:hover {
    border-color: var(--border-color-hover, #cbd5e1);
  }

  .skill-color-picker__trigger:focus {
    outline: none;
    border-color: var(--border-color-focus, #3b82f6);
    box-shadow: 0 0 0 2px var(--focus-ring-color, rgba(59, 130, 246, 0.1));
  }

  .skill-color-picker__trigger.open {
    border-color: var(--border-color-focus, #3b82f6);
    box-shadow: 0 0 0 2px var(--focus-ring-color, rgba(59, 130, 246, 0.1));
  }

  /* Color Display */
  .skill-color-picker__color-display {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  .skill-color-picker__color-preview {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: 1px solid var(--preview-border, #e2e8f0);
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }

  .skill-color-picker__color-preview::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
    background-size: 8px 8px;
    background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
    z-index: 0;
  }

  .skill-color-picker__color-preview::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  .skill-color-picker__color-value {
    font-size: 14px;
    color: var(--text-color, #1e293b);
    font-family: var(--font-mono, 'SF Mono', 'Monaco', 'Inconsolata', monospace);
    font-weight: 500;
  }

  /* Clear Button */
  .skill-color-picker__clear-btn {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--clear-btn-color, #64748b);
    transition: all 0.2s ease;
  }

  .skill-color-picker__clear-btn:hover {
    background-color: var(--clear-btn-hover-bg, #f1f5f9);
    color: var(--clear-btn-hover-color, #ef4444);
  }

  .skill-color-picker__clear-btn svg {
    width: 14px;
    height: 14px;
  }

  /* Dropdown Icon */
  .skill-color-picker__dropdown-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: var(--dropdown-icon-color, #64748b);
    transition: transform 0.2s ease;
  }

  .skill-color-picker__trigger.open .skill-color-picker__dropdown-icon {
    transform: rotate(180deg);
  }

  .skill-color-picker__dropdown-icon svg {
    width: 100%;
    height: 100%;
  }

  /* Dropdown */
  .skill-color-picker__dropdown {
    position: absolute;
    z-index: 1000;
    background-color: var(--dropdown-bg, #ffffff);
    border: 1px solid var(--dropdown-border, #e2e8f0);
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    padding: 16px;
    min-width: 280px;
    margin-top: 4px;
  }

  .skill-color-picker__dropdown.top {
    bottom: 100%;
    margin-top: 0;
    margin-bottom: 4px;
  }

  /* Picker Section */
  .skill-color-picker__picker-section {
    margin-bottom: 16px;
  }

  /* Picker Area */
  .skill-color-picker__picker-area {
    width: 100%;
    height: 200px;
    border-radius: 6px;
    position: relative;
    cursor: crosshair;
    margin-bottom: 16px;
    background-image:
      linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%),
      linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  }

  .skill-color-picker__picker-pointer {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  /* Slider Container */
  .skill-color-picker__slider-container {
    margin-bottom: 12px;
  }

  /* Hue Slider */
  .skill-color-picker__hue-slider {
    width: 100%;
    height: 12px;
    border-radius: 6px;
    position: relative;
    cursor: pointer;
    background: linear-gradient(to right,
      #ff0000 0%,
      #ffff00 17%,
      #00ff00 33%,
      #00ffff 50%,
      #0000ff 67%,
      #ff00ff 83%,
      #ff0000 100%
    );
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  }

  /* Alpha Slider */
  .skill-color-picker__alpha-slider {
    width: 100%;
    height: 12px;
    border-radius: 6px;
    position: relative;
    cursor: pointer;
    background-image:
      linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
    background-size: 8px 8px;
    background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  }

  /* Slider Thumbs */
  .skill-color-picker__hue-thumb,
  .skill-color-picker__alpha-thumb {
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: #ffffff;
    border: 2px solid var(--thumb-border, #e2e8f0);
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transform: translateX(-50%);
    top: 50%;
    margin-top: -8px;
    pointer-events: none;
  }

  .skill-color-picker__alpha-thumb {
    background: linear-gradient(45deg, #ccc 25%, #fff 25%, #fff 50%, #ccc 50%, #ccc 75%, #fff 75%);
    background-size: 4px 4px;
  }

  /* Format Section */
  .skill-color-picker__format-section {
    margin-bottom: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--section-border, #e2e8f0);
  }

  .skill-color-picker__format-tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 12px;
  }

  .skill-color-picker__format-tab {
    flex: 1;
    padding: 6px 8px;
    border: 1px solid var(--tab-border, #e2e8f0);
    background-color: var(--tab-bg, #ffffff);
    color: var(--tab-color, #64748b);
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .skill-color-picker__format-tab:hover {
    background-color: var(--tab-hover-bg, #f8fafc);
    color: var(--tab-hover-color, #374151);
  }

  .skill-color-picker__format-tab.active {
    background-color: var(--tab-active-bg, #3b82f6);
    color: var(--tab-active-color, #ffffff);
    border-color: var(--tab-active-bg, #3b82f6);
  }

  .skill-color-picker__format-input-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .skill-color-picker__format-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--format-label-color, #64748b);
    min-width: 40px;
  }

  .skill-color-picker__format-input {
    flex: 1;
    padding: 6px 8px;
    border: 1px solid var(--input-border, #e2e8f0);
    border-radius: 4px;
    font-size: 12px;
    font-family: var(--font-mono, 'SF Mono', 'Monaco', 'Inconsolata', monospace);
    background-color: var(--input-bg, #ffffff);
    color: var(--input-color, #1e293b);
  }

  .skill-color-picker__format-input:focus {
    outline: none;
    border-color: var(--input-focus-border, #3b82f6);
    box-shadow: 0 0 0 2px var(--input-focus-ring, rgba(59, 130, 246, 0.1));
  }

  /* Presets Section */
  .skill-color-picker__presets-section {
    margin-bottom: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--section-border, #e2e8f0);
  }

  .skill-color-picker__presets-header {
    font-size: 12px;
    font-weight: 600;
    color: var(--presets-header-color, #374151);
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .skill-color-picker__presets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(32px, 1fr));
    gap: 8px;
  }

  .skill-color-picker__preset-color {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: 2px solid var(--preset-border, #e2e8f0);
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
    overflow: hidden;
  }

  .skill-color-picker__preset-color:hover {
    border-color: var(--preset-hover-border, #3b82f6);
    transform: scale(1.05);
  }

  .skill-color-picker__preset-color.active {
    border-color: var(--preset-active-border, #3b82f6);
    box-shadow: 0 0 0 2px var(--preset-active-ring, rgba(59, 130, 246, 0.2));
  }

  .skill-color-picker__preset-color::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
    background-size: 6px 6px;
    background-position: 0 0, 0 3px, 3px -3px, -3px 0px;
    z-index: 0;
  }

  .skill-color-picker__preset-color::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  .skill-color-picker__preset-name {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    color: var(--preset-name-color, #64748b);
    background-color: var(--preset-name-bg, #ffffff);
    padding: 2px 4px;
    border-radius: 2px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
    z-index: 10;
  }

  .skill-color-picker__preset-color:hover .skill-color-picker__preset-name {
    opacity: 1;
  }

  /* No Color Section */
  .skill-color-picker__no-color-section {
    padding-top: 16px;
    border-top: 1px solid var(--section-border, #e2e8f0);
  }

  .skill-color-picker__no-color-btn {
    width: 100%;
    padding: 8px;
    border: 1px dashed var(--no-color-border, #cbd5e1);
    background: none;
    border-radius: 6px;
    color: var(--no-color-color, #64748b);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .skill-color-picker__no-color-btn:hover {
    border-color: var(--no-color-hover-border, #3b82f6);
    color: var(--no-color-hover-color, #3b82f6);
    background-color: var(--no-color-hover-bg, #f8fafc);
  }

  /* Size Variants */
  :host([size='xs']) .skill-color-picker__trigger {
    min-height: 28px;
    padding: 4px 8px;
  }

  :host([size='xs']) .skill-color-picker__color-preview {
    width: 16px;
    height: 16px;
  }

  :host([size='xs']) .skill-color-picker__color-value {
    font-size: 12px;
  }

  :host([size='sm']) .skill-color-picker__trigger {
    min-height: 32px;
    padding: 6px 10px;
  }

  :host([size='sm']) .skill-color-picker__color-preview {
    width: 20px;
    height: 20px;
  }

  :host([size='sm']) .skill-color-picker__color-value {
    font-size: 13px;
  }

  :host([size='lg']) .skill-color-picker__trigger {
    min-height: 48px;
    padding: 10px 14px;
  }

  :host([size='lg']) .skill-color-picker__color-preview {
    width: 28px;
    height: 28px;
  }

  :host([size='lg']) .skill-color-picker__color-value {
    font-size: 15px;
  }

  :host([size='xl']) .skill-color-picker__trigger {
    min-height: 56px;
    padding: 12px 16px;
  }

  :host([size='xl']) .skill-color-picker__color-preview {
    width: 32px;
    height: 32px;
  }

  :host([size='xl']) .skill-color-picker__color-value {
    font-size: 16px;
  }

  /* Variant Styles */
  :host([variant='primary']) .skill-color-picker__trigger {
    border-color: var(--primary-border, #3b82f6);
  }

  :host([variant='primary']) .skill-color-picker__trigger:hover {
    border-color: var(--primary-border-hover, #2563eb);
  }

  :host([variant='primary']) .skill-color-picker__trigger:focus,
  :host([variant='primary']) .skill-color-picker__trigger.open {
    border-color: var(--primary-border-focus, #1d4ed8);
    box-shadow: 0 0 0 2px var(--primary-focus-ring, rgba(59, 130, 246, 0.1));
  }

  :host([variant='secondary']) .skill-color-picker__trigger {
    border-color: var(--secondary-border, #64748b);
  }

  :host([variant='secondary']) .skill-color-picker__trigger:hover {
    border-color: var(--secondary-border-hover, #475569);
  }

  :host([variant='secondary']) .skill-color-picker__trigger:focus,
  :host([variant='secondary']) .skill-color-picker__trigger.open {
    border-color: var(--secondary-border-focus, #334155);
    box-shadow: 0 0 0 2px var(--secondary-focus-ring, rgba(100, 116, 139, 0.1));
  }

  :host([variant='ghost']) .skill-color-picker__trigger {
    border-color: transparent;
    background-color: var(--ghost-bg, #f8fafc);
  }

  :host([variant='ghost']) .skill-color-picker__trigger:hover {
    border-color: var(--ghost-border-hover, #e2e8f0);
    background-color: var(--ghost-bg-hover, #f1f5f9);
  }

  :host([variant='outline']) .skill-color-picker__trigger {
    background-color: transparent;
  }

  /* States */
  :host([disabled]) .skill-color-picker__trigger {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  :host([read-only]) .skill-color-picker__trigger {
    cursor: default;
  }

  :host([read-only]) .skill-color-picker__dropdown-icon {
    display: none;
  }

  :host(.empty) .skill-color-picker__color-value {
    color: var(--empty-color, #94a3b8);
    font-style: italic;
  }

  /* Animations */
  @keyframes skill-color-picker-fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .skill-color-picker__dropdown {
    animation: skill-color-picker-fadeIn 0.2s ease-out;
  }

  /* Focus Visible */
  .skill-color-picker__trigger:focus-visible {
    outline: none;
    border-color: var(--border-color-focus, #3b82f6);
    box-shadow: 0 0 0 2px var(--focus-ring-color, rgba(59, 130, 246, 0.1));
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .skill-color-picker__dropdown {
      min-width: 260px;
      padding: 12px;
    }

    .skill-color-picker__picker-area {
      height: 180px;
    }

    .skill-color-picker__presets-grid {
      grid-template-columns: repeat(auto-fill, minmax(28px, 1fr));
    }

    .skill-color-picker__preset-color {
      width: 28px;
      height: 28px;
    }
  }

  /* High Contrast Mode */
  @media (prefers-contrast: high) {
    .skill-color-picker__trigger {
      border-width: 2px;
    }

    .skill-color-picker__picker-area {
      box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.3);
    }

    .skill-color-picker__hue-slider,
    .skill-color-picker__alpha-slider {
      box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.2);
    }
  }

  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    .skill-color-picker__trigger,
    .skill-color-picker__clear-btn,
    .skill-color-picker__dropdown-icon,
    .skill-color-picker__format-tab,
    .skill-color-picker__preset-color,
    .skill-color-picker__no-color-btn,
    .skill-color-picker__dropdown {
      transition: none;
      animation: none;
    }

    .skill-color-picker__trigger.open .skill-color-picker__dropdown-icon {
      transform: none;
    }

    .skill-color-picker__preset-color:hover {
      transform: none;
    }
  }

  /* Print Styles */
  @media print {
    .skill-color-picker__dropdown {
      display: none;
    }
  }
`;