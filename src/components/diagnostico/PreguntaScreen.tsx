import { useEffect, useRef, useState } from 'react';
import { OpcionCard } from './OpcionCard';
import { Button } from '../ui/Button';
import type { Pregunta } from '../../data/diagnostico/tipos';
import type { DiagnosticoAnswer } from '../../types/diagnostico';

interface PreguntaScreenProps {
    pregunta: Pregunta;
    valorSeleccionado: DiagnosticoAnswer['value'] | undefined;
    onAnswer: (puntaje: number) => void;
    onNext: () => void;
}

const AUTO_ADVANCE_MS = 250;

export function PreguntaScreen({ pregunta, valorSeleccionado, onAnswer, onNext }: PreguntaScreenProps) {
    const [seleccion, setSeleccion] = useState<number | undefined>(
        typeof valorSeleccionado === 'number' ? valorSeleccionado : undefined
    );
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setSeleccion(typeof valorSeleccionado === 'number' ? valorSeleccionado : undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pregunta.id]);

    // El timer se crea DENTRO del handler de click, nunca dentro de un
    // efecto — así el doble-montaje de StrictMode en dev nunca crea un timer
    // fantasma. Esta limpieza cubre solo el caso real: el usuario navega o
    // re-selecciona antes de que pasen los 250ms.
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    function handleSelect(puntaje: number) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setSeleccion(puntaje);
        onAnswer(puntaje);
        timeoutRef.current = setTimeout(() => {
            timeoutRef.current = null;
            onNext();
        }, AUTO_ADVANCE_MS);
    }

    return (
        <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug text-center">
                {pregunta.texto}
            </h2>
            <div className="flex flex-col gap-3">
                {pregunta.opciones.map((opcion) => (
                    <OpcionCard
                        key={opcion.puntaje}
                        texto={opcion.texto}
                        seleccionada={seleccion === opcion.puntaje}
                        onSelect={() => handleSelect(opcion.puntaje)}
                    />
                ))}
            </div>
            {/* Respaldo solo <380px: por si el auto-advance o el tap no se
                sienten confiables en pantallas/dispositivos muy chicos. */}
            <Button
                type="button"
                variant="outline"
                size="md"
                disabled={seleccion === undefined}
                onClick={onNext}
                className="block xs:hidden w-full"
            >
                Continuar
            </Button>
        </div>
    );
}
