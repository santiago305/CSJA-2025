export const RoleType = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
} as const;

export type RoleType = (typeof RoleType)[keyof typeof RoleType];
