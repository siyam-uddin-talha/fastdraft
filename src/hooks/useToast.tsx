"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, action?: ToastAction) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type: ToastType; action?: ToastAction } | null>(null);

  const showToast = (message: string, type: ToastType = "info", action?: ToastAction) => {
    setToast({ message, type, action });
  };

  useEffect(() => {
    if (toast) {
      // Keep toasts with action buttons open longer (7 seconds) so users can click them
      const duration = toast.action ? 7000 : 4000;
      const timer = setTimeout(() => setToast(null), duration);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50"
          >
            <div
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl border shadow-xl backdrop-blur-md ${
                toast.type === "error"
                  ? "bg-red-50/95 border-red-200 text-red-800"
                  : toast.type === "success"
                    ? "bg-emerald-50/95 border-emerald-200 text-emerald-800"
                    : toast.type === "warning"
                      ? "bg-amber-50/95 border-amber-200 text-amber-900"
                      : "bg-lime-50/95 border-lime-200 text-lime-800"
              }`}
            >
              <AlertCircle className="w-4.5 h-4.5 shrink-0" />
              <span className="text-xs font-semibold tracking-wide">
                {toast.message}
              </span>
              {toast.action && (
                <button
                  onClick={() => {
                    toast.action?.onClick();
                    setToast(null);
                  }}
                  className={`ml-3 px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
                    toast.type === "warning"
                      ? "bg-amber-600 hover:bg-amber-700 text-white shadow-sm border border-amber-500"
                      : "bg-lime-700 hover:bg-lime-800 text-white"
                  }`}
                >
                  {toast.action.label}
                </button>
              )}
              <button
                onClick={() => setToast(null)}
                className="ml-3 p-1 hover:bg-slate-200/20 rounded-lg text-xs leading-none cursor-pointer font-sans opacity-70 hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
