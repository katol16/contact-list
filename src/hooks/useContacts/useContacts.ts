import { useState, useEffect } from 'react';
import { type Contact } from '../../types';
import apiData from '../../api';

export const useContacts = () => {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiData();
      setData((prev) => [...prev, ...result]);
    } catch (err: unknown) {
      setError((err as { message?: string })?.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return { data, loading, error, fetchContacts };
};
