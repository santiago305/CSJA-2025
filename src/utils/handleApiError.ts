export function parseApiError(error: unknown, fallbackMessage = "Ocurrió un error inesperado.") {
    if (typeof error === "object" && error !== null) {
      const axiosError = error as any;
  
      return (
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        fallbackMessage
      );
    }
  
    return fallbackMessage;
  }
  