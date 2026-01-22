import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CoachData } from "@/types/coach";

export default function CoachSetup() {
    const [coachData, setCoachData] = useLocalStorage<CoachData>("coachData", {
        wakeTime: "",
        tasks: [],
        encouragementStyle: "neutral",
    });

    const [taskLabel, setTaskLabel] = useState("");
    const [taskDuration, setTaskDuration] = useState<number | "">("");

    function addTask() {
        if (!taskLabel.trim() || !taskDuration) return;

        setCoachData({
            ...coachData,
            tasks: [
                ...coachData.tasks,
                {
                    id: crypto.randomUUID(),
                    label: taskLabel.trim(),
                    duration: Number(taskDuration),
                },
            ],
        });

        setTaskLabel("");
        setTaskDuration("");
    }

    // NEW: delete task
    function deleteTask(id: string) {
        setCoachData({
            ...coachData,
            tasks: coachData.tasks.filter((t) => t.id !== id),
        });
    }

    return (
        <div className="max-w-md mx-auto px-4 py-6 space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">
                Set Up Your Daily Routine
            </h1>

            {/* Wake Time */}
            <Card>
                <CardHeader>
                    <CardTitle>Wake Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        type="time"
                        value={coachData.wakeTime}
                        onChange={(e) =>
                            setCoachData({
                                ...coachData,
                                wakeTime: e.target.value,
                            })
                        }
                    />
                </CardContent>
            </Card>

            {/* Add Task */}
            <Card>
                <CardHeader>
                    <CardTitle>Add Task</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Input
                        placeholder="Task name"
                        value={taskLabel}
                        onChange={(e) => setTaskLabel(e.target.value)}
                    />

                    <Input
                        type="number"
                        min={1}
                        max={300}
                        placeholder="Time"
                        value={taskDuration}
                        onChange={(e) =>
                            setTaskDuration(
                                e.target.value === ""
                                    ? ""
                                    : Number(e.target.value)
                            )
                        }
                    />

                    <Button onClick={addTask} className="w-full">
                        Add Task
                    </Button>
                </CardContent>
            </Card>

            {/* Current Tasks */}
            {coachData.tasks.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Current Tasks</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        {coachData.tasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex justify-between items-center p-3 border rounded-lg text-sm"
                            >
                                <span>
                                    {task.label} — {task.duration} min
                                </span>

                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="text-muted-foreground hover:text-destructive transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Save */}
            <Button className="w-full" asChild>
                <a href="/coach">Finish Setup</a>
            </Button>
        </div>
    );
}
