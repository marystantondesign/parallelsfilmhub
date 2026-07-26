import Link from "next/link";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";

const SAFETY_ROW = [
  { label: "· TWINS", body: "Sessions end automatically after 40 minutes. Consecutive sessions require a rest interval.", highlight: false, href: "/twins" },
  { label: "· Dreams", body: "Every match is confirmed against your own biometric signature before a channel opens.", highlight: false, href: "/dreams" },
  { label: "· Echoes", body: "Licensed counselors are available in-app for anyone who wants to stop.", highlight: true, href: "/echoes" },
];

const FEATURES = [
  {
    title: "Screening comes first",
    body: "Echoes is in beta and open to select users. Every applicant completes a mental health screening and a consent review with a clinician. Roughly one in four is declined, and we tell you why.",
    diagram: "Diagram / Orbital paths — pending asset",
    diagramId: "39:51",
    visualFirst: true,
  },
  {
    title: "Someone is watching the session",
    body: "A trained facilitator monitors each session in real time and can end it. You are alone in the room, but you are not alone in the session.",
    diagram: "Diagram / Field lines — pending asset",
    diagramId: "39:20",
    visualFirst: false,
  },
  {
    title: "We do not verify what you find",
    body: "We make no claim that what you see is historically accurate, or that it belongs to you. Sessions are saved to your Echoes Log with an optional Jungian reading, for your reference only.",
    diagram: "Diagram / Wave interference — pending asset",
    diagramId: "39:64",
    visualFirst: true,
  },
];

const SPECS = [
  { label: "Session length", value: "Up to 40 minutes" },
  { label: "Method", value: "Camera flash, tonal frequencies, prompts" },
  { label: "Availability", value: "Beta, select users" },
  { label: "Minimum age", value: "21" },
  { label: "Screening", value: "Required" },
  { label: "Interpretation", value: "Jungian, optional" },
  { label: "Recordings", value: "Local, encrypted, user controlled" },
];

const REQUIREMENTS = [
  { number: "01", title: "A quiet, private space" },
  { number: "02", title: "Lights off or dimmed" },
  { number: "03", title: "Lying down comfortably" },
  { number: "04", title: "Phone camera facing you" },
];

export default function Echoes() {
  return (
    <div className={styles.page}>
      <Nav />

      <section className={styles.hero}>
        <div className={styles.safetyRow}>
          {SAFETY_ROW.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className={`${styles.safetyCard} ${card.highlight ? styles.safetyCardHighlight : ""}`}
            >
              <p className={styles.safetyCardLabel}>{card.label}</p>
              <p className={styles.safetyCardBody}>{card.body}</p>
            </Link>
          ))}
        </div>
        <div className={styles.heroRow}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>PARALLEL · ECHOES</p>
            <span className={styles.betaBadge}>PUBLIC BETA</span>
            <h1 className={styles.heroHeadline}>Your own line, further back.</h1>
            <p className={styles.heroBody}>
              A guided trance using camera flash and tonal frequencies. Twins run beside you. Echoes run behind you.
              Nothing is generated and nothing is verified.
            </p>
            <div className={styles.ctas}>
              <Button variant="primary" style={{ background: "var(--color-brand-cyan)", color: "var(--color-text-primary)" }}>
                Apply for beta
              </Button>
            </div>
          </div>
          <div className={styles.device}>
            <div className={styles.deviceStatusBar}>
              <span>10:02</span>
              <span>COMPLETE</span>
            </div>
            <div className={styles.summaryHeader}>
              <p className={styles.summaryTitle}>Session 14</p>
              <p className={styles.summaryMeta}>PLE-0014 · 38 MIN · FACILITATOR R.O.</p>
            </div>
            <div className={styles.recollection}>
              <p className={styles.recollectionText}>
                a port town. cold. I was counting something into a ledger and my hands were not my hands
              </p>
              <p className={styles.recollectionText}>I knew the year. when I woke I did not.</p>
              <div className={styles.facilitatorNote}>
                <p className={styles.facilitatorLabel}>FACILITATOR NOTE</p>
                <p className={styles.facilitatorBody}>Session ended on schedule. No intervention required.</p>
              </div>
              <div className={styles.deviceActions}>
                <span className={styles.deviceActionPrimary}>Save to journal</span>
                <span className={styles.deviceActionSecondary}>Flag for review</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        {FEATURES.map((feature) => (
          <div key={feature.title} className={styles.featureRow}>
            {feature.visualFirst ? (
              <>
                <div className={styles.featureVisual} data-figma-asset-pending={feature.diagramId}>
                  {feature.diagram}
                </div>
                <div className={styles.featureCopy}>
                  <p className={styles.featureTitle}>{feature.title}</p>
                  <p className={styles.featureBody}>{feature.body}</p>
                </div>
              </>
            ) : (
              <>
                <div className={styles.featureCopy}>
                  <p className={styles.featureTitle}>{feature.title}</p>
                  <p className={styles.featureBody}>{feature.body}</p>
                </div>
                <div className={styles.featureVisual} data-figma-asset-pending={feature.diagramId}>
                  {feature.diagram}
                </div>
              </>
            )}
          </div>
        ))}
      </section>

      <section className={styles.specs}>
        <h2 className={styles.specsHeading}>Specifications</h2>
        <div className={styles.specTable}>
          {SPECS.map((spec) => (
            <div key={spec.label} className={styles.specRow}>
              <span className={styles.specLabel}>{spec.label}</span>
              <span className={styles.specValue}>{spec.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.preparation}>
        <p className={styles.preparationEyebrow}>PREPARATION</p>
        <h2 className={styles.preparationHeadline}>Before a session.</h2>
        <p className={styles.preparationBody}>
          Settle into a comfortable position. Allow the room to remain dark and quiet. The camera flash and tones
          will guide you into a meditative state.
        </p>
        <div className={styles.requirementsGrid}>
          {REQUIREMENTS.map((req) => (
            <div key={req.number} className={styles.requirementCard}>
              <p className={styles.requirementNumber}>{req.number}</p>
              <p className={styles.requirementTitle}>{req.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.safety}>
        <div className={styles.safetyNotice}>
          <p className={styles.safetyNoticeLabel}>SAFETY</p>
          <p className={styles.safetyNoticeBody}>
            Parallel is not therapy and is not a substitute for it. A small number of participants report distress in
            the days after a session. If that happens, stop, and contact the clinical line in the app. We will not
            ask you to continue.
          </p>
        </div>
        <div className={styles.warning}>
          <p className={styles.warningLabel}>PHOTOSENSITIVITY</p>
          <p className={styles.warningBody}>
            This experience uses camera flash and tonal frequencies. Do not use Echoes if you have photosensitivity
            or are prone to seizures.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
