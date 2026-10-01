import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/bricolage-grotesque/500.css';
import '@fontsource/bricolage-grotesque/700.css';
import '@fontsource/bricolage-grotesque/800.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/700.css';
import './styles.css';
import { SiteShell } from './components/site-shell';
import { AboutPage, ArticlePage, ContactPage, NotFoundPage, ProjectPage, ServicesPage, WorkPage, WritingPage } from './components/inner-pages';
import { HomePage } from './components/home';

try { document.documentElement.dataset.motion = localStorage.getItem('om-motion') === 'off' ? 'off' : 'on'; } catch { document.documentElement.dataset.motion = 'on'; }
const root = createRoot(document.getElementById('root')!);
const page = document.body.dataset.page ?? 'home';

function Page() {
  if (page === 'work') return <WorkPage />;
  if (page === 'services') return <ServicesPage />;
  if (page === 'about') return <AboutPage />;
  if (page === 'writing') return <WritingPage />;
  if (page === 'contact') return <ContactPage />;
  if (page === 'project') return <ProjectPage slug={document.body.dataset.slug ?? ''} />;
  if (page === 'article') return <ArticlePage slug={document.body.dataset.slug ?? ''} />;
  if (page === '404') return <NotFoundPage />;
  return <HomePage />;
}

root.render(<StrictMode><SiteShell><Page /></SiteShell></StrictMode>);
