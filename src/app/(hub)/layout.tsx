import "@/styles/hub.css";

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return <div className="hub-scope min-h-screen bg-hub-canvas text-hub-ink font-sans">{children}</div>;
}
