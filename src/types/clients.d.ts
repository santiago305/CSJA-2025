import { createClientsSchema, updateClientsSchema } from "@/schemas/clientsSchemas";

export type CreateClientsDto = z.infer<typeof createClientsSchema>;
export type UpdateClientsDto = z.infer<typeof updateClientsSchema>;