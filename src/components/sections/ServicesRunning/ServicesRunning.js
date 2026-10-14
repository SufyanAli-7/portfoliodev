import Container from "../../layout/Container/Container";
import ServiceInfo from "./ServiceInfo";
import CodeWindow from "./CodeWindow";
import ApiVisualWindow from "./ApiVisualWindow";
import { SERVICES_SECTION, SERVICES_LIST } from "@/constants/services";
import styles from "./ServicesRunning.module.css";

export default function ServicesRunning() {
  return (
    <section
      className={styles.servicesSection}
      id="services"
      aria-label="Services Running and Tech Stack"
    >
      <Container>
        {/* Section Header: 03 / SERVICES_RUNNING with neon accent line */}
        <div className={styles.sectionHeader}>
          <span className={styles.headerPrefix}>
            {SERVICES_SECTION.sectionPrefix || "03 /"}
          </span>
          <h2 className={styles.headerTitle}>
            {SERVICES_SECTION.sectionTitle || "SERVICES_RUNNING"}
          </h2>
          <div className={styles.accentLine} aria-hidden="true" />
        </div>

        {/* List of Services (0031: FULL_STACK_DEV, 0032: API_ENGINEERING) */}
        <div className={styles.servicesList}>
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className={`${styles.serviceItem} ${
                service.layout === "visual-left"
                  ? styles.itemVisualLeft
                  : styles.itemVisualRight
              }`}
            >
              {service.layout === "visual-left" ? (
                <>
                  {/* Left: API Visual Canvas with left-to-right flowing colorful lines */}
                  <ApiVisualWindow />
                  {/* Right: Info Column */}
                  <ServiceInfo
                    serviceCode={service.serviceCode}
                    title={service.title}
                    description={service.description}
                    status={service.status}
                  />
                </>
              ) : (
                <>
                  {/* Left: Info Column */}
                  <ServiceInfo
                    serviceCode={service.serviceCode}
                    title={service.title}
                    description={service.description}
                    status={service.status}
                  />
                  {/* Right: Scrolling Code Window */}
                  <CodeWindow />
                </>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
