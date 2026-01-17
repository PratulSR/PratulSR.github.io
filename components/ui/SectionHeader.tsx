import { ReactNode } from 'react';

interface SectionHeaderProps {
    children: ReactNode;
    icon?: ReactNode;
    action?: ReactNode;
}

export default function SectionHeader({ children, icon, action }: SectionHeaderProps) {
    return (
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#2A2A2A]">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                {icon && <span className="text-[#F5C518]">{icon}</span>}
                {children}
            </h2>
            {action && <div>{action}</div>}
        </div>
    );
}
