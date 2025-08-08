/**
 * Cabeçalho da Aplicação com Branding da Arquitetura de Microfrontends
 */

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Layers, 
  Zap, 
  Code, 
  Database,
  Cpu,
  Network
} from 'lucide-react';
import { useMicrofrontend } from '@/contexts/MicrofrontendContext';

const Header: React.FC = () => {
  const { state } = useMicrofrontend();

  return (
    <header className="w-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient shadow-strong">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Título Principal */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              🚀 Demonstração de Microfrontends
            </h1>
            <p className="text-white/90 text-lg">
              Sistema profissional fullstack com cache inteligente e arquitetura moderna
            </p>
          </div>

          {/* Indicadores de Arquitetura */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-smooth">
              <Layers className="w-3 h-3 mr-1" />
              Microfrontends
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-smooth">
              <Database className="w-3 h-3 mr-1" />
              Cache Inteligente
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-smooth">
              <Network className="w-3 h-3 mr-1" />
              API Externa
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-smooth">
              <Code className="w-3 h-3 mr-1" />
              TypeScript
            </Badge>
          </div>
        </div>

        {/* Especificações Técnicas */}
        <Card className="mt-6 bg-white/10 border-white/20 backdrop-blur-sm animate-fade-in">
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-white">
              <div className="text-center hover:scale-105 transition-bounce">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Layers className="w-5 h-5" />
                  <span className="font-semibold">Arquitetura</span>
                </div>
                <div className="text-sm opacity-90">2 Microfrontends Isolados</div>
              </div>

              <div className="text-center hover:scale-105 transition-bounce">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Database className="w-5 h-5" />
                  <span className="font-semibold">Status do Cache</span>
                </div>
                <div className="text-sm opacity-90">{state.cacheStats.size} Itens Armazenados</div>
              </div>

              <div className="text-center hover:scale-105 transition-bounce">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-5 h-5" />
                  <span className="font-semibold">Performance</span>
                </div>
                <div className="text-sm opacity-90">Carregamento Otimizado</div>
              </div>

              <div className="text-center hover:scale-105 transition-bounce">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Cpu className="w-5 h-5" />
                  <span className="font-semibold">Gerenciamento de Estado</span>
                </div>
                <div className="text-sm opacity-90">Contexto Compartilhado</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </header>
  );
};

export default Header;