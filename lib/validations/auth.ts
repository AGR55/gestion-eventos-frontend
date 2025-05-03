import { z } from 'zod';

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El correo electrónico es requerido' })
    .email({ message: 'Ingresa un correo electrónico válido' }),
  password: z
    .string()
    .min(1, { message: 'La contraseña es requerida' })
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  rememberMe: z.boolean().optional(),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'El nombre es requerido' })
      .min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
    email: z
      .string()
      .min(1, { message: 'El correo electrónico es requerido' })
      .email({ message: 'Ingresa un correo electrónico válido' }),
    password: z
      .string()
      .min(1, { message: 'La contraseña es requerida' })
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
      .regex(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
      .regex(/[0-9]/, { message: 'La contraseña debe contener al menos un número' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirmar contraseña es requerido' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });