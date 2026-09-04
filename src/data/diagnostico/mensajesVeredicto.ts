import type { NivelNumero } from '../../lib/diagnostico/types';

export const MENSAJE_VEREDICTO_POR_NIVEL: Record<NivelNumero, string> = {
    1: 'Hoy casi todo pasa por manos humanas y hojas sueltas: cada tarea repetitiva le está costando horas al equipo que podrían usarse en crecer el negocio.',
    2: 'Ya hay herramientas digitales en uso, pero siguen operadas una por una: falta conectar las piezas para que trabajen solas.',
    3: 'Varios procesos ya corren sin intervención manual constante: el terreno está listo para sumar capas de inteligencia sobre esa base.',
    4: 'La operación ya combina automatización y datos de forma consistente: el foco ahora es ampliar el alcance, no reconstruir desde cero.',
    5: 'La organización opera con sistemas que deciden y ejecutan con supervisión humana ligera: el desafío pasa a ser mantener ese nivel mientras el negocio crece.',
};
