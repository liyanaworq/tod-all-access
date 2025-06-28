import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('customer');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (data: any) => {
    localStorage.setItem('customer', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('customer');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
