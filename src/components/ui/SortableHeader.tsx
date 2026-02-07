import { SortField, SortDirection } from '@/lib/data-helpers';
import { SortIndicator } from './SortIndicator';

interface SortableHeaderProps {
    field: SortField;
    label: string;
    currentSort: SortField | null;
    direction: SortDirection;
    onSort: (field: SortField) => void;
    align?: 'left' | 'right';
}

export const SortableHeader = ({
    field,
    label,
    currentSort,
    direction,
    onSort,
    align = 'left',
}: SortableHeaderProps) => {
    const isActive = currentSort === field;

    return (
        <th
            scope="col"
            aria-sort={isActive ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}
            className={`px-4 py-3 ${align === 'right' ? 'text-right' : 'text-left'}`}
        >
            <button
                onClick={() => onSort(field)}
                className={`group inline-flex items-center gap-1 hover:text-slate-800 ${
                    align === 'right' ? 'justify-end' : 'justify-start'
                }`}
                aria-label={`Sort by ${label} ${
                    isActive ? `(${direction === 'asc' ? 'ascending' : 'descending'})` : ''
                }`}
            >
                {label}
                <SortIndicator isActive={isActive} direction={direction} />
            </button>
        </th>
    );
};
