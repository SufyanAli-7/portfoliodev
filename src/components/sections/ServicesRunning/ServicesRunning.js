import Container from "../../layout/Container/Container";
import ServiceInfo from "./ServiceInfo";
import CodeWindow from "./CodeWindow";
import ApiVisualWindow from "./ApiVisualWindow";
import PerfVisualWindow from "./PerfVisualWindow";
import SaasVisualWindow from "./SaasVisualWindow";
import { SERVICES_SECTION, SERVICES_LIST } from "@/constants/services";
import styles from "./ServicesRunning.module.css";

function renderVisual(visualType) {
  switch (visualType) {
    case "code-window":
      return <CodeWindow />;
    case "api-visual":
      return <ApiVisualWindow />;
    case "perf-radar":
      return <PerfVisualWindow />;
    case "saas-visual":
      return <SaasVisualWindow />;
    default:
      return null;
  }
}

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

        {/* List of Services (0031: FULL_STACK_DEV, 0032: API_ENGINEERING, 0033: PERF_OPTIMIZATION) */}
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
                  {renderVisual(service.visualType)}
                  <ServiceInfo
                    serviceCode={service.serviceCode}
                    title={service.title}
                    description={service.description}
                    status={service.status}
                  />
                </>
              ) : (
                <>
                  <ServiceInfo
                    serviceCode={service.serviceCode}
                    title={service.title}
                    description={service.description}
                    status={service.status}
                  />
                  {renderVisual(service.visualType)}
                </>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
