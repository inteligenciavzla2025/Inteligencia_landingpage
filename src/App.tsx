import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Bridge } from './components/sections/Bridge';
import { Process } from './components/sections/Process';
import { LeadCapture } from './components/sections/LeadCapture';
import { ChatBot } from './components/ui/ChatBot';

function App() {
    return (
        <HelmetProvider>
            <div className="bg-black min-h-screen text-white selection:bg-electric-orange/30">
                <Helmet>
                    <title>InteligencIA</title>
                    <meta name="description" content="Cosechamos tiempo y escalamos tus ventas eliminando procesos manuales con IA. Desarrollo de software crítico, chatbots inteligentes y consultoría estratégica." />
                    <meta name="theme-color" content="#000000" />

                    {/* Open Graph / Facebook */}
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://inteligencia.la/" />
                    <meta property="og:title" content="InteligencIA | Tu negocio en modo inteligente" />
                    <meta property="og:description" content="Automatización end-to-end y desarrollo de software a medida. Escala tus operaciones sin aumentar tu equipo." />
                    <meta property="og:image" content="https://inteligencia.la/og-image.jpg" />

                    {/* Twitter */}
                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://inteligencia.la/" />
                    <meta property="twitter:title" content="InteligencIA | Tu negocio en modo inteligente" />
                    <meta property="twitter:description" content="Automatización end-to-end y desarrollo de software a medida. Escala tus operaciones sin aumentar tu equipo." />
                    <meta property="twitter:image" content="https://inteligencia.la/og-image.jpg" />
                </Helmet>

                <Navbar />

                <main>
                    <Hero />
                    <Services />
                    <Bridge />
                    <Process />
                    <LeadCapture />
                </main>

                <Footer />
                <ChatBot />
            </div>
        </HelmetProvider>
    )
}

export default App
