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
  title: "ERICODE_ | Full-stack Developer",
  description:
    "Full-stack developer based in Berlin. I turn ideas into fast, scalable products — and I care about the details that make software feel right.",
  keywords: [
    "ERICODE",
    "Full-stack developer",
    "Berlin",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Ericode" }],
  openGraph: {
    title: "ERICODE_ | Full-stack Developer",
    description:
      "Full-stack developer based in Berlin. I turn ideas into fast, scalable products — and I care about the details that make software feel right.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
