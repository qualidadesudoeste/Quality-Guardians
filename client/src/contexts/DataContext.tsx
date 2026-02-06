import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { missions as initialMissions, TeamMember, Mission } from '@/data/mockData';
import { useUsers } from './UsersContext';
import { User } from './AuthContext';

interface DataContextType {
  teamMembers: TeamMember[];
  missions: Mission[];
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  updateMission: (id: string, updates: Partial<Mission>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY_TEAM = 'quality-guardians-team';
const STORAGE_KEY_MISSIONS = 'quality-guardians-missions';

export function DataProvider({ children }: { children: ReactNode }) {
  const { users, updateUser } = useUsers();
  
  // Converter usuários em membros da equipe
  const teamMembers: TeamMember[] = users.map((user: User) => ({
    id: user.id,
    name: user.name,
    role: user.jobRole || (user.role === 'coordenador' ? 'Coordenadora de Qualidade' : 'Analista de Qualidade'),
    level: user.seniorityLevel || 'Pl 2',
    avatar: user.avatar,
    participatesInRanking: user.participatesInRanking ?? true,
    totalPoints: user.totalPoints || 0,
    monthlyPoints: user.monthlyPoints || 0,
    quarterlyPoints: user.quarterlyPoints || 0,
    badges: user.badges || [],
    pointsHistory: user.pointsHistory || []
  } as any));

  const [missions, setMissions] = useState<Mission[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_MISSIONS);
    return stored ? JSON.parse(stored) : initialMissions;
  });

  // Não precisamos mais salvar teamMembers separadamente,
  // pois eles são derivados dos users

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MISSIONS, JSON.stringify(missions));
  }, [missions]);

  const updateTeamMember = (id: string, updates: Partial<TeamMember>) => {
    // Converter updates de TeamMember para User
    const userUpdates: Partial<User> = {
      name: updates.name,
      avatar: updates.avatar,
      jobRole: updates.role,
      seniorityLevel: updates.level,
      totalPoints: updates.totalPoints,
      monthlyPoints: updates.monthlyPoints,
      quarterlyPoints: updates.quarterlyPoints,
      badges: updates.badges,
      pointsHistory: updates.pointsHistory
    };
    updateUser(id, userUpdates);
  };

  const updateMission = (id: string, updates: Partial<Mission>) => {
    setMissions(prev =>
      prev.map(mission =>
        mission.id === id ? { ...mission, ...updates } : mission
      )
    );
  };

  return (
    <DataContext.Provider value={{ teamMembers, missions, updateTeamMember, updateMission }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
