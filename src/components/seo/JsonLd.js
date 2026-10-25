export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Sufyan Ali",
    alternateName: "Sufyan Ali",
    url: "https://sufyanali.dev/",
    image: "https://sufyanali.dev/cover.jpg",
    jobTitle: "Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in React, Next.js, Node.js, Express, MongoDB, PostgreSQL, and modern web application development.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Faisalabad",
      addressCountry: "PK",
    },
    sameAs: [
      "https://www.linkedin.com/in/m-sufyan-ali/",
      "https://github.com/SufyanAli-7",
    ],
    knowsAbout: [
      "Full Stack Development",
      "MERN Stack",
      "Software Engineering",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "React Native",
      "Mobile App Development",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "REST APIs",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Muhammad Sufyan Ali Portfolio",
    url: "https://sufyanali.dev/",
    description:
      "Portfolio of Muhammad Sufyan Ali, Full-Stack Developer & Software Engineer building scalable web and mobile applications.",
    author: {
      "@type": "Person",
      name: "Muhammad Sufyan Ali",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
