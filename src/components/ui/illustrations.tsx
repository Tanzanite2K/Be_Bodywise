// Original soft-pink skincare illustrations (SVG) — no third-party imagery.
export function LeafBlob({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 480" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="pb1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFF5F7" /><stop offset="1" stopColor="#F4C6D4" /></linearGradient>
        <radialGradient id="pb2" cx=".3" cy=".25" r=".9"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#F9E3EA" /></radialGradient>
        <linearGradient id="pb3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#F9E3EA" /></linearGradient>
        <linearGradient id="pb4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#E8A5BA" /><stop offset="1" stopColor="#C87996" /></linearGradient>
      </defs>
      <path d="M200 20c110 10 185 100 175 220S290 460 190 460 20 370 25 240 90 10 200 20Z" fill="url(#pb1)" />
      <circle cx="205" cy="230" r="118" fill="url(#pb2)" />
      <circle cx="205" cy="230" r="118" stroke="#fff" strokeOpacity=".9" strokeWidth="2" />
      {/* dropper bottle */}
      <g transform="translate(160 120)">
        <rect x="28" y="0" width="34" height="46" rx="12" fill="url(#pb4)" />
        <rect x="38" y="-26" width="14" height="30" rx="7" fill="#F4C6D4" />
        <rect x="6" y="40" width="78" height="120" rx="26" fill="url(#pb3)" stroke="#F0DCE3" strokeWidth="2" />
        <rect x="22" y="84" width="46" height="46" rx="14" fill="#F9E3EA" />
        <circle cx="45" cy="107" r="8" fill="#E8A5BA" />
        <path d="M16 62c6-10 14-14 22-14" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".9" />
      </g>
      {/* petals */}
      <g transform="translate(70 330) rotate(-25)"><path d="M0 0c28-34 84-34 112 0-28 34-84 34-112 0Z" fill="#F4C6D4" /><path d="M8 0h96" stroke="#fff" strokeWidth="2" opacity=".8" /></g>
      <g transform="translate(250 54) rotate(32)"><path d="M0 0c22-26 66-26 88 0-22 26-66 26-88 0Z" fill="#E8A5BA" /><path d="M6 0h76" stroke="#fff" strokeWidth="2" opacity=".8" /></g>
      <circle cx="302" cy="350" r="24" fill="#E8A5BA" />
      <circle cx="302" cy="350" r="24" stroke="#fff" strokeOpacity=".7" strokeWidth="2" />
      <circle cx="88" cy="128" r="11" fill="#C87996" opacity=".35" />
      <circle cx="330" cy="150" r="7" fill="#fff" opacity=".9" />
    </svg>
  );
}
export function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 220" className={className} fill="none" aria-hidden>
      <path d="M60 215C58 150 62 90 60 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {[40, 80, 120, 160].map((y, i) => (
        <g key={y}>
          <path d={`M60 ${y}c-${24 + i * 2} -6 -40 -22 -42 -38 22 0 40 14 42 38Z`} fill="currentColor" opacity={0.85 - i * 0.1} />
          <path d={`M60 ${y + 14}c${24 + i * 2} -6 40 -22 42 -38 -22 0 -40 14 -42 38Z`} fill="currentColor" opacity={0.7 - i * 0.08} />
        </g>
      ))}
    </svg>
  );
}
