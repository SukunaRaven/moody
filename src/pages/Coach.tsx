import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CoachData } from "@/types/coach";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";

export default function Coach() {
    const [coachData, setCoachData] = useLocalStorage<CoachData>("coachData", {
        wakeTime: "",
        tasks: [],
        encouragementStyle: "neutral",
    });

    function toggleTask(id: string) {
        setCoachData({
            ...coachData,
            tasks: coachData.tasks.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            ),
        });
    }

    return (
        <div className="max-w-md mx-auto px-4 py-6 space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Your Routine</h1>

            {coachData.tasks.length === 0 ? (
                <p className="text-center text-muted-foreground">
                    No tasks yet. Set up your routine first.
                </p>
            ) : (
                coachData.tasks.map((task) => (
                    <Card key={task.id}>
                        <CardContent className="py-4 flex justify-between items-center">
                            <div>
                                <p className="font-medium">{task.label}</p>
                                <p className="text-sm text-muted-foreground">
                                    {task.duration} min
                                </p>
                            </div>

                            <Button
                                variant={task.completed ? "default" : "outline"}
                                onClick={() => toggleTask(task.id)}
                                className="flex gap-2"
                            >
                                {task.completed ? (
                                    <CheckCircle className="w-5 h-5" />
                                ) : (
                                    <Circle className="w-5 h-5" />
                                )}
                                {task.completed ? "Done" : "Start"}
                            </Button>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
}
