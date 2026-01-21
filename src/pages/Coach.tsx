import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";
import { useDailyRoutine } from "@/hooks/useDailyRoutine";

export default function Coach() {
    const { todayRoutine, toggleTask, coachData } = useDailyRoutine();

    return (
        <div className="max-w-md mx-auto px-4 py-6 space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Today’s Routine</h1>

            {coachData.tasks.length === 0 ? (
                <p className="text-muted-foreground text-center">
                    No routine created yet.{" "}
                    <a href="/coach/setup" className="underline">
                        Go set it up.
                    </a>
                </p>
            ) : (
                todayRoutine.map((t) => {
                    // find the static template task
                    const task = coachData.tasks.find(task => task.id === t.taskId);
                    if (!task) return null;

                    return (
                        <Card key={task.id}>
                            <CardContent className="py-4 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{task.label}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {task.duration} min
                                    </p>
                                </div>

                                {/* NOTICE: completed comes from `t`, NOT from `task` */}
                                <Button
                                    variant={t.completed ? "default" : "outline"}
                                    onClick={() => toggleTask(task.id)}
                                    className="flex gap-2"
                                >
                                    {t.completed ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : (
                                        <Circle className="w-5 h-5" />
                                    )}
                                    {t.completed ? "Done" : "Start"}
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })
            )}
        </div>
    );
}
