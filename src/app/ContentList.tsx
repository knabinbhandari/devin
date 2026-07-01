"use client";

import type { ContentItem } from "@/lib/db";

function formatDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ContentList({ items }: { items: ContentItem[] }) {
  function handleApprove() {
    // TODO: wire up approval. For now this is intentionally a no-op placeholder.
    // It should not make an API call or mutate state yet.
  }

  if (items.length === 0) {
    return <p className="empty">No content items yet.</p>;
  }

  return (
    <ul className="list">
      {items.map((item) => {
        const needsReview = item.status === "Needs Review";
        return (
          <li key={item.id} className="card">
            <div className="card-main">
              <h2 className="card-title">{item.title}</h2>
              <span className="card-date">{formatDate(item.date)}</span>
            </div>
            <div className="card-actions">
              <span
                className={`badge ${needsReview ? "badge-review" : "badge-approved"}`}
              >
                {item.status}
              </span>
              {needsReview && (
                <button
                  type="button"
                  className="approve-btn"
                  onClick={() => handleApprove()}
                >
                  Approve
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
