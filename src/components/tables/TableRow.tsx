import { useState } from 'react';
import { TreeNode } from '@/types';
import { cn } from '@/lib/utils';
import { ExpandButton } from '@/components/ui/ExpandButton';

interface TableRowProps {
    node: TreeNode;
    level?: number;
}

export const TableRow = ({ node, level = 0 }: TableRowProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = node.children.length > 0;
    const paddingLeft = level * 24 + 16;

    return (
        <>
            <tr
                aria-level={level + 1}
                aria-expanded={hasChildren ? isExpanded : undefined}
                className={cn(
                    'border-b border-slate-100 text-xs transition-colors hover:bg-slate-50 md:text-sm',
                    level > 0 ? 'bg-slate-50/50' : 'bg-white',
                )}
            >
                {/* Name */}
                <td className="px-4 py-3 font-medium" style={{ paddingLeft: `${paddingLeft}px` }}>
                    <div className="flex items-center">
                        <ExpandButton
                            isExpanded={isExpanded}
                            hasChildren={hasChildren}
                            onToggle={() => setIsExpanded((prev) => !prev)}
                            ariaLabel={`${isExpanded ? 'Collapse' : 'Expand'} ${node.name}`}
                        />
                        <span className="truncate">{node.name}</span>
                    </div>
                </td>

                {/* Email */}
                <td className="px-4 py-3">
                    <span className="truncate" title={node.email}>
                        {node.email}
                    </span>
                </td>

                {/* Balance */}
                <td className="px-4 py-3 text-right font-mono">{node.balance}</td>

                {/* Status */}
                <td className="px-4 py-3 text-center">
                    <span
                        className={cn(
                            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
                            node.isActive
                                ? 'border-green-200 bg-green-50 text-green-700'
                                : 'border-red-200 bg-red-50 text-red-700',
                        )}
                    >
                        {node.isActive ? 'Active' : 'Inactive'}
                    </span>
                </td>
            </tr>

            {/* Рекурсивный рендер детей */}
            {isExpanded &&
                hasChildren &&
                node.children.map((child) => (
                    <TableRow key={child.id} node={child} level={level + 1} />
                ))}
        </>
    );
};
