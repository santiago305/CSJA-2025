import { lazy } from "react";

const RegisterForm = lazy(() => import("../../components/auth/RegisterForm"));

export default function Page() {
  return (
    <RegisterForm />
  )
}
