import { useId } from "react";

interface LogoMarkProps {
  className?: string;
}

/**
 * The mark spells out the name: "petra" (Greek, stone) as a cairn of
 * stones, "lynn" (Celtic llyn, lake) as the water line beneath, and a leaf
 * growing from the top for the work itself. Same artwork as
 * public/petraslynn-icon.svg.
 */
export function LogoMark({ className = "w-11 h-11" }: LogoMarkProps) {
  // Unique per instance so the navbar and footer marks don't share a gradient id.
  const gradientId = `pl-gold-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Petraslynn">
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="12" y1="8" x2="52" y2="52">
          <stop offset="0" stopColor="#f0dca0" />
          <stop offset="0.5" stopColor="#d4a955" />
          <stop offset="1" stopColor="#b8862f" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="#15271d" />
      <rect x="1.5" y="1.5" width="61" height="61" rx="13.5" fill="none" stroke="#d4a955" strokeOpacity="0.4" />
      <g fill={`url(#${gradientId})`}>
        <ellipse cx="32" cy="44" rx="17" ry="5.2" />
        <ellipse cx="30.5" cy="34.8" rx="11.5" ry="4.3" transform="rotate(-4 30.5 34.8)" />
        <ellipse cx="33" cy="26.8" rx="6.8" ry="3.3" transform="rotate(5 33 26.8)" />
        <path d="M34 23.5c-.5-6.5 3.5-11 11-12.5c.5 7-3.5 11.5-11 12.5z" />
      </g>
      <path d="M35.2 21.8L42.6 13.6" stroke="#15271d" strokeWidth="1.3" strokeLinecap="round" />
      <path
        d="M11 54q5.25-2.8 10.5 0t10.5 0t10.5 0t10.5 0"
        fill="none"
        stroke="#d4a955"
        strokeOpacity="0.75"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className="w-11 h-11 transition-transform duration-300 group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-white text-[1.35rem] font-semibold tracking-tight">
          Petraslynn
        </span>
        <span className="text-gold-300 text-[9.5px] font-semibold tracking-[0.28em] uppercase mt-1.5">
          Lawn &amp; Landscape
        </span>
      </span>
    </span>
  );
}
