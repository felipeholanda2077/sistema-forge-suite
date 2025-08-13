/**
 * Microfrontend de Autenticação
 * Demonstra separação de responsabilidades e arquitetura de microfrontends
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card/card';
import { Button } from '@/components/ui/Button/button';
import { Input } from '@/components/ui/Input/input';
import { Label } from '@/components/ui/Label/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs/tabs';
import { Badge } from '@/components/ui/Badge/badge';
import { User, Mail, Lock, UserPlus, LogIn, Shield } from 'lucide-react';
import { useMicrofrontend } from '@/contexts/MicrofrontendContext';
import { useCustomToast } from '@/hooks/useCustomToast';

const AuthMicrofrontend: React.FC = () => {
  const { state, dispatch } = useMicrofrontend();
  const { showToast } = useCustomToast();
  const [isLoading, setIsLoading] = useState(false);

  // Função de login demo (em uma aplicação real, chamaria o Supabase)
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simula chamada da API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Criação de usuário demo
    const demoUser = {
      id: 'demo-user-1',
      email,
      name: email.split('@')[0],
      favoritePokemons: [],
    };
    
    dispatch({ type: 'SET_USER', payload: demoUser });
    
    showToast({
      title: '🎉 Bem-vindo de volta!',
      description: 'Login realizado com sucesso.'
    });
    
    setIsLoading(false);
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    // Simula chamada da API
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      favoritePokemons: [],
    };
    
    dispatch({ type: 'SET_USER', payload: newUser });
    
    showToast({
      title: '✅ Conta criada!',
      description: 'Bem-vindo ao Explorador Pokémon!'
    });
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    showToast({
      title: '👋 Até logo!',
      description: 'Volte sempre que quiser explorar mais Pokémon!'
    });
  };

  if (state.isAuthenticated && state.user) {
    return (
      <Card className="shadow-medium animate-fade-in">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4 shadow-glow animate-scale-in">
            <User className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-xl">✨ Olá, {state.user.name}!</CardTitle>
          <CardDescription>Você está conectado e pronto para explorar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <Mail className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">{state.user.email}</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <Shield className="w-5 h-5 text-green-600" />
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              ✅ Autenticado
            </Badge>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="w-full transition-bounce hover:shadow-soft hover:scale-105"
          >
            <LogIn className="w-4 h-4 mr-2 rotate-180" />
            Sair da Conta
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-medium animate-fade-in">
      <CardHeader className="text-center">
        <div className="mx-auto w-20 h-20 hero-gradient rounded-full flex items-center justify-center mb-4 shadow-glow animate-scale-in">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <CardTitle className="text-xl">🔐 Área de Login</CardTitle>
        <CardDescription className="text-base">
          Entre ou cadastre-se para salvar seus Pokémon favoritos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Entrar
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Cadastrar
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginForm onLogin={handleLogin} isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="register">
            <RegisterForm onRegister={handleRegister} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading }) => {
  const [email, setEmail] = useState('usuario@exemplo.com');
  const [password, setPassword] = useState('senha123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">📧 E-mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Digite seu e-mail"
            className="transition-smooth hover:border-primary focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">🔒 Senha</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Digite sua senha"
            className="transition-smooth hover:border-primary focus:border-primary"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full transition-bounce hover:shadow-glow hover:scale-105 h-12 text-base font-medium" 
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Entrando...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <LogIn className="w-5 h-5" />
              Fazer Login
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};

interface RegisterFormProps {
  onRegister: (email: string, password: string, name: string) => void;
  isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(email, password, name);
  };

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">👤 Nome Completo</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Digite seu nome"
            className="transition-smooth hover:border-primary focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">📧 E-mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Digite seu e-mail"
            className="transition-smooth hover:border-primary focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">🔒 Senha</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Crie uma senha segura"
            className="transition-smooth hover:border-primary focus:border-primary"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full transition-bounce hover:shadow-glow hover:scale-105 h-12 text-base font-medium" 
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Criando conta...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Criar Conta
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default AuthMicrofrontend;