import { PROJECTS_DATA } from "./projects";

const getProjectScreens = (id, fallbackHero) => {
  const found = PROJECTS_DATA.find((p) => p.id === id);
  if (found && found.screens && found.screens.length > 0) {
    return found.screens;
  }
  return [
    {
      id: "01",
      num: "01",
      title: "Hero Showcase",
      caption: "",
      src: fallbackHero,
    },
  ];
};

export const PROJECT_DETAILS_MAP = {
  quickcart: {
    id: "quickcart",
    archiveCode: "PROJECT_ARCHIVE_001",
    title: "QUICKCART",
    liveUrl: "https://quick-cart-client-alpha.vercel.app",
    backdropColor: "#EA580C",
    heroImage: "/images/quickcart-mockups/01-homepage-hero.png",
    heroBadge: "PRODUCTION_V2.4",
    screens: getProjectScreens("quickcart", "/images/quickcart-mockups/01-homepage-hero.png"),
    overviewSectionNumber: "01 / OVERVIEW",
    overviewHeadline: "ARCHITECTED FOR\nSCALE & SEAMLESS\nCOMMERCE.",
    overviewLabel: "OVERVIEW",
    overviewBody:
      "QuickCart is a full-stack e-commerce ecosystem built from the ground up to deliver sub-100ms product catalog browsing, robust cart state synchronization, and an intuitive customer checkout experience.",
    challengeLabel: "CHALLENGE",
    challengeBody:
      "Engineered real-time inventory locking, resilient webhooks for payment processing, and high-performance server-side rendering for optimal SEO and conversion throughput across international storefronts.",
    techSpecsSectionNumber: "02 / TECH_SPECS",
    techSpecs: [
      { id: "role", label: "ROLE", value: "FULL-STACK ARCHITECT" },
      { id: "timeline", label: "TIMELINE", value: "3 MONTHS" },
      { id: "stack", label: "STACK", value: "MERN STACK" },
      {
        id: "status",
        label: "STATUS",
        value: "LIVE / VERIFIED",
        href: "https://quick-cart-client-alpha.vercel.app",
      },
    ],
    nextProjectSectionNumber: "03 / NEXT_PROJECT",
    nextProject: {
      id: "slidex-lms",
      title: "SLIDEX LMS",
    },
  },
  "slidex-lms": {
    id: "slidex-lms",
    archiveCode: "PROJECT_ARCHIVE_002",
    title: "SLIDEX LMS",
    liveUrl: "https://lms-client-blush.vercel.app",
    backdropColor: "#111827",
    heroImage: "/images/slidex-lms-mockups/10-diagonal-style.png",
    heroBadge: "PRODUCTION_V1.8",
    screens: getProjectScreens("slidex-lms", "/images/slidex-lms-mockups/10-diagonal-style.png"),
    overviewSectionNumber: "01 / OVERVIEW",
    overviewHeadline: "STREAMLINING\nMODULAR DIGITAL\nEDUCATION.",
    overviewLabel: "OVERVIEW",
    overviewBody:
      "SlideX LMS is an all-in-one educational platform connecting instructors, students, and institutional administrators with structured course delivery, interactive media, and transparent progress analytics.",
    challengeLabel: "CHALLENGE",
    challengeBody:
      "Implemented a low-latency video streaming pipeline, granular role-based permissions (RBAC), and automated quiz evaluation with instant feedback telemetry.",
    techSpecsSectionNumber: "02 / TECH_SPECS",
    techSpecs: [
      { id: "role", label: "ROLE", value: "SYSTEMS LEAD" },
      { id: "timeline", label: "TIMELINE", value: "4 MONTHS" },
      { id: "stack", label: "STACK", value: "MERN STACK" },
      {
        id: "status",
        label: "STATUS",
        value: "DEPLOYED / STABLE",
        href: "https://lms-client-blush.vercel.app",
      },
    ],
    nextProjectSectionNumber: "03 / NEXT_PROJECT",
    nextProject: {
      id: "that-marketing",
      title: "THAT. MARKETING",
    },
  },
  "that-marketing": {
    id: "that-marketing",
    archiveCode: "PROJECT_ARCHIVE_003",
    title: "THAT. MARKETING",
    liveUrl: "https://markting-site-deploy-18-10-2025.vercel.app",
    backdropColor: "#FF751F",
    heroImage: "/images/that-marketing-mockups/01-hero.png",
    heroBadge: "AGENCY_V3.0",
    screens: getProjectScreens("that-marketing", "/images/that-marketing-mockups/01-hero.png"),
    overviewSectionNumber: "01 / OVERVIEW",
    overviewHeadline: "HIGH IMPACT\nDIGITAL EXPERIENCES\nFOR ENTERPRISE.",
    overviewLabel: "OVERVIEW",
    overviewBody:
      "A modern digital agency showcase engineered to display brand narrative, enterprise metrics, and creative execution with fluid kinetic animations.",
    challengeLabel: "CHALLENGE",
    challengeBody:
      "Balanced rich GPU-accelerated motion interactions with 100/100 Lighthouse performance scores and dynamic CMS content delivery.",
    techSpecsSectionNumber: "02 / TECH_SPECS",
    techSpecs: [
      { id: "role", label: "ROLE", value: "FRONTEND LEAD" },
      { id: "timeline", label: "TIMELINE", value: "6 WEEKS" },
      { id: "stack", label: "STACK", value: "REACT / FRAMER" },
      {
        id: "status",
        label: "STATUS",
        value: "ACTIVE / SHOWCASE",
        href: "https://markting-site-deploy-18-10-2025.vercel.app",
      },
    ],
    nextProjectSectionNumber: "03 / NEXT_PROJECT",
    nextProject: {
      id: "taskly",
      title: "TASKLY",
    },
  },
  taskly: {
    id: "taskly",
    archiveCode: "PROJECT_ARCHIVE_004",
    title: "TASKLY",
    liveUrl: "https://github.com/SufyanAli-7/Taskly-Client-Expo",
    backdropColor: "#6366F1",
    heroImage: "/images/taskly-mockups/01-hero-trio.png",
    heroBadge: "MOBILE_PWA_V1.2",
    screens: getProjectScreens("taskly", "/images/taskly-mockups/01-hero-trio.png"),
    overviewSectionNumber: "01 / OVERVIEW",
    overviewHeadline: "ZERO FRICTION\nTASK EXECUTION\n& TELEMETRY.",
    overviewLabel: "OVERVIEW",
    overviewBody:
      "Taskly is a mobile-first task optimization and workflow management suite built for deep work focus and rapid keyboard-first data entry.",
    challengeLabel: "CHALLENGE",
    challengeBody:
      "Designed an offline-first indexedDB local caching engine with automatic conflict resolution upon background network reconnect.",
    techSpecsSectionNumber: "02 / TECH_SPECS",
    techSpecs: [
      { id: "role", label: "ROLE", value: "FULL-STACK DEV" },
      { id: "timeline", label: "TIMELINE", value: "2 MONTHS" },
      { id: "stack", label: "STACK", value: "REACT NATIVE / EXPO" },
      {
        id: "status",
        label: "STATUS",
        value: "PRODUCTION / READY",
        href: "https://github.com/SufyanAli-7/Taskly-Client-Expo",
      },
    ],
    nextProjectSectionNumber: "03 / NEXT_PROJECT",
    nextProject: {
      id: "quickcart",
      title: "QUICKCART",
    },
  },
};

export const DEFAULT_PROJECT_DETAIL = PROJECT_DETAILS_MAP.quickcart;
