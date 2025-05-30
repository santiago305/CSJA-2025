import type { RouteObject } from "react-router-dom";
import Login from "../../../pages/auth/Login";
import ErrorPage from '../../../pages/Error404';



export const dashboardPublicRoutes: RouteObject[] = [
  {
    path: 'public-dashboard',
    element: (
        <Login />
    ),
    errorElement: <ErrorPage />
  },
];

