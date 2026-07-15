import { NextResponse } from "next/server";
import { approveContentItem } from "@/lib/db";

// Placeholder endpoint kept for future wiring. The Approve button in the UI
// does NOT call this yet — see the TODO in src/app/ContentList.tsx.
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const item = approveContentItem(numericId);
  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}
