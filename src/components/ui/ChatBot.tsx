import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Loader2, MessageSquare, Minimize2 } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

const WELCOME_MESSAGE: Message = {
    id: 'welcome',
    role: 'assistant',
    content: '¡Hola! Soy CEREBRO, el asistente de InteligencIA 🧠 ¿En qué puedo ayudarte hoy? Puedo contarte sobre nuestros servicios de automatización, desarrollo de software con IA, o resolver cualquier duda sobre cómo podemos escalar tu negocio.',
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

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const sessionId = useRef<string>(getSessionId());

    useEffect(() => {
        if (isOpen) {
            setHasUnread(false);
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) setHasUnread(true);
        }, 8000);
        return () => clearTimeout(timer);
    }, []);

    async function sendMessage() {
        const text = input.trim();
        if (!text || isLoading) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

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
            setTimeout(() => {
                inputRef.current?.focus();
                if (inputRef.current) {
                    inputRef.current.style.height = 'auto';
                }
            }, 50);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        className="w-[360px] max-w-[calc(100vw-3rem)] h-[480px] max-h-[calc(100vh-8rem)] flex flex-col bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8),0_0_20px_rgba(255,107,0,0.08)]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-electric-orange/20 to-tech-blue/10 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-electric-orange/20 border border-electric-orange/30 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-electric-orange" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white leading-tight">CEREBRO</p>
                                    <p className="text-xs text-gray-500 leading-tight">by InteligencIA</p>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-xs text-gray-400">En línea</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-gray-400 hover:text-white"
                            >
                                <Minimize2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 scroll-smooth">
                            {messages.map(msg => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.role === 'assistant' && (
                                        <div className="w-6 h-6 rounded-full bg-electric-orange/20 border border-electric-orange/30 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                            <Bot className="w-3.5 h-3.5 text-electric-orange" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                            msg.role === 'user'
                                                ? 'bg-electric-orange text-white rounded-br-sm'
                                                : 'bg-white/8 border border-white/10 text-gray-200 rounded-bl-sm'
                                        }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="w-6 h-6 rounded-full bg-electric-orange/20 border border-electric-orange/30 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                        <Bot className="w-3.5 h-3.5 text-electric-orange" />
                                    </div>
                                    <div className="bg-white/8 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="px-3 pt-3 pb-2 border-t border-white/10 flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                            <textarea
                                ref={inputRef}
                                value={input}
                                maxLength={250}
                                onChange={e => {
                                    setInput(e.target.value);
                                    const el = e.target;
                                    el.style.height = 'auto';
                                    el.style.height = `${el.scrollHeight}px`;
                                    el.style.overflowY = el.scrollHeight > 120 ? 'auto' : 'hidden';
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder="Escribe tu mensaje..."
                                rows={1}
                                disabled={isLoading}
                                className="chat-input flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 resize-none outline-none focus:border-electric-orange/50 focus:bg-white/8 transition-all disabled:opacity-50 overflow-y-hidden"
                                style={{ minHeight: '40px', maxHeight: '120px' }}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!input.trim() || isLoading}
                                className="w-9 h-9 rounded-xl bg-electric-orange hover:bg-orange-600 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_12px_rgba(255,107,0,0.4)] hover:shadow-[0_0_20px_rgba(255,107,0,0.6)] flex-shrink-0"
                            >
                                {isLoading
                                    ? <Loader2 className="w-4 h-4 text-white animate-spin" />
                                    : <Send className="w-4 h-4 text-white" />
                                }
                            </button>
                            </div>
                            <p className={`text-right text-xs pr-1 transition-colors ${input.length >= 250 ? 'text-red-400' : 'text-gray-600'}`}>
                                {input.length}/250
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(prev => !prev)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="relative w-14 h-14 rounded-full bg-electric-orange shadow-[0_0_20px_rgba(255,107,0,0.6)] hover:shadow-[0_0_30px_rgba(255,107,0,0.9)] flex items-center justify-center transition-shadow"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageSquare className="w-6 h-6 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {hasUnread && !isOpen && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-tech-blue border-2 border-black"
                        />
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
