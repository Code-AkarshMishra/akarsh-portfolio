'use client';

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Download,
  ExternalLink,
  FileText,
  Github,
  Globe,
  GraduationCap,
  Menu,
  Trophy,
  X,
  BookMarked,
  FileBadge,
  ChevronDown,
  Sparkles,
  Grid,
  SlidersHorizontal,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TiltCard from '@/components/TiltCard';
import GitHubActivity from '@/components/GitHubActivity';
import CodingProfiles from '@/components/CodingProfiles';
import GlobalSearchNav from '@/components/GlobalSearchNav';
import HorizontalSlider from '@/components/HorizontalSlider';
import ServiceEnquiryForm from '@/components/ServiceEnquiryForm';
import ProfessionalFooter from '@/components/ProfessionalFooter';
import CommunityFlipCard from '@/components/CommunityFlipCard';
import { PORTFOLIO_PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from '@/lib/project-catalog';

type ImageModalState = {
  title: string;
  image: string;
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

type RepositoryFilter = 'all' | RepositorySummary['category'];

const repositoryFilters: { id: RepositoryFilter; label: string }[] = [
  { id: 'all', label: 'All Repositories' },
  { id: 'react', label: 'React / Next' },
  { id: 'python', label: 'Python / AI' },
  { id: 'java', label: 'Java Swing' },
  { id: 'js', label: 'JS / HTML5' },
];

const featuredProjects = PORTFOLIO_PROJECTS;

const skillsCategories = [
  {
    title: 'Frontend Frameworks',
    items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Vanilla CSS3', 'HTML5', 'Framer Motion'],
  },
  {
    title: 'Backend & Servers',
    items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'Socket.io', 'JWT Middlewares', 'Argon2id'],
  },
  {
    title: 'Databases & Storage',
    items: ['MongoDB', 'Mongoose schemas', 'SQL Databases', 'Firebase suite', 'Local Storage Sync'],
  },
  {
    title: 'AI / Machine Learning',
    items: ['Python', 'OpenCV Vision', 'scikit-learn', 'Google Gemini API', 'CNN Architectures', 'NLP Pipelines'],
  },
  {
    title: 'Core Computer Science',
    items: ['Data Structures & Algorithms', 'Object-Oriented Programming (Java)', 'DBMS', 'Design & Analysis of Algorithms'],
  },
  {
    title: 'DevOps & Tooling',
    items: ['Git & GitHub', 'Docker', 'Vercel', 'Render', 'Postman', 'Technical SEO'],
  },
];

const certificates = [
  { title: 'Smart India Hackathon 2026', type: 'Internal hackathon · first rank', date: '2026', image: '/certificates/SIH_2026_Certificate_Akarsh Mishra.pdf', key: 'sih-doc' },
  { title: 'HackWithUP 2025', type: 'State-level finalist', date: '2025', image: '/certificates/HWUP.png', key: 'hwup' },
  { title: 'GirlScript Summer of Code', type: 'Open-source contributor', date: '2026', image: '/certificates/GSSoC-2026-Certificate.pdf', key: 'gssoc-pdf' },
  { title: 'NIT Delhi Ideathon', type: 'Ideathon certificate', date: 'NIT Delhi', image: '/certificates/Ideathon-nitdelhi.pdf', key: 'nit-delhi' },
  { title: 'Vault of Codes Letter of Recommendation', type: 'Python development', date: 'Internship', image: '/certificates/OFFERLETTER.png', key: 'lor' },
  { title: 'Python Developer Internship', type: 'Vault of Codes', date: 'Completion certificate', image: '/certificates/python-intern.png', key: 'py-intern' },
  { title: 'Web Developer Internship', type: 'Vault of Codes', date: 'Completion certificate', image: '/certificates/webD-intern.png', key: 'webD-intern' },
  { title: 'Social Summer of Code', type: 'Open-source contributor', date: 'Contributor badge', image: '/certificates/SSOC.png', key: 'ssoc-badge' },
  { title: 'Research Paper Presentation', type: 'ICSI 2.0 · SRMU', date: 'Presented', image: '/certificates/confrence certificate.pdf', key: 'conference' },
  { title: 'Deloitte Technology Simulation', type: 'Technology simulation', date: 'July 2025', image: '/certificates/deloitte-tech.png', key: 'deloitte-tech' },
  { title: 'Deloitte Cyber Simulation', type: 'Cybersecurity simulation', date: 'July 2025', image: '/certificates/deloitte-cyber.png', key: 'deloitte-cyber' },
  { title: 'Google Ads Certification', type: 'Google Ads', date: 'Google', image: '/certificates/google-ads.jpeg', key: 'google-ads' },
  { title: 'Droid Lucknow', type: 'Android developer community', date: 'Lucknow', image: '/certificates/DroidLucknow.jpg', key: 'droid-lucknow' },
];

const researchPapers = [
  {
    title: 'Lightweight CNN-Based Facial Emotion Recognition Model for Edge AI Devices',
    subtitle: 'International Conference on Sustainable Innovation (Bridging Research & Industry for a Resilient Future)',
    details: 'Presented research paper on edge-optimized convolutional neural network blocks with minimal parameter footprints. Evaluated pooling strides, ReLU activations, and weight quantization filters for real-time inference on low-power IoT microcontrollers.',
    tech: ['Edge AI', 'CNN Optimization', 'Emotion Recognition', 'IoT Hardware', 'Quantization'],
    marker: 'Conference Paper Oral Presentation · In Review / In Press',
    theme: 'border-purple-500/25 bg-purple-50/60 text-purple-900',
    btnText: 'Open Conference Presentation Certificate (PDF)',
    imagePath: '/certificates/confrence certificate.pdf',
  },
  {
    title: 'Oral Seminar Presentation — Advanced Network Architectures & 6G Standards',
    subtitle: 'Departmental Colloquium, SRMU CS Department',
    details: 'Authored and presented a student seminar study analyzing 6G network standard proposals, examining beamforming parameters, cell grid topologies, and sub-terahertz transmission protocols.',
    tech: ['6G Standards', 'Network Topology', 'Seminars', 'Telecommunications'],
    marker: 'SRMU Seminar Review',
    theme: 'border-blue-500/25 bg-blue-50/60 text-blue-900',
    btnText: 'Open Oral Presentation Certificate',
    imagePath: '/certificates/confrence certificate.pdf',
  },
];

const timelineExperiences = [
  {
    title: 'Software Developer Intern',
    sub: 'Vault of Codes | Web & Python Tracks',
    date: 'Summer Internship',
    text: 'Worked on web and python tracks. Developed modular user-friendly forms, resolved layout bugs, and received a Letter of Recommendation for excellent python scripts.',
    badge: 'Internship',
  },
  {
    title: 'State Hackathon Finalist',
    sub: 'Hack With Uttar Pradesh 2025',
    date: 'State-Level Finalist',
    text: 'Qualified for the offline Grand Finale state finals. Prototyped adaptive lesson cards and study trackers side-by-side with Script Squad teammate builders.',
    badge: 'State Finalist',
  },
  {
    title: 'Student Tech Lead & Club General Secretary',
    sub: 'SRMU Lucknow Tech Fusion Club',
    date: 'Leadership & Coordination',
    text: 'Elected General Secretary of Tech Fusion Club at SRMU. Successfully managed college hackathons, drafted technical specifications, and coordinated student team rosters.',
    badge: 'Leadership',
  },
];

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageModalState | null>(null);
  const [repositories, setRepositories] = useState<RepositorySummary[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<RepositoryFilter>('all');
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [repoLoadError, setRepoLoadError] = useState(false);
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<'all' | ProjectCategory>('all');

  // Device-Adaptive View Toggle: Grid on Desktop/Tablet by default; Slide on Phone by default
  const [forceDesktopSlider, setForceDesktopSlider] = useState(false);

  useEffect(() => {
    fetch('/api/github-repos')
      .then(async (res) => {
        if (!res.ok) throw new Error('GitHub repositories are unavailable.');
        return (await res.json()) as { repos: RepositorySummary[] };
      })
      .then((data) => {
        setRepositories(data.repos);
        setLoadingRepos(false);
      })
      .catch((error: unknown) => {
        console.error('Unable to load public GitHub repositories:', error);
        setRepoLoadError(true);
        setLoadingRepos(false);
      });
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Projects', href: '#projects' },
    { name: 'Enquiry', href: '#service-enquiry' },
    { name: 'Repositories', href: '#repositories' },
    { name: 'Open Source', href: '#open-source' },
    { name: 'Academic', href: '#academic' },
    { name: 'Growth / CGPA', href: '#academic-growth' },
    { name: 'Tech Communities', href: '#co-curricular' },
    { name: 'Timeline', href: '#experience' },
    { name: 'Certifications', href: '#certifications-gallery' },
    { name: 'Coding Profiles', href: '#coding-profiles' },
    { name: 'About', href: '#about' },
  ];
  const primaryNavLinks = navLinks.filter(({ name }) =>
    ['Projects', 'Enquiry', 'Academic', 'About'].includes(name)
  );
  const moreNavLinks = navLinks.filter(({ name }) =>
    !primaryNavLinks.some((link) => link.name === name)
  );

  const filteredFeaturedProjects = featuredProjects
    .filter((p) => projectCategoryFilter === 'all' || p.categories.includes(projectCategoryFilter))
    .sort((a, b) => {
      const categoryA = projectCategoryFilter === 'all' ? a.categories[0] : projectCategoryFilter;
      const categoryB = projectCategoryFilter === 'all' ? b.categories[0] : projectCategoryFilter;
      const categoryOrderA = PROJECT_CATEGORIES.findIndex(({ id }) => id === categoryA);
      const categoryOrderB = PROJECT_CATEGORIES.findIndex(({ id }) => id === categoryB);
      const categoryDifference = categoryOrderA - categoryOrderB;
      if (categoryDifference !== 0) return categoryDifference;
      const priorityDifference = Number(a.priority.slice(1)) - Number(b.priority.slice(1));
      if (priorityDifference !== 0) return priorityDifference;
      return (b.repositoryCreatedAt ?? '').localeCompare(a.repositoryCreatedAt ?? '');
    });

  const filteredRepos = repositories.filter((repo) => {
    const matchesSearch =
      repo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.simpleDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.tech.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeTab === 'all' || repo.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  // Reusable Project Card Renderer
  const renderProjectCard = (project: typeof PORTFOLIO_PROJECTS[number]) => (
    <TiltCard key={project.slug}>
      <article className="flex h-full min-h-[300px] flex-col justify-between rounded-3xl border-2 border-sand bg-cyber-card p-6 transition-all duration-300 hover:border-cyber-blue/60 sm:p-7">
        <div className="text-left space-y-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="max-w-[calc(100%-54px)] truncate rounded-full border border-sand bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-taupe sm:text-[10px]">
              {project.context}
            </span>
            <span className="shrink-0 rounded-full bg-cyber-blue/10 px-2 py-1 text-[9px] font-bold uppercase text-cyber-blue font-mono">
              {project.priority}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-ink tracking-tight hover:text-cyber-blue transition duration-200">
            {project.title}
          </h3>

          <p className="text-xs leading-relaxed text-taupe font-medium line-clamp-3">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.map((item) => (
              <span key={item} className="rounded-lg bg-black/5 border border-sand px-2.5 py-1 text-[10px] font-mono text-taupe font-bold">
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.categories.filter((category) => category !== 'featured').map((category) => (
              <span key={category} className="rounded-full bg-cyber-blue/5 px-2 py-1 text-[9px] font-semibold text-cyber-blue">
                {PROJECT_CATEGORIES.find((item) => item.id === category)?.label ?? category}
              </span>
            ))}
          </div>
          {project.repositoryCreatedAt && (
            <p className="text-[10px] text-taupe">GitHub repository created {project.repositoryCreatedAt}</p>
          )}
        </div>

        <div className="pt-6 border-t border-sand/50 mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => router.push(`/projects/${project.slug}`)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-ink text-cyber-bg px-4 py-2.5 text-xs font-bold transition hover:bg-cyber-blue hover:shadow-glow-blue/20 duration-200"
          >
            <span>View Details</span>
            <ArrowRight size={13} />
          </button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-sand bg-white p-2.5 text-xs font-bold text-taupe hover:border-cyber-blue hover:text-ink transition duration-200 shadow-sm"
              title="Open Live Application"
            >
              <Globe size={15} />
            </a>
          )}
          <a
            href={project.repository}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-sand bg-white p-2.5 text-xs font-bold text-taupe hover:border-cyber-blue hover:text-ink transition duration-200 shadow-sm"
            title="Inspect GitHub Source Code"
          >
            <Github size={15} />
          </a>
        </div>
      </article>
    </TiltCard>
  );

  return (
    <main className="min-h-screen overflow-x-hidden font-sans text-ink bg-cyber-bg selection:bg-cyber-emerald selection:text-white">
      {/* Top Scroll Indicator */}
      <motion.div className="fixed left-0 right-0 top-0 z-[110] h-0.5 origin-left bg-cyber-blue" style={{ scaleX }} />

      {/* Navigation Header */}
      <nav className="fixed left-0 right-0 top-0 z-[100] border-b border-sand bg-cyber-bg/85 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#hero" aria-label="Akarsh Mishra home" className="flex shrink-0 items-center gap-2.5 text-ink">
            <span className="h-2.5 w-2.5 rounded-full bg-cyber-blue animate-pulse shadow-glow-blue" />
            <span className="text-xs font-extrabold tracking-tight transition duration-200 hover:text-cyber-blue sm:text-sm">
              Akarsh Mishra
            </span>
          </a>

          <div className="hidden items-center gap-1.5 xl:flex">
            <div className="flex items-center gap-0.5 rounded-full border border-sand bg-cyber-card/70 p-1">
              {primaryNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="whitespace-nowrap rounded-full px-2.5 py-2 text-[10px] font-bold uppercase tracking-wide text-taupe transition duration-200 hover:bg-white hover:text-cyber-blue 2xl:px-3 xl:text-[11px]"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="relative">
              <button
                type="button"
                aria-expanded={isMoreMenuOpen}
                aria-haspopup="true"
                onClick={() => setIsMoreMenuOpen((open) => !open)}
                className="inline-flex items-center gap-1 rounded-full border border-sand bg-cyber-card/70 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-taupe transition hover:border-cyber-blue/30 hover:bg-white hover:text-cyber-blue xl:text-[11px]"
              >
                More <ChevronDown size={13} className={`transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isMoreMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.14 }}
                    className="absolute right-0 top-full z-[120] mt-2 w-52 rounded-2xl border border-sand bg-cyber-bg p-2 shadow-xl"
                  >
                    {moreNavLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMoreMenuOpen(false)}
                        className="block rounded-xl px-3 py-2.5 text-xs font-semibold text-taupe transition hover:bg-white hover:text-cyber-blue"
                      >
                        {link.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Global Command Search */}
          <GlobalSearchNav
            onOpenDoc={(title, path) => setSelectedImage({ title, image: path })}
          />

          <button
            aria-label="Toggle navigation"
            className="rounded-full border border-sand p-2 text-taupe transition hover:bg-black/5 xl:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              id="mobile-navigation"
              className="border-t border-sand bg-cyber-bg px-6 py-4 shadow-lg xl:hidden"
            >
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-xl border border-sand px-3 py-2.5 text-xs font-semibold text-taupe transition hover:border-cyber-blue/40 hover:bg-white hover:text-cyber-blue"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative px-6 pb-12 pt-32 md:pb-16 md:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-left space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-sand bg-cyber-card px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-cyber-blue shadow-glow-blue/10 max-w-full flex-wrap">
              <span className="h-2 w-2 shrink-0 rounded-full bg-cyber-blue" />
              <span className="truncate">Akarsh Mishra · SRMU Lucknow</span>
            </div>

            <h1 className="max-w-4xl text-3xl sm:text-4xl font-extrabold leading-[1.12] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink font-black">Akarsh Mishra</span>.
            </h1>

            <p className="text-base font-semibold text-cyber-cyan sm:text-xl">
              Full-Stack Developer · B.Tech Computer Science student
            </p>

            <p className="max-w-2xl text-base leading-relaxed text-taupe pt-2">
              I am <strong>Akarsh Mishra</strong>, a Computer Science student at <strong>Shri Ramswaroop Memorial University (SRMU), Lucknow</strong>.
              I develop robust web platforms, design production client experiences, and engineer applied machine learning and edge AI models.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-purple px-5 py-3 text-sm font-bold text-cyber-bg transition hover:-translate-y-0.5 hover:shadow-glow-blue/50 duration-200"
              >
                Explore Projects <ArrowRight size={16} />
              </a>
              <a
                href="#service-enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyber-pink to-cyber-purple px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-glow-pink/40 duration-200"
              >
                <Sparkles size={16} /> Request a Service
              </a>
              <a
                href="/Akarsh_Mishra_Resume.pdf"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyber-blue bg-cyber-blue/10 px-5 py-3 text-sm font-bold text-cyber-blue transition hover:-translate-y-0.5 hover:bg-cyber-blue hover:text-cyber-bg hover:shadow-glow-blue/40 duration-200"
              >
                <Download size={16} /> View Resume
              </a>
            </div>
          </motion.div>

          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-sm flex items-center justify-center"
          >
            <div className="relative w-64 overflow-hidden rounded-2xl border border-sand bg-white p-2 shadow-premium sm:w-72 md:w-80">
              <img
                src="/profile.jpg"
                alt="Akarsh Mishra"
                className="aspect-[4/5] w-full rounded-xl object-cover object-top"
              />
              <p className="px-3 py-3 text-center text-xs font-semibold text-taupe">
                B.Tech Computer Science · SRMU Lucknow
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="px-6 py-20 border-t border-sand bg-cyber-bg/50">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="max-w-3xl space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyber-blue">Who I Am</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
                I build software to solve practical problems.
              </h2>

              <p className="text-sm leading-relaxed text-taupe">
                My name is <strong>Akarsh Mishra</strong>, and I study Computer Science at <strong>Shri Ramswaroop Memorial University (SRMU)</strong>.
                My work spans full-stack web applications, edge AI model deployment, and student technology governance.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 pt-4">
                {[
                  ['Academic Details', 'B.Tech CSE (2023–2027) at SRMU Lucknow. Rank Holder in the Computer Science (CS) Merit List.'],
                  ['Core Expertise', 'Full-stack development (Next.js, React, Node.js, FastAPI), Python, applied edge ML, and open-source contributions.'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-sand bg-cyber-card p-5 hover:border-cyber-blue/30 transition shadow-premium">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-ink">{title}</h3>
                    <p className="mt-2.5 text-xs text-taupe leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CURATED PROJECT CATALOG */}
      <section id="projects" className="px-6 py-20 border-t border-sand">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyber-purple">Selected Work & Project Archive</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-5xl mt-2">
                  Projects
                </h2>
                <p className="text-sm text-taupe mt-2">
                  Browse projects by context and discipline. GitHub creation dates are shown where verified and describe repository age, not project completion.
                </p>
              </div>

              {/* Filter Tabs & Desktop Layout Switcher */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {[{ id: 'all', label: 'All Projects' }, ...PROJECT_CATEGORIES].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setProjectCategoryFilter(tab.id as typeof projectCategoryFilter)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-bold transition duration-200 border ${
                        projectCategoryFilter === tab.id
                          ? 'bg-cyber-blue border-cyber-blue text-white shadow-glow-blue/20'
                          : 'border-sand bg-cyber-card text-taupe hover:text-ink'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* View Switcher for Desktop / Tablet */}
                <div className="hidden md:flex items-center gap-1 rounded-xl border border-sand bg-white p-1 ml-2">
                  <button
                    onClick={() => setForceDesktopSlider(false)}
                    title="Grid View"
                    className={`rounded-lg p-1.5 transition ${!forceDesktopSlider ? 'bg-cyber-blue text-white shadow-sm' : 'text-taupe hover:text-ink'}`}
                  >
                    <Grid size={15} />
                  </button>
                  <button
                    onClick={() => setForceDesktopSlider(true)}
                    title="Slider View"
                    className={`rounded-lg p-1.5 transition ${forceDesktopSlider ? 'bg-cyber-blue text-white shadow-sm' : 'text-taupe hover:text-ink'}`}
                  >
                    <SlidersHorizontal size={15} />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* VIEW 1: MOBILE PHONE SLIDER (< 768px) OR IF USER TOGGLED DESKTOP SLIDER */}
          <div className={forceDesktopSlider ? 'block' : 'block md:hidden'}>
            <HorizontalSlider
              autoplayInterval={5000}
              label="Featured Projects Mobile Slideshow"
            >
              {filteredFeaturedProjects.map((project) => (
                <div key={project.slug} className="w-full p-1 sm:p-2">
                  {renderProjectCard(project)}
                </div>
              ))}
            </HorizontalSlider>
          </div>

          {/* VIEW 2: TABLET (md: 2-col) & LAPTOP/DESKTOP (lg: 3-col) RESPONSIVE GRID */}
          {!forceDesktopSlider && (
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFeaturedProjects.map((project, idx) => (
                <FadeIn key={project.slug} delay={idx * 0.05}>
                  {renderProjectCard(project)}
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TECHNICAL REPOSITORY ARCHIVE — RESPONSIVE: SLIDER ON PHONE, GRID ON TABLET & DESKTOP */}
      <section id="repositories" className="px-6 py-20 border-t border-sand bg-cyber-bg/25">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-10 text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyber-blue">Code Ledger</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
                Technical Repository Archive
              </h2>
              <p className="text-sm leading-relaxed text-taupe">
                Browse source repositories for the curated projects. Forks and unrelated practice repositories are excluded from these cards.
              </p>
            </div>
          </FadeIn>

          {/* Search bar & Category filters */}
          <FadeIn delay={0.08}>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 max-w-4xl mx-auto">
              <div className="relative w-full md:max-w-md">
                <input
                  type="text"
                  placeholder="Search repository title or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-sand bg-cyber-card px-5 py-3 pl-12 text-sm font-semibold text-ink placeholder-taupe/60 outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue/35 transition"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe/60">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-cyber-pink hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {repositoryFilters.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition duration-200 border ${
                      activeTab === tab.id
                        ? 'bg-cyber-blue border-cyber-blue text-white shadow-glow-blue/20'
                        : 'border-sand bg-cyber-card text-taupe hover:text-ink'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {loadingRepos ? (
            <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
              <div className="h-8 w-8 rounded-full border-2 border-cyber-blue border-t-transparent animate-spin" />
              <span className="text-xs font-bold text-taupe">Querying GitHub API...</span>
            </div>
          ) : filteredRepos.length > 0 ? (
            <>
              {/* Phone View: Horizontal Carousel */}
              <div className="block md:hidden">
                <HorizontalSlider
                  autoplayInterval={2600}
                  label="GitHub Repositories Mobile Slideshow"
                >
                  {filteredRepos.map((repo) => (
                    <div key={repo.name} className="w-full p-1 sm:p-2">
                      <article className="flex min-h-[260px] flex-col justify-between rounded-3xl border-2 border-sand p-6 bg-cyber-card shadow-premium hover:border-cyber-blue/40 duration-300 text-left">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="inline-block rounded-full border border-sand bg-white px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-taupe font-mono">
                              {repo.category === 'js' ? 'JavaScript' : repo.category}
                            </span>
                            <div className="flex items-center gap-2">
                              {repo.liveUrl && (
                                <a href={repo.liveUrl} target="_blank" rel="noreferrer" className="text-taupe hover:text-cyber-blue transition">
                                  <Globe size={16} />
                                </a>
                              )}
                              <a href={repo.url} target="_blank" rel="noreferrer" className="text-taupe hover:text-cyber-blue transition">
                                <Github size={16} />
                              </a>
                            </div>
                          </div>

                          <h3 className="text-lg font-black text-ink tracking-tight hover:text-cyber-blue transition">
                            <a href={repo.url} target="_blank" rel="noreferrer">
                              {repo.title}
                            </a>
                          </h3>
                          <p className="text-xs leading-relaxed text-taupe font-medium line-clamp-3">
                            {repo.simpleDesc}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-sand/50 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-1">
                            {repo.tech.slice(0, 3).map((item: string) => (
                              <span key={item} className="rounded bg-black/5 border border-sand px-2 py-0.5 text-[9px] font-mono text-taupe font-bold">
                                {item}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-3 text-xs font-bold text-taupe font-mono"><a href={`/projects/${repo.slug}`} className="font-sans text-cyber-blue hover:underline">View Details</a>{repo.stars !== null && <span className="text-amber-600">★ {repo.stars}</span>}{repo.forks !== null && <span className="text-cyber-cyan">⑂ {repo.forks}</span>}</div>
                        </div>
                      </article>
                    </div>
                  ))}
                </HorizontalSlider>
              </div>

              {/* Tablet & Desktop View: 2-col on Tablet, 3-col on Laptop & Desktop */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRepos.map((repo, idx) => (
                  <FadeIn key={repo.name} delay={idx * 0.03}>
                    <TiltCard>
                      <article className="flex h-full min-h-[260px] flex-col justify-between rounded-3xl border-2 border-sand p-6 bg-cyber-card shadow-premium hover:border-cyber-blue/40 duration-300 text-left">
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between">
                            <span className="inline-block rounded-full border border-sand bg-white px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-taupe font-mono">
                              {repo.category === 'js' ? 'JavaScript' : repo.category}
                            </span>
                            <div className="flex items-center gap-2.5">
                              {repo.liveUrl && (
                                <a href={repo.liveUrl} target="_blank" rel="noreferrer" className="text-taupe hover:text-cyber-blue transition" title="Live Preview">
                                  <Globe size={16} />
                                </a>
                              )}
                              <a href={repo.url} target="_blank" rel="noreferrer" className="text-taupe hover:text-cyber-blue transition" title="GitHub Repository">
                                <Github size={16} />
                              </a>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-black text-ink tracking-tight hover:text-cyber-blue transition">
                              <a href={repo.url} target="_blank" rel="noreferrer">
                                {repo.title}
                              </a>
                            </h3>
                            <p className="mt-2 text-xs leading-relaxed text-taupe font-medium line-clamp-3">
                              {repo.simpleDesc}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-sand/50 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-1">
                            {repo.tech.slice(0, 3).map((item: string) => (
                              <span key={item} className="rounded bg-black/5 border border-sand px-2 py-0.5 text-[9px] font-mono text-taupe font-bold">
                                {item}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-3 text-xs font-bold text-taupe font-mono">
                            <a href={`/projects/${repo.slug}`} className="font-sans text-cyber-blue hover:underline">View Details</a>
                            {repo.stars !== null && <span className="text-amber-600">★ {repo.stars}</span>}
                            {repo.forks !== null && <span className="text-cyber-cyan">⑂ {repo.forks}</span>}
                          </div>
                        </div>
                      </article>
                    </TiltCard>
                  </FadeIn>
                ))}
              </div>
            </>
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-sand rounded-2xl bg-cyber-card">
              <span className="text-xs font-semibold text-taupe">
                {repoLoadError ? 'GitHub repositories temporarily unavailable.' : 'No repositories match this query.'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* OPEN SOURCE AND VERIFIED ACHIEVEMENTS */}
      <section id="open-source" className="px-6 py-20 border-t border-sand bg-cyber-bg/50">
        <div className="mx-auto max-w-6xl space-y-12">
          <FadeIn>
            <div className="max-w-2xl mx-auto space-y-4 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyber-pink">Open-source contributions</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
                Open Source &amp; GitHub
              </h2>
              <p className="text-sm leading-relaxed text-taupe">
                Public GitHub contribution activity and profile links. Private activity is not included.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <GitHubActivity />
          </FadeIn>

          {/* Program certificates and badges */}
          <FadeIn delay={0.15}>
            <div className="grid gap-6 md:grid-cols-2 pt-6">
              {/* GSSoC Contributor box */}
              <div className="rounded-2xl border-2 border-orange-500/25 bg-orange-50/60 p-6 text-left shadow-glow-orange/10 hover:border-orange-500 hover:shadow-glow-orange/20 transition duration-300">
                <div className="flex items-center gap-2.5 mb-4">
                  <FileBadge className="text-orange-600" size={24} />
                  <div>
                    <h3 className="font-bold text-ink text-base">GSSoC 2026 CONTRIBUTOR</h3>
                    <p className="text-xs text-taupe">GirlScript Summer of Code · certificate and program badges</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: 'First Steps', path: '/certificates/gssoc-badge-first_steps.png' },
                    { label: 'Profile Complete', path: '/certificates/gssoc-badge-profile_complete.png' },
                    { label: 'Role Contributor', path: '/certificates/gssoc-badge-role_contributor.png' },
                  ].map((badge) => (
                    <button
                      key={badge.label}
                      onClick={() => setSelectedImage({ title: `GSSoC Badge — ${badge.label}`, image: badge.path })}
                      className="group flex flex-col items-center gap-1.5 rounded-xl border border-orange-200/60 bg-white p-2 text-center hover:border-orange-500 hover:shadow-sm transition duration-200"
                    >
                      <img src={badge.path} alt={badge.label} className="h-10 w-10 object-contain rounded" />
                      <span className="text-[9px] font-bold text-orange-700 uppercase tracking-wider leading-tight">{badge.label}</span>
                    </button>
                  ))}
                </div>

                <div
                  onClick={() => setSelectedImage({ title: 'GSSoC 2026 Contributor Certificate', image: '/certificates/GSSoC-2026-Certificate.pdf' })}
                  className="group relative h-28 w-full cursor-pointer overflow-hidden rounded-xl border border-sand bg-cyber-card flex items-center justify-between px-5 text-left hover:border-orange-400 transition"
                >
                  <div>
                    <span className="text-xs font-bold text-ink uppercase tracking-wider">Official Certificate PDF</span>
                    <p className="text-[10px] text-taupe mt-1">GSSoC 2026 Verified Contributor Certificate</p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Trophy className="text-orange-500/60 group-hover:scale-110 transition duration-300" size={24} />
                    <div className="rounded-lg bg-orange-100 border border-orange-500/30 px-2 py-0.5 text-[9px] font-bold text-orange-700">Open PDF</div>
                  </div>
                </div>
              </div>

              {/* SSOC Contributor box */}
              <div className="rounded-2xl border-2 border-emerald-500/25 bg-emerald-50/60 p-6 text-left shadow-glow-emerald/10 hover:border-emerald-500 hover:shadow-glow-emerald/20 transition duration-300">
                <div className="flex items-center gap-2.5 mb-4">
                  <FileBadge className="text-emerald-600" size={24} />
                  <div>
                    <h3 className="font-bold text-ink text-base">SSOC CONTRIBUTOR</h3>
                    <p className="text-xs text-taupe">Social Summer of Code — Verified Contribution Badge</p>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedImage({ title: 'SSOC Social Summer of Code — Contributor Badge', image: '/certificates/SSOC.png' })}
                  className="group relative w-full mb-4 cursor-pointer overflow-hidden rounded-xl border border-sand bg-white flex items-center justify-center hover:border-emerald-400 transition p-3"
                >
                  <img src="/certificates/SSOC.png" alt="SSOC Contributor Badge" className="max-h-24 object-contain rounded" />
                  <div className="absolute bottom-2 right-2 rounded-lg bg-emerald-100 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold text-emerald-700">Click to Expand</div>
                </div>

                <div className="rounded-xl border border-emerald-200/60 bg-white p-3 text-left">
                  <p className="text-xs font-bold text-ink">Social Summer of Code (SSOC)</p>
                  <p className="text-[11px] text-taupe mt-0.5 leading-relaxed">Verified open-source participant badge.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ACADEMIC RESEARCH — RESPONSIVE: SLIDER ON PHONE, 2-COL GRID ON TABLET & DESKTOP */}
      <section id="academic" className="px-6 py-20 border-t border-sand">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-10 text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyber-blue">Academic Research</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
                Conference Papers &amp; Seminars
              </h2>
              <p className="text-sm leading-relaxed text-taupe">
                Verified research presentations and technical seminar studies. Inspect official certificates demonstrating lightweight edge AI architectures and wireless standards.
              </p>
            </div>
          </FadeIn>

          {/* Phone View: Horizontal Carousel */}
          <div className="block md:hidden">
            <HorizontalSlider
              autoplayInterval={2800}
              label="Academic Research Mobile Slideshow"
            >
              {researchPapers.map((paper, idx) => (
                <div key={idx} className="w-full p-1 sm:p-2">
                  <div className={`rounded-3xl border-2 p-6 text-left shadow-premium transition flex flex-col justify-between ${paper.theme}`}>
                    <div>
                      <div className="flex items-center justify-between border-b border-sand pb-3 mb-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-cyber-blue">{paper.marker}</span>
                          <h3 className="text-lg font-black text-ink mt-1 leading-snug">{paper.title}</h3>
                          <p className="text-xs text-taupe mt-0.5">{paper.subtitle}</p>
                        </div>
                        <BookMarked className="text-cyber-blue shrink-0 ml-2" size={22} />
                      </div>
                      <p className="text-xs leading-relaxed text-taupe mb-4">{paper.details}</p>
                    </div>

                    <div>
                      <div
                        onClick={() => setSelectedImage({ title: paper.title, image: paper.imagePath })}
                        className="group relative h-24 w-full mb-3 cursor-pointer overflow-hidden rounded-2xl border border-sand bg-white/70 flex flex-col items-center justify-center p-3 text-center hover:border-cyber-blue transition shadow-inner"
                      >
                        <FileBadge className="text-cyber-blue mb-1" size={20} />
                        <span className="text-xs font-bold text-ink">{paper.btnText}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {paper.tech.map((t) => (
                          <span key={t} className="rounded border border-black/10 bg-white/80 px-2 py-0.5 text-[9px] font-mono text-taupe uppercase font-bold">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </HorizontalSlider>
          </div>

          {/* Tablet & Desktop View: 2-column Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {researchPapers.map((paper, idx) => (
              <FadeIn key={idx} delay={idx * 0.08}>
                <div className={`h-full rounded-3xl border-2 p-8 text-left shadow-premium transition duration-300 flex flex-col justify-between ${paper.theme}`}>
                  <div>
                    <div className="flex items-center justify-between border-b border-sand pb-4 mb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-cyber-blue">
                          {paper.marker}
                        </span>
                        <h3 className="text-xl font-black text-ink mt-1.5 leading-snug">
                          {paper.title}
                        </h3>
                        <p className="text-xs text-taupe mt-1 font-medium">{paper.subtitle}</p>
                      </div>
                      <BookMarked className="text-cyber-blue shrink-0 ml-3" size={26} />
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-taupe mb-6">
                      {paper.details}
                    </p>
                  </div>

                  <div>
                    <div
                      onClick={() => setSelectedImage({ title: paper.title, image: paper.imagePath })}
                      className="group relative h-28 w-full mb-5 cursor-pointer overflow-hidden rounded-2xl border border-sand bg-white/70 flex flex-col items-center justify-center p-4 text-center hover:border-cyber-blue transition shadow-inner"
                    >
                      <FileBadge className="text-cyber-blue mb-1 group-hover:scale-110 transition duration-300" size={24} />
                      <span className="text-xs font-bold text-ink">{paper.btnText}</span>
                      <span className="text-[9px] text-taupe mt-0.5">Click to view official verified certificate</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {paper.tech.map((t) => (
                        <span key={t} className="rounded-lg border border-black/10 bg-white/80 px-2.5 py-1 text-[10px] font-mono text-taupe uppercase font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMIC PERFORMANCE & CGPA */}
      <section id="academic-growth" className="px-6 py-20 border-t border-sand">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-12 text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyber-emerald">B.Tech CSE · SRMU Lucknow</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
                Academic Performance
              </h2>
              <p className="text-sm leading-relaxed text-taupe">
                Official verified performance across completed semesters. Cumulative CGPA of <strong className="text-ink">8.28 / 10</strong> at Shri Ramswaroop Memorial University.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid items-start gap-6 lg:grid-cols-[1fr_2fr]">
              {/* Left — CGPA & Academic IDs Highlight Card */}
              <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/60 p-8 flex flex-col items-center justify-center text-center gap-4 hover:border-emerald-500 hover:shadow-[0_0_28px_rgba(16,185,129,0.18)] transition duration-300">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">Current CGPA</span>
                <div className="relative flex items-center justify-center w-36 h-36 rounded-full border-4 border-emerald-500/40 bg-white shadow-[0_0_30px_rgba(16,185,129,0.12)]">
                  <div className="text-center">
                    <span className="text-5xl font-extrabold text-emerald-600 leading-none">8.28</span>
                    <span className="block text-[10px] font-bold text-taupe mt-1">out of 10</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-ink">B.Tech Computer Science &amp; Engineering</p>
                  <p className="text-[11px] text-taupe font-medium">Shri Ramswaroop Memorial University (SRMU)</p>
                  <p className="text-[11px] text-taupe">2023 – 2027 · Lucknow, UP</p>
                </div>

                <div className="w-full rounded-xl border border-emerald-200 bg-white/80 p-3 space-y-1 text-left text-[11px] mt-2">
                  <p className="font-bold text-ink text-[10px] uppercase tracking-wider mb-1">Academic Details</p>
                  <p className="text-taupe">Class XII: <span className="font-bold text-ink">88.80%</span> — Malti Inter College (MIC), Pratapgarh, UP</p>
                  <p className="text-taupe">Class X: <span className="font-bold text-ink">83.50%</span> — Malti Inter College (MIC), Pratapgarh, UP</p>
                </div>

                {/* Academic IDs Strip */}
                <div className="w-full rounded-xl border border-emerald-200 bg-white/80 p-3 space-y-1 text-left text-[11px] font-mono">
                  <div className="flex justify-between">
                    <span className="text-taupe">Roll No:</span>
                    <span className="font-bold text-ink">20231010110310</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-300/50 px-3 py-1">
                  <span className="text-[10px] font-bold text-emerald-700">Rank Holder in the Computer Science (CS) Merit List</span>
                </div>
              </div>

              {/* Right — Per Semester SGPA Bars */}
              <details className="group self-start rounded-2xl border-2 border-sand bg-cyber-card p-5 sm:p-8">
                <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 border-b border-sand pb-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyber-blue">
                  <span className="text-sm font-extrabold uppercase tracking-wider text-ink">
                    Semester-wise SGPA (Sem 1 – Sem 8)
                  </span>
                  <span className="text-[10px] font-medium text-cyber-blue group-open:text-taupe">
                    <span className="group-open:hidden">Show semester results</span>
                    <span className="hidden group-open:inline">Click result badges to view PDFs</span>
                  </span>
                </summary>
                <div className="mt-5 space-y-5">
                {[
                  { sem: 'Semester 1', sgpa: 7.86, isScore: true,  color: 'bg-sky-500',     glow: 'shadow-[0_0_8px_rgba(14,165,233,0.35)]',  note: 'Foundation Year',  pdf: '/Results/Semester 1.pdf', chipColor: 'text-sky-700 bg-sky-100 border-sky-300/50 hover:bg-sky-500 hover:text-white hover:border-sky-500' },
                  { sem: 'Semester 2', sgpa: 8.58, isScore: true,  color: 'bg-emerald-500', glow: 'shadow-[0_0_8px_rgba(16,185,129,0.35)]',  note: 'Best Semester ★',  pdf: '/Results/Semester 2.pdf', chipColor: 'text-emerald-700 bg-emerald-100 border-emerald-300/50 hover:bg-emerald-500 hover:text-white hover:border-emerald-500' },
                  { sem: 'Semester 3', sgpa: 8.18, isScore: true,  color: 'bg-violet-500',  glow: 'shadow-[0_0_8px_rgba(139,92,246,0.35)]', note: '',                 pdf: '/Results/Semester 3.pdf', chipColor: 'text-violet-700 bg-violet-100 border-violet-300/50 hover:bg-violet-500 hover:text-white hover:border-violet-500' },
                  { sem: 'Semester 4', sgpa: 8.48, isScore: true,  color: 'bg-amber-500',   glow: 'shadow-[0_0_8px_rgba(245,158,11,0.35)]', note: '',                 pdf: '/Results/semester 4.pdf', chipColor: 'text-amber-700 bg-amber-100 border-amber-300/50 hover:bg-amber-500 hover:text-white hover:border-amber-500' },
                  { sem: 'Semester 5', sgpa: 8.33, isScore: true,  color: 'bg-rose-500',    glow: 'shadow-[0_0_8px_rgba(244,63,94,0.35)]',  note: '',                 pdf: '/Results/Semester 5.pdf', chipColor: 'text-rose-700 bg-rose-100 border-rose-300/50 hover:bg-rose-500 hover:text-white hover:border-rose-500' },
                  { sem: 'Semester 6', sgpa: 8.22, isScore: true,  color: 'bg-cyan-500',    glow: 'shadow-[0_0_8px_rgba(6,182,212,0.35)]',   note: 'Completed',        pdf: '/Results/SEMESTER6.pdf', chipColor: 'text-cyan-700 bg-cyan-100 border-cyan-300/50 hover:bg-cyan-500 hover:text-white hover:border-cyan-500' },
                  { sem: 'Semester 7', sgpa: 0, isScore: false, label: 'Ongoing', color: 'bg-indigo-500', glow: 'shadow-[0_0_8px_rgba(99,102,241,0.35)]', note: 'In Progress (Active)', chipColor: 'text-indigo-700 bg-indigo-100 border-indigo-300/50' },
                  { sem: 'Semester 8', sgpa: 0, isScore: false, label: 'Upcoming', color: 'bg-slate-400',  glow: '',                                        note: 'Final Semester',   chipColor: 'text-slate-600 bg-slate-100 border-slate-300/50' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-ink">{item.sem}</span>
                        {item.note && (
                          <span className={`text-[9px] font-bold rounded-full px-1.5 py-0.5 ${
                            item.note.includes('★')
                              ? 'text-emerald-700 bg-emerald-100 border border-emerald-300/40'
                              : item.note.includes('Progress')
                              ? 'text-indigo-700 bg-indigo-100 border border-indigo-300/40'
                              : 'text-taupe bg-black/5 border border-sand'
                          }`}>
                            {item.note}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-ink font-mono">
                          {item.isScore ? item.sgpa : item.label}
                        </span>
                        {item.pdf ? (
                          <button
                            onClick={() => setSelectedImage({ title: `${item.sem} Official Examination Result`, image: item.pdf! })}
                            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide transition duration-150 ${item.chipColor}`}
                          >
                            <FileText size={9} />
                            Result PDF
                          </button>
                        ) : (
                          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${item.chipColor}`}>
                            {item.label}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="h-3 w-full rounded-full bg-sand overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: item.isScore ? `${(item.sgpa / 10) * 100}%` : '0%' }}
                        viewport={{ once: true }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : i * 0.08, ease: 'easeOut' }}
                        className={`h-full rounded-full ${item.color} ${item.glow} `}
                      />
                    </div>
                  </div>
                ))}
                </div>
              </details>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TECH COMMUNITIES & LEADERSHIP */}
      <section id="co-curricular" className="border-t border-sand bg-cyber-bg/50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mx-auto mb-10 max-w-3xl space-y-4 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyber-blue">Leadership &amp; Community</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-5xl">Tech Communities, Hackathons &amp; Leadership</h2>
              <p className="text-sm leading-relaxed text-taupe">Flip a card to see event context, related projects, and public organization links.</p>
            </div>
          </FadeIn>

          {(() => {
            const cards = [
              {
                eyebrow: 'Developer Communities',
                title: 'Tech Communities',
                summary: 'Participation across developer meetups, learning events, and builder gatherings.',
                details: [
                  'Community events represented here include Google DevFest, Build with AI, Product Builders Day, Droid Lucknow, and Nirman 2026.',
                  'Nirman 2026 is listed as a community event; no organizer or speaker role is implied.',
                  'The Droid Lucknow certificate is available to view in the certificate gallery.',
                ],
                tags: ['DevFest 2025', 'Build with AI', 'Product Builders Day', 'Droid Lucknow', 'Nirman 2026'],
                icon: <Globe size={22} className="text-sky-600" />,
                theme: 'sky' as const,
                certificate: { label: 'View Droid Lucknow certificate', href: '/certificates/DroidLucknow.jpg' },
              },
              {
                eyebrow: 'Hackathons & Ideathons',
                title: 'Competitions',
                summary: 'Hackathon and ideathon participation, linked to projects created in those event contexts.',
                details: [
                  'HackWithUP 2025: state-level finalist, as recorded in the portfolio certificate list.',
                  'WeatherGPT is associated with the Smart India Hackathon; its project page describes repository-verified scope.',
                  'NeuroTrack AI / Cognitive Load Detector is associated with the NIT Delhi Ideathon.',
                ],
                tags: ['HackWithUP 2025', 'Smart India Hackathon', 'NIT Delhi Ideathon'],
                icon: <Trophy size={22} className="text-orange-600" />,
                theme: 'orange' as const,
                certificate: { label: 'View SIH certificate', href: '/certificates/SIH_2026_Certificate_Akarsh%20Mishra.pdf' },
                relatedLinks: [
                  { label: 'View HackWithUP certificate', href: '/certificates/HWUP.png' },
                  { label: 'WeatherGPT details', href: '/projects/weathergpt' },
                  { label: 'NeuroTrack AI details', href: '/projects/neurotrack-ai' },
                ],
              },
              {
                eyebrow: 'Student Leadership',
                title: 'General Secretary, Tech Fusion Club',
                summary: 'Student leadership at Shri Ramswaroop Memorial University, Lucknow.',
                details: [
                  'Served as General Secretary of the university�s Tech Fusion Club.',
                  'Supported student committees and club event coordination.',
                  'Organization and university links open their public websites.',
                ],
                tags: ['Tech Fusion Club', 'SRMU Lucknow', 'Student Leadership'],
                icon: <Award size={22} className="text-emerald-600" />,
                theme: 'emerald' as const,
                logos: [
                  { src: 'https://raw.githubusercontent.com/webdevpraveen/sih26_tfc/main/public/sih-logos/tfclogo.png', alt: 'Tech Fusion Club logo', href: 'https://techfusionclub.vercel.app/' },
                  { src: 'https://srmu.ac.in/assets/logo1-BgStIc1Y.png', alt: 'Shri Ramswaroop Memorial University logo', href: 'https://srmu.ac.in/' },
                ],
                relatedLinks: [
                  { label: 'Tech Fusion Club website', href: 'https://techfusionclub.vercel.app/' },
                  { label: 'Official SRMU website', href: 'https://srmu.ac.in/' },
                ],
              },
            ];
            return (
              <>
                <div className="block md:hidden">
                  <HorizontalSlider autoplayInterval={0} label="Community and leadership cards">
                    {cards.map((card) => <div key={card.title} className="w-full p-1 sm:p-2"><CommunityFlipCard {...card} /></div>)}
                  </HorizontalSlider>
                </div>
                <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
                  {cards.map((card) => <CommunityFlipCard key={card.title} {...card} />)}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section id="skills" className="px-6 py-20 border-t border-sand bg-cyber-bg/50">
        <div className="mx-auto max-w-7xl text-center space-y-12">
          <FadeIn>
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyber-pink">Technologies</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
                Tech Stack
              </h2>
              <p className="text-sm leading-relaxed text-taupe">
                Languages, frameworks, and tools deployed across my projects.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-sand bg-white p-5 shadow-premium sm:p-8">
              <img
                src="https://skillicons.dev/icons?i=js,ts,python,java,cpp,html,css,react,nextjs,tailwind,nodejs,express,mongodb,mysql,postgres,git,github,vercel,docker,postman,vscode&perline=7"
                alt="Tech Stack Logos"
                className="mx-auto h-auto max-w-full"
                loading="lazy"
              />
            </div>
            <div className="grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3 mt-6">
              {skillsCategories.map((cat, i) => (
                <div key={i} className="rounded-2xl border border-sand bg-cyber-card p-5">
                  <h3 className="text-sm font-bold text-ink">{cat.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-taupe">{cat.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <CodingProfiles />

      {/* TIMELINE & INTERNSHIPS — RESPONSIVE: SLIDER ON PHONE, 3-COL ON LAPTOP/DESKTOP */}
      <section id="experience" className="px-6 py-20 border-t border-sand">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-10 text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyber-blue">Chronology</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
                Timeline &amp; Internships
              </h2>
              <p className="text-sm leading-relaxed text-taupe">
                Internship experience, hackathon qualification, and technical club coordination.
              </p>
            </div>
          </FadeIn>

          {/* Phone View: Horizontal Carousel */}
          <div className="block md:hidden">
            <HorizontalSlider
              autoplayInterval={2600}
              label="Internships & Timeline Mobile Slideshow"
            >
              {timelineExperiences.map((item, idx) => (
                <div key={idx} className="w-full p-1 sm:p-2">
                  <div className="rounded-3xl border-2 border-sand bg-cyber-card p-6 shadow-premium text-left space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyber-blue font-mono">{item.date}</span>
                      <span className="rounded-full bg-black/5 border border-sand px-2.5 py-0.5 text-[9px] font-bold text-taupe uppercase font-mono">{item.badge}</span>
                    </div>
                    <h3 className="text-xl font-black text-ink">{item.title}</h3>
                    <h4 className="text-xs font-bold text-cyber-cyan">{item.sub}</h4>
                    <p className="text-xs leading-relaxed text-taupe">{item.text}</p>
                  </div>
                </div>
              ))}
            </HorizontalSlider>
          </div>

          {/* Tablet & Desktop View: 3-column Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timelineExperiences.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.08}>
                <div className="h-full rounded-3xl border-2 border-sand bg-cyber-card p-8 shadow-premium transition duration-300 text-left space-y-4 flex flex-col justify-between hover:border-cyber-blue/35">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyber-blue font-mono">
                        {item.date}
                      </span>
                      <span className="rounded-full bg-black/5 border border-sand px-3 py-1 text-[10px] font-bold text-taupe uppercase font-mono">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-ink">{item.title}</h3>
                    <h4 className="text-sm font-bold text-cyber-cyan">{item.sub}</h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-taupe">
                      {item.text}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* VERIFIED CREDENTIALS GALLERY — RESPONSIVE: SLIDER ON PHONE, 4-COL ON LAPTOP/DESKTOP */}
      <section id="certifications-gallery" className="px-6 py-20 border-t border-sand bg-cyber-bg/50">
        <div className="mx-auto max-w-7xl text-center space-y-12">
          <FadeIn>
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyber-purple">Gallery</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
                Verified Certificates &amp; Badges
              </h2>
              <p className="text-sm leading-relaxed text-taupe">
                Inspect official certificates, hackathon rankings, and open-source badges.
              </p>
            </div>
          </FadeIn>

          {/* Phone View: Horizontal Carousel */}
          <div className="block md:hidden">
            <HorizontalSlider
              autoplayInterval={2400}
              label="Verified Certificates Mobile Slideshow"
            >
              {certificates.map((cert, idx) => (
                <div key={idx} className="w-full p-1 sm:p-2">
                  <div className="rounded-3xl border-2 border-sand bg-cyber-card p-6 text-left shadow-premium flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="text-cyber-blue" size={20} />
                        <span className="rounded-full bg-black/5 border border-sand px-2 py-0.5 text-[9px] font-bold text-taupe font-mono uppercase">{cert.date}</span>
                      </div>
                      <h3 className="text-lg font-black text-ink">{cert.title}</h3>
                      <p className="text-xs text-taupe">{cert.type}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => setSelectedImage({ title: cert.title, image: cert.image })} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-ink px-3 py-2 text-xs font-bold text-white transition hover:bg-cyber-blue">
                        <FileBadge size={14} /> Preview
                      </button>
                      <a href={cert.image} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-sand bg-white px-3 py-2 text-xs font-bold text-ink transition hover:border-cyber-blue hover:text-cyber-blue">
                        View Certificate <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </HorizontalSlider>
          </div>

          {/* Tablet & Desktop View: 2-col on Tablet, 4-col on Laptop & Desktop */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {certificates.map((cert, idx) => (
              <FadeIn key={idx} delay={idx * 0.03}>
                <article className="group flex h-full flex-col justify-between rounded-2xl border-2 border-sand bg-cyber-card p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyber-blue hover:shadow-glow-blue/15">
                  <div>
                    <GraduationCap className="mb-3 text-cyber-blue group-hover:scale-110 transition duration-200" size={22} />
                    <h3 className="text-sm font-bold text-ink group-hover:text-cyber-blue transition">{cert.title}</h3>
                    <p className="mt-1 text-[11px] text-taupe leading-relaxed">{cert.type}</p>
                  </div>
                  <span className="inline-block mt-4 rounded-full bg-black/5 border border-sand px-2.5 py-0.5 text-[9px] font-bold text-taupe font-mono uppercase w-fit">
                    {cert.date}
                  </span>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setSelectedImage({ title: cert.title, image: cert.image })} className="inline-flex min-h-9 items-center justify-center gap-1 rounded-lg bg-ink px-2 py-2 text-[10px] font-bold text-white transition hover:bg-cyber-blue">
                      <FileBadge size={13} /> Preview
                    </button>
                    <a href={cert.image} target="_blank" rel="noreferrer" className="inline-flex min-h-9 items-center justify-center gap-1 rounded-lg border border-sand bg-white px-2 py-2 text-center text-[10px] font-bold text-ink transition hover:border-cyber-blue hover:text-cyber-blue">
                      View Certificate <ExternalLink size={12} />
                    </a>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE ENQUIRY SECTION */}
      <section id="service-enquiry" className="px-6 py-20 border-t border-sand bg-cyber-bg/40">
        <div className="mx-auto max-w-7xl text-center space-y-12">
          <FadeIn>
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyber-pink">
                Start a Collaboration
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
                Service Enquiry &amp; Consultation
              </h2>
              <p className="text-sm leading-relaxed text-taupe">
                Explain what you want to build. Fill in the form below and submit — I&apos;ll receive your enquiry directly in my inbox and it will be logged to my private records. I&apos;ll get back to you shortly.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <ServiceEnquiryForm />
          </FadeIn>
        </div>
      </section>

      {/* FULLSCREEN CERTIFICATE / PROOF IMAGE & PDF MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              onClick={(event) => event.stopPropagation()}
              className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border-2 border-sand bg-cyber-card shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-sand px-6 py-4 bg-cyber-card">
                <div className="flex items-center gap-2">
                  <FileBadge size={18} className="text-cyber-blue shrink-0" />
                  <h3 className="text-sm font-extrabold text-ink line-clamp-1">{selectedImage.title}</h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={selectedImage.image}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-sand bg-white px-3 py-1 text-xs font-bold text-taupe hover:text-cyber-blue transition shadow-sm"
                  >
                    <ExternalLink size={12} />
                    <span>Open in New Tab</span>
                  </a>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="rounded-full border border-sand p-1.5 text-taupe hover:bg-black/5 hover:text-ink transition"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-black/5 p-4 sm:p-6 flex items-center justify-center overflow-auto min-h-[450px]">
                {selectedImage.image.toLowerCase().endsWith('.pdf') ? (
                  <iframe
                    src={`${encodeURI(selectedImage.image)}#toolbar=0&view=FitH`}
                    title={selectedImage.title}
                    className="w-full h-[70vh] rounded-xl border-2 border-sand bg-white shadow-premium"
                  />
                ) : (
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="max-h-[72vh] w-auto rounded-xl border-2 border-sand object-contain shadow-premium bg-white"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPLETE PROFESSIONAL FOOTER */}
      <ProfessionalFooter />
    </main>
  );
}
