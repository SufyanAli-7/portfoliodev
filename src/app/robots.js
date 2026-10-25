export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://sufyanali.dev/sitemap.xml",
    host: "https://sufyanali.dev",
  };
}
