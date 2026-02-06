import { Trophy, Award, Gift, Target, Users, Moon, Sun, LogOut, Edit, Settings, User2, UsersRound, FileQuestion, ClipboardList } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { APP_TITLE } from "@/const";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, canEdit, isAdmin } = useAuth();

  const navItems = [
    { path: "/", icon: Trophy, label: "Ranking" },
    { path: "/badges", icon: Award, label: "Conquistas" },
    { path: "/rewards", icon: Gift, label: "Recompensas" },
    { path: "/missions", icon: Target, label: "Missões" },
    { path: "/team", icon: UsersRound, label: "Equipe" },
  ];

  const coordinatorNavItems = [
    { path: "/activities", icon: ClipboardList, label: "Registro de Atividades" },
  ];

  const adminNavItems = [
    { path: "/users", icon: Users, label: "Gerenciar Usuários" },
    { path: "/questionnaire", icon: FileQuestion, label: "Questionário" },
    { path: "/settings", icon: Settings, label: "Configurações" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🛡️</div>
            <div>
              <h1 className="font-bold text-lg text-card-foreground">{APP_TITLE}</h1>
              <p className="text-xs text-muted-foreground">Sistema de Gamificação</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}

          {/* Seção Coordenador */}
          {canEdit && (
            <>
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Gestão
              </div>
              {coordinatorNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start gap-3"
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </>
          )}

          {/* Seção Admin */}
          {isAdmin && (
            <>
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Administração
              </div>
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start gap-3"
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </>
          )}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          {/* Informações do Usuário */}
          {user && (
            <div className="p-3 rounded-lg bg-muted/50 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-border bg-muted flex items-center justify-center flex-shrink-0">
                  {user.avatar?.startsWith('data:image') ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">{user.avatar || '👨‍💻'}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
              <Badge
                variant={isAdmin ? "destructive" : canEdit ? "default" : "secondary"}
                className="w-full justify-center gap-1"
              >
                {canEdit && <Edit className="h-3 w-3" />}
                {user.role === 'admin' ? 'Administrador' : user.role === 'coordenador' ? 'Coordenador' : 'Analista'}
              </Badge>
            </div>
          )}

          <Link href="/profile">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
            >
              <User2 className="h-4 w-4" />
              Meu Perfil
            </Button>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="w-full gap-2"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="w-full gap-2 text-destructive hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
