import Container from "../../layout/Container/Container";
import HeroHeadline from "./HeroHeadline";
import HeroBio from "./HeroBio";
import HeroPortrait from "./HeroPortrait";
import DevSliderWidget from "./DevSliderWidget";
import StatusWidget from "./StatusWidget";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroSection} id="home" aria-label="Hero Introduction">
      <Container>
        <div className={styles.heroGrid}>
          {/* Left Column: Big Headline & Bio description */}
          <div className={styles.leftColumn}>
            <HeroHeadline />
            <HeroBio />
          </div>

          {/* Right Column: Portrait Card, Equalizer Widget, Status, and CTA */}
          <div className={styles.rightColumn}>
            <HeroPortrait />
            <DevSliderWidget />
            <StatusWidget />
          </div>
        </div>
      </Container>
    </section>
  );
}
