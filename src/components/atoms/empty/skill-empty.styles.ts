import { css } from 'lit';

export const emptyStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--empty-padding, var(--skill-spacing-2xl, 48px));
    min-height: var(--empty-min-height, 200px);
    box-sizing: border-box;
  }

  .skill-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: var(--empty-spacing, var(--skill-spacing-lg, 20px));
    max-width: var(--empty-max-width, 400px);
    width: 100%;
  }

  /* þ¹h */
  .skill-empty__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--icon-size, var(--skill-component-height-lg, 56px));
    height: var(--icon-size, var(--skill-component-height-lg, 56px));
    color: var(--icon-color, var(--skill-gray-300, #D1D5DB));
    font-size: var(--icon-font-size, 48px);
    line-height: 1;
    margin-bottom: var(--icon-spacing, var(--skill-spacing-md, 16px));
    transition: all var(--empty-duration, var(--skill-duration-normal, 300ms)) var(--empty-ease, var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1)));
  }

  /* þG7 */
  .skill-empty__image {
    width: var(--image-size, var(--skill-component-height-xl, 64px));
    height: var(--image-size, var(--skill-component-height-xl, 64px));
    object-fit: contain;
    border-radius: var(--image-radius, var(--skill-radius-lg, 8px));
    margin-bottom: var(--image-spacing, var(--skill-spacing-md, 16px));
    opacity: var(--image-opacity, 1);
  }

  /* SVG þ7 */
  .skill-empty__svg {
    width: var(--svg-size, var(--skill-component-height-lg, 56px));
    height: var(--svg-size, var(--skill-component-height-lg, 56px));
    margin-bottom: var(--svg-spacing, var(--skill-spacing-md, 16px));
  }

  /* ˜7 */
  .skill-empty__title {
    font-size: var(--title-font-size, var(--skill-font-size-title-2, 24px));
    font-weight: var(--title-font-weight, var(--skill-font-weight-semibold, 600));
    line-height: var(--title-line-height, 1.3);
    color: var(--title-color, var(--skill-gray-900, #1A1A1A));
    margin: 0 0 var(--title-spacing, var(--skill-spacing-sm, 12px)) 0;
    text-align: center;
  }

  /* Ïð7 */
  .skill-empty__description {
    font-size: var(--description-font-size, var(--skill-font-size-body-2, 14px));
    font-weight: var(--description-font-weight, var(--skill-font-weight-regular, 400));
    line-height: var(--description-line-height, 1.6);
    color: var(--description-color, var(--skill-gray-600, #6B7280));
    margin: 0;
    text-align: center;
    max-width: var(--description-max-width, 320px);
  }

  /* Í\	®¹h */
  .skill-empty__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--actions-spacing, var(--skill-spacing-sm, 12px));
    margin-top: var(--actions-margin-top, var(--skill-spacing-lg, 20px));
    width: 100%;
  }

  /* U*Í\	® */
  .skill-empty__action {
    min-width: var(--action-min-width, 120px);
    padding: var(--action-padding-y, var(--skill-spacing-sm, 12px)) var(--action-padding-x, var(--skill-spacing-lg, 20px));
  }

  /* *Í\	® */
  .skill-empty__actions--row {
    flex-direction: row;
    justify-content: center;
    gap: var(--actions-row-spacing, var(--skill-spacing-sm, 12px));
  }

  /* ;˜ØS */
  :host([theme='dark']) .skill-empty__icon {
    --icon-color: var(--skill-gray-500, #8A8A8A);
  }

  :host([theme='dark']) .skill-empty__title {
    --title-color: var(--skill-gray-100, #F1F3F5);
  }

  :host([theme='dark']) .skill-empty__description {
    --description-color: var(--skill-gray-400, #BDBDBD);
  }

  /* :øØS */
  :host([size='sm']) .skill-empty {
    --empty-padding: var(--skill-spacing-xl, 24px));
    --empty-min-height: 150px;
    --empty-spacing: var(--skill-spacing-md, 16px);
    --icon-size: var(--skill-component-height-md, 40px);
    --image-size: var(--skill-component-height-lg, 48px);
    --svg-size: var(--skill-component-height-md, 40px);
    --icon-spacing: var(--skill-spacing-sm, 12px);
    --image-spacing: var(--skill-spacing-sm, 12px);
    --svg-spacing: var(--skill-spacing-sm, 12px);
    --title-font-size: var(--skill-font-size-title-3, 20px);
    --title-spacing: var(--skill-spacing-xs, 8px);
    --description-font-size: var(--skill-font-size-body-3, 12px);
    --actions-margin-top: var(--skill-spacing-md, 16px);
    --actions-spacing: var(--skill-spacing-xs, 8px);
  }

  :host([size='lg']) .skill-empty {
    --empty-padding: var(--skill-spacing-3xl, 64px));
    --empty-min-height: 300px;
    --empty-spacing: var(--skill-spacing-xl, 24px));
    --icon-size: var(--skill-component-height-xl, 64px);
    --image-size: var(--skill-component-height-2xl, 80px);
    --svg-size: var(--skill-component-height-xl, 64px);
    --icon-spacing: var(--skill-spacing-lg, 20px);
    --image-spacing: var(--skill-spacing-lg, 20px);
    --svg-spacing: var(--skill-spacing-lg, 20px);
    --title-font-size: var(--skill-font-size-title-1, 28px);
    --title-spacing: var(--skill-spacing-md, 16px));
    --description-font-size: var(--skill-font-size-body-1, 16px);
    --actions-margin-top: var(--skill-spacing-xl, 24px);
    --actions-spacing: var(--skill-spacing-md, 16px);
  }

  /* €¦ØS */
  :host([variant='simple']) .skill-empty__icon,
  :host([variant='simple']) .skill-empty__image,
  :host([variant='simple']) .skill-empty__svg {
    margin-bottom: var(--skill-spacing-md, 16px));
  }

  :host([variant='simple']) .skill-empty__title {
    margin-bottom: var(--skill-spacing-sm, 12px));
  }

  :host([variant='simple']) .skill-empty__description {
    margin-bottom: var(--skill-spacing-lg, 20px));
  }

  /* à¹FØS */
  :host([variant='borderless']) .skill-empty {
    border: none;
    background: transparent;
    border-radius: 0;
  }

  /* aGØS */
  :host([variant='card']) .skill-empty {
    background: var(--card-bg, var(--skill-white, #FFFFFF));
    border: var(--card-border-width, 1px) solid var(--card-border-color, var(--skill-gray-200, #E5E8EB));
    border-radius: var(--card-radius, var(--skill-radius-lg, 8px));
    box-shadow: var(--card-shadow, var(--skill-shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 1px rgba(0, 0, 0, 0.06)));
  }

  :host([variant='card'][theme='dark']) .skill-empty {
    --card-bg: var(--skill-gray-800, #2C2C2C);
    --card-border-color: var(--skill-gray-700, #5A5A5A);
    --card-shadow: var(--skill-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)));
  }

  /* ¨;Hœ */
  :host([animated]) .skill-empty__icon {
    animation: empty-icon-float 3s ease-in-out infinite;
  }

  :host([animated]) .skill-empty__image {
    animation: empty-image-float 4s ease-in-out infinite;
  }

  @keyframes empty-icon-float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes empty-image-float {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-8px) scale(1.05);
    }
  }

  /* ÌoÅp */
  :host([decoration]) .skill-empty::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: var(--decoration-bg, radial-gradient(circle, var(--skill-gray-50, #FAFAFA) 0%, transparent 70%));
    z-index: -1;
    opacity: var(--decoration-opacity, 0.5);
  }

  :host([decoration='circles']) .skill-empty::before {
    background-image:
      radial-gradient(circle at 20% 20%, var(--skill-primary-100, #E6F0FF) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, var(--skill-secondary-100, #E6FBF5) 0%, transparent 50%);
    opacity: 0.3;
  }

  :host([decoration='dots']) .skill-empty::before {
    background-image:
      radial-gradient(circle at 25% 25%, var(--skill-primary-200, #6B9FFF) 2px, transparent 2px),
      radial-gradient(circle at 75% 75%, var(--skill-secondary-200, #6BF5D0) 2px, transparent 2px);
    background-size: 100px 100px;
    opacity: 0.1;
  }

  /* þb! */
  :host([pattern]) .skill-empty::after {
    content: '';
    position: absolute;
    top: 10%;
    left: 10%;
    right: 10%;
    bottom: 10%;
    border: 2px dashed var(--pattern-color, var(--skill-gray-300, #D1D5DB));
    border-radius: var(--pattern-radius, var(--skill-radius-md, 6px));
    opacity: var(--pattern-opacity, 0.3);
    pointer-events: none;
  }

  /* Q<! */
  :host([pattern='grid']) .skill-empty::after {
    background-image:
      linear-gradient(var(--skill-gray-200, #E5E8EB) 1px, transparent 1px),
      linear-gradient(90deg, var(--skill-gray-200, #E5E8EB) 1px, transparent 1px);
    background-size: 20px 20px;
    border: none;
    opacity: 0.1;
  }

  /* Í”¾¡ */
  @media (max-width: 768px) {
    :host([responsive]) .skill-empty {
      --empty-padding: var(--skill-spacing-xl, 24px));
      --empty-min-height: 180px;
      --empty-spacing: var(--skill-spacing-md, 16px));
      --icon-size: var(--skill-component-height-md, 40px);
      --image-size: var(--skill-component-height-lg, 48px);
      --svg-size: var(--skill-component-height-md, 40px);
      --title-font-size: var(--skill-font-size-title-3, 20px);
      --description-font-size: var(--skill-font-size-body-3, 12px);
      --actions-margin-top: var(--skill-spacing-md, 16px);
    }

    :host([responsive]) .skill-empty__actions--row {
      flex-direction: column;
      align-items: stretch;
    }
  }

  /* ØùÔ¦!/ */
  @media (prefers-contrast: high) {
    .skill-empty {
      --description-color: var(--skill-gray-800, #2C2C2C);
      --title-color: var(--skill-gray-950, #111827);
    }

    .skill-empty__icon {
      --icon-color: var(--skill-gray-500, #8A8A8A);
    }
  }

  /* Ï¨;!/ */
  @media (prefers-reduced-motion: reduce) {
    :host([animated]) .skill-empty__icon,
    :host([animated]) .skill-empty__image {
      animation: none;
    }
  }

  /* êšICSSØÏ/ */
  .skill-empty {
    --empty-padding: var(--skill-spacing-2xl, 48px);
    --empty-min-height: 200px;
    --empty-max-width: 400px;
    --empty-spacing: var(--skill-spacing-lg, 20px);
    --empty-duration: var(--skill-duration-normal, 300ms);
    --empty-ease: var(--skill-ease-out, cubic-bezier(0, 0, 0.2, 1));
    --icon-size: var(--skill-component-height-lg, 56px);
    --icon-font-size: 48px;
    --icon-color: var(--skill-gray-300, #D1D5DB);
    --icon-spacing: var(--skill-spacing-md, 16px);
    --image-size: var(--skill-component-height-xl, 64px);
    --image-radius: var(--skill-radius-lg, 8px);
    --image-opacity: 1;
    --image-spacing: var(--skill-spacing-md, 16px);
    --svg-size: var(--skill-component-height-lg, 56px);
    --svg-spacing: var(--skill-spacing-md, 16px);
    --title-font-size: var(--skill-font-size-title-2, 24px);
    --title-font-weight: var(--skill-font-weight-semibold, 600);
    --title-line-height: 1.3;
    --title-color: var(--skill-gray-900, #1A1A1A);
    --title-spacing: var(--skill-spacing-sm, 12px));
    --description-font-size: var(--skill-font-size-body-2, 14px);
    --description-font-weight: var(--skill-font-weight-regular, 400);
    --description-line-height: 1.6;
    --description-color: var(--skill-gray-600, #6B7280);
    --description-max-width: 320px;
    --actions-spacing: var(--skill-spacing-sm, 12px);
    --actions-margin-top: var(--skill-spacing-lg, 20px);
    --actions-row-spacing: var(--skill-spacing-sm, 12px);
    --action-min-width: 120px;
    --action-padding-y: var(--skill-spacing-sm, 12px);
    --action-padding-x: var(--skill-spacing-lg, 20px);
    --card-bg: var(--skill-white, #FFFFFF);
    --card-border-width: 1px;
    --card-border-color: var(--skill-gray-200, #E5E8EB);
    --card-radius: var(--skill-radius-lg, 8px);
    --card-shadow: var(--skill-shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 1px rgba(0, 0, 0, 0.06)));
    --decoration-bg: radial-gradient(circle, var(--skill-gray-50, #FAFAFA) 0%, transparent 70%);
    --decoration-opacity: 0.5;
    --pattern-color: var(--skill-gray-300, #D1D5DB);
    --pattern-opacity: 0.3;
    --pattern-radius: var(--skill-radius-md, 6px);
  }
`;