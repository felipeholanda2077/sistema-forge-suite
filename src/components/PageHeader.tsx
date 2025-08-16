import { useState } from 'react';
import { Button } from '@/components/ui/Button/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, Loader2, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

export function PageHeader() {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      
      toast({
        title: 'Logout realizado',
        description: 'Você saiu da sua conta com sucesso.',
        variant: 'default',
      });
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
      
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Erro ao sair',
        description: 'Ocorreu um erro ao tentar sair da sua conta. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-bold">Sistema Arcane Forge</span>
        </div>
        <div className="flex items-center space-x-2">
          <Link 
            to="/profile" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground"
          >
            <User className="w-4 h-4 mr-2" />
            Perfil
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {isLoggingOut ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4 mr-2" />
            )}
            {isLoggingOut ? 'Saindo...' : 'Sair'}
          </Button>
        </div>
      </div>
    </header>
  );
}
