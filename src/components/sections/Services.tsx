import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, Settings, Terminal, LineChart, Bot, Zap, Code, BarChart } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

const services = [
    {
        icon: MessageSquare,
        title: "Ventas automáticas",
        description: "Bots de WhatsApp y CRM integrados que califican leads 24/7. Convierte conversaciones en clientes sin intervención humana.",
        tags: ["WhatsApp API", "CRM", "Lead Scoring"]
    },
    {
        icon: Settings,
        title: "Procesos operativos",
        description: "Automatizamos tareas repetitivas con n8n y Make. Recupera +20 horas semanales de tu equipo eliminando la carga manual.",
        tags: ["n8n", "Make", "Workflow"]
    },
    {
        icon: Terminal,
        title: "Software a medida",
        description: "Desde MVPs ágiles hasta sistemas críticos complejos. Desarrollo Full Stack escalable y seguro para tu core business.",
        tags: ["React", "Node.js", "Cloud"]
    },
    {
        icon: LineChart,
        title: "Consultoría estratégica",
        description: "Análisis de oportunidades tecnológicas. Te decimos exactamente dónde aplicar IA para maximizar el ROI.",
        tags: ["Auditoría", "Roadmap", "Growth"]
    }
];

export function Services() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="services" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-electric-orange font-medium tracking-wide border-b border-electric-orange/30 pb-1">NUESTROS PILARES</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">Soluciones que <span className="text-electric-orange">escalan</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Infraestructura digital diseñada para crecimiento exponencial. No solo código, sino estrategia.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16"
                >
                    {[
                        { icon: Zap, label: "Automatización" },
                        { icon: Code, label: "Desarrollo" },
                        { icon: Bot, label: "Agentes IA" },
                        { icon: BarChart, label: "Estrategia" }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors">
                            <item.icon className="text-gray-300 w-6 h-6" />
                            <span className="font-medium text-gray-300">{item.label}</span>
                        </div>
                    ))}
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <GlassCard
                            key={index}
                            className="h-full flex flex-col justify-between group"
                        >
                            <div>
                                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/5 group-hover:border-electric-orange/30">
                                    <service.icon className="w-7 h-7 text-white group-hover:text-electric-orange transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-electric-orange transition-colors">{service.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm mb-6">{service.description}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {service.tags.map((tag, i) => (
                                    <span key={i} className="text-xs font-medium px-2 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
