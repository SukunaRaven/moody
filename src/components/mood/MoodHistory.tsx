import { MoodEntry, MOOD_LABELS, MOOD_COLORS } from '@/types/mood';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface MoodHistoryProps {
    entries: MoodEntry[];
}

const moodEmojis = {
    1: '😢',
    2: '😔',
    3: '😐',
    4: '😊',
    5: '😄'
};

export function MoodHistory({ entries }: MoodHistoryProps) {
    if (entries.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">No mood entries yet</p>
                <p className="text-sm text-muted-foreground mt-1">Start logging to see your history</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {entries.slice(0, 10).map((entry, index) => (
                <div
                    key={entry.id}
                    className={cn(
                        "flex items-center gap-4 p-4 rounded-xl bg-card shadow-soft",
                        "animate-fade-in transition-all hover:shadow-card"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-2xl",
                        MOOD_COLORS[entry.moodLevel]
                    )}>
                        {moodEmojis[entry.moodLevel]}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium">{MOOD_LABELS[entry.moodLevel]}</span>
                            <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
                {entry.situation}
              </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {entry.emotions.slice(0, 3).map(emotion => (
                                <span key={emotion} className="text-xs text-primary">
                  {emotion}
                </span>
                            ))}
                            {entry.emotions.length > 3 && (
                                <span className="text-xs text-muted-foreground">
                  +{entry.emotions.length - 3} more
                </span>
                            )}
                        </div>
                    </div>

                    <div className="text-right text-sm text-muted-foreground">
                        <div>{format(entry.timestamp, 'MMM d')}</div>
                        <div>{format(entry.timestamp, 'h:mm a')}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
