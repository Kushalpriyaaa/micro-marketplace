import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { TOKEN_KEY, setUnauthorizedHandler } from '../api/axios';

const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  initializing: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const stored = await AsyncStorage.getItem(TOKEN_KEY);
        if (stored) {
          setToken(stored);
        }
      } finally {
        setInitializing(false);
      }
    };

    loadToken();
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setToken(null);
    });
  }, []);

  const login = async (authToken) => {
    await AsyncStorage.setItem(TOKEN_KEY, authToken);
    setToken(authToken);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: Boolean(token),
        initializing,
        login,
        logout,
        api,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
