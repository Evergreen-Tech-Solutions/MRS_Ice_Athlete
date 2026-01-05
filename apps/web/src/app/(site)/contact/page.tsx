"use client";

import React, { useState } from "react";
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

export function GlassSection({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden rounded-lg bg-stone-950 shadow-md shadow-amber-300 backdrop-blur ${className}`}
    >
      {/* We’ll wrap children with a padded div inside the section */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8">{children}</div>
    </section>
  );
}

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }


  const SOCIALS = [
    {
      label: "Email",
      href: "mailto:ISFAHANICECLIMBING@GMAIL.COM",
      icon: <FaEnvelope className="h-8 w-8" />,
    },
    {
      label: "WhatsApp",
      href: "https://api.whatsapp.com/send/?phone=989301031003&text&type=phone_number&app_absent=0",
      icon: <FaWhatsapp className="h-8 w-8" />,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mohammad-reza-safdarian-87b37b1b8/",
      icon: <FaLinkedin className="h-8 w-8" />,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/safdarian_mohammadreza",
      icon: <FaInstagram className="h-8 w-8" />,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/safdarian.mohammadreza",
      icon: <FaFacebook className="h-8 w-8" />,
    },
    {
      label: "X (Twitter)",
      href: "https://twitter.com/SafdarianM",
      icon: <FaXTwitter className="h-8 w-8" />,
    },
  ];

  return (
    <main className="relative min-h-screen">
      {/* Background image */}
      {/* <div className="fixed inset-0 -z-10">
              <Image
                src="/images/pic.jpg"
                alt=""
                fill
                priority
                className="object-cover"
              />
            </div> */}
      <div className="fixed inset-0 -z-10 bg-stone-950" />

      <div className="mx-auto max-w-4xl px-4 py-10 md:py-16 text-stone-100">
        <GlassSection id="contact" className="space-y-8">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 rounded-full bg-amber-500" />
            <h1 className="font-heading text-3xl md:text-4xl tracking-tight">Get in Touch</h1>
          </div>

          {/* Description */}
          <p className=" max-w-2xl mt-3 mb-3">
            For collaborations, class inquiries, or media opportunities, reach out using the form below or connect directly through social platforms.
          </p>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="grid gap-5">
            {/* Honeypot field (hidden from users, bots will fill it) */}
            <div className="hidden">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="off"
                tabIndex={-1}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-stone-100 mb-1">
                  Name
                </label>
                <input
                  required
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-2 text-white placeholder-white/40 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-stone-100 mb-1">
                  Email
                </label>
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-2 text-white placeholder-white/40 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-stone-100 mb-1">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="What's this about?"
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-2 text-white placeholder-white/40 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-stone-100 mb-1">
                Message
              </label>
              <textarea
                required
                id="message"
                name="message"
                rows={5}
                placeholder="Write your message..."
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-2 text-white placeholder-white/40 focus:border-amber-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 inline-flex items-center justify-center rounded-xl border border-white/50 bg-amber-300/80 
                         px-6 py-2.5 font-heading text-stone-100 hover:bg-emerald-300/50 transition disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send Message"}
            </button>

            {status === "sent" && (
              <p className="text-emerald-300 text-sm">
                Message sent — I'll get back to you soon.
              </p>
            )}

            {status === "error" && (
              <p className="text-red-400 text-sm">There was a problem sending your message. Try again later.</p>
            )}
          </form>

          {/* Social buttons */}
          <div className="mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center h-16 rounded-xl border border-white/10 bg-black/40 
                            text-white/80 hover:text-amber-300 hover:border-amber-500 hover:bg-amber-500/10 
                            transition-all duration-300 shadow-md hover:shadow-amber-500/20"
                  aria-label={s.label}
                  title={s.label}
                >
                  <span className="text-3xl">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </GlassSection>
      </div>
    </main>
  );
}
