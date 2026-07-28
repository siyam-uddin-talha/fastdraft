"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  BookOpen,
  User,
  Calendar,
  DollarSign,
  Layers,
  FileText,
  Check,
} from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useToast } from "@/hooks/useToast";
import { CONTRACT_TEMPLATES, ContractTemplate } from "@/lib/templates";
import { SavedContract } from "@/lib/types";
import { saveContract, getContracts, deleteContract } from "@/lib/storage";
import { generatePDF } from "@/lib/pdfGenerator";
import QRCode from "qrcode";

import { Header } from "./Header";
import { HistorySidebar } from "./HistorySidebar";
import { TemplateBrowser } from "./TemplateBrowser";
import { ContractForm } from "./ContractForm";
import { ContractPreview } from "./ContractPreview";
import { WorkspaceLayout } from "@/app/@core/layouts/WorkspaceLayout";

const STEPS = [
  { id: 1, name: "Choose Template", icon: BookOpen },
  { id: 2, name: "The Parties", icon: User },
  { id: 3, name: "Scope & Dates", icon: Calendar },
  { id: 4, name: "Rate & Terms", icon: DollarSign },
  { id: 5, name: "Legal Clauses", icon: Layers },
  { id: 6, name: "Review & Sign", icon: FileText },
];

export interface MicroContractWorkspaceProps {
  initialTemplateId?: string;
  initialCategory?: string;
  h1Title?: string;
  heroDescription?: string;
}

export default function MicroContractWorkspace({
  initialTemplateId,
  initialCategory,
  h1Title,
  heroDescription,
}: MicroContractWorkspaceProps = {}) {
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const scrollTabs = (direction: "left" | "right") => {
    if (tabsContainerRef.current) {
      const scrollAmount = 200;
      tabsContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    id: "",
    title: "",
    category: "",
    contractorName: "",
    contractorCompany: "",
    contractorEmail: "",
    contractorAddress: "",
    clientName: "",
    clientCompany: "",
    clientEmail: "",
    clientAddress: "",
    projectName: "",
    scope: "",
    startDate: "",
    endDate: "",
    rate: "",
    schedule: "",
    ownership: "",
    clauses: [] as { title: string; text: string }[],
    contractorSignature: "",
    contractorSignatureImage: "",
    clientSignature: "",
    clientSignatureImage: "",
    signDate: new Date().toISOString().split("T")[0],
    pdfLayout: "legal" as "classic" | "modern" | "executive" | "legal",
    pdfFont: "times" as "times" | "helvetica" | "courier",
  });

  // Saved Contracts State
  const [savedContracts, setSavedContracts] = useState<SavedContract[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const { showToast } = useToast();

  // Template Browsing State
  const [searchTerm, setSearchTerm] = useState("");
  const [useRegex, setUseRegex] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const loadSavedContracts = useCallback(async () => {
    try {
      const data = await getContracts();
      setSavedContracts(
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } catch (e) {
      console.error("Failed to load saved contracts", e);
    }
  }, []);

  // Load saved contracts on mount
  useEffect(() => {
    let active = true;
    const fetchContracts = async () => {
      try {
        const data = await getContracts();
        if (active) {
          setSavedContracts(
            data.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          );
        }
      } catch (e) {
        console.error("Failed to load saved contracts on mount", e);
      }
    };
    fetchContracts();
    return () => {
      active = false;
    };
  }, []);

  // Preselect category & template if initial props provided
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
    if (initialTemplateId) {
      const tpl = CONTRACT_TEMPLATES.find((t) => t.id === initialTemplateId);
      if (tpl) {
        setForm((prev) => ({
          ...prev,
          id: `contract-${Date.now()}`,
          title: tpl.title,
          category: tpl.category,
          scope: tpl.scope,
          rate: tpl.rate,
          schedule: tpl.schedule,
          ownership: tpl.ownership,
          clauses: tpl.clauses.map((clauseText, i) => {
            const parts = clauseText.split(":");
            const title = parts.length > 1 ? parts[0].trim() : `Clause ${i + 1}`;
            const text = parts.slice(1).join(":").trim() || clauseText;
            return { title, text };
          }),
        }));
      }
    }
  }, [initialTemplateId, initialCategory]);

  // Get unique categories from template list
  const categories = useMemo(() => {
    const cats = new Set(CONTRACT_TEMPLATES.map((t) => t.category));
    return ["All", ...Array.from(cats)];
  }, []);

  // Check if current search term is an invalid regex
  const isRegexInvalid = useMemo(() => {
    if (!useRegex || !searchTerm) return false;
    try {
      new RegExp(searchTerm);
      return false;
    } catch (e) {
      return true;
    }
  }, [searchTerm, useRegex]);

  // Filter templates based on category search, standard text search, or regex search
  const filteredTemplates = useMemo(() => {
    return CONTRACT_TEMPLATES.filter((tpl) => {
      // Category Filter
      if (selectedCategory !== "All" && tpl.category !== selectedCategory) {
        return false;
      }

      if (!searchTerm) return true;

      if (useRegex) {
        try {
          const regex = new RegExp(searchTerm, "i");
          return (
            regex.test(tpl.title) ||
            regex.test(tpl.category) ||
            regex.test(tpl.scope)
          );
        } catch (e) {
          // If regex is invalid, return false during error state
          return false;
        }
      } else {
        const lowerSearch = searchTerm.toLowerCase();
        return (
          tpl.title.toLowerCase().includes(lowerSearch) ||
          tpl.category.toLowerCase().includes(lowerSearch) ||
          tpl.scope.toLowerCase().includes(lowerSearch)
        );
      }
    });
  }, [searchTerm, useRegex, selectedCategory]);

  const selectTemplate = (template: ContractTemplate) => {
    setForm((prev) => ({
      ...prev,
      id: `contract-${Date.now()}`,
      title: template.title,
      category: template.category,
      scope: template.scope,
      rate: template.rate,
      schedule: template.schedule,
      ownership: template.ownership,
      clauses: template.clauses.map((clauseText, i) => {
        const parts = clauseText.split(":");
        const title = parts.length > 1 ? parts[0].trim() : `Clause ${i + 1}`;
        const text = parts.slice(1).join(":").trim() || clauseText;
        return { title, text };
      }),
    }));
    setStep(2); // move to parties page
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateClause = (
    index: number,
    field: "title" | "text",
    value: string
  ) => {
    setForm((prev) => {
      const updated = [...prev.clauses];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, clauses: updated };
    });
  };

  const removeClause = (index: number) => {
    setForm((prev) => ({
      ...prev,
      clauses: prev.clauses.filter((_, i) => i !== index),
    }));
  };

  const addEmptyClause = () => {
    setForm((prev) => ({
      ...prev,
      clauses: [
        ...prev.clauses,
        {
          title: "New Clause Heading",
          text: "Write custom clause terms here.",
        },
      ],
    }));
  };

  const handleSaveAndDownload = async () => {
    const newContract: SavedContract = {
      ...form,
      id: form.id || `contract-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    // Save to IndexedDB
    await saveContract(newContract);
    loadSavedContracts();

    // Trigger PDF generation & Download
    generatePDF(newContract);
  };

  const loadSavedContractIntoForm = (saved: SavedContract) => {
    setForm({
      id: saved.id,
      title: saved.title,
      category: saved.category,
      contractorName: saved.contractorName,
      contractorCompany: saved.contractorCompany,
      contractorEmail: saved.contractorEmail,
      contractorAddress: saved.contractorAddress,
      clientName: saved.clientName,
      clientCompany: saved.clientCompany,
      clientEmail: saved.clientEmail,
      clientAddress: saved.clientAddress,
      projectName: saved.projectName,
      scope: saved.scope,
      startDate: saved.startDate,
      endDate: saved.endDate,
      rate: saved.rate,
      schedule: saved.schedule,
      ownership: saved.ownership,
      clauses: saved.clauses || [],
      contractorSignature: saved.contractorSignature || "",
      contractorSignatureImage: saved.contractorSignatureImage || "",
      clientSignature: saved.clientSignature || "",
      clientSignatureImage: saved.clientSignatureImage || "",
      signDate: saved.signDate || new Date().toISOString().split("T")[0],
      pdfLayout: (saved.pdfLayout as any) || "legal",
      pdfFont: (saved.pdfFont as any) || "times",
    });
    setStep(6); // directly go to review step
    setShowHistory(false);
  };

  const handleDeleteContract = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    showToast(
      "Are you sure you want to delete this contract from history?",
      "warning",
      {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteContract(id);
            await loadSavedContracts();
            showToast("Contract deleted successfully from history.", "success");
          } catch (err) {
            console.error("Failed to delete contract", err);
            showToast("Failed to delete contract.", "error");
          }
        },
      }
    );
  };

  const resetFormToNew = () => {
    setForm({
      id: "",
      title: "",
      category: "",
      contractorName: "",
      contractorCompany: "",
      contractorEmail: "",
      contractorAddress: "",
      clientName: "",
      clientCompany: "",
      clientEmail: "",
      clientAddress: "",
      projectName: "",
      scope: "",
      startDate: "",
      endDate: "",
      rate: "",
      schedule: "",
      ownership: "",
      clauses: [],
      contractorSignature: "",
      contractorSignatureImage: "",
      clientSignature: "",
      clientSignatureImage: "",
      signDate: new Date().toISOString().split("T")[0],
      pdfLayout: "legal",
      pdfFont: "times",
    });
    setStep(1);
    setQrCodeUrl("");
  };

  // QR Code and Synchronization Logic
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  // Handle uploaded signature image
  const handleSignatureUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    role: "contractor" | "client"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result as string;
      setForm((prev) => ({
        ...prev,
        [role === "contractor"
          ? "contractorSignatureImage"
          : "clientSignatureImage"]: base64Data,
        // Also pre-populate text signature to mark the form as signed
        [role === "contractor" ? "contractorSignature" : "clientSignature"]:
          prev[role === "contractor" ? "contractorName" : "clientName"] ||
          "Uploaded Signature",
      }));
    };
    reader.readAsDataURL(file);
  };

  // Generate QR Code and Register Metadata
  useEffect(() => {
    if (!form.id) return;

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const signUrl = `${origin}/sign?id=${form.id}`;

    // Generate local QR Code
    QRCode.toDataURL(signUrl, {
      margin: 1,
      width: 250,
      color: {
        dark: "#0f172a", // deep slate dark color
        light: "#ffffff",
      },
    })
      .then((url) => {
        setQrCodeUrl(url);
      })
      .catch((err) => {
        console.error("QR Code generation error", err);
      });

    // POST Metadata to secure server so that phone can display live info immediately
    fetch("/api/contracts/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: form.id,
        type: "metadata",
        metadata: {
          title: form.title,
          contractorName: form.contractorName,
          contractorCompany: form.contractorCompany,
          clientName: form.clientName,
          clientCompany: form.clientCompany,
          scope: form.scope,
          rate: form.rate,
        },
      }),
    }).catch((err) =>
      console.error("Failed to upload metadata to signature server", err)
    );
  }, [
    form.id,
    form.title,
    form.contractorName,
    form.contractorCompany,
    form.clientName,
    form.clientCompany,
    form.scope,
    form.rate,
  ]);

  // Poll for Mobile Signature updates
  useEffect(() => {
    if (step !== 6 || !form.id) return;

    let active = true;
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/contracts/sign?id=${form.id}`);
        if (!response.ok) return;
        const result = await response.json();

        if (active && result.success && result.data) {
          const data = result.data;
          let changed = false;

          setForm((prev) => {
            const updates: any = {};

            if (
              data.contractorSignature &&
              data.contractorSignature !== prev.contractorSignature
            ) {
              updates.contractorSignature = data.contractorSignature;
              changed = true;
            }
            if (
              data.contractorSignatureImage &&
              data.contractorSignatureImage !== prev.contractorSignatureImage
            ) {
              updates.contractorSignatureImage = data.contractorSignatureImage;
              changed = true;
            }
            if (
              data.clientSignature &&
              data.clientSignature !== prev.clientSignature
            ) {
              updates.clientSignature = data.clientSignature;
              changed = true;
            }
            if (
              data.clientSignatureImage &&
              data.clientSignatureImage !== prev.clientSignatureImage
            ) {
              updates.clientSignatureImage = data.clientSignatureImage;
              changed = true;
            }
            if (data.signDate && data.signDate !== prev.signDate) {
              updates.signDate = data.signDate;
              changed = true;
            }

            if (changed) {
              return { ...prev, ...updates };
            }
            return prev;
          });
        }
      } catch (e) {
        console.error("Polling signature updates failed", e);
      }
    }, 2000); // Poll every 2 seconds

    return () => {
      active = false;
      clearInterval(pollInterval);
    };
  }, [step, form.id]);

  const headingClass =
    form.pdfLayout === "executive"
      ? "border-l-2 border-lime-700 pl-2 font-bold font-outfit text-[10px] uppercase text-[#1e3020] tracking-wider"
      : form.pdfLayout === "legal"
        ? "font-serif font-bold text-slate-950 border-b border-slate-300 pb-0.5 text-[10px]"
        : "font-bold font-outfit text-[10px] uppercase text-[#1e3020] tracking-wider";

  const partyCardClass =
    form.pdfLayout === "modern"
      ? "bg-lime-50/10 border border-[#d5ded7] p-2.5 rounded-xl"
      : form.pdfLayout === "executive"
        ? "border-l-4 border-lime-700 bg-lime-50/20 p-2.5 rounded-xl"
        : form.pdfLayout === "legal"
          ? "border-y border-slate-300 bg-transparent rounded-none px-1 py-2"
          : "border border-[#d5ded7] p-2.5 rounded-xl";

  const signatureBoxClass =
    form.pdfLayout === "legal"
      ? "border border-slate-300 p-2.5 rounded-none h-24 flex flex-col justify-between relative bg-transparent"
      : "border border-[#d5ded7] p-2.5 rounded-2xl h-24 flex flex-col justify-between relative bg-lime-50/10";

  return (
    <WorkspaceLayout
      header={
        <Header
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          savedContractsCount={savedContracts.length}
          resetFormToNew={resetFormToNew}
        />
      }
      sidebar={
        <AnimatePresence>
          <HistorySidebar
            showHistory={showHistory}
            savedContracts={savedContracts}
            loadSavedContractIntoForm={loadSavedContractIntoForm}
            handleDeleteContract={handleDeleteContract}
          />
        </AnimatePresence>
      }
    >
      {/* Wizard Steps Navigation bar */}
      <div className="mb-10 overflow-x-auto pb-2">
        <div className="flex items-center justify-between min-w-[760px] border-b border-[#d5ded7]">
          {STEPS.map((s, idx) => {
            const isActive = step === s.id;
            const isPast = step > s.id;
            return (
              <div key={s.id} className="flex-1 flex items-center relative">
                <button
                  onClick={() => {
                    if (s.id > 1 && !form.title) {
                      showToast(
                        "Please select a contract template first to load default parameters.",
                        "info"
                      );
                      return;
                    }
                    setStep(s.id);
                  }}
                  className={`flex items-center gap-2 py-3 px-1 border-b-2 transition-all duration-300 outline-none cursor-pointer ${
                    isActive
                      ? "border-lime-700 text-[#1e3020] font-outfit font-semibold"
                      : isPast
                        ? "border-lime-300/80 text-[#526354]"
                        : "border-transparent text-[#526354]/50 hover:text-[#1e3020]"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-all duration-300 ${
                      isActive
                        ? "bg-lime-700 text-white shadow-sm"
                        : isPast
                          ? "bg-lime-100 text-lime-800 border border-lime-200"
                          : "bg-[#faf8f4] text-[#526354]/50 border border-[#d5ded7]"
                    }`}
                  >
                    {isPast ? <Check className="w-3.5 h-3.5" /> : s.id}
                  </div>
                  <span className="text-xs whitespace-nowrap">{s.name}</span>
                </button>
                {idx < STEPS.length - 1 && (
                  <div className="flex-1 mx-4 h-px bg-[#d5ded7]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {step === 1 ? (
          <div className="lg:col-span-7 bg-[#faf8f4] border border-[#d5ded7] rounded-3xl p-6 shadow-[0_8px_24px_rgba(30,48,32,0.02)] border-b-4 border-b-lime-700/20 min-h-[500px]">
            <TemplateBrowser
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isRegexInvalid={isRegexInvalid}
              scrollTabs={scrollTabs}
              tabsContainerRef={tabsContainerRef}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              filteredTemplates={filteredTemplates}
              selectTemplate={selectTemplate}
              h1Title={h1Title}
              heroDescription={heroDescription}
            />
          </div>
        ) : (
          <ContractForm
            step={step}
            setStep={setStep}
            form={form}
            setForm={setForm}
            handleInputChange={handleInputChange}
            handleSignatureUpload={handleSignatureUpload}
            addEmptyClause={addEmptyClause}
            removeClause={removeClause}
            updateClause={updateClause}
            qrCodeUrl={qrCodeUrl}
            handleSaveAndDownload={handleSaveAndDownload}
          />
        )}

        <ContractPreview
          form={form}
          setForm={setForm}
          headingClass={headingClass}
          partyCardClass={partyCardClass}
          signatureBoxClass={signatureBoxClass}
        />
      </div>
    </WorkspaceLayout>
  );
}
