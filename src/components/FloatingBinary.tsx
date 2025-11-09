import { useEffect, useState } from "react";

interface BinaryDigit {
  id: number;
  value: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

interface FloatingBinaryProps {
  count?: number;
}

const FloatingBinary = ({ count = 20 }: FloatingBinaryProps) => {
  const [digits, setDigits] = useState<BinaryDigit[]>([]);

  useEffect(() => {
    const newDigits: BinaryDigit[] = [];
    for (let i = 0; i < count; i++) {
      newDigits.push({
        id: i,
        value: Math.random() > 0.5 ? "1" : "0",
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 5,
      });
    }
    setDigits(newDigits);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {digits.map((digit) => (
        <div
          key={digit.id}
          className="absolute text-[10px] text-[hsl(215,65%,48%)]/20 font-mono animate-float"
          style={{
            left: `${digit.x}%`,
            top: `${digit.y}%`,
            animation: `float ${digit.duration}s ease-in-out infinite`,
            animationDelay: `${digit.delay}s`,
          }}
        >
          {digit.value}
        </div>
      ))}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.15;
          }
          25% {
            transform: translate(20px, -30px) rotate(5deg);
            opacity: 0.3;
          }
          50% {
            transform: translate(-15px, -60px) rotate(-5deg);
            opacity: 0.15;
          }
          75% {
            transform: translate(15px, -30px) rotate(3deg);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingBinary;
