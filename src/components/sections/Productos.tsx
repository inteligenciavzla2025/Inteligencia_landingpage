import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { trackCtaClick } from '../../lib/analytics';
import { cn } from '../../lib/utils';
import {
    ANTETITULO_PRODUCTOS, TITULO_PRODUCTOS, BAJADA_PRODUCTOS,
    PRODUCTOS_ESCALERA,
} from '../../data/landing/productos';
import type { ProductoEscalera } from '../../data/landing/productos';

const LOCATION = 'productos';

export function Productos() {
    function handleClick(producto: ProductoEscalera) {
        trackCtaClick(producto.ctaId, LOCATION);
        if (producto.accion === 'diagnostico') {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        } else if (producto.catalogoUrl) {
            window.open(producto.catalogoUrl, '_blank', 'noopener,noreferrer');
        }
    }

    return (
        <section id="productos" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-electric-orange font-medium tracking-wide border-b border-electric-orange/30 pb-1">{ANTETITULO_PRODUCTOS}</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">{TITULO_PRODUCTOS}</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">{BAJADA_PRODUCTOS}</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14">
                    {PRODUCTOS_ESCALERA.map((producto, index) => (
                        <motion.div
                            key={producto.numero}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <GlassCard
                                hoverEffect={false}
                                className={cn(
                                    'h-full flex flex-col justify-between',
                                    producto.destacado && 'border-electric-orange/50 bg-electric-orange/5'
                                )}
                            >
                                <div>
                                    <span className={cn(
                                        'font-display font-black text-3xl',
                                        producto.destacado ? 'text-electric-orange' : 'text-white/20'
                                    )}>
                                        {producto.numero}
                                    </span>
                                    <h3 className="text-xl font-bold mt-3 mb-1">{producto.nombre}</h3>
                                    <p className="text-xs text-tech-blue font-medium mb-4">{producto.meta}</p>
                                    <p className="text-gray-400 leading-relaxed text-sm mb-6">{producto.descripcion}</p>
                                </div>
                                <Button
                                    type="button"
                                    variant={producto.destacado ? 'glass' : 'outline'}
                                    size="md"
                                    className="w-full"
                                    onClick={() => handleClick(producto)}
                                >
                                    {producto.boton}
                                </Button>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
