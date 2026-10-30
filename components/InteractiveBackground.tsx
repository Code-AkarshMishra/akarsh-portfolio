'use client';

import React, { useEffect, useRef } from 'react';

interface FloatingGlow {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let glowSpheres: FloatingGlow[] = [];

    const GRID_SPACING = 36; // 36px cell boxes
    const INFLUENCE_RADIUS = 180; // magnetic cursor field
    const MAX_WARP = 15; // pixels pushed away from cursor

    const initGlowSpheres = (w: number, h: number) => {
      // Light-themed elegant floating gradients
      return [
        { x: w * 0.2, y: h * 0.3, vx: 0.15, vy: 0.1, radius: 250, color: 'rgba(37, 99, 235, 0.035)' }, // Blue
        { x: w * 0.8, y: h * 0.2, vx: -0.1, vy: 0.12, radius: 300, color: 'rgba(124, 58, 237, 0.03)' },  // Purple
        { x: w * 0.5, y: h * 0.7, vx: 0.08, vy: -0.15, radius: 280, color: 'rgba(219, 39, 119, 0.03)' }  // Pink
      ];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      glowSpheres = initGlowSpheres(width, height);
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      // 1. Reset Canvas with off-white warm paper color
      ctx.fillStyle = '#FAF9F5';
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;

      // Eased mouse cursor follow
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // 2. DRAW SOFT FLOATING RADIAL GRADIENTS (Watercolor mesh backdrops)
      for (let i = 0; i < glowSpheres.length; i++) {
        const sp = glowSpheres[i];

        // Organic slow float
        sp.x += sp.vx;
        sp.y += sp.vy;

        // Bounce
        if (sp.x - sp.radius < 0 || sp.x + sp.radius > width) sp.vx *= -1;
        if (sp.y - sp.radius < 0 || sp.y + sp.radius > height) sp.vy *= -1;

        const grad = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, sp.radius);
        grad.addColorStop(0, sp.color);
        grad.addColorStop(0.6, sp.color.replace('0.03', '0.01'));
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. DRAW MAGNETICALLY DEFORMED DRAFTING PAPER GRID
      const cols = Math.ceil(width / GRID_SPACING) + 1;
      const rows = Math.ceil(height / GRID_SPACING) + 1;

      // Pre-calculate warped coordinates for all grid lattice points
      const gridPoints: { x: number; y: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        gridPoints[r] = [];
        const yBase = r * GRID_SPACING;

        for (let c = 0; c < cols; c++) {
          const xBase = c * GRID_SPACING;

          let warpX = xBase;
          let warpY = yBase;

          if (mouse.active) {
            const dx = mouse.x - xBase;
            const dy = mouse.y - yBase;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < INFLUENCE_RADIUS) {
              const force = (INFLUENCE_RADIUS - dist) / INFLUENCE_RADIUS; // 0 to 1
              const warp = force * force * MAX_WARP; // scale force exponentially
              const angle = Math.atan2(dy, dx);

              // Push the grid intersections away from the mouse cursor
              warpX = xBase - Math.cos(angle) * warp;
              warpY = yBase - Math.sin(angle) * warp;
            }
          }

          gridPoints[r][c] = { x: warpX, y: warpY };
        }
      }

      // Draw horizontal coordinate blueprint lines
      ctx.strokeStyle = 'rgba(24, 24, 27, 0.035)'; // extremely subtle dark-slate grid ink lines
      ctx.lineWidth = 0.85;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        ctx.moveTo(gridPoints[r][0].x, gridPoints[r][0].y);
        for (let c = 1; c < cols; c++) {
          ctx.lineTo(gridPoints[r][c].x, gridPoints[r][c].y);
        }
        ctx.stroke();
      }

      // Draw vertical coordinate blueprint lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        ctx.moveTo(gridPoints[0][c].x, gridPoints[0][c].y);
        for (let r = 1; r < rows; r++) {
          ctx.lineTo(gridPoints[r][c].x, gridPoints[r][c].y);
        }
        ctx.stroke();
      }

      // 4. DRAW GENTLE COMPASS BLUEPRINT DECORATIONS
      // Add very subtle plus-markers at a few select static intersection bounds to mimic drafting blueprint paper
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.08)'; // cyan/blue crosshairs
      ctx.lineWidth = 1;
      const markerStep = 6; // put mark every 6 cells
      for (let r = markerStep; r < rows - 1; r += markerStep) {
        for (let c = markerStep; c < cols - 1; c += markerStep) {
          const pt = gridPoints[r][c];
          ctx.beginPath();
          // horizontal mark line
          ctx.moveTo(pt.x - 4, pt.y);
          ctx.lineTo(pt.x + 4, pt.y);
          // vertical mark line
          ctx.moveTo(pt.x, pt.y - 4);
          ctx.lineTo(pt.x, pt.y + 4);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-20 h-full w-full bg-[#FAF9F5]"
    />
  );
}
