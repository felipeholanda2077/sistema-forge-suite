/**
 * Main Application Page - Demonstrates Microfrontend Architecture
 * Technical Test Implementation for Software Engineer Mid (Fullstack)
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
          {/* Architecture Overview */}
          <Card className="shadow-strong">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-6 h-6" />
                Technical Implementation Overview
              </CardTitle>
              <CardDescription>
                Professional demonstration of microfrontend architecture with external API integration and advanced caching strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Authentication MF</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Isolated auth microfrontend with session management
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

          {/* Microfrontend Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Authentication Microfrontend - Left Column */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Authentication Microfrontend
                </h2>
                <p className="text-muted-foreground">
                  Isolated authentication system demonstrating microfrontend separation of concerns
                </p>
              </div>
              <AuthMicrofrontend />
            </div>

            {/* Pokemon API Microfrontend - Right Columns */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Database className="w-6 h-6" />
                  Pokemon API Microfrontend
                </h2>
                <p className="text-muted-foreground">
                  External API integration with PokeAPI featuring intelligent caching and search capabilities
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
