import { lazy } from "react";
const LoginForm = lazy(() => import("../../components/auth/LoginForm"));

export default function Login ( ){
  return (
    <LoginForm />
  );
}