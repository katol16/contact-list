import { useState, useEffect } from 'react';
import { type Contact } from '../types';
import apiData from '../api';

type ErrorWithMessage = {
  message: string;
};

export const useContacts = () => {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiData();
      setData((prev) => [...prev, ...result]);
    } catch (err: unknown) {
      const typedErr = err as ErrorWithMessage;
      setError(typedErr.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return { data, loading, error, fetchContacts };
};
