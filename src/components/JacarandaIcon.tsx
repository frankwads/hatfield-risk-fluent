interface JacarandaIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const JacarandaIcon = ({ className, width = 200, height = 200 }: JacarandaIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Ground line */}
      <line
        x1="20"
        y1="180"
        x2="280"
        y2="180"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      
      {/* Main trunks - multiple thick trunks */}
      <path
        d="M 130 180 Q 128 160 130 140 Q 132 120 135 100 Q 138 80 140 60"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 150 180 Q 152 160 150 140 Q 148 120 145 100 Q 143 80 140 60"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 170 180 Q 168 165 166 145 Q 164 125 160 105 Q 158 85 155 65"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Major branches spreading wide - left side */}
      <path
        d="M 135 100 Q 100 90 70 75 Q 50 65 35 55"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 138 85 Q 110 78 85 70 Q 65 62 45 50"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 130 110 Q 95 105 65 95 Q 45 88 28 78"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 132 125 Q 105 120 80 110 Q 60 102 42 92"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Major branches spreading wide - right side */}
      <path
        d="M 145 100 Q 180 90 210 75 Q 230 65 245 55"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 143 85 Q 170 78 195 70 Q 215 62 235 50"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 150 110 Q 185 105 215 95 Q 235 88 252 78"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 148 125 Q 175 120 200 110 Q 220 102 238 92"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Secondary branches - organic curves */}
      <path
        d="M 70 75 Q 60 70 50 60 Q 45 55 40 48"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 65 95 Q 55 88 48 78"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 210 75 Q 220 70 230 60 Q 235 55 240 48"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 215 95 Q 225 88 232 78"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Upper canopy branches */}
      <path
        d="M 140 60 Q 120 55 100 50 Q 85 48 70 45"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 140 60 Q 160 55 180 50 Q 195 48 210 45"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 138 70 Q 115 68 95 62 Q 80 58 65 52"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 142 70 Q 165 68 185 62 Q 200 58 215 52"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Foliage clusters - wider spread */}
      <circle cx="35" cy="55" r="18" fill="currentColor" opacity="0.12" />
      <circle cx="45" cy="50" r="16" fill="currentColor" opacity="0.12" />
      <circle cx="50" cy="60" r="15" fill="currentColor" opacity="0.12" />
      <circle cx="40" cy="48" r="14" fill="currentColor" opacity="0.12" />
      
      <circle cx="70" cy="45" r="17" fill="currentColor" opacity="0.12" />
      <circle cx="85" cy="70" r="16" fill="currentColor" opacity="0.12" />
      <circle cx="65" cy="52" r="15" fill="currentColor" opacity="0.12" />
      
      <circle cx="28" cy="78" r="16" fill="currentColor" opacity="0.12" />
      <circle cx="42" cy="92" r="17" fill="currentColor" opacity="0.12" />
      <circle cx="48" cy="78" r="14" fill="currentColor" opacity="0.12" />
      
      <circle cx="245" cy="55" r="18" fill="currentColor" opacity="0.12" />
      <circle cx="235" cy="50" r="16" fill="currentColor" opacity="0.12" />
      <circle cx="230" cy="60" r="15" fill="currentColor" opacity="0.12" />
      <circle cx="240" cy="48" r="14" fill="currentColor" opacity="0.12" />
      
      <circle cx="210" cy="45" r="17" fill="currentColor" opacity="0.12" />
      <circle cx="195" cy="70" r="16" fill="currentColor" opacity="0.12" />
      <circle cx="215" cy="52" r="15" fill="currentColor" opacity="0.12" />
      
      <circle cx="252" cy="78" r="16" fill="currentColor" opacity="0.12" />
      <circle cx="238" cy="92" r="17" fill="currentColor" opacity="0.12" />
      <circle cx="232" cy="78" r="14" fill="currentColor" opacity="0.12" />
      
      <circle cx="100" cy="50" r="16" fill="currentColor" opacity="0.12" />
      <circle cx="180" cy="50" r="16" fill="currentColor" opacity="0.12" />
      <circle cx="140" cy="45" r="18" fill="currentColor" opacity="0.12" />
      <circle cx="120" cy="55" r="15" fill="currentColor" opacity="0.12" />
      <circle cx="160" cy="55" r="15" fill="currentColor" opacity="0.12" />
      
      {/* Fine detail branches */}
      <path
        d="M 35 55 Q 25 50 20 45"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M 245 55 Q 255 50 260 45"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M 80 110 Q 72 115 65 120"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M 200 110 Q 208 115 215 120"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
};

export default JacarandaIcon;
