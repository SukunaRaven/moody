export interface RoutineTask {
    id: string;
    label: string;
    duration: number;
}


export interface DailyTaskState {
    taskId: string;
    completed: boolean;
}


export interface CoachData {
    wakeTime: string;
    tasks: RoutineTask[];
    encouragementStyle: "soft" | "neutral" | "tough-love";
}

export interface DailyRoutineHistory {
    [date: string]: DailyTaskState[];
}
