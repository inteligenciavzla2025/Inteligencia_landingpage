import type { CatalogoProcesosPorSector, Sector } from './types';

export const MIN_CASO_DEFAULT = 6;

export const MIN_CASO_POR_SECTOR: Record<Sector, number> = {
    distribucion: 8,
    servicios_profesionales: 10,
    inmobiliaria: 9,
    retail: 5,
    salud: 12,
    otro: MIN_CASO_DEFAULT,
};

export const CATALOGO_PROCESOS_POR_SECTOR: CatalogoProcesosPorSector = {
    distribucion: [
        { nombre: 'Conciliación automática de pedidos y facturas', impacto: 8, esfuerzo: 4, horasMes: 40, senales: ['personal_repetitivo'] },
        { nombre: 'Seguimiento proactivo de entregas y notificación al cliente', impacto: 7, esfuerzo: 3, horasMes: 25, senales: ['respuesta_lenta', 'fuera_horario'] },
        { nombre: 'Reposición automática de inventario (punto de reorden)', impacto: 9, esfuerzo: 6, horasMes: 35, senales: ['personal_repetitivo'] },
        { nombre: 'Chatbot de estado de pedido 24/7', impacto: 6, esfuerzo: 3, horasMes: 20, senales: ['fuera_horario', 'respuesta_lenta'] },
        { nombre: 'Enrutamiento automático de rutas de reparto', impacto: 8, esfuerzo: 7, horasMes: 30 },
        { nombre: 'Alertas automáticas de quiebre de stock', impacto: 7, esfuerzo: 4, horasMes: 15, senales: ['personal_repetitivo'] },
    ],
    servicios_profesionales: [
        { nombre: 'Agendamiento automático de reuniones y confirmaciones', impacto: 7, esfuerzo: 3, horasMes: 20, senales: ['respuesta_lenta', 'fuera_horario'] },
        { nombre: 'Generación automática de propuestas y cotizaciones', impacto: 8, esfuerzo: 5, horasMes: 30, senales: ['personal_repetitivo'] },
        { nombre: 'Asistente virtual para consultas frecuentes de clientes', impacto: 6, esfuerzo: 4, horasMes: 22, senales: ['fuera_horario', 'respuesta_lenta'] },
        { nombre: 'Facturación y seguimiento de cobros automatizado', impacto: 8, esfuerzo: 4, horasMes: 28, senales: ['personal_repetitivo'] },
        { nombre: 'Onboarding automatizado de nuevos clientes', impacto: 7, esfuerzo: 5, horasMes: 18 },
        { nombre: 'Reportes de horas y rentabilidad por proyecto automatizados', impacto: 6, esfuerzo: 3, horasMes: 15, senales: ['personal_repetitivo'] },
    ],
    inmobiliaria: [
        { nombre: 'Calificación automática de leads entrantes', impacto: 8, esfuerzo: 4, horasMes: 30, senales: ['respuesta_lenta'] },
        { nombre: 'Agendamiento automático de visitas a propiedades', impacto: 7, esfuerzo: 3, horasMes: 22, senales: ['respuesta_lenta', 'fuera_horario'] },
        { nombre: 'Actualización automática de publicaciones en portales inmobiliarios', impacto: 6, esfuerzo: 5, horasMes: 18, senales: ['personal_repetitivo'] },
        { nombre: 'Chatbot de disponibilidad y precios 24/7', impacto: 7, esfuerzo: 4, horasMes: 20, senales: ['fuera_horario', 'respuesta_lenta'] },
        { nombre: 'Generación automática de contratos y documentación', impacto: 8, esfuerzo: 6, horasMes: 25, senales: ['personal_repetitivo'] },
        { nombre: 'Seguimiento automático de leads fríos (nutrición)', impacto: 6, esfuerzo: 3, horasMes: 15 },
    ],
    retail: [
        { nombre: 'Chatbot de atención al cliente para consultas de productos', impacto: 7, esfuerzo: 3, horasMes: 25, senales: ['respuesta_lenta', 'fuera_horario'] },
        { nombre: 'Sincronización automática de stock entre canales', impacto: 9, esfuerzo: 6, horasMes: 35, senales: ['personal_repetitivo'] },
        { nombre: 'Recuperación automática de carritos abandonados', impacto: 8, esfuerzo: 4, horasMes: 20 },
        { nombre: 'Segmentación y envío automático de promociones', impacto: 6, esfuerzo: 4, horasMes: 15, senales: ['personal_repetitivo'] },
        { nombre: 'Gestión automática de cambios y devoluciones', impacto: 7, esfuerzo: 5, horasMes: 22, senales: ['personal_repetitivo'] },
        { nombre: 'Derivación automática a WhatsApp fuera de horario', impacto: 6, esfuerzo: 2, horasMes: 12, senales: ['fuera_horario'] },
    ],
    salud: [
        { nombre: 'Agendamiento y confirmación automática de turnos', impacto: 9, esfuerzo: 4, horasMes: 40, senales: ['respuesta_lenta', 'fuera_horario'] },
        { nombre: 'Recordatorios automáticos para reducir el ausentismo', impacto: 7, esfuerzo: 2, horasMes: 15 },
        { nombre: 'Triage inicial automatizado por chatbot', impacto: 6, esfuerzo: 6, horasMes: 20, senales: ['fuera_horario', 'respuesta_lenta'] },
        { nombre: 'Gestión automática de reprogramaciones y cancelaciones', impacto: 7, esfuerzo: 3, horasMes: 18, senales: ['personal_repetitivo'] },
        { nombre: 'Digitalización y organización automática de historias clínicas', impacto: 8, esfuerzo: 7, horasMes: 30, senales: ['personal_repetitivo'] },
        { nombre: 'Seguimiento automático post-consulta', impacto: 5, esfuerzo: 3, horasMes: 10 },
    ],
    otro: [
        { nombre: 'Chatbot de atención al cliente 24/7', impacto: 7, esfuerzo: 3, horasMes: 22, senales: ['fuera_horario', 'respuesta_lenta'] },
        { nombre: 'Automatización de respuestas a consultas frecuentes', impacto: 6, esfuerzo: 2, horasMes: 15, senales: ['respuesta_lenta'] },
        { nombre: 'Centralización automática de solicitudes en un solo canal', impacto: 7, esfuerzo: 4, horasMes: 20, senales: ['personal_repetitivo'] },
        { nombre: 'Generación automática de reportes operativos', impacto: 6, esfuerzo: 3, horasMes: 12, senales: ['personal_repetitivo'] },
        { nombre: 'Seguimiento automático de tareas pendientes y vencimientos', impacto: 5, esfuerzo: 2, horasMes: 10 },
        { nombre: 'Derivación automática de solicitudes al área correspondiente', impacto: 6, esfuerzo: 3, horasMes: 14, senales: ['personal_repetitivo'] },
    ],
};
