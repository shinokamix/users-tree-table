import { SortDirection } from '@/lib/data-helpers';
import Image from 'next/image';
interface SortIndicatorProps {
    isActive: boolean;
    direction: SortDirection;
}

export const SortIndicator = ({ isActive, direction }: SortIndicatorProps) => {
    if (!isActive) {
        return (
            <span
                className="ml-1 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
            >
                <Image src={'/sort-default.svg'} alt="" width={12} height={12} />
            </span>
        );
    }

    return (
        <span className="ml-1 text-blue-600" aria-hidden="true">
            {direction === 'asc' ? (
                <Image src={'/sort-asc.svg'} alt="" width={12} height={12} />
            ) : (
                <Image src={'/sort-desc.svg'} alt="" width={12} height={12} />
            )}
        </span>
    );
};
