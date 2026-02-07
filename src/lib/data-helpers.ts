import { User, TreeNode } from '@/types';

// парсинг баланса
export const parseBalance = (balance: string): number => {
    return parseFloat(balance.replace(/[$,]/g, ''));
};

// построение дерева из списка
export const buildTree = (items: User[]): TreeNode[] => {
    const dataMap: Record<number, TreeNode> = {};
    const rootNodes: TreeNode[] = [];

    items.forEach((item) => {
        dataMap[item.id] = { ...item, children: [] };
    });

    items.forEach((item) => {
        const node = dataMap[item.id];
        if (item.parentId === 0) {
            rootNodes.push(node);
        } else {
            const parent = dataMap[item.parentId];
            if (parent) {
                parent.children.push(node);
            } else {
                rootNodes.push(node);
            }
        }
    });

    return rootNodes;
};

// типы для сортировки
export type SortField = 'balance' | 'email';
export type SortDirection = 'asc' | 'desc';

// рекурсивная сортировка дерева
export const sortTree = (
    nodes: TreeNode[],
    field: SortField,
    direction: SortDirection,
): TreeNode[] => {
    const sortedNodes = [...nodes].sort((a, b) => {
        let valueA: number | string;
        let valueB: number | string;

        if (field === 'balance') {
            valueA = parseBalance(a.balance);
            valueB = parseBalance(b.balance);
        } else {
            valueA = a.email.toLowerCase();
            valueB = b.email.toLowerCase();
        }

        if (valueA < valueB) return direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return direction === 'asc' ? 1 : -1;
        return 0;
    });

    return sortedNodes.map((node) => ({
        ...node,
        children: sortTree(node.children, field, direction),
    }));
};

// фильтрация по свойству isActive
export const filterTree = (nodes: TreeNode[], onlyActive: boolean): TreeNode[] => {
    if (!onlyActive) return nodes;

    return nodes
        .filter((node) => node.isActive)
        .map((node) => ({
            ...node,
            children: filterTree(node.children, onlyActive),
        }));
};
