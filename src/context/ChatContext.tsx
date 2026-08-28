import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

interface ChatContextValue {
    isOpen: boolean;
    source: string | null;
    initialMessage: string | null;
    openChat: (source: string, message?: string) => void;
    closeChat: () => void;
    clearInitialMessage: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [source, setSource] = useState<string | null>(null);
    const [initialMessage, setInitialMessage] = useState<string | null>(null);

    const openChat = useCallback((newSource: string, message?: string) => {
        setSource(newSource);
        setInitialMessage(message ?? null);
        setIsOpen(true);
    }, []);

    const closeChat = useCallback(() => setIsOpen(false), []);

    const clearInitialMessage = useCallback(() => setInitialMessage(null), []);

    return (
        <ChatContext.Provider value={{ isOpen, source, initialMessage, openChat, closeChat, clearInitialMessage }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChatContext() {
    const ctx = useContext(ChatContext);
    if (!ctx) throw new Error('useChatContext must be used within a ChatProvider');
    return ctx;
}
