# FastDraft — Gig Agreement & Micro-Contract Generator

FastDraft is a secure, responsive, and modern web application built with Next.js 15, React 19, and Tailwind CSS. It is designed to generate, format, digitally sign, and download legally structured independent contractor agreements and micro-contracts instantly.

<div align="center">
  <img src="/og.png" alt="FastDraft Preview" width="100%" style="border-radius: 20px; border: 1px solid #d5ded7;" />
</div>

---

## Key Features

- **Step-by-Step Draft Generation**: Fill out detailed contract parameters step-by-step (Contractor & Client details, Project scope, Payment rates, Payment schedule, Intellectual Property ownership).
- **Gemini AI-Powered Clause Assistant**: Instantly generate professional, custom legal clauses using the integrated Gemini API directly inside your browser.
- **Tailwind-Customized Date Pickers**: Replaced standard browser inputs with a premium, responsive, custom-built calendar picker.
- **Offline-First Secure History**: Drafts are automatically stored securely on your local browser using IndexedDB. You can load, edit, or delete past agreements at any time.
- **Digital Signatures**: Execute signatures directly within the browser using a signature pad, or upload signature images.
- **PDF Customization & Export**: Export contracts to PDFs utilizing multiple layouts (Classic, Modern, Executive, Legal) and system fonts (Times, Helvetica, Courier).
- **Advanced SEO & Analytics**: Ready for production with metadata bases, OpenGraph / Twitter cards, dynamic `robots.txt`/`sitemap.xml` routes, Schema.org JSON-LD web schemas, and Vercel Analytics.

---

## Tech Stack

- **Core**: [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Transitions & Animations**: [Motion](https://motion.dev/)
- **Database/Local Storage**: IndexedDB (via local helper wrapper)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF)
- **AI Integration**: [Google GenAI SDK](https://github.com/google/generative-ai-js)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Analytics**: [@vercel/analytics](https://vercel.com/docs/analytics)

---

## Getting Started

### Prerequisites

- **Node.js**: `v20.x` or later
- **Package Manager**: `pnpm` (recommended), `npm`, or `bun`

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/siyam-uddin-talha/fastdraft.git
   cd fastdraft/frontend
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and define your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

5. **Build for production**:
   ```bash
   pnpm build
   pnpm start
   ```

---

## License & Ownership

FastDraft is built and maintained by **[Sutio](https://www.sutio.co/)**.
All rights reserved.
