import { Button } from "@/components/ui/button";
import { FacebookIcon, GoogleIcon } from "../../icons";

interface SocialButtonProps {
  icon: "google" | "facebook";
  label: string;
}

export function SocialButton({ icon, label }: SocialButtonProps) {
  return (
    <Button
      variant="outline"
      type="button"
      className="!bg-[#102633] hover:!bg-[#152938]  flex justify-center items-center gap-2 border-gray-700 text-white/80 hover:text-white h-12 cursor-pointer transition-colors duration-200 ease-in-out"
    >
      <SocialIcon icon={icon} />
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
}

function SocialIcon({ icon }: { icon: "google" | "facebook" }) {
  if (icon === "google") {
    return <GoogleIcon size={20} />;
  }
  return <FacebookIcon size={20} />;
}
