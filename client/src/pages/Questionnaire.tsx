import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useQuestionnaire, QuestionnaireItem } from "@/contexts/QuestionnaireContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, RotateCcw, FileQuestion } from "lucide-react";
import { toast } from "sonner";

const LEVELS = ['Jr 1', 'Jr 2', 'Jr 3', 'Pl 1', 'Pl 2', 'Pl 3', 'Sr 1', 'Sr 2', 'Sr 3', 'Especialista'];
const CATEGORIES = [
  'Teste Manual',
  'Teste de API',
  'Automação',
  'Performance',
  'Segurança',
  'Banco de Dados',
  'DevOps',
  'Cloud',
  'Metodologias',
  'Ferramentas',
  'Documentação',
  'Análise',
  'Planejamento',
  'Execução',
  'Controle de Versão',
  'Containers',
  'Programação',
  'Microserviços',
  'Teste Mobile',
  'Arquitetura',
  'Liderança',
  'Estratégia',
  'Mentoria',
  'Processos',
  'Métricas',
  'IA/ML',
  'Gestão',
  'Transformação',
  'Inovação',
  'Stakeholders',
  'ROI',
  'Visão Estratégica',
  'Thought Leadership',
  'Consultoria',
  'Pesquisa',
  'Comunidade',
];

export default function Questionnaire() {
  const { items, addItem, updateItem, deleteItem, resetToDefault } = useQuestionnaire();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<QuestionnaireItem | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Form state
  const [category, setCategory] = useState('');
  const [competency, setCompetency] = useState('');
  const [level, setLevel] = useState<string>('Jr 1');
  const [weight, setWeight] = useState('1');

  const handleOpenDialog = (item?: QuestionnaireItem) => {
    if (item) {
      setEditingItem(item);
      setCategory(item.category);
      setCompetency(item.competency);
      setLevel(item.level);
      setWeight(item.weight.toString());
    } else {
      setEditingItem(null);
      setCategory('');
      setCompetency('');
      setLevel('Jr 1');
      setWeight('1');
    }
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!category.trim() || !competency.trim()) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const weightNum = parseInt(weight);
    if (isNaN(weightNum) || weightNum < 1 || weightNum > 10) {
      toast.error('Peso deve ser um número entre 1 e 10');
      return;
    }

    if (editingItem) {
      updateItem(editingItem.id, {
        category,
        competency,
        level,
        weight: weightNum,
      });
      toast.success('Competência atualizada com sucesso!');
    } else {
      addItem({
        category,
        competency,
        level,
        weight: weightNum,
      });
      toast.success('Competência adicionada com sucesso!');
    }

    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta competência?')) {
      deleteItem(id);
      toast.success('Competência excluída com sucesso!');
    }
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja restaurar o questionário padrão? Todas as alterações serão perdidas.')) {
      resetToDefault();
      toast.success('Questionário restaurado para o padrão!');
    }
  };

  const filteredItems = items.filter(item => {
    if (filterLevel !== 'all' && item.level !== filterLevel) return false;
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    return true;
  });

  const uniqueCategories = Array.from(new Set(items.map(item => item.category))).sort();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Questionário de Avaliação</h1>
            <p className="text-muted-foreground">
              Configure as competências e pesos para avaliação de nível de senioridade
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Restaurar Padrão
            </Button>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Competência
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total de Competências</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{items.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Categorias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueCategories.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Níveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{LEVELS.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pontuação Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {items.reduce((sum, item) => sum + item.weight, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Filtre as competências por nível e categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nível</Label>
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os níveis</SelectItem>
                    {LEVELS.map(lvl => (
                      <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {uniqueCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Competências ({filteredItems.length})</CardTitle>
            <CardDescription>
              Lista de todas as competências cadastradas no questionário
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Competência</TableHead>
                    <TableHead>Nível</TableHead>
                    <TableHead className="text-right">Peso</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        <FileQuestion className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        Nenhuma competência encontrada
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredItems.map(item => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.category}</TableCell>
                        <TableCell>{item.competency}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {item.level}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{item.weight}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenDialog(item)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Editar Competência' : 'Nova Competência'}
              </DialogTitle>
              <DialogDescription>
                {editingItem
                  ? 'Atualize as informações da competência'
                  : 'Adicione uma nova competência ao questionário'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="competency">Competência *</Label>
                <Input
                  id="competency"
                  value={competency}
                  onChange={(e) => setCompetency(e.target.value)}
                  placeholder="Ex: Automação de Testes - Selenium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Nível *</Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger id="level">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LEVELS.map(lvl => (
                        <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (1-10) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    min="1"
                    max="10"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                O peso determina a importância da competência no cálculo do nível de senioridade.
                Competências mais avançadas devem ter pesos maiores.
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                {editingItem ? 'Atualizar' : 'Adicionar'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
