/**
 * Fondo ambiente: grilla sutil + dos glows radiales en los colores de marca
 * (electric-orange / tech-blue). Adaptado de un snippet de referencia que
 * traía tema claro y acento violeta — acá va oscuro y en paleta propia.
 */
export function AmbientBackground() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(255,107,0,0.14),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_0%_700px,rgba(0,123,255,0.12),transparent)]" />
        </div>
    );
}
