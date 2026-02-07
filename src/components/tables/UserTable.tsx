'use client';

import { useMemo, useState } from 'react';
import { User } from '@/types';
import { buildTree, sortTree, filterTree } from '@/lib/data-helpers';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { useTableSort } from '@/hooks/useTableSort';

interface UserTableProps {
    initialData: User[];
}

export const UserTable = ({ initialData }: UserTableProps) => {
    const [showActiveOnly, setShowActiveOnly] = useState(false);
    const { sortField, sortDirection, handleSort } = useTableSort();

    const processedData = useMemo(() => {
        const tree = buildTree(initialData);
        const filtered = filterTree(tree, showActiveOnly);
        return sortField ? sortTree(filtered, sortField, sortDirection) : filtered;
    }, [initialData, showActiveOnly, sortField, sortDirection]);

    const hasData = processedData.length > 0;

    return (
        <section className="">
            {/* Заголовок таблицы с фильтром */}
            <header className="flex items-center justify-between border-b border-slate-100 px-3 py-4">
                <h2 className="text-lg font-bold">Users List</h2>
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={showActiveOnly}
                        onChange={(e) => setShowActiveOnly(e.target.checked)}
                        className="border-slate-30 h-4 w-4 rounded"
                    />
                    Show Active Only
                </label>
            </header>

            {/* Таблица */}
            <div className="overflow-x-auto">
                <table className="w-full table-fixed divide-y divide-slate-200">
                    <caption className="sr-only">Hierarchical users table with sorting</caption>
                    <TableHeader
                        currentSort={sortField}
                        direction={sortDirection}
                        onSort={handleSort}
                    />
                    <tbody className="divide-y divide-slate-100">
                        {hasData ? (
                            processedData.map((node) => <TableRow key={node.id} node={node} />)
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center">
                                    No users found matching current filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
