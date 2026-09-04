import type { Cuadrante } from '../../lib/diagnostico/types';
import type { DiagnosticoResultado } from '../../lib/diagnostico/types';
import type { DiagnosticoContacto } from '../../types/diagnostico';
import { LABEL_DIMENSION } from './labelDimension';

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

// Etiqueta humana del cuadrante, para mencionarlo en el mensaje del chat
// (el valor interno como "listo_para_automatizar" no es lenguaje natural).
const LABEL_CUADRANTE: Record<Cuadrante, string> = {
    listo_para_automatizar: 'Listo para automatizar',
    oportunidad_bloqueada: 'Oportunidad bloqueada',
    base_solida: 'Base sólida',
    ordenar_la_casa: 'Ordenar la casa',
};

// El pedido concreto según el cuadrante — cierre del mensaje enriquecido,
// y también el mensaje completo de fallback si por algo no hay `contacto`
// disponible (ej. la previsualización de resultados en modo dev).
const PEDIDO_CUADRANTE: Record<Cuadrante, string> = {
    listo_para_automatizar: 'Quiero agendar mi diagnóstico de 30 minutos.',
    oportunidad_bloqueada: 'Quiero entender cómo desbloquear la oportunidad que detectó mi diagnóstico.',
    base_solida: 'Quiero explorar los procesos que me recomendó el diagnóstico.',
    ordenar_la_casa: 'Quiero empezar por lo básico que me marcó el diagnóstico.',
};

const PEDIDO_SECUNDARIO = 'Quiero que me expliquen mi resultado del diagnóstico.';

/**
 * Arma el mensaje con el que se abre el chat desde el CTA primario del
 * resultado. Va en primera persona (se muestra como si el visitante lo
 * hubiera escrito) e incluye lo que ya sabemos de él, para que CEREBRO no
 * tenga que volver a pedirle nombre/empresa/contacto ni preguntar "¿qué
 * resultado te dio?" — puede ir directo a confirmar los datos y empujar
 * hacia la agenda. Si no hay `contacto` (ej. previsualización en dev),
 * cae al pedido corto de siempre.
 */
export function construirMensajeChatCuadrante(
    contacto: DiagnosticoContacto | null,
    resultado: DiagnosticoResultado,
): string {
    const pedido = PEDIDO_CUADRANTE[resultado.cuadrante];
    if (!contacto) return pedido;

    return [
        'Acabo de completar el diagnóstico de InteligencIA.',
        `Soy ${contacto.nombre}, de ${contacto.empresa} (${contacto.cargo}).`,
        `Mi resultado: nivel ${resultado.nivel.numero} - ${resultado.nivel.nombre}, perfil "${LABEL_CUADRANTE[resultado.cuadrante]}".`,
        `Mi punto más débil fue ${LABEL_DIMENSION[resultado.dimensionMasDebil.dimension]}.`,
        `Mi email es ${contacto.email} y mi WhatsApp ${contacto.whatsapp}.`,
        pedido,
    ].join(' ');
}

/** Igual que arriba, para el botón secundario ("Hablar con nosotros ahora"). */
export function construirMensajeChatSecundario(
    contacto: DiagnosticoContacto | null,
    resultado: DiagnosticoResultado,
): string {
    if (!contacto) return PEDIDO_SECUNDARIO;

    return [
        'Acabo de completar el diagnóstico de InteligencIA.',
        `Soy ${contacto.nombre}, de ${contacto.empresa} (${contacto.cargo}).`,
        `Mi resultado: nivel ${resultado.nivel.numero} - ${resultado.nivel.nombre}.`,
        `Mi email es ${contacto.email} y mi WhatsApp ${contacto.whatsapp}.`,
        PEDIDO_SECUNDARIO,
    ].join(' ');
}
