import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
/**
 * Merges multiple class names and handles Tailwind CSS conflicts.
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
