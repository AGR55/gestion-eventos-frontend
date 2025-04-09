import React from "react";

type ChipVariant = "filled" | "outlined" | "ghost";
type ChipColor = "blue" | "red" | "green" | "yellow" | "purple" | "gray";
type ChipSize = "sm" | "md" | "lg";

interface ChipProps {
  children: React.ReactNode;
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  className?: string;
}

export const Chip = ({
  children,
  variant = "filled",
  color = "blue",
  size = "md",
  className = ""
}: ChipProps) => {

  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full whitespace-nowrap";

  // Size variants
  const sizeStyles = {
    sm: "text-xs px-2 py-0.5 h-5",
    md: "text-sm px-2.5 py-0.5 h-6",
    lg: "text-base px-3 py-1 h-8",
  };

  const filledColors = {
    blue: "bg-blue-500 text-white",
    red: "bg-red-500 text-white",
    green: "bg-green-500 text-white",
    yellow: "bg-yellow-500 text-white",
    purple: "bg-purple-500 text-white",
    gray: "bg-gray-500 text-white",
  };

  const outlinedColors = {
    blue: "bg-blue-100/30 text-blue-700 border border-blue-500",
    red: "bg-red-100/30 text-red-700 border border-red-500",
    green: "bg-green-100/30 text-green-700 border border-green-500",
    yellow: "bg-yellow-100/30 text-yellow-700 border border-yellow-500",
    purple: "bg-purple-100/30 text-purple-700 border border-purple-500",
    gray: "bg-gray-100/30 text-gray-700 border border-gray-500",
  };

  const ghostColors = {
    blue: "bg-transparent text-blue-600",
    red: "bg-transparent text-red-600",
    green: "bg-transparent text-green-600",
    yellow: "bg-transparent text-yellow-600",
    purple: "bg-transparent text-purple-600",
    gray: "bg-transparent text-gray-600",
  };

  const getColorStyles = () => {
    switch (variant) {
      case "outlined":
        return outlinedColors[color];
      case "ghost":
        return ghostColors[color];
      case "filled":
      default:
        return filledColors[color];
    }
  };

  const chipClasses = `${baseStyles} ${sizeStyles[size]} ${getColorStyles()} ${className}`;

  return <div className={chipClasses}>{children}</div>;
};