import { EJES_RADAR, puntoHexagono } from './geometria';
import { PROMEDIO_MERCADO } from '../../data/diagnostico/promedioMercado';
import type { DiagnosticoResultado } from '../diagnostico/types';

const ANCHO = 1080;
const ALTO = 1920;
const RADAR_CX = 540;
const RADAR_CY = 1000;
const RADAR_RADIO = 340;

function dibujarFondo(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#020202';
    ctx.fillRect(0, 0, ANCHO, ALTO);

    const gradiente = ctx.createRadialGradient(RADAR_CX, 600, 0, RADAR_CX, 600, 900);
    gradiente.addColorStop(0, 'rgba(255,107,0,0.12)');
    gradiente.addColorStop(1, 'rgba(255,107,0,0)');
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, ANCHO, ALTO);
}

function dibujarMarca(ctx: CanvasRenderingContext2D) {
    ctx.font = '600 32px Inter';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.textAlign = 'left';
    ctx.fillText('InteligencIA · Diagnóstico IA', 80, 100);
}

function dibujarNivel(ctx: CanvasRenderingContext2D, resultado: DiagnosticoResultado) {
    ctx.textAlign = 'center';
    ctx.font = '900 220px Montserrat';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(String(resultado.nivel.numero), RADAR_CX, 420);

    ctx.font = '800 56px Montserrat';
    ctx.fillStyle = '#FF6B00';
    ctx.fillText(resultado.nivel.nombre, RADAR_CX, 520);
}

function trazarPoligonoHexagono(
    ctx: CanvasRenderingContext2D,
    puntajes: Record<string, number>
) {
    ctx.beginPath();
    EJES_RADAR.forEach((dim, i) => {
        const { x, y } = puntoHexagono(i, puntajes[dim], RADAR_RADIO, RADAR_CX, RADAR_CY);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.closePath();
}

function dibujarRadar(ctx: CanvasRenderingContext2D, resultado: DiagnosticoResultado) {
    // Anillos guía (aproximación circular a escala decorativa).
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 2;
    for (const nivel of [20, 40, 60, 80, 100]) {
        ctx.beginPath();
        ctx.arc(RADAR_CX, RADAR_CY, (nivel / 100) * RADAR_RADIO, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Promedio del mercado: punteado, sin relleno.
    trazarPoligonoHexagono(ctx, PROMEDIO_MERCADO);
    ctx.setLineDash([12, 9]);
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.setLineDash([]);

    // Usuario: relleno + borde sólido.
    trazarPoligonoHexagono(ctx, resultado.puntajesPorDimension);
    ctx.fillStyle = 'rgba(255,107,0,0.25)';
    ctx.fill();
    ctx.strokeStyle = '#FF6B00';
    ctx.lineWidth = 5;
    ctx.stroke();
}

function dibujarHoras(ctx: CanvasRenderingContext2D, resultado: DiagnosticoResultado) {
    ctx.textAlign = 'center';
    ctx.font = '800 64px Montserrat';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(
        `${resultado.horasRecuperables.min}–${resultado.horasRecuperables.max} hs/mes recuperables`,
        RADAR_CX,
        1650
    );
}

function dibujarPie(ctx: CanvasRenderingContext2D) {
    ctx.textAlign = 'center';
    ctx.font = '500 28px Inter';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText('Hacé tu diagnóstico gratis en inteligencia-ia.com', RADAR_CX, 1850);
}

/**
 * Genera la imagen compartible (1080x1920) como PNG. Se dibuja en un canvas
 * en memoria, nunca agregado al DOM. Redibuja el hexágono con la misma
 * trigonometría que usa el radar SVG en pantalla (geometria.ts) — no
 * convierte el SVG a canvas, así que no hace falta ninguna librería.
 */
export async function generarImagenResultado(resultado: DiagnosticoResultado): Promise<Blob> {
    // Gotcha: aunque Inter/Montserrat ya están cargadas por <link> para el
    // resto del sitio, el primer dibujo en un canvas puede correr antes de
    // que la fuente termine de parsearse — sin este await, ese primer dibujo
    // podría caer en una fuente del sistema en vez de la marca.
    await document.fonts.ready;

    const canvas = document.createElement('canvas');
    canvas.width = ANCHO;
    canvas.height = ALTO;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No se pudo obtener el contexto 2D del canvas');

    dibujarFondo(ctx);
    dibujarMarca(ctx);
    dibujarNivel(ctx, resultado);
    dibujarRadar(ctx, resultado);
    dibujarHoras(ctx, resultado);
    dibujarPie(ctx);

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error('canvas.toBlob devolvió null'));
        }, 'image/png');
    });
}

/** Dispara la descarga del blob con el nombre de archivo dado. */
export function descargarImagenResultado(blob: Blob, nombreArchivo: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
