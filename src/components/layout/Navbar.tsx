import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { trackCtaClick } from '../../lib/analytics';

const navLinks = [
    { name: 'Soluciones', href: '#services' },
    { name: 'Proceso', href: '#process' },
    { name: 'Nosotros', href: '#about' },
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    // On mobile, a `fixed; left-0; right-0` element can size itself against
    // the browser's layout viewport, which is sometimes wider than what's
    // actually visible — causing real horizontal overflow. Pin the width
    // explicitly to the true visible width instead of trusting auto-sizing.
    const [navWidth, setNavWidth] = useState<number | null>(null);

    function handleFormClick(location: string) {
        trackCtaClick('navbar_form', location);
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        const heroEl = document.getElementById('hero');

        function handleScroll() {
            setNavWidth(window.visualViewport?.width ?? document.body.clientWidth);

            if (!heroEl) {
                setIsScrolled(window.scrollY > 50);
                return;
            }
            setIsScrolled(heroEl.getBoundingClientRect().bottom <= 80);
        }

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        window.visualViewport?.addEventListener('resize', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            window.visualViewport?.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <nav
            style={navWidth ? { width: navWidth } : undefined}
            className={cn(
                "fixed top-0 left-0 right-0 z-40 py-3 transition-all duration-300",
                isScrolled ? "bg-black/70 backdrop-blur-md border-b border-white/5" : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <a href="#" className="flex items-center gap-2 group">
                    <img
                        src="/logo_header.png"
                        alt="InteligencIA Logo"
                        className="w-9 h-9 object-contain drop-shadow-[0_0_8px_rgba(0,123,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(255,107,0,0.5)] transition-all duration-300"
                    />
                    <span className="text-lg font-display font-bold tracking-tight text-white">Inteligenc<span className="text-tech-blue">IA</span></span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-0.5">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium px-2.5 py-1.5 rounded-full border border-transparent text-gray-300 transition-all duration-300 hover:text-white hover:bg-white/5 hover:backdrop-blur-xl hover:border-white/10"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <Button
                        size="sm"
                        onClick={() => handleFormClick('navbar')}
                        className="rounded-2xl bg-electric-orange/20 hover:bg-electric-orange/30 backdrop-blur-xl border border-electric-orange/40 text-white"
                    >
                        Agendar diagnóstico
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/80 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-8 flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-base font-medium px-4 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Button
                                className="w-full rounded-2xl bg-electric-orange/20 hover:bg-electric-orange/30 backdrop-blur-xl border border-electric-orange/40 text-white"
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    handleFormClick('navbar_mobile');
                                }}
                            >
                                Agendar diagnóstico
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
