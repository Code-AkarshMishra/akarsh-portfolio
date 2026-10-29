'use client';

import { useEffect, useState } from 'react';

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

type StatsState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; stats: LeetCodeStats };

const DIFFICULTIES = [
  { name: 'Easy', color: 'bg-emerald-500', text: 'text-emerald-700', solved: 'easySolved', total: 'totalEasy' },
  { name: 'Medium', color: 'bg-amber-500', text: 'text-amber-700', solved: 'mediumSolved', total: 'totalMedium' },
  { name: 'Hard', color: 'bg-rose-500', text: 'text-rose-700', solved: 'hardSolved', total: 'totalHard' },
] as const;

export default function CodingProfiles() {
  const [state, setState] = useState<StatsState>({ status: 'loading' });

  useEffect(() => {
    let active = true;
    fetch('/api/leetcode-stats')
      .then(async (response) => {
        if (!response.ok) throw new Error('LeetCode stats request failed.');
        return (await response.json()) as Partial<LeetCodeStats> & { available?: boolean };
      })
      .then((stats) => {
        const fields: (keyof LeetCodeStats)[] = [
          'totalSolved', 'totalQuestions', 'easySolved', 'totalEasy',
          'mediumSolved', 'totalMedium', 'hardSolved', 'totalHard',
        ];
        const valid = stats.available !== false && fields.every((field) =>
          typeof stats[field] === 'number' && Number.isFinite(stats[field])
        );
        if (active) {
          setState(valid ? { status: 'ready', stats: stats as LeetCodeStats } : { status: 'error' });
        }
      })
      .catch(() => {
        if (active) setState({ status: 'error' });
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="coding-profiles" className="border-t border-sand px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyber-blue">Coding profiles</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">Problem solving</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-sand bg-cyber-card p-6 shadow-premium">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img src="https://cdn.simpleicons.org/leetcode/FFA116" alt="" className="h-8 w-8" />
                <div>
                  <h3 className="text-sm font-bold text-ink">LeetCode</h3>
                  <p className="text-xs text-taupe">code_akarshmishmra</p>
                </div>
              </div>
              <a href="https://leetcode.com/u/code_akarshmishmra/" target="_blank" rel="noreferrer" className="text-xs font-bold text-cyber-blue hover:underline">
                View profile
              </a>
            </div>

            {state.status === 'loading' && <p className="mt-6 text-sm text-taupe" role="status">Loading live problem counts…</p>}
            {state.status === 'error' && <p className="mt-6 text-sm text-taupe" role="status">Problem counts are temporarily unavailable.</p>}
            {state.status === 'ready' && (
              <>
                <p className="mt-6 text-3xl font-extrabold text-ink">
                  {state.stats.totalSolved.toLocaleString()}
                  <span className="ml-2 text-sm font-medium text-taupe">/ {state.stats.totalQuestions.toLocaleString()} solved</span>
                </p>
                <div className="mt-5 space-y-4">
                  {DIFFICULTIES.map(({ name, color, text, solved, total }) => {
                    const solvedCount = state.stats[solved];
                    const totalCount = state.stats[total];
                    const width = totalCount ? `${(solvedCount / totalCount) * 100}%` : '0%';
                    return (
                      <div key={name}>
                        <div className="mb-1.5 flex justify-between text-xs">
                          <span className={`font-semibold ${text}`}>{name}</span>
                          <span className="text-taupe">{solvedCount} / {totalCount}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-sand">
                          <div className={`h-full rounded-full ${color}`} style={{ width }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </article>

          <article className="rounded-2xl border border-sand bg-cyber-card p-6 shadow-premium">
            <div className="flex items-center gap-3">
              <img src="https://cdn.simpleicons.org/hackerrank/2EC866" alt="" className="h-8 w-8" />
              <div>
                <h3 className="text-sm font-bold text-ink">HackerRank</h3>
                <p className="text-xs text-taupe">Python · 3 stars</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-taupe">
              Python skill certification and challenge progress on HackerRank.
            </p>
            <a
              href="https://www.hackerrank.com/CodeAkarshMishra"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-lg border border-sand bg-white px-4 py-2 text-xs font-bold text-cyber-blue transition hover:border-cyber-blue/40"
            >
              View HackerRank profile
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
