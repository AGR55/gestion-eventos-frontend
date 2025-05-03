"use client";

import { useForm } from "react-hook-form";
import { Button } from "../../button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../form";
import { Input } from "../../input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { SocialButton } from "../social_buttons/social_buttons";
import { Checkbox } from "../../checkbox";
import { z } from "zod";
import { signinSchema } from "@/lib/validations/auth";

type SigninFormValues = z.infer<typeof signinSchema>;

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(data: SigninFormValues) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">
                Correo Electrónico / Usuario
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Introduce tu Correo Electrónico"
                  className="focus-visible:ring-cyan-500 text-white h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Introduce tu Contraseña"
                    className="focus-visible:ring-cyan-500 text-white pr-10 h-12"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-gray-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 cursor-pointer w-[18px] h-[18px] rounded-sm"
                  />
                </FormControl>
                <FormLabel className="text-sm text-gray-400 cursor-pointer">
                  Recordarme
                </FormLabel>
              </FormItem>
            )}
          />

          <a
            href="#"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            ¿Olvidaste la contraseña?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black font-medium py-2 cursor-pointer transition-colors duration-200 ease-in-out"
        >
          Iniciar Sesión
        </Button>

        <div className="flex items-center justify-center">
          <div className="flex-grow h-px bg-gray-800"></div>
          <span className="px-2 text-gray-400 text-sm select-none my-3">
            o continúa con
          </span>
          <div className="flex-grow h-px bg-gray-800"></div>
        </div>

        <div className="flex flex-col gap-4">
          <SocialButton icon="google" label="CONTINUAR CON GOOGLE" />
          <SocialButton icon="facebook" label="CONTINUAR CON FACEBOOK" />
        </div>
      </form>
    </Form>
  );
};
