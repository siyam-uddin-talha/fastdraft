import { CONTRACT_TEMPLATES } from "./templates";
import { SITE } from "./seo";

export interface ContractPageConfig {
  slug: string;
  templateId?: string;
  category?: string;
  title: string;
  description: string;
  h1Title: string;
  heroDescription: string;
  keywords: string[];
}

/** Explicit High-Intent SEO Slug Mappings (including top "free ..." queries) */
const KEYWORD_SEO_PAGES: Record<string, ContractPageConfig> = {
  // --- GENERAL FREELANCE & CONTRACT CREATOR SLUGS ---
  "freelance-contract-generator": {
    slug: "freelance-contract-generator",
    title: "Free Freelance Contract Generator - Instant PDF Agreements | FastDraft",
    description: "Create, customize, sign, and download legally formatted freelance contracts for web development, design, writing, and consulting. 100% free and private.",
    h1Title: "Free Freelance Contract Generator",
    heroDescription: "Draft professional micro-contracts for clients in seconds. Pick a template, customize project scope & payment terms, sign online, and export to PDF.",
    keywords: [
      "freelance contract generator",
      "free contract creator",
      "freelance agreement template",
      "sign contract online free",
      "micro contract generator"
    ]
  },
  "free-contract-generator": {
    slug: "free-contract-generator",
    title: "Free Contract Generator Online - Instant PDF Download | FastDraft",
    description: "100% free online contract generator with digital signatures and instant PDF export. No sign-up or credit card required.",
    h1Title: "Free Online Contract Generator",
    heroDescription: "Create binding freelance contracts, service agreements, and NDAs for free. Browser-based, secure, and instant PDF download.",
    keywords: [
      "free contract generator",
      "free contract builder",
      "free online contract maker",
      "create contract for free"
    ]
  },
  "free-freelance-contract": {
    slug: "free-freelance-contract",
    title: "Free Freelance Contract Creator & Signer | FastDraft",
    description: "Build a free freelance contract in minutes. Customize scope, milestones, rates, and intellectual property terms securely.",
    h1Title: "Free Freelance Contract Builder",
    heroDescription: "Draft, digitally sign, and download free freelance agreements. Stored securely on your device with client-side privacy.",
    keywords: [
      "free freelance contract",
      "free freelance agreement creator",
      "free gig contract",
      "freelance work agreement free"
    ]
  },
  "free-contract-creator": {
    slug: "free-contract-creator",
    title: "Free Contract Creator & Digital Signer | FastDraft",
    description: "Create legal contract agreements for free with built-in digital signing and instant PDF downloading. Stored securely on your device.",
    h1Title: "Free Contract Creator & Signer",
    heroDescription: "Create, format, and sign legal contract agreements online for free. No credit card, no account required.",
    keywords: [
      "free contract creator",
      "contract maker online",
      "create agreement pdf",
      "digital signature contract"
    ]
  },
  "free-contract-builder": {
    slug: "free-contract-builder",
    title: "Free Online Contract Builder - Micro-Contracts in Seconds | FastDraft",
    description: "Simple online contract builder for independent contractors and freelancers. 100% free with clean PDF layouts.",
    h1Title: "Free Online Contract Builder",
    heroDescription: "Build simple contracts online for free. Custom legal clauses, deposit terms, and visual e-signature signing.",
    keywords: [
      "free contract builder",
      "online contract maker free",
      "free micro-contract builder",
      "contract creator pdf"
    ]
  },
  "free-contract-templates": {
    slug: "free-contract-templates",
    title: "100+ Free Contract Templates & Generator | FastDraft",
    description: "Browse 100+ free contract templates for freelancers, developers, designers, copywriters, and consultants. Customize and download PDF.",
    h1Title: "100+ Free Contract Templates",
    heroDescription: "Explore our library of free contract templates across development, design, marketing, audio, video, and consulting.",
    keywords: [
      "free contract templates",
      "free agreement templates",
      "freelance contract templates free",
      "download free contract pdf"
    ]
  },

  // --- CONTRACTOR & BUSINESS AGREEMENT SLUGS ---
  "independent-contractor-agreement": {
    slug: "independent-contractor-agreement",
    templateId: "business-consulting",
    title: "Independent Contractor Agreement Generator - Free PDF Builder | FastDraft",
    description: "Build a legally structured independent contractor agreement online. Instant PDF export, built-in digital signature, zero signup required.",
    h1Title: "Independent Contractor Agreement Builder",
    heroDescription: "Define clear scope of work, intellectual property transfer, milestone payment schedules, and legal terms for contractors.",
    keywords: [
      "independent contractor agreement",
      "contractor agreement generator",
      "free contractor contract",
      "1099 contract template"
    ]
  },
  "free-independent-contractor-agreement": {
    slug: "free-independent-contractor-agreement",
    templateId: "business-consulting",
    title: "Free Independent Contractor Agreement Generator | FastDraft",
    description: "Generate a free independent contractor agreement for 1099 workers, freelancers, and businesses. Download instant PDF.",
    h1Title: "Free Independent Contractor Agreement",
    heroDescription: "Create a free 1099 contractor agreement. Set payment schedules, work scope, confidentiality, and termination terms.",
    keywords: [
      "free independent contractor agreement",
      "free 1099 contract generator",
      "free contractor agreement maker",
      "contractor agreement pdf free"
    ]
  },
  "micro-contract-generator": {
    slug: "micro-contract-generator",
    title: "Micro-Contract Generator - Fast, Secure & Free | FastDraft",
    description: "Draft simple, binding micro-contracts for short-term gigs, freelance projects, and small client engagements directly in your browser.",
    h1Title: "Simple Micro-Contract Generator",
    heroDescription: "Clean, fast, and simple micro-contracts without bloated legalese. Ideal for quick freelance jobs and short-term work.",
    keywords: [
      "micro-contract",
      "micro contract generator",
      "simple contract maker",
      "quick contract builder"
    ]
  },
  "free-micro-contract": {
    slug: "free-micro-contract",
    title: "Free Micro-Contract Generator & PDF Export | FastDraft",
    description: "Draft short, simple micro-contracts for free. Fast digital signing and PDF download with zero server uploads.",
    h1Title: "Free Micro-Contract Generator",
    heroDescription: "Create simple micro-contracts for one-off projects and quick client jobs in less than 2 minutes.",
    keywords: [
      "free micro contract",
      "free short contract",
      "free simple agreement",
      "quick freelance contract free"
    ]
  },

  // --- NDA & SERVICE AGREEMENTS ---
  "nda-generator": {
    slug: "nda-generator",
    templateId: "general-nda",
    category: "Legal",
    title: "Non-Disclosure Agreement (NDA) Generator - Free & Private | FastDraft",
    description: "Draft a mutual or unilateral non-disclosure agreement (NDA) online. Protect confidential business data, trade secrets, and IP.",
    h1Title: "Non-Disclosure Agreement (NDA) Generator",
    heroDescription: "Protect proprietary technology and sensitive business info with a clean, legally structured NDA agreement.",
    keywords: [
      "nda generator",
      "non disclosure agreement template",
      "free nda generator",
      "confidentiality agreement maker"
    ]
  },
  "free-nda-generator": {
    slug: "free-nda-generator",
    templateId: "general-nda",
    category: "Legal",
    title: "Free Non-Disclosure Agreement (NDA) Generator | FastDraft",
    description: "Generate a free non-disclosure agreement (NDA) online. Protect client trade secrets, source code, and confidential data.",
    h1Title: "Free NDA Generator & E-Signer",
    heroDescription: "Create and sign a free Non-Disclosure Agreement (NDA) in seconds. 100% private browser processing.",
    keywords: [
      "free nda generator",
      "free non disclosure agreement",
      "free confidentiality agreement",
      "free nda pdf"
    ]
  },
  "consulting-agreement-template": {
    slug: "consulting-agreement-template",
    templateId: "business-consulting",
    category: "Consulting",
    title: "Consulting Agreement Generator & Template | FastDraft",
    description: "Create strategic business and technical consulting agreements. Specify hourly rates or monthly retainers, scope of work, and liability caps.",
    h1Title: "Consulting Service Agreement Generator",
    heroDescription: "Protect your consulting practice with professional service terms, payment milestones, and intellectual property protection.",
    keywords: [
      "consulting agreement template",
      "consulting contract generator",
      "freelance consultant contract",
      "consulting retainer contract"
    ]
  },
  "free-consulting-agreement": {
    slug: "free-consulting-agreement",
    templateId: "business-consulting",
    category: "Consulting",
    title: "Free Consulting Agreement Generator & Signer | FastDraft",
    description: "100% free consulting agreement generator for business, management, and technical consultants. Download PDF instantly.",
    h1Title: "Free Consulting Agreement Generator",
    heroDescription: "Draft free consulting contracts with retainer schedules, hourly billing rates, and scope boundaries.",
    keywords: [
      "free consulting agreement",
      "free consultant contract maker",
      "free consulting contract pdf",
      "consulting service agreement free"
    ]
  },
  "free-service-agreement": {
    slug: "free-service-agreement",
    title: "Free Service Agreement Generator & PDF Maker | FastDraft",
    description: "Draft a free master service agreement or general service contract for clients. Digital signature and instant PDF download.",
    h1Title: "Free Service Agreement Generator",
    heroDescription: "Create free general service agreements for any professional trade or service business.",
    keywords: [
      "free service agreement",
      "free master service agreement",
      "free service contract maker",
      "service agreement pdf free"
    ]
  },

  // --- DESIGN & DEVELOPMENT SLUGS ---
  "web-design-contract-template": {
    slug: "web-design-contract-template",
    templateId: "web-design",
    category: "Design",
    title: "Freelance Web Design Contract Generator | FastDraft",
    description: "Generate comprehensive web design contracts with built-in revision policies, Figma deliverable terms, and asset ownership clauses.",
    h1Title: "Web Design Contract Generator",
    heroDescription: "Specify layout deliverables, wireframe rounds, revision caps, and portfolio rights in minutes.",
    keywords: [
      "web design contract template",
      "freelance web designer agreement",
      "figma design contract",
      "ui ux design contract"
    ]
  },
  "free-web-design-contract": {
    slug: "free-web-design-contract",
    templateId: "web-design",
    category: "Design",
    title: "Free Web Design Contract Generator & Signer | FastDraft",
    description: "100% free contract generator for freelance web designers. Custom Figma scopes, revision policies, and IP transfer.",
    h1Title: "Free Web Design Contract Generator",
    heroDescription: "Draft free web design agreements with clear milestone payments, deposit terms, and client revision limits.",
    keywords: [
      "free web design contract",
      "free freelance web design agreement",
      "free web designer contract pdf",
      "free website contract maker"
    ]
  },
  "software-development-agreement": {
    slug: "software-development-agreement",
    templateId: "frontend-dev",
    category: "Development",
    title: "Software & Web Development Agreement Builder | FastDraft",
    description: "Build custom software development agreements with code ownership transfer, repository access, and quality warranty clauses.",
    h1Title: "Software Development Contract Builder",
    heroDescription: "Set hourly or fixed milestone rates for frontend, backend, or full-stack software development projects.",
    keywords: [
      "software development agreement",
      "freelance developer contract",
      "web development contract template",
      "coding agreement"
    ]
  },
  "free-software-development-agreement": {
    slug: "free-software-development-agreement",
    templateId: "frontend-dev",
    category: "Development",
    title: "Free Software Development Agreement Builder | FastDraft",
    description: "Free software development contract creator for programmers, coders, and agencies. Instant browser PDF export.",
    h1Title: "Free Software Development Contract",
    heroDescription: "Create free software engineering contracts with code IP transfer, bug warranty periods, and hourly billing.",
    keywords: [
      "free software development agreement",
      "free developer contract creator",
      "free coding contract pdf",
      "free software contract"
    ]
  },
  "graphic-design-contract": {
    slug: "graphic-design-contract",
    templateId: "graphic-retainer",
    category: "Design",
    title: "Graphic Design Contract & Retainer Generator | FastDraft",
    description: "Draft graphic design retainer contracts and project agreements for branding, logos, social graphics, and decks.",
    h1Title: "Graphic Design Agreement Generator",
    heroDescription: "Define monthly design retainers, scope of work, vector file ownership, and revisions.",
    keywords: [
      "graphic design contract",
      "design retainer contract",
      "logo design contract template",
      "freelance designer agreement"
    ]
  },
  "free-graphic-design-contract": {
    slug: "free-graphic-design-contract",
    templateId: "graphic-retainer",
    category: "Design",
    title: "Free Graphic Design Contract Generator | FastDraft",
    description: "Draft free graphic design contracts and monthly retainers. Custom vector asset ownership and revision terms.",
    h1Title: "Free Graphic Design Contract",
    heroDescription: "Protect your graphic design business with free agreement templates, digital signatures, and PDF downloads.",
    keywords: [
      "free graphic design contract",
      "free design retainer agreement",
      "free designer contract maker",
      "graphic design agreement pdf free"
    ]
  },
  "copywriting-contract": {
    slug: "copywriting-contract",
    templateId: "copywriting-seo",
    category: "Writing",
    title: "SEO Copywriting & Content Writing Contract Generator | FastDraft",
    description: "Generate content writing and copywriting agreements with originality guarantees, copyright transfer, and revision limits.",
    h1Title: "Copywriting & Content Contract Generator",
    heroDescription: "Protect your writing work with explicit word counts, keyword targets, plagiarism warranties, and payment milestones.",
    keywords: [
      "copywriting contract generator",
      "freelance writing agreement",
      "content writing contract template",
      "seo writer contract"
    ]
  },
  "free-copywriting-contract": {
    slug: "free-copywriting-contract",
    templateId: "copywriting-seo",
    category: "Writing",
    title: "Free Copywriting Contract Generator & Signer | FastDraft",
    description: "Create free copywriting and blog writing contracts. Originality warranties, payment terms, and copyright transfer included.",
    h1Title: "Free Copywriting Contract Generator",
    heroDescription: "Draft free contracts for freelance writers, bloggers, and copywriters in seconds.",
    keywords: [
      "free copywriting contract",
      "free content writer contract",
      "free freelance writing agreement",
      "copywriting contract free pdf"
    ]
  },
  "video-editing-contract": {
    slug: "video-editing-contract",
    templateId: "video-editing",
    category: "Video",
    title: "Video Editing Agreement & Contract Generator | FastDraft",
    description: "Create video editing contracts with post-production terms, raw footage buyout fees, showreel display rights, and turnarounds.",
    h1Title: "Video Editing Contract Generator",
    heroDescription: "Cover YouTube, commercial, or short-form video editing projects with clear revision limits and export terms.",
    keywords: [
      "video editing contract",
      "freelance video editor agreement",
      "video production contract template",
      "post production contract"
    ]
  },
  "free-video-editing-contract": {
    slug: "free-video-editing-contract",
    templateId: "video-editing",
    category: "Video",
    title: "Free Video Editing Contract Generator | FastDraft",
    description: "Draft free video editing contracts with post-production terms, render turnarounds, and revision caps.",
    h1Title: "Free Video Editing Contract Generator",
    heroDescription: "Generate free agreements for YouTube video editing, commercial post-production, and content creation.",
    keywords: [
      "free video editing contract",
      "free video editor agreement",
      "free post production contract",
      "video editing contract free pdf"
    ]
  }
};

/** Build comprehensive CONTRACT_PAGES incorporating all 100+ templates + 'free-' variants */
function buildAllPages(): Record<string, ContractPageConfig> {
  const pages: Record<string, ContractPageConfig> = { ...KEYWORD_SEO_PAGES };

  CONTRACT_TEMPLATES.forEach((template) => {
    // 1. Primary slug based on template ID (e.g., /web-design)
    const primarySlug = template.id;
    if (!pages[primarySlug]) {
      pages[primarySlug] = {
        slug: primarySlug,
        templateId: template.id,
        category: template.category,
        title: `${template.title} Generator - Free PDF Export | FastDraft`,
        description: `Draft, customize, sign, and export a professional ${template.title} in seconds. 100% free, browser-based contract builder.`,
        h1Title: `${template.title} Generator`,
        heroDescription: `Generate a legally structured ${template.title} instantly. Pre-filled terms, custom scope of work, digital signature, and browser PDF export.`,
        keywords: [
          template.id,
          template.title.toLowerCase(),
          `${template.category.toLowerCase()} contract`,
          "freelance agreement generator",
          "free contract maker",
          "micro contract pdf"
        ]
      };
    }

    // 2. Free prefix variant slug (e.g., /free-web-design)
    const freeSlug = `free-${template.id}`;
    if (!pages[freeSlug]) {
      pages[freeSlug] = {
        slug: freeSlug,
        templateId: template.id,
        category: template.category,
        title: `Free ${template.title} Generator & Signer | FastDraft`,
        description: `Create a free ${template.title} online. Digital signature, custom scope, payment milestone terms, and instant PDF download.`,
        h1Title: `Free ${template.title} Generator`,
        heroDescription: `Draft a 100% free ${template.title}. Pre-filled clauses, instant e-signatures, and browser-powered PDF export with total privacy.`,
        keywords: [
          `free ${template.id}`,
          `free ${template.title.toLowerCase()}`,
          `free ${template.category.toLowerCase()} contract`,
          "free contract creator",
          "free contract pdf export"
        ]
      };
    }
  });

  return pages;
}

export const CONTRACT_PAGES = buildAllPages();

export function getContractPageConfig(slug: string): ContractPageConfig | undefined {
  return CONTRACT_PAGES[slug];
}
