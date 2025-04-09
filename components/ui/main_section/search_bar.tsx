import { Search } from "lucide-react";
import { Button } from "../button";
import { Input } from "../input";

export const SearchBar = () => {
    return (
        <div className="p-1 bg-gradient-to-r from-[#C9554E] to-[#3AB5B8] drop-shadow-2xl rounded-2xl w-96 flex flex-row gap-1">
            <Input
                placeholder="Search events or categories"
                className="rounded-xl !bg-white shadow-border w-full text-black px-2"
                type="text"
                name="search"
            />
            <Button className="rounded-xl bg-gray-900/75 transition-colors hover:bg-gray-900/90 hover:cursor-pointer">
                <Search className="text-white" />
            </Button>
        </div>
    );
}