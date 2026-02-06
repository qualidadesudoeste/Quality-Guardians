import { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useUsers } from "@/contexts/UsersContext";
import { useQuestionnaire } from "@/contexts/QuestionnaireContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Lock, CheckCircle2, Award } from "lucide-react";
import { toast } from "sonner";
import { APP_TITLE } from "@/const";

// Removido - agora usa QuestionnaireContext
/* const COMPETENCIES_BY_LEVEL_OLD = {
  'Jr 1': [
    'Teste Manual - Funcional',
    'Teste Manual - Exploratório',
    'Documentação de Defeitos',
    'Execução de Casos de Teste',
    'Metodologias Ágeis - Scrum Básico',
  ],
  'Jr 2': [
    ...['Jr 1'],
    'Teste de Regressão',
    'Teste de Integração',
    'Análise de Requisitos',
    'Criação de Casos de Teste',
    'Ferramentas de Gestão (Jira, Azure DevOps)',
  ],
  'Jr 3': [
    ...['Jr 2'],
    'Teste de API - Postman',
    'Teste de Performance Básico',
    'SQL Básico',
    'Automação de Testes - Conceitos',
    'Metodologias Ágeis - Kanban',
  ],
  'Pl 1': [
    ...['Jr 3'],
    'Automação de Testes - Selenium/Cypress',
    'Teste de API - Rest Assured',
    'CI/CD - Conceitos',
    'Git e Controle de Versão',
    'Teste de Segurança Básico',
  ],
  'Pl 2': [
    ...['Pl 1'],
    'Automação de Testes - Framework Próprio',
    'Teste de Performance - JMeter/K6',
    'SQL Avançado',
    'Testes em Microserviços',
    'Code Review',
  ],
  'Pl 3': [
    ...['Pl 2'],
    'Arquitetura de Testes',
    'Teste de Carga e Stress',
    'Containerização - Docker',
    'Testes em Cloud (AWS/Azure)',
    'Mentoria de Juniores',
  ],
  'Sr 1': [
    ...['Pl 3'],
    'Estratégia de Testes',
    'Teste de Segurança Avançado',
    'Kubernetes Básico',
    'Observabilidade e Monitoramento',
    'Liderança Técnica',
  ],
  'Sr 2': [
    ...['Sr 1'],
    'Arquitetura de Qualidade',
    'Teste de Chaos Engineering',
    'DevOps e SRE',
    'Análise de Métricas de Qualidade',
    'Gestão de Equipe',
  ],
  'Sr 3': [
    ...['Sr 2'],
    'Definição de Processos de Qualidade',
    'Teste de IA/ML',
    'Automação de Infraestrutura',
    'Evangelização de Qualidade',
    'Mentoria de Plenos e Seniores',
  ],
  'Especialista': [
    ...['Sr 3'],
    'Pesquisa e Inovação em QA',
    'Palestras e Publicações',
    'Consultoria Estratégica',
    'Desenvolvimento de Ferramentas',
    'Referência no Mercado',
  ],
};

*/

// Agora as competências vêm do QuestionnaireContext

export default function Onboarding() {
  const { user, logout, updateCurrentUser } = useAuth();
  const { updateUser } = useUsers();
  const { items: questionnaireItems, calculateLevel } = useQuestionnaire();
  
  const [step, setStep] = useState<'password' | 'competencies'>('password');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedCompetencies, setSelectedCompetencies] = useState<string[]>([]);

  if (!user) return null;

  const progress = step === 'password' ? 33 : 66;

  const handlePasswordChange = () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Preencha todos os campos');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    // Atualizar senha no UsersContext (persiste no localStorage)
    updateUser(user.id, { password: newPassword });
    toast.success('Senha alterada com sucesso!');
    setStep('competencies');
  };

  const toggleCompetency = (competency: string) => {
    setSelectedCompetencies(prev =>
      prev.includes(competency)
        ? prev.filter(c => c !== competency)
        : [...prev, competency]
    );
  };

  // Agora usa o método do QuestionnaireContext que considera os pesos

  const handleComplete = () => {
    if (selectedCompetencies.length === 0) {
      toast.error('Selecione pelo menos uma competência');
      return;
    }

    const seniorityLevel = calculateLevel(selectedCompetencies);
    
    // Atualizar usuário no UsersContext (persiste no localStorage)
    updateUser(user.id, {
      isFirstAccess: false,
      seniorityLevel,
      competencies: selectedCompetencies,
    });

    // Atualizar usuário atual no AuthContext (atualiza estado imediatamente)
    updateCurrentUser({
      isFirstAccess: false,
      seniorityLevel,
      competencies: selectedCompetencies,
    });

    toast.success(`Onboarding concluído! Seu nível: ${seniorityLevel}`);
    
    // Aguardar um momento para o toast aparecer
    setTimeout(() => {
      // O App.tsx vai detectar isFirstAccess=false e redirecionar automaticamente
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-5xl">🛡️</div>
            <h1 className="text-3xl font-bold text-foreground">{APP_TITLE}</h1>
          </div>
          <h2 className="text-2xl font-semibold text-foreground">Bem-vindo(a), {user.name}!</h2>
          <p className="text-muted-foreground">Complete seu cadastro para acessar o sistema</p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progresso do Onboarding</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Change Password */}
        {step === 'password' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Alterar Senha
              </CardTitle>
              <CardDescription>
                Por segurança, você deve alterar sua senha no primeiro acesso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha *</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha *</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Digite a senha novamente"
                  onKeyDown={(e) => e.key === 'Enter' && handlePasswordChange()}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handlePasswordChange} className="flex-1">
                  Continuar
                </Button>
                <Button variant="outline" onClick={logout}>
                  Sair
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Competencies Assessment */}
        {step === 'competencies' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Avaliação de Competências
              </CardTitle>
              <CardDescription>
                Selecione todas as competências que você possui. Seu nível de senioridade será calculado automaticamente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Competências Selecionadas</p>
                    <p className="text-xs text-muted-foreground">Quanto mais competências, maior seu nível</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{selectedCompetencies.length}</p>
                    <p className="text-xs text-muted-foreground">de {questionnaireItems.length}</p>
                  </div>
                </div>
                {selectedCompetencies.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-sm font-semibold text-foreground">Nível Estimado:</p>
                    <p className="text-lg font-bold text-primary">{calculateLevel(selectedCompetencies)}</p>
                  </div>
                )}
              </div>

              <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2">
                {questionnaireItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => toggleCompetency(item.competency)}
                  >
                    <Checkbox
                      checked={selectedCompetencies.includes(item.competency)}
                      onCheckedChange={() => toggleCompetency(item.competency)}
                      className="mt-0.5"
                    />
                    <div className="flex-1 cursor-pointer">
                      <p className="text-sm font-medium text-foreground">{item.competency}</p>
                      <p className="text-xs text-muted-foreground">{item.category} • {item.level} • Peso: {item.weight}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleComplete} className="flex-1 gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Concluir Cadastro
                </Button>
                <Button variant="outline" onClick={() => setStep('password')}>
                  Voltar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
