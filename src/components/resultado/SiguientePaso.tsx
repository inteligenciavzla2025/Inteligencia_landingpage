import { Button } from '../ui/Button';
import { trackCtaClick } from '../../lib/analytics';
import { useChatContext } from '../../context/ChatContext';
import {
    CTA_ID_CUADRANTE,
    CTA_LABEL_CUADRANTE,
    construirMensajeChatCuadrante,
    construirMensajeChatSecundario,
} from '../../data/diagnostico/diagnosticosCuadrante';
import type { DiagnosticoResultado } from '../../lib/diagnostico/types';
import type { DiagnosticoContacto } from '../../types/diagnostico';

interface SiguientePasoProps {
    resultado: DiagnosticoResultado;
    contacto: DiagnosticoContacto | null;
}

const LOCATION = 'resultado_panel';

export function SiguientePaso({ resultado, contacto }: SiguientePasoProps) {
    const { openChat } = useChatContext();

    function handlePrimario() {
        trackCtaClick(CTA_ID_CUADRANTE[resultado.cuadrante], LOCATION);
        openChat(CTA_ID_CUADRANTE[resultado.cuadrante], construirMensajeChatCuadrante(contacto, resultado));
    }

    function handleSecundario() {
        trackCtaClick('resultado_hablar_ahora', LOCATION);
        openChat('resultado_hablar_ahora', construirMensajeChatSecundario(contacto, resultado));
    }

    return (
        <div className="flex flex-col items-center gap-3 text-center">
            <Button type="button" variant="glass" size="lg" className="w-full max-w-sm" onClick={handlePrimario}>
                {CTA_LABEL_CUADRANTE[resultado.cuadrante]}
            </Button>
            <Button type="button" variant="outline" size="md" className="w-full max-w-sm" onClick={handleSecundario}>
                Hablar con nosotros ahora
            </Button>
        </div>
    );
}
