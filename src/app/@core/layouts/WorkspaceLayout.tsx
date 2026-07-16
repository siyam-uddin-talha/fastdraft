"use client";

import { Footer } from "@/sections/home/Footer";
import React from "react";

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  sidebar: React.ReactNode;
}

export function WorkspaceLayout({
  children,
  header,
  sidebar,
}: WorkspaceLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f0f4ee] text-[#1e3020] font-sans selection:bg-lime-100 selection:text-[#1e3020] antialiased">
      {header}
      <main className="max-w-7xl mx-auto px-6 py-8 relative">
        {sidebar}
        {children}
      </main>
      <Footer />
    </div>
  );
}
