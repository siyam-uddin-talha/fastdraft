/** Shared site SEO + ownership constants for FastDraft */

export const OWNER = {
  name: "Sutio",
  legalName: "Sutio",
  url: "https://www.sutio.co/",
  email: "siyam.uddin.talha@gmail.com",
  description:
    "Sutio builds web apps, mobile and desktop software, LLM products, and bespoke systems for startups and enterprises.",
} as const;

/** Canonical product domain (Sutio subdomain). Override with NEXT_PUBLIC_SITE_URL if needed. */
export const DEFAULT_SITE_URL = "https://fastdraft.sutio.co";

export const SITE = {
  name: "FastDraft",
  host: "fastdraft.sutio.co",
  tagline: "Free Micro-Contract & Independent Contractor Agreement Generator",
  description:
    "Draft, sign, format, and download contract agreements securely in seconds. FastDraft at fastdraft.sutio.co — a Sutio product. Stored securely on your device, PDF export, no signup required.",
  keywords: [
    "independent contractor agreement",
    "contract generator",
    "micro-contract",
    "freelance contract",
    "draft agreement",
    "sign contract online",
    "contract builder",
    "FastDraft",
    "fastdraft.sutio.co",
    "Sutio",
    "free contract creator",
  ],
  get url() {
    return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
  },
  /** Social / link preview image (Open Graph + Twitter) */
  ogImage: {
    path: "/og.png",
    width: 1730,
    height: 909,
    alt: "FastDraft — Free micro-contract and independent contractor agreement generator. Draft, sign, and download safely.",
    type: "image/png",
  },
} as const;

export function absoluteUrl(path = "/") {
  const base = SITE.url;
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function ogImageUrl() {
  return absoluteUrl(SITE.ogImage.path);
}
