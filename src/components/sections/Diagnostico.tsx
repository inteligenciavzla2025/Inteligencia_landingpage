import { useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { AmbientBackground } from '../ui/AmbientBackground';
import { BarraProgreso } from '../diagnostico/BarraProgreso';
import { BloqueTransicion } from '../diagnostico/BloqueTransicion';
import { PreguntaScreen } from '../diagnostico/PreguntaScreen';
import { FormularioContacto } from '../diagnostico/FormularioContacto';
import type { DatosContacto } from '../diagnostico/FormularioContacto';
import { useQuizFlow } from '../../hooks/useQuizFlow';
import { PREGUNTAS } from '../../data/diagnostico/preguntas';
import { BLOQUES } from '../../data/diagnostico/bloques';
import { mapearRespuestas } from '../../lib/diagnostico/respuestasAdapter';
import { calcularDiagnostico } from '../../lib/diagnostico';
import type { DiagnosticoResultado } from '../../lib/diagnostico';
import { enviarDiagnostico, construirMetaDiagnostico } from '../../lib/enviarDiagnostico';
import { RevelaScroll } from '../resultado/RevelaScroll';
import { Veredicto } from '../resultado/Veredicto';
import { BotonImagenCompartible } from '../resultado/BotonImagenCompartible';
import { RadarMadurez } from '../resultado/RadarMadurez';
import { DispersionProcesos } from '../resultado/DispersionProcesos';
import { SiguientePaso } from '../resultado/SiguientePaso';
import { RESULTADOS_EJEMPLO_POR_CUADRANTE } from '../../data/diagnostico/resultadosEjemplo';

export function Diagnostico() {
    const {
        paso, currentStep, progresoPct, textoAliento, respuestaActual,
        next, back, answerCurrent, state, setResultado, resetState,
    } = useQuizFlow();

    const handleSubmitContacto = useCallback((datosContacto: DatosContacto) => {
        const respuestas = mapearRespuestas(state.answers);
        const resultado: DiagnosticoResultado = calcularDiagnostico({
            respuestas,
            metadata: { sector: datosContacto.sector, empleados: datosContacto.rangoEmpleados },
        });
        setResultado(resultado);
        // Fire-and-forget: no se espera esta promesa, no bloquea que se muestre el resultado.
        enviarDiagnostico({
            contacto: datosContacto,
            respuestas: state.answers,
            resultado,
            meta: construirMetaDiagnostico(),
        });
    }, [state.answers, setResultado]);

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <AmbientBackground />

            <div className="container mx-auto px-6 relative z-10">
                {state.resultado ? (
                    <div className="max-w-3xl mx-auto space-y-6">
                        <RevelaScroll><Veredicto resultado={state.resultado} /></RevelaScroll>
                        <BotonImagenCompartible resultado={state.resultado} />
                        <RevelaScroll><RadarMadurez resultado={state.resultado} /></RevelaScroll>
                        <RevelaScroll><DispersionProcesos resultado={state.resultado} /></RevelaScroll>
                        <RevelaScroll><SiguientePaso resultado={state.resultado} /></RevelaScroll>
                        <div className="text-center pt-2">
                            <Button type="button" variant="ghost" size="sm" onClick={resetState}>
                                Repetir el diagnóstico
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-xl mx-auto">
                        <div className="text-center mb-10">
                            <span className="text-electric-orange font-medium tracking-wide text-sm">Diagnóstico gratuito</span>
                            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3">
                                ¿Qué tan lista está tu empresa para automatizar con IA?
                            </h2>
                            <p className="text-gray-400 mt-3">24 preguntas, unos 8 minutos, resultado al instante.</p>
                        </div>

                        <BarraProgreso
                            progresoPct={progresoPct}
                            textoAliento={textoAliento}
                            onBack={back}
                            mostrarVolver={currentStep > 0}
                        />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="w-full"
                            >
                                {paso.tipo === 'transicion' && (
                                    <BloqueTransicion bloque={BLOQUES.find((b) => b.key === paso.bloque)!} onContinuar={next} />
                                )}
                                {paso.tipo === 'pregunta' && (
                                    <PreguntaScreen
                                        pregunta={PREGUNTAS.find((p) => p.id === paso.id)!}
                                        valorSeleccionado={respuestaActual}
                                        onAnswer={answerCurrent}
                                        onNext={next}
                                    />
                                )}
                                {paso.tipo === 'contacto' && (
                                    <GlassCard hoverEffect={false} className="p-6 sm:p-10">
                                        <FormularioContacto onSubmitContacto={handleSubmitContacto} />
                                    </GlassCard>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {import.meta.env.DEV && (
                            <div className="mt-10 pt-6 border-t border-white/10">
                                <p className="text-xs text-white/30 mb-2 text-center">Solo dev: previsualizar resultado</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {(Object.keys(RESULTADOS_EJEMPLO_POR_CUADRANTE) as (keyof typeof RESULTADOS_EJEMPLO_POR_CUADRANTE)[]).map((cuadrante) => (
                                        <Button
                                            key={cuadrante}
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setResultado(RESULTADOS_EJEMPLO_POR_CUADRANTE[cuadrante])}
                                        >
                                            {cuadrante}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
