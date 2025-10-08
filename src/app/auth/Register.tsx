import { useMemo } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRegisterSchema } from "../../shared/validation/registerSchemas";
import type { AccountType } from "../../shared/types/auth";

import AuthHeader from "./components/AuthHeader";
import AuthLayout from "./components/AuthLayout";
import AuthCard from "./components/AuthCard";
import DividerText from "./components/DividerText";
import OAuthButton from "./components/OAuthButton";
import SiteFooter from "./components/SiteFooter";

import Button from "../../shared/components/Button";
import BaseFields from "./components/forms/BaseFields";
import AgentExtras from "./components/forms/AgentExtras";
import OwnerExtras from "./components/forms/OwnerExtras";

import { registerUser } from "../../application/use-cases/registerUser";
import { registerAdapter } from "../../infrastructure/supabase/adapters/registerAdapter";

type Form = any;

export default function Register() {
  const [sp] = useSearchParams();
  const nav = useNavigate();

  const accountType = useMemo<AccountType | null>(() => {
    const t = sp.get("type");
    return t === "buyer" || t === "agent" || t === "owner" ? t : null;
  }, [sp]);

  const schema = useMemo(() => getRegisterSchema(accountType ?? "buyer"), [accountType]);

  const {
    register, handleSubmit, watch, setValue,
    formState: { errors, isSubmitting },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (f: Form) => {
    if (!accountType) {
      alert("Selecciona un tipo de cuenta.");
      return;
    }

    try {
      await registerUser(
        {
          accountType,
          first_name: f.first_name,
          last_name: f.last_name,
          email: f.email,
          password: f.password,
          phone: f.phone,
          belongs_to_org: accountType === "agent" ? !!f.belongs_to_org : undefined,
          org_code: accountType === "agent" ? (f.org_code || null) : null,
          org_name: accountType === "owner" ? f.org_name : null,
        },
        registerAdapter
      );

      alert(
        accountType === "owner"
          ? "Cuenta creada. Revisa tu correo y guarda tu código de organización en el dashboard."
          : "Cuenta creada. Revisa tu correo para confirmar."
      );
      nav("/auth/login");
    } catch (e: any) {
      alert(e?.message ?? "Ocurrió un error durante el registro.");
    }
  };

  return (
    <>
      <AuthHeader />
      <AuthLayout>
  <AuthCard size="lg">   {/* <- antes: <AuthCard> */}
    <h1 className="auth-title">Crear cuenta</h1>
    <p className="auth-subtitle">Completa tus datos para registrarte</p>

    {/* OAuth */}
    <div className="oauth oauth-row-2">
      <OAuthButton provider="google" />
      <OAuthButton provider="apple" />
    </div>
    <DividerText>o</DividerText>

    {/* GRID 2 COLS */}
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-grid">
        <BaseFields register={register} errors={errors} />
        {accountType === "agent" && (
          <AgentExtras register={register} watch={watch} setValue={setValue} errors={errors} />
        )}
        {accountType === "owner" && <OwnerExtras register={register} errors={errors} />}
      </div>

      <Button type="submit" disabled={isSubmitting} style={{ marginTop: 12 }}>
        Crear cuenta
      </Button>
    </form>

    <p style={{ textAlign:'center', marginTop: 14, color: 'var(--text-600)' }}>
      ¿Ya tienes cuenta? <Link to="/auth/login" style={{ color:'var(--brand-700)', fontWeight:600 }}>Inicia sesión aquí</Link>
    </p>
  </AuthCard>
</AuthLayout>
      <SiteFooter />
    </>
  );
}
