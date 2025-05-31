function ensureEnvVar(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`La variable de entorno "${name}" es obligatoria y no fue definida.`);
  }
  return value;
}

export const envs = {
  apiUrl: ensureEnvVar(import.meta.env.VITE_BASE_URL_API, 'VITE_API_URL_API'),
  
};
