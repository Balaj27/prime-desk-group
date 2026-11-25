import { NextResponse } from "next/server";
import { CONTACT_NAME_MAX_LENGTH, EMAIL_PATTERN, getContactError } from "@/lib/contact";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xyewonwk";
const MAX_LENGTHS = { email: 200, phone: 40, company: 160, message: 4000, goal: 4000 };

const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const data: unknown = await request.json();
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("Invalid request body");
    body = data as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field: report success and send nothing.
  if (text(body.website, 200)) return NextResponse.json({ ok: true });

  const name = text(body.name, CONTACT_NAME_MAX_LENGTH);
  const email = text(body.email, MAX_LENGTHS.email);
  const phone = text(body.phone, MAX_LENGTHS.phone);
  const company = text(body.company, MAX_LENGTHS.company);
  const message = text(body.message, MAX_LENGTHS.message);
  const goal = text(body.goal, MAX_LENGTHS.goal);
  const needs = Array.isArray(body.needs) ? body.needs.map((need) => text(need, 80)).filter(Boolean).slice(0, 10) : [];

  if ("goal" in body) {
    if (!needs.length || !goal) {
      return NextResponse.json({ error: "Choose what you need help with and enter a goal." }, { status: 400 });
    }
    if (!name) return NextResponse.json({ error: "Enter your name." }, { status: 400 });
    const contactError = getContactError(email, phone);
    if (contactError) return NextResponse.json({ error: contactError }, { status: 400 });
  } else if (!name || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Name and a valid email are required." }, { status: 400 });
  }

  const submission = new FormData();
  const fields = { name, email, phone, company, needs: needs.join(", "), goal, message };
  for (const [field, value] of Object.entries(fields)) {
    if (value) submission.set(field, value);
  }
  submission.set("subject", "PrimeDesk website enquiry from " + name.replace(/[\r\n]+/g, " "));

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: submission,
      signal: AbortSignal.timeout(10000),
    });
    const result = await response.json().catch(() => null);
    if (response.ok && result?.ok === true) return NextResponse.json({ ok: true });
    console.error("Formspree did not accept the contact submission.", response.status);
  } catch (error) {
    console.error("Could not reach Formspree.", error instanceof Error ? error.name : "Unknown error");
  }

  return NextResponse.json({ error: "The message could not be sent." }, { status: 502 });
}
