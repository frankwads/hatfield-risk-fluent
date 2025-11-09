import { useEffect, useState } from "react";

interface Dot {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  outlined?: boolean;
}

interface ScrollDotsProps {
  density?: "low" | "medium" | "high";
  side?: "left" | "right";
}

const ScrollDots = ({ density = "low", side = "left" }: ScrollDotsProps) => {
  const [dots, setDots] = useState<Dot[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dotCount = density === "low" ? 5 : density === "medium" ? 8 : 12;
    const generatedDots: Dot[] = [];

    for (let i = 0; i < dotCount; i++) {
      generatedDots.push({
        id: i,
        x: side === "left" ? Math.random() * 15 : 85 + Math.random() * 15,
        y: Math.random() * 100,
        size: Math.random() * 20 + 8,
        opacity: Math.random() * 0.4 + 0.3,
        outlined: Math.random() > 0.6,
      });
    }

    setDots(generatedDots);
  }, [density, side]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Fade in after minimal scroll
      if (scrollPosition > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full transition-all duration-700 ease-out"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: isVisible ? dot.opacity : 0,
            transform: isVisible ? "scale(1)" : "scale(0.5)",
            backgroundColor: dot.outlined ? "transparent" : "hsl(var(--accent))",
            border: dot.outlined ? "2px solid hsl(var(--accent) / 0.4)" : "none",
            transitionDelay: `${dot.id * 80}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default ScrollDots;
