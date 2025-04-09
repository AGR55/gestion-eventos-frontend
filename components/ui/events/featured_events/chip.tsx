import React from "react";

export const Chip = ({ children, variant, color, size }: { children: React.ReactNode, variant: string, color: string, size: "sm" | "md" | "lg" }) => {
    return (
        <div className="rounded-full bg-red-600 text-white font-normal text-sm px-2 w-max my-2">
            {children}
        </div>
    );
}