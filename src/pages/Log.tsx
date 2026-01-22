import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MoodSelector } from "@/components/mood/MoodSelector";
import { EmotionPicker } from "@/components/mood/EmotionPicker";
import { SituationPicker } from "@/components/mood/SituationPicker";
import { useMoodStore } from "@/hooks/useMoodStore";
import { MoodLevel } from "@/types/mood";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STEPS = ["mood", "emotions", "situation", "notes"] as const;
type Step = typeof STEPS[number];

const stepTitle: Record<Step, string> = {
    mood: "How are you feeling?",
    emotions: "Pick your emotions",
    situation: "What’s influencing this?",
    notes: "Anything else to add?",
};

const stepHint: Record<Step, string> = {
    mood: "Select a mood level that matches your day so far.",
    emotions: "Choose one or more emotions that best describe how you feel.",
    situation: "Select the context that might be affecting your mood.",
    notes: "Optional: write anything you want to remember later.",
};

const Log = () => {
    const navigate = useNavigate();
    const { addEntry } = useMoodStore();

    const [step, setStep] = useState<Step>("mood");
    const [moodLevel, setMoodLevel] = useState<MoodLevel | null>(null);
    const [emotions, setEmotions] = useState<string[]>([]);
    const [situation, setSituation] = useState("");
    const [notes, setNotes] = useState("");

    const currentStepIndex = STEPS.indexOf(step);
    const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

    const canProceed = () => {
        switch (step) {
            case "mood":
                return moodLevel !== null;
            case "emotions":
                return emotions.length > 0;
            case "situation":
                return situation !== "";
            case "notes":
                return true;
            default:
                return false;
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
            navigate("/");
        }
    };

    const handleSubmit = () => {
        if (!moodLevel) return;

        addEntry({
            moodLevel,
            emotions,
            situation,
            notes,
        });

        toast.success("Mood logged successfully!");
        navigate("/");
    };

    return (
        <div className="min-h-screen !bg-[#F2F0FF] pb-24 !text-[#051A2F]">
            {/* Header */}
            <header className="px-6 pt-8 pb-5">
                <div className="flex items-start justify-between">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-[#6B7280] hover:text-[#051A2F] transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-[11px] font-semibold tracking-[0.16em] uppercase">
                            Back
                        </span>
                    </button>

                    <div className="flex items-center gap-3">
                        <img
                            src="/image/moody-chatbot.png"
                            alt="Moody assistant"
                            className="w-10 h-10 rounded-2xl bg-white shadow-sm p-1 border border-black/5"
                        />
                    </div>
                </div>
            </header>

            {/* Step card */}
            <section className="px-6 mb-6">
                <div className="bg-white/90 border border-black/5 shadow-sm rounded-2xl p-5">
                    <div className="space-y-2">
                        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#6B7280]">
                            Step {currentStepIndex + 1} of {STEPS.length}
                        </p>

                        <h1 className="font-display text-[22px] leading-tight font-semibold text-[#051A2F]">
                            {stepTitle[step]}
                        </h1>

                        <p className="text-sm text-[#6B7280] leading-relaxed">
                            {stepHint[step]}
                        </p>
                    </div>

                    <div className="mt-5">
                        <div className="h-2 bg-[#F2F0FF] border border-black/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#2C5FCB] transition-all duration-500 ease-out rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="flex justify-between mt-4">
                            {STEPS.map((s, i) => (
                                <div
                                    key={s}
                                    className={cn(
                                        "rounded-2xl flex items-center justify-center font-semibold transition-all border shadow-sm",
                                        "w-8 h-8 text-[11px] sm:w-10 sm:h-10 sm:text-xs",
                                        i < currentStepIndex
                                            ? "bg-[#2C5FCB] text-white border-black/5"
                                            : i === currentStepIndex
                                                ? "bg-white text-[#2C5FCB] border-black/5 ring-2 ring-[#2C5FCB]/30"
                                                : "bg-white/70 text-[#6B7280] border-black/5"
                                    )}
                                >
                                    {i < currentStepIndex ? <Check className="w-4 h-4" /> : i + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Step Content */}
            {/* FIX ADDED: pb-32 prevents overlap with the fixed bottom button */}
            <main className="px-6">
                <div className="min-h-[48vh] flex flex-col pb-32">
                    {step === "mood" && (
                        <div className="animate-fade-in bg-white border border-black/5 shadow-sm rounded-2xl p-4 sm:p-5 overflow-hidden">
                            <div className="w-full origin-top scale-[0.88] sm:scale-100">
                                <MoodSelector value={moodLevel} onChange={setMoodLevel} />
                            </div>
                        </div>
                    )}

                    {step === "emotions" && (
                        <div className="animate-fade-in bg-white border border-black/5 shadow-sm rounded-2xl p-5">
                            <EmotionPicker selected={emotions} onChange={setEmotions} />
                        </div>
                    )}

                    {step === "situation" && (
                        <div className="animate-fade-in bg-white border border-black/5 shadow-sm rounded-2xl p-5">
                            <SituationPicker value={situation} onChange={setSituation} />
                        </div>
                    )}

                    {step === "notes" && (
                        <div className="animate-fade-in bg-white border border-black/5 shadow-sm rounded-2xl p-5 space-y-4">
                            <h3 className="font-display text-base font-semibold text-[#051A2F]">
                                Add a short note (optional)
                            </h3>

                            <Textarea
                                placeholder="Write any thoughts, reflections, or context... (optional)"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="min-h-[160px] resize-none rounded-2xl bg-[#F2F0FF]/40 border border-black/5 shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                            />

                            <p className="text-xs text-[#6B7280] leading-relaxed">
                                Tip: Keep it simple — a sentence or two is enough.
                            </p>
                        </div>
                    )}
                </div>

                {/* Action Bar */}
                <div className="fixed bottom-24 left-6 right-6">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white/90 border border-black/5 shadow-sm rounded-2xl p-3 flex gap-3">
                            <Button
                                variant="outline"
                                className="rounded-2xl border-black/10 bg-white hover:bg-white/80"
                                onClick={handleBack}
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </Button>

                            <Button
                                variant="mood"
                                size="xl"
                                className="flex-1 !rounded-2xl !bg-[#2C5FCB] !text-white !shadow-sm hover:!bg-[#244FA7] active:!bg-[#1F448F] disabled:opacity-50 disabled:cursor-not-allowed gap-2"
                                onClick={handleNext}
                                disabled={!canProceed()}
                            >
                                {step === "notes" ? (
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
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Log;
