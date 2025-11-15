/**
 * Utility for combining class names
 */

export { classMap } from 'lit/directives/class-map.js';

/**
 * cn - Class name utility (similar to clsx/cn from Tailwind)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
