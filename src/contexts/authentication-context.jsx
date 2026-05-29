import { useToast } from '@/hooks/useToast';
import { Loader } from '@/components/ui/loader';
import { loginApi } from '@/networking/auth/auth-apis';
import { setAxiosSession } from '@/services/auth';
import { getDataFromToken, isTokenExpired } from '@/services/jwt';
import { ROUTE_PATHS } from '@/utils/constants/route-paths';
import { useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

//  Auth Context
const AuthContext = createContext();

const AuthProvider = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError, showInfo } = useToast();

  //  States
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState(null);

  //  Logout
  const logOut = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('userType');
    setUserData(null);
    setAxiosSession(null);
    setIsLoggedIn(false);
    setUserType(null);
    // showInfo("You have been logged out.");
  }, [showInfo]);

  //  Initialize
  const initialize = useCallback(async () => {
    try {
      const loggedIn = localStorage.getItem('loggedIn');
      const token = localStorage.getItem('accessToken');
      setIsInitialized(true);
      setIsLoggedIn(!!loggedIn);

      // Validate token is a string before processing
      if (token && typeof token === 'string' && !isTokenExpired(token)) {
        setAxiosSession(token);
        try {
          const tokenData = await getDataFromToken(token);
          setUserType(tokenData.user_type);
          if (loggedIn && tokenData.user_type === 'User') {
            setUserData(tokenData);
          }
        } catch (tokenError) {
          console.error(
            'Token decode error during initialization:',
            tokenError
          );
          logOut();
        }
      } else {
        logOut();
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      setIsInitialized(true);
      setIsLoggedIn(false);
      setAuthError(error.message);
      logOut();
    }
  }, [logOut]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) setUserData(JSON.parse(savedUser));
  }, []);

  //  Login
  const userLogin = useCallback(
    async (loginData) => {
      setIsLoading(true);
      try {
        const response = await loginApi(loginData);
        const { status, statusText, data } = response;

        if (status === 200 || statusText === 'OK') {
          // Extract token from nested structure
          const accessToken =
            data?.token?.access_token || data?.access_token || data?.token;

          // Extract user data from response
          const userData = data?.user || data;
          const userRole =
            userData?.role || userData?.account_type || userData?.user_type;

          // Validate token exists and is a string
          if (!accessToken || typeof accessToken !== 'string') {
            console.error('Invalid token received:', {
              tokenType: typeof accessToken,
              tokenValue: accessToken,
              responseData: data,
            });
            const errorMsg = 'Invalid token received from server';
            setAuthError(errorMsg);
            showError(errorMsg);
            return;
          }

          // Validate user data exists
          if (!userData || !userRole) {
            console.error('Invalid user data received:', {
              userData,
              userRole,
              responseData: data,
            });
            const errorMsg = 'Invalid user data received from server';
            setAuthError(errorMsg);
            showError(errorMsg);
            return;
          }

          setAxiosSession(accessToken);
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('userType', userRole);

          setUserType(userRole);
          setIsLoggedIn(true);
          setUserData(userData);

          showSuccess(
            data?.message ||
            userData?.message ||
            'Login successful! Welcome back.'
          );
          router.push(ROUTE_PATHS.DASHBOARD);
        } else {
          const errorMsg =
            data?.message ||
            response?.message ||
            'Login failed. Please try again.';
          setAuthError(errorMsg);
          showError(errorMsg);
        }
      } catch (error) {
        const errorMsg =
          error?.detail || error?.message || 'Login failed. Please try again.';
        setAuthError(errorMsg);
        showError(errorMsg);
        console.error('Login error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [router, showSuccess, showError]
  );



  //  Context Value
  const memoizedValue = useMemo(
    () => ({
      isInitialized,
      isLoggedIn,
      isLoading,
      authError,
      userData,
      userType,
      userLogin,
      logOut,
      setAuthError,
      setUserData,
      setUserType,
    }),
    [
      isInitialized,
      isLoggedIn,
      isLoading,
      authError,
      userData,
      userType,
      userLogin,
      logOut,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      <Loader show={isLoading} />
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
