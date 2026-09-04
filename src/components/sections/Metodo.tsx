import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import { trackCtaClick } from '../../lib/analytics';
import { ANTETITULO_METODO, TITULO_METODO, BAJADA_METODO, FASES_METODO } from '../../data/landing/metodo';

export function Metodo() {
    function handleFormClick() {
        trackCtaClick('metodo_diagnostico', 'metodo');
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <section id="metodo" className="py-24 bg-black/50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-tech-blue font-medium tracking-wide">{ANTETITULO_METODO}</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4">{TITULO_METODO}</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg mt-4">{BAJADA_METODO}</p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    {FASES_METODO.map((fase, index) => (
                        <motion.div
                            key={fase.numero}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative flex flex-col items-center text-center"
                        >
                            <div className="mb-4 relative flex flex-col items-center w-full">
                                <div className="w-12 h-12 rounded-full border-2 border-electric-orange bg-black flex items-center justify-center relative z-10 font-bold text-electric-orange text-sm">
                                    {fase.numero}
                                </div>
                                {index !== FASES_METODO.length - 1 && (
                                    <div className="hidden lg:block absolute top-6 left-1/2 w-full h-[1px] bg-white/10" />
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-white relative z-10">{fase.nombreCerebral}</h3>
                            <p className="text-xs text-tech-blue font-medium mb-3 relative z-10">{fase.subtituloFuncional}</p>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4 relative z-10">{fase.descripcion}</p>

                            <div className="mt-auto w-full pt-3 border-t border-white/10 relative z-10">
                                <p className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">Para avanzar</p>
                                <p className="font-display font-extrabold text-sm text-electric-orange leading-snug">{fase.puertaControl}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-16 flex items-center justify-center"
                >
                    <Button onClick={handleFormClick}>
                        <Calendar className="w-4 h-4" /> Hacer el diagnóstico
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
