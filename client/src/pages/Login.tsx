import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, User, Lock, Shield } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simula delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = login(email, password);
    if (!success) {
      setError('Email ou senha inválidos');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-5 overflow-hidden">
      {/* Background com gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a1a] via-[#1a3a3a] to-[#0a1a1a]" />
      
      {/* Animação de fundo rotativa */}
      <div 
        className="absolute w-[200%] h-[200%] animate-[spin_20s_linear_infinite]"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(0, 255, 150, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(0, 200, 255, 0.1) 0%, transparent 50%)
          `
        }}
      />

      {/* Grid de fundo */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 150, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 150, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Container de Login */}
      <div className="relative z-10 w-full max-w-[450px] bg-[rgba(10,30,30,0.9)] backdrop-blur-xl rounded-3xl p-12 shadow-[0_0_40px_rgba(0,255,150,0.3),0_0_80px_rgba(0,200,255,0.2),inset_0_0_60px_rgba(0,255,150,0.05)] border-2 border-[rgba(0,255,150,0.3)] animate-[fadeIn_0.8s_ease-out]">
        
        {/* Logo Section */}
        <div className="text-center mb-10">
          {/* Ícone de Escudo Animado */}
          <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-[#00ff96] to-[#00c8ff] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,255,150,0.4)] animate-pulse">
            <Shield className="w-10 h-10 text-[#0a1a1a]" />
          </div>

          {/* Título com gradiente */}
          <h1 
            className="text-4xl font-bold mb-3 tracking-[2px]"
            style={{
              background: 'linear-gradient(135deg, #00ff96 0%, #00c8ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(0, 255, 150, 0.5)'
            }}
          >
            QUALITY GUARDIANS
          </h1>
          
          <p className="text-[#00c8ff] text-sm tracking-[3px] uppercase opacity-80">
            Sistema de Recompensas
          </p>
        </div>

        {/* Texto de Boas-vindas */}
        <p className="text-[#e0e0e0] text-center mb-8 text-base">
          Bem-vindo(a) de volta! Entre para acessar suas conquistas.
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#00ff96] text-sm font-medium tracking-wider">
              E-MAIL
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="seu.email@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 pr-12 py-4 bg-[rgba(0,30,30,0.6)] border-2 border-[rgba(0,255,150,0.3)] rounded-xl text-white text-base transition-all duration-300 focus:border-[#00ff96] focus:shadow-[0_0_20px_rgba(0,255,150,0.4)] focus:bg-[rgba(0,40,40,0.8)] placeholder:text-[rgba(255,255,255,0.3)]"
              />
              <User className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00c8ff] w-5 h-5" />
            </div>
          </div>

          {/* Campo de Senha */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#00ff96] text-sm font-medium tracking-wider">
              SENHA
            </Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 pr-12 py-4 bg-[rgba(0,30,30,0.6)] border-2 border-[rgba(0,255,150,0.3)] rounded-xl text-white text-base transition-all duration-300 focus:border-[#00ff96] focus:shadow-[0_0_20px_rgba(0,255,150,0.4)] focus:bg-[rgba(0,40,40,0.8)] placeholder:text-[rgba(255,255,255,0.3)]"
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00c8ff] w-5 h-5" />
            </div>
          </div>

          {/* Mensagem de Erro */}
          {error && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-500/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Botão de Login */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-[#00ff96] to-[#00c8ff] hover:from-[#00ff96] hover:to-[#00c8ff] text-[#0a1a1a] text-base font-bold rounded-xl uppercase tracking-[2px] shadow-[0_5px_20px_rgba(0,255,150,0.3)] hover:shadow-[0_8px_30px_rgba(0,255,150,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            {isLoading ? 'AUTENTICANDO...' : 'ENTRAR'}
          </Button>
        </form>
      </div>

      {/* Estilos de animação */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
