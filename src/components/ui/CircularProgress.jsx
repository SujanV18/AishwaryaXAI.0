import { twMerge } from 'tailwind-merge'

export function CircularProgress({
    value = 0,
    max = 100,
    size = 120,
    strokeWidth = 10,
    className,
    indicatorClassName,
    trackClassName,
    children
}) {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const percentage = Math.min(Math.max(value / max, 0), 1)
    const offset = circumference - percentage * circumference

    return (
        <div className={twMerge('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
            <svg className="transform -rotate-90 w-full h-full">
                <circle
                    className={twMerge('text-charcoal stroke-current', trackClassName)}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className={twMerge('text-gold stroke-current transition-all duration-1000 ease-in-out', indicatorClassName)}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            {children && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {children}
                </div>
            )}
        </div>
    )
}
