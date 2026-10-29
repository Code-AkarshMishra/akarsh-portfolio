import { NextResponse } from 'next/server';

const GITHUB_USER = 'Code-AkarshMishra';

export const revalidate = 3_600;

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

function readAttribute(tag: string, name: string) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? null;
}

function parseContributionDays(html: string): ContributionDay[] {
  const tooltips = new Map<string, string>();
  const tooltipPattern = /<tool-tip\b([^>]*)>([^<]*)<\/tool-tip>/g;

  for (const match of html.matchAll(tooltipPattern)) {
    const id = readAttribute(match[1], 'for');
    if (id) tooltips.set(id, match[2]);
  }

  const days: ContributionDay[] = [];
  const cellPattern = /<td\b[^>]*class="ContributionCalendar-day"[^>]*>/g;

  for (const match of html.matchAll(cellPattern)) {
    const date = readAttribute(match[0], 'data-date');
    const level = Number(readAttribute(match[0], 'data-level'));
    const id = readAttribute(match[0], 'id');
    if (!date || !id || !Number.isInteger(level)) continue;

    const countText = tooltips.get(id) ?? '';
    const count = Number(countText.match(/([\d,]+)\s+contributions?/i)?.[1]?.replaceAll(',', '') ?? 0);
    days.push({ date, count, level });
  }

  return days;
}

export async function GET() {
  let graphResponse: Response;
  try {
    graphResponse = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`, {
      headers: { 'User-Agent': 'akarsh-portfolio' },
      next: { revalidate },
    });
  } catch (error) {
    console.error('GitHub contribution graph request failed:', error);
    return NextResponse.json({ message: 'GitHub activity is temporarily unavailable.' }, { status: 502 });
  }

  if (!graphResponse.ok) {
    console.error(`GitHub contribution graph returned HTTP ${graphResponse.status}.`);
    return NextResponse.json({ message: 'GitHub activity is temporarily unavailable.' }, { status: 502 });
  }

  try {
    const html = await graphResponse.text();
    const days = parseContributionDays(html);
    if (days.length < 300) {
      console.error(`GitHub contribution graph returned only ${days.length} daily cells.`);
      return NextResponse.json({ message: 'GitHub activity is temporarily unavailable.' }, { status: 502 });
    }

    return NextResponse.json({
      contributions: {
        total: days.reduce((total, day) => total + day.count, 0),
        days,
      },
      source: `https://github.com/${GITHUB_USER}`,
    });
  } catch (error) {
    console.error('GitHub activity could not be parsed:', error);
    return NextResponse.json({ message: 'GitHub activity is temporarily unavailable.' }, { status: 502 });
  }
}
