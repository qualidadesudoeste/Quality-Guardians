import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import EditMemberDialog from "@/components/EditMemberDialog";
import { TeamMember } from "@/data/mockData";
import { Users, TrendingUp, Award, History, Edit2 } from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Team() {
  const { teamMembers, updateTeamMember } = useData();
  const { canEdit } = useAuth();
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const handleSave = (id: string, updates: Partial<TeamMember>) => {
    updateTeamMember(id, updates);
  };
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Equipe Quality Guardians</h1>
          <p className="text-muted-foreground">Perfis e desempenho individual dos membros</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Membros</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamMembers.length}</div>
              <p className="text-xs text-muted-foreground">Analistas e coordenadores</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Média de Pontos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  teamMembers.reduce((sum, m) => sum + m.monthlyPoints, 0) / teamMembers.length
                ).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">QP por membro/mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Média de Badges</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(
                  teamMembers.reduce((sum, m) => sum + m.badges.length, 0) / teamMembers.length
                ).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">Conquistas por membro</p>
            </CardContent>
          </Card>
        </div>

        {/* Perfis dos Membros */}
        <div className="grid grid-cols-1 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border bg-muted flex items-center justify-center flex-shrink-0">
                    {member.avatar?.startsWith('data:image') ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-6xl">{member.avatar || '👨‍💻'}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <CardTitle className="text-2xl">{member.name}</CardTitle>
                      {canEdit && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingMember(member)}
                          className="gap-2"
                        >
                          <Edit2 className="h-4 w-4" />
                          Editar
                        </Button>
                      )}
                    </div>
                    <CardDescription className="text-base mb-3">
                      {member.role} • {member.level}
                    </CardDescription>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Total: </span>
                        <span className="font-bold text-foreground">
                          {member.totalPoints.toLocaleString()} QP
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Mês: </span>
                        <span className="font-bold text-foreground">
                          {member.monthlyPoints.toLocaleString()} QP
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Trimestre: </span>
                        <span className="font-bold text-foreground">
                          {member.quarterlyPoints.toLocaleString()} QP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Badges */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Conquistas ({member.badges.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {member.badges.map((badge) => (
                        <Badge
                          key={badge.id}
                          variant="secondary"
                          className="gap-1 text-sm"
                          title={badge.description}
                        >
                          <span>{badge.icon}</span>
                          <span>{badge.name}</span>
                          <span className="text-xs opacity-70">({badge.level})</span>
                        </Badge>
                      ))}
                      {member.badges.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          Nenhuma conquista ainda
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Histórico Recente */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <History className="h-4 w-4" />
                      Atividades Recentes
                    </h3>
                    <div className="space-y-2">
                      {member.pointsHistory.slice(0, 4).map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded bg-muted/50 text-sm"
                        >
                          <div className="flex-1">
                            <div className="text-foreground">{activity.action}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(activity.date).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                          <div className="font-bold text-green-500">
                            +{activity.points} QP
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Gráfico de Evolução */}
                {member.pointsHistory.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Evolução de Pontos
                    </h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={member.pointsHistory
                            .slice()
                            .reverse()
                            .map((h, i, arr) => ({
                              date: new Date(h.date).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                              }),
                              points: arr.slice(0, i + 1).reduce((sum, item) => sum + item.points, 0),
                            }))}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis
                            dataKey="date"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                          />
                          <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="points"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            dot={{ fill: 'hsl(var(--primary))' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Diálogo de Edição */}
      {editingMember && (
        <EditMemberDialog
          member={editingMember}
          open={!!editingMember}
          onOpenChange={(open) => !open && setEditingMember(null)}
          onSave={handleSave}
        />
      )}
    </DashboardLayout>
  );
}
