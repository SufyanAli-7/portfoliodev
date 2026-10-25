import { PROJECT_DETAILS_MAP } from "@/constants/projectDetails";

export default function sitemap() {
  const baseUrl = "https://sufyanali.dev";
  const currentDate = new Date().toISOString();

  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [`${baseUrl}/cover.jpg`],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${baseUrl}/cover.jpg`],
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${baseUrl}/cover.jpg`],
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [`${baseUrl}/cover.jpg`],
    },
  ];

  const projectRoutes = Object.keys(PROJECT_DETAILS_MAP).map((slug) => {
    const project = PROJECT_DETAILS_MAP[slug];
    const heroImage = project?.heroImage
      ? `${baseUrl}${project.heroImage.startsWith("/") ? "" : "/"}${project.heroImage}`
      : `${baseUrl}/cover.jpg`;

    return {
      url: `${baseUrl}/projects/${slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [heroImage],
    };
  });

  return [...staticRoutes, ...projectRoutes];
}
