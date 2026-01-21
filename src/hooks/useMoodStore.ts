import { useState, useEffect } from 'react';
import { MoodEntry, MoodLevel } from '@/types/mood';

const STORAGE_KEY = 'moody_entries';

export function useMoodStore() {
    const [entries, setEntries] = useState<MoodEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            setEntries(parsed.map((e: any) => ({
                ...e,
                timestamp: new Date(e.timestamp)
            })));
        }
        setIsLoading(false);
    }, []);

    const saveEntries = (newEntries: MoodEntry[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
        setEntries(newEntries);
    };

    const addEntry = (entry: Omit<MoodEntry, 'id' | 'timestamp'>) => {
        const newEntry: MoodEntry = {
            ...entry,
            id: crypto.randomUUID(),
            timestamp: new Date()
        };
        saveEntries([newEntry, ...entries]);
        return newEntry;
    };

    const getWeeklyEntries = () => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return entries.filter(e => e.timestamp >= weekAgo);
    };

    const getAverageMood = (periodEntries: MoodEntry[] = entries) => {
        if (periodEntries.length === 0) return 0;
        return periodEntries.reduce((sum, e) => sum + e.moodLevel, 0) / periodEntries.length;
    };

    const detectMoodDip = (): boolean => {
        const recentEntries = entries.slice(0, 5);
        if (recentEntries.length < 3) return false;

        const recentAvg = getAverageMood(recentEntries);
        const lowMoodCount = recentEntries.filter(e => e.moodLevel <= 2).length;

        return recentAvg < 2.5 || lowMoodCount >= 3;
    };

    const hasEnoughDataForAnalysis = () => {
        return getWeeklyEntries().length >= 7;
    };

    return {
        entries,
        isLoading,
        addEntry,
        getWeeklyEntries,
        getAverageMood,
        detectMoodDip,
        hasEnoughDataForAnalysis
    };
}
