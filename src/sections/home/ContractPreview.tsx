"use client";

import React from "react";
import { Sparkles, FileText } from "lucide-react";

interface ContractPreviewProps {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  headingClass: string;
  partyCardClass: string;
  signatureBoxClass: string;
}

export function ContractPreview({
  form,
  setForm,
  headingClass,
  partyCardClass,
  signatureBoxClass,
}: ContractPreviewProps) {
  return (
    <div className="lg:col-span-5 lg:sticky lg:top-24 max-h-[calc(100vh-140px)] overflow-y-auto">
      <div className="bg-lime-700 text-[#faf8f4] border border-[#d5ded7] px-4 py-2.5 text-[10px] font-outfit font-bold tracking-wider uppercase rounded-t-3xl flex items-center justify-between shadow-sm">
        <span>Live Agreement Preview (Real-time)</span>
        <span className="w-2 h-2 rounded-full bg-lime-200 animate-pulse" />
      </div>

      {/* Formatting Options Tray */}
      <div className="bg-[#faf8f4] border-x border-b border-[#d5ded7] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
        <div className="flex items-center gap-1.5 text-lime-800 font-semibold text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-lime-700" />
          <span>Format & Style PDF:</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-[9px] uppercase font-bold text-[#526354] tracking-wider">
              Layout:
            </span>
            <select
              value={form.pdfLayout || "legal"}
              onChange={(e) =>
                setForm((prev: any) => ({
                  ...prev,
                  pdfLayout: e.target.value as any,
                }))
              }
              className="bg-[#faf8f4] border border-[#d5ded7] rounded-xl px-2.5 py-1 text-[11px] focus:outline-none focus:border-lime-700 font-semibold text-[#1e3020] cursor-pointer"
            >
              <option value="legal">Legal Pleading</option>
              <option value="classic">Classic Minimal</option>
              <option value="modern">Modern Slate</option>
              <option value="executive">Executive Corporate</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[9px] uppercase font-bold text-[#526354] tracking-wider">
              Font:
            </span>
            <select
              value={form.pdfFont || "times"}
              onChange={(e) =>
                setForm((prev: any) => ({
                  ...prev,
                  pdfFont: e.target.value as any,
                }))
              }
              className="bg-[#faf8f4] border border-[#d5ded7] rounded-xl px-2.5 py-1 text-[11px] focus:outline-none focus:border-lime-700 font-semibold text-[#1e3020] cursor-pointer"
            >
              <option value="times">Formal Serif (Times)</option>
              <option value="helvetica">Clean Sans (Helvetica)</option>
              <option value="courier">Tech Monospace (Courier)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Standard simulated A4 sheet of paper */}
      <div
        className={`bg-[#faf8f4] border-x border-b border-[#d5ded7] shadow-[0_8px_24px_rgba(30,48,32,0.02)] ${
          form.pdfLayout === "legal" ? "pl-11 pr-11 py-8" : "p-6"
        } ${
          form.pdfFont === "helvetica"
            ? "font-sans"
            : form.pdfFont === "courier"
              ? "font-mono"
              : "font-serif"
        } text-[#1e3020] leading-relaxed min-h-[600px] text-[11px] overflow-hidden rounded-b-3xl relative`}
      >
        {/* Legal Pleading Lines */}
        {form.pdfLayout === "legal" && (
          <>
            <div className="absolute left-[22px] top-0 bottom-0 w-[0.5px] bg-red-600/30" />
            <div className="absolute left-[25px] top-0 bottom-0 w-[0.5px] bg-red-600/30" />
            <div className="absolute right-[22px] top-0 bottom-0 w-[0.5px] bg-red-600/30" />
          </>
        )}
        {!form.title && (
          <div className="absolute inset-0 bg-[#faf8f4]/95 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-6 text-slate-400 z-10">
            <FileText className="w-12 h-12 stroke-[1] text-lime-700/40 mb-2" />
            <span className="font-outfit font-semibold text-xs text-[#1e3020]">
              Agreement Template Unselected
            </span>
            <p className="font-sans text-[10px] text-[#526354] mt-1 max-w-[200px] leading-relaxed">
              Select a core template on Step 1 to populate this preview layout instantly.
            </p>
          </div>
        )}

        {/* Document Header (Custom Layout designs) */}
        {form.pdfLayout === "modern" ? (
          <div className="mb-6 bg-lime-50/40 border-l-4 border-lime-700 p-4 rounded-r-2xl">
            <h3 className="text-sm font-outfit font-bold uppercase tracking-tight text-[#1e3020] leading-tight">
              {form.title || "Independent Contractor Agreement"}
            </h3>
            <div className="text-[9px] text-[#526354]/80 font-sans mt-1">
              Document Reference ID:{" "}
              <span className="font-mono font-bold text-[#1e3020]">
                {form.id || "DRAFT"}
              </span>{" "}
              • Effective:{" "}
              <span className="font-semibold text-lime-800">
                {form.startDate || "Date of Execution"}
              </span>
            </div>
          </div>
        ) : form.pdfLayout === "executive" ? (
          <div className="border-b-2 border-double border-lime-700/60 pb-4 mb-6">
            <div className="text-right text-[8px] font-sans font-bold tracking-widest text-[#526354] uppercase mb-2">
              OFFICIAL INSTRUMENT
            </div>
            <h3 className="text-sm font-outfit font-bold tracking-tight text-[#1e3020] text-center leading-tight">
              {form.title || "Independent Contractor Agreement"}
            </h3>
            <div className="text-[9.5px] text-[#526354]/80 font-sans text-center mt-1.5">
              ESTABLISHED ON{" "}
              <span className="font-bold text-lime-800">
                {form.startDate || "DATE OF EXECUTION"}
              </span>
            </div>
          </div>
        ) : form.pdfLayout === "legal" ? (
          <div className="border-b-2 border-slate-900 pb-3 mb-6 text-center">
            <h3 className="text-sm font-serif font-bold tracking-normal text-slate-950 uppercase leading-snug">
              {form.title || "Independent Contractor Agreement"}
            </h3>
            <div className="text-[9px] font-serif text-slate-700 mt-1">
              EFFECTIVE DATE:{" "}
              <span className="font-bold text-lime-800">
                {form.startDate || "DATE OF EXECUTION"}
              </span>
            </div>
          </div>
        ) : (
          /* Classic Layout */
          <div className="border-b border-[#d5ded7]/60 pb-4 mb-6 text-center">
            <h3 className="text-sm font-outfit font-bold uppercase tracking-tight text-[#1e3020] leading-tight">
              {form.title || "Independent Contractor Agreement"}
            </h3>
            <div className="text-[10px] text-[#526354]/80 font-sans mt-1">
              Effective Date:{" "}
              <span className="font-semibold text-lime-800">
                {form.startDate || "Date of Execution"}
              </span>
            </div>
          </div>
        )}

        {/* Section 1: Parties */}
        <div className="space-y-2 mb-5">
          <h4 className={headingClass}>1. Parties and Engagement</h4>
          <p className="text-[#526354] text-[10.5px]">
            This Agreement is entered into by and between the Contractor and the Client detailed below:
          </p>
          <div className="grid grid-cols-2 gap-4 font-sans text-[10px] mt-2">
            <div className={partyCardClass}>
              <span className="font-bold text-lime-800 block text-[9px] uppercase">
                Contractor / Service Provider
              </span>
              <span className="font-semibold text-[#1e3020] block mt-1">
                {form.contractorName || "N/A"}
              </span>
              {form.contractorCompany && (
                <span className="text-[#526354]/80 block">{form.contractorCompany}</span>
              )}
              {form.contractorEmail && (
                <span className="text-[#526354]/80 block">{form.contractorEmail}</span>
              )}
              {form.contractorAddress && (
                <span className="text-[#526354]/60 block mt-0.5">{form.contractorAddress}</span>
              )}
            </div>
            <div className={partyCardClass}>
              <span className="font-bold text-lime-800 block text-[9px] uppercase">
                Client / Purchasing Entity
              </span>
              <span className="font-semibold text-[#1e3020] block mt-1">
                {form.clientName || "N/A"}
              </span>
              {form.clientCompany && (
                <span className="text-[#526354]/80 block">{form.clientCompany}</span>
              )}
              {form.clientEmail && (
                <span className="text-[#526354]/80 block">{form.clientEmail}</span>
              )}
              {form.clientAddress && (
                <span className="text-[#526354]/60 block mt-0.5">{form.clientAddress}</span>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Scope */}
        <div className="space-y-1 mb-5">
          <h4 className={headingClass}>2. Project Scope and Timeline</h4>
          <p className="text-[#526354] italic leading-relaxed text-[10.5px]">
            The Contractor agrees to execute and deliver the following professional services:
          </p>
          <p className="text-[#1e3020] text-[10px] bg-lime-50/10 p-2.5 border border-[#d5ded7]/60 rounded-xl leading-relaxed whitespace-pre-wrap">
            {form.scope || "No project scope details declared."}
          </p>
          <div className="font-sans text-[10px] text-[#526354] mt-2">
            • <span className="font-semibold text-[#1e3020]">Start Date:</span>{" "}
            {form.startDate || "Date of Execution"}
            <br />• <span className="font-semibold text-[#1e3020]">Target Deadline:</span>{" "}
            {form.endDate || "As specified per Milestone"}
          </div>
        </div>

        {/* Section 3: Payment */}
        <div className="space-y-1 mb-5">
          <h4 className={headingClass}>3. Payment Terms and Rates</h4>
          <div className="font-sans text-[10.5px] font-semibold text-[#526354]">
            Rate structure:{" "}
            <span className="text-[#1e3020] font-bold">{form.rate || "No rate declared."}</span>
          </div>
          <p className="text-[#526354] leading-normal text-[10px] mt-1">
            <span className="font-semibold text-lime-800">Invoicing & Milestones:</span>
            <br />
            {form.schedule || "To be paid upon delivery of corresponding project milestones."}
          </p>
        </div>

        {/* Section 4: IP */}
        <div className="space-y-1 mb-5">
          <h4 className={headingClass}>4. Intellectual Property and Ownership</h4>
          <p className="text-[#526354] leading-normal text-[10px]">
            {form.ownership ||
              "The Contractor transfers all intellectual property rights immediately upon final payment receipt in full."}
          </p>
        </div>

        {/* Section 5: Additional Clauses */}
        {form.clauses && form.clauses.length > 0 && (
          <div className="space-y-2 mb-5">
            <h4 className={headingClass}>5. Additional Covenants</h4>
            <div className="space-y-2">
              {form.clauses.map((clause: any, index: number) => (
                <div key={index} className="text-[10px] text-[#526354]">
                  <span className="font-bold text-[#1e3020] block">
                    {index + 1}. {clause.title}
                  </span>
                  <p className="text-[#526354]/90 pl-3 leading-relaxed border-l border-[#d5ded7]/40">
                    {clause.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Signatures */}
        <div className="mt-8 pt-4 border-t border-[#d5ded7]/60">
          <h4 className={headingClass}>6. Signatures & Agreement</h4>
          <p className="text-[9px] text-[#526354]/60 font-sans mb-4">
            By executing their digital signatures below, both Contractor and Client validate and trigger this Agreement.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {/* Contractor signature */}
            <div className={signatureBoxClass}>
              <span className="font-sans text-[8px] text-lime-800 uppercase tracking-wider block">
                Contractor Signature
              </span>
              {form.contractorSignatureImage ? (
                <div className="absolute top-6 left-2 select-none h-11 w-11/12 flex items-center justify-start">
                  <img
                    src={form.contractorSignatureImage}
                    alt="Contractor Signature"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ) : form.contractorSignature ? (
                <span className="font-serif italic text-base font-semibold text-[#1e3020] tracking-wide select-none absolute top-7 left-2.5">
                  {form.contractorSignature}
                </span>
              ) : (
                <span className="text-[9px] text-lime-700/40 italic font-sans absolute top-7 left-2.5">
                  Pending sign...
                </span>
              )}
              <span className="font-sans text-[8px] text-[#526354]/80 block mt-auto z-10 bg-[#faf8f4]/80 px-1.5 py-0.5 rounded-lg border border-[#d5ded7]/40 self-start">
                Date: {form.signDate || "N/A"}
              </span>
            </div>

            {/* Client signature */}
            <div className={signatureBoxClass}>
              <span className="font-sans text-[8px] text-lime-800 uppercase tracking-wider block">
                Client Signature
              </span>
              {form.clientSignatureImage ? (
                <div className="absolute top-6 left-2 select-none h-11 w-11/12 flex items-center justify-start">
                  <img
                    src={form.clientSignatureImage}
                    alt="Client Signature"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ) : form.clientSignature ? (
                <span className="font-serif italic text-base font-semibold text-[#1e3020] tracking-wide select-none absolute top-7 left-2.5">
                  {form.clientSignature}
                </span>
              ) : (
                <span className="text-[9px] text-lime-700/40 italic font-sans absolute top-7 left-2.5">
                  Pending sign...
                </span>
              )}
              <span className="font-sans text-[8px] text-[#526354]/80 block mt-auto z-10 bg-[#faf8f4]/80 px-1.5 py-0.5 rounded-lg border border-[#d5ded7]/40 self-start">
                Date: {form.signDate || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
