# Thesis — AI-Powered VC Deal Flow Intelligence

**Live Demo:** [trythesis.vercel.app](https://trythesis.vercel.app)

Thesis is a full-stack venture capital deal flow tool that lets investors upload pitch decks and get instant, structured AI analysis scored against their own investment thesis. Instead of spending 45 minutes reading a deck, a VC can upload the PDF and get a scored breakdown — market size, team, traction, red flags — in seconds, calibrated to what *they* actually care about.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 13.5.7 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.4.1 |
| Animations | Framer Motion | 12.38.0 |
| AI | Anthropic Claude API (`claude-3-5-sonnet`) | SDK 0.95.2 |
| Database | Supabase (PostgreSQL) | JS SDK 2.x |
| Deployment | Vercel | — |
| Charts | Recharts | 3.8.1 |

---

## Architecture

```
PDF Upload
    │
    ▼
/api/analyze (Next.js Route Handler)
    │  • Receives: base64 PDF + thesis config
    │  • Sends PDF as native document block to Claude
    │  • Claude extracts structured JSON (company, market, team, traction, red flags)
    │  • scoreThesisFit() weights scores against user's thesis criteria
    │  • Persists deal + analysis to Supabase
    │
    ▼
Frontend (Pipeline Board / Deal Detail)
    │  • Kanban board with drag-friendly deal cards
    │  • Deal detail: scored breakdown, red flags, AI-detected signals
    │
    ▼
/api/memo (Next.js Route Handler)
       • Receives: structured analysis + thesis scores
       • Sends to Claude to generate a full IC memo
       • Returns formatted markdown memo ready to share
```

---

## API Routes

### `POST /api/analyze`

Accepts a raw pitch deck PDF and the investor's thesis configuration. Returns a fully structured deal analysis scored against the thesis.

**Request:**
```json
{
  "pdf": "<base64-encoded PDF>",
  "filename": "acme-series-a.pdf",
  "thesisConfig": {
    "stages": ["Seed", "Series A"],
    "sectors": ["B2B SaaS", "Infrastructure"],
    "criteria": [
      { "name": "Market Size", "weight": 0.25 },
      { "name": "Team", "weight": 0.30 },
      { "name": "Traction", "weight": 0.25 },
      { "name": "Defensibility", "weight": 0.20 }
    ]
  }
}
```

**Response:**
```json
{
  "dealId": "deal-abc123",
  "deal": {
    "companyName": "Acme Corp",
    "stage": "Series A",
    "sector": "B2B SaaS",
    "oneLiner": "Automated compliance for fintech"
  },
  "analysis": {
    "problem": "...",
    "solution": "...",
    "businessModel": "...",
    "market": { "tam": "$12B", "sam": "$2B", "som": "$150M" },
    "traction": ["3x YoY growth", "$1.2M ARR"],
    "team": [...],
    "redFlags": ["High churn risk in SMB segment"],
    "rawHighlights": [...]
  },
  "thesisScores": {
    "Market Size": 8.2,
    "Team": 9.0,
    "Traction": 7.5,
    "Defensibility": 6.8
  },
  "overallThesisScore": 8.1
}
```

---

### `POST /api/memo`

Takes a structured deal analysis and generates a full Investment Committee memo.

**Request:**
```json
{
  "dealId": "deal-abc123",
  "analysis": { ... },
  "thesisScores": { ... },
  "overallThesisScore": 8.1,
  "thesisConfig": { ... }
}
```

**Response:**
```json
{
  "dealId": "deal-abc123",
  "memoContent": "# Investment Memo: Acme Corp\n\n## Recommendation: PURSUE\n\n..."
}
```

---

## How Claude Reads PDFs Natively

Thesis sends PDFs directly to Claude as **document content blocks** — no parsing libraries, no text extraction, no PDF-to-image conversion. Claude reads the raw binary.

```typescript
const response = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 4096,
  system: ANALYSIS_SYSTEM_PROMPT,
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'document',
          source: {
            type: 'base64',
            media_type: 'application/pdf',
            data: base64PdfString,
          },
        },
        {
          type: 'text',
          text: 'Analyze this pitch deck and return structured JSON per the schema.',
        },
      ],
    },
  ],
});
```

This means Claude sees tables, charts, embedded images, and formatted text exactly as an investor would — no information lost in extraction.

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
ANTHROPIC_API_KEY=sk-ant-...

# Optional — app works without these (deals stored in memory only)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

---

## Local Setup

```bash
# Clone the repo
git clone https://github.com/Superman752/thesis-app.git
cd thesis-app

# Install dependencies
npm install --legacy-peer-deps

# Add environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** The app runs on Node 17. The dev script uses `--max-old-space-size=4096` to prevent SWC compiler OOM crashes during hot reload.

---

## Project Structure

```
thesis/
├── app/
│   ├── page.tsx              # Landing page
│   ├── login/page.tsx        # Auth / onboarding
│   ├── app/
│   │   ├── page.tsx          # Pipeline board (Kanban + Table)
│   │   ├── deal/[id]/page.tsx # Deal detail with scored analysis
│   │   ├── upload/page.tsx   # PDF upload + analysis flow
│   │   ├── thesis/page.tsx   # Investment thesis configuration
│   │   └── settings/page.tsx # Firm settings
│   └── api/
│       ├── analyze/route.ts  # PDF → Claude → structured analysis
│       └── memo/route.ts     # Analysis → Claude → IC memo
├── components/
│   ├── Navigation.tsx        # Sidebar nav
│   ├── DealCard.tsx          # Pipeline deal card
│   └── PipelineBoard.tsx     # Kanban board
├── lib/
│   ├── prompts.ts            # Claude system prompts + JSON schema
│   ├── scoring.ts            # Thesis fit scoring logic
│   └── supabase.ts           # Supabase client
└── types/
    └── deal.ts               # TypeScript types for deals + analysis
```

---

## Built With

- [Next.js](https://nextjs.org/) — App Router, Server Components, Route Handlers
- [Anthropic Claude](https://anthropic.com/) — PDF analysis + memo generation
- [Supabase](https://supabase.com/) — Deal persistence
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Vercel](https://vercel.com/) — Deployment
