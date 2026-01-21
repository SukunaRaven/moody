import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Plus, Trash2, Bell } from 'lucide-react';
import { format, differenceInDays, isPast, isToday } from 'date-fns';
import { cn } from '@/lib/utils';

interface Reminder {
    id: string;
    title: string;
    dueDate: Date;
}

export function ProjectReminders() {
    const [reminders, setReminders] = useState<Reminder[]>(() => {
        const stored = localStorage.getItem('moody_reminders');
        if (stored) {
            return JSON.parse(stored).map((r: any) => ({
                ...r,
                dueDate: new Date(r.dueDate)
            }));
        }
        return [];
    });

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    const saveReminders = (newReminders: Reminder[]) => {
        localStorage.setItem('moody_reminders', JSON.stringify(newReminders));
        setReminders(newReminders);
    };

    const addReminder = () => {
        if (!title || !dueDate) return;

        const newReminder: Reminder = {
            id: crypto.randomUUID(),
            title,
            dueDate: new Date(dueDate)
        };

        saveReminders([...reminders, newReminder].sort((a, b) =>
            a.dueDate.getTime() - b.dueDate.getTime()
        ));

        setTitle('');
        setDueDate('');
        setShowForm(false);
    };

    const removeReminder = (id: string) => {
        saveReminders(reminders.filter(r => r.id !== id));
    };

    const getDaysText = (date: Date) => {
        const days = differenceInDays(date, new Date());
        if (isPast(date) && !isToday(date)) return 'Overdue';
        if (isToday(date)) return 'Today!';
        if (days === 1) return 'Tomorrow';
        return `${days} days`;
    };

    const getUrgencyClass = (date: Date) => {
        const days = differenceInDays(date, new Date());
        if (isPast(date) || days <= 1) return 'border-destructive/50 bg-destructive/5';
        if (days <= 3) return 'border-accent/50 bg-accent/5';
        return 'border-border';
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h3 className="font-display font-semibold">School Projects</h3>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowForm(!showForm)}
                >
                    <Plus className="w-4 h-4" />
                    Add
                </Button>
            </div>

            {showForm && (
                <div className="p-4 rounded-xl bg-muted/50 space-y-3 animate-fade-in">
                    <Input
                        placeholder="Project name..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        min={format(new Date(), 'yyyy-MM-dd')}
                    />
                    <div className="flex gap-2">
                        <Button size="sm" onClick={addReminder} disabled={!title || !dueDate}>
                            Add Reminder
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {reminders.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                    No upcoming deadlines
                </p>
            ) : (
                <div className="space-y-2">
                    {reminders.map((reminder) => (
                        <div
                            key={reminder.id}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-xl border transition-colors",
                                getUrgencyClass(reminder.dueDate)
                            )}
                        >
                            <Bell className="w-4 h-4 text-muted-foreground shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{reminder.title}</p>
                                <p className="text-xs text-muted-foreground">
                                    {format(reminder.dueDate, 'MMM d, yyyy')}
                                </p>
                            </div>
                            <span className={cn(
                                "text-xs font-semibold px-2 py-1 rounded-full",
                                isPast(reminder.dueDate) && !isToday(reminder.dueDate)
                                    ? "bg-destructive/20 text-destructive"
                                    : differenceInDays(reminder.dueDate, new Date()) <= 3
                                        ? "bg-accent/20 text-accent"
                                        : "bg-primary/20 text-primary"
                            )}>
                {getDaysText(reminder.dueDate)}
              </span>
                            <button
                                onClick={() => removeReminder(reminder.id)}
                                className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
