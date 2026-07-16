import { jsPDF } from "jspdf";
import { SavedContract } from "./types";

export function generatePDF(contract: SavedContract) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  // Get options from contract
  const fontFamily = contract.pdfFont || "times";
  const layout = contract.pdfLayout || "classic";
  
  const margin = layout === "legal" ? 26 : 20;
  const contentWidth = pageWidth - 2 * margin; // 170mm or 158mm

  let y = 25; // start y position

  // Palette config based on layout
  const colors = {
    classic: {
      primary: [24, 24, 27],     // neutral-800
      secondary: [113, 113, 122], // neutral-500
      body: [39, 39, 42],        // neutral-700
      line: [161, 161, 170],      // zinc-400
      accent: [24, 121, 100],     // elegant green for signatures
    },
    modern: {
      primary: [30, 41, 59],      // slate-800
      secondary: [100, 116, 139], // slate-500
      body: [71, 85, 105],       // slate-600
      line: [226, 232, 240],      // slate-200
      accent: [79, 70, 229],      // indigo-600 for signatures
    },
    executive: {
      primary: [15, 23, 42],      // navy-900
      secondary: [71, 85, 105],   // slate-600
      body: [38, 38, 38],         // off-black
      line: [100, 116, 139],      // slate-500
      accent: [220, 38, 38],      // deep red for signatures
    },
    legal: {
      primary: [0, 0, 0],         // black
      secondary: [75, 85, 99],    // gray-600
      body: [17, 24, 39],         // slate-900 (dark text)
      line: [156, 163, 175],      // gray-400
      accent: [0, 0, 128],        // navy blue signature color
    },
  }[layout];

  const setDocFont = (style: "normal" | "bold" | "italic" | "bolditalic" = "normal") => {
    doc.setFont(fontFamily, style);
  };

  const checkPageOverflow = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin - 10) {
      doc.addPage();
      y = 25; // reset y for new page
    }
  };

  const drawPageFooter = (pageNumber: number) => {
    setDocFont("normal");
    doc.setFontSize(8);
    doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    // Centered page count
    doc.text(`Page ${pageNumber}`, pageWidth / 2, pageHeight - 12, { align: "center" });
    doc.text("Generated via FastDraft", pageWidth - margin, pageHeight - 12, { align: "right" });
    
    // Draw fine border or subtle layout lines if Modern or Executive
    if (layout === "modern" || layout === "executive") {
      doc.setDrawColor(colors.line[0], colors.line[1], colors.line[2]);
      doc.setLineWidth(0.2);
      doc.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);
    } else if (layout === "legal") {
      doc.setDrawColor(185, 28, 28); // red-700
      doc.setLineWidth(0.25);
      doc.line(22, 10, 22, pageHeight - 18);
      doc.setLineWidth(0.1);
      doc.line(23.5, 10, 23.5, pageHeight - 18);
      
      // Right vertical line (single fine red line)
      doc.setLineWidth(0.1);
      doc.line(pageWidth - 22, 10, pageWidth - 22, pageHeight - 18);
    }
  };

  const drawHeading = (text: string) => {
    checkPageOverflow(18);
    setDocFont("bold");
    doc.setFontSize(11);
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    
    if (layout === "executive") {
      // Draw a subtle sidebar color block on left of heading
      doc.setFillColor(colors.line[0], colors.line[1], colors.line[2]);
      doc.rect(margin, y - 4, 3, 5, "F");
      doc.text(text.toUpperCase(), margin + 5, y);
      y += 2;
    } else {
      doc.text(text.toUpperCase(), margin, y);
      y += 2.5;
    }

    doc.setDrawColor(colors.line[0], colors.line[1], colors.line[2]);
    doc.setLineWidth(0.4);
    doc.line(margin, y, pageWidth - margin, y);
    
    if (layout === "classic") {
      // Draw a secondary double line
      y += 0.8;
      doc.setLineWidth(0.15);
      doc.line(margin, y, pageWidth - margin, y);
    }
    y += 7;
  };

  const drawParagraph = (text: string, isBold: boolean = false, isItalic: boolean = false, customFontSize?: number) => {
    let fontStyle: "normal" | "bold" | "italic" | "bolditalic" = "normal";
    if (isBold && isItalic) fontStyle = "bolditalic";
    else if (isBold) fontStyle = "bold";
    else if (isItalic) fontStyle = "italic";

    setDocFont(fontStyle);
    doc.setFontSize(customFontSize || 9.5);
    doc.setTextColor(colors.body[0], colors.body[1], colors.body[2]);
    
    const lines = doc.splitTextToSize(text, contentWidth);
    const lineHeight = 5.5;
    const blockHeight = lines.length * lineHeight;
    
    checkPageOverflow(blockHeight + 3);
    
    lines.forEach((line: string) => {
      doc.text(line, margin, y);
      y += lineHeight;
    });
    y += 2.5; // paragraph spacing
  };

  // --- START PDF DRAWING ---
  
  // Custom decorative top border for Executive layout
  if (layout === "executive") {
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.rect(margin, 12, contentWidth, 3, "F");
  }

  // Header / Title
  setDocFont("bold");
  doc.setFontSize(16);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  
  const titleLines = doc.splitTextToSize(contract.title || "Independent Contractor Agreement", contentWidth);
  titleLines.forEach((line: string) => {
    if (layout === "classic" || layout === "legal") {
      // Classic/Legal layouts prefer centered headings
      doc.text(line, pageWidth / 2, y, { align: "center" });
    } else {
      doc.text(line, margin, y);
    }
    y += 7;
  });
  
  y += 1.5;
  setDocFont("normal");
  doc.setFontSize(9);
  doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  
  const effectiveDateText = `Effective Date: ${contract.startDate || "Date of signing"}`;
  if (layout === "classic" || layout === "legal") {
    doc.text(effectiveDateText, pageWidth / 2, y, { align: "center" });
  } else {
    doc.text(effectiveDateText, margin, y);
  }
  y += 10;

  // 1. PARTIES
  drawHeading("1. Parties and Engagement");
  const contractorDetails = `CONTRACTOR:\nName: ${contract.contractorName || "N/A"}${contract.contractorCompany ? ` (${contract.contractorCompany})` : ""}\nEmail: ${contract.contractorEmail || "N/A"}\nAddress: ${contract.contractorAddress || "N/A"}`;
  const clientDetails = `CLIENT:\nName: ${contract.clientName || "N/A"}${contract.clientCompany ? ` (${contract.clientCompany})` : ""}\nEmail: ${contract.clientEmail || "N/A"}\nAddress: ${contract.clientAddress || "N/A"}`;
  
  drawParagraph("This agreement is executed between the Contractor and Client specified below. Both parties agree to execute professional duties in accordance with the specified timeline, compensation structures, and additional covenants.", false, false);
  y += 2;
  
  // Render party details
  drawParagraph(contractorDetails, true, false);
  drawParagraph(clientDetails, true, false);
  y += 3;

  // 2. PROJECT SCOPE & TIMELINE
  drawHeading("2. Project Scope and Timeline");
  drawParagraph("The Contractor agrees to execute and deliver the following specific professional services:", false, true);
  drawParagraph(contract.scope || "No project scope defined.", false, false);
  y += 2;
  drawParagraph(`Timeline:\n- Commencing Date: ${contract.startDate || "Immediately upon signing"}\n- Target Completion: ${contract.endDate || "As specified per milestone approval"}`, true, false);
  y += 3;

  // 3. PAYMENT & RATE
  drawHeading("3. Payment Terms and Compensation");
  drawParagraph(`Rate structure: ${contract.rate || "No rate defined."}`, true, false);
  drawParagraph(`Payment Schedule & Terms:\n${contract.schedule || "To be paid upon milestone completions."}`, false, false);
  y += 3;

  // 4. INTELLECTUAL PROPERTY
  drawHeading("4. Intellectual Property and Ownership");
  drawParagraph(contract.ownership || "The Contractor transfers all intellectual property rights to the Client immediately upon full clearing of the corresponding invoices and balances. The Contractor retains the right to display the final work in portfolio samples.", false, false);
  y += 3;

  // 5. ADDITIONAL CLAUSES
  if (contract.clauses && contract.clauses.length > 0) {
    drawHeading("5. Additional Terms and Covenants");
    contract.clauses.forEach((cl, idx) => {
      drawParagraph(`${idx + 1}. ${cl.title}`, true, false);
      drawParagraph(cl.text, false, false);
      y += 1.5;
    });
    y += 3;
  }

  // 6. SIGNATURES
  drawHeading("6. Signatures and Execution");
  drawParagraph("By writing their names below, both the Contractor and the Client acknowledge that they have read, understood, and agreed to be legally bound by all terms, timelines, and conditions listed in this Agreement.", false, true);
  y += 6;

  // Draw signature boxes side by side
  checkPageOverflow(42);
  
  const boxWidth = (contentWidth - 20) / 2;
  const col1X = margin;
  const col2X = margin + boxWidth + 20;

  // Contractor Sign Box
  doc.setDrawColor(colors.line[0], colors.line[1], colors.line[2]);
  doc.rect(col1X, y, boxWidth, 28);
  setDocFont("normal");
  doc.setFontSize(8);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text("CONTRACTOR SIGNATURE", col1X + 4, y + 4.5);
  
  if (contract.contractorSignatureImage && contract.contractorSignatureImage.startsWith("data:image/")) {
    try {
      // Signature image placement
      doc.addImage(contract.contractorSignatureImage, "PNG", col1X + 5, y + 6, boxWidth - 10, 14);
    } catch (err) {
      console.error("Failed to render contractor image signature in PDF", err);
      // Fallback
      doc.setFont("courier", "italic");
      doc.setFontSize(11);
      doc.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2]);
      doc.text(contract.contractorSignature || "Signed", col1X + 6, y + 16);
    }
  } else if (contract.contractorSignature) {
    doc.setFont("courier", "italic");
    doc.setFontSize(11);
    doc.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2]);
    doc.text(contract.contractorSignature, col1X + 6, y + 16);
  }
  
  setDocFont("normal");
  doc.setFontSize(7.5);
  doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  doc.text(`Date: ${contract.signDate || contract.startDate || "Date of signing"}`, col1X + 4, y + 24);

  // Client Sign Box
  doc.setDrawColor(colors.line[0], colors.line[1], colors.line[2]);
  doc.rect(col2X, y, boxWidth, 28);
  setDocFont("normal");
  doc.setFontSize(8);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text("CLIENT SIGNATURE", col2X + 4, y + 4.5);
  
  if (contract.clientSignatureImage && contract.clientSignatureImage.startsWith("data:image/")) {
    try {
      doc.addImage(contract.clientSignatureImage, "PNG", col2X + 5, y + 6, boxWidth - 10, 14);
    } catch (err) {
      console.error("Failed to render client image signature in PDF", err);
      doc.setFont("courier", "italic");
      doc.setFontSize(11);
      doc.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2]);
      doc.text(contract.clientSignature || "Signed", col2X + 6, y + 16);
    }
  } else if (contract.clientSignature) {
    doc.setFont("courier", "italic");
    doc.setFontSize(11);
    doc.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2]);
    doc.text(contract.clientSignature, col2X + 6, y + 16);
  }
  
  setDocFont("normal");
  doc.setFontSize(7.5);
  doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  doc.text(`Date: ${contract.signDate || contract.startDate || "Date of signing"}`, col2X + 4, y + 24);

  // Draw final page footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawPageFooter(i);
  }

  // Save PDF
  const safeTitle = (contract.title || "contract").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  doc.save(`${safeTitle}.pdf`);
}
