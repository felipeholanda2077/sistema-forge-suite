/**
 * Componente Monitor de Cache
 * Mostra métricas de performance do cache em tempo real
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card/card';
import { Badge } from '@/components/ui/Badge/badge';
import { Button } from '@/components/ui/Button/button';
import { Progress } from '@/components/ui/Progress/progress';
import { 
  Database, 
  Trash2, 
  TrendingUp, 
  Clock, 
  BarChart3 
} from 'lucide-react';
import { apiCache } from '@/lib/cache';
import { useMicrofrontend } from '@/contexts/MicrofrontendContext';

const CacheMonitor: React.FC = () => {
  const { state, dispatch } = useMicrofrontend();
  const [cacheDetails, setCacheDetails] = useState<{
    size: number;
    maxSize: number;
    keys: string[];
  }>({ size: 0, maxSize: 200, keys: [] });

  useEffect(() => {
    const updateStats = () => {
      const stats = apiCache.getStats();
      setCacheDetails(stats);
      
      // Update global cache stats
      dispatch({
        type: 'UPDATE_CACHE_STATS',
        payload: {
          hits: state.cacheStats.hits,
          misses: state.cacheStats.misses,
          size: stats.size,
        },
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 2000);
    return () => clearInterval(interval);
  }, [dispatch, state.cacheStats.hits, state.cacheStats.misses]);

  const handleClearCache = () => {
    apiCache.clear();
    setCacheDetails({ size: 0, maxSize: 200, keys: [] });
    dispatch({
      type: 'UPDATE_CACHE_STATS',
      payload: { hits: 0, misses: 0, size: 0 },
    });
  };

  const usagePercentage = (cacheDetails.size / cacheDetails.maxSize) * 100;

  return (
    <Card className="shadow-soft animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          🚀 Monitor de Performance do Cache
        </CardTitle>
        <CardDescription>
          Estatísticas em tempo real e métricas de otimização do cache
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cache Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>💾 Uso do Cache</span>
            <span>{cacheDetails.size} / {cacheDetails.maxSize} itens</span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
        </div>

        {/* Métricas de Performance */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 transition-smooth hover:scale-105">
            <div className="text-xl font-bold text-primary">{state.cacheStats.size}</div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Database className="w-3 h-3" />
              Itens no Cache
            </div>
          </div>
          
          <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 transition-smooth hover:scale-105">
            <div className="text-xl font-bold text-green-600">{state.cacheStats.hits}</div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Cache Hits
            </div>
          </div>
          
          <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 transition-smooth hover:scale-105">
            <div className="text-xl font-bold text-orange-600">{state.cacheStats.misses}</div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <BarChart3 className="w-3 h-3" />
              Chamadas API
            </div>
          </div>
          
          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 transition-smooth hover:scale-105">
            <div className="text-xl font-bold text-blue-600">
              {state.cacheStats.hits + state.cacheStats.misses > 0 
                ? Math.round((state.cacheStats.hits / (state.cacheStats.hits + state.cacheStats.misses)) * 100)
                : 0}%
            </div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" />
              Taxa de Acerto
            </div>
          </div>
        </div>

        {/* Status do Cache */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={cacheDetails.size > 0 ? "default" : "secondary"} className="animate-pulse">
              {cacheDetails.size > 0 ? "🟢 Ativo" : "⚪ Vazio"}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Status do Cache
            </span>
          </div>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleClearCache}
            disabled={cacheDetails.size === 0}
            className="transition-bounce hover:shadow-soft hover:scale-105"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            🗑️ Limpar Cache
          </Button>
        </div>

        {/* Chaves Recentes do Cache */}
        {cacheDetails.keys.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">🔑 Chaves Recentes do Cache:</div>
            <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
              {cacheDetails.keys.slice(0, 8).map((key, index) => (
                <Badge key={index} variant="outline" className="text-xs transition-bounce hover:scale-105">
                  {key.length > 20 ? `${key.substring(0, 20)}...` : key}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CacheMonitor;