import { useEffect, useRef } from 'react';
import { trackEvent } from '../lib/analytics';

const THRESHOLDS = [25, 50, 75, 100];

export function useScrollDepth() {
    const fired = useRef(new Set<number>());

    useEffect(() => {
        function handleScroll() {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;
            const percent = (window.scrollY / docHeight) * 100;

            for (const threshold of THRESHOLDS) {
                if (percent >= threshold && !fired.current.has(threshold)) {
                    fired.current.add(threshold);
                    trackEvent('scroll_depth', { percent: threshold });
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
}
