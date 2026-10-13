import Image from "next/image";
import { PROFILE } from "@/constants/profile";
import styles from "./Hero.module.css";

export default function HeroPortrait() {
  return (
    <div className={styles.portraitContainer}>
      <div className={styles.portraitFrame}>
        <Image
          src={PROFILE.portrait.src}
          alt={PROFILE.portrait.alt}
          fill
          sizes="(max-width: 809px) 100vw, 320px"
          priority
          className={styles.portraitImage}
        />
      </div>
    </div>
  );
}
