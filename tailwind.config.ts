import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#FAF9F5',
          card: 'rgba(255, 255, 255, 0.65)',
          navy: '#f4f3ee',
          blue: '#2563EB',
          purple: '#7C3AED',
          pink: '#DB2777',
          cyan: '#0D9488',
          emerald: '#059669',
          amber: '#D97706',
          rose: '#E11D48',
          orange: '#EA580C',
        },
        ink: '#18181B',
        taupe: '#52525B',
        sand: 'rgba(24, 24, 27, 0.08)',
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'premium-hover': '0 20px 40px -15px rgba(0, 240, 255, 0.15), 0 0 0 1.5px rgba(0, 240, 255, 0.3)',
        'glow-blue': '0 0 20px rgba(0, 240, 255, 0.25)',
        'glow-purple': '0 0 20px rgba(157, 78, 221, 0.25)',
        'glow-pink': '0 0 20px rgba(255, 0, 127, 0.25)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.25)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.25)',
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.25)',
        'glow-rose': '0 0 20px rgba(244, 63, 94, 0.25)',
        'terminal': '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
};
export default config;