import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface QuestionnaireItem {
  id: string;
  category: string;
  competency: string;
  level: string; // Jr 1, Jr 2, Jr 3, Pl 1, Pl 2, Pl 3, Sr 1, Sr 2, Sr 3, Especialista
  weight: number; // Peso da competência para cálculo de nível
}

interface QuestionnaireContextType {
  items: QuestionnaireItem[];
  addItem: (item: Omit<QuestionnaireItem, 'id'>) => void;
  updateItem: (id: string, updates: Partial<QuestionnaireItem>) => void;
  deleteItem: (id: string) => void;
  resetToDefault: () => void;
  getItemsByLevel: (level: string) => QuestionnaireItem[];
  calculateLevel: (selectedCompetencies: string[]) => string;
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

const STORAGE_KEY = 'quality_guardians_questionnaire';

// Questionário padrão baseado no sistema atual
const DEFAULT_ITEMS: QuestionnaireItem[] = [
  // Jr 1
  { id: '1', category: 'Teste Manual', competency: 'Teste Manual - Funcional', level: 'Jr 1', weight: 1 },
  { id: '2', category: 'Teste Manual', competency: 'Teste Manual - Exploratório', level: 'Jr 1', weight: 1 },
  { id: '3', category: 'Documentação', competency: 'Documentação de Defeitos', level: 'Jr 1', weight: 1 },
  { id: '4', category: 'Execução', competency: 'Execução de Casos de Teste', level: 'Jr 1', weight: 1 },
  { id: '5', category: 'Metodologias', competency: 'Metodologias Ágeis - Scrum Básico', level: 'Jr 1', weight: 1 },
  
  // Jr 2
  { id: '6', category: 'Teste Manual', competency: 'Teste de Regressão', level: 'Jr 2', weight: 1 },
  { id: '7', category: 'Teste Manual', competency: 'Teste de Integração', level: 'Jr 2', weight: 1 },
  { id: '8', category: 'Análise', competency: 'Análise de Requisitos', level: 'Jr 2', weight: 1 },
  { id: '9', category: 'Planejamento', competency: 'Criação de Casos de Teste', level: 'Jr 2', weight: 1 },
  { id: '10', category: 'Ferramentas', competency: 'Ferramentas de Gestão (Jira, Azure DevOps)', level: 'Jr 2', weight: 1 },
  
  // Jr 3
  { id: '11', category: 'Teste de API', competency: 'Teste de API - Postman', level: 'Jr 3', weight: 1 },
  { id: '12', category: 'Performance', competency: 'Teste de Performance Básico', level: 'Jr 3', weight: 1 },
  { id: '13', category: 'Banco de Dados', competency: 'SQL Básico', level: 'Jr 3', weight: 1 },
  { id: '14', category: 'Automação', competency: 'Automação de Testes - Conceitos', level: 'Jr 3', weight: 1 },
  { id: '15', category: 'Metodologias', competency: 'Metodologias Ágeis - Kanban', level: 'Jr 3', weight: 1 },
  
  // Pl 1
  { id: '16', category: 'Automação', competency: 'Automação de Testes - Selenium/Cypress', level: 'Pl 1', weight: 2 },
  { id: '17', category: 'Teste de API', competency: 'Teste de API - Rest Assured', level: 'Pl 1', weight: 2 },
  { id: '18', category: 'DevOps', competency: 'CI/CD - Conceitos', level: 'Pl 1', weight: 2 },
  { id: '19', category: 'Controle de Versão', competency: 'Git e Controle de Versão', level: 'Pl 1', weight: 2 },
  { id: '20', category: 'Segurança', competency: 'Teste de Segurança Básico', level: 'Pl 1', weight: 2 },
  
  // Pl 2
  { id: '21', category: 'Automação', competency: 'Automação de Testes - Framework Próprio', level: 'Pl 2', weight: 2 },
  { id: '22', category: 'Performance', competency: 'Teste de Performance - JMeter/K6', level: 'Pl 2', weight: 2 },
  { id: '23', category: 'DevOps', competency: 'CI/CD - Implementação (Jenkins, GitLab CI)', level: 'Pl 2', weight: 2 },
  { id: '24', category: 'Banco de Dados', competency: 'SQL Avançado e Otimização', level: 'Pl 2', weight: 2 },
  { id: '25', category: 'Teste Mobile', competency: 'Teste Mobile - Appium', level: 'Pl 2', weight: 2 },
  
  // Pl 3
  { id: '26', category: 'Arquitetura', competency: 'Arquitetura de Testes', level: 'Pl 3', weight: 3 },
  { id: '27', category: 'Performance', competency: 'Teste de Carga e Stress', level: 'Pl 3', weight: 3 },
  { id: '28', category: 'Segurança', competency: 'Teste de Segurança Avançado (OWASP)', level: 'Pl 3', weight: 3 },
  { id: '29', category: 'Containers', competency: 'Docker e Kubernetes para Testes', level: 'Pl 3', weight: 3 },
  { id: '30', category: 'Programação', competency: 'Programação - Python/Java/JavaScript', level: 'Pl 3', weight: 3 },
  
  // Sr 1
  { id: '31', category: 'Liderança', competency: 'Liderança Técnica', level: 'Sr 1', weight: 3 },
  { id: '32', category: 'Estratégia', competency: 'Estratégia de Testes', level: 'Sr 1', weight: 3 },
  { id: '33', category: 'Mentoria', competency: 'Mentoria e Treinamento', level: 'Sr 1', weight: 3 },
  { id: '34', category: 'Microserviços', competency: 'Teste de Microserviços', level: 'Sr 1', weight: 3 },
  { id: '35', category: 'Cloud', competency: 'Testes em Cloud (AWS, Azure, GCP)', level: 'Sr 1', weight: 3 },
  
  // Sr 2
  { id: '36', category: 'Processos', competency: 'Definição de Processos de Qualidade', level: 'Sr 2', weight: 4 },
  { id: '37', category: 'Métricas', competency: 'Métricas e KPIs de Qualidade', level: 'Sr 2', weight: 4 },
  { id: '38', category: 'Automação', competency: 'Automação de Infraestrutura de Testes', level: 'Sr 2', weight: 4 },
  { id: '39', category: 'IA/ML', competency: 'Testes com IA e Machine Learning', level: 'Sr 2', weight: 4 },
  { id: '40', category: 'Gestão', competency: 'Gestão de Equipes de QA', level: 'Sr 2', weight: 4 },
  
  // Sr 3
  { id: '41', category: 'Arquitetura', competency: 'Arquitetura de Qualidade Corporativa', level: 'Sr 3', weight: 4 },
  { id: '42', category: 'Transformação', competency: 'Transformação Digital de QA', level: 'Sr 3', weight: 4 },
  { id: '43', category: 'Inovação', competency: 'Inovação em Práticas de Teste', level: 'Sr 3', weight: 4 },
  { id: '44', category: 'Stakeholders', competency: 'Comunicação com Stakeholders C-Level', level: 'Sr 3', weight: 4 },
  { id: '45', category: 'ROI', competency: 'ROI e Business Case de Qualidade', level: 'Sr 3', weight: 4 },
  
  // Especialista
  { id: '46', category: 'Visão Estratégica', competency: 'Visão Estratégica de Qualidade', level: 'Especialista', weight: 5 },
  { id: '47', category: 'Thought Leadership', competency: 'Thought Leadership e Publicações', level: 'Especialista', weight: 5 },
  { id: '48', category: 'Consultoria', competency: 'Consultoria Especializada', level: 'Especialista', weight: 5 },
  { id: '49', category: 'Pesquisa', competency: 'Pesquisa e Desenvolvimento em QA', level: 'Especialista', weight: 5 },
  { id: '50', category: 'Comunidade', competency: 'Contribuição para Comunidade (Open Source, Palestras)', level: 'Especialista', weight: 5 },
];

export function QuestionnaireProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuestionnaireItem[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_ITEMS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<QuestionnaireItem, 'id'>) => {
    const id = Date.now().toString();
    setItems(prev => [...prev, { ...item, id }]);
  };

  const updateItem = (id: string, updates: Partial<QuestionnaireItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const resetToDefault = () => {
    setItems(DEFAULT_ITEMS);
  };

  const getItemsByLevel = (level: string): QuestionnaireItem[] => {
    return items.filter(item => item.level === level);
  };

  const calculateLevel = (selectedCompetencies: string[]): string => {
    // Calcular pontuação total baseada nos pesos
    const totalWeight = items
      .filter(item => selectedCompetencies.includes(item.competency))
      .reduce((sum, item) => sum + item.weight, 0);

    // Definir níveis baseados em pontuação
    if (totalWeight >= 180) return 'Especialista';
    if (totalWeight >= 150) return 'Sr 3';
    if (totalWeight >= 120) return 'Sr 2';
    if (totalWeight >= 90) return 'Sr 1';
    if (totalWeight >= 70) return 'Pl 3';
    if (totalWeight >= 50) return 'Pl 2';
    if (totalWeight >= 35) return 'Pl 1';
    if (totalWeight >= 20) return 'Jr 3';
    if (totalWeight >= 10) return 'Jr 2';
    return 'Jr 1';
  };

  return (
    <QuestionnaireContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        deleteItem,
        resetToDefault,
        getItemsByLevel,
        calculateLevel,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within QuestionnaireProvider');
  }
  return context;
}
