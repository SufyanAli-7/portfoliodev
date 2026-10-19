/**
 * Contact Page Constants
 * Matches brutalist specification and Muhammad Sufyan Ali's credentials
 */

export const CONTACT_CONFIG = {
  sectionNumber: "04 /",
  sectionTitle: "CONTACT",

  headline: "LET'S BUILD SOMETHING.",
  description:
    "Open to new projects, collaborations, and conversations. If you have something worth building, I want to hear about it.",

  availability: {
    status: "AVAILABLE FOR WORK",
    location: "FAISALABAD, PK · UTC+5",
    responseTime: "RESPONSE_TIME: < 24H",
  },

  socials: {
    label: "/ ELSEWHERE",
    links: [
      {
        label: "GITHUB",
        href: "https://github.com/sufyanali-7",
        isExternal: true,
      },
      {
        label: "LINKEDIN",
        href: "https://linkedin.com/in/m-sufyan-ali",
        isExternal: true,
      },
    ],
  },

  direct: {
    label: "/ DIRECT",
    email: "sufyan.ali0612@gmail.com",
    displayEmail: "SUFYAN.ALI0612@GMAIL.COM",
  },

  form: {
    cardLabel: "/ INIT_MESSAGE",
    fields: {
      name: {
        label: "NAME",
        placeholder: "Jane Smith",
      },
      email: {
        label: "EMAIL",
        placeholder: "janesmith@gmail.com",
      },
      message: {
        label: "MESSAGE",
        placeholder: "Describe what you're building...",
      },
    },
    footerBadge: "ENCRYPTED — NO SPAM",
    submitButton: "SEND MESSAGE",
  },
};
