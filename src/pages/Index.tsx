import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {MoodChart} from '@/components/mood/MoodChart';
import {MoodHistory} from '@/components/mood/MoodHistory';
import {ProjectReminders} from '@/components/reminders/ProjectReminder';
import {CrisisAlert} from '@/components/alerts/CrisisAlerts';
import {useMoodStore} from '@/hooks/useMoodStore';
import {PlusCircle, Sparkles, TrendingUp, Calendar} from 'lucide-react';
import {format} from 'date-fns';

const Index = () => {
    const {entries, getWeeklyEntries, getAverageMood, detectMoodDip, hasEnoughDataForAnalysis} = useMoodStore();
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
        <div className="min-h-screen !bg-[#F2F0FF] pb-24 !text-[#051A2F]">
            {/* Header */}
            <header className="px-6 pt-8 pb-5">
                <div className="flex items-end justify-between">
                    <div className="space-y-2">
                        <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#6B7280]">
                            {format(new Date(), 'EEEE, MMMM d')}
                        </p>
                        <h1 className="font-display text-[22px] leading-tight font-semibold text-[#051A2F]">
                            Hey there 👋
                        </h1>
                    </div>
                    <Link to="/log">
                        <Button
                            variant="mood"
                            size="lg"
                            className="gap-2 !rounded-2xl !bg-[#2C5FCB] !text-white !shadow-sm hover:!bg-[#244FA7] active:!bg-[#1F448F] px-4"
                        >
                            <PlusCircle className="w-5 h-5"/>
                            Log Mood
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Stats Cards */}
            <section className="px-6 mb-7">
                <div className="grid grid-cols-2 gap-4">
                    <div
                        className="rounded-2xl p-4 border border-black/5 shadow-sm bg-gradient-to-br from-[#EAE6FF] to-[#F7F6FF]">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-[#2C5FCB]"/>
                            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6B7280]">
                                Weekly Average
                            </span>
                        </div>
                        <p className="font-display text-3xl leading-none font-bold text-[#051A2F]">
                            {averageMood > 0 ? averageMood.toFixed(1) : '--'}
                            <span className="text-lg text-[#6B7280]">/5</span>
                        </p>
                    </div>

                    <div
                        className="rounded-2xl p-4 border border-black/5 shadow-sm bg-gradient-to-br from-[#E2EEFF] to-[#F3F7FF]">
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-[#7766C6]"/>
                            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6B7280]">
                                Today
                            </span>
                        </div>
                        <p className="font-display text-3xl leading-none font-bold text-[#051A2F]">
                            {todayEntries.length}
                            <span className="text-lg text-[#6B7280]"> logs</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Analysis Status */}
            {!hasEnoughDataForAnalysis() && (
                <section className="px-6 mb-7">
                    <div
                        className="bg-white/85 rounded-2xl p-4 flex items-center gap-3 border border-black/5 shadow-sm">
                        <div className="w-10 h-10 rounded-2xl bg-[#2C5FCB] flex items-center justify-center shadow-sm">
                            <Sparkles className="w-5 h-5 text-white"/>
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-sm text-[#051A2F]">Building your insights</p>
                            <p className="text-xs text-[#6B7280]">
                                Log {7 - weeklyEntries.length} more days to unlock personalized patterns
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-display text-2xl leading-none font-bold text-[#2C5FCB]">
                                {weeklyEntries.length}/7
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Mood Chart */}
            <section className="px-6 mb-7">
                <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm">
                    <h2 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#6B7280] mb-3">
                        Weekly Mood
                    </h2>
                    <h3 className="font-display text-base font-semibold mb-4 text-[#051A2F]">
                        Mood Trends
                    </h3>
                    <MoodChart entries={entries}/>
                </div>
            </section>

            {/* Reminders */}
            <section className="px-6 mb-7">
                <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm">
                    <h2 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#6B7280] mb-3">
                        Today’s Overview
                    </h2>
                    <ProjectReminders/>
                </div>
            </section>

            {/* Recent History */}
            <section className="px-6">
                <h2 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#6B7280] mb-3">
                    Recent Entries
                </h2>
                <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-3">
                    <MoodHistory entries={entries}/>
                </div>
            </section>

            {/* Crisis Alert */}
            {showCrisisAlert && <CrisisAlert onDismiss={handleDismissAlert}/>}
        </div>
    );
};

export default Index;
