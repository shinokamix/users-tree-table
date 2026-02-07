'use client';

import { useMemo, useState } from 'react';
import { User } from '@/types';
import { buildTree, sortTree, filterTree, SortField, SortDirection } from '@/lib/data-helpers';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

interface UserTableProps {
    initialData: User[];
}

export const UserTable = ({ initialData }: UserTableProps) => {
    const [isActiveFilter, setIsActiveFilter] = useState(false);
    const [sortField, setSortField] = useState<SortField | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const processedData = useMemo(() => {
        // 1. Build
        const tree = buildTree(initialData);
        // 2. Filter
        const filtered = filterTree(tree, isActiveFilter);
        // 3. Sort
        return sortField ? sortTree(filtered, sortField, sortDirection) : filtered;
    }, [initialData, isActiveFilter, sortField, sortDirection]);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    return (
        <section
            aria-labelledby="table-title"
            className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
            {/* Table Controls / Toolbar */}
            <header className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
                <h2 id="table-title" className="text-lg font-bold text-slate-800">
                    Users List
                </h2>

                <label className="flex cursor-pointer items-center space-x-2 text-sm text-slate-700 transition-colors select-none hover:text-blue-600">
                    <input
                        type="checkbox"
                        checked={isActiveFilter}
                        onChange={(e) => setIsActiveFilter(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-2"
                    />
                    <span>Show Active Only</span>
                </label>
            </header>

            {/* Table Container */}
            <div
                role="table"
                aria-label="Hierarchical Users Data"
                className="flex min-w-175 flex-col"
            >
                <TableHeader
                    currentSort={sortField}
                    direction={sortDirection}
                    onSort={handleSort}
                />

                {/* Table Body */}
                <div role="rowgroup" className="">
                    {processedData.length > 0 ? (
                        processedData.map((node) => <TableRow key={node.id} node={node} />)
                    ) : (
                        <div role="row" className="p-12 text-center text-slate-400">
                            <span role="cell">No users found matching current filters.</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
