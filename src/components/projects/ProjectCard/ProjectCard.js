"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectSkeleton from "../ProjectSkeleton/ProjectSkeleton";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project, priority = false }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  // If image is already cached
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      href={`/projects/${project.id}`}
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`${project.title} - ${project.category} (Click to open project details)`}
    >
      {/* Floating "OPEN PROJECT" cursor badge across entire card */}
      {isHovered && (
        <div
          className={styles.cursorBadge}
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
          aria-hidden="true"
        >
          <span className={styles.badgeText}>OPEN PROJECT</span>
        </div>
      )}

      {/* Media Image Showcase with Skeleton */}
      <div className={styles.mediaContainer}>
        {/* Dark Brutalist Skeleton Loader */}
        <ProjectSkeleton isLoaded={isLoaded} />

        {/* Project Real Mockup Image */}
        <div className={styles.imageInner}>
          <Image
            ref={imgRef}
            src={project.image}
            alt={project.alt || `${project.title} project screenshot`}
            width={900}
            height={520}
            priority={priority}
            quality={90}
            className={`${styles.image} ${isLoaded ? styles.imageLoaded : ""}`}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </div>

      {/* Card Info Meta Block */}
      <div className={styles.infoBlock}>
        {/* Date Row */}
        <div className={styles.dateRow}>
          <time className={styles.date}>{project.date}</time>
        </div>

        {/* Title and Right-Side "● OPEN" Indicator */}
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{project.title}</h2>
          <div className={styles.openIndicator} aria-hidden="true">
            <span className={styles.openDot} />
            <span className={styles.openLabel}>OPEN</span>
          </div>
        </div>

        {/* Description */}
        <p className={styles.description}>{project.description}</p>
      </div>
    </Link>
  );
}
