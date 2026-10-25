import Script from "next/script";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import JsonLd from "@/components/seo/JsonLd";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://sufyanali.dev"),
  title: "Muhammad Sufyan Ali | Full Stack Developer",
  description:
    "Muhammad Sufyan Ali is a Full-Stack MERN Developer specializing in React, Next.js, Node.js, and modern scalable web and mobile application development.",
  keywords: [
    "Muhammad Sufyan Ali",
    "Sufyan Ali",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Web and Mobile App Developer",
    "Web Developer",
    "Mobile App Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "React Native Developer",
    "Frontend Engineer",
    "Backend Engineer",
    "Faisalabad",
    "Pakistan",
    "Portfolio",
  ],
  authors: [{ name: "Muhammad Sufyan Ali", url: "https://sufyanali.dev" }],
  creator: "Muhammad Sufyan Ali",
  publisher: "Muhammad Sufyan Ali",
  alternates: {
    canonical: "https://sufyanali.dev/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sufyanali.dev/",
    title: "Muhammad Sufyan Ali | Full Stack Developer",
    description:
      "Full-Stack MERN Developer crafting exceptional web and mobile applications.",
    siteName: "Muhammad Sufyan Ali Portfolio",
    images: [
      {
        url: "https://sufyanali.dev/cover.jpg",
        secureUrl: "https://sufyanali.dev/cover.jpg",
        type: "image/jpeg",
        width: 1376,
        height: 768,
        alt: "Muhammad Sufyan Ali | Full Stack Developer Portfolio Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Sufyan Ali | Full Stack Developer",
    description:
      "Full-Stack MERN Developer crafting exceptional web and mobile applications.",
    images: ["https://sufyanali.dev/cover.jpg"],
    creator: "@SufyanAli",
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <JsonLd />
      </head>
      <body suppressHydrationWarning>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-PWLHVGC81W"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PWLHVGC81W');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
