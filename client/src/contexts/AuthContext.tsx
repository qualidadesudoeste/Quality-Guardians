import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'coordenador' | 'analista';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  isAdmin?: boolean; // Se tem permissões administrativas
  isFirstAccess?: boolean;
  seniorityLevel?: string;
  competencies?: string[];
  // Campos de gamificação
  jobRole?: string; // Cargo (ex: "Analista de Qualidade")
  participatesInRanking?: boolean; // Se participa do ranking de gamificação
  totalPoints?: number;
  monthlyPoints?: number;
  quarterlyPoints?: number;
  badges?: Array<{
    id: string;
    name: string;
    category: string;
    level: 'bronze' | 'prata' | 'ouro' | 'único';
    icon: string;
    description: string;
    earnedAt?: string;
  }>;
  pointsHistory?: Array<{
    date: string;
    points: number;
    action: string;
  }>;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateCurrentUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
  canEdit: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'quality-guardians-auth';
// Função para obter usuários do localStorage
function getStoredUsers(): Array<User & { password: string }> {
  const stored = localStorage.getItem('quality-guardians-users');
  if (stored) {
    return JSON.parse(stored);
  }
  // Usuários padrão se não houver nada no localStorage
  return [
    {
      id: '0',
      name: 'Admin Sistema',
      email: 'admin@empresa.com',
      password: 'admin123',
      role: 'admin',
      avatar: '👨‍💼',
      isFirstAccess: false
    },
    {
      id: '1',
      name: 'Beatriz Costa',
      email: 'beatriz.costa@empresa.com',
      password: 'coordenador123',
      role: 'coordenador',
      avatar: '👩‍🏫',
      isFirstAccess: false
    },
    {
      id: '2',
      name: 'Ana Silva',
      email: 'ana.silva@empresa.com',
      password: 'analista123',
      role: 'analista',
      avatar: '👩‍💻',
      isFirstAccess: true
    }
  ];
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (email: string, password: string): boolean => {
    const users = getStoredUsers();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateCurrentUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const isAdmin = user?.isAdmin || user?.role === 'admin'; // Suporta ambos os modelos
  const canEdit = user?.role === 'coordenador' || isAdmin;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateCurrentUser,
        isAuthenticated: !!user,
        canEdit,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
