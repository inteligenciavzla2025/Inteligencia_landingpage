export interface OpcionRangoEmpleados {
    value: string;
    label: string;
}

// Labels libres — no participan en ninguna fórmula del scoring engine
// (ver DiagnosticoMetadata.empleados).
export const RANGOS_EMPLEADOS: OpcionRangoEmpleados[] = [
    { value: '1-10', label: '1 a 10 empleados' },
    { value: '11-50', label: '11 a 50 empleados' },
    { value: '51-200', label: '51 a 200 empleados' },
    { value: '201-500', label: '201 a 500 empleados' },
    { value: '500+', label: 'Más de 500 empleados' },
];
