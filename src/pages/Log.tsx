import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MoodSelector } from '@/components/mood/MoodSelector';
import { EmotionPicker } from '@/components/mood/EmotionPicker';
import { SituationPicker } from '@/components/mood/SituationPicker';
import { useMoodStore } from '@/hooks/useMoodStore';
import { MoodLevel } from '@/types/mood';
import { ArrowLeft, Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const STEPS = ['mood', 'emotions', 'situation', 'notes'] as const;
type Step = typeof STEPS[number];

const Log = () => {
    const navigate = useNavigate();
    const { addEntry } = useMoodStore();

    const [step, setStep] = useState<Step>('mood');
    const [moodLevel, setMoodLevel] = useState<MoodLevel | null>(null);
    const [emotions, setEmotions] = useState<string[]>([]);
    const [situation, setSituation] = useState('');
    const [notes, setNotes] = useState('');

    const currentStepIndex = STEPS.indexOf(step);
    const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

    const canProceed = () => {
        switch (step) {
            case 'mood': return moodLevel !== null;
            case 'emotions': return emotions.length > 0;
            case 'situation': return situation !== '';
            case 'notes': return true;
            default: return false;
        }
    };

    const handleNext = () => {
        const nextIndex = currentStepIndex + 1;
        if (nextIndex < STEPS.length) {
            setStep(STEPS[nextIndex]);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        const prevIndex = currentStepIndex - 1;
        if (prevIndex >= 0) {
            setStep(STEPS[prevIndex]);
        } else {
            navigate('/');
        }
    };

    const handleSubmit = () => {
        if (!moodLevel) return;

        addEntry({
            moodLevel,
            emotions,
            situation,
            notes
        });

        toast.success('Mood logged successfully! 🎉');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <header className="px-6 pt-6 pb-4">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>
            </header>

            {/* Progress */}
            <div className="px-6 mb-8">
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                        className="h-full gradient-calm transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between mt-2">
                    {STEPS.map((s, i) => (
                        <div
                            key={s}
                            className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                                i < currentStepIndex
                                    ? "bg-primary text-primary-foreground"
                                    : i === currentStepIndex
                                        ? "bg-primary/20 text-primary ring-2 ring-primary"
                                        : "bg-muted text-muted-foreground"
                            )}
                        >
                            {i < currentStepIndex ? <Check className="w-4 h-4" /> : i + 1}
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <main className="px-6">
                <div className="min-h-[50vh] flex flex-col">
                    {step === 'mood' && (
                        <div className="animate-fade-in">
                            <MoodSelector value={moodLevel} onChange={setMoodLevel} />
                        </div>
                    )}

                    {step === 'emotions' && (
                        <div className="animate-fade-in">
                            <EmotionPicker selected={emotions} onChange={setEmotions} />
                        </div>
                    )}

                    {step === 'situation' && (
                        <div className="animate-fade-in">
                            <SituationPicker value={situation} onChange={setSituation} />
                        </div>
                    )}

                    {step === 'notes' && (
                        <div className="animate-fade-in space-y-4">
                            <h3 className="font-display text-lg font-medium text-foreground">
                                Anything else on your mind?
                            </h3>
                            <Textarea
                                placeholder="Write any thoughts, reflections, or context... (optional)"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="min-h-[150px] resize-none rounded-xl"
                            />
                        </div>
                    )}
                </div>

                {/* Action Button */}
                <div className="fixed bottom-24 left-6 right-6">
                    <Button
                        variant="mood"
                        size="xl"
                        className="w-full"
                        onClick={handleNext}
                        disabled={!canProceed()}
                    >
                        {step === 'notes' ? (
                            <>
                                <Check className="w-5 h-5" />
                                Save Entry
                            </>
                        ) : (
                            <>
                                Continue
                                <ChevronRight className="w-5 h-5" />
                            </>
                        )}
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default Log;
