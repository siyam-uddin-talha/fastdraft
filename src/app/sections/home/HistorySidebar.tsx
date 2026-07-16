"use client";

import React from "react";
import { motion } from "motion/react";
import { History, Trash2, ChevronRight } from "lucide-react";
import { SavedContract } from "@/lib/types";

interface HistorySidebarProps {
  showHistory: boolean;
  savedContracts: SavedContract[];
  loadSavedContractIntoForm: (contract: SavedContract) => void;
  handleDeleteContract: (id: string, e: React.MouseEvent) => void;
}

export function HistorySidebar({
  showHistory,
  savedContracts,
  loadSavedContractIntoForm,
  handleDeleteContract,
}: HistorySidebarProps) {
  if (!showHistory) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mb-8 p-6 bg-[#faf8f4] border border-[#d5ded7] rounded-3xl shadow-[0_8px_24px_rgba(30,48,32,0.02)] border-b-2 border-b-lime-700/25"
      id="saved-contracts-hub"
    >
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#d5ded7]/60">
        <div className="flex items-center gap-2 text-[#1e3020] font-outfit font-semibold text-sm">
          <History className="w-4 h-4 text-lime-700" />
          <span>Your Saved Agreements Hub</span>
        </div>
        <span className="text-xs text-[#526354] font-medium">
          Stored securely on your device
        </span>
      </div>

      {savedContracts.length === 0 ? (
        <div className="text-center py-8 text-[#526354] text-xs font-medium italic">
          No agreements drafted or saved yet. Fill out the steps below and sign to save.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedContracts.map((contract) => (
            <div
              key={contract.id}
              onClick={() => loadSavedContractIntoForm(contract)}
              className="group cursor-pointer p-4 bg-[#faf8f4] border border-[#d5ded7] rounded-2xl hover:bg-[#f0f4ee]/40 hover:border-lime-700 transition-all duration-300 flex flex-col justify-between shadow-[0_4px_12px_rgba(30,48,32,0.01)]"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-lime-100 text-lime-800 border border-lime-200/50 text-[9px] font-mono uppercase tracking-wider font-semibold">
                    {contract.category}
                  </span>
                  <button
                    onClick={(e) => handleDeleteContract(contract.id, e)}
                    className="p-1 rounded text-[#526354] hover:text-red-600 hover:bg-red-50/50 transition-all cursor-pointer"
                    title="Delete draft"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="font-outfit font-semibold text-xs text-[#1e3020] mt-2 group-hover:text-lime-800 transition-colors line-clamp-1">
                  {contract.title}
                </h4>
                <p className="text-[11px] text-[#526354] mt-1">
                  Proj:{" "}
                  <span className="font-medium">
                    {contract.projectName || "Unnamed Project"}
                  </span>
                </p>
                <p className="text-[10px] text-[#526354]/80 mt-0.5">
                  Contractor: {contract.contractorName || "N/A"} • Client: {contract.clientName || "N/A"}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-[#d5ded7]/60 flex items-center justify-between text-[10px] text-[#526354]">
                <span>
                  Rate:{" "}
                  <span className="font-semibold text-[#1e3020]">
                    {contract.rate || "N/A"}
                  </span>
                </span>
                <span className="flex items-center gap-1 text-lime-700 font-semibold group-hover:text-lime-800 transition-colors">
                  Load Contract <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
