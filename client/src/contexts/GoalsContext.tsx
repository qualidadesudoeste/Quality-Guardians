import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SystemGoals {
  // Metas de Pontuação
  monthlyPointsGoal: number;
  quarterlyPointsGoal: number;
  yearlyPointsGoal: number;
  
  // Metas de Badges
  badgesPerLevel: {
    junior: number;
    pleno: number;
    senior: number;
    especialista: number;
  };
  
  // Valores de Pontos por Atividade
  pointsPerActivity: {
    bugCritical: number;
    bugHigh: number;
    bugMedium: number;
    bugLow: number;
    testCaseCreated: number;
    testCaseExecuted: number;
    automationScript: number;
    codeReview: number;
    documentation: number;
  };
  
  // Metas de Missões Coletivas
  teamMissionGoal: number;
}

interface GoalsContextType {
  goals: SystemGoals;
  updateGoals: (updates: Partial<SystemGoals>) => void;
  resetGoals: () => void;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

const STORAGE_KEY = 'quality-guardians-goals';

// Configurações padrão do sistema
const DEFAULT_GOALS: SystemGoals = {
  monthlyPointsGoal: 1000,
  quarterlyPointsGoal: 3000,
  yearlyPointsGoal: 12000,
  
  badgesPerLevel: {
    junior: 5,
    pleno: 10,
    senior: 15,
    especialista: 20,
  },
  
  pointsPerActivity: {
    bugCritical: 100,
    bugHigh: 50,
    bugMedium: 25,
    bugLow: 10,
    testCaseCreated: 20,
    testCaseExecuted: 5,
    automationScript: 150,
    codeReview: 30,
    documentation: 40,
  },
  
  teamMissionGoal: 5,
};

export function GoalsProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<SystemGoals>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_GOALS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  const updateGoals = (updates: Partial<SystemGoals>) => {
    setGoals(prev => ({ ...prev, ...updates }));
  };

  const resetGoals = () => {
    setGoals(DEFAULT_GOALS);
  };

  return (
    <GoalsContext.Provider
      value={{
        goals,
        updateGoals,
        resetGoals
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
}
