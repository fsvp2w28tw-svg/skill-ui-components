/**
 * Skill Grid Styles - 栅格系统样式
 * 基于 24 列栅格系统，支持响应式布局
 */
import { css } from 'lit';

export const gridStyles = css`
  :host {
    display: block;
    width: 100%;
  }

  .skill-grid {
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    width: 100%;
    gap: var(--skill-grid-gutter, var(--skill-spacing-md));
  }

  /* 基础对齐方式 */
  .skill-grid--align-start {
    align-items: flex-start;
  }

  .skill-grid--align-center {
    align-items: center;
  }

  .skill-grid--align-end {
    align-items: flex-end;
  }

  .skill-grid--align-stretch {
    align-items: stretch;
  }

  /* 基础分布方式 */
  .skill-grid--justify-start {
    justify-content: flex-start;
  }

  .skill-grid--justify-center {
    justify-content: center;
  }

  .skill-grid--justify-end {
    justify-content: flex-end;
  }

  .skill-grid--justify-between {
    justify-content: space-between;
  }

  .skill-grid--justify-around {
    justify-content: space-around;
  }

  .skill-grid--justify-evenly {
    justify-content: space-evenly;
  }

  /* 方向 */
  .skill-grid--row {
    grid-auto-flow: row;
  }

  .skill-grid--row-reverse {
    grid-auto-flow: row;
    direction: rtl;
  }

  .skill-grid--column {
    grid-auto-flow: column;
  }

  .skill-grid--column-reverse {
    grid-auto-flow: column;
    direction: rtl;
  }

  /* 换行 */
  .skill-grid--nowrap {
    flex-wrap: nowrap;
  }

  .skill-grid--wrap {
    flex-wrap: wrap;
  }

  .skill-grid--wrap-reverse {
    flex-wrap: wrap-reverse;
  }

  /* 栅格列样式 */
  .skill-grid__col {
    position: relative;
    width: 100%;
  }

  /* 列跨度 - 基础 */
  .skill-grid__col--span-1 { grid-column: span 1; }
  .skill-grid__col--span-2 { grid-column: span 2; }
  .skill-grid__col--span-3 { grid-column: span 3; }
  .skill-grid__col--span-4 { grid-column: span 4; }
  .skill-grid__col--span-5 { grid-column: span 5; }
  .skill-grid__col--span-6 { grid-column: span 6; }
  .skill-grid__col--span-7 { grid-column: span 7; }
  .skill-grid__col--span-8 { grid-column: span 8; }
  .skill-grid__col--span-9 { grid-column: span 9; }
  .skill-grid__col--span-10 { grid-column: span 10; }
  .skill-grid__col--span-11 { grid-column: span 11; }
  .skill-grid__col--span-12 { grid-column: span 12; }
  .skill-grid__col--span-13 { grid-column: span 13; }
  .skill-grid__col--span-14 { grid-column: span 14; }
  .skill-grid__col--span-15 { grid-column: span 15; }
  .skill-grid__col--span-16 { grid-column: span 16; }
  .skill-grid__col--span-17 { grid-column: span 17; }
  .skill-grid__col--span-18 { grid-column: span 18; }
  .skill-grid__col--span-19 { grid-column: span 19; }
  .skill-grid__col--span-20 { grid-column: span 20; }
  .skill-grid__col--span-21 { grid-column: span 21; }
  .skill-grid__col--span-22 { grid-column: span 22; }
  .skill-grid__col--span-23 { grid-column: span 23; }
  .skill-grid__col--span-24 { grid-column: span 24; }

  /* 自动宽度 */
  .skill-grid__col--auto {
    grid-column: auto;
    width: auto;
  }

  /* 偏移量 */
  .skill-grid__col--offset-0 { margin-left: 0; }
  .skill-grid__col--offset-1 { margin-left: calc(1 * (100% / 24)); }
  .skill-grid__col--offset-2 { margin-left: calc(2 * (100% / 24)); }
  .skill-grid__col--offset-3 { margin-left: calc(3 * (100% / 24)); }
  .skill-grid__col--offset-4 { margin-left: calc(4 * (100% / 24)); }
  .skill-grid__col--offset-5 { margin-left: calc(5 * (100% / 24)); }
  .skill-grid__col--offset-6 { margin-left: calc(6 * (100% / 24)); }
  .skill-grid__col--offset-7 { margin-left: calc(7 * (100% / 24)); }
  .skill-grid__col--offset-8 { margin-left: calc(8 * (100% / 24)); }
  .skill-grid__col--offset-9 { margin-left: calc(9 * (100% / 24)); }
  .skill-grid__col--offset-10 { margin-left: calc(10 * (100% / 24)); }
  .skill-grid__col--offset-11 { margin-left: calc(11 * (100% / 24)); }
  .skill-grid__col--offset-12 { margin-left: calc(12 * (100% / 24)); }
  .skill-grid__col--offset-13 { margin-left: calc(13 * (100% / 24)); }
  .skill-grid__col--offset-14 { margin-left: calc(14 * (100% / 24)); }
  .skill-grid__col--offset-15 { margin-left: calc(15 * (100% / 24)); }
  .skill-grid__col--offset-16 { margin-left: calc(16 * (100% / 24)); }
  .skill-grid__col--offset-17 { margin-left: calc(17 * (100% / 24)); }
  .skill-grid__col--offset-18 { margin-left: calc(18 * (100% / 24)); }
  .skill-grid__col--offset-19 { margin-left: calc(19 * (100% / 24)); }
  .skill-grid__col--offset-20 { margin-left: calc(20 * (100% / 24)); }
  .skill-grid__col--offset-21 { margin-left: calc(21 * (100% / 24)); }
  .skill-grid__col--offset-22 { margin-left: calc(22 * (100% / 24)); }
  .skill-grid__col--offset-23 { margin-left: calc(23 * (100% / 24)); }

  /* 推拉 */
  .skill-grid__col--push-1 { left: calc(1 * (100% / 24)); }
  .skill-grid__col--push-2 { left: calc(2 * (100% / 24)); }
  .skill-grid__col--push-3 { left: calc(3 * (100% / 24)); }
  .skill-grid__col--push-4 { left: calc(4 * (100% / 24)); }
  .skill-grid__col--push-5 { left: calc(5 * (100% / 24)); }
  .skill-grid__col--push-6 { left: calc(6 * (100% / 24)); }
  .skill-grid__col--push-7 { left: calc(7 * (100% / 24)); }
  .skill-grid__col--push-8 { left: calc(8 * (100% / 24)); }
  .skill-grid__col--push-9 { left: calc(9 * (100% / 24)); }
  .skill-grid__col--push-10 { left: calc(10 * (100% / 24)); }
  .skill-grid__col--push-11 { left: calc(11 * (100% / 24)); }
  .skill-grid__col--push-12 { left: calc(12 * (100% / 24)); }

  .skill-grid__col--pull-1 { right: calc(1 * (100% / 24)); }
  .skill-grid__col--pull-2 { right: calc(2 * (100% / 24)); }
  .skill-grid__col--pull-3 { right: calc(3 * (100% / 24)); }
  .skill-grid__col--pull-4 { right: calc(4 * (100% / 24)); }
  .skill-grid__col--pull-5 { right: calc(5 * (100% / 24)); }
  .skill-grid__col--pull-6 { right: calc(6 * (100% / 24)); }
  .skill-grid__col--pull-7 { right: calc(7 * (100% / 24)); }
  .skill-grid__col--pull-8 { right: calc(8 * (100% / 24)); }
  .skill-grid__col--pull-9 { right: calc(9 * (100% / 24)); }
  .skill-grid__col--pull-10 { right: calc(10 * (100% / 24)); }
  .skill-grid__col--pull-11 { right: calc(11 * (100% / 24)); }
  .skill-grid__col--pull-12 { right: calc(12 * (100% / 24)); }

  /* 推拉需要相对定位 */
  .skill-grid__col[class*="push-"],
  .skill-grid__col[class*="pull-"] {
    position: relative;
  }

  /* 响应式断点 */
  @media (max-width: 575px) {
    /* xs 断点 - 超小屏幕 */
    .skill-grid__col--xs-span-1 { grid-column: span 1; }
    .skill-grid__col--xs-span-2 { grid-column: span 2; }
    .skill-grid__col--xs-span-3 { grid-column: span 3; }
    .skill-grid__col--xs-span-4 { grid-column: span 4; }
    .skill-grid__col--xs-span-5 { grid-column: span 5; }
    .skill-grid__col--xs-span-6 { grid-column: span 6; }
    .skill-grid__col--xs-span-7 { grid-column: span 7; }
    .skill-grid__col--xs-span-8 { grid-column: span 8; }
    .skill-grid__col--xs-span-9 { grid-column: span 9; }
    .skill-grid__col--xs-span-10 { grid-column: span 10; }
    .skill-grid__col--xs-span-11 { grid-column: span 11; }
    .skill-grid__col--xs-span-12 { grid-column: span 12; }
    .skill-grid__col--xs-span-13 { grid-column: span 13; }
    .skill-grid__col--xs-span-14 { grid-column: span 14; }
    .skill-grid__col--xs-span-15 { grid-column: span 15; }
    .skill-grid__col--xs-span-16 { grid-column: span 16; }
    .skill-grid__col--xs-span-17 { grid-column: span 17; }
    .skill-grid__col--xs-span-18 { grid-column: span 18; }
    .skill-grid__col--xs-span-19 { grid-column: span 19; }
    .skill-grid__col--xs-span-20 { grid-column: span 20; }
    .skill-grid__col--xs-span-21 { grid-column: span 21; }
    .skill-grid__col--xs-span-22 { grid-column: span 22; }
    .skill-grid__col--xs-span-23 { grid-column: span 23; }
    .skill-grid__col--xs-span-24 { grid-column: span 24; }

    .skill-grid__col--xs-auto {
      grid-column: auto;
      width: auto;
    }
  }

  @media (min-width: 576px) and (max-width: 767px) {
    /* sm 断点 - 小屏幕 */
    .skill-grid__col--sm-span-1 { grid-column: span 1; }
    .skill-grid__col--sm-span-2 { grid-column: span 2; }
    .skill-grid__col--sm-span-3 { grid-column: span 3; }
    .skill-grid__col--sm-span-4 { grid-column: span 4; }
    .skill-grid__col--sm-span-5 { grid-column: span 5; }
    .skill-grid__col--sm-span-6 { grid-column: span 6; }
    .skill-grid__col--sm-span-7 { grid-column: span 7; }
    .skill-grid__col--sm-span-8 { grid-column: span 8; }
    .skill-grid__col--sm-span-9 { grid-column: span 9; }
    .skill-grid__col--sm-span-10 { grid-column: span 10; }
    .skill-grid__col--sm-span-11 { grid-column: span 11; }
    .skill-grid__col--sm-span-12 { grid-column: span 12; }
    .skill-grid__col--sm-span-13 { grid-column: span 13; }
    .skill-grid__col--sm-span-14 { grid-column: span 14; }
    .skill-grid__col--sm-span-15 { grid-column: span 15; }
    .skill-grid__col--sm-span-16 { grid-column: span 16; }
    .skill-grid__col--sm-span-17 { grid-column: span 17; }
    .skill-grid__col--sm-span-18 { grid-column: span 18; }
    .skill-grid__col--sm-span-19 { grid-column: span 19; }
    .skill-grid__col--sm-span-20 { grid-column: span 20; }
    .skill-grid__col--sm-span-21 { grid-column: span 21; }
    .skill-grid__col--sm-span-22 { grid-column: span 22; }
    .skill-grid__col--sm-span-23 { grid-column: span 23; }
    .skill-grid__col--sm-span-24 { grid-column: span 24; }

    .skill-grid__col--sm-auto {
      grid-column: auto;
      width: auto;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    /* md 断点 - 中等屏幕 */
    .skill-grid__col--md-span-1 { grid-column: span 1; }
    .skill-grid__col--md-span-2 { grid-column: span 2; }
    .skill-grid__col--md-span-3 { grid-column: span 3; }
    .skill-grid__col--md-span-4 { grid-column: span 4; }
    .skill-grid__col--md-span-5 { grid-column: span 5; }
    .skill-grid__col--md-span-6 { grid-column: span 6; }
    .skill-grid__col--md-span-7 { grid-column: span 7; }
    .skill-grid__col--md-span-8 { grid-column: span 8; }
    .skill-grid__col--md-span-9 { grid-column: span 9; }
    .skill-grid__col--md-span-10 { grid-column: span 10; }
    .skill-grid__col--md-span-11 { grid-column: span 11; }
    .skill-grid__col--md-span-12 { grid-column: span 12; }
    .skill-grid__col--md-span-13 { grid-column: span 13; }
    .skill-grid__col--md-span-14 { grid-column: span 14; }
    .skill-grid__col--md-span-15 { grid-column: span 15; }
    .skill-grid__col--md-span-16 { grid-column: span 16; }
    .skill-grid__col--md-span-17 { grid-column: span 17; }
    .skill-grid__col--md-span-18 { grid-column: span 18; }
    .skill-grid__col--md-span-19 { grid-column: span 19; }
    .skill-grid__col--md-span-20 { grid-column: span 20; }
    .skill-grid__col--md-span-21 { grid-column: span 21; }
    .skill-grid__col--md-span-22 { grid-column: span 22; }
    .skill-grid__col--md-span-23 { grid-column: span 23; }
    .skill-grid__col--md-span-24 { grid-column: span 24; }

    .skill-grid__col--md-auto {
      grid-column: auto;
      width: auto;
    }
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    /* lg 断点 - 大屏幕 */
    .skill-grid__col--lg-span-1 { grid-column: span 1; }
    .skill-grid__col--lg-span-2 { grid-column: span 2; }
    .skill-grid__col--lg-span-3 { grid-column: span 3; }
    .skill-grid__col--lg-span-4 { grid-column: span 4; }
    .skill-grid__col--lg-span-5 { grid-column: span 5; }
    .skill-grid__col--lg-span-6 { grid-column: span 6; }
    .skill-grid__col--lg-span-7 { grid-column: span 7; }
    .skill-grid__col--lg-span-8 { grid-column: span 8; }
    .skill-grid__col--lg-span-9 { grid-column: span 9; }
    .skill-grid__col--lg-span-10 { grid-column: span 10; }
    .skill-grid__col--lg-span-11 { grid-column: span 11; }
    .skill-grid__col--lg-span-12 { grid-column: span 12; }
    .skill-grid__col--lg-span-13 { grid-column: span 13; }
    .skill-grid__col--lg-span-14 { grid-column: span 14; }
    .skill-grid__col--lg-span-15 { grid-column: span 15; }
    .skill-grid__col--lg-span-16 { grid-column: span 16; }
    .skill-grid__col--lg-span-17 { grid-column: span 17; }
    .skill-grid__col--lg-span-18 { grid-column: span 18; }
    .skill-grid__col--lg-span-19 { grid-column: span 19; }
    .skill-grid__col--lg-span-20 { grid-column: span 20; }
    .skill-grid__col--lg-span-21 { grid-column: span 21; }
    .skill-grid__col--lg-span-22 { grid-column: span 22; }
    .skill-grid__col--lg-span-23 { grid-column: span 23; }
    .skill-grid__col--lg-span-24 { grid-column: span 24; }

    .skill-grid__col--lg-auto {
      grid-column: auto;
      width: auto;
    }
  }

  @media (min-width: 1200px) {
    /* xl 断点 - 超大屏幕 */
    .skill-grid__col--xl-span-1 { grid-column: span 1; }
    .skill-grid__col--xl-span-2 { grid-column: span 2; }
    .skill-grid__col--xl-span-3 { grid-column: span 3; }
    .skill-grid__col--xl-span-4 { grid-column: span 4; }
    .skill-grid__col--xl-span-5 { grid-column: span 5; }
    .skill-grid__col--xl-span-6 { grid-column: span 6; }
    .skill-grid__col--xl-span-7 { grid-column: span 7; }
    .skill-grid__col--xl-span-8 { grid-column: span 8; }
    .skill-grid__col--xl-span-9 { grid-column: span 9; }
    .skill-grid__col--xl-span-10 { grid-column: span 10; }
    .skill-grid__col--xl-span-11 { grid-column: span 11; }
    .skill-grid__col--xl-span-12 { grid-column: span 12; }
    .skill-grid__col--xl-span-13 { grid-column: span 13; }
    .skill-grid__col--xl-span-14 { grid-column: span 14; }
    .skill-grid__col--xl-span-15 { grid-column: span 15; }
    .skill-grid__col--xl-span-16 { grid-column: span 16; }
    .skill-grid__col--xl-span-17 { grid-column: span 17; }
    .skill-grid__col--xl-span-18 { grid-column: span 18; }
    .skill-grid__col--xl-span-19 { grid-column: span 19; }
    .skill-grid__col--xl-span-20 { grid-column: span 20; }
    .skill-grid__col--xl-span-21 { grid-column: span 21; }
    .skill-grid__col--xl-span-22 { grid-column: span 22; }
    .skill-grid__col--xl-span-23 { grid-column: span 23; }
    .skill-grid__col--xl-span-24 { grid-column: span 24; }

    .skill-grid__col--xl-auto {
      grid-column: auto;
      width: auto;
    }
  }

  /* 间距工具类 */
  .skill-grid--gutter-xs { gap: var(--skill-spacing-xs); }
  .skill-grid--gutter-sm { gap: var(--skill-spacing-sm); }
  .skill-grid--gutter-md { gap: var(--skill-spacing-md); }
  .skill-grid--gutter-lg { gap: var(--skill-spacing-lg); }
  .skill-grid--gutter-xl { gap: var(--skill-spacing-xl); }
  .skill-grid--gutter-2xl { gap: var(--skill-spacing-2xl); }
  .skill-grid--gutter-3xl { gap: var(--skill-spacing-3xl); }

  /* 无间距 */
  .skill-grid--no-gutter { gap: 0; }
`;