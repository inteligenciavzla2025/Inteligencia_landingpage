import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface OpcionCardProps {
    texto: string;
    seleccionada: boolean;
    onSelect: () => void;
}

export function OpcionCard({ texto, seleccionada, onSelect }: OpcionCardProps) {
    return (
        <motion.button
            type="button"
            onClick={onSelect}
            whileTap={{ scale: 0.97 }}
            aria-pressed={seleccionada}
            className={cn(
                'glass-panel w-full min-h-[56px] rounded-2xl px-5 py-4 text-left text-base sm:text-lg',
                'flex items-center justify-between gap-3 transition-colors duration-200',
                seleccionada
                    ? 'border-electric-orange bg-electric-orange/10 text-white'
                    : 'text-white/85 hover:bg-white/10 hover:border-white/20'
            )}
        >
            <span>{texto}</span>
            <span
                className={cn(
                    'flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors',
                    seleccionada ? 'bg-electric-orange border-electric-orange' : 'border-white/30'
                )}
            >
                {seleccionada && <Check className="w-4 h-4 text-white" />}
            </span>
        </motion.button>
    );
}
