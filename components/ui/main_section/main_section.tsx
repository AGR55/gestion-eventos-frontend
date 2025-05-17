import Image from "next/image";
import { SearchBar } from "./search_bar";

export const MainSection = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      <div className="w-full relative">
        <Image
          alt="Main Image"
          src="/main.webp"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto opacity-80"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
          <div className="relative">
            <h1
              className="relative z-10 text-white font-bold text-5xl"
              style={{ textShadow: "0 0 10px #C9554E, 0 0 20px #C9554E" }}
            >
              Descubre eventos maravillosos
            </h1>
          </div>
          <div className="z-20">
            <SearchBar />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-l from-transparent from-60% to-white dark:to-[#111E27]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent from-60% to-white dark:to-[#111E27]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% to-white dark:to-[#111E27]"></div>
    </div>
  );
};
