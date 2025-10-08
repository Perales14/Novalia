// src/app/auth/Login.tsx
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';                         // <-- new
import { supabase } from '../../infrastructure/supabase/client';

import AuthHeader from './components/AuthHeader';
import AuthLayout from './components/AuthLayout';
import AuthCard from './components/AuthCard';
import DividerText from './components/DividerText';
import OAuthButton from './components/OAuthButton';
import SiteFooter from './components/SiteFooter';
import AccountTypeModal from './components/AccountTypeModal'; // <-- new
import type { AccountType } from '../../shared/types/auth';       // <-- new

import Button from '../../shared/components/Button';
import TextField from '../../shared/components/fields/TextField';
import PasswordField from '../../shared/components/fields/PasswordField';
import { Mail } from 'lucide-react';

type Form = { email: string; password: string };

export default function Login() {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>();
  const nav = useNavigate();
  const [openModal, setOpenModal] = useState(false);       // <-- new

  const onSubmit = async ({ email, password }: Form) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { alert(error.message); return; }
    nav('/dashboard');
  };

  const goRegister = (t: AccountType | null) => {          // <-- new
    if (!t) return;
    nav(`/auth/register?type=${t}`);
  };

  return (
    <>
      <AuthHeader />
      <AuthLayout>
        <AuthCard>
          <h1 className="auth-title">Iniciar Sesión</h1>
          <p className="auth-subtitle">Bienvenido de vuelta a Novalia</p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Correo electrónico"
              type="email"
              placeholder="Ingresa tu correo electrónico"
              leftIcon={<Mail size={20} aria-hidden />}
              error={errors.email ? "Email requerido" : undefined}
              autoComplete="email"
              inputMode="email"
              {...register('email', { required: true })}
            />
            <PasswordField
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
              error={errors.password ? "Password requerido" : undefined}
              {...register('password', { required: true })}
            />
            <div className="auth-meta">
              <Link to="/auth/forgot-password" className="forgot">¿Olvidaste tu contraseña?</Link>
            </div>
            <Button type="submit" disabled={isSubmitting} style={{ marginTop: 8 }}>
              Iniciar Sesión
            </Button>
          </form>

          <DividerText>o continúa con</DividerText>
          <div className="oauth">
            <OAuthButton provider="google" onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })} />
            <OAuthButton provider="apple"  onClick={() => supabase.auth.signInWithOAuth({ provider: 'apple'  })} />
          </div>

          {/* En vez de navegar directo, abrimos el modal */}
          <p style={{ textAlign:'center', marginTop: 14, color: 'var(--text-600)' }}>
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              style={{ color:'var(--brand-700)', fontWeight:600, background:'none', border:0 }}
            >
              Regístrate aquí
            </button>
          </p>
        </AuthCard>
      </AuthLayout>
      <SiteFooter />

      {/* Modal */}
      <AccountTypeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onContinue={(t) => { setOpenModal(false); goRegister(t); }}
      />
    </>
  );
}
