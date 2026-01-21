import { useMoodStore } from '@/hooks/useMoodStore';
import { MoodChart } from '@/components/mood/MoodChart';
import { EMOTIONS, SITUATIONS } from '@/types/mood';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Lock, TrendingUp, Brain, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

const Insights = () => {
    const { entries, getWeeklyEntries, hasEnoughDataForAnalysis, getAverageMood } = useMoodStore();
    const weeklyEntries = getWeeklyEntries();
    const hasData = hasEnoughDataForAnalysis();

    // Calculate emotion frequency
    const emotionCounts = EMOTIONS.reduce((acc, emotion) => {
        acc[emotion] = entries.filter(e => e.emotions.includes(emotion)).length;
        return acc;
    }, {} as Record<string, number>);

    const topEmotions = Object.entries(emotionCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));

    // Calculate situation breakdown
    const situationCounts = SITUATIONS.reduce((acc, situation) => {
        acc[situation] = entries.filter(e => e.situation === situation).length;
        return acc;
    }, {} as Record<string, number>);

    const situationData = Object.entries(situationCounts)
        .filter(([_, count]) => count > 0)
        .map(([name, value]) => ({ name, value }));

    const COLORS = ['#3D9A8B', '#E88B6E', '#F5C26B', '#8BC4C4', '#D4A5A5'];

    // Calculate day of week patterns
    const dayPatterns = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => {
        const dayEntries = entries.filter(e =>
            new Date(e.timestamp).toLocaleDateString('en-US', { weekday: 'short' }) === day
        );
        return {
            day,
            avgMood: dayEntries.length > 0 ? getAverageMood(dayEntries) : 0
        };
    });

    if (!hasData) {
        return (
            <div className="min-h-screen bg-background pb-24">
                <header className="px-6 pt-8 pb-6">
                    <h1 className="font-display text-2xl font-bold">Insights</h1>
                    <p className="text-muted-foreground mt-1">Your personalized patterns</p>
                </header>

                <main className="px-6">
                    <div className="bg-card rounded-2xl p-8 shadow-card text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="font-display text-xl font-semibold mb-2">Insights Locked</h2>
                        <p className="text-muted-foreground mb-4">
                            Keep logging your moods! We need at least 7 days of data to build your personalized insights.
                        </p>
                        <div className="bg-muted rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Progress</span>
                                <span className="text-sm text-primary font-semibold">{weeklyEntries.length}/7 days</span>
                            </div>
                            <div className="h-2 bg-background rounded-full overflow-hidden">
                                <div
                                    className="h-full gradient-calm rounded-full transition-all duration-500"
                                    style={{ width: `${(weeklyEntries.length / 7) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-24">
            <header className="px-6 pt-8 pb-6">
                <h1 className="font-display text-2xl font-bold">Insights</h1>
                <p className="text-muted-foreground mt-1">Based on {entries.length} mood logs</p>
            </header>

            <main className="px-6 space-y-6">
                {/* Mood Trend */}
                <section className="bg-card rounded-2xl p-5 shadow-card">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        <h2 className="font-display font-semibold">Mood Trend</h2>
                    </div>
                    <MoodChart entries={entries} />
                </section>

                {/* Day of Week Pattern */}
                <section className="bg-card rounded-2xl p-5 shadow-card">
                    <div className="flex items-center gap-2 mb-4">
                        <Brain className="w-5 h-5 text-accent" />
                        <h2 className="font-display font-semibold">Weekly Pattern</h2>
                    </div>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dayPatterns}>
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: 'hsl(220, 10%, 45%)' }}
                                />
                                <YAxis
                                    domain={[0, 5]}
                                    hide
                                />
                                <Bar
                                    dataKey="avgMood"
                                    fill="hsl(168, 45%, 45%)"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                {/* Top Emotions */}
                <section className="bg-card rounded-2xl p-5 shadow-card">
                    <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="w-5 h-5 text-primary" />
                        <h2 className="font-display font-semibold">Most Felt Emotions</h2>
                    </div>
                    <div className="space-y-3">
                        {topEmotions.map((emotion, index) => (
                            <div key={emotion.name} className="flex items-center gap-3">
                <span className="w-6 text-center text-sm font-medium text-muted-foreground">
                  {index + 1}
                </span>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium">{emotion.name}</span>
                                        <span className="text-sm text-muted-foreground">{emotion.count}x</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full gradient-calm rounded-full"
                                            style={{ width: `${(emotion.count / Math.max(...topEmotions.map(e => e.count))) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Situation Breakdown */}
                {situationData.length > 0 && (
                    <section className="bg-card rounded-2xl p-5 shadow-card">
                        <h2 className="font-display font-semibold mb-4">Where You Log</h2>
                        <div className="flex items-center gap-4">
                            <div className="w-32 h-32">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={situationData}
                                            innerRadius={35}
                                            outerRadius={55}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {situationData.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex-1 space-y-2">
                                {situationData.slice(0, 4).map((item, index) => (
                                    <div key={item.name} className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                        />
                                        <span className="text-sm">{item.name}</span>
                                        <span className="text-xs text-muted-foreground ml-auto">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default Insights;
