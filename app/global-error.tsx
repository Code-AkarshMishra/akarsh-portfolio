'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, Github, Instagram, Linkedin, Mail, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF9F5] font-sans text-[#18181B]">
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-lg rounded-3xl border border-black/10 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-xl"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-600">
              <AlertTriangle size={30} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">Akarsh Mishra · Portfolio</p>
            <h1 className="mt-2 text-2xl font-extrabold">Something went wrong</h1>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              The portfolio hit an unexpected error. Try again, or head back to Akarsh&apos;s profile and projects.
            </p>
            <div className="mx-auto mt-5 flex max-w-sm items-center gap-3 rounded-2xl border border-black/10 bg-[#FAF9F5] p-3 text-left">
              <Image src="/profile.jpg" alt="Akarsh Mishra" width={48} height={48} className="h-12 w-12 rounded-full border-2 border-white object-cover shadow" />
              <div>
                <p className="text-xs font-bold">Akarsh Mishra — SRMU Lucknow</p>
                <p className="mt-0.5 text-[10px] text-zinc-600">B.Tech Computer Science · Full-Stack Developer</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={reset}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:opacity-90"
              >
                <RefreshCw size={15} /> Try Again
              </button>
              <Link
                href="/"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-black/10 bg-[#FAF9F5] px-4 py-3 text-sm font-bold text-zinc-700 transition hover:-translate-y-0.5 hover:text-blue-600"
              >
                <ArrowLeft size={15} /> Back Home
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-black/10 pt-5 text-xs font-semibold text-zinc-600">
              <a className="inline-flex items-center gap-1.5 hover:text-zinc-900" href="https://github.com/Code-AkarshMishra" target="_blank" rel="noreferrer">
                <Github size={14} /> GitHub
              </a>
              <a className="inline-flex items-center gap-1.5 hover:text-blue-600" href="https://www.linkedin.com/in/code-akarshmishra/" target="_blank" rel="noreferrer">
                <Linkedin size={14} /> LinkedIn
              </a>
              <a className="inline-flex items-center gap-1.5 hover:text-pink-600" href="https://www.instagram.com/akarsh.mishra.45/" target="_blank" rel="noreferrer">
                <Instagram size={14} /> Instagram
              </a>
              <a className="inline-flex items-center gap-1.5 hover:text-red-500" href="mailto:akarshmishra3145@gmail.com">
                <Mail size={14} /> Email Akarsh
              </a>
            </div>
          </motion.section>
        </main>
      </body>
    </html>
  );
}
