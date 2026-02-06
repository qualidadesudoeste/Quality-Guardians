import { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useUsers } from "@/contexts/UsersContext";
import { User2, Mail, Lock, Save, Shield, Edit2, Eye } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";



export default function Profile() {
  const { user, logout, updateCurrentUser } = useAuth();
  const { updateUser } = useUsers();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '👨‍💻');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!user) return null;

  const handleSave = () => {
    if (!name.trim()) {
      toast.error('Nome é obrigatório');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      toast.error('Email válido é obrigatório');
      return;
    }

    updateUser(user.id, { name, email, avatar });
    toast.success('Perfil atualizado com sucesso!');
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Preencha todos os campos de senha');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('A nova senha deve ter no mínimo 6 caracteres');
      return;
    }

    // Atualizar senha no UsersContext (persiste no localStorage)
    updateUser(user.id, { password: newPassword });
    toast.success('Senha alterada com sucesso! Faça login novamente.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
    // Fazer logout para forçar novo login com a nova senha
    setTimeout(() => {
      logout();
    }, 2000);
  };

  const getRoleInfo = () => {
    switch (user.role) {
      case 'admin':
        return {
          label: 'Administrador',
          icon: Shield,
          variant: 'destructive' as const,
          description: 'Acesso total ao sistema, incluindo gerenciamento de usuários e configurações'
        };
      case 'coordenador':
        return {
          label: 'Coordenador',
          icon: Edit2,
          variant: 'default' as const,
          description: 'Pode editar participantes, missões e visualizar todas as informações'
        };
      case 'analista':
        return {
          label: 'Analista',
          icon: Eye,
          variant: 'secondary' as const,
          description: 'Visualização de dashboards e métricas, sem permissões de edição'
        };
      default:
        return {
          label: user.role,
          icon: User2,
          variant: 'outline' as const,
          description: ''
        };
    }
  };

  const roleInfo = getRoleInfo();
  const RoleIcon = roleInfo.icon;

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Meu Perfil</h1>
          <p className="text-muted-foreground">Gerencie suas informações pessoais e preferências</p>
        </div>

        {/* Profile Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border bg-muted flex items-center justify-center">
                  {user.avatar?.startsWith('data:image') ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-6xl">{user.avatar || '👨‍💻'}</span>
                  )}
                </div>
                <div>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <CardDescription className="text-base mt-1">{user.email}</CardDescription>
                  <div className="mt-3">
                    <Badge variant={roleInfo.variant} className="gap-2">
                      <RoleIcon className="h-4 w-4" />
                      {roleInfo.label}
                    </Badge>
                  </div>
                </div>
              </div>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} className="gap-2">
                  <Edit2 className="h-4 w-4" />
                  Editar Perfil
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Permissões:</strong> {roleInfo.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Form */}
        {isEditing && (
          <Card>
            <CardHeader>
              <CardTitle>Editar Informações</CardTitle>
              <CardDescription>Atualize seus dados pessoais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@empresa.com"
                />
              </div>

              <ImageUpload
                currentImage={avatar}
                onImageChange={setAvatar}
                label="Foto de Perfil"
                size="md"
              />

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setName(user.name);
                    setEmail(user.email);
                    setAvatar(user.avatar);
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Alterar Senha
            </CardTitle>
            <CardDescription>Mantenha sua conta segura com uma senha forte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Digite sua senha atual"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Digite a senha novamente"
              />
            </div>

            <Button onClick={handleChangePassword} className="gap-2">
              <Lock className="h-4 w-4" />
              Alterar Senha
            </Button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
            <CardDescription>Ações irreversíveis relacionadas à sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={logout} className="gap-2">
              Sair da Conta
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
