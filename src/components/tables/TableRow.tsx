import { useState } from 'react';
import { TreeNode } from '@/types';
import { cn } from '@/lib/utils';

interface TableRowProps {
    node: TreeNode;
    level?: number;
}

export const TableRow = ({ node, level = 0 }: TableRowProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = node.children.length > 0;

    // отступ и цвет фона для вложенности
    const paddingLeft = level * 24 + 16;
    const isNested = level > 0;

    return (
        <div role="rowgroup">
            <div
                role="row"
                aria-level={level + 1}
                aria-expanded={hasChildren ? isExpanded : undefined}
                className={cn(
                    'grid grid-cols-12 items-center border-b border-slate-100 py-3 text-sm transition-colors hover:bg-slate-50',
                    isNested ? 'bg-slate-50/50' : 'bg-white',
                )}
            >
                {/* name */}
                <div
                    role="gridcell"
                    className="col-span-4 flex items-center pr-4 font-medium text-slate-900"
                    style={{ paddingLeft: `${paddingLeft}px` }}
                >
                    {hasChildren ? (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                            className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
                        >
                            <svg
                                className={cn(
                                    'h-4 w-4 transition-transform duration-200',
                                    isExpanded && 'rotate-90',
                                )}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    ) : (
                        // плейсхолдер, чтобы текст выравнивался с другими строками
                        <span className="mr-2 h-6 w-6 shrink-0" aria-hidden="true" />
                    )}
                    <span className="truncate">{node.name}</span>
                </div>

                {/* email */}
                <div
                    role="gridcell"
                    className="col-span-4 truncate px-2 text-slate-500"
                    title={node.email}
                >
                    {node.email}
                </div>

                {/* balance */}
                <div
                    role="gridcell"
                    className="col-span-2 px-2 text-right font-mono text-slate-600"
                >
                    {node.balance}
                </div>

                {/* status */}
                <div role="gridcell" className="col-span-2 flex justify-center px-2">
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
                </div>
            </div>

            {/* рекурсивный рендер детей */}
            {isExpanded && hasChildren && (
                <>
                    {node.children.map((child) => (
                        <TableRow key={child.id} node={child} level={level + 1} />
                    ))}
                </>
            )}
        </div>
    );
};
