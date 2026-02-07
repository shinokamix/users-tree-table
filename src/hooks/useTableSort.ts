import { SortDirection, SortField } from '@/lib/data-helpers';
import { useCallback, useState } from 'react';

export const useTableSort = () => {
    const [sortField, setSortField] = useState<SortField | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const handleSort = useCallback(
        (field: SortField) => {
            if (sortField === field) {
                setSortDirection((dir) => (dir === 'asc' ? 'desc' : 'asc'));
            } else {
                setSortField(field);
                setSortDirection('asc');
            }
        },
        [sortField],
    );

    return { sortField, sortDirection, handleSort };
};
