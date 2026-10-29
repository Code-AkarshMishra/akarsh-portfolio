import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPageClient from "./ProjectPageClient";
import { PORTFOLIO_PROJECTS, getPortfolioProject } from "@/lib/project-catalog";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = getPortfolioProject(slug)?.title ?? slug;
  const summary = getPortfolioProject(slug)?.summary ?? `${title} project case study by Akarsh Mishra.`;

  return {
    title: `${title} | Akarsh Mishra`,
    description: summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${title} | Akarsh Mishra`,
      description: summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  if (!getPortfolioProject(slug)) {
    notFound();
  }

  return <ProjectPageClient slug={slug} />;
}
