import Image from "next/image";
import { Label } from "../label";
import { XIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { SignInForm } from "./signin/signin";

export const Auth = () => {
  return (
    <div className="rounded-3xl h-[650px] flex m-4 bg-[#111E27] border-2 border-amber-50/10 shadow-xl">
      <div className="grid grid-cols-7 gap-4 h-full w-full">
        <div className="col-span-3 relative h-full">
          <div className="absolute inset-0 w-full h-full">
            <Image
              alt="image_auth"
              src="/auth.webp"
              layout="fill"
              objectFit="cover"
              className="rounded-l-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent rounded-l-3xl"></div>
          </div>

          <div className="relative z-10 p-6">
            <div className="text-3xl font-light mb-4">
              <span className="font-extrabold text-white">E-VENT</span>
              <span className="text-white"> HORIZON</span>
            </div>
            <Label className="font-extralight text-2xl text-white drop-shadow-md">
              Únete a nuestra comunidad y descubre eventos cerca de ti
            </Label>
          </div>
        </div>

        <div className="col-span-4 flex flex-col items-center p-4">
          <div className="end-0 flex justify-end w-full mb-4">
            <button className="flex rounded-full bg-transparent text-white w-10 h-10 hover:bg-white/10 transition-colors items-center justify-center">
              <XIcon size={24} />
            </button>
          </div>
          <Tabs defaultValue="signin" className="w-[90%]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin" className="text-xl cursor-pointer">
                Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-xl cursor-pointer">
                Registrarse
              </TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="mt-6">
              <SignInForm />
            </TabsContent>
            <TabsContent value="signup" className="mt-6"></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
