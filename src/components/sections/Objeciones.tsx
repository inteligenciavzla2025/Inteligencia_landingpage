import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { trackCtaClick } from '../../lib/analytics';
import { ANTETITULO_OBJECIONES, TITULO_OBJECIONES, OBJECIONES } from '../../data/landing/objeciones';

const LOCATION = 'objeciones';

export function Objeciones() {
    const [abierta, setAbierta] = useState<string | null>(OBJECIONES[0]?.id ?? null);

    function handleDiagnostico(ctaId: string) {
        trackCtaClick(ctaId, LOCATION);
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <section id="objeciones" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <span className="text-electric-orange font-medium tracking-wide border-b border-electric-orange/30 pb-1">{ANTETITULO_OBJECIONES}</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-6">{TITULO_OBJECIONES}</h2>
                </motion.div>

                <div className="space-y-4">
                    {OBJECIONES.map((objecion) => {
                        const abiertaAhora = abierta === objecion.id;
                        return (
                            <div key={objecion.id} className="glass-panel rounded-2xl overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => setAbierta((prev) => (prev === objecion.id ? null : objecion.id))}
                                    aria-expanded={abiertaAhora}
                                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                                >
                                    <span className="font-display font-bold text-white text-base sm:text-lg">{objecion.pregunta}</span>
                                    <ChevronDown className={`w-5 h-5 text-electric-orange flex-shrink-0 transition-transform duration-200 ${abiertaAhora ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence initial={false}>
                                    {abiertaAhora && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 space-y-4">
                                                <p className="text-gray-400 text-sm leading-relaxed">{objecion.respuesta}</p>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDiagnostico(objecion.id)}
                                                >
                                                    Hacer el diagnóstico
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
