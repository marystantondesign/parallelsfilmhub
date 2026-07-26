import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";

// TODO(marketing): this page is the real, in-repo marketing site (built and
// synced from Figma). If the marketing site ever moves to its own deployment
// instead, swap this whole page for a redirect:
//   import { redirect } from "next/navigation";
//   export default function MarketingPage() { redirect("https://your-marketing-url"); }
// or an iframe embed:
//   <iframe src="https://your-marketing-url" className="h-screen w-full border-0" />

export const metadata: Metadata = {
  title: "Parallel — Meet yourself.",
  description:
    "Text, call, and video with verified versions of yourself in neighboring realities. Included with every Parallel account.",
};

const DIRECTIONS = [
  { eyebrow: "SIDEWAYS", title: "Twins", body: "A version of you living right now, in a reality close enough to talk to.", color: "var(--color-brand-relay-blue)", href: "/twins" },
  { eyebrow: "ELSEWHERE", title: "Dreams", body: "The parallels where no version of you exists. You have been visiting them your whole life.", color: "var(--color-brand-violet)", href: "/dreams" },
  { eyebrow: "BACKWARDs", title: "Echoes", body: "Your own line, further back. Reached by trance rather than by relay.", color: "var(--color-brand-gold)", href: "/echoes" },
];

const SPARKLES = [
  { top: 130, left: 120, size: 22, opacity: 1 },
  { top: 300, left: 300, size: 25, opacity: 0.8 },
  { top: 77, left: 1302, size: 27, opacity: 0.9 },
  { top: 660, left: 1030, size: 27, opacity: 0.7 },
  { top: 720, left: 190, size: 27, opacity: 0.75 },
  { top: 430, left: 1290, size: 27, opacity: 0.85 },
];

const PAPERS = [
  { title: "Stabilized information transfer across adjacent reality states", id: "VCL-2019-004" },
  { title: "Hypnotic induction protocols for recollective sessions", id: "VCL-2023-017" },
  { title: "Relay array siting and regional coverage density", id: "VCL-2025-002" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <Nav />

      <section className={styles.hero}>
        <p className={styles.heroHeadline}>
          <span style={{ color: "#57534e" }}>Meet yourselves in</span>{" "}
          <span style={{ color: "#6a2a11" }}>Parallels</span>
          <span>.</span>
        </p>
        <p className={styles.heroSubhead}>
          Text, call, and video with verified versions of yourself in neighboring realities. Included with every
          Parallel account.
        </p>
        <div className={styles.ctaRow}>
          <Button
            variant="primary"
            style={{ background: "var(--color-signal-degraded)", color: "var(--color-brand-cyan)" }}
          >
            Download Parallel
          </Button>
          <Button
            variant="secondary"
            style={{ color: "var(--color-brand-cyan)", borderColor: "var(--color-brand-cyan)", borderWidth: "1.5px" }}
          >
            Check coverage
          </Button>
        </div>
        <p className={styles.heroFinePrint}>Available on iPhone, Android, and web. Requires relay coverage in your area.</p>

        {SPARKLES.map((s, i) => (
          <span
            key={i}
            className={styles.sparkle}
            style={{ top: s.top, left: s.left, fontSize: s.size, opacity: s.opacity }}
            data-figma-asset-pending="70:827"
            aria-hidden="true"
          >
            ✦
          </span>
        ))}
      </section>

      <section className={styles.names}>
        <h2 className={styles.namesHeadline}>
          <span style={{ color: "#6a2a11" }}>Parallels</span> are realities running alongside this one.
        </h2>
        <p className={styles.namesBody}>
          They&rsquo;re places you can reach without leaving your body. People have been reaching them for as long as
          we know, in sleep, in trance, after something goes badly wrong. The natural ability is rare; that&rsquo;s
          why we built Parallel as a universal instrument.
        </p>
        <div className={styles.directions}>
          {DIRECTIONS.map((d) => (
            <Link
              key={d.title}
              href={d.href}
              className={styles.direction}
              style={{ "--direction-color": d.color } as React.CSSProperties}
            >
              <p className={styles.directionEyebrow}>{d.eyebrow}</p>
              <p className={styles.directionTitle}>{d.title}</p>
              <p className={styles.directionBody}>{d.body}</p>
            </Link>
          ))}
        </div>
        <div className={styles.insideHead}>
          <h2 className={styles.insideHeadline}>One app. Three directions.</h2>
          <p className={styles.insideBody}>
            You download one application. Twins, Dreams, and Echoes are included with every Parallel account and run
            on the same Continuum Network.
          </p>
        </div>
      </section>

      <div className={styles.banner} data-figma-asset-pending="56:932">
        Image pending — Figma asset unreachable from this environment
      </div>

      <section className={styles.coverage}>
        <div className={styles.coverageRow}>
          <div className={styles.coverageMap}>
            <div className={styles.diagramPlaceholder} data-figma-asset-pending="39:49">
              Diagram / Relay array — pending asset
            </div>
          </div>
          <div className={styles.coverageCopy}>
            <h2 className={styles.coverageHeadline}>Coverage where you live.</h2>
            <p className={styles.coverageBody}>
              Parallel requires a Continuum Relay Array within range. Coverage is strongest in metropolitan areas and
              expands quarterly.
            </p>
            <div className={styles.addressField}>
              <span className={styles.addressPlaceholder}>Enter your address</span>
              <button className={styles.checkButton}>Check</button>
            </div>
            <p className={styles.coverageMeta}>2,140 relays active. Last updated 14 July 2026.</p>
          </div>
        </div>
      </section>

      <section className={styles.research}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>RESEARCH</p>
          <h2 className={styles.sectionHeadline}>Published work.</h2>
        </div>
        <div className={styles.paperList}>
          {PAPERS.map((paper) => (
            <div key={paper.id} className={styles.paper}>
              <p className={styles.paperTitle}>{paper.title}</p>
              <p className={styles.paperId}>{paper.id}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
