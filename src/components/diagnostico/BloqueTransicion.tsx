import { Button } from '../ui/Button';
import type { BloqueInfo } from '../../data/diagnostico/tipos';

interface BloqueTransicionProps {
    bloque: BloqueInfo;
    onContinuar: () => void;
}

export function BloqueTransicion({ bloque, onContinuar }: BloqueTransicionProps) {
    return (
        <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center gap-6 py-8">
            <span className="text-xs uppercase tracking-[0.2em] text-electric-orange font-semibold">
                {bloque.titulo}
            </span>
            <div className="space-y-2">
                <p className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">{bloque.lineas[0]}</p>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">{bloque.lineas[1]}</p>
            </div>
            <Button type="button" variant="glass" size="lg" onClick={onContinuar}>Continuar</Button>
        </div>
    );
}
