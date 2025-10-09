// src/app/auth/components/AuthLayout.tsx
import React from "react";
export default function AuthLayout({ children }: { children: React.ReactNode }){
  return <main className="container-auth">{children}</main>;
}
