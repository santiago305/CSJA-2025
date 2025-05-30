import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { RoutesPaths } from "../config/routesPaths";

const Login = lazy(() => import("../../pages/auth/Login"));
const Register = lazy(() => import("../../pages/auth/Register"));
const ErrorPage = lazy(() => import("../../pages/Error404"));

export const authRoutes: RouteObject[] = [
  // {
  //   path: "/", // ruta padre para auth (puede ser vacía o "/auth" si prefieres)
  //   element: <LayoutAuth />, // Aquí va el layout que envolverá a login y register
  //   children: []
  // },
  {
    path: RoutesPaths.login,
    element: (
      // <RedirectIfAuth>
        <Login />
      // </RedirectIfAuth>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: RoutesPaths.register,
    element: (
      // <RedirectIfAuth>
        <Register />
      // </RedirectIfAuth>
    ),
    errorElement: <ErrorPage />,
  },
];
