/**
 * Página Principal da Aplicação - Demonstra Arquitetura de Microfrontends
 * Implementação do Teste Técnico para Software Engineer Mid (Fullstack)
 */

import React from 'react';
import { MicrofrontendProvider } from '@/contexts/MicrofrontendContext';
import Header from '@/components/Header';
import CacheMonitor from '@/components/CacheMonitor';
import AuthMicrofrontend from '@/microfrontends/AuthMicrofrontend';
import PokemonMicrofrontend from '@/microfrontends/PokemonMicrofrontend';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* Visão Geral da Arquitetura */}
          <Card className="shadow-strong animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-6 h-6" />
                🏗️ Visão Geral da Implementação Técnica
              </CardTitle>
              <CardDescription>
                Demonstração profissional de arquitetura de microfrontends com integração de API externa e estratégias avançadas de cache
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg space-y-2 border border-primary/20 hover:scale-105 transition-bounce">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-semibold">🔐 Microfrontend de Auth</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sistema isolado de autenticação com gerenciamento de sessão
                  </p>
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Implemented
                  </Badge>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Pokemon API MF</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    External API integration with PokeAPI and intelligent caching
                  </p>
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Implemented
                  </Badge>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Cache Strategy</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    TTL-based caching with size limits and performance monitoring
                  </p>
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Implemented
                  </Badge>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-primary" />
                    <span className="font-semibold">State Sharing</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Cross-microfrontend communication via shared context
                  </p>
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Implemented
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cache Performance Monitor */}
          <CacheMonitor />

            {/* Layout dos Microfrontends */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Microfrontend de Autenticação - Coluna Esquerda */}
              <div className="lg:col-span-1">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    🔐 Microfrontend de Autenticação
                  </h2>
                  <p className="text-muted-foreground">
                    Sistema isolado de autenticação demonstrando separação de responsabilidades dos microfrontends
                  </p>
                </div>
                <AuthMicrofrontend />
              </div>

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

          {/* Technical Notes */}
          <Card className="shadow-medium border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Technical Implementation Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-primary">Microfrontend Architecture</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Separated authentication and API integration concerns</li>
                    <li>• Shared state management via React Context</li>
                    <li>• Isolated component trees with clear boundaries</li>
                    <li>• Cross-microfrontend communication demonstrated</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-primary">Cache Implementation</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• TTL-based expiration (5-30 minutes per endpoint)</li>
                    <li>• LRU eviction with configurable size limits</li>
                    <li>• Cache-aware fetch wrapper for transparent usage</li>
                    <li>• Real-time performance monitoring</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-primary">External API Integration</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• PokeAPI integration with full TypeScript types</li>
                    <li>• Error handling and fallback strategies</li>
                    <li>• Search, random discovery, and favorites</li>
                    <li>• Optimized data fetching patterns</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-primary">Backend Integration Ready</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Supabase integration available for production auth</li>
                    <li>• JWT-ready authentication flow</li>
                    <li>• User management and profile storage</li>
                    <li>• Scalable database schema design</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </MicrofrontendProvider>
  );
};

export default Index;
