import logoWhite from "@/assets/h-logo-white.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--blue-darker))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center gap-3 text-muted-foreground">
          <img 
            src={logoWhite} 
            alt="Hatfield Advisory Logo" 
            className="h-6 w-auto"
          />
          <p>&copy; {currentYear} Hatfield Advisory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
