import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs"; // important: email libs need Node runtime on Vercel

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const subject = String(body?.subject ?? "").trim();
    const message = String(body?.message ?? "").trim();

    // Optional honeypot field (spam bots fill it)
    const company = String(body?.company ?? "").trim();
    if (company) return NextResponse.json({ ok: true }, { status: 200 });

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL; // where you want to receive messages
    const fromEmail = process.env.CONTACT_FROM_EMAIL; // must be a verified sender/domain in Resend

    if (!toEmail || !fromEmail) {
      return NextResponse.json(
        { error: "Server misconfigured (missing env vars)." },
        { status: 500 }
      );
    }

    const finalSubject = subject ? `Contact: ${subject}` : "New contact form message";

    await resend.emails.send({
      from: fromEmail,                // e.g. "Website Contact <contact@yourdomain.com>"
      to: [toEmail],                  // your inbox
      replyTo: email,                 // so you can hit reply
      subject: finalSubject,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        subject ? `Subject: ${subject}` : null,
        "",
        message,
      ].filter(Boolean).join("\n"),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
