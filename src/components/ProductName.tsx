// ProductName.tsx - the HatfieldIQ / HatfieldRISQ wordmark, drawn as text.
//
// 2026-11-12 (Frank): "can we be consistent with font type and color for
// HatfieldRISQ and HatfieldIQ". ONE definition of how a product name looks
// when it is shown as the wordmark: the page's sans face, semibold,
// "Hatfield" in the colour of the text around it and "IQ" / "RISQ" in
// Hatfield blue. Used by the product-page headers, by headlines and closing
// bands that name a product, and by the homepage ticker and hero panels.
// Running paragraphs, tables and bullet lists keep the plain name.
//
// 2026-11-13 (Frank): ONE BRAND BLUE ("let's go option B"). "IQ" / "RISQ"
// are now drawn in the site's brand blue, #2979FF, on every background. The
// colour is defined once, as --brand-blue in src/index.css, and read here.
// Before today this file held two blues of its own: #5A8CFF on navy
// backgrounds (onDark) and #2F6BFF on light ones. Both are retired; the one
// brand blue reads on navy and on white alike.
// The onDark prop is still accepted, so every existing caller keeps
// compiling, but it no longer changes anything.
//
// 2026-11-14 (Frank): "yes let's make one step bolder". "IQ" / "RISQ" are
// drawn one weight step heavier than "Hatfield": bold (700) next to its
// semibold (600). In the brand blue on a dark background the endings had
// looked thinner than the white text beside them. Applies wherever the
// wordmark is drawn: homepage, product-page headers, About page buttons.
//
//   product  "IQ" or "RISQ"
//   tm       add the trademark symbol (wordmark positions only)
//   onDark   accepted for existing callers; no longer changes the colour
//   className  extra classes for placement (for example a text colour)

type ProductNameProps = {
  product: "IQ" | "RISQ";
  tm?: boolean;
  onDark?: boolean;
  className?: string;
};

const PRODUCT_NAME_FONT = 'Inter, "Segoe UI", Helvetica, Arial, sans-serif';

const ProductName = ({
  product,
  tm = false,
  className = "",
}: ProductNameProps) => (
  <span
    className={`whitespace-nowrap font-semibold normal-case tracking-[-0.01em] ${className}`}
    style={{ fontFamily: PRODUCT_NAME_FONT }}
  >
    Hatfield
    <span className="font-bold text-[color:hsl(var(--brand-blue))]">{product}</span>
    {tm && (
      <sup className="ml-[2px] text-[0.42em] font-normal opacity-70">
        &trade;
      </sup>
    )}
  </span>
);

export default ProductName;