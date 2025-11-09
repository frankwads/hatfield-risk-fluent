import { useState } from "react";

interface BinaryDigit {
  id: number;
  value: string;
  x: number;
  y: number;
}

interface HoverBinaryLogoProps {
  src: string;
  alt: string;
  className?: string;
}

const HoverBinaryLogo = ({ src, alt, className }: HoverBinaryLogoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [digits, setDigits] = useState<BinaryDigit[]>([]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    const newDigits: BinaryDigit[] = [];
    for (let i = 0; i < 8; i++) {
      newDigits.push({
        id: Date.now() + i,
        value: Math.random() > 0.5 ? "1" : "0",
        x: 50 + (Math.random() - 0.5) * 40,
        y: 50 + (Math.random() - 0.5) * 40,
      });
    }
    setDigits(newDigits);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => setDigits([]), 1000);
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={src} alt={alt} className={className} />
      {isHovered && digits.map((digit) => (
        <div
          key={digit.id}
          className="absolute text-sm font-bold text-[hsl(215,65%,48%)] pointer-events-none animate-float-out"
          style={{
            left: `${digit.x}%`,
            top: `${digit.y}%`,
          }}
        >
          {digit.value}
        </div>
      ))}
      <style>{`
        @keyframes float-out {
          0% {
            transform: translate(0, 0) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(1);
            opacity: 0;
          }
        }
        .animate-float-out {
          --tx: ${Math.random() * 60 - 30}px;
          --ty: ${Math.random() * -80 - 20}px;
          animation: float-out 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HoverBinaryLogo;
