export interface ProductoEscalera {
    numero: string;
    nombre: string;
    meta: string;
    descripcion: string;
    boton: string;
    ctaId: string;
    destacado?: boolean;
    /** 'diagnostico' hace scroll a #contact; 'catalogo' abre catalogoUrl en pestaña nueva. */
    accion: 'diagnostico' | 'catalogo';
    catalogoUrl?: string;
}

export const ANTETITULO_PRODUCTOS = 'POR DÓNDE EMPEZAR';
export const TITULO_PRODUCTOS = 'Tres formas de trabajar con nosotros';
export const BAJADA_PRODUCTOS = 'No todas las empresas están en el mismo punto. Empieza por el escalón que te corresponde.';

export const PRODUCTOS_ESCALERA: ProductoEscalera[] = [
    {
        numero: '01',
        nombre: 'Radar de Madurez',
        meta: 'Gratis · 8 minutos',
        descripcion: 'Responde 24 preguntas y descubre en pantalla qué tan preparada está tu operación, cuántas horas al mes estás perdiendo y qué tres procesos deberías atacar primero.',
        boton: 'Hacer el diagnóstico',
        ctaId: 'productos_radar',
        accion: 'diagnostico',
    },
    {
        numero: '02',
        nombre: 'Activación IA',
        meta: '4 semanas · Formación aplicada · USD 1.400 a 3.500 por equipo',
        descripcion: 'Tu equipo aprende a usar IA en el trabajo real de tu sector, construye sus primeros flujos y se lleva el manual de operación. No es una inmersión completa en tu operación: trabajamos sobre los casos típicos de tu rubro.',
        boton: 'Ver el programa',
        ctaId: 'productos_activacion',
        accion: 'catalogo',
        catalogoUrl: '/catalogo-activacion-ia.html',
    },
    {
        numero: '03',
        nombre: 'Operación Aumentada',
        meta: '90 días · Implementación · Un proceso en producción',
        descripcion: 'Tomamos un proceso crítico y lo ponemos a funcionar con agentes de IA supervisados por tu equipo. Antes de tocar a un cliente tuyo, el sistema opera dos semanas en paralelo y te mostramos su tasa de acierto.',
        boton: 'Ver el programa',
        ctaId: 'productos_operacion',
        accion: 'catalogo',
        catalogoUrl: '/catalogo-operacion-aumentada.html',
        destacado: true,
    },
];
