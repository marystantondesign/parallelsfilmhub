import Link from "next/link";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";

const SAFETY_ROW = [
  { label: "· TWINS", body: "Sessions end automatically after 40 minutes. Consecutive sessions require a rest interval.", highlight: false, href: "/twins" },
  { label: "· Dreams", body: "Every match is confirmed against your own biometric signature before a channel opens.", highlight: true, href: "/dreams" },
  { label: "· Echoes", body: "Licensed counselors are available in-app for anyone who wants to stop.", highlight: false, href: "/echoes" },
];

const FEATURES = [
  {
    title: "Built for the first five minutes",
    body: "Open to a blank entry with the timestamp already set. No prompts, no categories, nothing to answer before you can start writing.",
    diagram: "Diagram / Field lines — pending asset",
    diagramId: "39:33",
    visualFirst: true,
  },
  {
    title: "Voice when typing is too slow",
    body: "Speak the entry and it transcribes on device. The audio is discarded once you confirm the text. Nothing is uploaded.",
    diagram: "Diagram / Wave interference — pending asset",
    diagramId: "39:82",
    visualFirst: false,
  },
  {
    title: "Read back, if you want it",
    body: "Every entry can be run through a Jungian reading. It is an interpretation, not a verification, and it can be turned off permanently in settings.",
    diagram: "Diagram / Orbital paths — pending asset",
    diagramId: "39:62",
    visualFirst: true,
  },
];

const SPECS = [
  { label: "Entry types", value: "Text, voice" },
  { label: "Transcription", value: "On device" },
  { label: "Interpretation", value: "Jungian, optional" },
  { label: "Revisit session length", value: "Up to 25 minutes" },
  { label: "Relay coverage required", value: "No" },
  { label: "Export", value: "Plain text, JSON" },
];

const IS_LIST = [
  "A return to somewhere you already went",
  "Built from an entry you wrote yourself",
  "Guided by tone, slow light, and your own voice",
  "Ends on one tap and at 25 minutes",
];

const IS_NOT_LIST = [
  "Control over the dream while you are in it",
  "A dream the app generated for you",
  "A technique for inducing dreams at will",
  "Something to do while driving or in company",
];

const REQUIREMENTS = [
  { number: "01", title: "A quiet, private space" },
  { number: "02", title: "Lights off or dimmed" },
  { number: "03", title: "Lying down comfortably" },
  { number: "04", title: "Phone camera facing you" },
];

export default function Dreams() {
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
            <p className={styles.eyebrow}>PARALLEL · DREAMS</p>
            <h1 className={styles.heroHeadline}>Where do we go?</h1>
            <p className={styles.heroBody}>
              Most of a dream is gone within five minutes of waking. Dreams is built for those five minutes, and it
              keeps what you wrote so you can go back to it later.
            </p>
            <div className={styles.ctas}>
              <Button
                variant="secondary"
                style={{ color: "var(--color-brand-cyan)", borderColor: "var(--color-brand-cyan)", borderWidth: "1.5px" }}
              >
                See how it works
              </Button>
            </div>
          </div>
          <div className={styles.device}>
            <div className={styles.deviceStatusBar}>
              <span>3:12</span>
              <span>SAVED</span>
            </div>
            <div className={styles.entryHeader}>
              <p className={styles.entryDay}>Tuesday</p>
              <p className={styles.entryMeta}>14 JULY · 3:12 AM</p>
            </div>
            <div className={styles.entry}>
              <p className={styles.entryText}>
                the house again but the back rooms were flooded and nobody seemed to think it was worth mentioning
              </p>
              <p className={styles.entryText}>{`someone was on the stairs. I knew her. couldn't get the name`}</p>
              <div className={styles.tags}>
                <span className={styles.tag}>recurring</span>
                <span className={styles.tag}>water</span>
                <span className={styles.tag}>the house</span>
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

      <section className={styles.revisit}>
        <p className={styles.revisitEyebrow}>REVISIT</p>
        <h2 className={styles.revisitHeadline}>Not lucid dreaming.</h2>
        <p className={styles.revisitBody}>
          You are not steering. You are returning. Choose an entry and Parallel builds an induction from your own
          words, read back in your own recording if you made one. Tone and slow light do the rest.
        </p>
        <div className={styles.comparison}>
          <div className={styles.panel} style={{ "--panel-color": "var(--color-brand-relay-blue)" } as React.CSSProperties}>
            <p className={styles.panelTitle}>What this is</p>
            <div className={styles.panelList}>
              {IS_LIST.map((item) => (
                <div key={item} className={styles.panelItem}>
                  <span className={styles.panelMark} />
                  <p className={styles.panelItemText}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.panel} style={{ "--panel-color": "var(--color-signal-down)" } as React.CSSProperties}>
            <p className={styles.panelTitle}>What this is not</p>
            <div className={styles.panelList}>
              {IS_NOT_LIST.map((item) => (
                <div key={item} className={styles.panelItem}>
                  <span className={styles.panelMark} />
                  <p className={styles.panelItemText}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className={styles.revisitFinePrint}>
          Requires headphones. Do not use if you have a history of photosensitive seizures.
        </p>
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
