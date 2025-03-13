import { useState, useEffect, useCallback, useRef } from "react";
import {
  QueryCacheOptions,
  QueryCacheMap,
  UseQueryOptions,
  UseQueryFunction,
  UseQueryResult,
} from "./use-query.types";
import { getQueryResponseData, getQueryUrl } from "./use-query.utils";

const cache: QueryCacheMap = new Map();

const defaultCacheOptions: QueryCacheOptions = {
  skipCache: false,
  ttl: 5 * 60 * 1000,
};

const useQueryBase = <T = unknown>({
  url,
  cacheOptions = defaultCacheOptions,
  fetchOptions,
}: UseQueryOptions): UseQueryResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | string | null>(null);

  const optionsRef = useRef<QueryCacheOptions>(cacheOptions);
  optionsRef.current = cacheOptions;

  const getCacheKey = useCallback(() => {
    const { cacheKey } = optionsRef.current;
    return (
      cacheKey ||
      `${url}:${JSON.stringify(cacheOptions)}:${JSON.stringify(fetchOptions)}`
    );
  }, [url, fetchOptions, cacheOptions]);

  const fetchData = useCallback(
    async (forceFetch = false) => {
      const { skipCache, ttl } = optionsRef.current;
      const key = getCacheKey();

      if (!forceFetch && !skipCache && cache.has(key)) {
        const cachedData = cache.get(key)!;

        if (cachedData.timestamp + ttl > Date.now()) {
          setData(cachedData.data as T);
          setLoading(false);
          setError(null);
          return cachedData.data;
        }
      }

      setLoading(true);

      try {
        const queryUrl = getQueryUrl(url);
        const response = await fetch(queryUrl, fetchOptions);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await getQueryResponseData(response);

        if (!skipCache) {
          cache.set(key, {
            data: result,
            timestamp: Date.now(),
          });
        }

        setData(result);
        setLoading(false);
        return result;
      } catch (error) {
        setError(
          error instanceof Error ? error.message : JSON.stringify(error)
        );
        setLoading(false);
        throw error;
      }
    },
    [url, getCacheKey, fetchOptions]
  );

  const refetch = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  const clearCache = useCallback(() => {
    const key = getCacheKey();
    return cache.delete(key);
  }, [getCacheKey]);

  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  return { data, loading, error, refetch, clearCache };
};

const useQuery = useQueryBase as unknown as UseQueryFunction;

useQuery.clearAllCache = () => cache.clear();
useQuery.getCacheSize = () => cache.size;
useQuery.getCacheEntries = () => Array.from(cache.entries());

export { useQuery };
