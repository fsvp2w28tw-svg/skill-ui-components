import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { fileUploadStyles } from './skill-file-upload.styles';
import { baseStyles } from '../../../styles/base';
import type { Size, Variant } from '../../../types';

/**
 * File information interface
 */
export interface FileInfo {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  file: File;
  preview?: string;
  progress?: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

/**
 * Upload configuration interface
 */
export interface UploadConfig {
  url?: string;
  method?: 'POST' | 'PUT' | 'PATCH';
  headers?: Record<string, string>;
  fieldName?: string;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  autoUpload?: boolean;
  withCredentials?: boolean;
}

/**
 * Skill File Upload Component
 *
 * @slot drop-area - Content for the drop area (default: "Drag & drop files here or click to browse")
 * @slot file-preview - Custom file preview template
 * @slot upload-button - Custom upload button content
 * @slot error-message - Custom error message display
 *
 * @csspart container - Main container
 * @csspart drop-area - Drop area element
 * @csspart drop-area-dragging - Drop area when dragging over
 * @csspart file-list - File list container
 * @csspart file-item - Individual file item
 * @csspart file-preview - File preview element
 * @csspart file-info - File information container
 * @csspart file-name - File name display
 * @csspart file-size - File size display
 * @csspart progress-bar - Upload progress bar
 * @csspart progress-bar-fill - Progress bar fill
 * @csspart remove-button - File remove button
 * @csspart upload-button - Upload button
 * @csspart error-message - Error message display
 *
 * @cssprop --border-color - Border color
 * @cssprop --border-color-dragging - Border color when dragging
 * @cssprop --background-color - Background color
 * @cssprop --background-color-dragging - Background color when dragging
 * @cssprop --text-color - Text color
 * @cssprop --error-color - Error color
 * @cssprop --success-color - Success color
 * @cssprop --progress-color - Progress bar color
 *
 * @fires file-add - Fired when files are added
 * @fires file-remove - Fired when a file is removed
 * @fires file-upload-start - Fired when file upload starts
 * @fires file-progress - Fired during file upload progress
 * @fires file-success - Fired when file upload succeeds
 * @fires file-error - Fired when file upload fails
 * @fires upload-complete - Fired when all uploads are complete
 *
 * @example
 * ```html
 * <skill-file-upload
 *   accept="image/*,.pdf"
 *   max-size="10485760"
 *   max-files="5"
 *   auto-upload
 *   upload-url="/api/upload"
 * >
 * </skill-file-upload>
 * ```
 */
@customElement('skill-file-upload')
export class SkillFileUpload extends LitElement {
  static styles = [baseStyles, fileUploadStyles];

  /**
   * Visual variant
   * @type {'primary' | 'secondary' | 'ghost' | 'outline'}
   */
  @property({ type: String, reflect: true })
  variant: Variant = 'primary';

  /**
   * Component size
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   */
  @property({ type: String, reflect: true })
  size: Size = 'md';

  /**
   * Accepted file types (comma-separated)
   */
  @property({ type: String, reflect: true })
  accept?: string;

  /**
   * Maximum file size in bytes
   */
  @property({ type: Number, reflect: true, attribute: 'max-size' })
  maxSize?: number;

  /**
   * Maximum number of files
   */
  @property({ type: Number, reflect: true, attribute: 'max-files' })
  maxFiles?: number;

  /**
   * Allow multiple file selection
   */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /**
   * Auto upload files when added
   */
  @property({ type: Boolean, reflect: true, attribute: 'auto-upload' })
  autoUpload = false;

  /**
   * Upload URL
   */
  @property({ type: String, reflect: true, attribute: 'upload-url' })
  uploadUrl?: string;

  /**
   * Upload method
   */
  @property({ type: String, reflect: true })
  uploadMethod: 'POST' | 'PUT' | 'PATCH' = 'POST';

  /**
   * Custom upload headers
   */
  @property({ type: Object, reflect: false })
  uploadHeaders?: Record<string, string>;

  /**
   * Field name for file upload
   */
  @property({ type: String, reflect: true, attribute: 'field-name' })
  fieldName = 'file';

  /**
   * Show file preview
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-preview' })
  showPreview = true;

  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Compact mode
   */
  @property({ type: Boolean, reflect: true })
  compact = false;

  /**
   * Custom drop text
   */
  @property({ type: String, reflect: true, attribute: 'drop-text' })
  dropText = 'Drag & drop files here or click to browse';

  /**
   * Internal files state
   */
  @state()
  private files: FileInfo[] = [];

  /**
   * Drag over state
   */
  @state()
  private isDragging = false;

  /**
   * Upload state
   */
  @state()
  private isUploading = false;

  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);

    // Auto upload when files are added and autoUpload is enabled
    if (changedProperties.has('files') && this.autoUpload) {
      this._uploadFiles();
    }
  }

  render() {
    return html`
      <div
        part="container"
        class="skill-file-upload ${this._getContainerClasses()}"
        @dragover=${this._handleDragOver}
        @dragleave=${this._handleDragLeave}
        @drop=${this._handleDrop}
      >
        <!-- Drop Area -->
        <div
          part="drop-area"
          class="skill-file-upload__drop-area ${this.isDragging ? 'dragging' : ''}"
          @click=${this._handleDropAreaClick}
        >
          <slot name="drop-area">
            <div class="skill-file-upload__drop-content">
              <div class="skill-file-upload__drop-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17,8 12,3 7,8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <div class="skill-file-upload__drop-text">
                ${this.dropText}
              </div>
              ${this.accept ? html`
                <div class="skill-file-upload__drop-hint">
                  Accepted: ${this.accept}
                </div>
              ` : ''}
              ${this.maxSize ? html`
                <div class="skill-file-upload__drop-hint">
                  Max size: ${this._formatFileSize(this.maxSize)}
                </div>
              ` : ''}
            </div>
          </slot>
        </div>

        <!-- Hidden File Input -->
        <input
          type="file"
          class="skill-file-upload__input"
          ?multiple=${this.multiple}
          ?disabled=${this.disabled}
          accept=${this.accept || '*'}
          @change=${this._handleFileSelect}
        />

        <!-- File List -->
        ${this.files.length > 0 ? html`
          <div part="file-list" class="skill-file-upload__file-list">
            ${this.files.map(file => this._renderFileItem(file))}
          </div>
        ` : ''}

        <!-- Upload Button (if not auto-upload) -->
        ${!this.autoUpload && this.files.length > 0 ? html`
          <div class="skill-file-upload__actions">
            <slot name="upload-button">
              <button
                part="upload-button"
                class="skill-file-upload__upload-btn"
                ?disabled=${this.disabled || this.isUploading}
                @click=${this._uploadFiles}
              >
                ${this.isUploading ? 'Uploading...' : `Upload ${this.files.length} File${this.files.length > 1 ? 's' : ''}`}
              </button>
            </slot>
          </div>
        ` : ''}
      </div>
    `;
  }

  private _renderFileItem(file: FileInfo) {
    return html`
      <div
        part="file-item"
        class="skill-file-upload__file-item ${file.status}"
        data-file-id="${file.id}"
      >
        ${this.showPreview && file.preview ? html`
          <div part="file-preview" class="skill-file-upload__file-preview">
            <img src="${file.preview}" alt="${file.name}" />
          </div>
        ` : ''}

        <div part="file-info" class="skill-file-upload__file-info">
          <div part="file-name" class="skill-file-upload__file-name" title="${file.name}">
            ${file.name}
          </div>
          <div part="file-size" class="skill-file-upload__file-size">
            ${this._formatFileSize(file.size)}
          </div>
        </div>

        ${file.status === 'uploading' ? html`
          <div part="progress-bar" class="skill-file-upload__progress-bar">
            <div
              part="progress-bar-fill"
              class="skill-file-upload__progress-bar-fill"
              style="width: ${file.progress || 0}%"
            ></div>
          </div>
        ` : ''}

        ${file.status === 'error' ? html`
          <slot name="error-message">
            <div part="error-message" class="skill-file-upload__error-message">
              ${file.error}
            </div>
          </slot>
        ` : ''}

        ${file.status === 'success' ? html`
          <div class="skill-file-upload__success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
          </div>
        ` : ''}

        <button
          part="remove-button"
          class="skill-file-upload__remove-btn"
          @click=${() => this._removeFile(file.id)}
          ?disabled=${this.isUploading}
          title="Remove file"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    `;
  }

  private _getContainerClasses() {
    return [
      this.variant,
      this.size,
      this.isDragging ? 'dragging' : '',
      this.isUploading ? 'uploading' : '',
      this.disabled ? 'disabled' : '',
      this.compact ? 'compact' : '',
      this.files.length > 0 ? 'has-files' : ''
    ].filter(Boolean).join(' ');
  }

  private _handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.disabled) {
      this.isDragging = true;
    }
  }

  private _handleDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragging = false;
  }

  private _handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragging = false;

    if (this.disabled) return;

    const droppedFiles = e.dataTransfer?.files;
    if (droppedFiles && droppedFiles.length > 0) {
      this._addFiles(Array.from(droppedFiles));
    }
  }

  private _handleDropAreaClick() {
    if (this.disabled) return;

    const input = this.shadowRoot?.querySelector('.skill-file-upload__input') as HTMLInputElement;
    if (input) {
      input.click();
    }
  }

  private _handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    const selectedFiles = input.files;
    if (selectedFiles && selectedFiles.length > 0) {
      this._addFiles(Array.from(selectedFiles));
    }
    // Reset input value to allow selecting the same file again
    input.value = '';
  }

  private async _addFiles(fileList: File[]) {
    const filesToAdd = fileList.filter(file => {
      // Check file size
      if (this.maxSize && file.size > this.maxSize) {
        this._dispatchError(file, `File size exceeds limit of ${this._formatFileSize(this.maxSize)}`);
        return false;
      }

      // Check file count
      if (this.maxFiles && this.files.length >= this.maxFiles) {
        this._dispatchError(file, `Maximum number of files (${this.maxFiles}) exceeded`);
        return false;
      }

      // Check file type
      if (this.accept) {
        const acceptedTypes = this.accept.split(',').map(type => type.trim());
        const isAccepted = acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          return file.type.match(type.replace('*', '.*'));
        });

        if (!isAccepted) {
          this._dispatchError(file, `File type not accepted`);
          return false;
        }
      }

      return true;
    });

    // If not multiple, replace existing files
    if (!this.multiple) {
      this.files = [];
    }

    // Process new files
    const newFiles: FileInfo[] = await Promise.all(
      filesToAdd.map(file => this._createFileInfo(file))
    );

    this.files = [...this.files, ...newFiles];

    // Dispatch events
    newFiles.forEach(fileInfo => {
      this.dispatchEvent(new CustomEvent('file-add', {
        bubbles: true,
        composed: true,
        detail: { file: fileInfo }
      }));
    });
  }

  private async _createFileInfo(file: File): Promise<FileInfo> {
    const fileInfo: FileInfo = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      file,
      status: 'pending'
    };

    // Generate preview for images
    if (this.showPreview && file.type.startsWith('image/')) {
      try {
        fileInfo.preview = await this._generateImagePreview(file);
      } catch (error) {
        // Preview generation failed, continue without it
      }
    }

    return fileInfo;
  }

  private _generateImagePreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error('Failed to generate preview'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private _removeFile(fileId: string) {
    const fileIndex = this.files.findIndex(f => f.id === fileId);
    if (fileIndex !== -1) {
      const removedFile = this.files[fileIndex];
      this.files = this.files.filter(f => f.id !== fileId);

      this.dispatchEvent(new CustomEvent('file-remove', {
        bubbles: true,
        composed: true,
        detail: { file: removedFile }
      }));
    }
  }

  private async _uploadFiles() {
    if (!this.uploadUrl || this.files.length === 0 || this.isUploading) {
      return;
    }

    this.isUploading = true;

    const uploadPromises = this.files
      .filter(file => file.status !== 'success')
      .map(file => this._uploadSingleFile(file));

    try {
      await Promise.allSettled(uploadPromises);

      this.dispatchEvent(new CustomEvent('upload-complete', {
        bubbles: true,
        composed: true,
        detail: { files: this.files }
      }));
    } finally {
      this.isUploading = false;
    }
  }

  private async _uploadSingleFile(fileInfo: FileInfo): Promise<void> {
    if (!this.uploadUrl) return;

    try {
      fileInfo.status = 'uploading';
      fileInfo.progress = 0;

      this.dispatchEvent(new CustomEvent('file-upload-start', {
        bubbles: true,
        composed: true,
        detail: { file: fileInfo }
      }));

      const formData = new FormData();
      formData.append(this.fieldName, fileInfo.file);

      const xhr = new XMLHttpRequest();

      // Track progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          fileInfo.progress = Math.round((e.loaded / e.total) * 100);

          this.dispatchEvent(new CustomEvent('file-progress', {
            bubbles: true,
            composed: true,
            detail: { file: fileInfo, progress: fileInfo.progress }
          }));
        }
      });

      return new Promise((resolve, _reject) => {
        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            fileInfo.status = 'success';
            fileInfo.progress = 100;

            this.dispatchEvent(new CustomEvent('file-success', {
              bubbles: true,
              composed: true,
              detail: { file: fileInfo, response: xhr.response }
            }));

            resolve();
          } else {
            throw new Error(`Upload failed with status ${xhr.status}`);
          }
        });

        xhr.addEventListener('error', () => {
          throw new Error('Network error during upload');
        });

        xhr.open(this.uploadMethod, this.uploadUrl || '', true);

        // Set headers
        if (this.uploadHeaders) {
          Object.entries(this.uploadHeaders).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
          });
        }

        xhr.send(formData);
      });
    } catch (error) {
      fileInfo.status = 'error';
      fileInfo.error = error instanceof Error ? error.message : 'Upload failed';

      this.dispatchEvent(new CustomEvent('file-error', {
        bubbles: true,
        composed: true,
        detail: { file: fileInfo, error: fileInfo.error }
      }));
    }
  }

  private _dispatchError(file: File, message: string) {
    const errorInfo: FileInfo = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      file,
      status: 'error',
      error: message
    };

    this.dispatchEvent(new CustomEvent('file-error', {
      bubbles: true,
      composed: true,
      detail: { file: errorInfo, error: message }
    }));
  }

  private _formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Get all files
   */
  public getFiles(): FileInfo[] {
    return [...this.files];
  }

  /**
   * Get files by status
   */
  public getFilesByStatus(status: FileInfo['status']): FileInfo[] {
    return this.files.filter(file => file.status === status);
  }

  /**
   * Clear all files
   */
  public clearFiles() {
    this.files = [];
  }

  /**
   * Get total upload progress
   */
  public getUploadProgress(): number {
    if (this.files.length === 0) return 0;

    const totalProgress = this.files.reduce((sum, file) => sum + (file.progress || 0), 0);
    return Math.round(totalProgress / this.files.length);
  }

  /**
   * Trigger file selection
   */
  public selectFiles() {
    this._handleDropAreaClick();
  }
}

// TypeScript support for using this element in HTML
declare global {
  interface HTMLElementTagNameMap {
    'skill-file-upload': SkillFileUpload;
  }
}