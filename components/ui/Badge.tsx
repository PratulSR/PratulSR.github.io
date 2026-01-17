interface BadgeProps {
    children: React.ReactNode;
    variant?: 'gold' | 'outline' | 'muted';
    size?: 'sm' | 'md';
}

export default function Badge({ children, variant = 'outline', size = 'sm' }: BadgeProps) {
    const baseClasses = 'inline-flex items-center font-medium rounded';

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm'
    };

    const variantClasses = {
        gold: 'bg-[#F5C518] text-black font-bold uppercase tracking-wide',
        outline: 'bg-transparent border border-[#2A2A2A] text-[#AAAAAA]',
        muted: 'bg-[#1F1F1F] text-[#6B6B6B]'
    };

    return (
        <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}>
            {children}
        </span>
    );
}
