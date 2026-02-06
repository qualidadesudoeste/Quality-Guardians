import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import EditMissionDialog from "@/components/EditMissionDialog";
import { Mission } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Target, Trophy, Zap, CheckCircle2, Edit2 } from "lucide-react";
import { useState } from "react";

export default function Missions() {
  const { missions, updateMission } = useData();
  const { canEdit } = useAuth();
  const [editingMission, setEditingMission] = useState<Mission | null>(null);

  const activeMissions = missions.filter(m => m.active);
  const completedCount = missions.filter(m => m.progress >= m.target).length;

  const handleSave = (id: string, updates: Partial<Mission>) => {
    updateMission(id, updates);
  };

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 100) return "bg-green-500";
    if (percentage >= 75) return "bg-yellow-500";
    if (percentage >= 50) return "bg-blue-500";
    return "bg-muted-foreground";
  };

  const getMissionIcon = (missionName: string) => {
    if (missionName.includes('Muralha')) return '🧱';
    if (missionName.includes('Cobertura')) return '🗺️';
    if (missionName.includes('Zera')) return '⏱️';
    return '🎯';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Missões Coletivas</h1>
          <p className="text-muted-foreground">Desafios da equipe com recompensas especiais</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Missões Ativas</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeMissions.length}</div>
              <p className="text-xs text-muted-foreground">Em andamento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Missões Completadas</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCount}</div>
              <p className="text-xs text-muted-foreground">Neste trimestre</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recompensa Total</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {missions.reduce((sum, m) => sum + m.reward, 0).toLocaleString()} QP
              </div>
              <p className="text-xs text-muted-foreground">Por membro</p>
            </CardContent>
          </Card>
        </div>

        {/* Missões Ativas */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <h2 className="text-2xl font-bold text-foreground">Missões em Andamento</h2>
          </div>

          {activeMissions.map((mission) => {
            const progressPercentage = Math.min((mission.progress / mission.target) * 100, 100);
            const isCompleted = mission.progress >= mission.target;

            return (
              <Card
                key={mission.id}
                className={`${
                  isCompleted
                    ? 'border-green-500/50 bg-green-500/5'
                    : 'border-primary/30'
                } transition-all`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="text-4xl">{getMissionIcon(mission.name)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-xl">{mission.name}</CardTitle>
                          {isCompleted && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                              Completada!
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-base">
                          {mission.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {canEdit && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingMission(mission)}
                          className="gap-2"
                        >
                          <Edit2 className="h-4 w-4" />
                          Editar
                        </Button>
                      )}
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Trophy className="h-5 w-5 text-yellow-500" />
                          <span className="text-2xl font-bold text-foreground">
                            +{mission.reward}
                          </span>
                          <span className="text-sm text-muted-foreground">QP</span>
                        </div>
                        <p className="text-xs text-muted-foreground">por membro</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-semibold text-foreground">
                        {mission.progress} / {mission.target}
                      </span>
                    </div>
                    <Progress
                      value={progressPercentage}
                      className="h-3"
                    />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {progressPercentage.toFixed(0)}% concluído
                      </span>
                      {!isCompleted && (
                        <span className="text-muted-foreground">
                          Faltam {mission.target - mission.progress} unidades
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Como Funcionam as Missões */}
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Como Funcionam as Missões Coletivas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>
              As <strong className="text-foreground">Missões Coletivas</strong> são desafios que a equipe inteira trabalha junta para completar. Quando uma missão é concluída, <strong className="text-foreground">todos os membros da equipe ganham a recompensa em Pontos de Qualidade</strong>.
            </p>
            <p>
              Essas missões incentivam a colaboração, a comunicação e o alinhamento da equipe em torno de objetivos comuns de qualidade. Trabalhem juntos para maximizar os ganhos!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-2xl mb-2">🧱</div>
                <h4 className="font-semibold text-foreground mb-1">Muralha da Qualidade</h4>
                <p className="text-sm">Zero defeitos vazados em uma sprint completa</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-2xl mb-2">🗺️</div>
                <h4 className="font-semibold text-foreground mb-1">Cobertura Total</h4>
                <p className="text-sm">100% de cobertura de testes em módulos críticos</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-2xl mb-2">⏱️</div>
                <h4 className="font-semibold text-foreground mb-1">Zera Fila</h4>
                <p className="text-sm">Triagem de todos os defeitos em menos de 24h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Diálogo de Edição */}
      {editingMission && (
        <EditMissionDialog
          mission={editingMission}
          open={!!editingMission}
          onOpenChange={(open) => !open && setEditingMission(null)}
          onSave={handleSave}
        />
      )}
    </DashboardLayout>
  );
}
