export const VALID_SERVICES = [
  'Full-Stack Web Development',
  'Frontend Development',
  'Backend Development and API Development',
  'Portfolio or Personal Website',
  'Business Website Development',
  'E-commerce Website Development',
  'AI/ML Application Development',
  'Generative AI and LLM Integration',
  'Computer Vision and Machine Learning Projects',
  'Research Project Development',
  'Website Redesign and UI/UX Improvement',
  'SEO and Website Optimization',
  'Technical Consultation',
  'Other',
] as const;

export function normalizeIndianMobile(raw: string): string | null {
  const digitsOnly = raw.replace(/\D/g, '');
  const number = digitsOnly.length === 12 && digitsOnly.startsWith('91')
    ? digitsOnly.slice(2)
    : digitsOnly.length === 11 && digitsOnly.startsWith('0')
      ? digitsOnly.slice(1)
      : digitsOnly;
  return /^[6-9]\d{9}$/.test(number) ? number : null;
}
