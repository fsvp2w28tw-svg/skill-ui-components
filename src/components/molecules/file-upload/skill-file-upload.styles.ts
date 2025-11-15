import { css } from 'lit';

export const fileUploadStyles = css`
  :host {
    display: block;
    width: 100%;
  }

  .skill-file-upload {
    position: relative;
    width: 100%;
  }

  /* Drop Area */
  .skill-file-upload__drop-area {
    border: 2px dashed var(--border-color, #e2e8f0);
    border-radius: 8px;
    padding: 32px 16px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: var(--background-color, #f8fafc);
    position: relative;
    overflow: hidden;
  }

  .skill-file-upload__drop-area:hover {
    border-color: var(--border-color-hover, #cbd5e1);
    background-color: var(--background-color-hover, #f1f5f9);
  }

  .skill-file-upload__drop-area.dragging {
    border-color: var(--border-color-dragging, #3b82f6);
    background-color: var(--background-color-dragging, #eff6ff);
    transform: scale(1.01);
  }

  .skill-file-upload__drop-area:focus {
    outline: 2px solid var(--focus-ring-color, #3b82f6);
    outline-offset: 2px;
  }

  /* Drop Content */
  .skill-file-upload__drop-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .skill-file-upload__drop-icon {
    width: 48px;
    height: 48px;
    color: var(--icon-color, #64748b);
    transition: color 0.2s ease;
  }

  .skill-file-upload__drop-area:hover .skill-file-upload__drop-icon,
  .skill-file-upload__drop-area.dragging .skill-file-upload__drop-icon {
    color: var(--icon-color-hover, #3b82f6);
  }

  .skill-file-upload__drop-text {
    font-size: 16px;
    font-weight: 500;
    color: var(--text-color, #1e293b);
    line-height: 1.5;
  }

  .skill-file-upload__drop-hint {
    font-size: 14px;
    color: var(--hint-color, #64748b);
    margin-top: -4px;
  }

  /* Hidden Input */
  .skill-file-upload__input {
    display: none;
  }

  /* File List */
  .skill-file-upload__file-list {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .skill-file-upload__file-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border: 1px solid var(--file-item-border, #e2e8f0);
    border-radius: 8px;
    background-color: var(--file-item-bg, #ffffff);
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }

  .skill-file-upload__file-item:hover {
    border-color: var(--file-item-border-hover, #cbd5e1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .skill-file-upload__file-item.uploading {
    border-color: var(--upload-border-color, #3b82f6);
    background-color: var(--upload-bg-color, #eff6ff);
  }

  .skill-file-upload__file-item.error {
    border-color: var(--error-color, #ef4444);
    background-color: var(--error-bg-color, #fef2f2);
  }

  .skill-file-upload__file-item.success {
    border-color: var(--success-color, #10b981);
    background-color: var(--success-bg-color, #ecfdf5);
  }

  /* File Preview */
  .skill-file-upload__file-preview {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--preview-bg, #f8fafc);
  }

  .skill-file-upload__file-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* File Info */
  .skill-file-upload__file-info {
    flex: 1;
    min-width: 0;
  }

  .skill-file-upload__file-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--file-name-color, #1e293b);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 2px;
  }

  .skill-file-upload__file-size {
    font-size: 12px;
    color: var(--file-size-color, #64748b);
  }

  /* Progress Bar */
  .skill-file-upload__progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background-color: var(--progress-bg, #e2e8f0);
    overflow: hidden;
  }

  .skill-file-upload__progress-bar-fill {
    height: 100%;
    background-color: var(--progress-color, #3b82f6);
    transition: width 0.3s ease;
    border-radius: 0 3px 3px 0;
  }

  /* Error Message */
  .skill-file-upload__error-message {
    flex: 1;
    font-size: 12px;
    color: var(--error-color, #ef4444);
    font-weight: 500;
  }

  /* Success Icon */
  .skill-file-upload__success-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: var(--success-color, #10b981);
  }

  /* Remove Button */
  .skill-file-upload__remove-btn {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--remove-btn-color, #64748b);
    transition: all 0.2s ease;
  }

  .skill-file-upload__remove-btn:hover {
    background-color: var(--remove-btn-hover-bg, #f1f5f9);
    color: var(--remove-btn-hover-color, #ef4444);
  }

  .skill-file-upload__remove-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Upload Button */
  .skill-file-upload__actions {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }

  .skill-file-upload__upload-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: var(--upload-btn-bg, #3b82f6);
    color: var(--upload-btn-color, #ffffff);
  }

  .skill-file-upload__upload-btn:hover:not(:disabled) {
    background-color: var(--upload-btn-hover-bg, #2563eb);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .skill-file-upload__upload-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  /* Size Variants */
  :host([size='xs']) .skill-file-upload__drop-area {
    padding: 16px 12px;
  }

  :host([size='xs']) .skill-file-upload__drop-icon {
    width: 32px;
    height: 32px;
  }

  :host([size='xs']) .skill-file-upload__drop-text {
    font-size: 14px;
  }

  :host([size='xs']) .skill-file-upload__file-preview {
    width: 32px;
    height: 32px;
  }

  :host([size='sm']) .skill-file-upload__drop-area {
    padding: 24px 16px;
  }

  :host([size='sm']) .skill-file-upload__drop-icon {
    width: 40px;
    height: 40px;
  }

  :host([size='lg']) .skill-file-upload__drop-area {
    padding: 40px 20px;
  }

  :host([size='lg']) .skill-file-upload__drop-icon {
    width: 56px;
    height: 56px;
  }

  :host([size='xl']) .skill-file-upload__drop-area {
    padding: 48px 24px;
  }

  :host([size='xl']) .skill-file-upload__drop-icon {
    width: 64px;
    height: 64px;
  }

  :host([size='xl']) .skill-file-upload__drop-text {
    font-size: 18px;
  }

  /* Variant Styles */
  :host([variant='primary']) .skill-file-upload__drop-area {
    border-color: var(--primary-border, #3b82f6);
  }

  :host([variant='primary']) .skill-file-upload__drop-area:hover {
    border-color: var(--primary-border-hover, #2563eb);
  }

  :host([variant='primary']) .skill-file-upload__drop-area.dragging {
    border-color: var(--primary-border-active, #1d4ed8);
    background-color: var(--primary-bg-active, #dbeafe);
  }

  :host([variant='secondary']) .skill-file-upload__drop-area {
    border-color: var(--secondary-border, #64748b);
  }

  :host([variant='secondary']) .skill-file-upload__drop-area:hover {
    border-color: var(--secondary-border-hover, #475569);
  }

  :host([variant='secondary']) .skill-file-upload__drop-area.dragging {
    border-color: var(--secondary-border-active, #334155);
    background-color: var(--secondary-bg-active, #f1f5f9);
  }

  :host([variant='ghost']) .skill-file-upload__drop-area {
    border-color: transparent;
    background-color: var(--ghost-bg, #f8fafc);
  }

  :host([variant='ghost']) .skill-file-upload__drop-area:hover {
    border-color: var(--ghost-border-hover, #e2e8f0);
    background-color: var(--ghost-bg-hover, #f1f5f9);
  }

  :host([variant='outline']) .skill-file-upload__drop-area {
    background-color: transparent;
  }

  /* Compact Mode */
  :host([compact]) .skill-file-upload__drop-area {
    padding: 16px 12px;
  }

  :host([compact]) .skill-file-upload__drop-content {
    flex-direction: row;
    justify-content: center;
    gap: 8px;
  }

  :host([compact]) .skill-file-upload__drop-icon {
    width: 24px;
    height: 24px;
  }

  :host([compact]) .skill-file-upload__drop-text {
    font-size: 14px;
  }

  :host([compact]) .skill-file-upload__file-list {
    margin-top: 12px;
    gap: 8px;
  }

  :host([compact]) .skill-file-upload__file-item {
    padding: 8px;
    gap: 8px;
  }

  :host([compact]) .skill-file-upload__file-preview {
    width: 32px;
    height: 32px;
  }

  /* Disabled State */
  :host([disabled]) .skill-file-upload__drop-area {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  :host([disabled]) .skill-file-upload__remove-btn {
    pointer-events: none;
  }

  /* Focus Visible */
  .skill-file-upload__drop-area:focus-visible {
    outline: 2px solid var(--focus-ring-color, #3b82f6);
    outline-offset: 2px;
  }

  /* Animations */
  @keyframes skill-file-upload-fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .skill-file-upload__file-item {
    animation: skill-file-upload-fadeIn 0.3s ease-out;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .skill-file-upload__drop-area {
      padding: 24px 16px;
    }

    .skill-file-upload__drop-icon {
      width: 40px;
      height: 40px;
    }

    .skill-file-upload__drop-text {
      font-size: 15px;
    }

    .skill-file-upload__file-item {
      padding: 10px;
      gap: 10px;
    }

    .skill-file-upload__file-preview {
      width: 36px;
      height: 36px;
    }

    .skill-file-upload__actions {
      justify-content: stretch;
    }

    .skill-file-upload__upload-btn {
      width: 100%;
      padding: 10px 16px;
    }
  }

  /* High Contrast Mode */
  @media (prefers-contrast: high) {
    .skill-file-upload__drop-area {
      border-width: 3px;
    }

    .skill-file-upload__file-item {
      border-width: 2px;
    }

    .skill-file-upload__progress-bar {
      height: 4px;
    }
  }

  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    .skill-file-upload__drop-area,
    .skill-file-upload__drop-area:hover,
    .skill-file-upload__drop-area.dragging,
    .skill-file-upload__file-item:hover,
    .skill-file-upload__remove-btn:hover,
    .skill-file-upload__upload-btn:hover,
    .skill-file-upload__progress-bar-fill,
    .skill-file-upload__file-item {
      transition: none;
      animation: none;
    }

    .skill-file-upload__drop-area.dragging {
      transform: none;
    }

    .skill-file-upload__upload-btn:hover:not(:disabled) {
      transform: none;
    }
  }
`;