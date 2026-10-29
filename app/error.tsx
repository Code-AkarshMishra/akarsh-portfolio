'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, Mail, Github, Linkedin, AlertTriangle } from 'lucide-react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF9F5] font-sans text-[#18181B] flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-xl text-center"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 border-2 border-red-200/60 shadow-xl">
          <AlertTriangle size={36} className="text-red-500" />
        </div>

        {/* Error card */}
        <div className="rounded-3xl border border-black/8 bg-white/80 p-8 shadow-2xl backdrop-blur-xl space-y-5">
          <div>
            <span className="inline-block rounded-full bg-red-50 border border-red-200/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 mb-3">
              Runtime Error
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#18181B]">Something went wrong</h1>
            <p className="mt-2 text-sm text-[#52525B] leading-relaxed">
              An unexpected error occurred in Akarsh Mishra&apos;s portfolio. This is likely a temporary issue.
            </p>
          </div>

          {/* Profile attribution */}
          <div className="flex items-center gap-3 rounded-2xl bg-[#FAF9F5] border border-black/8 p-4 text-left">
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow shrink-0">
              <img src="/profile.jpg" alt="Akarsh Mishra" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#18181B]">Akarsh Mishra — SRMU Lucknow</p>
              <p className="text-[10px] text-[#52525B]">B.Tech Computer Science · Full-Stack Developer</p>
            </div>
          </div>

          {error?.digest && (
            <div className="rounded-xl bg-red-50/60 border border-red-200/40 px-4 py-2.5 text-left">
              <p className="text-[10px] font-mono text-red-400">Error ID: {error.digest}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={reset}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow hover:opacity-90 hover:-translate-y-0.5 transition duration-200"
            >
              <RefreshCw size={15} />
              Try Again
            </button>
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-black/8 bg-[#FAF9F5] px-5 py-3 text-sm font-bold text-[#52525B] hover:text-blue-600 hover:border-blue-400/50 hover:-translate-y-0.5 transition duration-200"
            >
              <ArrowLeft size={15} />
              Back Home
            </Link>
          </div>

          {/* Contact for help */}
          <div className="pt-2 border-t border-black/8 flex items-center justify-center gap-3 flex-wrap">
            <span className="text-[10px] text-[#52525B]/60 font-medium">Report issue:</span>
            <a
              href="mailto:akarshmishra3145@gmail.com"
              className="flex items-center gap-1 text-[10px] font-bold text-[#52525B] hover:text-red-500 transition"
            >
              <Mail size={11} /> akarshmishra3145@gmail.com
            </a>
            <a
              href="https://github.com/Code-AkarshMishra"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[10px] font-bold text-[#52525B] hover:text-zinc-800 transition"
            >
              <Github size={11} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/code-akarshmishra/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[10px] font-bold text-[#52525B] hover:text-blue-600 transition"
            >
              <Linkedin size={11} /> LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
