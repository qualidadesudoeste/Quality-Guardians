import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from './AuthContext';

interface UsersContextType {
  users: User[];
  addUser: (user: Omit<User, 'id'> & { password: string }) => void;
  updateUser: (id: string, updates: Partial<User> & { password?: string }) => void;
  deleteUser: (id: string) => void;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

const STORAGE_KEY = 'quality-guardians-users';

// Badges disponíveis (importados do mockData)
const allBadges = [
  { id: 'bug-hunter-bronze', name: 'Caçador de Bugs', category: 'Bug Hunting', level: 'bronze' as const, icon: '🐜', description: 'Encontrar 10 defeitos' },
  { id: 'bug-hunter-silver', name: 'Caçador de Bugs', category: 'Bug Hunting', level: 'prata' as const, icon: '🐜', description: 'Encontrar 50 defeitos' },
  { id: 'critical-exterminator-bronze', name: 'Exterminador Crítico', category: 'Bug Hunting', level: 'bronze' as const, icon: '🔥', description: 'Encontrar 1 defeito crítico' },
  { id: 'production-guardian', name: 'Guardião da Produção', category: 'Bug Hunting', level: 'único' as const, icon: '🛡️', description: 'Evitar defeito crítico em produção' },
  { id: 'test-creator-bronze', name: 'Criador de Testes', category: 'Testing', level: 'bronze' as const, icon: '📝', description: 'Criar 50 casos de teste' },
  { id: 'automation-master-bronze', name: 'Mestre da Automação', category: 'Automation', level: 'bronze' as const, icon: '⚙️', description: 'Automatizar 10 testes' },
  { id: 'code-reviewer', name: 'Revisor de Código', category: 'Collaboration', level: 'ouro' as const, icon: '👁️', description: 'Participar de 20 code reviews' },
  { id: 'documentation-champion', name: 'Campeão da Documentação', category: 'Collaboration', level: 'ouro' as const, icon: '📖', description: 'Criar 10 documentações completas' }
];

// Usuários iniciais do sistema
const INITIAL_USERS: Array<User & { password: string }> = [
  {
    id: '0',
    name: 'Admin Sistema',
    email: 'admin@empresa.com',
    password: 'admin123',
    role: 'coordenador', // Cargo
    avatar: '👨‍💼',
    isAdmin: true, // Permissões administrativas
    isFirstAccess: false,
    jobRole: 'Administrador do Sistema',
    seniorityLevel: 'Especialista',
    participatesInRanking: false,
    totalPoints: 0,
    monthlyPoints: 0,
    quarterlyPoints: 0,
    badges: [],
    pointsHistory: []
  },
  {
    id: '1',
    name: 'Beatriz Costa',
    email: 'beatriz.costa@empresa.com',
    password: 'coordenador123',
    role: 'coordenador',
    avatar: '👩‍🏫',
    isAdmin: true, // Coordenadora com permissões de admin
    isFirstAccess: false,
    jobRole: 'Coordenadora de Qualidade',
    seniorityLevel: 'Sr 3',
    participatesInRanking: true,
    totalPoints: 18750,
    monthlyPoints: 3900,
    quarterlyPoints: 10500,
    badges: [
      { ...allBadges[1], earnedAt: '2025-09-01' },
      { ...allBadges[2], earnedAt: '2025-08-15' },
      { ...allBadges[3], earnedAt: '2025-10-12' },
      { ...allBadges[6], earnedAt: '2025-09-25' },
      { ...allBadges[7], earnedAt: '2025-10-15' }
    ],
    pointsHistory: [
      { date: '2025-10-26', points: 200, action: 'Missão coletiva completada' },
      { date: '2025-10-24', points: 150, action: 'Melhoria de processo aprovada' },
      { date: '2025-10-21', points: 100, action: 'Defeito crítico encontrado' }
    ]
  },
  {
    id: '2',
    name: 'Ana Silva',
    email: 'ana.silva@empresa.com',
    password: 'analista123',
    role: 'analista',
    avatar: '👩‍💻',
    isFirstAccess: true,
    jobRole: 'Analista de Qualidade',
    seniorityLevel: 'Pl 2',
    participatesInRanking: true,
    totalPoints: 15420,
    monthlyPoints: 3200,
    quarterlyPoints: 8900,
    badges: [
      { ...allBadges[0], earnedAt: '2025-09-12' },
      { ...allBadges[2], earnedAt: '2025-10-05' },
      { ...allBadges[4], earnedAt: '2025-09-20' }
    ],
    pointsHistory: [
      { date: '2025-10-25', points: 100, action: 'Defeito crítico encontrado' },
      { date: '2025-10-23', points: 50, action: 'Defeito de alta severidade' },
      { date: '2025-10-20', points: 30, action: 'Code review aprovado' }
    ]
  },
  {
    id: '3',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@empresa.com',
    password: 'analista123',
    role: 'analista',
    avatar: '👨‍💻',
    isFirstAccess: false,
    jobRole: 'Analista de Qualidade',
    seniorityLevel: 'Pl 3',
    participatesInRanking: true,
    totalPoints: 12890,
    monthlyPoints: 2800,
    quarterlyPoints: 7200,
    badges: [
      { ...allBadges[0], earnedAt: '2025-08-10' },
      { ...allBadges[4], earnedAt: '2025-09-15' },
      { ...allBadges[5], earnedAt: '2025-10-01' }
    ],
    pointsHistory: [
      { date: '2025-10-24', points: 75, action: 'Script de automação criado' },
      { date: '2025-10-22', points: 50, action: 'Defeito de alta severidade' },
      { date: '2025-10-19', points: 20, action: 'Defeito de média severidade' }
    ]
  }
];

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<Array<User & { password: string }>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : INITIAL_USERS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const addUser = (newUser: Omit<User, 'id'> & { password: string }) => {
    const id = Date.now().toString();
    setUsers(prev => [...prev, { 
      ...newUser, 
      id,
      isFirstAccess: true,
      participatesInRanking: newUser.participatesInRanking ?? true,
      totalPoints: 0,
      monthlyPoints: 0,
      quarterlyPoints: 0,
      badges: [],
      pointsHistory: []
    }]);
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, ...updates } : user
      )
    );
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  // Retornar usuários sem a senha para uso no contexto
  const usersWithoutPassword = users.map(({ password, ...user }) => user);

  return (
    <UsersContext.Provider
      value={{
        users: usersWithoutPassword,
        addUser,
        updateUser,
        deleteUser
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
}
