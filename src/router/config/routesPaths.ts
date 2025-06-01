export const RoutesPaths = {

  // ruta madre
  root: "/CSJA-2025",

  // 🔐 Rutas de autenticación
  login: "login",
  register: "register",

  // 📊 Rutas de Dashboard
  dashboard: "dashboard",
  dashboardRegister: "usuario",
  dashboardProfile: "/dashboard/profile",
  dashboardSettings: "/dashboard/settings",
} as const;


export type RouteName = keyof typeof RoutesPaths;
