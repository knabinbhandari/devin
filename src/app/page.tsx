import { getContentItems } from "@/lib/db";
import ContentList from "./ContentList";

export const dynamic = "force-dynamic";

export default function Home() {
  const items = getContentItems();
  const needsReview = items.filter((i) => i.status === "Needs Review").length;

  return (
    <main className="page">
      <header className="header">
        <h1>Content Pipeline</h1>
        <p className="subtitle">
          {items.length} ideas &middot; {needsReview} awaiting review
        </p>
      </header>
      <ContentList items={items} />
    </main>
  );
}
