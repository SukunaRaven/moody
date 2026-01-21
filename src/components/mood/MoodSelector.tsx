import { MoodLevel, MOOD_LABELS } from '@/types/mood';
import { cn } from '@/lib/utils';

interface MoodSelectorProps {
    value: MoodLevel | null;
    onChange: (level: MoodLevel) => void;
}

const moodEmojis: Record<MoodLevel, string> = {
    1: '😢',
    2: '😔',
    3: '😐',
    4: '😊',
    5: '😄'
};

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
    return (
        <div className="flex flex-col items-center gap-4">
            <h3 className="font-display text-lg font-medium text-foreground">How are you feeling?</h3>
            <div className="flex gap-3">
                {([1, 2, 3, 4, 5] as MoodLevel[]).map((level) => (
                    <button
                        key={level}
                        onClick={() => onChange(level)}
                        className={cn(
                            "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300",
                            "hover:scale-110 hover:shadow-card",
                            "focus:outline-none focus:ring-2 focus:ring-primary/50",
                            value === level
                                ? "bg-primary/10 shadow-card scale-105 ring-2 ring-primary/30"
                                : "bg-card hover:bg-card/80"
                        )}
                    >
            <span className="text-4xl transition-transform duration-200 hover:animate-pulse-soft">
              {moodEmojis[level]}
            </span>
                        <span className={cn(
                            "text-xs font-medium transition-colors",
                            value === level ? "text-primary" : "text-muted-foreground"
                        )}>
              {MOOD_LABELS[level]}
            </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
