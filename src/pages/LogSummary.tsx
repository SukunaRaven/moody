import { useMoodStore } from "@/hooks/useMoodStore";
import { format } from "date-fns";

export default function LogSummary() {
    const { entries } = useMoodStore();

    if (entries.length === 0) {
        return (
            <div className="p-6 text-center text-muted-foreground">
                No mood logs yet.
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Mood Log Summary</h1>

            <div className="space-y-4">
                {entries.map((entry) => (
                    <div
                        key={entry.id}
                        className="p-4 rounded-xl border bg-card shadow-sm space-y-3"
                    >
                        {/* Top row: date & mood */}
                        <div className="flex justify-between items-center">
                            <span className="font-medium">
                                {format(entry.timestamp, "MMM d, yyyy h:mm a")}
                            </span>
                            <span className="font-semibold text-primary">
                                Mood: {entry.moodLevel}/5
                            </span>
                        </div>

                        {/* Situation */}
                        <div className="text-sm">
                            <p>
                                <strong>Situation:</strong> {entry.situation}
                            </p>
                        </div>

                        {/* Emotions */}
                        {entry.emotions.length > 0 && (
                            <div className="text-sm">
                                <p>
                                    <strong>Emotions:</strong>{" "}
                                    {entry.emotions.join(", ")}
                                </p>
                            </div>
                        )}

                        {/* Notes */}
                        {entry.notes && entry.notes.trim() !== "" && (
                            <div className="text-sm">
                                <p>
                                    <strong>Notes:</strong> {entry.notes}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
