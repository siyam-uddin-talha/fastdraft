"use client";

import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  Loader2,
  Download,
} from "lucide-react";
import { SavedContract } from "@/lib/types";
import { DatePicker } from "./DatePicker";

interface ContractFormProps {
  step: number;
  setStep: (v: number) => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSignatureUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "contractor" | "client"
  ) => void;
  addEmptyClause: () => void;
  removeClause: (idx: number) => void;
  updateClause: (idx: number, field: "title" | "text", val: string) => void;
  qrCodeUrl: string;
  handleSaveAndDownload: () => void;
}

export function ContractForm({
  step,
  setStep,
  form,
  setForm,
  handleInputChange,
  handleSignatureUpload,
  addEmptyClause,
  removeClause,
  updateClause,
  qrCodeUrl,
  handleSaveAndDownload,
}: ContractFormProps) {
  return (
    <div className="lg:col-span-7 bg-[#faf8f4] border border-[#d5ded7] rounded-3xl p-6 shadow-[0_8px_24px_rgba(30,48,32,0.02)] border-b-4 border-b-lime-700/20 min-h-[500px]">
      {/* STEP 2: THE PARTIES */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-base font-outfit font-semibold text-[#1e3020] tracking-tight">
              Step 2: Declare the Contracting Parties
            </h2>
            <p className="text-xs text-[#526354]">
              Provide legal contact definitions for both the executing Contractor and hiring Client.
            </p>
          </div>

          {/* Contractor (You) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1.5 border-b border-[#d5ded7]/60">
              <div className="w-1.5 h-1.5 rounded-full bg-lime-700" />
              <span className="text-xs font-outfit font-semibold uppercase tracking-wider text-[#526354]">
                Contractor / Vendor Info
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-[#526354] uppercase tracking-wider">
                  Full Contractor Name *
                </label>
                <input
                  type="text"
                  name="contractorName"
                  value={form.contractorName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-[#526354] uppercase tracking-wider">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  name="contractorCompany"
                  value={form.contractorCompany}
                  onChange={handleInputChange}
                  placeholder="JD Design Co."
                  className="w-full px-3 py-2 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-[#526354] uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="contractorEmail"
                  value={form.contractorEmail}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-[#526354] uppercase tracking-wider">
                  Postal Address / Location
                </label>
                <input
                  type="text"
                  name="contractorAddress"
                  value={form.contractorAddress}
                  onChange={handleInputChange}
                  placeholder="Brooklyn, NY 11201"
                  className="w-full px-3 py-2 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none"
                />
              </div>
            </div>
          </div>

          {/* Client */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 pb-1.5 border-b border-[#d5ded7]/60">
              <div className="w-1.5 h-1.5 rounded-full bg-lime-600" />
              <span className="text-xs font-outfit font-semibold uppercase tracking-wider text-[#526354]">
                Client / Buyer Info
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-[#526354] uppercase tracking-wider">
                  Full Client Name *
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={form.clientName}
                  onChange={handleInputChange}
                  placeholder="Jane Smith"
                  className="w-full px-3 py-2 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-[#526354] uppercase tracking-wider">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  name="clientCompany"
                  value={form.clientCompany}
                  onChange={handleInputChange}
                  placeholder="Stripe Inc."
                  className="w-full px-3 py-2 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-[#526354] uppercase tracking-wider">
                  Client Email Address *
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  value={form.clientEmail}
                  onChange={handleInputChange}
                  placeholder="jane@stripe.com"
                  className="w-full px-3 py-2 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-[#526354] uppercase tracking-wider">
                  Client Postal Address
                </label>
                <input
                  type="text"
                  name="clientAddress"
                  value={form.clientAddress}
                  onChange={handleInputChange}
                  placeholder="San Francisco, CA 94103"
                  className="w-full px-3 py-2 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#d5ded7]/60">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl border border-[#d5ded7] text-xs font-semibold hover:bg-lime-100/50 hover:text-[#1e3020] text-[#526354] transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!form.contractorName || !form.clientName}
              className="flex items-center gap-1.5 px-5 py-2 rounded-2xl bg-lime-700 hover:bg-lime-800 disabled:opacity-40 disabled:pointer-events-none text-[#faf8f4] text-xs font-semibold transition-all duration-300 cursor-pointer shadow-[0_4px_12px_rgba(77,124,15,0.15)]"
            >
              Next: Scope & Timeline <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SCOPE & TIMELINE */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-base font-outfit font-semibold text-[#1e3020] tracking-tight">
              Step 3: Define Project Scope & Timeline
            </h2>
            <p className="text-xs text-[#526354]">
              Provide accurate boundaries of the gig work to prevent scope creep.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#526354] uppercase tracking-wider">
                Agreement Title *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                placeholder="e.g. Freelance Design Agreement"
                className="w-full px-3 py-2 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#526354] uppercase tracking-wider">
                Project Name (Optional)
              </label>
              <input
                type="text"
                name="projectName"
                value={form.projectName}
                onChange={handleInputChange}
                placeholder="e.g. Q3 Brand Refresh"
                className="w-full px-3 py-2 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#526354] uppercase tracking-wider">
                Detailed Project Scope *
              </label>
              <textarea
                name="scope"
                value={form.scope}
                onChange={handleInputChange}
                rows={5}
                placeholder="Describe the exact deliverables, task constraints, and output file formats..."
                className="w-full px-3 py-2.5 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-[#526354] uppercase tracking-wider">
                  Project Start Date *
                </label>
                <DatePicker
                  value={form.startDate}
                  onChange={(val) =>
                    handleInputChange({
                      target: { name: "startDate", value: val },
                    } as any)
                  }
                  placeholder="Select start date"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-[#526354] uppercase tracking-wider">
                  Project Deadline / End Date *
                </label>
                <DatePicker
                  value={form.endDate}
                  onChange={(val) =>
                    handleInputChange({
                      target: { name: "endDate", value: val },
                    } as any)
                  }
                  placeholder="Select deadline"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#d5ded7]/60">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl border border-[#d5ded7] text-xs font-semibold hover:bg-lime-100/50 hover:text-[#1e3020] text-[#526354] transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              onClick={() => setStep(4)}
              disabled={!form.title || !form.scope || !form.startDate || !form.endDate}
              className="flex items-center gap-1.5 px-5 py-2 rounded-2xl bg-lime-700 hover:bg-lime-800 disabled:opacity-40 disabled:pointer-events-none text-[#faf8f4] text-xs font-semibold transition-all duration-300 cursor-pointer shadow-[0_4px_12px_rgba(77,124,15,0.15)]"
            >
              Next: Compensation <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: RATES & TERMS */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-base font-outfit font-semibold text-[#1e3020] tracking-tight">
              Step 4: Compensation and IP Ownership
            </h2>
            <p className="text-xs text-[#526354]">
              Explicit rates, payment milestones, and intellectual property safety clauses protect cash flow.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#526354] uppercase tracking-wider">
                Compensation rate & structure *
              </label>
              <input
                type="text"
                name="rate"
                value={form.rate}
                onChange={handleInputChange}
                placeholder="e.g. $80 / hour, or $3,500 flat fee"
                className="w-full px-3 py-2 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#526354] uppercase tracking-wider">
                Payment Schedule & Invoicing Milestones *
              </label>
              <textarea
                name="schedule"
                value={form.schedule}
                onChange={handleInputChange}
                rows={3}
                placeholder="e.g. 50% deposit upfront, 50% upon final delivery of code. Billed bi-weekly with net-15 day terms."
                className="w-full px-3 py-2.5 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none leading-relaxed"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-semibold text-[#526354] uppercase tracking-wider">
                  Intellectual Property Ownership *
                </label>
                <button
                  onClick={() =>
                    setForm((prev: any) => ({
                      ...prev,
                      ownership:
                        "All digital design prototypes, code repositories, and structural vector elements transfer ownership to the Client immediately upon 100% full invoice clearance. No rights transfer until payment clears.",
                    }))
                  }
                  className="text-[10px] text-lime-700 hover:text-lime-800 flex items-center gap-1 font-semibold underline decoration-dotted decoration-lime-500 hover:decoration-lime-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Load Standard Transfer Clause
                </button>
              </div>
              <textarea
                name="ownership"
                value={form.ownership}
                onChange={handleInputChange}
                rows={3}
                placeholder="Define who owns the work product, code, and design assets upon payment completion..."
                className="w-full px-3 py-2.5 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#d5ded7]/60">
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl border border-[#d5ded7] text-xs font-semibold hover:bg-lime-100/50 hover:text-[#1e3020] text-[#526354] transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              onClick={() => setStep(5)}
              disabled={!form.rate || !form.schedule || !form.ownership}
              className="flex items-center gap-1.5 px-5 py-2 rounded-2xl bg-lime-700 hover:bg-lime-800 disabled:opacity-40 disabled:pointer-events-none text-[#faf8f4] text-xs font-semibold transition-all duration-300 cursor-pointer shadow-[0_4px_12px_rgba(77,124,15,0.15)]"
            >
              Next: Custom Legal Clauses <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: CUSTOM LEGAL CLAUSES */}
      {step === 5 && (
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-outfit font-semibold text-[#1e3020] tracking-tight">
                Step 5: Additional Legal Covenants
              </h2>
              <button
                onClick={addEmptyClause}
                className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold border border-[#d5ded7] rounded-xl hover:bg-lime-100/50 text-lime-800 transition-all duration-300 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Add Empty Clause
              </button>
            </div>
            <p className="text-xs text-[#526354]">
              Edit, remove, or draft custom protection clauses to tailor this agreement perfectly to your requirements.
            </p>
          </div>

          {/* Editable Clauses List */}
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
            {form.clauses.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-[#d5ded7] rounded-3xl">
                <p className="text-[11px] text-[#526354]/70">No additional covenants drafted.</p>
                <button
                  onClick={addEmptyClause}
                  className="text-[10px] text-lime-700 hover:text-lime-800 underline mt-1 font-semibold cursor-pointer"
                >
                  Add a manual clause to begin
                </button>
              </div>
            ) : (
              form.clauses.map((clause: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 bg-[#faf8f4] border border-[#d5ded7] rounded-2xl space-y-3.5 relative group shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#526354]/60">
                      Clause #{idx + 1}
                    </span>
                    <button
                      onClick={() => removeClause(idx)}
                      className="p-1.5 rounded-xl text-[#526354]/50 hover:text-red-500 hover:bg-red-50 transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="Remove clause"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={clause.title}
                    onChange={(e) => updateClause(idx, "title", e.target.value)}
                    placeholder="Clause Title"
                    className="w-full px-3 py-1.5 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] font-semibold rounded-xl focus:border-lime-700 focus:ring-4 focus:ring-lime-100 outline-none transition-all duration-300"
                  />
                  <textarea
                    value={clause.text}
                    onChange={(e) => updateClause(idx, "text", e.target.value)}
                    placeholder="Clause Content Description..."
                    rows={3}
                    className="w-full px-3 py-2 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] rounded-xl focus:border-lime-700 focus:ring-4 focus:ring-lime-100 outline-none leading-relaxed transition-all duration-300"
                  />
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#d5ded7]/60">
            <button
              onClick={() => setStep(4)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl border border-[#d5ded7] text-xs font-semibold hover:bg-lime-100/50 hover:text-[#1e3020] text-[#526354] transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              onClick={() => setStep(6)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-2xl bg-lime-700 hover:bg-lime-800 text-[#faf8f4] text-xs font-semibold transition-all duration-300 cursor-pointer shadow-[0_4px_12px_rgba(77,124,15,0.15)]"
            >
              Next: Review & Sign <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: REVIEW & SIGN */}
      {step === 6 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-base font-outfit font-semibold text-[#1e3020] tracking-tight">
              Step 6: Digital Signature & Compile
            </h2>
            <p className="text-xs text-[#526354]">
              Sign with standard typed digital cursive or upload a signature image. You can also invite a mobile signature via QR code.
            </p>
          </div>

          <div className="space-y-6">
            {/* Digital Signature Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Contractor Signature block */}
              <div className="space-y-3 bg-lime-50/20 p-4 border border-[#d5ded7] rounded-3xl shadow-[0_4px_12px_rgba(30,48,32,0.01)]">
                <div>
                  <label className="text-[10px] font-bold text-[#1e3020] uppercase tracking-wider">
                    Contractor Typed Signature *
                  </label>
                  <p className="text-[9px] text-[#526354]/80 mb-1.5">
                    Type your full legal name to generate electronic signing certificate.
                  </p>
                  <input
                    type="text"
                    name="contractorSignature"
                    value={form.contractorSignature}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none"
                    id="contractor-sig-input"
                  />
                </div>

                {form.contractorSignature && (
                  <div className="py-2 px-3 bg-[#faf8f4] border border-[#d5ded7]/60 rounded-xl">
                    <span className="text-[8px] font-mono text-[#526354]/60 block uppercase mb-0.5">
                      Cursive Preview:
                    </span>
                    <span className="font-serif italic text-base font-semibold text-[#1e3020] antialiased block tracking-wide">
                      {form.contractorSignature}
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#d5ded7]/60">
                  <label className="text-[9px] font-bold text-[#526354] uppercase tracking-wider block mb-1">
                    Or Upload Handwritten Signature
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSignatureUpload(e, "contractor")}
                      className="hidden"
                      id="contractor-sig-file-upload"
                    />
                    <label
                      htmlFor="contractor-sig-file-upload"
                      className="cursor-pointer px-3 py-1.5 border border-[#d5ded7] bg-[#faf8f4] hover:bg-lime-100/50 text-[10px] font-semibold text-lime-800 rounded-xl shadow-sm transition-all flex items-center gap-1 shrink-0"
                    >
                      Choose File Image
                    </label>
                    {form.contractorSignatureImage && (
                      <div className="flex items-center gap-1 bg-lime-100/50 py-1 px-2 rounded-xl border border-lime-200/50 max-w-[120px] overflow-hidden">
                        <img
                          src={form.contractorSignatureImage}
                          alt="Contractor Signature"
                          className="h-5 object-contain"
                        />
                        <button
                          onClick={() =>
                            setForm((prev: any) => ({
                              ...prev,
                              contractorSignatureImage: "",
                            }))
                          }
                          className="text-[11px] text-red-500 hover:text-red-700 font-bold ml-1.5 cursor-pointer"
                          title="Remove signature image"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Client Signature block */}
              <div className="space-y-3 bg-lime-50/20 p-4 border border-[#d5ded7] rounded-3xl shadow-[0_4px_12px_rgba(30,48,32,0.01)]">
                <div>
                  <label className="text-[10px] font-bold text-[#1e3020] uppercase tracking-wider">
                    Client Typed Signature *
                  </label>
                  <p className="text-[9px] text-[#526354]/80 mb-1.5">
                    The hiring authority must type their name to authorize the agreement.
                  </p>
                  <input
                    type="text"
                    name="clientSignature"
                    value={form.clientSignature}
                    onChange={handleInputChange}
                    placeholder="Jane Smith"
                    className="w-full px-3 py-2 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none"
                    id="client-sig-input"
                  />
                </div>

                {form.clientSignature && (
                  <div className="py-2 px-3 bg-[#faf8f4] border border-[#d5ded7]/60 rounded-xl">
                    <span className="text-[8px] font-mono text-[#526354]/60 block uppercase mb-0.5">
                      Cursive Preview:
                    </span>
                    <span className="font-serif italic text-base font-semibold text-[#1e3020] antialiased block tracking-wide">
                      {form.clientSignature}
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#d5ded7]/60">
                  <label className="text-[9px] font-bold text-[#526354] uppercase tracking-wider block mb-1">
                    Or Upload Handwritten Signature
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSignatureUpload(e, "client")}
                      className="hidden"
                      id="client-sig-file-upload"
                    />
                    <label
                      htmlFor="client-sig-file-upload"
                      className="cursor-pointer px-3 py-1.5 border border-[#d5ded7] bg-[#faf8f4] hover:bg-lime-100/50 text-[10px] font-semibold text-lime-800 rounded-xl shadow-sm transition-all flex items-center gap-1 shrink-0"
                    >
                      Choose File Image
                    </label>
                    {form.clientSignatureImage && (
                      <div className="flex items-center gap-1 bg-lime-100/50 py-1 px-2 rounded-xl border border-lime-200/50 max-w-[120px] overflow-hidden">
                        <img
                          src={form.clientSignatureImage}
                          alt="Client Signature"
                          className="h-5 object-contain"
                        />
                        <button
                          onClick={() =>
                            setForm((prev: any) => ({
                              ...prev,
                              clientSignatureImage: "",
                            }))
                          }
                          className="text-[11px] text-red-500 hover:text-red-700 font-bold ml-1.5 cursor-pointer"
                          title="Remove signature image"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Invitation Panel */}
            <div className="p-4 bg-lime-50/40 border border-[#d5ded7]/80 rounded-3xl space-y-3 shadow-[0_4px_12px_rgba(30,48,32,0.01)]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <h3 className="text-xs font-outfit font-bold text-[#1e3020] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-lime-700 animate-pulse" /> Live Mobile Signing Pad
                  </h3>
                  <p className="text-[10px] text-[#526354] leading-relaxed">
                    Scan this unique QR code with your phone camera to open a touch-enabled signing pad. Draw your actual handwritten signature with a finger or stylus, and watch it synchronize onto this document instantly!
                  </p>
                </div>

                {/* QR Code Rendering */}
                <div className="shrink-0 mx-auto sm:mx-0 bg-[#faf8f4] p-2.5 border border-[#d5ded7] rounded-2xl shadow-sm flex flex-col items-center justify-center">
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl}
                      alt="Contract Signature QR Code"
                      className="w-24 h-24"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-lime-50 rounded-xl flex items-center justify-center text-[9px] text-[#526354]/60">
                      Generating...
                    </div>
                  )}
                  <span className="text-[8px] font-bold font-mono text-[#526354]/60 mt-1.5 uppercase tracking-wider">
                    Scan to Sign
                  </span>
                </div>
              </div>

              {/* Real-time Polling Status Indicator */}
              <div className="flex items-center justify-between text-[10px] border-t border-[#d5ded7]/60 pt-2.5 bg-transparent">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[#526354] font-semibold text-[9.5px]">
                    Real-time mobile synchronization portal active
                  </span>
                </div>
                <span className="text-[#526354]/70 text-[9px] font-mono animate-pulse">
                  Polling signature state...
                </span>
              </div>
            </div>

            <div className="space-y-1 max-w-sm">
              <label className="text-[10px] font-semibold text-[#526354] uppercase tracking-wider">
                Signing Execution Date
              </label>
              <DatePicker
                value={form.signDate}
                onChange={(val) =>
                  handleInputChange({
                    target: { name: "signDate", value: val },
                  } as any)
                }
                placeholder="Select signing date"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-[#d5ded7]/60">
            <button
              onClick={() => setStep(5)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl border border-[#d5ded7] text-xs font-semibold hover:bg-lime-100/50 hover:text-[#1e3020] text-[#526354] transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              onClick={handleSaveAndDownload}
              disabled={!form.contractorSignature || !form.clientSignature}
              className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-lime-700 hover:bg-lime-800 text-[#faf8f4] text-xs font-bold shadow-[0_4px_12px_rgba(77,124,15,0.15)] transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
              id="download-contract-pdf-btn"
            >
              <Download className="w-4 h-4" /> Save Agreement & Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
