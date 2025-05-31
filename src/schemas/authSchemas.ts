import { z } from 'zod';

/**
 * Esquema de validación para el inicio de sesión.
 */
export const LoginSchema = z.object({
  email: z.string().min(1, 'El email es obligatorio').email('Email inválido'),
  password: z.string().min(1, 'La Contraseña es obligatoria').min(4, 'La contraseña debe tener al menos 4 caracteres'),
});

/**
 * Esquema de validación para el registro de usuarios.
 */
export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(1, 'El nombre es obligatorio'),
  lastName: z.string().min(1, 'EL apellido es obligatorio')
});

