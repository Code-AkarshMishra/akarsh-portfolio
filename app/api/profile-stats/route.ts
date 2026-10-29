import { NextResponse } from 'next/server';

const GITHUB_USER = 'Code-AkarshMishra';
const GITHUB_API = 'https://api.github.com';

export const revalidate = 21_600;

type GitHubUser = {
  public_repos: number;
  followers: number;
};

type GitHubRepository = {
  stargazers_count: number;
};

async function fetchGitHubJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'akarsh-portfolio',
    },
    next: { revalidate },
  });
  if (!response.ok) {
    throw new Error(`GitHub returned HTTP ${response.status}.`);
  }
  return (await response.json()) as T;
}

export async function GET() {
  try {
    const [user, repositories] = await Promise.all([
      fetchGitHubJson<GitHubUser>(`${GITHUB_API}/users/${GITHUB_USER}`),
      fetchGitHubJson<GitHubRepository[]>(`${GITHUB_API}/users/${GITHUB_USER}/repos?per_page=100&type=owner`),
    ]);

    return NextResponse.json({
      github: {
        publicRepos: user.public_repos,
        stars: repositories.reduce((total, repository) => total + repository.stargazers_count, 0),
        followers: user.followers,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('GitHub profile statistics request failed:', error);
    return NextResponse.json({ message: 'GitHub profile statistics are temporarily unavailable.' }, { status: 502 });
  }
}
