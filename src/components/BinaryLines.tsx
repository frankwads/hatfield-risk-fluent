import { useEffect, useState } from "react";

interface BinaryLine {
  id: number;
  content: string;
  y: number;
  duration: number;
  delay: number;
}

const BinaryLines = () => {
  const [lines, setLines] = useState<BinaryLine[]>([]);

  useEffect(() => {
    const generateLine = () => {
      const length = Math.floor(Math.random() * 80) + 60;
      let content = "";
      for (let i = 0; i < length; i++) {
        content += Math.random() > 0.5 ? "1 " : "0 ";
      }
      return content;
    };

    const newLines: BinaryLine[] = [];
    for (let i = 0; i < 8; i++) {
      newLines.push({
        id: i,
        content: generateLine(),
        y: (i * 100) / 8 + Math.random() * 10,
        duration: 80 + Math.random() * 40,
        delay: Math.random() * 5,
      });
    }
    setLines(newLines);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map((line) => (
        <div
          key={line.id}
          className="absolute whitespace-nowrap text-white font-mono text-[8px] tracking-wider"
          style={{
            top: `${line.y}%`,
            animation: `scroll-left ${line.duration}s linear infinite`,
            animationDelay: `${line.delay}s`,
            opacity: 0.06,
          }}
        >
          {line.content}
        </div>
      ))}
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(100vw);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default BinaryLines;
