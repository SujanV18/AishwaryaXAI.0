import { twMerge } from 'tailwind-merge'

export function Card({ className, children, ...props }) {
    return (
        <div className={twMerge('bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-xl shadow-black/20', className)} {...props}>
            {children}
        </div>
    )
}

export function CardHeader({ className, children, ...props }) {
    return (
        <div className={twMerge('p-6 pb-4', className)} {...props}>
            {children}
        </div>
    )
}

export function CardTitle({ className, children, ...props }) {
    return (
        <h3 className={twMerge('text-lg font-semibold tracking-tight', className)} {...props}>
            {children}
        </h3>
    )
}

export function CardContent({ className, children, ...props }) {
    return (
        <div className={twMerge('p-6 pt-0', className)} {...props}>
            {children}
        </div>
    )
}
