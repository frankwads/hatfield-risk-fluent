import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logoWhite from "@/assets/h-logo-white.png";
import logoBlack from "@/assets/h-logo-black.png";

// 2026-10-05 (Frank): "when i click on capabilities top header and then
// arrow back in browser, instead of taking back to homepage, i go back to
// search engine".
// Cause: on the homepage, handleNavClick cancelled the Capabilities link
// and scrolled with scrollIntoView, so no history entry was recorded and
// the address never became /#capabilities. Browser Back therefore left the
// site. Off the homepage it forced a full page reload instead.
// Fix (rev 2): the scrolling for /#capabilities lives in THIS file, in one
// place, for every link that goes there.
//   - The Capabilities link is a plain router Link to /#capabilities, like
//     every other item, so it records a history entry and needs no reload.
//   - The hash rule below (useEffect on location) does the scrolling:
//       on "/" with #capabilities -> scroll smoothly to Capabilities
//         (header click, the homepage "Explore Capabilities" button,
//         Forward button, a shared link, or arriving from another page
//         that shows this menu);
//       on "/" with no hash after a navigation -> jump to the top
//         (browser Back from Capabilities, or clicking Home).
//     The first render with no hash is left alone, so a normal page load
//     or refresh keeps the browser's own scroll position. The scroll waits
//     one animation frame so the page has laid out first.
//   Example: Google -> hatfield.ai -> click Capabilities (address becomes
//   /#capabilities, page scrolls) -> Back (address "/", page at top) ->
//   Back (Google).
// 2026-10-06 (Frank): the homepage "Explore Capabilities" button
// (src/pages/Index.tsx) is now also a link to /#capabilities and relies on
// this same rule, so Back behaves the same from both (confirmed by Frank
// 2026-10-06). The earlier "Known limit" note about that button is
// resolved and removed. The SIGNAL page (/signal) has its own header and
// does not show this menu (seen 2026-10-06), so this rule only runs on
// pages that render <Navigation />.
// Also: Home and Capabilities are no longer highlighted together. Home is
// active on "/" only when the address is not /#capabilities (see isActive).
// The mobile menu now closes on any item tap; before, only Capabilities
// closed it, which mattered because it is the one item that stays on the
// same page.

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkText, setIsDarkText] = useState(false);
  const firstRunRef = useRef(true);

  // 2026-10-05: the Capabilities hash rule (see the header comment).
  useEffect(() => {
    const isFirstRun = firstRunRef.current;
    firstRunRef.current = false;
    if (location.pathname !== "/") return;

    let frame = 0;
    if (location.hash === "#capabilities") {
      frame = window.requestAnimationFrame(() => {
        document
          .getElementById("capabilities")
          ?.scrollIntoView({ behavior: "smooth" });
      });
    } else if (location.hash === "" && !isFirstRun) {
      frame = window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    }

    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  useEffect(() => {
    // Check if we're on an article page
    const isArticlePage = location.pathname.startsWith("/insights/");

    if (isArticlePage) {
      setIsDarkText(true);
      return;
    }

    const handleScroll = () => {
      const statSection = document.querySelector("[data-stat-section]");
      const lightSection = document.querySelector("[data-light-section]");

      const navHeight = 80;

      // Check stat section overlap
      if (statSection) {
        const rect = statSection.getBoundingClientRect();
        const isOverlappingStatSection =
          rect.top < navHeight && rect.bottom > 0;

        if (isOverlappingStatSection) {
          setIsDarkText(true);
          return;
        }
      }

      // Check light section overlap
      if (lightSection) {
        const rect = lightSection.getBoundingClientRect();
        const isOverlappingLightSection =
          rect.top < navHeight && rect.bottom > 0;

        if (isOverlappingLightSection) {
          setIsDarkText(true);
          return;
        }
      }

      setIsDarkText(false);
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsDarkText(false);
    }
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Capabilities", path: "/#capabilities" },
    { name: "SIGNAL", path: "/signal" },
    { name: "Insights", path: "/insights" },
    { name: "About", path: "/about" },
    { name: "Consulting", path: "/consulting" },
  ];

  // 2026-10-05: Capabilities is active only at /#capabilities; Home is
  // active on "/" only when the address is not /#capabilities.
  const isActive = (path: string) => {
    const onCapabilities =
      location.pathname === "/" && location.hash === "#capabilities";
    if (path === "/#capabilities") return onCapabilities;
    if (path === "/") return location.pathname === "/" && !onCapabilities;
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/15 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Hatfield.ai Brand */}
          <Link to="/" className="flex flex-col">
            <div
              className={`text-2xl font-bold transition-colors duration-300 ${
                isDarkText
                  ? "text-[hsl(215,45%,15%)]"
                  : "text-foreground"
              }`}
            >
              Hatfield
              <span
                className={
                  isDarkText
                    ? "text-[hsl(215,65%,48%)]"
                    : "text-accent"
                }
              >
                .ai
              </span>
            </div>

            <div
              className={`text-xs font-extralight -mt-1 transition-colors duration-300 ${
                isDarkText
                  ? "text-[hsl(215,45%,25%)]"
                  : "text-muted-foreground"
              }`}
            >
              The intelligent choice.
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isActive(item.path)
                    ? isDarkText
                      ? "text-[hsl(215,65%,48%)]"
                      : "text-accent"
                    : isDarkText
                      ? "text-[hsl(215,45%,15%)] hover:text-[hsl(215,65%,48%)]"
                      : "text-foreground hover:text-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Contact */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className={`bg-transparent border-2 border-gray-400 hover:bg-gray-400/10 transition-colors duration-300 ${
                isDarkText
                  ? "text-gray-900 border-gray-900"
                  : "text-foreground"
              }`}
            >
              <Link to="/contact">Contact Us</Link>
            </Button>

            {/* Hatfield Advisory Mark */}
            <img
              src={isDarkText ? logoBlack : logoWhite}
              alt="Hatfield Advisory Logo"
              className="h-10 w-auto transition-opacity duration-300"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-300 ${
              isDarkText
                ? "text-[hsl(215,45%,15%)]"
                : "text-foreground"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  isActive(item.path)
                    ? "text-accent"
                    : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <Button
              asChild
              variant="outline"
              className="w-full mt-4 bg-transparent border-2 border-gray-400"
              size="sm"
            >
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;