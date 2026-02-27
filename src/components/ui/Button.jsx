import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const Button = forwardRef(({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none rounded-lg'

    const variants = {
        primary: 'bg-gold text-navy hover:bg-gold-light',
        secondary: 'bg-surface text-gray-200 hover:bg-surface-hover border border-white/5',
        outline: 'border border-gold text-gold hover:bg-gold/10',
        ghost: 'text-gray-300 hover:text-white hover:bg-white/5',
    }

    const sizes = {
        sm: 'text-xs px-3 py-1.5',
        md: 'text-sm px-4 py-2',
        lg: 'text-base px-6 py-3',
    }

    const styles = twMerge(baseStyles, variants[variant], sizes[size], className)

    return (
        <button ref={ref} className={styles} {...props}>
            {children}
        </button>
    )
})

Button.displayName = 'Button'
