/**
 * Brand asset URLs — ONE place to change when assets are updated.
 * The Cloudinary path-based transformations (w_, h_, c_, f_) resize/convert
 * the image at the CDN edge so browsers receive the exact pixel dimensions
 * they need without downloading an oversized file.
 */

export const BRAND_LOGO_URL =
  "https://res.cloudinary.com/dtg3lepr4/image/upload/v1781849582/IncentIQ_Logo_png_wwixwf.png";

/** 32 × 32 — browser tab favicon (c_fit keeps full logo without cropping) */
export const BRAND_FAVICON_32 =
  "https://res.cloudinary.com/dtg3lepr4/image/upload/w_32,h_32,c_fit,f_png/v1781849582/IncentIQ_Logo_png_wwixwf.png";

/** 180 × 180 — Apple touch icon (home screen on iOS) */
export const BRAND_FAVICON_180 =
  "https://res.cloudinary.com/dtg3lepr4/image/upload/w_180,h_180,c_fit,f_png/v1781849582/IncentIQ_Logo_png_wwixwf.png";
