import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ApiService } from '../services/api';
import { IPatient } from '../types/patient';
import { routes } from '../routes/Router';

interface IAuthProviderProps {
  children: React.ReactNode;
}

interface ILoginProps {
  email: string;
  password: string;
}

interface IAuthContextProps {
  currentUser: IPatient | null;
  login: ({ email, password }: ILoginProps) => Promise<void>;
  logout: () => Promise<void>;
  getMe: () => Promise<void>;
  token: string | null;
}

const AuthContext = React.createContext<IAuthContextProps | null>(null);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const { auth } = new ApiService();
  const token = auth.getToken();

  const [currentUser, setCurrentUser] =
    useState<IAuthContextProps['currentUser']>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    try {
      window.location.href = routes.signIn.path;
      setCurrentUser(null);
      auth.clearToken();
    } catch (error) {
      throw error;
    }
  }, [auth]);

  const getMe = useCallback(async () => {
    try {
      const token = auth.getToken();

      if (!token) {
        logout();
      }

      const { data } = await auth.getMe();

      setCurrentUser(data);
    } catch (error) {
      await logout();
      throw error;
    }
  }, [auth, logout]);

  const login = useCallback(
    async ({ email, password }: ILoginProps) => {
      try {
        const { token, patient } = await auth.signIn(email, password);
        auth.setToken(token);
        setCurrentUser(patient);
      } catch (error) {
        console.error('Login error in hook:', error);
        throw error;
      }
    },
    [auth],
  );

  useEffect(() => {
    const token = auth.getToken();
    if (token && !currentUser) {
      getMe();
    }
    setLoading(false);
  }, [auth, currentUser, getMe]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        getMe,
        token,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const davinci = useContext(AuthContext);
  if (davinci == null) {
    throw new Error('useAuth() called outside of a AuthProvider?');
  }
  return davinci;
};