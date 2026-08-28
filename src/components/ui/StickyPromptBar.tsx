import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useChatContext } from '../../context/ChatContext';
import { trackCtaClick } from '../../lib/analytics';

export function StickyPromptBar() {
    const [isVisible, setIsVisible] = useState(false);
    const [query, setQuery] = useState('');
    const { openChat, isOpen } = useChatContext();

    useEffect(() => {
        const heroEl = document.getElementById('hero');

        function handleScroll() {
            if (!heroEl) {
                setIsVisible(window.scrollY > window.innerHeight * 0.5);
                return;
            }
            setIsVisible(heroEl.getBoundingClientRect().bottom <= window.innerHeight * 0.5);
        }

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const text = query.trim();
        if (!text) return;
        trackCtaClick('sticky_chat', 'sticky_bar');
        openChat('sticky_bar', text);
        setQuery('');
    }

    return (
        <AnimatePresence>
            {isVisible && !isOpen && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed bottom-4 md:bottom-5 right-4 md:right-6 z-40 w-[calc(100%-2rem)] max-w-[260px]"
                >
                    <form onSubmit={handleSubmit} className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full pl-4 pr-2 py-2 shadow-2xl shadow-black/40">
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Pregúntale a CEREBRO..."
                            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
                        />
                        <button
                            type="submit"
                            disabled={!query.trim()}
                            aria-label="Enviar"
                            className="w-7 h-7 rounded-full bg-electric-orange hover:bg-orange-600 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-default flex-shrink-0"
                        >
                            <ArrowUp className="w-3.5 h-3.5 text-white" />
                        </button>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
