import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Heart, Phone, X, ExternalLink} from 'lucide-react';
import {cn} from '@/lib/utils';

interface CrisisAlertProps {
    onDismiss: () => void;
}

export function CrisisAlert({onDismiss}: CrisisAlertProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className={cn(
                "fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm",
                "bg-white border border-black/5 rounded-2xl shadow-card",
                "p-5 animate-slide-up z-50"
            )}
        >
            {/* Close button */}
            <button
                onClick={onDismiss}
                className="absolute top-3 right-3 text-[#6B7280] hover:text-[#051A2F] transition-colors"
                aria-label="Dismiss notification"
            >
                <X className="w-4 h-4"/>
            </button>

            <div className="flex gap-4">
                {/* Icon */}
                <div
                    className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-black/5 shadow-sm">
                    <img
                        src="/image/moody-chatbot.png"
                        alt="Moody assistant"
                        className="w-7 h-7 rounded-lg"
                    />
                </div>


                {/* Content */}
                <div className="flex-1">
                    <h3 className="font-display text-base font-semibold text-[#051A2F]">
                        We’re here for you
                    </h3>

                    <p className="text-sm text-[#6B7280] mt-1 leading-relaxed">
                        We noticed you’ve been going through a tough time. You don’t have to handle this alone.
                    </p>

                    {!expanded ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="mt-4 px-3 rounded-xl bg-[#2C5FCB]/10 text-[#2C5FCB] hover:bg-[#2C5FCB]/20"
                            onClick={() => setExpanded(true)}
                        >
                            <Phone className="w-4 h-4 mr-2"/>
                            View support options
                        </Button>
                    ) : (
                        <div className="mt-4 space-y-3 animate-fade-in">
                            {/* 113 */}
                            <a
                                href="https://findahelpline.com/countries/fi/topics/suicidal-thoughts"
                                className="flex items-center gap-3 p-3 rounded-xl bg-[#7766C6]/10 hover:bg-[#7766C6]/20 transition-colors"
                            >
                                <Phone className="w-5 h-5 text-[#7766C6]"/>
                                <div>
                                    <p className="font-medium text-sm text-[#051A2F]">
                                        Suicidal prevention
                                    </p>
                                    <p className="text-xs text-[#6B7280]">24/7 Available </p>
                                </div>
                            </a>

                            {/* Kindertelefoon */}
                            <a
                                href="https://findahelpline.com/organizations/crisis-center-monika-helpline"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-xl bg-[#2C5FCB]/10 hover:bg-[#2C5FCB]/20 transition-colors"
                            >
                                <ExternalLink className="w-5 h-5 text-[#2C5FCB]"/>
                                <div>
                                    <p className="font-medium text-sm text-[#051A2F]">
                                        Abuse & domestic violence
                                    </p>
                                    <p className="text-xs text-[#6B7280]">24/7 Available</p>
                                </div>
                            </a>

                            <p className="text-[11px] text-[#6B7280] pt-2 leading-relaxed">
                                You can dismiss this message at any time. Your wellbeing matters 💚
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}
