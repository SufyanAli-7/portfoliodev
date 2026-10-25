import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
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
  title: "Muhammad Sufyan Ali | Full-stack Developer",
  description:
    "Full-stack developer based in Faisalabad. I turn ideas into fast, scalable products — and I care about the details that make software feel right.",
  keywords: [
    "Muhammad Sufyan Ali",
    "Sufyan",
    "Full-stack developer",
    "Faisalabad",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Muhammad Sufyan Ali" }],
  openGraph: {
    title: "Muhammad Sufyan Ali | Full-stack Developer",
    description:
      "Full-stack developer based in Faisalabad. I turn ideas into fast, scalable products — and I care about the details that make software feel right.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
