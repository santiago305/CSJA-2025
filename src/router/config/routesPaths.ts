export const RoutesPaths = {

  // 🔐 Rutas de autenticación
  login: "/login",
  register: "/register",

  // 📊 Rutas de Dashboard
  dashboard: "/dashboard",
  dashboardProfile: "/dashboard/profile",
  dashboardSettings: "/dashboard/settings",
} as const;


export type RouteName = keyof typeof RoutesPaths;
