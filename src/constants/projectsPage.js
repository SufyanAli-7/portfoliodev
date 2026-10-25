export const PROJECTS_PAGE_CONFIG = {
  systemVersion: "SYSTEM_VERSION / 2.0.4",
  sectionPrefix: "02 /",
  sectionTitle: "PROJECTS",
  description:
    "An indexed repository of digital constructs, experimental protocols, and refined architectural software interfaces.",
  metaStats: [
    { label: "TOTAL_ENTRIES:", value: "04" },
    { label: "LAST_UPDATE:", value: "26.10.2026" },
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
    liveUrl: "https://quick-cart-client-alpha.vercel.app",
  },
  {
    id: "slidex-lms",
    date: "APR 11, 2026",
    title: "SLIDEX LMS",
    category: "EDTECH LEARNING SYSTEM",
    description:
      "SlideX LMS is an all-in-one learning platform built to provide students, instructors, and administrators with an intuitive educational experience.",
    image: "/images/slidex-lms-mockups/02-course-catalog.png",
    alt: "SlideX LMS complete platform perspective view and interface suite",
    tags: ["Next.js", "Express", "Node.js", "MongoDB", "Video Engine"],
    liveUrl: "https://lms-client-blush.vercel.app",
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
    liveUrl: "https://markting-site-deploy-18-10-2025.vercel.app",
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
    liveUrl: "https://github.com/SufyanAli-7/Taskly-Client-Expo",
  },
];

export const STACK_ANALYSIS_CONFIG = {
  title: "STACK_ANALYSIS",
  columns: [
  [
    { label: "FRONTEND", value: "Next.js / React / React Native" },
    { label: "STYLING", value: "Tailwind CSS / shadcn / Ant Design" },
    { label: "LANGUAGES", value: "JavaScript / TypeScript" },
  ],
  [
    { label: "BACKEND", value: "Node.js / Express.js" },
    { label: "DATABASE", value: "MongoDB / PostgreSQL / Redis" },
    { label: "ORM", value: "Prisma / Mongoose" },
  ],
  [
    { label: "AUTH", value: "JWT / Clerk / OAuth" },
    { label: "PAYMENTS", value: "Stripe" },
    { label: "DEPLOYMENT", value: "Vercel / Docker / VPS / AWS" },
  ],
  [
    { label: "STATE", value: "Redux / Zustand" },
    { label: "VERSIONING", value: "Git / GitHub" },
    { label: "INTEGRATION", value: "REST APIs / AI APIs / CI/CD" },
  ],
],
};
