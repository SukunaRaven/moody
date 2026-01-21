import { NavLink, useLocation } from 'react-router-dom';
import { Home, PlusCircle, BarChart3, MessageCircle, HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/log', icon: PlusCircle, label: 'Log' },
    { to: '/insights', icon: BarChart3, label: 'Insights' },
    { to: '/coach', icon: HeartHandshake, label: 'Coach' },
    { to: '/chat', icon: MessageCircle, label: 'Chat' },
];

export function Navigation() {
    const location = useLocation();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border z-40">
            <div className="max-w-md mx-auto px-4">
                <div className="flex justify-around py-2">
                    {navItems.map(({ to, icon: Icon, label }) => {
                        const isActive = location.pathname === to;
                        return (
                            <NavLink
                                key={to}
                                to={to}
                                className={cn(
                                    "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <div className={cn(
                                    "p-2 rounded-xl transition-all duration-200",
                                    isActive && "bg-primary/10"
                                )}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-medium">{label}</span>
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
