import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { ChevronDown } from 'lucide-react';

export interface PaisTelefono { dial: string; flag: string; name: string; }

export const COUNTRIES: PaisTelefono[] = [
    { dial: '+58', flag: '🇻🇪', name: 'Venezuela' },
    { dial: '+57', flag: '🇨🇴', name: 'Colombia' },
    { dial: '+52', flag: '🇲🇽', name: 'México' },
    { dial: '+1', flag: '🇺🇸', name: 'EE.UU.' },
    { dial: '+54', flag: '🇦🇷', name: 'Argentina' },
    { dial: '+51', flag: '🇵🇪', name: 'Perú' },
    { dial: '+56', flag: '🇨🇱', name: 'Chile' },
    { dial: '+593', flag: '🇪🇨', name: 'Ecuador' },
    { dial: '+34', flag: '🇪🇸', name: 'España' },
    { dial: '+507', flag: '🇵🇦', name: 'Panamá' },
];

export function isValidWhatsAppNumber(phone: string): boolean {
    if (!phone) return false;
    return phone.replace(/\D/g, '').length >= 8;
}

interface PhoneInputProps { value: string; onChange: (val: string) => void; hasError: boolean; }

export function PhoneInput({ value, onChange, hasError }: PhoneInputProps) {
    const [dialCode, setDialCode] = useState('+58');
    const localNumber = value.startsWith(dialCode) ? value.slice(dialCode.length) : value.replace(/^\+\d{1,4}/, '');

    function handleDialChange(e: ChangeEvent<HTMLSelectElement>) {
        const newDial = e.target.value;
        setDialCode(newDial);
        onChange(newDial + localNumber);
    }

    function handleNumberChange(e: ChangeEvent<HTMLInputElement>) {
        const num = e.target.value.replace(/[^\d\s\-()]/g, '');
        onChange(dialCode + num);
    }

    const current = COUNTRIES.find((c) => c.dial === dialCode);

    return (
        <div className={`flex w-full bg-white/5 border rounded-lg overflow-hidden transition-all focus-within:border-electric-orange focus-within:ring-1 focus-within:ring-electric-orange ${hasError ? 'border-red-500' : 'border-white/10'}`}>
            <div className="relative flex items-center">
                <select
                    value={dialCode} onChange={handleDialChange}
                    className="appearance-none bg-transparent text-white pl-3 pr-7 py-3 outline-none cursor-pointer text-sm border-r border-white/10 hover:bg-white/5 transition-colors"
                >
                    {COUNTRIES.map((c) => (
                        <option key={c.dial} value={c.dial} className="bg-black text-white">{c.flag} {c.dial}</option>
                    ))}
                </select>
                <span className="absolute right-2 pointer-events-none text-gray-400"><ChevronDown size={12} /></span>
                <span className="absolute left-3 pointer-events-none text-base">{current?.flag}</span>
            </div>
            <input
                type="tel" value={localNumber} onChange={handleNumberChange}
                placeholder="Número de WhatsApp"
                className="flex-1 bg-transparent text-white px-3 py-3 outline-none text-sm placeholder:text-gray-600"
            />
        </div>
    );
}
