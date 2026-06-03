import { authApi } from '@/services/axios';
import { jwtDecode } from '@/services/jwt';

import { toast } from 'sonner';
// token expired

export const tokenExpired = (exp) => {
  let expiredTimer;
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    toast.error('Your session is expired');
    localStorage.removeItem('accessToken');
    window.location.href = '/';
  }, timeLeft);
};

// setAxiosSession-

export const setAxiosSession = (token) => {
  if (token && typeof token === 'string') {
    try {
      authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
      // this function will handle when token is expired
      const { exp } = jwtDecode(token); // ~ 3 days by minimal server
      tokenExpired(exp);
    } catch (error) {
      console.error('Failed to set axios session:', error);
      // If token is invalid, clear the session
      localStorage.removeItem('accessToken');
      delete authApi.defaults.headers.common.Authorization;
    }
  } else {
    localStorage.removeItem('accessToken');
    delete authApi.defaults.headers.common.Authorization;
  }
};
