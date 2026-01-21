export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export interface MoodEntry {
    id: string;
    moodLevel: MoodLevel;
    emotions: string[];
    situation: string;
    notes: string;
    timestamp: Date;
}

export interface MoodPattern {
    type: 'time_of_day' | 'day_of_week' | 'situation' | 'emotion_cluster';
    data: Record<string, number>;
    insight: string;
}

export interface ProjectReminder {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    notified: boolean;
}

export const EMOTIONS = [
    'Happy', 'Calm', 'Excited', 'Grateful', 'Hopeful',
    'Anxious', 'Stressed', 'Sad', 'Angry', 'Frustrated',
    'Tired', 'Overwhelmed', 'Lonely', 'Confused', 'Neutral'
] as const;

export const SITUATIONS = [
    'Work/School', 'Social', 'Family', 'Exercise', 'Relaxing',
    'Eating', 'Commuting', 'Creative', 'Learning', 'Other'
] as const;

export const MOOD_LABELS: Record<MoodLevel, string> = {
    1: 'Very Low',
    2: 'Low',
    3: 'Okay',
    4: 'Good',
    5: 'Great'
};

export const MOOD_COLORS: Record<MoodLevel, string> = {
    1: 'mood-bad',
    2: 'mood-low',
    3: 'mood-okay',
    4: 'mood-good',
    5: 'mood-great'
};
