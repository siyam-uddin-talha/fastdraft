"use client";

import React from "react";
import { Search, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { CONTRACT_TEMPLATES, ContractTemplate } from "@/lib/templates";

interface TemplateBrowserProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  isRegexInvalid: boolean;
  scrollTabs: (dir: "left" | "right") => void;
  tabsContainerRef: React.RefObject<HTMLDivElement | null>;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  filteredTemplates: ContractTemplate[];
  selectTemplate: (template: ContractTemplate) => void;
  h1Title?: string;
  heroDescription?: string;
}

export function TemplateBrowser({
  searchTerm,
  setSearchTerm,
  isRegexInvalid,
  scrollTabs,
  tabsContainerRef,
  categories,
  selectedCategory,
  setSelectedCategory,
  filteredTemplates,
  selectTemplate,
  h1Title,
  heroDescription,
}: TemplateBrowserProps) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-outfit font-bold text-[#1e3020] tracking-tight">
          {h1Title || "Step 1: Choose Contract Foundation"}
        </h1>
        <p className="text-xs sm:text-sm text-[#526354] mt-1 leading-relaxed">
          {heroDescription || "Search and filter over 100 expert-curated template frameworks. Supports standard text or custom regex queries."}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#526354]/60" />
            <input
              type="text"
              placeholder="Type regex query... e.g. design|dev or ^writing"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 text-xs bg-[#faf8f4] border text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none ${
                isRegexInvalid
                  ? "border-red-300 focus:border-red-500 focus:ring-0"
                  : "border-[#d5ded7]"
              }`}
            />
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-4 px-1">
            {isRegexInvalid && (
              <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Syntax Error
              </span>
            )}
          </div>
        </div>

        {/* Category Pills with Navigation Controls */}
        <div className="relative flex items-center gap-2">
          <button
            onClick={() => scrollTabs("left")}
            className="p-1.5 rounded-full bg-lime-100 border border-lime-200/50 text-lime-800 hover:bg-lime-200/60 transition-all cursor-pointer select-none shrink-0"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div
            ref={tabsContainerRef}
            className="flex-1 flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar scroll-smooth"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-lime-700 text-[#faf8f4]"
                    : "bg-lime-100 text-lime-800 border border-lime-200/50 hover:bg-lime-200/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTabs("right")}
            className="p-1.5 rounded-full bg-lime-100 border border-lime-200/50 text-lime-800 hover:bg-lime-200/60 transition-all cursor-pointer select-none shrink-0"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Templates Grid List */}
      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-[#d5ded7] rounded-3xl">
            <p className="text-xs text-[#526354] font-semibold">
              No templates matched your query.
            </p>
            <p className="text-[10px] text-[#526354]/70 mt-1">
              Try refining your search keyword or switching search mode.
            </p>
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => selectTemplate(template)}
              className="group text-left p-4 bg-[#faf8f4] hover:bg-lime-50/25 border border-[#d5ded7] hover:border-lime-700 rounded-2xl cursor-pointer transition-all duration-300 flex items-start justify-between gap-4 shadow-sm"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-lime-100 text-lime-800 border border-lime-200/50 text-[9px] font-mono font-semibold uppercase tracking-wider">
                    {template.category}
                  </span>
                  <span className="text-[10px] text-[#526354] font-medium">
                    Rate:{" "}
                    <span className="font-semibold text-[#1e3020]">
                      {template.rate}
                    </span>
                  </span>
                </div>
                <h3 className="text-xs font-outfit font-semibold text-[#1e3020] mt-1.5 group-hover:text-lime-800 transition-colors">
                  {template.title}
                </h3>
                <p className="text-[11px] text-[#526354] mt-1 line-clamp-2 leading-relaxed">
                  {template.scope}
                </p>
              </div>
              <div className="w-7 h-7 rounded-xl bg-[#faf8f4] border border-[#d5ded7] flex items-center justify-center text-[#526354] group-hover:bg-lime-700 group-hover:border-lime-700 group-hover:text-[#faf8f4] transition-all duration-300 shadow-sm">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 pt-3 border-t border-[#d5ded7]/60 text-[10px] text-[#526354] flex items-center justify-between">
        <span>
          Showing {filteredTemplates.length} of {CONTRACT_TEMPLATES.length} templates
        </span>
        <span>Select any template card to begin customizing</span>
      </div>
    </div>
  );
}
