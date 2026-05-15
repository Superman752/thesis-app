import { NextRequest, NextResponse } from 'next/server';
import { mockThesisConfig } from '@/lib/mockData';
import { scoreThesisFit } from '@/lib/scoring';

const MOCK_ANALYSIS = {
  companyName: 'Conduit',
  oneLiner: 'API infrastructure for real-time cross-border B2B payments',
  problem:
    'Cross-border B2B payments are slow, opaque, and expensive. Mid-market companies lose 2-4% on every international transaction and wait 3-5 days for settlement.',
  solution:
    'Conduit provides a single API that routes payments through the optimal rail in real time — ACH, SWIFT, SEPA, or local networks — with settlement in under 4 hours.',
  businessModel:
    'Transaction fee of 0.4% per payment processed, plus $500/month platform fee for enterprise customers.',
  stage: 'Series A' as const,
  sector: 'Fintech',
  geography: 'Chicago, IL',
  founded: '2022',
  website: 'conduit.io',
  market: {
    tam: '$2.1T',
    sam: '$180B',
    som: '$4.2B',
    framing: 'Targeting mid-market companies ($10M-$500M revenue) doing cross-border trade',
  },
  traction: [
    { metric: 'ARR', value: '$1.2M' },
    { metric: 'Monthly Volume', value: '$40M' },
    { metric: 'Gross Margin', value: '65%' },
    { metric: 'Customers', value: '34 enterprise' },
    { metric: 'MoM Growth', value: '18%' },
  ],
  team: [
    {
      name: 'James Park',
      role: 'CEO',
      background: 'Former VP Payments at Stripe, 8 years in cross-border infrastructure',
    },
    {
      name: 'Aisha Okonkwo',
      role: 'CTO',
      background: 'Built payment routing at Adyen, MIT CS',
    },
  ],
  askingAmount: '$12M',
  valuation: '$55M pre-money',
  redFlags: [],
  rawHighlights: [
    '65% gross margin is exceptional for payments infrastructure',
    'Processing $40M/month with only 34 customers implies strong ACV',
    'Both founders have direct domain experience at tier-1 payments companies',
    'No red flags identified in deck',
  ],
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filename } = body as { pdf: string; filename: string };

    // Simulate analysis time
    await new Promise((resolve) => setTimeout(resolve, 4000));

    const analysis = MOCK_ANALYSIS;

    // Score thesis fit (uses no external API)
    const thesisConfig = mockThesisConfig;
    const { scores, overallScore } = await scoreThesisFit(analysis, thesisConfig);

    const dealId = `deal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const deal = {
      id: dealId,
      analystId: 'demo',
      companyName: analysis.companyName,
      oneLiner: analysis.oneLiner,
      stage: analysis.stage,
      sector: analysis.sector,
      geography: analysis.geography,
      analysis,
      thesisScores: scores,
      overallThesisScore: overallScore,
      redFlags: analysis.redFlags,
      pipelineStatus: 'new' as const,
      analystNotes: '',
      memoContent: null,
      aiDetection: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ dealId, deal, analysis, thesisScores: scores, overallThesisScore: overallScore });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error occurred.';
    return NextResponse.json({ error: message, fallback: null }, { status: 500 });
  }
}
