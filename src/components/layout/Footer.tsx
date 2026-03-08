import { Linkedin, Twitter, Mail, Instagram, Facebook } from 'lucide-react';

const TikTok = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/inteligencia-services-8608313b5/" },
    { icon: Instagram, href: "https://www.instagram.com/soy.inteligencia/" },
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61584667210053" },
    { icon: TikTok, href: "https://www.tiktok.com/@soy.inteligencia?lang=en" },
    { icon: Twitter, href: "https://x.com/inteligenc14WG" },
];

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-2">
                        <a href="#" className="text-2xl font-bold tracking-tight text-white mb-6 block">
                            Inteligenc<span className="text-electric-orange">IA</span>
                        </a>
                        <p className="text-gray-300 max-w-sm mb-8">
                            Menos trabajo manual, más crecimiento. Arquitectura de automatización diseñada para potenciar y escalar las operaciones de tu empresa.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, i) => (
                                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-electric-orange hover:text-white transition-all">
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Soluciones</h4>
                        <ul className="space-y-4 text-gray-300">
                            <li><a href="#" className="hover:text-electric-orange transition-colors">Automatización de procesos</a></li>
                            <li><a href="#" className="hover:text-electric-orange transition-colors">Software a medida</a></li>
                            <li><a href="#" className="hover:text-electric-orange transition-colors">Bots con IA</a></li>
                            <li><a href="#" className="hover:text-electric-orange transition-colors">Consultoría estratégica</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Contacto</h4>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-center gap-2">
                                <Mail size={16} className="text-electric-orange" />
                                <span>inteligenciavzla2025@gmail.com</span>
                            </li>
                            <li>Caracas, Venezuela (Remote First)</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} InteligencIA. Todos los derechos reservados.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white transition-colors">Términos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
