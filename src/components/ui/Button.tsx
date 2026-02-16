import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "glass";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none active:scale-95",
                    {
                        "bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-transparent": variant === "primary",
                        "bg-secondary hover:bg-teal-600 text-white shadow-lg shadow-teal-500/25 border border-transparent": variant === "secondary",
                        "border border-white/10 hover:border-white/30 text-white bg-transparent": variant === "outline",
                        "hover:bg-white/10 text-white": variant === "ghost",
                        "glass hover:bg-white/10 text-white": variant === "glass",
                        "h-9 px-4 text-sm": size === "sm",
                        "h-11 px-6 text-sm": size === "md",
                        "h-14 px-8 text-base": size === "lg",
                    },
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
