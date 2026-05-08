"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, ReactNode } from "react";
import IceAxePng from "./IceAxe";
import Avatar from "./Avatar";

import {
  FaBookOpen,
  FaRightToBracket,
  FaMobile,
  FaGaugeHigh,
  FaEnvelope,
  FaWhatsapp,
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
  // FaTrophy,
  FaBullseye,
  FaB,
} from "react-icons/fa6";

type Item = {
  label: string;
  href: string;
  match?: "exact" | "startsWith";
  icon: ReactNode;
};

type Social = {
  label: string;
  href: string;
  icon: ReactNode;
};

type Me = {
  full_name?: string | null;
  email?: string | null;
  image?: string | null;
} | null;

const NAV_ITEMS: Item[] = [
  {
    label: "My Story",
    href: "/",
    match: "exact",
    icon: (
      <FaBookOpen
        className="h-6 w-6 shrink-0 transition-transform group-hover:scale-110"
        aria-hidden="true"
      />
    ),
  },
  // {
  //   label: "UIAA 2026",
  //   href: "/worldcup",
  //   match: "startsWith",
  //   icon: (
  //     <FaTrophy className="h-6 w-6 shrink-0 transition-transform group-hover:scale-110" />
  //   ),
  // },
  {
    label: "Classes",
    href: "/classes",
    match: "startsWith",
    icon: (
      <IceAxePng className="h-6 w-6 -rotate-12 shrink-0 transition-transform group-hover:scale-110" />
    ),
  },
  {
    label: "Experiences",
    href: "/experiences",
    match: "startsWith",
    icon: (
      <FaBullseye
        className="h-6 w-6 shrink-0 transition-transform group-hover:scale-110"
        aria-hidden="true"
      />
    ),
  },
  {
    label: "Contact",
    href: "/contact",
    match: "exact",
    icon: (
      <FaMobile
        className="h-6 w-6 shrink-0 transition-transform group-hover:scale-110"
        aria-hidden="true"
      />
    ),
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    match: "startsWith",
    icon: (
      <FaGaugeHigh
        className="h-6 w-6 shrink-0 transition-transform group-hover:scale-110"
        aria-hidden="true"
      />
    ),
  },
];

const SOCIALS: Social[] = [
  {
    label: "Email",
    href: "mailto:ISFAHANICECLIMBING@GMAIL.COM",
    icon: <FaEnvelope className="h-5 w-5" />,
  },
  {
    label: "WhatsApp",
    href: "https://api.whatsapp.com/send/?phone=989301031003&text&type=phone_number&app_absent=0",
    icon: <FaWhatsapp className="h-5 w-5" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammad-reza-safdarian-87b37b1b8/",
    icon: <FaLinkedin className="h-5 w-5" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/safdarian_mohammadreza",
    icon: <FaInstagram className="h-5 w-5" />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/safdarian.mohammadreza",
    icon: <FaFacebook className="h-5 w-5" />,
  },
  {
    label: "X (Twitter)",
    href: "https://twitter.com/SafdarianM",
    icon: <FaXTwitter className="h-5 w-5" />,
  },
];

function isActive(pathname: string, item: Item) {
  if (item.match === "exact") return pathname === item.href;
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

type SidebarProps =
  | { me?: Me } // desktop-only usage
  | { me?: Me; mobileOpen: boolean; setMobileOpen: (v: boolean) => void }; // mobile drawer usage

export default function Sidebar(props: SidebarProps) {
  const { me } = props;
  const pathname = usePathname();
  const mobileOpen = "mobileOpen" in props ? props.mobileOpen : false;
  const setMobileOpen =
    "setMobileOpen" in props ? props.setMobileOpen : undefined;
  const closeMobile = () => setMobileOpen?.(false);

  return (
    <>
      {/* Desktop: hover-to-expand rail */}
      <div className="hidden xl:block group relative">
        <aside
          className={[
            // collapsed -> expanded width with smooth transition
            "sticky top-0 z-10 h-screen border-r border-amber-300 bg-stone-950 backdrop-blur",
            "w-20 group-hover:w-58", // collapsed/expanded widths
            "transition-[width] duration-300 ease-in-out",
            "overflow-hidden", // hide labels while collapsed
            "pt-5",
          ].join(" ")}
          aria-label="Main navigation"
        >
          {/* Brand */}
          <div className="grid place-items-center px-3 mt-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative items-center w-12 h-12">
                {" "}
                {/* 48px box */}
                <Image
                  src="/images/bg-orange.png"
                  alt="Ice Athlete"
                  width={96}
                  height={96}
                  quality={100}
                  className="origin-center transition-transform duration-300
                  group-hover:scale-200"
                  priority
                />
              </div>
              {/* Brand text fades in only when expanded */}
              <span
                className={[
                  "text-sm font-medium opacity-0",
                  "group-hover:opacity-100 transition-opacity duration-200",
                  // reveal with max-width transition (no wrap so it slides)
                  "max-w-0 group-hover:max-w-[140px] whitespace-nowrap overflow-hidden",
                ].join(" ")}
              ></span>
            </Link>
          </div>

          {/* Nav */}
          <nav className="font-heading p-2 space-y-2 mt-6">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch
                  aria-current={active ? "page" : undefined}
                  className={[
                    "group/nav flex items-center gap-3 px-4 py-2 rounded-lg transition text-base",
                    "hover:scale-[1.02]",
                    active
                      ? "bg-amber-500/20 text-orange-500"
                      : "hover:bg-orange-400 text-white/80",
                  ].join(" ")}
                >
                  <span className="text-current pr-1">{item.icon}</span>
                  {/* Label that animates open/closed */}
                  <span
                    className={[
                      "font-medium opacity-0 group-hover:opacity-100 transition-[opacity,max-width] duration-200 ease-out",
                      "max-w-0 group-hover:max-w-[180px] whitespace-nowrap overflow-hidden",
                    ].join(" ")}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Socials: only show when expanded */}
          <div
            className={[
              "mt-6 px-3",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
            ].join(" ")}
          >
            <div
              className={[
                "grid grid-cols-3 gap-3",
                // fully hidden space-wise while collapsed
                "max-h-0 group-hover:max-h-40 overflow-hidden transition-[max-height] duration-300 ease-in-out",
              ].join(" ")}
            >
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center mb-2 h-8 rounded-lg border border-black/50 
                   text-white/80 hover:text-amber-300 hover:border-amber-300 hover:bg-amber-500/10 
                   transition-all duration-300 shadow-md hover:shadow-amber-500/20"
                  aria-label={s.label}
                  title={s.label}
                >
                  <span className="text-2xl">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Account (pinned bottom): avatar always; name/email only when expanded */}
          <div className="mt-auto px-2 pt-3 pb-2 border-t border-amber-300 absolute bottom-0 left-0 right-0">
            {me ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-amber-500/10 transition"
                aria-label="Go to dashboard"
              >
                <Avatar
                  fullName={me.full_name ?? ""}
                  email={me.email ?? ""}
                  size={28}
                />
                <div
                  className={[
                    "min-w-0",
                    // hide details while collapsed
                    "opacity-0 group-hover:opacity-100 transition-[opacity,max-width] duration-200",
                    "max-w-0 group-hover:max-w-[200px] overflow-hidden",
                  ].join(" ")}
                >
                  <div className="text-sm font-medium truncate">
                    {me.full_name || me.email}
                  </div>
                  <div className="text-xs opacity-70 truncate">{me.email}</div>
                </div>
              </Link>
            ) : (
              <Link
                href="/signin"
                className={[
                  // layout: center when collapsed, left-align when expanded
                  "flex items-center w-full rounded-lg px-3 py-2 transition",
                  "justify-center group-hover:justify-center",
                  "gap-0 group-hover:gap-3 transition-[gap]",
                  // visuals
                  "border border-amber-300 hover:border-amber-500",
                  "bg-white/5 hover:bg-amber-300 hover:text-white text-sm font-medium",
                ].join(" ")}
                aria-label="Sign in"
                title="Sign in"
              >
                <FaRightToBracket
                  className="h-5 w-5 shrink-0 text-white/80 hover:text-amber-300"
                  aria-hidden="true"
                />

                {/* Label: only shows when expanded */}
                <span
                  className={[
                    "opacity-0 group-hover:opacity-100 transition-[opacity,max-width] duration-200 ease-out",
                    "max-w-0 group-hover:max-w-[120px] whitespace-nowrap overflow-hidden",
                  ].join(" ")}
                >
                  Sign in
                </span>
              </Link>
            )}

            <div
              className={[
                "mt-3 text-xs text-white/80",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                "max-h-0 group-hover:max-h-10 overflow-hidden",
              ].join(" ")}
            >
              © {new Date().getFullYear()}{" "}
              <a
                href="https://www.thedevnest.ca/"
                className="hover:text-amber-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Powered by DevNest Studio
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="xl:hidden fixed inset-0 z-50"
        >
          {/* Backdrop (click to close) */}
          <button
            aria-label="Close navigation backdrop"
            className="absolute inset-0 bg-black/60"
            onClick={closeMobile}
          />

          {/* Drawer */}
          <div
            className="absolute left-0 top-0 h-dvh w-72 bg-black border-r border-amber-500 p-3 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="h-12 shrink-0 inline-flex items-center gap-2 border-b border-amber-500 mb-2">
              <Image
                src="/images/logo.svg"
                alt="Ice Athlete"
                width={24}
                height={24}
              />
              <button
                aria-label="Close navigation"
                onClick={closeMobile}
                className="ml-auto p-2 rounded hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            {/* ✅ Scrollable content (nav + socials) */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1">
              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(pathname, item);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch
                      onClick={closeMobile}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "block px-3 py-2 rounded-lg transition",
                        active
                          ? "bg-amber-500/20 text-amber-300"
                          : "hover:bg-white/10 text-white/80",
                      ].join(" ")}
                    >
                      <span className="inline-flex items-center gap-3">
                        <span className="text-current">{item.icon}</span>
                        <span>{item.label}</span>
                      </span>
                    </Link>
                  );
                })}
              </nav>

              {/* Socials */}
              <div className="mt-4 px-2 pb-3">
                <div className="grid grid-cols-2 gap-3">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobile}
                      className="group flex items-center justify-center h-14 rounded-xl border border-white/10 bg-black/40 
                  text-white/80 hover:text-amber-300 hover:border-amber-500 hover:bg-amber-500/10 
                  transition-all duration-300 shadow-md hover:shadow-amber-500/20"
                      aria-label={s.label}
                      title={s.label}
                    >
                      <span className="text-2xl">{s.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer pinned bottom */}
            <div className="shrink-0 pt-3 border-t border-white/10">
              {me ? (
                <Link
                  href="/dashboard"
                  onClick={closeMobile}
                  className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-amber-500/10 transition"
                  aria-label="Go to dashboard"
                >
                  <Avatar
                    fullName={me.full_name ?? ""}
                    email={me.email ?? ""}
                    size={28}
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">
                      {me.full_name || me.email}
                    </div>
                    <div className="text-xs opacity-70 truncate">
                      {me.email}
                    </div>
                  </div>
                </Link>
              ) : (
                <Link
                  href="/signin"
                  onClick={closeMobile}
                  className="inline-flex items-center justify-center w-full rounded-lg border border-amber-500/60 hover:border-amber-500 px-3 py-2
              bg-white/5 hover:bg-amber-500/10 text-sm font-medium transition"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
