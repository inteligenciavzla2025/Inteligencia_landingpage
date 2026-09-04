export const ANTETITULO_COMPARATIVA = 'LA DIFERENCIA, EN NÚMEROS';
export const TITULO_COMPARATIVA = 'Día 0 y día 90';

export interface Transformacion {
    antes: string;
    despues: string;
}

// Lista corta que se muestra agrupada bajo cada etiqueta del slider
// (las "antes" bajo "Día 0", las "después" bajo "Día 90").
export const TRANSFORMACIONES: Transformacion[] = [
    { antes: 'Respuesta en horas o días', despues: 'Respuesta en segundos, 24/7' },
    { antes: 'El proceso vive en una persona', despues: 'Documentado y se ejecuta solo' },
    { antes: 'Crecer significa contratar', despues: 'Crecer significa configurar' },
    { antes: 'Los errores se descubren cuando reclama el cliente', despues: 'Tasa de error conocida, con muestreo semanal' },
];
