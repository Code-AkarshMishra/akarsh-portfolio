import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://code-akarshmishra.vercel.app'),
  title: "Akarsh Mishra | Full-Stack Developer",
  description: "Portfolio of Akarsh Mishra, a B.Tech Computer Science student at Shri Ramswaroop Memorial University (SRMU), Lucknow. Explore projects, open-source work, certifications, and service enquiries.",
  keywords: [
    "Akarsh Mishra",
    "akarshmishra",
    "code_akarshmishra",
    "codeakarshmishra",
    "code-akarshmishra",
    "Code akarsh mishra",
    "Akarsh Mishra SRMU",
    "Akarsh Mishra Lucknow",
    "WeatherGPT",
    "NeuroTrack AI",
    "MedRx",
    "FrameSutra",
    "Sparsh Trading",
    "PrepBot.ai",
    "Tech communities Lucknow",
    "Tech Fusion Club SRMU",
    "Full-Stack Developer Lucknow",
    "akarsh mishra mic",
    "akarsh mishra malti inter college",
    "akarsh mishra pratapgarh",
    "malti inter college pratapgarh",
    "akarshmishra",
    "codeakarshmishra",
    "akarshmishra srmu",
    "rank holder srmu cs"
  ],
  authors: [{ name: "Akarsh Mishra" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Akarsh Mishra | Full-Stack Developer",
    description: "B.Tech Computer Science student at SRMU Lucknow. Full-stack projects, open-source work, and tech communities.",
    url: "https://code-akarshmishra.vercel.app/",
    siteName: "Akarsh Mishra Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Akarsh Mishra - Portfolio Overview"
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: '/',
  },
  twitter: {
    card: "summary_large_image",
    title: "Akarsh Mishra | Full-Stack Developer",
    description: "B.Tech Computer Science student at SRMU Lucknow building web applications and exploring applied machine learning.",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data for Rich Search Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Akarsh Mishra",
              "alternateName": "code-akarshmishra",
              "url": "https://code-akarshmishra.vercel.app/",
              "image": "https://code-akarshmishra.vercel.app/profile.jpg",
              "description": "B.Tech Computer Science student at SRMU Lucknow. Builds full-stack web applications and explores applied machine learning.",
              "email": "akarshmishra3145@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lucknow",
                "addressRegion": "Uttar Pradesh",
                "addressCountry": "India"
              },
              "sameAs": [
                "https://www.linkedin.com/in/code-akarshmishra/",
                "https://github.com/Code-AkarshMishra",
                "https://www.instagram.com/akarsh.mishra.45/",
                "https://www.commudle.com/users/CodeAkarshMishra",
                "https://www.hackerrank.com/CodeAkarshMishra",
                "https://topmate.io/codeakarshmishra",
                "https://dev.to/codeakarshmishra",
                "https://leetcode.com/u/code_akarshmishmra/"
              ],
              "knowsAbout": [
                "Full-stack web development",
                "Artificial intelligence",
                "Python",
                "FastAPI",
                "React",
                "Next.js",
                "Computer vision",
                "Open-source software"
              ],
              "jobTitle": "Full-Stack Developer",
              "affiliation": {
                "@type": "EducationalOrganization",
                "name": "Shri Ramswaroop Memorial University",
                "alternateName": "SRMU",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Lucknow",
                  "addressRegion": "Uttar Pradesh",
                  "addressCountry": "India"
                }
              },
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Shri Ramswaroop Memorial University (SRMU)"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Software Development & Technical Consulting Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full-Stack Web Development" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Frontend Development" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Backend Development and API Development" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Portfolio or Personal Website" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Website Development" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI/ML Application Development" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Technical Consultation" } }
                ]
              }
            }),
          }}
        />
        <meta name="msvalidate.01" content="F9400021CB73BE7B6F3FA109CA19821D" />
        <meta name="google-site-verification" content="6Xnbq-3OC8tH2EZ7_acIb9Bf49spiVVl_Y57eZ3Z5Gw" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased text-[#1e1e1c] bg-[#fbfaf7]`}>
        {children}
      </body>
    </html>
  );
}
