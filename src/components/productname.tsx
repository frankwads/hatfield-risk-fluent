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
//   product  "IQ" or "RISQ"
//   tm       add the trademark symbol (wordmark positions only)
//   onDark   lighter blue, for navy backgrounds
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
  onDark = false,
  className = "",
}: ProductNameProps) => (
  <span
    className={`whitespace-nowrap font-semibold normal-case tracking-[-0.01em] ${className}`}
    style={{ fontFamily: PRODUCT_NAME_FONT }}
  >
    Hatfield
    <span className={onDark ? "text-[#5A8CFF]" : "text-[#2F6BFF]"}>
      {product}
    </span>
    {tm && (
      <sup className="ml-[2px] text-[0.42em] font-normal opacity-70">
        &trade;
      </sup>
    )}
  </span>
);

export default ProductName;