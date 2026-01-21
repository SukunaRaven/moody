
export interface RoutineTask {
    id: string;
    label: string;
    duration: number; // minutes
    completed: boolean;
}

export interface CoachData {
    wakeTime: string;
    tasks: RoutineTask[];
    encouragementStyle: "soft" | "neutral" | "tough-love";
}
