import { NextRequest, NextResponse } from 'next/server';

const MOCK_MEMO = {
  executiveSummary:
    'Conduit is building the payments infrastructure layer that mid-market companies have needed for a decade. The company routes cross-border B2B payments through the optimal rail in real time, delivering settlement in under four hours versus the three-to-five day industry standard. With $1.2M ARR, $40M monthly processing volume, and 65% gross margins, Conduit has demonstrated that enterprise customers will pay a premium for speed and reliability in cross-border payments. The founding team brings direct infrastructure experience from Stripe and Adyen, two of the most operationally rigorous payments companies in the world.',
  problemSolution: {
    problem:
      'Mid-market companies conducting cross-border trade lose 2-4% on every international transaction and wait three to five days for settlement. Existing solutions were not built for the volume or speed that modern B2B commerce requires.',
    solution:
      'Conduit provides a single API that intelligently routes each payment through the optimal rail based on cost, speed, and reliability. Settlement completes in under four hours.',
  },
  marketCommentary:
    "The $2.1T total addressable market in cross-border B2B payments is well-documented. Conduit's $180B serviceable market is underserved by both legacy banks and enterprise-focused platforms like Kyriba.",
  tractionCommentary:
    '$1.2M ARR across 34 customers implies an average contract value of roughly $35K annually. The 65% gross margin at this volume suggests the unit economics hold even before the routing optimization flywheel compounds.',
  teamAssessment:
    'James Park spent eight years at Stripe before serving as VP Payments. Aisha Okonkwo built the payment routing core at Adyen. Both founders have directly relevant tier-1 operator experience.',
  thesisAlignment:
    'Conduit aligns with our fintech infrastructure thesis across all five criteria. Market size exceeds our $1B SAM threshold. The team has direct domain credibility. Traction at Series A is above the cohort median.',
  keyRisks: [
    'Regulatory risk across 40+ jurisdictions as volume scales',
    'Incumbent processors have pricing leverage and distribution advantages',
    '18% MoM growth needs independent validation',
    'Customer concentration risk not disclosed',
  ],
  recommendation: 'PURSUE' as const,
  recommendationRationale:
    'Conduit checks every box on our fintech infrastructure thesis. The gross margin profile, team pedigree, and volume-to-ARR ratio all suggest a business with real pricing power in a massive underserved market.',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { dealId } = body;

    if (!body.analysis) {
      return NextResponse.json({ error: 'No deal analysis provided.' }, { status: 400 });
    }

    // Simulate memo generation time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json({ dealId, memoContent: MOCK_MEMO });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error occurred.';
    return NextResponse.json({ error: message, fallback: null }, { status: 500 });
  }
}
