import { motion } from 'framer-motion';
import { ImageComparison } from '../ui/ImageComparison';
import { ANTETITULO_COMPARATIVA, TITULO_COMPARATIVA, TRANSFORMACIONES } from '../../data/landing/comparativa';

const IMAGEN_DIA_0 = '/imagen_dia_0.jpg';
const IMAGEN_DIA_90 = '/imagen_dia_90.jpg';

export function Bridge() {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-4"
                >
                    <span className="text-electric-orange font-medium tracking-wide border-b border-electric-orange/30 pb-1">{ANTETITULO_COMPARATIVA}</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-6">{TITULO_COMPARATIVA}</h2>
                    <p className="text-gray-400 mt-3 text-sm">Arrastra para ver la diferencia</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mt-10"
                >
                    <ImageComparison
                        beforeImage={IMAGEN_DIA_0}
                        afterImage={IMAGEN_DIA_90}
                        altBefore="Operación antes de automatizar: procesos manuales, desconectados y sin orden"
                        altAfter="Operación después de 90 días con InteligencIA: flujo automatizado y conectado"
                        labelBefore="Día 0"
                        labelAfter="Día 90"
                        itemsBefore={TRANSFORMACIONES.map((t) => t.antes)}
                        itemsAfter={TRANSFORMACIONES.map((t) => t.despues)}
                    />
                </motion.div>
            </div>
        </section>
    );
}
