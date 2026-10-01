export interface Project {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  details: string[];
  problem: string;
  code: string[];
  category: string;
  role: string;
  platform: string;
}

export const projects: Project[] = [
  {
    slug: 'localization-fallback-engine',
    title: 'Localization fallback engine',
    summary: 'Serve the right content when a localized page or fragment is missing.',
    stack: ['Sling Filters', 'Servlets', 'Content Fragments', 'Mockito'],
    details: [
      'Designed locale and page fallback so AEM resolves fallback content when the requested localized content is unavailable, working with locale hierarchies and request resolution.',
      'Built a Content Fragment fallback service that resolves missing localized fragments through configured fallback locales instead of returning a 404, gated behind cf-fallback=true to preserve default behavior.',
      'Implemented and refactored fallback behavior across Sling Filters, Sling Servlets and backend services.',
      'Validated request flows in Postman and added JUnit/Mockito coverage for fallback and non-fallback paths.'
    ],
    problem: 'Localized content does not always exist at every requested locale. The platform still needs a predictable way to resolve usable content without changing the default request path.',
    code: ['GET /fr/page?cf-fallback=true', 'fr fragment missing → trying fallback locale', '200 fallback content served'],
    category: 'Localization',
    role: 'Software Developer',
    platform: 'AEM 6.5 / LTS'
  },
  {
    slug: 'aem-6-5-to-lts-migration',
    title: 'AEM 6.5 to LTS migration',
    summary: 'Compatibility, regression and cache-layer debugging for a major upgrade.',
    stack: ['AEM LTS', 'Dispatcher', 'CDN', 'Regression testing'],
    details: [
      'Supported compatibility remediation, code and configuration updates, dependency validation and environment verification.',
      'Ran regression testing across migrated features.',
      'Diagnosed token-replacement differences across Publish, Dispatcher and CDN using cache headers, AEM logs and request tracing.',
      'Supported security remediation and backend regression troubleshooting.'
    ],
    problem: 'Migration defects can hide between layers: code, Publish, Dispatcher and CDN can each behave correctly in isolation while the user-facing response still differs.',
    code: ['mvn verify  # compatibility + dependencies', 'regression suite running', 'token replace: Publish vs CDN diff found'],
    category: 'Migration',
    role: 'Software Developer',
    platform: 'AEM 6.5 → AEM LTS'
  },
  {
    slug: 'translation-and-blog-content-services',
    title: 'Translation and blog content services',
    summary: 'GlobalLink localization fixes and smarter blog retrieval.',
    stack: ['GlobalLink', 'Sling Models', 'Core Components', 'Content API'],
    details: [
      'Enhanced GlobalLink and localization behavior across supported locales, troubleshooting translation failures, locale mappings and reverse-translation edge cases while preserving the requested locale in the UI/content behavior.',
      'Extended cross-category blog retrieval.',
      'Implemented Ghost Post filtering at the model layer using Core Component resource-supertype delegation.',
      'Investigated Content API edge cases and hardened backend handling for missing properties.'
    ],
    problem: 'Translation edge cases and content-query behavior can leak into the page experience when locale state is not preserved or unwanted content is not filtered at the right layer.',
    code: ['locale map: requested locale preserved', 'blog query across categories', 'ghost posts filtered in the model'],
    category: 'Content',
    role: 'Software Developer',
    platform: 'AEM 6.5'
  },
  {
    slug: 'cloud-service-migration',
    title: 'Cloud Service migration',
    summary: 'Moving an AMS-based AEM setup to AEM as a Cloud Service.',
    stack: ['BPA', 'CAM', 'Dispatcher', 'Docker'],
    details: [
      'Supported BPA and CAM assessment and migration remediation activities, with code and configuration compatibility work and validation.',
      'Contributed to Dispatcher migration across virtual hosts, farm files, rewrite rules, include/header rules, filters and cache configuration.',
      'Validated local Dispatcher behavior with the Cloud Dispatcher Docker image.'
    ],
    problem: 'Cloud migration changes the delivery contract: legacy assumptions around configuration, Dispatcher layout and local validation no longer hold in the same way.',
    code: ['BPA report → CAM remediation', 'docker run cloud dispatcher image', 'validate farms, filters, rewrites'],
    category: 'Cloud',
    role: 'Software Developer / Support',
    platform: 'AEM as a Cloud Service'
  },
  {
    slug: 'connected-dam-and-asset-ingestion',
    title: 'Connected DAM and asset ingestion',
    summary: 'Sites-to-Assets integration and automated asset uploads.',
    stack: ['Connected DAM', 'Direct Binary Upload', 'Workflows', 'REST'],
    details: [
      'Troubleshot Connected DAM between AEM Sites and Assets environments, including remote asset access, mount-point alignment, API connectivity and CORS behavior.',
      'Contributed to AEM Assets programmatic upload flows using the Direct Binary Upload initiate-upload and complete-upload sequence for Cloud Service.',
      'Supported DAM ingestion automation involving file transfer, Workflow processing, scheduled Job Consumer execution, repository queries and REST forwarding.'
    ],
    problem: 'Assets often cross system boundaries. The hard part is getting browser origin rules, repository paths, asynchronous processing and Cloud Service upload semantics to agree.',
    code: ['POST initiate upload', 'PUT binary to cloud storage', 'POST complete → asset processing'],
    category: 'Assets',
    role: 'Software Developer',
    platform: 'AEM Sites + Assets'
  },
  {
    slug: 'enterprise-content-components-and-workflows',
    title: 'Enterprise content components and workflows',
    summary: 'Reusable components and automation for an AEM 6.5 site.',
    stack: ['QueryBuilder', 'Scheduler Jobs', 'Workflows', 'Templates'],
    details: [
      'Built reusable news, events and navigation components.',
      'Implemented QueryBuilder retrieval and tag-driven components for dynamic content.',
      'Developed Contact Workflows and Scheduler Jobs to automate business processes.',
      'Supported Dispatcher Cloud configuration and responsive templates.'
    ],
    problem: 'Enterprise sites need content authoring patterns that stay reusable as the content model, templates and operational processes grow.',
    code: ['QueryBuilder type=cq:Page tag=news', 'scheduler job: contact workflow', 'events list component rendered'],
    category: 'Components',
    role: 'Software Developer',
    platform: 'AEM 6.5'
  }
];
