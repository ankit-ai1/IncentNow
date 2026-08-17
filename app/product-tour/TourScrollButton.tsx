"use client";

export function TourScrollButton() {
  return (
    <div className="mt-8">
      <button
        onClick={() => {
          document.getElementById("tour-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
          /* Decoupled from the carousel, which lives further down the tree
             under a server component. */
          window.dispatchEvent(new CustomEvent("incentiq:play-tour"));
        }}
        className="group inline-flex items-center justify-center gap-2.5 rounded-full py-3.5 pl-6 pr-7 text-[0.92rem] font-semibold text-white shadow-[0_2px_10px_rgba(15,46,36,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,166,81,0.40)]"
        style={{ backgroundColor: "#00A651" }}
      >
        <span
          aria-hidden
          className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-transform duration-200 group-hover:scale-110"
        >
          <svg className="h-2.5 w-2.5 translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5l11 7-11 7z" />
          </svg>
        </span>
        Let&apos;s get started
      </button>
    </div>
  );
}
