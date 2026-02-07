'use client';

import { useMemo, useState, useCallback } from 'react';
import { User } from '@/types';
import { buildTree, sortTree, filterTree, SortField, SortDirection } from '@/lib/data-helpers';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

interface UserTableProps {
    initialData: User[];
}

const useTableSort = () => {
    const [sortField, setSortField] = useState<SortField | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const handleSort = useCallback((field: SortField) => {
        setSortField((current) => {
            if (current === field) {
                setSortDirection((dir) => (dir === 'asc' ? 'desc' : 'asc'));
                return field;
            }
            setSortDirection('asc');
            return field;
        });
    }, []);

    return { sortField, sortDirection, handleSort };
};

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
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Заголовок таблицы с фильтром */}
            <header className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <h2 className="text-lg font-bold text-slate-800">Users List</h2>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 hover:text-blue-600">
                    <input
                        type="checkbox"
                        checked={showActiveOnly}
                        onChange={(e) => setShowActiveOnly(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    Show Active Only
                </label>
            </header>

            {/* Таблица */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
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
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
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
