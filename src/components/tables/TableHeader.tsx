import { SortField, SortDirection } from '@/lib/data-helpers';

// Вспомогательный компонент для сортировки
interface SortIndicatorProps {
    isActive: boolean;
    direction: SortDirection;
}

const SortIndicator = ({ isActive, direction }: SortIndicatorProps) => {
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

// Main Component
interface TableHeaderProps {
    currentSort: SortField | null;
    direction: SortDirection;
    onSort: (field: SortField) => void;
}

export const TableHeader = ({ currentSort, direction, onSort }: TableHeaderProps) => {
    return (
        <div
            role="rowgroup"
            className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wider text-slate-500 uppercase"
        >
            <div role="row" className="grid grid-cols-12 py-3">
                {/* столбец Name */}
                <div role="columnheader" className="col-span-4 flex items-center px-4">
                    Name
                </div>

                {/* столбец email (сортируемый) */}
                <div
                    role="columnheader"
                    aria-sort={
                        currentSort === 'email'
                            ? direction === 'asc'
                                ? 'ascending'
                                : 'descending'
                            : 'none'
                    }
                    className="col-span-4"
                >
                    <button
                        onClick={() => onSort('email')}
                        className="group flex w-full items-center px-2 hover:text-slate-800"
                    >
                        Email
                        <SortIndicator isActive={currentSort === 'email'} direction={direction} />
                    </button>
                </div>

                {/* столбец balance (сортируемый) */}
                <div
                    role="columnheader"
                    aria-sort={
                        currentSort === 'balance'
                            ? direction === 'asc'
                                ? 'ascending'
                                : 'descending'
                            : 'none'
                    }
                    className="col-span-2"
                >
                    <button
                        onClick={() => onSort('balance')}
                        className="group flex w-full items-center justify-end px-2 hover:text-slate-800"
                    >
                        Balance
                        <SortIndicator isActive={currentSort === 'balance'} direction={direction} />
                    </button>
                </div>

                {/* столбец status */}
                <div role="columnheader" className="col-span-2 px-2 text-center">
                    Status
                </div>
            </div>
        </div>
    );
};
