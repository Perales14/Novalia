import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../infrastructure/supabase/client';

export default function OAuthCallback() {
  const nav = useNavigate();
  useEffect(() => {
    // Supabase manejará detectSessionInUrl; sólo validamos sesión y redirigimos
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav('/dashboard');
      else nav('/auth/login');
    });
  }, [nav]);
  return <p style={{ margin: '4rem', textAlign: 'center' }}>Procesando autenticación…</p>;
}
