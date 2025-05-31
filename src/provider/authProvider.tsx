import { useEffect, useState } from "react";
import type { PropsUrl } from "../types/PropsUrl";
import { checkTokenValidity, loginUser, logoutUser, registerUser } from "../service/authService";
import type { LoginCredentials, RegisterCredentials } from "../types/auth";
import type { AuthResponse } from '../types/AuthResponse';
import { AuthContext } from "../context/authContext";
export const AuthProvider = ({ children }: PropsUrl) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const valid = await checkTokenValidity
      if(!valid) {
        setIsAuthenticated(false)
        setLoading(false)
        return { success: false, message: "Token inválido o expirado" };
      }

      setIsAuthenticated(true);
      setLoading(false)
      return { success: true, message: "Autenticación validada" };

    } catch (error: any) {
      console.error("Error en checkAuth:", error);
      setIsAuthenticated(false);
      setLoading(false);
      const message = error.response?.data?.message || "Error inesperado en autenticación";
      return { success: false, message };

    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (payload: LoginCredentials): Promise<AuthResponse> => {
    try {
      const data = await loginUser(payload);
      if (data?.access_token) {
        await checkAuth();
        return { success: true, message: "Inicio de sesión exitoso" };
      } else {
        return { success: false, message: "No se pudo iniciar sesión" };
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Error en la autenticación";
      return { success: false, message };
    }
  }

  const Register = async (payload: RegisterCredentials): Promise<AuthResponse> => {
    try {
      const data = await registerUser(payload);
      if (data?.access_token) {
        await checkAuth();
        return { success: true, message: "Registro exitoso" };
      } else {
        return { success: false, message: "Error al registrar usuario" };
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Error en el registro";
      return { success: false, message };
    }
  };

  const logout = () => {
    logoutUser()
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        Register,
        logout,
        loading,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}