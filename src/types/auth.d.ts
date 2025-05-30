import { LoginSchema, RegisterSchema } from "@/schemas/authSchemas";

export type LoginCredentials = z.infer<typeof LoginSchema>;
export type RegisterCredentials = z.infer<typeof RegisterSchema>;