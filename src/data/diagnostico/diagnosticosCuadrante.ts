import type { Cuadrante } from '../../lib/diagnostico/types';

export const CTA_LABEL_CUADRANTE: Record<Cuadrante, string> = {
    listo_para_automatizar: 'Agendar diagnóstico de 30 minutos',
    oportunidad_bloqueada: 'Ver cómo desbloquear esto',
    base_solida: 'Explorar los siguientes procesos',
    ordenar_la_casa: 'Empezar por lo básico',
};

export const CTA_ID_CUADRANTE: Record<Cuadrante, string> = {
    listo_para_automatizar: 'resultado_cta_listo_para_automatizar',
    oportunidad_bloqueada: 'resultado_cta_oportunidad_bloqueada',
    base_solida: 'resultado_cta_base_solida',
    ordenar_la_casa: 'resultado_cta_ordenar_la_casa',
};

// Mensaje inicial con el que se abre el chat del hero al tocar el CTA
// primario — reemplaza al viejo scroll a #contact, que ya no existe.
export const MENSAJE_CHAT_CUADRANTE: Record<Cuadrante, string> = {
    listo_para_automatizar: 'Quiero agendar mi diagnóstico de 30 minutos.',
    oportunidad_bloqueada: 'Quiero entender cómo desbloquear la oportunidad que detectó mi diagnóstico.',
    base_solida: 'Quiero explorar los procesos que me recomendó el diagnóstico.',
    ordenar_la_casa: 'Quiero empezar por lo básico que me marcó el diagnóstico.',
};

export const MENSAJE_CHAT_SECUNDARIO = 'Quiero que me expliquen mi resultado del diagnóstico.';
