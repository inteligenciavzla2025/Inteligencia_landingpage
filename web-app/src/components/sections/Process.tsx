import { motion } from 'framer-motion';

const steps = [
    {
        number: "01",
        title: "Análisis & estrategia",
        description: "Auditamos tus procesos actuales e identificamos los cuellos de botella que frenan tu crecimiento."
    },
    {
        number: "02",
        title: "Prototipado ágil",
        description: "Diseñamos la solución (software o automatización) y presentamos un MVP funcional en semanas, no meses."
    },
    {
        number: "03",
        title: "Implementación",
        description: "Desarrollo e integración en tu ecosistema digital. Pruebas rigurosas para asegurar estabilidad."
    },
    {
        number: "04",
        title: "Escalado",
        description: "Optimización continua basada en datos. Tu sistema evoluciona a medida que tu negocio crece."
    }
];

export function Process() {
    return (
        <section id="process" className="py-24 bg-black/50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-tech-blue font-medium tracking-wide">CÓMO TRABAJAMOS</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4">Metodología <span className="text-white">probada</span></h2>
                </motion.div>

                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative flex flex-col items-center text-center"
                        >
                            <div className="mb-6 relative flex flex-col items-center w-full">
                                <span className="text-6xl font-black text-white/5 absolute -top-4 left-1/2 -translate-x-1/2 select-none z-0">
                                    {step.number}
                                </span>
                                <div className="w-4 h-4 rounded-full bg-electric-orange relative z-10 mb-6" />
                                {index !== steps.length - 1 && (
                                    <div className="hidden md:block absolute top-2 left-1/2 w-full h-[1px] bg-gradient-to-r from-electric-orange to-transparent opacity-30" />
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 relative z-10">{step.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed relative z-10">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
