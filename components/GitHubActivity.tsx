'use client';

import { useEffect, useState } from 'react';

type ActivityData = {
  contributions: {
    total: number;
    days: { date: string; count: number; level: number }[];
  };
  source: string;
};

type ActivityState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; data: ActivityData };

const ACHIEVEMENTS = [
  { name: 'Starstruck', slug: 'starstruck', image: 'starstruck-default-b6610abad518.png' },
  { name: 'Galaxy Brain', slug: 'galaxy-brain', image: 'galaxy-brain-default-847262c21056.png' },
  { name: 'Pull Shark', slug: 'pull-shark', image: 'pull-shark-default-498c279a747d.png' },
  { name: 'YOLO', slug: 'yolo', image: 'yolo-default-be0bbff04951.png' },
  { name: 'Quickdraw', slug: 'quickdraw', image: 'quickdraw-default-39c6aec8ff89.png' },
];

const CONTRIBUTION_COLORS = [
  'bg-[#e9e7e1]',
  'bg-[#c6e7bf]',
  'bg-[#8bc77e]',
  'bg-[#4b9f4a]',
  'bg-[#216e39]',
];

export default function GitHubActivity() {
  const [state, setState] = useState<ActivityState>({ status: 'loading' });
  const [publicRepoCount, setPublicRepoCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/github-activity')
      .then(async (response) => {
        if (!response.ok) throw new Error('GitHub activity request failed.');
        return (await response.json()) as ActivityData;
      })
      .then((data) => {
        if (active) setState({ status: 'ready', data });
      })
      .catch((error: unknown) => {
        console.error('Unable to load GitHub activity:', error);
        if (active) setState({ status: 'error' });
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    fetch('/api/profile-stats')
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: { github?: { publicRepos?: number } }) => {
        if (typeof data.github?.publicRepos === 'number') setPublicRepoCount(data.github.publicRepos);
      })
      .catch(() => setPublicRepoCount(null));
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-sand bg-cyber-card p-5 shadow-premium sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand pb-4">
          <div>
            <h3 className="text-base font-bold text-ink">GitHub contributions</h3>
            <p className="mt-1 text-xs text-taupe">Activity from the last year, retrieved from GitHub.</p>
          </div>
          <a
            href="https://github.com/Code-AkarshMishra"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-cyber-blue hover:underline"
          >
            View GitHub profile
          </a>
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          <div className="rounded-xl border border-sand bg-white px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-taupe">Public repositories</p>
            <p className="mt-1 text-lg font-extrabold text-ink">{publicRepoCount === null ? '—' : publicRepoCount.toLocaleString()}</p>
            <p className="text-[10px] text-taupe">Includes forks · GitHub profile total</p>
          </div>
        </div>

        {state.status === 'loading' && (
          <p className="py-8 text-sm text-taupe" role="status">Loading GitHub contributions…</p>
        )}
        {state.status === 'error' && (
          <p className="py-8 text-sm text-taupe" role="status">
            Live contribution data is temporarily unavailable.{' '}
            <a href="https://github.com/Code-AkarshMishra" target="_blank" rel="noreferrer" className="font-semibold text-cyber-blue hover:underline">
              See the GitHub profile
            </a>
            .
          </p>
        )}
        {state.status === 'ready' && (
          <>
            <p className="py-4 text-sm font-semibold text-ink">
              {state.data.contributions.total.toLocaleString()} contributions in the last year
            </p>
            <div className="overflow-x-auto pb-2">
              <div
                role="img"
                aria-label={`${state.data.contributions.total} GitHub contributions during the last year`}
                className="grid w-max grid-flow-col grid-rows-7 gap-1"
              >
                {state.data.contributions.days.map((day) => (
                  <span
                    key={day.date}
                    title={`${day.date}: ${day.count} ${day.count === 1 ? 'contribution' : 'contributions'}`}
                    className={`h-3 w-3 rounded-[2px] ${CONTRIBUTION_COLORS[Math.min(day.level, 4)]}`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-taupe">
              <span>Less</span>
              {CONTRIBUTION_COLORS.map((color) => (
                <span key={color} className={`h-3 w-3 rounded-[2px] ${color}`} />
              ))}
              <span>More</span>
            </div>

          </>
        )}
      </div>

      <div className="rounded-2xl border border-sand bg-cyber-card p-5 shadow-premium sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-ink">GitHub achievements</h3>
            <p className="mt-1 text-xs text-taupe">Original badges shown on my GitHub profile.</p>
          </div>
          <a
            href="https://github.com/Code-AkarshMishra?tab=achievements"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-cyber-blue hover:underline"
          >
            View all achievements
          </a>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {ACHIEVEMENTS.map((achievement) => (
            <a
              key={achievement.slug}
              href={`https://github.com/Code-AkarshMishra?achievement=${achievement.slug}&tab=achievements`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 rounded-xl border border-sand bg-white p-3 text-center transition hover:border-cyber-blue/40"
            >
              <img
                src={`https://github.githubassets.com/assets/${achievement.image}`}
                alt={`${achievement.name} GitHub achievement`}
                className="h-14 w-14 object-contain"
                loading="lazy"
              />
              <span className="text-[11px] font-semibold text-taupe">{achievement.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
