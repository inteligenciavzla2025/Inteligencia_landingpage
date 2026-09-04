import type { Sector } from '../../lib/diagnostico/types';

export interface OpcionSector {
    value: Sector;
    label: string;
}

export const SECTORES: OpcionSector[] = [
    { value: 'distribucion', label: 'Distribución / Logística' },
    { value: 'servicios_profesionales', label: 'Servicios profesionales' },
    { value: 'inmobiliaria', label: 'Inmobiliaria' },
    { value: 'retail', label: 'Retail / Comercio' },
    { value: 'salud', label: 'Salud' },
    { value: 'otro', label: 'Otro' },
];
