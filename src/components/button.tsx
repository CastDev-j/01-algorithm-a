import React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  ...props
}) => {
  const baseClass =
    "font-medium rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 active:scale-95 hover:scale-105";

  const variantClass = {
    primary:
      "bg-zinc-100 text-zinc-900 hover:bg-white border border-zinc-200 hover:border-zinc-300 active:bg-zinc-200",
    secondary:
      "bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-750 hover:border-zinc-600 active:bg-zinc-900",
    ghost:
      "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 active:bg-zinc-800",
    danger:
      "bg-red-600 text-white border border-red-500 hover:bg-red-500 hover:border-red-400 active:bg-red-700",
  }[variant];

  const sizeClass = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }[size];

  return (
    <button
      className={cn(baseClass, variantClass, sizeClass, className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
