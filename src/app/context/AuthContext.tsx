'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextProps {
  id: number | null
  role: 'Administrador' | 'Cliente' | null
  setRole: (role: 'Administrador' | 'Cliente') => void
  setId: (id: number) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<'Administrador' | 'Cliente' | null>(null)
  const [id, setId] = useState<number | null>(null)

  const logout = () => {
    setRole(null)
    setId(null)
    localStorage.removeItem('token') // 🔐
  }

  return (
    <AuthContext.Provider value={{ id, role, setRole, setId, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider')
  return context
}
