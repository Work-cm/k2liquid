import Link from 'next/link';

const NAVY = '#100d36';

function Blade({ rotate }) {
  return (
    <g transform={`rotate(${rotate} 32 32)`}>
      <path d="M32 7 L40 30 L32 34 L24 30 Z" fill="#fff" />
      <path d="M32 9.5 L32 32" stroke={NAVY} strokeWidth="1.2" />
      <path d="M32 7 C26.5 4.5 21.5 8 23.5 12.5 C24.8 15.5 28.6 15.2 28.6 12.4" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="28.6" cy="12.4" r="1.3" fill="#fff" />
    </g>
  );
}

export function LogoMark({ size = 36, className = '', bare = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {!bare && <rect width="64" height="64" fill={NAVY} />}
      <g transform="rotate(45 32 32)">
        <Blade rotate={0} />
        <Blade rotate={90} />
        <Blade rotate={180} />
        <Blade rotate={270} />
        <circle cx="32" cy="32" r="2.2" fill={NAVY} />
      </g>
    </svg>
  );
}

export default function Logo({ size = 36, showDomain = true, href = '/', className = '' }) {
  return (
    <Link href={href} className={`flex items-center gap-3 group w-fit ${className}`} aria-label="K2PaperK2Liquid home">
      <LogoMark size={size} className="shrink-0 transition-transform duration-500 group-hover:rotate-90" />
      <span className="flex flex-col leading-none">
        <span className="font-display font-extrabold tracking-[-0.04em] text-bone uppercase" style={{ fontSize: size * 0.46 }}>
          K2Paper<span className="text-volt">K2Liquid</span>
        </span>
        {showDomain && (
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-bone-faint mt-1.5">
            k2paperk2liquid
          </span>
        )}
      </span>
    </Link>
  );
}
