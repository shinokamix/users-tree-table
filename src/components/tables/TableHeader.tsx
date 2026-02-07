import { SortField, SortDirection } from '@/lib/data-helpers';
import { SortableHeader } from '@/components/ui/SortableHeader';

interface TableHeaderProps {
    currentSort: SortField | null;
    direction: SortDirection;
    onSort: (field: SortField) => void;
}

export const TableHeader = ({ currentSort, direction, onSort }: TableHeaderProps) => {
    return (
        <thead className="border-b border-slate-200 bg-slate-50">
            <tr className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                <th scope="col" className="px-4 py-3 text-left">
                    Name
                </th>
                <SortableHeader
                    field="email"
                    label="Email"
                    currentSort={currentSort}
                    direction={direction}
                    onSort={onSort}
                />
                <SortableHeader
                    field="balance"
                    label="Balance"
                    currentSort={currentSort}
                    direction={direction}
                    onSort={onSort}
                    align="right"
                />
                <th scope="col" className="px-4 py-3 text-center">
                    Status
                </th>
            </tr>
        </thead>
    );
};
