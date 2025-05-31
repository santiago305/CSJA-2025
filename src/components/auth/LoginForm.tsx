import { useState } from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../..//schemas/authSchemas";
import { useAuth } from "../../hooks/useAuth";
import FormField from "../ui/formField";
import { RoutesPaths } from "../../router/config/routesPaths";
import type { LoginCredentials } from "../../types/auth";


// import { useFlashMessage } from "@/hooks/useFlashMessage";
// import { errorResponse, successResponse } from "@/common/utils/response";

function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  // const { showFlash, clearFlash } = useFlashMessage();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (
    data: LoginCredentials
  ) => {
    // clearFlash(); 
    setSubmitting(true);
    try {
      const response = await login(data); 
      if (response.success){
        console.log(response.message)
        // showFlash(successResponse(response.message));
        navigate(`${RoutesPaths.root}${RoutesPaths.dashboard}`, { replace: true });
      } else {
        console.log(response.message)
        // showFlash(errorResponse(response.message));
      }
    } catch (error) {
      console.log("Credenciales inválidas o error de red")
      // showFlash(errorResponse("Credenciales inválidas o error de red"));
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-4xl mb-5 font-bold">Inicia sesión</CardTitle>
          <CardDescription>Ingrese su correo electrónico para iniciar sesión</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                name="correo" 
                label="Correo Electrónico" 
                placeholder="test@gmail.com" 
                register={register} 
                error={errors.correo?.message} 
              />

              <FormField 
                name="clave" 
                label="Contraseña" 
                placeholder="password"
                type="password" 
                register={register} 
                error={errors.clave?.message} 
              />

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Cargando..." : "Login"}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <Link to={`${RoutesPaths.root}${RoutesPaths.register}`} className="underline underline-offset-4">
                Regístrate
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
