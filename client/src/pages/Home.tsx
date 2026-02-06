import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { Trophy, TrendingUp, Award } from "lucide-react";

export default function Home() {
  const { teamMembers } = useData();
  
  // Filtrar apenas membros que participam do ranking
  const rankingParticipants = teamMembers.filter(member => {
    // Buscar o usuário correspondente para verificar participatesInRanking
    // Como teamMembers já é derivado de users, podemos assumir que o campo existe
    return (member as any).participatesInRanking !== false;
  });
  
  // Ordenar membros por pontos mensais
  const monthlyRanking = [...rankingParticipants].sort((a, b) => b.monthlyPoints - a.monthlyPoints);
  const quarterlyRanking = [...rankingParticipants].sort((a, b) => b.quarterlyPoints - a.quarterlyPoints);

  const getRankColor = (index: number) => {
    if (index === 0) return "text-yellow-500";
    if (index === 1) return "text-gray-400";
    if (index === 2) return "text-amber-600";
    return "text-muted-foreground";
  };

  const getRankMedal = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `${index + 1}º`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Ranking dos Guardiões</h1>
          <p className="text-muted-foreground">Acompanhe o desempenho da equipe de qualidade</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Pontos</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {rankingParticipants.reduce((sum, member) => sum + member.totalPoints, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Acumulado pela equipe</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pontos do Mês</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teamMembers.reduce((sum, member) => sum + member.monthlyPoints, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Outubro 2025</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conquistas Desbloqueadas</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teamMembers.reduce((sum, member) => sum + member.badges.length, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Total de badges</p>
            </CardContent>
          </Card>
        </div>

        {/* Rankings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Ranking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Ranking Mensal
              </CardTitle>
              <CardDescription>Outubro 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyRanking.map((member, index) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className={`text-2xl font-bold w-12 text-center ${getRankColor(index)}`}>
                      {getRankMedal(index)}
                    </div>
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-border bg-muted flex items-center justify-center flex-shrink-0">
                      {member.avatar?.startsWith('data:image') ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl">{member.avatar || '👨‍💻'}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.role} • {member.level}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-foreground">{member.monthlyPoints.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">QP</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quarterly Ranking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-purple-500" />
                Ranking Trimestral
              </CardTitle>
              <CardDescription>Q4 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quarterlyRanking.map((member, index) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className={`text-2xl font-bold w-12 text-center ${getRankColor(index)}`}>
                      {getRankMedal(index)}
                    </div>
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-border bg-muted flex items-center justify-center flex-shrink-0">
                      {member.avatar?.startsWith('data:image') ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl">{member.avatar || '👨‍💻'}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.role} • {member.level}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-foreground">{member.quarterlyPoints.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">QP</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Guardião do Mês */}
        <Card className="border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Guardião do Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="text-6xl">{monthlyRanking[0].avatar}</div>
              <div>
                <h3 className="text-3xl font-bold text-foreground">{monthlyRanking[0].name}</h3>
                <p className="text-muted-foreground mb-2">{monthlyRanking[0].role} • {monthlyRanking[0].level}</p>
                <div className="flex gap-2 flex-wrap">
                  {monthlyRanking[0].badges.slice(0, 3).map((badge) => (
                    <Badge key={badge.id} variant="secondary" className="gap-1">
                      <span>{badge.icon}</span>
                      <span>{badge.name}</span>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="ml-auto text-right">
                <div className="text-5xl font-bold text-yellow-500">{monthlyRanking[0].monthlyPoints.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Pontos de Qualidade</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
