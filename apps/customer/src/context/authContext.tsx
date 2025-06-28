import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  token: string | null;
  user: any;
  loading: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('customerToken');
    const storedUser = localStorage.getItem('customer');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // ✅ only set this once
  }, []);

  const login = (token: string, user: any) => {
    localStorage.setItem('customerToken', token);
    localStorage.setItem('customer', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customer');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
