'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  Github,
  Linkedin,
  Mail,
  Globe,
  Home,
  Code2,
  BookOpen,
  Send,
  Instagram,
  Trophy,
  FileText,
} from 'lucide-react';

const socials = [
  { label: 'GitHub', href: 'https://github.com/Code-AkarshMishra', icon: Github, color: 'hover:text-zinc-800' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/code-akarshmishra/', icon: Linkedin, color: 'hover:text-blue-600' },
  { label: 'Instagram', href: 'https://www.instagram.com/akarsh.mishra.45/', icon: Instagram, color: 'hover:text-pink-500' },
  { label: 'Email', href: 'mailto:akarshmishra3145@gmail.com', icon: Mail, color: 'hover:text-red-500' },
  { label: 'Commudle', href: 'https://www.commudle.com/users/CodeAkarshMishra', icon: Globe, color: 'hover:text-emerald-600' },
  { label: 'Topmate', href: 'https://topmate.io/codeakarshmishra', icon: Send, color: 'hover:text-blue-500' },
  { label: 'HackerRank', href: 'https://www.hackerrank.com/CodeAkarshMishra', icon: Code2, color: 'hover:text-emerald-600' },
  { label: 'Dev.to', href: 'https://dev.to/codeakarshmishra', icon: FileText, color: 'hover:text-black' },
];

const quickLinks = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Projects', href: '/#projects', icon: Code2 },
  { label: 'Open Source', href: '/#open-source', icon: Trophy },
  { label: 'Academic', href: '/#academic-growth', icon: BookOpen },
  { label: 'Contact', href: '/#contact', icon: Mail },
];

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF9F5] font-sans text-[#18181B] flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl text-center"
      >
        {/* 404 */}
        <div className="relative mb-4 select-none pointer-events-none">
          <p className="text-[9rem] sm:text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#2563EB] via-[#7C3AED] to-[#DB2777] opacity-10">
            404
          </p>
          <motion.p
            className="absolute inset-0 flex items-center justify-center text-[9rem] sm:text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#2563EB] via-[#7C3AED] to-[#DB2777]"
          >
            404
          </motion.p>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mb-8 flex flex-col items-center gap-5 rounded-3xl border border-black/8 bg-white/80 p-8 shadow-2xl backdrop-blur-xl"
        >
          {/* Avatar ring */}
          <div className="relative">
            <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-xl">
              <img src="/profile.jpg" alt="Akarsh Mishra" className="h-full w-full object-cover object-top" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold tracking-tight">Page Not Found</h1>
            <p className="text-sm text-[#52525B]">
              You&apos;ve wandered off Akarsh Mishra&apos;s portfolio map.
            </p>
            <p className="text-xs text-[#52525B]/80 max-w-md mx-auto leading-relaxed">
              <strong>Akarsh Mishra</strong> is a B.Tech Computer Science student at SRMU Lucknow.
              Explore his projects, open-source work, coding profiles, and contact links.
            </p>
          </div>

          {/* Quick links grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 w-full">
            {quickLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-black/8 bg-[#FAF9F5] px-2 py-3 text-[10px] font-bold text-[#52525B] transition hover:-translate-y-0.5 hover:border-blue-400/60 hover:text-blue-600 hover:shadow-sm"
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-7 py-3 text-sm font-bold text-white shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition duration-200"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-2 flex-wrap"
        >
          {socials.map(({ label, href, icon: Icon, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={label}
              className={`flex items-center gap-1.5 rounded-xl border border-black/8 bg-white px-3 py-2 text-xs font-bold text-[#52525B] shadow-sm transition ${color} hover:-translate-y-0.5 hover:shadow`}
            >
              <Icon size={14} />
              {label}
            </a>
          ))}
        </motion.div>

        <p className="mt-6 text-[11px] text-[#52525B]/40">
          © {new Date().getFullYear()} Akarsh Mishra · akarshmishra3145@gmail.com
        </p>
      </motion.div>
    </main>
  );
}
