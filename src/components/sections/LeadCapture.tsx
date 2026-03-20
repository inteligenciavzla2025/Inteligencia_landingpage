import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { PhoneInput, guessCountryByPartialPhoneNumber } from 'react-international-phone';
import 'react-international-phone/style.css';

function isValidWhatsAppNumber(phone: string): boolean {
    if (!phone || phone.length < 7) return false;
    const result = guessCountryByPartialPhoneNumber({ phone });
    if (!result?.country) return false;
    // Strip non-digits and check minimum length (dial code + at least 6 digits)
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 8;
}

// Validation Schema
const formSchema = z.object({
    name: z.string().min(2, "El nombre es muy corto"),
    company: z.string().min(2, "Ingresa el nombre de tu empresa"),
    email: z.string().email("Email inválido"),
    phone: z.string().refine(isValidWhatsAppNumber, {
        message: "Número de WhatsApp inválido",
    }),
});

type FormData = z.infer<typeof formSchema>;

import confetti from 'canvas-confetti';

// ... (imports)

export function LeadCapture() {
    const [isSuccess, setIsSuccess] = useState(false);
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = async (data: FormData) => {
        try {
            // Enviar datos a nuestra nueva Serverless Function (Puente Seguro)
            const response = await fetch("/api/lead", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                console.error("Error al enviar a n8n:", await response.text());
                // Handle non-200 responses if needed, but we proceed to success animation for UX
            }

            // Trigger confetti
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FF6B00', '#007BFF', '#ffffff']
            });

            setIsSuccess(true);
        } catch (error) {
            console.error("Error de conexión:", error);
            // Handle error, maybe fallback to success for UX so user doesn't panic
            setIsSuccess(true);
        }
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black to-black pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <GlassCard className="max-w-4xl mx-auto p-0 grid md:grid-cols-2">
                    <div className="p-10 flex flex-col justify-center bg-white/5">
                        <h3 className="text-3xl font-bold mb-6">Agenda tu <br /> <span className="text-electric-orange">Diagnóstico express</span></h3>
                        <p className="text-gray-400 mb-8">
                            Descubre en 15 minutos dónde está perdiendo dinero tu empresa y cómo la automatización puede solucionarlo.
                        </p>
                        <ul className="space-y-3 mb-8">
                            {["Análisis de procesos clave", "Estimación de ROI", "Roadmap de implementación"].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                    <CheckCircle size={16} className="text-tech-blue" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-10 bg-black/40">
                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-10"
                                >
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                                        <CheckCircle className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-2">¡Solicitud recibida!</h4>
                                    <p className="text-gray-400 mb-6">
                                        Te hemos enviado un WhatsApp para coordinar el horario de la llamada.
                                    </p>
                                    <Button variant="outline" onClick={() => setIsSuccess(false)}>Volver</Button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="text-sm font-medium text-gray-400 mb-1 block">Nombre</label>
                                        <input
                                            {...register("name")}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-orange focus:ring-1 focus:ring-electric-orange outline-none transition-all placeholder:text-gray-600"
                                            placeholder="Tu nombre"
                                        />
                                        {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-400 mb-1 block">Nombre de la empresa</label>
                                        <input
                                            {...register("company")}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-orange focus:ring-1 focus:ring-electric-orange outline-none transition-all placeholder:text-gray-600"
                                            placeholder="Tu empresa"
                                        />
                                        {errors.company && <span className="text-red-500 text-xs mt-1">{errors.company.message}</span>}
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-400 mb-1 block">Email corporativo</label>
                                        <input
                                            {...register("email")}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-orange focus:ring-1 focus:ring-electric-orange outline-none transition-all placeholder:text-gray-600"
                                            placeholder="ejemplo@empresa.com"
                                        />
                                        {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                                    </div>

                                    <div className="relative">
                                        <label className="text-sm font-medium text-gray-400 mb-1 block">Teléfono (WhatsApp)</label>
                                        <Controller
                                            name="phone"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <PhoneInput
                                                    defaultCountry="ve"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    inputClassName="!bg-transparent !text-white !border-0 !outline-none !text-base placeholder:!text-gray-600 !py-3 !px-4"
                                                    countrySelectorStyleProps={{
                                                        buttonClassName: '!bg-transparent !border-0 !border-r !border-white/10 !px-4 !py-3 hover:!bg-white/10 !transition-all',
                                                        dropdownStyleProps: {
                                                            className: '!bg-black/95 !backdrop-blur-xl !rounded-xl !shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)] !z-50',
                                                            listItemClassName: '!text-white/85 hover:!bg-white/5 !transition-colors !duration-150',
                                                            listItemCountryNameClassName: '!text-white/85',
                                                            listItemDialCodeClassName: '!text-white/35 !text-xs',
                                                            listItemSelectedClassName: '!bg-[#FF6B00]/10 !border-l-2 !border-[#FF6B00] hover:!bg-[#FF6B00]/15',
                                                            searchClassName: '!bg-white/3 !border-b !border-white/8 !px-3 !py-2',
                                                            searchInputClassName: '!bg-transparent !text-white !text-sm placeholder:!text-white/25 !outline-none',
                                                        }
                                                    }}
                                                    style={{
                                                        '--react-international-phone-height': 'auto',
                                                        '--react-international-phone-border-color': 'rgba(0, 123, 255, 0.25)',
                                                    } as React.CSSProperties}
                                                    className={`w-full bg-white/5 border rounded-lg text-white outline-none transition-all focus-within:border-electric-orange focus-within:ring-1 focus-within:ring-electric-orange ${errors.phone ? '!border-red-500' : 'border-white/10'}`}
                                                />
                                            )}
                                        />
                                        {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
                                    </div>

                                    <div className="pt-4">
                                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Procesando
                                                </>
                                            ) : (
                                                "Agendar ahora"
                                            )}
                                        </Button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </GlassCard>
            </div>
        </section>
    );
}
