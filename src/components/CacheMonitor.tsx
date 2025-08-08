/**
 * Cache Monitor Component
 * Shows real-time cache performance metrics
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Cache Performance Monitor
        </CardTitle>
        <CardDescription>
          Real-time cache statistics and optimization metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cache Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Cache Usage</span>
            <span>{cacheDetails.size} / {cacheDetails.maxSize} items</span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-xl font-bold text-primary">{state.cacheStats.size}</div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Database className="w-3 h-3" />
              Cached Items
            </div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-xl font-bold text-green-600">{state.cacheStats.hits}</div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Cache Hits
            </div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-xl font-bold text-orange-600">{state.cacheStats.misses}</div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <BarChart3 className="w-3 h-3" />
              API Calls
            </div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-xl font-bold text-blue-600">
              {state.cacheStats.hits + state.cacheStats.misses > 0 
                ? Math.round((state.cacheStats.hits / (state.cacheStats.hits + state.cacheStats.misses)) * 100)
                : 0}%
            </div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" />
              Hit Rate
            </div>
          </div>
        </div>

        {/* Cache Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={cacheDetails.size > 0 ? "default" : "secondary"}>
              {cacheDetails.size > 0 ? "Active" : "Empty"}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Cache Status
            </span>
          </div>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleClearCache}
            disabled={cacheDetails.size === 0}
            className="transition-smooth hover:shadow-soft"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cache
          </Button>
        </div>

        {/* Recent Cache Keys */}
        {cacheDetails.keys.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Recent Cache Keys:</div>
            <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
              {cacheDetails.keys.slice(0, 8).map((key, index) => (
                <Badge key={index} variant="outline" className="text-xs">
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