import { SortDirection } from '@/lib/data-helpers';

interface SortIndicatorProps {
    isActive: boolean;
    direction: SortDirection;
}

export const SortIndicator = ({ isActive, direction }: SortIndicatorProps) => {
    if (!isActive) {
        return (
            <span
                className="ml-1 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
            >
                ↕
            </span>
        );
    }

    return (
        <span className="ml-1 text-blue-600" aria-hidden="true">
            {direction === 'asc' ? '↑' : '↓'}
        </span>
    );
};
