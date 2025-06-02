// src/hooks/useRoutes.js
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export function useRoutes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      const { data, error } = await supabase.from('routes').select();
      if (error) {
        setError(error);
      } else {
        setRoutes(data);
      }
      setLoading(false);
    };

    fetchRoutes();
  }, []);

  return { routes, loading, error };
}
