import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Send, Sparkles, Lock} from 'lucide-react';
import {cn} from '@/lib/utils';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content:
                "Hi! I'm Moody, your mental wellness companion. I'm here to help you reflect on your emotions and provide support. How are you feeling today?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiConnected] = useState(true);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const apiMessages = [...messages, userMessage].map((m) => ({
                role: m.role,
                content: m.content,
            }));

            const res = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({messages: apiMessages}),
            });

            const data = await res.json();

            const assistantMessage: Message = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: data.response,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    role: 'assistant',
                    content: 'Sorry, I could not reach the AI.',
                    timestamp: new Date(),
                },
            ]);
        }

        setIsLoading(false);
    };

    return (
        <div className="flex flex-col h-screen !bg-[#F2F0FF] !text-[#051A2F]">
            {/* Header */}
            <header className="px-6 pt-8 pb-5 shrink-0">
                <div className="flex items-center gap-3">
                    <img
                        src="/image/moody-chatbot.png"
                        alt="Moody assistant"
                        className="w-10 h-10 rounded-2xl bg-white shadow-sm p-1 border border-black/5"
                    />
                    <div>
                        <h1 className="font-display text-lg font-semibold">
                            Chat with Moody
                        </h1>
                        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#6B7280] flex items-center gap-2">
                            {apiConnected ? (
                                <>
                                    <Sparkles className="w-3.5 h-3.5"/>
                                    AI-powered support
                                </>
                            ) : (
                                <>
                                    <Lock className="w-3.5 h-3.5"/>
                                    Demo mode
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </header>

            {/* Messages */}
            <main className="flex-1 overflow-y-auto px-6 pb-4">
                <div className="space-y-4 max-w-2xl mx-auto">
                    {messages.map((message, index) => (
                        <div
                            key={message.id}
                            className={cn(
                                'flex animate-fade-in',
                                message.role === 'user'
                                    ? 'justify-end'
                                    : 'justify-start'
                            )}
                            style={{animationDelay: `${index * 80}ms`}}
                        >
                            {/* ASSISTANT MESSAGE */}
                            {message.role === 'assistant' && (
                                <div className="flex gap-3 max-w-[85%]">
                                    <div
                                        className="bg-white border border-black/5 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex gap-3">
                                        <img
                                            src="/image/moody-chatbot.png"
                                            alt="Moody assistant"
                                            className="w-8 h-8 rounded-xl bg-[#F2F0FF] p-1 shrink-0"
                                        />
                                        <p className="text-sm leading-relaxed">
                                            {message.content}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* USER MESSAGE */}
                            {message.role === 'user' && (
                                <div
                                    className="bg-[#2C5FCB] text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] shadow-sm">
                                    <p className="text-sm leading-relaxed">
                                        {message.content}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div
                                className="bg-white border border-black/5 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex gap-2 items-center">
                                <img
                                    src="/image/moody-chatbot.png"
                                    alt="Moody assistant"
                                    className="w-7 h-7 rounded-xl bg-[#F2F0FF] p-1"
                                />
                                <div className="flex gap-1.5">
                                    <span className="w-2 h-2 bg-[#2C5FCB]/40 rounded-full animate-bounce"/>
                                    <span
                                        className="w-2 h-2 bg-[#2C5FCB]/40 rounded-full animate-bounce"
                                        style={{animationDelay: '150ms'}}
                                    />
                                    <span
                                        className="w-2 h-2 bg-[#2C5FCB]/40 rounded-full animate-bounce"
                                        style={{animationDelay: '300ms'}}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Input */}
            <div className="shrink-0 p-4 pb-24 !bg-[#F2F0FF] border-t border-black/5">
                <div className="max-w-2xl mx-auto flex gap-3">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === 'Enter' && !e.shiftKey && handleSend()
                        }
                        placeholder="Share what's on your mind..."
                        className="flex-1 rounded-2xl bg-white border border-black/5 shadow-sm focus-visible:ring-0"
                        disabled={isLoading}
                    />
                    <Button
                        variant="mood"
                        size="icon"
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="!rounded-2xl !bg-[#2C5FCB] !text-white !shadow-sm hover:!bg-[#244FA7]"
                    >
                        <Send className="w-5 h-5"/>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
