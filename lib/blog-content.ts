/**
 * Normalises post HTML before it is stored.
 *
 * Word and Google Docs write their heading styles as *inline colours* on plain
 * paragraphs. Pasting that into the editor keeps the colour and loses the
 * structure, so an article arrives as fifteen `<p>` tags: the site's heading
 * typography never applies, and — because the table of contents is built from
 * `<h2>` — the article renders with no contents rail at all.
 *
 * This turns that pasted markup back into real headings and strips the foreign
 * palette, so every post picks up the site's own typography regardless of where
 * the text was written.
 */

/** Word's heading palette, normalised to lowercase hex. */
const HEADING_COLORS: Record<string, "h2" | "h3"> = {
  "2e74b5": "h2", // Heading 1
  "2f5496": "h2", // Heading 1, newer Office theme
  "1f4d78": "h3", // Heading 2
  "1f3864": "h3", // Heading 2, newer Office theme
  "365f91": "h2", // Heading 1, legacy
  "4f81bd": "h2", // accent, legacy
};

/** A run of body text that merely happens to be coloured is not a heading. */
const MAX_HEADING_LENGTH = 120;

function toHex(color: string): string {
  const rgb = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgb) {
    return [rgb[1], rgb[2], rgb[3]]
      .map((n) => Number(n).toString(16).padStart(2, "0"))
      .join("")
      .toLowerCase();
  }
  const hex = color.match(/#([0-9a-f]{6})/i);
  return hex ? hex[1].toLowerCase() : "";
}

/** Drops `<span>` wrappers and any inline colour/background/font declarations. */
function stripInlineStyling(html: string): string {
  return html
    .replace(/<\/?span[^>]*>/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "")
    .replace(/\sstyle='[^']*'/gi, "")
    .replace(/<\/?font[^>]*>/gi, "")
    .replace(/&nbsp;/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function plainText(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
}

export function normalizeBlogHtml(html: string): string {
  if (!html) return "";

  /* The page renders the post title as the document's h1, so an h1 in the body
     would be a second one — bad for SEO, and invisible to the h2-based TOC. */
  let out = html.replace(/<(\/?)h1(\s[^>]*)?>/gi, (_m, slash, attrs) => `<${slash}h2${attrs ?? ""}>`);

  out = out.replace(/<p([^>]*)>([\s\S]*?)<\/p>/gi, (_match, attrs: string, inner: string) => {
    const text = plainText(inner);
    if (!text) return ""; // Word leaves a trail of empty spacer paragraphs

    const colorMatch = `${attrs}${inner}`.match(/color:\s*([^;"']+)/i);
    const level = colorMatch ? HEADING_COLORS[toHex(colorMatch[1])] : undefined;
    const body = stripInlineStyling(inner);

    return level && text.length <= MAX_HEADING_LENGTH
      ? `<${level}>${body}</${level}>`
      : `<p>${body}</p>`;
  });

  /* Headings authored properly in the editor still carry paste styling. */
  out = out.replace(/<(h2|h3|h4)([^>]*)>([\s\S]*?)<\/\1>/gi, (_m, tag: string, _attrs: string, inner: string) =>
    `<${tag}>${stripInlineStyling(inner)}</${tag}>`);

  return out.replace(/\n{2,}/g, "\n").trim();
}
