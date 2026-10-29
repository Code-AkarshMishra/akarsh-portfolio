'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ArrowRight,
  FileText,
  Briefcase,
  Cpu,
  Trophy,
  GraduationCap,
  Sparkles,
  Award,
  BookOpen,
  Command,
  CornerDownLeft,
  Users
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export type SearchItem = {
  id: string;
  title: string;
  category: 'client' | 'ai' | 'hackathon' | 'academic' | 'opensource' | 'community' | 'leadership';
  categoryLabel: string;
  badge?: string;
  description: string;
  actionType: 'navigate' | 'scroll' | 'pdf';
  target: string; // url, hash anchor, or pdf path
  icon: LucideIcon;
};

const SEARCH_DIRECTORY: SearchItem[] = [
  // Client & Freelance
  {
    id: 'client-sparsh',
    title: 'Sparsh Trading',
    category: 'client',
    categoryLabel: 'Client & Freelance Work',
    badge: 'Live Client Work',
    description: 'Business website for architectural metal fabrication, uPVC products, and interior solutions.',
    actionType: 'scroll',
    target: '#projects',
    icon: Briefcase
  },
  {
    id: 'client-mahakal',
    title: 'Mahakal Swarn Builder',
    category: 'client',
    categoryLabel: 'Client & Freelance Work',
    badge: 'Live Client Work',
    description: 'Public website and admin portal for Mahakal Swarn Builder.',
    actionType: 'scroll',
    target: '#projects',
    icon: Briefcase
  },

  // AI & Full-Stack
  {
    id: 'ai-weathergpt',
    title: 'WeatherGPT',
    category: 'ai',
    categoryLabel: 'AI & Full-Stack Systems',
    badge: 'React + FastAPI + Gemini',
    description: 'Weather information project with a React interface and conversational access to forecasts.',
    actionType: 'scroll',
    target: '#projects',
    icon: Cpu
  },
  {
    id: 'ai-neurotrack',
    title: 'NeuroTrack AI',
    category: 'ai',
    categoryLabel: 'AI & Full-Stack Systems',
    badge: 'OpenCV + Scikit-learn',
    description: 'Multimodal cognitive-load and fatigue project using a React interface, Spring Boot, and Python computer vision.',
    actionType: 'scroll',
    target: '#projects',
    icon: Cpu
  },
  {
    id: 'ai-medrx',
    title: 'MedRx',
    category: 'ai',
    categoryLabel: 'AI & Full-Stack Systems',
    badge: 'Semester 6 Project',
    description: 'Medical-report MVP that uses OCR to extract text and explain key information in plain language.',
    actionType: 'scroll',
    target: '#projects',
    icon: Cpu
  },
  {
    id: 'ai-framesutra',
    title: 'FrameSutra',
    category: 'ai',
    categoryLabel: 'AI & Full-Stack Systems',
    badge: 'Local-first video workspace',
    description: 'Video transcription, summaries, visual observations, and source-grounded questions.',
    actionType: 'scroll',
    target: '#projects',
    icon: Sparkles
  },

  // Hackathons
  {
    id: 'hack-prepbot',
    title: 'PrepBot.ai — Personalized Learning Platform',
    category: 'hackathon',
    categoryLabel: 'Hackathons & Competitions',
    badge: 'HWUP State Finalist',
    description: 'Personalized learning platform created for the HackWithUP 2025 Grand Finale.',
    actionType: 'scroll',
    target: '#projects',
    icon: Trophy
  },
  {
    id: 'hack-sih',
    title: 'Smart India Hackathon (SIH 2026)',
    category: 'hackathon',
    categoryLabel: 'Hackathons & Competitions',
    badge: 'SIH 2026',
    description: 'View the SIH 2026 certificate.',
    actionType: 'pdf',
    target: '/certificates/SIH_2026_Certificate_Akarsh Mishra.pdf',
    icon: Trophy
  },
  {
    id: 'hack-nitdelhi',
    title: 'NIT Delhi Ideathon',
    category: 'hackathon',
    categoryLabel: 'Hackathons & Competitions',
    badge: 'NIT Delhi',
    description: 'View the NIT Delhi Ideathon certificate.',
    actionType: 'pdf',
    target: '/certificates/Ideathon-nitdelhi.pdf',
    icon: Trophy
  },

  // Open Source & Proofs
  {
    id: 'oss-gssoc',
    title: 'GirlScript Summer of Code (GSSoC 2026) Proofs & Badges',
    category: 'opensource',
    categoryLabel: 'Open Source Proofs',
    badge: 'Verified Badges',
    description: 'Contributor badges (Role Contributor, Profile Complete, First Steps) and Certificate PDF.',
    actionType: 'scroll',
    target: '#open-source',
    icon: Award
  },
  {
    id: 'oss-ssoc',
    title: 'Social Summer of Code (SSOC) Verified Credential',
    category: 'opensource',
    categoryLabel: 'Open Source Proofs',
    badge: 'Verified SSOC',
    description: 'Official verified certificate and contribution proof in analytical dashboard repos.',
    actionType: 'scroll',
    target: '#open-source',
    icon: Award
  },

  // Academic Results & Papers
  {
    id: 'acad-paper',
    title: 'Research Paper — Lightweight CNN Facial Emotion Model',
    category: 'academic',
    categoryLabel: 'Academic & Research',
    badge: 'Conference Presentation',
    description: 'Oral presentation at International Conference on Sustainable Innovation (Attached PDF).',
    actionType: 'pdf',
    target: '/certificates/confrence certificate.pdf',
    icon: BookOpen
  },
  {
    id: 'acad-cgpa',
    title: 'Academic CGPA 8.28 & Semester 1–8 Performance',
    category: 'academic',
    categoryLabel: 'Academic & Research',
    badge: 'Academic results',
    description: 'Semester-wise results and current academic record.',
    actionType: 'scroll',
    target: '#academic-growth',
    icon: GraduationCap
  },
  {
    id: 'acad-sem6',
    title: 'Semester 6 Result PDF (SGPA: 8.22)',
    category: 'academic',
    categoryLabel: 'Academic & Research',
    badge: 'SGPA: 8.22',
    description: 'Official SRMU examination portal result PDF for Semester 6.',
    actionType: 'pdf',
    target: '/Results/SEMESTER6.pdf',
    icon: FileText
  },
  {
    id: 'acad-resume',
    title: 'Official Resume PDF (Akarsh Mishra)',
    category: 'academic',
    categoryLabel: 'Academic & Research',
    badge: 'Updated Resume',
    description: 'Download or view the official software engineering resume PDF.',
    actionType: 'pdf',
    target: '/Akarsh_Mishra_Resume.pdf',
    icon: FileText
  },

  // Communities & leadership
  {
    id: 'communities',
    title: 'Tech Communities & Student Leadership',
    category: 'community',
    categoryLabel: 'Tech Communities',
    badge: 'Tech Fusion Club · SRMU',
    description: 'Community participation and student leadership at SRMU.',
    actionType: 'scroll',
    target: '#co-curricular',
    icon: Award
  },
  {
    id: 'comm-droid',
    title: 'Droid Lucknow Community Certificate',
    category: 'community',
    categoryLabel: 'Tech Communities',
    badge: 'Droid Lucknow',
    description: 'View the community participation certificate.',
    actionType: 'pdf',
    target: '/certificates/DroidLucknow.jpg',
    icon: Users
  }
];

interface GlobalSearchNavProps {
  onOpenDoc: (title: string, path: string) => void;
}

export default function GlobalSearchNav({ onOpenDoc }: GlobalSearchNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Ctrl+K / Cmd+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (!isOpen) setSelectedIndex(0);
        setIsOpen(!isOpen);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timeout = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(timeout);
    }
  }, [isOpen]);

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return SEARCH_DIRECTORY;
    return SEARCH_DIRECTORY.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q))
    );
  }, [query]);

  const handleSelect = (item: SearchItem) => {
    setIsOpen(false);
    setQuery('');

    if (item.actionType === 'scroll') {
      const el = document.querySelector(item.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (item.actionType === 'pdf') {
      onOpenDoc(item.title, item.target);
    } else if (item.actionType === 'navigate') {
      router.push(item.target);
    }
  };

  return (
    <>
      {/* Prominent Quick-Trigger Bar in Navigation */}
      <button
        onClick={() => {
          setSelectedIndex(0);
          setIsOpen(true);
        }}
        className="group relative flex items-center gap-2.5 rounded-full border border-sand bg-cyber-card/90 px-3.5 py-1.5 text-xs text-taupe shadow-sm transition hover:border-cyber-blue hover:text-ink hover:shadow-glow-blue/15"
        aria-label="Open command search"
      >
        <Search size={13} className="text-cyber-blue group-hover:scale-110 transition shrink-0" />
        <span className="hidden sm:inline font-medium">Search portfolio...</span>
        <span className="sm:hidden font-medium">Search</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 rounded border border-sand bg-black/5 px-1.5 py-0.5 text-[9px] font-mono font-bold text-taupe">
          <Command size={9} />K
        </kbd>
      </button>

      {/* Spotlight Command Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[250] flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl border-2 border-sand bg-cyber-bg shadow-2xl text-ink font-sans"
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 border-b border-sand bg-cyber-card px-5 py-4">
                <Search size={18} className="text-cyber-blue shrink-0 animate-pulse" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search projects, open source, or results..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="w-full bg-transparent text-sm font-semibold text-ink placeholder:text-taupe/60 focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="rounded-full p-1 text-taupe hover:text-ink"
                  >
                    <X size={15} />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex rounded border border-sand bg-black/5 px-2 py-0.5 text-[10px] font-mono font-bold text-taupe">
                  ESC
                </kbd>
              </div>

              {/* Quick Filter Pill Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto border-b border-sand/60 bg-white/50 px-5 py-2.5 text-[11px] scrollbar-none">
                <span className="text-[10px] font-bold uppercase tracking-wider text-taupe/70 mr-1 shrink-0">
                  Quick Jump:
                </span>
                {[
                  { label: 'Client Work', q: 'client' },
                  { label: 'AI Projects', q: 'ai' },
                  { label: 'GSSoC / SSOC', q: 'gssoc' },
                  { label: 'Sem Results', q: 'semester' },
                  { label: 'Tech Communities', q: 'community' },
                  { label: 'Leadership', q: 'leadership' }
                ].map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => setQuery(chip.q)}
                    className="shrink-0 rounded-full border border-sand bg-cyber-card px-2.5 py-0.5 text-[10px] font-semibold text-taupe hover:border-cyber-blue hover:text-cyber-blue transition"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Search Results List */}
              <div className="max-h-[58vh] overflow-y-auto p-3 space-y-1.5 bg-cyber-bg/40">
                {filteredItems.length === 0 ? (
                  <div className="py-14 text-center">
                    <Search size={24} className="mx-auto text-taupe/40 mb-2" />
                    <p className="text-xs font-bold text-taupe">No match for &quot;{query}&quot;</p>
                    <p className="text-[10px] text-taupe/70 mt-1">Try searching for a project, result, or profile.</p>
                  </div>
                ) : (
                  filteredItems.map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className={`group flex items-center justify-between gap-3 rounded-2xl border p-3.5 cursor-pointer transition ${
                          selectedIndex === idx
                            ? 'border-cyber-blue bg-sky-50/70 shadow-sm'
                            : 'border-sand/70 bg-cyber-card hover:border-cyber-blue/40 hover:bg-sky-50/30'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="rounded-xl border border-sand bg-white p-2 text-cyber-blue group-hover:scale-110 transition shrink-0 shadow-sm">
                            <ItemIcon size={16} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-xs font-bold text-ink truncate group-hover:text-cyber-blue transition">
                                {item.title}
                              </h4>
                              {item.badge && (
                                <span className="rounded-full bg-black/5 border border-sand px-2 py-0.2 text-[9px] font-bold text-taupe font-mono">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-taupe line-clamp-1 mt-0.5">
                              {item.description}
                            </p>
                            <span className="text-[9px] font-mono text-cyber-blue/80 font-semibold uppercase tracking-wider">
                              {item.categoryLabel}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-bold text-taupe group-hover:text-cyber-blue shrink-0">
                          <span className="hidden sm:inline text-[10px]">Jump</span>
                          <ArrowRight size={13} className="group-hover:translate-x-1 transition" />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Modal Footer Key Hints */}
              <div className="flex items-center justify-between border-t border-sand bg-cyber-card px-5 py-3 text-[10px] text-taupe font-mono">
                <div className="flex items-center gap-3">
                  <span>Press <kbd className="font-bold text-ink">ESC</kbd> to exit</span>
                  <span>•</span>
                  <span><strong>{filteredItems.length}</strong> items indexed</span>
                </div>
                <div className="flex items-center gap-1 text-cyber-blue font-bold">
                  <CornerDownLeft size={11} /> Click item to jump
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
