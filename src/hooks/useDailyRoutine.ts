import { useLocalStorage } from "./useLocalStorage";
import { CoachData, DailyRoutineHistory, DailyTaskState } from "@/types/coach";

export function useDailyRoutine() {
    const [coachData] = useLocalStorage<CoachData>("coachData", {
        wakeTime: "",
        tasks: [],
        encouragementStyle: "neutral",
    });

    const [history, setHistory] = useLocalStorage<DailyRoutineHistory>(
        "dailyRoutineHistory",
        {}
    );

    const today = new Date().toISOString().split("T")[0];

    function getTodayRoutine(): DailyTaskState[] {
        if (!history[today]) {
            const fresh = coachData.tasks.map((t) => ({
                taskId: t.id,
                completed: false,
            }));

            setHistory({
                ...history,
                [today]: fresh,
            });

            return fresh;
        }
        return history[today];
    }

    function toggleTask(taskId: string) {
        const updated = getTodayRoutine().map((t) =>
            t.taskId === taskId ? { ...t, completed: !t.completed } : t
        );

        setHistory({
            ...history,
            [today]: updated,
        });
    }

    return {
        todayRoutine: getTodayRoutine(),
        toggleTask,
        coachData,
    };
}
