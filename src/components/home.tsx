import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { projects } from '../data/projects';
import { articles } from '../data/articles';
import { faqs, githubProjects, site, skills } from '../data/site';
import { AbstractArt, SectionHeading, Tag, Wrap } from './ui';
import { Mascot } from './mascot';

const processSteps = [
  ['01', 'TRACE', 'Follow the request through Publish, Dispatcher and CDN using cache headers, AEM logs and request tracing.'],
  ['02', 'ISOLATE', 'Reproduce locally, including with the Cloud Dispatcher Docker image where the delivery layer matters.'],
  ['03', 'FIX', 'Change the smallest layer: a filter, rewrite, Sling Filter, servlet or model — not everything at once.'],
  ['04', 'VERIFY', 'Use Postman, JUnit/Mockito and regression testing to prove the fix before release.']
];

const dispatcherSamples = [
  ['/content/site/en/home.html', 'page'],
  ['/old-blog/dispatcher-tips', 'redirect'],
  ['/en/about.html', 'rewrite'],
  ['/clientlibs/main.js', 'clientlib'],
  ['/content/site/en.infinity.json', 'blocked json'],
  ['/system/console/bundles', 'blocked console']
];

function AnimatedMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStarted(true); io.disconnect(); } }, { threshold: .3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const items = [['2+', 'years on AEM'], ['2', 'migration paths'], ['6', 'project stories'], ['3', 'technical guides']];
  return <div className="metrics" ref={ref}>{items.map(([n, label], i) => <div key={label}><strong>{started ? n : i === 0 ? '0+' : '0'}</strong><span>{label}</span></div>)}</div>;
}

function Letters({ text, start = 0 }: { text: string; start?: number }) {
  return <span className="hx-line">{text.split('').map((c, i) => <i key={i} style={{ '--i': start + i } as CSSProperties}>{c}</i>)}</span>;
}

function Hero() {
  return <section className="hx no-print" id="hero">
    <div className="hx-grid" aria-hidden="true" />
    <span className="hx-cross hx-cross-a" aria-hidden="true" /><span className="hx-cross hx-cross-b" aria-hidden="true" />
    <div className="hx-ghost" aria-hidden="true">PATEL</div>
    <Mascot className="hx-mascot" />
    <Wrap className="hx-inner">
      <div className="hx-top"><span>Portfolio / 2026</span><span>Java · AEM · Cloud</span></div>
      <div className="hx-lead">
        <p className="hx-intro">Software Developer building enterprise content platforms, cloud migrations and the layer between author and visitor.</p>
        <div className="button-row"><a className="button dark" href="/work/">See what I've built ↗</a><a className="button outline-dark" href={site.resume}>Résumé ↗</a></div>
      </div>
      <aside className="hx-card" aria-hidden="true"><div className="hx-card-art"><AbstractArt index={0} /></div><div className="hx-card-cap"><span>Now</span><b>AEM Cloud</b></div></aside>
      <div className="hx-bottom">
        <span className="hx-year">©2026</span>
        <h1 aria-label="Om Patel"><Letters text="OM" /><Letters text="PATEL" start={2} /></h1>
      </div>
      <a className="hx-chip" href="/contact/"><span><small>Let's talk</small><strong>Om Patel</strong></span><b>↗</b></a>
    </Wrap>
  </section>;
}

function Marquee() {
  const names = Object.values(skills).flat();
  return <div className="marquee no-print" aria-hidden="true"><div className="marquee-track">{[...names, ...names].map((n, i) => <span key={`${n}-${i}`}>{n}</span>)}</div></div>;
}

function BlurStatement() {
  const ref = useRef<HTMLElement>(null);
  const words = 'Great AEM sites are decided in the layers between the author and the visitor.'.split(' ');
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf = 0;
    const update = () => { raf = 0; const r = el.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (innerHeight * .8 - r.top) / (innerHeight * .55))); el.style.setProperty('--p', p.toFixed(3)); };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener('scroll', on, { passive: true }); update();
    return () => { removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);
  return <section ref={ref} className="statement section-pad no-print" style={{ '--n': words.length } as CSSProperties}><Wrap><p className="statement-text" aria-label={words.join(' ')}>{words.map((w, i) => <span className="sw" style={{ '--i': i } as CSSProperties} key={i}>{w} </span>)}</p></Wrap></section>;
}

function WorkShowcase() {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Helper function to handle internal rail shifting without breaking global page scroll
  const scrollToSlide = (rail: HTMLDivElement, index: number) => {
    const slides = Array.from(rail.querySelectorAll<HTMLElement>('.terminal-slide'));
    const targetSlide = slides[index];
    if (targetSlide) {
      // Safely scroll ONLY the horizontal rail container box element internally!
      rail.scrollTo({
        left: targetSlide.offsetLeft - rail.offsetLeft,
        behavior: 'smooth'
      });
    }
  };

  const move = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const next = Math.max(0, Math.min(projects.length - 1, active + direction));
    scrollToSlide(rail, next);
    setActive(next);
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () => {
      const slides = Array.from(rail.querySelectorAll<HTMLElement>('.terminal-slide'));
      if (!slides.length) return;
      const left = rail.scrollLeft;
      let nearest = 0;
      let distance = Number.POSITIVE_INFINITY;
      slides.forEach((slide, index) => {
        const d = Math.abs(slide.offsetLeft - left);
        if (d < distance) { distance = d; nearest = index; }
      });
      setActive(nearest);
    };
    rail.addEventListener('scroll', update, { passive: true });
    
    const timer = window.setInterval(() => {
      if (document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const next = (active + 1) % projects.length;
      
      // FIXED: Swapped scrollIntoView out for our internal horizontal container offset shifter
      scrollToSlide(rail, next);
      setActive(next);
    }, 6500);
    
    return () => { rail.removeEventListener('scroll', update); window.clearInterval(timer); };
  }, [active]);

  return <section className="section-pad no-print" id="work"><Wrap><SectionHeading label="001 / WHAT I'VE BUILT" title="Functionalities I've built" sub="Six areas of real platform work. Watch each one move, then open the details." />
    <div className="carousel-frame">
      <div className="terminal-rail" ref={railRef}>{projects.map((p, i) => <a className={`terminal-slide project-link${i === active ? ' is-active' : ''}`} href={`/work/${p.slug}/`} key={p.slug}>
        <div className="terminal-window"><div className="window-top"><span /><span /><span /></div><div className="terminal-body">{p.code.map((line, k) => <div className="terminal-line" key={`${line}-${k}`} style={{ '--delay': `${k * .4}s` } as CSSProperties}><em>\$</em>{line}</div>)}<span className="terminal-dot" /><span className="terminal-scan" /></div></div>
        <div className="terminal-caption"><span>00{i + 1}</span><div><h3>{p.title}</h3><p>{p.summary}</p></div><b>↗</b></div>
      </a>)}</div>
      <div className="carousel-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous project" data-cursor-target data-cursor-text="PREV">←</button>
        <div className="carousel-progress" aria-label={`Project ${active + 1} of ${projects.length}`}><span style={{ '--progress': `${((active + 1) / projects.length) * 100}%` } as CSSProperties} /></div>
        <button type="button" onClick={() => move(1)} aria-label="Next project" data-cursor-target data-cursor-text="NEXT">→</button>
      </div>
    </div>
    <div className="art-grid">{projects.map((p, i) => <a className="art-card project-link" href={`/work/${p.slug}/`} key={p.slug}><div className="art-frame"><AbstractArt index={i} /></div><div className="art-meta"><span>00{i + 1} / {p.category}</span><b>{p.title}</b><small>{p.platform}</small></div></a>)}</div>
  </Wrap></section>;
}


function Process() {
  return <section className="dark-section no-print" id="process"><Wrap><SectionHeading dark label="002 / HOW I DEBUG" title="A process that works" sub="The same four steps on a cache mismatch, a migration defect or a content problem." /><div className="process-grid">{processSteps.map(([n, t, p]) => <article key={n}><strong>{n}</strong><h3>{t}</h3><p>{p}</p></article>)}</div></Wrap></section>;
}

function evaluate(url: string, seen: Set<string>) {
  let u = url.startsWith('/') ? url : `/${url}`;
  const lines: string[] = [];
  if (/^\/old-blog\/(.*)$/.test(u)) { u = u.replace(/^\/old-blog\/(.*)$/, '/content/site/en/blog/$1.html'); lines.push('redirect: 301 → new content path'); }
  else if (u === '/') { u = '/content/site/en/home.html'; lines.push('redirect: 302 → home content'); }
  else lines.push('redirect: no match');
  if (/^\/en\/(.*)$/.test(u)) { u = u.replace(/^\/en\/(.*)$/, '/content/site/en/$1'); lines.push('rewrite: /en/* → /content/site/en/*'); }
  else if (/^\/clientlibs\/(.*)$/.test(u)) { u = u.replace(/^\/clientlibs\/(.*)$/, '/etc.clientlibs/site/$1'); lines.push('rewrite: /clientlibs/* → /etc.clientlibs/site/*'); }
  else lines.push('rewrite: no match');
  const rules = [
    ['deny', '*', /^.*$/], ['allow', '/content/*', /^\/content\/.*/], ['allow', '/etc.clientlibs/*', /^\/etc\.clientlibs\/.*/],
    ['deny', '/content/*.(infinity|tidy|feed).*', /^\/content\/.*\.(infinity|tidy|feed)\..*/], ['deny', '/system/*', /^\/system\/.*/]
  ] as const;
  let allowed = false;
  rules.forEach(([type, label, re], i) => { const hit = re.test(u); if (hit) allowed = type === 'allow'; lines.push(`/000${i + 1} ${type} ${label}${hit ? ' matches' : ''}`); });
  const cacheable = allowed && /\.(html|js|css|pdf|png|jpg)$/.test(u);
  const hit = cacheable && seen.has(u); if (cacheable) seen.add(u);
  return { lines, allowed, cacheable, hit, u };
}

function DispatcherDemo() {
  const [url, setUrl] = useState('/content/site/en/home.html');
  const [output, setOutput] = useState(() => evaluate('/content/site/en/home.html', new Set()));
  const [runId, setRunId] = useState(0);
  const seenRef = useRef(new Set<string>());
  const run = (next: string) => { setUrl(next); setOutput(evaluate(next, seenRef.current)); setRunId(v => v + 1); };
  const stages = ['REDIRECT', 'REWRITE', 'FILTER', 'CACHE'];
  return <section className="section-pad no-print"><Wrap><SectionHeading label="DEMO" title="Cloud Dispatcher demo" sub="A small interactive model of the redirect → rewrite → filter → cache flow. It is intentionally a learning demo, not a replacement for your Cloud validation tooling." />
    <div className="dispatcher dispatcher-enhanced">
      <div className="dispatcher-head"><div><span className="live-dot" />DISPATCHER / REQUEST PIPELINE</div><span>LOCAL MODEL</span></div>
      <div className="dispatcher-pipeline" key={runId} aria-hidden="true">{stages.map((stage, i) => <div className={`pipeline-node ${i < 3 || output.allowed ? 'is-active' : ''}`} key={stage}><span>{String(i + 1).padStart(2, '0')}</span><b>{stage}</b></div>)}</div>
      <div className="dispatcher-samples">{dispatcherSamples.map(([u, label]) => <button className="sample" key={u} onClick={() => run(u)} type="button">{label}</button>)}</div>
      <div className="dispatcher-input"><span>curl</span><input value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') run(url); }} /><button onClick={() => run(url)} type="button">Run ↵</button></div>
      <div className="dispatcher-body" key={`body-${runId}`}><div className="dispatcher-lines">{output.lines.map((l, i) => <div className={l.includes('matches') || l.includes('→') ? 'match' : ''} key={`${l}-${i}`} style={{ '--line-i': i } as CSSProperties}>{l}</div>)}</div><div className="verdict"><span>VERDICT</span><strong className={output.allowed ? 'allow' : 'deny'}>{output.allowed ? 'ALLOWED' : 'DENIED'}</strong>{output.allowed && output.cacheable && <strong className="cache">{output.hit ? 'CACHE HIT' : 'CACHE MISS'}</strong>}<p>{output.allowed ? output.cacheable ? `${output.u} is cacheable at the edge.` : 'Allowed to Publish; not cacheable in this demo.' : 'Denied before the request reaches Publish.'}</p></div></div>
    </div>
  </Wrap></section>;
}

function Guides() {
  return <section className="section-pad no-print" id="articles"><Wrap><SectionHeading label="003 / WRITING" title="Guides I've written" sub="Technical notes from real AEM work, written as references I would want on the next debugging session." />
    <div className="guide-grid">{articles.map((a, i) => <a className="guide-card project-link" href={`/writing/${a.slug}/`} key={a.slug}><div className="guide-num">0{i + 1}</div><div><span>{a.tag} · {a.minutes} MIN READ</span><h3>{a.title}</h3><p>{a.summary}</p></div><b>↗</b></a>)}</div>
  </Wrap></section>;
}

function LinkedIn() {
  const [loaded, setLoaded] = useState(false);
  return <section className="section-pad no-print"><Wrap><SectionHeading label="004 / LINKEDIN" title="From LinkedIn" sub="Short posts as I learn — with the option to load an embedded post only when you ask for it." />
    <article className="linkedin-card"><div><span>RECENT POST</span><h3>Cloud Dispatcher basics</h3><p>Redirects, rewrites, filters and cache behaviour — documented while learning the delivery layer.</p><div className="button-row"><a className="button dark" href="https://lnkd.in/p/dxGTz4PS" target="_blank" rel="noreferrer">Open on LinkedIn ↗</a>{!loaded && <button className="button outline" onClick={() => setLoaded(true)} type="button">Load post here</button>}</div></div>{loaded ? <iframe loading="lazy" title="Cloud Dispatcher basics LinkedIn post" src="https://www.linkedin.com/embed/feed/update/urn:li:share:7443709958501593089?collapsed=1" /> : <div className="linkedin-placeholder"><span>LINKEDIN</span><strong>Click to load</strong></div>}</article>
    <p className="more-link"><a href={site.linkedinActivity} target="_blank" rel="noreferrer">All posts on LinkedIn ↗</a></p>
  </Wrap></section>;
}

function Skills() {
  const [active, setActive] = useState('All');
  const all = Object.entries(skills).flatMap(([cat, names]) => names.map(name => ({ cat, name })));
  const filtered = active === 'All' ? all : all.filter(x => x.cat === active);
  return <section className="dark-section skill-section no-print"><Wrap><SectionHeading dark label="005 / TOOLKIT" title="Skills" sub="Filter by area — the categories reflect the work represented elsewhere in the site." />
    <div className="skill-filters">{['All', ...Object.keys(skills)].map(cat => <button className={active === cat ? 'active' : ''} key={cat} onClick={() => setActive(cat)} type="button">{cat}</button>)}</div>
    <div className="skill-cloud">{filtered.map(({cat, name}) => <Tag key={`${cat}-${name}`}>{name}</Tag>)}</div>
  </Wrap></section>;
}

function FAQ() {
  return <section className="section-pad no-print"><Wrap><SectionHeading label="006 / FAQ" title="Questions" /><div className="faq">{faqs.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></Wrap></section>;
}

function GitHub() {
  return <section className="section-pad no-print"><Wrap><SectionHeading label="007 / CODE" title="On GitHub" sub="Things I build and learn with outside of client work." />
    <div className="github-list">{githubProjects.map((p, i) => <a href={p.url} target="_blank" rel="noreferrer" key={p.name}><span>00{i + 1}</span><h3>{p.name}</h3><p>{p.description}</p><b>↗</b></a>)}</div>
    <p className="more-link"><a href={site.github} target="_blank" rel="noreferrer">github.com/MrChuck07 ↗</a></p>
  </Wrap></section>;
}

export function HomePage() {
  return <main className="page home-page">
    <Hero /><Marquee />
    <section className="section-pad no-print"><Wrap><AnimatedMetrics /></Wrap></section>
    <BlurStatement />
    <WorkShowcase /><Process /><DispatcherDemo /><Guides /><LinkedIn /><Skills /><FAQ /><GitHub />
  </main>;
}
