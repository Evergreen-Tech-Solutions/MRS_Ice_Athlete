// apps/web/src/app/page.tsx
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="relative min-h-[calc(100vh-3rem)] page-bottom-fade overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 rotate-180 -z-10">
        <Image
          src="/images/bg1.jpeg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        {/* Bottom gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content container (empty for now) */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* TODO: add your hero headline / CTA here later */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
          {/* Placeholder */}
        </h1>
      </div>
    </main>
  );
}
