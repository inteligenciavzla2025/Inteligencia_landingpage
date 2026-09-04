import type { BloqueInfo } from './tipos';

export const BLOQUES: BloqueInfo[] = [
    {
        key: 'datos', titulo: 'Datos',
        lineas: [
            'Empecemos por los datos: la materia prima de cualquier automatización o modelo de IA.',
            'Si la información está dispersa o desactualizada, ninguna herramienta puede confiar en ella.',
        ],
        preguntaIds: ['p1', 'p2', 'p3'],
    },
    {
        key: 'procesos', titulo: 'Procesos',
        lineas: [
            'Ahora, los procesos operativos del día a día.',
            'Un proceso sin documentar es un proceso que no se puede automatizar de forma confiable.',
        ],
        preguntaIds: ['p4', 'p5', 'p6'],
    },
    {
        key: 'tecnologia', titulo: 'Tecnología',
        lineas: [
            'Hablemos de la infraestructura tecnológica actual.',
            'Los sistemas que se usan hoy determinan qué tan rápido y qué tan barato se puede escalar con IA.',
        ],
        preguntaIds: ['p7', 'p8', 'p9'],
    },
    {
        key: 'talento', titulo: 'Talento',
        lineas: [
            'Ahora, el equipo detrás de la operación.',
            'La mejor tecnología rinde poco si nadie sabe operarla o tiene tiempo para hacerlo.',
        ],
        preguntaIds: ['p10', 'p11', 'p12'],
    },
    {
        key: 'gobierno', titulo: 'Gobierno',
        lineas: [
            'Sigamos con el gobierno de datos y del uso de inteligencia artificial.',
            'Sin reglas claras de uso y supervisión, automatizar puede generar más riesgo del que resuelve.',
        ],
        preguntaIds: ['p13', 'p14', 'p15'],
    },
    {
        key: 'economia', titulo: 'Economía',
        lineas: [
            'Ahora, el caso de negocio detrás de la automatización.',
            'Sin un vínculo claro entre inversión y retorno, cualquier iniciativa de IA se queda en piloto.',
        ],
        preguntaIds: ['p16', 'p17', 'p18'],
    },
    {
        key: 'potencial', titulo: 'Potencial',
        lineas: [
            'Última sección: el potencial de automatización de la operación.',
            'Estas preguntas miden volumen, repetición y fricción operativa: la base para estimar las horas recuperables.',
        ],
        preguntaIds: ['p19', 'p20', 'p21', 'p22', 'p23', 'p24'],
    },
];
