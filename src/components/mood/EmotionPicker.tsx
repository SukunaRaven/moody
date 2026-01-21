import { EMOTIONS } from '@/types/mood';
import { cn } from '@/lib/utils';

interface EmotionPickerProps {
    selected: string[];
    onChange: (emotions: string[]) => void;
}

export function EmotionPicker({ selected, onChange }: EmotionPickerProps) {
    const toggleEmotion = (emotion: string) => {
        if (selected.includes(emotion)) {
            onChange(selected.filter(e => e !== emotion));
        } else {
            onChange([...selected, emotion]);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-display text-lg font-medium text-foreground">What emotions are present?</h3>
            <div className="flex flex-wrap gap-2">
                {EMOTIONS.map((emotion) => (
                    <button
                        key={emotion}
                        onClick={() => toggleEmotion(emotion)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                            "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50",
                            selected.includes(emotion)
                                ? "bg-primary text-primary-foreground shadow-soft"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        )}
                    >
                        {emotion}
                    </button>
                ))}
            </div>
        </div>
    );
}
