import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { PhoneInput, isValidWhatsAppNumber } from './PhoneInput';
import { SECTORES } from '../../data/diagnostico/sectores';
import { RANGOS_EMPLEADOS } from '../../data/diagnostico/rangosEmpleados';

const contactoSchema = z.object({
    nombre: z.string().min(2, "El nombre es muy corto"),
    empresa: z.string().min(2, "Ingresa el nombre de tu empresa"),
    cargo: z.string().min(2, "Contanos tu cargo o rol"),
    sector: z.string().min(1, "Selecciona un sector"),
    rangoEmpleados: z.string().min(1, "Selecciona un rango"),
    email: z.string().email("Email inválido"),
    whatsapp: z.string().refine(isValidWhatsAppNumber, { message: "Número de WhatsApp inválido" }),
});

export type DatosContacto = z.infer<typeof contactoSchema>;

interface FormularioContactoProps { onSubmitContacto: (datos: DatosContacto) => void; }

export function FormularioContacto({ onSubmitContacto }: FormularioContactoProps) {
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<DatosContacto>({
        resolver: zodResolver(contactoSchema),
    });

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="text-center mb-8">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    Tu diagnóstico está listo. ¿A dónde te lo enviamos?
                </h2>
                <p className="text-white/50 text-sm mt-2">Completá estos datos para ver tu resultado y recibir el reporte completo.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmitContacto)} className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-400 mb-1 block">Nombre</label>
                    <input {...register("nombre")} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-orange focus:ring-1 focus:ring-electric-orange outline-none transition-all placeholder:text-gray-600" placeholder="Tu nombre" />
                    {errors.nombre && <span className="text-red-500 text-xs mt-1">{errors.nombre.message}</span>}
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-400 mb-1 block">Empresa</label>
                    <input {...register("empresa")} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-orange focus:ring-1 focus:ring-electric-orange outline-none transition-all placeholder:text-gray-600" placeholder="Nombre de tu empresa" />
                    {errors.empresa && <span className="text-red-500 text-xs mt-1">{errors.empresa.message}</span>}
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-400 mb-1 block">Cargo</label>
                    <input {...register("cargo")} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-orange focus:ring-1 focus:ring-electric-orange outline-none transition-all placeholder:text-gray-600" placeholder="Ej: Gerente de Operaciones" />
                    {errors.cargo && <span className="text-red-500 text-xs mt-1">{errors.cargo.message}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-400 mb-1 block">Sector</label>
                        <select {...register("sector")} defaultValue="" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-white focus:border-electric-orange focus:ring-1 focus:ring-electric-orange outline-none transition-all text-sm">
                            <option value="" disabled className="bg-black">Selecciona...</option>
                            {SECTORES.map((s) => <option key={s.value} value={s.value} className="bg-black">{s.label}</option>)}
                        </select>
                        {errors.sector && <span className="text-red-500 text-xs mt-1">{errors.sector.message}</span>}
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-400 mb-1 block">Empleados</label>
                        <select {...register("rangoEmpleados")} defaultValue="" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-white focus:border-electric-orange focus:ring-1 focus:ring-electric-orange outline-none transition-all text-sm">
                            <option value="" disabled className="bg-black">Selecciona...</option>
                            {RANGOS_EMPLEADOS.map((r) => <option key={r.value} value={r.value} className="bg-black">{r.label}</option>)}
                        </select>
                        {errors.rangoEmpleados && <span className="text-red-500 text-xs mt-1">{errors.rangoEmpleados.message}</span>}
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-400 mb-1 block">Email corporativo</label>
                    <input {...register("email")} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-orange focus:ring-1 focus:ring-electric-orange outline-none transition-all placeholder:text-gray-600" placeholder="ejemplo@empresa.com" />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-400 mb-1 block">WhatsApp</label>
                    <Controller
                        name="whatsapp" control={control} defaultValue=""
                        render={({ field }) => <PhoneInput value={field.value} onChange={field.onChange} hasError={!!errors.whatsapp} />}
                    />
                    {errors.whatsapp && <span className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</span>}
                </div>

                <div className="pt-2">
                    <Button type="submit" variant="glass" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculando...</> : "Ver mi resultado"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
