import { useState, useEffect } from 'react';
import { User, UserRole } from '@/contexts/AuthContext';
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
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';
import { Checkbox } from '@/components/ui/checkbox';

interface UserFormDialogProps {
  user?: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (user: Omit<User, 'id'> & { password: string }) => void;
  onUpdate?: (id: string, updates: Partial<User>) => void;
}

const ROLES: { value: UserRole; label: string }[] = [
  { value: 'admin', label: 'Administrador' },
  { value: 'coordenador', label: 'Coordenador' },
  { value: 'analista', label: 'Analista' },
];



export default function UserFormDialog({
  user,
  open,
  onOpenChange,
  onSave,
  onUpdate,
}: UserFormDialogProps) {
  const isEditing = !!user;
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('analista');
  const [avatar, setAvatar] = useState('👨‍💻');
  const [participatesInRanking, setParticipatesInRanking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setAvatar(user.avatar);
      setParticipatesInRanking(user.participatesInRanking ?? true);
      setIsAdmin(user.role === 'admin');
      setPassword(''); // Não mostra a senha ao editar
    } else {
      // Reset form
      setName('');
      setEmail('');
      setPassword('');
      setRole('analista');
      setAvatar('👨‍💻');
      setIsAdmin(false);
      setParticipatesInRanking(true);
    }
  }, [user, open]);

  // isAdmin agora é independente de role
  // Usuário pode ser admin E ter cargo (coordenador/analista)

  const handleSave = () => {
    // Validações
    if (!name.trim()) {
      toast.error('Nome é obrigatório');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      toast.error('Email válido é obrigatório');
      return;
    }
    if (!isEditing && !password.trim()) {
      toast.error('Senha é obrigatória para novos usuários');
      return;
    }
    if (!isEditing && password.length < 6) {
      toast.error('Senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (isEditing && onUpdate) {
      // Atualizar usuário existente
      const updates: Partial<User> = { name, email, role, avatar, isAdmin, participatesInRanking };
      onUpdate(user.id, updates);
      toast.success('Usuário atualizado com sucesso!');
    } else {
      // Criar novo usuário
      onSave({ name, email, password, role, avatar, isAdmin, participatesInRanking });
      toast.success('Usuário criado com sucesso!');
    }

    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" onKeyDown={handleKeyDown}>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Usuário' : 'Novo Usuário'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Atualize as informações do usuário do sistema.' 
              : 'Preencha os dados para criar um novo usuário.'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome Completo *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: João Silva"
              autoFocus
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="joao.silva@empresa.com"
            />
          </div>

          {!isEditing && (
            <div className="grid gap-2">
              <Label htmlFor="password">Senha *</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          )}

          <div className="flex items-center space-x-2 p-3 rounded-lg border border-border bg-muted/30">
            <Checkbox
              id="isAdmin"
              checked={isAdmin}
              onCheckedChange={(checked) => setIsAdmin(checked as boolean)}
            />
            <div className="flex-1">
              <Label
                htmlFor="isAdmin"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                É Administrador
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Concede permissões administrativas (gerenciamento de usuários e configurações) independente do cargo
              </p>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">Cargo/Função *</Label>
            <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
              <SelectTrigger id="role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROLES.filter(r => r.value !== 'admin').map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {role === 'coordenador' && '• Pode editar participantes e missões'}
              {role === 'analista' && '• Apenas visualização, sem permissões de edição'}
            </p>
          </div>

          <div className="flex items-center space-x-2 p-3 rounded-lg border border-border bg-muted/30">
            <Checkbox
              id="participatesInRanking"
              checked={participatesInRanking}
              onCheckedChange={(checked) => setParticipatesInRanking(checked as boolean)}
            />
            <div className="flex-1">
              <Label
                htmlFor="participatesInRanking"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Participa do Ranking de Gamificação
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Quando marcado, o usuário aparecerá nos rankings e poderá acumular pontos e badges
              </p>
            </div>
          </div>

          <ImageUpload
            currentImage={avatar}
            onImageChange={setAvatar}
            label="Foto de Perfil"
            size="sm"
          />
        </div>

        <DialogFooter>
          <div className="flex justify-between w-full items-center">
            <p className="text-xs text-muted-foreground">
              Atalho: Ctrl+S para salvar
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                {isEditing ? 'Atualizar' : 'Criar Usuário'}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
