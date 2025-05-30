import { createBrowserRouter, Navigate } from "react-router-dom";
import { authRoutes } from "./modules/AuthRoutes";
import { dashboardRoutes } from "./modules/DashboardRoutes";
import { RoutesPaths } from "./config/routesPaths";
import ErrorPage from '../pages/Error404';

export const router = createBrowserRouter([
   {
    path: "/CSJA-2025/",
    element: <Navigate to={RoutesPaths.login} replace />,
  },
  ...authRoutes,
  ...dashboardRoutes,
  {
    path: "*",
    element: <ErrorPage />, 
  },
]);
