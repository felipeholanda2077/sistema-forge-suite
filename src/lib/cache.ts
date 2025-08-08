/**
 * Professional cache implementation for external API data
 * Demonstrates cache strategies as required by the technical test
 */

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}

interface CacheConfig {
  defaultTTL: number; // Time to live in milliseconds
  maxSize: number;    // Maximum number of items in cache
}

class APICache {
  private cache = new Map<string, CacheItem<any>>();
  private config: CacheConfig;

  constructor(config: CacheConfig = { defaultTTL: 5 * 60 * 1000, maxSize: 100 }) {
    this.config = config;
  }

  /**
   * Get item from cache if not expired
   */
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    const now = Date.now();
    const isExpired = now - item.timestamp > item.expiresIn;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  /**
   * Set item in cache with optional TTL
   */
  set<T>(key: string, data: T, ttl?: number): void {
    // If cache is at max size, remove oldest item
    if (this.cache.size >= this.config.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiresIn: ttl || this.config.defaultTTL,
    };

    this.cache.set(key, item);
  }

  /**
   * Check if key exists and is not expired
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Remove item from cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Global cache instance for the application
export const apiCache = new APICache({
  defaultTTL: 5 * 60 * 1000, // 5 minutes for Pokemon data
  maxSize: 200, // Store up to 200 Pokemon/API responses
});

/**
 * Cache-aware fetch wrapper for external APIs
 */
export async function cachedFetch<T>(
  url: string,
  options?: RequestInit,
  cacheKey?: string,
  ttl?: number
): Promise<T> {
  const key = cacheKey || url;
  
  // Try to get from cache first
  const cached = apiCache.get<T>(key);
  if (cached) {
    console.log(`Cache HIT for: ${key}`);
    return cached;
  }

  console.log(`Cache MISS for: ${key} - Fetching from API`);
  
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Store in cache
    apiCache.set(key, data, ttl);
    
    return data;
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    throw error;
  }
}