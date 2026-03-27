import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  keywords: ["Akarsh Mishra", "code-akarshmishra", "Akarsh Mishra SRMU", "ENROLE", "MedRx", "AI Developer Lucknow"],
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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="6Xnbq-3OC8tH2EZ7_acIb9Bf49spiVVl_Y57eZ3Z5Gw" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}