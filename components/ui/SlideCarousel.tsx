"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

/* ── Types ───────────────────────────────────────────────────────────── */

export type CarouselSlide = { file: string; caption: string };

/* ── Tuning ──────────────────────────────────────────────────────────── */

const SRC          = (file: string) => `/product-tour/${file}`;
const EXIT_MS      = 520;   // must match the slide-exit-* animation duration
/* The flourishes that ride on a step change — beam, ring pulse, viewfinder
   marks — outlast the outgoing frame, so they get their own window. Must be
   at least as long as the slowest of them (the beam, 860ms). */
const FLASH_MS     = 880;
const AUTOPLAY_MS  = 5200;
const SWIPE_PX     = 56;
/* Most tour screenshots sit around 1.84:1; used only until the real image
   reports its intrinsic size. */
const FALLBACK_RATIO = 1.84;

/* ── Slide layer ─────────────────────────────────────────────────────── */

/** One absolutely-positioned frame in the stage. Several can be alive at
 *  once while a transition plays out. */
function SlideLayer({
  file,
  caption,
  animation,
  drift,
  driftOut,
}: {
  file: string;
  caption: string;
  animation: string;
  /** Slow zoom while the slide rests under autoplay. */
  drift?: boolean;
  /** Pull out instead of push in, so consecutive steps differ. */
  driftOut?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [file]);

  /* Two nested elements on purpose: the transition owns the wrapper's
     transform, the drift owns the image's, so they never overwrite
     each other the way they would on a single node. */
  const shell: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  };

  return (
    <div className={animation} style={shell}>
      {failed ? (
        <div className="grid h-full w-full place-items-center">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-light-green">
              <svg className="h-6 w-6 text-green/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
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
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={SRC(file)}
          alt={caption}
          draggable={false}
          className={drift ? (driftOut ? "animate-slide-drift-out" : "animate-slide-drift") : ""}
          /* The frame is sized to the live slide's exact ratio, so `contain`
             costs it nothing — and it keeps the outgoing slide, which has a
             different ratio, from being stretched on its way out. */
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            userSelect: "none",
            animationDuration: `${AUTOPLAY_MS}ms`,
          }}
          onError={() => setFailed(true)}
        />
      )}
    </div>
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
        "absolute top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full",
        "border border-white/25 bg-[#0F2E24]/80 text-white shadow-[0_8px_28px_rgba(0,0,0,0.5)] backdrop-blur-md",
        "transition-all duration-300 ease-out",
        "hover:border-green hover:bg-green hover:text-white hover:shadow-glow hover:scale-[1.07]",
        "active:scale-95",
        direction === "left" ? "left-3" : "right-3",
        disabled
          ? "pointer-events-none opacity-0"
          : "opacity-100 md:opacity-0 md:group-hover/viewer:opacity-100 md:focus-visible:opacity-100",
      ].join(" ")}
    >
      <svg className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
      </svg>
    </button>
  );
}

/* ── Shared slide carousel ───────────────────────────────────────────── */

export function SlideCarousel({
  slides,
  slug,
  /** Controlled playback — lets a parent keep the reel running across tabs. */
  playing: playingProp,
  onPlayingChange,
  /** Fired instead of stopping when autoplay runs past the last slide. */
  onComplete,
  /** Size the viewer to its parent box instead of to its own width. */
  fill = false,
  /** Stage badge, drawn beside the caption in the strip inside the theatre.
   *  Kept in here rather than in a band above it so it costs the screenshot
   *  as little height as possible — every pixel spent on chrome above the
   *  frame is a pixel off the image. */
  eyebrow,
}: {
  slides: CarouselSlide[];
  slug?: string;
  playing?: boolean;
  onPlayingChange?: (v: boolean) => void;
  onComplete?: () => void;
  fill?: boolean;
  eyebrow?: string;
}) {
  const totalSlides = slides.length;

  const [index,       setIndex]       = useState(0);
  const [dir,         setDir]         = useState<1 | -1>(1);
  /** The frame on its way out — kept mounted for the length of the exit. */
  const [exiting,     setExiting]     = useState<{ idx: number; dir: 1 | -1 } | null>(null);
  /** Outlives `exiting`; drives the step-change flourishes. */
  const [flash,       setFlash]       = useState<{ idx: number; dir: 1 | -1 } | null>(null);
  const [ratios,      setRatios]      = useState<Record<string, number>>({});
  const [box,         setBox]         = useState({ w: 0, h: 0 });
  const [chromeH,     setChromeH]     = useState(41);
  const [playingSelf, setPlayingSelf] = useState(false);
  const [reduced,     setReduced]     = useState(false);
  const [peek,        setPeek]        = useState<number | null>(null);
  const [zoomed,      setZoomed]      = useState(false);
  const [transportH,  setTransportH]  = useState(34);

  const areaRef      = useRef<HTMLDivElement | null>(null);
  const chromeRef    = useRef<HTMLDivElement | null>(null);
  const transportRef = useRef<HTMLDivElement | null>(null);
  const exitTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Suppresses the enter animation on the very first paint. */
  const moved     = useRef(false);
  const dragX     = useRef<number | null>(null);
  const swiped    = useRef(false);

  const current = slides[index];

  /* Playback is controlled when the parent supplies it. */
  const playing = playingProp ?? playingSelf;
  const setPlaying = useCallback((v: boolean) => {
    if (onPlayingChange) onPlayingChange(v);
    else setPlayingSelf(v);
  }, [onPlayingChange]);

  /* Respect the OS motion preference. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* Preload every slide and record its intrinsic ratio, so the frame can be
     sized to the screenshot rather than letterboxing it. */
  useEffect(() => {
    let alive = true;
    slides.forEach((s) => {
      const img = new Image();
      img.onload = () => {
        if (!alive || !img.naturalHeight) return;
        setRatios((r) => (r[s.file] ? r : { ...r, [s.file]: img.naturalWidth / img.naturalHeight }));
      };
      img.src = SRC(s.file);
    });
    return () => { alive = false; };
  }, [slides]);

  /* Measure the space the viewer may occupy, and the title bar inside it. */
  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    const r = el.getBoundingClientRect();
    setBox({ w: r.width, h: r.height });
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = chromeRef.current;
    if (!el) return;
    /* offsetHeight, not contentRect — the title bar's padding and border are
       part of the height the stage has to give up. */
    const ro = new ResizeObserver(() => setChromeH(el.offsetHeight));
    ro.observe(el);
    setChromeH(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = transportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setTransportH(el.offsetHeight));
    ro.observe(el);
    setTransportH(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  const goTo = useCallback((next: number, direction: 1 | -1) => {
    if (next === index || next < 0 || next >= totalSlides) return;
    moved.current = true;
    if (exitTimer.current) clearTimeout(exitTimer.current);
    if (flashTimer.current) clearTimeout(flashTimer.current);

    setDir(direction);
    setExiting({ idx: index, dir: direction });
    setFlash({ idx: next, dir: direction });
    setIndex(next);

    exitTimer.current = setTimeout(() => {
      setExiting(null);
      exitTimer.current = null;
    }, EXIT_MS);

    flashTimer.current = setTimeout(() => {
      setFlash(null);
      flashTimer.current = null;
    }, FLASH_MS);
  }, [index, totalSlides]);

  const prev = useCallback(() => goTo(index - 1, -1), [index, goTo]);
  const next = useCallback(() => goTo(index + 1, 1),  [index, goTo]);

  /* Manual navigation pauses the reel — the same as scrubbing a video. */
  const prevManual = useCallback(() => { setPlaying(false); prev(); }, [prev, setPlaying]);
  const nextManual = useCallback(() => { setPlaying(false); next(); }, [next, setPlaying]);

  /* Autoplay. Past the last slide it hands off to the parent when it can,
     so the whole tour plays end to end like a reel. */
  useEffect(() => {
    if (!playing || reduced || zoomed) return;
    const t = setTimeout(() => {
      if (index < totalSlides - 1) goTo(index + 1, 1);
      else if (onComplete) onComplete();
      else setPlaying(false);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, reduced, zoomed, index, totalSlides, goTo, onComplete, setPlaying]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea, [contenteditable]")) return;
      if (e.key === "Escape")          setZoomed(false);
      else if (e.key === "ArrowLeft")  prevManual();
      else if (e.key === "ArrowRight") nextManual();
      else if (e.key === " " || e.key === "Spacebar") { e.preventDefault(); setPlaying(!playing); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevManual, nextManual, playing, setPlaying]);

  /* Lock the page behind the zoom overlay. */
  useEffect(() => {
    if (!zoomed) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, [zoomed]);

  useEffect(() => () => {
    if (exitTimer.current) clearTimeout(exitTimer.current);
    if (flashTimer.current) clearTimeout(flashTimer.current);
  }, []);

  /* ── Drag / swipe ── */
  const onPointerDown = (e: React.PointerEvent) => { dragX.current = e.clientX; swiped.current = false; };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = dragX.current;
    dragX.current = null;
    if (start === null) return;
    const delta = e.clientX - start;
    if (Math.abs(delta) < SWIPE_PX) return;
    /* A swipe is followed by a click event — don't let it open the zoom. */
    swiped.current = true;
    if (delta < 0) nextManual(); else prevManual();
  };

  const onStageClick = () => {
    if (swiped.current) { swiped.current = false; return; }
    setZoomed(true);
  };

  /* ── Fit ──
     The window is sized to the largest rectangle of this screenshot's
     aspect that fits the measured box, so the whole frame and every
     control stay on screen together — no scrolling, no letterboxing. */
  const ratio   = ratios[current.file] ?? FALLBACK_RATIO;
  /* Minus the window's chrome — title bar, transport, and its own borders. */
  const availH  = fill ? Math.max(box.h - chromeH - transportH - 2, 120) : Infinity;
  const frameW  = box.w ? Math.min(box.w, availH * ratio) : 0;
  const stageH  = frameW ? frameW / ratio : 0;

  const enterAnim = !moved.current || reduced
    ? ""
    : dir === 1 ? "animate-slide-enter-fwd" : "animate-slide-enter-back";
  const exitAnim  = reduced
    ? "opacity-0 transition-opacity duration-200"
    : exiting?.dir === 1 ? "animate-slide-exit-fwd" : "animate-slide-exit-back";

  const fitStyle: React.CSSProperties = {
    width: frameW ? `${frameW}px` : "100%",
    transition: reduced ? undefined : "width 560ms cubic-bezier(0.16,1,0.3,1)",
  };


  /* ── Render ── */
  return (
    <>
      {/* ═══ Theatre ═══ */}
      <div
        className={[
          "group/viewer relative flex flex-col overflow-hidden rounded-3xl",
          fill ? "h-full px-3 py-3 sm:px-4 sm:py-3.5" : "px-4 py-8 sm:px-10 sm:py-10",
        ].join(" ")}
        style={{
          background: "linear-gradient(180deg, #123328 0%, #0D2A21 55%, #081D17 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), 0 24px 60px -28px rgba(8,29,23,0.5)",
        }}
        onMouseLeave={() => setPeek(null)}
      >
        {/* Crisp dot lattice — no blur, so nothing washes out */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.11) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(80% 60% at 50% 40%, #000 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(80% 60% at 50% 40%, #000 20%, transparent 100%)",
            opacity: 0.45,
          }}
        />

        {/* A single tight brand glow behind the frame */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[240px] w-[640px] max-w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(0,166,81,0.26), transparent 70%)" }}
        />

        {/* ── Stage strip ──
            The step caption lives up here rather than under the frame: the
            screenshot is height-bound, so a text block below it would be paid
            for in image width. `title` keeps the full text reachable when a
            long caption truncates. */}
        <div className="relative z-10 mb-2.5 flex shrink-0 items-center justify-center gap-2.5 px-2">
          {eyebrow && (
            <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-green/30 bg-green/10 px-2.5 py-[2px] font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-green">
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-green" aria-hidden />
              {eyebrow}
            </span>
          )}
          <p
            key={`cap-${index}`}
            title={current.caption}
            className={`truncate text-[13px] font-semibold leading-snug text-white/85 ${reduced ? "" : "animate-caption-rise"}`}
            aria-live="polite"
            aria-atomic="true"
          >
            {current.caption}
          </p>
        </div>

        {/* ── Window area — takes all remaining height ── */}
        <div
          ref={areaRef}
          className={["relative z-10 mx-auto flex w-full max-w-[1320px] items-center justify-center", fill ? "min-h-0 flex-1" : ""].join(" ")}
        >
          <div className="relative" style={fitStyle}>
            {/* Window. The camera move is retriggered by adding/removing the
                class as `exiting` flips — NOT by a `key`, which would remount
                the whole window subtree (the slide layers included) and kill
                the very transition it is meant to accompany. The arrows sit
                outside this element, so the transform is free to run. */}
            <div
              className={[
                "relative w-full overflow-hidden rounded-xl",
                exiting && !reduced ? (exiting.dir === 1 ? "animate-cam-pan-fwd" : "animate-cam-pan-back") : "",
              ].join(" ")}
              style={{
                border: `1px solid ${playing ? "rgba(0,166,81,0.45)" : "rgba(255,255,255,0.16)"}`,
                /* While the reel runs the window picks up a brand rim — the
                   viewer's "on air" state, readable at a glance. */
                boxShadow: playing
                  ? "0 0 0 4px rgba(0,166,81,0.10), 0 30px 70px -20px rgba(0,0,0,0.7), 0 6px 18px -6px rgba(0,0,0,0.5)"
                  : "0 30px 70px -20px rgba(0,0,0,0.7), 0 6px 18px -6px rgba(0,0,0,0.5)",
                transition: "border-color 400ms ease, box-shadow 400ms ease",
              }}
            >
              {/* Title bar */}
              <div
                ref={chromeRef}
                className="flex items-center gap-1.5 border-b border-white/10 px-3 py-1.5"
                style={{ background: "#152F26" }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: "#FF5F57" }} aria-hidden />
                <span className="h-2 w-2 rounded-full" style={{ background: "#FFBD2E" }} aria-hidden />
                <span className="h-2 w-2 rounded-full" style={{ background: "#28C840" }} aria-hidden />

                <div className="ml-3 flex min-w-0 max-w-xs flex-1 items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-[3px]">
                  <svg className="h-2.5 w-2.5 shrink-0 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                    <rect x="4" y="11" width="16" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  <span className="truncate font-mono text-[10.5px] tracking-tight text-white/50">
                    app.incentiq.io{slug ? `/${slug}` : ""}
                  </span>
                </div>

                <div className="ml-auto flex items-center gap-2">
                  <span className="hidden items-center gap-1.5 rounded-full border border-green/25 bg-green/10 px-2 py-[3px] sm:flex">
                    <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-green" aria-hidden />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-green">Live</span>
                  </span>
                  <button
                    onClick={() => setZoomed(true)}
                    aria-label="View screenshot full size"
                    className="grid h-6 w-6 place-items-center rounded-md text-white/40 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Stage */}
              <div
                className="relative touch-pan-y cursor-zoom-in overflow-hidden bg-white"
                style={{
                  height: stageH ? `${stageH}px` : undefined,
                  /* Until the box is measured, hold the shape intrinsically so
                     the stage never collapses to zero on the first frame. */
                  aspectRatio: stageH ? undefined : String(ratio),
                  transition: reduced ? undefined : "height 560ms cubic-bezier(0.16,1,0.3,1)",
                }}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerCancel={() => { dragX.current = null; }}
                onClick={onStageClick}
              >
                {exiting && (
                  <SlideLayer
                    key={`exit-${exiting.idx}`}
                    file={slides[exiting.idx].file}
                    caption=""
                    animation={exitAnim}
                  />
                )}

                <SlideLayer
                  key={`live-${index}`}
                  file={current.file}
                  caption={current.caption}
                  animation={enterAnim}
                  drift={playing && !reduced && !exiting}
                  driftOut={index % 2 === 1}
                />

                {/* Leading edge of light, travelling with the new slide */}
                {flash && !reduced && (
                  <span
                    key={`sheen-${flash.idx}`}
                    aria-hidden
                    className={`${flash.dir === 1 ? "animate-sheen-swipe" : "animate-sheen-swipe-back"} pointer-events-none absolute inset-y-0 z-10 w-[38%]`}
                    style={{
                      /* A tight bright core with a green halo and a wide soft
                         bloom — a beam, rather than a broad wash. */
                      background:
                        "linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.05) 30%, rgba(0,166,81,0.30) 45%, rgba(255,255,255,0.95) 50%, rgba(0,166,81,0.22) 55%, rgba(255,255,255,0.06) 70%, transparent 100%)",
                    }}
                  />
                )}

                {/* The frame acknowledges the step */}
                {flash && !reduced && (
                  <span
                    key={`pulse-${flash.idx}`}
                    aria-hidden
                    className="animate-frame-pulse pointer-events-none absolute inset-0 z-20"
                  />
                )}

                {/* Viewfinder brackets snapping to the corners as the shot
                    lands — the signature beat of the step change. */}
                {flash && !reduced && (
                  <span key={`marks-${flash.idx}`} aria-hidden className="pointer-events-none absolute inset-0 z-20">
                    {([
                      ["top-3 left-3",     "border-t-2 border-l-2 rounded-tl-md"],
                      ["top-3 right-3",    "border-t-2 border-r-2 rounded-tr-md"],
                      ["bottom-3 left-3",  "border-b-2 border-l-2 rounded-bl-md"],
                      ["bottom-3 right-3", "border-b-2 border-r-2 rounded-br-md"],
                    ] as const).map(([pos, edges], i) => (
                      <span
                        key={i}
                        className={`animate-bracket-in absolute h-5 w-5 border-green ${pos} ${edges}`}
                        style={{ animationDelay: `${i * 40}ms` }}
                      />
                    ))}
                  </span>
                )}
              </div>

              {/* ── Transport ──
                  Part of the window's chrome, below the image rather than on
                  top of it: nothing ever covers the screenshot, and no
                  hover-to-reveal is needed, so there is only ever one progress
                  indicator on screen. Its height is measured and taken out of
                  the fit budget. */}
              <div
                ref={transportRef}
                className="relative flex items-center gap-3 border-t border-white/10 px-3 py-1.5"
                style={{ background: "#152F26" }}
              >
                {/* Hairline along the seam, lit while the reel runs */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(0,166,81,0.85), transparent)",
                    opacity: playing ? 1 : 0,
                  }}
                />
                {totalSlides > 1 && !reduced && (
                  <span className="relative grid h-8 w-8 shrink-0 place-items-center">
                    <button
                      onClick={() => setPlaying(!playing)}
                      aria-label={playing ? "Pause the tour" : "Play the tour"}
                      className="grid h-7 w-7 place-items-center rounded-full border border-green/50 bg-green/20 text-green transition-all duration-200 hover:border-green hover:bg-green hover:text-white hover:shadow-glow"
                    >
                      {playing ? (
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <rect x="6" y="5" width="4" height="14" rx="1" />
                          <rect x="14" y="5" width="4" height="14" rx="1" />
                        </svg>
                      ) : (
                        <svg className="h-3 w-3 translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M8 5l11 7-11 7z" />
                        </svg>
                      )}
                    </button>

                    {/* Step timer, drawn around the button. pathLength=1
                        normalises the circumference so the dash maths is
                        independent of the radius. */}
                    {playing && (
                      <svg aria-hidden viewBox="0 0 36 36" className="pointer-events-none absolute inset-0 -rotate-90">
                        <circle cx="18" cy="18" r="17" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
                        <circle
                          key={`ring-${index}`}
                          cx="18" cy="18" r="17"
                          fill="none"
                          stroke="#00A651"
                          strokeWidth="2"
                          strokeLinecap="round"
                          pathLength={1}
                          strokeDasharray={1}
                          className="animate-ring-sweep"
                          style={{ animationDuration: `${AUTOPLAY_MS}ms`, filter: "drop-shadow(0 0 4px rgba(0,166,81,0.8))" }}
                        />
                      </svg>
                    )}
                  </span>
                )}

                {/* Scrubber */}
                <div className="flex flex-1 items-center gap-1.5" role="group" aria-label="Screenshot navigation">
                  {slides.map((s, i) => {
                    const isActive = i === index;
                    const isDone   = i < index;
                    return (
                      <button
                        key={s.file + i}
                        onClick={() => { setPlaying(false); goTo(i, i > index ? 1 : -1); }}
                        onMouseEnter={() => setPeek(i)}
                        onMouseLeave={() => setPeek((p) => (p === i ? null : p))}
                        aria-label={`Go to step ${i + 1}`}
                        aria-current={isActive ? "step" : undefined}
                        className="group/seg relative h-4 flex-1 pt-[7px]"
                      >
                        {/* Track colour lives inline, so hover is driven from
                            state rather than a class an inline style would
                            outrank. */}
                        <span
                          className="block h-[3px] w-full overflow-hidden rounded-full transition-colors duration-300"
                          style={{
                            background: isDone
                              ? "#00A651"
                              : isActive
                              ? "rgba(0,166,81,0.28)"
                              : peek === i
                              ? "rgba(255,255,255,0.55)"
                              : "rgba(255,255,255,0.20)",
                          }}
                        >
                          {isActive && (
                            <span
                              key={`fill-${index}-${playing}`}
                              className={playing && !reduced ? "animate-rail-fill" : ""}
                              style={{
                                display: "block",
                                height: "100%",
                                width: "100%",
                                borderRadius: "inherit",
                                background: "#00A651",
                                boxShadow: "0 0 10px rgba(0,166,81,0.65)",
                                transformOrigin: "left center",
                                animationDuration: `${AUTOPLAY_MS}ms`,
                              }}
                            />
                          )}
                        </span>

                        {/* Thumbnail preview */}
                        {peek === i && (
                          <span
                            aria-hidden
                            className="animate-caption-rise pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-40 w-[168px] -translate-x-1/2 overflow-hidden rounded-lg border border-white/15 bg-[#0B241D] p-1 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.85)]"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={SRC(s.file)}
                              alt=""
                              className="block w-full rounded"
                              style={{ aspectRatio: String(ratios[s.file] ?? FALLBACK_RATIO), objectFit: "cover", objectPosition: "top center" }}
                            />
                            <span className="mt-1 block px-1 pb-0.5 text-left font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-white/40">
                              Step {String(i + 1).padStart(2, "0")}
                            </span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Odometer — the live number rolls, the total doesn't */}
                <p className="flex shrink-0 items-center font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/70">
                  <span className="inline-block h-[13px] overflow-hidden leading-[13px]">
                    <span key={`num-${index}`} className={`inline-block ${reduced ? "" : "animate-count-roll"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="text-white/35">&nbsp;/&nbsp;{String(totalSlides).padStart(2, "0")}</span>
                </p>
              </div>
            </div>

            <ArrowBtn direction="left"  onClick={prevManual} disabled={index === 0}               label="Previous screenshot" />
            <ArrowBtn direction="right" onClick={nextManual} disabled={index === totalSlides - 1} label="Next screenshot" />
          </div>
        </div>

      </div>

      {/* ═══ Full-size view ═══
          The sources are ~2300px wide, so there is real detail to reveal.
          Portalled to <body>: the tour panel animates in, and a lingering
          `transform` on an ancestor would become the containing block for
          this fixed overlay. `zoomed` is false on the server and on the
          first client render, so this cannot desync hydration. */}
      {zoomed && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={() => setZoomed(false)}
          className="animate-soft-fade fixed inset-0 z-[100] flex cursor-zoom-out flex-col items-center justify-center gap-4 p-4 sm:p-8"
          style={{ background: "rgba(8,29,23,0.94)", backdropFilter: "blur(8px)" }}
        >
          <button
            onClick={() => setZoomed(false)}
            aria-label="Close full-size view"
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white/70 backdrop-blur transition-colors duration-200 hover:bg-white/20 hover:text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SRC(current.file)}
            alt={current.caption}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[82vh] w-auto max-w-full rounded-xl border border-white/15 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]"
          />
          <p className="max-w-[680px] text-center text-[14px] font-medium leading-relaxed text-white/70">
            {current.caption}
          </p>
        </div>,
        document.body,
      )}
    </>
  );
}
