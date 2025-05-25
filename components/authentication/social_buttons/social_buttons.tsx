"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/icons";
import { FacebookIcon } from "@/components/ui/icons";

interface SocialButtonProps {
  icon: "google" | "facebook";
  label: string;
  onClick?: () => void;
}

export const SocialButton = ({ icon, label, onClick }: SocialButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      signIn(icon, { callbackUrl: "/" });
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      type="button"
      className="!bg-[#102633] hover:!bg-[#152938]  flex justify-center items-center gap-2 border-gray-700 text-white/80 hover:text-white h-12 cursor-pointer transition-colors duration-200 ease-in-out"
    >
      {icon === "google" ? (
        <GoogleIcon size={20} />
      ) : (
        <FacebookIcon size={20} />
      )}
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
};
