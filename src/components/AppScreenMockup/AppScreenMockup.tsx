import styles from "./AppScreenMockup.module.css";

const STAT_CARDS: {
  title: string;
  stats: [string, string][];
  highlight?: { label: string; value: string };
}[] = [
  {
    title: "Dreams",
    stats: [
      ["Recorded", "6"],
      ["This month", "0"],
      ["Revisit sessions", "1"],
      ["Dreams revisited", "1"],
      ["Common symbol", "Water"],
      ["Common location", "Libraries"],
    ],
    highlight: { label: "Most revisited dream", value: "The Blue River" },
  },
  {
    title: "Twins",
    stats: [
      ["Twin matches", "2"],
      ["Active conversations", "5"],
      ["Messages exchanged", "184"],
      ["Voice calls", "0"],
      ["Video calls", "0"],
      ["New this month", "2"],
    ],
  },
  {
    title: "Echoes",
    stats: [
      ["Sessions", "2"],
      ["This month", "2"],
      ["Earliest period", "900s"],
      ["Avg duration", "20 min"],
      ["Recurring location", "Coastal village"],
      ["Recurring occupation", "Fisher"],
    ],
  },
];

const INSIGHTS = [
  "Water appears in 6 dreams.",
  "Libraries appear in 11 Echoes sessions.",
  "Wonder is your most common emotion.",
  "“Mirror City” has been revisited 5 times.",
  "Coastal villages appear in multiple Echoes sessions.",
];

const NAV_ITEMS = [
  { label: "Home", active: true },
  { label: "Dreams", active: false },
  { label: "Twins", active: false },
  { label: "Echoes", active: false },
  { label: "Account", active: false },
];

export default function AppScreenMockup() {
  return (
    <div className={styles.frame}>
      <div className={styles.header}>
        <div className={styles.headerIcon} data-figma-asset-pending="88:710" />
        <p className={styles.wordmark}>Parallel</p>
        <div className={styles.headerIcon} data-figma-asset-pending="88:714" />
      </div>

      <div className={styles.body}>
        <div className={styles.greetingRow}>
          <div>
            <p className={styles.greetingLine}>Good evening,</p>
            <p className={styles.greetingName}>Mereh</p>
            <p className={styles.greetingSub}>Here&apos;s your continuity overview.</p>
          </div>
          <div className={styles.dateBlock}>
            <p>Fri, Jul 24</p>
            <p>7:37 PM</p>
          </div>
        </div>

        {STAT_CARDS.map((card) => (
          <div key={card.title} className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>{card.title}</p>
              <p className={styles.cardLink}>View all</p>
            </div>
            <div className={styles.statsGrid}>
              {card.stats.map(([label, value]) => (
                <div key={label} className={styles.statItem}>
                  <p className={styles.statLabel}>{label}</p>
                  <p className={styles.statValue}>{value}</p>
                </div>
              ))}
            </div>
            {card.highlight && (
              <div className={styles.highlight}>
                <p className={styles.statLabel}>{card.highlight.label}</p>
                <p className={styles.statValue}>{card.highlight.value}</p>
              </div>
            )}
          </div>
        ))}

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.cardTitle}>Insights</p>
            <p className={styles.cardLink}>View all</p>
          </div>
          <div className={styles.insightList}>
            {INSIGHTS.map((insight) => (
              <div key={insight} className={styles.insightRow}>
                <span className={styles.insightDot} />
                <p className={styles.insightText}>{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <div key={item.label} className={styles.navItem}>
            <div className={styles.navIcon} data-figma-asset-pending="88:887" />
            <p className={item.active ? styles.navLabelActive : styles.navLabel}>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
