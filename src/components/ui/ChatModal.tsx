import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { useChatContext } from '../../context/ChatContext';
import { trackChatOpen, trackChatMessageSent } from '../../lib/analytics';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

const WELCOME_MESSAGE: Message = {
    id: 'welcome',
    role: 'assistant',
    content: '¡Hola! Soy CEREBRO, el asistente de InteligencIA 🧠 Puedo contarte sobre el Radar de Madurez (diagnóstico gratuito), Activación IA u Operación Aumentada, o resolver cualquier duda sobre cómo automatizar tu negocio. ¿En qué te puedo ayudar?',
};

function getSessionId(): string {
    const key = 'inteligencia_chat_session';
    let id = sessionStorage.getItem(key);
    if (!id) {
        id = crypto.randomUUID();
        sessionStorage.setItem(key, id);
    }
    return id;
}

export function ChatModal() {
    const { isOpen, source, initialMessage, closeChat, clearInitialMessage } = useChatContext();
    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const sessionId = useRef<string>(getSessionId());

    useEffect(() => {
        if (isOpen) {
            trackChatOpen(source ?? 'unknown');
            setTimeout(() => inputRef.current?.focus(), 300);
            if (initialMessage) {
                const message = initialMessage;
                clearInitialMessage();
                // let the welcome message show first, then send — otherwise it
                // auto-scrolls to the bottom before the open animation even finishes
                setTimeout(() => sendMessage(message), 450);
            }
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (!isOpen) return;
        function handleKey(e: KeyboardEvent) {
            if (e.key === 'Escape') closeChat();
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, closeChat]);

    async function sendMessage(overrideText?: string) {
        const text = (overrideText ?? input).trim();
        if (!text || isLoading) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);
        if (!overrideText) setInput('');
        setIsLoading(true);
        trackChatMessageSent(messages.length + 1);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    sessionId: sessionId.current,
                    history: messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
                }),
            });

            const raw = await response.text();
            let reply = 'Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.';
            if (raw) {
                try {
                    const parsed = JSON.parse(raw);
                    const data = Array.isArray(parsed) ? parsed[0] : parsed;
                    reply = data?.reply || data?.response || data?.message || data?.output || data?.text || data?.answer || reply;
                } catch {
                    reply = raw;
                }
            }

            setMessages(prev => [...prev, {
                id: Date.now().toString() + '_bot',
                role: 'assistant',
                content: reply,
            }]);
        } catch {
            setMessages(prev => [...prev, {
                id: Date.now().toString() + '_err',
                role: 'assistant',
                content: 'Hubo un error al procesar tu mensaje. Por favor, intenta de nuevo o contáctanos directamente.',
            }]);
        } finally {
            setIsLoading(false);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        sendMessage();
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <button
                        type="button"
                        aria-label="Cerrar chat"
                        onClick={closeChat}
                        className="fixed inset-0 z-50 cursor-default"
                    />

                    {/* Ambient glow — only while the chat is open, gives the glass something to bleed */}
                    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute top-1/2 left-1/2 -translate-x-[65%] -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-electric-orange/15 blur-[140px]"
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute top-1/2 left-1/2 -translate-x-[30%] -translate-y-[60%] w-[480px] h-[480px] rounded-full bg-tech-blue/15 blur-[140px]"
                        />
                    </div>

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 10 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="pointer-events-auto w-full max-w-2xl h-[85vh] max-h-[820px] flex flex-col bg-[#141416]/70 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/60"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                        <img src="/logo_header.png" alt="CEREBRO" className="w-6 h-6 object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white leading-tight">CEREBRO</p>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                            <span className="text-xs text-gray-400">En línea</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={closeChat}
                                    className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-gray-400 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="relative flex-1 min-h-0">
                                <div className="h-full overflow-y-auto px-6 py-6 flex flex-col gap-4 scroll-smooth">
                                    {messages.map(msg => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                                                    msg.role === 'user'
                                                        ? 'bg-electric-orange/20 border border-electric-orange/40 text-white rounded-br-sm'
                                                        : 'bg-[#232326]/70 border border-white/10 text-gray-200 rounded-bl-sm'
                                                }`}
                                            >
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}

                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-[#232326]/70 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                                                <div className="flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                                                </div>
                                                <span className="text-xs text-gray-500">Escribiendo...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                                <div className="pointer-events-none absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/30 to-transparent" />
                                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>

                            {/* Input — same prompt-bar language as the Hero */}
                            <div className="px-6 pb-6 pt-2">
                                <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-[#2a2a2e]/70 border border-white/10 rounded-2xl pl-5 pr-3 py-3">
                                    <textarea
                                        ref={inputRef}
                                        value={input}
                                        maxLength={250}
                                        rows={1}
                                        onChange={e => {
                                            setInput(e.target.value);
                                            const el = e.target;
                                            el.style.height = 'auto';
                                            el.style.height = `${el.scrollHeight}px`;
                                            el.style.overflowY = el.scrollHeight > 120 ? 'auto' : 'hidden';
                                        }}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Escribe tu mensaje..."
                                        disabled={isLoading}
                                        style={{ minHeight: '24px', maxHeight: '120px' }}
                                        className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none resize-none text-sm md:text-base disabled:opacity-50 overflow-y-hidden py-1"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || isLoading}
                                        aria-label="Enviar"
                                        className="text-sm font-medium px-1 pb-1.5 flex-shrink-0 transition-colors text-electric-orange hover:text-orange-400 disabled:text-gray-600 disabled:cursor-default"
                                    >
                                        {isLoading
                                            ? <Loader2 className="w-4 h-4 animate-spin" />
                                            : 'Enviar'
                                        }
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
