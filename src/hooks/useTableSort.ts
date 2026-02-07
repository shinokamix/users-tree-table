import { SortDirection, SortField } from '@/lib/data-helpers';
import { useCallback, useState } from 'react';

export const useTableSort = () => {
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
