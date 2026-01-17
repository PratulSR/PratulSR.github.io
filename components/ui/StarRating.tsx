interface StarRatingProps {
    score: number;
    maxScore?: number;
    showValue?: boolean;
    size?: 'sm' | 'md' | 'lg';
    count?: number;
    source?: string;
}

export default function StarRating({
    score,
    maxScore = 5,
    showValue = true,
    size = 'md',
    count,
    source
}: StarRatingProps) {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    const emptyStars = maxScore - fullStars - (hasHalfStar ? 1 : 0);

    const sizeClasses = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };

    const textSizes = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base'
    };

    return (
        <div className="inline-flex items-center gap-1.5 group relative">
            {/* Stars */}
            <div className="flex items-center gap-0.5">
                {/* Full stars */}
                {Array.from({ length: fullStars }).map((_, i) => (
                    <svg
                        key={`full-${i}`}
                        className={`${sizeClasses[size]} text-[#F5C518]`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}

                {/* Half star */}
                {hasHalfStar && (
                    <svg
                        className={`${sizeClasses[size]} text-[#F5C518]`}
                        viewBox="0 0 20 20"
                    >
                        <defs>
                            <linearGradient id="halfGradient">
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="#3A3A3A" />
                            </linearGradient>
                        </defs>
                        <path
                            fill="url(#halfGradient)"
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                    </svg>
                )}

                {/* Empty stars */}
                {Array.from({ length: emptyStars }).map((_, i) => (
                    <svg
                        key={`empty-${i}`}
                        className={`${sizeClasses[size]} text-[#3A3A3A]`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>

            {/* Value */}
            {showValue && (
                <span className={`font-semibold text-white ${textSizes[size]}`}>
                    {score.toFixed(1)}
                </span>
            )}

            {/* Count */}
            {count && (
                <span className={`text-[#6B6B6B] ${textSizes[size]}`}>
                    ({count.toLocaleString()})
                </span>
            )}

            {/* Tooltip */}
            {source && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1F1F1F] border border-[#2A2A2A] rounded text-xs text-[#AAAAAA] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {source}
                </div>
            )}
        </div>
    );
}
