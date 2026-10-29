import { NextResponse } from 'next/server';

const LEETCODE_USERNAME = 'code_akarshmishmra';
const LEETCODE_STATS_API = 'https://leetcode-api-faisalshohag.vercel.app';

export const revalidate = 21_600;

type LeetCodeStats = {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
};

function isLeetCodeStats(value: unknown): value is LeetCodeStats {
  if (typeof value !== 'object' || value === null) return false;

  const stats = value as Record<string, unknown>;
  const fields: (keyof LeetCodeStats)[] = [
    'totalSolved',
    'totalQuestions',
    'easySolved',
    'totalEasy',
    'mediumSolved',
    'totalMedium',
    'hardSolved',
    'totalHard',
  ];

  return fields.every((field) => typeof stats[field] === 'number' && Number.isFinite(stats[field]));
}

export async function GET() {
  const unavailable = () => NextResponse.json({ available: false });
  let response: Response;
  try {
    response = await fetch(`${LEETCODE_STATS_API}/${LEETCODE_USERNAME}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate },
    });
  } catch {
    return unavailable();
  }

  if (!response.ok) {
    return unavailable();
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    return unavailable();
  }

  if (!isLeetCodeStats(payload)) {
    return unavailable();
  }

  return NextResponse.json(payload);
}
