"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-[#d5ded7]/80 bg-[#faf8f4]/60 py-12 mt-20 text-center text-[#526354]/60 text-xs">
      <p className="font-sans text-[#526354]/80">
        FastDraft — Legally structured gig agreements generated instantly on-demand.
      </p>
      <div className="mt-4 space-y-1 font-sans text-[#526354]/70">
        <p>
          FastDraft is built and maintained by{" "}
          <a
            href="https://www.sutio.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-lime-800 font-medium transition-colors"
          >
            Sutio
          </a>
          .
        </p>
        <p>
          Made with care by{" "}
          <a
            href="https://www.sutio.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-lime-800 font-medium transition-colors"
          >
            Sutio
          </a>{" "}
          — we build software that helps teams ship faster.
        </p>
        <p>
          © 2026{" "}
          <a
            href="https://www.sutio.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-colors"
          >
            Sutio
          </a>
          . All rights reserved.
        </p>
      </div>
      <p className="text-[10px] mt-4 text-[#526354]/50 max-w-2xl mx-auto leading-relaxed font-sans px-4">
        Disclaimer: This generator provides standard commercial clauses for common freelance and contracting gig operations. It does not constitute official legal counsel or represent individual legal bar attorney counsel.
      </p>
    </footer>
  );
}
