import { motion } from 'framer-motion';
import { ArrowRight, Bot, Zap, Code, BarChart } from 'lucide-react';
import { Button } from '../ui/Button';

export function Hero() {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-hero-gradient opacity-40 pointer-events-none" />
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-electric-orange/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-tech-blue/10 rounded-full blur-[100px] animate-pulse delay-1000" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-gray-300">Disponible para nuevos proyectos</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight"
                >
                    Tu negocio en <span className="text-gradient-blue">modo inteligente</span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 text-4xl md:text-6xl mt-2 block">
                        Automatización y software a medida
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
                >
                    Tu operación en piloto automático. IA para eliminar procesos manuales y escalar ventas de forma exponencial.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Button size="lg" className="w-full sm:w-auto group" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                        Activar piloto automático
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>

                {/* Feature Grid Mini */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
                >
                    {[
                        { icon: Zap, label: "Automatización" },
                        { icon: Code, label: "Desarrollo" },
                        { icon: Bot, label: "Agentes IA" },
                        { icon: BarChart, label: "Estrategia" }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <item.icon className="text-electric-orange w-6 h-6" />
                            <span className="font-medium text-gray-300">{item.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
