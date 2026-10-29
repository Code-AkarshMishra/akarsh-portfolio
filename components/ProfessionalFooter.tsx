'use client';

import { useState } from 'react';
import { ArrowUpRight, Github, Globe, Linkedin, Mail, ShieldCheck } from 'lucide-react';
import PrivacyPolicyModal from './PrivacyPolicyModal';

const footerLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Repositories', href: '#repositories' },
  { label: 'Experience', href: '#experience' },
  { label: 'Academic details', href: '#academic' },
  { label: 'Certificates', href: '#certifications-gallery' },
  { label: 'Contact', href: '#service-enquiry' },
];

const profileLinks = [
  { label: 'GitHub', href: 'https://github.com/Code-AkarshMishra', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/code-akarshmishra/', icon: Linkedin },
  { label: 'Dev.to', href: 'https://dev.to/codeakarshmishmra', icon: Globe },
  { label: 'Email', href: 'mailto:akarshmishra3145@gmail.com', icon: Mail },
];

export default function ProfessionalFooter() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950 px-6 pb-6 pt-14 text-white sm:pt-16">
      <PrivacyPolicyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 pb-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <a href="#hero" className="inline-flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300 font-black text-slate-950">AM</span>
              <span className="text-lg font-extrabold tracking-tight">Akarsh Mishra</span>
            </a>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
              Computer Science student at Shri Ramswaroop Memorial University, building web applications and exploring applied AI/ML.
            </p>
            <a href="mailto:akarshmishra3145@gmail.com" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              <Mail size={16} /> Get in touch <ArrowUpRight size={15} />
            </a>
            <a href="https://srmu.ac.in/" target="_blank" rel="noreferrer" className="mt-4 flex w-fit items-center gap-2 text-xs text-slate-400 transition hover:text-white">
              Shri Ramswaroop Memorial University <ArrowUpRight size={13} />
            </a>
          </div>

          <nav aria-label="Footer navigation" className="md:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Explore</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-1">
              {footerLinks.map((link) => <li key={link.label}><a href={link.href} className="text-slate-200 transition hover:text-cyan-300">{link.label}</a></li>)}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Find me online</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {profileLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-300/70 hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">
                  <Icon size={14} /> {label}
                </a>
              ))}
            </div>
            <button type="button" onClick={() => setIsPrivacyModalOpen(true)} className="mt-5 inline-flex items-center gap-2 text-xs text-slate-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">
              <ShieldCheck size={14} /> Contact form privacy
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} <strong className="font-semibold text-slate-200">Built with efforts by Akarsh Mishra</strong></p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="/llms.txt" className="transition hover:text-white">llms.txt</a>
            <a href="/sitemap.xml" className="transition hover:text-white">Sitemap</a>
            <a href="/Akarsh_Mishra_Resume.pdf" className="transition hover:text-white">Resume</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
