import { Button } from "../button"

export const CategoryButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <Button
            className="flex items-center justify-center rounded-full bg-[#97DDDF3E] hover:bg-[#97DDDE9E] backdrop-blur-3xl border border-white/20 text-white cursor-pointer mx-1">
            {children}
        </Button>
    )
}