// src/components/images/IceAxePng.tsx
export default function IceAxePng({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block bg-current ${className}`}
      style={{
        WebkitMaskImage: "url(/images/axe.png)",
        maskImage: "url(/images/axe.png)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        imageRendering: "crisp-edges",      
        WebkitMaskComposite: "source-over",      
      }}
    />
  );
}
