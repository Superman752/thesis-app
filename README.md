# Thesis — AI-Powered VC Deal Flow Intelligence

**Live Demo → [trythesis.vercel.app](https://trythesis.vercel.app)**

Thesis is a full-stack venture capital deal flow tool that lets investors upload pitch decks and receive instant, structured analysis scored against their own investment thesis. Instead of spending 45 minutes reading a deck, a VC uploads the PDF and gets a scored breakdown — market size, team, traction, red flags, AI-detection signals — in seconds, calibrated to what *they* actually care about. The output includes a complete Investment Committee memo, ready to share or file.

---

## Architecture

```
Investor uploads PDF
        │
        ▼
  Next.js Frontend
  (App Router, TypeScript)
        │
        ├─── POST /api/analyze ──────────────────────────────────┐
        │        Receives: base64 PDF + ThesisConfig              │
        │        Sends PDF as native document content block        │
        │        to Claude (ANALYSIS_SYSTEM_PROMPT)               │
        │        Claude returns: structured DealAnalysis JSON      │
        │        scoreThesisFit() calls Claude per criterion       │
        │        (SCORING_SYSTEM_PROMPT, parallel Promise.all)     │
        │        Persists deal + scores to Supabase               │
        │        Returns: { dealId, deal, thesisScores,           │
        │                   overallThesisScore }                   │
        │                                                         │
        ├─── POST /api/memo ──────────────────────────────────────┤
        │        Receives: dealId + structured DealAnalysis        │
        │        Sends analysis + thesis scores to Claude          │
        │        (MEMO_SYSTEM_PROMPT)                              │
        │        Returns: MemoContent JSON (8 structured fields)   │
        │                                                         │
        └─── Supabase ────────────────────────────────────────────┘
                 Deals table: full deal + analysis + scores
                 Gracefully no-ops if keys not set (in-memory)
```

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 13.5.7 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.4.1 |
| Animations | Framer Motion | 12.38.0 |
| AI | Anthropic Claude API | SDK 0.95.2 |
| AI Model | `claude-sonnet-4-20250514` | — |
| Database | Supabase (PostgreSQL) | JS SDK 2.x |
| Charts | Recharts | 3.8.1 |
| Deployment | Vercel | — |

---

## API Routes

### `POST /api/analyze`

Accepts a raw pitch deck and the investor's thesis configuration. Returns a fully structured deal analysis scored against every thesis criterion.

**Request body:**
```typescript
{
  pdf: string;           // base64-encoded PDF
  filename: string;
  thesisConfig: ThesisConfig;
}
```

**Response:**
```typescript
{
  dealId: string;
  deal: Deal;            // full persisted deal record
  analysis: DealAnalysis;
  thesisScores: ThesisScore[];   // one score per criterion with reason
  overallThesisScore: number;    // weighted average, 1–10
}
```

**What happens inside:**
1. PDF is sent to Claude as a native `document` content block — no parsing libraries.
2. Claude extracts the full `DealAnalysis` object against a strict JSON schema.
3. `scoreThesisFit()` fires one Claude call per thesis criterion in parallel (`Promise.all`), each returning a 1–10 score and a one-sentence reason.
4. Weighted average is computed and the deal is persisted to Supabase.

---

### `POST /api/memo`

Takes a structured analysis and generates a complete Investment Committee memo.

**Request body:**
```typescript
{
  dealId: string;
  analysis: DealAnalysis;
  thesisScores: ThesisScore[];
  overallThesisScore: number;
  thesisConfig: ThesisConfig;
}
```

**Response:**
```typescript
{
  dealId: string;
  memoContent: MemoContent;
}

// MemoContent shape:
{
  executiveSummary: string;
  problemSolution: { problem: string; solution: string };
  marketCommentary: string;
  tractionCommentary: string;
  teamAssessment: string;
  thesisAlignment: string;
  keyRisks: string[];               // 3–5 specific risks
  recommendation: 'PURSUE' | 'WATCH' | 'PASS';
  recommendationRationale: string;
}
```

---

## AI Integration

### Four Claude Prompts

The entire Claude integration lives in `lib/prompts.ts`. Four distinct prompt strategies cover each AI task:

| Prompt | Purpose | Output |
|---|---|---|
| `ANALYSIS_SYSTEM_PROMPT` | Extraction — reads the pitch deck, pulls every structured field | `DealAnalysis` JSON |
| `SCORING_SYSTEM_PROMPT` | Per-criterion scoring — evaluates deal data against one thesis criterion at a time | `{ score: number, reason: string }` |
| `MEMO_SYSTEM_PROMPT` | Memo generation — writes the IC memo from structured data | `MemoContent` JSON |
| `AI_DETECTION_SYSTEM_PROMPT` | Content analysis — flags AI-generated sections in the deck itself | `AIDetectionReport` JSON |

### How Claude Reads PDFs Natively

Thesis sends PDFs directly to Claude as **document content blocks** — no PDF parsing, no text extraction, no PDF-to-image pipeline. The binary goes straight through:

```typescript
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514',
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
          text: 'Extract all information and return the structured JSON.',
        },
      ],
    },
  ],
});
```

Claude sees tables, charts, embedded images, and formatted text exactly as an investor would — nothing lost in extraction.

### Prompt Strategy: Extraction vs. Generation

**Extraction (analysis + scoring):** The prompt instructs Claude to act as an investment analyst, return *only* valid JSON, use `null` for missing fields, and never hallucinate numbers not present in the deck. The schema is explicit and typed — 14 top-level fields including nested arrays for traction, team, and red flags. Scoring runs one prompt per criterion so each gets full attention without dilution.

**Generation (memo):** The memo prompt instructs Claude to write as a senior investment associate — no buzzwords, no AI voice, appropriate skepticism, never start a sentence with "I". The structured output (8 named fields) ensures the frontend can render each section independently rather than parsing freeform markdown.

### Fallback Handling

Each Claude call in `scoreThesisFit()` is wrapped in an individual try/catch. If a single criterion call fails — rate limit, timeout, malformed response — that criterion falls back to a neutral score of 5/10 with the note `"Unable to score criterion automatically."` The remaining criteria are unaffected because all calls run in parallel via `Promise.all`. The overall weighted score is computed from whatever scores succeeded.

API routes catch all thrown errors and return:
```json
{ "error": "descriptive message", "fallback": null }
```
with an appropriate HTTP status, so the frontend can surface a recovery path rather than crashing.

---

## Environment Variables

Create `.env.local` in the project root:

```env
# Required for AI scoring
ANTHROPIC_API_KEY=sk-ant-...

# Optional — app runs without these; deals stored in-memory only
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

---

## Local Setup

```bash
# 1. Clone
git clone https://github.com/Superman752/thesis-app.git
cd thesis-app

# 2. Install (legacy peer deps required for Next 13 + React 18 combination)
npm install --legacy-peer-deps

# 3. Environment
cp .env.example .env.local
# Add ANTHROPIC_API_KEY to .env.local

# 4. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Node version note:** The dev script runs with `--max-old-space-size=4096` to prevent SWC compiler OOM crashes under Node 17. Do not use `npm run dev` via the `.bin` symlink on Windows — use the script as defined in `package.json`.

---

## Project Structure

```
thesis/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── login/page.tsx            # Auth / onboarding
│   └── app/
│       ├── page.tsx              # Pipeline (Kanban + Table view)
│       ├── deal/[id]/page.tsx    # Deal detail — scores, memo, AI flags
│       ├── upload/page.tsx       # PDF upload + analysis flow
│       ├── thesis/page.tsx       # Investment thesis configuration
│       ├── settings/page.tsx     # Firm settings
│       └── api/
│           ├── analyze/route.ts  # PDF → Claude → structured analysis
│           └── memo/route.ts     # Analysis → Claude → IC memo
├── components/
│   ├── Navigation.tsx            # Sidebar with Framer Motion nav
│   ├── DealCard.tsx              # Pipeline deal card
│   └── PipelineBoard.tsx         # Kanban board with stagger animation
└── lib/
    ├── prompts.ts                # All four Claude system prompts
    ├── scoring.ts                # Live Claude scoring engine
    ├── types.ts                  # Full TypeScript type definitions
    ├── mockData.ts               # Demo deals for hackathon presentation
    └── supabase.ts               # Supabase client (graceful no-op if unconfigured)
```

---

## Live Demo

**[trythesis.vercel.app](https://trythesis.vercel.app)**

Upload any pitch deck PDF or use the sample deck flow. The thesis scoring engine calls Claude live on every submission.
