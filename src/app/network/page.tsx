import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.css";

const WHAT_IT_DOES = [
  "Stabilizes a small region of spacetime",
  "Holds that region open long enough for information to cross",
  "Confirms identity signatures at both ends",
  "Logs every channel it opens",
];

const WHAT_IT_DOES_NOT = [
  "Create realities",
  "Create or alter consciousness",
  "Generate, store, or interpret what is said in a session",
  "Function beyond its effective radius",
];

const GENERATIONS = [
  { generation: "Gen 1", deployed: "2019", radius: "Laboratory only", channels: "Text" },
  { generation: "Gen 2", deployed: "2022", radius: "12 km", channels: "Text" },
  { generation: "Gen 3", deployed: "2024", radius: "40 km", channels: "Text, voice, video" },
  { generation: "Gen 4", deployed: "2026", radius: "40 km", channels: "In deployment" },
];

const METRICS = [
  { value: "2,140", label: "Relays active" },
  { value: "31", label: "Countries with coverage" },
  { value: "180 ms", label: "Median latency" },
  { value: "6.4%", label: "Of land area covered" },
];

export default function Network() {
  return (
    <div className={styles.page}>
      <Nav />

      <section className={styles.header}>
        <p className={styles.eyebrow}>Technology</p>
        <h1 className={styles.headline}>The Continuum Relay Network.</h1>
        <p className={styles.dek}>
          Relays are infrastructure, not magic. They sit on towers and rooftops, they need power, and they have a
          range. Everything Parallel does depends on being inside one.
        </p>
      </section>

      <div className={styles.banner} data-figma-asset-pending="56:1231">
        Image pending — Figma asset unreachable from this environment
      </div>

      <section className={styles.scope}>
        <div className={styles.scopeRow}>
          <div className={styles.panel}>
            <p className={styles.panelTitle}>What a relay does</p>
            <div className={styles.panelList}>
              {WHAT_IT_DOES.map((item) => (
                <div key={item} className={styles.panelItem}>
                  <span className={styles.panelMark} />
                  <p className={styles.panelItemText}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.panel}>
            <p className={styles.panelTitle}>What a relay does not do</p>
            <div className={styles.panelList}>
              {WHAT_IT_DOES_NOT.map((item) => (
                <div key={item} className={styles.panelItem}>
                  <span className={styles.panelMark} />
                  <p className={styles.panelItemText}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.generations}>
        <h2 className={styles.generationsHeading}>Relay generations</h2>
        <div className={styles.table}>
          <div className={styles.tableHeadRow}>
            <span className={styles.tableCell}>GENERATION</span>
            <span className={styles.tableCell}>FIRST DEPLOYED</span>
            <span className={styles.tableCell}>EFFECTIVE RADIUS</span>
            <span className={styles.tableCell}>CHANNELS</span>
          </div>
          {GENERATIONS.map((row) => (
            <div key={row.generation} className={styles.tableRow}>
              <span className={styles.tableCell}>{row.generation}</span>
              <span className={styles.tableCell}>{row.deployed}</span>
              <span className={styles.tableCell}>{row.radius}</span>
              <span className={styles.tableCell}>{row.channels}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.networkToday}>
        <h2 className={styles.networkTodayHeading}>Network today</h2>
        <div className={styles.metrics}>
          {METRICS.map((metric) => (
            <div key={metric.label} className={styles.metric}>
              <p className={styles.metricValue}>{metric.value}</p>
              <p className={styles.metricLabel}>{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.origins}>
        <p className={styles.originsEyebrow}>Origins</p>
        <h2 className={styles.originsHeadline}>The effect was not discovered here.</h2>
        <p className={styles.originsBody}>
          In 2016, a collaboration at CERN recorded an anomaly in a detector calibration run that had no explanation
          in the standard model. The result was published, argued over, and largely set aside. Vera Continuum was
          founded three years later by two members of that collaboration, on the premise that the anomaly was not
          noise and that it could be made to happen on purpose.
        </p>
        <p className={styles.originsQuote}>
          Global positioning was a side effect of relativity research. Parallel is a side effect of this.
        </p>
      </section>

      <Footer />
    </div>
  );
}
