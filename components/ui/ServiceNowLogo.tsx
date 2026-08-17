import type { ReactNode } from "react";

const STORE_URL = "https://store.servicenow.com/store/app/3bff6c3997210f1876b932471153af36";

/**
 * Official wordmark, cropped to its ink bounds (the source asset carries a lot
 * of transparent padding, which would otherwise throw off inline alignment).
 * f_auto/q_auto lets Cloudinary serve webp/avif with the alpha channel intact.
 */
const MARK_SRC =
  "https://res.cloudinary.com/dtg3lepr4/image/upload/c_crop,x_6,y_30,w_616,h_92/f_auto,q_auto/v1781968539/servicenow_logo-removebg-preview_s6fuug.png";

const MARK_W = 616;
const MARK_H = 92;

/**
 * "servicenow" is set entirely in lowercase, so it reads as running text only
 * when its x-height matches the surrounding copy — not its cap-height. Within
 * the crop the x-height band is 63 of the 92px, so we scale the whole mark up
 * from the target x-height. Everything is in `em`, so the logo tracks whatever
 * font-size it is dropped into (13px footer links through the hero lead).
 */
const X_HEIGHT_RATIO = 63 / MARK_H;
const TARGET_X_HEIGHT = 0.53; // em — x-height of Geist/Inter at the same size
const MARK_HEIGHT_EM = TARGET_X_HEIGHT / X_HEIGHT_RATIO;

const markStyle: React.CSSProperties = {
  display: "inline-block",
  height: `${MARK_HEIGHT_EM.toFixed(3)}em`,
  width: "auto",
  verticalAlign: "baseline",
};

function Mark() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={MARK_SRC}
      alt="ServiceNow"
      width={MARK_W}
      height={MARK_H}
      loading="eager"
      decoding="async"
      style={markStyle}
    />
  );
}

export function ServiceNowLogo({ size: _size }: { size?: string }) {
  return (
    <a
      href={STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
      aria-label="ServiceNow"
    >
      <Mark />
    </a>
  );
}

export function withLogo(text: string, _size?: string): ReactNode {
  const parts = text.split("ServiceNow");
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <Mark />}
        </span>
      ))}
    </>
  );
}
