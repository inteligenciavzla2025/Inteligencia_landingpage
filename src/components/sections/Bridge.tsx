import { motion } from 'framer-motion';
import { XCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export function Bridge() {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Before State */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 md:order-1"
                    >
                        <GlassCard className="border-red-500/20 bg-red-500/5 relative overflow-hidden">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
                            <h3 className="text-2xl font-bold mb-6 text-red-100 flex items-center gap-3">
                                <XCircle className="text-red-500" />
                                El caos actual
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Procesos manuales lentos y propensos a error",
                                    "Leads perdidos por falta de seguimiento inmediato",
                                    "Sistemas desconectados que duplican trabajo",
                                    "Equipo saturado en tareas operativas básicas"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-red-200/70">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500/50" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </GlassCard>
                    </motion.div>

                    {/* Transformation Arrow (Mobile only, or center layout for desktop if redesigned) */}
                    <div className="hidden md:flex justify-center order-1 md:order-2 absolute left-1/2 -translate-x-1/2 z-10">
                        <div className="w-12 h-12 rounded-full bg-black border border-white/20 flex items-center justify-center">
                            <ArrowRight className="text-white" />
                        </div>
                    </div>

                    {/* After State */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="order-1 md:order-3"
                    >
                        <GlassCard className="border-electric-orange/30 bg-electric-orange/5 relative overflow-hidden">
                            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-electric-orange/10 rounded-full blur-3xl pointer-events-none" />
                            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                <CheckCircle className="text-electric-orange" />
                                Modo InteligencIA
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Automatización end-to-end de flujos de trabajo",
                                    "Respuesta instantánea 24/7 a cada oportunidad",
                                    "Ecosistema de datos unificado y en tiempo real",
                                    "Equipo enfocado en estrategia y creatividad"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-electric-orange" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
