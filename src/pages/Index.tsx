import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MoodChart } from '@/components/mood/MoodChart';
import { MoodHistory } from '@/components/mood/MoodHistory';
import { ProjectReminders } from '@/components/reminders/ProjectReminder';
import { CrisisAlert } from '@/components/alerts/CrisisAlerts';
import { useMoodStore } from '@/hooks/useMoodStore';
import { PlusCircle, Sparkles, TrendingUp, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const Index = () => {
    const { entries, getWeeklyEntries, getAverageMood, detectMoodDip, hasEnoughDataForAnalysis } = useMoodStore();
    const [showCrisisAlert, setShowCrisisAlert] = useState(false);
    const [dismissedAlert, setDismissedAlert] = useState(false);

    const weeklyEntries = getWeeklyEntries();
    const averageMood = getAverageMood(weeklyEntries);
    const todayEntries = entries.filter(e =>
        format(e.timestamp, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
    );

    useEffect(() => {
        if (detectMoodDip() && !dismissedAlert) {
            setShowCrisisAlert(true);
        }
    }, [entries, dismissedAlert]);

    const handleDismissAlert = () => {
        setShowCrisisAlert(false);
        setDismissedAlert(true);
    };

    return (
        <div className="min-h-screen gradient-hero pb-24">
            {/* Header */}
            <header className="px-6 pt-8 pb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            {format(new Date(), 'EEEE, MMMM d')}
                        </p>
                        <h1 className="font-display text-2xl font-bold mt-1">
                            Hey there 👋
                        </h1>
                    </div>
                    <Link to="/log">
                        <Button variant="mood" size="lg" className="gap-2">
                            <PlusCircle className="w-5 h-5" />
                            Log Mood
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Stats Cards */}
            <section className="px-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card rounded-2xl p-4 shadow-card">
                        <div className="flex items-center gap-2 text-primary mb-2">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-xs font-medium">Weekly Average</span>
                        </div>
                        <p className="font-display text-3xl font-bold">
                            {averageMood > 0 ? averageMood.toFixed(1) : '--'}
                            <span className="text-lg text-muted-foreground">/5</span>
                        </p>
                    </div>

                    <div className="bg-card rounded-2xl p-4 shadow-card">
                        <div className="flex items-center gap-2 text-accent mb-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-xs font-medium">Today</span>
                        </div>
                        <p className="font-display text-3xl font-bold">
                            {todayEntries.length}
                            <span className="text-lg text-muted-foreground"> logs</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Analysis Status */}
            {!hasEnoughDataForAnalysis() && (
                <section className="px-6 mb-6">
                    <div className="bg-primary/10 rounded-2xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full gradient-calm flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm">Building your insights</p>
                            <p className="text-xs text-muted-foreground">
                                Log {7 - weeklyEntries.length} more days to unlock personalized patterns
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-display text-2xl font-bold text-primary">
                                {weeklyEntries.length}/7
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Mood Chart */}
            <section className="px-6 mb-6">
                <div className="bg-card rounded-2xl p-5 shadow-card">
                    <h2 className="font-display font-semibold mb-4">Mood Trends</h2>
                    <MoodChart entries={entries} />
                </div>
            </section>

            {/* Reminders */}
            <section className="px-6 mb-6">
                <div className="bg-card rounded-2xl p-5 shadow-card">
                    <ProjectReminders />
                </div>
            </section>

            {/* Recent History */}
            <section className="px-6">
                <h2 className="font-display font-semibold mb-4">Recent Entries</h2>
                <MoodHistory entries={entries} />
            </section>

            {/* Crisis Alert */}
            {showCrisisAlert && <CrisisAlert onDismiss={handleDismissAlert} />}
        </div>
    );
};

export default Index;
