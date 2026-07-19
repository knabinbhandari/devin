"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [pendingId, setPendingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleApprove(id: number) {
    setPendingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/items/${id}/approve`, { method: "POST" });
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      router.refresh();
    } catch {
      setError("Failed to approve item. Please try again.");
    } finally {
      setPendingId(null);
    }
  }

  if (items.length === 0) {
    return <p className="empty">No content items yet.</p>;
  }

  return (
    <>
      {error && <p className="error">{error}</p>}
      <ul className="list">
        {items.map((item) => {
          const needsReview = item.status === "Needs Review";
          const isPending = pendingId === item.id;
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
                    onClick={() => handleApprove(item.id)}
                    disabled={isPending}
                  >
                    {isPending ? "Approving…" : "Approve"}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
