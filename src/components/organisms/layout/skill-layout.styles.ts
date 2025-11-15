/**
 * Skill Layout Styles - 布局系统样式
 * 提供完整的页面布局解决方案，包括头部、侧边栏、内容区和底部
 */
import { css } from 'lit';

export const layoutStyles = css`
  :host {
    display: block;
    width: 100%;
    min-height: 100vh;
  }

  /* 主布局容器 */
  .skill-layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background-color: var(--skill-layout-bg, var(--skill-gray-50));
    color: var(--skill-layout-color, var(--skill-gray-900));
  }

  .skill-layout--has-sider {
    flex-direction: row;
  }

  .skill-layout--dark {
    background-color: var(--skill-layout-bg, var(--skill-gray-900));
    color: var(--skill-layout-color, var(--skill-gray-100));
  }

  /* 头部样式 */
  .skill-layout__header {
    position: relative;
    z-index: var(--skill-layout-header-z-index, 100);
    background-color: var(--skill-layout-header-bg, #fff);
    border-bottom: 1px solid var(--skill-layout-header-border, var(--skill-gray-200));
    box-shadow: var(--skill-layout-header-shadow, 0 2px 8px rgba(0, 0, 0, 0.06));
    transition: all var(--skill-duration-normal, 0.3s) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  .skill-layout--dark .skill-layout__header {
    background-color: var(--skill-layout-header-bg, var(--skill-gray-800));
    border-bottom-color: var(--skill-layout-header-border, var(--skill-gray-700));
  }

  .skill-layout__header--fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .skill-layout__header--sticky {
    position: sticky;
    top: 0;
  }

  /* 内容区域样式 */
  .skill-layout__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    background-color: var(--skill-layout-content-bg, transparent);
    padding: var(--skill-layout-content-padding, var(--skill-spacing-lg));
  }

  /* 底部样式 */
  .skill-layout__footer {
    background-color: var(--skill-layout-footer-bg, var(--skill-gray-100));
    border-top: 1px solid var(--skill-layout-footer-border, var(--skill-gray-200));
    padding: var(--skill-layout-footer-padding, var(--skill-spacing-lg) var(--skill-spacing-xl));
    text-align: center;
  }

  .skill-layout--dark .skill-layout__footer {
    background-color: var(--skill-layout-footer-bg, var(--skill-gray-800));
    border-top-color: var(--skill-layout-footer-border, var(--skill-gray-700));
  }

  .skill-layout__footer--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  /* 侧边栏样式 */
  .skill-layout__sider {
    position: relative;
    background-color: var(--skill-layout-sider-bg, #fff);
    border-right: 1px solid var(--skill-layout-sider-border, var(--skill-gray-200));
    transition: all var(--skill-duration-normal, 0.3s) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
    overflow: hidden;
  }

  .skill-layout--dark .skill-layout__sider {
    background-color: var(--skill-layout-sider-bg, var(--skill-gray-800));
    border-right-color: var(--skill-layout-sider-border, var(--skill-gray-700));
  }

  .skill-layout__sider--right {
    order: 1;
    border-right: none;
    border-left: 1px solid var(--skill-layout-sider-border, var(--skill-gray-200));
  }

  .skill-layout--dark .skill-layout__sider--right {
    border-left-color: var(--skill-layout-sider-border, var(--skill-gray-700));
  }

  .skill-layout__sider--collapsed {
    overflow: visible;
  }

  /* 侧边栏触发器 */
  .skill-layout__sider-trigger {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    background-color: var(--skill-layout-sider-trigger-bg, var(--skill-primary-500));
    border: 2px solid var(--skill-layout-sider-trigger-border, #fff);
    border-radius: 50%;
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--skill-duration-fast, 0.2s);
    z-index: 1;
  }

  .skill-layout__sider--right .skill-layout__sider-trigger {
    left: -12px;
  }

  .skill-layout__sider--left .skill-layout__sider-trigger {
    right: -12px;
  }

  .skill-layout__sider-trigger:hover {
    background-color: var(--skill-layout-sider-trigger-hover-bg, var(--skill-primary-600));
    transform: translateY(-50%) scale(1.1);
  }

  .skill-layout__sider-trigger svg {
    width: 12px;
    height: 12px;
    fill: currentColor;
  }

  /* 响应式处理 */
  @media (max-width: 575px) {
    .skill-layout__sider {
      position: fixed !important;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 999;
      transform: translateX(-100%);
    }

    .skill-layout__sider--right {
      left: auto;
      right: 0;
      transform: translateX(100%);
    }

    .skill-layout__sider--mobile-visible {
      transform: translateX(0);
    }

    .skill-layout__sider--zero-width {
      transform: translateX(-100%);
    }

    .skill-layout__sider--right.skill-layout__sider--zero-width {
      transform: translateX(100%);
    }
  }

  /* 布局间距调整 */
  .skill-layout__sider ~ .skill-layout__content {
    margin-left: 0;
  }

  .skill-layout__sider--right ~ .skill-layout__content {
    margin-left: 0;
    margin-right: 0;
  }

  /* 有固定头部时的内容间距 */
  .skill-layout__header--fixed ~ .skill-layout__content {
    margin-top: var(--skill-layout-header-height, 64px);
  }

  /* 有固定底部时的内容间距 */
  .skill-layout__footer--fixed ~ .skill-layout__content {
    margin-bottom: var(--skill-layout-footer-height, 64px);
  }

  /* 加载状态 */
  .skill-layout__sider-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: var(--skill-gray-500);
  }

  .skill-layout__sider-loading::after {
    content: '';
    width: 24px;
    height: 24px;
    border: 2px solid var(--skill-gray-300);
    border-top-color: var(--skill-primary-500);
    border-radius: 50%;
    animation: skill-layout-spin 1s linear infinite;
  }

  @keyframes skill-layout-spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* 可折叠侧边栏动画 */
  .skill-layout__sider-content {
    display: flex;
    height: 100%;
    transition: all var(--skill-duration-normal, 0.3s) var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
  }

  .skill-layout__sider--collapsed .skill-layout__sider-content {
    width: 0;
    overflow: hidden;
  }

  /* 遮罩层（移动端） */
  .skill-layout__sider-mask {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.45);
    z-index: 998;
    opacity: 0;
    transition: opacity var(--skill-duration-normal, 0.3s);
  }

  .skill-layout__sider-mask--visible {
    display: block;
    opacity: 1;
  }

  @media (max-width: 575px) {
    .skill-layout__sider-mask--visible {
      display: block;
    }
  }

  /* 主题相关样式 */
  .skill-layout--light {
    --skill-layout-bg: var(--skill-gray-50);
    --skill-layout-color: var(--skill-gray-900);
    --skill-layout-header-bg: #fff;
    --skill-layout-sider-bg: #fff;
    --skill-layout-content-bg: transparent;
    --skill-layout-footer-bg: var(--skill-gray-100);
  }

  .skill-layout--dark {
    --skill-layout-bg: var(--skill-gray-900);
    --skill-layout-color: var(--skill-gray-100);
    --skill-layout-header-bg: var(--skill-gray-800);
    --skill-layout-sider-bg: var(--skill-gray-800);
    --skill-layout-content-bg: transparent;
    --skill-layout-footer-bg: var(--skill-gray-800);
  }
`;