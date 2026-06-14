import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // sophisticated light neutrals
        canvas: "#F7F8F6", // soft off-white (warm)
        surface: "#F3F4F2", // warm gray
        mist: "#EBEFF4", // cool blue-gray tint
        sage: "#E9EEE8", // soft sage
        sand: "#F2ECE2", // warm sand
        panel: "#FFFFFF",
        // text
        ink: "#0F1B2D", // deep navy
        "ink-2": "#33405A", // muted navy
        muted: "#5E6A7D", // blue-gray secondary
        line: "#E4E7E3", // hairline
        // accent — muted blue (no teal)
        accent: {
          DEFAULT: "#2B4A7F",
          600: "#34568B",
          400: "#6E8CBE",
          soft: "#DCE6F4",
          wash: "#EEF3FA",
        },
        // pastel mesh stops
        mesh: {
          blue: "#CBD9EF",
          sage: "#D8E4D5",
          sand: "#EFE5D4",
          lilac: "#DEDAEC",
          peach: "#F1DFD4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-geist)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-hero": [
          "clamp(3rem, 6.6vw, 6.5rem)",
          { lineHeight: "0.96", letterSpacing: "-0.04em" },
        ],
        "display-1": [
          "clamp(2.5rem, 5vw, 4.5rem)",
          { lineHeight: "1.0", letterSpacing: "-0.034em" },
        ],
        "display-2": [
          "clamp(2rem, 3.4vw, 3.4rem)",
          { lineHeight: "1.04", letterSpacing: "-0.03em" },
        ],
        "display-3": [
          "clamp(1.6rem, 2.4vw, 2.25rem)",
          { lineHeight: "1.1", letterSpacing: "-0.024em" },
        ],
        lead: ["1.275rem", { lineHeight: "1.62", letterSpacing: "-0.011em" }],
      },
      maxWidth: { shell: "1500px", "shell-wide": "1600px", prose: "48rem" },
      borderRadius: { xl2: "1.25rem", xl3: "1.75rem", xl4: "2.25rem" },
      boxShadow: {
        soft: "0 1px 2px rgba(15,27,45,0.04), 0 10px 30px rgba(15,27,45,0.06)",
        float:
          "0 8px 24px rgba(15,27,45,0.08), 0 28px 64px rgba(15,27,45,0.10)",
        glow: "0 30px 80px rgba(43,74,127,0.22)",
        glass:
          "0 6px 28px rgba(15,27,45,0.08), inset 0 1px 0 rgba(255,255,255,0.75)",
        ring: "0 0 0 1px rgba(15,27,45,0.05)",
      },
      keyframes: {
        "flow-dash": { to: { strokeDashoffset: "-28" } },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "drift-slow": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-14px) translateX(6px)" },
        },
        "orbit": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "flow-dash": "flow-dash 1.6s linear infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        drift: "drift 7s ease-in-out infinite",
        "drift-slow": "drift-slow 10s ease-in-out infinite",
        orbit: "orbit 26s linear infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
