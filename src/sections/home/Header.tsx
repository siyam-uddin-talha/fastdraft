"use client";

import React from "react";
import Link from "next/link";
import { History, Plus } from "lucide-react";

interface HeaderProps {
  showHistory: boolean;
  setShowHistory: (v: boolean) => void;
  savedContractsCount: number;
  resetFormToNew: () => void;
}

export function Header({
  showHistory,
  setShowHistory,
  savedContractsCount,
  resetFormToNew,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#faf8f4]/95 backdrop-blur-md border-b border-[#d5ded7] px-8 h-16 flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer"
      >
        <img
          id="mainLog"
          src="/logo.png"
          alt="FastDraft Logo"
          className="w-9 h-9 object-cover shadow-sm"
        />
        <div className="flex flex-col">
          <span className="font-outfit font-bold tracking-tight text-[#1e3020] text-lg leading-none">
            FastDraft
          </span>
          <span className="text-[9px] font-sans font-semibold text-[#526354] tracking-wide mt-1">
            Professional Agreement Workspace
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-lime-100/70 border border-lime-200 hover:bg-lime-100 text-lime-800 text-sm font-semibold transition-all duration-300 shadow-[0_4px_12px_rgba(77,124,15,0.02)] cursor-pointer"
          id="history-toggle-btn"
        >
          <History className="w-4 h-4 text-lime-700" />
          <span>My Contracts ({savedContractsCount})</span>
        </button>

        <button
          onClick={resetFormToNew}
          className="bg-lime-700 text-white hover:bg-lime-800 font-semibold hover:scale-[1.01] transition-all duration-300 rounded-2xl text-sm px-5 py-2 flex items-center gap-1.5 shadow-[0_4px_14px_rgba(77,124,15,0.15)] cursor-pointer"
          id="new-contract-btn"
        >
          <Plus className="w-4 h-4" />
          <span>Draft New</span>
        </button>
      </div>
    </header>
  );
}
