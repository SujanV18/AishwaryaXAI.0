import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const Slider = forwardRef(({ className, label, value, min = 0, max = 100, onChange, valueLabel, ...props }, ref) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <div className="flex justify-between items-center text-sm font-medium text-gray-300">
                    <label>{label}</label>
                    {valueLabel && <span className="text-gold">{valueLabel}</span>}
                </div>
            )}
            <input
                type="range"
                ref={ref}
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                className={twMerge(
                    'w-full h-2 bg-charcoal rounded-lg appearance-none cursor-pointer',
                    'accent-gold hover:accent-gold-light focus:outline-none focus:ring-2 focus:ring-gold/50',
                    className
                )}
                {...props}
            />
        </div>
    )
})

Slider.displayName = 'Slider'
