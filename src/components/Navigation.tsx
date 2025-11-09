import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logoWhite from "@/assets/h-logo-white.png";
import logoBlack from "@/assets/h-logo-black.png";

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkText, setIsDarkText] = useState(false);

  useEffect(() => {
    // Check if we're on an article page
    const isArticlePage = location.pathname.startsWith('/insights/');
    
    if (isArticlePage) {
      setIsDarkText(true);
      return;
    }

    const handleScroll = () => {
      const statSection = document.querySelector('[data-stat-section]');
      const lightSection = document.querySelector('[data-light-section]');
      
      const navHeight = 80;
      
      // Check stat section overlap
      if (statSection) {
        const rect = statSection.getBoundingClientRect();
        const isOverlappingStatSection = rect.top < navHeight && rect.bottom > 0;
        
        if (isOverlappingStatSection) {
          setIsDarkText(true);
          return;
        }
      }
      
      // Check light section overlap
      if (lightSection) {
        const rect = lightSection.getBoundingClientRect();
        const isOverlappingLightSection = rect.top < navHeight && rect.bottom > 0;
        
        if (isOverlappingLightSection) {
          setIsDarkText(true);
          return;
        }
      }
      
      setIsDarkText(false);
    };

    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial state
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsDarkText(false);
    }
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Capabilities", path: "/#capabilities" },
    { name: "Insights", path: "/insights" },
    { name: "About", path: "/about" },
    { name: "Consulting", path: "/consulting" },
  ];

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (path === "/#capabilities") {
      e.preventDefault();
      if (location.pathname === "/") {
        document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = "/#capabilities";
      }
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/15 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex flex-col">
            <div className={`text-2xl font-bold transition-colors duration-300 ${isDarkText ? 'text-[hsl(215,45%,15%)]' : 'text-foreground'}`}>
              Hatfield<span className={isDarkText ? 'text-[hsl(215,65%,48%)]' : 'text-accent'}>.ai</span>
            </div>
            <div className={`text-xs font-extralight -mt-1 transition-colors duration-300 ${isDarkText ? 'text-[hsl(215,45%,25%)]' : 'text-muted-foreground'}`}>
              The intelligent choice.
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isActive(item.path) || (item.path === "/#capabilities" && location.pathname === "/" && location.hash === "#capabilities")
                    ? isDarkText ? "text-[hsl(215,65%,48%)]" : "text-accent"
                    : isDarkText ? "text-[hsl(215,45%,15%)] hover:text-[hsl(215,65%,48%)]" : "text-foreground hover:text-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild variant="outline" size="sm" className={`bg-transparent border-2 border-gray-400 hover:bg-gray-400/10 transition-colors duration-300 ${isDarkText ? 'text-gray-900 border-gray-900' : 'text-foreground'}`}>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <img 
              src={isDarkText ? logoBlack : logoWhite} 
              alt="Hatfield Advisory Logo" 
              className="h-10 w-auto transition-opacity duration-300"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-300 ${isDarkText ? 'text-[hsl(215,45%,15%)]' : 'text-foreground'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
                onClick={(e) => handleNavClick(e, item.path)}
                className={`block py-2 text-sm font-medium ${
                  isActive(item.path) ? "text-accent" : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild variant="outline" className="w-full mt-4 bg-transparent border-2 border-gray-400" size="sm">
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
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
