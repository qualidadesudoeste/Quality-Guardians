// Dados simulados para o sistema de gamificação Quality Guardians

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  level: string;
  avatar: string;
  totalPoints: number;
  monthlyPoints: number;
  quarterlyPoints: number;
  badges: Badge[];
  pointsHistory: PointsHistory[];
}

export interface Badge {
  id: string;
  name: string;
  category: string;
  level: 'bronze' | 'prata' | 'ouro' | 'único';
  icon: string;
  description: string;
  earnedAt?: string;
}

export interface PointsHistory {
  date: string;
  points: number;
  action: string;
}

export interface Reward {
  id: string;
  name: string;
  cost: number;
  type: string;
  description: string;
  available: boolean;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  reward: number;
  progress: number;
  target: number;
  active: boolean;
}

// Badges disponíveis
export const allBadges: Badge[] = [
  {
    id: 'bug-hunter-bronze',
    name: 'Caçador de Bugs',
    category: 'Bug Hunting',
    level: 'bronze',
    icon: '🐜',
    description: 'Encontrar 10 defeitos'
  },
  {
    id: 'bug-hunter-silver',
    name: 'Caçador de Bugs',
    category: 'Bug Hunting',
    level: 'prata',
    icon: '🐜',
    description: 'Encontrar 50 defeitos'
  },
  {
    id: 'critical-exterminator-bronze',
    name: 'Exterminador Crítico',
    category: 'Bug Hunting',
    level: 'bronze',
    icon: '🔥',
    description: 'Encontrar 1 defeito crítico'
  },
  {
    id: 'production-guardian',
    name: 'Guardião da Produção',
    category: 'Bug Hunting',
    level: 'único',
    icon: '🛡️',
    description: 'Encontrar um defeito vazado em produção'
  },
  {
    id: 'test-scribe-bronze',
    name: 'Escriba de Testes',
    category: 'Arquitetura',
    level: 'bronze',
    icon: '✍️',
    description: 'Criar 25 casos de teste'
  },
  {
    id: 'automation-commander-bronze',
    name: 'Comandante da Automação',
    category: 'Automação',
    level: 'bronze',
    icon: '🤖',
    description: 'Criar primeiro script de automação'
  },
  {
    id: 'knowledge-beacon',
    name: 'Farol do Conhecimento',
    category: 'Colaboração',
    level: 'único',
    icon: '🧠',
    description: 'Apresentar uma KT Session'
  },
  {
    id: 'process-innovator',
    name: 'Inovador de Processos',
    category: 'Colaboração',
    level: 'único',
    icon: '🚀',
    description: 'Melhoria de processo implementada'
  }
];

// Membros da equipe
export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Ana Silva',
    role: 'Analista de Qualidade',
    level: 'Sr 2',
    avatar: '👩‍💻',
    totalPoints: 15420,
    monthlyPoints: 3250,
    quarterlyPoints: 8900,
    badges: [
      { ...allBadges[0], earnedAt: '2025-09-15' },
      { ...allBadges[1], earnedAt: '2025-10-10' },
      { ...allBadges[2], earnedAt: '2025-09-20' },
      { ...allBadges[6], earnedAt: '2025-10-05' }
    ],
    pointsHistory: [
      { date: '2025-10-25', points: 150, action: 'Defeito crítico encontrado' },
      { date: '2025-10-23', points: 75, action: 'Script de automação criado' },
      { date: '2025-10-20', points: 50, action: 'Defeito de alta severidade' },
      { date: '2025-10-18', points: 100, action: 'KT Session apresentada' }
    ]
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    role: 'Analista de Qualidade',
    level: 'Pl 3',
    avatar: '👨‍💻',
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
  },
  {
    id: '3',
    name: 'Beatriz Costa',
    role: 'Coordenadora de Qualidade',
    level: 'Sr 3',
    avatar: '👩‍🏫',
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
    id: '4',
    name: 'Daniel Oliveira',
    role: 'Analista de Qualidade',
    level: 'Jr 3',
    avatar: '👨‍🎓',
    totalPoints: 5680,
    monthlyPoints: 1450,
    quarterlyPoints: 3200,
    badges: [
      { ...allBadges[0], earnedAt: '2025-10-20' },
      { ...allBadges[4], earnedAt: '2025-10-15' }
    ],
    pointsHistory: [
      { date: '2025-10-25', points: 50, action: 'Defeito de alta severidade' },
      { date: '2025-10-22', points: 20, action: 'Defeito de média severidade' },
      { date: '2025-10-18', points: 10, action: 'Caso de teste criado' }
    ]
  },
  {
    id: '5',
    name: 'Fernanda Rocha',
    role: 'Analista de Qualidade',
    level: 'Pl 1',
    avatar: '👩‍🔬',
    totalPoints: 9340,
    monthlyPoints: 2100,
    quarterlyPoints: 5800,
    badges: [
      { ...allBadges[0], earnedAt: '2025-09-05' },
      { ...allBadges[2], earnedAt: '2025-10-08' },
      { ...allBadges[5], earnedAt: '2025-09-28' }
    ],
    pointsHistory: [
      { date: '2025-10-23', points: 75, action: 'Script de automação criado' },
      { date: '2025-10-20', points: 100, action: 'Defeito crítico encontrado' },
      { date: '2025-10-17', points: 20, action: 'Defeito de média severidade' }
    ]
  }
];

// Recompensas disponíveis
export const rewards: Reward[] = [
  {
    id: 'r1',
    name: 'Vale-presente iFood',
    cost: 1500,
    type: 'Itens',
    description: 'Voucher de R$50 para usar como quiser',
    available: true
  },
  {
    id: 'r2',
    name: 'Livro Técnico',
    cost: 3000,
    type: 'Desenvolvimento',
    description: 'Um livro à sua escolha (até R$120)',
    available: true
  },
  {
    id: 'r3',
    name: 'Sexta-feira Curta',
    cost: 4000,
    type: 'Flexibilidade',
    description: 'Saia 3 horas mais cedo em uma sexta-feira',
    available: true
  },
  {
    id: 'r4',
    name: 'Curso Online',
    cost: 7500,
    type: 'Desenvolvimento',
    description: 'Acesso a curso em plataformas como Alura ou Udemy (até R$500)',
    available: true
  },
  {
    id: 'r5',
    name: 'Dia de Folga',
    cost: 10000,
    type: 'Flexibilidade',
    description: 'Um dia inteiro de folga para recarregar as energias',
    available: true
  },
  {
    id: 'r6',
    name: 'Voucher para Certificação',
    cost: 15000,
    type: 'Desenvolvimento',
    description: 'Custeio da taxa de exame para certificação (ex: CTFL, AWS)',
    available: true
  },
  {
    id: 'r7',
    name: 'Ingresso para Conferência',
    cost: 25000,
    type: 'Desenvolvimento',
    description: 'Ingresso para conferência nacional (ex: TDC, QCon)',
    available: false
  }
];

// Missões coletivas
export const missions: Mission[] = [
  {
    id: 'm1',
    name: 'Muralha da Qualidade',
    description: 'Completar uma sprint sem defeitos vazados',
    reward: 200,
    progress: 12,
    target: 14,
    active: true
  },
  {
    id: 'm2',
    name: 'Cobertura Total',
    description: 'Atingir 100% de cobertura de testes em módulo crítico',
    reward: 150,
    progress: 78,
    target: 100,
    active: true
  },
  {
    id: 'm3',
    name: 'Zera Fila',
    description: 'Triar 100% dos defeitos em menos de 24h durante uma semana',
    reward: 100,
    progress: 5,
    target: 7,
    active: true
  }
];
