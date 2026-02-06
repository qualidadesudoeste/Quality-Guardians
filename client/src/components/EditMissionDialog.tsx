import { useState } from 'react';
import { Mission } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface EditMissionDialogProps {
  mission: Mission;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, updates: Partial<Mission>) => void;
}

export default function EditMissionDialog({
  mission,
  open,
  onOpenChange,
  onSave,
}: EditMissionDialogProps) {
  const [name, setName] = useState(mission.name);
  const [description, setDescription] = useState(mission.description);
  const [reward, setReward] = useState(mission.reward.toString());
  const [target, setTarget] = useState(mission.target.toString());
  const [progress, setProgress] = useState(mission.progress.toString());

  const handleSave = () => {
    onSave(mission.id, {
      name,
      description,
      reward: parseInt(reward) || 0,
      target: parseInt(target) || 0,
      progress: parseInt(progress) || 0,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Missão Coletiva</DialogTitle>
          <DialogDescription>
            Atualize as informações e metas da missão coletiva.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome da Missão</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Muralha da Qualidade"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o objetivo da missão"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="reward">Recompensa (QP)</Label>
              <Input
                id="reward"
                type="number"
                min="0"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="progress">Progresso Atual</Label>
              <Input
                id="progress"
                type="number"
                min="0"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="target">Meta</Label>
              <Input
                id="target"
                type="number"
                min="1"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
            <p>
              <strong>Progresso:</strong> {progress} / {target} ({Math.round((parseInt(progress) / parseInt(target)) * 100)}%)
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
