export const PROJECT_DETAILS_MAP = {
  quickcart: {
    id: "quickcart",
    archiveCode: "PROJECT_ARCHIVE_001",
    title: "QUICKCART",
    heroImage: "/images/quickcart-mockups/01-homepage-hero.png",
    heroBadge: "PRODUCTION_V2.4",
    overviewSectionNumber: "01 / OVERVIEW",
    overviewHeadline: "ARCHITECTED FOR\nSCALE & SEAMLESS\nCOMMERCE.",
    overviewLabel: "OVERVIEW",
    overviewBody:
      "QuickCart is a full-stack e-commerce ecosystem built from the ground up to deliver sub-100ms product catalog browsing, robust cart state synchronization, and an intuitive customer checkout experience.",
    challengeLabel: "CHALLENGE",
    challengeBody:
      "Engineered real-time inventory locking, resilient webhooks for payment processing, and high-performance server-side rendering for optimal SEO and conversion throughput across international storefronts.",
    techSpecsSectionNumber: "03 / TECH_SPECS",
    techSpecs: [
      { id: "role", label: "ROLE", value: "FULL-STACK ARCHITECT" },
      { id: "timeline", label: "TIMELINE", value: "3 MONTHS" },
      { id: "stack", label: "STACK", value: "NEXT.JS / NODE.JS" },
      { id: "status", label: "STATUS", value: "LIVE // VERIFIED" },
    ],
    nextProjectSectionNumber: "02 / NEXT_PROJECT",
    nextProject: {
      id: "slidex-lms",
      title: "SLIDEX LMS",
    },
  },
  "slidex-lms": {
    id: "slidex-lms",
    archiveCode: "PROJECT_ARCHIVE_002",
    title: "SLIDEX LMS",
    heroImage: "/images/slidex-lms-mockups/10-diagonal-style.png",
    heroBadge: "PRODUCTION_V1.8",
    overviewSectionNumber: "01 / OVERVIEW",
    overviewHeadline: "STREAMLINING\nMODULAR DIGITAL\nEDUCATION.",
    overviewLabel: "OVERVIEW",
    overviewBody:
      "SlideX LMS is an all-in-one educational platform connecting instructors, students, and institutional administrators with structured course delivery, interactive media, and transparent progress analytics.",
    challengeLabel: "CHALLENGE",
    challengeBody:
      "Implemented a low-latency video streaming pipeline, granular role-based permissions (RBAC), and automated quiz evaluation with instant feedback telemetry.",
    techSpecsSectionNumber: "03 / TECH_SPECS",
    techSpecs: [
      { id: "role", label: "ROLE", value: "SYSTEMS LEAD" },
      { id: "timeline", label: "TIMELINE", value: "4 MONTHS" },
      { id: "stack", label: "STACK", value: "EXPRESS / MONGODB" },
      { id: "status", label: "STATUS", value: "DEPLOYED // STABLE" },
    ],
    nextProjectSectionNumber: "02 / NEXT_PROJECT",
    nextProject: {
      id: "that-marketing",
      title: "THAT. MARKETING",
    },
  },
  "that-marketing": {
    id: "that-marketing",
    archiveCode: "PROJECT_ARCHIVE_003",
    title: "THAT. MARKETING",
    heroImage: "/images/that-marketing-mockups/01-hero.png",
    heroBadge: "AGENCY_V3.0",
    overviewSectionNumber: "01 / OVERVIEW",
    overviewHeadline: "HIGH IMPACT\nDIGITAL EXPERIENCES\nFOR ENTERPRISE.",
    overviewLabel: "OVERVIEW",
    overviewBody:
      "A modern digital agency showcase engineered to display brand narrative, enterprise metrics, and creative execution with fluid kinetic animations.",
    challengeLabel: "CHALLENGE",
    challengeBody:
      "Balanced rich GPU-accelerated motion interactions with 100/100 Lighthouse performance scores and dynamic CMS content delivery.",
    techSpecsSectionNumber: "03 / TECH_SPECS",
    techSpecs: [
      { id: "role", label: "ROLE", value: "FRONTEND LEAD" },
      { id: "timeline", label: "TIMELINE", value: "6 WEEKS" },
      { id: "stack", label: "STACK", value: "REACT / FRAMER" },
      { id: "status", label: "STATUS", value: "ACTIVE // SHOWCASE" },
    ],
    nextProjectSectionNumber: "02 / NEXT_PROJECT",
    nextProject: {
      id: "taskly",
      title: "TASKLY",
    },
  },
  taskly: {
    id: "taskly",
    archiveCode: "PROJECT_ARCHIVE_004",
    title: "TASKLY",
    heroImage: "/images/taskly-mockups/01-hero-trio.png",
    heroBadge: "MOBILE_PWA_V1.2",
    overviewSectionNumber: "01 / OVERVIEW",
    overviewHeadline: "ZERO FRICTION\nTASK EXECUTION\n& TELEMETRY.",
    overviewLabel: "OVERVIEW",
    overviewBody:
      "Taskly is a mobile-first task optimization and workflow management suite built for deep work focus and rapid keyboard-first data entry.",
    challengeLabel: "CHALLENGE",
    challengeBody:
      "Designed an offline-first indexedDB local caching engine with automatic conflict resolution upon background network reconnect.",
    techSpecsSectionNumber: "03 / TECH_SPECS",
    techSpecs: [
      { id: "role", label: "ROLE", value: "FULL-STACK DEV" },
      { id: "timeline", label: "TIMELINE", value: "2 MONTHS" },
      { id: "stack", label: "STACK", value: "PWA / NEXT.JS" },
      { id: "status", label: "STATUS", value: "PRODUCTION // READY" },
    ],
    nextProjectSectionNumber: "02 / NEXT_PROJECT",
    nextProject: {
      id: "quickcart",
      title: "QUICKCART",
    },
  },
};

export const DEFAULT_PROJECT_DETAIL = PROJECT_DETAILS_MAP.quickcart;
