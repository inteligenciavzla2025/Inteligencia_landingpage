import type { Pregunta } from './tipos';

export const PREGUNTAS: Pregunta[] = [
    // ── DATOS ──────────────────────────────────────────────────────────────
    {
        id: 'p1', bloque: 'datos',
        texto: '¿Dónde vive la información de tu operación diaria?',
        opciones: [
            { puntaje: 0, texto: 'Papel, cuadernos o WhatsApp personal' },
            { puntaje: 1, texto: 'Archivos de Excel en computadoras individuales' },
            { puntaje: 2, texto: 'Excel o Sheets compartidos en la nube' },
            { puntaje: 3, texto: 'Un sistema (ERP, CRM o similar)' },
            { puntaje: 4, texto: 'Varios sistemas conectados entre sí' },
        ],
    },
    {
        id: 'p2', bloque: 'datos',
        texto: 'Si necesitas el historial completo de los últimos 12 meses de tu proceso principal, ¿en cuánto tiempo lo tienes?',
        opciones: [
            { puntaje: 0, texto: 'No podría obtenerlo' },
            { puntaje: 1, texto: 'Semanas' },
            { puntaje: 2, texto: 'Días' },
            { puntaje: 3, texto: 'Horas' },
            { puntaje: 4, texto: 'Minutos, lo exporto yo mismo' },
        ],
    },
    {
        id: 'p3', bloque: 'datos',
        texto: '¿Cuánta información se copia a mano de un lugar a otro en tu operación?',
        opciones: [
            { puntaje: 0, texto: 'Prácticamente todo' },
            { puntaje: 1, texto: 'La mayor parte' },
            { puntaje: 2, texto: 'Bastante' },
            { puntaje: 3, texto: 'Poco' },
            { puntaje: 4, texto: 'Nada, los sistemas se comunican' },
        ],
    },
    // ── PROCESOS ───────────────────────────────────────────────────────────
    {
        id: 'p4', bloque: 'procesos',
        texto: 'Si el responsable de tu proceso principal renuncia mañana, ¿cuánto tarda un reemplazo en operarlo sin errores?',
        opciones: [
            { puntaje: 0, texto: 'Más de 3 meses, se llevaría el conocimiento' },
            { puntaje: 1, texto: 'Entre 1 y 3 meses' },
            { puntaje: 2, texto: 'Algunas semanas' },
            { puntaje: 3, texto: 'Pocos días' },
            { puntaje: 4, texto: 'Inmediato, está documentado' },
        ],
    },
    {
        id: 'p5', bloque: 'procesos',
        texto: '¿Los procedimientos de trabajo están escritos?',
        opciones: [
            { puntaje: 0, texto: 'No existen' },
            { puntaje: 1, texto: 'Algunos, informales' },
            { puntaje: 2, texto: 'Escritos pero desactualizados' },
            { puntaje: 3, texto: 'Escritos y vigentes' },
            { puntaje: 4, texto: 'Escritos, vigentes y se auditan' },
        ],
    },
    {
        id: 'p6', bloque: 'procesos',
        texto: '¿Con qué frecuencia hay que rehacer trabajo por errores o información incompleta?',
        opciones: [
            { puntaje: 0, texto: 'Todos los días' },
            { puntaje: 1, texto: 'Varias veces por semana' },
            { puntaje: 2, texto: 'Semanalmente' },
            { puntaje: 3, texto: 'Ocasionalmente' },
            { puntaje: 4, texto: 'Casi nunca, y se mide' },
        ],
    },
    // ── TECNOLOGÍA ─────────────────────────────────────────────────────────
    {
        id: 'p7', bloque: 'tecnologia',
        texto: '¿Cómo se comunican tus sistemas entre sí?',
        opciones: [
            { puntaje: 0, texto: 'No tengo sistemas' },
            { puntaje: 1, texto: 'No se comunican, alguien copia datos' },
            { puntaje: 2, texto: 'Alguna exportación manual entre ellos' },
            { puntaje: 3, texto: 'Algunos están integrados' },
            { puntaje: 4, texto: 'Están integrados y hay automatizaciones funcionando' },
        ],
    },
    {
        id: 'p8', bloque: 'tecnologia',
        texto: '¿Cómo atiendes a tus clientes por WhatsApp?',
        opciones: [
            { puntaje: 0, texto: 'No usamos WhatsApp' },
            { puntaje: 1, texto: 'Números personales de cada empleado' },
            { puntaje: 2, texto: 'Un número compartido en un celular' },
            { puntaje: 3, texto: 'WhatsApp Business en varios dispositivos' },
            { puntaje: 4, texto: 'API oficial de WhatsApp Business conectada a un sistema' },
        ],
    },
    {
        id: 'p9', bloque: 'tecnologia',
        texto: '¿Hay alguna automatización funcionando hoy en tu empresa, aunque sea simple?',
        opciones: [
            { puntaje: 0, texto: 'Ninguna' },
            { puntaje: 1, texto: 'Solo respuestas automáticas básicas' },
            { puntaje: 2, texto: 'Alguna plantilla o formulario automatizado' },
            { puntaje: 3, texto: 'Flujos automatizados en uno o dos procesos' },
            { puntaje: 4, texto: 'Automatizaciones en varios procesos, con seguimiento' },
        ],
    },
    // ── TALENTO ────────────────────────────────────────────────────────────
    {
        id: 'p10', bloque: 'talento',
        texto: '¿Alguien en tu equipo usa herramientas de IA hoy?',
        opciones: [
            { puntaje: 0, texto: 'Nadie' },
            { puntaje: 1, texto: 'Alguno por su cuenta, sin que la empresa lo sepa' },
            { puntaje: 2, texto: 'Varios, de forma informal' },
            { puntaje: 3, texto: 'Hay uso extendido con criterio propio' },
            { puntaje: 4, texto: 'Hay uso extendido con lineamientos de la empresa' },
        ],
    },
    {
        id: 'p11', bloque: 'talento',
        texto: '¿Cómo reaccionaría tu equipo si mañana anuncias que van a incorporar IA en su trabajo?',
        opciones: [
            { puntaje: 0, texto: 'Rechazo fuerte, miedo a perder el empleo' },
            { puntaje: 1, texto: 'Resistencia importante' },
            { puntaje: 2, texto: 'Indiferencia' },
            { puntaje: 3, texto: 'Curiosidad y buena disposición' },
            { puntaje: 4, texto: 'Ya lo están pidiendo' },
        ],
    },
    {
        id: 'p12', bloque: 'talento',
        texto: '¿Hay alguien en tu empresa que pueda dedicar horas semanales a implementar mejoras operativas?',
        opciones: [
            { puntaje: 0, texto: 'Nadie, todos están saturados' },
            { puntaje: 1, texto: 'Alguien, pero sin tiempo real' },
            { puntaje: 2, texto: 'Sí, unas pocas horas' },
            { puntaje: 3, texto: 'Sí, con tiempo asignado' },
            { puntaje: 4, texto: 'Sí, es parte formal de su rol' },
        ],
    },
    // ── GOBIERNO ───────────────────────────────────────────────────────────
    {
        id: 'p13', bloque: 'gobierno',
        texto: '¿Existe una política escrita sobre qué información se puede compartir con herramientas externas?',
        opciones: [
            { puntaje: 0, texto: 'No, y nunca lo pensamos' },
            { puntaje: 1, texto: 'No, pero nos preocupa' },
            { puntaje: 2, texto: 'Hay criterios verbales' },
            { puntaje: 3, texto: 'Hay una política escrita' },
            { puntaje: 4, texto: 'Hay política escrita, firmada y revisada' },
        ],
    },
    {
        id: 'p14', bloque: 'gobierno',
        texto: '¿Sabes qué información de tu empresa es confidencial y quién puede acceder a ella?',
        opciones: [
            { puntaje: 0, texto: 'No está definido' },
            { puntaje: 1, texto: 'Se sabe de forma informal' },
            { puntaje: 2, texto: 'Está parcialmente definido' },
            { puntaje: 3, texto: 'Está definido por escrito' },
            { puntaje: 4, texto: 'Definido, con permisos configurados en los sistemas' },
        ],
    },
    {
        id: 'p15', bloque: 'gobierno',
        texto: 'Si hoy ocurriera un error grave en un proceso clave, ¿podrías rastrear qué pasó y quién lo hizo?',
        opciones: [
            { puntaje: 0, texto: 'No' },
            { puntaje: 1, texto: 'Con mucha dificultad' },
            { puntaje: 2, texto: 'Parcialmente' },
            { puntaje: 3, texto: 'Sí, revisando registros' },
            { puntaje: 4, texto: 'Sí, de forma inmediata y auditable' },
        ],
    },
    // ── ECONOMÍA ───────────────────────────────────────────────────────────
    {
        id: 'p16', bloque: 'economia',
        texto: '¿Sabes cuánto le cuesta a tu empresa atender una solicitud de cliente de principio a fin?',
        opciones: [
            { puntaje: 0, texto: 'No tengo idea' },
            { puntaje: 1, texto: 'Una intuición aproximada' },
            { puntaje: 2, texto: 'Una estimación gruesa' },
            { puntaje: 3, texto: 'Lo tengo calculado' },
            { puntaje: 4, texto: 'Lo calculo y lo monitoreo mensualmente' },
        ],
    },
    {
        id: 'p17', bloque: 'economia',
        texto: '¿Mides el tiempo que tardas en dar la primera respuesta a un cliente?',
        opciones: [
            { puntaje: 0, texto: 'No' },
            { puntaje: 1, texto: 'Lo sé por percepción' },
            { puntaje: 2, texto: 'Lo he medido alguna vez' },
            { puntaje: 3, texto: 'Lo mido periódicamente' },
            { puntaje: 4, texto: 'Lo mido en tiempo real y tengo una meta' },
        ],
    },
    {
        id: 'p18', bloque: 'economia',
        texto: '¿Cómo se toman las decisiones de inversión en tecnología en tu empresa?',
        opciones: [
            { puntaje: 0, texto: 'No invertimos' },
            { puntaje: 1, texto: 'Por intuición u oportunidad' },
            { puntaje: 2, texto: 'Por recomendación de terceros' },
            { puntaje: 3, texto: 'Con análisis de costo' },
            { puntaje: 4, texto: 'Con cálculo de retorno y seguimiento posterior' },
        ],
    },
    // ── POTENCIAL ──────────────────────────────────────────────────────────
    {
        id: 'p19', bloque: 'potencial',
        texto: '¿Cuántas solicitudes, pedidos, consultas o casos del mismo tipo procesa tu empresa al mes?',
        opciones: [
            { puntaje: 0, texto: 'Menos de 50' },
            { puntaje: 1, texto: '50 a 150' },
            { puntaje: 2, texto: '150 a 400' },
            { puntaje: 3, texto: '400 a 1.000' },
            { puntaje: 4, texto: 'Más de 1.000' },
        ],
    },
    {
        id: 'p20', bloque: 'potencial',
        texto: '¿Qué proporción de ese trabajo es repetitivo y sigue siempre el mismo patrón?',
        opciones: [
            { puntaje: 0, texto: 'Menos del 10 %' },
            { puntaje: 1, texto: '10 a 25 %' },
            { puntaje: 2, texto: '25 a 45 %' },
            { puntaje: 3, texto: '45 a 65 %' },
            { puntaje: 4, texto: 'Más del 65 %' },
        ],
    },
    {
        id: 'p21', bloque: 'potencial',
        texto: '¿Cuánto tardan hoy en dar la primera respuesta a un cliente que escribe?',
        opciones: [
            { puntaje: 0, texto: 'Menos de 5 minutos' },
            { puntaje: 1, texto: 'Menos de 1 hora' },
            { puntaje: 2, texto: 'Entre 1 y 4 horas' },
            { puntaje: 3, texto: 'El mismo día' },
            { puntaje: 4, texto: 'Más de un día, o no siempre respondemos' },
        ],
    },
    {
        id: 'p22', bloque: 'potencial',
        texto: '¿Qué pasa con las solicitudes que llegan fuera del horario laboral?',
        opciones: [
            { puntaje: 0, texto: 'Tenemos cobertura 24/7' },
            { puntaje: 1, texto: 'Se atienden con guardias' },
            { puntaje: 2, texto: 'Se responden al día siguiente temprano' },
            { puntaje: 3, texto: 'Se acumulan y se atienden cuando se puede' },
            { puntaje: 4, texto: 'Se pierden' },
        ],
    },
    {
        id: 'p23', bloque: 'potencial',
        texto: '¿Cuántas personas dedican la mayor parte de su jornada a tareas administrativas repetitivas?',
        opciones: [
            { puntaje: 0, texto: 'Ninguna' },
            { puntaje: 1, texto: 'Una' },
            { puntaje: 2, texto: 'Dos o tres' },
            { puntaje: 3, texto: 'Cuatro a seis' },
            { puntaje: 4, texto: 'Más de seis' },
        ],
    },
    {
        id: 'p24', bloque: 'potencial',
        texto: '¿Qué tan urgente es para ti resolver esto?',
        opciones: [
            { puntaje: 0, texto: 'Es curiosidad, sin plazo' },
            { puntaje: 1, texto: 'En algún momento del próximo año' },
            { puntaje: 2, texto: 'En los próximos 6 meses' },
            { puntaje: 3, texto: 'Este trimestre' },
            { puntaje: 4, texto: 'Ya deberíamos haberlo resuelto' },
        ],
    },
];
