'use client';

import React from 'react';
import Link from 'next/link';
import { getPortfolioProject, PROJECT_CATEGORIES } from '@/lib/project-catalog';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  Globe,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';

export type ProjectDetails = {
  title: string;
  category: string;
  tagline: string;
  overview: string;
  problemSolved: string;
  architecture: string;
  features: string[];
  tech: string[];
  techCategories?: { category: string; items: string[] }[];
  live: string | null;
  repo: string;
  image?: string;
  role: string;
  year: string;
  highlights: string[];
};

export default function ProjectPageClient({ slug }: { slug: string }) {
  // Keep project pages in sync with the curated, repository-checked catalogue.
  // Older hand-written case studies included claims that were not supported by the repositories.
  const project = (() => {
    const entry = getPortfolioProject(slug);
    if (!entry) return undefined;
    return {
      title: entry.title,
      category: entry.categories.map((category) => PROJECT_CATEGORIES.find((item) => item.id === category)?.label ?? category).join(' · '),
      tagline: entry.context,
      overview: entry.summary,
      problemSolved: entry.status === 'Incomplete' || entry.status === 'Prototype'
        ? `Project status: ${entry.status.toLowerCase()}. The available repository evidence does not support claiming unfinished capabilities as complete.`
        : 'This project record summarizes repository-backed functionality and scope.',
      architecture: `Technologies listed: ${entry.technologies.join(', ')}. Repository creation date: ${entry.repositoryCreatedAt ?? 'not verified'}. This is repository metadata, not a development or completion date.`,
      features: entry.features,
      tech: entry.technologies,
      techCategories: [{ category: 'Technology Stack', items: entry.technologies }],
      live: entry.liveUrl ?? null,
      repo: entry.repository,
      image: entry.image,
      role: entry.context,
      year: entry.repositoryCreatedAt ? `GitHub repository created ${entry.repositoryCreatedAt}` : 'Repository date unavailable',
      highlights: [],
    } satisfies ProjectDetails;
  })();
  if (!project) return null;

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cyber-bg px-6 text-center text-ink">
        <div className="space-y-4">
          <h1 className="text-3xl font-black">Project Not Found</h1>
          <p className="text-sm text-taupe">The requested project case study could not be located.</p>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-xs font-bold text-white transition hover:bg-cyber-blue"
          >
            <ArrowLeft size={16} /> Back to Featured Projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cyber-bg px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-ink selection:bg-cyber-emerald selection:text-white">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-xl border border-sand bg-cyber-card px-4 py-2 text-xs font-bold text-taupe transition hover:border-cyber-blue hover:text-cyber-blue shadow-sm"
          >
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </Link>

          <span className="text-[11px] font-mono font-bold text-taupe">
            Akarsh Mishra Portfolio · Case Study
          </span>
        </div>

        {/* Project Header Card */}
        <article className="rounded-3xl border-2 border-sand bg-cyber-card p-6 sm:p-10 lg:p-12 shadow-premium space-y-8 text-left">
          
          {/* Header Metadata */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-cyber-blue/10 border border-cyber-blue/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyber-blue">
                {project.category}
              </span>
              <span className="rounded-full bg-black/5 border border-sand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-taupe font-mono">
                {project.year}
              </span>
              <span className="rounded-full bg-emerald-50 border border-emerald-300 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 font-mono">
                {project.role}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-ink tracking-tight leading-[1.1]">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg font-semibold text-cyber-cyan">
              {project.tagline}
            </p>
          </div>

          {/* Screenshot Preview Slot if available */}
          {project.image && (
            <div className="overflow-hidden rounded-2xl border-2 border-sand bg-black/5 shadow-inner">
              <img
                src={project.image}
                alt={`${project.title} Interface Preview`}
                className="w-full max-h-[420px] object-contain object-center bg-white"
              />
            </div>
          )}

          {/* Action Links Bar */}
          <div className="flex flex-wrap items-center gap-3 border-y border-sand/70 py-5">
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-xs sm:text-sm font-bold text-cyber-bg transition hover:bg-cyber-blue hover:shadow-glow-blue/20"
            >
              <Github size={16} />
              <span>Inspect Source Code</span>
              <ArrowUpRight size={14} />
            </a>

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-sand bg-white px-5 py-3 text-xs sm:text-sm font-bold text-ink transition hover:border-cyber-blue hover:text-cyber-blue shadow-sm"
              >
                <Globe size={16} className="text-cyber-cyan" />
                <span>Visit Live Application</span>
                <ExternalLink size={14} />
              </a>
            )}

            <Link
              href="/#service-enquiry"
              className="inline-flex items-center gap-2 rounded-xl border border-sand bg-cyber-bg px-4 py-3 text-xs sm:text-sm font-bold text-taupe transition hover:border-cyber-pink hover:text-cyber-pink shadow-sm ml-auto"
            >
              <Sparkles size={14} className="text-cyber-pink" />
              <span>Request Similar Project</span>
            </Link>
          </div>

          {/* Section 1: Detailed Overview */}
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-ink">
              <Code2 size={16} className="text-cyber-blue" />
              Project Overview &amp; Scope
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-taupe font-normal">
              {project.overview}
            </p>
          </div>

          {/* Section 2: Problem Solved */}
          <div className="space-y-3 rounded-2xl border border-sand bg-white/70 p-6">
            <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-ink">
              <Zap size={16} className="text-amber-500" />
              Practical Problem Solved &amp; Impact
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-taupe">
              {project.problemSolved}
            </p>
          </div>

          {/* Section 3: Architecture & Engineering */}
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-ink">
              <Cpu size={16} className="text-cyber-purple" />
              System Architecture &amp; Engineering Decisions
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-taupe">
              {project.architecture}
            </p>
          </div>

          {/* Section 4: Key Features & Capabilities */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-ink">
              <CheckCircle2 size={16} className="text-cyber-emerald" />
              Key Features &amp; Capabilities
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-sand bg-white p-3.5 shadow-sm text-xs text-taupe font-medium"
                >
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Highlights & Key Metrics */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-3 rounded-2xl border border-cyber-blue/30 bg-cyber-blue/5 p-6">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-cyber-blue">
                Verified Milestones &amp; Highlights
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-taupe">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyber-blue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section 6: Categorized Technology Stack */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-ink">
              <Layers size={16} className="text-cyber-cyan" />
              Technologies &amp; Libraries Deployed
            </h2>

            {project.techCategories ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {project.techCategories.map((group) => (
                  <div key={group.category} className="rounded-xl border border-sand bg-white p-4 space-y-2">
                    <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
                      {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded bg-black/5 border border-sand px-2 py-0.5 text-[10px] font-mono text-taupe font-bold"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {project.tech.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-xl border border-sand bg-white px-3.5 py-1.5 text-xs font-mono font-bold text-taupe shadow-sm"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom CTA Box */}
          <div className="border-t border-sand pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-bold text-taupe hover:text-cyber-blue transition"
            >
              <ArrowLeft size={14} /> Back to all featured projects
            </Link>

            <Link
              href="/#service-enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-purple px-6 py-3 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:shadow-glow-blue/30"
            >
              <span>Discuss a Custom Solution</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
