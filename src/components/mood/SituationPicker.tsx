import { SITUATIONS } from '@/types/mood';
import { cn } from '@/lib/utils';
import {
    Briefcase, Users, Home, Dumbbell, Coffee,
    Utensils, Car, Palette, BookOpen, MoreHorizontal
} from 'lucide-react';

interface SituationPickerProps {
    value: string;
    onChange: (situation: string) => void;
}

const situationIcons: Record<string, React.ReactNode> = {
    'Work/School': <Briefcase className="w-5 h-5" />,
    'Social': <Users className="w-5 h-5" />,
    'Family': <Home className="w-5 h-5" />,
    'Exercise': <Dumbbell className="w-5 h-5" />,
    'Relaxing': <Coffee className="w-5 h-5" />,
    'Eating': <Utensils className="w-5 h-5" />,
    'Commuting': <Car className="w-5 h-5" />,
    'Creative': <Palette className="w-5 h-5" />,
    'Learning': <BookOpen className="w-5 h-5" />,
    'Other': <MoreHorizontal className="w-5 h-5" />
};

export function SituationPicker({ value, onChange }: SituationPickerProps) {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-display text-lg font-medium text-foreground">What's your current situation?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {SITUATIONS.map((situation) => (
                    <button
                        key={situation}
                        onClick={() => onChange(situation)}
                        className={cn(
                            "flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200",
                            "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50",
                            value === situation
                                ? "bg-primary text-primary-foreground shadow-card"
                                : "bg-card shadow-soft hover:shadow-card"
                        )}
                    >
                        {situationIcons[situation]}
                        <span className="text-xs font-medium text-center">{situation}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
