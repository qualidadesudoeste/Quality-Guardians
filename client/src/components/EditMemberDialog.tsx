import { useState } from 'react';
import { TeamMember } from '@/data/mockData';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ImageUpload from './ImageUpload';

interface EditMemberDialogProps {
  member: TeamMember;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, updates: Partial<TeamMember>) => void;
}

const ROLES = ['Analista de Qualidade', 'Coordenadora de Qualidade'];
const LEVELS = ['Jr 1', 'Jr 2', 'Jr 3', 'Pl 1', 'Pl 2', 'Pl 3', 'Sr 1', 'Sr 2', 'Sr 3', 'Especialista'];


export default function EditMemberDialog({
  member,
  open,
  onOpenChange,
  onSave,
}: EditMemberDialogProps) {
  const [name, setName] = useState(member.name);
  const [role, setRole] = useState(member.role);
  const [level, setLevel] = useState(member.level);
  const [avatar, setAvatar] = useState(member.avatar);

  const handleSave = () => {
    onSave(member.id, { name, role, level, avatar });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Membro da Equipe</DialogTitle>
          <DialogDescription>
            Atualize as informações do membro da equipe Quality Guardians.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome completo"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">Cargo</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="level">Nível</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="level">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LEVELS.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ImageUpload
            currentImage={avatar}
            onImageChange={setAvatar}
            label="Foto de Perfil"
            size="sm"
          />
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
