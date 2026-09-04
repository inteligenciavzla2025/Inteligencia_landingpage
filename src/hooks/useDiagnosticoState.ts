import { useCallback, useState } from 'react';
import { readJSON, writeJSON, removeKey } from '../lib/storage';
import {
    DIAGNOSTICO_STORAGE_VERSION,
    createEmptyDiagnosticoState,
    type DiagnosticoState,
    type DiagnosticoAnswer,
    type DiagnosticoContacto,
} from '../types/diagnostico';
import type { DiagnosticoResultado } from '../lib/diagnostico/types';

const STORAGE_KEY = `inteligencia:diagnostico:v${DIAGNOSTICO_STORAGE_VERSION}`;

function loadInitialState(): DiagnosticoState {
    const saved = readJSON<DiagnosticoState>(STORAGE_KEY);
    if (saved && saved.version === DIAGNOSTICO_STORAGE_VERSION) {
        return saved;
    }
    return createEmptyDiagnosticoState();
}

export function useDiagnosticoState() {
    const [state, setState] = useState<DiagnosticoState>(loadInitialState);

    const setAnswer = useCallback((answer: DiagnosticoAnswer) => {
        setState((prev) => {
            const others = prev.answers.filter((a) => a.questionId !== answer.questionId);
            const next: DiagnosticoState = {
                ...prev,
                answers: [...others, answer],
                updatedAt: new Date().toISOString(),
            };
            writeJSON(STORAGE_KEY, next);
            return next;
        });
    }, []);

    const setStep = useCallback((step: number) => {
        setState((prev) => {
            const next: DiagnosticoState = { ...prev, currentStep: step, updatedAt: new Date().toISOString() };
            writeJSON(STORAGE_KEY, next);
            return next;
        });
    }, []);

    const setResultado = useCallback((resultado: DiagnosticoResultado) => {
        setState((prev) => {
            const next: DiagnosticoState = { ...prev, resultado, updatedAt: new Date().toISOString() };
            writeJSON(STORAGE_KEY, next);
            return next;
        });
    }, []);

    const setContacto = useCallback((contacto: DiagnosticoContacto) => {
        setState((prev) => {
            const next: DiagnosticoState = { ...prev, contacto, updatedAt: new Date().toISOString() };
            writeJSON(STORAGE_KEY, next);
            return next;
        });
    }, []);

    const resetState = useCallback(() => {
        setState(createEmptyDiagnosticoState());
        removeKey(STORAGE_KEY);
    }, []);

    return { state, setAnswer, setStep, setResultado, setContacto, resetState };
}
