'use client';

import { useState, type ReactNode } from 'react';
import { ArrowLeftRight, ArrowUpRight } from 'lucide-react';

type CommunityFlipCardProps = {
  eyebrow: string;
  title: string;
  summary: string;
  details: string[];
  tags: string[];
  icon: ReactNode;
  theme: 'sky' | 'orange' | 'emerald';
  certificate?: { label: string; href: string };
  relatedLinks?: { label: string; href: string }[];
  logos?: { src: string; alt: string; href: string }[];
};

const themes = {
  sky: 'border-sky-300 bg-sky-50 text-sky-800',
  orange: 'border-orange-300 bg-orange-50 text-orange-800',
  emerald: 'border-emerald-300 bg-emerald-50 text-emerald-800',
};

export default function CommunityFlipCard(props: CommunityFlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { eyebrow, title, summary, details, tags, icon, theme, certificate, relatedLinks, logos } = props;
  const color = themes[theme];

  return (
    <article className="[perspective:1200px]">
      <div className={`relative min-h-[340px] rounded-3xl border-2 ${color} shadow-premium transition-transform duration-500 motion-reduce:transition-none [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
        <div aria-hidden={flipped} inert={flipped} className="absolute inset-0 flex flex-col justify-between rounded-[inherit] p-6 text-left [backface-visibility:hidden] sm:p-8">
          <div>
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${color}`}>{eyebrow}</span>
              <span aria-hidden="true" className="shrink-0">{icon}</span>
            </div>
            <h3 className="mb-2 text-xl font-black text-ink sm:text-2xl">{title}</h3>
            <p className="text-sm leading-relaxed text-taupe">{summary}</p>
            {logos && (
              <div className="mt-5 flex items-center gap-4">
                {logos.map((logo) => (
                  <a key={logo.alt} href={logo.href} target="_blank" rel="noreferrer" aria-label={logo.alt}>
                    {/* Authentic organization logo assets are hosted by their respective sites. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo.src} alt={logo.alt} className="h-9 w-auto max-w-36 object-contain" loading="lazy" />
                  </a>
                ))}
              </div>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => <span key={tag} className="rounded-lg border border-white/80 bg-white px-3 py-1 text-[10px] font-mono font-bold text-taupe">{tag}</span>)}
            </div>
          </div>
          <button type="button" aria-pressed={flipped} onClick={() => setFlipped(true)} className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white bg-white px-4 py-2.5 text-xs font-bold text-ink shadow-sm transition hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-blue">
            See details <ArrowLeftRight size={15} />
          </button>
        </div>

        <div aria-hidden={!flipped} inert={!flipped} className="absolute inset-0 flex flex-col justify-between overflow-auto rounded-[inherit] bg-white p-6 text-left [transform:rotateY(180deg)] [backface-visibility:hidden] sm:p-8">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-taupe">More about this</span>
                <h3 className="mt-1 text-xl font-black text-ink">{title}</h3>
              </div>
              <span aria-hidden="true" className="shrink-0">{icon}</span>
            </div>
            <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-taupe">
              {details.map((detail) => <li key={detail} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyber-blue" />{detail}</li>)}
            </ul>
          </div>
          <div className="mt-5 space-y-2">
            {relatedLinks?.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="flex min-h-10 items-center justify-between rounded-xl border border-sand px-3 py-2 text-xs font-bold text-ink hover:border-cyber-blue hover:text-cyber-blue">{link.label}<ArrowUpRight size={14} /></a>)}
            {certificate && <a href={certificate.href} target="_blank" rel="noreferrer" className="flex min-h-10 items-center justify-between rounded-xl bg-ink px-3 py-2 text-xs font-bold text-white hover:bg-cyber-blue">{certificate.label}<ArrowUpRight size={14} /></a>}
            <button type="button" aria-pressed={flipped} onClick={() => setFlipped(false)} className="min-h-10 w-full rounded-xl border border-sand px-3 py-2 text-xs font-bold text-taupe hover:bg-sand/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyber-blue">Back to overview</button>
          </div>
        </div>
      </div>
    </article>
  );
}
