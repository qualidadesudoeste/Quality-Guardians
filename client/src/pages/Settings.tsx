import { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGoals } from "@/contexts/GoalsContext";
import { Settings as SettingsIcon, Target, Award, Zap, Save, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Settings() {
  const { goals, updateGoals, resetGoals } = useGoals();
  const [localGoals, setLocalGoals] = useState(goals);

  const handleSave = () => {
    updateGoals(localGoals);
    toast.success('Configurações salvas com sucesso!');
  };

  const handleReset = () => {
    resetGoals();
    setLocalGoals(goals);
    toast.success('Configurações restauradas para os valores padrão!');
  };

  const updateLocalGoal = (path: string, value: number) => {
    const keys = path.split('.');
    setLocalGoals(prev => {
      const newGoals = { ...prev };
      let current: any = newGoals;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newGoals;
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
              <SettingsIcon className="h-10 w-10" />
              Configurações do Sistema
            </h1>
            <p className="text-muted-foreground">Defina as metas e valores de pontuação do Quality Guardians</p>
          </div>
          <div className="flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Restaurar Padrões
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Restaurar Configurações Padrão?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Todas as configurações personalizadas serão perdidas e os valores padrão serão restaurados.
                    Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset}>Restaurar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        </div>

        {/* Metas de Pontuação */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Metas de Pontuação
            </CardTitle>
            <CardDescription>Defina as metas de pontos que os membros devem atingir por período</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="monthly-goal">Meta Mensal (QP)</Label>
              <Input
                id="monthly-goal"
                type="number"
                min="0"
                value={localGoals.monthlyPointsGoal}
                onChange={(e) => updateLocalGoal('monthlyPointsGoal', parseInt(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">Pontos esperados por mês</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quarterly-goal">Meta Trimestral (QP)</Label>
              <Input
                id="quarterly-goal"
                type="number"
                min="0"
                value={localGoals.quarterlyPointsGoal}
                onChange={(e) => updateLocalGoal('quarterlyPointsGoal', parseInt(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">Pontos esperados por trimestre</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearly-goal">Meta Anual (QP)</Label>
              <Input
                id="yearly-goal"
                type="number"
                min="0"
                value={localGoals.yearlyPointsGoal}
                onChange={(e) => updateLocalGoal('yearlyPointsGoal', parseInt(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">Pontos esperados por ano</p>
            </div>
          </CardContent>
        </Card>

        {/* Metas de Badges por Nível */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Metas de Badges por Nível
            </CardTitle>
            <CardDescription>Quantidade mínima de badges esperadas para cada nível de proficiência</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="badges-junior">Júnior</Label>
              <Input
                id="badges-junior"
                type="number"
                min="0"
                value={localGoals.badgesPerLevel.junior}
                onChange={(e) => updateLocalGoal('badgesPerLevel.junior', parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="badges-pleno">Pleno</Label>
              <Input
                id="badges-pleno"
                type="number"
                min="0"
                value={localGoals.badgesPerLevel.pleno}
                onChange={(e) => updateLocalGoal('badgesPerLevel.pleno', parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="badges-senior">Sênior</Label>
              <Input
                id="badges-senior"
                type="number"
                min="0"
                value={localGoals.badgesPerLevel.senior}
                onChange={(e) => updateLocalGoal('badgesPerLevel.senior', parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="badges-especialista">Especialista</Label>
              <Input
                id="badges-especialista"
                type="number"
                min="0"
                value={localGoals.badgesPerLevel.especialista}
                onChange={(e) => updateLocalGoal('badgesPerLevel.especialista', parseInt(e.target.value) || 0)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Valores de Pontos por Atividade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Pontuação por Atividade
            </CardTitle>
            <CardDescription>Configure quantos pontos cada tipo de atividade vale</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Bugs */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Defeitos Encontrados</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bug-critical">Crítico</Label>
                  <Input
                    id="bug-critical"
                    type="number"
                    min="0"
                    value={localGoals.pointsPerActivity.bugCritical}
                    onChange={(e) => updateLocalGoal('pointsPerActivity.bugCritical', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bug-high">Alto</Label>
                  <Input
                    id="bug-high"
                    type="number"
                    min="0"
                    value={localGoals.pointsPerActivity.bugHigh}
                    onChange={(e) => updateLocalGoal('pointsPerActivity.bugHigh', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bug-medium">Médio</Label>
                  <Input
                    id="bug-medium"
                    type="number"
                    min="0"
                    value={localGoals.pointsPerActivity.bugMedium}
                    onChange={(e) => updateLocalGoal('pointsPerActivity.bugMedium', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bug-low">Baixo</Label>
                  <Input
                    id="bug-low"
                    type="number"
                    min="0"
                    value={localGoals.pointsPerActivity.bugLow}
                    onChange={(e) => updateLocalGoal('pointsPerActivity.bugLow', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>

            {/* Testes */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Atividades de Teste</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="test-created">Caso de Teste Criado</Label>
                  <Input
                    id="test-created"
                    type="number"
                    min="0"
                    value={localGoals.pointsPerActivity.testCaseCreated}
                    onChange={(e) => updateLocalGoal('pointsPerActivity.testCaseCreated', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="test-executed">Caso de Teste Executado</Label>
                  <Input
                    id="test-executed"
                    type="number"
                    min="0"
                    value={localGoals.pointsPerActivity.testCaseExecuted}
                    onChange={(e) => updateLocalGoal('pointsPerActivity.testCaseExecuted', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="automation">Script de Automação</Label>
                  <Input
                    id="automation"
                    type="number"
                    min="0"
                    value={localGoals.pointsPerActivity.automationScript}
                    onChange={(e) => updateLocalGoal('pointsPerActivity.automationScript', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>

            {/* Outras Atividades */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Outras Contribuições</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code-review">Code Review</Label>
                  <Input
                    id="code-review"
                    type="number"
                    min="0"
                    value={localGoals.pointsPerActivity.codeReview}
                    onChange={(e) => updateLocalGoal('pointsPerActivity.codeReview', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="documentation">Documentação</Label>
                  <Input
                    id="documentation"
                    type="number"
                    min="0"
                    value={localGoals.pointsPerActivity.documentation}
                    onChange={(e) => updateLocalGoal('pointsPerActivity.documentation', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meta de Missões Coletivas */}
        <Card>
          <CardHeader>
            <CardTitle>Missões Coletivas</CardTitle>
            <CardDescription>Quantidade de missões coletivas ativas simultaneamente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-xs space-y-2">
              <Label htmlFor="team-mission-goal">Missões Ativas</Label>
              <Input
                id="team-mission-goal"
                type="number"
                min="1"
                value={localGoals.teamMissionGoal}
                onChange={(e) => updateLocalGoal('teamMissionGoal', parseInt(e.target.value) || 1)}
              />
              <p className="text-xs text-muted-foreground">Número ideal de missões coletivas em andamento</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
