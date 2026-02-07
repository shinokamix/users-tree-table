import { cn } from '@/lib/utils';

interface ExpandButtonProps {
    isExpanded: boolean;
    hasChildren: boolean;
    onToggle: () => void;
    ariaLabel: string;
}

export const ExpandButton = ({
    isExpanded,
    hasChildren,
    onToggle,
    ariaLabel,
}: ExpandButtonProps) => {
    if (!hasChildren) {
        return <span className="w-6" aria-hidden="true" />;
    }

    return (
        <button
            onClick={onToggle}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onToggle();
                }
            }}
            aria-label={ariaLabel}
            aria-expanded={isExpanded}
            className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
        >
            <svg
                className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    isExpanded && 'rotate-90',
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );
};
