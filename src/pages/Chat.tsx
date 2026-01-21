import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Sparkles, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

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
            content: "Hi! I'm Moody, your mental wellness companion. I'm here to help you reflect on your emotions and provide support. How are you feeling today?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiConnected] = useState(false); // Will be true when AI API is connected

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Simulate AI response (replace with actual API call)
        setTimeout(() => {
            const responses = [
                "I hear you. It's completely normal to feel that way. Would you like to talk more about what's on your mind?",
                "Thank you for sharing. Remember, every feeling is valid. What do you think might help you feel better right now?",
                "That sounds challenging. Sometimes just acknowledging our feelings can be the first step. Have you been able to take any time for yourself today?",
                "I understand. It's okay to have difficult days. What usually helps you when you're feeling this way?"
            ];

            const assistantMessage: Message = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: responses[Math.floor(Math.random() * responses.length)],
                timestamp: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-screen bg-background">
            {/* Header */}
            <header className="px-6 pt-8 pb-4 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full gradient-calm flex items-center justify-center">
                        <Bot className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="font-display text-xl font-bold">Chat with Moody</h1>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                            {apiConnected ? (
                                <>
                                    <Sparkles className="w-3 h-3" />
                                    AI-powered support
                                </>
                            ) : (
                                <>
                                    <Lock className="w-3 h-3" />
                                    Demo mode - Connect API for full experience
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
                                "flex gap-3 animate-fade-in",
                                message.role === 'user' ? "flex-row-reverse" : ""
                            )}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                message.role === 'user'
                                    ? "bg-primary/10"
                                    : "gradient-calm"
                            )}>
                                {message.role === 'user'
                                    ? <User className="w-4 h-4 text-primary" />
                                    : <Bot className="w-4 h-4 text-primary-foreground" />
                                }
                            </div>
                            <div className={cn(
                                "max-w-[80%] rounded-2xl px-4 py-3",
                                message.role === 'user'
                                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                                    : "bg-card shadow-soft rounded-tl-sm"
                            )}>
                                <p className="text-sm leading-relaxed">{message.content}</p>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-3 animate-fade-in">
                            <div className="w-8 h-8 rounded-full gradient-calm flex items-center justify-center">
                                <Bot className="w-4 h-4 text-primary-foreground" />
                            </div>
                            <div className="bg-card shadow-soft rounded-2xl rounded-tl-sm px-4 py-3">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Input */}
            <div className="shrink-0 p-4 pb-24 bg-background border-t border-border">
                <div className="max-w-2xl mx-auto flex gap-3">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                        placeholder="Share what's on your mind..."
                        className="flex-1 rounded-xl"
                        disabled={isLoading}
                    />
                    <Button
                        variant="mood"
                        size="icon"
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
