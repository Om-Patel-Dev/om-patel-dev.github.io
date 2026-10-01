export const site = {
  name: 'Om Patel',
  role: 'Software Developer',
  email: 'patelomm.2003@gmail.com',
  phone: '+91 7219769402',
  linkedin: 'https://www.linkedin.com/in/patel-om-m/',
  linkedinActivity: 'https://www.linkedin.com/in/patel-om-m/recent-activity/all/',
  github: 'https://github.com/MrChuck07',
  resume: '/om-patel-resume.pdf'
};

export const githubProjects = [
  { name: 'universal-editor-eds', description: "JavaScript project for AEM's Universal Editor.", url: 'https://github.com/MrChuck07/universal-editor-eds' },
  { name: 'learning-progress-tracker', description: 'Track daily goals and study activity.', url: 'https://github.com/MrChuck07/learning-progress-tracker' },
  { name: 'Library-Management', description: 'Library management project.', url: 'https://github.com/MrChuck07/Library-Management' },
  { name: 'Virtual-Assistant', description: 'Virtual assistant project.', url: 'https://github.com/MrChuck07/Virtual-Assistant' }
];

export const skills: Record<string, string[]> = {
  AEM: ['AEM 6.5', 'AEM as a Cloud Service', 'Cloud Dispatcher (learning)', 'Sling Models', 'HTL', 'Servlets', 'OSGi', 'JCR', 'QueryBuilder', 'Core Components', 'Editable Templates', 'Experience Fragments', 'MSM', 'Workflows', 'Scheduler Jobs', 'Content Fragments', 'AEM Assets', 'Localization'],
  'Java and web': ['Java', 'JavaScript', 'React', 'HTML5', 'CSS3', 'REST APIs'],
  'Cloud and DevOps': ['Cloud Manager', 'CI/CD', 'Docker', 'Maven', 'Git', 'Dispatcher validation'],
  'Testing and security': ['JUnit', 'Mockito', 'Sling Mocks', 'SonarQube', 'Snyk'],
  Tools: ['IntelliJ IDEA', 'VS Code', 'Postman', 'Jira']
};

export const faqs = [
  ['What do you work on?', 'AEM 6.5 and AEM as a Cloud Service: Assets and DAM, localization, components, workflows and platform migrations.'],
  ['Have you worked on Cloud Service migrations?', 'Yes. I supported BPA and CAM assessment and remediation, Dispatcher migration, and Connected DAM and Direct Binary Upload work.'],
  ['How much Dispatcher do you know?', 'Cloud Dispatcher basics. I supported a migration and validated with the Cloud Dispatcher Docker image. I am still learning and sharing that work openly.'],
  ['How do you test your code?', 'Postman for request flows, JUnit, Mockito and Sling Mocks for logic, and SonarQube and Snyk for quality and security.'],
  ['How can I reach you?', 'Use the contact page. LinkedIn and GitHub are also linked throughout the site.']
] as const;
