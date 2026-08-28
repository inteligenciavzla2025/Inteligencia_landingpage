import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, MessageCircle, Settings, Building2, LineChart } from 'lucide-react';
import { useChatContext } from '../../context/ChatContext';
import { trackCtaClick } from '../../lib/analytics';

const QUICK_ACTIONS = [
    { icon: MessageCircle, label: 'Automatizar WhatsApp', prompt: 'Quiero automatizar la atención de WhatsApp de mi negocio' },
    { icon: Settings, label: 'Automatizar procesos', prompt: '¿Cómo automatizan procesos con n8n o Make?' },
    { icon: Building2, label: '¿Es para mi pyme?', prompt: 'Tengo una pyme, ¿esto es para mí?' },
    { icon: LineChart, label: 'Ver resultados', prompt: '¿Qué resultados generan para otros clientes?' },
];

export function Hero() {
    const [heroQuery, setHeroQuery] = useState('');
    const { openChat } = useChatContext();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const text = heroQuery.trim();
        if (!text) return;
        trackCtaClick('hero_chat', 'hero');
        openChat('hero_input', text);
        setHeroQuery('');
    }

    function handleQuickAction(label: string, prompt: string) {
        trackCtaClick(`hero_quick_${label}`, 'hero');
        openChat('hero_quick_action', prompt);
    }

    function handleFormLinkClick() {
        trackCtaClick('hero_form', 'hero');
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src="/video/hero-brain.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/40 to-black/10 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl mx-auto"
                >
                    <form onSubmit={handleSubmit} className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl pl-5 pr-3 py-3 shadow-2xl shadow-black/40">
                        <input
                            type="text"
                            value={heroQuery}
                            onChange={e => setHeroQuery(e.target.value)}
                            placeholder="Pregúntale a CEREBRO sobre tu negocio..."
                            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base md:text-lg"
                        />
                        <button
                            type="submit"
                            disabled={!heroQuery.trim()}
                            aria-label="Enviar"
                            className="w-10 h-10 rounded-full bg-electric-orange hover:bg-orange-600 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-default flex-shrink-0"
                        >
                            <ArrowUp className="w-5 h-5 text-white" />
                        </button>
                    </form>

                    <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
                        {QUICK_ACTIONS.map(action => (
                            <button
                                key={action.label}
                                type="button"
                                onClick={() => handleQuickAction(action.label, action.prompt)}
                                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <action.icon className="w-3.5 h-3.5" />
                                {action.label}
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={handleFormLinkClick}
                        className="mt-5 text-sm text-gray-400 hover:text-white transition-colors underline underline-offset-4 decoration-white/20"
                    >
                        o agenda tu diagnóstico directamente
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
