import { useState } from 'react';
import { Button } from '../ui/Button/button';
import { Input } from '../ui/Input/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card/card';

type AuthMode = 'login' | 'register';

interface AuthFormProps {
  onSuccess?: () => void;
  initialMode?: AuthMode;
}

export function AuthForm({ onSuccess, initialMode = 'login' }: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isLogin = mode === 'login';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, just log the data
      console.log({
        mode,
        email,
        password,
        ...(mode === 'register' && { name })
      });
      
      onSuccess?.();
    } catch (err) {
      setError('Ocorreu um erro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          {isLogin ? 'Entrar na sua conta' : 'Criar uma conta'}
        </CardTitle>
        <CardDescription>
          {isLogin 
            ? 'Entre para acessar sua conta' 
            : 'Preencha os dados para criar sua conta'}
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nome
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              'Carregando...'
            ) : isLogin ? (
              'Entrar'
            ) : (
              'Criar conta'
            )}
          </Button>
          
          <div className="text-center text-sm">
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
            <button
              type="button"
              onClick={() => setMode(isLogin ? 'register' : 'login')}
              className="text-primary underline-offset-4 hover:underline"
              disabled={isLoading}
            >
              {isLogin ? 'Criar conta' : 'Fazer login'}
            </button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
