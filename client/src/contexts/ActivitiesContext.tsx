import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUsers } from './UsersContext';
import { useGoals } from './GoalsContext';
import { allBadges, Badge } from '@/data/mockData';

export type ActivityType = 
  | 'defect_critical'
  | 'defect_high'
  | 'defect_medium'
  | 'defect_low'
  | 'test_created'
  | 'test_executed'
  | 'test_automated'
  | 'code_review'
  | 'documentation';

export interface Activity {
  id: string;
  userId: string;
  type: ActivityType;
  description: string;
  points: number;
  date: string;
  registeredBy: string;
}

interface ActivitiesContextType {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'date'>) => void;
  getActivitiesByUser: (userId: string) => Activity[];
  getActivitiesByDateRange: (startDate: string, endDate: string) => Activity[];
  calculatePoints: (type: ActivityType) => number;
  checkAndAwardBadges: (userId: string, userActivities: Activity[], currentBadges: Badge[]) => Badge[];
}

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(undefined);

export function useActivities() {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error('useActivities must be used within ActivitiesProvider');
  }
  return context;
}

interface ActivitiesProviderProps {
  children: ReactNode;
}

export function ActivitiesProvider({ children }: ActivitiesProviderProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const { updateUser } = useUsers();
  const { goals } = useGoals();

  // Carregar atividades do localStorage
  useEffect(() => {
    const stored = localStorage.getItem('qa_activities');
    if (stored) {
      setActivities(JSON.parse(stored));
    }
  }, []);

  // Salvar atividades no localStorage
  useEffect(() => {
    localStorage.setItem('qa_activities', JSON.stringify(activities));
  }, [activities]);

  const calculatePoints = (type: ActivityType): number => {
    const pointsMap: Record<ActivityType, number> = {
      defect_critical: goals.pointsPerActivity.bugCritical,
      defect_high: goals.pointsPerActivity.bugHigh,
      defect_medium: goals.pointsPerActivity.bugMedium,
      defect_low: goals.pointsPerActivity.bugLow,
      test_created: goals.pointsPerActivity.testCaseCreated,
      test_executed: goals.pointsPerActivity.testCaseExecuted,
      test_automated: goals.pointsPerActivity.automationScript,
      code_review: goals.pointsPerActivity.codeReview,
      documentation: goals.pointsPerActivity.documentation,
    };
    return pointsMap[type] || 0;
  };

  const checkAndAwardBadges = (userId: string, userActivities: Activity[], currentBadges: Badge[]) => {
    const newBadges: Badge[] = [];

    // Contar atividades por tipo
    const defectsCount = userActivities.filter(a => a.type.startsWith('defect_')).length;
    const criticalDefectsCount = userActivities.filter(a => a.type === 'defect_critical').length;
    const testsCreatedCount = userActivities.filter(a => a.type === 'test_created').length;
    const automationsCount = userActivities.filter(a => a.type === 'test_automated').length;

    // Caçador de Bugs - Bronze (10 defeitos)
    if (defectsCount >= 10 && !currentBadges.some(b => b.id === 'bug-hunter-bronze')) {
      const badge = allBadges.find(b => b.id === 'bug-hunter-bronze');
      if (badge) newBadges.push({ ...badge, earnedAt: new Date().toISOString() });
    }

    // Caçador de Bugs - Prata (50 defeitos)
    if (defectsCount >= 50 && !currentBadges.some(b => b.id === 'bug-hunter-silver')) {
      const badge = allBadges.find(b => b.id === 'bug-hunter-silver');
      if (badge) newBadges.push({ ...badge, earnedAt: new Date().toISOString() });
    }

    // Exterminador Crítico - Bronze (1 defeito crítico)
    if (criticalDefectsCount >= 1 && !currentBadges.some(b => b.id === 'critical-exterminator-bronze')) {
      const badge = allBadges.find(b => b.id === 'critical-exterminator-bronze');
      if (badge) newBadges.push({ ...badge, earnedAt: new Date().toISOString() });
    }

    // Escriba de Testes - Bronze (25 casos de teste)
    if (testsCreatedCount >= 25 && !currentBadges.some(b => b.id === 'test-scribe-bronze')) {
      const badge = allBadges.find(b => b.id === 'test-scribe-bronze');
      if (badge) newBadges.push({ ...badge, earnedAt: new Date().toISOString() });
    }

    // Comandante da Automação - Bronze (primeiro script)
    if (automationsCount >= 1 && !currentBadges.some(b => b.id === 'automation-commander-bronze')) {
      const badge = allBadges.find(b => b.id === 'automation-commander-bronze');
      if (badge) newBadges.push({ ...badge, earnedAt: new Date().toISOString() });
    }

    return newBadges;
  };

  const addActivity = (activityData: Omit<Activity, 'id' | 'date'>) => {
    const newActivity: Activity = {
      ...activityData,
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
    };

    setActivities(prev => [newActivity, ...prev]);
  };

  const getActivitiesByUser = (userId: string): Activity[] => {
    return activities.filter(activity => activity.userId === userId);
  };

  const getActivitiesByDateRange = (startDate: string, endDate: string): Activity[] => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    return activities.filter(activity => {
      const activityDate = new Date(activity.date).getTime();
      return activityDate >= start && activityDate <= end;
    });
  };

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        addActivity,
        getActivitiesByUser,
        getActivitiesByDateRange,
        calculatePoints,
        checkAndAwardBadges,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}
