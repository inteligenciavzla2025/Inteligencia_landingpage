const MAX_INTENTOS = 5;
const BASE_DELAY_MS = 500; // 500, 1000, 2000, 4000, 8000 ms

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

export interface MetaDiagnostico {
    origen: string;
    utm: Record<string, string>;
    fechaHora: string;
    idResultado: string;
}

/**
 * Arma la metadata de origen del diagnóstico a partir de la URL actual
 * (parámetros utm_*) y el referrer. `idResultado` es un UUID nuevo por
 * cada envío: identifica este resultado en n8n/Supabase, no el visitante.
 */
export function construirMetaDiagnostico(): MetaDiagnostico {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const key of UTM_KEYS) {
        const value = params.get(key);
        if (value) utm[key] = value;
    }
    const origen = utm.utm_source ?? (document.referrer ? new URL(document.referrer).hostname : 'directo');
    return {
        origen,
        utm,
        fechaHora: new Date().toISOString(),
        idResultado: crypto.randomUUID(),
    };
}

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function intentarEnvio(payload: Record<string, unknown>): Promise<boolean> {
    try {
        const response = await fetch('/api/lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        return response.ok;
    } catch {
        return false;
    }
}

/**
 * Envía el diagnóstico a /api/lead en segundo plano, con reintentos
 * exponenciales. Fire-and-forget: no se hace await de esta función antes de
 * navegar. Solo cierra sobre `payload` (objeto plano ya copiado), nunca
 * sobre refs/estado de React, así que sobrevive sin problema al desmontaje
 * del componente que la llamó. Nunca lanza: un fallo final se traga en
 * silencio, igual que LeadCapture.tsx hoy.
 */
export function enviarDiagnostico(payload: Record<string, unknown>): void {
    void (async () => {
        for (let intento = 0; intento < MAX_INTENTOS; intento++) {
            const ok = await intentarEnvio(payload);
            if (ok) return;
            await delay(BASE_DELAY_MS * 2 ** intento);
        }
    })();
}
