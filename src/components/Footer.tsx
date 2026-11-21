// 2026-11-12 (Frank): "tm Hatfield.ai throughout" - the company name in the
// copyright line carries the trademark symbol.
// 2026-11-18 (Frank, go-live list item 7): add Terms and Privacy links to the
// footer. Terms points at the public User Agreement page (signal.hatfield.ai/terms,
// Frank's 2026-11-17 ruling). The privacy notice is being prepared offline, so its
// URL is not known yet: PRIVACY_URL is left empty and the Privacy link is hidden
// until a real address is filled in, so the site never links to a missing page.
// This Footer is shared by every page, so the links show site-wide.
import logoWhite from "@/assets/h-logo-white.png";

const TERMS_URL = "https://signal.hatfield.ai/terms";
// 2026-11-20 (Frank): the privacy notice is published at www.hatfield.ai/privacy
// (src/pages/Privacy.tsx), so the Privacy link now shows on every page.
const PRIVACY_URL = "https://www.hatfield.ai/privacy";

const linkClass =
  "hover:text-white underline-offset-4 hover:underline transition-colors";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--blue-darker))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center justify-center gap-3 text-muted-foreground">
          <img 
            src={logoWhite} 
            alt="Hatfield Advisory Logo" 
            className="h-6 w-auto"
          />
          <p>&copy; {currentYear} Hatfield Advisory LLC DBA Hatfield.ai&trade;. All rights reserved.</p>
          <nav aria-label="Legal" className="flex items-center gap-3">
            <span aria-hidden="true">&middot;</span>
            <a
              href={TERMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Terms
            </a>
            {PRIVACY_URL && (
              <>
                <span aria-hidden="true">&middot;</span>
                <a
                  href={PRIVACY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Privacy
                </a>
              </>
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;