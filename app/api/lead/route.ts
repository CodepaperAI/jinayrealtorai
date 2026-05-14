import { NextResponse } from "next/server";
import { pushLeadToGHL, type LeadInput } from "@/lib/ghl";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Partial<LeadInput>;
  try {
    body = (await request.json()) as Partial<LeadInput>;
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const fullName = (body.fullName || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim() || undefined;
  const message = (body.message || "").trim() || undefined;
  const projectSlug = (body.projectSlug || "").trim();
  const projectName = (body.projectName || "").trim() || undefined;

  if (!fullName || fullName.length > 200) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }
  if (!projectSlug || projectSlug.length > 100) {
    return NextResponse.json({ error: "Missing project context" }, { status: 400 });
  }

  const result = await pushLeadToGHL({
    fullName, email, phone, message, projectSlug, projectName,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }
  return NextResponse.json({ ok: true, contactId: result.contactId });
}
