import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import Lenis from 'lenis';
import { site } from '../data/site';
import { quotes } from '../data/quotes';

// 1. Keep paths simple in the array array definition
const nav = [['', 'Home'], ['work/', 'Work'], ['services/', 'Services'], ['about/', 'About'], ['writing/', 'Writing'], ['contact/', 'Contact']];
const REVEAL = '.section-pad .wrap > *:not(.section-heading),.dark-section .wrap > *:not(.section-heading),.orange-banner .wrap > *,.art-card,.guide-card,.large-project,.service-list article,.timeline > div,.about-skills > div,.process-grid article,.github-list a,.next-project,.ct-card,.ct-step';

export function SiteShell({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(false);
  const [motion, setMotion] = useState(() => document.documentElement.dataset.motion !== 'off');
  const lenis = useRef<Lenis | null>(null);
  const path = location.pathname;
  const kind = document.body.dataset.page ?? 'home';
  const quote = quotes[kind] ?? quotes.home;

  // Resolve base prefix dynamically (e.g. '/' or '/portfolio/')
  const base = import.meta.env.BASE_URL;

  useEffect(() => { setDark(document.documentElement.dataset.theme === 'dark'); }, []);

  // One scroll loop: Lenis inertia + progress bar + hero parallax variable.
  useEffect(() => {
    const reduce = !motion;
    const bar = document.querySelector<HTMLElement>('.scroll-progress');
    const hero = document.querySelector<HTMLElement>('.hx');
    const tick = () => {
      const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      if (hero && y < innerHeight * 1.3) hero.style.setProperty('--sy', String(y));
    };
    let l: Lenis | undefined;
    if (!reduce) { l = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true, autoRaf: true }); lenis.current = l; l.on('scroll', tick); }
    else addEventListener('scroll', tick, { passive: true });
    tick();
    return () => { l?.destroy(); lenis.current = null; removeEventListener('scroll', tick); };
  }, [motion]);

  useEffect(() => { menu ? lenis.current?.stop() : lenis.current?.start(); document.body.style.overflow = menu ? 'hidden' : ''; }, [menu]);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false); addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);

  // Scroll reveals — cheap opacity/translate only; headings get the word blur-in.
  useLayoutEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(REVEAL));
    items.forEach((el, i) => { el.classList.add('rv'); el.style.setProperty('--d', `${(i % 4) * 70}ms`); });
    const targets = [...items, ...document.querySelectorAll<HTMLElement>('[data-split],[data-reveal]')];
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) {
      const el = e.target as HTMLElement; el.classList.add('in'); io.unobserve(el);
      // hand transitions back to the component's own hover styles once the reveal has played
      if (el.classList.contains('rv')) setTimeout(() => { el.classList.remove('rv', 'in'); el.style.removeProperty('--d'); }, 1100);
    } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);

  const toggleMotion = () => {
    const next = !motion; setMotion(next);
    document.documentElement.dataset.motion = next ? 'on' : 'off';
    try { localStorage.setItem('om-motion', next ? 'on' : 'off'); } catch { /* ignore */ }
  };

  const toggleTheme = () => {
    const next = !dark; setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try { localStorage.setItem('om-theme', next ? 'dark' : 'light'); } catch { /* ignore */ }
  };

  // Helper function to check for active state correctly across directory structures
  const isActive = (targetPath: string) => {
    const absoluteTarget = `${base}${targetPath}`;
    if (targetPath === '') return path === absoluteTarget || path === `${absoluteTarget}index.html`;
    return path.startsWith(absoluteTarget);
  };

  return <>
    <div className="scroll-progress" />
    <header className="site-nav no-print">
      <div className="nav-shell">
        <a href={base} className="brand" aria-label="Om Patel home">OM<span>.</span></a>
        <nav className="nav-links" aria-label="Primary navigation">
          {nav.map(([href, label]) => (
            <a key={href} href={`${base}${href}`} className={isActive(href) ? 'active' : ''}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="pill hide-sm" href={`${base}contact/`}>Let's talk ↗</a>
          <button className="pill hide-sm" onClick={toggleTheme} type="button">{dark ? 'Light' : 'Dark'}</button>
          <button className="pill solid" onClick={() => setMenu(true)} type="button" aria-label="Open menu" aria-expanded={menu}>Menu <i aria-hidden="true" /></button>
        </div>
      </div>
    </header>

    <div className={`menu-overlay no-print ${menu ? 'open' : ''}`} aria-hidden={!menu} inert={!menu}>
      <div className="menu-top"><span>OM.</span><button className="menu-close" onClick={() => setMenu(false)} type="button">Close ×</button></div>
      <nav className="menu-links">
        {nav.map(([href, label], i) => (
          <a key={href} href={`${base}${href}`} onClick={() => setMenu(false)} style={{ '--menu-i': i } as CSSProperties}>
            <span className="menu-num">0{i + 1}</span><strong>{label}</strong><span className="menu-arrow">↗</span>
          </a>
        ))}
      </nav>
      <div className="menu-bottom"><span>Software Developer · Nagpur</span><span className="menu-toggles"><button className="menu-close" onClick={toggleTheme} type="button">{dark ? 'Light mode' : 'Dark mode'}</button><button className="menu-close" onClick={toggleMotion} type="button" aria-pressed={motion}>Motion: {motion ? 'on' : 'off'}</button></span></div>
    </div>

    {children}

    <footer className="site-footer no-print">
      <div className="wrap">
        <figure className="foot-quote">
          <span className="foot-mark" aria-hidden="true">“</span>
          <div><blockquote>{quote.q}</blockquote><figcaption>{quote.by}</figcaption></div>
        </figure>
        <div className="foot-row">
          <a className="brand" href={base}>OM<span>.</span></a>
          <nav aria-label="Footer">
            {nav.map(([href, label]) => (
              <a key={href} href={`${base}${href}`}>{label}</a>
            ))}
          </nav>
          <div className="foot-connect"><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={site.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={site.resume}>Résumé ↗</a></div>
        </div>
        <div className="foot-bottom"><span>© 2026 Om Patel · Nagpur, India</span><span className="availability"><i />Open to conversations</span><button type="button" onClick={() => (lenis.current ? lenis.current.scrollTo(0) : scrollTo({ top: 0 }))}>Back to top ↑</button></div>
      </div>
    </footer>
  </>;
}
