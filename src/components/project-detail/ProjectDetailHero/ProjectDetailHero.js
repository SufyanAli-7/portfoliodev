"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container/Container";
import ProjectSkeleton from "@/components/projects/ProjectSkeleton/ProjectSkeleton";
import styles from "./ProjectDetailHero.module.css";

export default function ProjectDetailHero({ project }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  // If image is already cached
  useEffect(() => {
    setIsLoaded(false);
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [project.heroImage]);

  return (
    <section className={styles.heroSection} aria-label={`${project.title} Hero Showcase`}>
      <Container>
        <div className={styles.inner}>
          {/* Top Archive Code Tag: e.g. PROJECT_ARCHIVE_001 */}
          <div className={styles.archiveCode}>{project.archiveCode}</div>

          {/* Massive Headline */}
          <h1 className={styles.mainTitle}>{project.title}</h1>

          {/* Full-Width Showcase Media Frame with ProjectSkeleton */}
          <div className={styles.mediaFrame}>
            {/* Dark Brutalist Skeleton Loader */}
            <ProjectSkeleton isLoaded={isLoaded} />

            <div className={styles.imageWrapper}>
              <Image
                ref={imgRef}
                src={project.heroImage}
                alt={`${project.title} project interface`}
                fill
                priority
                quality={92}
                sizes="(max-width: 1320px) 100vw, 1320px"
                className={`${styles.heroImg} ${isLoaded ? styles.heroImgLoaded : ""}`}
                onLoad={() => setIsLoaded(true)}
              />
            </div>

            {/* Bottom-Left Floating Pill Badge: e.g. PRODUCTION_V2.4 */}
            <div className={styles.heroBadge} aria-hidden="true">
              <span className={styles.badgeText}>{project.heroBadge}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
