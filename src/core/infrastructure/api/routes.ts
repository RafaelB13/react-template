export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    twoFactorAuth: '/auth/login/2fa',
    requestTwoFactorAuth: '/auth/2fa/enable/request',
    enableTwoFactorAuth: (token: string) => `/auth/2fa/enable?token=${token}`,
    disableTwoFactorAuth: '/auth/2fa/turn-off',
  },
  user: {
    getMe: '/users/me',
    update: (id: string) => `/users/${id}`,
  },
  upload: {
    create: '/upload',
  },
};
