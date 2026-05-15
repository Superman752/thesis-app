# Product

## Register

product

## Users

**Primary — The Analyst Under Pressure**
First or second-year analyst or associate at an early-stage fund (sub-$500M AUM). Reviews 10–50 pitch decks per week. Technically literate (Notion, Linear, Airtable, Superhuman) but not an engineer. Always operating under simultaneous time pressure and social pressure — every analysis may end up in front of a GP, so they need to trust the output completely. If Thesis looks sloppy or uncertain, they revert to doing it manually because that is politically safer.

**Secondary — The GP Who Reads the Memo**
Managing partner or general partner at the same fund. Never touches the upload flow or pipeline. Opens a formatted memo, reads the recommendation first, scans thesis scores, decides whether to schedule a partner meeting. Their entire experience of Thesis is the memo page at /app/memo/[id]. It must read like a senior associate spent 45 minutes on it.

**Not the user:** Founders, angels who look at one deal a month, pitch deck coaches, corporate accelerators. Thesis has nothing to do with helping companies get funded.

## Product Purpose

Thesis is a deal flow intelligence tool for early-stage venture capital analysts. It analyzes pitch decks using AI, scores fit against an investment thesis, surfaces red flags, and produces formatted investment memos. It removes the 45-minute manual ritual of initial deck assessment, giving analysts more time to think about the deals that deserve it while maintaining the quality of output that protects their reputation internally.

The /app/* routes are the actual product. The deal pipeline at /app is the primary working surface — where an analyst opens their laptop Monday morning, checks what is in queue, and decides what to do first. The deal analysis page at /app/deal/[id] is the highest-value screen because that is where AI output gets presented and judged. The memo page at /app/memo/[id] is the emotional payoff.

The landing page at / is a marketing handshake. It must convert a hackathon judge in under 10 seconds — credible, real, worth clicking into — but it does not carry the product's design identity. The two surfaces should not feel like different products, but the /app/* routes own the design language.

Success: an analyst trusts the Thesis output enough to forward it to a GP without editing it first.

## Brand Personality

**Weighted. Decisive. Authoritative.**

- **Weighted** — every element should feel like it has mass. Numbers prominent in monospace. Data dense but not cluttered. The opposite of the airy whitespace that consumer SaaS uses. Bloomberg, not Notion.
- **Decisive** — no ambiguity about what the tool is saying. Thesis scores large and unmistakably colored. Recommendation (PURSUE / WATCH / PASS) is the biggest text on the memo page. The tool speaks clearly and does not equivocate.
- **Authoritative** — gold accent reads as credibility in finance contexts, not decoration. Dark background signals professional tool for professional context. Copy sounds like it was written by someone who has read 500 pitch decks. Red flags call things out plainly without hedging.

The closest spiritual reference: Bloomberg Terminal crossed with a modern dark-mode analytics tool. Purposeful, dense, no pixel wasted.

## Anti-references

- **Linear** — too playful, too consumer. Micro-animations and personality cues belong in a dev tool, not a finance instrument.
- **Figma / Webflow** — design tools for creative workers. Wrong register entirely.
- **Consumer SaaS "clean and minimal"** — airy whitespace, soft colors, friendly conversational copy. This tool is not friendly; it is competent.
- **Startup marketing cliches** — hero metrics with big numbers and small labels, gradient text, glassmorphism, identical icon grids. Any pattern that signals "built with a template."
- **Notion** — too soft, too much whitespace, too neutral. Thesis is opinionated; Notion is not.

## Design Principles

1. **Mass before beauty** — information density is not a bug. Weighted data elements, dense card layouts, and tight spacing signal that this is a serious tool. An empty screen is a failed screen.
2. **The GP reads last** — every design decision should be tested against: "Would a partner trust this enough to act on it?" If the answer is no, rework it.
3. **Decisive signal** — the most important information on any screen is unmistakably the most important. Score, recommendation, flag count are never one of five equal-weight elements. The hierarchy must be obvious.
4. **No hedging in the interface** — if a metric is bad, show it in red clearly. If a flag is high severity, it should look alarming. Never soften bad news with neutral colors or vague labels. The tool earns trust by being direct.
5. **Terminal discipline** — every element on screen must justify its presence. Remove anything decorative that does not carry information. The interface should feel like it was written by an engineer who respects the analyst's time.

## Accessibility & Inclusion

WCAG AA minimum. Color is never the sole differentiator for state or severity — labels and icons accompany every color cue. Monospace number displays must maintain a minimum 13px rendered size. Primary use context is desktop (laptop, Chrome, office or home office) — mobile is not a priority but should not be broken.
