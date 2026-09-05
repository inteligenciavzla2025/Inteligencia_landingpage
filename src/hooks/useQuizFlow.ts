import { useCallback, useMemo } from 'react';
import { useDiagnosticoState } from './useDiagnosticoState';
import { BLOQUES } from '../data/diagnostico/bloques';
import { PREGUNTAS } from '../data/diagnostico/preguntas';
import type { PasoQuiz } from '../data/diagnostico/tipos';
import type { DiagnosticoAnswer } from '../types/diagnostico';
import { trackDiagnosticoIniciado, trackDiagnosticoProgreso } from '../lib/analytics';

// Construido una sola vez, de forma pura: 7 transición + 24 pregunta + 1 contacto = 32 pasos.
const PASOS_TRANSICION_Y_PREGUNTAS: PasoQuiz[] = BLOQUES.flatMap((bloque): PasoQuiz[] => [
    { tipo: 'transicion', bloque: bloque.key },
    ...bloque.preguntaIds.map((id): PasoQuiz => ({ tipo: 'pregunta', id })),
]);

export const PASOS_QUIZ: PasoQuiz[] = [...PASOS_TRANSICION_Y_PREGUNTAS, { tipo: 'contacto' }];

const TOTAL_PREGUNTAS = PREGUNTAS.length; // 24

function indiceDePreguntaPorId(id: string): number {
    return PREGUNTAS.findIndex((p) => p.id === id);
}

interface SegmentoAliento { desde: number; hasta: number; texto: string; }

// Ver nota de diseño en el plan: solo "vas por la mitad" (Q13) y "quedan 6"
// (Q19) caen en un límite matemáticamente correcto. "última sección" se usa
// en BloqueTransicion del bloque potencial, no acá.
const SEGMENTOS_ALIENTO: SegmentoAliento[] = [
    { desde: 1, hasta: 6, texto: 'Arrancamos. Elegí lo primero que se te ocurra\nNo hay respuestas correctas.' },
    { desde: 7, hasta: 12, texto: 'Vas muy bien, seguimos.' },
    { desde: 13, hasta: 18, texto: 'Vas por la mitad.' },
    { desde: 19, hasta: 24, texto: 'Quedan 6 preguntas.' },
];

export function useQuizFlow() {
    const { state, setAnswer, setStep, setResultado, setContacto, resetState } = useDiagnosticoState();

    // Clamp defensivo por si currentStep persistido queda fuera de rango.
    const currentStep = Math.min(Math.max(state.currentStep, 0), PASOS_QUIZ.length - 1);
    const paso = PASOS_QUIZ[currentStep];

    const progresoPct = useMemo(() => {
        const respondidas = state.answers.filter((a) =>
            PREGUNTAS.some((p) => p.id === a.questionId)
        ).length;
        return Math.round((respondidas / TOTAL_PREGUNTAS) * 100);
    }, [state.answers]);

    const textoAliento = useMemo(() => {
        if (paso.tipo === 'contacto') {
            return 'Último paso: contanos a dónde enviamos tu resultado.';
        }
        const n = paso.tipo === 'pregunta'
            ? indiceDePreguntaPorId(paso.id) + 1
            : indiceDePreguntaPorId(BLOQUES.find((b) => b.key === paso.bloque)!.preguntaIds[0]) + 1;
        const seg = SEGMENTOS_ALIENTO.find((s) => n >= s.desde && n <= s.hasta);
        return seg?.texto ?? SEGMENTOS_ALIENTO[0].texto;
    }, [paso]);

    const respuestaActual: DiagnosticoAnswer['value'] | undefined = useMemo(() => {
        if (paso.tipo !== 'pregunta') return undefined;
        return state.answers.find((a) => a.questionId === paso.id)?.value;
    }, [paso, state.answers]);

    const next = useCallback(() => {
        setStep(Math.min(currentStep + 1, PASOS_QUIZ.length - 1));
    }, [currentStep, setStep]);

    const back = useCallback(() => {
        // Sin rutas separadas ya no hay a dónde "volver" en el paso 0 —
        // estamos en la misma página, así que simplemente no hace nada.
        if (currentStep === 0) return;
        setStep(currentStep - 1);
    }, [currentStep, setStep]);

    const answerCurrent = useCallback((value: DiagnosticoAnswer['value']) => {
        if (paso.tipo !== 'pregunta') return;
        if (state.answers.length === 0) trackDiagnosticoIniciado();
        trackDiagnosticoProgreso(indiceDePreguntaPorId(paso.id) + 1);
        setAnswer({ questionId: paso.id, value });
    }, [paso, setAnswer, state.answers.length]);

    return {
        paso, currentStep, progresoPct, textoAliento, respuestaActual,
        next, back, answerCurrent, state, setResultado, setContacto, resetState,
    };
}
