import Image from 'next/image';

interface ExpandButtonProps {
    isExpanded: boolean;
    hasChildren: boolean;
    onToggle: () => void;
    ariaLabel: string;
}

export const ExpandButton = ({
    isExpanded,
    hasChildren,
    onToggle,
    ariaLabel,
}: ExpandButtonProps) => {
    if (!hasChildren) {
        return <span className="w-6" aria-hidden="true" />;
    }

    return (
        <button
            onClick={onToggle}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onToggle();
                }
            }}
            aria-label={ariaLabel}
            aria-expanded={isExpanded}
            className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
        >
            {isExpanded ? (
                <Image src={'/chevron-down.svg'} width={12} height={12} alt="" />
            ) : (
                <Image src={'/chevron-right.svg'} width={12} height={12} alt="" />
            )}
        </button>
    );
};
