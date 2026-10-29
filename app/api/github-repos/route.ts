import { NextResponse } from 'next/server';
import { PORTFOLIO_PROJECTS } from '@/lib/project-catalog';

const GITHUB_USER = 'Code-AkarshMishra';
const GITHUB_API = 'https://api.github.com';

export const revalidate = 14_400;

type GitHubRepository = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
};

type RepositorySummary = {
  name: string;
  slug: string;
  title: string;
  simpleDesc: string;
  tech: string[];
  category: 'react' | 'python' | 'js' | 'java';
  stars: number | null;
  forks: number | null;
  url: string;
  liveUrl?: string;
};

const curatedRepositories = new Map(
  PORTFOLIO_PROJECTS.map((project) => [
    new URL(project.repository).pathname.split('/').filter(Boolean).at(-1)?.toLowerCase(),
    project,
  ])
);

function getCategory(language: string | null): 'react' | 'python' | 'js' | 'java' {
  switch (language?.toLowerCase()) {
    case 'python': return 'python';
    case 'java': return 'java';
    case 'javascript':
    case 'typescript': return 'js';
    default: return 'react';
  }
}

export async function GET() {
  let repositories: GitHubRepository[] = [];
  let liveDataAvailable = false;
  try {
    const response = await fetch(`${GITHUB_API}/users/${GITHUB_USER}/repos?per_page=100&sort=updated&type=owner`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'akarsh-portfolio' },
      next: { revalidate },
    });
    if (response.ok) {
      repositories = await response.json() as GitHubRepository[];
      liveDataAvailable = true;
    }
  } catch (error) {
    console.error('GitHub repository inventory is temporarily unavailable:', error);
  }

  const ownRepositories = repositories.filter((repository) => !repository.fork);
  const found = new Set(ownRepositories.map((repository) => repository.name.toLowerCase()));
  const mapped: RepositorySummary[] = ownRepositories
    .filter((repository) => curatedRepositories.has(repository.name.toLowerCase()))
    .map((repository) => {
      const project = curatedRepositories.get(repository.name.toLowerCase())!;
      return {
        name: repository.name,
        slug: project.slug,
        title: project.title,
        simpleDesc: project.summary,
        tech: project.technologies,
        category: getCategory(repository.language),
        stars: repository.stargazers_count,
        forks: repository.forks_count,
        url: repository.html_url,
        liveUrl: project.liveUrl || repository.homepage || undefined,
      };
    });

  // Preserve verified project links if GitHub is unreachable, but never invent star/fork counts.
  if (!liveDataAvailable) {
    for (const project of PORTFOLIO_PROJECTS) {
      const name = new URL(project.repository).pathname.split('/').filter(Boolean).at(-1) ?? '';
      if (found.has(name.toLowerCase())) continue;
      mapped.push({
        name,
        slug: project.slug,
        title: project.title,
        simpleDesc: project.summary,
        tech: project.technologies,
        category: project.category,
        stars: null,
        forks: null,
        url: project.repository,
        liveUrl: project.liveUrl,
      });
    }
  }

  return NextResponse.json({ success: true, liveDataAvailable, repos: mapped });
}
