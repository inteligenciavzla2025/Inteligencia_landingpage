import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// window.innerHeight reports the layout viewport, which on mobile can be taller
// than what's actually visible (browser chrome). visualViewport tracks the real
// visible area, which is what fixed-position elements should be measured against.
export function getViewportHeight(): number {
    if (typeof window === 'undefined') return 0;
    return window.visualViewport?.height ?? window.innerHeight;
}
