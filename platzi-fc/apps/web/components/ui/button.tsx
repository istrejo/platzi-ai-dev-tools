import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary:
        "bg-platzi-green text-platzi-dark hover:bg-platzi-green/90 focus-visible:ring-platzi-green",
      secondary:
        "bg-platzi-blue text-white hover:bg-platzi-blue/90 focus-visible:ring-platzi-blue",
      outline:
        "border-2 border-platzi-green text-platzi-green hover:bg-platzi-green hover:text-platzi-dark focus-visible:ring-platzi-green",
      ghost: "hover:bg-gray-100 text-gray-900 focus-visible:ring-gray-400",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-13 px-8 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
