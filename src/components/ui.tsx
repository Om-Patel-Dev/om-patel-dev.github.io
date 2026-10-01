import type { CSSProperties, ReactNode } from 'react';

export function Wrap({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`wrap ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function Words({ text }: { text: string }) {
  return <>{text.split(' ').map((w, i) => <span key={i}><span className="w" style={{ '--i': i } as CSSProperties}>{w}</span>{' '}</span>)}</>;
}

export function SectionHeading({ label, title, sub, dark = false }: { label: string; title: string; sub?: string; dark?: boolean }) {
  return <div className={`section-heading ${dark ? 'on-dark' : ''}`}>
    <Eyebrow>{label}</Eyebrow>
    <h2 data-split aria-label={title}><Words text={title} /></h2>
    {sub && <p>{sub}</p>}
  </div>;
}

export function AbstractArt({ index, wide = false }: { index: number; wide?: boolean }) {
  const c = ['#ee4108', '#0d0d0d', '#f4b46a', '#ede5d0'][index % 4];
  const d = `M0 ${180 - index * 5} Q100 ${90 + index * 20} 200 180 T400 ${160 + index * 7}`;
  return <svg className="abstract-art" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="400" height="260" fill={c} />
    <circle cx={70 + index * 14} cy="80" r={42 + index * 4} fill="#ede5d0" opacity=".88" />
    <circle cx={240} cy={75 + index * 18} r={24 + index * 5} fill={index % 2 ? '#ee4108' : '#0d0d0d'} opacity=".85" />
    <rect x={170 - index * 8} y="126" width="150" height="90" rx="6" fill="#ede5d0" opacity=".14" transform={`rotate(${index * 4 - 5} 245 170)`}/>
    <path d={d} fill="none" stroke="#ede5d0" strokeWidth="3" opacity=".95" />
    <text x="20" y="232" fill="#ede5d0" fontFamily="IBM Plex Mono" fontSize="11" letterSpacing="1.2">AEM / {wide ? 'SYSTEM' : 'CASE STUDY'} / 00{index + 1}</text>
  </svg>;
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag-pill">{children}</span>;
}
