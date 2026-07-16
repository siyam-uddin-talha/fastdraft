import { NextRequest, NextResponse } from "next/server";

// Keep in-memory signatures on the active container.
// This is perfect for the preview environment, allowing immediate synchronization.
interface SignatureData {
  contractorSignature?: string;
  contractorSignatureImage?: string;
  clientSignature?: string;
  clientSignatureImage?: string;
  signDate?: string;
  // contract metadata
  title?: string;
  contractorName?: string;
  contractorCompany?: string;
  clientName?: string;
  clientCompany?: string;
  scope?: string;
  rate?: string;
}

const activeSignatures = new Map<string, SignatureData>();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing contract id parameter" }, { status: 400 });
  }

  const sigData = activeSignatures.get(id) || {};
  return NextResponse.json({ success: true, data: sigData });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, type, signatureText, signatureImage, signDate, metadata } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing contract id parameter" }, { status: 400 });
    }

    // Retrieve or initialize signature data for this contract
    const current = activeSignatures.get(id) || {};

    if (type === "metadata" && metadata) {
      current.title = metadata.title || current.title;
      current.contractorName = metadata.contractorName || current.contractorName;
      current.contractorCompany = metadata.contractorCompany || current.contractorCompany;
      current.clientName = metadata.clientName || current.clientName;
      current.clientCompany = metadata.clientCompany || current.clientCompany;
      current.scope = metadata.scope || current.scope;
      current.rate = metadata.rate || current.rate;
    } else if (type === "contractor") {
      if (signatureText !== undefined) current.contractorSignature = signatureText;
      if (signatureImage !== undefined) current.contractorSignatureImage = signatureImage;
    } else if (type === "client") {
      if (signatureText !== undefined) current.clientSignature = signatureText;
      if (signatureImage !== undefined) current.clientSignatureImage = signatureImage;
    }

    if (signDate) {
      current.signDate = signDate;
    } else if (!current.signDate) {
      current.signDate = new Date().toISOString().split("T")[0];
    }

    activeSignatures.set(id, current);

    // Keep memory clean by removing very old entries if the map gets too large (> 1000)
    if (activeSignatures.size > 1000) {
      const keys = Array.from(activeSignatures.keys());
      for (let i = 0; i < 100; i++) {
        activeSignatures.delete(keys[i]);
      }
    }

    return NextResponse.json({ success: true, message: "Signature saved successfully", data: current });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
