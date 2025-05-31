import { useState } from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../..//schemas/authSchemas";
// import { useAuth } from "@/hooks/useAuth";
import FormField from "../ui/formField";
import { RoutesPaths } from "../../router/config/routesPaths";
import type { RegisterCredentials } from "../../types/auth";


// import { useFlashMessage } from "@/hooks/useFlashMessage";
// import { errorResponse, successResponse } from "@/common/utils/response";

function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [submitting, setSubmitting] = useState(false)
  // const navigate = useNavigate()
  // const { showFlash, clearFlash } = useFlashMessage();
  // const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterCredentials>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (
    // data: RegisterCredentials
  ) => {
    setSubmitting(true);
    try {
      // const response = await login(data); 
      // if (response.success){
      //   showFlash(successResponse(response.message));
      //   navigate(RoutesPaths.home, { replace: true });
      // } else {
      //   showFlash(errorResponse(response.message));
      // }
    } catch (error) {
      // showFlash(errorResponse("Credenciales inválidas o error de red"));
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-4xl mb-5 font-bold">Registrate</CardTitle>
          <CardDescription>Completa todos los campos</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div
              className="flex gap-5"
              >
                <FormField
                  name="name" 
                  label="Nombre" 
                  placeholder="Jhonathan" 
                  register={register} 
                  error={errors.name?.message} 
                />
                <FormField
                  name="lastName" 
                  label="apellidos" 
                  placeholder="Rojas purisaca" 
                  register={register} 
                  error={errors.lastName?.message} 
                />
              </div>
              <FormField
                name="email" 
                label="Correo Electrónico" 
                placeholder="test@gmail.com" 
                register={register} 
                error={errors.email?.message} 
              />

              <FormField 
                name="password" 
                label="Contraseña" 
                placeholder="password"
                type="password" 
                register={register} 
                error={errors.password?.message} 
              />

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Cargando..." : "Registrate"}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link to={`${RoutesPaths.root}${RoutesPaths.login}`} className="underline underline-offset-4">
                Inicia sesión
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;