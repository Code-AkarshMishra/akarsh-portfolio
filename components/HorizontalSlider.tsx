'use client';

import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export interface HorizontalSliderProps {
  children: React.ReactNode[];
  autoplayInterval?: number;
  className?: string;
  id?: string;
  label?: string;
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function HorizontalSlider({
  children,
  autoplayInterval = 5000,
  className = '',
  id,
  label = 'Carousel',
}: HorizontalSliderProps) {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const itemCount = React.Children.count(children);
  const currentIndex = ((page % itemCount) + itemCount) % itemCount;

  const paginate = useCallback(
    (newDirection: number) => {
      if (itemCount <= 1) return;
      // A visitor taking manual control should not be moved away mid-browse.
      setIsPlaying(false);
      setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    },
    [itemCount]
  );

  const goToSlide = (targetIndex: number) => {
    setIsPlaying(false);
    const targetDirection = targetIndex > currentIndex ? 1 : -1;
    setPage([targetIndex, targetDirection]);
  };

  // Autoplay effect
  useEffect(() => {
    if (!isPlaying || isHovered || prefersReducedMotion || itemCount <= 1) {
      return;
    }

    const timer = setInterval(() => {
      paginate(1);
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, prefersReducedMotion, itemCount, autoplayInterval, paginate]);

  if (itemCount === 0) return null;

  const childArray = React.Children.toArray(children);
  const currentChild = childArray[currentIndex];

  return (
    <div
      id={id}
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={() => setIsHovered(false)}
      className={`relative w-full max-w-4xl mx-auto overflow-hidden select-none ${className}`}
    >
      {/* Slide Presentation Container */}
      <div className="relative min-h-[300px] w-full overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -100 || offset.x < -60) {
                paginate(1);
              } else if (swipe > 100 || offset.x > 60) {
                paginate(-1);
              }
            }}
            className="w-full"
            role="group"
            aria-roledescription="slide"
            aria-label={`${currentIndex + 1} of ${itemCount}`}
          >
            {currentChild}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Accessible Offscreen Content for SEO and Screen Readers */}
      <div className="sr-only" aria-hidden="false">
        <h4>All Items in this collection ({itemCount} total):</h4>
        {childArray.map((child, idx) => (
          <div key={idx} tabIndex={-1}>
            {child}
          </div>
        ))}
      </div>

      {/* Controls Bar: Prev, Indicators, Counter, Play/Pause, Next */}
      {itemCount > 1 && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 px-2">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous slide"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-sand bg-cyber-card text-ink shadow-sm transition hover:border-cyber-blue hover:text-cyber-blue hover:scale-105 active:scale-95"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Indicators + Play/Pause */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-sand bg-cyber-card/80 px-3 py-1.5 shadow-sm">
              {childArray.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={currentIndex === idx ? 'true' : 'false'}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? 'w-6 bg-cyber-blue shadow-glow-blue/50'
                      : 'w-2 bg-taupe/30 hover:bg-taupe/60'
                  }`}
                />
              ))}
            </div>

            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              title={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-sand bg-cyber-card text-taupe transition hover:border-cyber-blue hover:text-cyber-blue"
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            </button>

            {/* Slide Index Counter */}
            <span className="text-[11px] font-mono font-bold text-taupe">
              {currentIndex + 1} / {itemCount}
            </span>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next slide"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-sand bg-cyber-card text-ink shadow-sm transition hover:border-cyber-blue hover:text-cyber-blue hover:scale-105 active:scale-95"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
