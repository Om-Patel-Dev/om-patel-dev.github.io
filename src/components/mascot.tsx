import { useEffect, useRef } from 'react';

type Mood = 'code' | 'wave' | 'lost';

/** "Byte" — original mascot. Eyes follow the pointer, blinks, floats. */
export function Mascot({ mood = 'code', className = '' }: { mood?: Mood; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg || !matchMedia('(pointer:fine)').matches) return;
    let raf = 0, px = 0, py = 0;
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    const on = (e: PointerEvent) => {
      if (document.documentElement.dataset.motion === 'off') return;
      px = e.clientX; py = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = svg.getBoundingClientRect();
        svg.style.setProperty('--ex', (clamp((px - r.left - r.width / 2) / (innerWidth * .4)) * 8).toFixed(2));
        svg.style.setProperty('--ey', (clamp((py - r.top - r.height * .45) / (innerHeight * .4)) * 6).toFixed(2));
      });
    };
    addEventListener('pointermove', on, { passive: true });
    return () => { removeEventListener('pointermove', on); cancelAnimationFrame(raf); };
  }, []);

  const eye = (cx: number) => <g className="m-eye" style={{ transformOrigin: `${cx}px 236px` }}>
    <ellipse cx={cx} cy="236" rx="25" ry="29" fill="#fbf6ea" />
    <g className="m-iris"><circle cx={cx} cy="238" r="16" fill="#2a1a12" /><circle cx={cx} cy="238" r="8" fill="#0b0705" /><circle cx={cx + 6} cy="230" r="5" fill="#fff" /><circle cx={cx - 5} cy="246" r="2.5" fill="#fff" /></g>
  </g>;

  return <svg ref={ref} className={`mascot mood-${mood} ${className}`} viewBox="0 0 420 520" role="img" aria-label="Byte, a cartoon developer mascot">
    <g className="m-glyphs" fontFamily="IBM Plex Mono, monospace" fontWeight="700" fill="#14100d">
      <text x="30" y="120" fontSize="34" className="g1">{'</>'}</text>
      <text x="345" y="160" fontSize="34" className="g2">{'{ }'}</text>
      <text x="350" y="330" fontSize="30" className="g3">;</text>
      <text x="22" y="300" fontSize="26" className="g4">AEM</text>
    </g>
    <g className="m-body">
      <path d="M62 520C62 405 108 352 210 352s148 53 148 168z" fill="#14100d" />
      <path d="M170 352c8 26 72 26 80 0" fill="none" stroke="#ede5d0" strokeWidth="6" strokeLinecap="round" opacity=".9" />
      <path d="M196 372v44M224 372v44" stroke="#ff5a2f" strokeWidth="5" strokeLinecap="round" />
      <rect x="182" y="318" width="56" height="44" rx="18" fill="#e9c19f" />
      <g className="m-head">
        <circle cx="106" cy="240" r="17" fill="#f2cba6" /><circle cx="314" cy="240" r="17" fill="#f2cba6" />
        <ellipse cx="210" cy="232" rx="106" ry="98" fill="#f6d5b4" />
        <path d="M102 232C88 128 150 92 212 96c66-4 118 40 106 136-18-46-44-64-78-72-36 14-92 12-138 72z" fill="#1c1511" />
        <path className="m-tuft" d="M198 100c-8-34 18-54 40-66 0 30 12 46 10 68z" fill="#1c1511" />
        <path d="M96 226C92 100 328 100 324 226" fill="none" stroke="#ff5a2f" strokeWidth="14" strokeLinecap="round" />
        <rect x="84" y="212" width="24" height="60" rx="12" fill="#ede5d0" /><rect x="312" y="212" width="24" height="60" rx="12" fill="#ede5d0" />
        {eye(168)}{eye(252)}
        <path d="M142 198q26-14 50-2M228 196q24-12 50 2" fill="none" stroke="#1c1511" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="136" cy="272" rx="15" ry="9" fill="#ff8a70" opacity=".55" /><ellipse cx="284" cy="272" rx="15" ry="9" fill="#ff8a70" opacity=".55" />
        <path d="M192 284q18 20 36 0" fill="#7a2f22" stroke="#7a2f22" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
      </g>
      {mood === 'code' && <g className="m-laptop">
        <rect x="104" y="410" width="212" height="122" rx="14" fill="#2b2622" stroke="#0e0c0a" strokeWidth="4" />
        <circle cx="210" cy="466" r="17" fill="#ff5a2f" /><circle cx="210" cy="466" r="7" fill="#14100d" />
        <ellipse cx="96" cy="452" rx="22" ry="17" fill="#f2cba6" /><ellipse cx="324" cy="452" rx="22" ry="17" fill="#f2cba6" />
      </g>}
      {mood === 'wave' && <g className="m-arm"><path d="M330 420C372 400 380 340 372 300" fill="none" stroke="#14100d" strokeWidth="46" strokeLinecap="round" /><circle cx="372" cy="288" r="27" fill="#f2cba6" /></g>}
      {mood === 'lost' && <g className="m-q"><circle cx="330" cy="76" r="30" fill="#14100d" /><text x="330" y="90" textAnchor="middle" fontSize="42" fontWeight="800" fill="#ede5d0" fontFamily="Bricolage Grotesque, sans-serif">?</text></g>}
    </g>
  </svg>;
}
