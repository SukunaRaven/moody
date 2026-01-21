import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CoachData } from "@/types/coach";

export function CoachRoutine() {
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
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold">Today's Routine</h1>

            {coachData.tasks.map((task) => (
                <div
                    key={task.id}
                    className="p-3 border rounded flex justify-between items-center"
                >
                    <div>
                        <div className="font-medium">{task.label}</div>
                        <div className="text-sm text-muted">
                            {task.duration} min
                        </div>
                    </div>
                    <button
                        className={`btn ${task.completed ? "btn-success" : "btn-outline"}`}
                        onClick={() => toggleTask(task.id)}
                    >
                        {task.completed ? "Done" : "Start"}
                    </button>
                </div>
            ))}
        </div>
    );
}
