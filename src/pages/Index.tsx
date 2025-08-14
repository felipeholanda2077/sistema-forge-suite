/**
 * Página Principal da Aplicação - Demonstra Arquitetura de Microfrontends
 * Implementação do Teste Técnico para Software Engineer Mid (Fullstack)
 */

import React from 'react';
import { MicrofrontendProvider } from '@/contexts/MicrofrontendContext';
import { PageHeader } from '@/components/PageHeader';
import AuthMicrofrontend from '@/microfrontends/AuthMicrofrontend';
import PokemonMicrofrontend from '@/microfrontends/PokemonMicrofrontend';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card/card';
import { Badge } from '@/components/ui/Badge/badge';
import { 
  Layers,
  Shield, 
  Database, 
  Zap, 
  GitBranch, 
  Code2,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  return (
    <MicrofrontendProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <PageHeader />
        
        <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
          {/* Visão Geral da Arquitetura */}
          <Card className="shadow-strong animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-6 h-6" />
                🎮 POKÉDEX DIGITAL - VISÃO TÉCNICA
              </CardTitle>
              <CardDescription>
                Aplicação web moderna integrando a PokeAPI com cache inteligente e gerenciamento de estado avançado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg space-y-2 border border-primary/20 hover:scale-105 transition-bounce">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-semibold">🔒 Autenticação Segura</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sistema de login com JWT e gerenciamento de sessão
                  </p>
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Implemented
                  </Badge>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-primary" />
                    <span className="font-semibold">🌐 Integração PokeAPI</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Busca e exibição de dados de Pokémon da API oficial
                  </p>
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Implemented
                  </Badge>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="font-semibold">⚡ Cache Otimizado</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Cache gerenciado pelo backend para melhor desempenho
                  </p>
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Implemented
                  </Badge>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-primary" />
                    <span className="font-semibold">🔄 Favoritos</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sistema de favoritos persistente com MongoDB
                  </p>
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Implemented
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Layout dos Microfrontends */}
            <div className=" grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Microfrontend de Autenticação - Coluna Esquerda */}
            

            {/* Microfrontend da API Pokémon - Colunas Direitas */}
              <div className="lg:col-span-2">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Database className="w-6 h-6" />
                    🎮 Microfrontend da API Pokémon
                  </h2>
                  <p className="text-muted-foreground">
                    Integração com API externa PokeAPI com cache inteligente e capacidades de busca avançadas
                  </p>
                </div>
                <PokemonMicrofrontend />
              </div>
            </div>

          
        </main>
      </div>
    </MicrofrontendProvider>
  );
};

export default Index;
