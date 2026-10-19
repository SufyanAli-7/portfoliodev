/**
 * About Page Constants
 * Extracted from Muhammad Sufyan Ali's Resume & Design Specification
 */

export const ABOUT_CONFIG = {
  sectionNumber: "04 /",
  sectionTitle: "ABOUT",

  portrait: {
    label: "/ SRC_IDENTITY_PORTRAIT",
    src: "/images/about-portrait.png",
    alt: "Muhammad Sufyan Ali — Full-Stack Developer portrait with cinematic teal lighting",
    location: {
      label: "LOCATION",
      value: "FAISALABAD, PK",
    },
    status: {
      label: "STATUS",
      value: "AVAILABLE",
    },
  },

  content: {
    headline: "BRIDGING THE GAP BETWEEN RAW FUNCTIONAL LOGIC AND EDITORIAL AESTHETICS.",
    paragraphs: [
      "I am a Full-Stack Developer based in Faisalabad, Pakistan, operating at the intersection of technical precision and visual minimalism. My work focuses on building digital architectures and scalable SaaS platforms that are as robust in their performance as they are intentional in their design.",
      "Deeply influenced by the brutalist movement and the structural clarity of the terminal interface, I reject unnecessary complexity. With core expertise spanning React, Next.js, TypeScript, and Node.js, every line of code and every pixel in my layout serves a functional purpose.",
    ],
  },

  techStack: {
    label: "/ TECH_STACK_OVERVIEW",
    columns: [
      {
        id: "frontend",
        title: "CORE_FRONTEND",
        skills: [
          "React / Next.js",
          "TypeScript",
          "Tailwind CSS",
        ],
      },
      {
        id: "engineering",
        title: "ENGINEERING",
        skills: [
          "Node.js / Express.js",
          "MongoDB / Prisma",
          "AWS Infrastructure",
        ],
      },
    ],
  },

  philosophy: {
    label: "DESIGN_PHILOSOPHY",
    quote:
      '"Function is the highest form of beauty. Complexity is a debt we must constantly pay down through refinement."',
  },

  resumeCta: {
    label: "Download_CV",
    href: "/Muhammad-Sufyan-Ali-Resume.pdf",
    filename: "Muhammad_Sufyan_Ali_Resume.pdf",
  },

  // Additional authentic resume credentials
  credentials: {
    education: {
      degree: "BS Software Engineering",
      institution: "Government College and University Faisalabad (GCUF)",
      period: "2021 — 2025",
      thesis: "Genix AI Platform",
    },
    experience: [
      {
        role: "Full Stack Web Development Intern",
        company: "Codiora Software House",
        type: "Remote, Pakistan",
      },
      {
        role: "Full Stack Development Intern",
        company: "DevelopersHub Corporation",
        type: "Remote, Pakistan",
      },
    ],
    certifications: [
      {
        title: "Start Writing Prompts like a Pro",
        issuer: "Google",
        topic: "Prompt Engineering & Generative AI",
      },
    ],
  },
};
