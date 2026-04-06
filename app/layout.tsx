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

// export const metadata: Metadata = {
//   title: "Akarsh Mishra | AI/ML & Full Stack Developer",
//   description: "Portfolio of Akarsh Mishra, an aspiring AI Engineer building intelligent web systems.",
// };


export const metadata: Metadata = {
  title: "Akarsh Mishra | AI & MERN Stack Developer | SRMU Lucknow",
  description: "Official portfolio of Akarsh Mishra, a CSE student at SRMU. Developer of ENROLE and MedRx. Finalist at HackWithUP'25.",
  keywords: ["Akarsh Mishra", "akarshmishra", "code_akarshmishra", "codeakarshmishra", "code-akarshmishra", "Code akarsh mishra", "codeakarshmishra", "Akarsh Mishra SRMU", "ENROLE", "MedRx", "AI Developer Lucknow"],
  authors: [{ name: "Akarsh Mishra" }],
  openGraph: {
    title: "Akarsh Mishra | AI & MERN Stack Developer",
    description: "Building the future with AI and Web Tech. Creator of ENROLE and MedRx.",
    url: "https://code-akarshmishra.vercel.app/",
    siteName: "Akarsh Mishra Portfolio",
    images: [
      {
        url: "/profile.jpg", // Tumhare public folder mein jo image hai uska path
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <head>
//         <meta name="google-site-verification" content="6Xnbq-3OC8tH2EZ7_acIb9Bf49spiVVl_Y57eZ3Z5Gw" />
//       </head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Akarsh Mishra",
              "alternateName": "code-akarshmishra",
              "url": "https://code-akarshmishra.vercel.app/",
              "sameAs": [
                "https://www.linkedin.com/in/code-akarshmishra/",
                "https://github.com/code-akarshmishra/",
                "https://www.hackerrank.com/code_akarshmishra/",
                "https://www.instagram.com/akarsh.mishra.45/",
                "https://www.commudle.com/users/Code_AkarshMishra",
                "https://topmate.io/codeakarshmishra",
                "https://dev.to/codeakarshmishra",
                "https://www.linkedin.com/in/code-akarshmishra/",
                "https://github.com/code-akarshmishra/",
                "https://www.hackerrank.com/code_akarshmishra/",
                "https://www.instagram.com/akarsh.mishra.45/",
                "https://www.commudle.com/users/Code_AkarshMishra",
                "https://topmate.io/codeakarshmishra",
                "https://dev.to/codeakarshmishra"
              ],
              "jobTitle": "Full-Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Shri Ramswaroop Memorial University",
                "alternateName": "SRMU"
              }
            }),
          }}
        />
        <meta name="google-site-verification" content="6Xnbq-3OC8tH2EZ7_acIb9Bf49spiVVl_Y57eZ3Z5Gw" />
      </head>
      <body>{children}</body>
    </html>
  );
}