/**
 * Definición de rutas protegidas bajo el Dashboard.
 * 
 * - Se utiliza `PrivateRoute` para proteger las rutas que requieren autenticación.
 * - Las rutas están anidadas bajo `DashboardLayout`.
 * - Soporta subrutas específicas para roles (admin, monitor, users).
 * 
 * @module DashboardRoutes
 */

import { lazy } from "react";
// import { dashboardPublicRoutes } from "./dashboard/publicDashboardRoutes";
// import { adminRoutes } from "./dashboard/adminRoutes";
// import { monitorRoutes } from "./dashboard/monitorRoutes";
// import { usersRoutes } from "./dashboard/usersRoutes";
import type { RouteObject } from "react-router-dom";
import { RoutesPaths } from "../config/routesPaths";



const DashboardLayout = lazy(() => import("../../components/layout/LayoutDashboard"));
const Dashboard = lazy(() => import("../../pages/dashboard/Dashboard"));
const ErrorPage = lazy(() => import("../../pages/Error404"));
const RegisterUserDashboard = lazy(() => import("../../pages/dashboard/RegisterUserDashboard"));

export const dashboardRoutes: RouteObject[] = [
  {
    path: `${RoutesPaths.root}${RoutesPaths.dashboard}`,
    element: (
      // <PrivateRoute>
        <DashboardLayout />
      // </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> }, // /dashboard
      { 
        path: RoutesPaths.dashboardRegister,
        element: <RegisterUserDashboard /> 
      }, // /dashboard/register
      // ...dashboardPublicRoutes,
      // ...adminRoutes,
      // ...monitorRoutes,
      // ...usersRoutes,
    ],
  },
];
