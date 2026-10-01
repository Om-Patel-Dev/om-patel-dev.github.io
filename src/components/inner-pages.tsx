import { useEffect, useState, type FormEvent } from 'react';
import { Mascot } from './mascot';
import { projects } from '../data/projects';
import { articles } from '../data/articles';
import { githubProjects, site, skills } from '../data/site';
import { AbstractArt, Eyebrow, SectionHeading, Tag, Wrap, Words } from './ui';

function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  const ghost = eyebrow.split('/')[1]?.trim() ?? '';
  return <section className="page-hero"><div className="page-hero-grid" aria-hidden="true" /><div className="ph-ghost" aria-hidden="true">{ghost}</div><Wrap><Eyebrow>{eyebrow}</Eyebrow><h1 className="ph-title" aria-label={title}>{title.split(' ').map((w, i) => <span key={i}><span className="ph-word"><i style={{ '--i': i } as React.CSSProperties}>{w}</i></span>{' '}</span>)}</h1><p>{intro}</p></Wrap></section>;
}

export function WorkPage() {
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const [active, setActive] = useState('All');
  const list = active === 'All' ? projects : projects.filter(p => p.category === active);
  return <main className="page"><PageHero eyebrow="001 / WORK" title="Selected work" intro="Enterprise AEM work across localization, migration, assets, components and Cloud Service delivery." />
    <section className="section-pad"><Wrap>
      <div className="filter-strip">{categories.map(c => <button className={c === active ? 'active' : ''} onClick={() => setActive(c)} key={c}>{c}</button>)}</div>
      <div className="work-grid">{list.map((p, i) => <a className="large-project" href={`/work/${p.slug}/`} key={p.slug}><div className="large-art"><AbstractArt index={i} wide /></div><div className="large-project-body"><div><span>00{projects.indexOf(p) + 1} / {p.category}</span><h2>{p.title}</h2><p>{p.summary}</p></div><div className="chips">{p.stack.map(s => <Tag key={s}>{s}</Tag>)}</div><b>Read case study ↗</b></div></a>)}</div>
    </Wrap></section>
  </main>;
}

export function ProjectPage({ slug }: { slug: string }) {
  const project = projects.find(p => p.slug === slug) ?? projects[0];
  const index = projects.findIndex(p => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  return <main className="page project-page"><section className="case-hero"><Wrap><Eyebrow>00{index + 1} / {project.category}</Eyebrow><h1>{project.title}</h1><div className="case-meta"><span>{project.role}</span><span>{project.platform}</span><span>{project.stack.join(' · ')}</span></div></Wrap></section>
    <section className="section-pad"><Wrap><div className="case-grid"><div><div className="case-art"><AbstractArt index={index} wide /></div><p className="case-lead">{project.summary}</p></div><aside><div className="aside-label">THE PROBLEM</div><p>{project.problem}</p><div className="aside-label">STACK</div><div className="chips">{project.stack.map(s => <Tag key={s}>{s}</Tag>)}</div></aside></div></Wrap></section>
    <section className="dark-section"><Wrap><SectionHeading dark label="IMPLEMENTATION" title="What I worked on" /><div className="details-list">{project.details.map((d, i) => <article key={d}><span>0{i + 1}</span><p>{d}</p></article>)}</div><div className="case-terminal"><div className="window-top"><span /><span /><span /></div>{project.code.map((line, i) => <p key={line}><em>$</em>{line}</p>)}<div className="terminal-foot">REQUEST TRACE / DEMO TRACE</div></div></Wrap></section>
    <section className="section-pad"><Wrap><div className="next-project"><Eyebrow>NEXT / CASE STUDY</Eyebrow><a href={`/work/${next.slug}/`}><h2>{next.title}</h2><p>{next.summary}</p><b>Open next case study ↗</b></a></div></Wrap></section>
  </main>;
}

export function ServicesPage() {
  const services = [
    ['01', 'AEM ENGINEERING', 'Reusable components, Sling Models, OSGi services, servlets, Content Fragments, workflows and authoring patterns.'],
    ['02', 'AEM CLOUD', 'Cloud Manager delivery, migration support, Dispatcher validation, configuration compatibility and environment troubleshooting.'],
    ['03', 'LOCALIZATION + CONTENT', 'Locale fallback, translation integrations, content-query behaviour, Ghost Post filtering and API troubleshooting.'],
    ['04', 'ASSETS + DAM', 'Connected DAM, CORS and remote access troubleshooting, Direct Binary Upload flows and DAM ingestion automation.']
  ];
  return <main className="page"><PageHero eyebrow="002 / SERVICES" title="What I work on" intro="The practical AEM backend and delivery problems I enjoy getting my hands dirty with." />
    <section className="section-pad"><Wrap><div className="service-list">{services.map(([n,t,p]) => <article key={n}><span>{n}</span><div><h2>{t}</h2><p>{p}</p></div><b>↗</b></article>)}</div></Wrap></section>
    <section className="orange-banner"><Wrap><Eyebrow>DELIVERY MINDSET</Eyebrow><h2>Smallest useful change. Clear evidence. No mystery layer left untested.</h2></Wrap></section>
  </main>;
}

export function AboutPage() {
  return <main className="page"><PageHero eyebrow="003 / ABOUT" title="Software developer with a backend bias" intro="I build and troubleshoot enterprise AEM experiences across AEM 6.5 and AEM as a Cloud Service, while expanding deeper into modern frontend engineering." />
    <section className="section-pad"><Wrap><div className="about-grid"><div><Eyebrow>01 / PROFILE</Eyebrow><h2>Java underneath. AEM on top. Delivery all the way through.</h2></div><div className="about-copy"><p>I work most comfortably where content, backend logic and delivery infrastructure meet: Sling, OSGi, JCR, APIs, localization, Assets and Dispatcher.</p><p>My project work has included AEM 6.5 → LTS migration support, AMS → Cloud Service migration work, Connected DAM troubleshooting, Direct Binary Upload, GlobalLink localization fixes and model-level content filtering.</p><a className="button dark" href={site.resume}>Download résumé ↗</a></div></div></Wrap></section>
    <section className="section-pad"><Wrap><Eyebrow>02 / EXPERIENCE</Eyebrow><div className="timeline"><div><span>09/2024 — PRESENT</span><h3>Software Developer · Enterprise Content Platforms</h3><p>Enterprise AEM delivery, migration support, localization, Assets, Dispatcher and backend platform work.</p></div><div><span>01/2024 — 08/2024</span><h3>Software Developer Intern</h3><p>Hands-on development and AEM enablement before moving into enterprise project work.</p></div></div></Wrap></section>
    <section className="dark-section"><Wrap><SectionHeading dark label="03 / TOOLKIT" title="The stack" /><div className="about-skills">{Object.entries(skills).map(([cat,names]) => <div key={cat}><span>{cat}</span><div>{names.map(n => <Tag key={n}>{n}</Tag>)}</div></div>)}</div></Wrap></section>
  </main>;
}

function ArticleCard({ a, i }: { a: (typeof articles)[number]; i: number }) {
  return <a className="guide-card article-card" href={`/writing/${a.slug}/`}><div className="guide-num">0{i + 1}</div><div><span>{a.tag} · {a.minutes} MIN READ</span><h3>{a.title}</h3><p>{a.summary}</p></div><b>↗</b></a>;
}

export function WritingPage() {
  return <main className="page"><PageHero eyebrow="004 / WRITING" title="Technical notes" intro="AEM references I have written while learning, troubleshooting and turning project knowledge into something reusable." />
    <section className="section-pad"><Wrap><div className="writing-grid">{articles.map((a,i)=><ArticleCard a={a} i={i} key={a.slug}/>)}</div></Wrap></section>
    <section className="orange-banner"><Wrap><Eyebrow>MORE ON LINKEDIN</Eyebrow><h2>I publish shorter notes and project learnings there too.</h2><a className="button dark" href={site.linkedinActivity} target="_blank" rel="noreferrer">Open LinkedIn ↗</a></Wrap></section>
  </main>;
}

export function ArticlePage({ slug }: { slug: string }) {
  const article = articles.find(a => a.slug === slug) ?? articles[0];
  return <main className="page"><section className="article-hero"><div className="page-hero-grid" aria-hidden="true" /><Wrap><Eyebrow>{article.tag} / {article.minutes} MIN READ</Eyebrow><h1>{article.title}</h1><p>{article.summary}</p>{article.linkedin && <a className="button dark" href={article.linkedin} target="_blank" rel="noreferrer">Read the full article on LinkedIn ↗</a>}</Wrap></section>
    <section className="article-body"><Wrap><div className="article-layout"><article>{article.sections.map((s, i) => <section id={`section-${i}`} key={s.heading}><span className="article-index">0{i + 1}</span><h2>{s.heading}</h2>{s.paragraph && <p>{s.paragraph}</p>}{s.bullets && <ul>{s.bullets.map(b => <li key={b}>{b}</li>)}</ul>}{s.code && <pre><code>{s.code}</code></pre>}</section>)}{article.linkedin && <a className="button dark" href={article.linkedin} target="_blank" rel="noreferrer">Read the full article on LinkedIn ↗</a>}</article><aside className="article-aside"><Eyebrow>ON THIS PAGE</Eyebrow><div>{article.sections.map((s,i)=><a href={`#section-${i}`} key={s.heading}>{s.heading}</a>)}</div></aside></div></Wrap></section>
  </main>;
}

const topics = [
  ['Roles', 'AEM developer or platform roles, full-time or contract.', 'Team, stack, location', <><rect x="8" y="22" width="48" height="32" rx="6" fill="#ff5a2f" /><path d="M24 22v-6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6" fill="none" stroke="#14100d" strokeWidth="4" /><rect x="8" y="34" width="48" height="4" fill="#14100d" /><rect x="28" y="31" width="8" height="10" rx="2" fill="#ede5d0" /></>],
  ['Migrations', 'AEM 6.5 to LTS, AMS to Cloud Service, Dispatcher moves.', 'Current version, target, blockers', <><path d="M18 46a12 12 0 1 1 4-23 16 16 0 0 1 30 5 10 10 0 0 1-2 18z" fill="#ede5d0" stroke="#14100d" strokeWidth="4" /><path d="M32 52V34m-7 7 7-8 7 8" fill="none" stroke="#ff5a2f" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></>],
  ['Assets and DAM', 'Connected Assets, Direct Binary Upload, ingestion flows.', 'Volumes, formats, CORS errors', <><rect x="10" y="38" width="44" height="14" rx="4" fill="#14100d" /><rect x="14" y="24" width="36" height="14" rx="4" fill="#ff5a2f" /><rect x="18" y="10" width="28" height="14" rx="4" fill="#ede5d0" stroke="#14100d" strokeWidth="3" /></>],
  ['Debugging', 'Cache mismatches, filters, rewrites, odd publish behaviour.', 'URL, expected vs actual, headers', <><circle cx="27" cy="27" r="15" fill="#ede5d0" stroke="#14100d" strokeWidth="5" /><path d="m38 38 16 16" stroke="#ff5a2f" strokeWidth="7" strokeLinecap="round" /><path d="M21 27h12M27 21v12" stroke="#14100d" strokeWidth="3" strokeLinecap="round" /></>]
] as const;

const steps = [['You send context', 'A role, a project or a problem. A few lines is enough.'], ['I read and reply', 'Usually with a question or two so I can be useful.'], ['We see if it fits', 'A short call or a longer thread, whichever suits you.']];

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 15000); return () => clearInterval(t); }, []);
  const time = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata', hour12: true }).format(now);
  const diff = 330 + now.getTimezoneOffset();
  const h = Math.abs(diff) / 60;
  const rel = diff === 0 ? 'Same time zone as you.' : `${Number.isInteger(h) ? h : h.toFixed(1)}h ${diff > 0 ? 'ahead of' : 'behind'} you.`;
  return { time, rel };
}

export function ContactPage() {
  const [status, setStatus] = useState('');
  const { time, rel } = useClock();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(String(fd.get('subject') || 'Portfolio enquiry'))}&body=${encodeURIComponent(String(fd.get('message') || ''))}`;
    setStatus('Opening your email app…');
  };
  return <main className="page contact-page">
    <section className="ct-hero">
      <Wrap className="ct-grid">
        <div className="ct-copy">
          <Eyebrow>Contact</Eyebrow>
          <h1 aria-label="Let's talk."><Words text="Let's talk." /></h1>
          <p>For AEM roles, platform questions, migration discussions or a technical collaboration.</p>
          <a className="ct-email" href={`mailto:${site.email}`}>{site.email}<span>↗</span></a>
          <Mascot mood="wave" className="ct-mascot" />
        </div>
        <form className="ct-form" onSubmit={submit}>
          <label>Subject<input name="subject" defaultValue="AEM portfolio enquiry" required /></label>
          <label>Message<textarea name="message" rows={7} placeholder="Tell me a little about the role, project or problem…" required /></label>
          <button className="button orange" type="submit">Compose email ↗</button>
          {status && <p className="form-note" role="status">{status}</p>}
        </form>
      </Wrap>
    </section>

    <section className="section-pad"><Wrap>
      <SectionHeading label="Good reasons to write" title="What I can help with" />
      <div className="ct-cards">{topics.map(([t, d, hint, icon]) => <article className="ct-card" key={t}><svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">{icon}</svg><h3>{t}</h3><p>{d}</p><small>Helpful to include: {hint}</small></article>)}</div>
    </Wrap></section>

    <section className="section-pad"><Wrap>
      <SectionHeading label="After you hit send" title="How a conversation goes" />
      <ol className="ct-steps">{steps.map(([t, d], i) => <li className="ct-step" key={t}><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
    </Wrap></section>

    <section className="section-pad"><Wrap className="ct-info">
      <div className="ct-clock"><span className="availability"><i />Available for conversations</span><strong>{time}</strong><p>Nagpur, India (IST). {rel}</p></div>
      <div className="ct-links">
        <a href={site.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><b>↗</b></a>
        <a href={site.github} target="_blank" rel="noreferrer"><span>GitHub</span><b>↗</b></a>
        <a href={site.resume}><span>Résumé (PDF)</span><b>↗</b></a>
        <a href={`tel:${site.phone.replace(/\s/g, '')}`}><span>{site.phone}</span><b>↗</b></a>
      </div>
    </Wrap></section>
  </main>;
}

export function NotFoundPage() {
  return <main className="page"><PageHero eyebrow="404 / LOST" title="That page isn't here" intro="The portfolio is multi-page by design. Head back home or open the work index." /><Wrap><div className="nf-row"><Mascot mood="lost" className="nf-mascot" /><div className="not-found"><a className="button dark" href="/">Back home ↗</a><a className="button outline" href="/work/">See work ↗</a></div></div></Wrap></main>;
}
