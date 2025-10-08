// src/infrastructure/supabase/adapters/registerAdapter.ts
import { supabase } from "../../../infrastructure/supabase/client";
import type { RegisterPorts } from "../../../application/use-cases/registerUser";
import { env } from "../../../infrastructure/config/env";
import type { AccountType } from "../../../shared/types/auth";

export const registerAdapter = {
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    const userId = data.user?.id;
    if (!userId) throw new Error("No se obtuvo userId");
    return { userId };
  },

  async updateProfile(userId: string, data: { full_name: string; email: string; phone?: string | null; role: AccountType }) {
    // mapear role -> role_hint en profiles
    const role_hint = data.role; // "buyer" | "agent" | "owner"

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone ?? null,
        role_hint, // <-- existe en schema
      })
      .eq("id", userId);
    if (error) throw error;
  },

  async joinOrgByCode(orgCode: string) {
    const { data, error } = await supabase.rpc("join_org_by_code", { p_org_code: orgCode });
    if (error) throw error;
    // Tras la migración, la función retorna uuid:
    const org_id = data as string | null;
    if (!org_id) throw new Error("Código de organización inválido.");
    return { org_id };
  },

  async createOrganization(name: string, ownerUserId: string) {
    const { data, error } = await supabase
      .from("organizations")
      .insert({ name, owner_user_id: ownerUserId })
      .select("id, org_code")
      .single();
    if (error) throw error;
    return { org_id: data.id as string, org_code: data.org_code as string };
  },

  async linkUserOrgRole(userId: string, orgId: string, role: "owner" | "agent") {
    // roles.code en catálogo → role_id
    const roleCode = role === "owner" ? "org_admin" : "agent";
    const { data: roleRow, error: roleErr } = await supabase.from("roles").select("id").eq("code", roleCode).single();
    if (roleErr) throw roleErr;

    const { error } = await supabase
      .from("user_org_roles")
      .insert({ user_id: userId, org_id: orgId, role_id: roleRow!.id }); // <-- role_id (no 'role')
    if (error) throw error;
  },
};
