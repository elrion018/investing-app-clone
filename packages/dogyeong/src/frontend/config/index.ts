export const apiEndpoints = {
  signup: '/api/user',
  login: '/api/auth',
  googleLogin: '/api/auth/google',
  fetchUser: '/api/user',
  logout: '/api/logout',
};

export const googleAuthInitConfig = {
  lib: 'auth2',
  args: {
    client_id: '266193407466-7qvkgbj34vr3k5dbf0o31gnsii3b78s4.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
    access_type: 'code',
  },
};

export const googleAuthOptions = { prompt: 'select_account' };