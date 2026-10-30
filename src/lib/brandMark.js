const NAVY = '#100d36';

const blade = (rotate) =>
  `<g transform="rotate(${rotate} 32 32)"><path d="M32 7 L40 30 L32 34 L24 30 Z" fill="#fff"/><path d="M32 9.5 L32 32" stroke="${NAVY}" stroke-width="1.2"/><path d="M32 7 C26.5 4.5 21.5 8 23.5 12.5 C24.8 15.5 28.6 15.2 28.6 12.4" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="28.6" cy="12.4" r="1.3" fill="#fff"/></g>`;

export function brandMarkSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}" fill="none">
  <rect width="64" height="64" fill="${NAVY}"/>
  <g transform="rotate(45 32 32)">${blade(0)}${blade(90)}${blade(180)}${blade(270)}<circle cx="32" cy="32" r="2.2" fill="${NAVY}"/></g>
</svg>`;
}
