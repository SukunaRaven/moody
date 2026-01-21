import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Phone, X, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CrisisAlertProps {
    onDismiss: () => void;
}

export function CrisisAlert({ onDismiss }: CrisisAlertProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={cn(
            "fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md",
            "bg-card border-2 border-accent/30 rounded-2xl shadow-elevated p-6",
            "animate-slide-up z-50"
        )}>
            <button
                onClick={onDismiss}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full gradient-warm flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6 text-accent-foreground" />
                </div>

                <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg">We're here for you</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        We noticed you've been going through a tough time. It's okay to reach out for support.
                    </p>

                    {!expanded ? (
                        <Button
                            variant="warm"
                            size="sm"
                            className="mt-4"
                            onClick={() => setExpanded(true)}
                        >
                            <Phone className="w-4 h-4" />
                            View support resources
                        </Button>
                    ) : (
                        <div className="mt-4 space-y-3 animate-fade-in">
                            <a
                                href="tel:113"
                                className="flex items-center gap-3 p-3 rounded-xl bg-accent/10 hover:bg-accent/20 transition-colors"
                            >
                                <Phone className="w-5 h-5 text-accent" />
                                <div>
                                    <p className="font-medium">Zelfmoordpreventie (113)</p>
                                    <p className="text-xs text-muted-foreground">24/7 beschikbaar</p>
                                </div>
                            </a>

                            <a
                                href="https://www.kindertelefoon.nl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors"
                            >
                                <ExternalLink className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="font-medium">Kindertelefoon</p>
                                    <p className="text-xs text-muted-foreground">0800-0432</p>
                                </div>
                            </a>

                            <p className="text-xs text-muted-foreground pt-2">
                                You can dismiss this message. Your wellbeing matters to us. 💚
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
