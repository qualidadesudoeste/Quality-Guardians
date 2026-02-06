import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { allBadges } from "@/data/mockData";
import { useData } from "@/contexts/DataContext";
import { Award, Lock } from "lucide-react";

export default function Badges() {
  const { teamMembers } = useData();
  // Agrupar badges por categoria
  const badgesByCategory = allBadges.reduce((acc, badge) => {
    if (!acc[badge.category]) {
      acc[badge.category] = [];
    }
    acc[badge.category].push(badge);
    return acc;
  }, {} as Record<string, typeof allBadges>);

  // Contar badges conquistadas pela equipe
  const earnedBadges = new Set(
    teamMembers.flatMap(member => member.badges.map(b => b.id))
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'bronze': return 'bg-amber-700/20 text-amber-500 border-amber-500/50';
      case 'prata': return 'bg-gray-400/20 text-gray-300 border-gray-400/50';
      case 'ouro': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'único': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Conquistas</h1>
          <p className="text-muted-foreground">Sistema de badges do Quality Guardians</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Badges</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allBadges.length}</div>
              <p className="text-xs text-muted-foreground">Disponíveis no sistema</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Conquistadas</CardTitle>
              <Award className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{earnedBadges.size}</div>
              <p className="text-xs text-muted-foreground">Desbloqueadas pela equipe</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progresso</CardTitle>
              <Award className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((earnedBadges.size / allBadges.length) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">Completude do sistema</p>
            </CardContent>
          </Card>
        </div>

        {/* Badges por Categoria */}
        {Object.entries(badgesByCategory).map(([category, badges]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
              <CardDescription>
                {badges.filter(b => earnedBadges.has(b.id)).length} de {badges.length} conquistadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {badges.map((badge) => {
                  const isEarned = earnedBadges.has(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isEarned
                          ? 'bg-card border-primary/50 hover:border-primary'
                          : 'bg-muted/30 border-muted opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`text-4xl ${!isEarned && 'grayscale opacity-50'}`}>
                          {isEarned ? badge.icon : <Lock className="h-10 w-10 text-muted-foreground" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{badge.name}</h3>
                            {isEarned && <span className="text-green-500">✓</span>}
                          </div>
                          <Badge className={`mb-2 ${getLevelColor(badge.level)}`}>
                            {badge.level.toUpperCase()}
                          </Badge>
                          <p className="text-sm text-muted-foreground">{badge.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Top Collectors */}
        <Card>
          <CardHeader>
            <CardTitle>Maiores Colecionadores</CardTitle>
            <CardDescription>Membros com mais badges conquistadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...teamMembers]
                .sort((a, b) => b.badges.length - a.badges.length)
                .map((member, index) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="text-2xl font-bold w-8 text-center text-muted-foreground">
                      {index + 1}
                    </div>
                    <div className="text-3xl">{member.avatar}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.role}</div>
                    </div>
                    <div className="flex gap-1">
                      {member.badges.slice(0, 5).map((badge) => (
                        <div key={badge.id} className="text-2xl" title={badge.name}>
                          {badge.icon}
                        </div>
                      ))}
                      {member.badges.length > 5 && (
                        <div className="text-sm text-muted-foreground self-center">
                          +{member.badges.length - 5}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-foreground">{member.badges.length}</div>
                      <div className="text-xs text-muted-foreground">badges</div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
