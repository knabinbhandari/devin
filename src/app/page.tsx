import { listContentItems } from "@/lib/db";
import ContentList from "./ContentList";

export const dynamic = "force-dynamic";

export default function Home() {
  const items = listContentItems();
  const pending = items.filter((item) => item.status === "Needs Review").length;

  return (
    <main className="page">
      <header className="header">
        <h1>Content Pipeline</h1>
        <p className="subtitle">
          {items.length} video ideas &middot; {pending} awaiting review
        </p>
      </header>
      <ContentList items={items} />
    </main>
  );
}
