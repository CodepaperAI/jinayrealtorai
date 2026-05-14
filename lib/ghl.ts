type GHLContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  name?: string;
  source?: string;
  tags?: string[];
  customFields?: Array<{ id?: string; key?: string; field_value?: string; value?: string }>;
  locationId: string;
};

export type LeadInput = {
  fullName: string;
  email: string;
  phone?: string;
  message?: string;
  projectSlug: string;
  projectName?: string;
};

export type LeadResult = {
  ok: true;
  contactId: string | null;
} | {
  ok: false;
  error: string;
};

function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/**
 * Push a website lead into GHL Contacts.
 *
 * The Contacts v2 endpoint is `POST https://services.leadconnectorhq.com/contacts/`
 * with header `Version: 2021-07-28` and `Authorization: Bearer <PIT token>`. We
 * tag with `project-<slug>` so existing GHL workflows route the lead based on
 * which project page the form was submitted from.
 */
export async function pushLeadToGHL(input: LeadInput): Promise<LeadResult> {
  const token = process.env.GHL_LOCATION_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  const tagPrefix = process.env.GHL_LEAD_TAG_PREFIX || "project-";

  if (!token || !locationId) {
    return { ok: false, error: "GHL credentials not configured on the server" };
  }

  const { firstName, lastName } = splitName(input.fullName);
  const payload: GHLContactPayload = {
    locationId,
    firstName,
    lastName,
    email: input.email,
    phone: input.phone,
    source: "website",
    tags: [`${tagPrefix}${input.projectSlug}`, "website-lead"],
  };

  if (input.message) {
    payload.customFields = [{ key: "message", field_value: input.message }];
  }

  const res = await fetch("https://services.leadconnectorhq.com/contacts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return { ok: false, error: `GHL ${res.status}: ${text.slice(0, 200)}` };
  }

  const body = (await res.json().catch(() => ({}))) as { contact?: { id?: string } };
  return { ok: true, contactId: body.contact?.id ?? null };
}
