"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

/* ── Types ───────────────────────────────────────────────────────────── */

export type CarouselSlide = { file: string; caption: string };

/* ── Slide image with graceful placeholder ───────────────────────────── */

function SlideImage({ file, caption }: { file: string; caption: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [file]);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-light-green">
            <svg className="h-7 w-7 text-green/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <circle cx="9" cy="15" r="2" />
              <path d="M17 13l-3 3.5" />
            </svg>
          </div>
          <div>
            <p className="text-[11.5px] font-semibold text-slate/50">Screenshot pending</p>
            <p className="mt-0.5 font-mono text-[10px] text-slate/35">/public/product-tour/{file}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={`/product-tour/${file}`}
      alt={caption}
      fill
      className="object-contain"
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}

/* ── Arrow button ────────────────────────────────────────────────────── */

export function ArrowBtn({
  direction,
  onClick,
  disabled,
  label,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={[
        "absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full",
        "border border-white/80 bg-white text-green shadow-float",
        "transition-all duration-200",
        "hover:bg-green hover:text-white hover:border-green hover:shadow-glow",
        "disabled:cursor-not-allowed disabled:opacity-30",
        direction === "left" ? "left-4" : "right-4",
      ].join(" ")}
    >
      {direction === "left" ? (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </button>
  );
}

/* ── Shared slide carousel ───────────────────────────────────────────── */

export function SlideCarousel({ slides, slug }: { slides: CarouselSlide[]; slug?: string }) {
  const [slideIdx,     setSlideIdx]     = useState(0);
  const [displayedIdx, setDisplayedIdx] = useState(0);
  const [flipPhase,    setFlipPhase]    = useState<"idle" | "out" | "in-ready" | "in">("idle");
  const [flipDir,      setFlipDir]      = useState<1 | -1>(1);
  const [captionVisible, setCaptionVisible] = useState(true);
  const flipRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalSlides = slides.length;
  const displayed   = slides[displayedIdx];

  /* Card flip CSS */
  const flipStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    transform:
      flipPhase === "out"
        ? (flipDir === 1 ? "rotateY(-90deg)" : "rotateY(90deg)")
        : flipPhase === "in-ready"
        ? (flipDir === 1 ? "rotateY(90deg)"  : "rotateY(-90deg)")
        : "rotateY(0deg)",
    transition:
      flipPhase === "out" ? "transform 150ms ease-in"
      : flipPhase === "in" ? "transform 150ms ease-out"
      : "none",
    willChange: "transform",
  };

  /* Navigate with card flip */
  const navigateSlide = useCallback((next: number, dir: 1 | -1) => {
    if (next === slideIdx || flipPhase !== "idle") return;
    if (flipRef.current) clearTimeout(flipRef.current);

    setFlipDir(dir);
    setFlipPhase("out");

    flipRef.current = setTimeout(() => {
      setSlideIdx(next);
      setDisplayedIdx(next);
      setFlipPhase("in-ready");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFlipPhase("in");
          flipRef.current = setTimeout(() => {
            setFlipPhase("idle");
            flipRef.current = null;
          }, 160);
        });
      });
    }, 155);
  }, [slideIdx, flipPhase]);

  const prev = useCallback(() => {
    if (slideIdx > 0) navigateSlide(slideIdx - 1, -1);
  }, [slideIdx, navigateSlide]);

  const next = useCallback(() => {
    if (slideIdx < totalSlides - 1) navigateSlide(slideIdx + 1, 1);
  }, [slideIdx, totalSlides, navigateSlide]);

  /* Keyboard left / right arrows */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea, [contenteditable]")) return;
      if (e.key === "ArrowLeft")  prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  /* Caption fade on slide change */
  useEffect(() => {
    setCaptionVisible(false);
    const t = setTimeout(() => setCaptionVisible(true), 80);
    return () => clearTimeout(t);
  }, [displayedIdx]);

  /* Cleanup on unmount */
  useEffect(() => () => { if (flipRef.current) clearTimeout(flipRef.current); }, []);

  /* ── Render ── */
  return (
    <div>
      {/* Browser chrome frame */}
      <div className="overflow-hidden rounded-2xl border border-light-gray bg-white shadow-[0_8px_32px_rgba(15,45,36,0.12),0_2px_8px_rgba(15,45,36,0.06)]">
        {/* Chrome bar */}
        <div className="flex items-center gap-1.5 border-b border-light-gray bg-[#F8FAFC] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FFBD2E" }} aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28C840" }} aria-hidden />
          <div className="ml-3 flex min-w-0 flex-1 items-center gap-2 rounded-full border border-light-gray bg-white px-3 py-1 max-w-xs">
            <svg className="h-2.5 w-2.5 shrink-0 text-slate/35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="truncate text-[11px] text-slate/45">
              app.incentiq.io{slug ? ` / ${slug}` : ""}
            </span>
          </div>
        </div>

        {/* Screenshot area — perspective enables 3D card flip */}
        <div
          className="relative aspect-[16/9] overflow-hidden bg-light-green/20"
          style={{ perspective: "1200px" }}
        >
          <div style={flipStyle}>
            <SlideImage
              key={displayedIdx}
              file={displayed.file}
              caption={displayed.caption}
            />
          </div>

          <ArrowBtn
            direction="left"
            onClick={prev}
            disabled={slideIdx === 0 || flipPhase !== "idle"}
            label="Previous screenshot"
          />
          <ArrowBtn
            direction="right"
            onClick={next}
            disabled={slideIdx === totalSlides - 1 || flipPhase !== "idle"}
            label="Next screenshot"
          />
        </div>
      </div>

      {/* Step counter + dot indicators + caption */}
      <div className="mt-4 flex flex-col items-center gap-2.5">
        <p className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-slate">
          Step {displayedIdx + 1} of {totalSlides}
        </p>

        <div className="flex items-center gap-1.5" role="group" aria-label="Screenshot navigation">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => navigateSlide(i, i > slideIdx ? 1 : -1)}
              aria-label={`Go to step ${i + 1}`}
              aria-current={i === displayedIdx ? "step" : undefined}
              className={[
                "rounded-full transition-all duration-300",
                i === displayedIdx
                  ? "h-2 w-6 bg-green"
                  : "h-2 w-2 bg-light-gray hover:bg-green/40",
              ].join(" ")}
            />
          ))}
        </div>

        <p
          className="max-w-[640px] text-center text-[15px] font-medium leading-relaxed text-[#0B1D2D]"
          style={{ opacity: captionVisible ? 1 : 0, transition: "opacity 0.25s ease" }}
          aria-live="polite"
          aria-atomic="true"
        >
          {displayed.caption}
        </p>
      </div>
    </div>
  );
}
