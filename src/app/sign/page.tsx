"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  FileText, 
  PenTool, 
  Type, 
  RotateCcw, 
  CheckCircle, 
  Loader2, 
  User, 
  ChevronRight,
  Info,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "@/hooks/useToast";
import { PortalLayout } from "@/app/@core/layouts/PortalLayout";

function MobileSigningPortalContent() {
  const searchParams = useSearchParams();
  const contractId = searchParams.get("id");

  // State Management
  const [loading, setLoading] = useState(true);
  const [contractData, setContractData] = useState<any>(null);
  const [signingRole, setSigningRole] = useState<"client" | "contractor">("client");
  const [signMethod, setSignMethod] = useState<"draw" | "type">("draw");
  const [typedName, setTypedName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { showToast } = useToast();

  // Canvas Refs & State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  // Fetch contract metadata on mount
  useEffect(() => {
    const fetchContractDetails = async () => {
      if (!contractId) {
        setError("No contract ID provided in the URL invitation link.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/contracts/sign?id=${contractId}`);
        if (!response.ok) throw new Error("Failed to load contract from the secure portal.");
        const result = await response.json();
        
        if (result.success && result.data) {
          setContractData(result.data);
          // Pre-populate client typed name if available
          if (result.data.clientName) {
            setTypedName(result.data.clientName);
          }
        }
      } catch (err: any) {
        console.error("Fetch contract error:", err);
        setError("Could not retrieve contract details. Please make sure the desktop applet is open.");
      } finally {
        setLoading(false);
      }
    };

    fetchContractDetails();
    
    // Poll for contract data updates every 5 seconds in case it changes
    const interval = setInterval(fetchContractDetails, 5000);
    return () => clearInterval(interval);
  }, [contractId]);

  // Handle Canvas Drawing Setup
  useEffect(() => {
    if (signMethod !== "draw" || loading || success || error || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions based on display size for high resolution (Retina screens)
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Context style
    ctx.strokeStyle = "#1e3020"; // organic moss-green signature ink
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Set initial background to transparent
    ctx.clearRect(0, 0, rect.width, rect.height);
  }, [signMethod, loading, success, error]);

  // Coordinates helper
  const getCoordinates = (e: any) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // If touch event
    if (e.touches && e.touches[0]) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    // If mouse event
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDrawingRef.current = true;
    const pos = getCoordinates(e);
    lastPosRef.current = pos;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || !canvasRef.current) return;
    e.preventDefault();
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentPos = getCoordinates(e);
    
    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    lastPosRef.current = currentPos;
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
  };

  const handleSubmit = async () => {
    if (!contractId) return;
    setSubmitting(true);
    
    let signatureText = "";
    let signatureImage = "";

    try {
      if (signMethod === "draw") {
        if (!canvasRef.current) throw new Error("Signature canvas is not ready.");
        
        // Check if canvas is empty
        const canvas = canvasRef.current;
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        
        // If empty draw typed signature fallback or throw
        signatureImage = canvas.toDataURL("image/png");
        signatureText = signingRole === "client" 
          ? (contractData?.clientName || "Hiring Client")
          : (contractData?.contractorName || "Contractor");
      } else {
        if (!typedName.trim()) {
          showToast("Please type your name first.", "error");
          setSubmitting(false);
          return;
        }
        signatureText = typedName;
      }

      // POST signature to synchronization API
      const response = await fetch("/api/contracts/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: contractId,
          type: signingRole,
          signatureText,
          signatureImage: signMethod === "draw" ? signatureImage : undefined,
          signDate: new Date().toISOString().split("T")[0]
        })
      });

      if (!response.ok) throw new Error("Could not submit the signature to the server.");
      
      setSuccess(true);
    } catch (err: any) {
      showToast(err.message || "Failed to submit signature.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f4ee] flex flex-col items-center justify-center p-6 text-[#1e3020]">
        <Loader2 className="w-8 h-8 text-lime-700 animate-spin mb-3" />
        <p className="text-xs font-semibold text-[#526354]">Connecting to secure signature portal...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f0f4ee] flex flex-col items-center justify-center p-6 text-[#1e3020] text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4 border border-red-200">
          <Info className="w-6 h-6" />
        </div>
        <h1 className="text-sm font-outfit font-bold text-[#1e3020]">Portal Connection Error</h1>
        <p className="text-xs text-[#526354] mt-2 max-w-xs leading-relaxed">{error}</p>
        <p className="text-[10px] text-[#526354]/70 mt-4 font-mono">Make sure you have an active agreement being drafted on the desktop applet.</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#f0f4ee] flex flex-col items-center justify-center p-6 text-[#1e3020] text-center animate-fadeIn">
        <div className="w-14 h-14 rounded-full bg-lime-100 flex items-center justify-center text-lime-800 mb-4 border border-lime-200 shadow-sm">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h1 className="text-base font-outfit font-bold text-[#1e3020]">Signature Submitted!</h1>
        <p className="text-xs text-[#526354] mt-2 max-w-xs leading-relaxed">
          Your digital signature has been synchronized instantly with the secure document draft.
        </p>
        
        <div className="mt-6 p-4 rounded-3xl bg-[#faf8f4] border border-[#d5ded7] shadow-sm max-w-xs">
          <span className="text-[10px] font-mono uppercase text-[#526354]/60 block tracking-wider mb-1">Status</span>
          <span className="text-xs font-bold text-lime-800 block">✓ Desktop Document Signed</span>
          <p className="text-[10px] text-[#526354] mt-2.5 leading-normal">
            You can close this tab on your mobile device now. Look back at your desktop screen to download the completed PDF agreement!
          </p>
        </div>
      </div>
    );
  }

  return (
    <PortalLayout
      header={
        <header className="sticky top-0 z-20 bg-[#faf8f4]/80 backdrop-blur-md border-b border-[#d5ded7] px-4 py-3.5 flex items-center gap-2">
          <FileText className="w-5 h-5 text-lime-700 shrink-0" />
          <div>
            <h1 className="text-xs font-outfit font-bold text-[#1e3020] uppercase tracking-tight">Micro-Sign Portal</h1>
            <p className="text-[9px] text-[#526354]">Mobile Signing Authority invitation</p>
          </div>
        </header>
      }
    >
      {/* Contract Brief Card */}
      <section className="bg-[#faf8f4] border border-[#d5ded7] rounded-3xl p-5 shadow-[0_8px_24px_rgba(30,48,32,0.02)] space-y-3.5">
        <div className="flex items-start justify-between">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-lime-100 text-lime-800 border border-lime-200/50 text-[8px] font-mono uppercase tracking-wider font-semibold">
            Legal Document Summary
          </span>
          <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
            Secure Link
          </span>
        </div>

        <h2 className="text-sm font-outfit font-semibold text-[#1e3020] tracking-tight leading-tight">
          {contractData?.title || "Independent Contractor Agreement"}
        </h2>

        <div className="pt-3 border-t border-[#d5ded7]/60 grid grid-cols-2 gap-3 text-[10px]">
          <div>
            <span className="text-[#526354]/60 block font-medium uppercase tracking-wider text-[8px]">Contractor</span>
            <span className="font-semibold text-[#1e3020] block mt-0.5">{contractData?.contractorName || "Declaring Provider"}</span>
            {contractData?.contractorCompany && <span className="text-[#526354]/80 block leading-tight text-[9px]">{contractData.contractorCompany}</span>}
          </div>
          <div>
            <span className="text-[#526354]/60 block font-medium uppercase tracking-wider text-[8px]">Hiring Client</span>
            <span className="font-semibold text-[#1e3020] block mt-0.5">{contractData?.clientName || "Declaring Employer"}</span>
            {contractData?.clientCompany && <span className="text-[#526354]/80 block leading-tight text-[9px]">{contractData.clientCompany}</span>}
          </div>
        </div>

        {contractData?.scope && (
          <div className="pt-3 border-t border-[#d5ded7]/60 space-y-1">
            <span className="text-[#526354]/60 block font-medium uppercase tracking-wider text-[8px]">Scope Outline</span>
            <p className="text-[10px] text-[#526354] line-clamp-3 leading-relaxed italic">
              &ldquo;{contractData.scope}&rdquo;
            </p>
          </div>
        )}

        {contractData?.rate && (
          <div className="pt-3 border-t border-[#d5ded7]/60 flex items-center justify-between text-[10px]">
            <span className="text-[#526354]/60 font-medium uppercase tracking-wider text-[8px]">Proposed Compensation</span>
            <span className="font-bold text-[#1e3020]">{contractData.rate}</span>
          </div>
        )}
      </section>

      {/* Signing Actions Box */}
      <section className="bg-[#faf8f4] border border-[#d5ded7] rounded-3xl p-5 shadow-[0_8px_24px_rgba(30,48,32,0.02)] space-y-4">
        <h3 className="text-xs font-outfit font-bold uppercase tracking-wider text-[#1e3020]">
          Sign the Document
        </h3>

        {/* Role selector */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold uppercase text-[#526354]">Select Your Role</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSigningRole("client")}
              className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 border cursor-pointer ${
                signingRole === "client"
                  ? "bg-lime-700 text-[#faf8f4] border-lime-700 shadow-sm"
                  : "bg-lime-50/20 border-[#d5ded7] text-[#526354] hover:bg-lime-100/30"
              }`}
            >
              <User className="w-3.5 h-3.5" /> Hiring Client
            </button>
            <button
              onClick={() => setSigningRole("contractor")}
              className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 border cursor-pointer ${
                signingRole === "contractor"
                  ? "bg-lime-700 text-[#faf8f4] border-lime-700 shadow-sm"
                  : "bg-lime-50/20 border-[#d5ded7] text-[#526354] hover:bg-lime-100/30"
              }`}
            >
              <User className="w-3.5 h-3.5" /> Contractor
            </button>
          </div>
        </div>

        {/* Method selector */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold uppercase text-[#526354]">Signature Method</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSignMethod("draw")}
              className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 border cursor-pointer ${
                signMethod === "draw"
                  ? "bg-lime-700 text-[#faf8f4] border-lime-700 shadow-sm"
                  : "bg-lime-50/20 border-[#d5ded7] text-[#526354] hover:bg-lime-100/30"
              }`}
            >
              <PenTool className="w-3.5 h-3.5" /> Draw on Screen
            </button>
            <button
              onClick={() => setSignMethod("type")}
              className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 border cursor-pointer ${
                signMethod === "type"
                  ? "bg-lime-700 text-[#faf8f4] border-lime-700 shadow-sm"
                  : "bg-lime-50/20 border-[#d5ded7] text-[#526354] hover:bg-lime-100/30"
              }`}
            >
              <Type className="w-3.5 h-3.5" /> Type Cursive Name
            </button>
          </div>
        </div>

        {/* Signature Inputs */}
        {signMethod === "draw" ? (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[9px] font-bold uppercase text-[#526354]">Draw Your Signature Inside</label>
              <button
                onClick={clearCanvas}
                className="text-[9px] font-semibold text-lime-700 hover:text-lime-800 flex items-center gap-1 underline decoration-dotted cursor-pointer"
              >
                <RotateCcw className="w-2.5 h-2.5" /> Clear Canvas
              </button>
            </div>
            <div className="border border-[#d5ded7] rounded-2xl bg-[#faf8f4] relative h-36 overflow-hidden shadow-inner">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase text-[#526354]">Type Your Full Name</label>
              <input
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                placeholder="Enter your legal signing name"
                className="w-full px-3 py-2 text-xs bg-[#faf8f4] border border-[#d5ded7] text-[#1e3020] placeholder-emerald-800/40 focus:border-lime-700 focus:ring-4 focus:ring-lime-100 transition-all duration-300 rounded-2xl outline-none"
              />
            </div>
            
            {typedName && (
              <div className="p-3 bg-lime-50/10 border border-[#d5ded7]/60 rounded-xl">
                <span className="text-[8px] font-mono text-[#526354]/60 block uppercase mb-1">Cursive Preview:</span>
                <span className="font-serif italic text-lg font-semibold text-[#1e3020] block antialiased tracking-wide">
                  {typedName}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Legal Acknowledgement */}
        <p className="text-[9px] text-[#526354]/70 leading-normal italic text-center">
          By submitting, you agree that your digital signature holds equivalent legal weight to a physical ink signature under common commercial law acts.
        </p>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={submitting || (signMethod === "type" && !typedName.trim())}
          className="w-full py-2.5 bg-lime-700 hover:bg-lime-800 text-[#faf8f4] text-xs font-bold rounded-2xl shadow-[0_4px_12px_rgba(77,124,15,0.15)] transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-40 cursor-pointer"
        >
          {submitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#faf8f4]" /> Submitting Signature...
            </>
          ) : (
            "Submit Authorized Signature"
          )}
        </button>
      </section>
    </PortalLayout>
  );
}

export default function MobileSigningPortal() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f0f4ee] flex flex-col items-center justify-center p-6 text-[#1e3020] font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-lime-700 mb-2" />
        <span className="font-semibold text-xs text-[#526354]">Loading secure signing portal...</span>
      </div>
    }>
      <MobileSigningPortalContent />
    </Suspense>
  );
}

