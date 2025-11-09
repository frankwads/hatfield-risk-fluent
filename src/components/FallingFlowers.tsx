import { useEffect, useState } from "react";
import jacarandaFlower from "@/assets/jacaranda-flower.png";

interface Flower {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  delay: number;
}

interface FallingFlowersProps {
  count?: number;
}

const FallingFlowers = ({ count = 8 }: FallingFlowersProps) => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const generatedFlowers: Flower[] = [];

    for (let i = 0; i < count; i++) {
      generatedFlowers.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 20,
        opacity: Math.random() * 0.4 + 0.3,
        rotation: Math.random() * 360,
        delay: i * 0.15,
      });
    }

    setFlowers(generatedFlowers);
  }, [count]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollPosition / documentHeight, 1);
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {flowers.map((flower) => {
        const fallDistance = scrollProgress * 120;
        const swayAmount = Math.sin(scrollProgress * Math.PI * 2 + flower.id) * 20;
        
        return (
          <img
            key={flower.id}
            src={jacarandaFlower}
            alt=""
            className="absolute transition-all duration-300 ease-out"
            style={{
              left: `${flower.x}%`,
              top: `${flower.y}%`,
              width: `${flower.size}px`,
              height: `${flower.size}px`,
              opacity: scrollProgress > 0.05 ? flower.opacity : 0,
              transform: `
                translateY(${fallDistance}vh) 
                translateX(${swayAmount}px) 
                rotate(${flower.rotation + scrollProgress * 180}deg)
                scale(${scrollProgress > 0.05 ? 1 : 0.5})
              `,
              transitionDelay: `${flower.delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default FallingFlowers;
