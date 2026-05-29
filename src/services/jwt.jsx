export const jwtDecode = (token) => {
  // Validate token is a string
  if (!token || typeof token !== 'string') {
    throw new Error('Invalid token: Token must be a non-empty string');
  }

  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      throw new Error('Invalid token format');
    }

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('JWT decode error:', error);
    throw new Error('Failed to decode token');
  }
};

export const getDataFromToken = async (token) => {
  if (!token || typeof token !== 'string') {
    throw new Error('Invalid token provided');
  }
  const decoded = jwtDecode(token);
  return decoded;
};

export const getUserIdFromToken = async (token) => {
  if (!token || typeof token !== 'string') {
    throw new Error('Invalid token provided');
  }
  const user = jwtDecode(token);
  return user.id;
};

export const getUserTypeFromToken = async (token) => {
  if (!token || typeof token !== 'string') {
    throw new Error('Invalid token provided');
  }
  const user = jwtDecode(token);
  return user.user_type;
};

export const isTokenExpired = (token) => {
  if (!token || typeof token !== 'string') {
    return true;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime; // Fixed: should be < not >
  } catch (error) {
    console.error('Token validation error:', error);
    return true; // If token can't be decoded, consider it expired
  }
};
