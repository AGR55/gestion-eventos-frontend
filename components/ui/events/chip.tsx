import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
  {
    variants: {
      variant: {
        filled: "text-white",
        outlined: "bg-transparent border",
        ghost: "bg-transparent",
        soft: "bg-opacity-20 border-opacity-0",
      },
      size: {
        xs: "text-xs px-1.5 py-0.5 h-4 rounded-full",
        sm: "text-xs px-2 py-0.5 h-5 rounded-full",
        md: "text-sm px-2.5 py-0.5 h-6 rounded-full",
        lg: "text-base px-3 py-1 h-8 rounded-full",
      },
      color: {
        default: "",
        blue: "",
        cyan: "",
        red: "",
        green: "",
        yellow: "",
        amber: "",
        purple: "",
        gray: "",
        slate: "",
      },
      interactive: {
        true: "cursor-pointer hover:brightness-95 active:brightness-90",
        false: "",
      },
      removable: {
        true: "pr-1",
        false: "",
      },
    },
    compoundVariants: [
      // Filled variants
      {
        variant: "filled",
        color: "default",
        className: "bg-gray-700 text-white",
      },
      { variant: "filled", color: "blue", className: "bg-blue-600 text-white" },
      { variant: "filled", color: "cyan", className: "bg-cyan-500 text-black" },
      { variant: "filled", color: "red", className: "bg-red-600 text-white" },
      {
        variant: "filled",
        color: "green",
        className: "bg-green-600 text-white",
      },
      {
        variant: "filled",
        color: "yellow",
        className: "bg-yellow-500 text-black",
      },
      {
        variant: "filled",
        color: "amber",
        className: "bg-amber-500 text-black",
      },
      {
        variant: "filled",
        color: "purple",
        className: "bg-purple-600 text-white",
      },
      { variant: "filled", color: "gray", className: "bg-gray-500 text-white" },
      {
        variant: "filled",
        color: "slate",
        className: "bg-slate-700 text-white",
      },

      // Outlined variants
      {
        variant: "outlined",
        color: "default",
        className:
          "border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300",
      },
      {
        variant: "outlined",
        color: "blue",
        className: "border-blue-500 text-blue-700 dark:text-blue-400",
      },
      {
        variant: "outlined",
        color: "cyan",
        className: "border-cyan-500 text-cyan-700 dark:text-cyan-400",
      },
      {
        variant: "outlined",
        color: "red",
        className: "border-red-500 text-red-700 dark:text-red-400",
      },
      {
        variant: "outlined",
        color: "green",
        className: "border-green-500 text-green-700 dark:text-green-400",
      },
      {
        variant: "outlined",
        color: "yellow",
        className: "border-yellow-500 text-yellow-700 dark:text-yellow-400",
      },
      {
        variant: "outlined",
        color: "amber",
        className: "border-amber-500 text-amber-700 dark:text-amber-400",
      },
      {
        variant: "outlined",
        color: "purple",
        className: "border-purple-500 text-purple-700 dark:text-purple-400",
      },
      {
        variant: "outlined",
        color: "gray",
        className: "border-gray-500 text-gray-700 dark:text-gray-400",
      },
      {
        variant: "outlined",
        color: "slate",
        className: "border-slate-500 text-slate-700 dark:text-slate-400",
      },

      // Ghost variants
      {
        variant: "ghost",
        color: "default",
        className: "text-gray-700 dark:text-gray-300",
      },
      {
        variant: "ghost",
        color: "blue",
        className: "text-blue-700 dark:text-blue-400",
      },
      {
        variant: "ghost",
        color: "cyan",
        className: "text-cyan-700 dark:text-cyan-400",
      },
      {
        variant: "ghost",
        color: "red",
        className: "text-red-700 dark:text-red-400",
      },
      {
        variant: "ghost",
        color: "green",
        className: "text-green-700 dark:text-green-400",
      },
      {
        variant: "ghost",
        color: "yellow",
        className: "text-yellow-700 dark:text-yellow-400",
      },
      {
        variant: "ghost",
        color: "amber",
        className: "text-amber-700 dark:text-amber-400",
      },
      {
        variant: "ghost",
        color: "purple",
        className: "text-purple-700 dark:text-purple-400",
      },
      {
        variant: "ghost",
        color: "gray",
        className: "text-gray-700 dark:text-gray-400",
      },
      {
        variant: "ghost",
        color: "slate",
        className: "text-slate-700 dark:text-slate-400",
      },

      // Soft variants
      {
        variant: "soft",
        color: "default",
        className:
          "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      },
      {
        variant: "soft",
        color: "blue",
        className:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      },
      {
        variant: "soft",
        color: "cyan",
        className:
          "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
      },
      {
        variant: "soft",
        color: "red",
        className:
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      },
      {
        variant: "soft",
        color: "green",
        className:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      },
      {
        variant: "soft",
        color: "yellow",
        className:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      },
      {
        variant: "soft",
        color: "amber",
        className:
          "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      },
      {
        variant: "soft",
        color: "purple",
        className:
          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      },
      {
        variant: "soft",
        color: "gray",
        className:
          "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      },
      {
        variant: "soft",
        color: "slate",
        className:
          "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
      },
    ],
    defaultVariants: {
      variant: "filled",
      size: "md",
      color: "default",
      interactive: false,
      removable: false,
    },
  }
);

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof chipVariants> {
  icon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  onRemove?: () => void;
  withRipple?: boolean;
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      children,
      className,
      variant,
      size,
      color,
      interactive,
      removable,
      icon,
      removeIcon,
      onRemove,
      onClick,
      withRipple = false,
      ...props
    },
    ref
  ) => {
    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove?.();
    };

    return (
      <div
        ref={ref}
        role={interactive ? "button" : "status"}
        tabIndex={interactive ? 0 : undefined}
        className={cn(
          chipVariants({ variant, size, color, interactive, removable }),
          withRipple && "relative overflow-hidden",
          className
        )}
        onClick={interactive ? onClick : undefined}
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        <span>{children}</span>
        {removable && onRemove && (
          <button
            type="button"
            onClick={handleRemove}
            className="ml-1 rounded-full hover:bg-black/10 p-0.5 transition-colors"
            aria-label="Remove"
          >
            {removeIcon || (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = "Chip";
