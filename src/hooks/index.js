import { useState, useEffect, useCallback } from 'react';

/**
 * Generic data fetching hook with loading, error, and refetch.
 * Usage:
 *   const { data, loading, error, refetch } = useApi(() => programsAPI.getAll());
 */
export function useApi(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchFn();
      setData(res.data?.data ?? res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { execute(); }, [execute]);

  return { data, loading, error, refetch: execute };
}

/**
 * Paginated data fetching hook.
 * Usage:
 *   const { data, loading, page, setPage, total, pages } = usePaginated(
 *     (p) => programsAPI.getAll({ page: p, limit: 12 })
 *   );
 */
export function usePaginated(fetchFn, initialPage = 1, deps = []) {
  const [page, setPage] = useState(initialPage);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchFn(page)
      .then(res => {
        setData(res.data?.data || []);
        setTotal(res.data?.total || 0);
        setPages(res.data?.pages || 1);
      })
      .catch(err => setError(err.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, [page, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, page, setPage, total, pages };
}

/**
 * Form submission hook.
 * Usage:
 *   const { submit, loading, error, success } = useSubmit(contactAPI.submit);
 */
export function useSubmit(submitFn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState(null);

  const submit = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await submitFn(data);
      setResult(res.data);
      setSuccess(true);
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Submission failed';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, [submitFn]);

  const reset = () => { setError(null); setSuccess(false); setResult(null); };

  return { submit, loading, error, success, result, reset };
}

/**
 * Local storage hook for persisting state.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const set = (v) => {
    try {
      setValue(v);
      localStorage.setItem(key, JSON.stringify(v));
    } catch {}
  };

  return [value, set];
}

/**
 * Intersection observer hook for scroll animations.
 * Usage:
 *   const [ref, visible] = useInView();
 *   <div ref={ref} className={visible ? 'opacity-100' : 'opacity-0'}>...</div>
 */
export function useInView(options = {}) {
  const [ref, setRef] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return [setRef, visible];
}

/**
 * Debounce hook.
 * Usage:
 *   const debouncedSearch = useDebounce(search, 400);
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
