import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { useChatContext } from '../../context/ChatContext';
import { trackCtaClick } from '../../lib/analytics';
import { getViewportHeight } from '../../lib/utils';

export function StickyPromptBar() {
    const [isVisible, setIsVisible] = useState(false);
    const [query, setQuery] = useState('');
    // Extra px to add on top of the base "bottom"/"right" offsets: on mobile,
    // browser chrome can make window.innerWidth/innerHeight report a larger
    // layout viewport than what's actually visible, which pushes fixed
    // elements outside the visible area. This tracks that gap to compensate.
    const [chromeOffsetY, setChromeOffsetY] = useState(0);
    const [chromeOffsetX, setChromeOffsetX] = useState(0);
    const { openChat, isOpen } = useChatContext();

    useEffect(() => {
        const heroEl = document.getElementById('hero');

        function handleScroll() {
            const vv = window.visualViewport;
            const vh = getViewportHeight();

            if (vv) {
                const gapY = window.innerHeight - (vv.height + vv.offsetTop);
                const gapX = window.innerWidth - (vv.width + vv.offsetLeft);
                setChromeOffsetY(Math.max(0, Math.round(gapY)));
                setChromeOffsetX(Math.max(0, Math.round(gapX)));
            }

            if (!heroEl) {
                setIsVisible(window.scrollY > vh * 0.5);
                return;
            }
            setIsVisible(heroEl.getBoundingClientRect().bottom <= vh * 0.5);
        }

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.visualViewport?.addEventListener('resize', handleScroll);
        window.visualViewport?.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.visualViewport?.removeEventListener('resize', handleScroll);
            window.visualViewport?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const text = query.trim();
        if (!text) return;
        trackCtaClick('sticky_chat', 'sticky_bar');
        openChat('sticky_bar', text);
        setQuery('');
    }

    function handleMobileButtonClick() {
        trackCtaClick('sticky_chat_mobile', 'sticky_bar');
        openChat('sticky_bar_mobile');
    }

    return (
        <AnimatePresence>
            {isVisible && !isOpen && (
                <>
                    {/* Mobile: compact floating button — avoids mobile browsers' toolbar
                        pushing a taller fixed-bottom input bar outside the visible viewport */}
                    <motion.button
                        type="button"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={handleMobileButtonClick}
                        aria-label="Hablar con CEREBRO"
                        style={{
                            bottom: `calc(1.5rem + ${chromeOffsetY}px)`,
                            right: `calc(1rem + ${chromeOffsetX}px)`,
                        }}
                        className="md:hidden fixed z-40 w-14 h-14 rounded-full bg-electric-orange/90 hover:bg-orange-600 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 flex items-center justify-center"
                    >
                        <MessageCircle className="w-6 h-6 text-white" />
                    </motion.button>

                    {/* Desktop: full prompt bar */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            bottom: `calc(1.25rem + ${chromeOffsetY}px)`,
                            right: `calc(1.5rem + ${chromeOffsetX}px)`,
                        }}
                        className="hidden md:block fixed z-40 w-full max-w-[260px]"
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
                </>
            )}
        </AnimatePresence>
    );
}
