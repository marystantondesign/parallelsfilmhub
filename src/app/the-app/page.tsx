import Link from "next/link";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import AppScreenMockup from "@/components/AppScreenMockup/AppScreenMockup";
import styles from "./page.module.css";

const SECTIONS = [
  {
    title: "Twins",
    body: "A version of you living right now, in a reality close enough to hold a conversation. Classified identical or fraternal by how far the two realities have drifted.",
    linkColor: "var(--color-brand-relay-blue)",
    diagram: "Diagram / Relay array — pending asset",
    diagramId: "39:49",
    beta: false,
    href: "/twins",
  },
  {
    title: "Dreams",
    body: "The parallels where no version of you exists. You have been visiting them your whole life. Record where you went, then return to it.",
    linkColor: "var(--color-brand-violet)",
    diagram: "Diagram / Field lines — pending asset",
    diagramId: "39:33",
    beta: false,
    href: "/dreams",
  },
  {
    title: "Echoes",
    body: "Your own line, further back. Reached by trance rather than by relay. Nothing is generated and nothing is verified.",
    linkColor: "var(--color-brand-gold)",
    diagram: "Diagram / Orbital paths — pending asset",
    diagramId: "39:62",
    beta: true,
    href: "/echoes",
  },
];

const COMPARE_ROWS = [
  { section: "Twins", reaches: "Another you, now", method: "Continuum Network", availability: "General release" },
  { section: "Dreams", reaches: "Realms with no you", method: "Induction", availability: "General release" },
  { section: "Echoes", reaches: "Your line, further back", method: "Induction", availability: "Beta" },
];

export default function TheApp() {
  return (
    <div className={styles.page}>
      <Nav />

      <section className={styles.header}>
        <div className={styles.lede}>
          <p>Each parallel is a reality running alongside this one, a place you can reach without your body.</p>
          <p>People have been reaching them for as long as there have been people, in sleep, in trance, after something goes badly wrong.</p>
          <p>The ability comes more easily to some than others, but all are capable. What was missing was the instrument.</p>
          <p className={styles.ledeEmphasis}>Parallel is the instrument.</p>
        </div>
        <h1 className={styles.subhead}>Three directions.</h1>
        <p className={styles.dek}>
          Twins reach sideways, Dreams reach elsewhere, Echoes reach backward. All three are included with every
          Parallel account.
        </p>
      </section>

      <section className={styles.sections}>
        <div className={styles.sectionsRow}>
          {SECTIONS.map((section) => (
            <Link key={section.title} href={section.href} className={styles.sectionCard}>
              <div className={styles.sectionVisual} data-figma-asset-pending={section.diagramId}>
                {section.diagram}
              </div>
              <div className={styles.sectionContent}>
                <div className={styles.sectionTitleRow}>
                  <p className={styles.sectionTitle}>{section.title}</p>
                  {section.beta && <span className={styles.betaBadge}>BETA</span>}
                </div>
                <p className={styles.sectionBody}>{section.body}</p>
                <p className={styles.sectionLink} style={{ color: section.linkColor }}>
                  Learn more
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.mockupWrap}>
          <AppScreenMockup />
        </div>
      </section>

      <section className={styles.compare}>
        <h2 className={styles.compareHeading}>Compare</h2>
        <div className={styles.table}>
          <div className={styles.tableHeadRow}>
            <span className={styles.tableCell}>SECTION</span>
            <span className={styles.tableCell}>REACHES</span>
            <span className={styles.tableCell}>METHOD</span>
            <span className={styles.tableCell}>AVAILABILITY</span>
          </div>
          {COMPARE_ROWS.map((row) => (
            <div key={row.section} className={styles.tableRow}>
              <span className={styles.tableCell}>{row.section}</span>
              <span className={styles.tableCell}>{row.reaches}</span>
              <span className={styles.tableCell}>{row.method}</span>
              <span className={styles.tableCell}>{row.availability}</span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
