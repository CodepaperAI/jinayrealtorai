import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { timingSafeEqual } from "crypto";

type Body = { paths?: string[]; secret?: string; slug?: string };

function secretMatches(provided: string, expected: string): boolean {
  if (!provided || !expected) return false;
  const a = Buffer.from(provided, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

const ALLOWED_PREFIXES = ["/", "/projects", "/projects/"];

function isAllowed(p: string): boolean {
  if (p === "/" || p === "/projects") return true;
  return p.startsWith("/projects/");
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const expected = process.env.REVALIDATE_SECRET ?? "";
  if (!expected) {
    return NextResponse.json({ error: "REVALIDATE_SECRET not configured" }, { status: 500 });
  }
  if (!secretMatches(body.secret ?? "", expected)) {
    return NextResponse.json({ error: "invalid secret" }, { status: 401 });
  }

  const paths = (body.paths ?? []).filter(isAllowed);
  for (const p of paths) {
    revalidatePath(p);
  }

  return NextResponse.json({ revalidated: paths, allowedPrefixes: ALLOWED_PREFIXES });
}

export async function GET() {
  return NextResponse.json({ ok: true, hint: "POST { paths, secret } to revalidate" });
}
