---
name: Thesis
description: Deal flow intelligence for early-stage venture capital analysts.
colors:
  brand: "#F4C542"
  brand-dim: "#F4C5421A"
  brand-glow: "#F4C54233"
  bg: "#09090B"
  surface: "#111113"
  surface-2: "#1C1C1F"
  surface-3: "#242428"
  border: "#2A2A2E"
  border-2: "#363639"
  text-primary: "#F4F4F5"
  text-secondary: "#D4D4D8"
  text-muted: "#A1A1AA"
  text-muted-2: "#71717A"
  text-muted-3: "#52525B"
  semantic-green: "#4ADE80"
  semantic-green-dim: "#22C55E1A"
  semantic-red: "#F87171"
  semantic-red-dim: "#EF44441A"
  semantic-amber: "#FBB345"
  semantic-amber-dim: "#F59E0B1A"
  semantic-blue: "#60A5FA"
  semantic-blue-dim: "#3B82F61A"
  print-bg: "#F4F4F5"
  print-text: "#18181B"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.8rem, 5vw, 4.2rem)"
    fontWeight: 800
    lineHeight: 1.0
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 600
    letterSpacing: "0.08em"
  mono:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  xs: "4px"
  sm: "8px"
  md: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "14px"
  lg: "20px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.bg}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.bg}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
  chip-stage:
    backgroundColor: "{colors.brand-dim}"
    textColor: "{colors.brand}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  chip-neutral:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.text-muted-2}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  input:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  input-focus:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  card-deal:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "14px"
---

# Design System: Thesis

## 1. Overview

**Creative North Star: "The Analyst's Terminal"**

Thesis is not a productivity tool. It is a financial instrument. The visual system is built on tonal depth: five stacked layers of near-black from page base to nested panel, broken only by a gold accent that signals authority and semantic colors that carry data meaning. Every design decision is tested against a single question: would a managing partner trust this output enough to act on it without asking a follow-up?

The surface hierarchy IS the design. The five-step depth stack (bg → surface → surface2 → surface3) creates legible containment without decorative shadows at rest. Information has mass — scores appear in monospace, data elements are dense but not cluttered, and whitespace is earned rather than defaulted to. The closest spiritual reference is Bloomberg Terminal crossed with a modern dark-mode analytics dashboard: purposeful, dense, no pixel wasted.

This system explicitly rejects: the airy whitespace of consumer SaaS; the playful personality of Linear or Figma; the soft, friendly copy of Notion-adjacent tools; gradient text and glassmorphism as decoration; the hero-metric template (big number, small label, gradient accent); and any pattern that reads as "built with a starter kit." If it can be identified as AI-generated from category alone, it has failed.

**Key Characteristics:**
- Five-step tonal surface stack creates depth without shadows at rest
- Gold (#F4C542) appears on ≤10% of any screen — rarity is its authority
- All financial and score data rendered in DM Mono, minimum 13px rendered size
- Semantic colors (green/red/amber/blue) are data signals only, never decoration
- Tight type scale: headline 18px, body 14px, label 10px uppercase, micro 10–11px
- Two typefaces only: Inter for text, DM Mono for numbers, codes, and monograms

## 2. Colors: The Terminal Palette

A restrained palette: near-black neutrals build the working depth, a single gold accent commands authority, four semantic colors carry data signal, and a light-mode pair is reserved exclusively for the print/memo surface.

### Primary
- **Deal Gold** (`#F4C542`): The thesis score display, active nav items, the logo mark, primary CTA buttons, focus rings. Gold in finance contexts reads as credibility, not decoration. Used on ≤10% of any screen. Its scarcity is the point.
- **Gold Dim** (`rgba(244,197,66,0.10)` / `#F4C5421A`): Active nav item background fill. Never a decorative surface tint.
- **Gold Glow** (`rgba(244,197,66,0.20)` / `#F4C54233`): Drop zone hover state on the upload surface. Structural hover signal, not decoration.

### Neutral
- **Terminal Black** (`#09090B`): Page base. Not pure black — carries a trace of warm near-zero chroma. Never used as a component background.
- **Desk Surface** (`#111113`): Sidebar, section cards, header bars. The primary resting plane.
- **Panel Layer** (`#1C1C1F`): Elevated cards, table header rows, input fields, secondary panels.
- **Nested Panel** (`#242428`): Avatar backgrounds, chip fills, innermost containers. The densest readable layer before Terminal Black.
- **Wire** (`#2A2A2E`): Dividers and card borders at rest. Subtle enough not to compete with content.
- **Live Wire** (`#363639`): Card borders on hover and focus, default input border. One step brighter than Wire.
- **Signal White** (`#F4F4F5`): Primary readable text. Slightly warm off-white; never pure white.
- **Reduced Signal** (`#D4D4D8`): Secondary labels and value descriptions.
- **Static** (`#A1A1AA`): Muted nav items, placeholder copy, metadata text.
- **Deep Static** (`#71717A`): Section labels, field descriptions, lower-hierarchy labels.
- **Trace** (`#52525B`): Timestamps, scrollbar thumbs, the least prominent text tier. Use only on surface backgrounds; does not pass AA on Terminal Black.

### Secondary (Semantic)
Four colors that exist solely to carry data meaning. Never used as brand accents, UI chrome, or decorative fills.

- **Clear Signal** (`#4ADE80`): Thesis scores ≥7.5, active diligence pipeline status, confirmed states.
- **Flag Red** (`#F87171`): High-severity flags, scores below 5.0, destructive action confirmation.
- **Watch Yellow** (`#FBB345`): Scores 5.0–7.4, medium-severity flags, "meeting scheduled" status.
- **Intel Blue** (`#60A5FA`): "New" pipeline status, informational states, low-severity flag labels.

Each semantic color has a dim form (full color at 10% opacity) used as chip/badge backgrounds, and a full-strength form (`#22C55E`, `#EF4444`, `#F59E0B`, `#3B82F6`) used only for icons or full fills where contrast permits.

### Tertiary (Print / Memo)
- **Page White** (`#F4F4F5`): Memo print surface only. Never in the app shell.
- **Print Ink** (`#18181B`): Memo print body text only.

**The One Voice Rule.** Gold (#F4C542) is the only color that carries brand identity. It speaks once per screen. Every other color is a neutral or a data signal. Anything that uses gold decoratively is diluting the system.

**The Signal Purity Rule.** Semantic colors carry no meaning outside their data role. Green is not a CTA color. Amber is not brand warmth. Red is not a visual interest accent. The analyst must be able to trust that red means "problem" without conscious thought.

## 3. Typography

**Primary Font:** Inter (`var(--font-inter)`, with system-ui and sans-serif fallbacks)
**Mono Font:** DM Mono (`var(--font-dm-mono)`, with ui-monospace and monospace fallbacks)

**Character:** Inter provides the authoritative register — neutral enough not to intrude, refined enough to read as professional in financial context. DM Mono carries every score, count, date, and metric; its fixed-width geometry makes data scannable across columns and establishes the terminal register that defines the product identity.

### Hierarchy
- **Display** (800 weight, clamp(2.8rem–4.2rem), line-height 1.0, tracking −0.03em): Landing page hero only. Never used inside the /app shell.
- **Headline** (700, 18px, line-height 1.3, tracking −0.02em): Page titles in the app header bar. One per screen.
- **Title** (600, 14px, line-height 1.4): Section headings within panels — "Thesis Scores," "Red Flags," "Team."
- **Body** (400, 14px, line-height 1.6): Content paragraphs, one-liners, memo body copy. Cap at 65–75ch for prose surfaces.
- **Label** (600, 10px, tracking 0.08em, uppercase): Section header labels, table column headers. Class `.label-xs`. Never rendered below 10px.
- **Micro** (500, 10–11px): Timestamps, chip labels, status badges. Monospace (DM Mono) for numbers and codes; sans (Inter) for status words and single-word labels.

**The Mono Rule.** Any number representing a score, ratio, count, date, percentage, or financial value is set in DM Mono. Non-negotiable. Monospace creates scannable columns across pipeline rows, signals data precision, and reinforces the terminal register. Text commentary, one-liners, status words, and memo copy stay in Inter.

**The Scale Rule.** The hierarchy runs tight — only four meaningful steps separate headline (18px) from label (10px). Do not introduce intermediate sizes (15px, 16px, 17px) without purpose. The scale's tightness is intentional: this is an information-dense tool, not a reading experience.

## 4. Elevation

Two complementary depth mechanisms: tonal surface layering (the primary mechanism) and box-shadow elevation (reserved for interactive and floating states). The base condition for any surface is flat. Shadows confirm state or z-level; they do not style.

The tonal stack creates depth the way a physical desk does: working surface above the table, nested panels above the surface, cards lifting slightly on hover to confirm they are interactive. The five layers of near-black carry more spatial information than shadows could.

### Shadow Vocabulary
- **Ambient** (`--shadow-sm`: `0 1px 2px rgba(0,0,0,0.4)`): Cards at rest. Barely perceptible — confirms material without pulling visual weight. Required on every interactive card at its default state.
- **Lifted** (`--shadow-md`: `0 2px 8px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.3)`): Cards on hover, paired with `translateY(-1px)`. Confirms the element is interactive and has responded.
- **Raised** (`--shadow-lg`: `0 4px 20px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)`): Dropdowns, popovers, floating panels that genuinely sit above the document flow.
- **High** (`--shadow-xl`: `0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)`): Modals and full-sheet panels. Use sparingly — modals are rarely the right pattern here.

**The Flat-at-Rest Rule.** Shadows are a response to state, not a default style. If a shadow appears on an idle, non-interactive layout element, it is decorative and must be removed.

**The Hover Signature Rule.** Interactive cards always pair shadow elevation with a 1px upward translate (`translateY(-1px)`). The physical metaphor — the card lifting toward the hand — signals interactivity without requiring hover state text or cursor changes.

## 5. Components

### Buttons
Firm and unambiguous. The primary button is the only element with a gold fill — it commands attention because nothing else in the interface shares that treatment. Ghost buttons are quiet by design; they should not compete with primary CTAs.

- **Shape:** Gently rounded (8px / `rounded-lg`). Never full-pill — rounded-full reads as consumer product.
- **Primary:** Background Deal Gold (#F4C542), text Terminal Black (#09090B), padding 10px 20px, font-weight 600, font-size 14px. Hover: `box-shadow: 0 4px 16px rgba(244,197,66,0.25)` + `translateY(-1px)`, 100ms transition.
- **Ghost/Outline:** Background transparent, border 1px solid `--border`, text `--muted`. Hover: border color `--muted`. On destructive actions (sign out, clear data), hover shifts text and border toward `--red-text` / `rgba(239,68,68,0.35)`.
- **States:** Focus rings use `outline: 2px solid var(--brand); outline-offset: 2px` via the `.focus-ring` utility class.

### Chips / Tags
Minimal pill containers. Semantic chips carry stage and status data with color-coded meaning. Neutral chips carry metadata without color signal.

- **Semantic Stage Chip:** Full pill (9999px radius), padding 2px 8px, 10px DM Mono, weight 500. Background is the stage color at 8% opacity, border the stage color at 16% opacity, text the stage color at full strength. Stage-to-color mapping: Pre-seed → `--blue`; Seed → `--brand`; Series A → `--green`; Series B/B+ → `--amber`.
- **Neutral Chip** (sector, labels): Background `--surface3`, text `--muted2`, border 1px solid `--border`. Same pill dimensions.
- **Status Badge** (pipeline): Background `--surface3`, 10–11px Inter, text color maps to pipeline status: new → `--blue-text`; under review → `--brand`; meeting scheduled → `--amber-text`; active diligence → `--green-text`; passed → `--muted3`.

### Cards
The primary interactive unit of the pipeline. Compact and scannable. Never nest cards within cards.

- **Background:** `--surface2`
- **Border:** 1px solid `--border` at rest, `--border2` on hover
- **Corner Style:** Rounded (12px / `rounded-xl`)
- **Shadow:** `--shadow-sm` at rest → `--shadow-md` + `translateY(-1px)` on hover, 150ms transition
- **Internal Padding:** 14px (px-3.5 / pt-3.5 / pb-2.5). Content area and score footer separated by a full-width horizontal divider (`borderTop: 1px solid var(--border)`), not a side-stripe.
- **Company Avatar:** 32px square, `rounded-lg` (8px), background `--surface3`, border 1px solid `--border2`, company initial in DM Mono bold 13px `--brand`.
- **Score Footer:** DM Mono score value in semantic threshold color + 64px inline bar (4px height, `rounded-full`) + `--muted3` "/10" label. Flags shown as `--red-dim` or `--amber-dim` pill with AlertTriangle icon and count.

### Inputs / Fields
Compact and workmanlike. The form follows the terminal register: no decorative chrome, no rounded-full, no floating labels.

- **Style:** Background `--surface2`, border 1px solid `--border2`, radius 8px, padding 8px 12px, font-size 13px. Class `.input-base` handles all defaults.
- **Focus:** Border shifts to `--brand` (#F4C542). No glow ring. The color change is sufficient signal.
- **Placeholder:** `--muted3`. Distinct from label color.
- **Label:** `.label-xs` class — 10px, uppercase, 0.08em tracking, `--muted2`. Placed above the field with 8px gap.

### Navigation
264px fixed sidebar on desktop; 56px bottom bar on mobile (below md / 768px breakpoint).

- **Sidebar:** Background `--surface`, border-right 1px solid `--border`.
- **Logo lockup:** 28px square gold-fill icon (`--brand` background, `box-shadow: 0 0 14px rgba(244,197,66,0.22)`) + DM Mono "thesis" wordmark in `--brand`, 14px bold. Header zone 56px tall.
- **Section label:** "WORKSPACE" in 9px, weight 600, tracking 0.1em, uppercase, `--muted3`. Above the nav items.
- **Nav item (rest):** Text `--muted`, Lucide icon 16px strokeWidth 1.8, padding 8px 12px, `rounded-lg`.
- **Nav item (hover):** Background `--surface2`, text `--text2`.
- **Nav item (active):** Background `--brand-dim`, text `--brand`, icon strokeWidth 2.2. The pill highlight is the full nav item width.
- **User section:** Bottom-pinned, border-top 1px solid `--border`. Initials avatar 32px rounded-full, `--brand-dim` fill, `--brand` DM Mono text. Name in 14px `--text`; firm in 12px `--muted3`.

### Score Display (Signature Component)
The thesis score is the highest-signal element in the product. It appears in at least three contexts, each requiring progressively more weight.

- **Pipeline card:** DM Mono score (14px bold) + 64px × 4px inline bar + "/10" label in `--muted3`. Compact, scannable across a column of cards.
- **Deal detail header:** Larger mono display (24px+), color-matched to threshold. Category breakdown bars use 6px height, full panel width, with percentage label right-aligned.
- **Memo recommendation block:** The score and recommendation (PURSUE / WATCH / PASS) are the largest typographic elements on the page. The recommendation word is the headline. The score is the subheading. Nothing competes.
- **Threshold mapping:** ≥7.5 → `--green-text`; 5.0–7.4 → `--amber-text`; <5.0 → `--red-text`. These thresholds are invariant — never overridden for visual comfort.

### Side-Stripe Border Audit
This codebase contains both intentional and inherited uses of accent borders. The distinction is documented here for maintenance.

**Structural (keep):** `borderTop` / `borderBottom` / `borderRight` as horizontal or vertical dividers inside cards, between header and content zones, and on the sidebar. These are spatial separators, not accent treatments.

**Functional accent (keep):** Left or right borders where the border color carries data meaning — specifically, severity-colored left borders on flagged deal items in the detail view where the color IS the severity signal, not decoration.

**Inherited template pattern (replace in next pass):** `borderLeft: '2px solid var(--brand)'` on section card headers in `/app/settings` and `/app/upload`. These are cosmetic accents that carry no data meaning — the gold stripe was added as a shortcut to make section headers feel structured. Replace with: a `--surface2` background tint on the section card header relative to the card body's `--surface`, a full-width top border using `--border`, or nothing. The `.label-xs` class provides sufficient typographic hierarchy on its own without a colored accent.

## 6. Do's and Don'ts

### Do:
- **Do** render every score, count, date, ratio, and financial figure in DM Mono at 13px minimum.
- **Do** use the five-step tonal surface stack (bg → surface → surface2 → surface3) to express containment hierarchy. Each layer should hold something worth containing.
- **Do** color thesis scores strictly by threshold: Clear Signal green (≥7.5), Watch Yellow (5.0–7.4), Flag Red (<5.0). The color must match the signal.
- **Do** keep gold (#F4C542) to ≤10% of any given screen — the CTA, the active nav state, and the logo. If gold appears in more than two places on a screen, audit it.
- **Do** treat semantic colors (green/red/amber/blue) as reserved data vocabulary. They appear in score displays, pipeline status badges, and severity flags — nowhere else.
- **Do** apply `--shadow-sm` to interactive cards at rest, `--shadow-md` + `translateY(-1px)` on hover. The physical lift confirms interactivity.
- **Do** use `.label-xs` for all section headers and table column labels — 10px, uppercase, tracked, `--muted2`.
- **Do** show high-severity flags in Flag Red (`--red-text`) with `--red-dim` background. If the concern is alarming, the presentation must look alarming.
- **Do** separate card sections with full-width horizontal dividers (`borderTop: 1px solid var(--border)`), not side stripes.
- **Do** test every new screen with the GP test: "Would a partner trust this output enough to act on it?" If the answer is uncertain, the hierarchy is wrong.
- **Do** use the print/memo surface (`--light-bg`, `--light-text`) for the memo page. The secondary user (the GP) expects a document, not a dashboard.

### Don't:
- **Don't** use `border-left` or `border-right` greater than 1px as a colored decorative accent on section headers, card callouts, or list items. This is a template shortcut. See the Side-Stripe Border Audit in Components for the distinction between inherited and intentional use.
- **Don't** use gradient text (`background-clip: text` with a gradient fill). Prohibited in this system.
- **Don't** use glassmorphism (`backdrop-filter: blur`) decoratively. Not part of this design language.
- **Don't** use the hero-metric template — large number, small label, gradient accent. PRODUCT.md names this explicitly as a startup cliché. The score display in Thesis is a data element, not a hero moment.
- **Don't** build identical card grids with the same size, icon, heading, and text layout repeated endlessly. Deal cards vary in density; information surfaces differently.
- **Don't** leave a screen feeling empty. Per PRODUCT.md: an empty screen is a failed screen. Fill negative space with useful state — skeleton loaders, empty-state instructions, count context.
- **Don't** use Linear's personality register — no bounce animations, no confetti, no celebratory copy. This tool is competent. It does not celebrate.
- **Don't** use Notion's soft neutral aesthetic. Thesis is opinionated. Color, weight, and density communicate. Neutral whitespace as a default communicates nothing.
- **Don't** soften bad data. A thesis score of 3.2 is displayed in Flag Red (#F87171). A high-severity flag gets `--red-dim` background and `--red-text` label. There is no amber-washing of genuine concerns.
- **Don't** use modals as the first answer for any flow. Exhaust inline editing and progressive disclosure before reaching for a modal.
- **Don't** use color as the sole differentiator for severity or state. Always pair color with a text label ("High," "Medium," "Low") and an icon. WCAG AA requires that color never be the only signal.
- **Don't** render the /app shell on a light background. The product register is dark. Light backgrounds appear only in print/memo contexts.
