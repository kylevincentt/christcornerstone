'use client';
import { useCallback, useEffect, useState } from 'react';

/**
 * Shared hook for admin pages: fetch a content type, save (upsert), delete.
 * All operations hit /api/admin/content which handles auth + revalidateTag.
 */
export function useAdminContent<T extends { id?: string; key?: string }>(type: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/content?type=${encodeURIComponent(type)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to load');
        setItems([]);
      } else {
        setItems((data.items || []) as T[]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Network error');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = useCallback(
    async (item: T, successMessage = 'Saved') => {
      setError(null);
      try {
        const res = await fetch('/api/admin/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, item }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Save failed');
          return false;
        }
        setSaved(successMessage);
        setTimeout(() => setSaved(null), 3000);
        await refresh();
        return true;
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Network error');
        return false;
      }
    },
    [type, refresh]
  );

  const remove = useCallback(
    async (id: string) => {
      setError(null);
      try {
        const res = await fetch('/api/admin/content', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, id }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Delete failed');
          return false;
        }
        setSaved('Deleted');
        setTimeout(() => setSaved(null), 3000);
        await refresh();
        return true;
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Network error');
        return false;
      }
    },
    [type, refresh]
  );

  return { items, loading, error, saved, refresh, save, remove };
}
