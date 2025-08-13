import { Metadata } from 'next';
import { Button } from '@/components/ui/Button/button';

export const metadata: Metadata = {
  title: 'Dashboard | Sistema Arcane Forge',
  description: 'Seu painel de controle',
};

export default function DashboardPage() {
  // In a real app, you would check for authentication here
  // and redirect to /login if not authenticated
  
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download</Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="font-medium">Bem-vindo de volta!</h3>
          <p className="text-sm text-muted-foreground">Você está logado no sistema.</p>
        </div>
        {/* Add more dashboard cards here */}
      </div>
      
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Área de Trabalho</h3>
        <p className="text-muted-foreground">
          Seu conteúdo do dashboard será exibido aqui.
        </p>
      </div>
    </div>
  );
}
