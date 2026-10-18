export const PROJECTS_PAGE_CONFIG = {
  systemVersion: "SYSTEM_VERSION // 2.0.4",
  sectionPrefix: "02 /",
  sectionTitle: "PROJECTS",
  description:
    "An indexed repository of digital constructs, experimental protocols, and refined architectural software interfaces.",
  metaStats: [
    { label: "TOTAL_ENTRIES:", value: "04" },
    { label: "LAST_UPDATE:", value: "24.10.2024" },
    { label: "STATUS:", value: "OPERATIONAL" },
  ],
};

export const PROJECTS_LIST = [
  {
    id: "quickcart",
    date: "APR 11, 2026",
    title: "QUICKCART",
    category: "FULL-STACK E-COMMERCE",
    description:
      "Full-stack e-commerce ecosystem — product catalog, cart & checkout, customer portal, and comprehensive admin management.",
    image: "/images/quickcart-mockups/01-homepage-hero.png",
    alt: "QuickCart e-commerce storefront hero and product catalogue interface",
    tags: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://github.com/sufyanali",
  },
  {
    id: "slidex-lms",
    date: "APR 11, 2026",
    title: "SLIDEX LMS",
    category: "EDTECH LEARNING SYSTEM",
    description:
      "SlideX LMS is an all-in-one learning platform built to provide students, instructors, and administrators with an intuitive educational experience.",
    image: "/images/slidex-lms-mockups/10-diagonal-style.png",
    alt: "SlideX LMS complete platform perspective view and interface suite",
    tags: ["Next.js", "Express", "Node.js", "MongoDB", "Video Engine"],
    liveUrl: "https://github.com/sufyanali",
  },
  {
    id: "that-marketing",
    date: "APR 11, 2026",
    title: "THAT. MARKETING",
    category: "DIGITAL AGENCY PLATFORM",
    description:
      "High-converting digital agency platform engineered to showcase creative and technical capabilities to global enterprise clients.",
    image: "/images/that-marketing-mockups/01-hero.png",
    alt: "that. Marketing agency hero showcase and client metrics overview",
    tags: ["React", "Next.js", "Node.js", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://github.com/sufyanali",
  },
  {
    id: "taskly",
    date: "APR 11, 2026",
    title: "TASKLY",
    category: "PRODUCTIVITY SUITE",
    description:
      "Mobile-first productivity application engineered to help professionals organize daily workloads with zero friction and real-time state management.",
    image: "/images/taskly-mockups/01-hero-trio.png",
    alt: "Taskly multi-screen productivity app overview",
    tags: ["React", "Next.js", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://github.com/sufyanali",
  },
];

export const STACK_ANALYSIS_CONFIG = {
  title: "STACK_ANALYSIS",
  columns: [
    [
      { label: "FRONTEND", value: "Next.js / Tailwind" },
      { label: "BACKEND", value: "Node.js / Go" },
      { label: "INFRA", value: "AWS / Vercel" },
    ],
    [
      { label: "RUNTIME", value: "Docker / WASM" },
      { label: "VERSIONING", value: "Git / LFS" },
      { label: "PROTOCOLS", value: "gRPC / WebSocket" },
    ],
  ],
};
