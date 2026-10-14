export const SERVICES_SECTION = {
  sectionPrefix: "03 /",
  sectionTitle: "SERVICES_RUNNING",
};

export const SERVICES_LIST = [
  {
    id: "full-stack",
    serviceCode: "0031",
    title: "FULL_STACK_DEV",
    description:
      "I build apps end-to-end — from database schema to the UI you touch. React, Next.js, and Node.js are my daily drivers.",
    status: {
      state: "ACTIVE",
      duration: "2Y 6MO",
      startDate: "2024-04-01",
    },
    visualType: "code-window",
    layout: "visual-right", // Left: text info, Right: code window
  },
  {
    id: "api-engineering",
    serviceCode: "0032",
    title: "API_ENGINEERING",
    description:
      "I design APIs that are a joy to work with. REST, GraphQL, microservices — whatever fits the problem best.",
    status: {
      state: "ACTIVE",
      duration: "2Y 6MO",
      startDate: "2024-04-01",
    },
    visualType: "api-visual",
    layout: "visual-left", // Left: API visual canvas, Right: text info
  },
];

// Backwards compatibility for existing imports
export const SERVICE_DATA = {
  ...SERVICES_SECTION,
  ...SERVICES_LIST[0],
};
