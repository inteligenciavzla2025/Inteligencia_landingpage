export interface FaseMetodo {
    numero: string;
    nombreCerebral: string;
    subtituloFuncional: string;
    descripcion: string;
    puertaControl: string;
}

export const ANTETITULO_METODO = 'CÓMO TRABAJAMOS';
export const TITULO_METODO = 'Cinco fases. Cero saltos a ciegas.';
export const BAJADA_METODO = 'En cada paso hay un resultado medible que tienes que aprobar antes de que sigamos. Nada sale a producción sin haberlo demostrado primero.';

export const FASES_METODO: FaseMetodo[] = [
    {
        numero: '01',
        nombreCerebral: 'Percepción',
        subtituloFuncional: 'Diagnóstico',
        descripcion: 'Medimos tu operación y elegimos juntos un solo proceso.',
        puertaControl: 'Retorno proyectado con payback menor a 6 meses',
    },
    {
        numero: '02',
        nombreCerebral: 'Sinapsis',
        subtituloFuncional: 'Diseño',
        descripcion: 'Rediseñamos el proceso antes de automatizarlo y definimos qué decide la máquina y qué decide tu equipo.',
        puertaControl: 'Criterios de aceptación firmados con números',
    },
    {
        numero: '03',
        nombreCerebral: 'Espejo',
        subtituloFuncional: 'Piloto en paralelo',
        descripcion: 'El sistema procesa tus casos reales en paralelo con tu equipo, sin hablar con ningún cliente tuyo.',
        puertaControl: 'Precisión sobre tus propios casos por encima del umbral',
    },
    {
        numero: '04',
        nombreCerebral: 'Reflejo',
        subtituloFuncional: 'Producción supervisada',
        descripcion: 'Sale en vivo con aprobación humana en el 100 % de los casos, y gana autonomía por niveles.',
        puertaControl: 'Tres semanas estables y mejora medible frente al punto de partida',
    },
    {
        numero: '05',
        nombreCerebral: 'Consolidación',
        subtituloFuncional: 'Transferencia',
        descripcion: 'Capacitamos a tu equipo y te entregamos el sistema, la documentación y las credenciales.',
        puertaControl: 'Operadores certificados y acta de entrega',
    },
];
