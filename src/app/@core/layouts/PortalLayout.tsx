"use client";

import React from "react";

interface PortalLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

export function PortalLayout({ children, header }: PortalLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f0f4ee] text-[#1e3020] font-sans antialiased pb-12">
      {header}
      <main className="max-w-md mx-auto px-4 mt-6 space-y-6">{children}</main>
    </div>
  );
}
