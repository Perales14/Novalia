import { supabase } from "../../../infrastructure/supabase/client";
import type { RegisterPorts } from "../../../application/use-cases/registerUser";
import { env } from "../../../infrastructure/config/env";

export const registerAdapter: RegisterPorts = {
  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: env.VITE_OAUTH_REDIRECT_URL },
    });
    if (error) throw error;
    const uid = data.user?.id;
    if (!uid) throw new Error("No se obtuvo el ID del usuario tras signUp.");
    return { userId: uid };
  },

  async updateProfile(userId, data) {
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: data.full_name,
        email: data.email,
        metadata: { phone: data.phone ?? null },
        role: data.role,
      })
      .eq("id", userId);
    if (error) throw error;
  },

  async joinOrgByCode(orgCode: string) {
    const { data, error } = await supabase.rpc("join_org_by_code", { p_org_code: orgCode });
    if (error) throw error;
    const org_id = (data as any)?.org_id ?? (Array.isArray(data) ? data[0]?.org_id : undefined);
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

  async linkUserOrgRole(userId, orgId, role) {
    const { error } = await supabase
      .from("user_org_roles")
      .insert({ user_id: userId, org_id: orgId, role });
    if (error) throw error;
  },
};
