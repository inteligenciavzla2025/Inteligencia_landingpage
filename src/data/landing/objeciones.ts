export interface Objecion {
    id: string;
    pregunta: string;
    respuesta: string;
}

export const ANTETITULO_OBJECIONES = 'LO QUE TODOS PREGUNTAN';
export const TITULO_OBJECIONES = 'Tres dudas razonables';

export const OBJECIONES: Objecion[] = [
    {
        id: 'objecion_1_diagnostico',
        pregunta: 'La IA inventa cosas. No puedo arriesgar mi marca.',
        respuesta: 'Tienes razón, y es la pregunta correcta. Entre el 70 % y el 80 % del flujo no lo decide un modelo: lo deciden reglas fijas que tú defines. Cuando el modelo responde, solo puede hacerlo con base en los documentos de tu empresa, y cita de dónde sacó cada dato. Si no encuentra respaldo, no inventa: escala a una persona. Y antes de hablar con un cliente tuyo, corre dos semanas en paralelo para que veas su tasa de acierto sobre tus propios casos.',
    },
    {
        id: 'objecion_2_diagnostico',
        pregunta: 'Mi información es confidencial.',
        respuesta: '¡Sí! Debería serlo. Clasificamos cada tipo de dato en cuatro niveles antes de conectar nada, y tú apruebas qué sale y qué no sale de tu empresa. Los datos restringidos se enmascaran. Operamos bajo contratos que excluyen el uso de tu información para entrenar modelos, y cada consulta queda registrada y es auditable. Para los procesos más sensibles existe la opción de trabajar sobre infraestructura controlada, sin que la información salga hacia terceros.',
    },
    {
        id: 'objecion_3_diagnostico',
        pregunta: 'Suena caro para el tamaño de mi empresa.',
        respuesta: 'Puede serlo, y hay proyectos de IA que no debieron existir. Por eso el primer paso es gratis y no requiere hablar con nadie: haces el diagnóstico y ves tu propio número. Si el retorno no está, te lo decimos. Y si tu empresa todavía no está lista para implementar, el camino no es un proyecto, es formar a tu equipo, que cuesta una fracción.',
    },
];
