import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    // Replace Tailwind's built-in color palette entirely — no merge conflicts.
    // Every bg-*, text-*, border-*, ring-* utility is generated from these tokens only.
    colors: {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      black: "#000000",
      white: "#FFFFFF",

      // ── Primary brand palette ────────────────────────────────────────────
      green:          "#00A651", // Primary Green   — buttons, key highlights
      "dark-green":   "#0F2E24", // Dark Green      — headings, text, strong accents
      "light-green":  "#E8F5E9", // Light Green     — section backgrounds, subtle fills
      "accent-green": "#7ED321", // Accent Green    — accents, icons, gradient end-stop

      // ── Secondary palette ────────────────────────────────────────────────
      navy:           "#0B1D2D", // Navy Blue       — body text, sub-headings
      slate:          "#475569", // Slate Gray      — secondary text, icons
      "light-gray":   "#F1F5F9", // Light Gray      — borders, dividers, card backgrounds
      teal:           "#00BFA5", // Teal            — data visualization, charts
      sky:            "#0092FF", // Sky Blue        — links, interactive elements
      amber:          "#FFB703", // Amber           — warnings, alerts
      red:            "#E63946", // Red             — errors, critical alerts
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans:    ["var(--font-geist)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-hero": ["clamp(3rem,6.6vw,6.5rem)",  { lineHeight: "0.96",  letterSpacing: "-0.04em"  }],
        "display-1":    ["clamp(2.5rem,5vw,4.5rem)",  { lineHeight: "1.0",   letterSpacing: "-0.034em" }],
        "display-2":    ["clamp(2rem,3.4vw,3.4rem)",  { lineHeight: "1.04",  letterSpacing: "-0.03em"  }],
        "display-3":    ["clamp(1.6rem,2.4vw,2.25rem)",{ lineHeight: "1.1",  letterSpacing: "-0.024em" }],
        lead:           ["1.275rem",                   { lineHeight: "1.62",  letterSpacing: "-0.011em" }],
      },
      maxWidth: {
        shell:       "1500px",
        "shell-wide":"1600px",
        prose:       "48rem",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
        xl4: "2.25rem",
      },
      boxShadow: {
        soft:  "0 1px 2px rgba(11,29,45,0.04), 0 10px 30px rgba(11,29,45,0.06)",
        float: "0 8px 24px rgba(11,29,45,0.08), 0 28px 64px rgba(11,29,45,0.10)",
        glow:  "0 30px 80px rgba(0,166,81,0.22)",
        glass: "0 6px 28px rgba(11,29,45,0.08), inset 0 1px 0 rgba(255,255,255,0.75)",
        ring:  "0 0 0 1px rgba(11,29,45,0.05)",
      },
      keyframes: {
        "flow-dash":     { to: { strokeDashoffset: "-28" } },
        "pulse-soft":    { "0%,100%": { opacity: "0.4" }, "50%": { opacity: "1" } },
        drift:           { "0%,100%": { transform: "translateY(0)" },      "50%": { transform: "translateY(-10px)" } },
        "drift-slow":    { "0%,100%": { transform: "translateY(0) translateX(0)" }, "50%": { transform: "translateY(-14px) translateX(6px)" } },
        orbit:           { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        marquee:         { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "arrow-travel":  {
          "0%":   { transform: "translateX(0px)",  opacity: "0" },
          "10%":  { transform: "translateX(3px)",  opacity: "1" },
          "75%":  { transform: "translateX(26px)", opacity: "1" },
          "90%":  { transform: "translateX(30px)", opacity: "0" },
          "100%": { transform: "translateX(0px)",  opacity: "0" },
        },
        "sheen-loop": {
          "0%":   { transform: "translateX(-160%) skewX(-10deg)", opacity: "0" },
          "6%":   { opacity: "0.85" },
          "55%":  { opacity: "0.6" },
          "70%":  { transform: "translateX(230%) skewX(-10deg)", opacity: "0" },
          "100%": { transform: "translateX(-160%) skewX(-10deg)", opacity: "0" },
        },
        "chevron-pulse": {
          "0%, 100%": { opacity: "0.3", filter: "drop-shadow(0 0 0px rgba(0,166,81,0))" },
          "50%":       { opacity: "1",   filter: "drop-shadow(0 0 8px rgba(0,166,81,0.9))" },
        },

        /* ── Product-tour slide transition ──────────────────────────────
           A shallow perspective push: the outgoing frame recedes into the
           depth while the incoming one comes forward. `perspective()` is
           part of each transform, so no 3D context is needed on the parent
           and nothing else on the page is dragged into 3D. The angles stay
           small — this reads as depth, never as a card flip. */
        "slide-enter-fwd": {
          "0%":   { opacity: "0", transform: "perspective(1600px) translate3d(8%,0,-90px) rotateY(7deg) scale(1.015)" },
          "45%":  { opacity: "1" },
          "100%": { opacity: "1", transform: "perspective(1600px) translate3d(0,0,0) rotateY(0deg) scale(1)" },
        },
        "slide-enter-back": {
          "0%":   { opacity: "0", transform: "perspective(1600px) translate3d(-8%,0,-90px) rotateY(-7deg) scale(1.015)" },
          "45%":  { opacity: "1" },
          "100%": { opacity: "1", transform: "perspective(1600px) translate3d(0,0,0) rotateY(0deg) scale(1)" },
        },
        "slide-exit-fwd": {
          "0%":   { opacity: "1", transform: "perspective(1600px) translate3d(0,0,0) rotateY(0deg) scale(1)",              filter: "blur(0px)" },
          "100%": { opacity: "0", transform: "perspective(1600px) translate3d(-6%,0,-150px) rotateY(-6deg) scale(0.97)",   filter: "blur(8px)" },
        },
        "slide-exit-back": {
          "0%":   { opacity: "1", transform: "perspective(1600px) translate3d(0,0,0) rotateY(0deg) scale(1)",              filter: "blur(0px)" },
          "100%": { opacity: "0", transform: "perspective(1600px) translate3d(6%,0,-150px) rotateY(6deg) scale(0.97)",     filter: "blur(8px)" },
        },
        /* Slow drift while a slide rests under autoplay — the trick that
           makes a reel of stills read as footage. Consecutive steps alternate
           push-in and pull-out so the reel never feels mechanical. */
        "slide-drift": {
          from: { transform: "scale(1)" },
          to:   { transform: "scale(1.022)" },
        },
        "slide-drift-out": {
          from: { transform: "scale(1.022)" },
          to:   { transform: "scale(1)" },
        },
        /* The window itself takes a small counter-move on each step, so the
           frame and its contents travel at different speeds — parallax, and
           the thing that sells the shot as a camera move rather than a swap. */
        "cam-pan-fwd": {
          "0%":   { transform: "translate3d(0,0,0)" },
          "32%":  { transform: "translate3d(-9px,0,0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
        "cam-pan-back": {
          "0%":   { transform: "translate3d(0,0,0)" },
          "32%":  { transform: "translate3d(9px,0,0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
        /* Viewfinder brackets snapping to the corners as the shot lands. */
        "bracket-in": {
          "0%":   { opacity: "0", transform: "scale(1.5)" },
          "35%":  { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(1)" },
        },
        /* Autoplay timer drawn around the play button. */
        "ring-sweep": {
          from: { strokeDashoffset: "1" },
          to:   { strokeDashoffset: "0" },
        },
        /* Step number rolls over like an odometer. */
        "count-roll": {
          "0%":   { opacity: "0", transform: "translateY(70%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        /* A crisp leading edge of light that travels with the new slide. */
        "sheen-swipe": {
          "0%":   { transform: "translateX(-130%) skewX(-12deg)", opacity: "0" },
          "18%":  { opacity: "1" },
          "80%":  { opacity: "0.12" },
          "100%": { transform: "translateX(240%) skewX(-12deg)",  opacity: "0" },
        },
        "sheen-swipe-back": {
          "0%":   { transform: "translateX(240%) skewX(12deg)",   opacity: "0" },
          "18%":  { opacity: "1" },
          "80%":  { opacity: "0.12" },
          "100%": { transform: "translateX(-130%) skewX(12deg)",  opacity: "0" },
        },
        /* The frame acknowledges the step with a brief brand-coloured ring. */
        "frame-pulse": {
          "0%":   { boxShadow: "inset 0 0 0 0px rgba(0,166,81,0)" },
          "30%":  { boxShadow: "inset 0 0 0 2px rgba(0,166,81,0.55)" },
          "100%": { boxShadow: "inset 0 0 0 0px rgba(0,166,81,0)" },
        },
        "caption-rise": {
          "0%":   { opacity: "0", transform: "translateY(9px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        /* Autoplay timer inside the active progress segment. */
        "rail-fill": {
          from: { transform: "scaleX(0)" },
          to:   { transform: "scaleX(1)" },
        },
        /* Ambient colour bleed behind the screenshot — settles at partial
           opacity, so it cannot animate to a plain 1. */
        "ambient-in": {
          from: { opacity: "0" },
          to:   { opacity: "0.55" },
        },
        "soft-fade": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
      },
      animation: {
        "flow-dash":    "flow-dash 1.6s linear infinite",
        "pulse-soft":   "pulse-soft 3s ease-in-out infinite",
        drift:          "drift 7s ease-in-out infinite",
        "drift-slow":   "drift-slow 10s ease-in-out infinite",
        orbit:          "orbit 26s linear infinite",
        marquee:        "marquee 32s linear infinite",
        "arrow-travel": "arrow-travel 1.8s cubic-bezier(0.4,0,0.6,1) infinite",
        "sheen-loop":     "sheen-loop 4.5s ease-in-out infinite",
        "chevron-pulse":  "chevron-pulse 1.2s ease-in-out infinite",

        "slide-enter-fwd":  "slide-enter-fwd 780ms cubic-bezier(0.16,1,0.3,1) both",
        "slide-enter-back": "slide-enter-back 780ms cubic-bezier(0.16,1,0.3,1) both",
        "slide-exit-fwd":   "slide-exit-fwd 520ms cubic-bezier(0.62,0,0.34,1) both",
        "slide-exit-back":  "slide-exit-back 520ms cubic-bezier(0.62,0,0.34,1) both",
        /* Duration is overridden inline to match the autoplay interval. */
        "slide-drift":      "slide-drift 5200ms ease-out both",
        "slide-drift-out":  "slide-drift-out 5200ms ease-out both",
        "ring-sweep":       "ring-sweep 5200ms linear both",
        /* Held for exactly as long as the exit state lives — the class is
           removed when it clears, so a longer pan would be cut short. */
        "cam-pan-fwd":      "cam-pan-fwd 520ms cubic-bezier(0.33,1,0.68,1) both",
        "cam-pan-back":     "cam-pan-back 520ms cubic-bezier(0.33,1,0.68,1) both",
        "bracket-in":       "bracket-in 820ms cubic-bezier(0.16,1,0.3,1) both",
        "count-roll":       "count-roll 420ms cubic-bezier(0.16,1,0.3,1) both",
        "sheen-swipe":      "sheen-swipe 860ms cubic-bezier(0.22,1,0.36,1) both",
        "sheen-swipe-back": "sheen-swipe-back 860ms cubic-bezier(0.22,1,0.36,1) both",
        "frame-pulse":      "frame-pulse 780ms ease-out both",
        "caption-rise":     "caption-rise 440ms cubic-bezier(0.22,1,0.36,1) both",
        /* Duration is overridden inline to match the autoplay interval. */
        "rail-fill":        "rail-fill 6000ms linear both",
        "ambient-in":       "ambient-in 900ms ease-out both",
        "soft-fade":        "soft-fade 220ms ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
