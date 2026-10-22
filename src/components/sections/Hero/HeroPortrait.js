"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import PortraitSkeleton from "@/components/common/PortraitSkeleton/PortraitSkeleton";
import { PROFILE } from "@/constants/profile";
import styles from "./Hero.module.css";

export default function HeroPortrait() {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className={styles.portraitContainer}>
      <div className={styles.portraitFrame}>
        <PortraitSkeleton isLoaded={isLoaded} tag="DEV_PORTRAIT // ID_01" />
        <Image
          ref={imgRef}
          src={PROFILE.portrait.src}
          alt={PROFILE.portrait.alt}
          fill
          sizes="(max-width: 809px) 100vw, 320px"
          priority
          className={`${styles.portraitImage} ${
            isLoaded ? styles.portraitImageLoaded : styles.portraitImageLoading
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
}
