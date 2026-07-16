import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css'; // Global styles
import { ToastProvider } from '@/hooks/useToast';
import { OWNER, SITE, absoluteUrl, ogImageUrl } from '@/lib/seo';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const ogImages = [
  {
    url: SITE.ogImage.path,
    secureUrl: ogImageUrl(),
    width: SITE.ogImage.width,
    height: SITE.ogImage.height,
    alt: SITE.ogImage.alt,
    type: SITE.ogImage.type,
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline} | ${OWNER.name}`,
    template: `%s · ${SITE.name} by ${OWNER.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: OWNER.name, url: OWNER.url }],
  creator: OWNER.name,
  publisher: OWNER.name,
  category: "business",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    siteName: `${SITE.name} · ${SITE.host}`,
    title: `${SITE.name} — Independent contractor agreements`,
    description: SITE.description,
    images: ogImages,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Independent contractor agreements`,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage.path,
        width: SITE.ogImage.width,
        height: SITE.ogImage.height,
        alt: SITE.ogImage.alt,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  other: {
    "application-name": SITE.name,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${OWNER.url}#organization`,
      name: OWNER.name,
      url: OWNER.url,
      email: OWNER.email,
      description: OWNER.description,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
      sameAs: [OWNER.url],
    },
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}#website`,
      name: SITE.name,
      alternateName: ["FastDraft by Sutio", SITE.host],
      url: absoluteUrl("/"),
      description: SITE.description,
      inLanguage: "en-US",
      publisher: { "@id": `${OWNER.url}#organization` },
      isPartOf: {
        "@type": "WebSite",
        name: OWNER.name,
        url: OWNER.url,
      },
      image: ogImageUrl(),
    },
    {
      "@type": "WebApplication",
      "@id": `${absoluteUrl("/")}#app`,
      name: SITE.name,
      url: absoluteUrl("/"),
      image: ogImageUrl(),
      screenshot: ogImageUrl(),
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "ContractManagementApplication",
      operatingSystem: "Web Browser",
      browserRequirements: "Requires JavaScript",
      description: SITE.description,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      creator: { "@id": `${OWNER.url}#organization` },
      publisher: { "@id": `${OWNER.url}#organization` },
      isAccessibleForFree: true,
      featureList: [
        "Generate micro-contracts on-demand",
        "Digitally sign agreements securely",
        "Format PDF layouts",
        "Download legally structured PDF files",
        "Stored securely on your device",
        "No signup required",
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: SITE.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      url: absoluteUrl("/"),
      image: ogImageUrl(),
      description: SITE.description,
      author: { "@id": `${OWNER.url}#organization` },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: OWNER.name,
          item: OWNER.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: SITE.name,
          item: absoluteUrl("/"),
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning suppressContentEditableWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ToastProvider>
          {children}
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  );
}
