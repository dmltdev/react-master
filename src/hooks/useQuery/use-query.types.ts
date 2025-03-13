export interface QueryCacheKey {
  data: unknown;
  timestamp: number;
}

export type QueryCacheMap = Map<string, QueryCacheKey>;
export type QueryCacheEntries = [string, QueryCacheKey][];
export type QueryResponseType = "json" | "text" | "blob" | "arrayBuffer";

export interface QueryCacheOptions {
  skipCache?: boolean;
  ttl: number;
  cacheKey?: string;
}

export interface UseQueryOptions {
  url: string | URL;
  cacheOptions?: QueryCacheOptions;
  fetchOptions?: RequestInit;
  responseType?: QueryResponseType;
}

export interface UseQueryResult<T = unknown> {
  data: T | null;
  loading: boolean;
  error: Error | string | null;
  refetch: () => Promise<unknown>;
  clearCache: () => boolean;
}

export type UseQueryBase = <T = unknown>(
  options: UseQueryOptions
) => UseQueryResult<T>;

export interface UseQueryFunction extends UseQueryBase {
  clearAllCache: () => void;
  getCacheSize: () => number;
  getCacheEntries: () => QueryCacheEntries;
}
