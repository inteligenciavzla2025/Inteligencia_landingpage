import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevelaScrollProps {
    children: ReactNode;
    className?: string;
}

/**
 * Envuelve un bloque para que se revele al entrar en viewport (no en el
 * montaje de la página) — cada bloque dispara su propio whileInView, así la
 * revelación es secuencial "al hacer scroll", no una cascada fija al cargar.
 * Si el sistema pide movimiento reducido, `initial={false}` salta la
 * animación de entrada por completo y el bloque aparece directo en su
 * estado final.
 */
export function RevelaScroll({ children, className }: RevelaScrollProps) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}
