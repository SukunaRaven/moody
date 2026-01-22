// ---------------------------------------------------------
// Mood types & constants
// ---------------------------------------------------------

export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export interface MoodEntry {
    id: string;
    moodLevel: MoodLevel;
    emotions: string[];
    situation: string;
    notes?: string;
    timestamp: Date;
}

// ---------------------------------------------------------
// Expanded emotion list
// (Requested change: full list instead of limited options)
// ---------------------------------------------------------

export const EMOTIONS: string[] = [
    "Happy",
    "Sad",
    "Angry",
    "Afraid",
    "Disgusted",
    "Surprised",
    "Stressed",
    "Anxious",
    "Tired",
    "Confident",
    "Calm",
    "Overwhelmed",
    "Frustrated",
    "Bored",
    "Excited",
    "Hopeful",
    "Lonely",
    "Content",
    "Irritated",
    "Motivated"
];

// ---------------------------------------------------------
// Mood labels (unchanged)
// ---------------------------------------------------------

export const MOOD_LABELS: Record<MoodLevel, string> = {
    1: "Very Low",
    2: "Low",
    3: "Neutral",
    4: "Good",
    5: "Very Good"
};

// ---------------------------------------------------------
// Mood-level color classes (unchanged)
// ---------------------------------------------------------

export const MOOD_COLORS: Record<MoodLevel, string> = {
    1: "bg-red-200 text-red-800",
    2: "bg-orange-200 text-orange-800",
    3: "bg-gray-200 text-gray-800",
    4: "bg-green-200 text-green-800",
    5: "bg-blue-200 text-blue-800"
};

// ---------------------------------------------------------
// Situations (unchanged)
// ---------------------------------------------------------

export const SITUATIONS = [
    "Work/School",
    "Social",
    "Family",
    "Exercise",
    "Relaxing",
    "Eating",
    "Commuting",
    "Creative",
    "Learning",
    "Other"
];
