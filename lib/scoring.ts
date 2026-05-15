import Anthropic from '@anthropic-ai/sdk';
import { DealAnalysis, ThesisConfig, ThesisScore } from './types';
import { SCORING_SYSTEM_PROMPT } from './prompts';

export function getScoreLabel(score: number): 'Strong Fit' | 'Conditional Fit' | 'Weak Fit' {
  if (score >= 7.5) return 'Strong Fit';
  if (score >= 5) return 'Conditional Fit';
  return 'Weak Fit';
}

export function getScoreColor(score: number): string {
  if (score >= 7) return 'var(--green)';
  if (score >= 4) return 'var(--amber)';
  return 'var(--red)';
}

export async function scoreThesisFit(
  analysis: DealAnalysis,
  thesisConfig: ThesisConfig
): Promise<{ scores: ThesisScore[]; overallScore: number }> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const scorePromises = thesisConfig.criteria.map(async (criterion) => {
    const userContent = `Deal data:
Company: ${analysis.companyName}
Stage: ${analysis.stage}
Sector: ${analysis.sector}
Market TAM: ${analysis.market.tam || 'Not stated'}
Traction: ${analysis.traction.map((t) => `${t.metric}: ${t.value}`).join(', ') || 'Not stated'}
Team: ${analysis.team.map((m) => `${m.name} (${m.role}): ${m.background}`).join('; ')}
Business Model: ${analysis.businessModel}
Red Flags: ${analysis.redFlags.map((f) => f.headline).join(', ') || 'None'}

Criterion to score:
Name: ${criterion.name}
Description: ${criterion.description}`;

    try {
      const response = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        system: SCORING_SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userContent }],
      });

      const text = response.content[0].type === 'text' ? response.content[0].text : '{}';
      const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);

      return {
        criterion: criterion.name,
        score: Math.min(10, Math.max(1, parsed.score || 5)),
        reason: parsed.reason || 'Score assessed based on available information.',
        weight: criterion.weight,
      } as ThesisScore;
    } catch {
      return {
        criterion: criterion.name,
        score: 5,
        reason: 'Unable to score criterion automatically.',
        weight: criterion.weight,
      } as ThesisScore;
    }
  });

  const scores = await Promise.all(scorePromises);

  const totalWeight = scores.reduce((sum, s) => sum + s.weight, 0);
  const weightedSum = scores.reduce((sum, s) => sum + s.score * s.weight, 0);
  const overallScore = totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 10) / 10 : 0;

  return { scores, overallScore };
}
