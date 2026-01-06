"use client";

import { useEffect, useMemo, useState } from "react";

function getVideoId(input: string) {
  try {
    const u = new URL(input);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    return u.searchParams.get("v") ?? "";
  } catch {
    return "";
  }
}

function formatCountdown(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${d}d ${h}h ${m}m`;
}

export default function YouTubeLive({
  watchUrl,
  startISO,
  title = "YouTube livestream",
}: {
  watchUrl: string;
  startISO: string;
  title?: string;
}) {
  const videoId = useMemo(() => getVideoId(watchUrl), [watchUrl]);
  const startAt = useMemo(() => new Date(startISO).getTime(), [startISO]);

  const [now, setNow] = useState(() => Date.now());
  const [forcePlayer, setForcePlayer] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);

  const hasStarted = now >= startAt;
  const shouldShowPlayer = forcePlayer || hasStarted;

  const embedSrc = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`
    : "";

  const thumb =
    videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : "";

  return (
    <div className="relative w-full overflow-hidden bg-black">
      <div className="aspect-video w-full">
        {shouldShowPlayer && embedSrc ? (
          <iframe
            className="h-full w-full"
            src={embedSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="relative h-full w-full">
            {/* Thumbnail */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: thumb ? `url(${thumb})` : undefined }}
            />
            <div className="absolute inset-0 bg-black/55" />

            {/* Overlay content */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
              <div className="text-sm font-semibold text-stone-100/80">
                Livestream scheduled
              </div>
              <div className="mt-2 text-2xl font-extrabold text-stone-100">
                Starts in {formatCountdown(startAt - now)}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={watchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-white/90"
                >
                  Open on YouTube <span aria-hidden>→</span>
                </a>

                <button
                  type="button"
                  onClick={() => setForcePlayer(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-transparent px-5 py-3 text-sm font-semibold text-stone-100 ring-1 ring-white/20 hover:bg-white/10"
                >
                  Show embed anyway
                </button>
              </div>

              <div className="mt-4 text-xs text-stone-100/60">
                If YouTube blocks embedding before the event starts, the button above will still open the stream reliably.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
