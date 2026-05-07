import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  showAuth: boolean;
  authMode: 'register' | 'login';
  openAuth: (mode?: 'register' | 'login') => void;
  closeAuth: () => void;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  showAuth: false,
  authMode: 'register',
  openAuth: () => {},
  closeAuth: () => {},
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');

  const openAuth = useCallback((mode: 'register' | 'login' = 'register') => {
    setAuthMode(mode);
    setShowAuth(true);
  }, []);

  const closeAuth = useCallback(() => {
    setShowAuth(false);
  }, []);

  const login = useCallback(() => {
    setIsAuthenticated(true);
    setShowAuth(false);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, showAuth, authMode, openAuth, closeAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
