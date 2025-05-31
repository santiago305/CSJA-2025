/**
 * Grupo de rutas para la autenticación.
 */
export const API_AUTH_GROUP = {
  authentication: '/SeguridadUsuario/Login',
  register: '/SeguridadUsuario/Registrar',
  logout: '/SeguridadUsuario/logout',
  refreshToken: '/SeguridadUsuario/refresh',
  validateToken: '/SeguridadUsuario/validarToken'
};
// export const API_AUTH_GROUP = {
//   authentication: '/auth/login',
//   register: '/auth/register',
//   logout: '/auth/logout',
//   refreshToken: '/auth/refresh',
//   validateToken: '/auth/validate-token'
// };
export const API_DASHBOARD_GROUP = {
  getDashboardData: (userId: string) => `/MenuSistema/MenuListar/${userId}`,
  // getDashboardStats: '/dashboard/stats',
  // getRecentActivities: '/dashboard/recent-activities',
  // getUserActivity: (userId: string) => `/dashboard/user-activity/${userId}`,
  // getSystemHealth: '/dashboard/system-health',
  // getNotifications: '/dashboard/notifications'
}
/**
 * Grupo de rutas para la gestión de usuarios.
 */
export const API_USERS_GROUP = {
  createUser: '/users/create',
  findAll: '/users/findAll',
  findActives: '/users/actives',
  findOwnUser: '/users/me',
  findById: (id: string) => `/users/search/${id}`,
  findByEmail: (email: string) => `/users/email/${email}`,
  updateUser: (id: string) => `/users/update/${id}`,
  deleteUser: (id: string) => `/users/delete/${id}`,
  restoreUser: (id: string) => `/users/restore/${id}`,
};
