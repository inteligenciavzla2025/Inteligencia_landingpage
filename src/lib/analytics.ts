export function trackEvent(name: string, params?: Record<string, unknown>) {
    if (typeof gtag !== 'function') return;
    gtag('event', name, params);
}

export function trackCtaClick(ctaId: string, location: string) {
    trackEvent('cta_click', { cta_id: ctaId, cta_location: location });
}

export function trackChatOpen(source: string) {
    trackEvent('chat_open', { chat_source: source });
}

export function trackChatMessageSent(messageCount: number) {
    trackEvent('chat_message_sent', { message_count: messageCount });
}

export function trackDiagnosticoIniciado() {
    trackEvent('diagnostico_iniciado');
}

export function trackDiagnosticoProgreso(numeroPregunta: number) {
    trackEvent('diagnostico_progreso', { numero_pregunta: numeroPregunta });
}

export function trackDiagnosticoContactoEnviado() {
    trackEvent('diagnostico_contacto_enviado');
}
