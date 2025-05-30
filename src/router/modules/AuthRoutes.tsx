import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { RoutesPaths } from "../config/routesPaths";
import LayoutAuth from "../../components/layout/LayoutAuth";

const Login = lazy(() => import("../../pages/auth/Login"));
const Register = lazy(() => import("../../pages/auth/Register"));
const ErrorPage = lazy(() => import("../../pages/Error404"));

export const authRoutes: RouteObject[] = [
  {
    path: RoutesPaths.root, 
    element: <LayoutAuth />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: RoutesPaths.login,
        element: (
            <Login />
        ),
      },
      {
        path: RoutesPaths.register,
          element: (
          <Register />
        ),
      }
    ]
  },
];
