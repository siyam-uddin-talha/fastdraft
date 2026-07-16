export interface SavedContract {
  id: string;
  title: string;
  category: string;
  contractorName: string;
  contractorCompany: string;
  contractorEmail: string;
  contractorAddress: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientAddress: string;
  projectName: string;
  scope: string;
  startDate: string;
  endDate: string;
  rate: string;
  schedule: string;
  ownership: string;
  clauses: { title: string; text: string }[];
  contractorSignature: string;
  contractorSignatureImage?: string; // base64 representation of uploaded/drawn signature
  clientSignature: string;
  clientSignatureImage?: string; // base64 representation of uploaded/drawn signature
  signDate: string;
  createdAt: string;
  pdfLayout?: "classic" | "modern" | "executive" | "legal";
  pdfFont?: "times" | "helvetica" | "courier";
}
