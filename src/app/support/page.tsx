import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.css";

const SIDEBAR = [
  { heading: "GETTING STARTED", items: ["Create an account", "Verify your identity", "Check coverage"] },
  { heading: "PARALLEL", items: ["Starting a session", "Sessions", "Voice and video", "Privacy"], active: "Sessions" },
  { heading: "RELAYS", items: ["Coverage and dead zones", "Relay generations", "Reporting an outage"] },
];

const CAUSES = [
  "You reached the 40 minute limit. Sessions end at 40 minutes and cannot be extended.",
  "You moved out of relay coverage. Voice and video drop immediately. Text queues and delivers on reconnect.",
  "The matched identity ended the session on their side.",
  "Scheduled relay maintenance in your region. Check the status page before reporting an issue.",
];

const STATUS_ROWS = [
  { name: "Relay network", state: "Operational", dot: "statusDotOperational" as const },
  { name: "Parallel messaging", state: "Operational", dot: "statusDotOperational" as const },
  { name: "Parallel voice and video", state: "Operational", dot: "statusDotOperational" as const },
  { name: "Echoes", state: "Degraded performance", dot: "statusDotDegraded" as const },
  { name: "Perspective Exchange", state: "No data", dot: "statusDotDown" as const },
];

export default function Support() {
  return (
    <div className={styles.page}>
      <Nav />

      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbLink}>Help center</span>
        <span className={styles.breadcrumbSep}>/</span>
        <span className={styles.breadcrumbLink}>Parallel</span>
        <span className={styles.breadcrumbSep}>/</span>
        <span className={styles.breadcrumbCurrent}>Sessions</span>
      </div>

      <div className={styles.body}>
        <div className={styles.sidebar}>
          {SIDEBAR.map((category) => (
            <div key={category.heading} className={styles.sidebarCategory}>
              <p className={styles.sidebarHeading}>{category.heading}</p>
              {category.items.map((item) => (
                <p key={item} className={item === category.active ? styles.sidebarItemActive : styles.sidebarItem}>
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.article}>
          <h1 className={styles.articleTitle}>Why did my session end early?</h1>
          <p className={styles.articleMeta}>ARTICLE PA-0417 · UPDATED 2 JULY 2026</p>
          <p className={styles.articleBody}>
            Parallel ends a session automatically under a small number of conditions. Most are routine and do not
            indicate a problem with your account or your match.
          </p>
          <div className={styles.callout}>
            <p className={styles.calloutLabel}>Note</p>
            <p className={styles.calloutBody}>
              If your session ended with the message Channel integrity lost, this is not one of the conditions below.
              Contact support and include your relay ID.
            </p>
          </div>
          <h2 className={styles.subheading}>Common causes</h2>
          <div className={styles.steps}>
            {CAUSES.map((cause, i) => (
              <div key={i} className={styles.step}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <p className={styles.stepBody}>{cause}</p>
              </div>
            ))}
          </div>
          <p className={styles.articleBody}>
            If none of these apply, open Settings, then Session history, and note the session ID before contacting
            support.
          </p>
          <div className={styles.feedback}>
            <p className={styles.feedbackLabel}>Was this helpful?</p>
            <div className={styles.feedbackButtons}>
              <button className={styles.feedbackButton}>Yes</button>
              <button className={styles.feedbackButton}>No</button>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.status}>
        <div className={styles.statusHead}>
          <h2 className={styles.statusHeading}>Service status</h2>
          <p className={styles.statusUpdated}>UPDATED 4 MINUTES AGO</p>
        </div>
        <div className={styles.statusRows}>
          {STATUS_ROWS.map((row) => (
            <div key={row.name} className={styles.statusRow}>
              <span className={`${styles.statusDot} ${styles[row.dot]}`} />
              <p className={styles.statusName}>{row.name}</p>
              <p className={styles.statusState}>{row.state}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
