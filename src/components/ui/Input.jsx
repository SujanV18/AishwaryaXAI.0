import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const Input = forwardRef(({ className, label, error, ...props }, ref) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-medium text-gray-300">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                className={twMerge(
                    'w-full bg-charcoal border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500',
                    'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all',
                    error && 'border-red-500 focus:ring-red-500/50 focus:border-red-500',
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-xs text-red-400 mt-0.5">{error}</p>
            )}
        </div>
    )
})

Input.displayName = 'Input'
