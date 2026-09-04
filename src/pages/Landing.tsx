import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { Productos } from '../components/sections/Productos';
import { Bridge } from '../components/sections/Bridge';
import { Metodo } from '../components/sections/Metodo';
import { Objeciones } from '../components/sections/Objeciones';
import { ChatModal } from '../components/ui/ChatModal';
import { StickyPromptBar } from '../components/ui/StickyPromptBar';
import { ChatProvider } from '../context/ChatContext';
import { useScrollDepth } from '../hooks/useScrollDepth';

// El cuestionario (24 preguntas + gráficos D3 del resultado) se carga lazy
// para que ese peso no infle el bundle inicial de la landing, aunque ahora
// se renderice embebido sin condición de ruta.
const Diagnostico = lazy(() =>
    import('../components/sections/Diagnostico').then((m) => ({ default: m.Diagnostico }))
);

function DiagnosticoFallback() {
    return <div className="py-24 text-center text-white/40 text-sm">Cargando diagnóstico…</div>;
}

export function Landing() {
    useScrollDepth();

    return (
        <div className="bg-black min-h-screen text-white selection:bg-electric-orange/30">
            <Helmet>
                <title>InteligencIA</title>
                <meta name="description" content="Cosechamos tiempo y escalamos tus ventas eliminando procesos manuales con IA. Desarrollo de software crítico, chatbots inteligentes y consultoría estratégica." />
                <meta name="theme-color" content="#020202" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://inteligencia.live/" />
                <meta property="og:title" content="InteligencIA | Tu negocio en modo inteligente" />
                <meta property="og:description" content="Automatización end-to-end y desarrollo de software a medida. Escala tus operaciones sin aumentar tu equipo." />
                <meta property="og:image" content="https://inteligencia.live/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://inteligencia.live/" />
                <meta property="twitter:title" content="InteligencIA | Tu negocio en modo inteligente" />
                <meta property="twitter:description" content="Automatización end-to-end y desarrollo de software a medida. Escala tus operaciones sin aumentar tu equipo." />
                <meta property="twitter:image" content="https://inteligencia.live/og-image.jpg" />
            </Helmet>

            <ChatProvider>
                <Navbar />

                <main>
                    <Hero />
                    <Productos />
                    <Bridge />
                    <Metodo />
                    <Objeciones />
                    <Suspense fallback={<DiagnosticoFallback />}>
                        <Diagnostico />
                    </Suspense>
                </main>

                <Footer />
                <ChatModal />
                <StickyPromptBar />
            </ChatProvider>
        </div>
    );
}
