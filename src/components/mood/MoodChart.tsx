import { MoodEntry } from '@/types/mood';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { format } from 'date-fns';

interface MoodChartProps {
    entries: MoodEntry[];
}

export function MoodChart({ entries }: MoodChartProps) {
    const chartData = entries
        .slice(0, 14)
        .reverse()
        .map(entry => ({
            date: format(entry.timestamp, 'MMM d'),
            mood: entry.moodLevel,
            fullDate: format(entry.timestamp, 'MMM d, h:mm a')
        }));

    if (chartData.length === 0) {
        return (
            <div className="flex items-center justify-center h-48 bg-muted/30 rounded-2xl">
                <p className="text-muted-foreground">Log your first mood to see trends</p>
            </div>
        );
    }

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(168, 45%, 45%)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(168, 45%, 45%)" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'hsl(220, 10%, 45%)', fontSize: 12 }}
                    />
                    <YAxis
                        domain={[1, 5]}
                        ticks={[1, 2, 3, 4, 5]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'hsl(220, 10%, 45%)', fontSize: 12 }}
                    />
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                    <div className="bg-card shadow-elevated rounded-lg p-3 border border-border">
                                        <p className="text-sm font-medium">{data.fullDate}</p>
                                        <p className="text-primary font-semibold">Mood: {data.mood}/5</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="mood"
                        stroke="hsl(168, 45%, 45%)"
                        strokeWidth={3}
                        fill="url(#moodGradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
