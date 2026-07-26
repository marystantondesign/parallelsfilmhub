import Link from "next/link";
import styles from "./Footer.module.css";

const COLUMNS: { heading: string; links: string[] }[] = [
  { heading: "INSIDE PARALLEL", links: ["Twins", "Dreams", "Echoes"] },
  { heading: "CONTINUUM NETWORK", links: ["Relay network", "Relay hardware", "Patents"] },
  { heading: "LABS", links: ["Current betas", "Research partners", "CERN collaboration", "Publications"] },
  { heading: "COMPANY", links: ["Vera Continuum", "Leadership", "Careers", "Newsroom"] },
  { heading: "SUPPORT", links: ["Help center", "Session safety", "Accessibility"] },
];

// Only labels with a built page get a real href; everything else stays a placeholder until that page exists.
const HREF_BY_LABEL: Record<string, string> = {
  Twins: "/twins",
  Dreams: "/dreams",
  Echoes: "/echoes",
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        {COLUMNS.map((column) => (
          <div key={column.heading} className={styles.column}>
            <p className={styles.columnHeading}>{column.heading}</p>
            {column.links.map((label) => (
              <Link key={label} href={HREF_BY_LABEL[label] || "#"} className={styles.columnLink}>
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.legal}>
        <p>Parallel is a Vera Continuum Laboratories product</p>
        <p>Parallel is not a substitute for professional mental health care.</p>
      </div>
    </footer>
  );
}
