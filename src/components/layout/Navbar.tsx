import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

    function handleFormClick(location: string) {
        trackCtaClick('navbar_form', location);
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-transparent py-3">
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
                        className="md:hidden bg-black/95 border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-gray-300 hover:text-white"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Button
                                className="w-full"
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
