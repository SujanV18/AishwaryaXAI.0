import { twMerge } from 'tailwind-merge'

export function Progress({ value = 0, max = 100, className, indicatorClassName, ...props }) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
        <div className={twMerge('w-full bg-charcoal rounded-full h-2.5 overflow-hidden', className)} {...props}>
            <div
                className={twMerge('bg-gold h-2.5 rounded-full transition-all duration-500 ease-in-out', indicatorClassName)}
                style={{ width: `${percentage}%` }}
            />
        </div>
    )
}
