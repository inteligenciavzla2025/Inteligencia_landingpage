import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { generarImagenResultado, descargarImagenResultado } from '../../lib/resultado/imagenCompartible';
import { trackEvent } from '../../lib/analytics';
import type { DiagnosticoResultado } from '../../lib/diagnostico/types';

interface BotonImagenCompartibleProps {
    resultado: DiagnosticoResultado;
}

export function BotonImagenCompartible({ resultado }: BotonImagenCompartibleProps) {
    const [cargando, setCargando] = useState(false);

    async function handleClick() {
        setCargando(true);
        try {
            const blob = await generarImagenResultado(resultado);
            descargarImagenResultado(blob, `diagnostico-inteligencia-nivel-${resultado.nivel.numero}.png`);
            trackEvent('resultado_imagen_descargada', { cuadrante: resultado.cuadrante });
        } finally {
            setCargando(false);
        }
    }

    return (
        <div className="flex justify-center">
            <Button type="button" variant="outline" size="sm" onClick={handleClick} disabled={cargando}>
                {cargando ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Generando imagen...</>
                ) : (
                    <><Download className="w-4 h-4" /> Descargar para Instagram</>
                )}
            </Button>
        </div>
    );
}
