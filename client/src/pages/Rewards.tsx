import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { rewards } from "@/data/mockData";
import { useData } from "@/contexts/DataContext";
import { Gift, Coins, ShoppingCart, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function Rewards() {
  const { teamMembers } = useData();
  // Agrupar recompensas por tipo
  const rewardsByType = rewards.reduce((acc, reward) => {
    if (!acc[reward.type]) {
      acc[reward.type] = [];
    }
    acc[reward.type].push(reward);
    return acc;
  }, {} as Record<string, typeof rewards>);

  const handleRedeem = (rewardName: string, cost: number) => {
    toast.success(`Recompensa resgatada!`, {
      description: `Você trocou ${cost.toLocaleString()} QP por: ${rewardName}`,
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Itens': return '🎁';
      case 'Desenvolvimento': return '📚';
      case 'Flexibilidade': return '⏰';
      default: return '✨';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Itens': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Desenvolvimento': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Flexibilidade': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Loja de Recompensas</h1>
          <p className="text-muted-foreground">Troque seus Pontos de Qualidade por prêmios</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recompensas Disponíveis</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rewards.filter(r => r.available).length}</div>
              <p className="text-xs text-muted-foreground">Prontas para resgate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Custo Mínimo</CardTitle>
              <Coins className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.min(...rewards.map(r => r.cost)).toLocaleString()} QP
              </div>
              <p className="text-xs text-muted-foreground">Menor recompensa</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Custo Máximo</CardTitle>
              <Coins className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.max(...rewards.map(r => r.cost)).toLocaleString()} QP
              </div>
              <p className="text-xs text-muted-foreground">Maior recompensa</p>
            </CardContent>
          </Card>
        </div>

        {/* Recompensas por Tipo */}
        {Object.entries(rewardsByType).map(([type, items]) => (
          <Card key={type}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{getTypeIcon(type)}</span>
                    {type}
                  </CardTitle>
                  <CardDescription>{items.length} recompensas nesta categoria</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((reward) => (
                  <Card
                    key={reward.id}
                    className={`${
                      reward.available
                        ? 'border-primary/30 hover:border-primary/60'
                        : 'opacity-60 border-muted'
                    } transition-all`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg">{reward.name}</CardTitle>
                        {!reward.available && (
                          <Badge variant="secondary" className="text-xs">
                            Esgotado
                          </Badge>
                        )}
                      </div>
                      <Badge className={`w-fit ${getTypeColor(type)}`}>
                        {reward.type}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{reward.description}</p>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center gap-2">
                          <Coins className="h-5 w-5 text-yellow-500" />
                          <span className="text-2xl font-bold text-foreground">
                            {reward.cost.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">QP</span>
                        </div>
                        <Button
                          size="sm"
                          disabled={!reward.available}
                          onClick={() => handleRedeem(reward.name, reward.cost)}
                          className="gap-2"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Resgatar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Histórico de Resgates (Exemplo) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Resgates Recentes
            </CardTitle>
            <CardDescription>Últimas recompensas trocadas pela equipe</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { member: teamMembers[0], reward: 'Curso Online', cost: 7500, date: '2025-10-20' },
                { member: teamMembers[2], reward: 'Livro Técnico', cost: 3000, date: '2025-10-18' },
                { member: teamMembers[1], reward: 'Sexta-feira Curta', cost: 4000, date: '2025-10-15' },
              ].map((redemption, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                >
                  <div className="text-3xl">{redemption.member.avatar}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{redemption.member.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Resgatou: {redemption.reward}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-foreground">
                      {redemption.cost.toLocaleString()} QP
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(redemption.date).toLocaleDateString('pt-BR')}
                    </div>
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
