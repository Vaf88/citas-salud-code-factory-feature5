'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  role: 'admin' | 'user' | null;
  setRole: (role: 'admin' | 'user') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<'admin' | 'user' | null>(null);

  const logout = () => {
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

