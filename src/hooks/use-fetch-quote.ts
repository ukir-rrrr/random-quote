import { translateEnToJa } from '@/lib/translate-en-to-ja';
import { useCallback, useEffect, useState } from 'react';

export type Quote = {
  id: string;
  content: string;
  contentJa: string | null;
  author: string;
};

type LovingUniverseQuote = {
  id: string;
  text: string;
  author: { name: string };
};

const MIN_LOADER_MS = 1000;

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export default function useFetchQuote(): {
  quote: Quote | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const startedAt = Date.now();
    try {
      const res = await fetch('https://api.loving-universe.com/random', {
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = (await res.json()) as LovingUniverseQuote;

      let contentJa: string | null = null;
      try {
        contentJa = await translateEnToJa(data.text);
      } catch (translationError) {
        console.warn('translation failed:', translationError);
      }

      setQuote({
        id: data.id,
        content: data.text,
        contentJa,
        author: data.author.name,
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : '取得に失敗しました';
      setError(message);
      console.error('fetchQuote failed:', e);
    } finally {
      const remaining = MIN_LOADER_MS - (Date.now() - startedAt);
      if (remaining > 0) {
        await delay(remaining);
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { quote, loading, error, refetch };
}
