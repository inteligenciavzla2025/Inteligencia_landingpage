import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, ChevronDown } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

const COUNTRIES = [
    { dial: '+58',  flag: '🇻🇪', name: 'Venezuela' },
    { dial: '+57',  flag: '🇨🇴', name: 'Colombia' },
    { dial: '+52',  flag: '🇲🇽', name: 'México' },
    { dial: '+1',   flag: '🇺🇸', name: 'EE.UU.' },
    { dial: '+54',  flag: '🇦🇷', name: 'Argentina' },
    { dial: '+51',  flag: '🇵🇪', name: 'Perú' },
    { dial: '+56',  flag: '🇨🇱', name: 'Chile' },
    { dial: '+593', flag: '🇪🇨', name: 'Ecuador' },
    { dial: '+34',  flag: '🇪🇸', name: 'España' },
    { dial: '+507', flag: '🇵🇦', name: 'Panamá' },
];

interface PhoneInputProps {
    value: string;
    onChange: (val: string) => void;
    hasError: boolean;
}

function PhoneInputField({ value, onChange, hasError }: PhoneInputProps) {
    const [dialCode, setDialCode] = useState('+58');
    const localNumber = value.startsWith(dialCode) ? value.slice(dialCode.length) : value.replace(/^\+\d{1,4}/, '');

    function handleDialChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newDial = e.target.value;
        setDialCode(newDial);
        onChange(newDial + localNumber);
    }

    function handleNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
        const num = e.target.value.replace(/[^\d\s\-()]/g, '');
        onChange(dialCode + num);
    }

    const current = COUNTRIES.find(c => c.dial === dialCode);

    return (
        <div className={`flex w-full bg-white/5 border rounded-lg overflow-hidden transition-all focus-within:border-electric-orange focus-within:ring-1 focus-within:ring-electric-orange ${hasError ? 'border-red-500' : 'border-white/10'}`}>
            <div className="relative flex items-center">
                <select
                    value={dialCode}
                    onChange={handleDialChange}
                    className="appearance-none bg-transparent text-white pl-3 pr-7 py-3 outline-none cursor-pointer text-sm border-r border-white/10 hover:bg-white/5 transition-colors"
                >
                    {COUNTRIES.map(c => (
                        <option key={c.dial} value={c.dial} className="bg-black text-white">
                            {c.flag} {c.dial}
                        </option>
                    ))}
                </select>
                <span className="absolute right-2 pointer-events-none text-gray-400">
                    <ChevronDown size={12} />
                </span>
                <span className="absolute left-3 pointer-events-none text-base">{current?.flag}</span>
            </div>
            <input
                type="tel"
                value={localNumber}
                onChange={handleNumberChange}
                placeholder="Número de WhatsApp"
                className="flex-1 bg-transparent text-white px-3 py-3 outline-none text-sm placeholder:text-gray-600"
            />
        </div>
    );
}

function isValidWhatsAppNumber(phone: string): boolean {
    if (!phone) return false;
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

            gtag('event', 'generate_lead', {
                event_category: 'formulario',
                event_label: 'diagnostico_express',
            });

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
                                    <p className="text-gray-400">
                                        Te hemos enviado un WhatsApp para coordinar el horario de la llamada.
                                    </p>
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

                                    <div>
                                        <label className="text-sm font-medium text-gray-400 mb-1 block">Teléfono (WhatsApp)</label>
                                        <Controller
                                            name="phone"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <PhoneInputField
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    hasError={!!errors.phone}
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
