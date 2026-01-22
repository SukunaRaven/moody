export interface RoutineTask {
    id: string;
    label: string;
    duration: number;
    completed?: boolean; // now components and TS agree
}

export interface DailyTaskState {
    taskId: string;
    completed: boolean;
}

export interface CoachData {
    wakeTime: string;
    tasks: RoutineTask[];
    encouragementStyle: string;
}

export interface DailyRoutineHistory {
    [date: string]: DailyTaskState[];
}
