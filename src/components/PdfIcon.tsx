// PdfIcon.tsx - the red-and-white PDF file icon used across the site.
//
// 2026-10-19 (Frank): moved here from src/pages/Index.tsx, where it had
// lived since 2026-10-02 (rev 16, "a it is": a WHITE page with a folded
// corner and a small RED label reading "PDF"), because the NEXUS and
// SIGNAL product pages now show the same icon inside their "overview"
// buttons. One drawing, one file; the pages import it.
//
// The drawing is unchanged. `height` scales it (the 34:42 ratio is kept):
// the homepage panels use the default 44px, the product-page buttons use
// 18px. It is a generic file icon: it deliberately does NOT include
// Adobe's Acrobat swirl, which is Adobe's trademark.

type PdfIconProps = { height?: number };

const PdfIcon = ({ height = 44 }: PdfIconProps) => {
  const width = Math.round((height * 34) / 42);
  return (
    <svg
      viewBox="0 0 34 42"
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 1h16l10 10v27a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3z"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        strokeWidth="1"
      />
      <path d="M21 1l10 10h-7a3 3 0 0 1-3-3V1z" fill="#E2E8F0" />
      <rect x="0" y="21" width="26" height="13" rx="2" fill="#D92D20" />
      <text
        x="13"
        y="31"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="9"
        fontWeight="700"
        fill="#FFFFFF"
      >
        PDF
      </text>
    </svg>
  );
};

export default PdfIcon;