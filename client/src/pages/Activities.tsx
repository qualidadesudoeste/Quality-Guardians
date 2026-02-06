import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUsers } from '@/contexts/UsersContext';
import { useActivities, ActivityType } from '@/contexts/ActivitiesContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, TrendingUp, Activity as ActivityIcon, Calendar, Filter } from 'lucide-react';
import { toast } from 'sonner';

const ACTIVITY_TYPES: { value: ActivityType; label: string; icon: string; category: string }[] = [
  { value: 'defect_critical', label: 'Defeito Crítico', icon: '🔴', category: 'Defeitos' },
  { value: 'defect_high', label: 'Defeito Alto', icon: '🟠', category: 'Defeitos' },
  { value: 'defect_medium', label: 'Defeito Médio', icon: '🟡', category: 'Defeitos' },
  { value: 'defect_low', label: 'Defeito Baixo', icon: '🟢', category: 'Defeitos' },
  { value: 'test_created', label: 'Teste Criado', icon: '📝', category: 'Testes' },
  { value: 'test_executed', label: 'Teste Executado', icon: '▶️', category: 'Testes' },
  { value: 'test_automated', label: 'Teste Automatizado', icon: '⚙️', category: 'Testes' },
  { value: 'code_review', label: 'Code Review', icon: '👁️', category: 'Colaboração' },
  { value: 'documentation', label: 'Documentação', icon: '📖', category: 'Colaboração' },
];

export default function Activities() {
  const { user } = useAuth();
  const { users, updateUser } = useUsers();
  const { activities, addActivity, calculatePoints, getActivitiesByUser, checkAndAwardBadges } = useActivities();
  
  const [selectedUser, setSelectedUser] = useState('');
  const [activityType, setActivityType] = useState<ActivityType | ''>('');
  const [description, setDescription] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterUser, setFilterUser] = useState<string>('all');

  // Filtrar apenas analistas que participam do ranking
  const analysts = users.filter(u => u.participatesInRanking && u.role !== 'admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser || !activityType || !description.trim()) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const points = calculatePoints(activityType);
    const selectedUserData = users.find(u => u.id === selectedUser);

    addActivity({
      userId: selectedUser,
      type: activityType,
      description: description.trim(),
      points,
      registeredBy: user?.id || '',
    });

    // Atualizar pontos do usuário
    if (selectedUserData) {
      const newMonthlyPoints = (selectedUserData.monthlyPoints || 0) + points;
      const newQuarterlyPoints = (selectedUserData.quarterlyPoints || 0) + points;
      const newTotalPoints = (selectedUserData.totalPoints || 0) + points;

      // Verificar badges
      const userActivities = [...getActivitiesByUser(selectedUser), {
        userId: selectedUser,
        type: activityType,
        description: description.trim(),
        points,
        registeredBy: user?.id || '',
        id: 'temp',
        date: new Date().toISOString()
      }];
      
      const newBadges = checkAndAwardBadges(
        selectedUser,
        userActivities,
        selectedUserData.badges || []
      );

      updateUser(selectedUser, {
        monthlyPoints: newMonthlyPoints,
        quarterlyPoints: newQuarterlyPoints,
        totalPoints: newTotalPoints,
        badges: newBadges.length > 0 ? [...(selectedUserData.badges || []), ...newBadges] : selectedUserData.badges,
      });

      // Notificar sobre novas badges
      if (newBadges.length > 0) {
        newBadges.forEach(badge => {
          toast.success(`🏆 Nova conquista desbloqueada!`, {
            description: `${selectedUserData.name} conquistou: ${badge.icon} ${badge.name} (${badge.level})`,
          });
        });
      }
    }

    // Limpar formulário
    setSelectedUser('');
    setActivityType('');
    setDescription('');

    const activityLabel = ACTIVITY_TYPES.find(a => a.value === activityType)?.label;
    toast.success(`Atividade registrada! +${points} pontos para ${selectedUserData?.name}`, {
      description: activityLabel,
    });
  };

  // Filtrar atividades
  const filteredActivities = activities.filter(activity => {
    if (filterType !== 'all' && activity.type !== filterType) return false;
    if (filterUser !== 'all' && activity.userId !== filterUser) return false;
    return true;
  });

  // Estatísticas
  const totalActivities = activities.length;
  const totalPointsAwarded = activities.reduce((sum, a) => sum + a.points, 0);
  const activitiesToday = activities.filter(a => {
    const today = new Date().toDateString();
    const activityDate = new Date(a.date).toDateString();
    return today === activityDate;
  }).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Registro de Atividades</h1>
          <p className="text-muted-foreground">
            Registre as ações dos analistas e acompanhe a evolução da equipe
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Atividades</CardTitle>
              <ActivityIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalActivities}</div>
              <p className="text-xs text-muted-foreground">
                {activitiesToday} registradas hoje
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pontos Distribuídos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPointsAwarded.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Total acumulado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Analistas Ativos</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analysts.length}</div>
              <p className="text-xs text-muted-foreground">
                Participando do ranking
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Formulário de Registro */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Registrar Nova Atividade
            </CardTitle>
            <CardDescription>
              Selecione o analista e o tipo de atividade realizada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="user">Analista *</Label>
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger id="user">
                      <SelectValue placeholder="Selecione o analista" />
                    </SelectTrigger>
                    <SelectContent>
                      {analysts.map(analyst => (
                        <SelectItem key={analyst.id} value={analyst.id}>
                          <div className="flex items-center gap-2">
                            {analyst.avatar?.startsWith('data:image') ? (
                              <img src={analyst.avatar} alt="" className="w-5 h-5 rounded-full" />
                            ) : (
                              <span>{analyst.avatar}</span>
                            )}
                            {analyst.name} - {analyst.seniorityLevel}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Atividade *</Label>
                  <Select value={activityType} onValueChange={(value) => setActivityType(value as ActivityType)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {ACTIVITY_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <span>{type.icon}</span>
                            {type.label}
                            <Badge variant="outline" className="ml-auto">
                              +{calculatePoints(type.value)} pts
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva a atividade realizada (ex: Bug crítico encontrado no módulo de pagamentos)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Registrar Atividade
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Histórico de Atividades */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Histórico de Atividades</CardTitle>
                <CardDescription>
                  Todas as atividades registradas no sistema
                </CardDescription>
              </div>
              <Filter className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {/* Filtros */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="filterType" className="text-sm">Filtrar por Tipo</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger id="filterType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    {ACTIVITY_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="filterUser" className="text-sm">Filtrar por Analista</Label>
                <Select value={filterUser} onValueChange={setFilterUser}>
                  <SelectTrigger id="filterUser">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os analistas</SelectItem>
                    {analysts.map(analyst => (
                      <SelectItem key={analyst.id} value={analyst.id}>
                        {analyst.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tabela */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Analista</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Pontos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActivities.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        Nenhuma atividade registrada ainda
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredActivities.map(activity => {
                      const activityUser = users.find(u => u.id === activity.userId);
                      const activityTypeData = ACTIVITY_TYPES.find(t => t.value === activity.type);
                      const date = new Date(activity.date);

                      return (
                        <TableRow key={activity.id}>
                          <TableCell className="font-mono text-sm">
                            {date.toLocaleDateString('pt-BR')} {date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {activityUser?.avatar?.startsWith('data:image') ? (
                                <img src={activityUser.avatar} alt="" className="w-6 h-6 rounded-full" />
                              ) : (
                                <span>{activityUser?.avatar}</span>
                              )}
                              {activityUser?.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {activityTypeData?.icon} {activityTypeData?.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-md truncate">
                            {activity.description}
                          </TableCell>
                          <TableCell className="text-right font-semibold text-green-600">
                            +{activity.points}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
