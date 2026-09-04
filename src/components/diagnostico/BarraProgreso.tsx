import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';

interface BarraProgresoProps {
    progresoPct: number;
    textoAliento: string;
    onBack: () => void;
    /** false en el primer paso: embebido en la landing, no hay a dónde volver. */
    mostrarVolver?: boolean;
}

export function BarraProgreso({ progresoPct, textoAliento, onBack, mostrarVolver = true }: BarraProgresoProps) {
    return (
        <div className="w-full max-w-xl mx-auto flex flex-col gap-3 mb-8">
            <div className="flex items-center gap-3">
                {mostrarVolver && (
                    <Button
                        type="button" variant="ghost" size="sm" onClick={onBack}
                        aria-label="Volver" className="!px-2 !py-2 flex-shrink-0"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                )}
                <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                        className="h-full bg-electric-orange transition-[width] duration-300 ease-out rounded-full"
                        style={{ width: `${progresoPct}%` }}
                    />
                </div>
                <span className="text-xs text-white/50 flex-shrink-0 tabular-nums w-10 text-right">
                    {progresoPct}%
                </span>
            </div>
            <p className="text-xs sm:text-sm text-white/50 text-center whitespace-pre-line">{textoAliento}</p>
        </div>
    );
}
