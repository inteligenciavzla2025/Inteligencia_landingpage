import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        const variants = {
            primary: "bg-electric-orange text-white hover:bg-orange-600 border border-transparent",
            secondary: "bg-tech-blue text-white hover:bg-blue-600 border border-transparent",
            outline: "bg-transparent border border-electric-orange text-electric-orange hover:bg-electric-orange/10",
            ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-white/5",
            glass: "bg-electric-orange/15 backdrop-blur-md border border-electric-orange/40 text-white hover:bg-electric-orange/25 hover:border-electric-orange/60",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg font-semibold",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "rounded-full transition-all duration-300 flex items-center justify-center gap-2",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";

export { Button };
