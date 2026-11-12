export const techStack = [
  { name: 'PHP', category: 'Programming Languages' },
  { name: 'MySQL', category: 'Databases' },
  { name: 'JavaScript', category: 'Programming Languages' },
  { name: 'TypeScript', category: 'Programming Languages' },
  { name: 'Tailwind CSS', category: 'Frameworks & Styling' },
  { name: 'HTML5 & CSS3', category: 'Frameworks & Styling' },
  { name: 'Node.js', category: 'Tools & DevOps' },
  { name: 'RESTful APIs', category: 'Tools & DevOps' },
  { name: 'Docker', category: 'Tools & DevOps' },
  { name: 'Coolify', category: 'Tools & DevOps' },
  { name: 'Git & GitHub', category: 'Tools & DevOps' },
  { name: 'Figma', category: 'Tools & DevOps' },
  { name: 'Claude Code', category: 'AI Tools' },
  { name: 'Google Gemini', category: 'AI Tools' },
  { name: 'OpenAI', category: 'AI Tools' },
  { name: 'Linux / Apache', category: 'Tools & DevOps' },
];

export const skillGroups = [
  'Programming Languages', 'Databases', 'Frameworks & Styling', 'Tools & DevOps', 'AI Tools',
];

const categoryColor: Record<string, string> = {
  'Programming Languages': '#FF2E2E',
  Databases: '#FF2E2E',
  'Frameworks & Styling': '#10B981',
  'Tools & DevOps': '#38BDF8',
  'AI Tools': '#10B981',
};

export function colorFor(category: string) {
  return categoryColor[category] || '#38BDF8';
}

export const profile = {
  email: 'madulidjoshuam@gmail.com',
  github: 'https://github.com/envydoes',
  linkedin: '', // TODO: Add your LinkedIn profile URL.
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  objective: string;
  objectives: string[];
  contribution: string;
  year: string;
  tags: string[];
  image: string;
  imageAlt: string;
  imageFit: 'cover' | 'contain';
  badge: string;
  liveUrl: string;
  githubUrl: string;
  designUrl: string;
  sourceUnavailable?: boolean;
  liveUnavailable?: boolean;
};

export const projects: Project[] = [
  {
    id: 'unbounded',
    title: 'Unbounded Landing Page',
    category: 'Web Design',
    description:
      'Streetwear storefront built around a bold visual identity, expressive product presentation, and a focused shopping experience.',
    objective: 'Present a streetwear collection through a clear, visually focused storefront.',
    objectives: [
      'Give the streetwear brand a consistent visual identity on the web.',
      'Make featured products and collections easy to discover.',
      'Provide a landing page that adapts to different screen sizes.',
    ],
    contribution: 'TODO: Describe your role, the pages or features you built, and your individual contribution to Unbounded.',
    year: '2026',
    tags: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
    image: '/images/projects/unbounded-cover.webp',
    imageAlt: 'Unbounded streetwear storefront landing page design',
    imageFit: 'cover',
    badge: 'Landing Page',
    liveUrl: 'https://unbounded-nu.vercel.app/',
    githubUrl: 'https://github.com/envydoes/unbounded',
    designUrl: '',
  },
  {
    id: 'sumeste-portal',
    title: 'SumEste Portal',
    category: 'Full-Stack',
    description:
      'A full-stack barangay management and analytics platform for Barangay Sumacab Este, bringing resident records, document requests, beneficiary prioritization, equipment tracking, and business listings into one system.',
    objective: 'Bring resident information and barangay services together in one portal.',
    objectives: [
      'Organize resident information to support local administration.',
      'Give residents a central place to access barangay services and announcements.',
      'Support separate access for residents, non-residents, and barangay staff.',
    ],
    contribution: 'Designed and developed the barangay management and analytics platform. Implemented resident records management, document request processing, beneficiary prioritization, and equipment tracking; integrated the analytics dashboard and business listings; and deployed the platform to production.',
    year: '2026',
    tags: ['PHP', 'MySQL', 'Tailwind CSS', 'JavaScript'],
    image: '/images/projects/sumeste-portal-1.png',
    imageAlt: 'SumEste Portal hero carousel displaying its third photo, the Sumacab Este barangay hall',
    imageFit: 'contain',
    badge: 'Capstone Project',
    liveUrl: 'https://sum-este-portal.digital',
    liveUnavailable: true,
    githubUrl: 'https://github.com/envydoes/SumEste-Portal',
    designUrl: '',
  },
  {
    id: 'aurora',
    title: 'Aurora Platform',
    category: 'Full-Stack',
    description:
      'A web-based resort booking and tourism platform for Dingalan, Aurora, with destination information, room reservations, interactive calendar scheduling, and an administration panel.',
    objective: 'Help visitors explore destinations and accommodation in one place.',
    objectives: [
      'Bring destination and accommodation information into a single browsing experience.',
      'Help visitors explore local experiences while planning a stay.',
      'Support room reservations and booking management through calendar scheduling and an administration panel.',
    ],
    contribution: 'Built the resort booking platform with room reservations, interactive calendar scheduling, and an administration panel. Developed responsive user interfaces and backend database queries for booking management.',
    year: '2024',
    tags: ['PHP', 'HTML5', 'CSS3', 'JavaScript'],
    image: '/images/projects/aurora-1.png',
    imageAlt: 'Aurora Platform landing page with a Dingalan coastal photograph and Plan Your Journey button',
    imageFit: 'cover',
    badge: 'Tourism Platform',
    liveUrl: '',
    githubUrl: 'https://github.com/envydoes/aurora',
    sourceUnavailable: true,
    designUrl: '',
  },
  {
    id: 'atom-ai-design',
    title: 'ATOM AI — Conversing App UI/UX',
    category: 'UI/UX & Design',
    description:
      'A Figma prototype for an AI conversation app, covering login and signup, chat, archived conversations, image exports, cloud space, and profile settings in a consistent dark interface.',
    objective: 'Design a clear interface for conversations, sign-in, and cloud space.',
    objectives: [
      'Make the chat and sign-in flows easy to understand.',
      'Keep the visual language consistent across the app screens.',
      'Organize conversations and cloud space within a coherent app interface.',
    ],
    contribution: 'TODO: Identify the screens, user flows, and design decisions you personally contributed to ATOM AI.',
    year: '2024',
    tags: ['Figma', 'UI/UX', 'Design System'],
    image: '/images/atom-ai/logo.png',
    imageAlt: 'ATOM AI robot logo',
    imageFit: 'contain',
    badge: 'Design System',
    liveUrl: '',
    githubUrl: '',
    designUrl: 'https://www.figma.com/proto/W3NBVeRn7wP39e3Y5dC1jh/ITHC-CONVERSING-APP-%22ATOM-AI%22?node-id=0-304&t=vTVApuKcPB64792I-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1308%3A2133',
  },
];

export const timeline = [
  {
    year: '2023',
    title: 'Business Permits and Licensing Office',
    description: '',
    highlights: [
      'Assisted in encoding and organizing 500+ business permit records into digital databases.',
      'Supported daily data management, record-keeping, and office administrative operations.',
      'Maintained accurate data logs to improve file retrieval efficiency for office personnel.',
    ],
  },
  {
    year: '2022 — 2023',
    title: 'Started Programming — HTML, CSS & JavaScript',
    description:
      'Began the journey into web development by learning HTML, CSS, and JavaScript from the ground up, then expanded into UI/UX — designing interactive front-end builds and translating ideas into polished web interfaces.',
  },
];

export const certifications: {
  title: string;
  issuer: string;
  image: string;
  date?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
}[] = [
  {
    title: 'Information Technology Specialist: HTML and CSS',
    issuer: 'Certiport',
    image: '/images/certiport-html-css.png',
    date: 'October 29, 2026',
    credentialId: 'rdmR-uSrs',
    credentialUrl: 'https://www.certiport.com/portal/desktopdefault.aspx?tabid=195&roleid=1',
    description: 'Completed the Information Technology Specialist certification requirements for HTML and CSS. Valid for five years from the date of issue.',
  },
  {
    title: 'Employability Skills: JobReady (With AI)',
    issuer: 'Wadhwani Foundation',
    image: '/images/wadhwani-jobready-ai.png',
    date: 'November 4, 2026',
    credentialId: '6aeb2234ceb192dc91cf041d',
    credentialUrl: 'https://web.certificate.wfglobal.org/en/certificate?certificateId=6aeb2234ceb192dc91cf041d',
    description: 'Completed JobReady (With AI) v1 at the Advanced Level, including 75 hours of training and in-class applications.',
  },
  { title: 'Google AI Professional Certificate', issuer: 'Google', image: '/images/google-ai-professional-certificate.png' },
  { title: 'System Integration', issuer: 'Upskill', image: '/images/upskill-system-integration.png' },
  { title: 'Enterprise Architecture', issuer: 'Upskill', image: '/images/upskill-enterprise-architecture.png' },
  { title: 'Azure AI Fundamentals', issuer: 'TESDA', image: '/images/tesda-azure-ai-fundamentals.png' },
  { title: 'JavaScript Essentials', issuer: 'Cisco', image: '/images/javascript-essentials-2-certificate.png' },
  { title: 'Interview Tactics', issuer: 'Upskill', image: '/images/upskill-interview-tactics.png' },
];
