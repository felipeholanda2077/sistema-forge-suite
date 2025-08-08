/**
 * Authentication Microfrontend
 * Demonstrates separated concerns and microfrontend architecture
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Lock, UserPlus, LogIn, Shield } from 'lucide-react';
import { useMicrofrontend } from '@/contexts/MicrofrontendContext';
import { useToast } from '@/hooks/use-toast';

const AuthMicrofrontend: React.FC = () => {
  const { state, dispatch } = useMicrofrontend();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Demo login function (in real app, this would call Supabase)
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo user creation
    const demoUser = {
      id: 'demo-user-1',
      email,
      name: email.split('@')[0],
      favoritePokemons: [],
    };
    
    dispatch({ type: 'SET_USER', payload: demoUser });
    
    toast({
      title: 'Welcome back!',
      description: 'You have successfully logged in.',
    });
    
    setIsLoading(false);
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      favoritePokemons: [],
    };
    
    dispatch({ type: 'SET_USER', payload: newUser });
    
    toast({
      title: 'Account created!',
      description: 'Welcome to the Pokemon Explorer!',
    });
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    toast({
      title: 'Logged out',
      description: 'See you next time!',
    });
  };

  if (state.isAuthenticated && state.user) {
    return (
      <Card className="shadow-medium">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>Logged in as {state.user.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{state.user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-muted-foreground" />
            <Badge variant="secondary">Authenticated</Badge>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="w-full transition-smooth hover:shadow-soft"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-medium">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 hero-gradient rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <CardTitle>Authentication Demo</CardTitle>
        <CardDescription>
          Login or register to save favorite Pokemon
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
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
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          className="transition-smooth"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          className="transition-smooth"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full transition-bounce hover:shadow-glow" 
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Logging in...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <LogIn className="w-4 h-4" />
            Login
          </div>
        )}
      </Button>
    </form>
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
          className="transition-smooth"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          className="transition-smooth"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          className="transition-smooth"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full transition-bounce hover:shadow-glow" 
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Creating account...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Register
          </div>
        )}
      </Button>
    </form>
  );
};

export default AuthMicrofrontend;